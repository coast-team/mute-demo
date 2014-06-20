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

__ace_shadowed__.define('ace/ext/language_tools', ['require', 'exports', 'module' , 'ace/snippets', 'ace/autocomplete', 'ace/config', 'ace/autocomplete/util', 'ace/autocomplete/text_completer', 'ace/editor'], function(require, exports, module) ***REMOVED***


var snippetManager = require("../snippets").snippetManager;
var Autocomplete = require("../autocomplete").Autocomplete;
var config = require("../config");
var util = require("../autocomplete/util");

var textCompleter = require("../autocomplete/text_completer");
var keyWordCompleter = ***REMOVED***
    getCompletions: function(editor, session, pos, prefix, callback) ***REMOVED***
        var state = editor.session.getState(pos.row);
        var completions = session.$mode.getCompletions(state, session, pos, prefix);
        callback(null, completions);
***REMOVED***
***REMOVED***;

var snippetCompleter = ***REMOVED***
    getCompletions: function(editor, session, pos, prefix, callback) ***REMOVED***
        var snippetMap = snippetManager.snippetMap;
        var completions = [];
        snippetManager.getActiveScopes(editor).forEach(function(scope) ***REMOVED***
            var snippets = snippetMap[scope] || [];
            for (var i = snippets.length; i--;) ***REMOVED***
                var s = snippets[i];
                var caption = s.name || s.tabTrigger;
                if (!caption)
                    continue;
                completions.push(***REMOVED***
                    caption: caption,
                    snippet: s.content,
                    meta: s.tabTrigger && !s.name ? s.tabTrigger + "\u21E5 " : "snippet"
            ***REMOVED***);
        ***REMOVED***
    ***REMOVED*** this);
        callback(null, completions);
***REMOVED***
***REMOVED***;

var completers = [snippetCompleter, textCompleter, keyWordCompleter];
exports.addCompleter = function(completer) ***REMOVED***
    completers.push(completer);
***REMOVED***;

var expandSnippet = ***REMOVED***
    name: "expandSnippet",
    exec: function(editor) ***REMOVED***
        var success = snippetManager.expandWithTab(editor);
        if (!success)
            editor.execCommand("indent");
***REMOVED***
    bindKey: "Tab"
***REMOVED***;

var onChangeMode = function(e, editor) ***REMOVED***
    loadSnippetsForMode(editor.session.$mode);
***REMOVED***;

var loadSnippetsForMode = function(mode) ***REMOVED***
    var id = mode.$id;
    if (!snippetManager.files)
        snippetManager.files = ***REMOVED******REMOVED***;
    loadSnippetFile(id);
    if (mode.modes)
        mode.modes.forEach(loadSnippetsForMode);
***REMOVED***;

var loadSnippetFile = function(id) ***REMOVED***
    if (!id || snippetManager.files[id])
        return;
    var snippetFilePath = id.replace("mode", "snippets");
    snippetManager.files[id] = ***REMOVED******REMOVED***;
    config.loadModule(snippetFilePath, function(m) ***REMOVED***
        if (m) ***REMOVED***
            snippetManager.files[id] = m;
            m.snippets = snippetManager.parseSnippetFile(m.snippetText);
            snippetManager.register(m.snippets, m.scope);
            if (m.includeScopes) ***REMOVED***
                snippetManager.snippetMap[m.scope].includeScopes = m.includeScopes;
                m.includeScopes.forEach(function(x) ***REMOVED***
                    loadSnippetFile("ace/mode/" + x);
            ***REMOVED***);
        ***REMOVED***
    ***REMOVED***
***REMOVED***);
***REMOVED***;

var doLiveAutocomplete = function(e) ***REMOVED***
    var editor = e.editor;
    var text = e.args || "";
    var pos = editor.getCursorPosition();
    var line = editor.session.getLine(pos.row);
    var hasCompleter = editor.completer && editor.completer.activated;
    var prefix = util.retrievePrecedingIdentifier(line, pos.column);
    completers.forEach(function(completer) ***REMOVED***
        if (completer.identifierRegexps) ***REMOVED***
            completer.identifierRegexps.forEach(function(identifierRegex)***REMOVED***
                if (!prefix) ***REMOVED***
                    prefix = util.retrievePrecedingIdentifier(line, pos.column, identifierRegex);
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***
***REMOVED***);
    if (e.command.name === "backspace" && !prefix) ***REMOVED***
        if (hasCompleter) 
            editor.completer.detach();
***REMOVED***
    else if (e.command.name === "insertstring") ***REMOVED***
        if (prefix && !hasCompleter) ***REMOVED***
            if (!editor.completer) ***REMOVED***
                editor.completer = new Autocomplete();
                editor.completer.autoSelect = false;
                editor.completer.autoInsert = false;
        ***REMOVED***
            editor.completer.showPopup(editor);
    ***REMOVED*** else if (!prefix && hasCompleter) ***REMOVED***
            editor.completer.detach();
    ***REMOVED***
***REMOVED***
***REMOVED***;

var Editor = require("../editor").Editor;
require("../config").defineOptions(Editor.prototype, "editor", ***REMOVED***
    enableBasicAutocompletion: ***REMOVED***
        set: function(val) ***REMOVED***
            if (val) ***REMOVED***
                this.completers = completers;
                this.commands.addCommand(Autocomplete.startCommand);
        ***REMOVED*** else ***REMOVED***
                this.commands.removeCommand(Autocomplete.startCommand);
        ***REMOVED***
    ***REMOVED***
        value: false
***REMOVED***
    enableLiveAutocomplete: ***REMOVED***
        set: function(val) ***REMOVED***
            if (val) ***REMOVED***
                this.commands.on('afterExec', doLiveAutocomplete);
        ***REMOVED*** else ***REMOVED***
                this.commands.removeListener('afterExec', doLiveAutocomplete);
        ***REMOVED***
    ***REMOVED***
        value: false
***REMOVED***
    enableSnippets: ***REMOVED***
        set: function(val) ***REMOVED***
            if (val) ***REMOVED***
                this.commands.addCommand(expandSnippet);
                this.on("changeMode", onChangeMode);
                onChangeMode(null, this);
        ***REMOVED*** else ***REMOVED***
                this.commands.removeCommand(expandSnippet);
                this.off("changeMode", onChangeMode);
        ***REMOVED***
    ***REMOVED***
        value: false
***REMOVED***
***REMOVED***);

***REMOVED***);

__ace_shadowed__.define('ace/snippets', ['require', 'exports', 'module' , 'ace/lib/lang', 'ace/range', 'ace/keyboard/hash_handler', 'ace/tokenizer', 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

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

__ace_shadowed__.define('ace/autocomplete', ['require', 'exports', 'module' , 'ace/keyboard/hash_handler', 'ace/autocomplete/popup', 'ace/autocomplete/util', 'ace/lib/event', 'ace/lib/lang', 'ace/snippets'], function(require, exports, module) ***REMOVED***


var HashHandler = require("./keyboard/hash_handler").HashHandler;
var AcePopup = require("./autocomplete/popup").AcePopup;
var util = require("./autocomplete/util");
var event = require("./lib/event");
var lang = require("./lib/lang");
var snippetManager = require("./snippets").snippetManager;

var Autocomplete = function() ***REMOVED***
    this.autoInsert = true;
    this.autoSelect = true;
    this.keyboardHandler = new HashHandler();
    this.keyboardHandler.bindKeys(this.commands);

    this.blurListener = this.blurListener.bind(this);
    this.changeListener = this.changeListener.bind(this);
    this.mousedownListener = this.mousedownListener.bind(this);
    this.mousewheelListener = this.mousewheelListener.bind(this);

    this.changeTimer = lang.delayedCall(function() ***REMOVED***
        this.updateCompletions(true);
***REMOVED***.bind(this))
***REMOVED***;

(function() ***REMOVED***
    this.gatherCompletionsId = 0;

    this.$init = function() ***REMOVED***
        this.popup = new AcePopup(document.body || document.documentElement);
        this.popup.on("click", function(e) ***REMOVED***
            this.insertMatch();
            e.stop();
    ***REMOVED***.bind(this));
        this.popup.focus = this.editor.focus.bind(this.editor);
***REMOVED***;

    this.openPopup = function(editor, prefix, keepPopupPosition) ***REMOVED***
        if (!this.popup)
            this.$init();

        this.popup.setData(this.completions.filtered);

        var renderer = editor.renderer;
        this.popup.setRow(this.autoSelect ? 0 : -1);
        if (!keepPopupPosition) ***REMOVED***
            this.popup.setTheme(editor.getTheme());
            this.popup.setFontSize(editor.getFontSize());

            var lineHeight = renderer.layerConfig.lineHeight;

            var pos = renderer.$cursorLayer.getPixelPosition(this.base, true);
            pos.left -= this.popup.getTextLeftOffset();

            var rect = editor.container.getBoundingClientRect();
            pos.top += rect.top - renderer.layerConfig.offset;
            pos.left += rect.left - editor.renderer.scrollLeft;
            pos.left += renderer.$gutterLayer.gutterWidth;

            this.popup.show(pos, lineHeight);
    ***REMOVED***
***REMOVED***;

    this.detach = function() ***REMOVED***
        this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler);
        this.editor.off("changeSelection", this.changeListener);
        this.editor.off("blur", this.blurListener);
        this.editor.off("mousedown", this.mousedownListener);
        this.editor.off("mousewheel", this.mousewheelListener);
        this.changeTimer.cancel();

        if (this.popup && this.popup.isOpen) ***REMOVED***
            this.gatherCompletionsId = this.gatherCompletionsId + 1;
    ***REMOVED***

        if (this.popup)
            this.popup.hide();

        this.activated = false;
        this.completions = this.base = null;
***REMOVED***;

    this.changeListener = function(e) ***REMOVED***
        var cursor = this.editor.selection.lead;
        if (cursor.row != this.base.row || cursor.column < this.base.column) ***REMOVED***
            this.detach();
    ***REMOVED***
        if (this.activated)
            this.changeTimer.schedule();
        else
            this.detach();
***REMOVED***;

    this.blurListener = function() ***REMOVED***
        var el = document.activeElement;
        if (el != this.editor.textInput.getElement() && el.parentNode != this.popup.container)
            this.detach();
***REMOVED***;

    this.mousedownListener = function(e) ***REMOVED***
        this.detach();
***REMOVED***;

    this.mousewheelListener = function(e) ***REMOVED***
        this.detach();
***REMOVED***;

    this.goTo = function(where) ***REMOVED***
        var row = this.popup.getRow();
        var max = this.popup.session.getLength() - 1;

        switch(where) ***REMOVED***
            case "up": row = row <= 0 ? max : row - 1; break;
            case "down": row = row >= max ? -1 : row + 1; break;
            case "start": row = 0; break;
            case "end": row = max; break;
    ***REMOVED***

        this.popup.setRow(row);
***REMOVED***;

    this.insertMatch = function(data) ***REMOVED***
        if (!data)
            data = this.popup.getData(this.popup.getRow());
        if (!data)
            return false;

        if (data.completer && data.completer.insertMatch) ***REMOVED***
            data.completer.insertMatch(this.editor);
    ***REMOVED*** else ***REMOVED***
            if (this.completions.filterText) ***REMOVED***
                var ranges = this.editor.selection.getAllRanges();
                for (var i = 0, range; range = ranges[i]; i++) ***REMOVED***
                    range.start.column -= this.completions.filterText.length;
                    this.editor.session.remove(range);
            ***REMOVED***
        ***REMOVED***
            if (data.snippet)
                snippetManager.insertSnippet(this.editor, data.snippet);
            else
                this.editor.execCommand("insertstring", data.value || data);
    ***REMOVED***
        this.detach();
***REMOVED***;

    this.commands = ***REMOVED***
        "Up": function(editor) ***REMOVED*** editor.completer.goTo("up"); ***REMOVED***,
        "Down": function(editor) ***REMOVED*** editor.completer.goTo("down"); ***REMOVED***,
        "Ctrl-Up|Ctrl-Home": function(editor) ***REMOVED*** editor.completer.goTo("start"); ***REMOVED***,
        "Ctrl-Down|Ctrl-End": function(editor) ***REMOVED*** editor.completer.goTo("end"); ***REMOVED***,

        "Esc": function(editor) ***REMOVED*** editor.completer.detach(); ***REMOVED***,
        "Space": function(editor) ***REMOVED*** editor.completer.detach(); editor.insert(" ");***REMOVED***,
        "Return": function(editor) ***REMOVED*** return editor.completer.insertMatch(); ***REMOVED***,
        "Shift-Return": function(editor) ***REMOVED*** editor.completer.insertMatch(true); ***REMOVED***,
        "Tab": function(editor) ***REMOVED***
            var result = editor.completer.insertMatch();
            if (!result && !editor.tabstopManager)
                editor.completer.goTo("down");
            else
                return result;
    ***REMOVED***

        "PageUp": function(editor) ***REMOVED*** editor.completer.popup.gotoPageUp(); ***REMOVED***,
        "PageDown": function(editor) ***REMOVED*** editor.completer.popup.gotoPageDown(); ***REMOVED***
***REMOVED***;

    this.gatherCompletions = function(editor, callback) ***REMOVED***
        var session = editor.getSession();
        var pos = editor.getCursorPosition();

        var line = session.getLine(pos.row);
        var prefix = util.retrievePrecedingIdentifier(line, pos.column);

        this.base = editor.getCursorPosition();
        this.base.column -= prefix.length;

        var matches = [];
        var total = editor.completers.length;
        editor.completers.forEach(function(completer, i) ***REMOVED***
            completer.getCompletions(editor, session, pos, prefix, function(err, results) ***REMOVED***
                if (!err)
                    matches = matches.concat(results);
                var pos = editor.getCursorPosition();
                var line = session.getLine(pos.row);
                callback(null, ***REMOVED***
                    prefix: util.retrievePrecedingIdentifier(line, pos.column, results[0] && results[0].identifierRegex),
                    matches: matches,
                    finished: (--total === 0)
            ***REMOVED***);
        ***REMOVED***);
    ***REMOVED***);
        return true;
***REMOVED***;

    this.showPopup = function(editor) ***REMOVED***
        if (this.editor)
            this.detach();

        this.activated = true;

        this.editor = editor;
        if (editor.completer != this) ***REMOVED***
            if (editor.completer)
                editor.completer.detach();
            editor.completer = this;
    ***REMOVED***

        editor.keyBinding.addKeyboardHandler(this.keyboardHandler);
        editor.on("changeSelection", this.changeListener);
        editor.on("blur", this.blurListener);
        editor.on("mousedown", this.mousedownListener);
        editor.on("mousewheel", this.mousewheelListener);

        this.updateCompletions();
***REMOVED***;

    this.updateCompletions = function(keepPopupPosition) ***REMOVED***
        if (keepPopupPosition && this.base && this.completions) ***REMOVED***
            var pos = this.editor.getCursorPosition();
            var prefix = this.editor.session.getTextRange(***REMOVED***start: this.base, end: pos***REMOVED***);
            if (prefix == this.completions.filterText)
                return;
            this.completions.setFilter(prefix);
            if (!this.completions.filtered.length)
                return this.detach();
            if (this.completions.filtered.length == 1
            && this.completions.filtered[0].value == prefix
            && !this.completions.filtered[0].snippet)
                return this.detach();
            this.openPopup(this.editor, prefix, keepPopupPosition);
            return;
    ***REMOVED***
        var _id = this.gatherCompletionsId;
        this.gatherCompletions(this.editor, function(err, results) ***REMOVED***
            var doDetach = function() ***REMOVED***
                if (!results.finished) return;
                return this.detach();
        ***REMOVED***.bind(this);

            var prefix = results.prefix;
            var matches = results && results.matches;
            
            if (!matches || !matches.length)
                return doDetach();
            if (prefix.indexOf(results.prefix) != 0 || _id != this.gatherCompletionsId)
                return;

            this.completions = new FilteredList(matches);
            this.completions.setFilter(prefix);
            var filtered = this.completions.filtered;
            if (!filtered.length)
                return doDetach();
            if (filtered.length == 1 && filtered[0].value == prefix && !filtered[0].snippet)
                return doDetach();
            if (this.autoInsert && filtered.length == 1)
                return this.insertMatch(filtered[0]);

            this.openPopup(this.editor, prefix, keepPopupPosition);
    ***REMOVED***.bind(this));
***REMOVED***;

    this.cancelContextMenu = function() ***REMOVED***
        var stop = function(e) ***REMOVED***
            this.editor.off("nativecontextmenu", stop);
            if (e && e.domEvent)
                event.stopEvent(e.domEvent);
    ***REMOVED***.bind(this);
        setTimeout(stop, 10);
        this.editor.on("nativecontextmenu", stop);
***REMOVED***;

***REMOVED***).call(Autocomplete.prototype);

Autocomplete.startCommand = ***REMOVED***
    name: "startAutocomplete",
    exec: function(editor) ***REMOVED***
        if (!editor.completer)
            editor.completer = new Autocomplete();
        editor.completer.autoInsert = 
        editor.completer.autoSelect = true;
        editor.completer.showPopup(editor);
        editor.completer.cancelContextMenu();
***REMOVED***
    bindKey: "Ctrl-Space|Ctrl-Shift-Space|Alt-Space"
***REMOVED***;

var FilteredList = function(array, filterText, mutateData) ***REMOVED***
    this.all = array;
    this.filtered = array;
    this.filterText = filterText || "";
***REMOVED***;
(function()***REMOVED***
    this.setFilter = function(str) ***REMOVED***
        if (str.length > this.filterText && str.lastIndexOf(this.filterText, 0) === 0)
            var matches = this.filtered;
        else
            var matches = this.all;

        this.filterText = str;
        matches = this.filterCompletions(matches, this.filterText);
        matches = matches.sort(function(a, b) ***REMOVED***
            return b.exactMatch - a.exactMatch || b.score - a.score;
    ***REMOVED***);
        var prev = null;
        matches = matches.filter(function(item)***REMOVED***
            var caption = item.value || item.caption || item.snippet;
            if (caption === prev) return false;
            prev = caption;
            return true;
    ***REMOVED***);

        this.filtered = matches;
***REMOVED***;
    this.filterCompletions = function(items, needle) ***REMOVED***
        var results = [];
        var upper = needle.toUpperCase();
        var lower = needle.toLowerCase();
        loop: for (var i = 0, item; item = items[i]; i++) ***REMOVED***
            var caption = item.value || item.caption || item.snippet;
            if (!caption) continue;
            var lastIndex = -1;
            var matchMask = 0;
            var penalty = 0;
            var index, distance;
            for (var j = 0; j < needle.length; j++) ***REMOVED***
                var i1 = caption.indexOf(lower[j], lastIndex + 1);
                var i2 = caption.indexOf(upper[j], lastIndex + 1);
                index = (i1 >= 0) ? ((i2 < 0 || i1 < i2) ? i1 : i2) : i2;
                if (index < 0)
                    continue loop;
                distance = index - lastIndex - 1;
                if (distance > 0) ***REMOVED***
                    if (lastIndex === -1)
                        penalty += 10;
                    penalty += distance;
            ***REMOVED***
                matchMask = matchMask | (1 << index);
                lastIndex = index;
        ***REMOVED***
            item.matchMask = matchMask;
            item.exactMatch = penalty ? 0 : 1;
            item.score = (item.score || 0) - penalty;
            results.push(item);
    ***REMOVED***
        return results;
***REMOVED***;
***REMOVED***).call(FilteredList.prototype);

exports.Autocomplete = Autocomplete;
exports.FilteredList = FilteredList;

***REMOVED***);

__ace_shadowed__.define('ace/autocomplete/popup', ['require', 'exports', 'module' , 'ace/edit_session', 'ace/virtual_renderer', 'ace/editor', 'ace/range', 'ace/lib/event', 'ace/lib/lang', 'ace/lib/dom'], function(require, exports, module) ***REMOVED***


var EditSession = require("../edit_session").EditSession;
var Renderer = require("../virtual_renderer").VirtualRenderer;
var Editor = require("../editor").Editor;
var Range = require("../range").Range;
var event = require("../lib/event");
var lang = require("../lib/lang");
var dom = require("../lib/dom");

var $singleLineEditor = function(el) ***REMOVED***
    var renderer = new Renderer(el);

    renderer.$maxLines = 4;

    var editor = new Editor(renderer);

    editor.setHighlightActiveLine(false);
    editor.setShowPrintMargin(false);
    editor.renderer.setShowGutter(false);
    editor.renderer.setHighlightGutterLine(false);

    editor.$mouseHandler.$focusWaitTimout = 0;

    return editor;
***REMOVED***;

var AcePopup = function(parentNode) ***REMOVED***
    var el = dom.createElement("div");
    var popup = new $singleLineEditor(el);

    if (parentNode)
        parentNode.appendChild(el);
    el.style.display = "none";
    popup.renderer.content.style.cursor = "default";
    popup.renderer.setStyle("ace_autocomplete");

    popup.setOption("displayIndentGuides", false);

    var noop = function()***REMOVED******REMOVED***;

    popup.focus = noop;
    popup.$isFocused = true;

    popup.renderer.$cursorLayer.restartTimer = noop;
    popup.renderer.$cursorLayer.element.style.opacity = 0;

    popup.renderer.$maxLines = 8;
    popup.renderer.$keepTextAreaAtCursor = false;

    popup.setHighlightActiveLine(false);
    popup.session.highlight("");
    popup.session.$searchHighlight.clazz = "ace_highlight-marker";

    popup.on("mousedown", function(e) ***REMOVED***
        var pos = e.getDocumentPosition();
        popup.selection.moveToPosition(pos);
        selectionMarker.start.row = selectionMarker.end.row = pos.row;
        e.stop();
***REMOVED***);

    var lastMouseEvent;
    var hoverMarker = new Range(-1,0,-1,Infinity);
    var selectionMarker = new Range(-1,0,-1,Infinity);
    selectionMarker.id = popup.session.addMarker(selectionMarker, "ace_active-line", "fullLine");
    popup.setSelectOnHover = function(val) ***REMOVED***
        if (!val) ***REMOVED***
            hoverMarker.id = popup.session.addMarker(hoverMarker, "ace_line-hover", "fullLine");
    ***REMOVED*** else if (hoverMarker.id) ***REMOVED***
            popup.session.removeMarker(hoverMarker.id);
            hoverMarker.id = null;
    ***REMOVED***
***REMOVED***
    popup.setSelectOnHover(false);
    popup.on("mousemove", function(e) ***REMOVED***
        if (!lastMouseEvent) ***REMOVED***
            lastMouseEvent = e;
            return;
    ***REMOVED***
        if (lastMouseEvent.x == e.x && lastMouseEvent.y == e.y) ***REMOVED***
            return;
    ***REMOVED***
        lastMouseEvent = e;
        lastMouseEvent.scrollTop = popup.renderer.scrollTop;
        var row = lastMouseEvent.getDocumentPosition().row;
        if (hoverMarker.start.row != row) ***REMOVED***
            if (!hoverMarker.id)
                popup.setRow(row);
            setHoverMarker(row);
    ***REMOVED***
***REMOVED***);
    popup.renderer.on("beforeRender", function() ***REMOVED***
        if (lastMouseEvent && hoverMarker.start.row != -1) ***REMOVED***
            lastMouseEvent.$pos = null;
            var row = lastMouseEvent.getDocumentPosition().row;
            if (!hoverMarker.id)
                popup.setRow(row);
            setHoverMarker(row, true);
    ***REMOVED***
***REMOVED***);
    popup.renderer.on("afterRender", function() ***REMOVED***
        var row = popup.getRow();
        var t = popup.renderer.$textLayer;
        var selected = t.element.childNodes[row - t.config.firstRow];
        if (selected == t.selectedNode)
            return;
        if (t.selectedNode)
            dom.removeCssClass(t.selectedNode, "ace_selected");
        t.selectedNode = selected;
        if (selected)
            dom.addCssClass(selected, "ace_selected");
***REMOVED***);
    var hideHoverMarker = function() ***REMOVED*** setHoverMarker(-1) ***REMOVED***;
    var setHoverMarker = function(row, suppressRedraw) ***REMOVED***
        if (row !== hoverMarker.start.row) ***REMOVED***
            hoverMarker.start.row = hoverMarker.end.row = row;
            if (!suppressRedraw)
                popup.session._emit("changeBackMarker");
            popup._emit("changeHoverMarker");
    ***REMOVED***
***REMOVED***;
    popup.getHoveredRow = function() ***REMOVED***
        return hoverMarker.start.row;
***REMOVED***;

    event.addListener(popup.container, "mouseout", hideHoverMarker);
    popup.on("hide", hideHoverMarker);
    popup.on("changeSelection", hideHoverMarker);

    popup.session.doc.getLength = function() ***REMOVED***
        return popup.data.length;
***REMOVED***;
    popup.session.doc.getLine = function(i) ***REMOVED***
        var data = popup.data[i];
        if (typeof data == "string")
            return data;
        return (data && data.value) || "";
***REMOVED***;

    var bgTokenizer = popup.session.bgTokenizer;
    bgTokenizer.$tokenizeRow = function(i) ***REMOVED***
        var data = popup.data[i];
        var tokens = [];
        if (!data)
            return tokens;
        if (typeof data == "string")
            data = ***REMOVED***value: data***REMOVED***;
        if (!data.caption)
            data.caption = data.value;

        var last = -1;
        var flag, c;
        for (var i = 0; i < data.caption.length; i++) ***REMOVED***
            c = data.caption[i];
            flag = data.matchMask & (1 << i) ? 1 : 0;
            if (last !== flag) ***REMOVED***
                tokens.push(***REMOVED***type: data.className || "" + ( flag ? "completion-highlight" : ""), value: c***REMOVED***);
                last = flag;
        ***REMOVED*** else ***REMOVED***
                tokens[tokens.length - 1].value += c;
        ***REMOVED***
    ***REMOVED***

        if (data.meta) ***REMOVED***
            var maxW = popup.renderer.$size.scrollerWidth / popup.renderer.layerConfig.characterWidth;
            if (data.meta.length + data.caption.length < maxW - 2)
                tokens.push(***REMOVED***type: "rightAlignedText", value: data.meta***REMOVED***);
    ***REMOVED***
        return tokens;
***REMOVED***;
    bgTokenizer.$updateOnChange = noop;
    bgTokenizer.start = noop;

    popup.session.$computeWidth = function() ***REMOVED***
        return this.screenWidth = 0;
***REMOVED***
    popup.isOpen = false;
    popup.isTopdown = false;

    popup.data = [];
    popup.setData = function(list) ***REMOVED***
        popup.data = list || [];
        popup.setValue(lang.stringRepeat("\n", list.length), -1);
        popup.setRow(0);
***REMOVED***;
    popup.getData = function(row) ***REMOVED***
        return popup.data[row];
***REMOVED***;

    popup.getRow = function() ***REMOVED***
        return selectionMarker.start.row;
***REMOVED***;
    popup.setRow = function(line) ***REMOVED***
        line = Math.max(-1, Math.min(this.data.length, line));
        if (selectionMarker.start.row != line) ***REMOVED***
            popup.selection.clearSelection();
            selectionMarker.start.row = selectionMarker.end.row = line || 0;
            popup.session._emit("changeBackMarker");
            popup.moveCursorTo(line || 0, 0);
            if (popup.isOpen)
                popup._signal("select");
    ***REMOVED***
***REMOVED***;

    popup.on("changeSelection", function() ***REMOVED***
        if (popup.isOpen)
            popup.setRow(popup.selection.lead.row);
***REMOVED***);

    popup.hide = function() ***REMOVED***
        this.container.style.display = "none";
        this._signal("hide");
        popup.isOpen = false;
***REMOVED***;
    popup.show = function(pos, lineHeight, topdownOnly) ***REMOVED***
        var el = this.container;
        var screenHeight = window.innerHeight;
        var screenWidth = window.innerWidth;
        var renderer = this.renderer;
        var maxH = renderer.$maxLines * lineHeight * 1.4;
        var top = pos.top + this.$borderSize;
        if (top + maxH > screenHeight - lineHeight && !topdownOnly) ***REMOVED***
            el.style.top = "";
            el.style.bottom = screenHeight - top + "px";
            popup.isTopdown = false;
    ***REMOVED*** else ***REMOVED***
            top += lineHeight;
            el.style.top = top + "px";
            el.style.bottom = "";
            popup.isTopdown = true;
    ***REMOVED***

        el.style.display = "";
        this.renderer.$textLayer.checkForSizeChanges();

        var left = pos.left;
        if (left + el.offsetWidth > screenWidth)
            left = screenWidth - el.offsetWidth;

        el.style.left = left + "px";

        this._signal("show");
        lastMouseEvent = null;
        popup.isOpen = true;
***REMOVED***;

    popup.getTextLeftOffset = function() ***REMOVED***
        return this.$borderSize + this.renderer.$padding + this.$imageSize;
***REMOVED***;

    popup.$imageSize = 0;
    popup.$borderSize = 1;

    return popup;
***REMOVED***;

dom.importCssString("\
.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line ***REMOVED***\
    background-color: #CAD6FA;\
    z-index: 1;\
***REMOVED***\
.ace_editor.ace_autocomplete .ace_line-hover ***REMOVED***\
    border: 1px solid #abbffe;\
    margin-top: -1px;\
    background: rgba(233,233,253,0.4);\
***REMOVED***\
.ace_editor.ace_autocomplete .ace_line-hover ***REMOVED***\
    position: absolute;\
    z-index: 2;\
***REMOVED***\
.ace_editor.ace_autocomplete .ace_scroller ***REMOVED***\
   background: none;\
   border: none;\
   box-shadow: none;\
***REMOVED***\
.ace_rightAlignedText ***REMOVED***\
    color: gray;\
    display: inline-block;\
    position: absolute;\
    right: 4px;\
    text-align: right;\
    z-index: -1;\
***REMOVED***\
.ace_editor.ace_autocomplete .ace_completion-highlight***REMOVED***\
    color: #000;\
    text-shadow: 0 0 0.01em;\
***REMOVED***\
.ace_editor.ace_autocomplete ***REMOVED***\
    width: 280px;\
    z-index: 200000;\
    background: #fbfbfb;\
    color: #444;\
    border: 1px lightgray solid;\
    position: fixed;\
    box-shadow: 2px 3px 5px rgba(0,0,0,.2);\
    line-height: 1.4;\
***REMOVED***");

exports.AcePopup = AcePopup;

***REMOVED***);

__ace_shadowed__.define('ace/autocomplete/util', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.parForEach = function(array, fn, callback) ***REMOVED***
    var completed = 0;
    var arLength = array.length;
    if (arLength === 0)
        callback();
    for (var i = 0; i < arLength; i++) ***REMOVED***
        fn(array[i], function(result, err) ***REMOVED***
            completed++;
            if (completed === arLength)
                callback(result, err);
    ***REMOVED***);
***REMOVED***
***REMOVED***

var ID_REGEX = /[a-zA-Z_0-9\$-]/;

exports.retrievePrecedingIdentifier = function(text, pos, regex) ***REMOVED***
    regex = regex || ID_REGEX;
    var buf = [];
    for (var i = pos-1; i >= 0; i--) ***REMOVED***
        if (regex.test(text[i]))
            buf.push(text[i]);
        else
            break;
***REMOVED***
    return buf.reverse().join("");
***REMOVED***

exports.retrieveFollowingIdentifier = function(text, pos, regex) ***REMOVED***
    regex = regex || ID_REGEX;
    var buf = [];
    for (var i = pos; i < text.length; i++) ***REMOVED***
        if (regex.test(text[i]))
            buf.push(text[i]);
        else
            break;
***REMOVED***
    return buf;
***REMOVED***

***REMOVED***);

__ace_shadowed__.define('ace/autocomplete/text_completer', ['require', 'exports', 'module' , 'ace/range'], function(require, exports, module) ***REMOVED***
    var Range = require("../range").Range;
    
    var splitRegex = /[^a-zA-Z_0-9\$\-]+/;

    function getWordIndex(doc, pos) ***REMOVED***
        var textBefore = doc.getTextRange(Range.fromPoints(***REMOVED***row: 0, column:0***REMOVED***, pos));
        return textBefore.split(splitRegex).length - 1;
***REMOVED***
    function wordDistance(doc, pos) ***REMOVED***
        var prefixPos = getWordIndex(doc, pos);
        var words = doc.getValue().split(splitRegex);
        var wordScores = Object.create(null);
        
        var currentWord = words[prefixPos];

        words.forEach(function(word, idx) ***REMOVED***
            if (!word || word === currentWord) return;

            var distance = Math.abs(prefixPos - idx);
            var score = words.length - distance;
            if (wordScores[word]) ***REMOVED***
                wordScores[word] = Math.max(score, wordScores[word]);
        ***REMOVED*** else ***REMOVED***
                wordScores[word] = score;
        ***REMOVED***
    ***REMOVED***);
        return wordScores;
***REMOVED***

    exports.getCompletions = function(editor, session, pos, prefix, callback) ***REMOVED***
        var wordScore = wordDistance(session, pos, prefix);
        var wordList = Object.keys(wordScore);
        callback(null, wordList.map(function(word) ***REMOVED***
            return ***REMOVED***
                name: word,
                value: word,
                score: wordScore[word],
                meta: "local"
        ***REMOVED***;
    ***REMOVED***));
***REMOVED***;
***REMOVED***);
