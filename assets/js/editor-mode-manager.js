(function($) {
    $.fn.editorModeManagerModule = function (options) {
    	/*
    	*	options : {
        *       coordinator
        *       textEditorAdapter
        *       token
        *	}
    	*/

        $.fn.editorModeManagerModule.defaultSettings = {
            coordinator: null,
            textEditorAdapter: null,
            slider: null
        };

        return this.each(function()
        {
            var elem = $(this);
            var _options = $.extend({}, $.fn.editorModeManagerModule.defaultSettings, options || {});
            var module = new EditorModeManagerModule(_options, elem);
            elem.data('_editorModeManagerModule', module);
        });
    }

    var EditorModeManagerModule = function (options, elem) {
        var _self = this;

        this.options = options;
        this.elem = elem;
        this.min = 0;
        this.max = 0;
        this.current = 0;
        this.str = '';
        this.readOnlyMode = false;
        this.disposed = false;

        options.textEditorAdapter.on('readOnlyModeOn', function () {
            if(_self.disposed === false) {
                _self.onReadOnlyModeOnHandler();
            }
        });

        options.textEditorAdapter.on('readOnlyModeOff', function () {
            if(_self.disposed === false) {
                _self.onReadOnlyModeOffHandler();
            }
        });

        options.coordinator.on('updateHistoryScrollerRange', function (data) {
            if(_self.disposed === false) {
                _self.onUpdateHistoryScrollerRangeHandler(data);
            }
        });

        options.coordinator.on('coordinatorDisposed', function (data) {
            if(_self.disposed === false) {
                _self.onCoordinatorDisposedHandler(data);
            }
        });

        // make sure to return the object so we can reference it later
        return this;
    }

    EditorModeManagerModule.prototype.switching = function () {
        var _self = this;
        this.elem.html([
            '<img src="/assets/img/ajax-loader.gif">',
            '&nbsp;Switching...'
        ].join('\n'))
        .off('click')
        .click(function () {
            // Nothing
            console.log('Nothing !');
        });
    };

    EditorModeManagerModule.prototype.onReadOnlyModeOnHandler = function () {
        var _self = this;

        this.readOnlyMode = true;
        this.current = this.max;
        this.elem.html([
            '<span class="glyphicon glyphicon-pencil"></span>',
            '&nbsp;Switch to edition mode'
        ])
        .off('click')
        .click(function () {
            _self.switchToEditionMode();
        });

        this.str = this.options.coordinator.ropes.str;
        this.max = this.options.coordinator.getHistoryLength();
        this.current = this.max;
        this.options.token.slider({
            animate: true,
            value: this.current,
            min: 0,
            max: this.max,
            step: 1,
            slide: function(event, ui) {
                _self.update(ui.value); //changed
            }
        });
        $(this.options.token.selector+' a').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+this.current+' <span class="glyphicon glyphicon-chevron-right"></span></label>');
    };

    EditorModeManagerModule.prototype.onReadOnlyModeOffHandler = function () {
        var _self = this;
        this.readOnlyMode = false;

        this.elem.html([
            '<span class="glyphicon glyphicon-time"></span>',
            '&nbsp;Switch to history mode'
        ])
        .off('click')
        .click(function () {
            _self.switchToHistoryMode();
        });
        this.options.token.slider('destroy');
    };

    EditorModeManagerModule.prototype.switchToEditionMode = function () {
        this.options.textEditorAdapter.setText(this.options.coordinator.ropes.str);
        this.options.textEditorAdapter.toEditionMode();
    };

    EditorModeManagerModule.prototype.switchToHistoryMode = function () {
        this.options.textEditorAdapter.toHistoryMode();
    };

    EditorModeManagerModule.prototype.update = function (val) {
        if(this.current <= this.options.coordinator.getHistoryLength()) {
            this.str = this.options.coordinator.updateState(this.str, this.current, val);
        }  
        this.current = val;
        if(this.options.textEditorAdapter.isInHistoryMode()) {
            this.options.textEditorAdapter.setText(this.str);
        }
        $(this.options.token.selector+' a').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+this.current+' <span class="glyphicon glyphicon-chevron-right"></span></label>');
    };

    EditorModeManagerModule.prototype.onUpdateHistoryScrollerRangeHandler = function (data) {
        this.max = data.length;
    };

    EditorModeManagerModule.prototype.onCoordinatorDisposedHandler = function (data) {
        var event;
        var key;

        this.elem.html([
            '<span class="glyphicon glyphicon-time"></span>',
            '&nbsp;Switch to history mode'
        ])
        .off('click')
        .prop('disabled', true);

        if(this.readOnlyMode === true) {
            this.options.token.slider('destroy');
        }
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
}( jQuery ));