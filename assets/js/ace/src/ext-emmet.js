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

define('ace/ext/emmet', ['require', 'exports', 'module' , 'ace/keyboard/hash_handler', 'ace/editor', 'ace/snippets', 'ace/range', 'ace/config'], function(require, exports, module) ***REMOVED***

var HashHandler = require("ace/keyboard/hash_handler").HashHandler;
var Editor = require("ace/editor").Editor;
var snippetManager = require("ace/snippets").snippetManager;
var Range = require("ace/range").Range;
var emmet;

Editor.prototype.indexToPosition = function(index) ***REMOVED***
    return this.session.doc.indexToPosition(index);
***REMOVED***;

Editor.prototype.positionToIndex = function(pos) ***REMOVED***
    return this.session.doc.positionToIndex(pos);
***REMOVED***;
function AceEmmetEditor() ***REMOVED******REMOVED***

AceEmmetEditor.prototype = ***REMOVED***
    setupContext: function(editor) ***REMOVED***
        this.ace = editor;
        this.indentation = editor.session.getTabString();
        if (!emmet)
            emmet = window.emmet;
        emmet.require("resources").setVariable("indentation", this.indentation);
        this.$syntax = null;
        this.$syntax = this.getSyntax();
***REMOVED***
    getSelectionRange: function() ***REMOVED***
        var range = this.ace.getSelectionRange();
        return ***REMOVED***
            start: this.ace.positionToIndex(range.start),
            end: this.ace.positionToIndex(range.end)
    ***REMOVED***;
***REMOVED***
    createSelection: function(start, end) ***REMOVED***
        this.ace.selection.setRange(***REMOVED***
            start: this.ace.indexToPosition(start),
            end: this.ace.indexToPosition(end)
    ***REMOVED***);
***REMOVED***
    getCurrentLineRange: function() ***REMOVED***
        var row = this.ace.getCursorPosition().row;
        var lineLength = this.ace.session.getLine(row).length;
        var index = this.ace.positionToIndex(***REMOVED***row: row, column: 0***REMOVED***);
        return ***REMOVED***
            start: index,
            end: index + lineLength
    ***REMOVED***;
***REMOVED***
    getCaretPos: function()***REMOVED***
        var pos = this.ace.getCursorPosition();
        return this.ace.positionToIndex(pos);
***REMOVED***
    setCaretPos: function(index)***REMOVED***
        var pos = this.ace.indexToPosition(index);
        this.ace.selection.moveToPosition(pos);
***REMOVED***
    getCurrentLine: function() ***REMOVED***
        var row = this.ace.getCursorPosition().row;
        return this.ace.session.getLine(row);
***REMOVED***
    replaceContent: function(value, start, end, noIndent) ***REMOVED***
        if (end == null)
            end = start == null ? this.getContent().length : start;
        if (start == null)
            start = 0;        
        
        var editor = this.ace;
        var range = Range.fromPoints(editor.indexToPosition(start), editor.indexToPosition(end));
        editor.session.remove(range);
        
        range.end = range.start;
        
        value = this.$updateTabstops(value);
        snippetManager.insertSnippet(editor, value)
***REMOVED***
    getContent: function()***REMOVED***
        return this.ace.getValue();
***REMOVED***
    getSyntax: function() ***REMOVED***
        if (this.$syntax)
            return this.$syntax;
        var syntax = this.ace.session.$modeId.split("/").pop();
        if (syntax == "html" || syntax == "php") ***REMOVED***
            var cursor = this.ace.getCursorPosition();
            var state = this.ace.session.getState(cursor.row);
            if (typeof state != "string")
                state = state[0];
            if (state) ***REMOVED***
                state = state.split("-");
                if (state.length > 1)
                    syntax = state[0];
                else if (syntax == "php")
                    syntax = "html";
        ***REMOVED***
    ***REMOVED***
        return syntax;
***REMOVED***
    getProfileName: function() ***REMOVED***
        switch(this.getSyntax()) ***REMOVED***
          case "css": return "css";
          case "xml":
          case "xsl":
            return "xml";
          case "html":
            var profile = emmet.require("resources").getVariable("profile");
            if (!profile)
                profile = this.ace.session.getLines(0,2).join("").search(/<!DOCTYPE[^>]+XHTML/i) != -1 ? "xhtml": "html";
            return profile;
    ***REMOVED***
        return "xhtml";
***REMOVED***
    prompt: function(title) ***REMOVED***
        return prompt(title);
***REMOVED***
    getSelection: function() ***REMOVED***
        return this.ace.session.getTextRange();
***REMOVED***
    getFilePath: function() ***REMOVED***
        return "";
***REMOVED***
    $updateTabstops: function(value) ***REMOVED***
        var base = 1000;
        var zeroBase = 0;
        var lastZero = null;
        var range = emmet.require('range');
        var ts = emmet.require('tabStops');
        var settings = emmet.require('resources').getVocabulary("user");
        var tabstopOptions = ***REMOVED***
            tabstop: function(data) ***REMOVED***
                var group = parseInt(data.group, 10);
                var isZero = group === 0;
                if (isZero)
                    group = ++zeroBase;
                else
                    group += base;

                var placeholder = data.placeholder;
                if (placeholder) ***REMOVED***
                    placeholder = ts.processText(placeholder, tabstopOptions);
            ***REMOVED***

                var result = '$***REMOVED***' + group + (placeholder ? ':' + placeholder : '') + '***REMOVED***';

                if (isZero) ***REMOVED***
                    lastZero = range.create(data.start, result);
            ***REMOVED***

                return result
        ***REMOVED***
            escape: function(ch) ***REMOVED***
                if (ch == '$') return '\\$';
                if (ch == '\\') return '\\\\';
                return ch;
        ***REMOVED***
    ***REMOVED***;

        value = ts.processText(value, tabstopOptions);

        if (settings.variables['insert_final_tabstop'] && !/\$\***REMOVED***0\***REMOVED***$/.test(value)) ***REMOVED***
            value += '$***REMOVED***0***REMOVED***';
    ***REMOVED*** else if (lastZero) ***REMOVED***
            value = emmet.require('utils').replaceSubstring(value, '$***REMOVED***0***REMOVED***', lastZero);
    ***REMOVED***
        
        return value;
***REMOVED***
***REMOVED***;


var keymap = ***REMOVED***
    expand_abbreviation: ***REMOVED***"mac": "ctrl+alt+e", "win": "alt+e"***REMOVED***,
    match_pair_outward: ***REMOVED***"mac": "ctrl+d", "win": "ctrl+,"***REMOVED***,
    match_pair_inward: ***REMOVED***"mac": "ctrl+j", "win": "ctrl+shift+0"***REMOVED***,
    matching_pair: ***REMOVED***"mac": "ctrl+alt+j", "win": "alt+j"***REMOVED***,
    next_edit_point: "alt+right",
    prev_edit_point: "alt+left",
    toggle_comment: ***REMOVED***"mac": "command+/", "win": "ctrl+/"***REMOVED***,
    split_join_tag: ***REMOVED***"mac": "shift+command+'", "win": "shift+ctrl+`"***REMOVED***,
    remove_tag: ***REMOVED***"mac": "command+'", "win": "shift+ctrl+;"***REMOVED***,
    evaluate_math_expression: ***REMOVED***"mac": "shift+command+y", "win": "shift+ctrl+y"***REMOVED***,
    increment_number_by_1: "ctrl+up",
    decrement_number_by_1: "ctrl+down",
    increment_number_by_01: "alt+up",
    decrement_number_by_01: "alt+down",
    increment_number_by_10: ***REMOVED***"mac": "alt+command+up", "win": "shift+alt+up"***REMOVED***,
    decrement_number_by_10: ***REMOVED***"mac": "alt+command+down", "win": "shift+alt+down"***REMOVED***,
    select_next_item: ***REMOVED***"mac": "shift+command+.", "win": "shift+ctrl+."***REMOVED***,
    select_previous_item: ***REMOVED***"mac": "shift+command+,", "win": "shift+ctrl+,"***REMOVED***,
    reflect_css_value: ***REMOVED***"mac": "shift+command+r", "win": "shift+ctrl+r"***REMOVED***,

    encode_decode_data_url: ***REMOVED***"mac": "shift+ctrl+d", "win": "ctrl+'"***REMOVED***,
    expand_abbreviation_with_tab: "Tab",
    wrap_with_abbreviation: ***REMOVED***"mac": "shift+ctrl+a", "win": "shift+ctrl+a"***REMOVED***
***REMOVED***;

var editorProxy = new AceEmmetEditor();
exports.commands = new HashHandler();
exports.runEmmetCommand = function(editor) ***REMOVED***
    editorProxy.setupContext(editor);
    if (editorProxy.getSyntax() == "php")
        return false;
    var actions = emmet.require("actions");

    if (this.action == "expand_abbreviation_with_tab") ***REMOVED***
        if (!editor.selection.isEmpty())
            return false;
***REMOVED***
    
    if (this.action == "wrap_with_abbreviation") ***REMOVED***
        return setTimeout(function() ***REMOVED***
            actions.run("wrap_with_abbreviation", editorProxy);
    ***REMOVED*** 0);
***REMOVED***
    
    try ***REMOVED***
        var result = actions.run(this.action, editorProxy);
***REMOVED*** catch(e) ***REMOVED***
        editor._signal("changeStatus", typeof e == "string" ? e : e.message);
        console.log(e);
        result = false
***REMOVED***
    return result;
***REMOVED***;

for (var command in keymap) ***REMOVED***
    exports.commands.addCommand(***REMOVED***
        name: "emmet:" + command,
        action: command,
        bindKey: keymap[command],
        exec: exports.runEmmetCommand,
        multiSelectAction: "forEach"
***REMOVED***);
***REMOVED***

var onChangeMode = function(e, target) ***REMOVED***
    var editor = target;
    if (!editor)
        return;
    var modeId = editor.session.$modeId;
    var enabled = modeId && /css|less|scss|sass|stylus|html|php/.test(modeId);
    if (e.enableEmmet === false)
        enabled = false;
    if (enabled)
        editor.keyBinding.addKeyboardHandler(exports.commands);
    else
        editor.keyBinding.removeKeyboardHandler(exports.commands);
***REMOVED***;


exports.AceEmmetEditor = AceEmmetEditor;
require("ace/config").defineOptions(Editor.prototype, "editor", ***REMOVED***
    enableEmmet: ***REMOVED***
        set: function(val) ***REMOVED***
            this[val ? "on" : "removeListener"]("changeMode", onChangeMode);
            onChangeMode(***REMOVED***enableEmmet: !!val***REMOVED***, this);
    ***REMOVED***
        value: true
***REMOVED***
***REMOVED***);


exports.setCore = function(e) ***REMOVED***emmet = e;***REMOVED***;
***REMOVED***);

define('ace/snippets', ['require', 'exports', 'module' , 'ace/lib/lang', 'ace/range', 'ace/keyboard/hash_handler', 'ace/tokenizer', 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

var lang = require("./lib/lang")
var Range = require("./range").Range
var HashHandler = require("./keyboard/hash_handler").HashHandler;
var Tokenizer = require("./tokenizer").Tokenizer;
var comparePoints = Range.comparePoints;

var SnippetManager = function() ***REMOVED***
    this.snippetMap = ***REMOVED******REMOVED***;
    this.snippetNameMap = ***REMOVED******REMOVED***;
***REMOVED***;

(function() ***REMOVED***
    this.getTokenizer = function() ***REMOVED***
        function TabstopToken(str, _, stack) ***REMOVED***
            str = str.substr(1);
            if (/^\d+$/.test(str) && !stack.inFormatString)
                return [***REMOVED***tabstopId: parseInt(str, 10)***REMOVED***];
            return [***REMOVED***text: str***REMOVED***]
    ***REMOVED***
        function escape(ch) ***REMOVED***
            return "(?:[^\\\\" + ch + "]|\\\\.)";
    ***REMOVED***
        SnippetManager.$tokenizer = new Tokenizer(***REMOVED***
            start: [
                ***REMOVED***regex: /:/, onMatch: function(val, state, stack) ***REMOVED***
                    if (stack.length && stack[0].expectIf) ***REMOVED***
                        stack[0].expectIf = false;
                        stack[0].elseBranch = stack[0];
                        return [stack[0]];
                ***REMOVED***
                    return ":";
            ***REMOVED******REMOVED***,
                ***REMOVED***regex: /\\./, onMatch: function(val, state, stack) ***REMOVED***
                    var ch = val[1];
                    if (ch == "***REMOVED***" && stack.length) ***REMOVED***
                        val = ch;
                ***REMOVED***else if ("`$\\".indexOf(ch) != -1) ***REMOVED***
                        val = ch;
                ***REMOVED*** else if (stack.inFormatString) ***REMOVED***
                        if (ch == "n")
                            val = "\n";
                        else if (ch == "t")
                            val = "\n";
                        else if ("ulULE".indexOf(ch) != -1) ***REMOVED***
                            val = ***REMOVED***changeCase: ch, local: ch > "a"***REMOVED***;
                    ***REMOVED***
                ***REMOVED***

                    return [val];
            ***REMOVED******REMOVED***,
                ***REMOVED***regex: /***REMOVED***/, onMatch: function(val, state, stack) ***REMOVED***
                    return [stack.length ? stack.shift() : val];
            ***REMOVED******REMOVED***,
                ***REMOVED***regex: /\$(?:\d+|\w+)/, onMatch: TabstopToken***REMOVED***,
                ***REMOVED***regex: /\$\***REMOVED***[\dA-Z_a-z]+/, onMatch: function(str, state, stack) ***REMOVED***
                    var t = TabstopToken(str.substr(1), state, stack);
                    stack.unshift(t[0]);
                    return t;
            ***REMOVED*** next: "snippetVar"***REMOVED***,
                ***REMOVED***regex: /\n/, token: "newline", merge: false***REMOVED***
            ],
            snippetVar: [
                ***REMOVED***regex: "\\|" + escape("\\|") + "*\\|", onMatch: function(val, state, stack) ***REMOVED***
                    stack[0].choices = val.slice(1, -1).split(",");
            ***REMOVED*** next: "start"***REMOVED***,
                ***REMOVED***regex: "/(" + escape("/") + "+)/(?:(" + escape("/") + "*)/)(\\w*):?",
                 onMatch: function(val, state, stack) ***REMOVED***
                    var ts = stack[0];
                    ts.fmtString = val;

                    val = this.splitRegex.exec(val);
                    ts.guard = val[1];
                    ts.fmt = val[2];
                    ts.flag = val[3];
                    return "";
            ***REMOVED*** next: "start"***REMOVED***,
                ***REMOVED***regex: "`" + escape("`") + "*`", onMatch: function(val, state, stack) ***REMOVED***
                    stack[0].code = val.splice(1, -1);
                    return "";
            ***REMOVED*** next: "start"***REMOVED***,
                ***REMOVED***regex: "\\?", onMatch: function(val, state, stack) ***REMOVED***
                    if (stack[0])
                        stack[0].expectIf = true;
            ***REMOVED*** next: "start"***REMOVED***,
                ***REMOVED***regex: "([^:***REMOVED***\\\\]|\\\\.)*:?", token: "", next: "start"***REMOVED***
            ],
            formatString: [
                ***REMOVED***regex: "/(" + escape("/") + "+)/", token: "regex"***REMOVED***,
                ***REMOVED***regex: "", onMatch: function(val, state, stack) ***REMOVED***
                    stack.inFormatString = true;
            ***REMOVED*** next: "start"***REMOVED***
            ]
    ***REMOVED***);
        SnippetManager.prototype.getTokenizer = function() ***REMOVED***
            return SnippetManager.$tokenizer;
    ***REMOVED***
        return SnippetManager.$tokenizer;
***REMOVED***;

    this.tokenizeTmSnippet = function(str, startState) ***REMOVED***
        return this.getTokenizer().getLineTokens(str, startState).tokens.map(function(x) ***REMOVED***
            return x.value || x;
    ***REMOVED***);
***REMOVED***;

    this.$getDefaultValue = function(editor, name) ***REMOVED***
        if (/^[A-Z]\d+$/.test(name)) ***REMOVED***
            var i = name.substr(1);
            return (this.variables[name[0] + "__"] || ***REMOVED******REMOVED***)[i];
    ***REMOVED***
        if (/^\d+$/.test(name)) ***REMOVED***
            return (this.variables.__ || ***REMOVED******REMOVED***)[name];
    ***REMOVED***
        name = name.replace(/^TM_/, "");

        if (!editor)
            return;
        var s = editor.session;
        switch(name) ***REMOVED***
            case "CURRENT_WORD":
                var r = s.getWordRange();
            case "SELECTION":
            case "SELECTED_TEXT":
                return s.getTextRange(r);
            case "CURRENT_LINE":
                return s.getLine(editor.getCursorPosition().row);
            case "PREV_LINE": // not possible in textmate
                return s.getLine(editor.getCursorPosition().row - 1);
            case "LINE_INDEX":
                return editor.getCursorPosition().column;
            case "LINE_NUMBER":
                return editor.getCursorPosition().row + 1;
            case "SOFT_TABS":
                return s.getUseSoftTabs() ? "YES" : "NO";
            case "TAB_SIZE":
                return s.getTabSize();
            case "FILENAME":
            case "FILEPATH":
                return "";
            case "FULLNAME":
                return "Ace";
    ***REMOVED***
***REMOVED***;
    this.variables = ***REMOVED******REMOVED***;
    this.getVariableValue = function(editor, varName) ***REMOVED***
        if (this.variables.hasOwnProperty(varName))
            return this.variables[varName](editor, varName) || "";
        return this.$getDefaultValue(editor, varName) || "";
***REMOVED***;
    this.tmStrFormat = function(str, ch, editor) ***REMOVED***
        var flag = ch.flag || "";
        var re = ch.guard;
        re = new RegExp(re, flag.replace(/[^gi]/, ""));
        var fmtTokens = this.tokenizeTmSnippet(ch.fmt, "formatString");
        var _self = this;
        var formatted = str.replace(re, function() ***REMOVED***
            _self.variables.__ = arguments;
            var fmtParts = _self.resolveVariables(fmtTokens, editor);
            var gChangeCase = "E";
            for (var i  = 0; i < fmtParts.length; i++) ***REMOVED***
                var ch = fmtParts[i];
                if (typeof ch == "object") ***REMOVED***
                    fmtParts[i] = "";
                    if (ch.changeCase && ch.local) ***REMOVED***
                        var next = fmtParts[i + 1];
                        if (next && typeof next == "string") ***REMOVED***
                            if (ch.changeCase == "u")
                                fmtParts[i] = next[0].toUpperCase();
                            else
                                fmtParts[i] = next[0].toLowerCase();
                            fmtParts[i + 1] = next.substr(1);
                    ***REMOVED***
                ***REMOVED*** else if (ch.changeCase) ***REMOVED***
                        gChangeCase = ch.changeCase;
                ***REMOVED***
            ***REMOVED*** else if (gChangeCase == "U") ***REMOVED***
                    fmtParts[i] = ch.toUpperCase();
            ***REMOVED*** else if (gChangeCase == "L") ***REMOVED***
                    fmtParts[i] = ch.toLowerCase();
            ***REMOVED***
        ***REMOVED***
            return fmtParts.join("");
    ***REMOVED***);
        this.variables.__ = null;
        return formatted;
***REMOVED***;

    this.resolveVariables = function(snippet, editor) ***REMOVED***
        var result = [];
        for (var i = 0; i < snippet.length; i++) ***REMOVED***
            var ch = snippet[i];
            if (typeof ch == "string") ***REMOVED***
                result.push(ch);
        ***REMOVED*** else if (typeof ch != "object") ***REMOVED***
                continue;
        ***REMOVED*** else if (ch.skip) ***REMOVED***
                gotoNext(ch);
        ***REMOVED*** else if (ch.processed < i) ***REMOVED***
                continue;
        ***REMOVED*** else if (ch.text) ***REMOVED***
                var value = this.getVariableValue(editor, ch.text);
                if (value && ch.fmtString)
                    value = this.tmStrFormat(value, ch);
                ch.processed = i;
                if (ch.expectIf == null) ***REMOVED***
                    if (value) ***REMOVED***
                        result.push(value);
                        gotoNext(ch);
                ***REMOVED***
            ***REMOVED*** else ***REMOVED***
                    if (value) ***REMOVED***
                        ch.skip = ch.elseBranch;
                ***REMOVED*** else
                        gotoNext(ch);
            ***REMOVED***
        ***REMOVED*** else if (ch.tabstopId != null) ***REMOVED***
                result.push(ch);
        ***REMOVED*** else if (ch.changeCase != null) ***REMOVED***
                result.push(ch);
        ***REMOVED***
    ***REMOVED***
        function gotoNext(ch) ***REMOVED***
            var i1 = snippet.indexOf(ch, i + 1);
            if (i1 != -1)
                i = i1;
    ***REMOVED***
        return result;
***REMOVED***;

    this.insertSnippet = function(editor, snippetText) ***REMOVED***
        var cursor = editor.getCursorPosition();
        var line = editor.session.getLine(cursor.row);
        var tabString = editor.session.getTabString();
        var indentString = line.match(/^\s*/)[0];
        
        if (cursor.column < indentString.length)
            indentString = indentString.slice(0, cursor.column);

        var tokens = this.tokenizeTmSnippet(snippetText);
        tokens = this.resolveVariables(tokens, editor);
        tokens = tokens.map(function(x) ***REMOVED***
            if (x == "\n")
                return x + indentString;
            if (typeof x == "string")
                return x.replace(/\t/g, tabString);
            return x;
    ***REMOVED***);
        var tabstops = [];
        tokens.forEach(function(p, i) ***REMOVED***
            if (typeof p != "object")
                return;
            var id = p.tabstopId;
            var ts = tabstops[id];
            if (!ts) ***REMOVED***
                ts = tabstops[id] = [];
                ts.index = id;
                ts.value = "";
        ***REMOVED***
            if (ts.indexOf(p) !== -1)
                return;
            ts.push(p);
            var i1 = tokens.indexOf(p, i + 1);
            if (i1 === -1)
                return;

            var value = tokens.slice(i + 1, i1);
            var isNested = value.some(function(t) ***REMOVED***return typeof t === "object"***REMOVED***);          
            if (isNested && !ts.value) ***REMOVED***
                ts.value = value;
        ***REMOVED*** else if (value.length && (!ts.value || typeof ts.value !== "string")) ***REMOVED***
                ts.value = value.join("");
        ***REMOVED***
    ***REMOVED***);
        tabstops.forEach(function(ts) ***REMOVED***ts.length = 0***REMOVED***);
        var expanding = ***REMOVED******REMOVED***;
        function copyValue(val) ***REMOVED***
            var copy = []
            for (var i = 0; i < val.length; i++) ***REMOVED***
                var p = val[i];
                if (typeof p == "object") ***REMOVED***
                    if (expanding[p.tabstopId])
                        continue;
                    var j = val.lastIndexOf(p, i - 1);
                    p = copy[j] || ***REMOVED***tabstopId: p.tabstopId***REMOVED***;
            ***REMOVED***
                copy[i] = p;
        ***REMOVED***
            return copy;
    ***REMOVED***
        for (var i = 0; i < tokens.length; i++) ***REMOVED***
            var p = tokens[i];
            if (typeof p != "object")
                continue;
            var id = p.tabstopId;
            var i1 = tokens.indexOf(p, i + 1);
            if (expanding[id]) ***REMOVED***
                if (expanding[id] === p)
                    expanding[id] = null;
                continue;
        ***REMOVED***
            
            var ts = tabstops[id];
            var arg = typeof ts.value == "string" ? [ts.value] : copyValue(ts.value);
            arg.unshift(i + 1, Math.max(0, i1 - i));
            arg.push(p);
            expanding[id] = p;
            tokens.splice.apply(tokens, arg);

            if (ts.indexOf(p) === -1)
                ts.push(p);
    ***REMOVED***;
        var row = 0, column = 0;
        var text = "";
        tokens.forEach(function(t) ***REMOVED***
            if (typeof t === "string") ***REMOVED***
                if (t[0] === "\n")***REMOVED***
                    column = t.length - 1;
                    row ++;
            ***REMOVED*** else
                    column += t.length;
                text += t;
        ***REMOVED*** else ***REMOVED***
                if (!t.start)
                    t.start = ***REMOVED***row: row, column: column***REMOVED***;
                else
                    t.end = ***REMOVED***row: row, column: column***REMOVED***;
        ***REMOVED***
    ***REMOVED***);
        var range = editor.getSelectionRange();
        var end = editor.session.replace(range, text);

        var tabstopManager = new TabstopManager(editor);
        tabstopManager.addTabstops(tabstops, range.start, end);
        tabstopManager.tabNext();
***REMOVED***;

    this.$getScope = function(editor) ***REMOVED***
        var scope = editor.session.$mode.$id || "";
        scope = scope.split("/").pop();
        if (scope === "html" || scope === "php") ***REMOVED***
            if (scope === "php" && !editor.session.$mode.inlinePhp) 
                scope = "html";
            var c = editor.getCursorPosition()
            var state = editor.session.getState(c.row);
            if (typeof state === "object") ***REMOVED***
                state = state[0];
        ***REMOVED***
            if (state.substring) ***REMOVED***
                if (state.substring(0, 3) == "js-")
                    scope = "javascript";
                else if (state.substring(0, 4) == "css-")
                    scope = "css";
                else if (state.substring(0, 4) == "php-")
                    scope = "php";
        ***REMOVED***
    ***REMOVED***
        
        return scope;
***REMOVED***;

    this.getActiveScopes = function(editor) ***REMOVED***
        var scope = this.$getScope(editor);
        var scopes = [scope];
        var snippetMap = this.snippetMap;
        if (snippetMap[scope] && snippetMap[scope].includeScopes) ***REMOVED***
            scopes.push.apply(scopes, snippetMap[scope].includeScopes);
    ***REMOVED***
        scopes.push("_");
        return scopes;
***REMOVED***;

    this.expandWithTab = function(editor) ***REMOVED***
        var cursor = editor.getCursorPosition();
        var line = editor.session.getLine(cursor.row);
        var before = line.substring(0, cursor.column);
        var after = line.substr(cursor.column);

        var snippetMap = this.snippetMap;
        var snippet;
        this.getActiveScopes(editor).some(function(scope) ***REMOVED***
            var snippets = snippetMap[scope];
            if (snippets)
                snippet = this.findMatchingSnippet(snippets, before, after);
            return !!snippet;
    ***REMOVED*** this);
        if (!snippet)
            return false;

        editor.session.doc.removeInLine(cursor.row,
            cursor.column - snippet.replaceBefore.length,
            cursor.column + snippet.replaceAfter.length
        );

        this.variables.M__ = snippet.matchBefore;
        this.variables.T__ = snippet.matchAfter;
        this.insertSnippet(editor, snippet.content);

        this.variables.M__ = this.variables.T__ = null;
        return true;
***REMOVED***;

    this.findMatchingSnippet = function(snippetList, before, after) ***REMOVED***
        for (var i = snippetList.length; i--;) ***REMOVED***
            var s = snippetList[i];
            if (s.startRe && !s.startRe.test(before))
                continue;
            if (s.endRe && !s.endRe.test(after))
                continue;
            if (!s.startRe && !s.endRe)
                continue;

            s.matchBefore = s.startRe ? s.startRe.exec(before) : [""];
            s.matchAfter = s.endRe ? s.endRe.exec(after) : [""];
            s.replaceBefore = s.triggerRe ? s.triggerRe.exec(before)[0] : "";
            s.replaceAfter = s.endTriggerRe ? s.endTriggerRe.exec(after)[0] : "";
            return s;
    ***REMOVED***
***REMOVED***;

    this.snippetMap = ***REMOVED******REMOVED***;
    this.snippetNameMap = ***REMOVED******REMOVED***;
    this.register = function(snippets, scope) ***REMOVED***
        var snippetMap = this.snippetMap;
        var snippetNameMap = this.snippetNameMap;
        var self = this;
        function wrapRegexp(src) ***REMOVED***
            if (src && !/^\^?\(.*\)\$?$|^\\b$/.test(src))
                src = "(?:" + src + ")"

            return src || "";
    ***REMOVED***
        function guardedRegexp(re, guard, opening) ***REMOVED***
            re = wrapRegexp(re);
            guard = wrapRegexp(guard);
            if (opening) ***REMOVED***
                re = guard + re;
                if (re && re[re.length - 1] != "$")
                    re = re + "$";
        ***REMOVED*** else ***REMOVED***
                re = re + guard;
                if (re && re[0] != "^")
                    re = "^" + re;
        ***REMOVED***
            return new RegExp(re);
    ***REMOVED***

        function addSnippet(s) ***REMOVED***
            if (!s.scope)
                s.scope = scope || "_";
            scope = s.scope
            if (!snippetMap[scope]) ***REMOVED***
                snippetMap[scope] = [];
                snippetNameMap[scope] = ***REMOVED******REMOVED***;
        ***REMOVED***

            var map = snippetNameMap[scope];
            if (s.name) ***REMOVED***
                var old = map[s.name];
                if (old)
                    self.unregister(old);
                map[s.name] = s;
        ***REMOVED***
            snippetMap[scope].push(s);

            if (s.tabTrigger && !s.trigger) ***REMOVED***
                if (!s.guard && /^\w/.test(s.tabTrigger))
                    s.guard = "\\b";
                s.trigger = lang.escapeRegExp(s.tabTrigger);
        ***REMOVED***

            s.startRe = guardedRegexp(s.trigger, s.guard, true);
            s.triggerRe = new RegExp(s.trigger, "", true);

            s.endRe = guardedRegexp(s.endTrigger, s.endGuard, true);
            s.endTriggerRe = new RegExp(s.endTrigger, "", true);
    ***REMOVED***;

        if (snippets.content)
            addSnippet(snippets);
        else if (Array.isArray(snippets))
            snippets.forEach(addSnippet);
***REMOVED***;
    this.unregister = function(snippets, scope) ***REMOVED***
        var snippetMap = this.snippetMap;
        var snippetNameMap = this.snippetNameMap;

        function removeSnippet(s) ***REMOVED***
            var nameMap = snippetNameMap[s.scope||scope];
            if (nameMap && nameMap[s.name]) ***REMOVED***
                delete nameMap[s.name];
                var map = snippetMap[s.scope||scope];
                var i = map && map.indexOf(s);
                if (i >= 0)
                    map.splice(i, 1);
        ***REMOVED***
    ***REMOVED***
        if (snippets.content)
            removeSnippet(snippets);
        else if (Array.isArray(snippets))
            snippets.forEach(removeSnippet);
***REMOVED***;
    this.parseSnippetFile = function(str) ***REMOVED***
        str = str.replace(/\r/g, "");
        var list = [], snippet = ***REMOVED******REMOVED***;
        var re = /^#.*|^(***REMOVED***[\s\S]****REMOVED***)\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;
        var m;
        while (m = re.exec(str)) ***REMOVED***
            if (m[1]) ***REMOVED***
                try ***REMOVED***
                    snippet = JSON.parse(m[1])
                    list.push(snippet);
            ***REMOVED*** catch (e) ***REMOVED******REMOVED***
        ***REMOVED*** if (m[4]) ***REMOVED***
                snippet.content = m[4].replace(/^\t/gm, "");
                list.push(snippet);
                snippet = ***REMOVED******REMOVED***;
        ***REMOVED*** else ***REMOVED***
                var key = m[2], val = m[3];
                if (key == "regex") ***REMOVED***
                    var guardRe = /\/((?:[^\/\\]|\\.)*)|$/g;
                    snippet.guard = guardRe.exec(val)[1];
                    snippet.trigger = guardRe.exec(val)[1];
                    snippet.endTrigger = guardRe.exec(val)[1];
                    snippet.endGuard = guardRe.exec(val)[1];
            ***REMOVED*** else if (key == "snippet") ***REMOVED***
                    snippet.tabTrigger = val.match(/^\S*/)[0];
                    if (!snippet.name)
                        snippet.name = val;
            ***REMOVED*** else ***REMOVED***
                    snippet[key] = val;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        return list;
***REMOVED***;
    this.getSnippetByName = function(name, editor) ***REMOVED***
        var snippetMap = this.snippetNameMap;
        var snippet;
        this.getActiveScopes(editor).some(function(scope) ***REMOVED***
            var snippets = snippetMap[scope];
            if (snippets)
                snippet = snippets[name];
            return !!snippet;
    ***REMOVED*** this);
        return snippet;
***REMOVED***;

***REMOVED***).call(SnippetManager.prototype);


var TabstopManager = function(editor) ***REMOVED***
    if (editor.tabstopManager)
        return editor.tabstopManager;
    editor.tabstopManager = this;
    this.$onChange = this.onChange.bind(this);
    this.$onChangeSelection = lang.delayedCall(this.onChangeSelection.bind(this)).schedule;
    this.$onChangeSession = this.onChangeSession.bind(this);
    this.$onAfterExec = this.onAfterExec.bind(this);
    this.attach(editor);
***REMOVED***;
(function() ***REMOVED***
    this.attach = function(editor) ***REMOVED***
        this.index = -1;
        this.ranges = [];
        this.tabstops = [];
        this.selectedTabstop = null;

        this.editor = editor;
        this.editor.on("change", this.$onChange);
        this.editor.on("changeSelection", this.$onChangeSelection);
        this.editor.on("changeSession", this.$onChangeSession);
        this.editor.commands.on("afterExec", this.$onAfterExec);
        this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler);
***REMOVED***;
    this.detach = function() ***REMOVED***
        this.tabstops.forEach(this.removeTabstopMarkers, this);
        this.ranges = null;
        this.tabstops = null;
        this.selectedTabstop = null;
        this.editor.removeListener("change", this.$onChange);
        this.editor.removeListener("changeSelection", this.$onChangeSelection);
        this.editor.removeListener("changeSession", this.$onChangeSession);
        this.editor.commands.removeListener("afterExec", this.$onAfterExec);
        this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler);
        this.editor.tabstopManager = null;
        this.editor = null;
***REMOVED***;

    this.onChange = function(e) ***REMOVED***
        var changeRange = e.data.range;
        var isRemove = e.data.action[0] == "r";
        var start = changeRange.start;
        var end = changeRange.end;
        var startRow = start.row;
        var endRow = end.row;
        var lineDif = endRow - startRow;
        var colDiff = end.column - start.column;

        if (isRemove) ***REMOVED***
            lineDif = -lineDif;
            colDiff = -colDiff;
    ***REMOVED***
        if (!this.$inChange && isRemove) ***REMOVED***
            var ts = this.selectedTabstop;
            var changedOutside = !ts.some(function(r) ***REMOVED***
                return comparePoints(r.start, start) <= 0 && comparePoints(r.end, end) >= 0;
        ***REMOVED***);
            if (changedOutside)
                return this.detach();
    ***REMOVED***
        var ranges = this.ranges;
        for (var i = 0; i < ranges.length; i++) ***REMOVED***
            var r = ranges[i];
            if (r.end.row < start.row)
                continue;

            if (comparePoints(start, r.start) < 0 && comparePoints(end, r.end) > 0) ***REMOVED***
                this.removeRange(r);
                i--;
                continue;
        ***REMOVED***

            if (r.start.row == startRow && r.start.column > start.column)
                r.start.column += colDiff;
            if (r.end.row == startRow && r.end.column >= start.column)
                r.end.column += colDiff;
            if (r.start.row >= startRow)
                r.start.row += lineDif;
            if (r.end.row >= startRow)
                r.end.row += lineDif;

            if (comparePoints(r.start, r.end) > 0)
                this.removeRange(r);
    ***REMOVED***
        if (!ranges.length)
            this.detach();
***REMOVED***;
    this.updateLinkedFields = function() ***REMOVED***
        var ts = this.selectedTabstop;
        if (!ts.hasLinkedRanges)
            return;
        this.$inChange = true;
        var session = this.editor.session;
        var text = session.getTextRange(ts.firstNonLinked);
        for (var i = ts.length; i--;) ***REMOVED***
            var range = ts[i];
            if (!range.linked)
                continue;
            var fmt = exports.snippetManager.tmStrFormat(text, range.original)
            session.replace(range, fmt);
    ***REMOVED***
        this.$inChange = false;
***REMOVED***;
    this.onAfterExec = function(e) ***REMOVED***
        if (e.command && !e.command.readOnly)
            this.updateLinkedFields();
***REMOVED***;
    this.onChangeSelection = function() ***REMOVED***
        if (!this.editor)
            return
        var lead = this.editor.selection.lead;
        var anchor = this.editor.selection.anchor;
        var isEmpty = this.editor.selection.isEmpty();
        for (var i = this.ranges.length; i--;) ***REMOVED***
            if (this.ranges[i].linked)
                continue;
            var containsLead = this.ranges[i].contains(lead.row, lead.column);
            var containsAnchor = isEmpty || this.ranges[i].contains(anchor.row, anchor.column);
            if (containsLead && containsAnchor)
                return;
    ***REMOVED***
        this.detach();
***REMOVED***;
    this.onChangeSession = function() ***REMOVED***
        this.detach();
***REMOVED***;
    this.tabNext = function(dir) ***REMOVED***
        var max = this.tabstops.length - 1;
        var index = this.index + (dir || 1);
        index = Math.min(Math.max(index, 0), max);
        this.selectTabstop(index);
        if (index == max)
            this.detach();
***REMOVED***;
    this.selectTabstop = function(index) ***REMOVED***
        var ts = this.tabstops[this.index];
        if (ts)
            this.addTabstopMarkers(ts);
        this.index = index;
        ts = this.tabstops[this.index];
        if (!ts || !ts.length)
            return;
        
        this.selectedTabstop = ts;
        if (!this.editor.inVirtualSelectionMode) ***REMOVED***        
            var sel = this.editor.multiSelect;
            sel.toSingleRange(ts.firstNonLinked.clone());
            for (var i = ts.length; i--;) ***REMOVED***
                if (ts.hasLinkedRanges && ts[i].linked)
                    continue;
                sel.addRange(ts[i].clone(), true);
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            this.editor.selection.setRange(ts.firstNonLinked);
    ***REMOVED***
        
        this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler);
***REMOVED***;
    this.addTabstops = function(tabstops, start, end) ***REMOVED***
        if (!tabstops[0]) ***REMOVED***
            var p = Range.fromPoints(end, end);
            moveRelative(p.start, start);
            moveRelative(p.end, start);
            tabstops[0] = [p];
            tabstops[0].index = 0;
    ***REMOVED***

        var i = this.index;
        var arg = [i, 0];
        var ranges = this.ranges;
        var editor = this.editor;
        tabstops.forEach(function(ts) ***REMOVED***
            for (var i = ts.length; i--;) ***REMOVED***
                var p = ts[i];
                var range = Range.fromPoints(p.start, p.end || p.start);
                movePoint(range.start, start);
                movePoint(range.end, start);
                range.original = p;
                range.tabstop = ts;
                ranges.push(range);
                ts[i] = range;
                if (p.fmtString) ***REMOVED***
                    range.linked = true;
                    ts.hasLinkedRanges = true;
            ***REMOVED*** else if (!ts.firstNonLinked)
                    ts.firstNonLinked = range;
        ***REMOVED***
            if (!ts.firstNonLinked)
                ts.hasLinkedRanges = false;
            arg.push(ts);
            this.addTabstopMarkers(ts);
    ***REMOVED*** this);
        arg.push(arg.splice(2, 1)[0]);
        this.tabstops.splice.apply(this.tabstops, arg);
***REMOVED***;

    this.addTabstopMarkers = function(ts) ***REMOVED***
        var session = this.editor.session;
        ts.forEach(function(range) ***REMOVED***
            if  (!range.markerId)
                range.markerId = session.addMarker(range, "ace_snippet-marker", "text");
    ***REMOVED***);
***REMOVED***;
    this.removeTabstopMarkers = function(ts) ***REMOVED***
        var session = this.editor.session;
        ts.forEach(function(range) ***REMOVED***
            session.removeMarker(range.markerId);
            range.markerId = null;
    ***REMOVED***);
***REMOVED***;
    this.removeRange = function(range) ***REMOVED***
        var i = range.tabstop.indexOf(range);
        range.tabstop.splice(i, 1);
        i = this.ranges.indexOf(range);
        this.ranges.splice(i, 1);
        this.editor.session.removeMarker(range.markerId);
***REMOVED***;

    this.keyboardHandler = new HashHandler();
    this.keyboardHandler.bindKeys(***REMOVED***
        "Tab": function(ed) ***REMOVED***
            if (exports.snippetManager && exports.snippetManager.expandWithTab(ed)) ***REMOVED***
                return;
        ***REMOVED***

            ed.tabstopManager.tabNext(1);
    ***REMOVED***
        "Shift-Tab": function(ed) ***REMOVED***
            ed.tabstopManager.tabNext(-1);
    ***REMOVED***
        "Esc": function(ed) ***REMOVED***
            ed.tabstopManager.detach();
    ***REMOVED***
        "Return": function(ed) ***REMOVED***
            return false;
    ***REMOVED***
***REMOVED***);
***REMOVED***).call(TabstopManager.prototype);


var movePoint = function(point, diff) ***REMOVED***
    if (point.row == 0)
        point.column += diff.column;
    point.row += diff.row;
***REMOVED***;

var moveRelative = function(point, start) ***REMOVED***
    if (point.row == start.row)
        point.column -= start.column;
    point.row -= start.row;
***REMOVED***;


require("./lib/dom").importCssString("\
.ace_snippet-marker ***REMOVED***\
    -moz-box-sizing: border-box;\
    box-sizing: border-box;\
    background: rgba(194, 193, 208, 0.09);\
    border: 1px dotted rgba(211, 208, 235, 0.62);\
    position: absolute;\
***REMOVED***");

exports.snippetManager = new SnippetManager();


***REMOVED***);
