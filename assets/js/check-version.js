(function($) {
    $.fn.checkVersionModule = function (options) {
    	/*
    	*	options : {
        *       docID
        *       coordinator
        *       editor
        *       network
        *       serverDB
        *       timeInterval
        *       toDisabled: list of item which will be switched to disabled
        *       toReadOnly: list of item which will be switched to read only
        *	}
    	*/

        $.fn.checkVersionModule.defaultSettings = {
            docID: 'demo',
            coordinator: null,
            serverDB: null,
            timeInterval: 3000,
            toDisabled: []
        };

        return this.each(function()
        {
            var elem = $(this);
            var _options = $.extend({}, $.fn.checkVersionModule.defaultSettings, options || {});
            var module = new CheckVersionModule(_options, elem);
            elem.data('_checkVersionModule', module);
        });
    }

    var CheckVersionModule = function (options, elem)
    {
        var _self = this;

        this.options = options;
        this.elem = elem;
        this.version = null;
        this.interval = null;

        this.getVersion();

        // make sure to return the object so we can reference it later
        return this;
    }

    CheckVersionModule.prototype.getVersion = function () {
        var _self = this;

        this.options.serverDB.docs.query()
        .filter('docID', this.options.docID)
        .execute()
        .done(function (results) {
            var doc;
            if(results.length === 0) {
                _self.version = 1;
                doc = {
                    docID: _self.options.docID,
                    version: 1
                };
                serverDB.docs.add(doc)
                .done(function (item) {
                    _self.checkVersion();
                });
            }
            else {
                _self.version = results[0].version + 1;
                serverDB.docs.query()
                .filter('docID', _self.options.docID)
                .modify({ version: _self.version })
                .execute()
                .done(function (results) {
                    _self.checkVersion();
                });
            }
        });
    }

    CheckVersionModule.prototype.checkVersion = function () {
        var _self = this;

        this.interval = setInterval(function () {
            _self.options.serverDB.docs.query()
            .filter('docID', _self.options.docID)
            .execute()
            .done(function (results) {
                if(results.length === 1) {
                    if(results[0].version !== _self.version) {
                        clearInterval(_self.interval);
                        _self.disablePage();
                    }
                }
            });
        }, this.options.timeInterval);
    };

    CheckVersionModule.prototype.disablePage = function () {
        var event;
        var key;

        //this.showModal();
        this.displayWarning();

        this.options.toDisabled.map(function (item) {
            $('#'+item).prop('disabled', true);
        });

        this.options.coordinator.dispose();

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

    CheckVersionModule.prototype.showModal = function () {
        var html = [ 
            '<div id="check-version-modal" class="modal fade">',
            '<div class="modal-dialog">',
            '<div class="modal-content">',
            '<div class="modal-header">',
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
            '<h4 id="check-version-modal-title" class="modal-title">Open in a new tab</h4>',
            '</div>',
            '<div class="modal-body">',
            '<p id="check-version-modal-content" class="lead">',
            'This document has been opened in another tab/window. In order to avoid some mischievous bugs, you can no longer edit this document using this tab/window. Please go back to your documents list.',
            '</p>',
            '</div>',
            '<div class="modal-footer">',
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
            '<a href="/list" type="button" class="btn btn-primary">',
            '<span class="glyphicon glyphicon-list"></span>',
            'Documents list',
            '</a>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join('\n');
        $('body').append(html);
        $('#check-version-modal').modal('show');
    };

    CheckVersionModule.prototype.displayWarning = function () {
        this.elem.html('This document has been opened in another tab/window. In order to avoid some mischievous bugs, you can no longer edit this document using this tab/window. Please go back to your documents list.')
        .addClass('alert alert-danger');
    };
}( jQuery ));