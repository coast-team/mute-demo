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

define('ace/mode/tcl', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/folding/cstyle', 'ace/mode/tcl_highlight_rules', 'ace/mode/matching_brace_outdent', 'ace/range'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;
var TclHighlightRules = require("./tcl_highlight_rules").TclHighlightRules;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var Range = require("../range").Range;

var Mode = function() ***REMOVED***
    this.HighlightRules = TclHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
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
            var match = line.match(/^.*[\***REMOVED***\(\[]\s*$/);
            if (match) ***REMOVED***
                indent += tab;
        ***REMOVED***
    ***REMOVED***

        return indent;
***REMOVED***;

    this.checkOutdent = function(state, line, input) ***REMOVED***
        return this.$outdent.checkOutdent(line, input);
***REMOVED***;

    this.autoOutdent = function(state, doc, row) ***REMOVED***
        this.$outdent.autoOutdent(doc, row);
***REMOVED***;

    this.$id = "ace/mode/tcl";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/folding/cstyle', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/range', 'ace/mode/folding/fold_mode'], function(require, exports, module) ***REMOVED***


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

define('ace/mode/tcl_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var TclHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED***
        "start" : [
           ***REMOVED***
                token : "comment",
                regex : "#.*\\\\$",
                next  : "commentfollow"
        ***REMOVED*** ***REMOVED***
                token : "comment",
                regex : "#.*$"
        ***REMOVED*** ***REMOVED***
                token : "support.function",
                regex : '[\\\\]$',
                next  : "splitlineStart"
        ***REMOVED*** ***REMOVED***
                token : "text",
                regex : '[\\\\](?:["]|[***REMOVED***]|[***REMOVED***]|[[]|[]]|[$]|[\])'
        ***REMOVED*** ***REMOVED***
                token : "text", // last value before command
                regex : '^|[^***REMOVED***][;][^***REMOVED***]|[/\r/]',
                next  : "commandItem"
        ***REMOVED*** ***REMOVED***
                token : "string", // single line
                regex : '[ ]*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
        ***REMOVED*** ***REMOVED***
                token : "string", // multi line """ string start
                regex : '[ ]*["]',
                next  : "qqstring"
        ***REMOVED*** ***REMOVED***
                token : "variable.instance",
                regex : "[$]",
                next  : "variable"
        ***REMOVED*** ***REMOVED***
                token : "support.function",
                regex : "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|***REMOVED***\\****REMOVED***|;|::"
        ***REMOVED*** ***REMOVED***
                token : "identifier",
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        ***REMOVED*** ***REMOVED***
                token : "paren.lparen",
                regex : "[[***REMOVED***]",
                next  : "commandItem"
        ***REMOVED*** ***REMOVED***
                token : "paren.lparen",
                regex : "[(]"
        ***REMOVED***  ***REMOVED***
                token : "paren.rparen",
                regex : "[\\])***REMOVED***]"
        ***REMOVED*** ***REMOVED***
                token : "text",
                regex : "\\s+"
        ***REMOVED***
        ],
        "commandItem" : [
            ***REMOVED***
                token : "comment",
                regex : "#.*\\\\$",
                next  : "commentfollow"
        ***REMOVED*** ***REMOVED***
                token : "comment",
                regex : "#.*$",
                next  : "start"
        ***REMOVED*** ***REMOVED***
                token : "string", // single line
                regex : '[ ]*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
        ***REMOVED*** ***REMOVED***
                token : "variable.instance", 
                regex : "[$]",
                next  : "variable"
        ***REMOVED*** ***REMOVED***
                token : "support.function",
                regex : "(?:[:][:])[a-zA-Z0-9_/]+(?:[:][:])",
                next  : "commandItem"
        ***REMOVED*** ***REMOVED***
                token : "support.function",
                regex : "[a-zA-Z0-9_/]+(?:[:][:])",
                next  : "commandItem"
        ***REMOVED*** ***REMOVED***
                token : "support.function",
                regex : "(?:[:][:])",
                next  : "commandItem"
        ***REMOVED*** ***REMOVED***
                token : "paren.rparen",
                regex : "[\\])***REMOVED***]"
        ***REMOVED*** ***REMOVED***
                token : "support.function",
                regex : "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|***REMOVED***\\****REMOVED***|;|::"
        ***REMOVED*** ***REMOVED***
                token : "keyword",
                regex : "[a-zA-Z0-9_/]+",
                next  : "start"
        ***REMOVED*** ],
        "commentfollow" : [ 
            ***REMOVED***
                token : "comment",
                regex : ".*\\\\$",
                next  : "commentfollow"
        ***REMOVED*** ***REMOVED***
                token : "comment",
                regex : '.+',
                next  : "start"
    ***REMOVED*** ],
        "splitlineStart" : [ 
            ***REMOVED***
                token : "text",
                regex : "^.",
                next  : "start"
        ***REMOVED***],
        "variable" : [ 
            ***REMOVED***
                token : "variable.instance", // variable tcl
                regex : "[a-zA-Z_\\d]+(?:[(][a-zA-Z_\\d]+[)])?",
                next  : "start"
        ***REMOVED*** ***REMOVED***
                token : "variable.instance", // variable tcl with braces
                regex : "***REMOVED***?[a-zA-Z_\\d]+***REMOVED***?",
                next  : "start"
        ***REMOVED***],  
        "qqstring" : [ ***REMOVED***
            token : "string", // multi line """ string end
            regex : '(?:[^\\\\]|\\\\.)*?["]',
            next : "start"
    ***REMOVED*** ***REMOVED***
            token : "string",
            regex : '.+'
    ***REMOVED*** ]
***REMOVED***;
***REMOVED***;

oop.inherits(TclHighlightRules, TextHighlightRules);

exports.TclHighlightRules = TclHighlightRules;
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
