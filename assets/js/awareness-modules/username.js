(function($) ***REMOVED*** 
    $.fn.UsernameModule = function (options) ***REMOVED***
        /*
        *   options : ***REMOVED***
        *       infosUsersModule
        *   ***REMOVED***
        */

        var item = this;
        var timeoutUpdateUsername = null;

        var updateUsername = function (username) ***REMOVED***
            item.val($('<div/>').html(username).text());
    ***REMOVED***;

        var changeUsername = function () ***REMOVED***
            // Encode the username to avoid some Javascript injections
            var username = $('<div/>').text(item.val()).html().trim();
            var regexp = /^[a-zA-Z0-9,]+(\s***REMOVED***0,1***REMOVED***[a-zA-Z0-9,])*$/
            var title = '';
            item.tooltip('destroy');
            if(username.length > 0 && username.length <= 20 && username.match(regexp) !== null) ***REMOVED***
                title = 'Username updated!';
                if(timeoutUpdateUsername === null) ***REMOVED***
                    timeoutUpdateUsername = setTimeout(function () ***REMOVED***        
                        options.infosUsersModule.updateLocalUsername(username);
                        clearTimeout(timeoutUpdateUsername);
                        timeoutUpdateUsername = null;
                ***REMOVED*** 3000);  
            ***REMOVED***
        ***REMOVED***
            else if(username.length === 0) ***REMOVED***
                title = 'The username can\'t be empty...';
        ***REMOVED***
            else if(username.length > 20) ***REMOVED***
                title = 'Too long... Choose a shorter username!';
        ***REMOVED***
            else if(username.match(regexp) === null) ***REMOVED***
                title = 'Please use only alphanumerics characters!';
        ***REMOVED***
            item.tooltip(***REMOVED***
                title: title,
                placement: 'bottom',
                trigger: 'manual'
        ***REMOVED***).tooltip('show');
            setTimeout(function () ***REMOVED***
                item.tooltip('hide');
        ***REMOVED*** 3000);
    ***REMOVED***;


        options.infosUsersModule.on('changeLocalUsername', function (data) ***REMOVED***
            updateUsername(data.username);
    ***REMOVED***);

        updateUsername('Initializing...');

        this.keypress(function(e) ***REMOVED***
                // Enter pressed?
                if(e.which === 10 || e.which === 13) ***REMOVED***
                    changeUsername();
            ***REMOVED***
     ***REMOVED***);

        return this;
***REMOVED***;
***REMOVED***( jQuery ));