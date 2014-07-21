(function($) ***REMOVED*** 
    $.fn.UsernameModule = function (options) ***REMOVED***
        /*
        *   options : ***REMOVED***
        *       infosUsersModule
        *   ***REMOVED***
        */

        var item = this;

        var updateUsername = function (username) ***REMOVED***
            item.val($('<div/>').html(username).text());
    ***REMOVED***;

        options.infosUsersModule.on('changeLocalUsername', function (data) ***REMOVED***
            updateUsername(data.username);
    ***REMOVED***);

        updateUsername('Initializing...');

        return this;
***REMOVED***;
***REMOVED***( jQuery ));