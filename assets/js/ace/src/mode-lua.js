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

define('ace/mode/lua', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/lua_highlight_rules', 'ace/mode/folding/lua', 'ace/range', 'ace/worker/worker_client'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var LuaHighlightRules = require("./lua_highlight_rules").LuaHighlightRules;
var LuaFoldMode = require("./folding/lua").FoldMode;
var Range = require("../range").Range;
var WorkerClient = require("../worker/worker_client").WorkerClient;

var Mode = function() ***REMOVED***
    this.HighlightRules = LuaHighlightRules;
    
    this.foldingRules = new LuaFoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
   
    this.lineCommentStart = "--";
    this.blockComment = ***REMOVED***start: "--[", end: "]--"***REMOVED***;
    
    var indentKeywords = ***REMOVED***
        "function": 1,
        "then": 1,
        "do": 1,
        "else": 1,
        "elseif": 1,
        "repeat": 1,
        "end": -1,
        "until": -1
***REMOVED***;
    var outdentKeywords = [
        "else",
        "elseif",
        "end",
        "until"
    ];

    function getNetIndentLevel(tokens) ***REMOVED***
        var level = 0;
        for (var i = 0; i < tokens.length; i++) ***REMOVED***
            var token = tokens[i];
            if (token.type == "keyword") ***REMOVED***
                if (token.value in indentKeywords) ***REMOVED***
                    level += indentKeywords[token.value];
            ***REMOVED***
        ***REMOVED*** else if (token.type == "paren.lparen") ***REMOVED***
                level ++;
        ***REMOVED*** else if (token.type == "paren.rparen") ***REMOVED***
                level --;
        ***REMOVED***
    ***REMOVED***
        if (level < 0) ***REMOVED***
            return -1;
    ***REMOVED*** else if (level > 0) ***REMOVED***
            return 1;
    ***REMOVED*** else ***REMOVED***
            return 0;
    ***REMOVED***
***REMOVED***

    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        var indent = this.$getIndent(line);
        var level = 0;

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (state == "start") ***REMOVED***
            level = getNetIndentLevel(tokens);
    ***REMOVED***
        if (level > 0) ***REMOVED***
            return indent + tab;
    ***REMOVED*** else if (level < 0 && indent.substr(indent.length - tab.length) == tab) ***REMOVED***
            if (!this.checkOutdent(state, line, "\n")) ***REMOVED***
                return indent.substr(0, indent.length - tab.length);
        ***REMOVED***
    ***REMOVED***
        return indent;
***REMOVED***;

    this.checkOutdent = function(state, line, input) ***REMOVED***
        if (input != "\n" && input != "\r" && input != "\r\n")
            return false;

        if (line.match(/^\s*[\)\***REMOVED***\]]$/))
            return true;

        var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;

        if (!tokens || !tokens.length)
            return false;

        return (tokens[0].type == "keyword" && outdentKeywords.indexOf(tokens[0].value) != -1);
***REMOVED***;

    this.autoOutdent = function(state, session, row) ***REMOVED***
        var prevLine = session.getLine(row - 1);
        var prevIndent = this.$getIndent(prevLine).length;
        var prevTokens = this.getTokenizer().getLineTokens(prevLine, "start").tokens;
        var tabLength = session.getTabString().length;
        var expectedIndent = prevIndent + tabLength * getNetIndentLevel(prevTokens);
        var curIndent = this.$getIndent(session.getLine(row)).length;
        if (curIndent < expectedIndent) ***REMOVED***
            return;
    ***REMOVED***
        session.outdentRows(new Range(row, 0, row + 2, 0));
***REMOVED***;

    this.createWorker = function(session) ***REMOVED***
        var worker = new WorkerClient(["ace"], "ace/mode/lua_worker", "Worker");
        worker.attachToDocument(session.getDocument());
        
        worker.on("error", function(e) ***REMOVED***
            session.setAnnotations([e.data]);
    ***REMOVED***);
        
        worker.on("ok", function(e) ***REMOVED***
            session.clearAnnotations();
    ***REMOVED***);
        
        return worker;
***REMOVED***;

    this.$id = "ace/mode/lua";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/lua_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var LuaHighlightRules = function() ***REMOVED***

    var keywords = (
        "break|do|else|elseif|end|for|function|if|in|local|repeat|"+
         "return|then|until|while|or|and|not"
    );

    var builtinConstants = ("true|false|nil|_G|_VERSION");

    var functions = (
        "string|xpcall|package|tostring|print|os|unpack|require|"+
        "getfenv|setmetatable|next|assert|tonumber|io|rawequal|"+
        "collectgarbage|getmetatable|module|rawset|math|debug|"+
        "pcall|table|newproxy|type|coroutine|_G|select|gcinfo|"+
        "pairs|rawget|loadstring|ipairs|_VERSION|dofile|setfenv|"+
        "load|error|loadfile|"+

        "sub|upper|len|gfind|rep|find|match|char|dump|gmatch|"+
        "reverse|byte|format|gsub|lower|preload|loadlib|loaded|"+
        "loaders|cpath|config|path|seeall|exit|setlocale|date|"+
        "getenv|difftime|remove|time|clock|tmpname|rename|execute|"+
        "lines|write|close|flush|open|output|type|read|stderr|"+
        "stdin|input|stdout|popen|tmpfile|log|max|acos|huge|"+
        "ldexp|pi|cos|tanh|pow|deg|tan|cosh|sinh|random|randomseed|"+
        "frexp|ceil|floor|rad|abs|sqrt|modf|asin|min|mod|fmod|log10|"+
        "atan2|exp|sin|atan|getupvalue|debug|sethook|getmetatable|"+
        "gethook|setmetatable|setlocal|traceback|setfenv|getinfo|"+
        "setupvalue|getlocal|getregistry|getfenv|setn|insert|getn|"+
        "foreachi|maxn|foreach|concat|sort|remove|resume|yield|"+
        "status|wrap|create|running|"+
        "__add|__sub|__mod|__unm|__concat|__lt|__index|__call|__gc|__metatable|"+
         "__mul|__div|__pow|__len|__eq|__le|__newindex|__tostring|__mode|__tonumber"
    );

    var stdLibaries = ("string|package|os|io|math|debug|table|coroutine");

    var futureReserved = "";

    var deprecatedIn5152 = ("setn|foreach|foreachi|gcinfo|log10|maxn");

    var keywordMapper = this.createKeywordMapper(***REMOVED***
        "keyword": keywords,
        "support.function": functions,
        "invalid.deprecated": deprecatedIn5152,
        "constant.library": stdLibaries,
        "constant.language": builtinConstants,
        "invalid.illegal": futureReserved,
        "variable.language": "self"
***REMOVED*** "identifier");

    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var integer = "(?:" + decimalInteger + "|" + hexInteger + ")";

    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var floatNumber = "(?:" + pointFloat + ")";

    this.$rules = ***REMOVED***
        "start" : [***REMOVED***
            stateName: "bracketedComment",
            onMatch : function(value, currentState, stack)***REMOVED***
                stack.unshift(this.next, value.length - 2, currentState);
                return "comment";
        ***REMOVED***
            regex : /\-\-\[=*\[/,
            next  : [
                ***REMOVED***
                    onMatch : function(value, currentState, stack) ***REMOVED***
                        if (value.length == stack[1]) ***REMOVED***
                            stack.shift();
                            stack.shift();
                            this.next = stack.shift();
                    ***REMOVED*** else ***REMOVED***
                            this.next = "";
                    ***REMOVED***
                        return "comment";
                ***REMOVED***
                    regex : /\]=*\]/,
                    next  : "start"
            ***REMOVED*** ***REMOVED***
                    defaultToken : "comment"
            ***REMOVED***
            ]
    ***REMOVED***

        ***REMOVED***
            token : "comment",
            regex : "\\-\\-.*$"
    ***REMOVED***
        ***REMOVED***
            stateName: "bracketedString",
            onMatch : function(value, currentState, stack)***REMOVED***
                stack.unshift(this.next, value.length, currentState);
                return "comment";
        ***REMOVED***
            regex : /\[=*\[/,
            next  : [
                ***REMOVED***
                    onMatch : function(value, currentState, stack) ***REMOVED***
                        if (value.length == stack[1]) ***REMOVED***
                            stack.shift();
                            stack.shift();
                            this.next = stack.shift();
                    ***REMOVED*** else ***REMOVED***
                            this.next = "";
                    ***REMOVED***
                        return "comment";
                ***REMOVED***
                    
                    regex : /\]=*\]/,
                    next  : "start"
            ***REMOVED*** ***REMOVED***
                    defaultToken : "comment"
            ***REMOVED***
            ]
    ***REMOVED***
        ***REMOVED***
            token : "string",           // " string
            regex : '"(?:[^\\\\]|\\\\.)*?"'
    ***REMOVED*** ***REMOVED***
            token : "string",           // ' string
            regex : "'(?:[^\\\\]|\\\\.)*?'"
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
            regex : "\\+|\\-|\\*|\\/|%|\\#|\\^|~|<|>|<=|=>|==|~=|=|\\:|\\.\\.\\.|\\.\\."
    ***REMOVED*** ***REMOVED***
            token : "paren.lparen",
            regex : "[\\[\\(\\***REMOVED***]"
    ***REMOVED*** ***REMOVED***
            token : "paren.rparen",
            regex : "[\\]\\)\\***REMOVED***]"
    ***REMOVED*** ***REMOVED***
            token : "text",
            regex : "\\s+|\\w+"
    ***REMOVED*** ]
***REMOVED***;
    
    this.normalizeRules();
***REMOVED***

oop.inherits(LuaHighlightRules, TextHighlightRules);

exports.LuaHighlightRules = LuaHighlightRules;
***REMOVED***);

define('ace/mode/folding/lua', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/fold_mode', 'ace/range', 'ace/token_iterator'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;
var Range = require("../../range").Range;
var TokenIterator = require("../../token_iterator").TokenIterator;


var FoldMode = exports.FoldMode = function() ***REMOVED******REMOVED***;

oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***

    this.foldingStartMarker = /\b(function|then|do|repeat)\b|***REMOVED***\s*$|(\[=*\[)/;
    this.foldingStopMarker = /\bend\b|^\s****REMOVED***|\]=*\]/;

    this.getFoldWidget = function(session, foldStyle, row) ***REMOVED***
        var line = session.getLine(row);
        var isStart = this.foldingStartMarker.test(line);
        var isEnd = this.foldingStopMarker.test(line);

        if (isStart && !isEnd) ***REMOVED***
            var match = line.match(this.foldingStartMarker);
            if (match[1] == "then" && /\belseif\b/.test(line))
                return;
            if (match[1]) ***REMOVED***
                if (session.getTokenAt(row, match.index + 1).type === "keyword")
                    return "start";
        ***REMOVED*** else if (match[2]) ***REMOVED***
                var type = session.bgTokenizer.getState(row) || "";
                if (type[0] == "bracketedComment" || type[0] == "bracketedString")
                    return "start";
        ***REMOVED*** else ***REMOVED***
                return "start";
        ***REMOVED***
    ***REMOVED***
        if (foldStyle != "markbeginend" || !isEnd || isStart && isEnd)
            return "";

        var match = line.match(this.foldingStopMarker);
        if (match[0] === "end") ***REMOVED***
            if (session.getTokenAt(row, match.index + 1).type === "keyword")
                return "end";
    ***REMOVED*** else if (match[0][0] === "]") ***REMOVED***
            var type = session.bgTokenizer.getState(row - 1) || "";
            if (type[0] == "bracketedComment" || type[0] == "bracketedString")
                return "end";
    ***REMOVED*** else
            return "end";
***REMOVED***;

    this.getFoldWidgetRange = function(session, foldStyle, row) ***REMOVED***
        var line = session.doc.getLine(row);
        var match = this.foldingStartMarker.exec(line);
        if (match) ***REMOVED***
            if (match[1])
                return this.luaBlock(session, row, match.index + 1);

            if (match[2])
                return session.getCommentFoldRange(row, match.index + 1);

            return this.openingBracketBlock(session, "***REMOVED***", row, match.index);
    ***REMOVED***

        var match = this.foldingStopMarker.exec(line);
        if (match) ***REMOVED***
            if (match[0] === "end") ***REMOVED***
                if (session.getTokenAt(row, match.index + 1).type === "keyword")
                    return this.luaBlock(session, row, match.index + 1);
        ***REMOVED***

            if (match[0][0] === "]")
                return session.getCommentFoldRange(row, match.index + 1);

            return this.closingBracketBlock(session, "***REMOVED***", row, match.index + match[0].length);
    ***REMOVED***
***REMOVED***;

    this.luaBlock = function(session, row, column) ***REMOVED***
        var stream = new TokenIterator(session, row, column);
        var indentKeywords = ***REMOVED***
            "function": 1,
            "do": 1,
            "then": 1,
            "elseif": -1,
            "end": -1,
            "repeat": 1,
            "until": -1
    ***REMOVED***;

        var token = stream.getCurrentToken();
        if (!token || token.type != "keyword")
            return;

        var val = token.value;
        var stack = [val];
        var dir = indentKeywords[val];

        if (!dir)
            return;

        var startColumn = dir === -1 ? stream.getCurrentTokenColumn() : session.getLine(row).length;
        var startRow = row;

        stream.step = dir === -1 ? stream.stepBackward : stream.stepForward;
        while(token = stream.step()) ***REMOVED***
            if (token.type !== "keyword")
                continue;
            var level = dir * indentKeywords[token.value];

            if (level > 0) ***REMOVED***
                stack.unshift(token.value);
        ***REMOVED*** else if (level <= 0) ***REMOVED***
                stack.shift();
                if (!stack.length && token.value != "elseif")
                    break;
                if (level === 0)
                    stack.unshift(token.value);
        ***REMOVED***
    ***REMOVED***

        var row = stream.getCurrentTokenRow();
        if (dir === -1)
            return new Range(row, session.getLine(row).length, startRow, startColumn);
        else
            return new Range(startRow, startColumn, row, stream.getCurrentTokenColumn());
***REMOVED***;

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
