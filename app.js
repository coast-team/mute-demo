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
var SALT;
var USERNAME_MAIL;
var PASS_MAIL;
var NAME_DB;
var USERNAME_DB;
var PASS_DB;
var HOST_DB;
var PORT_DB;
var VERSION_MANIFEST = createID();

var smtpTransport;

var express = require('express'),
	ejs = require('ejs'),
	fs = require('fs'),
	app = express(),
	favicon = require('serve-favicon'),
	session = require('cookie-session'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	mongoose = require('mongoose'),	
	bcrypt = require('bcryptjs'),
	server = require('http').createServer(app),
	Coordinator = require('mute-server').Coordinator,
	SocketIOAdapter = require('mute-server').SocketIOAdapter,
	nodemailer = require('nodemailer'),
	cacheManifest = require('connect-cache-manifest');

SALT = bcrypt.genSaltSync(10);

var db;

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

	NAME_DB = obj.db.name;
	USERNAME_DB = obj.db.username;
	PASS_DB = obj.db.pass;
	HOST_DB = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
	PORT_DB = process.env.OPENSHIFT_MONGODB_PORT || 27017;

	console.log('HOST_DB:')

	// Connection to the mongoDB running instance
	mongoose.connect('mongodb://'+HOST_DB+':'+PORT_DB+'/'+NAME_DB, ***REMOVED*** user: USERNAME_DB, pass: PASS_DB ***REMOVED***);
	// Check if connection succeed
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () ***REMOVED***
		console.log('Connection to mongoDB instance succeed!');
	***REMOVED***);
***REMOVED***);

var docSchema = mongoose.Schema(***REMOVED***
    docID: String,
    pwd: ***REMOVED******REMOVED***
***REMOVED***);

var Docs = mongoose.model('Docs', docSchema);

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
app.use('/assets', express.static(__dirname + '/assets', ***REMOVED*** maxAge: 1 ***REMOVED***));
app.use('/views', express.static(__dirname + '/views', ***REMOVED*** maxAge: 1 ***REMOVED***));
app.use('/offline', express.static(__dirname + '/offline', ***REMOVED*** maxAge: 1 ***REMOVED***));

// set .ejs as the default extension
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var server_session_id = createID();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;


var delay = 0;
var coordinator = new Coordinator(db);
var socketIOAdapter = new SocketIOAdapter(server, coordinator, delay);
coordinator.setNetwork(socketIOAdapter);

var docs = ***REMOVED******REMOVED***;
initListDocs();

function initListDocs() ***REMOVED***
	var i;

	// Fetch all the documents stored in the DB
	Docs.find(function (err, storedDocs) ***REMOVED***
		var doc;
		if(err) ***REMOVED***
			return console.error(err);
		***REMOVED***
		console.log('storedDocs: ', storedDocs);
		if(storedDocs.length > 0) ***REMOVED***
			for(i=0; i<storedDocs.length; i++) ***REMOVED***
				docs[storedDocs[i].docID] = storedDocs[i].pwd;
			***REMOVED***
		***REMOVED***
		else ***REMOVED***
			console.log('On add le doc par défaut');
			addDefaultDoc();
		***REMOVED***
		console.log('Docs existants : ', docs);
	***REMOVED***);
***REMOVED***

function addDefaultDoc() ***REMOVED***
	var doc = new Docs(***REMOVED*** docID: 'demo', pwd: false ***REMOVED***);
	doc.markModified('pwd');
	doc.save();
	coordinator.addDoc('demo');
	doc.demo = false;
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

function validPassword(docID, pwd) ***REMOVED***
	var success = true;

	if(docID.length === 0) ***REMOVED***
		success = false;
	***REMOVED***
	else if(docs[docID] === null || docs[docID] === undefined) ***REMOVED***
		// Access to an unknow document
		success = false;
	***REMOVED***
	else if(docs[docID] === false || docs[docID] !== bcrypt.compareSync(pwd, SALT)) ***REMOVED***
		// Public document or wrong password
		success = false;
	***REMOVED***

	return success;
***REMOVED***

app.post('/ajax/verifyPwd', function (req, res) ***REMOVED***
	var docID = req.body.docID;
	var pwd = req.body.pwd;
	var success = validPassword(docID, pwd);

	if(success) ***REMOVED***
		res.cookie(docID, docs[docID], ***REMOVED*** signed: true ***REMOVED***);
	***REMOVED***
	res.send(***REMOVED*** success: success ***REMOVED***);
***REMOVED***);

app.post('/ajax/testConnection', function (req, res) ***REMOVED***
	res.send(***REMOVED*** OK: true ***REMOVED***);
***REMOVED***);

app.get('/delay', function (req, res) ***REMOVED***
	delay += 5000;
	socketIOAdapter.setDelay(delay);
	res.setHeader('Content-Type', 'text/html');
	res.redirect('/');	
***REMOVED***);

app.get('/listDocs', function (req, res) ***REMOVED***
	coordinator.listDocs(function (list) ***REMOVED***
		res.setHeader('Content-Type', 'text/html');
		res.send(list);	
	***REMOVED***);	
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
		if(pwd.length > 0) ***REMOVED***
			// Private
			docs[docID] = bcrypt.hashSync(pwd, SALT);
			res.cookie(docID, docs[docID], ***REMOVED*** signed: true ***REMOVED***);
		***REMOVED***
		else ***REMOVED***
			docs[docID] = false;
		***REMOVED***

		var doc = new Docs(***REMOVED*** docID: docID, pwd: docs[docID] ***REMOVED***);
		doc.markModified('pwd');
		doc.save(function (err, doc) ***REMOVED***
			if (err)  ***REMOVED***
				return console.error(err);
			***REMOVED***
			console.log('Save successful!');			
		***REMOVED***);

		coordinator.addDoc(docID);

		req.session.info = true;
		req.session.notificationTitle = 'Document created';
		req.session.msg = 'The document "' + docID + '" has correctly been created.';
		
		res.redirect('/doc/' + docID);
	***REMOVED***
	else ***REMOVED***
		// Already existing
		req.session.error = true;
		req.session.notificationTitle = 'Document already existing';
		req.session.msg = 'A document with this name already exists. Please use the form at the top of the screen to access it if it\'s yours.';
		res.redirect('/');
	***REMOVED***
***REMOVED***);

app.use(cacheManifest(***REMOVED***
	manifestPath: '/mute.manifest',
	/*
	files: [***REMOVED***
	file: __dirname + '/assets/js/foo.js',
	path: '/js/foo.js'
	***REMOVED***, 
	*/

	version: VERSION_MANIFEST,
	files: [
		/*
		***REMOVED***
			dir: __dirname + '/assets/js',
			prefix: '/assets/js/',
			ignore: function(x) ***REMOVED*** return /\//.test(x); ***REMOVED***
		***REMOVED***,
		*/
		***REMOVED***
			file: __dirname + '/assets/js/awareness-adapter.js',
			path: '/assets/js/awareness-adapter.js'
		***REMOVED***,
		***REMOVED***
			file: __dirname + '/assets/js/bootstrap.min.js',
			path: '/assets/js/bootstrap.min.js'
		***REMOVED***,
		***REMOVED***
			file: __dirname + '/assets/js/highlightjs.min.js',
			path: '/assets/js/highlightjs.min.js'
		***REMOVED***,
		***REMOVED***
			file: __dirname + '/assets/js/jquery-2.1.0.js',
			path: '/assets/js/jquery-2.1.0.js'
		***REMOVED***,
		***REMOVED***
			file: __dirname + '/assets/js/kinetic-v5.0.2.min.js',
			path: '/assets/js/kinetic-v5.0.2.min.js'
		***REMOVED***,
		***REMOVED***
			file: __dirname + '/assets/js/mute.js',
			path: '/assets/js/mute.js'
		***REMOVED***,
		***REMOVED***
			dir: __dirname + '/assets/js/ace/src',
			prefix: '/assets/js/ace/src/'
		***REMOVED***,
		***REMOVED***
			dir: __dirname + '/assets/js/mute-client/build',
			prefix: '/assets/js/mute-client/build/'
		***REMOVED***,
		***REMOVED***
			dir: __dirname + '/assets/js/dbjs/src',
			prefix: '/assets/js/dbjs/src/'
		***REMOVED***,
		***REMOVED***
			dir: __dirname + '/assets/css',
			prefix: '/assets/css/',
			ignore: function(x) ***REMOVED*** return /\/\./.test(x); ***REMOVED***
		***REMOVED***,
		***REMOVED***
			dir: __dirname + '/assets/fonts',
			prefix: '/assets/fonts/',
			ignore: function(x) ***REMOVED*** return /\/\./.test(x); ***REMOVED***
		***REMOVED***,
		***REMOVED***
			dir: __dirname + '/assets/img',
			prefix: '/assets/img/',
			ignore: function(x) ***REMOVED*** return /\/\./.test(x); ***REMOVED***
		***REMOVED***,
		/*
		,

		***REMOVED***
			dir: __dirname + '/views',
			prefix: '/views/',
			ignore: function(x) ***REMOVED*** return /\.bak$/.test(x); ***REMOVED***,
			//replace: function(x) ***REMOVED*** return x.replace(/\.ejs$/, '.html'); ***REMOVED***
		***REMOVED***
		*/
	],
	networks: ['*'],
	fallbacks: ['/ /offline/list.html', '/doc /offline/doc.html']
***REMOVED***));

app.get('/list', function (req, res) ***REMOVED***
	res.setHeader('Content-Type', 'text/html');
	res.render('list', ***REMOVED*** title: 'MUTE - Multi-User Text Editor', page: 'list' ***REMOVED***);
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
	var docID = req.query.docID;
	res.redirect('/doc/' + docID);
***REMOVED***);

app.get('/doc/:docID/history', function (req, res) ***REMOVED***
	var docID = req.params.docID;
	var privateDoc = false;
	var newDoc = false;
	//var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	var error = false;
	var info = false;
	var notificationTitle = '';
	var msg = '';

	// Doc doesn't exist
	if(docs[docID] === undefined) ***REMOVED***
		req.session.error = true;
		req.session.notificationTitle = 'Document doesn\'t exist';
		req.session.msg = 'The document you tried to access doesn\'t exist. Please check the name of the doc you want to access.';

		res.redirect('/');
	***REMOVED***
	if(newDoc === false && docs[docID] !== false) ***REMOVED***
		if(req.signedCookies[docID] !== docs[docID]) ***REMOVED***
			// Private doc and not already authentified
			privateDoc = true;
		***REMOVED*** 
	***REMOVED***
	
	res.setHeader('Content-Type', 'text/html');
	res.render('history-viewer', ***REMOVED*** title: 'MUTE - Multi-User Text Editor', page: '', editorID: 'editor', lastModificationDateItemID: 'lastModificationDate', docID: req.params.docID, privateDoc: privateDoc, newDoc: newDoc, error: error, info: info, notificationTitle: notificationTitle, msg: msg ***REMOVED***);
***REMOVED***);

app.get('/doc/:docID', function (req, res) ***REMOVED***
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

	// New doc
	if(docs[docID] === undefined) ***REMOVED***
		newDoc = true;
		docs[docID] = false;

		var doc = new Docs(***REMOVED*** docID: docID, pwd: false ***REMOVED***);
		doc.markModified('pwd');
		doc.save(function (err, doc) ***REMOVED***
			if (err)  ***REMOVED***
				return console.error(err);
			***REMOVED***
			console.log('Save successful!');			
		***REMOVED***);

		coordinator.addDoc(req.params.docID);
		info = true;
		notificationTitle = 'Document created';
		msg = 'The document "' + docID + '" has correctly been created.';
	***REMOVED***
	if(newDoc === false && docs[docID] !== false) ***REMOVED***
		if(req.signedCookies[docID] !== docs[docID]) ***REMOVED***
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
    res.render('404', ***REMOVED*** title: 'MUTE - Multi-User Text Editor', page: '404'***REMOVED***);
***REMOVED***);

server.listen( port, ipaddress, function() ***REMOVED***
    console.log(new Date() + ': Server is listening on port ' + port);
***REMOVED***);

console.log('-------- Le serveur a correctement démarré --------');
