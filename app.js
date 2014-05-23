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

var express = require('express'),
	ejs = require('ejs'),
	app = express(),
	server = require('http').createServer(app),
	Coordinator = require('mute-server').Coordinator,
	SocketIOAdapter = require('mute-server').SocketIOAdapter;

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var coordinator = new Coordinator();
var socketIOAdapter = new SocketIOAdapter(server, coordinator);
coordinator.setNetwork(socketIOAdapter);

var rooms = ['demo'];
coordinator.addDoc('demo');

app.use('/assets', express.static(__dirname + '/assets'));

// set .ejs as the default extension
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

function redirect(req, res, path) ***REMOVED***
	res.writeHead(302, ***REMOVED***
		Location: (req.socket.encrypted ? 'https://' : 'http://') + 
		req.headers.host + path
	***REMOVED***);
	res.end();
***REMOVED***;

function createID()
***REMOVED***
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var i;
    for(i=0; i<16; i++) ***REMOVED***
        text += possible.charAt(Math.floor(Math.random() * possible.length));
***REMOVED***
    console.log('Text: ', text);
    return text;
***REMOVED***

app.get('/ajax/createDoc/:docID', function (req, res) ***REMOVED***
	if(rooms.indexOf(req.params.docID) === -1) ***REMOVED***
		rooms.push(req.params.docID);
		coordinator.addDoc(req.params.docID);
	***REMOVED***
	res.setHeader('Content-Type', 'text/json');
	res.send(***REMOVED*** OK: true ***REMOVED***);
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

app.get('/createDoc', function (req, res) ***REMOVED***
	var newDocID = 'demo';
	while(rooms.indexOf(newDocID) !== -1) ***REMOVED***
		newDocID = createID();
	***REMOVED***

	rooms.push(newDocID);
	coordinator.addDoc(newDocID);
	
	redirect(req, res, '/' + newDocID);
***REMOVED***);

app.get('/:docID', function (req, res) ***REMOVED***
	console.log('On tente de modifier : ', req.params.docID);
	console.log('Index : ', rooms.indexOf(req.params.docID));
	var newDoc = false;
	if(rooms.indexOf(req.params.docID) === -1) ***REMOVED***
		newDoc = true;
	***REMOVED***
	res.setHeader('Content-Type', 'text/html');
	res.render('editor', ***REMOVED*** docID: req.params.docID, newDoc: newDoc ***REMOVED***);
***REMOVED***);


app.get('/', function (req, res) ***REMOVED***
	res.setHeader('Content-Type', 'text/html');
	res.render('home', ***REMOVED*** docID: 'demo' ***REMOVED***);
***REMOVED***);

app.use(function(req, res, next)***REMOVED***
    res.setHeader('Content-Type', 'text/html');
    res.send(404, 'Page introuvable !');
***REMOVED***);

server.listen( port, ipaddress, function() ***REMOVED***
    console.log(new Date() + ': Server is listening on port ' + port);
***REMOVED***);

console.log('-------- Le serveur a correctement démarré --------');
