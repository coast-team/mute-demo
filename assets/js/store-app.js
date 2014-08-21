(function($) {
    $.fn.storeAppModule = function (options) {
    	/*
    	*	options : {
    	*	}
    	*/

        $.fn.storeAppModule.defaultSettings = {
        };

        return this.each(function()
        {
            var elem = $(this);
            var _options = $.extend({}, $.fn.storeAppModule.defaultSettings, options || {});
            var module = new storeAppModule(_options, elem);
            elem.data('_storeAppModule', module);
        });
    }

    var storeAppModule = function (options, elem)
    {
        var _self = this;

        this.options = options;
        this.elem = elem;
        this.iframeAdded = false;
        this.setDefaultTimeout = null;

        this.elem.click(function () {
            _self.updateAppCache();
        });

        // make sure to return the object so we can reference it later
        return this;
    }

    storeAppModule.prototype.handleNoUpdate = function () {
        this.elem.attr('onclick', '');
        this.elem.html('<span class="glyphicon glyphicon-download"></span>&nbsp;No update needed!');
        this.setElemToDefault();
    };

    storeAppModule.prototype.handleDownloading  = function () {
        this.elem.attr('onclick', '');
        this.elem.html('<img src="/assets/img/ajax-loader.gif">&nbsp;Downloading...');
    }

    storeAppModule.prototype.handleCached  = function () {
        this.elem.html('<span class="glyphicon glyphicon-download"></span>&nbsp;Cached!');
        this.setElemToDefault();
    }

    storeAppModule.prototype.handleUpdateReady  = function () {
        $('#iframeAppCache')[0].contentWindow.applicationCache.swapCache();
        this.elem.html('<span class="glyphicon glyphicon-download"></span>&nbsp;Updated!');
        this.setElemToDefault();
    }

    storeAppModule.prototype.setElemToDefault  = function () {
        var _self = this;
        if(this.setDefaultTimeout === null) {
            this.setDefaultTimeout = setTimeout(function () {
                _self.elem.click(function () {
                    _self.updateAppCache();
                });
                _self.elem.html('<span class="glyphicon glyphicon-download"></span>&nbsp;Store app')
                clearTimeout(_self.setDefaultTimeout);
                _self.setDefaultTimeout = null;
            }, 3000);
        }
    }

    storeAppModule.prototype.updateAppCache  = function () {
        if(this.iframeAdded === false) {
            this.iframeAdded = true;
            $('body').prepend('<iframe id="iframeAppCache" src="/offline/list.html#iframed" style="position:absolute;top:-999em;visibility:hidden"></iframe>');
        }
        else {
            $('#iframeAppCache')[0].contentWindow.applicationCache.update();
        }
    }
}( jQuery ));