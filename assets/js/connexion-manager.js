(function($) {
    $.fn.connexionManagerModule = function (options) {
    	/*
    	*	options : {
        *       coordinator
        *       network
        *       token
        *	}
    	*/

        $.fn.connexionManagerModule.defaultSettings = {
            coordinator: null,
            network: null,
            token: null
        };

        return this.each(function()
        {
            var elem = $(this);
            var _options = $.extend({}, $.fn.connexionManagerModule.defaultSettings, options || {});
            var module = new ConnexionManagerModule(_options, elem);
            elem.data('_connexionManagerModule', module);
        });
    }

    var ConnexionManagerModule = function (options, elem)
    {
        var _self = this;

        this.disposed = false;

        this.options = options;
        this.elem = elem;

        options.network.on('connect', function () {
            if(_self.disposed === false) {
                _self.onConnectHandler();
            }
        });

        options.network.on('disconnect', function () {
            if(_self.disposed === false) {
                _self.onDisconnectHandler();
            }
        });
        options.network.on('networkDisposed', function () {
            if(_self.disposed === false) {
                _self.onNetworkDisposedHandler();
            }
        });

        options.token.addClass('offline-ui');
        this.onDisconnectHandler();

        // make sure to return the object so we can reference it later
        return this;
    }

    ConnexionManagerModule.prototype.onConnectHandler = function() {
        var _self = this;
        this.options.token.removeClass('offline-ui-down').addClass('offline-ui-up').html('Online!');
        this.elem.html([
            '<span class="glyphicon glyphicon-log-out" ></span>',
            '&nbsp;Switch to offline mode'
        ].join('\n'))
        .off('click')
        .click(function () {
            _self.switchToOfflineMode();
        });
    };

    ConnexionManagerModule.prototype.onDisconnectHandler = function() {
        var _self = this;

        this.options.token.removeClass('offline-ui-up').addClass('offline-ui-down').html('Offline!');
        this.elem.html([
            '<span class="glyphicon glyphicon-log-in" ></span>',
            '&nbsp;Switch to online mode'
        ].join('\n'))
        .off('click')
        .click(function () {
            _self.switchToOnlineMode();
        });
    };

    ConnexionManagerModule.prototype.onNetworkDisposedHandler = function () {
        var key;
        var event;

        this.options.token.removeClass('offline-ui-up').addClass('offline-ui-down').html('Read only!');
        this.elem.html([
            '<span class="glyphicon glyphicon-log-in" ></span>',
            '&nbsp;Switch to online mode'
        ].join('\n'))
        .off('click')
        .prop('disabled', true);

        for(key in this) {
            if(this.hasOwnProperty(key) === true) {
                if(key === 'disposed') {
                    this.disposed = true;
                }
                else {
                    this[key] = null;
                }
            }
        }
    };

    ConnexionManagerModule.prototype.switchToOnlineMode = function () {
        this.options.coordinator.toOnlineMode();
        this.displayProgress('Connecting...');
    };

    ConnexionManagerModule.prototype.switchToOfflineMode = function () {
        this.options.coordinator.toOfflineMode();
        this.displayProgress('Disconnecting...');
    };

    ConnexionManagerModule.prototype.displayProgress = function (str) {
        this.elem.html([
            '<img src="/assets/img/ajax-loader.gif">',
            '&nbsp;'+str
        ].join('\n'))
        .off('click')
        .click(function () {
            // Nothing
            console.log('Nothing !');
        });
    };
}( jQuery ));