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

define('ace/keyboard/emacs', ['require', 'exports', 'module' , 'ace/lib/dom', 'ace/incremental_search', 'ace/commands/incremental_search_commands', 'ace/keyboard/hash_handler', 'ace/lib/keys'], function(require, exports, module) ***REMOVED***


var dom = require("../lib/dom");
require("../incremental_search");
var iSearchCommandModule = require("../commands/incremental_search_commands");


var screenToTextBlockCoordinates = function(x, y) ***REMOVED***
    var canvasPos = this.scroller.getBoundingClientRect();

    var col = Math.floor(
        (x + this.scrollLeft - canvasPos.left - this.$padding) / this.characterWidth
    );
    var row = Math.floor(
        (y + this.scrollTop - canvasPos.top) / this.lineHeight
    );

    return this.session.screenToDocumentPosition(row, col);
***REMOVED***;

var HashHandler = require("./hash_handler").HashHandler;
exports.handler = new HashHandler();

exports.handler.isEmacs = true;
exports.handler.$id = "ace/keyboard/emacs";

var initialized = false;
var $formerLongWords;
var $formerLineStart;

exports.handler.attach = function(editor) ***REMOVED***
    if (!initialized) ***REMOVED***
        initialized = true;
        dom.importCssString('\
            .emacs-mode .ace_cursor***REMOVED***\
                border: 2px rgba(50,250,50,0.8) solid!important;\
                -moz-box-sizing: border-box!important;\
                -webkit-box-sizing: border-box!important;\
                box-sizing: border-box!important;\
                background-color: rgba(0,250,0,0.9);\
                opacity: 0.5;\
        ***REMOVED***\
            .emacs-mode .ace_hidden-cursors .ace_cursor***REMOVED***\
                opacity: 1;\
                background-color: transparent;\
        ***REMOVED***\
            .emacs-mode .ace_overwrite-cursors .ace_cursor ***REMOVED***\
                opacity: 1;\
                background-color: transparent;\
                border-width: 0 0 2px 2px !important;\
        ***REMOVED***\
            .emacs-mode .ace_text-layer ***REMOVED***\
                z-index: 4\
        ***REMOVED***\
            .emacs-mode .ace_cursor-layer ***REMOVED***\
                z-index: 2\
        ***REMOVED***', 'emacsMode'
        );
***REMOVED***
    $formerLongWords = editor.session.$selectLongWords;
    editor.session.$selectLongWords = true;
    $formerLineStart = editor.session.$useEmacsStyleLineStart;
    editor.session.$useEmacsStyleLineStart = true;

    editor.session.$emacsMark = null; // the active mark
    editor.session.$emacsMarkRing = editor.session.$emacsMarkRing || [];

    editor.emacsMark = function() ***REMOVED***
        return this.session.$emacsMark;
***REMOVED***;

    editor.setEmacsMark = function(p) ***REMOVED***
        this.session.$emacsMark = p;
***REMOVED***;

    editor.pushEmacsMark = function(p, activate) ***REMOVED***
        var prevMark = this.session.$emacsMark;
        if (prevMark)
            this.session.$emacsMarkRing.push(prevMark);
        if (!p || activate) this.setEmacsMark(p);
        else this.session.$emacsMarkRing.push(p);
***REMOVED***;

    editor.popEmacsMark = function() ***REMOVED***
        var mark = this.emacsMark();
        if (mark) ***REMOVED*** this.setEmacsMark(null); return mark; ***REMOVED***
        return this.session.$emacsMarkRing.pop();
***REMOVED***;

    editor.getLastEmacsMark = function(p) ***REMOVED***
        return this.session.$emacsMark || this.session.$emacsMarkRing.slice(-1)[0];
***REMOVED***;

    editor.on("click", $resetMarkMode);
    editor.on("changeSession", $kbSessionChange);
    editor.renderer.screenToTextCoordinates = screenToTextBlockCoordinates;
    editor.setStyle("emacs-mode");
    editor.commands.addCommands(commands);
    exports.handler.platform = editor.commands.platform;
    editor.$emacsModeHandler = this;
    editor.addEventListener('copy', this.onCopy);
    editor.addEventListener('paste', this.onPaste);
***REMOVED***;

exports.handler.detach = function(editor) ***REMOVED***
    delete editor.renderer.screenToTextCoordinates;
    editor.session.$selectLongWords = $formerLongWords;
    editor.session.$useEmacsStyleLineStart = $formerLineStart;
    editor.removeEventListener("click", $resetMarkMode);
    editor.removeEventListener("changeSession", $kbSessionChange);
    editor.unsetStyle("emacs-mode");
    editor.commands.removeCommands(commands);
    editor.removeEventListener('copy', this.onCopy);
    editor.removeEventListener('paste', this.onPaste);
***REMOVED***;

var $kbSessionChange = function(e) ***REMOVED***
    if (e.oldSession) ***REMOVED***
        e.oldSession.$selectLongWords = $formerLongWords;
        e.oldSession.$useEmacsStyleLineStart = $formerLineStart;
***REMOVED***

    $formerLongWords = e.session.$selectLongWords;
    e.session.$selectLongWords = true;
    $formerLineStart = e.session.$useEmacsStyleLineStart;
    e.session.$useEmacsStyleLineStart = true;

    if (!e.session.hasOwnProperty('$emacsMark'))
        e.session.$emacsMark = null;
    if (!e.session.hasOwnProperty('$emacsMarkRing'))
        e.session.$emacsMarkRing = [];
***REMOVED***;

var $resetMarkMode = function(e) ***REMOVED***
    e.editor.session.$emacsMark = null;
***REMOVED***;

var keys = require("../lib/keys").KEY_MODS;
var eMods = ***REMOVED***C: "ctrl", S: "shift", M: "alt", CMD: "command"***REMOVED***;
var combinations = ["C-S-M-CMD",
                    "S-M-CMD", "C-M-CMD", "C-S-CMD", "C-S-M",
                    "M-CMD", "S-CMD", "S-M", "C-CMD", "C-M", "C-S",
                    "CMD", "M", "S", "C"];
combinations.forEach(function(c) ***REMOVED***
    var hashId = 0;
    c.split("-").forEach(function(c) ***REMOVED***
        hashId = hashId | keys[eMods[c]];
***REMOVED***);
    eMods[hashId] = c.toLowerCase() + "-";
***REMOVED***);

exports.handler.onCopy = function(e, editor) ***REMOVED***
    if (editor.$handlesEmacsOnCopy) return;
    editor.$handlesEmacsOnCopy = true;
    exports.handler.commands.killRingSave.exec(editor);
    delete editor.$handlesEmacsOnCopy;
***REMOVED***;

exports.handler.onPaste = function(e, editor) ***REMOVED***
    editor.pushEmacsMark(editor.getCursorPosition());
***REMOVED***;

exports.handler.bindKey = function(key, command) ***REMOVED***
    if (!key)
        return;

    var ckb = this.commandKeyBinding;
    key.split("|").forEach(function(keyPart) ***REMOVED***
        keyPart = keyPart.toLowerCase();
        ckb[keyPart] = command;
        var keyParts = keyPart.split(" ").slice(0,-1);
        keyParts.reduce(function(keyMapKeys, keyPart, i) ***REMOVED***
            var prefix = keyMapKeys[i-1] ? keyMapKeys[i-1] + ' ' : '';
            return keyMapKeys.concat([prefix + keyPart]);
    ***REMOVED*** []).forEach(function(keyPart) ***REMOVED***
            if (!ckb[keyPart]) ckb[keyPart] = "null";
    ***REMOVED***);
***REMOVED*** this);
***REMOVED***;

exports.handler.handleKeyboard = function(data, hashId, key, keyCode) ***REMOVED***
    if (keyCode === -1) return undefined;

    var editor = data.editor;
    if (hashId == -1) ***REMOVED***
        editor.pushEmacsMark();
        if (data.count) ***REMOVED***
            var str = new Array(data.count + 1).join(key);
            data.count = null;
            return ***REMOVED***command: "insertstring", args: str***REMOVED***;
    ***REMOVED***
***REMOVED***

    if (key == "\x00") return undefined;

    var modifier = eMods[hashId];
    if (modifier == "c-" || data.universalArgument) ***REMOVED***
        var prevCount = String(data.count || 0);
        var count = parseInt(key[key.length - 1]);
        if (typeof count === 'number' && !isNaN(count)) ***REMOVED***
            data.count = parseInt(prevCount + count);
            return ***REMOVED***command: "null"***REMOVED***;
    ***REMOVED*** else if (data.universalArgument) ***REMOVED***
            data.count = 4;
    ***REMOVED***
***REMOVED***
    data.universalArgument = false;
    if (modifier) key = modifier + key;
    if (data.keyChain) key = data.keyChain += " " + key;
    var command = this.commandKeyBinding[key];
    data.keyChain = command == "null" ? key : "";
    if (!command) return undefined;
    if (command === "null") return ***REMOVED***command: "null"***REMOVED***;

    if (command === "universalArgument") ***REMOVED***
        data.universalArgument = true;
        return ***REMOVED***command: "null"***REMOVED***;
***REMOVED***
    var args;
    if (typeof command !== "string") ***REMOVED***
        args = command.args;
        if (command.command) command = command.command;
        if (command === "goorselect") ***REMOVED***
            command = editor.emacsMark() ? args[1] : args[0];
            args = null;
    ***REMOVED***
***REMOVED***

    if (typeof command === "string") ***REMOVED***
        if (command === "insertstring" ||
            command === "splitline" ||
            command === "togglecomment") ***REMOVED***
            editor.pushEmacsMark();
    ***REMOVED***
        command = this.commands[command] || editor.commands.commands[command];
        if (!command) return undefined;
***REMOVED***

    if (!command.readonly && !command.isYank)
        data.lastCommand = null;

    if (data.count) ***REMOVED***
        var count = data.count;
        data.count = 0;
        if (!command || !command.handlesCount) ***REMOVED***
            return ***REMOVED***
                args: args,
                command: ***REMOVED***
                    exec: function(editor, args) ***REMOVED***
                        for (var i = 0; i < count; i++)
                            command.exec(editor, args);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***;
    ***REMOVED*** else ***REMOVED***
            if (!args) args = ***REMOVED******REMOVED***;
            if (typeof args === 'object') args.count = count;
    ***REMOVED***
***REMOVED***

    return ***REMOVED***command: command, args: args***REMOVED***;
***REMOVED***;

exports.emacsKeys = ***REMOVED***
    "Up|C-p"      : ***REMOVED***command: "goorselect", args: ["golineup","selectup"]***REMOVED***,
    "Down|C-n"    : ***REMOVED***command: "goorselect", args: ["golinedown","selectdown"]***REMOVED***,
    "Left|C-b"    : ***REMOVED***command: "goorselect", args: ["gotoleft","selectleft"]***REMOVED***,
    "Right|C-f"   : ***REMOVED***command: "goorselect", args: ["gotoright","selectright"]***REMOVED***,
    "C-Left|M-b"  : ***REMOVED***command: "goorselect", args: ["gotowordleft","selectwordleft"]***REMOVED***,
    "C-Right|M-f" : ***REMOVED***command: "goorselect", args: ["gotowordright","selectwordright"]***REMOVED***,
    "Home|C-a"    : ***REMOVED***command: "goorselect", args: ["gotolinestart","selecttolinestart"]***REMOVED***,
    "End|C-e"     : ***REMOVED***command: "goorselect", args: ["gotolineend","selecttolineend"]***REMOVED***,
    "C-Home|S-M-,": ***REMOVED***command: "goorselect", args: ["gotostart","selecttostart"]***REMOVED***,
    "C-End|S-M-." : ***REMOVED***command: "goorselect", args: ["gotoend","selecttoend"]***REMOVED***,
    "S-Up|S-C-p"      : "selectup",
    "S-Down|S-C-n"    : "selectdown",
    "S-Left|S-C-b"    : "selectleft",
    "S-Right|S-C-f"   : "selectright",
    "S-C-Left|S-M-b"  : "selectwordleft",
    "S-C-Right|S-M-f" : "selectwordright",
    "S-Home|S-C-a"    : "selecttolinestart",
    "S-End|S-C-e"     : "selecttolineend",
    "S-C-Home"        : "selecttostart",
    "S-C-End"         : "selecttoend",

    "C-l" : "recenterTopBottom",
    "M-s" : "centerselection",
    "M-g": "gotoline",
    "C-x C-p": "selectall",
    "C-Down": ***REMOVED***command: "goorselect", args: ["gotopagedown","selectpagedown"]***REMOVED***,
    "C-Up": ***REMOVED***command: "goorselect", args: ["gotopageup","selectpageup"]***REMOVED***,
    "PageDown|C-v": ***REMOVED***command: "goorselect", args: ["gotopagedown","selectpagedown"]***REMOVED***,
    "PageUp|M-v": ***REMOVED***command: "goorselect", args: ["gotopageup","selectpageup"]***REMOVED***,
    "S-C-Down": "selectpagedown",
    "S-C-Up": "selectpageup",

    "C-s": "iSearch",
    "C-r": "iSearchBackwards",

    "M-C-s": "findnext",
    "M-C-r": "findprevious",
    "S-M-5": "replace",
    "Backspace": "backspace",
    "Delete|C-d": "del",
    "Return|C-m": ***REMOVED***command: "insertstring", args: "\n"***REMOVED***, // "newline"
    "C-o": "splitline",

    "M-d|C-Delete": ***REMOVED***command: "killWord", args: "right"***REMOVED***,
    "C-Backspace|M-Backspace|M-Delete": ***REMOVED***command: "killWord", args: "left"***REMOVED***,
    "C-k": "killLine",

    "C-y|S-Delete": "yank",
    "M-y": "yankRotate",
    "C-g": "keyboardQuit",

    "C-w": "killRegion",
    "M-w": "killRingSave",
    "C-Space": "setMark",
    "C-x C-x": "exchangePointAndMark",

    "C-t": "transposeletters",
    "M-u": "touppercase",    // Doesn't work
    "M-l": "tolowercase",
    "M-/": "autocomplete",   // Doesn't work
    "C-u": "universalArgument",

    "M-;": "togglecomment",

    "C-/|C-x u|S-C--|C-z": "undo",
    "S-C-/|S-C-x u|C--|S-C-z": "redo", //infinite undo?
    "C-x r":  "selectRectangularRegion",
    "M-x": ***REMOVED***command: "focusCommandLine", args: "M-x "***REMOVED***
***REMOVED***;


exports.handler.bindKeys(exports.emacsKeys);

exports.handler.addCommands(***REMOVED***
    recenterTopBottom: function(editor) ***REMOVED***
        var renderer = editor.renderer;
        var pos = renderer.$cursorLayer.getPixelPosition();
        var h = renderer.$size.scrollerHeight - renderer.lineHeight;
        var scrollTop = renderer.scrollTop;
        if (Math.abs(pos.top - scrollTop) < 2) ***REMOVED***
            scrollTop = pos.top - h;
    ***REMOVED*** else if (Math.abs(pos.top - scrollTop - h * 0.5) < 2) ***REMOVED***
            scrollTop = pos.top;
    ***REMOVED*** else ***REMOVED***
            scrollTop = pos.top - h * 0.5;
    ***REMOVED***
        editor.session.setScrollTop(scrollTop);
***REMOVED***
    selectRectangularRegion:  function(editor) ***REMOVED***
        editor.multiSelect.toggleBlockSelection();
***REMOVED***
    setMark:  ***REMOVED***
        exec: function(editor, args) ***REMOVED***
            if (args && args.count) ***REMOVED***
                var mark = editor.popEmacsMark();
                mark && editor.selection.moveCursorToPosition(mark);
                return;
        ***REMOVED***

            var mark = editor.emacsMark(),
                transientMarkModeActive = true;
            if (transientMarkModeActive && (mark || !editor.selection.isEmpty())) ***REMOVED***
                editor.pushEmacsMark();
                editor.clearSelection();
                return;
        ***REMOVED***

            if (mark) ***REMOVED***
                var cp = editor.getCursorPosition();
                if (editor.selection.isEmpty() &&
                    mark.row == cp.row && mark.column == cp.column) ***REMOVED***
                    editor.pushEmacsMark();
                    return;
            ***REMOVED***
        ***REMOVED***
            mark = editor.getCursorPosition();
            editor.setEmacsMark(mark);
            editor.selection.setSelectionAnchor(mark.row, mark.column);
    ***REMOVED***
        readonly: true,
        handlesCount: true,
        multiSelectAction: "forEach"
***REMOVED***
    exchangePointAndMark: ***REMOVED***
        exec: function(editor, args) ***REMOVED***
            var sel = editor.selection;
            if (args.count) ***REMOVED***
                var pos = editor.getCursorPosition();
                sel.clearSelection();
                sel.moveCursorToPosition(editor.popEmacsMark());
                editor.pushEmacsMark(pos);
                return;
        ***REMOVED***
            var lastMark = editor.getLastEmacsMark();
            var range = sel.getRange();
            if (range.isEmpty()) ***REMOVED***
                sel.selectToPosition(lastMark);
                return;
        ***REMOVED***
            sel.setSelectionRange(range, !sel.isBackwards());
    ***REMOVED***
        readonly: true,
        handlesCount: true,
        multiSelectAction: "forEach"
***REMOVED***
    killWord: ***REMOVED***
        exec: function(editor, dir) ***REMOVED***
            editor.clearSelection();
            if (dir == "left")
                editor.selection.selectWordLeft();
            else
                editor.selection.selectWordRight();

            var range = editor.getSelectionRange();
            var text = editor.session.getTextRange(range);
            exports.killRing.add(text);

            editor.session.remove(range);
            editor.clearSelection();
    ***REMOVED***
        multiSelectAction: "forEach"
***REMOVED***
    killLine: function(editor) ***REMOVED***
        editor.pushEmacsMark(null);
        var pos = editor.getCursorPosition();
        if (pos.column === 0 &&
            editor.session.doc.getLine(pos.row).length === 0) ***REMOVED***
            editor.selection.selectLine();
    ***REMOVED*** else ***REMOVED***
            editor.clearSelection();
            editor.selection.selectLineEnd();
    ***REMOVED***
        var range = editor.getSelectionRange();
        var text = editor.session.getTextRange(range);
        exports.killRing.add(text);

        editor.session.remove(range);
        editor.clearSelection();
***REMOVED***
    yank: function(editor) ***REMOVED***
        editor.onPaste(exports.killRing.get() || '');
        editor.keyBinding.$data.lastCommand = "yank";
***REMOVED***
    yankRotate: function(editor) ***REMOVED***
        if (editor.keyBinding.$data.lastCommand != "yank")
            return;
        editor.undo();
        editor.onPaste(exports.killRing.rotate());
        editor.keyBinding.$data.lastCommand = "yank";
***REMOVED***
    killRegion: ***REMOVED***
        exec: function(editor) ***REMOVED***
            exports.killRing.add(editor.getCopyText());
            editor.commands.byName.cut.exec(editor);
    ***REMOVED***
        readonly: true,
        multiSelectAction: "forEach"
***REMOVED***
    killRingSave: ***REMOVED***
        exec: function(editor) ***REMOVED***
            exports.killRing.add(editor.getCopyText());
            setTimeout(function() ***REMOVED***
                var sel = editor.selection,
                    range = sel.getRange();
                editor.pushEmacsMark(sel.isBackwards() ? range.end : range.start);
                sel.clearSelection();
        ***REMOVED*** 0);
    ***REMOVED***
        readonly: true
***REMOVED***
    keyboardQuit: function(editor) ***REMOVED***
        editor.selection.clearSelection();
        editor.setEmacsMark(null);
***REMOVED***
    focusCommandLine: function(editor, arg) ***REMOVED***
        if (editor.showCommandLine)
            editor.showCommandLine(arg);
***REMOVED***
***REMOVED***);

exports.handler.addCommands(iSearchCommandModule.iSearchStartCommands);

var commands = exports.handler.commands;
commands.yank.isYank = true;
commands.yankRotate.isYank = true;

exports.killRing = ***REMOVED***
    $data: [],
    add: function(str) ***REMOVED***
        str && this.$data.push(str);
        if (this.$data.length > 30)
            this.$data.shift();
***REMOVED***
    get: function(n) ***REMOVED***
        n = n || 1;
        return this.$data.slice(this.$data.length-n, this.$data.length).reverse().join('\n');
***REMOVED***
    pop: function() ***REMOVED***
        if (this.$data.length > 1)
            this.$data.pop();
        return this.get();
***REMOVED***
    rotate: function() ***REMOVED***
        this.$data.unshift(this.$data.pop());
        return this.get();
***REMOVED***
***REMOVED***;

***REMOVED***);

define('ace/incremental_search', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/range', 'ace/search', 'ace/search_highlight', 'ace/commands/incremental_search_commands', 'ace/lib/dom', 'ace/commands/command_manager', 'ace/editor', 'ace/config'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var Range = require("./range").Range;
var Search = require("./search").Search;
var SearchHighlight = require("./search_highlight").SearchHighlight;
var iSearchCommandModule = require("./commands/incremental_search_commands");
var ISearchKbd = iSearchCommandModule.IncrementalSearchKeyboardHandler;
function IncrementalSearch() ***REMOVED***
    this.$options = ***REMOVED***wrap: false, skipCurrent: false***REMOVED***;
    this.$keyboardHandler = new ISearchKbd(this);
***REMOVED***

oop.inherits(IncrementalSearch, Search);

;(function() ***REMOVED***

    this.activate = function(ed, backwards) ***REMOVED***
        this.$editor = ed;
        this.$startPos = this.$currentPos = ed.getCursorPosition();
        this.$options.needle = '';
        this.$options.backwards = backwards;
        ed.keyBinding.addKeyboardHandler(this.$keyboardHandler);
        this.$originalEditorOnPaste = ed.onPaste; ed.onPaste = this.onPaste.bind(this);
        this.$mousedownHandler = ed.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.selectionFix(ed);
        this.statusMessage(true);
***REMOVED***

    this.deactivate = function(reset) ***REMOVED***
        this.cancelSearch(reset);
        var ed = this.$editor;
        ed.keyBinding.removeKeyboardHandler(this.$keyboardHandler);
        if (this.$mousedownHandler) ***REMOVED***
            ed.removeEventListener('mousedown', this.$mousedownHandler);
            delete this.$mousedownHandler;
    ***REMOVED***
        ed.onPaste = this.$originalEditorOnPaste;
        this.message('');
***REMOVED***

    this.selectionFix = function(editor) ***REMOVED***
        if (editor.selection.isEmpty() && !editor.session.$emacsMark) ***REMOVED***
            editor.clearSelection();
    ***REMOVED***
***REMOVED***

    this.highlight = function(regexp) ***REMOVED***
        var sess = this.$editor.session,
            hl = sess.$isearchHighlight = sess.$isearchHighlight || sess.addDynamicMarker(
                new SearchHighlight(null, "ace_isearch-result", "text"));
        hl.setRegexp(regexp);
        sess._emit("changeBackMarker"); // force highlight layer redraw
***REMOVED***

    this.cancelSearch = function(reset) ***REMOVED***
        var e = this.$editor;
        this.$prevNeedle = this.$options.needle;
        this.$options.needle = '';
        if (reset) ***REMOVED***
            e.moveCursorToPosition(this.$startPos);
            this.$currentPos = this.$startPos;
    ***REMOVED*** else ***REMOVED***
            e.pushEmacsMark && e.pushEmacsMark(this.$startPos, false);
    ***REMOVED***
        this.highlight(null);
        return Range.fromPoints(this.$currentPos, this.$currentPos);
***REMOVED***

    this.highlightAndFindWithNeedle = function(moveToNext, needleUpdateFunc) ***REMOVED***
        if (!this.$editor) return null;
        var options = this.$options;
        if (needleUpdateFunc) ***REMOVED***
            options.needle = needleUpdateFunc.call(this, options.needle || '') || '';
    ***REMOVED***
        if (options.needle.length === 0) ***REMOVED***
            this.statusMessage(true);
            return this.cancelSearch(true);
    ***REMOVED***;
        options.start = this.$currentPos;
        var session = this.$editor.session,
            found = this.find(session);
        if (found) ***REMOVED***
            if (options.backwards) found = Range.fromPoints(found.end, found.start);
            this.$editor.moveCursorToPosition(found.end);
            if (moveToNext) this.$currentPos = found.end;
            this.highlight(options.re)
    ***REMOVED***

        this.statusMessage(found);

        return found;
***REMOVED***

    this.addString = function(s) ***REMOVED***
        return this.highlightAndFindWithNeedle(false, function(needle) ***REMOVED***
            return needle + s;
    ***REMOVED***);
***REMOVED***

    this.removeChar = function(c) ***REMOVED***
        return this.highlightAndFindWithNeedle(false, function(needle) ***REMOVED***
            return needle.length > 0 ? needle.substring(0, needle.length-1) : needle;
    ***REMOVED***);
***REMOVED***

    this.next = function(options) ***REMOVED***
        options = options || ***REMOVED******REMOVED***;
        this.$options.backwards = !!options.backwards;
        this.$currentPos = this.$editor.getCursorPosition();
        return this.highlightAndFindWithNeedle(true, function(needle) ***REMOVED***
            return options.useCurrentOrPrevSearch && needle.length === 0 ?
                this.$prevNeedle || '' : needle;
    ***REMOVED***);
***REMOVED***

    this.onMouseDown = function(evt) ***REMOVED***
        this.deactivate();
        return true;
***REMOVED***

    this.onPaste = function(text) ***REMOVED***
        this.addString(text);
***REMOVED***

    this.statusMessage = function(found) ***REMOVED***
        var options = this.$options, msg = '';
        msg += options.backwards ? 'reverse-' : '';
        msg += 'isearch: ' + options.needle;
        msg += found ? '' : ' (not found)';
        this.message(msg);
***REMOVED***

    this.message = function(msg) ***REMOVED***
        if (this.$editor.showCommandLine) ***REMOVED***
            this.$editor.showCommandLine(msg);
            this.$editor.focus();
    ***REMOVED*** else ***REMOVED***
            console.log(msg);
    ***REMOVED***
***REMOVED***

***REMOVED***).call(IncrementalSearch.prototype);


exports.IncrementalSearch = IncrementalSearch;

var dom = require('./lib/dom');
dom.importCssString && dom.importCssString("\
.ace_marker-layer .ace_isearch-result ***REMOVED***\
  position: absolute;\
  z-index: 6;\
  -moz-box-sizing: border-box;\
  -webkit-box-sizing: border-box;\
  box-sizing: border-box;\
***REMOVED***\
div.ace_isearch-result ***REMOVED***\
  border-radius: 4px;\
  background-color: rgba(255, 200, 0, 0.5);\
  box-shadow: 0 0 4px rgb(255, 200, 0);\
***REMOVED***\
.ace_dark div.ace_isearch-result ***REMOVED***\
  background-color: rgb(100, 110, 160);\
  box-shadow: 0 0 4px rgb(80, 90, 140);\
***REMOVED***", "incremental-search-highlighting");
var commands = require("./commands/command_manager");
(function() ***REMOVED***
    this.setupIncrementalSearch = function(editor, val) ***REMOVED***
        if (this.usesIncrementalSearch == val) return;
        this.usesIncrementalSearch = val;
        var iSearchCommands = iSearchCommandModule.iSearchStartCommands;
        var method = val ? 'addCommands' : 'removeCommands';
        this[method](iSearchCommands);
***REMOVED***;
***REMOVED***).call(commands.CommandManager.prototype);
var Editor = require("./editor").Editor;
require("./config").defineOptions(Editor.prototype, "editor", ***REMOVED***
    useIncrementalSearch: ***REMOVED***
        set: function(val) ***REMOVED***
            this.keyBinding.$handlers.forEach(function(handler) ***REMOVED***
                if (handler.setupIncrementalSearch) ***REMOVED***
                    handler.setupIncrementalSearch(this, val);
            ***REMOVED***
        ***REMOVED***);
            this._emit('incrementalSearchSettingChanged', ***REMOVED***isEnabled: val***REMOVED***);
    ***REMOVED***
***REMOVED***
***REMOVED***);

***REMOVED***);

define('ace/commands/incremental_search_commands', ['require', 'exports', 'module' , 'ace/config', 'ace/lib/oop', 'ace/keyboard/hash_handler', 'ace/commands/occur_commands'], function(require, exports, module) ***REMOVED***

var config = require("../config");
var oop = require("../lib/oop");
var HashHandler = require("../keyboard/hash_handler").HashHandler;
var occurStartCommand = require("./occur_commands").occurStartCommand;
exports.iSearchStartCommands = [***REMOVED***
    name: "iSearch",
    bindKey: ***REMOVED***win: "Ctrl-F", mac: "Command-F"***REMOVED***,
    exec: function(editor, options) ***REMOVED***
        config.loadModule(["core", "ace/incremental_search"], function(e) ***REMOVED***
            var iSearch = e.iSearch = e.iSearch || new e.IncrementalSearch();
            iSearch.activate(editor, options.backwards);
            if (options.jumpToFirstMatch) iSearch.next(options);
    ***REMOVED***);
***REMOVED***
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "iSearchBackwards",
    exec: function(editor, jumpToNext) ***REMOVED*** editor.execCommand('iSearch', ***REMOVED***backwards: true***REMOVED***); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "iSearchAndGo",
    bindKey: ***REMOVED***win: "Ctrl-K", mac: "Command-G"***REMOVED***,
    exec: function(editor, jumpToNext) ***REMOVED*** editor.execCommand('iSearch', ***REMOVED***jumpToFirstMatch: true, useCurrentOrPrevSearch: true***REMOVED***); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "iSearchBackwardsAndGo",
    bindKey: ***REMOVED***win: "Ctrl-Shift-K", mac: "Command-Shift-G"***REMOVED***,
    exec: function(editor) ***REMOVED*** editor.execCommand('iSearch', ***REMOVED***jumpToFirstMatch: true, backwards: true, useCurrentOrPrevSearch: true***REMOVED***); ***REMOVED***,
    readOnly: true
***REMOVED***];
exports.iSearchCommands = [***REMOVED***
    name: "restartSearch",
    bindKey: ***REMOVED***win: "Ctrl-F", mac: "Command-F"***REMOVED***,
    exec: function(iSearch) ***REMOVED***
        iSearch.cancelSearch(true);
***REMOVED***
    readOnly: true,
    isIncrementalSearchCommand: true
***REMOVED***, ***REMOVED***
    name: "searchForward",
    bindKey: ***REMOVED***win: "Ctrl-S|Ctrl-K", mac: "Ctrl-S|Command-G"***REMOVED***,
    exec: function(iSearch, options) ***REMOVED***
        options.useCurrentOrPrevSearch = true;
        iSearch.next(options);
***REMOVED***
    readOnly: true,
    isIncrementalSearchCommand: true
***REMOVED***, ***REMOVED***
    name: "searchBackward",
    bindKey: ***REMOVED***win: "Ctrl-R|Ctrl-Shift-K", mac: "Ctrl-R|Command-Shift-G"***REMOVED***,
    exec: function(iSearch, options) ***REMOVED***
        options.useCurrentOrPrevSearch = true;
        options.backwards = true;
        iSearch.next(options);
***REMOVED***
    readOnly: true,
    isIncrementalSearchCommand: true
***REMOVED***, ***REMOVED***
    name: "extendSearchTerm",
    exec: function(iSearch, string) ***REMOVED***
        iSearch.addString(string);
***REMOVED***
    readOnly: true,
    isIncrementalSearchCommand: true
***REMOVED***, ***REMOVED***
    name: "extendSearchTermSpace",
    bindKey: "space",
    exec: function(iSearch) ***REMOVED*** iSearch.addString(' '); ***REMOVED***,
    readOnly: true,
    isIncrementalSearchCommand: true
***REMOVED***, ***REMOVED***
    name: "shrinkSearchTerm",
    bindKey: "backspace",
    exec: function(iSearch) ***REMOVED***
        iSearch.removeChar();
***REMOVED***
    readOnly: true,
    isIncrementalSearchCommand: true
***REMOVED***, ***REMOVED***
    name: 'confirmSearch',
    bindKey: 'return',
    exec: function(iSearch) ***REMOVED*** iSearch.deactivate(); ***REMOVED***,
    readOnly: true,
    isIncrementalSearchCommand: true
***REMOVED***, ***REMOVED***
    name: 'cancelSearch',
    bindKey: 'esc|Ctrl-G',
    exec: function(iSearch) ***REMOVED*** iSearch.deactivate(true); ***REMOVED***,
    readOnly: true,
    isIncrementalSearchCommand: true
***REMOVED***, ***REMOVED***
    name: 'occurisearch',
    bindKey: 'Ctrl-O',
    exec: function(iSearch) ***REMOVED***
        var options = oop.mixin(***REMOVED******REMOVED***, iSearch.$options);
        iSearch.deactivate();
        occurStartCommand.exec(iSearch.$editor, options);
***REMOVED***
    readOnly: true,
    isIncrementalSearchCommand: true
***REMOVED***, ***REMOVED***
    name: "yankNextWord",
    bindKey: "Ctrl-w",
    exec: function(iSearch) ***REMOVED***
        var ed = iSearch.$editor,
            range = ed.selection.getRangeOfMovements(function(sel) ***REMOVED*** sel.moveCursorWordRight(); ***REMOVED***),
            string = ed.session.getTextRange(range);
        iSearch.addString(string);
***REMOVED***
    readOnly: true,
    isIncrementalSearchCommand: true
***REMOVED***, ***REMOVED***
    name: "yankNextChar",
    bindKey: "Ctrl-Alt-y",
    exec: function(iSearch) ***REMOVED***
        var ed = iSearch.$editor,
            range = ed.selection.getRangeOfMovements(function(sel) ***REMOVED*** sel.moveCursorRight(); ***REMOVED***),
            string = ed.session.getTextRange(range);
        iSearch.addString(string);
***REMOVED***
    readOnly: true,
    isIncrementalSearchCommand: true
***REMOVED***, ***REMOVED***
    name: 'recenterTopBottom',
    bindKey: 'Ctrl-l',
    exec: function(iSearch) ***REMOVED*** iSearch.$editor.execCommand('recenterTopBottom'); ***REMOVED***,
    readOnly: true,
    isIncrementalSearchCommand: true
***REMOVED***];

function IncrementalSearchKeyboardHandler(iSearch) ***REMOVED***
    this.$iSearch = iSearch;
***REMOVED***

oop.inherits(IncrementalSearchKeyboardHandler, HashHandler);

;(function() ***REMOVED***

    this.attach = function(editor) ***REMOVED***
        var iSearch = this.$iSearch;
        HashHandler.call(this, exports.iSearchCommands, editor.commands.platform);
        this.$commandExecHandler = editor.commands.addEventListener('exec', function(e) ***REMOVED***
            if (!e.command.isIncrementalSearchCommand) return undefined;
            e.stopPropagation();
            e.preventDefault();
            return e.command.exec(iSearch, e.args || ***REMOVED******REMOVED***);
    ***REMOVED***);
***REMOVED***

    this.detach = function(editor) ***REMOVED***
        if (!this.$commandExecHandler) return;
        editor.commands.removeEventListener('exec', this.$commandExecHandler);
        delete this.$commandExecHandler;
***REMOVED***

    var handleKeyboard$super = this.handleKeyboard;
    this.handleKeyboard = function(data, hashId, key, keyCode) ***REMOVED***
        if (((hashId === 1/*ctrl*/ || hashId === 8/*command*/) && key === 'v')
         || (hashId === 1/*ctrl*/ && key === 'y')) return null;
        var cmd = handleKeyboard$super.call(this, data, hashId, key, keyCode);
        if (cmd.command) ***REMOVED*** return cmd; ***REMOVED***
        if (hashId == -1) ***REMOVED***
            var extendCmd = this.commands.extendSearchTerm;
            if (extendCmd) ***REMOVED*** return ***REMOVED***command: extendCmd, args: key***REMOVED***; ***REMOVED***
    ***REMOVED***
        return ***REMOVED***command: "null", passEvent: hashId == 0 || hashId == 4***REMOVED***;
***REMOVED***

***REMOVED***).call(IncrementalSearchKeyboardHandler.prototype);


exports.IncrementalSearchKeyboardHandler = IncrementalSearchKeyboardHandler;

***REMOVED***);

define('ace/commands/occur_commands', ['require', 'exports', 'module' , 'ace/config', 'ace/occur', 'ace/keyboard/hash_handler', 'ace/lib/oop'], function(require, exports, module) ***REMOVED***

var config = require("../config"),
    Occur = require("../occur").Occur;
var occurStartCommand = ***REMOVED***
    name: "occur",
    exec: function(editor, options) ***REMOVED***
        var alreadyInOccur = !!editor.session.$occur;
        var occurSessionActive = new Occur().enter(editor, options);
        if (occurSessionActive && !alreadyInOccur)
            OccurKeyboardHandler.installIn(editor);
***REMOVED***
    readOnly: true
***REMOVED***;

var occurCommands = [***REMOVED***
    name: "occurexit",
    bindKey: 'esc|Ctrl-G',
    exec: function(editor) ***REMOVED***
        var occur = editor.session.$occur;
        if (!occur) return;
        occur.exit(editor, ***REMOVED******REMOVED***);
        if (!editor.session.$occur) OccurKeyboardHandler.uninstallFrom(editor);
***REMOVED***
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "occuraccept",
    bindKey: 'enter',
    exec: function(editor) ***REMOVED***
        var occur = editor.session.$occur;
        if (!occur) return;
        occur.exit(editor, ***REMOVED***translatePosition: true***REMOVED***);
        if (!editor.session.$occur) OccurKeyboardHandler.uninstallFrom(editor);
***REMOVED***
    readOnly: true
***REMOVED***];

var HashHandler = require("../keyboard/hash_handler").HashHandler;
var oop = require("../lib/oop");


function OccurKeyboardHandler() ***REMOVED******REMOVED***

oop.inherits(OccurKeyboardHandler, HashHandler);

;(function() ***REMOVED***

    this.isOccurHandler = true;

    this.attach = function(editor) ***REMOVED***
        HashHandler.call(this, occurCommands, editor.commands.platform);
        this.$editor = editor;
***REMOVED***

    var handleKeyboard$super = this.handleKeyboard;
    this.handleKeyboard = function(data, hashId, key, keyCode) ***REMOVED***
        var cmd = handleKeyboard$super.call(this, data, hashId, key, keyCode);
        return (cmd && cmd.command) ? cmd : undefined;
***REMOVED***

***REMOVED***).call(OccurKeyboardHandler.prototype);

OccurKeyboardHandler.installIn = function(editor) ***REMOVED***
    var handler = new this();
    editor.keyBinding.addKeyboardHandler(handler);
    editor.commands.addCommands(occurCommands);
***REMOVED***

OccurKeyboardHandler.uninstallFrom = function(editor) ***REMOVED***
    editor.commands.removeCommands(occurCommands);
    var handler = editor.getKeyboardHandler();
    if (handler.isOccurHandler)
        editor.keyBinding.removeKeyboardHandler(handler);
***REMOVED***

exports.occurStartCommand = occurStartCommand;

***REMOVED***);

define('ace/occur', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/range', 'ace/search', 'ace/edit_session', 'ace/search_highlight', 'ace/lib/dom'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var Range = require("./range").Range;
var Search = require("./search").Search;
var EditSession = require("./edit_session").EditSession;
var SearchHighlight = require("./search_highlight").SearchHighlight;
function Occur() ***REMOVED******REMOVED***

oop.inherits(Occur, Search);

(function() ***REMOVED***
    this.enter = function(editor, options) ***REMOVED***
        if (!options.needle) return false;
        var pos = editor.getCursorPosition();
        this.displayOccurContent(editor, options);
        var translatedPos = this.originalToOccurPosition(editor.session, pos);
        editor.moveCursorToPosition(translatedPos);
        return true;
***REMOVED***
    this.exit = function(editor, options) ***REMOVED***
        var pos = options.translatePosition && editor.getCursorPosition();
        var translatedPos = pos && this.occurToOriginalPosition(editor.session, pos);
        this.displayOriginalContent(editor);
        if (translatedPos)
            editor.moveCursorToPosition(translatedPos);
        return true;
***REMOVED***

    this.highlight = function(sess, regexp) ***REMOVED***
        var hl = sess.$occurHighlight = sess.$occurHighlight || sess.addDynamicMarker(
                new SearchHighlight(null, "ace_occur-highlight", "text"));
        hl.setRegexp(regexp);
        sess._emit("changeBackMarker"); // force highlight layer redraw
***REMOVED***

    this.displayOccurContent = function(editor, options) ***REMOVED***
        this.$originalSession = editor.session;
        var found = this.matchingLines(editor.session, options);
        var lines = found.map(function(foundLine) ***REMOVED*** return foundLine.content; ***REMOVED***);
        var occurSession = new EditSession(lines.join('\n'));
        occurSession.$occur = this;
        occurSession.$occurMatchingLines = found;
        editor.setSession(occurSession);
        this.$useEmacsStyleLineStart = this.$originalSession.$useEmacsStyleLineStart;
        occurSession.$useEmacsStyleLineStart = this.$useEmacsStyleLineStart;
        this.highlight(occurSession, options.re);
        occurSession._emit('changeBackMarker');
***REMOVED***

    this.displayOriginalContent = function(editor) ***REMOVED***
        editor.setSession(this.$originalSession);
        this.$originalSession.$useEmacsStyleLineStart = this.$useEmacsStyleLineStart;
***REMOVED***
    this.originalToOccurPosition = function(session, pos) ***REMOVED***
        var lines = session.$occurMatchingLines;
        var nullPos = ***REMOVED***row: 0, column: 0***REMOVED***;
        if (!lines) return nullPos;
        for (var i = 0; i < lines.length; i++) ***REMOVED***
            if (lines[i].row === pos.row)
                return ***REMOVED***row: i, column: pos.column***REMOVED***;
    ***REMOVED***
        return nullPos;
***REMOVED***
    this.occurToOriginalPosition = function(session, pos) ***REMOVED***
        var lines = session.$occurMatchingLines;
        if (!lines || !lines[pos.row])
            return pos;
        return ***REMOVED***row: lines[pos.row].row, column: pos.column***REMOVED***;
***REMOVED***

    this.matchingLines = function(session, options) ***REMOVED***
        options = oop.mixin(***REMOVED******REMOVED***, options);
        if (!session || !options.needle) return [];
        var search = new Search();
        search.set(options);
        return search.findAll(session).reduce(function(lines, range) ***REMOVED***
            var row = range.start.row;
            var last = lines[lines.length-1];
            return last && last.row === row ?
                lines :
                lines.concat(***REMOVED***row: row, content: session.getLine(row)***REMOVED***);
    ***REMOVED*** []);
***REMOVED***

***REMOVED***).call(Occur.prototype);

var dom = require('./lib/dom');
dom.importCssString(".ace_occur-highlight ***REMOVED***\n\
    border-radius: 4px;\n\
    background-color: rgba(87, 255, 8, 0.25);\n\
    position: absolute;\n\
    z-index: 4;\n\
    -moz-box-sizing: border-box;\n\
    -webkit-box-sizing: border-box;\n\
    box-sizing: border-box;\n\
    box-shadow: 0 0 4px rgb(91, 255, 50);\n\
***REMOVED***\n\
.ace_dark .ace_occur-highlight ***REMOVED***\n\
    background-color: rgb(80, 140, 85);\n\
    box-shadow: 0 0 4px rgb(60, 120, 70);\n\
***REMOVED***\n", "incremental-occur-highlighting");

exports.Occur = Occur;

***REMOVED***);
