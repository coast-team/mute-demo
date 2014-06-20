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

define('ace/mode/coffee', ['require', 'exports', 'module' , 'ace/mode/coffee_highlight_rules', 'ace/mode/matching_brace_outdent', 'ace/mode/folding/coffee', 'ace/range', 'ace/mode/text', 'ace/worker/worker_client', 'ace/lib/oop'], function(require, exports, module) ***REMOVED***


var Rules = require("./coffee_highlight_rules").CoffeeHighlightRules;
var Outdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var FoldMode = require("./folding/coffee").FoldMode;
var Range = require("../range").Range;
var TextMode = require("./text").Mode;
var WorkerClient = require("../worker/worker_client").WorkerClient;
var oop = require("../lib/oop");

function Mode() ***REMOVED***
    this.HighlightRules = Rules;
    this.$outdent = new Outdent();
    this.foldingRules = new FoldMode();
***REMOVED***

oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    var indenter = /(?:[(***REMOVED***[=:]|[-=]>|\b(?:else|try|(?:swi|ca)tch(?:\s+[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)?|finally))\s*$|^\s*(else\b\s*)?(?:if|for|while|loop)\b(?!.*\bthen\b)/;
    var commentLine = /^(\s*)#/;
    var hereComment = /^\s*###(?!#)/;
    var indentation = /^\s*/;
    
    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        var indent = this.$getIndent(line);
        var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
    
        if (!(tokens.length && tokens[tokens.length - 1].type === 'comment') &&
            state === 'start' && indenter.test(line))
            indent += tab;
        return indent;
***REMOVED***;
    
    this.toggleCommentLines = function(state, doc, startRow, endRow)***REMOVED***
        console.log("toggle");
        var range = new Range(0, 0, 0, 0);
        for (var i = startRow; i <= endRow; ++i) ***REMOVED***
            var line = doc.getLine(i);
            if (hereComment.test(line))
                continue;
                
            if (commentLine.test(line))
                line = line.replace(commentLine, '$1');
            else
                line = line.replace(indentation, '$&#');
    
            range.end.row = range.start.row = i;
            range.end.column = line.length + 1;
            doc.replace(range, line);
    ***REMOVED***
***REMOVED***;
    
    this.checkOutdent = function(state, line, input) ***REMOVED***
        return this.$outdent.checkOutdent(line, input);
***REMOVED***;
    
    this.autoOutdent = function(state, doc, row) ***REMOVED***
        this.$outdent.autoOutdent(doc, row);
***REMOVED***;
    
    this.createWorker = function(session) ***REMOVED***
        var worker = new WorkerClient(["ace"], "ace/mode/coffee_worker", "Worker");
        worker.attachToDocument(session.getDocument());
        
        worker.on("error", function(e) ***REMOVED***
            session.setAnnotations([e.data]);
    ***REMOVED***);
        
        worker.on("ok", function(e) ***REMOVED***
            session.clearAnnotations();
    ***REMOVED***);
        
        return worker;
***REMOVED***;

    this.$id = "ace/mode/coffee";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;

***REMOVED***);

define('ace/mode/coffee_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    oop.inherits(CoffeeHighlightRules, TextHighlightRules);

    function CoffeeHighlightRules() ***REMOVED***
        var identifier = "[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*";

        var keywords = (
            "this|throw|then|try|typeof|super|switch|return|break|by|continue|" +
            "catch|class|in|instanceof|is|isnt|if|else|extends|for|own|" +
            "finally|function|while|when|new|no|not|delete|debugger|do|loop|of|off|" +
            "or|on|unless|until|and|yes"
        );

        var langConstant = (
            "true|false|null|undefined|NaN|Infinity"
        );

        var illegal = (
            "case|const|default|function|var|void|with|enum|export|implements|" +
            "interface|let|package|private|protected|public|static|yield|" +
            "__hasProp|slice|bind|indexOf"
        );

        var supportClass = (
            "Array|Boolean|Date|Function|Number|Object|RegExp|ReferenceError|String|" +
            "Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|" +
            "SyntaxError|TypeError|URIError|"  +
            "ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|" +
            "Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray"
        );

        var supportFunction = (
            "Math|JSON|isNaN|isFinite|parseInt|parseFloat|encodeURI|" +
            "encodeURIComponent|decodeURI|decodeURIComponent|String|"
        );

        var variableLanguage = (
            "window|arguments|prototype|document"
        );

        var keywordMapper = this.createKeywordMapper(***REMOVED***
            "keyword": keywords,
            "constant.language": langConstant,
            "invalid.illegal": illegal,
            "language.support.class": supportClass,
            "language.support.function": supportFunction,
            "variable.language": variableLanguage
    ***REMOVED*** "identifier");

        var functionRule = ***REMOVED***
            token: ["paren.lparen", "variable.parameter", "paren.rparen", "text", "storage.type"],
            regex: /(?:(\()((?:"[^")]*?"|'[^')]*?'|\/[^\/)]*?\/|[^()\"'\/])*?)(\))(\s*))?([\-=]>)/.source
    ***REMOVED***;

        var stringEscape = /\\(?:x[0-9a-fA-F]***REMOVED***2***REMOVED***|u[0-9a-fA-F]***REMOVED***4***REMOVED***|[0-2][0-7]***REMOVED***0,2***REMOVED***|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)/;

        this.$rules = ***REMOVED***
            start : [
                ***REMOVED***
                    token : "constant.numeric",
                    regex : "(?:0x[\\da-fA-F]+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?)"
            ***REMOVED*** ***REMOVED***
                    stateName: "qdoc",
                    token : "string", regex : "'''", next : [
                        ***REMOVED***token : "string", regex : "'''", next : "start"***REMOVED***,
                        ***REMOVED***token : "constant.language.escape", regex : stringEscape***REMOVED***,
                        ***REMOVED***defaultToken: "string"***REMOVED***
                    ]
            ***REMOVED*** ***REMOVED***
                    stateName: "qqdoc",
                    token : "string",
                    regex : '"""',
                    next : [
                        ***REMOVED***token : "string", regex : '"""', next : "start"***REMOVED***,
                        ***REMOVED***token : "paren.string", regex : '#***REMOVED***', push : "start"***REMOVED***,
                        ***REMOVED***token : "constant.language.escape", regex : stringEscape***REMOVED***,
                        ***REMOVED***defaultToken: "string"***REMOVED***
                    ]
            ***REMOVED*** ***REMOVED***
                    stateName: "qstring",
                    token : "string", regex : "'", next : [
                        ***REMOVED***token : "string", regex : "'", next : "start"***REMOVED***,
                        ***REMOVED***token : "constant.language.escape", regex : stringEscape***REMOVED***,
                        ***REMOVED***defaultToken: "string"***REMOVED***
                    ]
            ***REMOVED*** ***REMOVED***
                    stateName: "qqstring",
                    token : "string.start", regex : '"', next : [
                        ***REMOVED***token : "string.end", regex : '"', next : "start"***REMOVED***,
                        ***REMOVED***token : "paren.string", regex : '#***REMOVED***', push : "start"***REMOVED***,
                        ***REMOVED***token : "constant.language.escape", regex : stringEscape***REMOVED***,
                        ***REMOVED***defaultToken: "string"***REMOVED***
                    ]
            ***REMOVED*** ***REMOVED***
                    stateName: "js",
                    token : "string", regex : "`", next : [
                        ***REMOVED***token : "string", regex : "`", next : "start"***REMOVED***,
                        ***REMOVED***token : "constant.language.escape", regex : stringEscape***REMOVED***,
                        ***REMOVED***defaultToken: "string"***REMOVED***
                    ]
            ***REMOVED*** ***REMOVED***
                    regex: "[***REMOVED******REMOVED***]", onMatch: function(val, state, stack) ***REMOVED***
                        this.next = "";
                        if (val == "***REMOVED***" && stack.length) ***REMOVED***
                            stack.unshift("start", state);
                            return "paren";
                    ***REMOVED***
                        if (val == "***REMOVED***" && stack.length) ***REMOVED***
                            stack.shift();
                            this.next = stack.shift();
                            if (this.next.indexOf("string") != -1)
                                return "paren.string";
                    ***REMOVED***
                        return "paren";
                ***REMOVED***
            ***REMOVED*** ***REMOVED***
                    token : "string.regex",
                    regex : "///",
                    next : "heregex"
            ***REMOVED*** ***REMOVED***
                    token : "string.regex",
                    regex : /(?:\/(?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/)(?:[imgy]***REMOVED***0,4***REMOVED***)(?!\w)/
            ***REMOVED*** ***REMOVED***
                    token : "comment",
                    regex : "###(?!#)",
                    next : "comment"
            ***REMOVED*** ***REMOVED***
                    token : "comment",
                    regex : "#.*"
            ***REMOVED*** ***REMOVED***
                    token : ["punctuation.operator", "text", "identifier"],
                    regex : "(\\.)(\\s*)(" + illegal + ")"
            ***REMOVED*** ***REMOVED***
                    token : "punctuation.operator",
                    regex : "\\."
            ***REMOVED*** ***REMOVED***
                    token : ["keyword", "text", "language.support.class",
                     "text", "keyword", "text", "language.support.class"],
                    regex : "(class)(\\s+)(" + identifier + ")(?:(\\s+)(extends)(\\s+)(" + identifier + "))?"
            ***REMOVED*** ***REMOVED***
                    token : ["entity.name.function", "text", "keyword.operator", "text"].concat(functionRule.token),
                    regex : "(" + identifier + ")(\\s*)([=:])(\\s*)" + functionRule.regex
            ***REMOVED*** 
                functionRule, 
                ***REMOVED***
                    token : "variable",
                    regex : "@(?:" + identifier + ")?"
            ***REMOVED*** ***REMOVED***
                    token: keywordMapper,
                    regex : identifier
            ***REMOVED*** ***REMOVED***
                    token : "punctuation.operator",
                    regex : "\\,|\\."
            ***REMOVED*** ***REMOVED***
                    token : "storage.type",
                    regex : "[\\-=]>"
            ***REMOVED*** ***REMOVED***
                    token : "keyword.operator",
                    regex : "(?:[-+*/%<>&|^!?=]=|>>>=?|\\-\\-|\\+\\+|::|&&=|\\|\\|=|<<=|>>=|\\?\\.|\\.***REMOVED***2,3***REMOVED***|[!*+-=><])"
            ***REMOVED*** ***REMOVED***
                    token : "paren.lparen",
                    regex : "[(***REMOVED***[]"
            ***REMOVED*** ***REMOVED***
                    token : "paren.rparen",
                    regex : "[\\]***REMOVED***)]"
            ***REMOVED*** ***REMOVED***
                    token : "text",
                    regex : "\\s+"
            ***REMOVED***],


            heregex : [***REMOVED***
                token : "string.regex",
                regex : '.*?///[imgy]***REMOVED***0,4***REMOVED***',
                next : "start"
        ***REMOVED*** ***REMOVED***
                token : "comment.regex",
                regex : "\\s+(?:#.*)?"
        ***REMOVED*** ***REMOVED***
                token : "string.regex",
                regex : "\\S+"
        ***REMOVED***],

            comment : [***REMOVED***
                token : "comment",
                regex : '###',
                next : "start"
        ***REMOVED*** ***REMOVED***
                defaultToken : "comment"
        ***REMOVED***]
    ***REMOVED***;
        this.normalizeRules();
***REMOVED***

    exports.CoffeeHighlightRules = CoffeeHighlightRules;
***REMOVED***);

define('ace/mode/matching_brace_outdent', ['require', 'exports', 'module' , 'ace/range'], function(require, exports, module) ***REMOVED***


var Range = require("../range").Range;

var MatchingBraceOutdent = function() ***REMOVED******REMOVED***;

(function() ***REMOVED***

    this.checkOutdent = function(line, input) ***REMOVED***
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\***REMOVED***/.test(input);
***REMOVED***;

    this.autoOutdent = function(doc, row) ***REMOVED***
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\***REMOVED***)/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket(***REMOVED***row: row, column: column***REMOVED***);

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
***REMOVED***;

    this.$getIndent = function(line) ***REMOVED***
        return line.match(/^\s*/)[0];
***REMOVED***;

***REMOVED***).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;
***REMOVED***);

define('ace/mode/folding/coffee', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/fold_mode', 'ace/range'], function(require, exports, module) ***REMOVED***


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
