/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
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
 * ***** END LICENSE BLOCK ***** */

__ace_shadowed__.define('ace/mode/ada', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/ada_highlight_rules', 'ace/range'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var AdaHighlightRules = require("./ada_highlight_rules").AdaHighlightRules;
var Range = require("../range").Range;

var Mode = function() ***REMOVED***
    this.HighlightRules = AdaHighlightRules;
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***

    this.lineCommentStart = "--";

    this.$id = "ace/mode/ada";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;

***REMOVED***);

__ace_shadowed__.define('ace/mode/ada_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var AdaHighlightRules = function() ***REMOVED***
var keywords = "abort|else|new|return|abs|elsif|not|reverse|abstract|end|null|accept|entry|select|" +
"access|exception|of|separate|aliased|exit|or|some|all|others|subtype|and|for|out|synchronized|" +
"array|function|overriding|at|tagged|generic|package|task|begin|goto|pragma|terminate|" +
"body|private|then|if|procedure|type|case|in|protected|constant|interface|until|" +
"|is|raise|use|declare|range|delay|limited|record|when|delta|loop|rem|while|digits|renames|with|do|mod|requeue|xor";

    var builtinConstants = (
        "true|false|null"
    );

    var builtinFunctions = (
        "count|min|max|avg|sum|rank|now|coalesce|main"
    );

    var keywordMapper = this.createKeywordMapper(***REMOVED***
        "support.function": builtinFunctions,
        "keyword": keywords,
        "constant.language": builtinConstants
***REMOVED*** "identifier", true);

    this.$rules = ***REMOVED***
        "start" : [ ***REMOVED***
            token : "comment",
            regex : "--.*$"
    ***REMOVED*** ***REMOVED***
            token : "string",           // " string
            regex : '".*?"'
    ***REMOVED*** ***REMOVED***
            token : "string",           // ' string
            regex : "'.*?'"
    ***REMOVED*** ***REMOVED***
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
    ***REMOVED*** ***REMOVED***
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
    ***REMOVED*** ***REMOVED***
            token : "keyword.operator",
            regex : "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
    ***REMOVED*** ***REMOVED***
            token : "paren.lparen",
            regex : "[\\(]"
    ***REMOVED*** ***REMOVED***
            token : "paren.rparen",
            regex : "[\\)]"
    ***REMOVED*** ***REMOVED***
            token : "text",
            regex : "\\s+"
    ***REMOVED*** ]
***REMOVED***;
***REMOVED***;

oop.inherits(AdaHighlightRules, TextHighlightRules);

exports.AdaHighlightRules = AdaHighlightRules;
***REMOVED***);