/*
 *  Copyright 2014 Matthieu Nicolas
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
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

require('sigver');
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
    server = require('http').Server(app),
    Coordinator = require('mute-server').Coordinator,
    SocketIOAdapter = require('mute-server').SocketIOAdapter,
    PeerIOAdapter = require('mute-server').PeerIOAdapter,
    InfosUsersModule = require('mute-server').InfosUsersModule,
    nodemailer = require('nodemailer'),
    cacheManifest = require('connect-cache-manifest'),
    io = require('socket.io')(server),
    ExpressPeerServer = require('peer').ExpressPeerServer;

SALT = bcrypt.genSaltSync(10);

var db;

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

    NAME_DB = obj.db.name;
    USERNAME_DB = obj.db.username;
    PASS_DB = obj.db.pass;
    HOST_DB = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
    PORT_DB = process.env.OPENSHIFT_MONGODB_PORT || 27017;

    console.log('HOST_DB:')
    
    var dbOptions = null;
    if (USERNAME_DB) {
      dbOptions = {
        user: USERNAME_DB,
        pass: PASS_DB
      };
    }

    // Connection to the mongoDB running instance
    mongoose.connect('mongodb://'+HOST_DB+':'+PORT_DB+'/'+NAME_DB, dbOptions);
    // Check if connection succeed
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log('Connection to mongoDB instance succeed!');
    });
	
    HOST_SIGNALING = process.env.SIGNALING_SERVER_HOST || 'localhost';
    PORT_SIGNALING = process.env.SIGNALING_SERVER_PORT || 8000;
	URI_SIGNALING = 'ws://'  + HOST_SIGNALING + ':' + PORT_SIGNALING;

    console.log('Signaling server URI to be used: ' + URI_SIGNALING);	
});

var docSchema = mongoose.Schema({
    docID: String,
    pwd: {}
});

var Docs = mongoose.model('Docs', docSchema);

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
app.use('/assets', express.static(__dirname + '/assets', { maxAge: 1 }));
app.use('/views', express.static(__dirname + '/views', { maxAge: 1 }));
app.use('/offline', express.static(__dirname + '/offline', { maxAge: 1 }));

// set .ejs as the default extension
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var server_session_id = createID();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;


var delay = 0;
var coordinator = new Coordinator(mongoose);
var infosUsersModule = new InfosUsersModule();
var socketIOAdapter = new SocketIOAdapter(io, coordinator, infosUsersModule, delay);
var peerIOAdapter = new PeerIOAdapter(io);
infosUsersModule.setNetwork(socketIOAdapter);
coordinator.setNetwork(socketIOAdapter);

var docs = {};
initListDocs();

function initListDocs() {
    var i;

    // Fetch all the documents stored in the DB
    Docs.find(function (err, storedDocs) {
        var doc;
        if(err) {
            return console.error(err);
        }
        console.log('storedDocs: ', storedDocs);
        if(storedDocs.length > 0) {
            for(i=0; i<storedDocs.length; i++) {
                docs[storedDocs[i].docID] = storedDocs[i].pwd;
            }
        }
        else {
            console.log('On add le doc par défaut');
            addDefaultDoc();
        }
        console.log('Docs existants : ', docs);
    });
}

function addDefaultDoc() {
    var doc = new Docs({ docID: 'demo', pwd: false });
    doc.markModified('pwd');
    doc.save();
    coordinator.addDoc('demo');
    doc.demo = false;
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

function validPassword(docID, pwd) {
    var success = true;

    if(docID.length === 0) {
        success = false;
    }
    else if(docs[docID] === null || docs[docID] === undefined) {
        // Access to an unknow document
        success = false;
    }
    else if(docs[docID] === false || docs[docID] !== bcrypt.compareSync(pwd, SALT)) {
        // Public document or wrong password
        success = false;
    }

    return success;
}

app.post('/rest/paroles/:docID/', function (req, res) {
    var parole = req.body.parole;
    var docID = req.params.docID;
    if(parole !== null && parole !== undefined) {
        socketIOAdapter.io.sockets.in(docID).emit('broadcastParole', { parole: parole });
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(200);
});

app.post('/ajax/verifyPwd', function (req, res) {
    var docID = req.body.docID;
    var pwd = req.body.pwd;
    var success = validPassword(docID, pwd);

    if(success) {
        res.cookie(docID, docs[docID], { signed: true });
    }
    res.send({ success: success });
});

app.post('/ajax/testConnection', function (req, res) {
    res.send({ OK: true });
});

app.get('/delay', function (req, res) {
    delay += 5000;
    socketIOAdapter.setDelay(delay);
    res.setHeader('Content-Type', 'text/html');
    res.redirect('/');
});

app.get('/listDocs', function (req, res) {
    coordinator.listDocs(function (list) {
        res.setHeader('Content-Type', 'text/html');
        res.send(list);
    });
});

// app.get('/getInfos', function (req, res) {
//     var infos = coordinator.getInfos();
//     res.setHeader('Content-Type', 'text/html');
//     res.send(infos);
// });

// app.get('/getInfosDemo', function (req, res) {
//     var infosDemo = coordinator.getInfos(['demo']);
//     res.setHeader('Content-Type', 'text/html');
//     res.send(infosDemo);
// });

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
            console.log('Message sent: ' + response.message);
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
        if(pwd.length > 0) {
            // Private
            docs[docID] = bcrypt.hashSync(pwd, SALT);
            res.cookie(docID, docs[docID], { signed: true });
        }
        else {
            docs[docID] = false;
        }

        var doc = new Docs({ docID: docID, pwd: docs[docID] });
        doc.markModified('pwd');
        doc.save(function (err, doc) {
            if (err)  {
                return console.error(err);
            }
            console.log('Save successful!');
        });

        coordinator.addDoc(docID);

        req.session.info = true;
        req.session.notificationTitle = 'Document created';
        req.session.msg = 'The document "' + docID + '" has correctly been created.';

        res.redirect('/doc/' + docID);
    }
    else {
        // Already existing
        req.session.error = true;
        req.session.notificationTitle = 'Document already existing';
        req.session.msg = 'A document with this name already exists. Please use the form at the top of the screen to access it if it\'s yours.';
        res.redirect('/');
    }
});

app.use(cacheManifest({
    manifestPath: '/mute.manifest',

    version: VERSION_MANIFEST,
    files: [
        {
            file: __dirname + '/assets/js/netflux.js',
            path: '/assets/js/netflux.js'
        },
        {
            file: __dirname + '/assets/js/bootstrap.min.js',
            path: '/assets/js/bootstrap.min.js'
        },
        {
            file: __dirname + '/assets/js/highlightjs.min.js',
            path: '/assets/js/highlightjs.min.js'
        },
        {
            file: __dirname + '/assets/js/jquery-ui.min.js',
            path: '/assets/js/jquery-ui.min.js'
        },
        {
            file: __dirname + '/assets/js/jquery-2.1.0.js',
            path: '/assets/js/jquery-2.1.0.js'
        },
        {
            file: __dirname + '/assets/js/mute.js',
            path: '/assets/js/mute.js'
        },
        {
            file: __dirname + '/assets/js/check-version.js',
            path: '/assets/js/check-version.js'
        },
        {
            file: __dirname + '/assets/js/editor-mode-manager.js',
            path: '/assets/js/editor-mode-manager.js'
        },
        {
            file: __dirname + '/assets/js/awareness-modules/hoverlink.js',
            path: '/assets/js/awareness-modules/hoverlink.js'
        },
        {
            file: __dirname + '/assets/js/dbjs/src/db.js',
            path: '/assets/js/dbjs/src/db.js'
        },
        {
            file: __dirname + '/assets/js/db-helper.js',
            path: '/assets/js/db-helper.js'
        },
        {
            dir: __dirname + '/assets/js/ace/src',
            prefix: '/assets/js/ace/src/'
        },
        {
            dir: __dirname + '/assets/js/mute-client/build',
            prefix: '/assets/js/mute-client/build/'
        },
        {
            dir: __dirname + '/assets/js/dbjs/src',
            prefix: '/assets/js/dbjs/src/'
        },
        {
            dir: __dirname + '/assets/css',
            prefix: '/assets/css/',
            ignore: function(x) { return /\/\./.test(x); }
        },
        {
            dir: __dirname + '/assets/fonts',
            prefix: '/assets/fonts/',
            ignore: function(x) { return /\/\./.test(x); }
        },
        {
            dir: __dirname + '/assets/img',
            prefix: '/assets/img/',
            ignore: function(x) { return /\/\./.test(x); }
        },
    ],
    networks: ['*'],
    fallbacks: ['/ /offline/list.html', '/doc /offline/doc.html']
}));

app.get('/list', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('list', { title: 'MUTE - Multi-User Text Editor', page: 'list' });
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
    var docID = req.query.docID;
    res.redirect('/doc/' + docID);
});

app.get('/doc/:docID/history', function (req, res) {
    var docID = req.params.docID;
    var privateDoc = false;
    var newDoc = false;
    var error = false;
    var info = false;
    var notificationTitle = '';
    var msg = '';

    // Doc doesn't exist
    if(docs[docID] === undefined) {
        req.session.error = true;
        req.session.notificationTitle = 'Document doesn\'t exist';
        req.session.msg = 'The document you tried to access doesn\'t exist. Please check the name of the doc you want to access.';

        res.redirect('/');
    }
    if(newDoc === false && docs[docID] !== false) {
        if(req.signedCookies[docID] !== docs[docID]) {
            // Private doc and not already authentified
            privateDoc = true;
        }
    }

    res.setHeader('Content-Type', 'text/html');
    res.render('history-viewer', { title: 'MUTE - Multi-User Text Editor', page: '', editorID: 'editor', lastModificationDateItemID: 'lastModificationDate', docID: req.params.docID, privateDoc: privateDoc, newDoc: newDoc, error: error, info: info, notificationTitle: notificationTitle, msg: msg });
});

app.get('/paroles/:docID', function (req, res) {
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

    // New doc
    if(docs[docID] === undefined) {
        newDoc = true;
        docs[docID] = false;

        var doc = new Docs({ docID: docID, pwd: false });
        doc.markModified('pwd');
        doc.save(function (err, doc) {
            if (err)  {
                return console.error(err);
            }
            console.log('Save successful!');
        });

        coordinator.addDoc(req.params.docID);
        info = true;
        notificationTitle = 'Document created';
        msg = 'The document "' + docID + '" has correctly been created.';
    }
    if(newDoc === false && docs[docID] !== false) {
        if(req.signedCookies[docID] !== docs[docID]) {
            // Private doc and not already authentified
            privateDoc = true;
        }
    }
    res.setHeader('Content-Type', 'text/html');
    res.render('paroles-editor', { title: 'MUTE - Multi-User Text Editor', page: '', editorID: 'editor', nbOperationsItemID: 'cnt', lastModificationDateItemID: 'lastModificationDate', docID: req.params.docID, link: fullUrl, privateDoc: privateDoc, newDoc: newDoc, error: error, info: info, notificationTitle: notificationTitle, msg: msg });
});

app.get('/doc/:docID', function (req, res) {
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

    // New doc
    if(docs[docID] === undefined) {
        newDoc = true;
        docs[docID] = false;

        var doc = new Docs({ docID: docID, pwd: false });
        doc.markModified('pwd');
        doc.save(function (err, doc) {
            if (err)  {
                return console.error(err);
            }
            console.log('Save successful!');
        });

        coordinator.addDoc(req.params.docID);
        info = true;
        notificationTitle = 'Document created';
        msg = 'The document "' + docID + '" has correctly been created.';
    }
    if(newDoc === false && docs[docID] !== false) {
        if(req.signedCookies[docID] !== docs[docID]) {
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

app.get('/peer/doc/:docID', function(req,res){
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

    // New doc
    if(docs[docID] === undefined) {
        newDoc = true;
        docs[docID] = false;
        peerIOAdapter.addDoc(docID);

        var doc = new Docs({ docID: docID, pwd: false });
        doc.markModified('pwd');
        doc.save(function (err, doc) {
            if (err) {
                return console.error(err);
            }
            console.log('Save successful!');
        });

        //coordinator.addDoc(req.params.docID);
        info = true;
        notificationTitle = 'Document created';
        msg = 'The document "' + docID + '" has correctly been created.';
    }
    if(newDoc === false && docs[docID] !== false) {
        if(req.signedCookies[docID] !== docs[docID]) {
            // Private doc and not already authentified
            privateDoc = true;
        }
    }
    res.setHeader('Content-Type', 'text/html');
    res.render('private-peer-editor', { title: 'MUTE - Multi-User Text Editor', page: '', editorID: 'editor', nbOperationsItemID: 'cnt', lastModificationDateItemID: 'lastModificationDate', docID: req.params.docID, link: fullUrl, privateDoc: privateDoc, newDoc: newDoc, error: error, info: info, notificationTitle: notificationTitle, msg: msg, signalingServerURI: URI_SIGNALING });
});
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.render('404', { title: 'MUTE - Multi-User Text Editor', page: '404'});
});

var options = {
    debug: true
};

var expresspeerserver = ExpressPeerServer(server, options);
app.use('/peerjs', expresspeerserver);

expresspeerserver.on('connection', function(id) {
    console.log('PEER JS SERVER CONNECTION');
    console.log(id);
});

server.listen( port, ipaddress, function() {
    console.log(new Date() + ': Server is listening on port ' + port);
});

console.log('-------- Le serveur a correctement démarré --------');
