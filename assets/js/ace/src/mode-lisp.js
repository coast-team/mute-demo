/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 * ***** END LICENSE BLOCK ***** */

define('ace/mode/lisp', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/lisp_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var LispHighlightRules = require("./lisp_highlight_rules").LispHighlightRules;

var Mode = function() ***REMOVED***
    this.HighlightRules = LispHighlightRules;
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
       
    this.lineCommentStart = ";";
    
    this.$id = "ace/mode/lisp";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);


define('ace/mode/lisp_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var LispHighlightRules = function() ***REMOVED***
    var keywordControl = "case|do|let|loop|if|else|when";
    var keywordOperator = "eq|neq|and|or";
    var constantLanguage = "null|nil";
    var supportFunctions = "cons|car|cdr|cond|lambda|format|setq|setf|quote|eval|append|list|listp|memberp|t|load|progn";

    var keywordMapper = this.createKeywordMapper(***REMOVED***
        "keyword.control": keywordControl,
        "keyword.operator": keywordOperator,
        "constant.language": constantLanguage,
        "support.function": supportFunctions
***REMOVED*** "identifier", true);

    this.$rules = 
        ***REMOVED***
    "start": [
        ***REMOVED***
            token : "comment",
            regex : ";.*$"
    ***REMOVED***
        ***REMOVED***
            token: ["storage.type.function-type.lisp", "text", "entity.name.function.lisp"],
            regex: "(?:\\b(?:(defun|defmethod|defmacro))\\b)(\\s+)((?:\\w|\\-|\\!|\\?)*)"
    ***REMOVED***
        ***REMOVED***
            token: ["punctuation.definition.constant.character.lisp", "constant.character.lisp"],
            regex: "(#)((?:\\w|[\\\\+-=<>'\"&#])+)"
    ***REMOVED***
        ***REMOVED***
            token: ["punctuation.definition.variable.lisp", "variable.other.global.lisp", "punctuation.definition.variable.lisp"],
            regex: "(\\*)(\\S*)(\\*)"
    ***REMOVED***
        ***REMOVED***
            token : "constant.numeric", // hex
            regex : "0[xX][0-9a-fA-F]+(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
    ***REMOVED*** 
        ***REMOVED***
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
    ***REMOVED***
        ***REMOVED***
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
    ***REMOVED***
        ***REMOVED***
            token : "string",
            regex : '"(?=.)',
            next  : "qqstring"
    ***REMOVED***
    ],
    "qqstring": [
        ***REMOVED***
            token: "constant.character.escape.lisp",
            regex: "\\\\."
    ***REMOVED***
        ***REMOVED***
            token : "string",
            regex : '[^"\\\\]+'
    ***REMOVED*** ***REMOVED***
            token : "string",
            regex : "\\\\$",
            next  : "qqstring"
    ***REMOVED*** ***REMOVED***
            token : "string",
            regex : '"|$',
            next  : "start"
    ***REMOVED***
    ]
***REMOVED***

***REMOVED***;

oop.inherits(LispHighlightRules, TextHighlightRules);

exports.LispHighlightRules = LispHighlightRules;
***REMOVED***);
