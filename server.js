#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');


/**
 *  Define the sample application.
 */
var SampleApp = function() ***REMOVED***

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() ***REMOVED***
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof self.ipaddress === "undefined") ***REMOVED***
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
    ***REMOVED***;
***REMOVED***;


    /**
     *  Populate the cache.
     */
    self.populateCache = function() ***REMOVED***
        if (typeof self.zcache === "undefined") ***REMOVED***
            self.zcache = ***REMOVED*** 'index.html': '' ***REMOVED***;
    ***REMOVED***

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
***REMOVED***;


    /**
     *  Retrieve entry (content) from cache.
     *  @param ***REMOVED***string***REMOVED*** key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) ***REMOVED*** return self.zcache[key]; ***REMOVED***;


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param ***REMOVED***string***REMOVED*** sig  Signal to terminate on.
     */
    self.terminator = function(sig)***REMOVED***
        if (typeof sig === "string") ***REMOVED***
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
    ***REMOVED***
        console.log('%s: Node server stopped.', Date(Date.now()) );
***REMOVED***;


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function()***REMOVED***
        //  Process on exit and signals.
        process.on('exit', function() ***REMOVED*** self.terminator(); ***REMOVED***);

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) ***REMOVED***
            process.on(element, function() ***REMOVED*** self.terminator(element); ***REMOVED***);
    ***REMOVED***);
***REMOVED***;


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() ***REMOVED***
        self.routes = ***REMOVED*** ***REMOVED***;

        self.routes['/asciimo'] = function(req, res) ***REMOVED***
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
    ***REMOVED***;

        self.routes['/'] = function(req, res) ***REMOVED***
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
    ***REMOVED***;
***REMOVED***;


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() ***REMOVED***
        self.createRoutes();
        self.app = express.createServer();

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) ***REMOVED***
            self.app.get(r, self.routes[r]);
    ***REMOVED***
***REMOVED***;


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() ***REMOVED***
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
***REMOVED***;


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() ***REMOVED***
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() ***REMOVED***
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
    ***REMOVED***);
***REMOVED***;

***REMOVED***;   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();

