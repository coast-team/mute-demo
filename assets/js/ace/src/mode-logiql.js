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
 * ***** END LICENSE BLOCK ***** */

define('ace/mode/logiql', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/logiql_highlight_rules', 'ace/mode/folding/coffee', 'ace/token_iterator', 'ace/range', 'ace/mode/behaviour/cstyle', 'ace/mode/matching_brace_outdent'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var LogiQLHighlightRules = require("./logiql_highlight_rules").LogiQLHighlightRules;
var FoldMode = require("./folding/coffee").FoldMode;
var TokenIterator = require("../token_iterator").TokenIterator;
var Range = require("../range").Range;
var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;

var Mode = function() ***REMOVED***
    this.HighlightRules = LogiQLHighlightRules;
    this.foldingRules = new FoldMode();
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.lineCommentStart = "//";
    this.blockComment = ***REMOVED***start: "/*", end: "*/"***REMOVED***;

    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;
        if (/comment|string/.test(endState))  
            return indent;
        if (tokens.length && tokens[tokens.length - 1].type == "comment.single")
            return indent;

        var match = line.match();
        if (/(-->|<--|<-|->|***REMOVED***)\s*$/.test(line))
            indent += tab;
        return indent;
***REMOVED***;

    this.checkOutdent = function(state, line, input) ***REMOVED***
        if (this.$outdent.checkOutdent(line, input))
            return true;

        if (input !== "\n" && input !== "\r\n")
            return false;
            
        if (!/^\s+/.test(line))
            return false;

        return true;
***REMOVED***;

    this.autoOutdent = function(state, doc, row) ***REMOVED***
        if (this.$outdent.autoOutdent(doc, row))
            return;
        var prevLine = doc.getLine(row);
        var match = prevLine.match(/^\s+/);
        var column = prevLine.lastIndexOf(".") + 1;
        if (!match || !row || !column) return 0;

        var line = doc.getLine(row + 1);
        var startRange = this.getMatching(doc, ***REMOVED***row: row, column: column***REMOVED***);
        if (!startRange || startRange.start.row == row) return 0;

        column = match[0].length;
        var indent = this.$getIndent(doc.getLine(startRange.start.row));
        doc.replace(new Range(row + 1, 0, row + 1, column), indent);
***REMOVED***;

    this.getMatching = function(session, row, column) ***REMOVED***
        if (row == undefined)
            row = session.selection.lead
        if (typeof row == "object") ***REMOVED***
            column = row.column;
            row = row.row;
    ***REMOVED***

        var startToken = session.getTokenAt(row, column);
        var KW_START = "keyword.start", KW_END = "keyword.end";
        var tok;
        if (!startToken)
            return;
        if (startToken.type == KW_START) ***REMOVED***
            var it = new TokenIterator(session, row, column);
            it.step = it.stepForward;
    ***REMOVED*** else if (startToken.type == KW_END) ***REMOVED***
            var it = new TokenIterator(session, row, column);
            it.step = it.stepBackward;
    ***REMOVED*** else
            return;

        while (tok = it.step()) ***REMOVED***
            if (tok.type == KW_START || tok.type == KW_END)
                break;
    ***REMOVED***
        if (!tok || tok.type == startToken.type)
            return;

        var col = it.getCurrentTokenColumn();
        var row = it.getCurrentTokenRow();
        return new Range(row, col, row, col + tok.value.length);
***REMOVED***;
    this.$id = "ace/mode/logiql";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/logiql_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var LogiQLHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED*** start: 
       [ ***REMOVED*** token: 'comment.block',
           regex: '/\\*',
           push: 
            [ ***REMOVED*** token: 'comment.block', regex: '\\*/', next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'comment.block' ***REMOVED*** ],
        ***REMOVED***
         ***REMOVED*** token: 'comment.single',
           regex: '//.*',
        ***REMOVED***
         ***REMOVED*** token: 'constant.numeric',
           regex: '\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fd]?',
        ***REMOVED***
         ***REMOVED*** token: 'string',
           regex: '"',
           push: 
            [ ***REMOVED*** token: 'string', regex: '"', next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'string' ***REMOVED*** ],
        ***REMOVED***
         ***REMOVED*** token: 'constant.language',
           regex: '\\b(true|false)\\b',
        ***REMOVED***
         ***REMOVED*** token: 'entity.name.type.logicblox',
           regex: '`[a-zA-Z_:]+(\\d|\\a)*\\b',
        ***REMOVED***
         ***REMOVED*** token: 'keyword.start', regex: '->',  comment: 'Constraint' ***REMOVED***,
         ***REMOVED*** token: 'keyword.start', regex: '-->', comment: 'Level 1 Constraint'***REMOVED***,
         ***REMOVED*** token: 'keyword.start', regex: '<-',  comment: 'Rule' ***REMOVED***,
         ***REMOVED*** token: 'keyword.start', regex: '<--', comment: 'Level 1 Rule' ***REMOVED***,
         ***REMOVED*** token: 'keyword.end',   regex: '\\.', comment: 'Terminator' ***REMOVED***,
         ***REMOVED*** token: 'keyword.other', regex: '!',   comment: 'Negation' ***REMOVED***,
         ***REMOVED*** token: 'keyword.other', regex: ',',   comment: 'Conjunction' ***REMOVED***,
         ***REMOVED*** token: 'keyword.other', regex: ';',   comment: 'Disjunction' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator', regex: '<=|>=|!=|<|>', comment: 'Equality'***REMOVED***,
         ***REMOVED*** token: 'keyword.other', regex: '@', comment: 'Equality' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator', regex: '\\+|-|\\*|/', comment: 'Arithmetic operations'***REMOVED***,
         ***REMOVED*** token: 'keyword', regex: '::', comment: 'Colon colon' ***REMOVED***,
         ***REMOVED*** token: 'support.function',
           regex: '\\b(agg\\s*<<)',
           push: 
            [ ***REMOVED*** include: '$self' ***REMOVED***,
              ***REMOVED*** token: 'support.function',
                regex: '>>',
                next: 'pop' ***REMOVED*** ],
        ***REMOVED***
         ***REMOVED*** token: 'storage.modifier',
           regex: '\\b(lang:[\\w:]*)',
        ***REMOVED***
         ***REMOVED*** token: [ 'storage.type', 'text' ],
           regex: '(export|sealed|clauses|block|alias|alias_all)(\\s*\\()(?=`)',
        ***REMOVED***
         ***REMOVED*** token: 'entity.name',
           regex: '[a-zA-Z_][a-zA-Z_0-9:]*(@prev|@init|@final)?(?=(\\(|\\[))',
        ***REMOVED***
         ***REMOVED*** token: 'variable.parameter',
           regex: '([a-zA-Z][a-zA-Z_0-9]*|_)\\s*(?=(,|\\.|<-|->|\\)|\\]|=))',
        ***REMOVED*** ] ***REMOVED***
    
    this.normalizeRules();
***REMOVED***;

oop.inherits(LogiQLHighlightRules, TextHighlightRules);

exports.LogiQLHighlightRules = LogiQLHighlightRules;
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

define('ace/mode/behaviour/cstyle', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/behaviour', 'ace/token_iterator', 'ace/lib/lang'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var Behaviour = require("../behaviour").Behaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;
var lang = require("../../lib/lang");

var SAFE_INSERT_IN_TOKENS =
    ["text", "paren.rparen", "punctuation.operator"];
var SAFE_INSERT_BEFORE_TOKENS =
    ["text", "paren.rparen", "punctuation.operator", "comment"];

var context;
var contextCache = ***REMOVED******REMOVED***
var initContext = function(editor) ***REMOVED***
    var id = -1;
    if (editor.multiSelect) ***REMOVED***
        id = editor.selection.id;
        if (contextCache.rangeCount != editor.multiSelect.rangeCount)
            contextCache = ***REMOVED***rangeCount: editor.multiSelect.rangeCount***REMOVED***;
***REMOVED***
    if (contextCache[id])
        return context = contextCache[id];
    context = contextCache[id] = ***REMOVED***
        autoInsertedBrackets: 0,
        autoInsertedRow: -1,
        autoInsertedLineEnd: "",
        maybeInsertedBrackets: 0,
        maybeInsertedRow: -1,
        maybeInsertedLineStart: "",
        maybeInsertedLineEnd: ""
***REMOVED***;
***REMOVED***;

var CstyleBehaviour = function() ***REMOVED***
    this.add("braces", "insertion", function(state, action, editor, session, text) ***REMOVED***
        var cursor = editor.getCursorPosition();
        var line = session.doc.getLine(cursor.row);
        if (text == '***REMOVED***') ***REMOVED***
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "***REMOVED***" && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: '***REMOVED***' + selected + '***REMOVED***',
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else if (CstyleBehaviour.isSaneInsertion(editor, session)) ***REMOVED***
                if (/[\]\***REMOVED***\)]/.test(line[cursor.column]) || editor.inMultiSelectMode) ***REMOVED***
                    CstyleBehaviour.recordAutoInsert(editor, session, "***REMOVED***");
                    return ***REMOVED***
                        text: '***REMOVED******REMOVED***',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED*** else ***REMOVED***
                    CstyleBehaviour.recordMaybeInsert(editor, session, "***REMOVED***");
                    return ***REMOVED***
                        text: '***REMOVED***',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED*** else if (text == '***REMOVED***') ***REMOVED***
            initContext(editor);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == '***REMOVED***') ***REMOVED***
                var matching = session.$findOpeningBracket('***REMOVED***', ***REMOVED***column: cursor.column + 1, row: cursor.row***REMOVED***);
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) ***REMOVED***
                    CstyleBehaviour.popAutoInsertedClosing();
                    return ***REMOVED***
                        text: '',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED*** else if (text == "\n" || text == "\r\n") ***REMOVED***
            initContext(editor);
            var closing = "";
            if (CstyleBehaviour.isMaybeInsertedClosing(cursor, line)) ***REMOVED***
                closing = lang.stringRepeat("***REMOVED***", context.maybeInsertedBrackets);
                CstyleBehaviour.clearMaybeInsertedClosing();
        ***REMOVED***
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar === '***REMOVED***') ***REMOVED***
                var openBracePos = session.findMatchingBracket(***REMOVED***row: cursor.row, column: cursor.column+1***REMOVED***, '***REMOVED***');
                if (!openBracePos)
                     return null;
                var next_indent = this.$getIndent(session.getLine(openBracePos.row));
        ***REMOVED*** else if (closing) ***REMOVED***
                var next_indent = this.$getIndent(line);
        ***REMOVED*** else ***REMOVED***
                CstyleBehaviour.clearMaybeInsertedClosing();
                return;
        ***REMOVED***
            var indent = next_indent + session.getTabString();

            return ***REMOVED***
                text: '\n' + indent + '\n' + next_indent + closing,
                selection: [1, indent.length, 1, indent.length]
        ***REMOVED***;
    ***REMOVED*** else ***REMOVED***
            CstyleBehaviour.clearMaybeInsertedClosing();
    ***REMOVED***
***REMOVED***);

    this.add("braces", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '***REMOVED***') ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.end.column, range.end.column + 1);
            if (rightChar == '***REMOVED***') ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED*** else ***REMOVED***
                context.maybeInsertedBrackets--;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("parens", "insertion", function(state, action, editor, session, text) ***REMOVED***
        if (text == '(') ***REMOVED***
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: '(' + selected + ')',
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else if (CstyleBehaviour.isSaneInsertion(editor, session)) ***REMOVED***
                CstyleBehaviour.recordAutoInsert(editor, session, ")");
                return ***REMOVED***
                    text: '()',
                    selection: [1, 1]
            ***REMOVED***;
        ***REMOVED***
    ***REMOVED*** else if (text == ')') ***REMOVED***
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ')') ***REMOVED***
                var matching = session.$findOpeningBracket(')', ***REMOVED***column: cursor.column + 1, row: cursor.row***REMOVED***);
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) ***REMOVED***
                    CstyleBehaviour.popAutoInsertedClosing();
                    return ***REMOVED***
                        text: '',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("parens", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '(') ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ')') ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("brackets", "insertion", function(state, action, editor, session, text) ***REMOVED***
        if (text == '[') ***REMOVED***
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: '[' + selected + ']',
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else if (CstyleBehaviour.isSaneInsertion(editor, session)) ***REMOVED***
                CstyleBehaviour.recordAutoInsert(editor, session, "]");
                return ***REMOVED***
                    text: '[]',
                    selection: [1, 1]
            ***REMOVED***;
        ***REMOVED***
    ***REMOVED*** else if (text == ']') ***REMOVED***
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ']') ***REMOVED***
                var matching = session.$findOpeningBracket(']', ***REMOVED***column: cursor.column + 1, row: cursor.row***REMOVED***);
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) ***REMOVED***
                    CstyleBehaviour.popAutoInsertedClosing();
                    return ***REMOVED***
                        text: '',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("brackets", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '[') ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ']') ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("string_dquotes", "insertion", function(state, action, editor, session, text) ***REMOVED***
        if (text == '"' || text == "'") ***REMOVED***
            initContext(editor);
            var quote = text;
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "'" && selected != '"' && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: quote + selected + quote,
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else ***REMOVED***
                var cursor = editor.getCursorPosition();
                var line = session.doc.getLine(cursor.row);
                var leftChar = line.substring(cursor.column-1, cursor.column);
                if (leftChar == '\\') ***REMOVED***
                    return null;
            ***REMOVED***
                var tokens = session.getTokens(selection.start.row);
                var col = 0, token;
                var quotepos = -1; // Track whether we're inside an open quote.

                for (var x = 0; x < tokens.length; x++) ***REMOVED***
                    token = tokens[x];
                    if (token.type == "string") ***REMOVED***
                      quotepos = -1;
                ***REMOVED*** else if (quotepos < 0) ***REMOVED***
                      quotepos = token.value.indexOf(quote);
                ***REMOVED***
                    if ((token.value.length + col) > selection.start.column) ***REMOVED***
                        break;
                ***REMOVED***
                    col += tokens[x].value.length;
            ***REMOVED***
                if (!token || (quotepos < 0 && token.type !== "comment" && (token.type !== "string" || ((selection.start.column !== token.value.length+col-1) && token.value.lastIndexOf(quote) === token.value.length-1)))) ***REMOVED***
                    if (!CstyleBehaviour.isSaneInsertion(editor, session))
                        return;
                    return ***REMOVED***
                        text: quote + quote,
                        selection: [1,1]
                ***REMOVED***;
            ***REMOVED*** else if (token && token.type === "string") ***REMOVED***
                    var rightChar = line.substring(cursor.column, cursor.column + 1);
                    if (rightChar == quote) ***REMOVED***
                        return ***REMOVED***
                            text: '',
                            selection: [1, 1]
                    ***REMOVED***;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("string_dquotes", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && (selected == '"' || selected == "'")) ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == selected) ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

***REMOVED***;

    
CstyleBehaviour.isSaneInsertion = function(editor, session) ***REMOVED***
    var cursor = editor.getCursorPosition();
    var iterator = new TokenIterator(session, cursor.row, cursor.column);
    if (!this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS)) ***REMOVED***
        var iterator2 = new TokenIterator(session, cursor.row, cursor.column + 1);
        if (!this.$matchTokenType(iterator2.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS))
            return false;
***REMOVED***
    iterator.stepForward();
    return iterator.getCurrentTokenRow() !== cursor.row ||
        this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_BEFORE_TOKENS);
***REMOVED***;

CstyleBehaviour.$matchTokenType = function(token, types) ***REMOVED***
    return types.indexOf(token.type || token) > -1;
***REMOVED***;

CstyleBehaviour.recordAutoInsert = function(editor, session, bracket) ***REMOVED***
    var cursor = editor.getCursorPosition();
    var line = session.doc.getLine(cursor.row);
    if (!this.isAutoInsertedClosing(cursor, line, context.autoInsertedLineEnd[0]))
        context.autoInsertedBrackets = 0;
    context.autoInsertedRow = cursor.row;
    context.autoInsertedLineEnd = bracket + line.substr(cursor.column);
    context.autoInsertedBrackets++;
***REMOVED***;

CstyleBehaviour.recordMaybeInsert = function(editor, session, bracket) ***REMOVED***
    var cursor = editor.getCursorPosition();
    var line = session.doc.getLine(cursor.row);
    if (!this.isMaybeInsertedClosing(cursor, line))
        context.maybeInsertedBrackets = 0;
    context.maybeInsertedRow = cursor.row;
    context.maybeInsertedLineStart = line.substr(0, cursor.column) + bracket;
    context.maybeInsertedLineEnd = line.substr(cursor.column);
    context.maybeInsertedBrackets++;
***REMOVED***;

CstyleBehaviour.isAutoInsertedClosing = function(cursor, line, bracket) ***REMOVED***
    return context.autoInsertedBrackets > 0 &&
        cursor.row === context.autoInsertedRow &&
        bracket === context.autoInsertedLineEnd[0] &&
        line.substr(cursor.column) === context.autoInsertedLineEnd;
***REMOVED***;

CstyleBehaviour.isMaybeInsertedClosing = function(cursor, line) ***REMOVED***
    return context.maybeInsertedBrackets > 0 &&
        cursor.row === context.maybeInsertedRow &&
        line.substr(cursor.column) === context.maybeInsertedLineEnd &&
        line.substr(0, cursor.column) == context.maybeInsertedLineStart;
***REMOVED***;

CstyleBehaviour.popAutoInsertedClosing = function() ***REMOVED***
    context.autoInsertedLineEnd = context.autoInsertedLineEnd.substr(1);
    context.autoInsertedBrackets--;
***REMOVED***;

CstyleBehaviour.clearMaybeInsertedClosing = function() ***REMOVED***
    if (context) ***REMOVED***
        context.maybeInsertedBrackets = 0;
        context.maybeInsertedRow = -1;
***REMOVED***
***REMOVED***;



oop.inherits(CstyleBehaviour, Behaviour);

exports.CstyleBehaviour = CstyleBehaviour;
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
