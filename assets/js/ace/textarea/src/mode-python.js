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

__ace_shadowed__.define('ace/mode/python', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/python_highlight_rules', 'ace/mode/folding/pythonic', 'ace/range'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var PythonHighlightRules = require("./python_highlight_rules").PythonHighlightRules;
var PythonFoldMode = require("./folding/pythonic").FoldMode;
var Range = require("../range").Range;

var Mode = function() ***REMOVED***
    this.HighlightRules = PythonHighlightRules;
    this.foldingRules = new PythonFoldMode("\\:");
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***

    this.lineCommentStart = "#";

    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type == "comment") ***REMOVED***
            return indent;
    ***REMOVED***

        if (state == "start") ***REMOVED***
            var match = line.match(/^.*[\***REMOVED***\(\[\:]\s*$/);
            if (match) ***REMOVED***
                indent += tab;
        ***REMOVED***
    ***REMOVED***

        return indent;
***REMOVED***;

    var outdents = ***REMOVED***
        "pass": 1,
        "return": 1,
        "raise": 1,
        "break": 1,
        "continue": 1
***REMOVED***;
    
    this.checkOutdent = function(state, line, input) ***REMOVED***
        if (input !== "\r\n" && input !== "\r" && input !== "\n")
            return false;

        var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;
        
        if (!tokens)
            return false;
        do ***REMOVED***
            var last = tokens.pop();
    ***REMOVED*** while (last && (last.type == "comment" || (last.type == "text" && last.value.match(/^\s+$/))));
        
        if (!last)
            return false;
        
        return (last.type == "keyword" && outdents[last.value]);
***REMOVED***;

    this.autoOutdent = function(state, doc, row) ***REMOVED***
        
        row += 1;
        var indent = this.$getIndent(doc.getLine(row));
        var tab = doc.getTabString();
        if (indent.slice(-tab.length) == tab)
            doc.remove(new Range(row, indent.length-tab.length, row, indent.length));
***REMOVED***;

    this.$id = "ace/mode/python";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

__ace_shadowed__.define('ace/mode/python_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var PythonHighlightRules = function() ***REMOVED***

    var keywords = (
        "and|as|assert|break|class|continue|def|del|elif|else|except|exec|" +
        "finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|" +
        "raise|return|try|while|with|yield"
    );

    var builtinConstants = (
        "True|False|None|NotImplemented|Ellipsis|__debug__"
    );

    var builtinFunctions = (
        "abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|" +
        "eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|" +
        "binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|" +
        "float|list|raw_input|unichr|callable|format|locals|reduce|unicode|" +
        "chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|" +
        "cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|" +
        "__import__|complex|hash|min|set|apply|delattr|help|next|setattr|" +
        "buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern"
    );
    var keywordMapper = this.createKeywordMapper(***REMOVED***
        "invalid.deprecated": "debugger",
        "support.function": builtinFunctions,
        "constant.language": builtinConstants,
        "keyword": keywords
***REMOVED*** "identifier");

    var strPre = "(?:r|u|ur|R|U|UR|Ur|uR)?";

    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var octInteger = "(?:0[oO]?[0-7]+)";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var binInteger = "(?:0[bB][01]+)";
    var integer = "(?:" + decimalInteger + "|" + octInteger + "|" + hexInteger + "|" + binInteger + ")";

    var exponent = "(?:[eE][+-]?\\d+)";
    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" +  intPart + ")" + exponent + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";

    var stringEscape =  "\\\\(x[0-9A-Fa-f]***REMOVED***2***REMOVED***|[0-7]***REMOVED***3***REMOVED***|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]***REMOVED***8***REMOVED***|u[0-9A-Fa-f]***REMOVED***4***REMOVED***)";

    this.$rules = ***REMOVED***
        "start" : [ ***REMOVED***
            token : "comment",
            regex : "#.*$"
    ***REMOVED*** ***REMOVED***
            token : "string",           // multi line """ string start
            regex : strPre + '"***REMOVED***3***REMOVED***',
            next : "qqstring3"
    ***REMOVED*** ***REMOVED***
            token : "string",           // " string
            regex : strPre + '"(?=.)',
            next : "qqstring"
    ***REMOVED*** ***REMOVED***
            token : "string",           // multi line ''' string start
            regex : strPre + "'***REMOVED***3***REMOVED***",
            next : "qstring3"
    ***REMOVED*** ***REMOVED***
            token : "string",           // ' string
            regex : strPre + "'(?=.)",
            next : "qstring"
    ***REMOVED*** ***REMOVED***
            token : "constant.numeric", // imaginary
            regex : "(?:" + floatNumber + "|\\d+)[jJ]\\b"
    ***REMOVED*** ***REMOVED***
            token : "constant.numeric", // float
            regex : floatNumber
    ***REMOVED*** ***REMOVED***
            token : "constant.numeric", // long integer
            regex : integer + "[lL]\\b"
    ***REMOVED*** ***REMOVED***
            token : "constant.numeric", // integer
            regex : integer + "\\b"
    ***REMOVED*** ***REMOVED***
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
    ***REMOVED*** ***REMOVED***
            token : "keyword.operator",
            regex : "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
    ***REMOVED*** ***REMOVED***
            token : "paren.lparen",
            regex : "[\\[\\(\\***REMOVED***]"
    ***REMOVED*** ***REMOVED***
            token : "paren.rparen",
            regex : "[\\]\\)\\***REMOVED***]"
    ***REMOVED*** ***REMOVED***
            token : "text",
            regex : "\\s+"
    ***REMOVED*** ],
        "qqstring3" : [ ***REMOVED***
            token : "constant.language.escape",
            regex : stringEscape
    ***REMOVED*** ***REMOVED***
            token : "string", // multi line """ string end
            regex : '"***REMOVED***3***REMOVED***',
            next : "start"
    ***REMOVED*** ***REMOVED***
            defaultToken : "string"
    ***REMOVED*** ],
        "qstring3" : [ ***REMOVED***
            token : "constant.language.escape",
            regex : stringEscape
    ***REMOVED*** ***REMOVED***
            token : "string",  // multi line ''' string end
            regex : "'***REMOVED***3***REMOVED***",
            next : "start"
    ***REMOVED*** ***REMOVED***
            defaultToken : "string"
    ***REMOVED*** ],
        "qqstring" : [***REMOVED***
            token : "constant.language.escape",
            regex : stringEscape
    ***REMOVED*** ***REMOVED***
            token : "string",
            regex : "\\\\$",
            next  : "qqstring"
    ***REMOVED*** ***REMOVED***
            token : "string",
            regex : '"|$',
            next  : "start"
    ***REMOVED*** ***REMOVED***
            defaultToken: "string"
    ***REMOVED***],
        "qstring" : [***REMOVED***
            token : "constant.language.escape",
            regex : stringEscape
    ***REMOVED*** ***REMOVED***
            token : "string",
            regex : "\\\\$",
            next  : "qstring"
    ***REMOVED*** ***REMOVED***
            token : "string",
            regex : "'|$",
            next  : "start"
    ***REMOVED*** ***REMOVED***
            defaultToken: "string"
    ***REMOVED***]
***REMOVED***;
***REMOVED***;

oop.inherits(PythonHighlightRules, TextHighlightRules);

exports.PythonHighlightRules = PythonHighlightRules;
***REMOVED***);

__ace_shadowed__.define('ace/mode/folding/pythonic', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/fold_mode'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(markers) ***REMOVED***
    this.foldingStartMarker = new RegExp("([\\[***REMOVED***])(?:\\s*)$|(" + markers + ")(?:\\s*)(?:#.*)?$");
***REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***

    this.getFoldWidgetRange = function(session, foldStyle, row) ***REMOVED***
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) ***REMOVED***
            if (match[1])
                return this.openingBracketBlock(session, match[1], row, match.index);
            if (match[2])
                return this.indentationBlock(session, row, match.index + match[2].length);
            return this.indentationBlock(session, row);
    ***REMOVED***
***REMOVED***

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
