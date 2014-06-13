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

fs.readFile('mute.conf', 'utf8', function (err,data) ***REMOVED***
	if (err) ***REMOVED***
		return console.log(err);
	***REMOVED***
	var obj = JSON.parse(data);
	USERNAME_MAIL = obj.mail.username;
	PASS_MAIL = obj.mail.pass;

	smtpTransport = nodemailer.createTransport("SMTP",***REMOVED***
	    service: "Gmail",
	    auth: ***REMOVED***
	        user: USERNAME_MAIL,
	        pass: PASS_MAIL
	***REMOVED***
	***REMOVED***);
***REMOVED***);


var keys = [];
var i;
for(i=0; i<10; i++) ***REMOVED***
	keys.push(createID());
***REMOVED***
app.use(session(***REMOVED***
	keys: keys
***REMOVED***));
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

var docs = ***REMOVED***
	demo: ***REMOVED***
		pwd: false,
		hash: hash(createID())
	***REMOVED***
***REMOVED***;
coordinator.addDoc('demo');

function hash(str) ***REMOVED***
	return crypto.createHash('sha256').update(PREFIX_SALT + str + SUFFIX_SALT).digest('hex');
***REMOVED***

function createID() ***REMOVED***
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var i;
    for(i=0; i<16; i++) ***REMOVED***
        text += possible.charAt(Math.floor(Math.random() * possible.length));
***REMOVED***
    return text;
***REMOVED***

app.post('/ajax/verifyPwd', function (req, res) ***REMOVED***
	var docID = req.body.docID;
	var pwd = req.body.pwd;
	var success = true;

	if(docID.length === 0 || pwd.length === 0) ***REMOVED***
		success = false;
	***REMOVED***
	else if(docs[docID] === null || docs[docID] === undefined) ***REMOVED***
		// Access to an unknow document
		success = false;
	***REMOVED***
	else if(docs[docID].pwd !== false && docs[docID].pwd !== hash(pwd)) ***REMOVED***
		// Public document or wrong password
		success = false;
	***REMOVED***

	if(success === true) ***REMOVED***
		res.cookie(server_session_id + '_' + docID, docs[docID].hash, ***REMOVED*** signed: true ***REMOVED***);
	***REMOVED***
	res.send(***REMOVED*** success: success ***REMOVED***);
***REMOVED***);

app.get('/delay', function (req, res) ***REMOVED***
	delay += 5000;
	socketIOAdapter.setDelay(delay);
	res.setHeader('Content-Type', 'text/html');
	res.redirect('/');	
***REMOVED***);

app.get('/listDocs', function (req, res) ***REMOVED***
	var listDocs = coordinator.listDocs();
	res.setHeader('Content-Type', 'text/html');
	res.send(listDocs);	
***REMOVED***);

app.get('/getInfos', function (req, res) ***REMOVED***
	var infos = coordinator.getInfos();
	res.setHeader('Content-Type', 'text/html');
	res.send(infos);
***REMOVED***);

app.get('/getInfosDemo', function (req, res) ***REMOVED***
	var infosDemo = coordinator.getInfos(['demo']);
	res.setHeader('Content-Type', 'text/html');
	res.send(infosDemo);
***REMOVED***);

app.post('/sendMail', function (req, res) ***REMOVED***
	// setup e-mail data with unicode symbols
	var mailOptions = ***REMOVED***
	    from: USERNAME_MAIL, // sender address
	    to: USERNAME_MAIL, // list of receivers
	    subject: "MUTE - " + req.body.subject, // Subject line
	    text: 'Send by ' + req.body.email + '\n\n' + req.body.text, // plaintext body
	    html: 'Send by ' + req.body.email + '<br><br>' + req.body.text // html body
	***REMOVED***

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response)***REMOVED***
	    if(error)***REMOVED***
	        console.log(error);
	***REMOVED***
	    else***REMOVED***
	        console.log("Message sent: " + response.message);
	***REMOVED***
	***REMOVED***);

	req.session.info = true;
	req.session.notificationTitle = 'Message sent';
	req.session.msg = 'Your message has correctly been sent to the ***REMOVED***istrators.';
	
	res.redirect('/');
***REMOVED***);

app.post('/createDoc', function (req, res) ***REMOVED***
	var docID = req.body.docID;
	var pwd = req.body.pwd;

	if(docID.length === 0) ***REMOVED***
		// Empty docID: generate a random one
		docID = 'demo';
		while(docs[docID] !== undefined) ***REMOVED***
			docID = createID();
		***REMOVED***
	***REMOVED***

	if(docs[docID] === undefined) ***REMOVED***
		// New doc
		docs[docID] = ***REMOVED***
			pwd: false,
			hash: hash(createID())
		***REMOVED***;
		if(pwd.length > 0) ***REMOVED***
			docs[docID].pwd = hash(pwd);
			res.cookie(server_session_id+ '_'+ docID, docs[docID].hash, ***REMOVED*** signed: true ***REMOVED***);
		***REMOVED***
		coordinator.addDoc(docID);

		req.session.info = true;
		req.session.notificationTitle = 'Document created';
		req.session.msg = 'The document "' + docID + '" has correctly been created.';
		
		res.redirect('/' + docID);
	***REMOVED***
	else ***REMOVED***
		// Already existing
		req.session.error = true;
		req.session.notificationTitle = 'Document already existing';
		req.session.msg = 'A document with this name already exists. Please use the form at the top of the screen to access it if it\'s yours.';
		res.redirect('/');
	***REMOVED***
***REMOVED***);

app.get('/guide', function (req, res) ***REMOVED***
	res.setHeader('Content-Type', 'text/html');
	res.render('guide', ***REMOVED*** title: 'MUTE - Multi-User Text Editor', page: 'guide' ***REMOVED***);
***REMOVED***);

app.get('/contact', function (req, res) ***REMOVED***
	res.setHeader('Content-Type', 'text/html');
	res.render('contact', ***REMOVED*** title: 'MUTE - Multi-User Text Editor', page: 'contact' ***REMOVED***);
***REMOVED***);

app.get('/about', function (req, res) ***REMOVED***
	res.setHeader('Content-Type', 'text/html');
	res.render('about', ***REMOVED*** title: 'MUTE - Multi-User Text Editor', page: 'about' ***REMOVED***);
***REMOVED***);

app.get('/accessDoc', function (req, res) ***REMOVED***
	console.log('req: ', req);
	var docID = req.query.docID;
	res.redirect('/' + docID);
***REMOVED***);

app.get('/:docID', function (req, res) ***REMOVED***
	var docID = req.params.docID;
	var privateDoc = false;
	var newDoc = false;
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	var error = false;
	var info = false;
	var notificationTitle = '';
	var msg = '';

	if(req.session.info === true) ***REMOVED***
		info = req.session.info;
		notificationTitle = req.session.notificationTitle;
		msg = req.session.msg;

		delete req.session.info;
		delete req.session.msg;
	***REMOVED***

	if(docs[docID] === undefined) ***REMOVED***
		newDoc = true;
		docs[docID] = ***REMOVED***
			pwd: false,
			hash: hash(createID)
		***REMOVED***;
		coordinator.addDoc(req.params.docID);
		info = true;
		notificationTitle = 'Document created';
		msg = 'The document "' + docID + '" has correctly been created.';
	***REMOVED***
	if(newDoc === false && docs[docID].pwd !== false) ***REMOVED***
		if(req.signedCookies[server_session_id + '_' + docID] !== docs[docID].hash) ***REMOVED***
			// Private doc and not already authentified
			privateDoc = true;
		***REMOVED*** 
	***REMOVED***
	res.setHeader('Content-Type', 'text/html');
	res.render('private-editor', ***REMOVED*** title: 'MUTE - Multi-User Text Editor', page: '', editorID: 'editor', nbOperationsItemID: 'cnt', lastModificationDateItemID: 'lastModificationDate', docID: req.params.docID, link: fullUrl, privateDoc: privateDoc, newDoc: newDoc, error: error, info: info, notificationTitle: notificationTitle, msg: msg ***REMOVED***);
***REMOVED***);

app.get('/', function (req, res) ***REMOVED***
	var error = false;
	var info = false;
	var notificationTitle = '';
	var msg = '';
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

	if(req.session.error === true) ***REMOVED***
		error = req.session.error;
		notificationTitle = req.session.notificationTitle;
		msg = req.session.msg;

		delete req.session.error;
		delete req.session.msg;
	***REMOVED***

	res.setHeader('Content-Type', 'text/html');
	res.render('home', ***REMOVED*** title: 'MUTE - Multi-User Text Editor', page: 'home', editorID: 'editor', nbOperationsItemID: 'cnt', lastModificationDateItemID: 'lastModificationDate', docID: 'demo', error: error, info: info, notificationTitle: notificationTitle, msg: msg, link: fullUrl ***REMOVED***);
***REMOVED***);

app.use(function(req, res, next)***REMOVED***
    res.setHeader('Content-Type', 'text/html');
    res.send(404, 'Page introuvable !');
***REMOVED***);

server.listen( port, ipaddress, function() ***REMOVED***
    console.log(new Date() + ': Server is listening on port ' + port);
***REMOVED***);

console.log('-------- Le serveur a correctement démarré --------');
