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


define('kitchen-sink/demo', ['require', 'exports', 'module' , 'ace/lib/fixoldbrowsers', 'ace/multi_select', 'ace/ext/spellcheck', 'kitchen-sink/inline_editor', 'kitchen-sink/dev_util', 'kitchen-sink/file_drop', 'ace/config', 'ace/lib/dom', 'ace/lib/net', 'ace/lib/lang', 'ace/lib/useragent', 'ace/lib/event', 'ace/theme/textmate', 'ace/edit_session', 'ace/undomanager', 'ace/keyboard/hash_handler', 'ace/virtual_renderer', 'ace/editor', 'ace/ext/whitespace', 'kitchen-sink/doclist', 'ace/ext/modelist', 'ace/ext/themelist', 'kitchen-sink/layout', 'kitchen-sink/token_tooltip', 'kitchen-sink/util', 'ace/ext/elastic_tabstops_lite', 'ace/incremental_search', 'ace/worker/worker_client', 'ace/split', 'ace/keyboard/vim', 'ace/ext/statusbar', 'ace/ext/emmet', 'ace/snippets', 'ace/ext/language_tools', 'ace/ext/beautify'], function(require, exports, module) ***REMOVED***


require("ace/lib/fixoldbrowsers");

require("ace/multi_select");
require("ace/ext/spellcheck");
require("./inline_editor");
require("./dev_util");
require("./file_drop");

var config = require("ace/config");
config.init();
var env = ***REMOVED******REMOVED***;

var dom = require("ace/lib/dom");
var net = require("ace/lib/net");
var lang = require("ace/lib/lang");
var useragent = require("ace/lib/useragent");

var event = require("ace/lib/event");
var theme = require("ace/theme/textmate");
var EditSession = require("ace/edit_session").EditSession;
var UndoManager = require("ace/undomanager").UndoManager;

var HashHandler = require("ace/keyboard/hash_handler").HashHandler;

var Renderer = require("ace/virtual_renderer").VirtualRenderer;
var Editor = require("ace/editor").Editor;

var whitespace = require("ace/ext/whitespace");



var doclist = require("./doclist");
var modelist = require("ace/ext/modelist");
var themelist = require("ace/ext/themelist");
var layout = require("./layout");
var TokenTooltip = require("./token_tooltip").TokenTooltip;
var util = require("./util");
var saveOption = util.saveOption;
var fillDropdown = util.fillDropdown;
var bindCheckbox = util.bindCheckbox;
var bindDropdown = util.bindDropdown;

var ElasticTabstopsLite = require("ace/ext/elastic_tabstops_lite").ElasticTabstopsLite;

var IncrementalSearch = require("ace/incremental_search").IncrementalSearch;


var workerModule = require("ace/worker/worker_client");
if (location.href.indexOf("noworker") !== -1) ***REMOVED***
    workerModule.WorkerClient = workerModule.UIWorkerClient;
***REMOVED***
var container = document.getElementById("editor-container");
var Split = require("ace/split").Split;
var split = new Split(container, theme, 1);
env.editor = split.getEditor(0);
split.on("focus", function(editor) ***REMOVED***
    env.editor = editor;
    updateUIEditorOptions();
***REMOVED***);
env.split = split;
window.env = env;


var consoleEl = dom.createElement("div");
container.parentNode.appendChild(consoleEl);
consoleEl.style.cssText = "position:fixed; bottom:1px; right:0;\
border:1px solid #baf; z-index:100";

var cmdLine = new layout.singleLineEditor(consoleEl);
cmdLine.editor = env.editor;
env.editor.cmdLine = cmdLine;

env.editor.showCommandLine = function(val) ***REMOVED***
    this.cmdLine.focus();
    if (typeof val == "string")
        this.cmdLine.setValue(val, 1);
***REMOVED***;
env.editor.commands.addCommands([***REMOVED***
    name: "gotoline",
    bindKey: ***REMOVED***win: "Ctrl-L", mac: "Command-L"***REMOVED***,
    exec: function(editor, line) ***REMOVED***
        if (typeof line == "object") ***REMOVED***
            var arg = this.name + " " + editor.getCursorPosition().row;
            editor.cmdLine.setValue(arg, 1);
            editor.cmdLine.focus();
            return;
    ***REMOVED***
        line = parseInt(line, 10);
        if (!isNaN(line))
            editor.gotoLine(line);
***REMOVED***
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "snippet",
    bindKey: ***REMOVED***win: "Alt-C", mac: "Command-Alt-C"***REMOVED***,
    exec: function(editor, needle) ***REMOVED***
        if (typeof needle == "object") ***REMOVED***
            editor.cmdLine.setValue("snippet ", 1);
            editor.cmdLine.focus();
            return;
    ***REMOVED***
        var s = snippetManager.getSnippetByName(needle, editor);
        if (s)
            snippetManager.insertSnippet(editor, s.content);
***REMOVED***
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "focusCommandLine",
    bindKey: "shift-esc|ctrl-`",
    exec: function(editor, needle) ***REMOVED*** editor.cmdLine.focus(); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "nextFile",
    bindKey: "Ctrl-tab",
    exec: function(editor) ***REMOVED*** doclist.cycleOpen(editor, 1); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "previousFile",
    bindKey: "Ctrl-shift-tab",
    exec: function(editor) ***REMOVED*** doclist.cycleOpen(editor, -1); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "execute",
    bindKey: "ctrl+enter",
    exec: function(editor) ***REMOVED***
        try ***REMOVED***
            var r = window.eval(editor.getCopyText() || editor.getValue());
    ***REMOVED*** catch(e) ***REMOVED***
            r = e;
    ***REMOVED***
        editor.cmdLine.setValue(r + "");
***REMOVED***
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "showKeyboardShortcuts",
    bindKey: ***REMOVED***win: "Ctrl-Alt-h", mac: "Command-Alt-h"***REMOVED***,
    exec: function(editor) ***REMOVED***
        config.loadModule("ace/ext/keybinding_menu", function(module) ***REMOVED***
            module.init(editor);
            editor.showKeyboardShortcuts();
    ***REMOVED***);
***REMOVED***
***REMOVED***, ***REMOVED***
    name: "increaseFontSize",
    bindKey: "Ctrl-+",
    exec: function(editor) ***REMOVED***
        var size = parseInt(editor.getFontSize(), 10) || 12;
        editor.setFontSize(size + 1);
***REMOVED***
***REMOVED***, ***REMOVED***
    name: "decreaseFontSize",
    bindKey: "Ctrl+-",
    exec: function(editor) ***REMOVED***
        var size = parseInt(editor.getFontSize(), 10) || 12;
        editor.setFontSize(Math.max(size - 1 || 1));
***REMOVED***
***REMOVED***, ***REMOVED***
    name: "resetFontSize",
    bindKey: "Ctrl+0",
    exec: function(editor) ***REMOVED***
        editor.setFontSize(12);
***REMOVED***
***REMOVED***]);


env.editor.commands.addCommands(whitespace.commands);

cmdLine.commands.bindKeys(***REMOVED***
    "Shift-Return|Ctrl-Return|Alt-Return": function(cmdLine) ***REMOVED*** cmdLine.insert("\n"); ***REMOVED***,
    "Esc|Shift-Esc": function(cmdLine)***REMOVED*** cmdLine.editor.focus(); ***REMOVED***,
    "Return": function(cmdLine)***REMOVED***
        var command = cmdLine.getValue().split(/\s+/);
        var editor = cmdLine.editor;
        editor.commands.exec(command[0], editor, command[1]);
        editor.focus();
***REMOVED***
***REMOVED***);

cmdLine.commands.removeCommands(["find", "gotoline", "findall", "replace", "replaceall"]);

var commands = env.editor.commands;
commands.addCommand(***REMOVED***
    name: "save",
    bindKey: ***REMOVED***win: "Ctrl-S", mac: "Command-S"***REMOVED***,
    exec: function(arg) ***REMOVED***
        var session = env.editor.session;
        var name = session.name.match(/[^\/]+$/);
        localStorage.setItem(
            "saved_file:" + name,
            session.getValue()
        );
        env.editor.cmdLine.setValue("saved "+ name);
***REMOVED***
***REMOVED***);

commands.addCommand(***REMOVED***
    name: "load",
    bindKey: ***REMOVED***win: "Ctrl-O", mac: "Command-O"***REMOVED***,
    exec: function(arg) ***REMOVED***
        var session = env.editor.session;
        var name = session.name.match(/[^\/]+$/);
        var value = localStorage.getItem("saved_file:" + name);
        if (typeof value == "string") ***REMOVED***
            session.setValue(value);
            env.editor.cmdLine.setValue("loaded "+ name);
    ***REMOVED*** else ***REMOVED***
            env.editor.cmdLine.setValue("no previuos value saved for "+ name);
    ***REMOVED***
***REMOVED***
***REMOVED***);

var keybindings = ***REMOVED***
    ace: null, // Null = use "default" keymapping
    vim: require("ace/keyboard/vim").handler,
    emacs: "ace/keyboard/emacs",
    custom: new HashHandler(***REMOVED***
        "gotoright":      "Tab",
        "indent":         "]",
        "outdent":        "[",
        "gotolinestart":  "^",
        "gotolineend":    "$"
***REMOVED***)
***REMOVED***;
var consoleHeight = 20;
function onResize() ***REMOVED***
    var left = env.split.$container.offsetLeft;
    var width = document.documentElement.clientWidth - left;
    container.style.width = width + "px";
    container.style.height = document.documentElement.clientHeight - consoleHeight + "px";
    env.split.resize();

    consoleEl.style.width = width + "px";
    cmdLine.resize();
***REMOVED***

window.onresize = onResize;
onResize();
var docEl = document.getElementById("doc");
var modeEl = document.getElementById("mode");
var wrapModeEl = document.getElementById("soft_wrap");
var themeEl = document.getElementById("theme");
var foldingEl = document.getElementById("folding");
var selectStyleEl = document.getElementById("select_style");
var highlightActiveEl = document.getElementById("highlight_active");
var showHiddenEl = document.getElementById("show_hidden");
var showGutterEl = document.getElementById("show_gutter");
var showPrintMarginEl = document.getElementById("show_print_margin");
var highlightSelectedWordE = document.getElementById("highlight_selected_word");
var showHScrollEl = document.getElementById("show_hscroll");
var showVScrollEl = document.getElementById("show_vscroll");
var animateScrollEl = document.getElementById("animate_scroll");
var softTabEl = document.getElementById("soft_tab");
var behavioursEl = document.getElementById("enable_behaviours");

fillDropdown(docEl, doclist.all);

fillDropdown(modeEl, modelist.modes);
var modesByName = modelist.modesByName;
bindDropdown("mode", function(value) ***REMOVED***
    env.editor.session.setMode(modesByName[value].mode || modesByName.text.mode);
    env.editor.session.modeName = value;
***REMOVED***);

doclist.history = doclist.docs.map(function(doc) ***REMOVED***
    return doc.name;
***REMOVED***);
doclist.history.index = 0;
doclist.cycleOpen = function(editor, dir) ***REMOVED***
    var h = this.history;
    h.index += dir;
    if (h.index >= h.length)
        h.index = 0;
    else if (h.index <= 0)
        h.index = h.length - 1;
    var s = h[h.index];
    docEl.value = s;
    docEl.onchange();
***REMOVED***;
doclist.addToHistory = function(name) ***REMOVED***
    var h = this.history;
    var i = h.indexOf(name);
    if (i != h.index) ***REMOVED***
        if (i != -1)
            h.splice(i, 1);
        h.index = h.push(name);
***REMOVED***
***REMOVED***;

bindDropdown("doc", function(name) ***REMOVED***
    doclist.loadDoc(name, function(session) ***REMOVED***
        if (!session)
            return;
        doclist.addToHistory(session.name);
        session = env.split.setSession(session);
        whitespace.detectIndentation(session);
        updateUIEditorOptions();
        env.editor.focus();
***REMOVED***);
***REMOVED***);


function updateUIEditorOptions() ***REMOVED***
    var editor = env.editor;
    var session = editor.session;

    session.setFoldStyle(foldingEl.value);

    saveOption(docEl, session.name);
    saveOption(modeEl, session.modeName || "text");
    saveOption(wrapModeEl, session.getUseWrapMode() ? session.getWrapLimitRange().min || "free" : "off");

    saveOption(selectStyleEl, editor.getSelectionStyle() == "line");
    saveOption(themeEl, editor.getTheme());
    saveOption(highlightActiveEl, editor.getHighlightActiveLine());
    saveOption(showHiddenEl, editor.getShowInvisibles());
    saveOption(showGutterEl, editor.renderer.getShowGutter());
    saveOption(showPrintMarginEl, editor.renderer.getShowPrintMargin());
    saveOption(highlightSelectedWordE, editor.getHighlightSelectedWord());
    saveOption(showHScrollEl, editor.renderer.getHScrollBarAlwaysVisible());
    saveOption(animateScrollEl, editor.getAnimatedScroll());
    saveOption(softTabEl, session.getUseSoftTabs());
    saveOption(behavioursEl, editor.getBehavioursEnabled());
***REMOVED***

themelist.themes.forEach(function(x)***REMOVED*** x.value = x.theme ***REMOVED***);
fillDropdown(themeEl, ***REMOVED***
    Bright: themelist.themes.filter(function(x)***REMOVED***return !x.isDark***REMOVED***),
    Dark: themelist.themes.filter(function(x)***REMOVED***return x.isDark***REMOVED***),
***REMOVED***);

event.addListener(themeEl, "mouseover", function(e)***REMOVED***
    themeEl.desiredValue = e.target.value;
    if (!themeEl.$timer)
        themeEl.$timer = setTimeout(themeEl.updateTheme);
***REMOVED***);

event.addListener(themeEl, "mouseout", function(e)***REMOVED***
    themeEl.desiredValue = null;
    if (!themeEl.$timer)
        themeEl.$timer = setTimeout(themeEl.updateTheme, 20);
***REMOVED***);

themeEl.updateTheme = function()***REMOVED***
    env.split.setTheme((themeEl.desiredValue || themeEl.selectedValue));
    themeEl.$timer = null;
***REMOVED***;

bindDropdown("theme", function(value) ***REMOVED***
    if (!value)
        return;
    env.editor.setTheme(value);
    themeEl.selectedValue = value;
***REMOVED***);

bindDropdown("keybinding", function(value) ***REMOVED***
    env.editor.setKeyboardHandler(keybindings[value]);
***REMOVED***);

bindDropdown("fontsize", function(value) ***REMOVED***
    env.split.setFontSize(value);
***REMOVED***);

bindDropdown("folding", function(value) ***REMOVED***
    env.editor.session.setFoldStyle(value);
    env.editor.setShowFoldWidgets(value !== "manual");
***REMOVED***);

bindDropdown("soft_wrap", function(value) ***REMOVED***
    var session = env.editor.session;
    var renderer = env.editor.renderer;
    switch (value) ***REMOVED***
        case "off":
            session.setUseWrapMode(false);
            renderer.setPrintMarginColumn(80);
            break;
        case "free":
            session.setUseWrapMode(true);
            session.setWrapLimitRange(null, null);
            renderer.setPrintMarginColumn(80);
            break;
        default:
            session.setUseWrapMode(true);
            var col = parseInt(value, 10);
            session.setWrapLimitRange(col, col);
            renderer.setPrintMarginColumn(col);
***REMOVED***
***REMOVED***);

bindCheckbox("select_style", function(checked) ***REMOVED***
    env.editor.setSelectionStyle(checked ? "line" : "text");
***REMOVED***);

bindCheckbox("highlight_active", function(checked) ***REMOVED***
    env.editor.setHighlightActiveLine(checked);
***REMOVED***);

bindCheckbox("show_hidden", function(checked) ***REMOVED***
    env.editor.setShowInvisibles(checked);
***REMOVED***);

bindCheckbox("display_indent_guides", function(checked) ***REMOVED***
    env.editor.setDisplayIndentGuides(checked);
***REMOVED***);

bindCheckbox("show_gutter", function(checked) ***REMOVED***
    env.editor.renderer.setShowGutter(checked);
***REMOVED***);

bindCheckbox("show_print_margin", function(checked) ***REMOVED***
    env.editor.renderer.setShowPrintMargin(checked);
***REMOVED***);

bindCheckbox("highlight_selected_word", function(checked) ***REMOVED***
    env.editor.setHighlightSelectedWord(checked);
***REMOVED***);

bindCheckbox("show_hscroll", function(checked) ***REMOVED***
    env.editor.setOption("hScrollBarAlwaysVisible", checked);
***REMOVED***);

bindCheckbox("show_vscroll", function(checked) ***REMOVED***
    env.editor.setOption("vScrollBarAlwaysVisible", checked);
***REMOVED***);

bindCheckbox("animate_scroll", function(checked) ***REMOVED***
    env.editor.setAnimatedScroll(checked);
***REMOVED***);

bindCheckbox("soft_tab", function(checked) ***REMOVED***
    env.editor.session.setUseSoftTabs(checked);
***REMOVED***);

bindCheckbox("enable_behaviours", function(checked) ***REMOVED***
    env.editor.setBehavioursEnabled(checked);
***REMOVED***);

bindCheckbox("fade_fold_widgets", function(checked) ***REMOVED***
    env.editor.setFadeFoldWidgets(checked);
***REMOVED***);
bindCheckbox("read_only", function(checked) ***REMOVED***
    env.editor.setReadOnly(checked);
***REMOVED***);
bindCheckbox("scrollPastEnd", function(checked) ***REMOVED***
    env.editor.setOption("scrollPastEnd", checked);
***REMOVED***);

bindDropdown("split", function(value) ***REMOVED***
    var sp = env.split;
    if (value == "none") ***REMOVED***
        sp.setSplits(1);
***REMOVED*** else ***REMOVED***
        var newEditor = (sp.getSplits() == 1);
        sp.setOrientation(value == "below" ? sp.BELOW : sp.BESIDE);
        sp.setSplits(2);

        if (newEditor) ***REMOVED***
            var session = sp.getEditor(0).session;
            var newSession = sp.setSession(session, 1);
            newSession.name = session.name;
    ***REMOVED***
***REMOVED***
***REMOVED***);


bindCheckbox("elastic_tabstops", function(checked) ***REMOVED***
    env.editor.setOption("useElasticTabstops", checked);
***REMOVED***);

var iSearchCheckbox = bindCheckbox("isearch", function(checked) ***REMOVED***
    env.editor.setOption("useIncrementalSearch", checked);
***REMOVED***);

env.editor.addEventListener('incrementalSearchSettingChanged', function(event) ***REMOVED***
    iSearchCheckbox.checked = event.isEnabled;
***REMOVED***);


function synchroniseScrolling() ***REMOVED***
    var s1 = env.split.$editors[0].session;
    var s2 = env.split.$editors[1].session;
    s1.on('changeScrollTop', function(pos) ***REMOVED***s2.setScrollTop(pos)***REMOVED***);
    s2.on('changeScrollTop', function(pos) ***REMOVED***s1.setScrollTop(pos)***REMOVED***);
    s1.on('changeScrollLeft', function(pos) ***REMOVED***s2.setScrollLeft(pos)***REMOVED***);
    s2.on('changeScrollLeft', function(pos) ***REMOVED***s1.setScrollLeft(pos)***REMOVED***);
***REMOVED***

bindCheckbox("highlight_token", function(checked) ***REMOVED***
    var editor = env.editor;
    if (editor.tokenTooltip && !checked) ***REMOVED***
        editor.tokenTooltip.destroy();
        delete editor.tokenTooltip;
***REMOVED*** else if (checked) ***REMOVED***
        editor.tokenTooltip = new TokenTooltip(editor);
***REMOVED***
***REMOVED***);

var StatusBar = require("ace/ext/statusbar").StatusBar;
new StatusBar(env.editor, cmdLine.container);


var Emmet = require("ace/ext/emmet");
net.loadScript("http://nightwing.github.io/emmet-core/emmet.js", function() ***REMOVED***
    Emmet.setCore(window.emmet);
    env.editor.setOption("enableEmmet", true);
***REMOVED***);

var snippetManager = require("ace/snippets").snippetManager;

env.editSnippets = function() ***REMOVED***
    var sp = env.split;
    if (sp.getSplits() == 2) ***REMOVED***
        sp.setSplits(1);
        return;
***REMOVED***
    sp.setSplits(1);
    sp.setSplits(2);
    sp.setOrientation(sp.BESIDE);
    var editor = sp.$editors[1];
    var id = sp.$editors[0].session.$mode.$id || "";
    var m = snippetManager.files[id];
    if (!doclist["snippets/" + id]) ***REMOVED***
        var text = m.snippetText;
        var s = doclist.initDoc(text, "", ***REMOVED******REMOVED***);
        s.setMode("ace/mode/snippets");
        doclist["snippets/" + id] = s;
***REMOVED***
    editor.on("blur", function() ***REMOVED***
        m.snippetText = editor.getValue();
        snippetManager.unregister(m.snippets);
        m.snippets = snippetManager.parseSnippetFile(m.snippetText, m.scope);
        snippetManager.register(m.snippets);
***REMOVED***);
    sp.$editors[0].once("changeMode", function() ***REMOVED***
        sp.setSplits(1);
***REMOVED***);
    editor.setSession(doclist["snippets/" + id], 1);
    editor.focus();
***REMOVED***;

require("ace/ext/language_tools");
env.editor.setOptions(***REMOVED***
    enableBasicAutocompletion: true,
    enableLiveAutocomplete: true,
    enableSnippets: true
***REMOVED***);

var beautify = require("ace/ext/beautify");
env.editor.commands.addCommands(beautify.commands);

***REMOVED***);
define('ace/ext/spellcheck', ['require', 'exports', 'module' , 'ace/lib/event', 'ace/editor', 'ace/config'], function(require, exports, module) ***REMOVED***

var event = require("../lib/event");

exports.contextMenuHandler = function(e)***REMOVED***
    var host = e.target;
    var text = host.textInput.getElement();
    if (!host.selection.isEmpty())
        return;
    var c = host.getCursorPosition();
    var r = host.session.getWordRange(c.row, c.column);
    var w = host.session.getTextRange(r);

    host.session.tokenRe.lastIndex = 0;
    if (!host.session.tokenRe.test(w))
        return;
    var PLACEHOLDER = "\x01\x01";
    var value = w + " " + PLACEHOLDER;
    text.value = value;
    text.setSelectionRange(w.length, w.length + 1);
    text.setSelectionRange(0, 0);
    text.setSelectionRange(0, w.length);

    var afterKeydown = false;
    event.addListener(text, "keydown", function onKeydown() ***REMOVED***
        event.removeListener(text, "keydown", onKeydown);
        afterKeydown = true;
***REMOVED***);

    host.textInput.setInputHandler(function(newVal) ***REMOVED***
        console.log(newVal , value, text.selectionStart, text.selectionEnd)
        if (newVal == value)
            return '';
        if (newVal.lastIndexOf(value, 0) === 0)
            return newVal.slice(value.length);
        if (newVal.substr(text.selectionEnd) == value)
            return newVal.slice(0, -value.length);
        if (newVal.slice(-2) == PLACEHOLDER) ***REMOVED***
            var val = newVal.slice(0, -2);
            if (val.slice(-1) == " ") ***REMOVED***
                if (afterKeydown)
                    return val.substring(0, text.selectionEnd);
                val = val.slice(0, -1);
                host.session.replace(r, val);
                return "";
        ***REMOVED***
    ***REMOVED***

        return newVal;
***REMOVED***);
***REMOVED***;
var Editor = require("../editor").Editor;
require("../config").defineOptions(Editor.prototype, "editor", ***REMOVED***
    spellcheck: ***REMOVED***
        set: function(val) ***REMOVED***
            var text = this.textInput.getElement();
            text.spellcheck = !!val;
            if (!val)
                this.removeListener("nativecontextmenu", exports.contextMenuHandler);
            else
                this.on("nativecontextmenu", exports.contextMenuHandler);
    ***REMOVED***
        value: true
***REMOVED***
***REMOVED***);

***REMOVED***);


define('kitchen-sink/inline_editor', ['require', 'exports', 'module' , 'ace/line_widgets', 'ace/editor', 'ace/virtual_renderer', 'ace/lib/dom', 'ace/commands/default_commands'], function(require, exports, module) ***REMOVED***


var LineWidgets = require("ace/line_widgets").LineWidgets;
var Editor = require("ace/editor").Editor;
var Renderer = require("ace/virtual_renderer").VirtualRenderer;
var dom = require("ace/lib/dom");


require("ace/commands/default_commands").commands.push(***REMOVED***
    name: "openInlineEditor",
    bindKey: "F3",
    exec: function(editor) ***REMOVED***
        var split = window.env.split;
        var s = editor.session;
        var inlineEditor = new Editor(new Renderer());
        var splitSession = split.$cloneSession(s);

        var row = editor.getCursorPosition().row;
        if (editor.session.lineWidgets && editor.session.lineWidgets[row]) ***REMOVED***
            editor.session.lineWidgets[row].destroy();
            return;
    ***REMOVED***
        
        var rowCount = 10;        
        var w = ***REMOVED***
            row: row, 
            fixedWidth: true,
            el: dom.createElement("div"),
            editor: editor
    ***REMOVED***;
        var el = w.el;
        el.appendChild(inlineEditor.container);      

        if (!editor.session.widgetManager) ***REMOVED***
            editor.session.widgetManager = new LineWidgets(editor.session);
            editor.session.widgetManager.attach(editor);
    ***REMOVED***
        
        var h = rowCount*editor.renderer.layerConfig.lineHeight;
        inlineEditor.container.style.height = h + "px";

        el.style.position = "absolute";
        el.style.zIndex = "4";
        el.style.borderTop = "solid blue 2px";
        el.style.borderBottom = "solid blue 2px";
        
        inlineEditor.setSession(splitSession);
        editor.session.widgetManager.addLineWidget(w);
        
        var kb = ***REMOVED***
            handleKeyboard:function(_,hashId, keyString) ***REMOVED***
                if (hashId === 0 && keyString === "esc") ***REMOVED***
                    w.destroy();
                    return true;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***;
        
        w.destroy = function() ***REMOVED***
            editor.keyBinding.removeKeyboardHandler(kb);
            s.widgetManager.removeLineWidget(w);
    ***REMOVED***;
        
        editor.keyBinding.addKeyboardHandler(kb);
        inlineEditor.keyBinding.addKeyboardHandler(kb);
        editor.on("changeSession", function(e) ***REMOVED***
            w.el.parentNode && w.el.parentNode.removeChild(w.el);
    ***REMOVED***);
        inlineEditor.setTheme("ace/theme/solarized_light");
***REMOVED***
***REMOVED***);
***REMOVED***);

define('kitchen-sink/dev_util', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
function isStrict() ***REMOVED***
    try ***REMOVED*** return !arguments.callee.caller.caller.caller***REMOVED***
    catch(e)***REMOVED*** return true ***REMOVED***
***REMOVED***
function warn() ***REMOVED***
    if (isStrict()) ***REMOVED***
        console.error("trying to access to global variable");
***REMOVED***
***REMOVED***
function def(o, key, get) ***REMOVED***
    try ***REMOVED***
        Object.defineProperty(o, key, ***REMOVED***
            configurable: true, 
            get: get,
            set: function(val) ***REMOVED***
                delete o[key];
                o[key] = val;
        ***REMOVED***
    ***REMOVED***);
***REMOVED*** catch(e) ***REMOVED***
        console.error(e);
***REMOVED***
***REMOVED***
def(window, "ace", function()***REMOVED*** warn(); return window.env.editor ***REMOVED***);
def(window, "editor", function()***REMOVED*** warn(); return window.env.editor ***REMOVED***);
def(window, "session", function()***REMOVED*** warn(); return window.env.editor.session ***REMOVED***);
def(window, "split", function()***REMOVED*** warn(); return window.env.split ***REMOVED***);

***REMOVED***);

define('kitchen-sink/file_drop', ['require', 'exports', 'module' , 'ace/config', 'ace/lib/event', 'ace/ext/modelist', 'ace/editor'], function(require, exports, module) ***REMOVED***

var config = require("ace/config");
var event = require("ace/lib/event");
var modelist = require("ace/ext/modelist");

module.exports = function(editor) ***REMOVED***
    event.addListener(editor.container, "dragover", function(e) ***REMOVED***
        var types = e.dataTransfer.types;
        if (types && Array.prototype.indexOf.call(types, 'Files') !== -1)
            return event.preventDefault(e);
***REMOVED***);

    event.addListener(editor.container, "drop", function(e) ***REMOVED***
        var file;
        try ***REMOVED***
            file = e.dataTransfer.files[0];
            if (window.FileReader) ***REMOVED***
                var reader = new FileReader();
                reader.onload = function() ***REMOVED***
                    var mode = modelist.getModeForPath(file.name);
                    editor.session.doc.setValue(reader.result);
                    editor.session.setMode(mode.mode);
                    editor.session.modeName = mode.name;
            ***REMOVED***;
                reader.readAsText(file);
        ***REMOVED***
            return event.preventDefault(e);
    ***REMOVED*** catch(err) ***REMOVED***
            return event.stopEvent(e);
    ***REMOVED***
***REMOVED***);
***REMOVED***;

var Editor = require("ace/editor").Editor;
config.defineOptions(Editor.prototype, "editor", ***REMOVED***
    loadDroppedFile: ***REMOVED***
        set: function() ***REMOVED*** module.exports(this); ***REMOVED***,
        value: true
***REMOVED***
***REMOVED***);

***REMOVED***);define('ace/ext/modelist', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


var modes = [];
function getModeForPath(path) ***REMOVED***
    var mode = modesByName.text;
    var fileName = path.split(/[\/\\]/).pop();
    for (var i = 0; i < modes.length; i++) ***REMOVED***
        if (modes[i].supportsFile(fileName)) ***REMOVED***
            mode = modes[i];
            break;
    ***REMOVED***
***REMOVED***
    return mode;
***REMOVED***

var Mode = function(name, caption, extensions) ***REMOVED***
    this.name = name;
    this.caption = caption;
    this.mode = "ace/mode/" + name;
    this.extensions = extensions;
    if (/\^/.test(extensions)) ***REMOVED***
        var re = extensions.replace(/\|(\^)?/g, function(a, b)***REMOVED***
            return "$|" + (b ? "^" : "^.*\\.");
    ***REMOVED***) + "$";
***REMOVED*** else ***REMOVED***
        var re = "^.*\\.(" + extensions + ")$";
***REMOVED***

    this.extRe = new RegExp(re, "gi");
***REMOVED***;

Mode.prototype.supportsFile = function(filename) ***REMOVED***
    return filename.match(this.extRe);
***REMOVED***;
var supportedModes = ***REMOVED***
    ABAP:        ["abap"],
    ActionScript:["as"],
    ADA:         ["ada|adb"],
    Apache_Conf: ["^htaccess|^htgroups|^htpasswd|^conf|htaccess|htgroups|htpasswd"],
    AsciiDoc:    ["asciidoc"],
    Assembly_x86:["asm"],
    AutoHotKey:  ["ahk"],
    BatchFile:   ["bat|cmd"],
    C9Search:    ["c9search_results"],
    C_Cpp:       ["cpp|c|cc|cxx|h|hh|hpp"],
    Cirru:       ["cirru|cr"],
    Clojure:     ["clj"],
    Cobol:       ["CBL|COB"],
    coffee:      ["coffee|cf|cson|^Cakefile"],
    ColdFusion:  ["cfm"],
    CSharp:      ["cs"],
    CSS:         ["css"],
    Curly:       ["curly"],
    D:           ["d|di"],
    Dart:        ["dart"],
    Diff:        ["diff|patch"],
    Dot:         ["dot"],
    Erlang:      ["erl|hrl"],
    EJS:         ["ejs"],
    Forth:       ["frt|fs|ldr"],
    FTL:         ["ftl"],
    Gherkin:     ["feature"],
    Glsl:        ["glsl|frag|vert"],
    golang:      ["go"],
    Groovy:      ["groovy"],
    HAML:        ["haml"],
    Handlebars:  ["hbs|handlebars|tpl|mustache"],
    Haskell:     ["hs"],
    haXe:        ["hx"],
    HTML:        ["html|htm|xhtml"],
    HTML_Ruby:   ["erb|rhtml|html.erb"],
    INI:         ["ini|conf|cfg|prefs"],
    Jack:        ["jack"],
    Jade:        ["jade"],
    Java:        ["java"],
    JavaScript:  ["js|jsm"],
    JSON:        ["json"],
    JSONiq:      ["jq"],
    JSP:         ["jsp"],
    JSX:         ["jsx"],
    Julia:       ["jl"],
    LaTeX:       ["tex|latex|ltx|bib"],
    LESS:        ["less"],
    Liquid:      ["liquid"],
    Lisp:        ["lisp"],
    LiveScript:  ["ls"],
    LogiQL:      ["logic|lql"],
    LSL:         ["lsl"],
    Lua:         ["lua"],
    LuaPage:     ["lp"],
    Lucene:      ["lucene"],
    Makefile:    ["^Makefile|^GNUmakefile|^makefile|^OCamlMakefile|make"],
    MATLAB:      ["matlab"],
    Markdown:    ["md|markdown"],
    MEL:         ["mel"],
    MySQL:       ["mysql"],
    MUSHCode:    ["mc|mush"],
    Nix:         ["nix"],
    ObjectiveC:  ["m|mm"],
    OCaml:       ["ml|mli"],
    Pascal:      ["pas|p"],
    Perl:        ["pl|pm"],
    pgSQL:       ["pgsql"],
    PHP:         ["php|phtml"],
    Powershell:  ["ps1"],
    Prolog:      ["plg|prolog"],
    Properties:  ["properties"],
    Protobuf:    ["proto"],
    Python:      ["py"],
    R:           ["r"],
    RDoc:        ["Rd"],
    RHTML:       ["Rhtml"],
    Ruby:        ["rb|ru|gemspec|rake|^Guardfile|^Rakefile|^Gemfile"],
    Rust:        ["rs"],
    SASS:        ["sass"],
    SCAD:        ["scad"],
    Scala:       ["scala"],
    Smarty:      ["smarty|tpl"],
    Scheme:      ["scm|rkt"],
    SCSS:        ["scss"],
    SH:          ["sh|bash|^.bashrc"],
    SJS:         ["sjs"],
    Space:       ["space"],
    snippets:    ["snippets"],
    Soy_Template:["soy"],
    SQL:         ["sql"],
    Stylus:      ["styl|stylus"],
    SVG:         ["svg"],
    Tcl:         ["tcl"],
    Tex:         ["tex"],
    Text:        ["txt"],
    Textile:     ["textile"],
    Toml:        ["toml"],
    Twig:        ["twig"],
    Typescript:  ["ts|typescript|str"],
    VBScript:    ["vbs"],
    Velocity:    ["vm"],
    Verilog:     ["v|vh|sv|svh"],
    XML:         ["xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl"],
    XQuery:      ["xq"],
    YAML:        ["yaml|yml"]
***REMOVED***;

var nameOverrides = ***REMOVED***
    ObjectiveC: "Objective-C",
    CSharp: "C#",
    golang: "Go",
    C_Cpp: "C/C++",
    coffee: "CoffeeScript",
    HTML_Ruby: "HTML (Ruby)",
    FTL: "FreeMarker"
***REMOVED***;
var modesByName = ***REMOVED******REMOVED***;
for (var name in supportedModes) ***REMOVED***
    var data = supportedModes[name];
    var displayName = (nameOverrides[name] || name).replace(/_/g, " ");
    var filename = name.toLowerCase();
    var mode = new Mode(filename, displayName, data[0]);
    modesByName[filename] = mode;
    modes.push(mode);
***REMOVED***

module.exports = ***REMOVED***
    getModeForPath: getModeForPath,
    modes: modes,
    modesByName: modesByName
***REMOVED***;

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
color: black;\
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

define('ace/ext/whitespace', ['require', 'exports', 'module' , 'ace/lib/lang'], function(require, exports, module) ***REMOVED***


var lang = require("../lib/lang");
exports.$detectIndentation = function(lines, fallback) ***REMOVED***
    var stats = [];
    var changes = [];
    var tabIndents = 0;
    var prevSpaces = 0;
    var max = Math.min(lines.length, 1000);
    for (var i = 0; i < max; i++) ***REMOVED***
        var line = lines[i];
        if (!/^\s*[^*+\-\s]/.test(line))
            continue;

        var tabs = line.match(/^\t*/)[0].length;
        if (line[0] == "\t")
            tabIndents++;

        var spaces = line.match(/^ */)[0].length;
        if (spaces && line[spaces] != "\t") ***REMOVED***
            var diff = spaces - prevSpaces;
            if (diff > 0 && !(prevSpaces%diff) && !(spaces%diff))
                changes[diff] = (changes[diff] || 0) + 1;

            stats[spaces] = (stats[spaces] || 0) + 1;
    ***REMOVED***
        prevSpaces = spaces;
        while (i < max && line[line.length - 1] == "\\")
            line = lines[i++];
***REMOVED***
    
    if (!stats.length)
        return;

    function getScore(indent) ***REMOVED***
        var score = 0;
        for (var i = indent; i < stats.length; i += indent)
            score += stats[i] || 0;
        return score;
***REMOVED***

    var changesTotal = changes.reduce(function(a,b)***REMOVED***return a+b***REMOVED***, 0);

    var first = ***REMOVED***score: 0, length: 0***REMOVED***;
    var spaceIndents = 0;
    for (var i = 1; i < 12; i++) ***REMOVED***
        if (i == 1) ***REMOVED***
            spaceIndents = getScore(i);
            var score = 1;
    ***REMOVED*** else
            var score = getScore(i) / spaceIndents;

        if (changes[i]) ***REMOVED***
            score += changes[i] / changesTotal;
    ***REMOVED***

        if (score > first.score)
            first = ***REMOVED***score: score, length: i***REMOVED***;
***REMOVED***

    if (first.score && first.score > 1.4)
        var tabLength = first.length;

    if (tabIndents > spaceIndents + 1)
        return ***REMOVED***ch: "\t", length: tabLength***REMOVED***;

    if (spaceIndents + 1 > tabIndents)
        return ***REMOVED***ch: " ", length: tabLength***REMOVED***;
***REMOVED***;

exports.detectIndentation = function(session) ***REMOVED***
    var lines = session.getLines(0, 1000);
    var indent = exports.$detectIndentation(lines) || ***REMOVED******REMOVED***;

    if (indent.ch)
        session.setUseSoftTabs(indent.ch == " ");

    if (indent.length)
        session.setTabSize(indent.length);
    return indent;
***REMOVED***;

exports.trimTrailingSpace = function(session, trimEmpty) ***REMOVED***
    var doc = session.getDocument();
    var lines = doc.getAllLines();
    
    var min = trimEmpty ? -1 : 0;

    for (var i = 0, l=lines.length; i < l; i++) ***REMOVED***
        var line = lines[i];
        var index = line.search(/\s+$/);

        if (index > min)
            doc.removeInLine(i, index, line.length);
***REMOVED***
***REMOVED***;

exports.convertIndentation = function(session, ch, len) ***REMOVED***
    var oldCh = session.getTabString()[0];
    var oldLen = session.getTabSize();
    if (!len) len = oldLen;
    if (!ch) ch = oldCh;

    var tab = ch == "\t" ? ch: lang.stringRepeat(ch, len);

    var doc = session.doc;
    var lines = doc.getAllLines();

    var cache = ***REMOVED******REMOVED***;
    var spaceCache = ***REMOVED******REMOVED***;
    for (var i = 0, l=lines.length; i < l; i++) ***REMOVED***
        var line = lines[i];
        var match = line.match(/^\s*/)[0];
        if (match) ***REMOVED***
            var w = session.$getStringScreenWidth(match)[0];
            var tabCount = Math.floor(w/oldLen);
            var reminder = w%oldLen;
            var toInsert = cache[tabCount] || (cache[tabCount] = lang.stringRepeat(tab, tabCount));
            toInsert += spaceCache[reminder] || (spaceCache[reminder] = lang.stringRepeat(" ", reminder));

            if (toInsert != match) ***REMOVED***
                doc.removeInLine(i, 0, match.length);
                doc.insertInLine(***REMOVED***row: i, column: 0***REMOVED***, toInsert);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    session.setTabSize(len);
    session.setUseSoftTabs(ch == " ");
***REMOVED***;

exports.$parseStringArg = function(text) ***REMOVED***
    var indent = ***REMOVED******REMOVED***;
    if (/t/.test(text))
        indent.ch = "\t";
    else if (/s/.test(text))
        indent.ch = " ";
    var m = text.match(/\d+/);
    if (m)
        indent.length = parseInt(m[0], 10);
    return indent;
***REMOVED***;

exports.$parseArg = function(arg) ***REMOVED***
    if (!arg)
        return ***REMOVED******REMOVED***;
    if (typeof arg == "string")
        return exports.$parseStringArg(arg);
    if (typeof arg.text == "string")
        return exports.$parseStringArg(arg.text);
    return arg;
***REMOVED***;

exports.commands = [***REMOVED***
    name: "detectIndentation",
    exec: function(editor) ***REMOVED***
        exports.detectIndentation(editor.session);
***REMOVED***
***REMOVED***, ***REMOVED***
    name: "trimTrailingSpace",
    exec: function(editor) ***REMOVED***
        exports.trimTrailingSpace(editor.session);
***REMOVED***
***REMOVED***, ***REMOVED***
    name: "convertIndentation",
    exec: function(editor, arg) ***REMOVED***
        var indent = exports.$parseArg(arg);
        exports.convertIndentation(editor.session, indent.ch, indent.length);
***REMOVED***
***REMOVED***, ***REMOVED***
    name: "setIndentation",
    exec: function(editor, arg) ***REMOVED***
        var indent = exports.$parseArg(arg);
        indent.length && editor.session.setTabSize(indent.length);
        indent.ch && editor.session.setUseSoftTabs(indent.ch == " ");
***REMOVED***
***REMOVED***];

***REMOVED***);

 define('kitchen-sink/doclist', ['require', 'exports', 'module' , 'ace/edit_session', 'ace/undomanager', 'ace/lib/net', 'ace/ext/modelist'], function(require, exports, module) ***REMOVED***


var EditSession = require("ace/edit_session").EditSession;
var UndoManager = require("ace/undomanager").UndoManager;
var net = require("ace/lib/net");

var modelist = require("ace/ext/modelist");
var fileCache = ***REMOVED******REMOVED***;

function initDoc(file, path, doc) ***REMOVED***
    if (doc.prepare)
        file = doc.prepare(file);

    var session = new EditSession(file);
    session.setUndoManager(new UndoManager());
    doc.session = session;
    doc.path = path;
    session.name = doc.name;
    if (doc.wrapped) ***REMOVED***
        session.setUseWrapMode(true);
        session.setWrapLimitRange(80, 80);
***REMOVED***
    var mode = modelist.getModeForPath(path);
    session.modeName = mode.name;
    session.setMode(mode.mode);
    return session;
***REMOVED***


function makeHuge(txt) ***REMOVED***
    for (var i = 0; i < 5; i++)
        txt += txt;
    return txt;
***REMOVED***

var docs = ***REMOVED***
    "docs/javascript.js": ***REMOVED***order: 1, name: "JavaScript"***REMOVED***,

    "docs/latex.tex": ***REMOVED***name: "LaTeX", wrapped: true***REMOVED***,
    "docs/markdown.md": ***REMOVED***name: "Markdown", wrapped: true***REMOVED***,
    "docs/mushcode.mc": ***REMOVED***name: "MUSHCode", wrapped: true***REMOVED***,
    "docs/pgsql.pgsql": ***REMOVED***name: "pgSQL", wrapped: true***REMOVED***,
    "docs/plaintext.txt": ***REMOVED***name: "Plain Text", prepare: makeHuge, wrapped: true***REMOVED***,
    "docs/sql.sql": ***REMOVED***name: "SQL", wrapped: true***REMOVED***,

    "docs/textile.textile": ***REMOVED***name: "Textile", wrapped: true***REMOVED***,

    "docs/c9search.c9search_results": "C9 Search Results",
    "docs/mel.mel": "MEL",
    "docs/Nix.nix": "Nix"
***REMOVED***;

var ownSource = ***REMOVED***
***REMOVED***;

var hugeDocs = ***REMOVED***
    "src/ace.js": "",
    "src-min/ace.js": ""
***REMOVED***;

modelist.modes.forEach(function(m) ***REMOVED***
    var ext = m.extensions.split("|")[0];
    if (ext[0] === "^") ***REMOVED***
        path = ext.substr(1);
***REMOVED*** else ***REMOVED***
        var path = m.name + "." + ext;
***REMOVED***
    path = "docs/" + path;
    if (!docs[path]) ***REMOVED***
        docs[path] = ***REMOVED***name: m.caption***REMOVED***;
***REMOVED*** else if (typeof docs[path] == "object" && !docs[path].name) ***REMOVED***
        docs[path].name = m.caption;
***REMOVED***
***REMOVED***);



if (window.require && window.require.s) try ***REMOVED***
    for (var path in window.require.s.contexts._.defined) ***REMOVED***
        if (path.indexOf("!") != -1)
            path = path.split("!").pop();
        else
            path = path + ".js";
        ownSource[path] = "";
***REMOVED***
***REMOVED*** catch(e) ***REMOVED******REMOVED***

function sort(list) ***REMOVED***
    return list.sort(function(a, b) ***REMOVED***
        var cmp = (b.order || 0) - (a.order || 0);
        return cmp || a.name && a.name.localeCompare(b.name);
***REMOVED***);
***REMOVED***

function prepareDocList(docs) ***REMOVED***
    var list = [];
    for (var path in docs) ***REMOVED***
        var doc = docs[path];
        if (typeof doc != "object")
            doc = ***REMOVED***name: doc || path***REMOVED***;

        doc.path = path;
        doc.desc = doc.name.replace(/^(ace|docs|demo|build)\//, "");
        if (doc.desc.length > 18)
            doc.desc = doc.desc.slice(0, 7) + ".." + doc.desc.slice(-9);

        fileCache[doc.name] = doc;
        list.push(doc);
***REMOVED***

    return list;
***REMOVED***

function loadDoc(name, callback) ***REMOVED***
    var doc = fileCache[name];
    if (!doc)
        return callback(null);

    if (doc.session)
        return callback(doc.session);
    var path = doc.path;
    var parts = path.split("/");
    if (parts[0] == "docs")
        path = "kitchen-sink/" + path;
    else if (parts[0] == "ace")
        path = "lib/" + path;

    net.get(path, function(x) ***REMOVED***
        initDoc(x, path, doc);
        callback(doc.session);
***REMOVED***);
***REMOVED***

module.exports = ***REMOVED***
    fileCache: fileCache,
    docs: sort(prepareDocList(docs)),
    ownSource: prepareDocList(ownSource),
    hugeDocs: prepareDocList(hugeDocs),
    initDoc: initDoc,
    loadDoc: loadDoc
***REMOVED***;
module.exports.all = ***REMOVED***
    "Mode Examples": module.exports.docs,
    "Huge documents": module.exports.hugeDocs,
    "own source": module.exports.ownSource
***REMOVED***;

***REMOVED***);

define('ace/ext/themelist', ['require', 'exports', 'module' , 'ace/lib/fixoldbrowsers'], function(require, exports, module) ***REMOVED***

require("ace/lib/fixoldbrowsers");

var themeData = [
    ["Chrome"         ],
    ["Clouds"         ],
    ["Crimson Editor" ],
    ["Dawn"           ],
    ["Dreamweaver"    ],
    ["Eclipse"        ],
    ["GitHub"         ],
    ["Solarized Light"],
    ["TextMate"       ],
    ["Tomorrow"       ],
    ["XCode"          ],
    ["Kuroir"],
    ["KatzenMilch"],
    ["Ambiance"             ,"ambiance"                ,  "dark"],
    ["Chaos"                ,"chaos"                   ,  "dark"],
    ["Clouds Midnight"      ,"clouds_midnight"         ,  "dark"],
    ["Cobalt"               ,"cobalt"                  ,  "dark"],
    ["idle Fingers"         ,"idle_fingers"            ,  "dark"],
    ["krTheme"              ,"kr_theme"                ,  "dark"],
    ["Merbivore"            ,"merbivore"               ,  "dark"],
    ["Merbivore Soft"       ,"merbivore_soft"          ,  "dark"],
    ["Mono Industrial"      ,"mono_industrial"         ,  "dark"],
    ["Monokai"              ,"monokai"                 ,  "dark"],
    ["Pastel on dark"       ,"pastel_on_dark"          ,  "dark"],
    ["Solarized Dark"       ,"solarized_dark"          ,  "dark"],
    ["Terminal"             ,"terminal"                ,  "dark"],
    ["Tomorrow Night"       ,"tomorrow_night"          ,  "dark"],
    ["Tomorrow Night Blue"  ,"tomorrow_night_blue"     ,  "dark"],
    ["Tomorrow Night Bright","tomorrow_night_bright"   ,  "dark"],
    ["Tomorrow Night 80s"   ,"tomorrow_night_eighties" ,  "dark"],
    ["Twilight"             ,"twilight"                ,  "dark"],
    ["Vibrant Ink"          ,"vibrant_ink"             ,  "dark"]
];


exports.themesByName = ***REMOVED******REMOVED***;
exports.themes = themeData.map(function(data) ***REMOVED***
    var name = data[1] || data[0].replace(/ /g, "_").toLowerCase();
    var theme = ***REMOVED***
        caption: data[0],
        theme: "ace/theme/" + name,
        isDark: data[2] == "dark",
        name: name
***REMOVED***;
    exports.themesByName[name] = theme;
    return theme;
***REMOVED***);

***REMOVED***);


define('kitchen-sink/layout', ['require', 'exports', 'module' , 'ace/lib/dom', 'ace/lib/event', 'ace/edit_session', 'ace/undomanager', 'ace/virtual_renderer', 'ace/editor', 'ace/multi_select', 'ace/theme/textmate'], function(require, exports, module) ***REMOVED***


var dom = require("ace/lib/dom");
var event = require("ace/lib/event");

var EditSession = require("ace/edit_session").EditSession;
var UndoManager = require("ace/undomanager").UndoManager;
var Renderer = require("ace/virtual_renderer").VirtualRenderer;
var Editor = require("ace/editor").Editor;
var MultiSelect = require("ace/multi_select").MultiSelect;

dom.importCssString("\
splitter ***REMOVED***\
    border: 1px solid #C6C6D2;\
    width: 0px;\
    cursor: ew-resize;\
    z-index:10***REMOVED***\
splitter:hover ***REMOVED***\
    margin-left: -2px;\
    width:3px;\
    border-color: #B5B4E0;\
***REMOVED***\
", "splitEditor");

exports.edit = function(el) ***REMOVED***
    if (typeof(el) == "string")
        el = document.getElementById(el);

    var editor = new Editor(new Renderer(el, require("ace/theme/textmate")));

    editor.resize();
    event.addListener(window, "resize", function() ***REMOVED***
        editor.resize();
***REMOVED***);
    return editor;
***REMOVED***;


var SplitRoot = function(el, theme, position, getSize) ***REMOVED***
    el.style.position = position || "relative";
    this.container = el;
    this.getSize = getSize || this.getSize;
    this.resize = this.$resize.bind(this);

    event.addListener(el.ownerDocument.defaultView, "resize", this.resize);
    this.editor = this.createEditor();
***REMOVED***;

(function()***REMOVED***
    this.createEditor = function() ***REMOVED***
        var el = document.createElement("div");
        el.className = this.$editorCSS;
        el.style.cssText = "position: absolute; top:0px; bottom:0px";
        this.$container.appendChild(el);
        var session = new EditSession("");
        var editor = new Editor(new Renderer(el, this.$theme));

        this.$editors.push(editor);
        editor.setFontSize(this.$fontSize);
        return editor;
***REMOVED***;
    this.$resize = function() ***REMOVED***
        var size = this.getSize(this.container);
        this.rect = ***REMOVED***
            x: size.left,
            y: size.top,
            w: size.width,
            h: size.height
    ***REMOVED***;
        this.item.resize(this.rect);
***REMOVED***;
    this.getSize = function(el) ***REMOVED***
        return el.getBoundingClientRect();
***REMOVED***;
    this.destroy = function() ***REMOVED***
        var win = this.container.ownerDocument.defaultView;
        event.removeListener(win, "resize", this.resize);
***REMOVED***;


***REMOVED***).call(SplitRoot.prototype);



var Split = function()***REMOVED***

***REMOVED***;
(function()***REMOVED***
    this.execute = function(options) ***REMOVED***
        this.$u.execute(options);
***REMOVED***;

***REMOVED***).call(Split.prototype);



exports.singleLineEditor = function(el) ***REMOVED***
    var renderer = new Renderer(el);
    el.style.overflow = "hidden";

    renderer.screenToTextCoordinates = function(x, y) ***REMOVED***
        var pos = this.pixelToScreenCoordinates(x, y);
        return this.session.screenToDocumentPosition(
            Math.min(this.session.getScreenLength() - 1, Math.max(pos.row, 0)),
            Math.max(pos.column, 0)
        );
***REMOVED***;

    renderer.$maxLines = 4;

    renderer.setStyle("ace_one-line");
    var editor = new Editor(renderer);
    new MultiSelect(editor);
    editor.session.setUndoManager(new UndoManager());

    editor.setShowPrintMargin(false);
    editor.renderer.setShowGutter(false);
    editor.renderer.setHighlightGutterLine(false);
    editor.$mouseHandler.$focusWaitTimout = 0;

    return editor;
***REMOVED***;



***REMOVED***);

define('kitchen-sink/token_tooltip', ['require', 'exports', 'module' , 'ace/lib/dom', 'ace/lib/oop', 'ace/lib/event', 'ace/range', 'ace/tooltip'], function(require, exports, module) ***REMOVED***


var dom = require("ace/lib/dom");
var oop = require("ace/lib/oop");
var event = require("ace/lib/event");
var Range = require("ace/range").Range;
var Tooltip = require("ace/tooltip").Tooltip;

function TokenTooltip (editor) ***REMOVED***
    if (editor.tokenTooltip)
        return;
    Tooltip.call(this, editor.container);
    editor.tokenTooltip = this;
    this.editor = editor;

    this.update = this.update.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    event.addListener(editor.renderer.scroller, "mousemove", this.onMouseMove);
    event.addListener(editor.renderer.content, "mouseout", this.onMouseOut);
***REMOVED***

oop.inherits(TokenTooltip, Tooltip);

(function()***REMOVED***
    this.token = ***REMOVED******REMOVED***;
    this.range = new Range();
    
    this.update = function() ***REMOVED***
        this.$timer = null;
        
        var r = this.editor.renderer;
        if (this.lastT - (r.timeStamp || 0) > 1000) ***REMOVED***
            r.rect = null;
            r.timeStamp = this.lastT;
            this.maxHeight = window.innerHeight;
            this.maxWidth = window.innerWidth;
    ***REMOVED***

        var canvasPos = r.rect || (r.rect = r.scroller.getBoundingClientRect());
        var offset = (this.x + r.scrollLeft - canvasPos.left - r.$padding) / r.characterWidth;
        var row = Math.floor((this.y + r.scrollTop - canvasPos.top) / r.lineHeight);
        var col = Math.round(offset);

        var screenPos = ***REMOVED***row: row, column: col, side: offset - col > 0 ? 1 : -1***REMOVED***;
        var session = this.editor.session;
        var docPos = session.screenToDocumentPosition(screenPos.row, screenPos.column);
        var token = session.getTokenAt(docPos.row, docPos.column);

        if (!token && !session.getLine(docPos.row)) ***REMOVED***
            token = ***REMOVED***
                type: "",
                value: "",
                state: session.bgTokenizer.getState(0)
        ***REMOVED***;
    ***REMOVED***
        if (!token) ***REMOVED***
            session.removeMarker(this.marker);
            this.hide();
            return;
    ***REMOVED***

        var tokenText = token.type;
        if (token.state)
            tokenText += "|" + token.state;
        if (token.merge)
            tokenText += "\n  merge";
        if (token.stateTransitions)
            tokenText += "\n  " + token.stateTransitions.join("\n  ");

        if (this.tokenText != tokenText) ***REMOVED***
            this.setText(tokenText);
            this.width = this.getWidth();
            this.height = this.getHeight();
            this.tokenText = tokenText;
    ***REMOVED***

        this.show(null, this.x, this.y);

        this.token = token;
        session.removeMarker(this.marker);
        this.range = new Range(docPos.row, token.start, docPos.row, token.start + token.value.length);
        this.marker = session.addMarker(this.range, "ace_bracket", "text");
***REMOVED***;
    
    this.onMouseMove = function(e) ***REMOVED***
        this.x = e.clientX;
        this.y = e.clientY;
        if (this.isOpen) ***REMOVED***
            this.lastT = e.timeStamp;
            this.setPosition(this.x, this.y);
    ***REMOVED***
        if (!this.$timer)
            this.$timer = setTimeout(this.update, 100);
***REMOVED***;

    this.onMouseOut = function(e) ***REMOVED***
        if (e && e.currentTarget.contains(e.relatedTarget))
            return;
        this.hide();
        this.editor.session.removeMarker(this.marker);
        this.$timer = clearTimeout(this.$timer);
***REMOVED***;

    this.setPosition = function(x, y) ***REMOVED***
        if (x + 10 + this.width > this.maxWidth)
            x = window.innerWidth - this.width - 10;
        if (y > window.innerHeight * 0.75 || y + 20 + this.height > this.maxHeight)
            y = y - this.height - 30;

        Tooltip.prototype.setPosition.call(this, x + 10, y + 20);
***REMOVED***;

    this.destroy = function() ***REMOVED***
        this.onMouseOut();
        event.removeListener(this.editor.renderer.scroller, "mousemove", this.onMouseMove);
        event.removeListener(this.editor.renderer.content, "mouseout", this.onMouseOut);
        delete this.editor.tokenTooltip;
***REMOVED***;

***REMOVED***).call(TokenTooltip.prototype);

exports.TokenTooltip = TokenTooltip;

***REMOVED***);

define('kitchen-sink/util', ['require', 'exports', 'module' , 'ace/lib/dom', 'ace/lib/event', 'ace/edit_session', 'ace/undomanager', 'ace/virtual_renderer', 'ace/editor', 'ace/multi_select'], function(require, exports, module) ***REMOVED***


var dom = require("ace/lib/dom");
var event = require("ace/lib/event");

var EditSession = require("ace/edit_session").EditSession;
var UndoManager = require("ace/undomanager").UndoManager;
var Renderer = require("ace/virtual_renderer").VirtualRenderer;
var Editor = require("ace/editor").Editor;
var MultiSelect = require("ace/multi_select").MultiSelect;

exports.createEditor = function(el) ***REMOVED***
    return new Editor(new Renderer(el));
***REMOVED***;

exports.createSplitEditor = function(el) ***REMOVED***
    if (typeof(el) == "string")
        el = document.getElementById(el);

    var e0 = document.createElement("div");
    var s = document.createElement("splitter");
    var e1 = document.createElement("div");
    el.appendChild(e0);
    el.appendChild(e1);
    el.appendChild(s);
    e0.style.position = e1.style.position = s.style.position = "absolute";
    el.style.position = "relative";
    var split = ***REMOVED***$container: el***REMOVED***;

    split.editor0 = split[0] = new Editor(new Renderer(e0));
    split.editor1 = split[1] = new Editor(new Renderer(e1));
    split.splitter = s;

    s.ratio = 0.5;

    split.resize = function resize()***REMOVED***
        var height = el.parentNode.clientHeight - el.offsetTop;
        var total = el.clientWidth;
        var w1 = total * s.ratio;
        var w2 = total * (1- s.ratio);
        s.style.left = w1 - 1 + "px";
        s.style.height = el.style.height = height + "px";

        var st0 = split[0].container.style;
        var st1 = split[1].container.style;
        st0.width = w1 + "px";
        st1.width = w2 + "px";
        st0.left = 0 + "px";
        st1.left = w1 + "px";

        st0.top = st1.top = "0px";
        st0.height = st1.height = height + "px";

        split[0].resize();
        split[1].resize();
***REMOVED***;

    split.onMouseDown = function(e) ***REMOVED***
        var rect = el.getBoundingClientRect();
        var x = e.clientX;
        var y = e.clientY;

        var button = e.button;
        if (button !== 0) ***REMOVED***
            return;
    ***REMOVED***

        var onMouseMove = function(e) ***REMOVED***
            x = e.clientX;
            y = e.clientY;
    ***REMOVED***;
        var onResizeEnd = function(e) ***REMOVED***
            clearInterval(timerId);
    ***REMOVED***;

        var onResizeInterval = function() ***REMOVED***
            s.ratio = (x - rect.left) / rect.width;
            split.resize();
    ***REMOVED***;

        event.capture(s, onMouseMove, onResizeEnd);
        var timerId = setInterval(onResizeInterval, 40);

        return e.preventDefault();
***REMOVED***;



    event.addListener(s, "mousedown", split.onMouseDown);
    event.addListener(window, "resize", split.resize);
    split.resize();
    return split;
***REMOVED***;
exports.stripLeadingComments = function(str) ***REMOVED***
    if(str.slice(0,2)=='/*') ***REMOVED***
        var j = str.indexOf('*/')+2;
        str = str.substr(j);
***REMOVED***
    return str.trim() + "\n";
***REMOVED***;
exports.saveOption = function(el, val) ***REMOVED***
    if (!el.onchange && !el.onclick)
        return;

    if ("checked" in el) ***REMOVED***
        if (val !== undefined)
            el.checked = val;

        localStorage && localStorage.setItem(el.id, el.checked ? 1 : 0);
***REMOVED***
    else ***REMOVED***
        if (val !== undefined)
            el.value = val;

        localStorage && localStorage.setItem(el.id, el.value);
***REMOVED***
***REMOVED***;

exports.bindCheckbox = function(id, callback, noInit) ***REMOVED***
    if (typeof id == "string")
        var el = document.getElementById(id);
    else ***REMOVED***
        var el = id;
        id = el.id;
***REMOVED***
    var el = document.getElementById(id);
    if (localStorage && localStorage.getItem(id))
        el.checked = localStorage.getItem(id) == "1";

    var onCheck = function() ***REMOVED***
        callback(!!el.checked);
        exports.saveOption(el);
***REMOVED***;
    el.onclick = onCheck;
    noInit || onCheck();
    return el;
***REMOVED***;

exports.bindDropdown = function(id, callback, noInit) ***REMOVED***
    if (typeof id == "string")
        var el = document.getElementById(id);
    else ***REMOVED***
        var el = id;
        id = el.id;
***REMOVED***
    if (localStorage && localStorage.getItem(id))
        el.value = localStorage.getItem(id);

    var onChange = function() ***REMOVED***
        callback(el.value);
        exports.saveOption(el);
***REMOVED***;

    el.onchange = onChange;
    noInit || onChange();
***REMOVED***;

exports.fillDropdown = function(el, values) ***REMOVED***
    if (typeof el == "string")
        el = document.getElementById(el);

    dropdown(values).forEach(function(e) ***REMOVED***
        el.appendChild(e);
***REMOVED***);
***REMOVED***;

function elt(tag, attributes, content) ***REMOVED***
    var el = dom.createElement(tag);
    if (typeof content == "string") ***REMOVED***
        el.appendChild(document.createTextNode(content));
***REMOVED*** else if (content) ***REMOVED***
        content.forEach(function(ch) ***REMOVED***
            el.appendChild(ch);
    ***REMOVED***);
***REMOVED***

    for (var i in attributes)
        el.setAttribute(i, attributes[i]);
    return el;
***REMOVED***

function optgroup(values) ***REMOVED***
    return values.map(function(item) ***REMOVED***
        if (typeof item == "string")
            item = ***REMOVED***name: item, caption: item***REMOVED***;
        return elt("option", ***REMOVED***value: item.value || item.name***REMOVED***, item.caption || item.desc);
***REMOVED***);
***REMOVED***

function dropdown(values) ***REMOVED***
    if (Array.isArray(values))
        return optgroup(values);

    return Object.keys(values).map(function(i) ***REMOVED***
        return elt("optgroup", ***REMOVED***"label": i***REMOVED***, optgroup(values[i]));
***REMOVED***);
***REMOVED***


***REMOVED***);

define('ace/ext/elastic_tabstops_lite', ['require', 'exports', 'module' , 'ace/editor', 'ace/config'], function(require, exports, module) ***REMOVED***


var ElasticTabstopsLite = function(editor) ***REMOVED***
    this.$editor = editor;
    var self = this;
    var changedRows = [];
    var recordChanges = false;
    this.onAfterExec = function() ***REMOVED***
        recordChanges = false;
        self.processRows(changedRows);
        changedRows = [];
***REMOVED***;
    this.onExec = function() ***REMOVED***
        recordChanges = true;
***REMOVED***;
    this.onChange = function(e) ***REMOVED***
        var range = e.data.range
        if (recordChanges) ***REMOVED***
            if (changedRows.indexOf(range.start.row) == -1)
                changedRows.push(range.start.row);
            if (range.end.row != range.start.row)
                changedRows.push(range.end.row);
    ***REMOVED***
***REMOVED***;
***REMOVED***;

(function() ***REMOVED***
    this.processRows = function(rows) ***REMOVED***
        this.$inChange = true;
        var checkedRows = [];

        for (var r = 0, rowCount = rows.length; r < rowCount; r++) ***REMOVED***
            var row = rows[r];

            if (checkedRows.indexOf(row) > -1)
                continue;

            var cellWidthObj = this.$findCellWidthsForBlock(row);
            var cellWidths = this.$setBlockCellWidthsToMax(cellWidthObj.cellWidths);
            var rowIndex = cellWidthObj.firstRow;

            for (var w = 0, l = cellWidths.length; w < l; w++) ***REMOVED***
                var widths = cellWidths[w];
                checkedRows.push(rowIndex);
                this.$adjustRow(rowIndex, widths);
                rowIndex++;
        ***REMOVED***
    ***REMOVED***
        this.$inChange = false;
***REMOVED***;

    this.$findCellWidthsForBlock = function(row) ***REMOVED***
        var cellWidths = [], widths;
        var rowIter = row;
        while (rowIter >= 0) ***REMOVED***
            widths = this.$cellWidthsForRow(rowIter);
            if (widths.length == 0)
                break;

            cellWidths.unshift(widths);
            rowIter--;
    ***REMOVED***
        var firstRow = rowIter + 1;
        rowIter = row;
        var numRows = this.$editor.session.getLength();

        while (rowIter < numRows - 1) ***REMOVED***
            rowIter++;

            widths = this.$cellWidthsForRow(rowIter);
            if (widths.length == 0)
                break;

            cellWidths.push(widths);
    ***REMOVED***

        return ***REMOVED*** cellWidths: cellWidths, firstRow: firstRow ***REMOVED***;
***REMOVED***;

    this.$cellWidthsForRow = function(row) ***REMOVED***
        var selectionColumns = this.$selectionColumnsForRow(row);

        var tabs = [-1].concat(this.$tabsForRow(row));
        var widths = tabs.map(function(el) ***REMOVED*** return 0; ***REMOVED*** ).slice(1);
        var line = this.$editor.session.getLine(row);

        for (var i = 0, len = tabs.length - 1; i < len; i++) ***REMOVED***
            var leftEdge = tabs[i]+1;
            var rightEdge = tabs[i+1];

            var rightmostSelection = this.$rightmostSelectionInCell(selectionColumns, rightEdge);
            var cell = line.substring(leftEdge, rightEdge);
            widths[i] = Math.max(cell.replace(/\s+$/g,'').length, rightmostSelection - leftEdge);
    ***REMOVED***

        return widths;
***REMOVED***;

    this.$selectionColumnsForRow = function(row) ***REMOVED***
        var selections = [], cursor = this.$editor.getCursorPosition();
        if (this.$editor.session.getSelection().isEmpty()) ***REMOVED***
            if (row == cursor.row)
                selections.push(cursor.column);
    ***REMOVED***

        return selections;
***REMOVED***;

    this.$setBlockCellWidthsToMax = function(cellWidths) ***REMOVED***
        var startingNewBlock = true, blockStartRow, blockEndRow, maxWidth;
        var columnInfo = this.$izip_longest(cellWidths);

        for (var c = 0, l = columnInfo.length; c < l; c++) ***REMOVED***
            var column = columnInfo[c];
            if (!column.push) ***REMOVED***
                console.error(column);
                continue;
        ***REMOVED***
            column.push(NaN);

            for (var r = 0, s = column.length; r < s; r++) ***REMOVED***
                var width = column[r];
                if (startingNewBlock) ***REMOVED***
                    blockStartRow = r;
                    maxWidth = 0;
                    startingNewBlock = false;
            ***REMOVED***
                if (isNaN(width)) ***REMOVED***
                    blockEndRow = r;

                    for (var j = blockStartRow; j < blockEndRow; j++) ***REMOVED***
                        cellWidths[j][c] = maxWidth;
                ***REMOVED***
                    startingNewBlock = true;
            ***REMOVED***

                maxWidth = Math.max(maxWidth, width);
        ***REMOVED***
    ***REMOVED***

        return cellWidths;
***REMOVED***;

    this.$rightmostSelectionInCell = function(selectionColumns, cellRightEdge) ***REMOVED***
        var rightmost = 0;

        if (selectionColumns.length) ***REMOVED***
            var lengths = [];
            for (var s = 0, length = selectionColumns.length; s < length; s++) ***REMOVED***
                if (selectionColumns[s] <= cellRightEdge)
                    lengths.push(s);
                else
                    lengths.push(0);
        ***REMOVED***
            rightmost = Math.max.apply(Math, lengths);
    ***REMOVED***

        return rightmost;
***REMOVED***;

    this.$tabsForRow = function(row) ***REMOVED***
        var rowTabs = [], line = this.$editor.session.getLine(row),
            re = /\t/g, match;

        while ((match = re.exec(line)) != null) ***REMOVED***
            rowTabs.push(match.index);
    ***REMOVED***

        return rowTabs;
***REMOVED***;

    this.$adjustRow = function(row, widths) ***REMOVED***
        var rowTabs = this.$tabsForRow(row);

        if (rowTabs.length == 0)
            return;

        var bias = 0, location = -1;
        var expandedSet = this.$izip(widths, rowTabs);

        for (var i = 0, l = expandedSet.length; i < l; i++) ***REMOVED***
            var w = expandedSet[i][0], it = expandedSet[i][1];
            location += 1 + w;
            it += bias;
            var difference = location - it;

            if (difference == 0)
                continue;

            var partialLine = this.$editor.session.getLine(row).substr(0, it );
            var strippedPartialLine = partialLine.replace(/\s*$/g, "");
            var ispaces = partialLine.length - strippedPartialLine.length;

            if (difference > 0) ***REMOVED***
                this.$editor.session.getDocument().insertInLine(***REMOVED***row: row, column: it + 1***REMOVED***, Array(difference + 1).join(" ") + "\t");
                this.$editor.session.getDocument().removeInLine(row, it, it + 1);

                bias += difference;
        ***REMOVED***

            if (difference < 0 && ispaces >= -difference) ***REMOVED***
                this.$editor.session.getDocument().removeInLine(row, it + difference, it);
                bias += difference;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    this.$izip_longest = function(iterables) ***REMOVED***
        if (!iterables[0])
            return [];
        var longest = iterables[0].length;
        var iterablesLength = iterables.length;

        for (var i = 1; i < iterablesLength; i++) ***REMOVED***
            var iLength = iterables[i].length;
            if (iLength > longest)
                longest = iLength;
    ***REMOVED***

        var expandedSet = [];

        for (var l = 0; l < longest; l++) ***REMOVED***
            var set = [];
            for (var i = 0; i < iterablesLength; i++) ***REMOVED***
                if (iterables[i][l] === "")
                    set.push(NaN);
                else
                    set.push(iterables[i][l]);
        ***REMOVED***

            expandedSet.push(set);
    ***REMOVED***


        return expandedSet;
***REMOVED***;
    this.$izip = function(widths, tabs) ***REMOVED***
        var size = widths.length >= tabs.length ? tabs.length : widths.length;

        var expandedSet = [];
        for (var i = 0; i < size; i++) ***REMOVED***
            var set = [ widths[i], tabs[i] ];
            expandedSet.push(set);
    ***REMOVED***
        return expandedSet;
***REMOVED***;

***REMOVED***).call(ElasticTabstopsLite.prototype);

exports.ElasticTabstopsLite = ElasticTabstopsLite;

var Editor = require("../editor").Editor;
require("../config").defineOptions(Editor.prototype, "editor", ***REMOVED***
    useElasticTabstops: ***REMOVED***
        set: function(val) ***REMOVED***
            if (val) ***REMOVED***
                if (!this.elasticTabstops)
                    this.elasticTabstops = new ElasticTabstopsLite(this);
                this.commands.on("afterExec", this.elasticTabstops.onAfterExec);
                this.commands.on("exec", this.elasticTabstops.onExec);
                this.on("change", this.elasticTabstops.onChange);
        ***REMOVED*** else if (this.elasticTabstops) ***REMOVED***
                this.commands.removeListener("afterExec", this.elasticTabstops.onAfterExec);
                this.commands.removeListener("exec", this.elasticTabstops.onExec);
                this.removeListener("change", this.elasticTabstops.onChange);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***);

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

define('ace/ext/statusbar', ['require', 'exports', 'module' , 'ace/lib/dom', 'ace/lib/lang'], function(require, exports, module) ***REMOVED***
var dom = require("ace/lib/dom");
var lang = require("ace/lib/lang");

var StatusBar = function(editor, parentNode) ***REMOVED***
    this.element = dom.createElement("div");
    this.element.className = "ace_status-indicator";
    this.element.style.cssText = "display: inline-block;";
    parentNode.appendChild(this.element);

    var statusUpdate = lang.delayedCall(function()***REMOVED***
        this.updateStatus(editor)
***REMOVED***.bind(this));
    editor.on("changeStatus", function() ***REMOVED***
        statusUpdate.schedule(100);
***REMOVED***);
    editor.on("changeSelection", function() ***REMOVED***
        statusUpdate.schedule(100);
***REMOVED***);
***REMOVED***;

(function()***REMOVED***
    this.updateStatus = function(editor) ***REMOVED***
        var status = [];
        function add(str, separator) ***REMOVED***
            str && status.push(str, separator || "|");
    ***REMOVED***

        if (editor.$vimModeHandler)
            add(editor.$vimModeHandler.getStatusText());
        else if (editor.commands.recording)
            add("REC");

        var c = editor.selection.lead;
        add(c.row + ":" + c.column, " ");
        if (!editor.selection.isEmpty()) ***REMOVED***
            var r = editor.getSelectionRange();
            add("(" + (r.end.row - r.start.row) + ":"  +(r.end.column - r.start.column) + ")");
    ***REMOVED***
        status.pop();
        this.element.textContent = status.join("");
***REMOVED***;
***REMOVED***).call(StatusBar.prototype);

exports.StatusBar = StatusBar;

***REMOVED***);

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

define('ace/ext/language_tools', ['require', 'exports', 'module' , 'ace/snippets', 'ace/autocomplete', 'ace/config', 'ace/autocomplete/util', 'ace/autocomplete/text_completer', 'ace/editor'], function(require, exports, module) ***REMOVED***


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

define('ace/autocomplete', ['require', 'exports', 'module' , 'ace/keyboard/hash_handler', 'ace/autocomplete/popup', 'ace/autocomplete/util', 'ace/lib/event', 'ace/lib/lang', 'ace/snippets'], function(require, exports, module) ***REMOVED***


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

define('ace/autocomplete/popup', ['require', 'exports', 'module' , 'ace/edit_session', 'ace/virtual_renderer', 'ace/editor', 'ace/range', 'ace/lib/event', 'ace/lib/lang', 'ace/lib/dom'], function(require, exports, module) ***REMOVED***


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

define('ace/autocomplete/util', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


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

define('ace/autocomplete/text_completer', ['require', 'exports', 'module' , 'ace/range'], function(require, exports, module) ***REMOVED***
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

define('ace/ext/beautify', ['require', 'exports', 'module' , 'ace/token_iterator', 'ace/ext/beautify/php_rules'], function(require, exports, module) ***REMOVED***

var TokenIterator = require("ace/token_iterator").TokenIterator;

var phpTransform = require("./beautify/php_rules").transform;

exports.beautify = function(session) ***REMOVED***
    var iterator = new TokenIterator(session, 0, 0);
    var token = iterator.getCurrentToken();

    var context = session.$modeId.split("/").pop();

    var code = phpTransform(iterator, context);
    session.doc.setValue(code);
***REMOVED***;

exports.commands = [***REMOVED***
    name: "beautify",
    exec: function(editor) ***REMOVED***
        exports.beautify(editor.session);
***REMOVED***
    bindKey: "Ctrl-Shift-B"
***REMOVED***]

***REMOVED***);

define('ace/ext/beautify/php_rules', ['require', 'exports', 'module' , 'ace/token_iterator'], function(require, exports, module) ***REMOVED***

var TokenIterator = require("ace/token_iterator").TokenIterator;
exports.newLines = [***REMOVED***
    type: 'support.php_tag',
    value: '<?php'
***REMOVED***, ***REMOVED***
    type: 'support.php_tag',
    value: '<?'
***REMOVED***, ***REMOVED***
    type: 'support.php_tag',
    value: '?>'
***REMOVED***, ***REMOVED***
    type: 'paren.lparen',
    value: '***REMOVED***',
    indent: true
***REMOVED***, ***REMOVED***
    type: 'paren.rparen',
    breakBefore: true,
    value: '***REMOVED***',
    indent: false
***REMOVED***, ***REMOVED***
    type: 'paren.rparen',
    breakBefore: true,
    value: '***REMOVED***)',
    indent: false,
    dontBreak: true
***REMOVED***, ***REMOVED***
    type: 'comment'
***REMOVED***, ***REMOVED***
    type: 'text',
    value: ';'
***REMOVED***, ***REMOVED***
    type: 'text',
    value: ':',
    context: 'php'
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'case',
    indent: true,
    dontBreak: true
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'default',
    indent: true,
    dontBreak: true
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'break',
    indent: false,
    dontBreak: true
***REMOVED***, ***REMOVED***
    type: 'punctuation.doctype.end',
    value: '>'
***REMOVED***, ***REMOVED***
    type: 'meta.tag.punctuation.end',
    value: '>'
***REMOVED***, ***REMOVED***
    type: 'meta.tag.punctuation.begin',
    value: '<',
    blockTag: true,
    indent: true,
    dontBreak: true
***REMOVED***, ***REMOVED***
    type: 'meta.tag.punctuation.begin',
    value: '</',
    indent: false,
    breakBefore: true,
    dontBreak: true
***REMOVED***, ***REMOVED***
    type: 'punctuation.operator',
    value: ';'
***REMOVED***];

exports.spaces = [***REMOVED***
    type: 'xml-pe',
    prepend: true
***REMOVED***,***REMOVED***
    type: 'entity.other.attribute-name',
    prepend: true
***REMOVED***, ***REMOVED***
    type: 'storage.type',
    value: 'var',
    append: true
***REMOVED***, ***REMOVED***
    type: 'storage.type',
    value: 'function',
    append: true
***REMOVED***, ***REMOVED***
    type: 'keyword.operator',
    value: '='
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'as',
    prepend: true,
    append: true
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'function',
    append: true
***REMOVED***, ***REMOVED***
    type: 'support.function',
    next: /[^\(]/,
    append: true
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'or',
    append: true,
    prepend: true
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'and',
    append: true,
    prepend: true
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'case',
    append: true
***REMOVED***, ***REMOVED***
    type: 'keyword.operator',
    value: '||',
    append: true,
    prepend: true
***REMOVED***, ***REMOVED***
    type: 'keyword.operator',
    value: '&&',
    append: true,
    prepend: true
***REMOVED***];
exports.singleTags = ['!doctype','area','base','br','hr','input','img','link','meta'];

exports.transform = function(iterator, maxPos, context) ***REMOVED***
    var token = iterator.getCurrentToken();
    
    var newLines = exports.newLines;
    var spaces = exports.spaces;
    var singleTags = exports.singleTags;

    var code = '';
    
    var indentation = 0;
    var dontBreak = false;
    var tag;
    var lastTag;
    var lastToken = ***REMOVED******REMOVED***;
    var nextTag;
    var nextToken = ***REMOVED******REMOVED***;
    var breakAdded = false;
    var value = '';

    while (token!==null) ***REMOVED***
        console.log(token);

        if( !token )***REMOVED***
            token = iterator.stepForward();
            continue;
    ***REMOVED***
        if( token.type == 'support.php_tag' && token.value != '?>' )***REMOVED***
            context = 'php';
    ***REMOVED***
        else if( token.type == 'support.php_tag' && token.value == '?>' )***REMOVED***
            context = 'html';
    ***REMOVED***
        else if( token.type == 'meta.tag.name.style' && context != 'css' )***REMOVED***
            context = 'css';
    ***REMOVED***
        else if( token.type == 'meta.tag.name.style' && context == 'css' )***REMOVED***
            context = 'html';
    ***REMOVED***
        else if( token.type == 'meta.tag.name.script' && context != 'js' )***REMOVED***
            context = 'js';
    ***REMOVED***
        else if( token.type == 'meta.tag.name.script' && context == 'js' )***REMOVED***
            context = 'html';
    ***REMOVED***

        nextToken = iterator.stepForward();
        if (nextToken && nextToken.type.indexOf('meta.tag.name') == 0) ***REMOVED***
            nextTag = nextToken.value;
    ***REMOVED***
        if ( lastToken.type == 'support.php_tag' && lastToken.value == '<?=') ***REMOVED***
            dontBreak = true;
    ***REMOVED***
        if (token.type == 'meta.tag.name') ***REMOVED***
            token.value = token.value.toLowerCase();
    ***REMOVED***
        if (token.type == 'text') ***REMOVED***
            token.value = token.value.trim();
    ***REMOVED***
        if (!token.value) ***REMOVED***
            token = nextToken;
            continue;
    ***REMOVED***
        value = token.value;
        for (var i in spaces) ***REMOVED***
            if (
                token.type == spaces[i].type &&
                (!spaces[i].value || token.value == spaces[i].value) &&
                (
                    nextToken &&
                    (!spaces[i].next || spaces[i].next.test(nextToken.value))
                )
            ) ***REMOVED***
                if (spaces[i].prepend) ***REMOVED***
                    value = ' ' + token.value;
            ***REMOVED***

                if (spaces[i].append) ***REMOVED***
                    value += ' ';
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        if (token.type.indexOf('meta.tag.name') == 0) ***REMOVED***
            tag = token.value;
    ***REMOVED***
        breakAdded = false;
        for (i in newLines) ***REMOVED***
            if (
                token.type == newLines[i].type &&
                (
                    !newLines[i].value ||
                    token.value == newLines[i].value
                ) &&
                (
                    !newLines[i].blockTag ||
                    singleTags.indexOf(nextTag) === -1
                ) &&
                (
                    !newLines[i].context ||
                    newLines[i].context === context
                )
            ) ***REMOVED***
                if (newLines[i].indent === false) ***REMOVED***
                    indentation--;
            ***REMOVED***

                if (
                    newLines[i].breakBefore &&
                    ( !newLines[i].prev || newLines[i].prev.test(lastToken.value) )
                ) ***REMOVED***
                    code += "\n";
                    breakAdded = true;
                    for (i = 0; i < indentation; i++) ***REMOVED***
                        code += "\t";
                ***REMOVED***
            ***REMOVED***

                break;
        ***REMOVED***
    ***REMOVED***

        if (dontBreak===false) ***REMOVED***
            for (i in newLines) ***REMOVED***
                if (
                    lastToken.type == newLines[i].type &&
                    (
                        !newLines[i].value || lastToken.value == newLines[i].value
                    ) &&
                    (
                        !newLines[i].blockTag ||
                        singleTags.indexOf(tag) === -1
                    ) &&
                    (
                        !newLines[i].context ||
                        newLines[i].context === context
                    )
                ) ***REMOVED***
                    if (newLines[i].indent === true) ***REMOVED***
                        indentation++;
                ***REMOVED***

                    if (!newLines[i].dontBreak  && !breakAdded) ***REMOVED***
                        code += "\n";
                        for (i = 0; i < indentation; i++) ***REMOVED***
                            code += "\t";
                    ***REMOVED***
                ***REMOVED***

                    break;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

        code += value;
        if ( lastToken.type == 'support.php_tag' && lastToken.value == '?>' ) ***REMOVED***
            dontBreak = false;
    ***REMOVED***
        lastTag = tag;

        lastToken = token;

        token = nextToken;

        if (token===null) ***REMOVED***
            break;
    ***REMOVED***
***REMOVED***
    
    return code;
***REMOVED***;



***REMOVED***);