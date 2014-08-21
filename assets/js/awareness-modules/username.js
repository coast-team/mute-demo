(function($) { 
    $.fn.usernameModule = function (options) {
        /*
        *   options : {
        *       infosUsersModule
        *   }
        */

        var item = this;
        var timeoutUpdateUsername = null;
        var disposed = false;

        var updateUsername = function (username) {
            item.val($('<div/>').html(username).text());
        };

        var changeUsername = function () {
            // Encode the username to avoid some Javascript injections
            var username = $('<div/>').text(item.val()).html().trim();
            var regexp = /^[a-zA-Z0-9,]+(\s{0,1}[a-zA-Z0-9,])*$/
            var title = '';
            item.tooltip('destroy');
            if(username.length > 0 && username.length <= 20 && username.match(regexp) !== null) {
                title = 'Username updated!';
                if(timeoutUpdateUsername === null) {
                    timeoutUpdateUsername = setTimeout(function () {        
                        options.infosUsersModule.updateLocalUsername(username);
                        clearTimeout(timeoutUpdateUsername);
                        timeoutUpdateUsername = null;
                    }, 3000);  
                }
            }
            else if(username.length === 0) {
                title = 'The username can\'t be empty...';
            }
            else if(username.length > 20) {
                title = 'Too long... Choose a shorter username!';
            }
            else if(username.match(regexp) === null) {
                title = 'Please use only alphanumerics characters!';
            }
            item.tooltip({
                title: title,
                placement: 'bottom',
                trigger: 'manual'
            }).tooltip('show');
            setTimeout(function () {
                item.tooltip('hide');
            }, 3000);
        };


        var onInfosUsersModuleDisposedHandler = function () {
            disposed = true;
            item.prop('disabled', true);
        };

        options.infosUsersModule.on('changeLocalUsername', function (data) {
            if(disposed === false) {
                updateUsername(data.username);
            }
        });

        options.infosUsersModule.on('infosUsersModuleDisposed', function () {
            if(disposed === false) {
                onInfosUsersModuleDisposedHandler();
            }
        });

        updateUsername('Initializing...');

        this.keypress(function(e) {
                // Enter pressed?
                if(e.which === 10 || e.which === 13) {
                    changeUsername();
                }
         });

        return this;
    };
}( jQuery ));