(function($) ***REMOVED*** 
    $.fn.nameModule = function (options) ***REMOVED***
        /*
        * coordinator,
        * network,
        * serverDB
        */

        var item = this;

        var updateName = function (name) ***REMOVED***
            item.html(name);
    ***REMOVED***;

        // TODO: get name at the init
        serverDB.models.query()
        .filter('docID', options.coordinator.docID)
        .execute()
        .done(function (results) ***REMOVED***
            var name;

            if(results.length > 0) ***REMOVED***
                name = results[0].name;
                item.html(name);
        ***REMOVED***
    ***REMOVED***);

        network.on('updateName', function (data) ***REMOVED***
            
    ***REMOVED***);

        updateName('Unknown user');

        return this;
***REMOVED***;
***REMOVED***( jQuery ));