var ***REMOVED*** each, map ***REMOVED*** = require('sjs:sequence');
var ***REMOVED*** get ***REMOVED*** = require('sjs:http');

function foo(items, nada) ***REMOVED***
    var component = ***REMOVED*** name: "Ace", role: "Editor" ***REMOVED***;
    console.log("
        Welcome, #***REMOVED***component.name***REMOVED***
    ".trim());

    logging.debug(`Component added: $String(component) ($***REMOVED***component***REMOVED***)`);

    console.log(`
        Welcome, ***REMOVED***$***REMOVED***function() ***REMOVED***
            return ***REMOVED*** x: 1, y: "why?***REMOVED***"***REMOVED***;
    ***REMOVED***()***REMOVED***
    `.trim());

    waitfor ***REMOVED***
        items .. each.par ***REMOVED*** |item|
            get(item);
    ***REMOVED***
***REMOVED*** and ***REMOVED***
        var lengths = items .. map(i -> i.length);
***REMOVED*** or ***REMOVED***
        hold(1500);
        throw new Error("timed out");
***REMOVED***
***REMOVED***	// Real Tab.
