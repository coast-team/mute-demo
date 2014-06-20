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
 * Contributor(s):
 * 
 *
 *
 * ***** END LICENSE BLOCK ***** */

__ace_shadowed__.define('ace/mode/makefile', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/makefile_highlight_rules', 'ace/mode/folding/coffee'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var MakefileHighlightRules = require("./makefile_highlight_rules").MakefileHighlightRules;
var FoldMode = require("./folding/coffee").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = MakefileHighlightRules;
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
       
    this.lineCommentStart = "#";    
    this.$indentWithTabs = true;
    
    this.$id = "ace/mode/makefile";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);__ace_shadowed__.define('ace/mode/makefile_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules', 'ace/mode/sh_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var ShHighlightFile = require("./sh_highlight_rules");

var MakefileHighlightRules = function() ***REMOVED***

    var keywordMapper = this.createKeywordMapper(***REMOVED***
        "keyword": ShHighlightFile.reservedKeywords,
        "support.function.builtin": ShHighlightFile.languageConstructs,
        "invalid.deprecated": "debugger"
***REMOVED*** "string");

    this.$rules = 
        ***REMOVED***
    "start": [
        ***REMOVED***
            token: "string.interpolated.backtick.makefile",
            regex: "`",
            next: "shell-start"
    ***REMOVED***
        ***REMOVED***
            token: "punctuation.definition.comment.makefile",
            regex: /#(?=.)/,
            next: "comment"
    ***REMOVED***
        ***REMOVED***
            token: [ "keyword.control.makefile"],
            regex: "^(?:\\s*\\b)(\\-??include|ifeq|ifneq|ifdef|ifndef|else|endif|vpath|export|unexport|define|endef|override)(?:\\b)"
    ***REMOVED***
        ***REMOVED***// ^([^\t ]+(\s[^\t ]+)*:(?!\=))\s*.*
            token: ["entity.name.function.makefile", "text"],
            regex: "^([^\\t ]+(?:\\s[^\\t ]+)*:)(\\s*.*)"
    ***REMOVED***
    ],
    "comment": [
        ***REMOVED***
            token : "punctuation.definition.comment.makefile",
            regex : /.+\\/
    ***REMOVED***
        ***REMOVED***
            token : "punctuation.definition.comment.makefile",
            regex : ".+",
            next  : "start"
    ***REMOVED***
    ],
    "shell-start": [
        ***REMOVED***
            token: keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
    ***REMOVED*** 
        ***REMOVED***
            token: "string",
            regex : "\\w+"
    ***REMOVED*** 
        ***REMOVED***
            token : "string.interpolated.backtick.makefile",
            regex : "`",
            next  : "start"
    ***REMOVED***
    ]
***REMOVED***

***REMOVED***;

oop.inherits(MakefileHighlightRules, TextHighlightRules);

exports.MakefileHighlightRules = MakefileHighlightRules;
***REMOVED***);

__ace_shadowed__.define('ace/mode/sh_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var reservedKeywords = exports.reservedKeywords = (
        '!|***REMOVED***|***REMOVED***|case|do|done|elif|else|'+
        'esac|fi|for|if|in|then|until|while|'+
        '&|;|export|local|read|typeset|unset|'+
        'elif|select|set'
    );

var languageConstructs = exports.languageConstructs = (
    '[|]|alias|bg|bind|break|builtin|'+
     'cd|command|compgen|complete|continue|'+
     'dirs|disown|echo|enable|eval|exec|'+
     'exit|fc|fg|getopts|hash|help|history|'+
     'jobs|kill|let|logout|popd|printf|pushd|'+
     'pwd|return|set|shift|shopt|source|'+
     'suspend|test|times|trap|type|ulimit|'+
     'umask|unalias|wait'
);

var ShHighlightRules = function() ***REMOVED***
    var keywordMapper = this.createKeywordMapper(***REMOVED***
        "keyword": reservedKeywords,
        "support.function.builtin": languageConstructs,
        "invalid.deprecated": "debugger"
***REMOVED*** "identifier");

    var integer = "(?:(?:[1-9]\\d*)|(?:0))";

    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" +  intPart + ")" + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";
    var fileDescriptor = "(?:&" + intPart + ")";

    var variableName = "[a-zA-Z][a-zA-Z0-9_]*";
    var variable = "(?:(?:\\$" + variableName + ")|(?:" + variableName + "=))";

    var builtinVariable = "(?:\\$(?:SHLVL|\\$|\\!|\\?))";

    var func = "(?:" + variableName + "\\s*\\(\\))";

    this.$rules = ***REMOVED***
        "start" : [***REMOVED***
            token : "constant",
            regex : /\\./
    ***REMOVED*** ***REMOVED***
            token : ["text", "comment"],
            regex : /(^|\s)(#.*)$/
    ***REMOVED*** ***REMOVED***
            token : "string",
            regex : '"',
            push : [***REMOVED***
                token : "constant.language.escape",
                regex : /\\(?:[$abeEfnrtv\\'"]|x[a-fA-F\d]***REMOVED***1,2***REMOVED***|u[a-fA-F\d]***REMOVED***4***REMOVED***([a-fA-F\d]***REMOVED***4***REMOVED***)?|c.|\d***REMOVED***1,3***REMOVED***)/
        ***REMOVED*** ***REMOVED***
                token : "constant",
                regex : /\$\w+/
        ***REMOVED*** ***REMOVED***
                token : "string",
                regex : '"',
                next: "pop"
        ***REMOVED*** ***REMOVED***
                defaultToken: "string"
        ***REMOVED***]
    ***REMOVED*** ***REMOVED***
            token : "variable.language",
            regex : builtinVariable
    ***REMOVED*** ***REMOVED***
            token : "variable",
            regex : variable
    ***REMOVED*** ***REMOVED***
            token : "support.function",
            regex : func
    ***REMOVED*** ***REMOVED***
            token : "support.function",
            regex : fileDescriptor
    ***REMOVED*** ***REMOVED***
            token : "string",           // ' string
            start : "'", end : "'"
    ***REMOVED*** ***REMOVED***
            token : "constant.numeric", // float
            regex : floatNumber
    ***REMOVED*** ***REMOVED***
            token : "constant.numeric", // integer
            regex : integer + "\\b"
    ***REMOVED*** ***REMOVED***
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
    ***REMOVED*** ***REMOVED***
            token : "keyword.operator",
            regex : "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|~|<|>|<=|=>|=|!="
    ***REMOVED*** ***REMOVED***
            token : "paren.lparen",
            regex : "[\\[\\(\\***REMOVED***]"
    ***REMOVED*** ***REMOVED***
            token : "paren.rparen",
            regex : "[\\]\\)\\***REMOVED***]"
    ***REMOVED*** ]
***REMOVED***;
    
    this.normalizeRules();
***REMOVED***;

oop.inherits(ShHighlightRules, TextHighlightRules);

exports.ShHighlightRules = ShHighlightRules;
***REMOVED***);

__ace_shadowed__.define('ace/mode/folding/coffee', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/fold_mode', 'ace/range'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;
var Range = require("../../range").Range;

var FoldMode = exports.FoldMode = function() ***REMOVED******REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***

    this.getFoldWidgetRange = function(session, foldStyle, row) ***REMOVED***
        var range = this.indentationBlock(session, row);
        if (range)
            return range;

        var re = /\S/;
        var line = session.getLine(row);
        var startLevel = line.search(re);
        if (startLevel == -1 || line[startLevel] != "#")
            return;

        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) ***REMOVED***
            line = session.getLine(row);
            var level = line.search(re);

            if (level == -1)
                continue;

            if (line[level] != "#")
                break;

            endRow = row;
    ***REMOVED***

        if (endRow > startRow) ***REMOVED***
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
    ***REMOVED***
***REMOVED***;
    this.getFoldWidget = function(session, foldStyle, row) ***REMOVED***
        var line = session.getLine(row);
        var indent = line.search(/\S/);
        var next = session.getLine(row + 1);
        var prev = session.getLine(row - 1);
        var prevIndent = prev.search(/\S/);
        var nextIndent = next.search(/\S/);

        if (indent == -1) ***REMOVED***
            session.foldWidgets[row - 1] = prevIndent!= -1 && prevIndent < nextIndent ? "start" : "";
            return "";
    ***REMOVED***
        if (prevIndent == -1) ***REMOVED***
            if (indent == nextIndent && line[indent] == "#" && next[indent] == "#") ***REMOVED***
                session.foldWidgets[row - 1] = "";
                session.foldWidgets[row + 1] = "";
                return "start";
        ***REMOVED***
    ***REMOVED*** else if (prevIndent == indent && line[indent] == "#" && prev[indent] == "#") ***REMOVED***
            if (session.getLine(row - 2).search(/\S/) == -1) ***REMOVED***
                session.foldWidgets[row - 1] = "start";
                session.foldWidgets[row + 1] = "";
                return "";
        ***REMOVED***
    ***REMOVED***

        if (prevIndent!= -1 && prevIndent < indent)
            session.foldWidgets[row - 1] = "start";
        else
            session.foldWidgets[row - 1] = "";

        if (indent < nextIndent)
            return "start";
        else
            return "";
***REMOVED***;

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
