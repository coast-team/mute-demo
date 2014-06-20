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

define('ace/keyboard/vim', ['require', 'exports', 'module' , 'ace/keyboard/vim/commands', 'ace/keyboard/vim/maps/util', 'ace/lib/useragent'], function(require, exports, module) ***REMOVED***


var cmds = require("./vim/commands");
var coreCommands = cmds.coreCommands;
var util = require("./vim/maps/util");
var useragent = require("../lib/useragent");

var startCommands = ***REMOVED***
    "i": ***REMOVED***
        command: coreCommands.start
***REMOVED***
    "I": ***REMOVED***
        command: coreCommands.startBeginning
***REMOVED***
    "a": ***REMOVED***
        command: coreCommands.append
***REMOVED***
    "A": ***REMOVED***
        command: coreCommands.appendEnd
***REMOVED***
    "ctrl-f": ***REMOVED***
        command: "gotopagedown"
***REMOVED***
    "ctrl-b": ***REMOVED***
        command: "gotopageup"
***REMOVED***
***REMOVED***;

exports.handler = ***REMOVED***
	$id: "ace/keyboard/vim",
    handleMacRepeat: function(data, hashId, key) ***REMOVED***
        if (hashId == -1) ***REMOVED***
            data.inputChar = key;
            data.lastEvent = "input";
    ***REMOVED*** else if (data.inputChar && data.$lastHash == hashId && data.$lastKey == key) ***REMOVED***
            if (data.lastEvent == "input") ***REMOVED***
                data.lastEvent = "input1";
        ***REMOVED*** else if (data.lastEvent == "input1") ***REMOVED***
                return true;
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            data.$lastHash = hashId;
            data.$lastKey = key;
            data.lastEvent = "keypress";
    ***REMOVED***
***REMOVED***
    updateMacCompositionHandlers: function(editor, enable) ***REMOVED***
        var onCompositionUpdateOverride = function(text) ***REMOVED***
            if (util.currentMode !== "insert") ***REMOVED***
                var el = this.textInput.getElement();
                el.blur();
                el.focus();
                el.value = text;
        ***REMOVED*** else ***REMOVED***
                this.onCompositionUpdateOrig(text);
        ***REMOVED***
    ***REMOVED***;
        var onCompositionStartOverride = function(text) ***REMOVED***
            if (util.currentMode === "insert") ***REMOVED***            
                this.onCompositionStartOrig(text);
        ***REMOVED***
    ***REMOVED***;
        if (enable) ***REMOVED***
            if (!editor.onCompositionUpdateOrig) ***REMOVED***
                editor.onCompositionUpdateOrig = editor.onCompositionUpdate;
                editor.onCompositionUpdate = onCompositionUpdateOverride;
                editor.onCompositionStartOrig = editor.onCompositionStart;
                editor.onCompositionStart = onCompositionStartOverride;
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            if (editor.onCompositionUpdateOrig) ***REMOVED***
                editor.onCompositionUpdate = editor.onCompositionUpdateOrig;
                editor.onCompositionUpdateOrig = null;
                editor.onCompositionStart = editor.onCompositionStartOrig;
                editor.onCompositionStartOrig = null;
        ***REMOVED***
    ***REMOVED***
***REMOVED***

    handleKeyboard: function(data, hashId, key, keyCode, e) ***REMOVED***
        if (hashId !== 0 && (!key || keyCode == -1))
            return null;
        
        var editor = data.editor;
        
        if (hashId == 1)
            key = "ctrl-" + key;
        if (key == "ctrl-c") ***REMOVED***
            if (!useragent.isMac && editor.getCopyText()) ***REMOVED***
                editor.once("copy", function() ***REMOVED***
                    if (data.state == "start")
                        coreCommands.stop.exec(editor);
                    else
                        editor.selection.clearSelection();
            ***REMOVED***);
                return ***REMOVED***command: "null", passEvent: true***REMOVED***;
        ***REMOVED***
            return ***REMOVED***command: coreCommands.stop***REMOVED***;            
    ***REMOVED*** else if ((key == "esc" && hashId === 0) || key == "ctrl-[") ***REMOVED***
            return ***REMOVED***command: coreCommands.stop***REMOVED***;
    ***REMOVED*** else if (data.state == "start") ***REMOVED***
            if (useragent.isMac && this.handleMacRepeat(data, hashId, key)) ***REMOVED***
                hashId = -1;
                key = data.inputChar;
        ***REMOVED***
            
            if (hashId == -1 || hashId == 1 || hashId === 0 && key.length > 1) ***REMOVED***
                if (cmds.inputBuffer.idle && startCommands[key])
                    return startCommands[key];
                var isHandled = cmds.inputBuffer.push(editor, key);
                if (!isHandled && hashId !== -1)
                    return;
                return ***REMOVED***command: "null", passEvent: !isHandled***REMOVED***; 
        ***REMOVED*** // if no modifier || shift: wait for input.
            else if (key.length == 1 && (hashId === 0 || hashId == 4)) ***REMOVED***
                return ***REMOVED***command: "null", passEvent: true***REMOVED***;
        ***REMOVED*** else if (key == "esc" && hashId === 0) ***REMOVED***
                return ***REMOVED***command: coreCommands.stop***REMOVED***;
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            if (key == "ctrl-w") ***REMOVED***
                return ***REMOVED***command: "removewordleft"***REMOVED***;
        ***REMOVED***
    ***REMOVED***
***REMOVED***

    attach: function(editor) ***REMOVED***
        editor.on("click", exports.onCursorMove);
        if (util.currentMode !== "insert")
            cmds.coreCommands.stop.exec(editor);
        editor.$vimModeHandler = this;
        
        this.updateMacCompositionHandlers(editor, true);
***REMOVED***

    detach: function(editor) ***REMOVED***
        editor.removeListener("click", exports.onCursorMove);
        util.noMode(editor);
        util.currentMode = "normal";
        this.updateMacCompositionHandlers(editor, false);
***REMOVED***

    actions: cmds.actions,
    getStatusText: function() ***REMOVED***
        if (util.currentMode == "insert")
            return "INSERT";
        if (util.onVisualMode)
            return (util.onVisualLineMode ? "VISUAL LINE " : "VISUAL ") + cmds.inputBuffer.status;
        return cmds.inputBuffer.status;
***REMOVED***
***REMOVED***;


exports.onCursorMove = function(e) ***REMOVED***
    cmds.onCursorMove(e.editor, e);
    exports.onCursorMove.scheduled = false;
***REMOVED***;

***REMOVED***);
 
define('ace/keyboard/vim/commands', ['require', 'exports', 'module' , 'ace/lib/lang', 'ace/keyboard/vim/maps/util', 'ace/keyboard/vim/maps/motions', 'ace/keyboard/vim/maps/operators', 'ace/keyboard/vim/maps/aliases', 'ace/keyboard/vim/registers'], function(require, exports, module) ***REMOVED***

"never use strict";

var lang = require("../../lib/lang");
var util = require("./maps/util");
var motions = require("./maps/motions");
var operators = require("./maps/operators");
var alias = require("./maps/aliases");
var registers = require("./registers");

var NUMBER = 1;
var OPERATOR = 2;
var MOTION = 3;
var ACTION = 4;
var HMARGIN = 8; // Minimum amount of line separation between margins;

var repeat = function repeat(fn, count, args) ***REMOVED***
    while (0 < count--)
        fn.apply(this, args);
***REMOVED***;

var ensureScrollMargin = function(editor) ***REMOVED***
    var renderer = editor.renderer;
    var pos = renderer.$cursorLayer.getPixelPosition();

    var top = pos.top;

    var margin = HMARGIN * renderer.layerConfig.lineHeight;
    if (2 * margin > renderer.$size.scrollerHeight)
        margin = renderer.$size.scrollerHeight / 2;

    if (renderer.scrollTop > top - margin) ***REMOVED***
        renderer.session.setScrollTop(top - margin);
***REMOVED***

    if (renderer.scrollTop + renderer.$size.scrollerHeight < top + margin + renderer.lineHeight) ***REMOVED***
        renderer.session.setScrollTop(top + margin + renderer.lineHeight - renderer.$size.scrollerHeight);
***REMOVED***
***REMOVED***;

var actions = exports.actions = ***REMOVED***
    "z": ***REMOVED***
        param: true,
        fn: function(editor, range, count, param) ***REMOVED***
            switch (param) ***REMOVED***
                case "z":
                    editor.renderer.alignCursor(null, 0.5);
                    break;
                case "t":
                    editor.renderer.alignCursor(null, 0);
                    break;
                case "b":
                    editor.renderer.alignCursor(null, 1);
                    break;
                case "c":
                    editor.session.onFoldWidgetClick(range.start.row, ***REMOVED***domEvent:***REMOVED***target :***REMOVED******REMOVED******REMOVED******REMOVED***);
                    break;
                case "o":
                    editor.session.onFoldWidgetClick(range.start.row, ***REMOVED***domEvent:***REMOVED***target :***REMOVED******REMOVED******REMOVED******REMOVED***);
                    break;
                case "C":
                    editor.session.foldAll();
                    break;
                case "O":
                    editor.session.unfold();
                    break;
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    "r": ***REMOVED***
        param: true,
        fn: function(editor, range, count, param) ***REMOVED***
            if (param && param.length) ***REMOVED***
                if (param.length > 1)
                    param = param == "return" ? "\n" : param == "tab" ? "\t" : param;
                repeat(function() ***REMOVED*** editor.insert(param); ***REMOVED***, count || 1);
                editor.navigateLeft();
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    "R": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            util.insertMode(editor);
            editor.setOverwrite(true);
    ***REMOVED***
***REMOVED***
    "~": ***REMOVED***
        fn: function(editor, range, count) ***REMOVED***
            repeat(function() ***REMOVED***
                var range = editor.selection.getRange();
                if (range.isEmpty())
                    range.end.column++;
                var text = editor.session.getTextRange(range);
                var toggled = text.toUpperCase();
                if (toggled == text)
                    editor.navigateRight();
                else
                    editor.session.replace(range, toggled);
        ***REMOVED*** count || 1);
    ***REMOVED***
***REMOVED***
    "*": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            editor.selection.selectWord();
            editor.findNext();
            ensureScrollMargin(editor);
            var r = editor.selection.getRange();
            editor.selection.setSelectionRange(r, true);
    ***REMOVED***
***REMOVED***
    "#": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            editor.selection.selectWord();
            editor.findPrevious();
            ensureScrollMargin(editor);
            var r = editor.selection.getRange();
            editor.selection.setSelectionRange(r, true);
    ***REMOVED***
***REMOVED***
    "m": ***REMOVED***
        param: true,
        fn: function(editor, range, count, param) ***REMOVED***
            var s =  editor.session;
            var markers = s.vimMarkers || (s.vimMarkers = ***REMOVED******REMOVED***);
            var c = editor.getCursorPosition();
            if (!markers[param]) ***REMOVED***
                markers[param] = editor.session.doc.createAnchor(c);
        ***REMOVED***
            markers[param].setPosition(c.row, c.column, true);
    ***REMOVED***
***REMOVED***
    "n": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            var options = editor.getLastSearchOptions();
            options.backwards = false;

            editor.selection.moveCursorRight();
            editor.selection.clearSelection();
            editor.findNext(options);

            ensureScrollMargin(editor);
            var r = editor.selection.getRange();
            r.end.row = r.start.row;
            r.end.column = r.start.column;
            editor.selection.setSelectionRange(r, true);
    ***REMOVED***
***REMOVED***
    "N": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            var options = editor.getLastSearchOptions();
            options.backwards = true;

            editor.findPrevious(options);
            ensureScrollMargin(editor);
            var r = editor.selection.getRange();
            r.end.row = r.start.row;
            r.end.column = r.start.column;
            editor.selection.setSelectionRange(r, true);
    ***REMOVED***
***REMOVED***
    "v": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            editor.selection.selectRight();
            util.visualMode(editor, false);
    ***REMOVED***
        acceptsMotion: true
***REMOVED***
    "V": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            var row = editor.getCursorPosition().row;
            editor.selection.moveTo(row, 0);
            editor.selection.selectLineEnd();
            editor.selection.visualLineStart = row;

            util.visualMode(editor, true);
    ***REMOVED***
        acceptsMotion: true
***REMOVED***
    "Y": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            util.copyLine(editor);
    ***REMOVED***
***REMOVED***
    "p": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            var defaultReg = registers._default;

            editor.setOverwrite(false);
            if (defaultReg.isLine) ***REMOVED***
                var pos = editor.getCursorPosition();
                pos.column = editor.session.getLine(pos.row).length;
                var text = lang.stringRepeat("\n" + defaultReg.text, count || 1);
                editor.session.insert(pos, text);
                editor.moveCursorTo(pos.row + 1, 0);
        ***REMOVED***
            else ***REMOVED***
                editor.navigateRight();
                editor.insert(lang.stringRepeat(defaultReg.text, count || 1));
                editor.navigateLeft();
        ***REMOVED***
            editor.setOverwrite(true);
            editor.selection.clearSelection();
    ***REMOVED***
***REMOVED***
    "P": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            var defaultReg = registers._default;
            editor.setOverwrite(false);

            if (defaultReg.isLine) ***REMOVED***
                var pos = editor.getCursorPosition();
                pos.column = 0;
                var text = lang.stringRepeat(defaultReg.text + "\n", count || 1);
                editor.session.insert(pos, text);
                editor.moveCursorToPosition(pos);
        ***REMOVED***
            else ***REMOVED***
                editor.insert(lang.stringRepeat(defaultReg.text, count || 1));
        ***REMOVED***
            editor.setOverwrite(true);
            editor.selection.clearSelection();
    ***REMOVED***
***REMOVED***
    "J": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            var session = editor.session;
            range = editor.getSelectionRange();
            var pos = ***REMOVED***row: range.start.row, column: range.start.column***REMOVED***;
            count = count || range.end.row - range.start.row;
            var maxRow = Math.min(pos.row + (count || 1), session.getLength() - 1);

            range.start.column = session.getLine(pos.row).length;
            range.end.column = session.getLine(maxRow).length;
            range.end.row = maxRow;

            var text = "";
            for (var i = pos.row; i < maxRow; i++) ***REMOVED***
                var nextLine = session.getLine(i + 1);
                text += " " + /^\s*(.*)$/.exec(nextLine)[1] || "";
        ***REMOVED***

            session.replace(range, text);
            editor.moveCursorTo(pos.row, pos.column);
    ***REMOVED***
***REMOVED***
    "u": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            count = parseInt(count || 1, 10);
            for (var i = 0; i < count; i++) ***REMOVED***
                editor.undo();
        ***REMOVED***
            editor.selection.clearSelection();
    ***REMOVED***
***REMOVED***
    "ctrl-r": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            count = parseInt(count || 1, 10);
            for (var i = 0; i < count; i++) ***REMOVED***
                editor.redo();
        ***REMOVED***
            editor.selection.clearSelection();
    ***REMOVED***
***REMOVED***
    ":": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            var val = ":";
            if (count > 1)
                val = ".,.+" + count + val;
            if (editor.showCommandLine)
                editor.showCommandLine(val);
    ***REMOVED***
***REMOVED***
    "/": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            if (editor.showCommandLine)
                editor.showCommandLine("/");
    ***REMOVED***
***REMOVED***
    "?": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            if (editor.showCommandLine)
                editor.showCommandLine("?");
    ***REMOVED***
***REMOVED***
    ".": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            util.onInsertReplaySequence = inputBuffer.lastInsertCommands;
            var previous = inputBuffer.previous;
            if (previous) // If there is a previous action
                inputBuffer.exec(editor, previous.action, previous.param);
    ***REMOVED***
***REMOVED***
    "ctrl-x": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            editor.modifyNumber(-(count || 1));
    ***REMOVED***
***REMOVED***
    "ctrl-a": ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            editor.modifyNumber(count || 1);
    ***REMOVED***
***REMOVED***
***REMOVED***;

var inputBuffer = exports.inputBuffer = ***REMOVED***
    accepting: [NUMBER, OPERATOR, MOTION, ACTION],
    currentCmd: null,
    currentCount: "",
    status: "",
    operator: null,
    motion: null,

    lastInsertCommands: [],

    push: function(editor, ch, keyId) ***REMOVED***
        var status = this.status;
        var isKeyHandled = true;
        this.idle = false;
        var wObj = this.waitingForParam;
        if (/^numpad\d+$/i.test(ch))
            ch = ch.substr(6);
            
        if (wObj) ***REMOVED***
            this.exec(editor, wObj, ch);
    ***REMOVED***
        else if (!(ch === "0" && !this.currentCount.length) &&
            (/^\d+$/.test(ch) && this.isAccepting(NUMBER))) ***REMOVED***
            this.currentCount += ch;
            this.currentCmd = NUMBER;
            this.accepting = [NUMBER, OPERATOR, MOTION, ACTION];
    ***REMOVED***
        else if (!this.operator && this.isAccepting(OPERATOR) && operators[ch]) ***REMOVED***
            this.operator = ***REMOVED***
                ch: ch,
                count: this.getCount()
        ***REMOVED***;
            this.currentCmd = OPERATOR;
            this.accepting = [NUMBER, MOTION, ACTION];
            this.exec(editor, ***REMOVED*** operator: this.operator ***REMOVED***);
    ***REMOVED***
        else if (motions[ch] && this.isAccepting(MOTION)) ***REMOVED***
            this.currentCmd = MOTION;

            var ctx = ***REMOVED***
                operator: this.operator,
                motion: ***REMOVED***
                    ch: ch,
                    count: this.getCount()
            ***REMOVED***
        ***REMOVED***;

            if (motions[ch].param)
                this.waitForParam(ctx);
            else
                this.exec(editor, ctx);
    ***REMOVED***
        else if (alias[ch] && this.isAccepting(MOTION)) ***REMOVED***
            alias[ch].operator.count = this.getCount();
            this.exec(editor, alias[ch]);
    ***REMOVED***
        else if (actions[ch] && this.isAccepting(ACTION)) ***REMOVED***
            var actionObj = ***REMOVED***
                action: ***REMOVED***
                    fn: actions[ch].fn,
                    count: this.getCount()
            ***REMOVED***
        ***REMOVED***;

            if (actions[ch].param) ***REMOVED***
                this.waitForParam(actionObj);
        ***REMOVED***
            else ***REMOVED***
                this.exec(editor, actionObj);
        ***REMOVED***

            if (actions[ch].acceptsMotion)
                this.idle = false;
    ***REMOVED***
        else if (this.operator) ***REMOVED***
            this.operator.count = this.getCount();
            this.exec(editor, ***REMOVED*** operator: this.operator ***REMOVED***, ch);
    ***REMOVED***
        else ***REMOVED***
            isKeyHandled = ch.length == 1;
            this.reset();
    ***REMOVED***
        
        if (this.waitingForParam || this.motion || this.operator) ***REMOVED***
            this.status += ch;
    ***REMOVED*** else if (this.currentCount) ***REMOVED***
            this.status = this.currentCount;
    ***REMOVED*** else if (this.status) ***REMOVED***
            this.status = "";
    ***REMOVED***
        if (this.status != status)
            editor._emit("changeStatus");
        return isKeyHandled;
***REMOVED***

    waitForParam: function(cmd) ***REMOVED***
        this.waitingForParam = cmd;
***REMOVED***

    getCount: function() ***REMOVED***
        var count = this.currentCount;
        this.currentCount = "";
        return count && parseInt(count, 10);
***REMOVED***

    exec: function(editor, action, param) ***REMOVED***
        var m = action.motion;
        var o = action.operator;
        var a = action.action;

        if (!param)
            param = action.param;

        if (o) ***REMOVED***
            this.previous = ***REMOVED***
                action: action,
                param: param
        ***REMOVED***;
    ***REMOVED***

        if (o && !editor.selection.isEmpty()) ***REMOVED***
            if (operators[o.ch].selFn) ***REMOVED***
                operators[o.ch].selFn(editor, editor.getSelectionRange(), o.count, param);
                this.reset();
        ***REMOVED***
            return;
    ***REMOVED***
        else if (!m && !a && o && param) ***REMOVED***
            operators[o.ch].fn(editor, null, o.count, param);
            this.reset();
    ***REMOVED***
        else if (m) ***REMOVED***
            var run = function(fn) ***REMOVED***
                if (fn && typeof fn === "function") ***REMOVED*** // There should always be a motion
                    if (m.count && !motionObj.handlesCount)
                        repeat(fn, m.count, [editor, null, m.count, param]);
                    else
                        fn(editor, null, m.count, param);
            ***REMOVED***
        ***REMOVED***;

            var motionObj = motions[m.ch];
            var selectable = motionObj.sel;

            if (!o) ***REMOVED***
                if ((util.onVisualMode || util.onVisualLineMode) && selectable)
                    run(motionObj.sel);
                else
                    run(motionObj.nav);
        ***REMOVED***
            else if (selectable) ***REMOVED***
                repeat(function() ***REMOVED***
                    run(motionObj.sel);
                    operators[o.ch].fn(editor, editor.getSelectionRange(), o.count, param);
            ***REMOVED*** o.count || 1);
        ***REMOVED***
            this.reset();
    ***REMOVED***
        else if (a) ***REMOVED***
            a.fn(editor, editor.getSelectionRange(), a.count, param);
            this.reset();
    ***REMOVED***
        handleCursorMove(editor);
***REMOVED***

    isAccepting: function(type) ***REMOVED***
        return this.accepting.indexOf(type) !== -1;
***REMOVED***

    reset: function() ***REMOVED***
        this.operator = null;
        this.motion = null;
        this.currentCount = "";
        this.status = "";
        this.accepting = [NUMBER, OPERATOR, MOTION, ACTION];
        this.idle = true;
        this.waitingForParam = null;
***REMOVED***
***REMOVED***;

function setPreviousCommand(fn) ***REMOVED***
    inputBuffer.previous = ***REMOVED*** action: ***REMOVED*** action: ***REMOVED*** fn: fn ***REMOVED*** ***REMOVED*** ***REMOVED***;
***REMOVED***

exports.coreCommands = ***REMOVED***
    start: ***REMOVED***
        exec: function start(editor) ***REMOVED***
            util.insertMode(editor);
            setPreviousCommand(start);
    ***REMOVED***
***REMOVED***
    startBeginning: ***REMOVED***
        exec: function startBeginning(editor) ***REMOVED***
            editor.navigateLineStart();
            util.insertMode(editor);
            setPreviousCommand(startBeginning);
    ***REMOVED***
***REMOVED***
    stop: ***REMOVED***
        exec: function stop(editor) ***REMOVED***
            inputBuffer.reset();
            util.onVisualMode = false;
            util.onVisualLineMode = false;
            inputBuffer.lastInsertCommands = util.normalMode(editor);
    ***REMOVED***
***REMOVED***
    append: ***REMOVED***
        exec: function append(editor) ***REMOVED***
            var pos = editor.getCursorPosition();
            var lineLen = editor.session.getLine(pos.row).length;
            if (lineLen)
                editor.navigateRight();
            util.insertMode(editor);
            setPreviousCommand(append);
    ***REMOVED***
***REMOVED***
    appendEnd: ***REMOVED***
        exec: function appendEnd(editor) ***REMOVED***
            editor.navigateLineEnd();
            util.insertMode(editor);
            setPreviousCommand(appendEnd);
    ***REMOVED***
***REMOVED***
***REMOVED***;

var handleCursorMove = exports.onCursorMove = function(editor, e) ***REMOVED***
    if (util.currentMode === 'insert' || handleCursorMove.running)
        return;
    else if(!editor.selection.isEmpty()) ***REMOVED***
        handleCursorMove.running = true;
        if (util.onVisualLineMode) ***REMOVED***
            var originRow = editor.selection.visualLineStart;
            var cursorRow = editor.getCursorPosition().row;
            if(originRow <= cursorRow) ***REMOVED***
                var endLine = editor.session.getLine(cursorRow);
                editor.selection.moveTo(originRow, 0);
                editor.selection.selectTo(cursorRow, endLine.length);
        ***REMOVED*** else ***REMOVED***
                var endLine = editor.session.getLine(originRow);
                editor.selection.moveTo(originRow, endLine.length);
                editor.selection.selectTo(cursorRow, 0);
        ***REMOVED***
    ***REMOVED***
        handleCursorMove.running = false;
        return;
***REMOVED***
    else ***REMOVED***
        if (e && (util.onVisualLineMode || util.onVisualMode)) ***REMOVED***
            editor.selection.clearSelection();
            util.normalMode(editor);
    ***REMOVED***

        handleCursorMove.running = true;
        var pos = editor.getCursorPosition();
        var lineLen = editor.session.getLine(pos.row).length;

        if (lineLen && pos.column === lineLen)
            editor.navigateLeft();
        handleCursorMove.running = false;
***REMOVED***
***REMOVED***;
***REMOVED***);
define('ace/keyboard/vim/maps/util', ['require', 'exports', 'module' , 'ace/keyboard/vim/registers', 'ace/lib/dom'], function(require, exports, module) ***REMOVED***
var registers = require("../registers");

var dom = require("../../../lib/dom");
dom.importCssString('.insert-mode .ace_cursor***REMOVED***\
    border-left: 2px solid #333333;\
***REMOVED***\
.ace_dark.insert-mode .ace_cursor***REMOVED***\
    border-left: 2px solid #eeeeee;\
***REMOVED***\
.normal-mode .ace_cursor***REMOVED***\
    border: 0!important;\
    background-color: red;\
    opacity: 0.5;\
***REMOVED***', 'vimMode');

module.exports = ***REMOVED***
    onVisualMode: false,
    onVisualLineMode: false,
    currentMode: 'normal',
    noMode: function(editor) ***REMOVED***
        editor.unsetStyle('insert-mode');
        editor.unsetStyle('normal-mode');
        if (editor.commands.recording)
            editor.commands.toggleRecording(editor);
        editor.setOverwrite(false);
***REMOVED***
    insertMode: function(editor) ***REMOVED***
        this.currentMode = 'insert';
        editor.setStyle('insert-mode');
        editor.unsetStyle('normal-mode');

        editor.setOverwrite(false);
        editor.keyBinding.$data.buffer = "";
        editor.keyBinding.$data.state = "insertMode";
        this.onVisualMode = false;
        this.onVisualLineMode = false;
        if(this.onInsertReplaySequence) ***REMOVED***
            editor.commands.macro = this.onInsertReplaySequence;
            editor.commands.replay(editor);
            this.onInsertReplaySequence = null;
            this.normalMode(editor);
    ***REMOVED*** else ***REMOVED***
            editor._emit("changeStatus");
            if(!editor.commands.recording)
                editor.commands.toggleRecording(editor);
    ***REMOVED***
***REMOVED***
    normalMode: function(editor) ***REMOVED***
        this.currentMode = 'normal';

        editor.unsetStyle('insert-mode');
        editor.setStyle('normal-mode');
        editor.clearSelection();

        var pos;
        if (!editor.getOverwrite()) ***REMOVED***
            pos = editor.getCursorPosition();
            if (pos.column > 0)
                editor.navigateLeft();
    ***REMOVED***

        editor.setOverwrite(true);
        editor.keyBinding.$data.buffer = "";
        editor.keyBinding.$data.state = "start";
        this.onVisualMode = false;
        this.onVisualLineMode = false;
        editor._emit("changeStatus");
        if (editor.commands.recording) ***REMOVED***
            editor.commands.toggleRecording(editor);
            return editor.commands.macro;
    ***REMOVED***
        else ***REMOVED***
            return [];
    ***REMOVED***
***REMOVED***
    visualMode: function(editor, lineMode) ***REMOVED***
        if (
            (this.onVisualLineMode && lineMode)
            || (this.onVisualMode && !lineMode)
        ) ***REMOVED***
            this.normalMode(editor);
            return;
    ***REMOVED***

        editor.setStyle('insert-mode');
        editor.unsetStyle('normal-mode');

        editor._emit("changeStatus");
        if (lineMode) ***REMOVED***
            this.onVisualLineMode = true;
    ***REMOVED*** else ***REMOVED***
            this.onVisualMode = true;
            this.onVisualLineMode = false;
    ***REMOVED***
***REMOVED***
    getRightNthChar: function(editor, cursor, ch, n) ***REMOVED***
        var line = editor.getSession().getLine(cursor.row);
        var matches = line.substr(cursor.column + 1).split(ch);

        return n < matches.length ? matches.slice(0, n).join(ch).length : null;
***REMOVED***
    getLeftNthChar: function(editor, cursor, ch, n) ***REMOVED***
        var line = editor.getSession().getLine(cursor.row);
        var matches = line.substr(0, cursor.column).split(ch);

        return n < matches.length ? matches.slice(-1 * n).join(ch).length : null;
***REMOVED***
    toRealChar: function(ch) ***REMOVED***
        if (ch.length === 1)
            return ch;

        if (/^shift-./.test(ch))
            return ch[ch.length - 1].toUpperCase();
        else
            return "";
***REMOVED***
    copyLine: function(editor) ***REMOVED***
        var pos = editor.getCursorPosition();
        editor.selection.moveTo(pos.row, pos.column);
        editor.selection.selectLine();
        registers._default.isLine = true;
        registers._default.text = editor.getCopyText().replace(/\n$/, "");
        editor.selection.moveTo(pos.row, pos.column);
***REMOVED***
***REMOVED***;
***REMOVED***);

define('ace/keyboard/vim/registers', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***

"never use strict";

module.exports = ***REMOVED***
    _default: ***REMOVED***
        text: "",
        isLine: false
***REMOVED***
***REMOVED***;

***REMOVED***);


define('ace/keyboard/vim/maps/motions', ['require', 'exports', 'module' , 'ace/keyboard/vim/maps/util', 'ace/search', 'ace/range'], function(require, exports, module) ***REMOVED***


var util = require("./util");

var keepScrollPosition = function(editor, fn) ***REMOVED***
    var scrollTopRow = editor.renderer.getScrollTopRow();
    var initialRow = editor.getCursorPosition().row;
    var diff = initialRow - scrollTopRow;
    fn && fn.call(editor);
    editor.renderer.scrollToRow(editor.getCursorPosition().row - diff);
***REMOVED***;

function Motion(m) ***REMOVED***
    if (typeof m == "function") ***REMOVED***
        var getPos = m;
        m = this;
***REMOVED*** else ***REMOVED***
        var getPos = m.getPos;
***REMOVED***
    m.nav = function(editor, range, count, param) ***REMOVED***
        var a = getPos(editor, range, count, param, false);
        if (!a)
            return;
        editor.selection.moveTo(a.row, a.column);
***REMOVED***;
    m.sel = function(editor, range, count, param) ***REMOVED***
        var a = getPos(editor, range, count, param, true);
        if (!a)
            return;
        editor.selection.selectTo(a.row, a.column);
***REMOVED***;
    return m;
***REMOVED***

var nonWordRe = /[\s.\/\\()\"'-:,.;<>~!@#$%^&*|+=\[\]***REMOVED******REMOVED***`~?]/;
var wordSeparatorRe = /[.\/\\()\"'-:,.;<>~!@#$%^&*|+=\[\]***REMOVED******REMOVED***`~?]/;
var whiteRe = /\s/;
var StringStream = function(editor, cursor) ***REMOVED***
    var sel = editor.selection;
    this.range = sel.getRange();
    cursor = cursor || sel.selectionLead;
    this.row = cursor.row;
    this.col = cursor.column;
    var line = editor.session.getLine(this.row);
    var maxRow = editor.session.getLength();
    this.ch = line[this.col] || '\n';
    this.skippedLines = 0;

    this.next = function() ***REMOVED***
        this.ch = line[++this.col] || this.handleNewLine(1);
        return this.ch;
***REMOVED***;
    this.prev = function() ***REMOVED***
        this.ch = line[--this.col] || this.handleNewLine(-1);
        return this.ch;
***REMOVED***;
    this.peek = function(dir) ***REMOVED***
        var ch = line[this.col + dir];
        if (ch)
            return ch;
        if (dir == -1)
            return '\n';
        if (this.col == line.length - 1)
            return '\n';
        return editor.session.getLine(this.row + 1)[0] || '\n';
***REMOVED***;

    this.handleNewLine = function(dir) ***REMOVED***
        if (dir == 1)***REMOVED***
            if (this.col == line.length)
                return '\n';
            if (this.row == maxRow - 1)
                return '';
            this.col = 0;
            this.row ++;
            line = editor.session.getLine(this.row);
            this.skippedLines++;
            return line[0] || '\n';
    ***REMOVED***
        if (dir == -1) ***REMOVED***
            if (this.row === 0)
                return '';
            this.row --;
            line = editor.session.getLine(this.row);
            this.col = line.length;
            this.skippedLines--;
            return '\n';
    ***REMOVED***
***REMOVED***;
    this.debug = function() ***REMOVED***
        console.log(line.substring(0, this.col)+'|'+this.ch+'\''+this.col+'\''+line.substr(this.col+1));
***REMOVED***;
***REMOVED***;

var Search = require("../../../search").Search;
var search = new Search();

function find(editor, needle, dir) ***REMOVED***
    search.$options.needle = needle;
    search.$options.backwards = dir == -1;
    return search.find(editor.session);
***REMOVED***

var Range = require("../../../range").Range;

var LAST_SEARCH_MOTION = ***REMOVED******REMOVED***;

module.exports = ***REMOVED***
    "w": new Motion(function(editor) ***REMOVED***
        var str = new StringStream(editor);

        if (str.ch && wordSeparatorRe.test(str.ch)) ***REMOVED***
            while (str.ch && wordSeparatorRe.test(str.ch))
                str.next();
    ***REMOVED*** else ***REMOVED***
            while (str.ch && !nonWordRe.test(str.ch))
                str.next();
    ***REMOVED***
        while (str.ch && whiteRe.test(str.ch) && str.skippedLines < 2)
            str.next();

        str.skippedLines == 2 && str.prev();
        return ***REMOVED***column: str.col, row: str.row***REMOVED***;
***REMOVED***),
    "W": new Motion(function(editor) ***REMOVED***
        var str = new StringStream(editor);
        while(str.ch && !(whiteRe.test(str.ch) && !whiteRe.test(str.peek(1))) && str.skippedLines < 2)
            str.next();
        if (str.skippedLines == 2)
            str.prev();
        else
            str.next();

        return ***REMOVED***column: str.col, row: str.row***REMOVED***;
***REMOVED***),
    "b": new Motion(function(editor) ***REMOVED***
        var str = new StringStream(editor);

        str.prev();
        while (str.ch && whiteRe.test(str.ch) && str.skippedLines > -2)
            str.prev();

        if (str.ch && wordSeparatorRe.test(str.ch)) ***REMOVED***
            while (str.ch && wordSeparatorRe.test(str.ch))
                str.prev();
    ***REMOVED*** else ***REMOVED***
            while (str.ch && !nonWordRe.test(str.ch))
                str.prev();
    ***REMOVED***
        str.ch && str.next();
        return ***REMOVED***column: str.col, row: str.row***REMOVED***;
***REMOVED***),
    "B": new Motion(function(editor) ***REMOVED***
        var str = new StringStream(editor);
        str.prev();
        while(str.ch && !(!whiteRe.test(str.ch) && whiteRe.test(str.peek(-1))) && str.skippedLines > -2)
            str.prev();

        if (str.skippedLines == -2)
            str.next();

        return ***REMOVED***column: str.col, row: str.row***REMOVED***;
***REMOVED***),
    "e": new Motion(function(editor) ***REMOVED***
        var str = new StringStream(editor);

        str.next();
        while (str.ch && whiteRe.test(str.ch))
            str.next();

        if (str.ch && wordSeparatorRe.test(str.ch)) ***REMOVED***
            while (str.ch && wordSeparatorRe.test(str.ch))
                str.next();
    ***REMOVED*** else ***REMOVED***
            while (str.ch && !nonWordRe.test(str.ch))
                str.next();
    ***REMOVED***
        str.ch && str.prev();
        return ***REMOVED***column: str.col, row: str.row***REMOVED***;
***REMOVED***),
    "E": new Motion(function(editor) ***REMOVED***
        var str = new StringStream(editor);
        str.next();
        while(str.ch && !(!whiteRe.test(str.ch) && whiteRe.test(str.peek(1))))
            str.next();

        return ***REMOVED***column: str.col, row: str.row***REMOVED***;
***REMOVED***),

    "l": ***REMOVED***
        nav: function(editor) ***REMOVED***
            var pos = editor.getCursorPosition();
            var col = pos.column;
            var lineLen = editor.session.getLine(pos.row).length;
            if (lineLen && col !== lineLen)
                editor.navigateRight();
    ***REMOVED***
        sel: function(editor) ***REMOVED***
            var pos = editor.getCursorPosition();
            var col = pos.column;
            var lineLen = editor.session.getLine(pos.row).length;
            if (lineLen && col !== lineLen) //In selection mode you can select the newline
                editor.selection.selectRight();
    ***REMOVED***
***REMOVED***
    "h": ***REMOVED***
        nav: function(editor) ***REMOVED***
            var pos = editor.getCursorPosition();
            if (pos.column > 0)
                editor.navigateLeft();
    ***REMOVED***
        sel: function(editor) ***REMOVED***
            var pos = editor.getCursorPosition();
            if (pos.column > 0)
                editor.selection.selectLeft();
    ***REMOVED***
***REMOVED***
    "H": ***REMOVED***
        nav: function(editor) ***REMOVED***
            var row = editor.renderer.getScrollTopRow();
            editor.moveCursorTo(row);
    ***REMOVED***
        sel: function(editor) ***REMOVED***
            var row = editor.renderer.getScrollTopRow();
            editor.selection.selectTo(row);
    ***REMOVED***
***REMOVED***
    "M": ***REMOVED***
        nav: function(editor) ***REMOVED***
            var topRow = editor.renderer.getScrollTopRow();
            var bottomRow = editor.renderer.getScrollBottomRow();
            var row = topRow + ((bottomRow - topRow) / 2);
            editor.moveCursorTo(row);
    ***REMOVED***
        sel: function(editor) ***REMOVED***
            var topRow = editor.renderer.getScrollTopRow();
            var bottomRow = editor.renderer.getScrollBottomRow();
            var row = topRow + ((bottomRow - topRow) / 2);
            editor.selection.selectTo(row);
    ***REMOVED***
***REMOVED***
    "L": ***REMOVED***
        nav: function(editor) ***REMOVED***
            var row = editor.renderer.getScrollBottomRow();
            editor.moveCursorTo(row);
    ***REMOVED***
        sel: function(editor) ***REMOVED***
            var row = editor.renderer.getScrollBottomRow();
            editor.selection.selectTo(row);
    ***REMOVED***
***REMOVED***
    "k": ***REMOVED***
        nav: function(editor) ***REMOVED***
            editor.navigateUp();
    ***REMOVED***
        sel: function(editor) ***REMOVED***
            editor.selection.selectUp();
    ***REMOVED***
***REMOVED***
    "j": ***REMOVED***
        nav: function(editor) ***REMOVED***
            editor.navigateDown();
    ***REMOVED***
        sel: function(editor) ***REMOVED***
            editor.selection.selectDown();
    ***REMOVED***
***REMOVED***

    "i": ***REMOVED***
        param: true,
        sel: function(editor, range, count, param) ***REMOVED***
            switch (param) ***REMOVED***
                case "w":
                    editor.selection.selectWord();
                    break;
                case "W":
                    editor.selection.selectAWord();
                    break;
                case "(":
                case "***REMOVED***":
                case "[":
                    var cursor = editor.getCursorPosition();
                    var end = editor.session.$findClosingBracket(param, cursor, /paren/);
                    if (!end)
                        return;
                    var start = editor.session.$findOpeningBracket(editor.session.$brackets[param], cursor, /paren/);
                    if (!start)
                        return;
                    start.column ++;
                    editor.selection.setSelectionRange(Range.fromPoints(start, end));
                    break;
                case "'":
                case '"':
                case "/":
                    var end = find(editor, param, 1);
                    if (!end)
                        return;
                    var start = find(editor, param, -1);
                    if (!start)
                        return;
                    editor.selection.setSelectionRange(Range.fromPoints(start.end, end.start));
                    break;
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    "a": ***REMOVED***
        param: true,
        sel: function(editor, range, count, param) ***REMOVED***
            switch (param) ***REMOVED***
                case "w":
                    editor.selection.selectAWord();
                    break;
                case "W":
                    editor.selection.selectAWord();
                    break;
                case "(":
                case "***REMOVED***":
                case "[":
                    var cursor = editor.getCursorPosition();
                    var end = editor.session.$findClosingBracket(param, cursor, /paren/);
                    if (!end)
                        return;
                    var start = editor.session.$findOpeningBracket(editor.session.$brackets[param], cursor, /paren/);
                    if (!start)
                        return;
                    end.column ++;
                    editor.selection.setSelectionRange(Range.fromPoints(start, end));
                    break;
                case "'":
                case "\"":
                case "/":
                    var end = find(editor, param, 1);
                    if (!end)
                        return;
                    var start = find(editor, param, -1);
                    if (!start)
                        return;
                    end.column ++;
                    editor.selection.setSelectionRange(Range.fromPoints(start.start, end.end));
                    break;
        ***REMOVED***
    ***REMOVED***
***REMOVED***

    "f": new Motion(***REMOVED***
        param: true,
        handlesCount: true,
        getPos: function(editor, range, count, param, isSel, isRepeat) ***REMOVED***
            if (!isRepeat)
                LAST_SEARCH_MOTION = ***REMOVED***ch: "f", param: param***REMOVED***;
            var cursor = editor.getCursorPosition();
            var column = util.getRightNthChar(editor, cursor, param, count || 1);

            if (typeof column === "number") ***REMOVED***
                cursor.column += column + (isSel ? 2 : 1);
                return cursor;
        ***REMOVED***
    ***REMOVED***
***REMOVED***),
    "F": new Motion(***REMOVED***
        param: true,
        handlesCount: true,
        getPos: function(editor, range, count, param, isSel, isRepeat) ***REMOVED***
            if (!isRepeat)
                LAST_SEARCH_MOTION = ***REMOVED***ch: "F", param: param***REMOVED***;
            var cursor = editor.getCursorPosition();
            var column = util.getLeftNthChar(editor, cursor, param, count || 1);

            if (typeof column === "number") ***REMOVED***
                cursor.column -= column + 1;
                return cursor;
        ***REMOVED***
    ***REMOVED***
***REMOVED***),
    "t": new Motion(***REMOVED***
        param: true,
        handlesCount: true,
        getPos: function(editor, range, count, param, isSel, isRepeat) ***REMOVED***
            if (!isRepeat)
                LAST_SEARCH_MOTION = ***REMOVED***ch: "t", param: param***REMOVED***;
            var cursor = editor.getCursorPosition();
            var column = util.getRightNthChar(editor, cursor, param, count || 1);

            if (isRepeat && column == 0 && !(count > 1))
                var column = util.getRightNthChar(editor, cursor, param, 2);
                
            if (typeof column === "number") ***REMOVED***
                cursor.column += column + (isSel ? 1 : 0);
                return cursor;
        ***REMOVED***
    ***REMOVED***
***REMOVED***),
    "T": new Motion(***REMOVED***
        param: true,
        handlesCount: true,
        getPos: function(editor, range, count, param, isSel, isRepeat) ***REMOVED***
            if (!isRepeat)
                LAST_SEARCH_MOTION = ***REMOVED***ch: "T", param: param***REMOVED***;
            var cursor = editor.getCursorPosition();
            var column = util.getLeftNthChar(editor, cursor, param, count || 1);

            if (isRepeat && column == 0 && !(count > 1))
                var column = util.getLeftNthChar(editor, cursor, param, 2);
            
            if (typeof column === "number") ***REMOVED***
                cursor.column -= column;
                return cursor;
        ***REMOVED***
    ***REMOVED***
***REMOVED***),
    ";": new Motion(***REMOVED***
        handlesCount: true,
        getPos: function(editor, range, count, param, isSel) ***REMOVED***
            var ch = LAST_SEARCH_MOTION.ch;
            if (!ch)
                return;
            return module.exports[ch].getPos(
                editor, range, count, LAST_SEARCH_MOTION.param, isSel, true
            );
    ***REMOVED***
***REMOVED***),
    ",": new Motion(***REMOVED***
        handlesCount: true,
        getPos: function(editor, range, count, param, isSel) ***REMOVED***
            var ch = LAST_SEARCH_MOTION.ch;
            if (!ch)
                return;
            var up = ch.toUpperCase();
            ch = ch === up ? ch.toLowerCase() : up;
            
            return module.exports[ch].getPos(
                editor, range, count, LAST_SEARCH_MOTION.param, isSel, true
            );
    ***REMOVED***
***REMOVED***),

    "^": ***REMOVED***
        nav: function(editor) ***REMOVED***
            editor.navigateLineStart();
    ***REMOVED***
        sel: function(editor) ***REMOVED***
            editor.selection.selectLineStart();
    ***REMOVED***
***REMOVED***
    "$": ***REMOVED***
        handlesCount: true,
        nav: function(editor, range, count, param) ***REMOVED***
            if (count > 1) ***REMOVED***
                editor.navigateDown(count-1);
        ***REMOVED***
            editor.navigateLineEnd();
    ***REMOVED***
        sel: function(editor, range, count, param) ***REMOVED***
            if (count > 1) ***REMOVED***
                editor.selection.moveCursorBy(count-1, 0);
        ***REMOVED***
            editor.selection.selectLineEnd();
    ***REMOVED***
***REMOVED***
    "0": new Motion(function(ed) ***REMOVED***
        return ***REMOVED***row: ed.selection.lead.row, column: 0***REMOVED***;
***REMOVED***),
    "G": ***REMOVED***
        nav: function(editor, range, count, param) ***REMOVED***
            if (!count && count !== 0) ***REMOVED*** // Stupid JS
                count = editor.session.getLength();
        ***REMOVED***
            editor.gotoLine(count);
    ***REMOVED***
        sel: function(editor, range, count, param) ***REMOVED***
            if (!count && count !== 0) ***REMOVED*** // Stupid JS
                count = editor.session.getLength();
        ***REMOVED***
            editor.selection.selectTo(count, 0);
    ***REMOVED***
***REMOVED***
    "g": ***REMOVED***
        param: true,
        nav: function(editor, range, count, param) ***REMOVED***
            switch(param) ***REMOVED***
                case "m":
                    console.log("Middle line");
                    break;
                case "e":
                    console.log("End of prev word");
                    break;
                case "g":
                    editor.gotoLine(count || 0);
                case "u":
                    editor.gotoLine(count || 0);
                case "U":
                    editor.gotoLine(count || 0);
        ***REMOVED***
    ***REMOVED***
        sel: function(editor, range, count, param) ***REMOVED***
            switch(param) ***REMOVED***
                case "m":
                    console.log("Middle line");
                    break;
                case "e":
                    console.log("End of prev word");
                    break;
                case "g":
                    editor.selection.selectTo(count || 0, 0);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    "o": ***REMOVED***
        nav: function(editor, range, count, param) ***REMOVED***
            count = count || 1;
            var content = "";
            while (0 < count--)
                content += "\n";

            if (content.length) ***REMOVED***
                editor.navigateLineEnd()
                editor.insert(content);
                util.insertMode(editor);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    "O": ***REMOVED***
        nav: function(editor, range, count, param) ***REMOVED***
            var row = editor.getCursorPosition().row;
            count = count || 1;
            var content = "";
            while (0 < count--)
                content += "\n";

            if (content.length) ***REMOVED***
                if(row > 0) ***REMOVED***
                    editor.navigateUp();
                    editor.navigateLineEnd()
                    editor.insert(content);
            ***REMOVED*** else ***REMOVED***
                    editor.session.insert(***REMOVED***row: 0, column: 0***REMOVED***, content);
                    editor.navigateUp();
            ***REMOVED***
                util.insertMode(editor);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    "%": new Motion(function(editor)***REMOVED***
        var brRe = /[\[\]***REMOVED******REMOVED***()]/g;
        var cursor = editor.getCursorPosition();
        var ch = editor.session.getLine(cursor.row)[cursor.column];
        if (!brRe.test(ch)) ***REMOVED***
            var range = find(editor, brRe);
            if (!range)
                return;
            cursor = range.start;
    ***REMOVED***
        var match = editor.session.findMatchingBracket(***REMOVED***
            row: cursor.row,
            column: cursor.column + 1
    ***REMOVED***);

        return match;
***REMOVED***),
    "***REMOVED***": new Motion(function(ed) ***REMOVED***
        var session = ed.session;
        var row = session.selection.lead.row;
        while(row > 0 && !/\S/.test(session.getLine(row)))
            row--;
        while(/\S/.test(session.getLine(row)))
            row--;
        return ***REMOVED***column: 0, row: row***REMOVED***;
***REMOVED***),
    "***REMOVED***": new Motion(function(ed) ***REMOVED***
        var session = ed.session;
        var l = session.getLength();
        var row = session.selection.lead.row;
        while(row < l && !/\S/.test(session.getLine(row)))
            row++;
        while(/\S/.test(session.getLine(row)))
            row++;
        return ***REMOVED***column: 0, row: row***REMOVED***;
***REMOVED***),
    "ctrl-d": ***REMOVED***
        nav: function(editor, range, count, param) ***REMOVED***
            editor.selection.clearSelection();
            keepScrollPosition(editor, editor.gotoPageDown);
    ***REMOVED***
        sel: function(editor, range, count, param) ***REMOVED***
            keepScrollPosition(editor, editor.selectPageDown);
    ***REMOVED***
***REMOVED***
    "ctrl-u": ***REMOVED***
        nav: function(editor, range, count, param) ***REMOVED***
            editor.selection.clearSelection();
            keepScrollPosition(editor, editor.gotoPageUp);
    ***REMOVED***
        sel: function(editor, range, count, param) ***REMOVED***
            keepScrollPosition(editor, editor.selectPageUp);
    ***REMOVED***
***REMOVED***
    "`": new Motion(***REMOVED***
        param: true,
        handlesCount: true,
        getPos: function(editor, range, count, param, isSel) ***REMOVED***
            var s = editor.session;
            var marker = s.vimMarkers && s.vimMarkers[param];
            if (marker) ***REMOVED***
                return marker.getPosition();
        ***REMOVED***
    ***REMOVED***
***REMOVED***),
    "'": new Motion(***REMOVED***
        param: true,
        handlesCount: true,
        getPos: function(editor, range, count, param, isSel) ***REMOVED***
            var s = editor.session;
            var marker = s.vimMarkers && s.vimMarkers[param];
            if (marker) ***REMOVED***
                var pos = marker.getPosition();
                var line = editor.session.getLine(pos.row);                
                pos.column = line.search(/\S/);
                if (pos.column == -1)
                    pos.column = line.length;
                return pos;
        ***REMOVED***
    ***REMOVED***
***REMOVED***)
***REMOVED***;

module.exports.backspace = module.exports.left = module.exports.h;
module.exports.space = module.exports['return'] = module.exports.right = module.exports.l;
module.exports.up = module.exports.k;
module.exports.down = module.exports.j;
module.exports.pagedown = module.exports["ctrl-d"];
module.exports.pageup = module.exports["ctrl-u"];
module.exports.home = module.exports["0"];
module.exports.end = module.exports["$"];

***REMOVED***);
 
define('ace/keyboard/vim/maps/operators', ['require', 'exports', 'module' , 'ace/keyboard/vim/maps/util', 'ace/keyboard/vim/registers'], function(require, exports, module) ***REMOVED***



var util = require("./util");
var registers = require("../registers");

module.exports = ***REMOVED***
    "d": ***REMOVED***
        selFn: function(editor, range, count, param) ***REMOVED***
            registers._default.text = editor.getCopyText();
            registers._default.isLine = util.onVisualLineMode;
            if(util.onVisualLineMode)
                editor.removeLines();
            else
                editor.session.remove(range);
            util.normalMode(editor);
    ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            count = count || 1;
            switch (param) ***REMOVED***
                case "d":
                    registers._default.text = "";
                    registers._default.isLine = true;
                    for (var i = 0; i < count; i++) ***REMOVED***
                        editor.selection.selectLine();
                        registers._default.text += editor.getCopyText();
                        var selRange = editor.getSelectionRange();
                        if (!selRange.isMultiLine()) ***REMOVED***
                            var row = selRange.start.row - 1;
                            var col = editor.session.getLine(row).length
                            selRange.setStart(row, col);
                            editor.session.remove(selRange);
                            editor.selection.clearSelection();
                            break;
                    ***REMOVED***
                        editor.session.remove(selRange);
                        editor.selection.clearSelection();
                ***REMOVED***
                    registers._default.text = registers._default.text.replace(/\n$/, "");
                    break;
                default:
                    if (range) ***REMOVED***
                        editor.selection.setSelectionRange(range);
                        registers._default.text = editor.getCopyText();
                        registers._default.isLine = false;
                        editor.session.remove(range);
                        editor.selection.clearSelection();
                ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    "c": ***REMOVED***
        selFn: function(editor, range, count, param) ***REMOVED***
            editor.session.remove(range);
            util.insertMode(editor);
    ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            count = count || 1;
            switch (param) ***REMOVED***
                case "c":
                    for (var i = 0; i < count; i++) ***REMOVED***
                        editor.removeLines();
                        util.insertMode(editor);
                ***REMOVED***

                    break;
                default:
                    if (range) ***REMOVED***
                        editor.session.remove(range);
                        util.insertMode(editor);
                ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    "y": ***REMOVED***
        selFn: function(editor, range, count, param) ***REMOVED***
            registers._default.text = editor.getCopyText();
            registers._default.isLine = util.onVisualLineMode;
            editor.selection.clearSelection();
            util.normalMode(editor);
    ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            count = count || 1;
            switch (param) ***REMOVED***
                case "y":
                    var pos = editor.getCursorPosition();
                    editor.selection.selectLine();
                    for (var i = 0; i < count - 1; i++) ***REMOVED***
                        editor.selection.moveCursorDown();
                ***REMOVED***
                    registers._default.text = editor.getCopyText().replace(/\n$/, "");
                    editor.selection.clearSelection();
                    registers._default.isLine = true;
                    editor.moveCursorToPosition(pos);
                    break;
                default:
                    if (range) ***REMOVED***
                        var pos = editor.getCursorPosition();
                        editor.selection.setSelectionRange(range);
                        registers._default.text = editor.getCopyText();
                        registers._default.isLine = false;
                        editor.selection.clearSelection();
                        editor.moveCursorTo(pos.row, pos.column);
                ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    ">": ***REMOVED***
        selFn: function(editor, range, count, param) ***REMOVED***
            count = count || 1;
            for (var i = 0; i < count; i++) ***REMOVED***
                editor.indent();
        ***REMOVED***
            util.normalMode(editor);
    ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            count = parseInt(count || 1, 10);
            switch (param) ***REMOVED***
                case ">":
                    var pos = editor.getCursorPosition();
                    editor.selection.selectLine();
                    for (var i = 0; i < count - 1; i++) ***REMOVED***
                        editor.selection.moveCursorDown();
                ***REMOVED***
                    editor.indent();
                    editor.selection.clearSelection();
                    editor.moveCursorToPosition(pos);
                    editor.navigateLineEnd();
                    editor.navigateLineStart();
                    break;
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    "<": ***REMOVED***
        selFn: function(editor, range, count, param) ***REMOVED***
            count = count || 1;
            for (var i = 0; i < count; i++) ***REMOVED***
                editor.blockOutdent();
        ***REMOVED***
            util.normalMode(editor);
    ***REMOVED***
        fn: function(editor, range, count, param) ***REMOVED***
            count = count || 1;
            switch (param) ***REMOVED***
                case "<":
                    var pos = editor.getCursorPosition();
                    editor.selection.selectLine();
                    for (var i = 0; i < count - 1; i++) ***REMOVED***
                        editor.selection.moveCursorDown();
                ***REMOVED***
                    editor.blockOutdent();
                    editor.selection.clearSelection();
                    editor.moveCursorToPosition(pos);
                    editor.navigateLineEnd();
                    editor.navigateLineStart();
                    break;
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***;
***REMOVED***);
 
"use strict"

define('ace/keyboard/vim/maps/aliases', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
module.exports = ***REMOVED***
    "x": ***REMOVED***
        operator: ***REMOVED***
            ch: "d",
            count: 1
    ***REMOVED***
        motion: ***REMOVED***
            ch: "l",
            count: 1
    ***REMOVED***
***REMOVED***
    "X": ***REMOVED***
        operator: ***REMOVED***
            ch: "d",
            count: 1
    ***REMOVED***
        motion: ***REMOVED***
            ch: "h",
            count: 1
    ***REMOVED***
***REMOVED***
    "D": ***REMOVED***
        operator: ***REMOVED***
            ch: "d",
            count: 1
    ***REMOVED***
        motion: ***REMOVED***
            ch: "$",
            count: 1
    ***REMOVED***
***REMOVED***
    "C": ***REMOVED***
        operator: ***REMOVED***
            ch: "c",
            count: 1
    ***REMOVED***
        motion: ***REMOVED***
            ch: "$",
            count: 1
    ***REMOVED***
***REMOVED***
    "s": ***REMOVED***
        operator: ***REMOVED***
            ch: "c",
            count: 1
    ***REMOVED***
        motion: ***REMOVED***
            ch: "l",
            count: 1
    ***REMOVED***
***REMOVED***
    "S": ***REMOVED***
        operator: ***REMOVED***
            ch: "c",
            count: 1
    ***REMOVED***
        param: "c"
***REMOVED***
***REMOVED***;
***REMOVED***);

