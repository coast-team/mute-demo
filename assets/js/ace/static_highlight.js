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

(function() ***REMOVED***

var ACE_NAMESPACE = "";

var global = (function() ***REMOVED***
    return this;
***REMOVED***)();


if (!ACE_NAMESPACE && typeof requirejs !== "undefined")
    return;


var _define = function(module, deps, payload) ***REMOVED***
    if (typeof module !== 'string') ***REMOVED***
        if (_define.original)
            _define.original.apply(window, arguments);
        else ***REMOVED***
            console.error('dropping module because define wasn\'t a string.');
            console.trace();
    ***REMOVED***
        return;
***REMOVED***

    if (arguments.length == 2)
        payload = deps;

    if (!_define.modules) ***REMOVED***
        _define.modules = ***REMOVED******REMOVED***;
        _define.payloads = ***REMOVED******REMOVED***;
***REMOVED***
    
    _define.payloads[module] = payload;
    _define.modules[module] = null;
***REMOVED***;
var _require = function(parentId, module, callback) ***REMOVED***
    if (Object.prototype.toString.call(module) === "[object Array]") ***REMOVED***
        var params = [];
        for (var i = 0, l = module.length; i < l; ++i) ***REMOVED***
            var dep = lookup(parentId, module[i]);
            if (!dep && _require.original)
                return _require.original.apply(window, arguments);
            params.push(dep);
    ***REMOVED***
        if (callback) ***REMOVED***
            callback.apply(null, params);
    ***REMOVED***
***REMOVED***
    else if (typeof module === 'string') ***REMOVED***
        var payload = lookup(parentId, module);
        if (!payload && _require.original)
            return _require.original.apply(window, arguments);

        if (callback) ***REMOVED***
            callback();
    ***REMOVED***

        return payload;
***REMOVED***
    else ***REMOVED***
        if (_require.original)
            return _require.original.apply(window, arguments);
***REMOVED***
***REMOVED***;

var normalizeModule = function(parentId, moduleName) ***REMOVED***
    if (moduleName.indexOf("!") !== -1) ***REMOVED***
        var chunks = moduleName.split("!");
        return normalizeModule(parentId, chunks[0]) + "!" + normalizeModule(parentId, chunks[1]);
***REMOVED***
    if (moduleName.charAt(0) == ".") ***REMOVED***
        var base = parentId.split("/").slice(0, -1).join("/");
        moduleName = base + "/" + moduleName;

        while(moduleName.indexOf(".") !== -1 && previous != moduleName) ***REMOVED***
            var previous = moduleName;
            moduleName = moduleName.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "");
    ***REMOVED***
***REMOVED***

    return moduleName;
***REMOVED***;
var lookup = function(parentId, moduleName) ***REMOVED***

    moduleName = normalizeModule(parentId, moduleName);

    var module = _define.modules[moduleName];
    if (!module) ***REMOVED***
        module = _define.payloads[moduleName];
        if (typeof module === 'function') ***REMOVED***
            var exports = ***REMOVED******REMOVED***;
            var mod = ***REMOVED***
                id: moduleName,
                uri: '',
                exports: exports,
                packaged: true
        ***REMOVED***;

            var req = function(module, callback) ***REMOVED***
                return _require(moduleName, module, callback);
        ***REMOVED***;

            var returnValue = module(req, exports, mod);
            exports = returnValue || mod.exports;
            _define.modules[moduleName] = exports;
            delete _define.payloads[moduleName];
    ***REMOVED***
        module = _define.modules[moduleName] = exports || module;
***REMOVED***
    return module;
***REMOVED***;

function exportAce(ns) ***REMOVED***
    var require = function(module, callback) ***REMOVED***
        return _require("", module, callback);
***REMOVED***;    

    var root = global;
    if (ns) ***REMOVED***
        if (!global[ns])
            global[ns] = ***REMOVED******REMOVED***;
        root = global[ns];
***REMOVED***

    if (!root.define || !root.define.packaged) ***REMOVED***
        _define.original = root.define;
        root.define = _define;
        root.define.packaged = true;
***REMOVED***

    if (!root.require || !root.require.packaged) ***REMOVED***
        _require.original = root.require;
        root.require = require;
        root.require.packaged = true;
***REMOVED***
***REMOVED***

exportAce(ACE_NAMESPACE);

***REMOVED***)();

define('ace/ext/static_highlight', ['require', 'exports', 'module' , 'ace/edit_session', 'ace/layer/text', 'ace/config', 'ace/lib/dom'], function(require, exports, module) ***REMOVED***


var EditSession = require("../edit_session").EditSession;
var TextLayer = require("../layer/text").Text;
var baseStyles = ".ace_static_highlight ***REMOVED***\
font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', 'Droid Sans Mono', monospace;\
font-size: 12px;\
***REMOVED***\
.ace_static_highlight .ace_gutter ***REMOVED***\
width: 25px !important;\
display: block;\
float: left;\
text-align: right;\
padding: 0 3px 0 0;\
margin-right: 3px;\
position: static !important;\
***REMOVED***\
.ace_static_highlight .ace_line ***REMOVED*** clear: both; ***REMOVED***\
.ace_static_highlight .ace_gutter-cell ***REMOVED***\
-moz-user-select: -moz-none;\
-khtml-user-select: none;\
-webkit-user-select: none;\
user-select: none;\
***REMOVED***";
var config = require("../config");
var dom = require("../lib/dom");

exports.render = function(input, mode, theme, lineStart, disableGutter, callback) ***REMOVED***
    var waiting = 0;
    var modeCache = EditSession.prototype.$modes;
    if (typeof theme == "string") ***REMOVED***
        waiting++;
        config.loadModule(['theme', theme], function(m) ***REMOVED***
            theme = m;
            --waiting || done();
    ***REMOVED***);
***REMOVED***

    if (typeof mode == "string") ***REMOVED***
        waiting++;
        config.loadModule(['mode', mode], function(m) ***REMOVED***
            if (!modeCache[mode]) modeCache[mode] = new m.Mode();
            mode = modeCache[mode];
            --waiting || done();
    ***REMOVED***);
***REMOVED***
    function done() ***REMOVED***
        var result = exports.renderSync(input, mode, theme, lineStart, disableGutter);
        return callback ? callback(result) : result;
***REMOVED***
    return waiting || done();
***REMOVED***;

exports.renderSync = function(input, mode, theme, lineStart, disableGutter) ***REMOVED***
    lineStart = parseInt(lineStart || 1, 10);

    var session = new EditSession("");
    session.setUseWorker(false);
    session.setMode(mode);

    var textLayer = new TextLayer(document.createElement("div"));
    textLayer.setSession(session);
    textLayer.config = ***REMOVED***
        characterWidth: 10,
        lineHeight: 20
***REMOVED***;

    session.setValue(input);

    var stringBuilder = [];
    var length =  session.getLength();

    for(var ix = 0; ix < length; ix++) ***REMOVED***
        stringBuilder.push("<div class='ace_line'>");
        if (!disableGutter)
            stringBuilder.push("<span class='ace_gutter ace_gutter-cell' unselectable='on'>" + (ix + lineStart) + "</span>");
        textLayer.$renderLine(stringBuilder, ix, true, false);
        stringBuilder.push("</div>");
***REMOVED***
    var html = "<div class='" + theme.cssClass + "'>" +
        "<div class='ace_static_highlight'>" +
            stringBuilder.join("") +
        "</div>" +
    "</div>";

    textLayer.destroy();

    return ***REMOVED***
        css: baseStyles + theme.cssText,
        html: html
***REMOVED***;
***REMOVED***;



exports.highlight = function(el, opts) ***REMOVED***
    var m = el.className.match(/lang-(\w+)/);
    var mode = opts.mode || m && ("ace/mode/" + m[1]);
    if (!mode)
        return false;
    var theme = opts.theme || "ace/theme/textmate";
    
    var data = "";
    var nodes = [];

    if (el.firstElementChild) ***REMOVED***
        var textLen = 0;
        for (var i = 0; i < el.childNodes.length; i++) ***REMOVED***
            var ch = el.childNodes[i];
            if (ch.nodeType == 3) ***REMOVED***
                textLen += ch.data.length;
                data += ch.data;
        ***REMOVED*** else ***REMOVED***
                nodes.push(textLen, ch);
        ***REMOVED***
    ***REMOVED***
***REMOVED*** else ***REMOVED***
        data = dom.getInnerText(el);
***REMOVED***
    
    exports.render(data, mode, theme, 1, true, function (highlighted) ***REMOVED***
        dom.importCssString(highlighted.css, "ace_highlight");
        el.innerHTML = highlighted.html;
        var container = el.firstChild.firstChild
        for (var i = 0; i < nodes.length; i += 2) ***REMOVED***
            var pos = highlighted.session.doc.indexToPosition(nodes[i])
            var node = nodes[i + 1];
            var lineEl = container.children[pos.row];
            lineEl && lineEl.appendChild(nodes[i+1]);
    ***REMOVED***
***REMOVED***);
***REMOVED***;
***REMOVED***);

define('ace/edit_session', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/config', 'ace/lib/event_emitter', 'ace/selection', 'ace/mode/text', 'ace/range', 'ace/document', 'ace/background_tokenizer', 'ace/search_highlight', 'ace/edit_session/folding', 'ace/edit_session/bracket_match'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var lang = require("./lib/lang");
var config = require("./config");
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var Selection = require("./selection").Selection;
var TextMode = require("./mode/text").Mode;
var Range = require("./range").Range;
var Document = require("./document").Document;
var BackgroundTokenizer = require("./background_tokenizer").BackgroundTokenizer;
var SearchHighlight = require("./search_highlight").SearchHighlight;

var EditSession = function(text, mode) ***REMOVED***
    this.$breakpoints = [];
    this.$decorations = [];
    this.$frontMarkers = ***REMOVED******REMOVED***;
    this.$backMarkers = ***REMOVED******REMOVED***;
    this.$markerId = 1;
    this.$undoSelect = true;

    this.$foldData = [];
    this.$foldData.toString = function() ***REMOVED***
        return this.join("\n");
***REMOVED***
    this.on("changeFold", this.onChangeFold.bind(this));
    this.$onChange = this.onChange.bind(this);

    if (typeof text != "object" || !text.getLine)
        text = new Document(text);

    this.setDocument(text);
    this.selection = new Selection(this);

    config.resetOptions(this);
    this.setMode(mode);
    config._emit("session", this);
***REMOVED***;


(function() ***REMOVED***

    oop.implement(this, EventEmitter);
    this.setDocument = function(doc) ***REMOVED***
        if (this.doc)
            this.doc.removeListener("change", this.$onChange);

        this.doc = doc;
        doc.on("change", this.$onChange);

        if (this.bgTokenizer)
            this.bgTokenizer.setDocument(this.getDocument());

        this.resetCaches();
***REMOVED***;
    this.getDocument = function() ***REMOVED***
        return this.doc;
***REMOVED***;
    this.$resetRowCache = function(docRow) ***REMOVED***
        if (!docRow) ***REMOVED***
            this.$docRowCache = [];
            this.$screenRowCache = [];
            return;
    ***REMOVED***
        var l = this.$docRowCache.length;
        var i = this.$getRowCacheIndex(this.$docRowCache, docRow) + 1;
        if (l > i) ***REMOVED***
            this.$docRowCache.splice(i, l);
            this.$screenRowCache.splice(i, l);
    ***REMOVED***
***REMOVED***;

    this.$getRowCacheIndex = function(cacheArray, val) ***REMOVED***
        var low = 0;
        var hi = cacheArray.length - 1;

        while (low <= hi) ***REMOVED***
            var mid = (low + hi) >> 1;
            var c = cacheArray[mid];

            if (val > c)
                low = mid + 1;
            else if (val < c)
                hi = mid - 1;
            else
                return mid;
    ***REMOVED***

        return low -1;
***REMOVED***;

    this.resetCaches = function() ***REMOVED***
        this.$modified = true;
        this.$wrapData = [];
        this.$rowLengthCache = [];
        this.$resetRowCache(0);
        if (this.bgTokenizer)
            this.bgTokenizer.start(0);
***REMOVED***;

    this.onChangeFold = function(e) ***REMOVED***
        var fold = e.data;
        this.$resetRowCache(fold.start.row);
***REMOVED***;

    this.onChange = function(e) ***REMOVED***
        var delta = e.data;
        this.$modified = true;

        this.$resetRowCache(delta.range.start.row);

        var removedFolds = this.$updateInternalDataOnChange(e);
        if (!this.$fromUndo && this.$undoManager && !delta.ignore) ***REMOVED***
            this.$deltasDoc.push(delta);
            if (removedFolds && removedFolds.length != 0) ***REMOVED***
                this.$deltasFold.push(***REMOVED***
                    action: "removeFolds",
                    folds:  removedFolds
            ***REMOVED***);
        ***REMOVED***

            this.$informUndoManager.schedule();
    ***REMOVED***

        this.bgTokenizer.$updateOnChange(delta);
        this._emit("change", e);
***REMOVED***;
    this.setValue = function(text) ***REMOVED***
        this.doc.setValue(text);
        this.selection.moveCursorTo(0, 0);
        this.selection.clearSelection();

        this.$resetRowCache(0);
        this.$deltas = [];
        this.$deltasDoc = [];
        this.$deltasFold = [];
        this.getUndoManager().reset();
***REMOVED***;
    this.getValue =
    this.toString = function() ***REMOVED***
        return this.doc.getValue();
***REMOVED***;
    this.getSelection = function() ***REMOVED***
        return this.selection;
***REMOVED***;
    this.getState = function(row) ***REMOVED***
        return this.bgTokenizer.getState(row);
***REMOVED***;
    this.getTokens = function(row) ***REMOVED***
        return this.bgTokenizer.getTokens(row);
***REMOVED***;
    this.getTokenAt = function(row, column) ***REMOVED***
        var tokens = this.bgTokenizer.getTokens(row);
        var token, c = 0;
        if (column == null) ***REMOVED***
            i = tokens.length - 1;
            c = this.getLine(row).length;
    ***REMOVED*** else ***REMOVED***
            for (var i = 0; i < tokens.length; i++) ***REMOVED***
                c += tokens[i].value.length;
                if (c >= column)
                    break;
        ***REMOVED***
    ***REMOVED***
        token = tokens[i];
        if (!token)
            return null;
        token.index = i;
        token.start = c - token.value.length;
        return token;
***REMOVED***;
    this.setUndoManager = function(undoManager) ***REMOVED***
        this.$undoManager = undoManager;
        this.$deltas = [];
        this.$deltasDoc = [];
        this.$deltasFold = [];

        if (this.$informUndoManager)
            this.$informUndoManager.cancel();

        if (undoManager) ***REMOVED***
            var self = this;

            this.$syncInformUndoManager = function() ***REMOVED***
                self.$informUndoManager.cancel();

                if (self.$deltasFold.length) ***REMOVED***
                    self.$deltas.push(***REMOVED***
                        group: "fold",
                        deltas: self.$deltasFold
                ***REMOVED***);
                    self.$deltasFold = [];
            ***REMOVED***

                if (self.$deltasDoc.length) ***REMOVED***
                    self.$deltas.push(***REMOVED***
                        group: "doc",
                        deltas: self.$deltasDoc
                ***REMOVED***);
                    self.$deltasDoc = [];
            ***REMOVED***

                if (self.$deltas.length > 0) ***REMOVED***
                    undoManager.execute(***REMOVED***
                        action: "aceupdate",
                        args: [self.$deltas, self],
                        merge: self.mergeUndoDeltas
                ***REMOVED***);
            ***REMOVED***
                self.mergeUndoDeltas = false;
                self.$deltas = [];
        ***REMOVED***
            this.$informUndoManager = lang.delayedCall(this.$syncInformUndoManager);
    ***REMOVED***
***REMOVED***;
    this.markUndoGroup = function() ***REMOVED***
        if (this.$syncInformUndoManager)
            this.$syncInformUndoManager();
***REMOVED***;
    
    this.$defaultUndoManager = ***REMOVED***
        undo: function() ***REMOVED******REMOVED***,
        redo: function() ***REMOVED******REMOVED***,
        reset: function() ***REMOVED******REMOVED***
***REMOVED***;
    this.getUndoManager = function() ***REMOVED***
        return this.$undoManager || this.$defaultUndoManager;
***REMOVED***;
    this.getTabString = function() ***REMOVED***
        if (this.getUseSoftTabs()) ***REMOVED***
            return lang.stringRepeat(" ", this.getTabSize());
    ***REMOVED*** else ***REMOVED***
            return "\t";
    ***REMOVED***
***REMOVED***;
    this.setUseSoftTabs = function(val) ***REMOVED***
        this.setOption("useSoftTabs", val);
***REMOVED***;
    this.getUseSoftTabs = function() ***REMOVED***
        return this.$useSoftTabs && !this.$mode.$indentWithTabs;
***REMOVED***;
    this.setTabSize = function(tabSize) ***REMOVED***
        this.setOption("tabSize", tabSize)
***REMOVED***;
    this.getTabSize = function() ***REMOVED***
        return this.$tabSize;
***REMOVED***;
    this.isTabStop = function(position) ***REMOVED***
        return this.$useSoftTabs && (position.column % this.$tabSize == 0);
***REMOVED***;

    this.$overwrite = false;
    this.setOverwrite = function(overwrite) ***REMOVED***
        this.setOption("overwrite", overwrite)
***REMOVED***;
    this.getOverwrite = function() ***REMOVED***
        return this.$overwrite;
***REMOVED***;
    this.toggleOverwrite = function() ***REMOVED***
        this.setOverwrite(!this.$overwrite);
***REMOVED***;
    this.addGutterDecoration = function(row, className) ***REMOVED***
        if (!this.$decorations[row])
            this.$decorations[row] = "";
        this.$decorations[row] += " " + className;
        this._emit("changeBreakpoint", ***REMOVED******REMOVED***);
***REMOVED***;
    this.removeGutterDecoration = function(row, className) ***REMOVED***
        this.$decorations[row] = (this.$decorations[row] || "").replace(" " + className, "");
        this._emit("changeBreakpoint", ***REMOVED******REMOVED***);
***REMOVED***;
    this.getBreakpoints = function() ***REMOVED***
        return this.$breakpoints;
***REMOVED***;
    this.setBreakpoints = function(rows) ***REMOVED***
        this.$breakpoints = [];
        for (var i=0; i<rows.length; i++) ***REMOVED***
            this.$breakpoints[rows[i]] = "ace_breakpoint";
    ***REMOVED***
        this._emit("changeBreakpoint", ***REMOVED******REMOVED***);
***REMOVED***;
    this.clearBreakpoints = function() ***REMOVED***
        this.$breakpoints = [];
        this._emit("changeBreakpoint", ***REMOVED******REMOVED***);
***REMOVED***;
    this.setBreakpoint = function(row, className) ***REMOVED***
        if (className === undefined)
            className = "ace_breakpoint";
        if (className)
            this.$breakpoints[row] = className;
        else
            delete this.$breakpoints[row];
        this._emit("changeBreakpoint", ***REMOVED******REMOVED***);
***REMOVED***;
    this.clearBreakpoint = function(row) ***REMOVED***
        delete this.$breakpoints[row];
        this._emit("changeBreakpoint", ***REMOVED******REMOVED***);
***REMOVED***;
    this.addMarker = function(range, clazz, type, inFront) ***REMOVED***
        var id = this.$markerId++;

        var marker = ***REMOVED***
            range : range,
            type : type || "line",
            renderer: typeof type == "function" ? type : null,
            clazz : clazz,
            inFront: !!inFront,
            id: id
    ***REMOVED***

        if (inFront) ***REMOVED***
            this.$frontMarkers[id] = marker;
            this._emit("changeFrontMarker")
    ***REMOVED*** else ***REMOVED***
            this.$backMarkers[id] = marker;
            this._emit("changeBackMarker")
    ***REMOVED***

        return id;
***REMOVED***;
    this.addDynamicMarker = function(marker, inFront) ***REMOVED***
        if (!marker.update)
            return;
        var id = this.$markerId++;
        marker.id = id;
        marker.inFront = !!inFront;

        if (inFront) ***REMOVED***
            this.$frontMarkers[id] = marker;
            this._emit("changeFrontMarker")
    ***REMOVED*** else ***REMOVED***
            this.$backMarkers[id] = marker;
            this._emit("changeBackMarker")
    ***REMOVED***

        return marker;
***REMOVED***;
    this.removeMarker = function(markerId) ***REMOVED***
        var marker = this.$frontMarkers[markerId] || this.$backMarkers[markerId];
        if (!marker)
            return;

        var markers = marker.inFront ? this.$frontMarkers : this.$backMarkers;
        if (marker) ***REMOVED***
            delete (markers[markerId]);
            this._emit(marker.inFront ? "changeFrontMarker" : "changeBackMarker");
    ***REMOVED***
***REMOVED***;
    this.getMarkers = function(inFront) ***REMOVED***
        return inFront ? this.$frontMarkers : this.$backMarkers;
***REMOVED***;

    this.highlight = function(re) ***REMOVED***
        if (!this.$searchHighlight) ***REMOVED***
            var highlight = new SearchHighlight(null, "ace_selected-word", "text");
            this.$searchHighlight = this.addDynamicMarker(highlight);
    ***REMOVED***
        this.$searchHighlight.setRegexp(re);
***REMOVED***
    this.highlightLines = function(startRow, endRow, clazz, inFront) ***REMOVED***
        if (typeof endRow != "number") ***REMOVED***
            clazz = endRow;
            endRow = startRow;
    ***REMOVED***
        if (!clazz)
            clazz = "ace_step";

        var range = new Range(startRow, 0, endRow, Infinity);
        range.id = this.addMarker(range, clazz, "fullLine", inFront);
        return range;
***REMOVED***;
    this.setAnnotations = function(annotations) ***REMOVED***
        this.$annotations = annotations;
        this._emit("changeAnnotation", ***REMOVED******REMOVED***);
***REMOVED***;
    this.getAnnotations = function() ***REMOVED***
        return this.$annotations || [];
***REMOVED***;
    this.clearAnnotations = function() ***REMOVED***
        this.setAnnotations([]);
***REMOVED***;
    this.$detectNewLine = function(text) ***REMOVED***
        var match = text.match(/^.*?(\r?\n)/m);
        if (match) ***REMOVED***
            this.$autoNewLine = match[1];
    ***REMOVED*** else ***REMOVED***
            this.$autoNewLine = "\n";
    ***REMOVED***
***REMOVED***;
    this.getWordRange = function(row, column) ***REMOVED***
        var line = this.getLine(row);

        var inToken = false;
        if (column > 0)
            inToken = !!line.charAt(column - 1).match(this.tokenRe);

        if (!inToken)
            inToken = !!line.charAt(column).match(this.tokenRe);

        if (inToken)
            var re = this.tokenRe;
        else if (/^\s+$/.test(line.slice(column-1, column+1)))
            var re = /\s/;
        else
            var re = this.nonTokenRe;

        var start = column;
        if (start > 0) ***REMOVED***
            do ***REMOVED***
                start--;
        ***REMOVED***
            while (start >= 0 && line.charAt(start).match(re));
            start++;
    ***REMOVED***

        var end = column;
        while (end < line.length && line.charAt(end).match(re)) ***REMOVED***
            end++;
    ***REMOVED***

        return new Range(row, start, row, end);
***REMOVED***;
    this.getAWordRange = function(row, column) ***REMOVED***
        var wordRange = this.getWordRange(row, column);
        var line = this.getLine(wordRange.end.row);

        while (line.charAt(wordRange.end.column).match(/[ \t]/)) ***REMOVED***
            wordRange.end.column += 1;
    ***REMOVED***
        return wordRange;
***REMOVED***;
    this.setNewLineMode = function(newLineMode) ***REMOVED***
        this.doc.setNewLineMode(newLineMode);
***REMOVED***;
    this.getNewLineMode = function() ***REMOVED***
        return this.doc.getNewLineMode();
***REMOVED***;
    this.setUseWorker = function(useWorker) ***REMOVED*** this.setOption("useWorker", useWorker); ***REMOVED***;
    this.getUseWorker = function() ***REMOVED*** return this.$useWorker; ***REMOVED***;
    this.onReloadTokenizer = function(e) ***REMOVED***
        var rows = e.data;
        this.bgTokenizer.start(rows.first);
        this._emit("tokenizerUpdate", e);
***REMOVED***;

    this.$modes = ***REMOVED******REMOVED***;
    this.$mode = null;
    this.$modeId = null;
    this.setMode = function(mode, cb) ***REMOVED***
        if (mode && typeof mode === "object") ***REMOVED***
            if (mode.getTokenizer)
                return this.$onChangeMode(mode);
            var options = mode;
            var path = options.path;
    ***REMOVED*** else ***REMOVED***
            path = mode || "ace/mode/text";
    ***REMOVED***
        if (!this.$modes["ace/mode/text"])
            this.$modes["ace/mode/text"] = new TextMode();

        if (this.$modes[path] && !options) ***REMOVED***
            this.$onChangeMode(this.$modes[path]);
            cb && cb();
            return;
    ***REMOVED***
        this.$modeId = path;
        config.loadModule(["mode", path], function(m) ***REMOVED***
            if (this.$modeId !== path)
                return cb && cb();
            if (this.$modes[path] && !options)
                return this.$onChangeMode(this.$modes[path]);
            if (m && m.Mode) ***REMOVED***
                m = new m.Mode(options);
                if (!options) ***REMOVED***
                    this.$modes[path] = m;
                    m.$id = path;
            ***REMOVED***
                this.$onChangeMode(m);
                cb && cb();
        ***REMOVED***
    ***REMOVED***.bind(this));
        if (!this.$mode)
            this.$onChangeMode(this.$modes["ace/mode/text"], true);
***REMOVED***;

    this.$onChangeMode = function(mode, $isPlaceholder) ***REMOVED***
        if (!$isPlaceholder)
            this.$modeId = mode.$id;
        if (this.$mode === mode) 
            return;

        this.$mode = mode;

        this.$stopWorker();

        if (this.$useWorker)
            this.$startWorker();

        var tokenizer = mode.getTokenizer();

        if(tokenizer.addEventListener !== undefined) ***REMOVED***
            var onReloadTokenizer = this.onReloadTokenizer.bind(this);
            tokenizer.addEventListener("update", onReloadTokenizer);
    ***REMOVED***

        if (!this.bgTokenizer) ***REMOVED***
            this.bgTokenizer = new BackgroundTokenizer(tokenizer);
            var _self = this;
            this.bgTokenizer.addEventListener("update", function(e) ***REMOVED***
                _self._emit("tokenizerUpdate", e);
        ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
            this.bgTokenizer.setTokenizer(tokenizer);
    ***REMOVED***

        this.bgTokenizer.setDocument(this.getDocument());

        this.tokenRe = mode.tokenRe;
        this.nonTokenRe = mode.nonTokenRe;

        this.$options.wrapMethod.set.call(this, this.$wrapMethod);
        
        if (!$isPlaceholder) ***REMOVED***
            this.$setFolding(mode.foldingRules);
            this._emit("changeMode");
            this.bgTokenizer.start(0);
    ***REMOVED***
***REMOVED***;


    this.$stopWorker = function() ***REMOVED***
        if (this.$worker)
            this.$worker.terminate();

        this.$worker = null;
***REMOVED***;

    this.$startWorker = function() ***REMOVED***
        if (typeof Worker !== "undefined" && !require.noWorker) ***REMOVED***
            try ***REMOVED***
                this.$worker = this.$mode.createWorker(this);
        ***REMOVED*** catch (e) ***REMOVED***
                console.log("Could not load worker");
                console.log(e);
                this.$worker = null;
        ***REMOVED***
    ***REMOVED***
        else
            this.$worker = null;
***REMOVED***;
    this.getMode = function() ***REMOVED***
        return this.$mode;
***REMOVED***;

    this.$scrollTop = 0;
    this.setScrollTop = function(scrollTop) ***REMOVED***
        if (this.$scrollTop === scrollTop || isNaN(scrollTop))
            return;

        this.$scrollTop = scrollTop;
        this._signal("changeScrollTop", scrollTop);
***REMOVED***;
    this.getScrollTop = function() ***REMOVED***
        return this.$scrollTop;
***REMOVED***;

    this.$scrollLeft = 0;
    this.setScrollLeft = function(scrollLeft) ***REMOVED***
        if (this.$scrollLeft === scrollLeft || isNaN(scrollLeft))
            return;

        this.$scrollLeft = scrollLeft;
        this._signal("changeScrollLeft", scrollLeft);
***REMOVED***;
    this.getScrollLeft = function() ***REMOVED***
        return this.$scrollLeft;
***REMOVED***;
    this.getScreenWidth = function() ***REMOVED***
        this.$computeWidth();
        return this.screenWidth;
***REMOVED***;

    this.$computeWidth = function(force) ***REMOVED***
        if (this.$modified || force) ***REMOVED***
            this.$modified = false;

            if (this.$useWrapMode)
                return this.screenWidth = this.$wrapLimit;

            var lines = this.doc.getAllLines();
            var cache = this.$rowLengthCache;
            var longestScreenLine = 0;
            var foldIndex = 0;
            var foldLine = this.$foldData[foldIndex];
            var foldStart = foldLine ? foldLine.start.row : Infinity;
            var len = lines.length;

            for (var i = 0; i < len; i++) ***REMOVED***
                if (i > foldStart) ***REMOVED***
                    i = foldLine.end.row + 1;
                    if (i >= len)
                        break;
                    foldLine = this.$foldData[foldIndex++];
                    foldStart = foldLine ? foldLine.start.row : Infinity;
            ***REMOVED***

                if (cache[i] == null)
                    cache[i] = this.$getStringScreenWidth(lines[i])[0];

                if (cache[i] > longestScreenLine)
                    longestScreenLine = cache[i];
        ***REMOVED***
            this.screenWidth = longestScreenLine;
    ***REMOVED***
***REMOVED***;
    this.getLine = function(row) ***REMOVED***
        return this.doc.getLine(row);
***REMOVED***;
    this.getLines = function(firstRow, lastRow) ***REMOVED***
        return this.doc.getLines(firstRow, lastRow);
***REMOVED***;
    this.getLength = function() ***REMOVED***
        return this.doc.getLength();
***REMOVED***;
    this.getTextRange = function(range) ***REMOVED***
        return this.doc.getTextRange(range || this.selection.getRange());
***REMOVED***;
    this.insert = function(position, text) ***REMOVED***
        return this.doc.insert(position, text);
***REMOVED***;
    this.remove = function(range) ***REMOVED***
        return this.doc.remove(range);
***REMOVED***;
    this.undoChanges = function(deltas, dontSelect) ***REMOVED***
        if (!deltas.length)
            return;

        this.$fromUndo = true;
        var lastUndoRange = null;
        for (var i = deltas.length - 1; i != -1; i--) ***REMOVED***
            var delta = deltas[i];
            if (delta.group == "doc") ***REMOVED***
                this.doc.revertDeltas(delta.deltas);
                lastUndoRange =
                    this.$getUndoSelection(delta.deltas, true, lastUndoRange);
        ***REMOVED*** else ***REMOVED***
                delta.deltas.forEach(function(foldDelta) ***REMOVED***
                    this.addFolds(foldDelta.folds);
            ***REMOVED*** this);
        ***REMOVED***
    ***REMOVED***
        this.$fromUndo = false;
        lastUndoRange &&
            this.$undoSelect &&
            !dontSelect &&
            this.selection.setSelectionRange(lastUndoRange);
        return lastUndoRange;
***REMOVED***;
    this.redoChanges = function(deltas, dontSelect) ***REMOVED***
        if (!deltas.length)
            return;

        this.$fromUndo = true;
        var lastUndoRange = null;
        for (var i = 0; i < deltas.length; i++) ***REMOVED***
            var delta = deltas[i];
            if (delta.group == "doc") ***REMOVED***
                this.doc.applyDeltas(delta.deltas);
                lastUndoRange =
                    this.$getUndoSelection(delta.deltas, false, lastUndoRange);
        ***REMOVED***
    ***REMOVED***
        this.$fromUndo = false;
        lastUndoRange &&
            this.$undoSelect &&
            !dontSelect &&
            this.selection.setSelectionRange(lastUndoRange);
        return lastUndoRange;
***REMOVED***;
    this.setUndoSelect = function(enable) ***REMOVED***
        this.$undoSelect = enable;
***REMOVED***;

    this.$getUndoSelection = function(deltas, isUndo, lastUndoRange) ***REMOVED***
        function isInsert(delta) ***REMOVED***
            var insert =
                delta.action === "insertText" || delta.action === "insertLines";
            return isUndo ? !insert : insert;
    ***REMOVED***

        var delta = deltas[0];
        var range, point;
        var lastDeltaIsInsert = false;
        if (isInsert(delta)) ***REMOVED***
            range = Range.fromPoints(delta.range.start, delta.range.end);
            lastDeltaIsInsert = true;
    ***REMOVED*** else ***REMOVED***
            range = Range.fromPoints(delta.range.start, delta.range.start);
            lastDeltaIsInsert = false;
    ***REMOVED***

        for (var i = 1; i < deltas.length; i++) ***REMOVED***
            delta = deltas[i];
            if (isInsert(delta)) ***REMOVED***
                point = delta.range.start;
                if (range.compare(point.row, point.column) == -1) ***REMOVED***
                    range.setStart(delta.range.start);
            ***REMOVED***
                point = delta.range.end;
                if (range.compare(point.row, point.column) == 1) ***REMOVED***
                    range.setEnd(delta.range.end);
            ***REMOVED***
                lastDeltaIsInsert = true;
        ***REMOVED*** else ***REMOVED***
                point = delta.range.start;
                if (range.compare(point.row, point.column) == -1) ***REMOVED***
                    range =
                        Range.fromPoints(delta.range.start, delta.range.start);
            ***REMOVED***
                lastDeltaIsInsert = false;
        ***REMOVED***
    ***REMOVED***
        if (lastUndoRange != null) ***REMOVED***
            if (Range.comparePoints(lastUndoRange.start, range.start) == 0) ***REMOVED***
                lastUndoRange.start.column += range.end.column - range.start.column;
                lastUndoRange.end.column += range.end.column - range.start.column;
        ***REMOVED***

            var cmp = lastUndoRange.compareRange(range);
            if (cmp == 1) ***REMOVED***
                range.setStart(lastUndoRange.start);
        ***REMOVED*** else if (cmp == -1) ***REMOVED***
                range.setEnd(lastUndoRange.end);
        ***REMOVED***
    ***REMOVED***

        return range;
***REMOVED***;
    this.replace = function(range, text) ***REMOVED***
        return this.doc.replace(range, text);
***REMOVED***;
    this.moveText = function(fromRange, toPosition, copy) ***REMOVED***
        var text = this.getTextRange(fromRange);
        var folds = this.getFoldsInRange(fromRange);

        var toRange = Range.fromPoints(toPosition, toPosition);
        if (!copy) ***REMOVED***
            this.remove(fromRange);
            var rowDiff = fromRange.start.row - fromRange.end.row;
            var collDiff = rowDiff ? -fromRange.end.column : fromRange.start.column - fromRange.end.column;
            if (collDiff) ***REMOVED***
                if (toRange.start.row == fromRange.end.row && toRange.start.column > fromRange.end.column)
                    toRange.start.column += collDiff;
                if (toRange.end.row == fromRange.end.row && toRange.end.column > fromRange.end.column)
                    toRange.end.column += collDiff;
        ***REMOVED***
            if (rowDiff && toRange.start.row >= fromRange.end.row) ***REMOVED***
                toRange.start.row += rowDiff;
                toRange.end.row += rowDiff;
        ***REMOVED***
    ***REMOVED***

        toRange.end = this.insert(toRange.start, text);
        if (folds.length) ***REMOVED***
            var oldStart = fromRange.start;
            var newStart = toRange.start;
            var rowDiff = newStart.row - oldStart.row;
            var collDiff = newStart.column - oldStart.column;
            this.addFolds(folds.map(function(x) ***REMOVED***
                x = x.clone();
                if (x.start.row == oldStart.row)
                    x.start.column += collDiff;
                if (x.end.row == oldStart.row)
                    x.end.column += collDiff;
                x.start.row += rowDiff;
                x.end.row += rowDiff;
                return x;
        ***REMOVED***));
    ***REMOVED***

        return toRange;
***REMOVED***;
    this.indentRows = function(startRow, endRow, indentString) ***REMOVED***
        indentString = indentString.replace(/\t/g, this.getTabString());
        for (var row=startRow; row<=endRow; row++)
            this.insert(***REMOVED***row: row, column:0***REMOVED***, indentString);
***REMOVED***;
    this.outdentRows = function (range) ***REMOVED***
        var rowRange = range.collapseRows();
        var deleteRange = new Range(0, 0, 0, 0);
        var size = this.getTabSize();

        for (var i = rowRange.start.row; i <= rowRange.end.row; ++i) ***REMOVED***
            var line = this.getLine(i);

            deleteRange.start.row = i;
            deleteRange.end.row = i;
            for (var j = 0; j < size; ++j)
                if (line.charAt(j) != ' ')
                    break;
            if (j < size && line.charAt(j) == '\t') ***REMOVED***
                deleteRange.start.column = j;
                deleteRange.end.column = j + 1;
        ***REMOVED*** else ***REMOVED***
                deleteRange.start.column = 0;
                deleteRange.end.column = j;
        ***REMOVED***
            this.remove(deleteRange);
    ***REMOVED***
***REMOVED***;

    this.$moveLines = function(firstRow, lastRow, dir) ***REMOVED***
        firstRow = this.getRowFoldStart(firstRow);
        lastRow = this.getRowFoldEnd(lastRow);
        if (dir < 0) ***REMOVED***
            var row = this.getRowFoldStart(firstRow + dir);
            if (row < 0) return 0;
            var diff = row-firstRow;
    ***REMOVED*** else if (dir > 0) ***REMOVED***
            var row = this.getRowFoldEnd(lastRow + dir);
            if (row > this.doc.getLength()-1) return 0;
            var diff = row-lastRow;
    ***REMOVED*** else ***REMOVED***
            firstRow = this.$clipRowToDocument(firstRow);
            lastRow = this.$clipRowToDocument(lastRow);
            var diff = lastRow - firstRow + 1;
    ***REMOVED***

        var range = new Range(firstRow, 0, lastRow, Number.MAX_VALUE);
        var folds = this.getFoldsInRange(range).map(function(x)***REMOVED***
            x = x.clone();
            x.start.row += diff;
            x.end.row += diff;
            return x;
    ***REMOVED***);

        var lines = dir == 0
            ? this.doc.getLines(firstRow, lastRow)
            : this.doc.removeLines(firstRow, lastRow);
        this.doc.insertLines(firstRow+diff, lines);
        folds.length && this.addFolds(folds);
        return diff;
***REMOVED***;
    this.moveLinesUp = function(firstRow, lastRow) ***REMOVED***
        return this.$moveLines(firstRow, lastRow, -1);
***REMOVED***;
    this.moveLinesDown = function(firstRow, lastRow) ***REMOVED***
        return this.$moveLines(firstRow, lastRow, 1);
***REMOVED***;
    this.duplicateLines = function(firstRow, lastRow) ***REMOVED***
        return this.$moveLines(firstRow, lastRow, 0);
***REMOVED***;


    this.$clipRowToDocument = function(row) ***REMOVED***
        return Math.max(0, Math.min(row, this.doc.getLength()-1));
***REMOVED***;

    this.$clipColumnToRow = function(row, column) ***REMOVED***
        if (column < 0)
            return 0;
        return Math.min(this.doc.getLine(row).length, column);
***REMOVED***;


    this.$clipPositionToDocument = function(row, column) ***REMOVED***
        column = Math.max(0, column);

        if (row < 0) ***REMOVED***
            row = 0;
            column = 0;
    ***REMOVED*** else ***REMOVED***
            var len = this.doc.getLength();
            if (row >= len) ***REMOVED***
                row = len - 1;
                column = this.doc.getLine(len-1).length;
        ***REMOVED*** else ***REMOVED***
                column = Math.min(this.doc.getLine(row).length, column);
        ***REMOVED***
    ***REMOVED***

        return ***REMOVED***
            row: row,
            column: column
    ***REMOVED***;
***REMOVED***;

    this.$clipRangeToDocument = function(range) ***REMOVED***
        if (range.start.row < 0) ***REMOVED***
            range.start.row = 0;
            range.start.column = 0;
    ***REMOVED*** else ***REMOVED***
            range.start.column = this.$clipColumnToRow(
                range.start.row,
                range.start.column
            );
    ***REMOVED***

        var len = this.doc.getLength() - 1;
        if (range.end.row > len) ***REMOVED***
            range.end.row = len;
            range.end.column = this.doc.getLine(len).length;
    ***REMOVED*** else ***REMOVED***
            range.end.column = this.$clipColumnToRow(
                range.end.row,
                range.end.column
            );
    ***REMOVED***
        return range;
***REMOVED***;
    this.$wrapLimit = 80;
    this.$useWrapMode = false;
    this.$wrapLimitRange = ***REMOVED***
        min : null,
        max : null
***REMOVED***;
    this.setUseWrapMode = function(useWrapMode) ***REMOVED***
        if (useWrapMode != this.$useWrapMode) ***REMOVED***
            this.$useWrapMode = useWrapMode;
            this.$modified = true;
            this.$resetRowCache(0);
            if (useWrapMode) ***REMOVED***
                var len = this.getLength();
                this.$wrapData = [];
                for (var i = 0; i < len; i++) ***REMOVED***
                    this.$wrapData.push([]);
            ***REMOVED***
                this.$updateWrapData(0, len - 1);
        ***REMOVED***

            this._emit("changeWrapMode");
    ***REMOVED***
***REMOVED***;
    this.getUseWrapMode = function() ***REMOVED***
        return this.$useWrapMode;
***REMOVED***;
    this.setWrapLimitRange = function(min, max) ***REMOVED***
        if (this.$wrapLimitRange.min !== min || this.$wrapLimitRange.max !== max) ***REMOVED***
            this.$wrapLimitRange = ***REMOVED***
                min: min,
                max: max
        ***REMOVED***;
            this.$modified = true;
            this._emit("changeWrapMode");
    ***REMOVED***
***REMOVED***;
    this.adjustWrapLimit = function(desiredLimit, $printMargin) ***REMOVED***
        var limits = this.$wrapLimitRange
        if (limits.max < 0)
            limits = ***REMOVED***min: $printMargin, max: $printMargin***REMOVED***;
        var wrapLimit = this.$constrainWrapLimit(desiredLimit, limits.min, limits.max);
        if (wrapLimit != this.$wrapLimit && wrapLimit > 1) ***REMOVED***
            this.$wrapLimit = wrapLimit;
            this.$modified = true;
            if (this.$useWrapMode) ***REMOVED***
                this.$updateWrapData(0, this.getLength() - 1);
                this.$resetRowCache(0);
                this._emit("changeWrapLimit");
        ***REMOVED***
            return true;
    ***REMOVED***
        return false;
***REMOVED***;

    this.$constrainWrapLimit = function(wrapLimit, min, max) ***REMOVED***
        if (min)
            wrapLimit = Math.max(min, wrapLimit);

        if (max)
            wrapLimit = Math.min(max, wrapLimit);

        return wrapLimit;
***REMOVED***;
    this.getWrapLimit = function() ***REMOVED***
        return this.$wrapLimit;
***REMOVED***;
    this.setWrapLimit = function (limit) ***REMOVED***
        this.setWrapLimitRange(limit, limit);
***REMOVED***;
    this.getWrapLimitRange = function() ***REMOVED***
        return ***REMOVED***
            min : this.$wrapLimitRange.min,
            max : this.$wrapLimitRange.max
    ***REMOVED***;
***REMOVED***;

    this.$updateInternalDataOnChange = function(e) ***REMOVED***
        var useWrapMode = this.$useWrapMode;
        var len;
        var action = e.data.action;
        var firstRow = e.data.range.start.row;
        var lastRow = e.data.range.end.row;
        var start = e.data.range.start;
        var end = e.data.range.end;
        var removedFolds = null;

        if (action.indexOf("Lines") != -1) ***REMOVED***
            if (action == "insertLines") ***REMOVED***
                lastRow = firstRow + (e.data.lines.length);
        ***REMOVED*** else ***REMOVED***
                lastRow = firstRow;
        ***REMOVED***
            len = e.data.lines ? e.data.lines.length : lastRow - firstRow;
    ***REMOVED*** else ***REMOVED***
            len = lastRow - firstRow;
    ***REMOVED***

        this.$updating = true;
        if (len != 0) ***REMOVED***
            if (action.indexOf("remove") != -1) ***REMOVED***
                this[useWrapMode ? "$wrapData" : "$rowLengthCache"].splice(firstRow, len);

                var foldLines = this.$foldData;
                removedFolds = this.getFoldsInRange(e.data.range);
                this.removeFolds(removedFolds);

                var foldLine = this.getFoldLine(end.row);
                var idx = 0;
                if (foldLine) ***REMOVED***
                    foldLine.addRemoveChars(end.row, end.column, start.column - end.column);
                    foldLine.shiftRow(-len);

                    var foldLineBefore = this.getFoldLine(firstRow);
                    if (foldLineBefore && foldLineBefore !== foldLine) ***REMOVED***
                        foldLineBefore.merge(foldLine);
                        foldLine = foldLineBefore;
                ***REMOVED***
                    idx = foldLines.indexOf(foldLine) + 1;
            ***REMOVED***

                for (idx; idx < foldLines.length; idx++) ***REMOVED***
                    var foldLine = foldLines[idx];
                    if (foldLine.start.row >= end.row) ***REMOVED***
                        foldLine.shiftRow(-len);
                ***REMOVED***
            ***REMOVED***

                lastRow = firstRow;
        ***REMOVED*** else ***REMOVED***
                var args;
                if (useWrapMode) ***REMOVED***
                    args = [firstRow, 0];
                    for (var i = 0; i < len; i++) args.push([]);
                    this.$wrapData.splice.apply(this.$wrapData, args);
            ***REMOVED*** else ***REMOVED***
                    args = Array(len);
                    args.unshift(firstRow, 0);
                    this.$rowLengthCache.splice.apply(this.$rowLengthCache, args);
            ***REMOVED***
                var foldLines = this.$foldData;
                var foldLine = this.getFoldLine(firstRow);
                var idx = 0;
                if (foldLine) ***REMOVED***
                    var cmp = foldLine.range.compareInside(start.row, start.column)
                    if (cmp == 0) ***REMOVED***
                        foldLine = foldLine.split(start.row, start.column);
                        foldLine.shiftRow(len);
                        foldLine.addRemoveChars(
                            lastRow, 0, end.column - start.column);
                ***REMOVED*** else
                    if (cmp == -1) ***REMOVED***
                        foldLine.addRemoveChars(firstRow, 0, end.column - start.column);
                        foldLine.shiftRow(len);
                ***REMOVED***
                    idx = foldLines.indexOf(foldLine) + 1;
            ***REMOVED***

                for (idx; idx < foldLines.length; idx++) ***REMOVED***
                    var foldLine = foldLines[idx];
                    if (foldLine.start.row >= firstRow) ***REMOVED***
                        foldLine.shiftRow(len);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            len = Math.abs(e.data.range.start.column - e.data.range.end.column);
            if (action.indexOf("remove") != -1) ***REMOVED***
                removedFolds = this.getFoldsInRange(e.data.range);
                this.removeFolds(removedFolds);

                len = -len;
        ***REMOVED***
            var foldLine = this.getFoldLine(firstRow);
            if (foldLine) ***REMOVED***
                foldLine.addRemoveChars(firstRow, start.column, len);
        ***REMOVED***
    ***REMOVED***

        if (useWrapMode && this.$wrapData.length != this.doc.getLength()) ***REMOVED***
            console.error("doc.getLength() and $wrapData.length have to be the same!");
    ***REMOVED***
        this.$updating = false;

        if (useWrapMode)
            this.$updateWrapData(firstRow, lastRow);
        else
            this.$updateRowLengthCache(firstRow, lastRow);

        return removedFolds;
***REMOVED***;

    this.$updateRowLengthCache = function(firstRow, lastRow, b) ***REMOVED***
        this.$rowLengthCache[firstRow] = null;
        this.$rowLengthCache[lastRow] = null;
***REMOVED***;

    this.$updateWrapData = function(firstRow, lastRow) ***REMOVED***
        var lines = this.doc.getAllLines();
        var tabSize = this.getTabSize();
        var wrapData = this.$wrapData;
        var wrapLimit = this.$wrapLimit;
        var tokens;
        var foldLine;

        var row = firstRow;
        lastRow = Math.min(lastRow, lines.length - 1);
        while (row <= lastRow) ***REMOVED***
            foldLine = this.getFoldLine(row, foldLine);
            if (!foldLine) ***REMOVED***
                tokens = this.$getDisplayTokens(lines[row]);
                wrapData[row] = this.$computeWrapSplits(tokens, wrapLimit, tabSize);
                row ++;
        ***REMOVED*** else ***REMOVED***
                tokens = [];
                foldLine.walk(function(placeholder, row, column, lastColumn) ***REMOVED***
                        var walkTokens;
                        if (placeholder != null) ***REMOVED***
                            walkTokens = this.$getDisplayTokens(
                                            placeholder, tokens.length);
                            walkTokens[0] = PLACEHOLDER_START;
                            for (var i = 1; i < walkTokens.length; i++) ***REMOVED***
                                walkTokens[i] = PLACEHOLDER_BODY;
                        ***REMOVED***
                    ***REMOVED*** else ***REMOVED***
                            walkTokens = this.$getDisplayTokens(
                                lines[row].substring(lastColumn, column),
                                tokens.length);
                    ***REMOVED***
                        tokens = tokens.concat(walkTokens);
                ***REMOVED***.bind(this),
                    foldLine.end.row,
                    lines[foldLine.end.row].length + 1
                );

                wrapData[foldLine.start.row]
                    = this.$computeWrapSplits(tokens, wrapLimit, tabSize);
                row = foldLine.end.row + 1;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    var CHAR = 1,
        CHAR_EXT = 2,
        PLACEHOLDER_START = 3,
        PLACEHOLDER_BODY =  4,
        PUNCTUATION = 9,
        SPACE = 10,
        TAB = 11,
        TAB_SPACE = 12;


    this.$computeWrapSplits = function(tokens, wrapLimit) ***REMOVED***
        if (tokens.length == 0) ***REMOVED***
            return [];
    ***REMOVED***

        var splits = [];
        var displayLength = tokens.length;
        var lastSplit = 0, lastDocSplit = 0;

        var isCode = this.$wrapAsCode;

        function addSplit(screenPos) ***REMOVED***
            var displayed = tokens.slice(lastSplit, screenPos);
            var len = displayed.length;
            displayed.join("").
                replace(/12/g, function() ***REMOVED***
                    len -= 1;
            ***REMOVED***).
                replace(/2/g, function() ***REMOVED***
                    len -= 1;
            ***REMOVED***);

            lastDocSplit += len;
            splits.push(lastDocSplit);
            lastSplit = screenPos;
    ***REMOVED***

        while (displayLength - lastSplit > wrapLimit) ***REMOVED***
            var split = lastSplit + wrapLimit;
            if (tokens[split - 1] >= SPACE && tokens[split] >= SPACE) ***REMOVED***
                addSplit(split);
                continue;
        ***REMOVED***
            if (tokens[split] == PLACEHOLDER_START || tokens[split] == PLACEHOLDER_BODY) ***REMOVED***
                for (split; split != lastSplit - 1; split--) ***REMOVED***
                    if (tokens[split] == PLACEHOLDER_START) ***REMOVED***
                        break;
                ***REMOVED***
            ***REMOVED***
                if (split > lastSplit) ***REMOVED***
                    addSplit(split);
                    continue;
            ***REMOVED***
                split = lastSplit + wrapLimit;
                for (split; split < tokens.length; split++) ***REMOVED***
                    if (tokens[split] != PLACEHOLDER_BODY) ***REMOVED***
                        break;
                ***REMOVED***
            ***REMOVED***
                if (split == tokens.length) ***REMOVED***
                    break;  // Breaks the while-loop.
            ***REMOVED***
                addSplit(split);
                continue;
        ***REMOVED***
            var minSplit = Math.max(split - (isCode ? 10 : wrapLimit-(wrapLimit>>2)), lastSplit - 1);
            while (split > minSplit && tokens[split] < PLACEHOLDER_START) ***REMOVED***
                split --;
        ***REMOVED***
            if (isCode) ***REMOVED***
                while (split > minSplit && tokens[split] < PLACEHOLDER_START) ***REMOVED***
                    split --;
            ***REMOVED***
                while (split > minSplit && tokens[split] == PUNCTUATION) ***REMOVED***
                    split --;
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
                while (split > minSplit && tokens[split] < SPACE) ***REMOVED***
                    split --;
            ***REMOVED***
        ***REMOVED***
            if (split > minSplit) ***REMOVED***
                addSplit(++split);
                continue;
        ***REMOVED***
            split = lastSplit + wrapLimit;
            addSplit(split);
    ***REMOVED***
        return splits;
***REMOVED***;
    this.$getDisplayTokens = function(str, offset) ***REMOVED***
        var arr = [];
        var tabSize;
        offset = offset || 0;

        for (var i = 0; i < str.length; i++) ***REMOVED***
            var c = str.charCodeAt(i);
            if (c == 9) ***REMOVED***
                tabSize = this.getScreenTabSize(arr.length + offset);
                arr.push(TAB);
                for (var n = 1; n < tabSize; n++) ***REMOVED***
                    arr.push(TAB_SPACE);
            ***REMOVED***
        ***REMOVED***
            else if (c == 32) ***REMOVED***
                arr.push(SPACE);
        ***REMOVED*** else if((c > 39 && c < 48) || (c > 57 && c < 64)) ***REMOVED***
                arr.push(PUNCTUATION);
        ***REMOVED***
            else if (c >= 0x1100 && isFullWidth(c)) ***REMOVED***
                arr.push(CHAR, CHAR_EXT);
        ***REMOVED*** else ***REMOVED***
                arr.push(CHAR);
        ***REMOVED***
    ***REMOVED***
        return arr;
***REMOVED***;
    this.$getStringScreenWidth = function(str, maxScreenColumn, screenColumn) ***REMOVED***
        if (maxScreenColumn == 0)
            return [0, 0];
        if (maxScreenColumn == null)
            maxScreenColumn = Infinity;
        screenColumn = screenColumn || 0;

        var c, column;
        for (column = 0; column < str.length; column++) ***REMOVED***
            c = str.charCodeAt(column);
            if (c == 9) ***REMOVED***
                screenColumn += this.getScreenTabSize(screenColumn);
        ***REMOVED***
            else if (c >= 0x1100 && isFullWidth(c)) ***REMOVED***
                screenColumn += 2;
        ***REMOVED*** else ***REMOVED***
                screenColumn += 1;
        ***REMOVED***
            if (screenColumn > maxScreenColumn) ***REMOVED***
                break;
        ***REMOVED***
    ***REMOVED***

        return [screenColumn, column];
***REMOVED***;
    this.getRowLength = function(row) ***REMOVED***
        if (!this.$useWrapMode || !this.$wrapData[row]) ***REMOVED***
            return 1;
    ***REMOVED*** else ***REMOVED***
            return this.$wrapData[row].length + 1;
    ***REMOVED***
***REMOVED***;
    this.getScreenLastRowColumn = function(screenRow) ***REMOVED***
        var pos = this.screenToDocumentPosition(screenRow, Number.MAX_VALUE);
        return this.documentToScreenColumn(pos.row, pos.column);
***REMOVED***;
    this.getDocumentLastRowColumn = function(docRow, docColumn) ***REMOVED***
        var screenRow = this.documentToScreenRow(docRow, docColumn);
        return this.getScreenLastRowColumn(screenRow);
***REMOVED***;
    this.getDocumentLastRowColumnPosition = function(docRow, docColumn) ***REMOVED***
        var screenRow = this.documentToScreenRow(docRow, docColumn);
        return this.screenToDocumentPosition(screenRow, Number.MAX_VALUE / 10);
***REMOVED***;
    this.getRowSplitData = function(row) ***REMOVED***
        if (!this.$useWrapMode) ***REMOVED***
            return undefined;
    ***REMOVED*** else ***REMOVED***
            return this.$wrapData[row];
    ***REMOVED***
***REMOVED***;
    this.getScreenTabSize = function(screenColumn) ***REMOVED***
        return this.$tabSize - screenColumn % this.$tabSize;
***REMOVED***;


    this.screenToDocumentRow = function(screenRow, screenColumn) ***REMOVED***
        return this.screenToDocumentPosition(screenRow, screenColumn).row;
***REMOVED***;


    this.screenToDocumentColumn = function(screenRow, screenColumn) ***REMOVED***
        return this.screenToDocumentPosition(screenRow, screenColumn).column;
***REMOVED***;
    this.screenToDocumentPosition = function(screenRow, screenColumn) ***REMOVED***
        if (screenRow < 0)
            return ***REMOVED***row: 0, column: 0***REMOVED***;

        var line;
        var docRow = 0;
        var docColumn = 0;
        var column;
        var row = 0;
        var rowLength = 0;

        var rowCache = this.$screenRowCache;
        var i = this.$getRowCacheIndex(rowCache, screenRow);
        var l = rowCache.length;
        if (l && i >= 0) ***REMOVED***
            var row = rowCache[i];
            var docRow = this.$docRowCache[i];
            var doCache = screenRow > rowCache[l - 1];
    ***REMOVED*** else ***REMOVED***
            var doCache = !l;
    ***REMOVED***

        var maxRow = this.getLength() - 1;
        var foldLine = this.getNextFoldLine(docRow);
        var foldStart = foldLine ? foldLine.start.row : Infinity;

        while (row <= screenRow) ***REMOVED***
            rowLength = this.getRowLength(docRow);
            if (row + rowLength - 1 >= screenRow || docRow >= maxRow) ***REMOVED***
                break;
        ***REMOVED*** else ***REMOVED***
                row += rowLength;
                docRow++;
                if (docRow > foldStart) ***REMOVED***
                    docRow = foldLine.end.row+1;
                    foldLine = this.getNextFoldLine(docRow, foldLine);
                    foldStart = foldLine ? foldLine.start.row : Infinity;
            ***REMOVED***
        ***REMOVED***

            if (doCache) ***REMOVED***
                this.$docRowCache.push(docRow);
                this.$screenRowCache.push(row);
        ***REMOVED***
    ***REMOVED***

        if (foldLine && foldLine.start.row <= docRow) ***REMOVED***
            line = this.getFoldDisplayLine(foldLine);
            docRow = foldLine.start.row;
    ***REMOVED*** else if (row + rowLength <= screenRow || docRow > maxRow) ***REMOVED***
            return ***REMOVED***
                row: maxRow,
                column: this.getLine(maxRow).length
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            line = this.getLine(docRow);
            foldLine = null;
    ***REMOVED***

        if (this.$useWrapMode) ***REMOVED***
            var splits = this.$wrapData[docRow];
            if (splits) ***REMOVED***
                column = splits[screenRow - row];
                if(screenRow > row && splits.length) ***REMOVED***
                    docColumn = splits[screenRow - row - 1] || splits[splits.length - 1];
                    line = line.substring(docColumn);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

        docColumn += this.$getStringScreenWidth(line, screenColumn)[1];
        if (this.$useWrapMode && docColumn >= column)
            docColumn = column - 1;

        if (foldLine)
            return foldLine.idxToPosition(docColumn);

        return ***REMOVED***row: docRow, column: docColumn***REMOVED***;
***REMOVED***;
    this.documentToScreenPosition = function(docRow, docColumn) ***REMOVED***
        if (typeof docColumn === "undefined")
            var pos = this.$clipPositionToDocument(docRow.row, docRow.column);
        else
            pos = this.$clipPositionToDocument(docRow, docColumn);

        docRow = pos.row;
        docColumn = pos.column;

        var screenRow = 0;
        var foldStartRow = null;
        var fold = null;
        fold = this.getFoldAt(docRow, docColumn, 1);
        if (fold) ***REMOVED***
            docRow = fold.start.row;
            docColumn = fold.start.column;
    ***REMOVED***

        var rowEnd, row = 0;


        var rowCache = this.$docRowCache;
        var i = this.$getRowCacheIndex(rowCache, docRow);
        var l = rowCache.length;
        if (l && i >= 0) ***REMOVED***
            var row = rowCache[i];
            var screenRow = this.$screenRowCache[i];
            var doCache = docRow > rowCache[l - 1];
    ***REMOVED*** else ***REMOVED***
            var doCache = !l;
    ***REMOVED***

        var foldLine = this.getNextFoldLine(row);
        var foldStart = foldLine ?foldLine.start.row :Infinity;

        while (row < docRow) ***REMOVED***
            if (row >= foldStart) ***REMOVED***
                rowEnd = foldLine.end.row + 1;
                if (rowEnd > docRow)
                    break;
                foldLine = this.getNextFoldLine(rowEnd, foldLine);
                foldStart = foldLine ?foldLine.start.row :Infinity;
        ***REMOVED***
            else ***REMOVED***
                rowEnd = row + 1;
        ***REMOVED***

            screenRow += this.getRowLength(row);
            row = rowEnd;

            if (doCache) ***REMOVED***
                this.$docRowCache.push(row);
                this.$screenRowCache.push(screenRow);
        ***REMOVED***
    ***REMOVED***
        var textLine = "";
        if (foldLine && row >= foldStart) ***REMOVED***
            textLine = this.getFoldDisplayLine(foldLine, docRow, docColumn);
            foldStartRow = foldLine.start.row;
    ***REMOVED*** else ***REMOVED***
            textLine = this.getLine(docRow).substring(0, docColumn);
            foldStartRow = docRow;
    ***REMOVED***
        if (this.$useWrapMode) ***REMOVED***
            var wrapRow = this.$wrapData[foldStartRow];
            var screenRowOffset = 0;
            while (textLine.length >= wrapRow[screenRowOffset]) ***REMOVED***
                screenRow ++;
                screenRowOffset++;
        ***REMOVED***
            textLine = textLine.substring(
                wrapRow[screenRowOffset - 1] || 0, textLine.length
            );
    ***REMOVED***

        return ***REMOVED***
            row: screenRow,
            column: this.$getStringScreenWidth(textLine)[0]
    ***REMOVED***;
***REMOVED***;
    this.documentToScreenColumn = function(row, docColumn) ***REMOVED***
        return this.documentToScreenPosition(row, docColumn).column;
***REMOVED***;
    this.documentToScreenRow = function(docRow, docColumn) ***REMOVED***
        return this.documentToScreenPosition(docRow, docColumn).row;
***REMOVED***;
    this.getScreenLength = function() ***REMOVED***
        var screenRows = 0;
        var fold = null;
        if (!this.$useWrapMode) ***REMOVED***
            screenRows = this.getLength();
            var foldData = this.$foldData;
            for (var i = 0; i < foldData.length; i++) ***REMOVED***
                fold = foldData[i];
                screenRows -= fold.end.row - fold.start.row;
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            var lastRow = this.$wrapData.length;
            var row = 0, i = 0;
            var fold = this.$foldData[i++];
            var foldStart = fold ? fold.start.row :Infinity;

            while (row < lastRow) ***REMOVED***
                screenRows += this.$wrapData[row].length + 1;
                row ++;
                if (row > foldStart) ***REMOVED***
                    row = fold.end.row+1;
                    fold = this.$foldData[i++];
                    foldStart = fold ?fold.start.row :Infinity;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

        return screenRows;
***REMOVED***;
    function isFullWidth(c) ***REMOVED***
        if (c < 0x1100)
            return false;
        return c >= 0x1100 && c <= 0x115F ||
               c >= 0x11A3 && c <= 0x11A7 ||
               c >= 0x11FA && c <= 0x11FF ||
               c >= 0x2329 && c <= 0x232A ||
               c >= 0x2E80 && c <= 0x2E99 ||
               c >= 0x2E9B && c <= 0x2EF3 ||
               c >= 0x2F00 && c <= 0x2FD5 ||
               c >= 0x2FF0 && c <= 0x2FFB ||
               c >= 0x3000 && c <= 0x303E ||
               c >= 0x3041 && c <= 0x3096 ||
               c >= 0x3099 && c <= 0x30FF ||
               c >= 0x3105 && c <= 0x312D ||
               c >= 0x3131 && c <= 0x318E ||
               c >= 0x3190 && c <= 0x31BA ||
               c >= 0x31C0 && c <= 0x31E3 ||
               c >= 0x31F0 && c <= 0x321E ||
               c >= 0x3220 && c <= 0x3247 ||
               c >= 0x3250 && c <= 0x32FE ||
               c >= 0x3300 && c <= 0x4DBF ||
               c >= 0x4E00 && c <= 0xA48C ||
               c >= 0xA490 && c <= 0xA4C6 ||
               c >= 0xA960 && c <= 0xA97C ||
               c >= 0xAC00 && c <= 0xD7A3 ||
               c >= 0xD7B0 && c <= 0xD7C6 ||
               c >= 0xD7CB && c <= 0xD7FB ||
               c >= 0xF900 && c <= 0xFAFF ||
               c >= 0xFE10 && c <= 0xFE19 ||
               c >= 0xFE30 && c <= 0xFE52 ||
               c >= 0xFE54 && c <= 0xFE66 ||
               c >= 0xFE68 && c <= 0xFE6B ||
               c >= 0xFF01 && c <= 0xFF60 ||
               c >= 0xFFE0 && c <= 0xFFE6;
***REMOVED***;

***REMOVED***).call(EditSession.prototype);

require("./edit_session/folding").Folding.call(EditSession.prototype);
require("./edit_session/bracket_match").BracketMatch.call(EditSession.prototype);


config.defineOptions(EditSession.prototype, "session", ***REMOVED***
    wrap: ***REMOVED***
        set: function(value) ***REMOVED***
            if (!value || value == "off")
                value = false;
            else if (value == "free")
                value = true;
            else if (value == "printMargin")
                value = -1;
            else if (typeof value == "string")
                value = parseInt(value, 10) || false;

            if (this.$wrap == value)
                return;
            if (!value) ***REMOVED***
                this.setUseWrapMode(false);
        ***REMOVED*** else ***REMOVED***
                var col = typeof value == "number" ? value : null;
                this.setWrapLimitRange(col, col);
                this.setUseWrapMode(true);
        ***REMOVED***
            this.$wrap = value;
    ***REMOVED***
        get: function() ***REMOVED***
            return this.getUseWrapMode() ? this.getWrapLimitRange().min || "free" : "off";
    ***REMOVED***
        handlesSet: true
***REMOVED***    
    wrapMethod: ***REMOVED***
        set: function(val) ***REMOVED***
            if (val == "auto")
                this.$wrapAsCode = this.$mode.type != "text";
            else
                this.$wrapAsCode = val != "text";
    ***REMOVED***
        initialValue: "auto"
***REMOVED***
    firstLineNumber: ***REMOVED***
        set: function() ***REMOVED***this._emit("changeBreakpoint");***REMOVED***,
        initialValue: 1
***REMOVED***
    useWorker: ***REMOVED***
        set: function(useWorker) ***REMOVED***
            this.$useWorker = useWorker;

            this.$stopWorker();
            if (useWorker)
                this.$startWorker();
    ***REMOVED***
        initialValue: true
***REMOVED***
    useSoftTabs: ***REMOVED***initialValue: true***REMOVED***,
    tabSize: ***REMOVED***
        set: function(tabSize) ***REMOVED***
            if (isNaN(tabSize) || this.$tabSize === tabSize) return;

            this.$modified = true;
            this.$rowLengthCache = [];
            this.$tabSize = tabSize;
            this._emit("changeTabSize");
    ***REMOVED***
        initialValue: 4,
        handlesSet: true
***REMOVED***
    overwrite: ***REMOVED***
        set: function(val) ***REMOVED***this._emit("changeOverwrite");***REMOVED***,
        initialValue: false
***REMOVED***
    newLineMode: ***REMOVED***
        set: function(val) ***REMOVED***this.doc.setNewLineMode(val)***REMOVED***,
        get: function() ***REMOVED***return this.doc.getNewLineMode()***REMOVED***,
        handlesSet: true
***REMOVED***
***REMOVED***);

exports.EditSession = EditSession;
***REMOVED***);

define('ace/lib/oop', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.inherits = (function() ***REMOVED***
    var tempCtor = function() ***REMOVED******REMOVED***;
    return function(ctor, superCtor) ***REMOVED***
        tempCtor.prototype = superCtor.prototype;
        ctor.super_ = superCtor.prototype;
        ctor.prototype = new tempCtor();
        ctor.prototype.constructor = ctor;
***REMOVED***;
***REMOVED***());

exports.mixin = function(obj, mixin) ***REMOVED***
    for (var key in mixin) ***REMOVED***
        obj[key] = mixin[key];
***REMOVED***
    return obj;
***REMOVED***;

exports.implement = function(proto, mixin) ***REMOVED***
    exports.mixin(proto, mixin);
***REMOVED***;

***REMOVED***);

define('ace/lib/lang', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.stringReverse = function(string) ***REMOVED***
    return string.split("").reverse().join("");
***REMOVED***;

exports.stringRepeat = function (string, count) ***REMOVED***
    var result = '';
    while (count > 0) ***REMOVED***
        if (count & 1)
            result += string;

        if (count >>= 1)
            string += string;
***REMOVED***
    return result;
***REMOVED***;

var trimBeginRegexp = /^\s\s*/;
var trimEndRegexp = /\s\s*$/;

exports.stringTrimLeft = function (string) ***REMOVED***
    return string.replace(trimBeginRegexp, '');
***REMOVED***;

exports.stringTrimRight = function (string) ***REMOVED***
    return string.replace(trimEndRegexp, '');
***REMOVED***;

exports.copyObject = function(obj) ***REMOVED***
    var copy = ***REMOVED******REMOVED***;
    for (var key in obj) ***REMOVED***
        copy[key] = obj[key];
***REMOVED***
    return copy;
***REMOVED***;

exports.copyArray = function(array)***REMOVED***
    var copy = [];
    for (var i=0, l=array.length; i<l; i++) ***REMOVED***
        if (array[i] && typeof array[i] == "object")
            copy[i] = this.copyObject( array[i] );
        else 
            copy[i] = array[i];
***REMOVED***
    return copy;
***REMOVED***;

exports.deepCopy = function (obj) ***REMOVED***
    if (typeof obj != "object") ***REMOVED***
        return obj;
***REMOVED***
    
    var copy = obj.constructor();
    for (var key in obj) ***REMOVED***
        if (typeof obj[key] == "object") ***REMOVED***
            copy[key] = this.deepCopy(obj[key]);
    ***REMOVED*** else ***REMOVED***
            copy[key] = obj[key];
    ***REMOVED***
***REMOVED***
    return copy;
***REMOVED***;

exports.arrayToMap = function(arr) ***REMOVED***
    var map = ***REMOVED******REMOVED***;
    for (var i=0; i<arr.length; i++) ***REMOVED***
        map[arr[i]] = 1;
***REMOVED***
    return map;

***REMOVED***;

exports.createMap = function(props) ***REMOVED***
    var map = Object.create(null);
    for (var i in props) ***REMOVED***
        map[i] = props[i];
***REMOVED***
    return map;
***REMOVED***;
exports.arrayRemove = function(array, value) ***REMOVED***
  for (var i = 0; i <= array.length; i++) ***REMOVED***
    if (value === array[i]) ***REMOVED***
      array.splice(i, 1);
***REMOVED***
  ***REMOVED***
***REMOVED***;

exports.escapeRegExp = function(str) ***REMOVED***
    return str.replace(/([.*+?^$***REMOVED******REMOVED***()|[\]\/\\])/g, '\\$1');
***REMOVED***;

exports.escapeHTML = function(str) ***REMOVED***
    return str.replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;");
***REMOVED***;

exports.getMatchOffsets = function(string, regExp) ***REMOVED***
    var matches = [];

    string.replace(regExp, function(str) ***REMOVED***
        matches.push(***REMOVED***
            offset: arguments[arguments.length-2],
            length: str.length
    ***REMOVED***);
***REMOVED***);

    return matches;
***REMOVED***;
exports.deferredCall = function(fcn) ***REMOVED***

    var timer = null;
    var callback = function() ***REMOVED***
        timer = null;
        fcn();
***REMOVED***;

    var deferred = function(timeout) ***REMOVED***
        deferred.cancel();
        timer = setTimeout(callback, timeout || 0);
        return deferred;
***REMOVED***;

    deferred.schedule = deferred;

    deferred.call = function() ***REMOVED***
        this.cancel();
        fcn();
        return deferred;
***REMOVED***;

    deferred.cancel = function() ***REMOVED***
        clearTimeout(timer);
        timer = null;
        return deferred;
***REMOVED***;

    return deferred;
***REMOVED***;


exports.delayedCall = function(fcn, defaultTimeout) ***REMOVED***
    var timer = null;
    var callback = function() ***REMOVED***
        timer = null;
        fcn();
***REMOVED***;

    var _self = function(timeout) ***REMOVED***
        timer && clearTimeout(timer);
        timer = setTimeout(callback, timeout || defaultTimeout);
***REMOVED***;

    _self.delay = _self;
    _self.schedule = function(timeout) ***REMOVED***
        if (timer == null)
            timer = setTimeout(callback, timeout || 0);
***REMOVED***;

    _self.call = function() ***REMOVED***
        this.cancel();
        fcn();
***REMOVED***;

    _self.cancel = function() ***REMOVED***
        timer && clearTimeout(timer);
        timer = null;
***REMOVED***;

    _self.isPending = function() ***REMOVED***
        return timer;
***REMOVED***;

    return _self;
***REMOVED***;
***REMOVED***);

define('ace/config', ['require', 'exports', 'module' , 'ace/lib/lang', 'ace/lib/oop', 'ace/lib/net', 'ace/lib/event_emitter'], function(require, exports, module) ***REMOVED***
"no use strict";

var lang = require("./lib/lang");
var oop = require("./lib/oop");
var net = require("./lib/net");
var EventEmitter = require("./lib/event_emitter").EventEmitter;

var global = (function() ***REMOVED***
    return this;
***REMOVED***)();

var options = ***REMOVED***
    packaged: false,
    workerPath: null,
    modePath: null,
    themePath: null,
    basePath: "",
    suffix: ".js",
    $moduleUrls: ***REMOVED******REMOVED***
***REMOVED***;

exports.get = function(key) ***REMOVED***
    if (!options.hasOwnProperty(key))
        throw new Error("Unknown config key: " + key);

    return options[key];
***REMOVED***;

exports.set = function(key, value) ***REMOVED***
    if (!options.hasOwnProperty(key))
        throw new Error("Unknown config key: " + key);

    options[key] = value;
***REMOVED***;

exports.all = function() ***REMOVED***
    return lang.copyObject(options);
***REMOVED***;
oop.implement(exports, EventEmitter);

exports.moduleUrl = function(name, component) ***REMOVED***
    if (options.$moduleUrls[name])
        return options.$moduleUrls[name];

    var parts = name.split("/");
    component = component || parts[parts.length - 2] || "";
    var sep = component == "snippets" ? "/" : "-";
    var base = parts[parts.length - 1];    
    if (sep == "-") ***REMOVED***
        var re = new RegExp("^" + component + "[\\-_]|[\\-_]" + component + "$", "g");
        base = base.replace(re, "");
***REMOVED***

    if ((!base || base == component) && parts.length > 1)
        base = parts[parts.length - 2];
    var path = options[component + "Path"];
    if (path == null) ***REMOVED***
        path = options.basePath;
***REMOVED*** else if (sep == "/") ***REMOVED***
        component = sep = "";
***REMOVED***
    if (path && path.slice(-1) != "/")
        path += "/";
    return path + component + sep + base + this.get("suffix");
***REMOVED***;

exports.setModuleUrl = function(name, subst) ***REMOVED***
    return options.$moduleUrls[name] = subst;
***REMOVED***;

exports.$loading = ***REMOVED******REMOVED***;
exports.loadModule = function(moduleName, onLoad) ***REMOVED***
    var module, moduleType;
    if (Array.isArray(moduleName)) ***REMOVED***
        moduleType = moduleName[0];
        moduleName = moduleName[1];
***REMOVED***

    try ***REMOVED***
        module = require(moduleName);
***REMOVED*** catch (e) ***REMOVED******REMOVED***
    if (module && !exports.$loading[moduleName])
        return onLoad && onLoad(module);

    if (!exports.$loading[moduleName])
        exports.$loading[moduleName] = [];

    exports.$loading[moduleName].push(onLoad);

    if (exports.$loading[moduleName].length > 1)
        return;

    var afterLoad = function() ***REMOVED***
        require([moduleName], function(module) ***REMOVED***
            exports._emit("load.module", ***REMOVED***name: moduleName, module: module***REMOVED***);
            var listeners = exports.$loading[moduleName];
            exports.$loading[moduleName] = null;
            listeners.forEach(function(onLoad) ***REMOVED***
                onLoad && onLoad(module);
        ***REMOVED***);
    ***REMOVED***);
***REMOVED***;

    if (!exports.get("packaged"))
        return afterLoad();
    net.loadScript(exports.moduleUrl(moduleName, moduleType), afterLoad);
***REMOVED***;
exports.init = function() ***REMOVED***
    options.packaged = require.packaged || module.packaged || (global.define && define.packaged);

    if (!global.document)
        return "";

    var scriptOptions = ***REMOVED******REMOVED***;
    var scriptUrl = "";

    var scripts = document.getElementsByTagName("script");
    for (var i=0; i<scripts.length; i++) ***REMOVED***
        var script = scripts[i];

        var src = script.src || script.getAttribute("src");
        if (!src)
            continue;

        var attributes = script.attributes;
        for (var j=0, l=attributes.length; j < l; j++) ***REMOVED***
            var attr = attributes[j];
            if (attr.name.indexOf("data-ace-") === 0) ***REMOVED***
                scriptOptions[deHyphenate(attr.name.replace(/^data-ace-/, ""))] = attr.value;
        ***REMOVED***
    ***REMOVED***

        var m = src.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
        if (m)
            scriptUrl = m[1];
***REMOVED***

    if (scriptUrl) ***REMOVED***
        scriptOptions.base = scriptOptions.base || scriptUrl;
        scriptOptions.packaged = true;
***REMOVED***

    scriptOptions.basePath = scriptOptions.base;
    scriptOptions.workerPath = scriptOptions.workerPath || scriptOptions.base;
    scriptOptions.modePath = scriptOptions.modePath || scriptOptions.base;
    scriptOptions.themePath = scriptOptions.themePath || scriptOptions.base;
    delete scriptOptions.base;

    for (var key in scriptOptions)
        if (typeof scriptOptions[key] !== "undefined")
            exports.set(key, scriptOptions[key]);
***REMOVED***;

function deHyphenate(str) ***REMOVED***
    return str.replace(/-(.)/g, function(m, m1) ***REMOVED*** return m1.toUpperCase(); ***REMOVED***);
***REMOVED***

var optionsProvider = ***REMOVED***
    setOptions: function(optList) ***REMOVED***
        Object.keys(optList).forEach(function(key) ***REMOVED***
            this.setOption(key, optList[key]);
    ***REMOVED*** this);
***REMOVED***
    getOptions: function(optionNames) ***REMOVED***
        var result = ***REMOVED******REMOVED***;
        if (!optionNames) ***REMOVED***
            optionNames = Object.keys(this.$options);
    ***REMOVED*** else if (!Array.isArray(optionNames)) ***REMOVED***
            result = optionNames;
            optionNames = Object.keys(result);
    ***REMOVED***
        optionNames.forEach(function(key) ***REMOVED***
            result[key] = this.getOption(key);
    ***REMOVED*** this);
        return result;
***REMOVED***
    setOption: function(name, value) ***REMOVED***
        if (this["$" + name] === value)
            return;
        var opt = this.$options[name];
        if (!opt) ***REMOVED***
            if (typeof console != "undefined" && console.warn)
                console.warn('misspelled option "' + name + '"');
            return undefined;
    ***REMOVED***
        if (opt.forwardTo)
            return this[opt.forwardTo] && this[opt.forwardTo].setOption(name, value);

        if (!opt.handlesSet)
            this["$" + name] = value;
        if (opt && opt.set)
            opt.set.call(this, value);
***REMOVED***
    getOption: function(name) ***REMOVED***
        var opt = this.$options[name];
        if (!opt) ***REMOVED***
            if (typeof console != "undefined" && console.warn)
                console.warn('misspelled option "' + name + '"');
            return undefined;
    ***REMOVED***
        if (opt.forwardTo)
            return this[opt.forwardTo] && this[opt.forwardTo].getOption(name);
        return opt && opt.get ? opt.get.call(this) : this["$" + name];
***REMOVED***
***REMOVED***;

var defaultOptions = ***REMOVED******REMOVED***;
exports.defineOptions = function(obj, path, options) ***REMOVED***
    if (!obj.$options)
        defaultOptions[path] = obj.$options = ***REMOVED******REMOVED***;

    Object.keys(options).forEach(function(key) ***REMOVED***
        var opt = options[key];
        if (typeof opt == "string")
            opt = ***REMOVED***forwardTo: opt***REMOVED***;

        opt.name || (opt.name = key);
        obj.$options[opt.name] = opt;
        if ("initialValue" in opt)
            obj["$" + opt.name] = opt.initialValue;
***REMOVED***);
    oop.implement(obj, optionsProvider);

    return this;
***REMOVED***;

exports.resetOptions = function(obj) ***REMOVED***
    Object.keys(obj.$options).forEach(function(key) ***REMOVED***
        var opt = obj.$options[key];
        if ("value" in opt)
            obj.setOption(key, opt.value);
***REMOVED***);
***REMOVED***;

exports.setDefaultValue = function(path, name, value) ***REMOVED***
    var opts = defaultOptions[path] || (defaultOptions[path] = ***REMOVED******REMOVED***);
    if (opts[name]) ***REMOVED***
        if (opts.forwardTo)
            exports.setDefaultValue(opts.forwardTo, name, value);
        else
            opts[name].value = value;
***REMOVED***
***REMOVED***;

exports.setDefaultValues = function(path, optionHash) ***REMOVED***
    Object.keys(optionHash).forEach(function(key) ***REMOVED***
        exports.setDefaultValue(path, key, optionHash[key]);
***REMOVED***);
***REMOVED***;

***REMOVED***);
define('ace/lib/net', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

var dom = require("./dom");

exports.get = function (url, callback) ***REMOVED***
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () ***REMOVED***
        if (xhr.readyState === 4) ***REMOVED***
            callback(xhr.responseText);
    ***REMOVED***
***REMOVED***;
    xhr.send(null);
***REMOVED***;

exports.loadScript = function(path, callback) ***REMOVED***
    var head = dom.getDocumentHead();
    var s = document.createElement('script');

    s.src = path;
    head.appendChild(s);

    s.onload = s.onreadystatechange = function(_, isAbort) ***REMOVED***
        if (isAbort || !s.readyState || s.readyState == "loaded" || s.readyState == "complete") ***REMOVED***
            s = s.onload = s.onreadystatechange = null;
            if (!isAbort)
                callback();
    ***REMOVED***
***REMOVED***;
***REMOVED***;

***REMOVED***);

define('ace/lib/dom', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


if (typeof document == "undefined")
    return;

var XHTML_NS = "http://www.w3.org/1999/xhtml";

exports.getDocumentHead = function(doc) ***REMOVED***
    if (!doc)
        doc = document;
    return doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
***REMOVED***

exports.createElement = function(tag, ns) ***REMOVED***
    return document.createElementNS ?
           document.createElementNS(ns || XHTML_NS, tag) :
           document.createElement(tag);
***REMOVED***;

exports.hasCssClass = function(el, name) ***REMOVED***
    var classes = el.className.split(/\s+/g);
    return classes.indexOf(name) !== -1;
***REMOVED***;
exports.addCssClass = function(el, name) ***REMOVED***
    if (!exports.hasCssClass(el, name)) ***REMOVED***
        el.className += " " + name;
***REMOVED***
***REMOVED***;
exports.removeCssClass = function(el, name) ***REMOVED***
    var classes = el.className.split(/\s+/g);
    while (true) ***REMOVED***
        var index = classes.indexOf(name);
        if (index == -1) ***REMOVED***
            break;
    ***REMOVED***
        classes.splice(index, 1);
***REMOVED***
    el.className = classes.join(" ");
***REMOVED***;

exports.toggleCssClass = function(el, name) ***REMOVED***
    var classes = el.className.split(/\s+/g), add = true;
    while (true) ***REMOVED***
        var index = classes.indexOf(name);
        if (index == -1) ***REMOVED***
            break;
    ***REMOVED***
        add = false;
        classes.splice(index, 1);
***REMOVED***
    if(add)
        classes.push(name);

    el.className = classes.join(" ");
    return add;
***REMOVED***;
exports.setCssClass = function(node, className, include) ***REMOVED***
    if (include) ***REMOVED***
        exports.addCssClass(node, className);
***REMOVED*** else ***REMOVED***
        exports.removeCssClass(node, className);
***REMOVED***
***REMOVED***;

exports.hasCssString = function(id, doc) ***REMOVED***
    var index = 0, sheets;
    doc = doc || document;

    if (doc.createStyleSheet && (sheets = doc.styleSheets)) ***REMOVED***
        while (index < sheets.length)
            if (sheets[index++].owningElement.id === id) return true;
***REMOVED*** else if ((sheets = doc.getElementsByTagName("style"))) ***REMOVED***
        while (index < sheets.length)
            if (sheets[index++].id === id) return true;
***REMOVED***

    return false;
***REMOVED***;

exports.importCssString = function importCssString(cssText, id, doc) ***REMOVED***
    doc = doc || document;
    if (id && exports.hasCssString(id, doc))
        return null;
    
    var style;
    
    if (doc.createStyleSheet) ***REMOVED***
        style = doc.createStyleSheet();
        style.cssText = cssText;
        if (id)
            style.owningElement.id = id;
***REMOVED*** else ***REMOVED***
        style = doc.createElementNS
            ? doc.createElementNS(XHTML_NS, "style")
            : doc.createElement("style");

        style.appendChild(doc.createTextNode(cssText));
        if (id)
            style.id = id;

        exports.getDocumentHead(doc).appendChild(style);
***REMOVED***
***REMOVED***;

exports.importCssStylsheet = function(uri, doc) ***REMOVED***
    if (doc.createStyleSheet) ***REMOVED***
        doc.createStyleSheet(uri);
***REMOVED*** else ***REMOVED***
        var link = exports.createElement('link');
        link.rel = 'stylesheet';
        link.href = uri;

        exports.getDocumentHead(doc).appendChild(link);
***REMOVED***
***REMOVED***;

exports.getInnerWidth = function(element) ***REMOVED***
    return (
        parseInt(exports.computedStyle(element, "paddingLeft"), 10) +
        parseInt(exports.computedStyle(element, "paddingRight"), 10) + 
        element.clientWidth
    );
***REMOVED***;

exports.getInnerHeight = function(element) ***REMOVED***
    return (
        parseInt(exports.computedStyle(element, "paddingTop"), 10) +
        parseInt(exports.computedStyle(element, "paddingBottom"), 10) +
        element.clientHeight
    );
***REMOVED***;

if (window.pageYOffset !== undefined) ***REMOVED***
    exports.getPageScrollTop = function() ***REMOVED***
        return window.pageYOffset;
***REMOVED***;

    exports.getPageScrollLeft = function() ***REMOVED***
        return window.pageXOffset;
***REMOVED***;
***REMOVED***
else ***REMOVED***
    exports.getPageScrollTop = function() ***REMOVED***
        return document.body.scrollTop;
***REMOVED***;

    exports.getPageScrollLeft = function() ***REMOVED***
        return document.body.scrollLeft;
***REMOVED***;
***REMOVED***

if (window.getComputedStyle)
    exports.computedStyle = function(element, style) ***REMOVED***
        if (style)
            return (window.getComputedStyle(element, "") || ***REMOVED******REMOVED***)[style] || "";
        return window.getComputedStyle(element, "") || ***REMOVED******REMOVED***;
***REMOVED***;
else
    exports.computedStyle = function(element, style) ***REMOVED***
        if (style)
            return element.currentStyle[style];
        return element.currentStyle;
***REMOVED***;

exports.scrollbarWidth = function(document) ***REMOVED***
    var inner = exports.createElement("ace_inner");
    inner.style.width = "100%";
    inner.style.minWidth = "0px";
    inner.style.height = "200px";
    inner.style.display = "block";

    var outer = exports.createElement("ace_outer");
    var style = outer.style;

    style.position = "absolute";
    style.left = "-10000px";
    style.overflow = "hidden";
    style.width = "200px";
    style.minWidth = "0px";
    style.height = "150px";
    style.display = "block";

    outer.appendChild(inner);

    var body = document.documentElement;
    body.appendChild(outer);

    var noScrollbar = inner.offsetWidth;

    style.overflow = "scroll";
    var withScrollbar = inner.offsetWidth;

    if (noScrollbar == withScrollbar) ***REMOVED***
        withScrollbar = outer.clientWidth;
***REMOVED***

    body.removeChild(outer);

    return noScrollbar-withScrollbar;
***REMOVED***;
exports.setInnerHtml = function(el, innerHtml) ***REMOVED***
    var element = el.cloneNode(false);//document.createElement("div");
    element.innerHTML = innerHtml;
    el.parentNode.replaceChild(element, el);
    return element;
***REMOVED***;

if ("textContent" in document.documentElement) ***REMOVED***
    exports.setInnerText = function(el, innerText) ***REMOVED***
        el.textContent = innerText;
***REMOVED***;

    exports.getInnerText = function(el) ***REMOVED***
        return el.textContent;
***REMOVED***;
***REMOVED***
else ***REMOVED***
    exports.setInnerText = function(el, innerText) ***REMOVED***
        el.innerText = innerText;
***REMOVED***;

    exports.getInnerText = function(el) ***REMOVED***
        return el.innerText;
***REMOVED***;
***REMOVED***

exports.getParentWindow = function(document) ***REMOVED***
    return document.defaultView || document.parentWindow;
***REMOVED***;

***REMOVED***);

define('ace/lib/event_emitter', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


var EventEmitter = ***REMOVED******REMOVED***;
var stopPropagation = function() ***REMOVED*** this.propagationStopped = true; ***REMOVED***;
var preventDefault = function() ***REMOVED*** this.defaultPrevented = true; ***REMOVED***;

EventEmitter._emit =
EventEmitter._dispatchEvent = function(eventName, e) ***REMOVED***
    this._eventRegistry || (this._eventRegistry = ***REMOVED******REMOVED***);
    this._defaultHandlers || (this._defaultHandlers = ***REMOVED******REMOVED***);

    var listeners = this._eventRegistry[eventName] || [];
    var defaultHandler = this._defaultHandlers[eventName];
    if (!listeners.length && !defaultHandler)
        return;

    if (typeof e != "object" || !e)
        e = ***REMOVED******REMOVED***;

    if (!e.type)
        e.type = eventName;
    if (!e.stopPropagation)
        e.stopPropagation = stopPropagation;
    if (!e.preventDefault)
        e.preventDefault = preventDefault;

    listeners = listeners.slice();
    for (var i=0; i<listeners.length; i++) ***REMOVED***
        listeners[i](e, this);
        if (e.propagationStopped)
            break;
***REMOVED***
    
    if (defaultHandler && !e.defaultPrevented)
        return defaultHandler(e, this);
***REMOVED***;


EventEmitter._signal = function(eventName, e) ***REMOVED***
    var listeners = (this._eventRegistry || ***REMOVED******REMOVED***)[eventName];
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (var i=0; i<listeners.length; i++)
        listeners[i](e, this);
***REMOVED***;

EventEmitter.once = function(eventName, callback) ***REMOVED***
    var _self = this;
    callback && this.addEventListener(eventName, function newCallback() ***REMOVED***
        _self.removeEventListener(eventName, newCallback);
        callback.apply(null, arguments);
***REMOVED***);
***REMOVED***;


EventEmitter.setDefaultHandler = function(eventName, callback) ***REMOVED***
    var handlers = this._defaultHandlers
    if (!handlers)
        handlers = this._defaultHandlers = ***REMOVED***_disabled_: ***REMOVED******REMOVED******REMOVED***;
    
    if (handlers[eventName]) ***REMOVED***
        var old = handlers[eventName];
        var disabled = handlers._disabled_[eventName];
        if (!disabled)
            handlers._disabled_[eventName] = disabled = [];
        disabled.push(old);
        var i = disabled.indexOf(callback);
        if (i != -1) 
            disabled.splice(i, 1);
***REMOVED***
    handlers[eventName] = callback;
***REMOVED***;
EventEmitter.removeDefaultHandler = function(eventName, callback) ***REMOVED***
    var handlers = this._defaultHandlers
    if (!handlers)
        return;
    var disabled = handlers._disabled_[eventName];
    
    if (handlers[eventName] == callback) ***REMOVED***
        var old = handlers[eventName];
        if (disabled)
            this.setDefaultHandler(eventName, disabled.pop());
***REMOVED*** else if (disabled) ***REMOVED***
        var i = disabled.indexOf(callback);
        if (i != -1)
            disabled.splice(i, 1);
***REMOVED***
***REMOVED***;

EventEmitter.on =
EventEmitter.addEventListener = function(eventName, callback, capturing) ***REMOVED***
    this._eventRegistry = this._eventRegistry || ***REMOVED******REMOVED***;

    var listeners = this._eventRegistry[eventName];
    if (!listeners)
        listeners = this._eventRegistry[eventName] = [];

    if (listeners.indexOf(callback) == -1)
        listeners[capturing ? "unshift" : "push"](callback);
    return callback;
***REMOVED***;

EventEmitter.off =
EventEmitter.removeListener =
EventEmitter.removeEventListener = function(eventName, callback) ***REMOVED***
    this._eventRegistry = this._eventRegistry || ***REMOVED******REMOVED***;

    var listeners = this._eventRegistry[eventName];
    if (!listeners)
        return;

    var index = listeners.indexOf(callback);
    if (index !== -1)
        listeners.splice(index, 1);
***REMOVED***;

EventEmitter.removeAllListeners = function(eventName) ***REMOVED***
    if (this._eventRegistry) this._eventRegistry[eventName] = [];
***REMOVED***;

exports.EventEmitter = EventEmitter;

***REMOVED***);

define('ace/selection', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/lib/event_emitter', 'ace/range'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var lang = require("./lib/lang");
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var Range = require("./range").Range;
var Selection = function(session) ***REMOVED***
    this.session = session;
    this.doc = session.getDocument();

    this.clearSelection();
    this.lead = this.selectionLead = this.doc.createAnchor(0, 0);
    this.anchor = this.selectionAnchor = this.doc.createAnchor(0, 0);

    var self = this;
    this.lead.on("change", function(e) ***REMOVED***
        self._emit("changeCursor");
        if (!self.$isEmpty)
            self._emit("changeSelection");
        if (!self.$keepDesiredColumnOnChange && e.old.column != e.value.column)
            self.$desiredColumn = null;
***REMOVED***);

    this.selectionAnchor.on("change", function() ***REMOVED***
        if (!self.$isEmpty)
            self._emit("changeSelection");
***REMOVED***);
***REMOVED***;

(function() ***REMOVED***

    oop.implement(this, EventEmitter);
    this.isEmpty = function() ***REMOVED***
        return (this.$isEmpty || (
            this.anchor.row == this.lead.row &&
            this.anchor.column == this.lead.column
        ));
***REMOVED***;
    this.isMultiLine = function() ***REMOVED***
        if (this.isEmpty()) ***REMOVED***
            return false;
    ***REMOVED***

        return this.getRange().isMultiLine();
***REMOVED***;
    this.getCursor = function() ***REMOVED***
        return this.lead.getPosition();
***REMOVED***;
    this.setSelectionAnchor = function(row, column) ***REMOVED***
        this.anchor.setPosition(row, column);

        if (this.$isEmpty) ***REMOVED***
            this.$isEmpty = false;
            this._emit("changeSelection");
    ***REMOVED***
***REMOVED***;
    this.getSelectionAnchor = function() ***REMOVED***
        if (this.$isEmpty)
            return this.getSelectionLead()
        else
            return this.anchor.getPosition();
***REMOVED***;
    this.getSelectionLead = function() ***REMOVED***
        return this.lead.getPosition();
***REMOVED***;
    this.shiftSelection = function(columns) ***REMOVED***
        if (this.$isEmpty) ***REMOVED***
            this.moveCursorTo(this.lead.row, this.lead.column + columns);
            return;
    ***REMOVED***;

        var anchor = this.getSelectionAnchor();
        var lead = this.getSelectionLead();

        var isBackwards = this.isBackwards();

        if (!isBackwards || anchor.column !== 0)
            this.setSelectionAnchor(anchor.row, anchor.column + columns);

        if (isBackwards || lead.column !== 0) ***REMOVED***
            this.$moveSelection(function() ***REMOVED***
                this.moveCursorTo(lead.row, lead.column + columns);
        ***REMOVED***);
    ***REMOVED***
***REMOVED***;
    this.isBackwards = function() ***REMOVED***
        var anchor = this.anchor;
        var lead = this.lead;
        return (anchor.row > lead.row || (anchor.row == lead.row && anchor.column > lead.column));
***REMOVED***;
    this.getRange = function() ***REMOVED***
        var anchor = this.anchor;
        var lead = this.lead;

        if (this.isEmpty())
            return Range.fromPoints(lead, lead);

        if (this.isBackwards()) ***REMOVED***
            return Range.fromPoints(lead, anchor);
    ***REMOVED***
        else ***REMOVED***
            return Range.fromPoints(anchor, lead);
    ***REMOVED***
***REMOVED***;
    this.clearSelection = function() ***REMOVED***
        if (!this.$isEmpty) ***REMOVED***
            this.$isEmpty = true;
            this._emit("changeSelection");
    ***REMOVED***
***REMOVED***;
    this.selectAll = function() ***REMOVED***
        var lastRow = this.doc.getLength() - 1;
        this.setSelectionAnchor(0, 0);
        this.moveCursorTo(lastRow, this.doc.getLine(lastRow).length);
***REMOVED***;
    this.setRange =
    this.setSelectionRange = function(range, reverse) ***REMOVED***
        if (reverse) ***REMOVED***
            this.setSelectionAnchor(range.end.row, range.end.column);
            this.selectTo(range.start.row, range.start.column);
    ***REMOVED*** else ***REMOVED***
            this.setSelectionAnchor(range.start.row, range.start.column);
            this.selectTo(range.end.row, range.end.column);
    ***REMOVED***
        if (this.getRange().isEmpty())
            this.$isEmpty = true;
        this.$desiredColumn = null;
***REMOVED***;

    this.$moveSelection = function(mover) ***REMOVED***
        var lead = this.lead;
        if (this.$isEmpty)
            this.setSelectionAnchor(lead.row, lead.column);

        mover.call(this);
***REMOVED***;
    this.selectTo = function(row, column) ***REMOVED***
        this.$moveSelection(function() ***REMOVED***
            this.moveCursorTo(row, column);
    ***REMOVED***);
***REMOVED***;
    this.selectToPosition = function(pos) ***REMOVED***
        this.$moveSelection(function() ***REMOVED***
            this.moveCursorToPosition(pos);
    ***REMOVED***);
***REMOVED***;
    this.selectUp = function() ***REMOVED***
        this.$moveSelection(this.moveCursorUp);
***REMOVED***;
    this.selectDown = function() ***REMOVED***
        this.$moveSelection(this.moveCursorDown);
***REMOVED***;
    this.selectRight = function() ***REMOVED***
        this.$moveSelection(this.moveCursorRight);
***REMOVED***;
    this.selectLeft = function() ***REMOVED***
        this.$moveSelection(this.moveCursorLeft);
***REMOVED***;
    this.selectLineStart = function() ***REMOVED***
        this.$moveSelection(this.moveCursorLineStart);
***REMOVED***;
    this.selectLineEnd = function() ***REMOVED***
        this.$moveSelection(this.moveCursorLineEnd);
***REMOVED***;
    this.selectFileEnd = function() ***REMOVED***
        this.$moveSelection(this.moveCursorFileEnd);
***REMOVED***;
    this.selectFileStart = function() ***REMOVED***
        this.$moveSelection(this.moveCursorFileStart);
***REMOVED***;
    this.selectWordRight = function() ***REMOVED***
        this.$moveSelection(this.moveCursorWordRight);
***REMOVED***;
    this.selectWordLeft = function() ***REMOVED***
        this.$moveSelection(this.moveCursorWordLeft);
***REMOVED***;
    this.getWordRange = function(row, column) ***REMOVED***
        if (typeof column == "undefined") ***REMOVED***
            var cursor = row || this.lead;
            row = cursor.row;
            column = cursor.column;
    ***REMOVED***
        return this.session.getWordRange(row, column);
***REMOVED***;
    this.selectWord = function() ***REMOVED***
        this.setSelectionRange(this.getWordRange());
***REMOVED***;
    this.selectAWord = function() ***REMOVED***
        var cursor = this.getCursor();
        var range = this.session.getAWordRange(cursor.row, cursor.column);
        this.setSelectionRange(range);
***REMOVED***;

    this.getLineRange = function(row, excludeLastChar) ***REMOVED***
        var rowStart = typeof row == "number" ? row : this.lead.row;
        var rowEnd;

        var foldLine = this.session.getFoldLine(rowStart);
        if (foldLine) ***REMOVED***
            rowStart = foldLine.start.row;
            rowEnd = foldLine.end.row;
    ***REMOVED*** else ***REMOVED***
            rowEnd = rowStart;
    ***REMOVED***
        if (excludeLastChar === true)
            return new Range(rowStart, 0, rowEnd, this.session.getLine(rowEnd).length);
        else
            return new Range(rowStart, 0, rowEnd + 1, 0);
***REMOVED***;
    this.selectLine = function() ***REMOVED***
        this.setSelectionRange(this.getLineRange());
***REMOVED***;
    this.moveCursorUp = function() ***REMOVED***
        this.moveCursorBy(-1, 0);
***REMOVED***;
    this.moveCursorDown = function() ***REMOVED***
        this.moveCursorBy(1, 0);
***REMOVED***;
    this.moveCursorLeft = function() ***REMOVED***
        var cursor = this.lead.getPosition(),
            fold;

        if (fold = this.session.getFoldAt(cursor.row, cursor.column, -1)) ***REMOVED***
            this.moveCursorTo(fold.start.row, fold.start.column);
    ***REMOVED*** else if (cursor.column == 0) ***REMOVED***
            if (cursor.row > 0) ***REMOVED***
                this.moveCursorTo(cursor.row - 1, this.doc.getLine(cursor.row - 1).length);
        ***REMOVED***
    ***REMOVED***
        else ***REMOVED***
            var tabSize = this.session.getTabSize();
            if (this.session.isTabStop(cursor) && this.doc.getLine(cursor.row).slice(cursor.column-tabSize, cursor.column).split(" ").length-1 == tabSize)
                this.moveCursorBy(0, -tabSize);
            else
                this.moveCursorBy(0, -1);
    ***REMOVED***
***REMOVED***;
    this.moveCursorRight = function() ***REMOVED***
        var cursor = this.lead.getPosition(),
            fold;
        if (fold = this.session.getFoldAt(cursor.row, cursor.column, 1)) ***REMOVED***
            this.moveCursorTo(fold.end.row, fold.end.column);
    ***REMOVED***
        else if (this.lead.column == this.doc.getLine(this.lead.row).length) ***REMOVED***
            if (this.lead.row < this.doc.getLength() - 1) ***REMOVED***
                this.moveCursorTo(this.lead.row + 1, 0);
        ***REMOVED***
    ***REMOVED***
        else ***REMOVED***
            var tabSize = this.session.getTabSize();
            var cursor = this.lead;
            if (this.session.isTabStop(cursor) && this.doc.getLine(cursor.row).slice(cursor.column, cursor.column+tabSize).split(" ").length-1 == tabSize)
                this.moveCursorBy(0, tabSize);
            else
                this.moveCursorBy(0, 1);
    ***REMOVED***
***REMOVED***;
    this.moveCursorLineStart = function() ***REMOVED***
        var row = this.lead.row;
        var column = this.lead.column;
        var screenRow = this.session.documentToScreenRow(row, column);
        var firstColumnPosition = this.session.screenToDocumentPosition(screenRow, 0);
        var beforeCursor = this.session.getDisplayLine(
            row, null, firstColumnPosition.row,
            firstColumnPosition.column
        );

        var leadingSpace = beforeCursor.match(/^\s*/);
        if (leadingSpace[0].length != column && !this.session.$useEmacsStyleLineStart)
            firstColumnPosition.column += leadingSpace[0].length;
        this.moveCursorToPosition(firstColumnPosition);
***REMOVED***;
    this.moveCursorLineEnd = function() ***REMOVED***
        var lead = this.lead;
        var lineEnd = this.session.getDocumentLastRowColumnPosition(lead.row, lead.column);
        if (this.lead.column == lineEnd.column) ***REMOVED***
            var line = this.session.getLine(lineEnd.row);
            if (lineEnd.column == line.length) ***REMOVED***
                var textEnd = line.search(/\s+$/);
                if (textEnd > 0)
                    lineEnd.column = textEnd;
        ***REMOVED***
    ***REMOVED***

        this.moveCursorTo(lineEnd.row, lineEnd.column);
***REMOVED***;
    this.moveCursorFileEnd = function() ***REMOVED***
        var row = this.doc.getLength() - 1;
        var column = this.doc.getLine(row).length;
        this.moveCursorTo(row, column);
***REMOVED***;
    this.moveCursorFileStart = function() ***REMOVED***
        this.moveCursorTo(0, 0);
***REMOVED***;
    this.moveCursorLongWordRight = function() ***REMOVED***
        var row = this.lead.row;
        var column = this.lead.column;
        var line = this.doc.getLine(row);
        var rightOfCursor = line.substring(column);

        var match;
        this.session.nonTokenRe.lastIndex = 0;
        this.session.tokenRe.lastIndex = 0;
        var fold = this.session.getFoldAt(row, column, 1);
        if (fold) ***REMOVED***
            this.moveCursorTo(fold.end.row, fold.end.column);
            return;
    ***REMOVED***
        if (match = this.session.nonTokenRe.exec(rightOfCursor)) ***REMOVED***
            column += this.session.nonTokenRe.lastIndex;
            this.session.nonTokenRe.lastIndex = 0;
            rightOfCursor = line.substring(column);
    ***REMOVED***
        if (column >= line.length) ***REMOVED***
            this.moveCursorTo(row, line.length);
            this.moveCursorRight();
            if (row < this.doc.getLength() - 1)
                this.moveCursorWordRight();
            return;
    ***REMOVED***
        if (match = this.session.tokenRe.exec(rightOfCursor)) ***REMOVED***
            column += this.session.tokenRe.lastIndex;
            this.session.tokenRe.lastIndex = 0;
    ***REMOVED***

        this.moveCursorTo(row, column);
***REMOVED***;
    this.moveCursorLongWordLeft = function() ***REMOVED***
        var row = this.lead.row;
        var column = this.lead.column;
        var fold;
        if (fold = this.session.getFoldAt(row, column, -1)) ***REMOVED***
            this.moveCursorTo(fold.start.row, fold.start.column);
            return;
    ***REMOVED***

        var str = this.session.getFoldStringAt(row, column, -1);
        if (str == null) ***REMOVED***
            str = this.doc.getLine(row).substring(0, column)
    ***REMOVED***

        var leftOfCursor = lang.stringReverse(str);
        var match;
        this.session.nonTokenRe.lastIndex = 0;
        this.session.tokenRe.lastIndex = 0;
        if (match = this.session.nonTokenRe.exec(leftOfCursor)) ***REMOVED***
            column -= this.session.nonTokenRe.lastIndex;
            leftOfCursor = leftOfCursor.slice(this.session.nonTokenRe.lastIndex);
            this.session.nonTokenRe.lastIndex = 0;
    ***REMOVED***
        if (column <= 0) ***REMOVED***
            this.moveCursorTo(row, 0);
            this.moveCursorLeft();
            if (row > 0)
                this.moveCursorWordLeft();
            return;
    ***REMOVED***
        if (match = this.session.tokenRe.exec(leftOfCursor)) ***REMOVED***
            column -= this.session.tokenRe.lastIndex;
            this.session.tokenRe.lastIndex = 0;
    ***REMOVED***

        this.moveCursorTo(row, column);
***REMOVED***;

    this.$shortWordEndIndex = function(rightOfCursor) ***REMOVED***
        var match, index = 0, ch;
        var whitespaceRe = /\s/;
        var tokenRe = this.session.tokenRe;

        tokenRe.lastIndex = 0;
        if (match = this.session.tokenRe.exec(rightOfCursor)) ***REMOVED***
            index = this.session.tokenRe.lastIndex;
    ***REMOVED*** else ***REMOVED***
            while ((ch = rightOfCursor[index]) && whitespaceRe.test(ch))
                index ++;

            if (index < 1) ***REMOVED***
                tokenRe.lastIndex = 0;
                 while ((ch = rightOfCursor[index]) && !tokenRe.test(ch)) ***REMOVED***
                    tokenRe.lastIndex = 0;
                    index ++;
                    if (whitespaceRe.test(ch)) ***REMOVED***
                        if (index > 2) ***REMOVED***
                            index--
                            break;
                    ***REMOVED*** else ***REMOVED***
                            while ((ch = rightOfCursor[index]) && whitespaceRe.test(ch))
                                index ++;
                            if (index > 2)
                                break
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        tokenRe.lastIndex = 0;

        return index;
***REMOVED***;

    this.moveCursorShortWordRight = function() ***REMOVED***
        var row = this.lead.row;
        var column = this.lead.column;
        var line = this.doc.getLine(row);
        var rightOfCursor = line.substring(column);

        var fold = this.session.getFoldAt(row, column, 1);
        if (fold)
            return this.moveCursorTo(fold.end.row, fold.end.column);

        if (column == line.length) ***REMOVED***
            var l = this.doc.getLength();
            do ***REMOVED***
                row++;
                rightOfCursor = this.doc.getLine(row)
        ***REMOVED*** while (row < l && /^\s*$/.test(rightOfCursor))

            if (!/^\s+/.test(rightOfCursor))
                rightOfCursor = ""
            column = 0;
    ***REMOVED***

        var index = this.$shortWordEndIndex(rightOfCursor);

        this.moveCursorTo(row, column + index);
***REMOVED***;

    this.moveCursorShortWordLeft = function() ***REMOVED***
        var row = this.lead.row;
        var column = this.lead.column;

        var fold;
        if (fold = this.session.getFoldAt(row, column, -1))
            return this.moveCursorTo(fold.start.row, fold.start.column);

        var line = this.session.getLine(row).substring(0, column);
        if (column == 0) ***REMOVED***
            do ***REMOVED***
                row--;
                line = this.doc.getLine(row);
        ***REMOVED*** while (row > 0 && /^\s*$/.test(line))

            column = line.length;
            if (!/\s+$/.test(line))
                line = ""
    ***REMOVED***

        var leftOfCursor = lang.stringReverse(line);
        var index = this.$shortWordEndIndex(leftOfCursor);

        return this.moveCursorTo(row, column - index);
***REMOVED***;

    this.moveCursorWordRight = function() ***REMOVED***
        if (this.session.$selectLongWords)
            this.moveCursorLongWordRight();
        else
            this.moveCursorShortWordRight();
***REMOVED***;

    this.moveCursorWordLeft = function() ***REMOVED***
        if (this.session.$selectLongWords)
            this.moveCursorLongWordLeft();
        else
            this.moveCursorShortWordLeft();
***REMOVED***;
    this.moveCursorBy = function(rows, chars) ***REMOVED***
        var screenPos = this.session.documentToScreenPosition(
            this.lead.row,
            this.lead.column
        );

        if (chars === 0) ***REMOVED***
            if (this.$desiredColumn)
                screenPos.column = this.$desiredColumn;
            else
                this.$desiredColumn = screenPos.column;
    ***REMOVED***

        var docPos = this.session.screenToDocumentPosition(screenPos.row + rows, screenPos.column);
        this.moveCursorTo(docPos.row, docPos.column + chars, chars === 0);
***REMOVED***;
    this.moveCursorToPosition = function(position) ***REMOVED***
        this.moveCursorTo(position.row, position.column);
***REMOVED***;
    this.moveCursorTo = function(row, column, keepDesiredColumn) ***REMOVED***
        var fold = this.session.getFoldAt(row, column, 1);
        if (fold) ***REMOVED***
            row = fold.start.row;
            column = fold.start.column;
    ***REMOVED***

        this.$keepDesiredColumnOnChange = true;
        this.lead.setPosition(row, column);
        this.$keepDesiredColumnOnChange = false;

        if (!keepDesiredColumn)
            this.$desiredColumn = null;
***REMOVED***;
    this.moveCursorToScreen = function(row, column, keepDesiredColumn) ***REMOVED***
        var pos = this.session.screenToDocumentPosition(row, column);
        this.moveCursorTo(pos.row, pos.column, keepDesiredColumn);
***REMOVED***;
    this.detach = function() ***REMOVED***
        this.lead.detach();
        this.anchor.detach();
        this.session = this.doc = null;
***REMOVED***

    this.fromOrientedRange = function(range) ***REMOVED***
        this.setSelectionRange(range, range.cursor == range.start);
        this.$desiredColumn = range.desiredColumn || this.$desiredColumn;
***REMOVED***

    this.toOrientedRange = function(range) ***REMOVED***
        var r = this.getRange();
        if (range) ***REMOVED***
            range.start.column = r.start.column;
            range.start.row = r.start.row;
            range.end.column = r.end.column;
            range.end.row = r.end.row;
    ***REMOVED*** else ***REMOVED***
            range = r;
    ***REMOVED***

        range.cursor = this.isBackwards() ? range.start : range.end;
        range.desiredColumn = this.$desiredColumn;
        return range;
***REMOVED***

    this.toJSON = function() ***REMOVED***
        if (this.rangeCount) ***REMOVED***
            var data = this.ranges.map(function(r) ***REMOVED***
                var r1 = r.clone();
                r1.isBackwards = r.cursor == r.start;
                return r1;
        ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
            var data = this.getRange();
            data.isBackwards = this.isBackwards();
    ***REMOVED***
        return data;
***REMOVED***;

    this.fromJSON = function(data) ***REMOVED***
        if (data.start == undefined) ***REMOVED***
            if (this.rangeList) ***REMOVED***
                this.toSingleRange(data[0]);
                for (var i = data.length; i--; ) ***REMOVED***
                    var r = Range.fromPoints(data[i].start, data[i].end);
                    if (data.isBackwards)
                        r.cursor = r.start;
                    this.addRange(r, true);
            ***REMOVED***
                return;
        ***REMOVED*** else
                data = data[0];
    ***REMOVED***
        if (this.rangeList)
            this.toSingleRange(data);
        this.setSelectionRange(data, data.isBackwards);
***REMOVED***;

    this.isEqual = function(data) ***REMOVED***
        if ((data.length || this.rangeCount) && data.length != this.rangeCount)
            return false;
        if (!data.length || !this.ranges)
            return this.getRange().isEqual(data);

        for (var i = this.ranges.length; i--; ) ***REMOVED***
            if (!this.ranges[i].isEqual(data[i]))
                return false
    ***REMOVED***
        return true;
***REMOVED***

***REMOVED***).call(Selection.prototype);

exports.Selection = Selection;
***REMOVED***);

define('ace/range', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***

var comparePoints = function(p1, p2) ***REMOVED***
    return p1.row - p2.row || p1.column - p2.column;
***REMOVED***;
var Range = function(startRow, startColumn, endRow, endColumn) ***REMOVED***
    this.start = ***REMOVED***
        row: startRow,
        column: startColumn
***REMOVED***;

    this.end = ***REMOVED***
        row: endRow,
        column: endColumn
***REMOVED***;
***REMOVED***;

(function() ***REMOVED***
    this.isEqual = function(range) ***REMOVED***
        return this.start.row === range.start.row &&
            this.end.row === range.end.row &&
            this.start.column === range.start.column &&
            this.end.column === range.end.column;
***REMOVED***;
    this.toString = function() ***REMOVED***
        return ("Range: [" + this.start.row + "/" + this.start.column +
            "] -> [" + this.end.row + "/" + this.end.column + "]");
***REMOVED***;

    this.contains = function(row, column) ***REMOVED***
        return this.compare(row, column) == 0;
***REMOVED***;
    this.compareRange = function(range) ***REMOVED***
        var cmp,
            end = range.end,
            start = range.start;

        cmp = this.compare(end.row, end.column);
        if (cmp == 1) ***REMOVED***
            cmp = this.compare(start.row, start.column);
            if (cmp == 1) ***REMOVED***
                return 2;
        ***REMOVED*** else if (cmp == 0) ***REMOVED***
                return 1;
        ***REMOVED*** else ***REMOVED***
                return 0;
        ***REMOVED***
    ***REMOVED*** else if (cmp == -1) ***REMOVED***
            return -2;
    ***REMOVED*** else ***REMOVED***
            cmp = this.compare(start.row, start.column);
            if (cmp == -1) ***REMOVED***
                return -1;
        ***REMOVED*** else if (cmp == 1) ***REMOVED***
                return 42;
        ***REMOVED*** else ***REMOVED***
                return 0;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    this.comparePoint = function(p) ***REMOVED***
        return this.compare(p.row, p.column);
***REMOVED***;
    this.containsRange = function(range) ***REMOVED***
        return this.comparePoint(range.start) == 0 && this.comparePoint(range.end) == 0;
***REMOVED***;
    this.intersects = function(range) ***REMOVED***
        var cmp = this.compareRange(range);
        return (cmp == -1 || cmp == 0 || cmp == 1);
***REMOVED***;
    this.isEnd = function(row, column) ***REMOVED***
        return this.end.row == row && this.end.column == column;
***REMOVED***;
    this.isStart = function(row, column) ***REMOVED***
        return this.start.row == row && this.start.column == column;
***REMOVED***;
    this.setStart = function(row, column) ***REMOVED***
        if (typeof row == "object") ***REMOVED***
            this.start.column = row.column;
            this.start.row = row.row;
    ***REMOVED*** else ***REMOVED***
            this.start.row = row;
            this.start.column = column;
    ***REMOVED***
***REMOVED***;
    this.setEnd = function(row, column) ***REMOVED***
        if (typeof row == "object") ***REMOVED***
            this.end.column = row.column;
            this.end.row = row.row;
    ***REMOVED*** else ***REMOVED***
            this.end.row = row;
            this.end.column = column;
    ***REMOVED***
***REMOVED***;
    this.inside = function(row, column) ***REMOVED***
        if (this.compare(row, column) == 0) ***REMOVED***
            if (this.isEnd(row, column) || this.isStart(row, column)) ***REMOVED***
                return false;
        ***REMOVED*** else ***REMOVED***
                return true;
        ***REMOVED***
    ***REMOVED***
        return false;
***REMOVED***;
    this.insideStart = function(row, column) ***REMOVED***
        if (this.compare(row, column) == 0) ***REMOVED***
            if (this.isEnd(row, column)) ***REMOVED***
                return false;
        ***REMOVED*** else ***REMOVED***
                return true;
        ***REMOVED***
    ***REMOVED***
        return false;
***REMOVED***;
    this.insideEnd = function(row, column) ***REMOVED***
        if (this.compare(row, column) == 0) ***REMOVED***
            if (this.isStart(row, column)) ***REMOVED***
                return false;
        ***REMOVED*** else ***REMOVED***
                return true;
        ***REMOVED***
    ***REMOVED***
        return false;
***REMOVED***;
    this.compare = function(row, column) ***REMOVED***
        if (!this.isMultiLine()) ***REMOVED***
            if (row === this.start.row) ***REMOVED***
                return column < this.start.column ? -1 : (column > this.end.column ? 1 : 0);
        ***REMOVED***;
    ***REMOVED***

        if (row < this.start.row)
            return -1;

        if (row > this.end.row)
            return 1;

        if (this.start.row === row)
            return column >= this.start.column ? 0 : -1;

        if (this.end.row === row)
            return column <= this.end.column ? 0 : 1;

        return 0;
***REMOVED***;
    this.compareStart = function(row, column) ***REMOVED***
        if (this.start.row == row && this.start.column == column) ***REMOVED***
            return -1;
    ***REMOVED*** else ***REMOVED***
            return this.compare(row, column);
    ***REMOVED***
***REMOVED***;
    this.compareEnd = function(row, column) ***REMOVED***
        if (this.end.row == row && this.end.column == column) ***REMOVED***
            return 1;
    ***REMOVED*** else ***REMOVED***
            return this.compare(row, column);
    ***REMOVED***
***REMOVED***;
    this.compareInside = function(row, column) ***REMOVED***
        if (this.end.row == row && this.end.column == column) ***REMOVED***
            return 1;
    ***REMOVED*** else if (this.start.row == row && this.start.column == column) ***REMOVED***
            return -1;
    ***REMOVED*** else ***REMOVED***
            return this.compare(row, column);
    ***REMOVED***
***REMOVED***;
    this.clipRows = function(firstRow, lastRow) ***REMOVED***
        if (this.end.row > lastRow)
            var end = ***REMOVED***row: lastRow + 1, column: 0***REMOVED***;
        else if (this.end.row < firstRow)
            var end = ***REMOVED***row: firstRow, column: 0***REMOVED***;

        if (this.start.row > lastRow)
            var start = ***REMOVED***row: lastRow + 1, column: 0***REMOVED***;
        else if (this.start.row < firstRow)
            var start = ***REMOVED***row: firstRow, column: 0***REMOVED***;

        return Range.fromPoints(start || this.start, end || this.end);
***REMOVED***;
    this.extend = function(row, column) ***REMOVED***
        var cmp = this.compare(row, column);

        if (cmp == 0)
            return this;
        else if (cmp == -1)
            var start = ***REMOVED***row: row, column: column***REMOVED***;
        else
            var end = ***REMOVED***row: row, column: column***REMOVED***;

        return Range.fromPoints(start || this.start, end || this.end);
***REMOVED***;

    this.isEmpty = function() ***REMOVED***
        return (this.start.row === this.end.row && this.start.column === this.end.column);
***REMOVED***;
    this.isMultiLine = function() ***REMOVED***
        return (this.start.row !== this.end.row);
***REMOVED***;
    this.clone = function() ***REMOVED***
        return Range.fromPoints(this.start, this.end);
***REMOVED***;
    this.collapseRows = function() ***REMOVED***
        if (this.end.column == 0)
            return new Range(this.start.row, 0, Math.max(this.start.row, this.end.row-1), 0)
        else
            return new Range(this.start.row, 0, this.end.row, 0)
***REMOVED***;
    this.toScreenRange = function(session) ***REMOVED***
        var screenPosStart = session.documentToScreenPosition(this.start);
        var screenPosEnd = session.documentToScreenPosition(this.end);

        return new Range(
            screenPosStart.row, screenPosStart.column,
            screenPosEnd.row, screenPosEnd.column
        );
***REMOVED***;
    this.moveBy = function(row, column) ***REMOVED***
        this.start.row += row;
        this.start.column += column;
        this.end.row += row;
        this.end.column += column;
***REMOVED***;

***REMOVED***).call(Range.prototype);
Range.fromPoints = function(start, end) ***REMOVED***
    return new Range(start.row, start.column, end.row, end.column);
***REMOVED***;
Range.comparePoints = comparePoints;

Range.comparePoints = function(p1, p2) ***REMOVED***
    return p1.row - p2.row || p1.column - p2.column;
***REMOVED***;


exports.Range = Range;
***REMOVED***);

define('ace/mode/text', ['require', 'exports', 'module' , 'ace/tokenizer', 'ace/mode/text_highlight_rules', 'ace/mode/behaviour', 'ace/unicode', 'ace/lib/lang', 'ace/token_iterator', 'ace/range'], function(require, exports, module) ***REMOVED***


var Tokenizer = require("../tokenizer").Tokenizer;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var Behaviour = require("./behaviour").Behaviour;
var unicode = require("../unicode");
var lang = require("../lib/lang");
var TokenIterator = require("../token_iterator").TokenIterator;
var Range = require("../range").Range;

var Mode = function() ***REMOVED***
    this.HighlightRules = TextHighlightRules;
    this.$behaviour = new Behaviour();
***REMOVED***;

(function() ***REMOVED***

    this.tokenRe = new RegExp("^["
        + unicode.packages.L
        + unicode.packages.Mn + unicode.packages.Mc
        + unicode.packages.Nd
        + unicode.packages.Pc + "\\$_]+", "g"
    );

    this.nonTokenRe = new RegExp("^(?:[^"
        + unicode.packages.L
        + unicode.packages.Mn + unicode.packages.Mc
        + unicode.packages.Nd
        + unicode.packages.Pc + "\\$_]|\s])+", "g"
    );

    this.getTokenizer = function() ***REMOVED***
        if (!this.$tokenizer) ***REMOVED***
            this.$highlightRules = new this.HighlightRules();
            this.$tokenizer = new Tokenizer(this.$highlightRules.getRules());
    ***REMOVED***
        return this.$tokenizer;
***REMOVED***;

    this.lineCommentStart = "";
    this.blockComment = "";

    this.toggleCommentLines = function(state, session, startRow, endRow) ***REMOVED***
        var doc = session.doc;

        var ignoreBlankLines = true;
        var shouldRemove = true;
        var minIndent = Infinity;
        var tabSize = session.getTabSize();
        var insertAtTabStop = false;

        if (!this.lineCommentStart) ***REMOVED***
            if (!this.blockComment)
                return false;
            var lineCommentStart = this.blockComment.start;
            var lineCommentEnd = this.blockComment.end;
            var regexpStart = new RegExp("^(\\s*)(?:" + lang.escapeRegExp(lineCommentStart) + ")");
            var regexpEnd = new RegExp("(?:" + lang.escapeRegExp(lineCommentEnd) + ")\\s*$");

            var comment = function(line, i) ***REMOVED***
                if (testRemove(line, i))
                    return;
                if (!ignoreBlankLines || /\S/.test(line)) ***REMOVED***
                    doc.insertInLine(***REMOVED***row: i, column: line.length***REMOVED***, lineCommentEnd);
                    doc.insertInLine(***REMOVED***row: i, column: minIndent***REMOVED***, lineCommentStart);
            ***REMOVED***
        ***REMOVED***;

            var uncomment = function(line, i) ***REMOVED***
                var m;
                if (m = line.match(regexpEnd))
                    doc.removeInLine(i, line.length - m[0].length, line.length);
                if (m = line.match(regexpStart))
                    doc.removeInLine(i, m[1].length, m[0].length);
        ***REMOVED***;

            var testRemove = function(line, row) ***REMOVED***
                if (regexpStart.test(line))
                    return true;
                var tokens = session.getTokens(row);
                for (var i = 0; i < tokens.length; i++) ***REMOVED***
                    if (tokens[i].type === 'comment')
                        return true;
            ***REMOVED***
        ***REMOVED***;
    ***REMOVED*** else ***REMOVED***
            if (Array.isArray(this.lineCommentStart)) ***REMOVED***
                var regexpStart = this.lineCommentStart.map(lang.escapeRegExp).join("|");
                var lineCommentStart = this.lineCommentStart[0];
        ***REMOVED*** else ***REMOVED***
                var regexpStart = lang.escapeRegExp(this.lineCommentStart);
                var lineCommentStart = this.lineCommentStart;
        ***REMOVED***
            regexpStart = new RegExp("^(\\s*)(?:" + regexpStart + ") ?");
            
            insertAtTabStop = session.getUseSoftTabs();

            var uncomment = function(line, i) ***REMOVED***
                var m = line.match(regexpStart);
                if (!m) return;
                var start = m[1].length, end = m[0].length;
                if (!shouldInsertSpace(line, start, end) && m[0][end - 1] == " ")
                    end--;
                doc.removeInLine(i, start, end);
        ***REMOVED***;
            var commentWithSpace = lineCommentStart + " ";
            var comment = function(line, i) ***REMOVED***
                if (!ignoreBlankLines || /\S/.test(line)) ***REMOVED***
                    if (shouldInsertSpace(line, minIndent, minIndent))
                        doc.insertInLine(***REMOVED***row: i, column: minIndent***REMOVED***, commentWithSpace);
                    else
                        doc.insertInLine(***REMOVED***row: i, column: minIndent***REMOVED***, lineCommentStart);
            ***REMOVED***
        ***REMOVED***;
            var testRemove = function(line, i) ***REMOVED***
                return regexpStart.test(line);
        ***REMOVED***;
            
            var shouldInsertSpace = function(line, before, after) ***REMOVED***
                var spaces = 0;
                while (before-- && line.charAt(before) == " ")
                    spaces++;
                if (spaces % tabSize != 0)
                    return false;
                var spaces = 0;
                while (line.charAt(after++) == " ")
                    spaces++;
                if (tabSize > 2)
                    return spaces % tabSize != tabSize - 1;
                else
                    return spaces % tabSize == 0;
                return true;
        ***REMOVED***;
    ***REMOVED***

        function iter(fun) ***REMOVED***
            for (var i = startRow; i <= endRow; i++)
                fun(doc.getLine(i), i);
    ***REMOVED***


        var minEmptyLength = Infinity;
        iter(function(line, i) ***REMOVED***
            var indent = line.search(/\S/);
            if (indent !== -1) ***REMOVED***
                if (indent < minIndent)
                    minIndent = indent;
                if (shouldRemove && !testRemove(line, i))
                    shouldRemove = false;
        ***REMOVED*** else if (minEmptyLength > line.length) ***REMOVED***
                minEmptyLength = line.length;
        ***REMOVED***
    ***REMOVED***);

        if (minIndent == Infinity) ***REMOVED***
            minIndent = minEmptyLength;
            ignoreBlankLines = false;
            shouldRemove = false;
    ***REMOVED***

        if (insertAtTabStop && minIndent % tabSize != 0)
            minIndent = Math.floor(minIndent / tabSize) * tabSize;

        iter(shouldRemove ? uncomment : comment);
***REMOVED***;

    this.toggleBlockComment = function(state, session, range, cursor) ***REMOVED***
        var comment = this.blockComment;
        if (!comment)
            return;
        if (!comment.start && comment[0])
            comment = comment[0];

        var iterator = new TokenIterator(session, cursor.row, cursor.column);
        var token = iterator.getCurrentToken();

        var sel = session.selection;
        var initialRange = session.selection.toOrientedRange();
        var startRow, colDiff;

        if (token && /comment/.test(token.type)) ***REMOVED***
            var startRange, endRange;
            while (token && /comment/.test(token.type)) ***REMOVED***
                var i = token.value.indexOf(comment.start);
                if (i != -1) ***REMOVED***
                    var row = iterator.getCurrentTokenRow();
                    var column = iterator.getCurrentTokenColumn() + i;
                    startRange = new Range(row, column, row, column + comment.start.length);
                    break
            ***REMOVED***
                token = iterator.stepBackward();
        ***REMOVED***;

            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();
            while (token && /comment/.test(token.type)) ***REMOVED***
                var i = token.value.indexOf(comment.end);
                if (i != -1) ***REMOVED***
                    var row = iterator.getCurrentTokenRow();
                    var column = iterator.getCurrentTokenColumn() + i;
                    endRange = new Range(row, column, row, column + comment.end.length);
                    break;
            ***REMOVED***
                token = iterator.stepForward();
        ***REMOVED***
            if (endRange)
                session.remove(endRange);
            if (startRange) ***REMOVED***
                session.remove(startRange);
                startRow = startRange.start.row;
                colDiff = -comment.start.length
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            colDiff = comment.start.length
            startRow = range.start.row;
            session.insert(range.end, comment.end);
            session.insert(range.start, comment.start);
    ***REMOVED***
        if (initialRange.start.row == startRow)
            initialRange.start.column += colDiff;
        if (initialRange.end.row == startRow)
            initialRange.end.column += colDiff;
        session.selection.fromOrientedRange(initialRange);
***REMOVED***;

    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        return this.$getIndent(line);
***REMOVED***;

    this.checkOutdent = function(state, line, input) ***REMOVED***
        return false;
***REMOVED***;

    this.autoOutdent = function(state, doc, row) ***REMOVED***
***REMOVED***;

    this.$getIndent = function(line) ***REMOVED***
        return line.match(/^\s*/)[0];
***REMOVED***;

    this.createWorker = function(session) ***REMOVED***
        return null;
***REMOVED***;

    this.createModeDelegates = function (mapping) ***REMOVED***
        this.$embeds = [];
        this.$modes = ***REMOVED******REMOVED***;
        for (var i in mapping) ***REMOVED***
            if (mapping[i]) ***REMOVED***
                this.$embeds.push(i);
                this.$modes[i] = new mapping[i]();
        ***REMOVED***
    ***REMOVED***

        var delegations = ['toggleCommentLines', 'getNextLineIndent', 'checkOutdent', 'autoOutdent', 'transformAction', 'getCompletions'];

        for (var i = 0; i < delegations.length; i++) ***REMOVED***
            (function(scope) ***REMOVED***
              var functionName = delegations[i];
              var defaultHandler = scope[functionName];
              scope[delegations[i]] = function() ***REMOVED***
                  return this.$delegator(functionName, arguments, defaultHandler);
          ***REMOVED***
        ***REMOVED*** (this));
    ***REMOVED***
***REMOVED***;

    this.$delegator = function(method, args, defaultHandler) ***REMOVED***
        var state = args[0];
        if (typeof state != "string")
            state = state[0];
        for (var i = 0; i < this.$embeds.length; i++) ***REMOVED***
            if (!this.$modes[this.$embeds[i]]) continue;

            var split = state.split(this.$embeds[i]);
            if (!split[0] && split[1]) ***REMOVED***
                args[0] = split[1];
                var mode = this.$modes[this.$embeds[i]];
                return mode[method].apply(mode, args);
        ***REMOVED***
    ***REMOVED***
        var ret = defaultHandler.apply(this, args);
        return defaultHandler ? ret : undefined;
***REMOVED***;

    this.transformAction = function(state, action, editor, session, param) ***REMOVED***
        if (this.$behaviour) ***REMOVED***
            var behaviours = this.$behaviour.getBehaviours();
            for (var key in behaviours) ***REMOVED***
                if (behaviours[key][action]) ***REMOVED***
                    var ret = behaviours[key][action].apply(this, arguments);
                    if (ret) ***REMOVED***
                        return ret;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    
    this.getKeywords = function(append) ***REMOVED***
        if (!this.completionKeywords) ***REMOVED***
            var rules = this.$tokenizer.rules;
            var completionKeywords = [];
            for (var rule in rules) ***REMOVED***
                var ruleItr = rules[rule];
                for (var r = 0, l = ruleItr.length; r < l; r++) ***REMOVED***
                    if (typeof ruleItr[r].token === "string") ***REMOVED***
                        if (/keyword|support|storage/.test(ruleItr[r].token))
                            completionKeywords.push(ruleItr[r].regex);
                ***REMOVED***
                    else if (typeof ruleItr[r].token === "object") ***REMOVED***
                        for (var a = 0, aLength = ruleItr[r].token.length; a < aLength; a++) ***REMOVED***    
                            if (/keyword|support|storage/.test(ruleItr[r].token[a])) ***REMOVED***
                                var rule = ruleItr[r].regex.match(/\(.+?\)/g)[a];
                                completionKeywords.push(rule.substr(1, rule.length - 2));
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
            this.completionKeywords = completionKeywords;
    ***REMOVED***
        if (!append)
            return this.$keywordList;
        return completionKeywords.concat(this.$keywordList || []);
***REMOVED***;
    
    this.$createKeywordList = function() ***REMOVED***
        if (!this.$highlightRules)
            this.getTokenizer();
        return this.$keywordList = this.$highlightRules.$keywordList || [];
***REMOVED***

    this.getCompletions = function(state, session, pos, prefix) ***REMOVED***
        var keywords = this.$keywordList || this.$createKeywordList();
        return keywords.map(function(word) ***REMOVED***
            return ***REMOVED***
                name: word,
                value: word,
                score: 0,
                meta: "keyword"
        ***REMOVED***;
    ***REMOVED***);
***REMOVED***;

***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/tokenizer', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
var MAX_TOKEN_COUNT = 1000;
var Tokenizer = function(rules) ***REMOVED***
    this.states = rules;

    this.regExps = ***REMOVED******REMOVED***;
    this.matchMappings = ***REMOVED******REMOVED***;
    for (var key in this.states) ***REMOVED***
        var state = this.states[key];
        var ruleRegExps = [];
        var matchTotal = 0;
        var mapping = this.matchMappings[key] = ***REMOVED***defaultToken: "text"***REMOVED***;
        var flag = "g";

        var splitterRurles = [];
        for (var i = 0; i < state.length; i++) ***REMOVED***
            var rule = state[i];
            if (rule.defaultToken)
                mapping.defaultToken = rule.defaultToken;
            if (rule.caseInsensitive)
                flag = "gi";
            if (rule.regex == null)
                continue;

            if (rule.regex instanceof RegExp)
                rule.regex = rule.regex.toString().slice(1, -1);
            var adjustedregex = rule.regex;
            var matchcount = new RegExp("(?:(" + adjustedregex + ")|(.))").exec("a").length - 2;
            if (Array.isArray(rule.token)) ***REMOVED***
                if (rule.token.length == 1 || matchcount == 1) ***REMOVED***
                    rule.token = rule.token[0];
            ***REMOVED*** else if (matchcount - 1 != rule.token.length) ***REMOVED***
                    throw new Error("number of classes and regexp groups in '" + 
                        rule.token + "'\n'" + rule.regex +  "' doesn't match\n"
                        + (matchcount - 1) + "!=" + rule.token.length);
            ***REMOVED*** else ***REMOVED***
                    rule.tokenArray = rule.token;
                    rule.token = null;
                    rule.onMatch = this.$arrayTokens;
            ***REMOVED***
        ***REMOVED*** else if (typeof rule.token == "function" && !rule.onMatch) ***REMOVED***
                if (matchcount > 1)
                    rule.onMatch = this.$applyToken;
                else
                    rule.onMatch = rule.token;
        ***REMOVED***

            if (matchcount > 1) ***REMOVED***
                if (/\\\d/.test(rule.regex)) ***REMOVED***
                    adjustedregex = rule.regex.replace(/\\([0-9]+)/g, function (match, digit) ***REMOVED***
                        return "\\" + (parseInt(digit, 10) + matchTotal + 1);
                ***REMOVED***);
            ***REMOVED*** else ***REMOVED***
                    matchcount = 1;
                    adjustedregex = this.removeCapturingGroups(rule.regex);
            ***REMOVED***
                if (!rule.splitRegex && typeof rule.token != "string")
                    splitterRurles.push(rule); // flag will be known only at the very end
        ***REMOVED***

            mapping[matchTotal] = i;
            matchTotal += matchcount;

            ruleRegExps.push(adjustedregex);
            if (!rule.onMatch)
                rule.onMatch = null;
            rule.__proto__ = null;
    ***REMOVED***
        
        splitterRurles.forEach(function(rule) ***REMOVED***
            rule.splitRegex = this.createSplitterRegexp(rule.regex, flag);
    ***REMOVED*** this);

        this.regExps[key] = new RegExp("(" + ruleRegExps.join(")|(") + ")|($)", flag);
***REMOVED***
***REMOVED***;

(function() ***REMOVED***
    this.$setMaxTokenCount = function(m) ***REMOVED***
        MAX_TOKEN_COUNT = m | 0;
***REMOVED***;
    
    this.$applyToken = function(str) ***REMOVED***
        var values = this.splitRegex.exec(str).slice(1);
        var types = this.token.apply(this, values);
        if (typeof types === "string")
            return [***REMOVED***type: types, value: str***REMOVED***];

        var tokens = [];
        for (var i = 0, l = types.length; i < l; i++) ***REMOVED***
            if (values[i])
                tokens[tokens.length] = ***REMOVED***
                    type: types[i],
                    value: values[i]
            ***REMOVED***;
    ***REMOVED***
        return tokens;
***REMOVED***

    this.$arrayTokens = function(str) ***REMOVED***
        if (!str)
            return [];
        var values = this.splitRegex.exec(str);
        if (!values)
            return "text";
        var tokens = [];
        var types = this.tokenArray;
        for (var i = 0, l = types.length; i < l; i++) ***REMOVED***
            if (values[i + 1])
                tokens[tokens.length] = ***REMOVED***
                    type: types[i],
                    value: values[i + 1]
            ***REMOVED***;
    ***REMOVED***
        return tokens;
***REMOVED***;

    this.removeCapturingGroups = function(src) ***REMOVED***
        var r = src.replace(
            /\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g,
            function(x, y) ***REMOVED***return y ? "(?:" : x;***REMOVED***
        );
        return r;
***REMOVED***;

    this.createSplitterRegexp = function(src, flag) ***REMOVED***
        if (src.indexOf("(?=") != -1) ***REMOVED***
            var stack = 0;
            var inChClass = false;
            var lastCapture = ***REMOVED******REMOVED***;
            src.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function(
                m, esc, parenOpen, parenClose, square, index
            ) ***REMOVED***
                if (inChClass) ***REMOVED***
                    inChClass = square != "]";
            ***REMOVED*** else if (square) ***REMOVED***
                    inChClass = true;
            ***REMOVED*** else if (parenClose) ***REMOVED***
                    if (stack == lastCapture.stack) ***REMOVED***
                        lastCapture.end = index+1;
                        lastCapture.stack = -1;
                ***REMOVED***
                    stack--;
            ***REMOVED*** else if (parenOpen) ***REMOVED***
                    stack++;
                    if (parenOpen.length != 1) ***REMOVED***
                        lastCapture.stack = stack
                        lastCapture.start = index;
                ***REMOVED***
            ***REMOVED***
                return m;
        ***REMOVED***);

            if (lastCapture.end != null && /^\)*$/.test(src.substr(lastCapture.end)))
                src = src.substring(0, lastCapture.start) + src.substr(lastCapture.end);
    ***REMOVED***
        return new RegExp(src, (flag||"").replace("g", ""));
***REMOVED***;
    this.getLineTokens = function(line, startState) ***REMOVED***
        if (startState && typeof startState != "string") ***REMOVED***
            var stack = startState.slice(0);
            startState = stack[0];
    ***REMOVED*** else
            var stack = [];

        var currentState = startState || "start";
        var state = this.states[currentState];
        var mapping = this.matchMappings[currentState];
        var re = this.regExps[currentState];
        re.lastIndex = 0;

        var match, tokens = [];
        var lastIndex = 0;

        var token = ***REMOVED***type: null, value: ""***REMOVED***;

        while (match = re.exec(line)) ***REMOVED***
            var type = mapping.defaultToken;
            var rule = null;
            var value = match[0];
            var index = re.lastIndex;

            if (index - value.length > lastIndex) ***REMOVED***
                var skipped = line.substring(lastIndex, index - value.length);
                if (token.type == type) ***REMOVED***
                    token.value += skipped;
            ***REMOVED*** else ***REMOVED***
                    if (token.type)
                        tokens.push(token);
                    token = ***REMOVED***type: type, value: skipped***REMOVED***;
            ***REMOVED***
        ***REMOVED***

            for (var i = 0; i < match.length-2; i++) ***REMOVED***
                if (match[i + 1] === undefined)
                    continue;

                rule = state[mapping[i]];

                if (rule.onMatch)
                    type = rule.onMatch(value, currentState, stack);
                else
                    type = rule.token;

                if (rule.next) ***REMOVED***
                    if (typeof rule.next == "string")
                        currentState = rule.next;
                    else
                        currentState = rule.next(currentState, stack);

                    state = this.states[currentState];
                    if (!state) ***REMOVED***
                        window.console && console.error && console.error(currentState, "doesn't exist");
                        currentState = "start";
                        state = this.states[currentState];
                ***REMOVED***
                    mapping = this.matchMappings[currentState];
                    lastIndex = index;
                    re = this.regExps[currentState];
                    re.lastIndex = index;
            ***REMOVED***
                break;
        ***REMOVED***

            if (value) ***REMOVED***
                if (typeof type == "string") ***REMOVED***
                    if ((!rule || rule.merge !== false) && token.type === type) ***REMOVED***
                        token.value += value;
                ***REMOVED*** else ***REMOVED***
                        if (token.type)
                            tokens.push(token);
                        token = ***REMOVED***type: type, value: value***REMOVED***;
                ***REMOVED***
            ***REMOVED*** else if (type) ***REMOVED***
                    if (token.type)
                        tokens.push(token);
                    token = ***REMOVED***type: null, value: ""***REMOVED***;
                    for (var i = 0; i < type.length; i++)
                        tokens.push(type[i]);
            ***REMOVED***
        ***REMOVED***

            if (lastIndex == line.length)
                break;

            lastIndex = index;

            if (tokens.length > MAX_TOKEN_COUNT) ***REMOVED***
                while (lastIndex < line.length) ***REMOVED***
                    if (token.type)
                        tokens.push(token);
                    token = ***REMOVED***
                        value: line.substring(lastIndex, lastIndex += 2000),
                        type: "overflow"
                ***REMOVED***    
            ***REMOVED***
                currentState = "start";
                stack = [];
                break;
        ***REMOVED***
    ***REMOVED***

        if (token.type)
            tokens.push(token);

        return ***REMOVED***
            tokens : tokens,
            state : stack.length ? stack : currentState
    ***REMOVED***;
***REMOVED***;

***REMOVED***).call(Tokenizer.prototype);

exports.Tokenizer = Tokenizer;
***REMOVED***);

define('ace/mode/text_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/lang'], function(require, exports, module) ***REMOVED***


var lang = require("../lib/lang");

var TextHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED***
        "start" : [***REMOVED***
            token : "empty_line",
            regex : '^$'
    ***REMOVED*** ***REMOVED***
            defaultToken : "text"
    ***REMOVED***]
***REMOVED***;
***REMOVED***;

(function() ***REMOVED***

    this.addRules = function(rules, prefix) ***REMOVED***
        if (!prefix) ***REMOVED***
            for (var key in rules)
                this.$rules[key] = rules[key];
            return;
    ***REMOVED***
        for (var key in rules) ***REMOVED***
            var state = rules[key];
            for (var i = 0; i < state.length; i++) ***REMOVED***
                var rule = state[i];
                if (rule.next) ***REMOVED***
                    if (typeof rule.next != "string") ***REMOVED***
                        if (rule.nextState && rule.nextState.indexOf(prefix) !== 0)
                            rule.nextState = prefix + rule.nextState;
                ***REMOVED*** else ***REMOVED***
                        if (rule.next.indexOf(prefix) !== 0)
                            rule.next = prefix + rule.next;
                ***REMOVED***

            ***REMOVED***
        ***REMOVED***
            this.$rules[prefix + key] = state;
    ***REMOVED***
***REMOVED***;

    this.getRules = function() ***REMOVED***
        return this.$rules;
***REMOVED***;

    this.embedRules = function (HighlightRules, prefix, escapeRules, states, append) ***REMOVED***
        var embedRules = new HighlightRules().getRules();
        if (states) ***REMOVED***
            for (var i = 0; i < states.length; i++)
                states[i] = prefix + states[i];
    ***REMOVED*** else ***REMOVED***
            states = [];
            for (var key in embedRules)
                states.push(prefix + key);
    ***REMOVED***

        this.addRules(embedRules, prefix);

        if (escapeRules) ***REMOVED***
            var addRules = Array.prototype[append ? "push" : "unshift"];
            for (var i = 0; i < states.length; i++)
                addRules.apply(this.$rules[states[i]], lang.deepCopy(escapeRules));
    ***REMOVED***

        if (!this.$embeds)
            this.$embeds = [];
        this.$embeds.push(prefix);
***REMOVED***;

    this.getEmbeds = function() ***REMOVED***
        return this.$embeds;
***REMOVED***;

    var pushState = function(currentState, stack) ***REMOVED***
        if (currentState != "start")
            stack.unshift(this.nextState, currentState);
        return this.nextState;
***REMOVED***;
    var popState = function(currentState, stack) ***REMOVED***
        if (stack[0] !== currentState)
            return "start";
        stack.shift();
        return stack.shift();
***REMOVED***;

    this.normalizeRules = function() ***REMOVED***
        var id = 0;
        var rules = this.$rules;
        function processState(key) ***REMOVED***
            var state = rules[key];
            state.processed = true;
            for (var i = 0; i < state.length; i++) ***REMOVED***
                var rule = state[i];
                if (!rule.regex && rule.start) ***REMOVED***
                    rule.regex = rule.start;
                    if (!rule.next)
                        rule.next = [];
                    rule.next.push(***REMOVED***
                        defaultToken: rule.token
                ***REMOVED*** ***REMOVED***
                        token: rule.token + ".end",
                        regex: rule.end || rule.start,
                        next: "pop"
                ***REMOVED***);
                    rule.token = rule.token + ".start";
                    rule.push = true;
            ***REMOVED***
                var next = rule.next || rule.push;
                if (next && Array.isArray(next)) ***REMOVED***
                    var stateName = rule.stateName;
                    if (!stateName)  ***REMOVED***
                        stateName = rule.token;
                        if (typeof stateName != "string")
                            stateName = stateName[0] || "";
                        if (rules[stateName])
                            stateName += id++;
                ***REMOVED***
                    rules[stateName] = next;
                    rule.next = stateName;
                    processState(stateName);
            ***REMOVED*** else if (next == "pop") ***REMOVED***
                    rule.next = popState;
            ***REMOVED***

                if (rule.push) ***REMOVED***
                    rule.nextState = rule.next || rule.push;
                    rule.next = pushState;
                    delete rule.push;
            ***REMOVED***

                if (rule.rules) ***REMOVED***
                    for (var r in rule.rules) ***REMOVED***
                        if (rules[r]) ***REMOVED***
                            if (rules[r].push)
                                rules[r].push.apply(rules[r], rule.rules[r]);
                    ***REMOVED*** else ***REMOVED***
                            rules[r] = rule.rules[r];
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
                if (rule.include || typeof rule == "string") ***REMOVED***
                    var includeName = rule.include || rule;
                    var toInsert = rules[includeName];
            ***REMOVED*** else if (Array.isArray(rule))
                    toInsert = rule;

                if (toInsert) ***REMOVED***
                    var args = [i, 1].concat(toInsert);
                    if (rule.noEscape)
                        args = args.filter(function(x) ***REMOVED***return !x.next;***REMOVED***);
                    state.splice.apply(state, args);
                    i--;
                    toInsert = null
            ***REMOVED***
                
                if (rule.keywordMap) ***REMOVED***
                    rule.token = this.createKeywordMapper(
                        rule.keywordMap, rule.defaultToken || "text", rule.caseInsensitive
                    );
                    delete rule.defaultToken;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***;
        Object.keys(rules).forEach(processState, this);
***REMOVED***;

    this.createKeywordMapper = function(map, defaultToken, ignoreCase, splitChar) ***REMOVED***
        var keywords = Object.create(null);
        Object.keys(map).forEach(function(className) ***REMOVED***
            var a = map[className];
            if (ignoreCase)
                a = a.toLowerCase();
            var list = a.split(splitChar || "|");
            for (var i = list.length; i--; )
                keywords[list[i]] = className;
    ***REMOVED***);
        if (Object.getPrototypeOf(keywords)) ***REMOVED***
            keywords.__proto__ = null;
    ***REMOVED***
        this.$keywordList = Object.keys(keywords);
        map = null;
        return ignoreCase
            ? function(value) ***REMOVED***return keywords[value.toLowerCase()] || defaultToken ***REMOVED***
            : function(value) ***REMOVED***return keywords[value] || defaultToken ***REMOVED***;
***REMOVED***

    this.getKeywords = function() ***REMOVED***
        return this.$keywords;
***REMOVED***;

***REMOVED***).call(TextHighlightRules.prototype);

exports.TextHighlightRules = TextHighlightRules;
***REMOVED***);

define('ace/mode/behaviour', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


var Behaviour = function() ***REMOVED***
   this.$behaviours = ***REMOVED******REMOVED***;
***REMOVED***;

(function () ***REMOVED***

    this.add = function (name, action, callback) ***REMOVED***
        switch (undefined) ***REMOVED***
          case this.$behaviours:
              this.$behaviours = ***REMOVED******REMOVED***;
          case this.$behaviours[name]:
              this.$behaviours[name] = ***REMOVED******REMOVED***;
    ***REMOVED***
        this.$behaviours[name][action] = callback;
***REMOVED***
    
    this.addBehaviours = function (behaviours) ***REMOVED***
        for (var key in behaviours) ***REMOVED***
            for (var action in behaviours[key]) ***REMOVED***
                this.add(key, action, behaviours[key][action]);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    
    this.remove = function (name) ***REMOVED***
        if (this.$behaviours && this.$behaviours[name]) ***REMOVED***
            delete this.$behaviours[name];
    ***REMOVED***
***REMOVED***
    
    this.inherit = function (mode, filter) ***REMOVED***
        if (typeof mode === "function") ***REMOVED***
            var behaviours = new mode().getBehaviours(filter);
    ***REMOVED*** else ***REMOVED***
            var behaviours = mode.getBehaviours(filter);
    ***REMOVED***
        this.addBehaviours(behaviours);
***REMOVED***
    
    this.getBehaviours = function (filter) ***REMOVED***
        if (!filter) ***REMOVED***
            return this.$behaviours;
    ***REMOVED*** else ***REMOVED***
            var ret = ***REMOVED******REMOVED***
            for (var i = 0; i < filter.length; i++) ***REMOVED***
                if (this.$behaviours[filter[i]]) ***REMOVED***
                    ret[filter[i]] = this.$behaviours[filter[i]];
            ***REMOVED***
        ***REMOVED***
            return ret;
    ***REMOVED***
***REMOVED***

***REMOVED***).call(Behaviour.prototype);

exports.Behaviour = Behaviour;
***REMOVED***);
define('ace/unicode', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
exports.packages = ***REMOVED******REMOVED***;

addUnicodePackage(***REMOVED***
    L:  "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
    Ll: "0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A",
    Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A",
    Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC",
    Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F",
    Lo: "01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
    M:  "0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26",
    Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",
    Mc: "0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC",
    Me: "0488048906DE20DD-20E020E2-20E4A670-A672",
    N:  "0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
    Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
    Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF",
    No: "00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835",
    P:  "0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65",
    Pd: "002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D",
    Ps: "0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62",
    Pe: "0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63",
    Pi: "00AB2018201B201C201F20392E022E042E092E0C2E1C2E20",
    Pf: "00BB2019201D203A2E032E052E0A2E0D2E1D2E21",
    Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F",
    Po: "0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65",
    S:  "0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD",
    Sm: "002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC",
    Sc: "002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6",
    Sk: "005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3",
    So: "00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD",
    Z:  "002000A01680180E2000-200A20282029202F205F3000",
    Zs: "002000A01680180E2000-200A202F205F3000",
    Zl: "2028",
    Zp: "2029",
    C:  "0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF",
    Cc: "0000-001F007F-009F",
    Cf: "00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB",
    Co: "E000-F8FF",
    Cs: "D800-DFFF",
    Cn: "03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"
***REMOVED***);

function addUnicodePackage (pack) ***REMOVED***
    var codePoint = /\w***REMOVED***4***REMOVED***/g;
    for (var name in pack)
        exports.packages[name] = pack[name].replace(codePoint, "\\u$&");
***REMOVED***;

***REMOVED***);

define('ace/token_iterator', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
var TokenIterator = function(session, initialRow, initialColumn) ***REMOVED***
    this.$session = session;
    this.$row = initialRow;
    this.$rowTokens = session.getTokens(initialRow);

    var token = session.getTokenAt(initialRow, initialColumn);
    this.$tokenIndex = token ? token.index : -1;
***REMOVED***;

(function() ***REMOVED*** 
    this.stepBackward = function() ***REMOVED***
        this.$tokenIndex -= 1;
        
        while (this.$tokenIndex < 0) ***REMOVED***
            this.$row -= 1;
            if (this.$row < 0) ***REMOVED***
                this.$row = 0;
                return null;
        ***REMOVED***
                
            this.$rowTokens = this.$session.getTokens(this.$row);
            this.$tokenIndex = this.$rowTokens.length - 1;
    ***REMOVED***
            
        return this.$rowTokens[this.$tokenIndex];
***REMOVED***;   
    this.stepForward = function() ***REMOVED***
        this.$tokenIndex += 1;
        var rowCount;
        while (this.$tokenIndex >= this.$rowTokens.length) ***REMOVED***
            this.$row += 1;
            if (!rowCount)
                rowCount = this.$session.getLength();
            if (this.$row >= rowCount) ***REMOVED***
                this.$row = rowCount - 1;
                return null;
        ***REMOVED***

            this.$rowTokens = this.$session.getTokens(this.$row);
            this.$tokenIndex = 0;
    ***REMOVED***
            
        return this.$rowTokens[this.$tokenIndex];
***REMOVED***;      
    this.getCurrentToken = function () ***REMOVED***
        return this.$rowTokens[this.$tokenIndex];
***REMOVED***;      
    this.getCurrentTokenRow = function () ***REMOVED***
        return this.$row;
***REMOVED***;     
    this.getCurrentTokenColumn = function() ***REMOVED***
        var rowTokens = this.$rowTokens;
        var tokenIndex = this.$tokenIndex;
        var column = rowTokens[tokenIndex].start;
        if (column !== undefined)
            return column;
            
        column = 0;
        while (tokenIndex > 0) ***REMOVED***
            tokenIndex -= 1;
            column += rowTokens[tokenIndex].value.length;
    ***REMOVED***
        
        return column;  
***REMOVED***;
            
***REMOVED***).call(TokenIterator.prototype);

exports.TokenIterator = TokenIterator;
***REMOVED***);

define('ace/document', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/event_emitter', 'ace/range', 'ace/anchor'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var Range = require("./range").Range;
var Anchor = require("./anchor").Anchor;

var Document = function(text) ***REMOVED***
    this.$lines = [];
    if (text.length == 0) ***REMOVED***
        this.$lines = [""];
***REMOVED*** else if (Array.isArray(text)) ***REMOVED***
        this._insertLines(0, text);
***REMOVED*** else ***REMOVED***
        this.insert(***REMOVED***row: 0, column:0***REMOVED***, text);
***REMOVED***
***REMOVED***;

(function() ***REMOVED***

    oop.implement(this, EventEmitter);
    this.setValue = function(text) ***REMOVED***
        var len = this.getLength();
        this.remove(new Range(0, 0, len, this.getLine(len-1).length));
        this.insert(***REMOVED***row: 0, column:0***REMOVED***, text);
***REMOVED***;
    this.getValue = function() ***REMOVED***
        return this.getAllLines().join(this.getNewLineCharacter());
***REMOVED***;
    this.createAnchor = function(row, column) ***REMOVED***
        return new Anchor(this, row, column);
***REMOVED***;
    if ("aaa".split(/a/).length == 0)
        this.$split = function(text) ***REMOVED***
            return text.replace(/\r\n|\r/g, "\n").split("\n");
    ***REMOVED***
    else
        this.$split = function(text) ***REMOVED***
            return text.split(/\r\n|\r|\n/);
    ***REMOVED***;


    this.$detectNewLine = function(text) ***REMOVED***
        var match = text.match(/^.*?(\r\n|\r|\n)/m);
        this.$autoNewLine = match ? match[1] : "\n";
***REMOVED***;
    this.getNewLineCharacter = function() ***REMOVED***
        switch (this.$newLineMode) ***REMOVED***
          case "windows":
            return "\r\n";
          case "unix":
            return "\n";
          default:
            return this.$autoNewLine;
    ***REMOVED***
***REMOVED***;

    this.$autoNewLine = "\n";
    this.$newLineMode = "auto";
    this.setNewLineMode = function(newLineMode) ***REMOVED***
        if (this.$newLineMode === newLineMode)
            return;

        this.$newLineMode = newLineMode;
***REMOVED***;
    this.getNewLineMode = function() ***REMOVED***
        return this.$newLineMode;
***REMOVED***;
    this.isNewLine = function(text) ***REMOVED***
        return (text == "\r\n" || text == "\r" || text == "\n");
***REMOVED***;
    this.getLine = function(row) ***REMOVED***
        return this.$lines[row] || "";
***REMOVED***;
    this.getLines = function(firstRow, lastRow) ***REMOVED***
        return this.$lines.slice(firstRow, lastRow + 1);
***REMOVED***;
    this.getAllLines = function() ***REMOVED***
        return this.getLines(0, this.getLength());
***REMOVED***;
    this.getLength = function() ***REMOVED***
        return this.$lines.length;
***REMOVED***;
    this.getTextRange = function(range) ***REMOVED***
        if (range.start.row == range.end.row) ***REMOVED***
            return this.getLine(range.start.row)
                .substring(range.start.column, range.end.column);
    ***REMOVED***
        var lines = this.getLines(range.start.row, range.end.row);
        lines[0] = (lines[0] || "").substring(range.start.column);
        var l = lines.length - 1;
        if (range.end.row - range.start.row == l)
            lines[l] = lines[l].substring(0, range.end.column);
        return lines.join(this.getNewLineCharacter());
***REMOVED***;

    this.$clipPosition = function(position) ***REMOVED***
        var length = this.getLength();
        if (position.row >= length) ***REMOVED***
            position.row = Math.max(0, length - 1);
            position.column = this.getLine(length-1).length;
    ***REMOVED*** else if (position.row < 0)
            position.row = 0;
        return position;
***REMOVED***;
    this.insert = function(position, text) ***REMOVED***
        if (!text || text.length === 0)
            return position;

        position = this.$clipPosition(position);
        if (this.getLength() <= 1)
            this.$detectNewLine(text);

        var lines = this.$split(text);
        var firstLine = lines.splice(0, 1)[0];
        var lastLine = lines.length == 0 ? null : lines.splice(lines.length - 1, 1)[0];

        position = this.insertInLine(position, firstLine);
        if (lastLine !== null) ***REMOVED***
            position = this.insertNewLine(position); // terminate first line
            position = this._insertLines(position.row, lines);
            position = this.insertInLine(position, lastLine || "");
    ***REMOVED***
        return position;
***REMOVED***;
    this.insertLines = function(row, lines) ***REMOVED***
        if (row >= this.getLength())
            return this.insert(***REMOVED***row: row, column: 0***REMOVED***, "\n" + lines.join("\n"));
        return this._insertLines(Math.max(row, 0), lines);
***REMOVED***;
    this._insertLines = function(row, lines) ***REMOVED***
        if (lines.length == 0)
            return ***REMOVED***row: row, column: 0***REMOVED***;
        if (lines.length > 0xFFFF) ***REMOVED***
            var end = this._insertLines(row, lines.slice(0xFFFF));
            lines = lines.slice(0, 0xFFFF);
    ***REMOVED***

        var args = [row, 0];
        args.push.apply(args, lines);
        this.$lines.splice.apply(this.$lines, args);

        var range = new Range(row, 0, row + lines.length, 0);
        var delta = ***REMOVED***
            action: "insertLines",
            range: range,
            lines: lines
    ***REMOVED***;
        this._emit("change", ***REMOVED*** data: delta ***REMOVED***);
        return end || range.end;
***REMOVED***;
    this.insertNewLine = function(position) ***REMOVED***
        position = this.$clipPosition(position);
        var line = this.$lines[position.row] || "";

        this.$lines[position.row] = line.substring(0, position.column);
        this.$lines.splice(position.row + 1, 0, line.substring(position.column, line.length));

        var end = ***REMOVED***
            row : position.row + 1,
            column : 0
    ***REMOVED***;

        var delta = ***REMOVED***
            action: "insertText",
            range: Range.fromPoints(position, end),
            text: this.getNewLineCharacter()
    ***REMOVED***;
        this._emit("change", ***REMOVED*** data: delta ***REMOVED***);

        return end;
***REMOVED***;
    this.insertInLine = function(position, text) ***REMOVED***
        if (text.length == 0)
            return position;

        var line = this.$lines[position.row] || "";

        this.$lines[position.row] = line.substring(0, position.column) + text
                + line.substring(position.column);

        var end = ***REMOVED***
            row : position.row,
            column : position.column + text.length
    ***REMOVED***;

        var delta = ***REMOVED***
            action: "insertText",
            range: Range.fromPoints(position, end),
            text: text
    ***REMOVED***;
        this._emit("change", ***REMOVED*** data: delta ***REMOVED***);

        return end;
***REMOVED***;
    this.remove = function(range) ***REMOVED***
        if (!range instanceof Range)
            range = Range.fromPoints(range.start, range.end);
        range.start = this.$clipPosition(range.start);
        range.end = this.$clipPosition(range.end);

        if (range.isEmpty())
            return range.start;

        var firstRow = range.start.row;
        var lastRow = range.end.row;

        if (range.isMultiLine()) ***REMOVED***
            var firstFullRow = range.start.column == 0 ? firstRow : firstRow + 1;
            var lastFullRow = lastRow - 1;

            if (range.end.column > 0)
                this.removeInLine(lastRow, 0, range.end.column);

            if (lastFullRow >= firstFullRow)
                this._removeLines(firstFullRow, lastFullRow);

            if (firstFullRow != firstRow) ***REMOVED***
                this.removeInLine(firstRow, range.start.column, this.getLine(firstRow).length);
                this.removeNewLine(range.start.row);
        ***REMOVED***
    ***REMOVED***
        else ***REMOVED***
            this.removeInLine(firstRow, range.start.column, range.end.column);
    ***REMOVED***
        return range.start;
***REMOVED***;
    this.removeInLine = function(row, startColumn, endColumn) ***REMOVED***
        if (startColumn == endColumn)
            return;

        var range = new Range(row, startColumn, row, endColumn);
        var line = this.getLine(row);
        var removed = line.substring(startColumn, endColumn);
        var newLine = line.substring(0, startColumn) + line.substring(endColumn, line.length);
        this.$lines.splice(row, 1, newLine);

        var delta = ***REMOVED***
            action: "removeText",
            range: range,
            text: removed
    ***REMOVED***;
        this._emit("change", ***REMOVED*** data: delta ***REMOVED***);
        return range.start;
***REMOVED***;
    this.removeLines = function(firstRow, lastRow) ***REMOVED***
        if (firstRow < 0 || lastRow >= this.getLength())
            return this.remove(new Range(firstRow, 0, lastRow + 1, 0));
        return this._removeLines(firstRow, lastRow);
***REMOVED***;

    this._removeLines = function(firstRow, lastRow) ***REMOVED***
        var range = new Range(firstRow, 0, lastRow + 1, 0);
        var removed = this.$lines.splice(firstRow, lastRow - firstRow + 1);

        var delta = ***REMOVED***
            action: "removeLines",
            range: range,
            nl: this.getNewLineCharacter(),
            lines: removed
    ***REMOVED***;
        this._emit("change", ***REMOVED*** data: delta ***REMOVED***);
        return removed;
***REMOVED***;
    this.removeNewLine = function(row) ***REMOVED***
        var firstLine = this.getLine(row);
        var secondLine = this.getLine(row+1);

        var range = new Range(row, firstLine.length, row+1, 0);
        var line = firstLine + secondLine;

        this.$lines.splice(row, 2, line);

        var delta = ***REMOVED***
            action: "removeText",
            range: range,
            text: this.getNewLineCharacter()
    ***REMOVED***;
        this._emit("change", ***REMOVED*** data: delta ***REMOVED***);
***REMOVED***;
    this.replace = function(range, text) ***REMOVED***
        if (!range instanceof Range)
            range = Range.fromPoints(range.start, range.end);
        if (text.length == 0 && range.isEmpty())
            return range.start;
        if (text == this.getTextRange(range))
            return range.end;

        this.remove(range);
        if (text) ***REMOVED***
            var end = this.insert(range.start, text);
    ***REMOVED***
        else ***REMOVED***
            end = range.start;
    ***REMOVED***

        return end;
***REMOVED***;
    this.applyDeltas = function(deltas) ***REMOVED***
        for (var i=0; i<deltas.length; i++) ***REMOVED***
            var delta = deltas[i];
            var range = Range.fromPoints(delta.range.start, delta.range.end);

            if (delta.action == "insertLines")
                this.insertLines(range.start.row, delta.lines);
            else if (delta.action == "insertText")
                this.insert(range.start, delta.text);
            else if (delta.action == "removeLines")
                this._removeLines(range.start.row, range.end.row - 1);
            else if (delta.action == "removeText")
                this.remove(range);
    ***REMOVED***
***REMOVED***;
    this.revertDeltas = function(deltas) ***REMOVED***
        for (var i=deltas.length-1; i>=0; i--) ***REMOVED***
            var delta = deltas[i];

            var range = Range.fromPoints(delta.range.start, delta.range.end);

            if (delta.action == "insertLines")
                this._removeLines(range.start.row, range.end.row - 1);
            else if (delta.action == "insertText")
                this.remove(range);
            else if (delta.action == "removeLines")
                this._insertLines(range.start.row, delta.lines);
            else if (delta.action == "removeText")
                this.insert(range.start, delta.text);
    ***REMOVED***
***REMOVED***;
    this.indexToPosition = function(index, startRow) ***REMOVED***
        var lines = this.$lines || this.getAllLines();
        var newlineLength = this.getNewLineCharacter().length;
        for (var i = startRow || 0, l = lines.length; i < l; i++) ***REMOVED***
            index -= lines[i].length + newlineLength;
            if (index < 0)
                return ***REMOVED***row: i, column: index + lines[i].length + newlineLength***REMOVED***;
    ***REMOVED***
        return ***REMOVED***row: l-1, column: lines[l-1].length***REMOVED***;
***REMOVED***;
    this.positionToIndex = function(pos, startRow) ***REMOVED***
        var lines = this.$lines || this.getAllLines();
        var newlineLength = this.getNewLineCharacter().length;
        var index = 0;
        var row = Math.min(pos.row, lines.length);
        for (var i = startRow || 0; i < row; ++i)
            index += lines[i].length + newlineLength;

        return index + pos.column;
***REMOVED***;

***REMOVED***).call(Document.prototype);

exports.Document = Document;
***REMOVED***);

define('ace/anchor', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/event_emitter'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var EventEmitter = require("./lib/event_emitter").EventEmitter;

var Anchor = exports.Anchor = function(doc, row, column) ***REMOVED***
    this.$onChange = this.onChange.bind(this);
    this.attach(doc);
    
    if (typeof column == "undefined")
        this.setPosition(row.row, row.column);
    else
        this.setPosition(row, column);
***REMOVED***;

(function() ***REMOVED***

    oop.implement(this, EventEmitter);
    this.getPosition = function() ***REMOVED***
        return this.$clipPositionToDocument(this.row, this.column);
***REMOVED***;
    this.getDocument = function() ***REMOVED***
        return this.document;
***REMOVED***;
    this.$insertRight = false;
    this.onChange = function(e) ***REMOVED***
        var delta = e.data;
        var range = delta.range;

        if (range.start.row == range.end.row && range.start.row != this.row)
            return;

        if (range.start.row > this.row)
            return;

        if (range.start.row == this.row && range.start.column > this.column)
            return;

        var row = this.row;
        var column = this.column;
        var start = range.start;
        var end = range.end;

        if (delta.action === "insertText") ***REMOVED***
            if (start.row === row && start.column <= column) ***REMOVED***
                if (start.column === column && this.$insertRight) ***REMOVED***
            ***REMOVED*** else if (start.row === end.row) ***REMOVED***
                    column += end.column - start.column;
            ***REMOVED*** else ***REMOVED***
                    column -= start.column;
                    row += end.row - start.row;
            ***REMOVED***
        ***REMOVED*** else if (start.row !== end.row && start.row < row) ***REMOVED***
                row += end.row - start.row;
        ***REMOVED***
    ***REMOVED*** else if (delta.action === "insertLines") ***REMOVED***
            if (start.row <= row) ***REMOVED***
                row += end.row - start.row;
        ***REMOVED***
    ***REMOVED*** else if (delta.action === "removeText") ***REMOVED***
            if (start.row === row && start.column < column) ***REMOVED***
                if (end.column >= column)
                    column = start.column;
                else
                    column = Math.max(0, column - (end.column - start.column));

        ***REMOVED*** else if (start.row !== end.row && start.row < row) ***REMOVED***
                if (end.row === row)
                    column = Math.max(0, column - end.column) + start.column;
                row -= (end.row - start.row);
        ***REMOVED*** else if (end.row === row) ***REMOVED***
                row -= end.row - start.row;
                column = Math.max(0, column - end.column) + start.column;
        ***REMOVED***
    ***REMOVED*** else if (delta.action == "removeLines") ***REMOVED***
            if (start.row <= row) ***REMOVED***
                if (end.row <= row)
                    row -= end.row - start.row;
                else ***REMOVED***
                    row = start.row;
                    column = 0;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

        this.setPosition(row, column, true);
***REMOVED***;
    this.setPosition = function(row, column, noClip) ***REMOVED***
        var pos;
        if (noClip) ***REMOVED***
            pos = ***REMOVED***
                row: row,
                column: column
        ***REMOVED***;
    ***REMOVED*** else ***REMOVED***
            pos = this.$clipPositionToDocument(row, column);
    ***REMOVED***

        if (this.row == pos.row && this.column == pos.column)
            return;

        var old = ***REMOVED***
            row: this.row,
            column: this.column
    ***REMOVED***;

        this.row = pos.row;
        this.column = pos.column;
        this._emit("change", ***REMOVED***
            old: old,
            value: pos
    ***REMOVED***);
***REMOVED***;
    this.detach = function() ***REMOVED***
        this.document.removeEventListener("change", this.$onChange);
***REMOVED***;
    this.attach = function(doc) ***REMOVED***
        this.document = doc || this.document;
        this.document.on("change", this.$onChange);
***REMOVED***;
    this.$clipPositionToDocument = function(row, column) ***REMOVED***
        var pos = ***REMOVED******REMOVED***;

        if (row >= this.document.getLength()) ***REMOVED***
            pos.row = Math.max(0, this.document.getLength() - 1);
            pos.column = this.document.getLine(pos.row).length;
    ***REMOVED***
        else if (row < 0) ***REMOVED***
            pos.row = 0;
            pos.column = 0;
    ***REMOVED***
        else ***REMOVED***
            pos.row = row;
            pos.column = Math.min(this.document.getLine(pos.row).length, Math.max(0, column));
    ***REMOVED***

        if (column < 0)
            pos.column = 0;

        return pos;
***REMOVED***;

***REMOVED***).call(Anchor.prototype);

***REMOVED***);

define('ace/background_tokenizer', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/event_emitter'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var EventEmitter = require("./lib/event_emitter").EventEmitter;

var BackgroundTokenizer = function(tokenizer, editor) ***REMOVED***
    this.running = false;
    this.lines = [];
    this.states = [];
    this.currentLine = 0;
    this.tokenizer = tokenizer;

    var self = this;

    this.$worker = function() ***REMOVED***
        if (!self.running) ***REMOVED*** return; ***REMOVED***

        var workerStart = new Date();
        var currentLine = self.currentLine;
        var endLine = -1;
        var doc = self.doc;

        while (self.lines[currentLine])
            currentLine++;

        var startLine = currentLine;

        var len = doc.getLength();
        var processedLines = 0;
        self.running = false;
        while (currentLine < len) ***REMOVED***
            self.$tokenizeRow(currentLine);
            endLine = currentLine;
            do ***REMOVED***
                currentLine++;
        ***REMOVED*** while (self.lines[currentLine]);
            processedLines ++;
            if ((processedLines % 5 == 0) && (new Date() - workerStart) > 20) ***REMOVED***                
                self.running = setTimeout(self.$worker, 20);
                self.currentLine = currentLine;
                return;
        ***REMOVED***
    ***REMOVED***
        self.currentLine = currentLine;
        
        if (startLine <= endLine)
            self.fireUpdateEvent(startLine, endLine);
***REMOVED***;
***REMOVED***;

(function()***REMOVED***

    oop.implement(this, EventEmitter);
    this.setTokenizer = function(tokenizer) ***REMOVED***
        this.tokenizer = tokenizer;
        this.lines = [];
        this.states = [];

        this.start(0);
***REMOVED***;
    this.setDocument = function(doc) ***REMOVED***
        this.doc = doc;
        this.lines = [];
        this.states = [];

        this.stop();
***REMOVED***;
    this.fireUpdateEvent = function(firstRow, lastRow) ***REMOVED***
        var data = ***REMOVED***
            first: firstRow,
            last: lastRow
    ***REMOVED***;
        this._emit("update", ***REMOVED***data: data***REMOVED***);
***REMOVED***;
    this.start = function(startRow) ***REMOVED***
        this.currentLine = Math.min(startRow || 0, this.currentLine, this.doc.getLength());
        this.lines.splice(this.currentLine, this.lines.length);
        this.states.splice(this.currentLine, this.states.length);

        this.stop();
        this.running = setTimeout(this.$worker, 700);
***REMOVED***;
    
    this.scheduleStart = function() ***REMOVED***
        if (!this.running)
            this.running = setTimeout(this.$worker, 700);
***REMOVED***

    this.$updateOnChange = function(delta) ***REMOVED***
        var range = delta.range;
        var startRow = range.start.row;
        var len = range.end.row - startRow;

        if (len === 0) ***REMOVED***
            this.lines[startRow] = null;
    ***REMOVED*** else if (delta.action == "removeText" || delta.action == "removeLines") ***REMOVED***
            this.lines.splice(startRow, len + 1, null);
            this.states.splice(startRow, len + 1, null);
    ***REMOVED*** else ***REMOVED***
            var args = Array(len + 1);
            args.unshift(startRow, 1);
            this.lines.splice.apply(this.lines, args);
            this.states.splice.apply(this.states, args);
    ***REMOVED***

        this.currentLine = Math.min(startRow, this.currentLine, this.doc.getLength());

        this.stop();
***REMOVED***;
    this.stop = function() ***REMOVED***
        if (this.running)
            clearTimeout(this.running);
        this.running = false;
***REMOVED***;
    this.getTokens = function(row) ***REMOVED***
        return this.lines[row] || this.$tokenizeRow(row);
***REMOVED***;
    this.getState = function(row) ***REMOVED***
        if (this.currentLine == row)
            this.$tokenizeRow(row);
        return this.states[row] || "start";
***REMOVED***;

    this.$tokenizeRow = function(row) ***REMOVED***
        var line = this.doc.getLine(row);
        var state = this.states[row - 1];

        var data = this.tokenizer.getLineTokens(line, state, row);

        if (this.states[row] + "" !== data.state + "") ***REMOVED***
            this.states[row] = data.state;
            this.lines[row + 1] = null;
            if (this.currentLine > row + 1)
                this.currentLine = row + 1;
    ***REMOVED*** else if (this.currentLine == row) ***REMOVED***
            this.currentLine = row + 1;
    ***REMOVED***

        return this.lines[row] = data.tokens;
***REMOVED***;

***REMOVED***).call(BackgroundTokenizer.prototype);

exports.BackgroundTokenizer = BackgroundTokenizer;
***REMOVED***);

define('ace/search_highlight', ['require', 'exports', 'module' , 'ace/lib/lang', 'ace/lib/oop', 'ace/range'], function(require, exports, module) ***REMOVED***


var lang = require("./lib/lang");
var oop = require("./lib/oop");
var Range = require("./range").Range;

var SearchHighlight = function(regExp, clazz, type) ***REMOVED***
    this.setRegexp(regExp);
    this.clazz = clazz;
    this.type = type || "text";
***REMOVED***;

(function() ***REMOVED***
    this.MAX_RANGES = 500;
    
    this.setRegexp = function(regExp) ***REMOVED***
        if (this.regExp+"" == regExp+"")
            return;
        this.regExp = regExp;
        this.cache = [];
***REMOVED***;

    this.update = function(html, markerLayer, session, config) ***REMOVED***
        if (!this.regExp)
            return;
        var start = config.firstRow, end = config.lastRow;

        for (var i = start; i <= end; i++) ***REMOVED***
            var ranges = this.cache[i];
            if (ranges == null) ***REMOVED***
                ranges = lang.getMatchOffsets(session.getLine(i), this.regExp);
                if (ranges.length > this.MAX_RANGES)
                    ranges = ranges.slice(0, this.MAX_RANGES);
                ranges = ranges.map(function(match) ***REMOVED***
                    return new Range(i, match.offset, i, match.offset + match.length);
            ***REMOVED***);
                this.cache[i] = ranges.length ? ranges : "";
        ***REMOVED***

            for (var j = ranges.length; j --; ) ***REMOVED***
                markerLayer.drawSingleLineMarker(
                    html, ranges[j].toScreenRange(session), this.clazz, config);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

***REMOVED***).call(SearchHighlight.prototype);

exports.SearchHighlight = SearchHighlight;
***REMOVED***);

define('ace/edit_session/folding', ['require', 'exports', 'module' , 'ace/range', 'ace/edit_session/fold_line', 'ace/edit_session/fold', 'ace/token_iterator'], function(require, exports, module) ***REMOVED***


var Range = require("../range").Range;
var FoldLine = require("./fold_line").FoldLine;
var Fold = require("./fold").Fold;
var TokenIterator = require("../token_iterator").TokenIterator;

function Folding() ***REMOVED***
    this.getFoldAt = function(row, column, side) ***REMOVED***
        var foldLine = this.getFoldLine(row);
        if (!foldLine)
            return null;

        var folds = foldLine.folds;
        for (var i = 0; i < folds.length; i++) ***REMOVED***
            var fold = folds[i];
            if (fold.range.contains(row, column)) ***REMOVED***
                if (side == 1 && fold.range.isEnd(row, column)) ***REMOVED***
                    continue;
            ***REMOVED*** else if (side == -1 && fold.range.isStart(row, column)) ***REMOVED***
                    continue;
            ***REMOVED***
                return fold;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    this.getFoldsInRange = function(range) ***REMOVED***
        var start = range.start;
        var end = range.end;
        var foldLines = this.$foldData;
        var foundFolds = [];

        start.column += 1;
        end.column -= 1;

        for (var i = 0; i < foldLines.length; i++) ***REMOVED***
            var cmp = foldLines[i].range.compareRange(range);
            if (cmp == 2) ***REMOVED***
                continue;
        ***REMOVED***
            else if (cmp == -2) ***REMOVED***
                break;
        ***REMOVED***

            var folds = foldLines[i].folds;
            for (var j = 0; j < folds.length; j++) ***REMOVED***
                var fold = folds[j];
                cmp = fold.range.compareRange(range);
                if (cmp == -2) ***REMOVED***
                    break;
            ***REMOVED*** else if (cmp == 2) ***REMOVED***
                    continue;
            ***REMOVED*** else
                if (cmp == 42) ***REMOVED***
                    break;
            ***REMOVED***
                foundFolds.push(fold);
        ***REMOVED***
    ***REMOVED***
        start.column -= 1;
        end.column += 1;

        return foundFolds;
***REMOVED***;
    this.getAllFolds = function() ***REMOVED***
        var folds = [];
        var foldLines = this.$foldData;
        
        function addFold(fold) ***REMOVED***
            folds.push(fold);
    ***REMOVED***
        
        for (var i = 0; i < foldLines.length; i++)
            for (var j = 0; j < foldLines[i].folds.length; j++)
                addFold(foldLines[i].folds[j]);

        return folds;
***REMOVED***;
    this.getFoldStringAt = function(row, column, trim, foldLine) ***REMOVED***
        foldLine = foldLine || this.getFoldLine(row);
        if (!foldLine)
            return null;

        var lastFold = ***REMOVED***
            end: ***REMOVED*** column: 0 ***REMOVED***
    ***REMOVED***;
        var str, fold;
        for (var i = 0; i < foldLine.folds.length; i++) ***REMOVED***
            fold = foldLine.folds[i];
            var cmp = fold.range.compareEnd(row, column);
            if (cmp == -1) ***REMOVED***
                str = this
                    .getLine(fold.start.row)
                    .substring(lastFold.end.column, fold.start.column);
                break;
        ***REMOVED***
            else if (cmp === 0) ***REMOVED***
                return null;
        ***REMOVED***
            lastFold = fold;
    ***REMOVED***
        if (!str)
            str = this.getLine(fold.start.row).substring(lastFold.end.column);

        if (trim == -1)
            return str.substring(0, column - lastFold.end.column);
        else if (trim == 1)
            return str.substring(column - lastFold.end.column);
        else
            return str;
***REMOVED***;

    this.getFoldLine = function(docRow, startFoldLine) ***REMOVED***
        var foldData = this.$foldData;
        var i = 0;
        if (startFoldLine)
            i = foldData.indexOf(startFoldLine);
        if (i == -1)
            i = 0;
        for (i; i < foldData.length; i++) ***REMOVED***
            var foldLine = foldData[i];
            if (foldLine.start.row <= docRow && foldLine.end.row >= docRow) ***REMOVED***
                return foldLine;
        ***REMOVED*** else if (foldLine.end.row > docRow) ***REMOVED***
                return null;
        ***REMOVED***
    ***REMOVED***
        return null;
***REMOVED***;
    this.getNextFoldLine = function(docRow, startFoldLine) ***REMOVED***
        var foldData = this.$foldData;
        var i = 0;
        if (startFoldLine)
            i = foldData.indexOf(startFoldLine);
        if (i == -1)
            i = 0;
        for (i; i < foldData.length; i++) ***REMOVED***
            var foldLine = foldData[i];
            if (foldLine.end.row >= docRow) ***REMOVED***
                return foldLine;
        ***REMOVED***
    ***REMOVED***
        return null;
***REMOVED***;

    this.getFoldedRowCount = function(first, last) ***REMOVED***
        var foldData = this.$foldData, rowCount = last-first+1;
        for (var i = 0; i < foldData.length; i++) ***REMOVED***
            var foldLine = foldData[i],
                end = foldLine.end.row,
                start = foldLine.start.row;
            if (end >= last) ***REMOVED***
                if(start < last) ***REMOVED***
                    if(start >= first)
                        rowCount -= last-start;
                    else
                        rowCount = 0;//in one fold
            ***REMOVED***
                break;
        ***REMOVED*** else if(end >= first)***REMOVED***
                if (start >= first) //fold inside range
                    rowCount -=  end-start;
                else
                    rowCount -=  end-first+1;
        ***REMOVED***
    ***REMOVED***
        return rowCount;
***REMOVED***;

    this.$addFoldLine = function(foldLine) ***REMOVED***
        this.$foldData.push(foldLine);
        this.$foldData.sort(function(a, b) ***REMOVED***
            return a.start.row - b.start.row;
    ***REMOVED***);
        return foldLine;
***REMOVED***;
    this.addFold = function(placeholder, range) ***REMOVED***
        var foldData = this.$foldData;
        var added = false;
        var fold;
        
        if (placeholder instanceof Fold)
            fold = placeholder;
        else ***REMOVED***
            fold = new Fold(range, placeholder);
            fold.collapseChildren = range.collapseChildren;
    ***REMOVED***
        this.$clipRangeToDocument(fold.range);

        var startRow = fold.start.row;
        var startColumn = fold.start.column;
        var endRow = fold.end.row;
        var endColumn = fold.end.column;
        if (!(startRow < endRow || 
            startRow == endRow && startColumn <= endColumn - 2))
            throw new Error("The range has to be at least 2 characters width");

        var startFold = this.getFoldAt(startRow, startColumn, 1);
        var endFold = this.getFoldAt(endRow, endColumn, -1);
        if (startFold && endFold == startFold)
            return startFold.addSubFold(fold);

        if (
            (startFold && !startFold.range.isStart(startRow, startColumn))
            || (endFold && !endFold.range.isEnd(endRow, endColumn))
        ) ***REMOVED***
            throw new Error("A fold can't intersect already existing fold" + fold.range + startFold.range);
    ***REMOVED***
        var folds = this.getFoldsInRange(fold.range);
        if (folds.length > 0) ***REMOVED***
            this.removeFolds(folds);
            folds.forEach(function(subFold) ***REMOVED***
                fold.addSubFold(subFold);
        ***REMOVED***);
    ***REMOVED***

        for (var i = 0; i < foldData.length; i++) ***REMOVED***
            var foldLine = foldData[i];
            if (endRow == foldLine.start.row) ***REMOVED***
                foldLine.addFold(fold);
                added = true;
                break;
        ***REMOVED*** else if (startRow == foldLine.end.row) ***REMOVED***
                foldLine.addFold(fold);
                added = true;
                if (!fold.sameRow) ***REMOVED***
                    var foldLineNext = foldData[i + 1];
                    if (foldLineNext && foldLineNext.start.row == endRow) ***REMOVED***
                        foldLine.merge(foldLineNext);
                        break;
                ***REMOVED***
            ***REMOVED***
                break;
        ***REMOVED*** else if (endRow <= foldLine.start.row) ***REMOVED***
                break;
        ***REMOVED***
    ***REMOVED***

        if (!added)
            foldLine = this.$addFoldLine(new FoldLine(this.$foldData, fold));

        if (this.$useWrapMode)
            this.$updateWrapData(foldLine.start.row, foldLine.start.row);
        else
            this.$updateRowLengthCache(foldLine.start.row, foldLine.start.row);
        this.$modified = true;
        this._emit("changeFold", ***REMOVED*** data: fold, action: "add" ***REMOVED***);

        return fold;
***REMOVED***;

    this.addFolds = function(folds) ***REMOVED***
        folds.forEach(function(fold) ***REMOVED***
            this.addFold(fold);
    ***REMOVED*** this);
***REMOVED***;

    this.removeFold = function(fold) ***REMOVED***
        var foldLine = fold.foldLine;
        var startRow = foldLine.start.row;
        var endRow = foldLine.end.row;

        var foldLines = this.$foldData;
        var folds = foldLine.folds;
        if (folds.length == 1) ***REMOVED***
            foldLines.splice(foldLines.indexOf(foldLine), 1);
    ***REMOVED*** else
        if (foldLine.range.isEnd(fold.end.row, fold.end.column)) ***REMOVED***
            folds.pop();
            foldLine.end.row = folds[folds.length - 1].end.row;
            foldLine.end.column = folds[folds.length - 1].end.column;
    ***REMOVED*** else
        if (foldLine.range.isStart(fold.start.row, fold.start.column)) ***REMOVED***
            folds.shift();
            foldLine.start.row = folds[0].start.row;
            foldLine.start.column = folds[0].start.column;
    ***REMOVED*** else
        if (fold.sameRow) ***REMOVED***
            folds.splice(folds.indexOf(fold), 1);
    ***REMOVED*** else
        ***REMOVED***
            var newFoldLine = foldLine.split(fold.start.row, fold.start.column);
            folds = newFoldLine.folds;
            folds.shift();
            newFoldLine.start.row = folds[0].start.row;
            newFoldLine.start.column = folds[0].start.column;
    ***REMOVED***

        if (!this.$updating) ***REMOVED***
            if (this.$useWrapMode)
                this.$updateWrapData(startRow, endRow);
            else
                this.$updateRowLengthCache(startRow, endRow);
    ***REMOVED***
        this.$modified = true;
        this._emit("changeFold", ***REMOVED*** data: fold, action: "remove" ***REMOVED***);
***REMOVED***;

    this.removeFolds = function(folds) ***REMOVED***
        var cloneFolds = [];
        for (var i = 0; i < folds.length; i++) ***REMOVED***
            cloneFolds.push(folds[i]);
    ***REMOVED***

        cloneFolds.forEach(function(fold) ***REMOVED***
            this.removeFold(fold);
    ***REMOVED*** this);
        this.$modified = true;
***REMOVED***;

    this.expandFold = function(fold) ***REMOVED***
        this.removeFold(fold);        
        fold.subFolds.forEach(function(subFold) ***REMOVED***
            fold.restoreRange(subFold);
            this.addFold(subFold);
    ***REMOVED*** this);
        if (fold.collapseChildren > 0) ***REMOVED***
            this.foldAll(fold.start.row+1, fold.end.row, fold.collapseChildren-1);
    ***REMOVED***
        fold.subFolds = [];
***REMOVED***;

    this.expandFolds = function(folds) ***REMOVED***
        folds.forEach(function(fold) ***REMOVED***
            this.expandFold(fold);
    ***REMOVED*** this);
***REMOVED***;

    this.unfold = function(location, expandInner) ***REMOVED***
        var range, folds;
        if (location == null) ***REMOVED***
            range = new Range(0, 0, this.getLength(), 0);
            expandInner = true;
    ***REMOVED*** else if (typeof location == "number")
            range = new Range(location, 0, location, this.getLine(location).length);
        else if ("row" in location)
            range = Range.fromPoints(location, location);
        else
            range = location;

        folds = this.getFoldsInRange(range);
        if (expandInner) ***REMOVED***
            this.removeFolds(folds);
    ***REMOVED*** else ***REMOVED***
            while (folds.length) ***REMOVED***
                this.expandFolds(folds);
                folds = this.getFoldsInRange(range);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    this.isRowFolded = function(docRow, startFoldRow) ***REMOVED***
        return !!this.getFoldLine(docRow, startFoldRow);
***REMOVED***;

    this.getRowFoldEnd = function(docRow, startFoldRow) ***REMOVED***
        var foldLine = this.getFoldLine(docRow, startFoldRow);
        return foldLine ? foldLine.end.row : docRow;
***REMOVED***;

    this.getRowFoldStart = function(docRow, startFoldRow) ***REMOVED***
        var foldLine = this.getFoldLine(docRow, startFoldRow);
        return foldLine ? foldLine.start.row : docRow;
***REMOVED***;

    this.getFoldDisplayLine = function(foldLine, endRow, endColumn, startRow, startColumn) ***REMOVED***
        if (startRow == null) ***REMOVED***
            startRow = foldLine.start.row;
            startColumn = 0;
    ***REMOVED***

        if (endRow == null) ***REMOVED***
            endRow = foldLine.end.row;
            endColumn = this.getLine(endRow).length;
    ***REMOVED***
        var doc = this.doc;
        var textLine = "";

        foldLine.walk(function(placeholder, row, column, lastColumn) ***REMOVED***
            if (row < startRow)
                return;
            if (row == startRow) ***REMOVED***
                if (column < startColumn)
                    return;
                lastColumn = Math.max(startColumn, lastColumn);
        ***REMOVED***

            if (placeholder != null) ***REMOVED***
                textLine += placeholder;
        ***REMOVED*** else ***REMOVED***
                textLine += doc.getLine(row).substring(lastColumn, column);
        ***REMOVED***
    ***REMOVED*** endRow, endColumn);
        return textLine;
***REMOVED***;

    this.getDisplayLine = function(row, endColumn, startRow, startColumn) ***REMOVED***
        var foldLine = this.getFoldLine(row);

        if (!foldLine) ***REMOVED***
            var line;
            line = this.doc.getLine(row);
            return line.substring(startColumn || 0, endColumn || line.length);
    ***REMOVED*** else ***REMOVED***
            return this.getFoldDisplayLine(
                foldLine, row, endColumn, startRow, startColumn);
    ***REMOVED***
***REMOVED***;

    this.$cloneFoldData = function() ***REMOVED***
        var fd = [];
        fd = this.$foldData.map(function(foldLine) ***REMOVED***
            var folds = foldLine.folds.map(function(fold) ***REMOVED***
                return fold.clone();
        ***REMOVED***);
            return new FoldLine(fd, folds);
    ***REMOVED***);

        return fd;
***REMOVED***;

    this.toggleFold = function(tryToUnfold) ***REMOVED***
        var selection = this.selection;
        var range = selection.getRange();
        var fold;
        var bracketPos;

        if (range.isEmpty()) ***REMOVED***
            var cursor = range.start;
            fold = this.getFoldAt(cursor.row, cursor.column);

            if (fold) ***REMOVED***
                this.expandFold(fold);
                return;
        ***REMOVED*** else if (bracketPos = this.findMatchingBracket(cursor)) ***REMOVED***
                if (range.comparePoint(bracketPos) == 1) ***REMOVED***
                    range.end = bracketPos;
            ***REMOVED*** else ***REMOVED***
                    range.start = bracketPos;
                    range.start.column++;
                    range.end.column--;
            ***REMOVED***
        ***REMOVED*** else if (bracketPos = this.findMatchingBracket(***REMOVED***row: cursor.row, column: cursor.column + 1***REMOVED***)) ***REMOVED***
                if (range.comparePoint(bracketPos) == 1)
                    range.end = bracketPos;
                else
                    range.start = bracketPos;

                range.start.column++;
        ***REMOVED*** else ***REMOVED***
                range = this.getCommentFoldRange(cursor.row, cursor.column) || range;
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            var folds = this.getFoldsInRange(range);
            if (tryToUnfold && folds.length) ***REMOVED***
                this.expandFolds(folds);
                return;
        ***REMOVED*** else if (folds.length == 1 ) ***REMOVED***
                fold = folds[0];
        ***REMOVED***
    ***REMOVED***

        if (!fold)
            fold = this.getFoldAt(range.start.row, range.start.column);

        if (fold && fold.range.toString() == range.toString()) ***REMOVED***
            this.expandFold(fold);
            return;
    ***REMOVED***

        var placeholder = "...";
        if (!range.isMultiLine()) ***REMOVED***
            placeholder = this.getTextRange(range);
            if(placeholder.length < 4)
                return;
            placeholder = placeholder.trim().substring(0, 2) + "..";
    ***REMOVED***

        this.addFold(placeholder, range);
***REMOVED***;

    this.getCommentFoldRange = function(row, column, dir) ***REMOVED***
        var iterator = new TokenIterator(this, row, column);
        var token = iterator.getCurrentToken();
        if (token && /^comment|string/.test(token.type)) ***REMOVED***
            var range = new Range();
            var re = new RegExp(token.type.replace(/\..*/, "\\."));
            if (dir != 1) ***REMOVED***
                do ***REMOVED***
                    token = iterator.stepBackward();
            ***REMOVED*** while(token && re.test(token.type));
                iterator.stepForward();
        ***REMOVED***
            
            range.start.row = iterator.getCurrentTokenRow();
            range.start.column = iterator.getCurrentTokenColumn() + 2;

            iterator = new TokenIterator(this, row, column);
            
            if (dir != -1) ***REMOVED***
                do ***REMOVED***
                    token = iterator.stepForward();
            ***REMOVED*** while(token && re.test(token.type));
                token = iterator.stepBackward();
        ***REMOVED*** else
                token = iterator.getCurrentToken();

            range.end.row = iterator.getCurrentTokenRow();
            range.end.column = iterator.getCurrentTokenColumn() + token.value.length - 2;
            return range;
    ***REMOVED***
***REMOVED***;

    this.foldAll = function(startRow, endRow, depth) ***REMOVED***
        if (depth == undefined)
            depth = 100000; // JSON.stringify doesn't hanle Infinity
        var foldWidgets = this.foldWidgets;
        endRow = endRow || this.getLength();
        startRow = startRow || 0;
        for (var row = startRow; row < endRow; row++) ***REMOVED***
            if (foldWidgets[row] == null)
                foldWidgets[row] = this.getFoldWidget(row);
            if (foldWidgets[row] != "start")
                continue;

            var range = this.getFoldWidgetRange(row);
            var rangeEndRow = range.end.row;
            if (range && range.isMultiLine()
                && rangeEndRow <= endRow
                && range.start.row >= startRow
            ) try ***REMOVED***
                var fold = this.addFold("...", range);
                fold.collapseChildren = depth;
                row = rangeEndRow;
        ***REMOVED*** catch(e) ***REMOVED******REMOVED***
    ***REMOVED***
***REMOVED***;
    this.$foldStyles = ***REMOVED***
        "manual": 1,
        "markbegin": 1,
        "markbeginend": 1
***REMOVED***;
    this.$foldStyle = "markbegin";
    this.setFoldStyle = function(style) ***REMOVED***
        if (!this.$foldStyles[style])
            throw new Error("invalid fold style: " + style + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
        
        if (this.$foldStyle == style)
            return;

        this.$foldStyle = style;
        
        if (style == "manual")
            this.unfold();
        var mode = this.$foldMode;
        this.$setFolding(null);
        this.$setFolding(mode);
***REMOVED***;

    this.$setFolding = function(foldMode) ***REMOVED***
        if (this.$foldMode == foldMode)
            return;
            
        this.$foldMode = foldMode;
        
        this.removeListener('change', this.$updateFoldWidgets);
        this._emit("changeAnnotation");
        
        if (!foldMode || this.$foldStyle == "manual") ***REMOVED***
            this.foldWidgets = null;
            return;
    ***REMOVED***
        
        this.foldWidgets = [];
        this.getFoldWidget = foldMode.getFoldWidget.bind(foldMode, this, this.$foldStyle);
        this.getFoldWidgetRange = foldMode.getFoldWidgetRange.bind(foldMode, this, this.$foldStyle);
        
        this.$updateFoldWidgets = this.updateFoldWidgets.bind(this);
        this.on('change', this.$updateFoldWidgets);
        
***REMOVED***;

    this.getParentFoldRangeData = function (row, ignoreCurrent) ***REMOVED***
        var fw = this.foldWidgets;
        if (!fw || (ignoreCurrent && fw[row]))
            return ***REMOVED******REMOVED***;

        var i = row - 1, firstRange;
        while (i >= 0) ***REMOVED***
            var c = fw[i];
            if (c == null)
                c = fw[i] = this.getFoldWidget(i);

            if (c == "start") ***REMOVED***
                var range = this.getFoldWidgetRange(i);
                if (!firstRange)
                    firstRange = range;
                if (range && range.end.row >= row)
                    break;
        ***REMOVED***
            i--;
    ***REMOVED***

        return ***REMOVED***
            range: i !== -1 && range,
            firstRange: firstRange
    ***REMOVED***;
***REMOVED***

    this.onFoldWidgetClick = function(row, e) ***REMOVED***
        var type = this.getFoldWidget(row);
        var line = this.getLine(row);
        e = e.domEvent;
        var children = e.shiftKey;
        var all = e.ctrlKey || e.metaKey;
        var siblings = e.altKey;

        var dir = type === "end" ? -1 : 1;
        var fold = this.getFoldAt(row, dir === -1 ? 0 : line.length, dir);

        if (fold) ***REMOVED***
            if (children || all)
                this.removeFold(fold);
            else
                this.expandFold(fold);
            return;
    ***REMOVED***

        var range = this.getFoldWidgetRange(row);
        if (range && !range.isMultiLine()) ***REMOVED***
            fold = this.getFoldAt(range.start.row, range.start.column, 1);
            if (fold && range.isEqual(fold.range)) ***REMOVED***
                this.removeFold(fold);
                return;
        ***REMOVED***
    ***REMOVED***
        
        if (siblings) ***REMOVED***
            var data = this.getParentFoldRangeData(row);
            if (data.range) ***REMOVED***
                var startRow = data.range.start.row + 1;
                var endRow = data.range.end.row;
        ***REMOVED***
            this.foldAll(startRow, endRow, all ? 10000 : 0);
    ***REMOVED*** else if (children) ***REMOVED***
            var endRow = range ? range.end.row : this.getLength();
            this.foldAll(row + 1, range.end.row, all ? 10000 : 0);
    ***REMOVED*** else if (range) ***REMOVED***
            if (all) 
                range.collapseChildren = 10000;
            this.addFold("...", range);
    ***REMOVED***
        
        if (!range)
            (e.target || e.srcElement).className += " ace_invalid"
***REMOVED***;

    this.updateFoldWidgets = function(e) ***REMOVED***
        var delta = e.data;
        var range = delta.range;
        var firstRow = range.start.row;
        var len = range.end.row - firstRow;

        if (len === 0) ***REMOVED***
            this.foldWidgets[firstRow] = null;
    ***REMOVED*** else if (delta.action == "removeText" || delta.action == "removeLines") ***REMOVED***
            this.foldWidgets.splice(firstRow, len + 1, null);
    ***REMOVED*** else ***REMOVED***
            var args = Array(len + 1);
            args.unshift(firstRow, 1);
            this.foldWidgets.splice.apply(this.foldWidgets, args);
    ***REMOVED***
***REMOVED***;

***REMOVED***

exports.Folding = Folding;

***REMOVED***);

define('ace/edit_session/fold_line', ['require', 'exports', 'module' , 'ace/range'], function(require, exports, module) ***REMOVED***


var Range = require("../range").Range;
function FoldLine(foldData, folds) ***REMOVED***
    this.foldData = foldData;
    if (Array.isArray(folds)) ***REMOVED***
        this.folds = folds;
***REMOVED*** else ***REMOVED***
        folds = this.folds = [ folds ];
***REMOVED***

    var last = folds[folds.length - 1]
    this.range = new Range(folds[0].start.row, folds[0].start.column,
                           last.end.row, last.end.column);
    this.start = this.range.start;
    this.end   = this.range.end;

    this.folds.forEach(function(fold) ***REMOVED***
        fold.setFoldLine(this);
***REMOVED*** this);
***REMOVED***

(function() ***REMOVED***
    this.shiftRow = function(shift) ***REMOVED***
        this.start.row += shift;
        this.end.row += shift;
        this.folds.forEach(function(fold) ***REMOVED***
            fold.start.row += shift;
            fold.end.row += shift;
    ***REMOVED***);
***REMOVED***

    this.addFold = function(fold) ***REMOVED***
        if (fold.sameRow) ***REMOVED***
            if (fold.start.row < this.startRow || fold.endRow > this.endRow) ***REMOVED***
                throw new Error("Can't add a fold to this FoldLine as it has no connection");
        ***REMOVED***
            this.folds.push(fold);
            this.folds.sort(function(a, b) ***REMOVED***
                return -a.range.compareEnd(b.start.row, b.start.column);
        ***REMOVED***);
            if (this.range.compareEnd(fold.start.row, fold.start.column) > 0) ***REMOVED***
                this.end.row = fold.end.row;
                this.end.column =  fold.end.column;
        ***REMOVED*** else if (this.range.compareStart(fold.end.row, fold.end.column) < 0) ***REMOVED***
                this.start.row = fold.start.row;
                this.start.column = fold.start.column;
        ***REMOVED***
    ***REMOVED*** else if (fold.start.row == this.end.row) ***REMOVED***
            this.folds.push(fold);
            this.end.row = fold.end.row;
            this.end.column = fold.end.column;
    ***REMOVED*** else if (fold.end.row == this.start.row) ***REMOVED***
            this.folds.unshift(fold);
            this.start.row = fold.start.row;
            this.start.column = fold.start.column;
    ***REMOVED*** else ***REMOVED***
            throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");
    ***REMOVED***
        fold.foldLine = this;
***REMOVED***

    this.containsRow = function(row) ***REMOVED***
        return row >= this.start.row && row <= this.end.row;
***REMOVED***

    this.walk = function(callback, endRow, endColumn) ***REMOVED***
        var lastEnd = 0,
            folds = this.folds,
            fold,
            comp, stop, isNewRow = true;

        if (endRow == null) ***REMOVED***
            endRow = this.end.row;
            endColumn = this.end.column;
    ***REMOVED***

        for (var i = 0; i < folds.length; i++) ***REMOVED***
            fold = folds[i];

            comp = fold.range.compareStart(endRow, endColumn);
            if (comp == -1) ***REMOVED***
                callback(null, endRow, endColumn, lastEnd, isNewRow);
                return;
        ***REMOVED***

            stop = callback(null, fold.start.row, fold.start.column, lastEnd, isNewRow);
            stop = !stop && callback(fold.placeholder, fold.start.row, fold.start.column, lastEnd);
            if (stop || comp == 0) ***REMOVED***
                return;
        ***REMOVED***
            isNewRow = !fold.sameRow;
            lastEnd = fold.end.column;
    ***REMOVED***
        callback(null, endRow, endColumn, lastEnd, isNewRow);
***REMOVED***

    this.getNextFoldTo = function(row, column) ***REMOVED***
        var fold, cmp;
        for (var i = 0; i < this.folds.length; i++) ***REMOVED***
            fold = this.folds[i];
            cmp = fold.range.compareEnd(row, column);
            if (cmp == -1) ***REMOVED***
                return ***REMOVED***
                    fold: fold,
                    kind: "after"
            ***REMOVED***;
        ***REMOVED*** else if (cmp == 0) ***REMOVED***
                return ***REMOVED***
                    fold: fold,
                    kind: "inside"
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        return null;
***REMOVED***

    this.addRemoveChars = function(row, column, len) ***REMOVED***
        var ret = this.getNextFoldTo(row, column),
            fold, folds;
        if (ret) ***REMOVED***
            fold = ret.fold;
            if (ret.kind == "inside"
                && fold.start.column != column
                && fold.start.row != row)
            ***REMOVED***
                window.console && window.console.log(row, column, fold);
        ***REMOVED*** else if (fold.start.row == row) ***REMOVED***
                folds = this.folds;
                var i = folds.indexOf(fold);
                if (i == 0) ***REMOVED***
                    this.start.column += len;
            ***REMOVED***
                for (i; i < folds.length; i++) ***REMOVED***
                    fold = folds[i];
                    fold.start.column += len;
                    if (!fold.sameRow) ***REMOVED***
                        return;
                ***REMOVED***
                    fold.end.column += len;
            ***REMOVED***
                this.end.column += len;
        ***REMOVED***
    ***REMOVED***
***REMOVED***

    this.split = function(row, column) ***REMOVED***
        var fold = this.getNextFoldTo(row, column).fold;
        var folds = this.folds;
        var foldData = this.foldData;

        if (!fold)
            return null;

        var i = folds.indexOf(fold);
        var foldBefore = folds[i - 1];
        this.end.row = foldBefore.end.row;
        this.end.column = foldBefore.end.column;
        folds = folds.splice(i, folds.length - i);

        var newFoldLine = new FoldLine(foldData, folds);
        foldData.splice(foldData.indexOf(this) + 1, 0, newFoldLine);
        return newFoldLine;
***REMOVED***

    this.merge = function(foldLineNext) ***REMOVED***
        var folds = foldLineNext.folds;
        for (var i = 0; i < folds.length; i++) ***REMOVED***
            this.addFold(folds[i]);
    ***REMOVED***
        var foldData = this.foldData;
        foldData.splice(foldData.indexOf(foldLineNext), 1);
***REMOVED***

    this.toString = function() ***REMOVED***
        var ret = [this.range.toString() + ": [" ];

        this.folds.forEach(function(fold) ***REMOVED***
            ret.push("  " + fold.toString());
    ***REMOVED***);
        ret.push("]")
        return ret.join("\n");
***REMOVED***

    this.idxToPosition = function(idx) ***REMOVED***
        var lastFoldEndColumn = 0;
        var fold;

        for (var i = 0; i < this.folds.length; i++) ***REMOVED***
            var fold = this.folds[i];

            idx -= fold.start.column - lastFoldEndColumn;
            if (idx < 0) ***REMOVED***
                return ***REMOVED***
                    row: fold.start.row,
                    column: fold.start.column + idx
            ***REMOVED***;
        ***REMOVED***

            idx -= fold.placeholder.length;
            if (idx < 0) ***REMOVED***
                return fold.start;
        ***REMOVED***

            lastFoldEndColumn = fold.end.column;
    ***REMOVED***

        return ***REMOVED***
            row: this.end.row,
            column: this.end.column + idx
    ***REMOVED***;
***REMOVED***
***REMOVED***).call(FoldLine.prototype);

exports.FoldLine = FoldLine;
***REMOVED***);

define('ace/edit_session/fold', ['require', 'exports', 'module' , 'ace/range', 'ace/range_list', 'ace/lib/oop'], function(require, exports, module) ***REMOVED***


var Range = require("../range").Range;
var RangeList = require("../range_list").RangeList;
var oop = require("../lib/oop")
var Fold = exports.Fold = function(range, placeholder) ***REMOVED***
    this.foldLine = null;
    this.placeholder = placeholder;
    this.range = range;
    this.start = range.start;
    this.end = range.end;

    this.sameRow = range.start.row == range.end.row;
    this.subFolds = this.ranges = [];
***REMOVED***;

oop.inherits(Fold, RangeList);

(function() ***REMOVED***

    this.toString = function() ***REMOVED***
        return '"' + this.placeholder + '" ' + this.range.toString();
***REMOVED***;

    this.setFoldLine = function(foldLine) ***REMOVED***
        this.foldLine = foldLine;
        this.subFolds.forEach(function(fold) ***REMOVED***
            fold.setFoldLine(foldLine);
    ***REMOVED***);
***REMOVED***;

    this.clone = function() ***REMOVED***
        var range = this.range.clone();
        var fold = new Fold(range, this.placeholder);
        this.subFolds.forEach(function(subFold) ***REMOVED***
            fold.subFolds.push(subFold.clone());
    ***REMOVED***);
        fold.collapseChildren = this.collapseChildren;
        return fold;
***REMOVED***;

    this.addSubFold = function(fold) ***REMOVED***
        if (this.range.isEqual(fold))
            return;

        if (!this.range.containsRange(fold))
            throw new Error("A fold can't intersect already existing fold" + fold.range + this.range);
        consumeRange(fold, this.start);

        var row = fold.start.row, column = fold.start.column;
        for (var i = 0, cmp = -1; i < this.subFolds.length; i++) ***REMOVED***
            cmp = this.subFolds[i].range.compare(row, column);
            if (cmp != 1)
                break;
    ***REMOVED***
        var afterStart = this.subFolds[i];

        if (cmp == 0)
            return afterStart.addSubFold(fold);
        var row = fold.range.end.row, column = fold.range.end.column;
        for (var j = i, cmp = -1; j < this.subFolds.length; j++) ***REMOVED***
            cmp = this.subFolds[j].range.compare(row, column);
            if (cmp != 1)
                break;
    ***REMOVED***
        var afterEnd = this.subFolds[j];

        if (cmp == 0)
            throw new Error("A fold can't intersect already existing fold" + fold.range + this.range);

        var consumedFolds = this.subFolds.splice(i, j - i, fold);
        fold.setFoldLine(this.foldLine);

        return fold;
***REMOVED***;
    
    this.restoreRange = function(range) ***REMOVED***
        return restoreRange(range, this.start);
***REMOVED***;

***REMOVED***).call(Fold.prototype);

function consumePoint(point, anchor) ***REMOVED***
    point.row -= anchor.row;
    if (point.row == 0)
        point.column -= anchor.column;
***REMOVED***
function consumeRange(range, anchor) ***REMOVED***
    consumePoint(range.start, anchor);
    consumePoint(range.end, anchor);
***REMOVED***
function restorePoint(point, anchor) ***REMOVED***
    if (point.row == 0)
        point.column += anchor.column;
    point.row += anchor.row;
***REMOVED***
function restoreRange(range, anchor) ***REMOVED***
    restorePoint(range.start, anchor);
    restorePoint(range.end, anchor);
***REMOVED***

***REMOVED***);

define('ace/range_list', ['require', 'exports', 'module' , 'ace/range'], function(require, exports, module) ***REMOVED***

var Range = require("./range").Range;
var comparePoints = Range.comparePoints;

var RangeList = function() ***REMOVED***
    this.ranges = [];
***REMOVED***;

(function() ***REMOVED***
    this.comparePoints = comparePoints;

    this.pointIndex = function(pos, excludeEdges, startIndex) ***REMOVED***
        var list = this.ranges;

        for (var i = startIndex || 0; i < list.length; i++) ***REMOVED***
            var range = list[i];
            var cmpEnd = comparePoints(pos, range.end);
            if (cmpEnd > 0)
                continue;
            var cmpStart = comparePoints(pos, range.start);
            if (cmpEnd === 0)
                return excludeEdges && cmpStart !== 0 ? -i-2 : i;
            if (cmpStart > 0 || (cmpStart === 0 && !excludeEdges))
                return i;

            return -i-1;
    ***REMOVED***
        return -i - 1;
***REMOVED***;

    this.add = function(range) ***REMOVED***
        var excludeEdges = !range.isEmpty();
        var startIndex = this.pointIndex(range.start, excludeEdges);
        if (startIndex < 0)
            startIndex = -startIndex - 1;

        var endIndex = this.pointIndex(range.end, excludeEdges, startIndex);

        if (endIndex < 0)
            endIndex = -endIndex - 1;
        else
            endIndex++;
        return this.ranges.splice(startIndex, endIndex - startIndex, range);
***REMOVED***;

    this.addList = function(list) ***REMOVED***
        var removed = [];
        for (var i = list.length; i--; ) ***REMOVED***
            removed.push.call(removed, this.add(list[i]));
    ***REMOVED***
        return removed;
***REMOVED***;

    this.substractPoint = function(pos) ***REMOVED***
        var i = this.pointIndex(pos);

        if (i >= 0)
            return this.ranges.splice(i, 1);
***REMOVED***;
    this.merge = function() ***REMOVED***
        var removed = [];
        var list = this.ranges;
        
        list = list.sort(function(a, b) ***REMOVED***
            return comparePoints(a.start, b.start);
    ***REMOVED***);
        
        var next = list[0], range;
        for (var i = 1; i < list.length; i++) ***REMOVED***
            range = next;
            next = list[i];
            var cmp = comparePoints(range.end, next.start);
            if (cmp < 0)
                continue;

            if (cmp == 0 && !range.isEmpty() && !next.isEmpty())
                continue;

            if (comparePoints(range.end, next.end) < 0) ***REMOVED***
                range.end.row = next.end.row;
                range.end.column = next.end.column;
        ***REMOVED***

            list.splice(i, 1);
            removed.push(next);
            next = range;
            i--;
    ***REMOVED***
        
        this.ranges = list;

        return removed;
***REMOVED***;

    this.contains = function(row, column) ***REMOVED***
        return this.pointIndex(***REMOVED***row: row, column: column***REMOVED***) >= 0;
***REMOVED***;

    this.containsPoint = function(pos) ***REMOVED***
        return this.pointIndex(pos) >= 0;
***REMOVED***;

    this.rangeAtPoint = function(pos) ***REMOVED***
        var i = this.pointIndex(pos);
        if (i >= 0)
            return this.ranges[i];
***REMOVED***;


    this.clipRows = function(startRow, endRow) ***REMOVED***
        var list = this.ranges;
        if (list[0].start.row > endRow || list[list.length - 1].start.row < startRow)
            return [];

        var startIndex = this.pointIndex(***REMOVED***row: startRow, column: 0***REMOVED***);
        if (startIndex < 0)
            startIndex = -startIndex - 1;
        var endIndex = this.pointIndex(***REMOVED***row: endRow, column: 0***REMOVED***, startIndex);
        if (endIndex < 0)
            endIndex = -endIndex - 1;

        var clipped = [];
        for (var i = startIndex; i < endIndex; i++) ***REMOVED***
            clipped.push(list[i]);
    ***REMOVED***
        return clipped;
***REMOVED***;

    this.removeAll = function() ***REMOVED***
        return this.ranges.splice(0, this.ranges.length);
***REMOVED***;

    this.attach = function(session) ***REMOVED***
        if (this.session)
            this.detach();

        this.session = session;
        this.onChange = this.$onChange.bind(this);

        this.session.on('change', this.onChange);
***REMOVED***;

    this.detach = function() ***REMOVED***
        if (!this.session)
            return;
        this.session.removeListener('change', this.onChange);
        this.session = null;
***REMOVED***;

    this.$onChange = function(e) ***REMOVED***
        var changeRange = e.data.range;
        if (e.data.action[0] == "i")***REMOVED***
            var start = changeRange.start;
            var end = changeRange.end;
    ***REMOVED*** else ***REMOVED***
            var end = changeRange.start;
            var start = changeRange.end;
    ***REMOVED***
        var startRow = start.row;
        var endRow = end.row;
        var lineDif = endRow - startRow;

        var colDiff = -start.column + end.column;
        var ranges = this.ranges;

        for (var i = 0, n = ranges.length; i < n; i++) ***REMOVED***
            var r = ranges[i];
            if (r.end.row < startRow)
                continue;
            if (r.start.row > startRow)
                break;

            if (r.start.row == startRow && r.start.column >= start.column ) ***REMOVED***
                if (r.start.column == start.column && this.$insertRight) ***REMOVED***
            ***REMOVED*** else ***REMOVED***
                    r.start.column += colDiff;
                    r.start.row += lineDif;
            ***REMOVED***
        ***REMOVED***
            if (r.end.row == startRow && r.end.column >= start.column) ***REMOVED***
                if (r.end.column == start.column && this.$insertRight) ***REMOVED***
                    continue;
            ***REMOVED***
                if (r.end.column == start.column && colDiff > 0 && i < n - 1) ***REMOVED***                
                    if (r.end.column > r.start.column && r.end.column == ranges[i+1].start.column)
                        r.end.column -= colDiff;
            ***REMOVED***
                r.end.column += colDiff;
                r.end.row += lineDif;
        ***REMOVED***
    ***REMOVED***

        if (lineDif != 0 && i < n) ***REMOVED***
            for (; i < n; i++) ***REMOVED***
                var r = ranges[i];
                r.start.row += lineDif;
                r.end.row += lineDif;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

***REMOVED***).call(RangeList.prototype);

exports.RangeList = RangeList;
***REMOVED***);

define('ace/edit_session/bracket_match', ['require', 'exports', 'module' , 'ace/token_iterator', 'ace/range'], function(require, exports, module) ***REMOVED***


var TokenIterator = require("../token_iterator").TokenIterator;
var Range = require("../range").Range;


function BracketMatch() ***REMOVED***

    this.findMatchingBracket = function(position, chr) ***REMOVED***
        if (position.column == 0) return null;

        var charBeforeCursor = chr || this.getLine(position.row).charAt(position.column-1);
        if (charBeforeCursor == "") return null;

        var match = charBeforeCursor.match(/([\(\[\***REMOVED***])|([\)\]\***REMOVED***])/);
        if (!match)
            return null;

        if (match[1])
            return this.$findClosingBracket(match[1], position);
        else
            return this.$findOpeningBracket(match[2], position);
***REMOVED***;
    
    this.getBracketRange = function(pos) ***REMOVED***
        var line = this.getLine(pos.row);
        var before = true, range;

        var chr = line.charAt(pos.column-1);
        var match = chr && chr.match(/([\(\[\***REMOVED***])|([\)\]\***REMOVED***])/);
        if (!match) ***REMOVED***
            chr = line.charAt(pos.column);
            pos = ***REMOVED***row: pos.row, column: pos.column + 1***REMOVED***;
            match = chr && chr.match(/([\(\[\***REMOVED***])|([\)\]\***REMOVED***])/);
            before = false;
    ***REMOVED***
        if (!match)
            return null;

        if (match[1]) ***REMOVED***
            var bracketPos = this.$findClosingBracket(match[1], pos);
            if (!bracketPos)
                return null;
            range = Range.fromPoints(pos, bracketPos);
            if (!before) ***REMOVED***
                range.end.column++;
                range.start.column--;
        ***REMOVED***
            range.cursor = range.end;
    ***REMOVED*** else ***REMOVED***
            var bracketPos = this.$findOpeningBracket(match[2], pos);
            if (!bracketPos)
                return null;
            range = Range.fromPoints(bracketPos, pos);
            if (!before) ***REMOVED***
                range.start.column++;
                range.end.column--;
        ***REMOVED***
            range.cursor = range.start;
    ***REMOVED***
        
        return range;
***REMOVED***;

    this.$brackets = ***REMOVED***
        ")": "(",
        "(": ")",
        "]": "[",
        "[": "]",
        "***REMOVED***": "***REMOVED***",
        "***REMOVED***": "***REMOVED***"
***REMOVED***;

    this.$findOpeningBracket = function(bracket, position, typeRe) ***REMOVED***
        var openBracket = this.$brackets[bracket];
        var depth = 1;

        var iterator = new TokenIterator(this, position.row, position.column);
        var token = iterator.getCurrentToken();
        if (!token)
            token = iterator.stepForward();
        if (!token)
            return;
        
         if (!typeRe)***REMOVED***
            typeRe = new RegExp(
                "(\\.?" +
                token.type.replace(".", "\\.").replace("rparen", ".paren")
                + ")+"
            );
    ***REMOVED***
        var valueIndex = position.column - iterator.getCurrentTokenColumn() - 2;
        var value = token.value;
        
        while (true) ***REMOVED***
        
            while (valueIndex >= 0) ***REMOVED***
                var chr = value.charAt(valueIndex);
                if (chr == openBracket) ***REMOVED***
                    depth -= 1;
                    if (depth == 0) ***REMOVED***
                        return ***REMOVED***row: iterator.getCurrentTokenRow(),
                            column: valueIndex + iterator.getCurrentTokenColumn()***REMOVED***;
                ***REMOVED***
            ***REMOVED***
                else if (chr == bracket) ***REMOVED***
                    depth += 1;
            ***REMOVED***
                valueIndex -= 1;
        ***REMOVED***
            do ***REMOVED***
                token = iterator.stepBackward();
        ***REMOVED*** while (token && !typeRe.test(token.type));

            if (token == null)
                break;
                
            value = token.value;
            valueIndex = value.length - 1;
    ***REMOVED***
        
        return null;
***REMOVED***;

    this.$findClosingBracket = function(bracket, position, typeRe) ***REMOVED***
        var closingBracket = this.$brackets[bracket];
        var depth = 1;

        var iterator = new TokenIterator(this, position.row, position.column);
        var token = iterator.getCurrentToken();
        if (!token)
            token = iterator.stepForward();
        if (!token)
            return;

        if (!typeRe)***REMOVED***
            typeRe = new RegExp(
                "(\\.?" +
                token.type.replace(".", "\\.").replace("lparen", ".paren")
                + ")+"
            );
    ***REMOVED***
        var valueIndex = position.column - iterator.getCurrentTokenColumn();

        while (true) ***REMOVED***

            var value = token.value;
            var valueLength = value.length;
            while (valueIndex < valueLength) ***REMOVED***
                var chr = value.charAt(valueIndex);
                if (chr == closingBracket) ***REMOVED***
                    depth -= 1;
                    if (depth == 0) ***REMOVED***
                        return ***REMOVED***row: iterator.getCurrentTokenRow(),
                            column: valueIndex + iterator.getCurrentTokenColumn()***REMOVED***;
                ***REMOVED***
            ***REMOVED***
                else if (chr == bracket) ***REMOVED***
                    depth += 1;
            ***REMOVED***
                valueIndex += 1;
        ***REMOVED***
            do ***REMOVED***
                token = iterator.stepForward();
        ***REMOVED*** while (token && !typeRe.test(token.type));

            if (token == null)
                break;

            valueIndex = 0;
    ***REMOVED***
        
        return null;
***REMOVED***;
***REMOVED***
exports.BracketMatch = BracketMatch;

***REMOVED***);

define('ace/layer/text', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/dom', 'ace/lib/lang', 'ace/lib/useragent', 'ace/lib/event_emitter'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var dom = require("../lib/dom");
var lang = require("../lib/lang");
var useragent = require("../lib/useragent");
var EventEmitter = require("../lib/event_emitter").EventEmitter;

var Text = function(parentEl) ***REMOVED***
    this.element = dom.createElement("div");
    this.element.className = "ace_layer ace_text-layer";
    parentEl.appendChild(this.element);

    this.$characterSize = ***REMOVED***width: 0, height: 0***REMOVED***;
    this.checkForSizeChanges();
    this.$pollSizeChanges();
***REMOVED***;

(function() ***REMOVED***

    oop.implement(this, EventEmitter);

    this.EOF_CHAR = "\xB6"; //"&para;";
    this.EOL_CHAR = "\xAC"; //"&not;";
    this.TAB_CHAR = "\u2192"; //"&rarr;" "\u21E5";
    this.SPACE_CHAR = "\xB7"; //"&middot;";
    this.$padding = 0;

    this.setPadding = function(padding) ***REMOVED***
        this.$padding = padding;
        this.element.style.padding = "0 " + padding + "px";
***REMOVED***;

    this.getLineHeight = function() ***REMOVED***
        return this.$characterSize.height || 0;
***REMOVED***;

    this.getCharacterWidth = function() ***REMOVED***
        return this.$characterSize.width || 0;
***REMOVED***;

    this.checkForSizeChanges = function() ***REMOVED***
        var size = this.$measureSizes();
        if (size && (this.$characterSize.width !== size.width || this.$characterSize.height !== size.height)) ***REMOVED***
            this.$measureNode.style.fontWeight = "bold";
            var boldSize = this.$measureSizes();
            this.$measureNode.style.fontWeight = "";
            this.$characterSize = size;
            this.allowBoldFonts = boldSize && boldSize.width === size.width && boldSize.height === size.height;
            this._emit("changeCharacterSize", ***REMOVED***data: size***REMOVED***);
    ***REMOVED***
***REMOVED***;

    this.$pollSizeChanges = function() ***REMOVED***
        var self = this;
        this.$pollSizeChangesTimer = setInterval(function() ***REMOVED***
            self.checkForSizeChanges();
    ***REMOVED*** 500);
***REMOVED***;

    this.$fontStyles = ***REMOVED***
        fontFamily : 1,
        fontSize : 1,
        fontWeight : 1,
        fontStyle : 1,
        lineHeight : 1
***REMOVED***;

    this.$measureSizes = useragent.isIE || useragent.isOldGecko ? function() ***REMOVED***
        var n = 1000;
        if (!this.$measureNode) ***REMOVED***
            var measureNode = this.$measureNode = dom.createElement("div");
            var style = measureNode.style;

            style.width = style.height = "auto";
            style.left = style.top = (-n * 40)  + "px";

            style.visibility = "hidden";
            style.position = "fixed";
            style.overflow = "visible";
            style.whiteSpace = "nowrap";
            measureNode.innerHTML = lang.stringRepeat("Xy", n);

            if (this.element.ownerDocument.body) ***REMOVED***
                this.element.ownerDocument.body.appendChild(measureNode);
        ***REMOVED*** else ***REMOVED***
                var container = this.element.parentNode;
                while (!dom.hasCssClass(container, "ace_editor"))
                    container = container.parentNode;
                container.appendChild(measureNode);
        ***REMOVED***
    ***REMOVED***
        if (!this.element.offsetWidth)
            return null;

        var style = this.$measureNode.style;
        var computedStyle = dom.computedStyle(this.element);
        for (var prop in this.$fontStyles)
            style[prop] = computedStyle[prop];

        var size = ***REMOVED***
            height: this.$measureNode.offsetHeight,
            width: this.$measureNode.offsetWidth / (n * 2)
    ***REMOVED***;
        if (size.width == 0 || size.height == 0)
            return null;

        return size;
***REMOVED***
    : function() ***REMOVED***
        if (!this.$measureNode) ***REMOVED***
            var measureNode = this.$measureNode = dom.createElement("div");
            var style = measureNode.style;

            style.width = style.height = "auto";
            style.left = style.top = -100 + "px";

            style.visibility = "hidden";
            style.position = "fixed";
            style.overflow = "visible";
            style.whiteSpace = "nowrap";
            measureNode.innerHTML = lang.stringRepeat("X", 100);

            var container = this.element.parentNode;
            while (container && !dom.hasCssClass(container, "ace_editor"))
                container = container.parentNode;

            if (!container)
                return this.$measureNode = null;

            container.appendChild(measureNode);
    ***REMOVED***

        var rect = this.$measureNode.getBoundingClientRect();

        var size = ***REMOVED***
            height: rect.height,
            width: rect.width / 100
    ***REMOVED***;
        if (size.width == 0 || size.height == 0)
            return null;

        return size;
***REMOVED***;

    this.setSession = function(session) ***REMOVED***
        this.session = session;
        this.$computeTabString();
***REMOVED***;

    this.showInvisibles = false;
    this.setShowInvisibles = function(showInvisibles) ***REMOVED***
        if (this.showInvisibles == showInvisibles)
            return false;

        this.showInvisibles = showInvisibles;
        this.$computeTabString();
        return true;
***REMOVED***;

    this.displayIndentGuides = true;
    this.setDisplayIndentGuides = function(display) ***REMOVED***
        if (this.displayIndentGuides == display)
            return false;

        this.displayIndentGuides = display;
        this.$computeTabString();
        return true;
***REMOVED***;

    this.$tabStrings = [];
    this.onChangeTabSize =
    this.$computeTabString = function() ***REMOVED***
        var tabSize = this.session.getTabSize();
        this.tabSize = tabSize;
        var tabStr = this.$tabStrings = [0];
        for (var i = 1; i < tabSize + 1; i++) ***REMOVED***
            if (this.showInvisibles) ***REMOVED***
                tabStr.push("<span class='ace_invisible'>"
                    + this.TAB_CHAR
                    + lang.stringRepeat("\xa0", i - 1)
                    + "</span>");
        ***REMOVED*** else ***REMOVED***
                tabStr.push(lang.stringRepeat("\xa0", i));
        ***REMOVED***
    ***REMOVED***
        if (this.displayIndentGuides) ***REMOVED***
            this.$indentGuideRe =  /\s\S| \t|\t |\s$/;
            var className = "ace_indent-guide";
            if (this.showInvisibles) ***REMOVED***
                className += " ace_invisible";
                var spaceContent = lang.stringRepeat(this.SPACE_CHAR, this.tabSize);
                var tabContent = this.TAB_CHAR + lang.stringRepeat("\xa0", this.tabSize - 1);
        ***REMOVED*** else***REMOVED***
                var spaceContent = lang.stringRepeat("\xa0", this.tabSize);
                var tabContent = spaceContent;
        ***REMOVED***

            this.$tabStrings[" "] = "<span class='" + className + "'>" + spaceContent + "</span>";
            this.$tabStrings["\t"] = "<span class='" + className + "'>" + tabContent + "</span>";
    ***REMOVED***
***REMOVED***;

    this.updateLines = function(config, firstRow, lastRow) ***REMOVED***
        if (this.config.lastRow != config.lastRow ||
            this.config.firstRow != config.firstRow) ***REMOVED***
            this.scrollLines(config);
    ***REMOVED***
        this.config = config;

        var first = Math.max(firstRow, config.firstRow);
        var last = Math.min(lastRow, config.lastRow);

        var lineElements = this.element.childNodes;
        var lineElementsIdx = 0;

        for (var row = config.firstRow; row < first; row++) ***REMOVED***
            var foldLine = this.session.getFoldLine(row);
            if (foldLine) ***REMOVED***
                if (foldLine.containsRow(first)) ***REMOVED***
                    first = foldLine.start.row;
                    break;
            ***REMOVED*** else ***REMOVED***
                    row = foldLine.end.row;
            ***REMOVED***
        ***REMOVED***
            lineElementsIdx ++;
    ***REMOVED***

        var row = first;
        var foldLine = this.session.getNextFoldLine(row);
        var foldStart = foldLine ? foldLine.start.row : Infinity;

        while (true) ***REMOVED***
            if (row > foldStart) ***REMOVED***
                row = foldLine.end.row+1;
                foldLine = this.session.getNextFoldLine(row, foldLine);
                foldStart = foldLine ? foldLine.start.row :Infinity;
        ***REMOVED***
            if (row > last)
                break;

            var lineElement = lineElements[lineElementsIdx++];
            if (lineElement) ***REMOVED***
                var html = [];
                this.$renderLine(
                    html, row, !this.$useLineGroups(), row == foldStart ? foldLine : false
                );
                dom.setInnerHtml(lineElement, html.join(""));
        ***REMOVED***
            row++;
    ***REMOVED***
***REMOVED***;

    this.scrollLines = function(config) ***REMOVED***
        var oldConfig = this.config;
        this.config = config;

        if (!oldConfig || oldConfig.lastRow < config.firstRow)
            return this.update(config);

        if (config.lastRow < oldConfig.firstRow)
            return this.update(config);

        var el = this.element;
        if (oldConfig.firstRow < config.firstRow)
            for (var row=this.session.getFoldedRowCount(oldConfig.firstRow, config.firstRow - 1); row>0; row--)
                el.removeChild(el.firstChild);

        if (oldConfig.lastRow > config.lastRow)
            for (var row=this.session.getFoldedRowCount(config.lastRow + 1, oldConfig.lastRow); row>0; row--)
                el.removeChild(el.lastChild);

        if (config.firstRow < oldConfig.firstRow) ***REMOVED***
            var fragment = this.$renderLinesFragment(config, config.firstRow, oldConfig.firstRow - 1);
            if (el.firstChild)
                el.insertBefore(fragment, el.firstChild);
            else
                el.appendChild(fragment);
    ***REMOVED***

        if (config.lastRow > oldConfig.lastRow) ***REMOVED***
            var fragment = this.$renderLinesFragment(config, oldConfig.lastRow + 1, config.lastRow);
            el.appendChild(fragment);
    ***REMOVED***
***REMOVED***;

    this.$renderLinesFragment = function(config, firstRow, lastRow) ***REMOVED***
        var fragment = this.element.ownerDocument.createDocumentFragment();
        var row = firstRow;
        var foldLine = this.session.getNextFoldLine(row);
        var foldStart = foldLine ? foldLine.start.row : Infinity;

        while (true) ***REMOVED***
            if (row > foldStart) ***REMOVED***
                row = foldLine.end.row+1;
                foldLine = this.session.getNextFoldLine(row, foldLine);
                foldStart = foldLine ? foldLine.start.row : Infinity;
        ***REMOVED***
            if (row > lastRow)
                break;

            var container = dom.createElement("div");

            var html = [];
            this.$renderLine(html, row, false, row == foldStart ? foldLine : false);
            container.innerHTML = html.join("");
            if (this.$useLineGroups()) ***REMOVED***
                container.className = 'ace_line_group';
                fragment.appendChild(container);
        ***REMOVED*** else ***REMOVED***
                var lines = container.childNodes
                while(lines.length)
                    fragment.appendChild(lines[0]);
        ***REMOVED***

            row++;
    ***REMOVED***
        return fragment;
***REMOVED***;

    this.update = function(config) ***REMOVED***
        this.config = config;

        var html = [];
        var firstRow = config.firstRow, lastRow = config.lastRow;

        var row = firstRow;
        var foldLine = this.session.getNextFoldLine(row);
        var foldStart = foldLine ? foldLine.start.row : Infinity;

        while (true) ***REMOVED***
            if (row > foldStart) ***REMOVED***
                row = foldLine.end.row+1;
                foldLine = this.session.getNextFoldLine(row, foldLine);
                foldStart = foldLine ? foldLine.start.row :Infinity;
        ***REMOVED***
            if (row > lastRow)
                break;

            if (this.$useLineGroups())
                html.push("<div class='ace_line_group'>")

            this.$renderLine(html, row, false, row == foldStart ? foldLine : false);

            if (this.$useLineGroups())
                html.push("</div>"); // end the line group

            row++;
    ***REMOVED***
        this.element = dom.setInnerHtml(this.element, html.join(""));
***REMOVED***;

    this.$textToken = ***REMOVED***
        "text": true,
        "rparen": true,
        "lparen": true
***REMOVED***;

    this.$renderToken = function(stringBuilder, screenColumn, token, value) ***REMOVED***
        var self = this;
        var replaceReg = /\t|&|<|( +)|([\x00-\x1f\x80-\xa0\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\u3000\uFEFF])|[\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]/g;
        var replaceFunc = function(c, a, b, tabIdx, idx4) ***REMOVED***
            if (a) ***REMOVED***
                return self.showInvisibles ?
                    "<span class='ace_invisible'>" + lang.stringRepeat(self.SPACE_CHAR, c.length) + "</span>" :
                    lang.stringRepeat("\xa0", c.length);
        ***REMOVED*** else if (c == "&") ***REMOVED***
                return "&#38;";
        ***REMOVED*** else if (c == "<") ***REMOVED***
                return "&#60;";
        ***REMOVED*** else if (c == "\t") ***REMOVED***
                var tabSize = self.session.getScreenTabSize(screenColumn + tabIdx);
                screenColumn += tabSize - 1;
                return self.$tabStrings[tabSize];
        ***REMOVED*** else if (c == "\u3000") ***REMOVED***
                var classToUse = self.showInvisibles ? "ace_cjk ace_invisible" : "ace_cjk";
                var space = self.showInvisibles ? self.SPACE_CHAR : "";
                screenColumn += 1;
                return "<span class='" + classToUse + "' style='width:" +
                    (self.config.characterWidth * 2) +
                    "px'>" + space + "</span>";
        ***REMOVED*** else if (b) ***REMOVED***
                return "<span class='ace_invisible ace_invalid'>" + self.SPACE_CHAR + "</span>";
        ***REMOVED*** else ***REMOVED***
                screenColumn += 1;
                return "<span class='ace_cjk' style='width:" +
                    (self.config.characterWidth * 2) +
                    "px'>" + c + "</span>";
        ***REMOVED***
    ***REMOVED***;

        var output = value.replace(replaceReg, replaceFunc);

        if (!this.$textToken[token.type]) ***REMOVED***
            var classes = "ace_" + token.type.replace(/\./g, " ace_");
            var style = "";
            if (token.type == "fold")
                style = " style='width:" + (token.value.length * this.config.characterWidth) + "px;' ";
            stringBuilder.push("<span class='", classes, "'", style, ">", output, "</span>");
    ***REMOVED***
        else ***REMOVED***
            stringBuilder.push(output);
    ***REMOVED***
        return screenColumn + value.length;
***REMOVED***;

    this.renderIndentGuide = function(stringBuilder, value, max) ***REMOVED***
        var cols = value.search(this.$indentGuideRe);
        if (cols <= 0 || cols >= max)
            return value;
        if (value[0] == " ") ***REMOVED***
            cols -= cols % this.tabSize;
            stringBuilder.push(lang.stringRepeat(this.$tabStrings[" "], cols/this.tabSize));
            return value.substr(cols);
    ***REMOVED*** else if (value[0] == "\t") ***REMOVED***
            stringBuilder.push(lang.stringRepeat(this.$tabStrings["\t"], cols));
            return value.substr(cols);
    ***REMOVED***
        return value;
***REMOVED***;

    this.$renderWrappedLine = function(stringBuilder, tokens, splits, onlyContents) ***REMOVED***
        var chars = 0;
        var split = 0;
        var splitChars = splits[0];
        var screenColumn = 0;

        for (var i = 0; i < tokens.length; i++) ***REMOVED***
            var token = tokens[i];
            var value = token.value;
            if (i == 0 && this.displayIndentGuides) ***REMOVED***
                chars = value.length;
                value = this.renderIndentGuide(stringBuilder, value, splitChars);
                if (!value)
                    continue;
                chars -= value.length;
        ***REMOVED***

            if (chars + value.length < splitChars) ***REMOVED***
                screenColumn = this.$renderToken(stringBuilder, screenColumn, token, value);
                chars += value.length;
        ***REMOVED*** else ***REMOVED***
                while (chars + value.length >= splitChars) ***REMOVED***
                    screenColumn = this.$renderToken(
                        stringBuilder, screenColumn,
                        token, value.substring(0, splitChars - chars)
                    );
                    value = value.substring(splitChars - chars);
                    chars = splitChars;

                    if (!onlyContents) ***REMOVED***
                        stringBuilder.push("</div>",
                            "<div class='ace_line' style='height:",
                            this.config.lineHeight, "px'>"
                        );
                ***REMOVED***

                    split ++;
                    screenColumn = 0;
                    splitChars = splits[split] || Number.MAX_VALUE;
            ***REMOVED***
                if (value.length != 0) ***REMOVED***
                    chars += value.length;
                    screenColumn = this.$renderToken(
                        stringBuilder, screenColumn, token, value
                    );
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

    this.$renderSimpleLine = function(stringBuilder, tokens) ***REMOVED***
        var screenColumn = 0;
        var token = tokens[0];
        var value = token.value;
        if (this.displayIndentGuides)
            value = this.renderIndentGuide(stringBuilder, value);
        if (value)
            screenColumn = this.$renderToken(stringBuilder, screenColumn, token, value);
        for (var i = 1; i < tokens.length; i++) ***REMOVED***
            token = tokens[i];
            value = token.value;
            screenColumn = this.$renderToken(stringBuilder, screenColumn, token, value);
    ***REMOVED***
***REMOVED***;
    this.$renderLine = function(stringBuilder, row, onlyContents, foldLine) ***REMOVED***
        if (!foldLine && foldLine != false)
            foldLine = this.session.getFoldLine(row);

        if (foldLine)
            var tokens = this.$getFoldLineTokens(row, foldLine);
        else
            var tokens = this.session.getTokens(row);


        if (!onlyContents) ***REMOVED***
            stringBuilder.push(
                "<div class='ace_line' style='height:", this.config.lineHeight, "px'>"
            );
    ***REMOVED***

        if (tokens.length) ***REMOVED***
            var splits = this.session.getRowSplitData(row);
            if (splits && splits.length)
                this.$renderWrappedLine(stringBuilder, tokens, splits, onlyContents);
            else
                this.$renderSimpleLine(stringBuilder, tokens);
    ***REMOVED***

        if (this.showInvisibles) ***REMOVED***
            if (foldLine)
                row = foldLine.end.row

            stringBuilder.push(
                "<span class='ace_invisible'>",
                row == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR,
                "</span>"
            );
    ***REMOVED***
        if (!onlyContents)
            stringBuilder.push("</div>");
***REMOVED***;

    this.$getFoldLineTokens = function(row, foldLine) ***REMOVED***
        var session = this.session;
        var renderTokens = [];

        function addTokens(tokens, from, to) ***REMOVED***
            var idx = 0, col = 0;
            while ((col + tokens[idx].value.length) < from) ***REMOVED***
                col += tokens[idx].value.length;
                idx++;

                if (idx == tokens.length)
                    return;
        ***REMOVED***
            if (col != from) ***REMOVED***
                var value = tokens[idx].value.substring(from - col);
                if (value.length > (to - from))
                    value = value.substring(0, to - from);

                renderTokens.push(***REMOVED***
                    type: tokens[idx].type,
                    value: value
            ***REMOVED***);

                col = from + value.length;
                idx += 1;
        ***REMOVED***

            while (col < to && idx < tokens.length) ***REMOVED***
                var value = tokens[idx].value;
                if (value.length + col > to) ***REMOVED***
                    renderTokens.push(***REMOVED***
                        type: tokens[idx].type,
                        value: value.substring(0, to - col)
                ***REMOVED***);
            ***REMOVED*** else
                    renderTokens.push(tokens[idx]);
                col += value.length;
                idx += 1;
        ***REMOVED***
    ***REMOVED***

        var tokens = session.getTokens(row);
        foldLine.walk(function(placeholder, row, column, lastColumn, isNewRow) ***REMOVED***
            if (placeholder != null) ***REMOVED***
                renderTokens.push(***REMOVED***
                    type: "fold",
                    value: placeholder
            ***REMOVED***);
        ***REMOVED*** else ***REMOVED***
                if (isNewRow)
                    tokens = session.getTokens(row);

                if (tokens.length)
                    addTokens(tokens, lastColumn, column);
        ***REMOVED***
    ***REMOVED*** foldLine.end.row, this.session.getLine(foldLine.end.row).length);

        return renderTokens;
***REMOVED***;

    this.$useLineGroups = function() ***REMOVED***
        return this.session.getUseWrapMode();
***REMOVED***;

    this.destroy = function() ***REMOVED***
        clearInterval(this.$pollSizeChangesTimer);
        if (this.$measureNode)
            this.$measureNode.parentNode.removeChild(this.$measureNode);
        delete this.$measureNode;
***REMOVED***;

***REMOVED***).call(Text.prototype);

exports.Text = Text;

***REMOVED***);

define('ace/lib/useragent', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
exports.OS = ***REMOVED***
    LINUX: "LINUX",
    MAC: "MAC",
    WINDOWS: "WINDOWS"
***REMOVED***;
exports.getOS = function() ***REMOVED***
    if (exports.isMac) ***REMOVED***
        return exports.OS.MAC;
***REMOVED*** else if (exports.isLinux) ***REMOVED***
        return exports.OS.LINUX;
***REMOVED*** else ***REMOVED***
        return exports.OS.WINDOWS;
***REMOVED***
***REMOVED***;
if (typeof navigator != "object")
    return;

var os = (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase();
var ua = navigator.userAgent;
exports.isWin = (os == "win");
exports.isMac = (os == "mac");
exports.isLinux = (os == "linux");
exports.isIE = 
    (navigator.appName == "Microsoft Internet Explorer" || navigator.appName.indexOf("MSAppHost") >= 0)
    && parseFloat(navigator.userAgent.match(/MSIE ([0-9]+[\.0-9]+)/)[1]);
    
exports.isOldIE = exports.isIE && exports.isIE < 9;
exports.isGecko = exports.isMozilla = window.controllers && window.navigator.product === "Gecko";
exports.isOldGecko = exports.isGecko && parseInt((navigator.userAgent.match(/rv\:(\d+)/)||[])[1], 10) < 4;
exports.isOpera = window.opera && Object.prototype.toString.call(window.opera) == "[object Opera]";
exports.isWebKit = parseFloat(ua.split("WebKit/")[1]) || undefined;

exports.isChrome = parseFloat(ua.split(" Chrome/")[1]) || undefined;

exports.isAIR = ua.indexOf("AdobeAIR") >= 0;

exports.isIPad = ua.indexOf("iPad") >= 0;

exports.isTouchPad = ua.indexOf("TouchPad") >= 0;

***REMOVED***);

define('ace/theme/textmate', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***


exports.isDark = false;
exports.cssClass = "ace-tm";
exports.cssText = ".ace-tm .ace_gutter ***REMOVED***\
background: #f0f0f0;\
color: #333;\
***REMOVED***\
.ace-tm .ace_print-margin ***REMOVED***\
width: 1px;\
background: #e8e8e8;\
***REMOVED***\
.ace-tm .ace_fold ***REMOVED***\
background-color: #6B72E6;\
***REMOVED***\
.ace-tm ***REMOVED***\
background-color: #FFFFFF;\
***REMOVED***\
.ace-tm .ace_cursor ***REMOVED***\
color: black;\
***REMOVED***\
.ace-tm .ace_invisible ***REMOVED***\
color: rgb(191, 191, 191);\
***REMOVED***\
.ace-tm .ace_storage,\
.ace-tm .ace_keyword ***REMOVED***\
color: blue;\
***REMOVED***\
.ace-tm .ace_constant ***REMOVED***\
color: rgb(197, 6, 11);\
***REMOVED***\
.ace-tm .ace_constant.ace_buildin ***REMOVED***\
color: rgb(88, 72, 246);\
***REMOVED***\
.ace-tm .ace_constant.ace_language ***REMOVED***\
color: rgb(88, 92, 246);\
***REMOVED***\
.ace-tm .ace_constant.ace_library ***REMOVED***\
color: rgb(6, 150, 14);\
***REMOVED***\
.ace-tm .ace_invalid ***REMOVED***\
background-color: rgba(255, 0, 0, 0.1);\
color: red;\
***REMOVED***\
.ace-tm .ace_support.ace_function ***REMOVED***\
color: rgb(60, 76, 114);\
***REMOVED***\
.ace-tm .ace_support.ace_constant ***REMOVED***\
color: rgb(6, 150, 14);\
***REMOVED***\
.ace-tm .ace_support.ace_type,\
.ace-tm .ace_support.ace_class ***REMOVED***\
color: rgb(109, 121, 222);\
***REMOVED***\
.ace-tm .ace_keyword.ace_operator ***REMOVED***\
color: rgb(104, 118, 135);\
***REMOVED***\
.ace-tm .ace_string ***REMOVED***\
color: rgb(3, 106, 7);\
***REMOVED***\
.ace-tm .ace_comment ***REMOVED***\
color: rgb(76, 136, 107);\
***REMOVED***\
.ace-tm .ace_comment.ace_doc ***REMOVED***\
color: rgb(0, 102, 255);\
***REMOVED***\
.ace-tm .ace_comment.ace_doc.ace_tag ***REMOVED***\
color: rgb(128, 159, 191);\
***REMOVED***\
.ace-tm .ace_constant.ace_numeric ***REMOVED***\
color: rgb(0, 0, 205);\
***REMOVED***\
.ace-tm .ace_variable ***REMOVED***\
color: rgb(49, 132, 149);\
***REMOVED***\
.ace-tm .ace_xml-pe ***REMOVED***\
color: rgb(104, 104, 91);\
***REMOVED***\
.ace-tm .ace_entity.ace_name.ace_function ***REMOVED***\
color: #0000A2;\
***REMOVED***\
.ace-tm .ace_heading ***REMOVED***\
color: rgb(12, 7, 255);\
***REMOVED***\
.ace-tm .ace_list ***REMOVED***\
color:rgb(185, 6, 144);\
***REMOVED***\
.ace-tm .ace_meta.ace_tag ***REMOVED***\
color:rgb(0, 22, 142);\
***REMOVED***\
.ace-tm .ace_string.ace_regex ***REMOVED***\
color: rgb(255, 0, 0)\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_selection ***REMOVED***\
background: rgb(181, 213, 255);\
***REMOVED***\
.ace-tm.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px white;\
border-radius: 2px;\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(252, 255, 0);\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_stack ***REMOVED***\
background: rgb(164, 229, 101);\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_active-line ***REMOVED***\
background: rgba(0, 0, 0, 0.07);\
***REMOVED***\
.ace-tm .ace_gutter-active-line ***REMOVED***\
background-color : #dcdcdc;\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_selected-word ***REMOVED***\
background: rgb(250, 250, 255);\
border: 1px solid rgb(200, 200, 250);\
***REMOVED***\
.ace-tm .ace_indent-guide ***REMOVED***\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
***REMOVED***\
";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
;
            (function() ***REMOVED***
                window.require(["ace/ext/static_highlight"], function(a) ***REMOVED***
                    a && a.config.init();
                    if (!window.ace)
                        window.ace = ***REMOVED******REMOVED***;
                    for (var key in a) if (a.hasOwnProperty(key))
                        ace[key] = a[key];
            ***REMOVED***);
        ***REMOVED***)();
        