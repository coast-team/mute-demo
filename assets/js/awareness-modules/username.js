(function($) { 
    $.fn.UsernameModule = function (options) {
        /*
        *   options : {
        *       infosUsersModule
        *   }
        */

        var item = this;

        var updateUsername = function (username) {
            item.val($('<div/>').html(username).text());
        };

        options.infosUsersModule.on('changeLocalUsername', function (data) {
            updateUsername(data.username);
        });

        updateUsername('Initializing...');

        return this;
    };
}( jQuery ));