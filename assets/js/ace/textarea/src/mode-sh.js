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

__ace_shadowed__.define('ace/mode/sh', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/sh_highlight_rules', 'ace/range', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var ShHighlightRules = require("./sh_highlight_rules").ShHighlightRules;
var Range = require("../range").Range;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = ShHighlightRules;
    this.foldingRules = new CStyleFoldMode();
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

    this.$id = "ace/mode/sh";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
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

__ace_shadowed__.define('ace/mode/folding/cstyle', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/range', 'ace/mode/folding/fold_mode'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) ***REMOVED***
    if (commentRegex) ***REMOVED***
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
***REMOVED***
***REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***

    this.foldingStartMarker = /(\***REMOVED***|\[)[^\***REMOVED***\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\***REMOVED***]*(\***REMOVED***|\])|^[\s\*]*(\*\/)/;

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) ***REMOVED***
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) ***REMOVED***
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) ***REMOVED***
                if (forceMultiline) ***REMOVED***
                    range = this.getSectionRange(session, row);
            ***REMOVED*** else if (foldStyle != "all")
                    range = null;
        ***REMOVED***
            
            return range;
    ***REMOVED***

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) ***REMOVED***
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
    ***REMOVED***
***REMOVED***;
    
    this.getSectionRange = function(session, row) ***REMOVED***
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) ***REMOVED***
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) ***REMOVED***
                if (subRange.start.row <= startRow) ***REMOVED***
                    break;
            ***REMOVED*** else if (subRange.isMultiLine()) ***REMOVED***
                    row = subRange.end.row;
            ***REMOVED*** else if (startIndent == indent) ***REMOVED***
                    break;
            ***REMOVED***
        ***REMOVED***
            endRow = row;
    ***REMOVED***
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
***REMOVED***;

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
