(function($) {
    $.fn.parolesModule = function (options) {
    	/*
    	*	options : {
		*		network,
        *       display,
        *       mode
        *       modeSwitch
    	*	}
    	*/

        $.fn.parolesModule.defaultSettings = {
            network : null,
            textEditorAdapter  : null,
            display : 'list',
            mode : 'validation',
            modeSwitch: null
        };

        return this.each(function()
        {
            var elem = $(this);
            var _options = $.extend({}, $.fn.parolesModule.defaultSettings, options || {});
            var module = new ParolesModule(_options, elem);
        });
    }

    var ParolesModule = function (options, elem)
    {
        console.log('this: ', this);
        var _self = this;
        var checked = true;

        this.options = options;
        this.elem = elem;
        this.cnt = 0;

        options.network.on('receiveParole', function (data) {
            console.log('_self: ', _self);
            if(_self.options.mode === 'validation') {
                _self.updateParolesList(data);  
            }
            else if(_self.options.mode === 'direct') {
                _self.insertParoleIntoEditor(data.parole);
            }
        });

        if(options.display === 'block') {
            var html = [
                '<li class="list-group-item" id="parole-block" style="max-height: 300px; overflow-y: scroll;">',
                '</li>',
                '<li class="list-group-item">',
                '<center>',
                '<button type="button" id="parole-btn" class="btn btn-primary">',
                'Add selection',
                '</button>',
                '</center>',
                '</li>'
            ].join('\n');
            elem.append(html);
            $('#parole-btn').click(function () {
                var selection = window.getSelection();
                var parole;

                if(selection.type === 'Range') {
                    parole = selection.toString();
                    _self.insertParoleIntoEditor(parole);
                }
                
            });
        }
        
        if(options.mode === 'direct') {
            checked = false;
        }

        $('#'+options.modeSwitch).prop('data-toggle', 'tooltip')
        .prop('data-placement', 'bottom')
        .prop('title', 'Enable/disable the paroles\' validation')
        .prop('checked', checked)
        .tooltip()
        .click(function () {
            var checked = $('#'+options.modeSwitch).prop('checked');
            _self.switchMode(checked);
        });

        // make sure to return the object so we can reference it later
        return this;
    }

    ParolesModule.prototype.updateParolesList = function (data) {
        var _self = this;
        var parole = data.parole;
        var cnt;

        if(this.options.display === 'list') {
            this.cnt++;
            cnt = this.cnt;
            this.elem.append(this.generateParolesListHTML(parole));
            $('#parole-btn-insert-'+cnt).tooltip({
                placement: 'top',
                title: 'Insert the entry into the editor.',
            }).click(function () {
                _self.insertParoleIntoEditor(parole);
            });
            $('#parole-btn-remove-'+cnt).tooltip({
                placement: 'top',
                title: 'Delete the entry.',
            }).click(function () {
                console.log('On tente de supprimer: ', cnt);
                _self.removeParole(cnt);
            });
        }
        else if(this.options.display === 'block') {
            $('#parole-block').append(this.generateParolesListHTML(parole));
        }
        
    };

    ParolesModule.prototype.generateParolesListHTML = function (parole) {
        var html;
        if(this.options.display === 'list') {
            html = [
                '<li id="parole-list-item-'+this.cnt+'" class="list-group-item">',
                '<div class="row">',
                '<div class="col-md-4" style="padding-right: 0px;">',
                '<div class="btn-group">',
                '<button type="button" id="parole-btn-insert-'+this.cnt+'" class="btn btn-default">',
                '<span class="glyphicon glyphicon-arrow-left"></span>',
                '</button>',
                '<button type="button" id="parole-btn-remove-'+this.cnt+'" class="btn btn-default">',
                '<span class="glyphicon glyphicon-trash" style="color: rgb(209, 91, 71);"></span>',
                '</button>',
                '</div>',
                '</div>',
                '<div class="col-md-8">'+parole+'</div>',
                '</div>',
                '</li>'
            ].join('\n');
        }
        else if(this.options.display === 'block') {
            html = parole;
        }
        return html;
    };

    ParolesModule.prototype.insertParoleIntoEditor = function (parole) {
        this.options.textEditorAdapter.editor.insert(parole);
    };
    
    ParolesModule.prototype.removeParole = function (cnt) {
        $('#parole-list-item-'+cnt).fadeOut(function () {
            $('#parole-list-item-'+cnt).remove();
        });
    };

    ParolesModule.prototype.switchMode = function (checked) {
        if(checked === true) {
            this.toValidationMode();
        }
        else if(checked === false) {
            this.toDirectMode();
        }
    };

    ParolesModule.prototype.toValidationMode = function () {
        this.options.mode = 'validation';
    };

    ParolesModule.prototype.toDirectMode = function () {
        this.options.mode = 'direct';
    };

}( jQuery ));