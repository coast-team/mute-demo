(function($) {
    $.fn.voiceRecognitionModule = function (options) {
    	/*
    	*	options : {
        *       textEditorAdapter,
        *       lang,
        *       langSelect,
        *       mode,
        *       modeSwitch
    	*	}
    	*/

        $.fn.voiceRecognitionModule.defaultSettings = {
            textEditorAdapter: null,
            lang: 'en-US',
            langSelect: null,
            mode: 'validation',
            modeSwitch: null
        };

        return this.each(function()
        {
            var elem = $(this);
            var _options = $.extend({}, $.fn.voiceRecognitionModule.defaultSettings, options || {});
            var module = new VoiceRecognitionModule(_options, elem);
        });
    }

    var VoiceRecognitionModule = function (options, elem)
    {
        var _self = this;
        var checked = true;
        var args;
        var langs;
        var lang;
        var html = [ 
            '<div id="voice-recognition-modal" class="modal fade">',
            '<div class="modal-dialog">',
            '<div class="modal-content">',
            '<div class="modal-header">',
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
            '<h4 id="voice-recognition-modal-title" class="modal-title"></h4>',
            '</div>',
            '<div class="modal-body">',
            '<p id="voice-recognition-modal-content"></p>',
            '</div>',
            '<div class="modal-footer">',
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join('\n');
        $('body').append(html);

        this.options = options;
        this.elem = elem;
        this.disposed = false;

        if(options.mode === 'direct') {
            checked = false;
        }

        $('#'+options.modeSwitch).prop('data-toggle', 'tooltip')
        .prop('data-placement', 'bottom')
        .prop('title', 'Ask confirmation before insert the recognized text into the document.')
        .prop('checked', checked)
        .tooltip()
        .click(function () {
            var checked = $('#'+options.modeSwitch).prop('checked');
            _self.switchMode(checked);
        });

        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = true;

            this.elem.tooltip();

            this.onEndHandler();

            if(this.options.langSelect !== null && this.options.langSelect !== undefined) {
                var langs = {
                    'Afrikaans': 'af-ZA',
                    'Bahasa Indonesia': 'id-ID',
                    'Bahasa Melayu': 'ms-MY',
                    'Català': 'ca-ES',
                    'Čeština': 'cs-CZ',
                    'Deutsch': 'de-DE',
                    'English UK': 'en-GB',
                    'English US': 'en-US',
                    'Español': 'es-ES',
                    'Euskara': 'eu-ES',
                    'Français': 'fr-FR',
                    'Galego': 'gl-ES',
                    'Hrvatski': 'hr_HR',
                    'IsiZulu': 'zu-ZA',
                    'Íslenska': 'is-IS',
                    'Italiano': 'it-IT',
                    'Magyar': 'hu-HU',
                    'Nederlands': 'nl-NL',
                    'Norsk bokmål': 'nb-NO',
                    'Polski': 'pl-PL',
                    'Português': 'pt-PT',
                    'Română': 'ro-RO',
                    'Slovenčina': 'sk-SK',
                    'Suomi': 'fi-FI',
                    'Svenska': 'sv-SE',
                    'Türkçe': 'tr-TR',
                    'български': 'bg-BG',
                    'Pусский': 'ru-RU',
                    'Српски': 'sr-RS',
                    '한국어': 'ko-KR',
                    '普通话 (中国大陆)': 'cmn-Hans-CN',
                    '日本語': 'ja-JP',
                    'Lingua latīna': 'la'
                };
                for(lang in langs) {
                    $('#'+this.options.langSelect).append([
                        '<option value="'+langs[lang]+'">',
                        lang,
                        '</option>'
                    ].join('\n'));
                }
                $('#'+this.options.langSelect).prop('selectedIndex', 7)
                .change(function () {
                    var lang = $('#'+_self.options.langSelect).val();
                    _self.changeLang(lang);
                });
            };

            this.recognition.onstart = function () {
                if(_self.disposed === false) {
                    _self.onStartHandler();
                }
            };

            this.recognition.onresult = function(event) {
                if(_self.disposed === false) {
                    console.log('Results are coming');
                    var results = '';
                    for (var i = event.resultIndex; i < event.results.length; ++i) {
                        console.log('Result: ', event.results[i][0].transcript);
                        results += event.results[i][0].transcript;
                    }
                    if(_self.options.mode === 'validation') {
                        _self.send(results);  
                    }
                    else if(_self.options.mode === 'direct') {
                        _self.insertIntoEditor(results);
                    }
                }
            };

            this.recognition.onerror = function(event) {
                if(_self.disposed === false) {
                    console.log('Dans onError');
                    _self.onErrorHandler(event);
                }
            };

            this.recognition.onend = function() {
                if(_self.disposed === false) {
                    console.log('Dans onEnd');
                    _self.onEndHandler();
                }
            };
            
            this.recognition.lang = this.options.lang;
        }
        else {
            this.elem.tooltip({
                title: 'Not supported by your current browser...'
            }).html([
                '<i class="fa fa-microphone-slash fa-lg" style="color:rgb(209, 91, 71);"></i>'
            ].join('\n'));
            var title = 'Browser incompatible';
            var content = 'Sorry, your browser does not support the voice recognition system. Please install <a href="https://www.google.com/intl/en/chrome/browser/">Google Chrome</a> if you want to use it.';
            this.showModal(title, content);

        }

        this.options.textEditorAdapter.on('textEditorAdapterDisposed', function () {
            if(_self.disposed === false) {
                _self.onTextEditorAdapterDisposedHandler();
            }
        });

        // make sure to return the object so we can reference it later
        return this;
    }

    VoiceRecognitionModule.prototype.showModal = function (title, content) {
        $('#voice-recognition-modal-title').html(title)
        $('#voice-recognition-modal-content').html(content);
        $('#voice-recognition-modal').modal('show');
    };

    VoiceRecognitionModule.prototype.startRecognition = function () {
        this.recognition.start();
    };

    VoiceRecognitionModule.prototype.stopRecognition = function () {
        this.recognition.stop();
    };

    VoiceRecognitionModule.prototype.onStartHandler = function () {
        var _self = this;

        this.elem.tooltip('destroy')
        .tooltip({
            title: 'Stop the voice recognition system.'
        }).html([
            '<i class="fa fa-microphone fa-lg" style="color:#33cc33;"></i>'
        ].join('\n'));
        this.elem.off('click');
        this.elem.click(function () {
            _self.stopRecognition();
        });
        if(this.options.langSelect !== null && this.options.langSelect !== undefined) {
            $('#'+this.options.langSelect).prop('disabled', true);
        }
    };

    VoiceRecognitionModule.prototype.onErrorHandler = function (event) {
        console.log('Une erreur est survenue: ', event);
        var title;
        var content;
        // TODO: gérer les erreurs possibles
        // no-speech
        switch(event.error) {
            case 'not-allowed':
                this.elem.tooltip({
                    title: 'The voice recognition system isn\'t allowed to start...'
                }).html([
                    '<i class="fa fa-microphone-slash fa-lg" style="color:rgb(209, 91, 71);"></i>'
                ].join('\n'));
                title = 'Not allowed';
                content = 'Permission to use microphone is blocked. To change, go to <a>chrome://settings/contentExceptions#media-stream</a> .';
                this.showModal(title, content);
                break;
            case 'no-speech':
                break;
        }
        this.onEndHandler();
    };

    VoiceRecognitionModule.prototype.onEndHandler = function () {
        var _self = this;
        
        this.elem.tooltip('destroy')
        .tooltip({
            title: 'Start the voice recognition system.'
        }).html([
            '<i class="fa fa-microphone-slash fa-lg" style="color:rgb(209, 91, 71);"></i>'
        ].join('\n'));
        this.elem.off('click');
        this.elem.click(function () {
            _self.startRecognition();
        });
        if(this.options.langSelect !== null && this.options.langSelect !== undefined) {
            $('#'+this.options.langSelect).prop('disabled', false);
        }
    };

    VoiceRecognitionModule.prototype.changeLang = function (lang) {
        this.recognition.lang = lang;
    };

    VoiceRecognitionModule.prototype.send = function (results) {
        var docID = location.href.substr(location.href.lastIndexOf('/') + 1);
        console.log('On envoie les résultats');
        $.post('/rest/paroles/'+docID+'/', {
            parole: results
        });
    };

    VoiceRecognitionModule.prototype.insertIntoEditor = function (results) {
        this.options.textEditorAdapter.editor.insert(results);
    };

    VoiceRecognitionModule.prototype.switchMode = function (checked) {
        if(checked === true) {
            this.toValidationMode();
        }
        else if(checked === false) {
            this.toDirectMode();
        }
    };

    VoiceRecognitionModule.prototype.toValidationMode = function () {
        this.options.mode = 'validation';
    };

    VoiceRecognitionModule.prototype.toDirectMode = function () {
        this.options.mode = 'direct';
    };

    VoiceRecognitionModule.prototype.onTextEditorAdapterDisposedHandler = function () {
        var key;
        var events;

        this.stopRecognition();
        this.elem.html([
            '<i class="fa fa-microphone-slash fa-lg" style="color:rgb(209, 91, 71);"></i>'
        ].join('\n'))
        .prop('disabled', true)
        .off('click');
        
        $('#'+this.options.modeSwitch).prop('disabled', true);
        $('#'+this.options.langSelect).prop('disabled', true);

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