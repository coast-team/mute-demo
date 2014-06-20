define('ace/mode/lucene', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/lucene_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var LuceneHighlightRules = require("./lucene_highlight_rules").LuceneHighlightRules;

var Mode = function() ***REMOVED***
    this.HighlightRules = LuceneHighlightRules;
***REMOVED***;

oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.$id = "ace/mode/lucene";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);define('ace/mode/lucene_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var lang = require("../lib/lang");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var LuceneHighlightRules = function() ***REMOVED***
    this.$rules = ***REMOVED***
        "start" : [
            ***REMOVED***
                token : "constant.character.negation",
                regex : "[\\-]"
        ***REMOVED*** ***REMOVED***
                token : "constant.character.interro",
                regex : "[\\?]"
        ***REMOVED*** ***REMOVED***
                token : "constant.character.asterisk",
                regex : "[\\*]"
        ***REMOVED*** ***REMOVED***
                token: 'constant.character.proximity',
                regex: '~[0-9]+\\b'
        ***REMOVED*** ***REMOVED***
                token : 'keyword.operator',
                regex: '(?:AND|OR|NOT)\\b'
        ***REMOVED*** ***REMOVED***
                token : "paren.lparen",
                regex : "[\\(]"
        ***REMOVED*** ***REMOVED***
                token : "paren.rparen",
                regex : "[\\)]"
        ***REMOVED*** ***REMOVED***
                token : "keyword",
                regex : "[\\S]+:"
        ***REMOVED*** ***REMOVED***
                token : "string",           // " string
                regex : '".*?"'
        ***REMOVED*** ***REMOVED***
                token : "text",
                regex : "\\s+"
        ***REMOVED***
        ]
***REMOVED***;
***REMOVED***;

oop.inherits(LuceneHighlightRules, TextHighlightRules);

exports.LuceneHighlightRules = LuceneHighlightRules;
***REMOVED***);
