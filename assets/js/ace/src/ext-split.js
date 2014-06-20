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

define('ace/ext/split', ['require', 'exports', 'module' , 'ace/split'], function(require, exports, module) ***REMOVED***
module.exports = require("../split");

***REMOVED***);

define('ace/split', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/lib/event_emitter', 'ace/editor', 'ace/virtual_renderer', 'ace/edit_session'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var lang = require("./lib/lang");
var EventEmitter = require("./lib/event_emitter").EventEmitter;

var Editor = require("./editor").Editor;
var Renderer = require("./virtual_renderer").VirtualRenderer;
var EditSession = require("./edit_session").EditSession;


var Split = function(container, theme, splits) ***REMOVED***
    this.BELOW = 1;
    this.BESIDE = 0;

    this.$container = container;
    this.$theme = theme;
    this.$splits = 0;
    this.$editorCSS = "";
    this.$editors = [];
    this.$orientation = this.BESIDE;

    this.setSplits(splits || 1);
    this.$cEditor = this.$editors[0];


    this.on("focus", function(editor) ***REMOVED***
        this.$cEditor = editor;
***REMOVED***.bind(this));
***REMOVED***;

(function()***REMOVED***

    oop.implement(this, EventEmitter);

    this.$createEditor = function() ***REMOVED***
        var el = document.createElement("div");
        el.className = this.$editorCSS;
        el.style.cssText = "position: absolute; top:0px; bottom:0px";
        this.$container.appendChild(el);
        var editor = new Editor(new Renderer(el, this.$theme));

        editor.on("focus", function() ***REMOVED***
            this._emit("focus", editor);
    ***REMOVED***.bind(this));

        this.$editors.push(editor);
        editor.setFontSize(this.$fontSize);
        return editor;
***REMOVED***;

    this.setSplits = function(splits) ***REMOVED***
        var editor;
        if (splits < 1) ***REMOVED***
            throw "The number of splits have to be > 0!";
    ***REMOVED***

        if (splits == this.$splits) ***REMOVED***
            return;
    ***REMOVED*** else if (splits > this.$splits) ***REMOVED***
            while (this.$splits < this.$editors.length && this.$splits < splits) ***REMOVED***
                editor = this.$editors[this.$splits];
                this.$container.appendChild(editor.container);
                editor.setFontSize(this.$fontSize);
                this.$splits ++;
        ***REMOVED***
            while (this.$splits < splits) ***REMOVED***
                this.$createEditor();
                this.$splits ++;
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            while (this.$splits > splits) ***REMOVED***
                editor = this.$editors[this.$splits - 1];
                this.$container.removeChild(editor.container);
                this.$splits --;
        ***REMOVED***
    ***REMOVED***
        this.resize();
***REMOVED***;
    this.getSplits = function() ***REMOVED***
        return this.$splits;
***REMOVED***;
    this.getEditor = function(idx) ***REMOVED***
        return this.$editors[idx];
***REMOVED***;
    this.getCurrentEditor = function() ***REMOVED***
        return this.$cEditor;
***REMOVED***;
    this.focus = function() ***REMOVED***
        this.$cEditor.focus();
***REMOVED***;
    this.blur = function() ***REMOVED***
        this.$cEditor.blur();
***REMOVED***;
    this.setTheme = function(theme) ***REMOVED***
        this.$editors.forEach(function(editor) ***REMOVED***
            editor.setTheme(theme);
    ***REMOVED***);
***REMOVED***;
    this.setKeyboardHandler = function(keybinding) ***REMOVED***
        this.$editors.forEach(function(editor) ***REMOVED***
            editor.setKeyboardHandler(keybinding);
    ***REMOVED***);
***REMOVED***;
    this.forEach = function(callback, scope) ***REMOVED***
        this.$editors.forEach(callback, scope);
***REMOVED***;


    this.$fontSize = "";
    this.setFontSize = function(size) ***REMOVED***
        this.$fontSize = size;
        this.forEach(function(editor) ***REMOVED***
           editor.setFontSize(size);
    ***REMOVED***);
***REMOVED***;

    this.$cloneSession = function(session) ***REMOVED***
        var s = new EditSession(session.getDocument(), session.getMode());

        var undoManager = session.getUndoManager();
        if (undoManager) ***REMOVED***
            var undoManagerProxy = new UndoManagerProxy(undoManager, s);
            s.setUndoManager(undoManagerProxy);
    ***REMOVED***
        s.$informUndoManager = lang.delayedCall(function() ***REMOVED*** s.$deltas = []; ***REMOVED***);
        s.setTabSize(session.getTabSize());
        s.setUseSoftTabs(session.getUseSoftTabs());
        s.setOverwrite(session.getOverwrite());
        s.setBreakpoints(session.getBreakpoints());
        s.setUseWrapMode(session.getUseWrapMode());
        s.setUseWorker(session.getUseWorker());
        s.setWrapLimitRange(session.$wrapLimitRange.min,
                            session.$wrapLimitRange.max);
        s.$foldData = session.$cloneFoldData();

        return s;
***REMOVED***;
    this.setSession = function(session, idx) ***REMOVED***
        var editor;
        if (idx == null) ***REMOVED***
            editor = this.$cEditor;
    ***REMOVED*** else ***REMOVED***
            editor = this.$editors[idx];
    ***REMOVED***
        var isUsed = this.$editors.some(function(editor) ***REMOVED***
           return editor.session === session;
    ***REMOVED***);

        if (isUsed) ***REMOVED***
            session = this.$cloneSession(session);
    ***REMOVED***
        editor.setSession(session);
        return session;
***REMOVED***;
    this.getOrientation = function() ***REMOVED***
        return this.$orientation;
***REMOVED***;
    this.setOrientation = function(orientation) ***REMOVED***
        if (this.$orientation == orientation) ***REMOVED***
            return;
    ***REMOVED***
        this.$orientation = orientation;
        this.resize();
***REMOVED***;
    this.resize = function() ***REMOVED***
        var width = this.$container.clientWidth;
        var height = this.$container.clientHeight;
        var editor;

        if (this.$orientation == this.BESIDE) ***REMOVED***
            var editorWidth = width / this.$splits;
            for (var i = 0; i < this.$splits; i++) ***REMOVED***
                editor = this.$editors[i];
                editor.container.style.width = editorWidth + "px";
                editor.container.style.top = "0px";
                editor.container.style.left = i * editorWidth + "px";
                editor.container.style.height = height + "px";
                editor.resize();
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            var editorHeight = height / this.$splits;
            for (var i = 0; i < this.$splits; i++) ***REMOVED***
                editor = this.$editors[i];
                editor.container.style.width = width + "px";
                editor.container.style.top = i * editorHeight + "px";
                editor.container.style.left = "0px";
                editor.container.style.height = editorHeight + "px";
                editor.resize();
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

***REMOVED***).call(Split.prototype);

 
function UndoManagerProxy(undoManager, session) ***REMOVED***
    this.$u = undoManager;
    this.$doc = session;
***REMOVED***

(function() ***REMOVED***
    this.execute = function(options) ***REMOVED***
        this.$u.execute(options);
***REMOVED***;

    this.undo = function() ***REMOVED***
        var selectionRange = this.$u.undo(true);
        if (selectionRange) ***REMOVED***
            this.$doc.selection.setSelectionRange(selectionRange);
    ***REMOVED***
***REMOVED***;

    this.redo = function() ***REMOVED***
        var selectionRange = this.$u.redo(true);
        if (selectionRange) ***REMOVED***
            this.$doc.selection.setSelectionRange(selectionRange);
    ***REMOVED***
***REMOVED***;

    this.reset = function() ***REMOVED***
        this.$u.reset();
***REMOVED***;

    this.hasUndo = function() ***REMOVED***
        return this.$u.hasUndo();
***REMOVED***;

    this.hasRedo = function() ***REMOVED***
        return this.$u.hasRedo();
***REMOVED***;
***REMOVED***).call(UndoManagerProxy.prototype);

exports.Split = Split;
***REMOVED***);
