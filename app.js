/*
 *	Copyright 2014 Matthieu Nicolas
 *
 *	This program is free software: you can redistribute it and/or modify
 *	it under the terms of the GNU General Public License as published by
 *	the Free Software Foundation, either version 3 of the License, or
 * 	(at your option) any later version.
 *
 *	This program is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *	GNU General Public License for more details.
 *
 *	You should have received a copy of the GNU General Public License
 *	along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var PREFIX_SALT = 'KKBt64eh8Rz3kM25';
var SUFFIX_SALT = 'Nhh5z384h39qCJJS';
var USERNAME_MAIL;
var PASS_MAIL;
var smtpTransport;

var express = require('express'),
	ejs = require('ejs'),
	fs = require('fs'),
	app = express(),
	favicon = require('serve-favicon'),
	session = require('cookie-session'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	crypto = require('crypto'),
	server = require('http').createServer(app),
	Coordinator = require('mute-server').Coordinator,
	SocketIOAdapter = require('mute-server').SocketIOAdapter,
	nodemailer = require("nodemailer");

fs.readFile('mute.conf', 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
	var obj = JSON.parse(data);
	USERNAME_MAIL = obj.mail.username;
	PASS_MAIL = obj.mail.pass;

	smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "Gmail",
	    auth: {
	        user: USERNAME_MAIL,
	        pass: PASS_MAIL
	    }
	});
});


var keys = [];
var i;
for(i=0; i<10; i++) {
	keys.push(createID());
}
app.use(session({
	keys: keys
}));
app.use(cookieParser('q2392sTfDzTc2CQ6'));
app.use(bodyParser())
app.use(bodyParser.urlencoded());
app.use(favicon(__dirname + '/assets/img/favicon.ico'));
app.use('/assets', express.static(__dirname + '/assets'));

// set .ejs as the default extension
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var server_session_id = createID();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;


var delay = 0;
var coordinator = new Coordinator();
var socketIOAdapter = new SocketIOAdapter(server, coordinator, delay);
coordinator.setNetwork(socketIOAdapter);

var docs = {
	demo: {
		pwd: false,
		hash: hash(createID())
	}
};
coordinator.addDoc('demo');

function hash(str) {
	return crypto.createHash('sha256').update(PREFIX_SALT + str + SUFFIX_SALT).digest('hex');
}

function createID() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var i;
    for(i=0; i<16; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

app.post('/ajax/verifyPwd', function (req, res) {
	var docID = req.body.docID;
	var pwd = req.body.pwd;
	var success = true;

	if(docID.length === 0 || pwd.length === 0) {
		success = false;
	}
	else if(docs[docID] === null || docs[docID] === undefined) {
		// Access to an unknow document
		success = false;
	}
	else if(docs[docID].pwd !== false && docs[docID].pwd !== hash(pwd)) {
		// Public document or wrong password
		success = false;
	}

	if(success === true) {
		res.cookie(server_session_id + '_' + docID, docs[docID].hash, { signed: true });
	}
	res.send({ success: success });
});

app.get('/delay', function (req, res) {
	delay += 5000;
	socketIOAdapter.setDelay(delay);
	res.setHeader('Content-Type', 'text/html');
	res.redirect('/');	
});

app.get('/listDocs', function (req, res) {
	var listDocs = coordinator.listDocs();
	res.setHeader('Content-Type', 'text/html');
	res.send(listDocs);	
});

app.get('/getInfos', function (req, res) {
	var infos = coordinator.getInfos();
	res.setHeader('Content-Type', 'text/html');
	res.send(infos);
});

app.get('/getInfosDemo', function (req, res) {
	var infosDemo = coordinator.getInfos(['demo']);
	res.setHeader('Content-Type', 'text/html');
	res.send(infosDemo);
});

app.post('/sendMail', function (req, res) {
	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: USERNAME_MAIL, // sender address
	    to: USERNAME_MAIL, // list of receivers
	    subject: "MUTE - " + req.body.subject, // Subject line
	    text: 'Send by ' + req.body.email + '\n\n' + req.body.text, // plaintext body
	    html: 'Send by ' + req.body.email + '<br><br>' + req.body.text // html body
	}

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response){
	    if(error){
	        console.log(error);
	    }
	    else{
	        console.log("Message sent: " + response.message);
	    }
	});

	req.session.info = true;
	req.session.notificationTitle = 'Message sent';
	req.session.msg = 'Your message has correctly been sent to the administrators.';
	
	res.redirect('/');
});

app.post('/createDoc', function (req, res) {
	var docID = req.body.docID;
	var pwd = req.body.pwd;

	if(docID.length === 0) {
		// Empty docID: generate a random one
		docID = 'demo';
		while(docs[docID] !== undefined) {
			docID = createID();
		}
	}

	if(docs[docID] === undefined) {
		// New doc
		docs[docID] = {
			pwd: false,
			hash: hash(createID())
		};
		if(pwd.length > 0) {
			docs[docID].pwd = hash(pwd);
			res.cookie(server_session_id+ '_'+ docID, docs[docID].hash, { signed: true });
		}
		coordinator.addDoc(docID);

		req.session.info = true;
		req.session.notificationTitle = 'Document created';
		req.session.msg = 'The document "' + docID + '" has correctly been created.';
		
		res.redirect('/' + docID);
	}
	else {
		// Already existing
		req.session.error = true;
		req.session.notificationTitle = 'Document already existing';
		req.session.msg = 'A document with this name already exists. Please use the form at the top of the screen to access it if it\'s yours.';
		res.redirect('/');
	}
});

app.get('/guide', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.render('guide', { title: 'MUTE - Multi-User Text Editor', page: 'guide' });
});

app.get('/contact', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.render('contact', { title: 'MUTE - Multi-User Text Editor', page: 'contact' });
});

app.get('/about', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.render('about', { title: 'MUTE - Multi-User Text Editor', page: 'about' });
});

app.get('/accessDoc', function (req, res) {
	console.log('req: ', req);
	var docID = req.query.docID;
	res.redirect('/' + docID);
});

app.get('/:docID', function (req, res) {
	var docID = req.params.docID;
	var privateDoc = false;
	var newDoc = false;
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	var error = false;
	var info = false;
	var notificationTitle = '';
	var msg = '';

	if(req.session.info === true) {
		info = req.session.info;
		notificationTitle = req.session.notificationTitle;
		msg = req.session.msg;

		delete req.session.info;
		delete req.session.msg;
	}

	if(docs[docID] === undefined) {
		newDoc = true;
		docs[docID] = {
			pwd: false,
			hash: hash(createID)
		};
		coordinator.addDoc(req.params.docID);
		info = true;
		notificationTitle = 'Document created';
		msg = 'The document "' + docID + '" has correctly been created.';
	}
	if(newDoc === false && docs[docID].pwd !== false) {
		if(req.signedCookies[server_session_id + '_' + docID] !== docs[docID].hash) {
			// Private doc and not already authentified
			privateDoc = true;
		} 
	}
	res.setHeader('Content-Type', 'text/html');
	res.render('private-editor', { title: 'MUTE - Multi-User Text Editor', page: '', editorID: 'editor', nbOperationsItemID: 'cnt', lastModificationDateItemID: 'lastModificationDate', docID: req.params.docID, link: fullUrl, privateDoc: privateDoc, newDoc: newDoc, error: error, info: info, notificationTitle: notificationTitle, msg: msg });
});

app.get('/', function (req, res) {
	var error = false;
	var info = false;
	var notificationTitle = '';
	var msg = '';
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

	if(req.session.error === true) {
		error = req.session.error;
		notificationTitle = req.session.notificationTitle;
		msg = req.session.msg;

		delete req.session.error;
		delete req.session.msg;
	}

	res.setHeader('Content-Type', 'text/html');
	res.render('home', { title: 'MUTE - Multi-User Text Editor', page: 'home', editorID: 'editor', nbOperationsItemID: 'cnt', lastModificationDateItemID: 'lastModificationDate', docID: 'demo', error: error, info: info, notificationTitle: notificationTitle, msg: msg, link: fullUrl });
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.send(404, 'Page introuvable !');
});

server.listen( port, ipaddress, function() {
    console.log(new Date() + ': Server is listening on port ' + port);
});

console.log('-------- Le serveur a correctement démarré --------');
