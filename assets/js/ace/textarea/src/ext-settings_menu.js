/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2013 Matthew Christopher Kastor-Inare III, Atropa Inc. Intl
 * All rights reserved.
 *
 * Contributed to Ajax.org under the BSD license.
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

__ace_shadowed__.define('ace/ext/settings_menu', ['require', 'exports', 'module' , 'ace/ext/menu_tools/generate_settings_menu', 'ace/ext/menu_tools/overlay_page', 'ace/editor'], function(require, exports, module) ***REMOVED***

var generateSettingsMenu = require('./menu_tools/generate_settings_menu').generateSettingsMenu;
var overlayPage = require('./menu_tools/overlay_page').overlayPage;
function showSettingsMenu(editor) ***REMOVED***
    var sm = document.getElementById('ace_settingsmenu');
    if (!sm)    
        overlayPage(editor, generateSettingsMenu(editor), '0', '0', '0');
***REMOVED***
module.exports.init = function(editor) ***REMOVED***
    var Editor = require("ace/editor").Editor;
    Editor.prototype.showSettingsMenu = function() ***REMOVED***
        showSettingsMenu(this);
***REMOVED***;
***REMOVED***;
***REMOVED***);

__ace_shadowed__.define('ace/ext/menu_tools/generate_settings_menu', ['require', 'exports', 'module' , 'ace/ext/menu_tools/element_generator', 'ace/ext/menu_tools/add_editor_menu_options', 'ace/ext/menu_tools/get_set_functions'], function(require, exports, module) ***REMOVED***

var egen = require('./element_generator');
var addEditorMenuOptions = require('./add_editor_menu_options').addEditorMenuOptions;
var getSetFunctions = require('./get_set_functions').getSetFunctions;
module.exports.generateSettingsMenu = function generateSettingsMenu (editor) ***REMOVED***
    var elements = [];
    function cleanupElementsList() ***REMOVED***
        elements.sort(function(a, b) ***REMOVED***
            var x = a.getAttribute('contains');
            var y = b.getAttribute('contains');
            return x.localeCompare(y);
    ***REMOVED***);
***REMOVED***
    function wrapElements() ***REMOVED***
        var topmenu = document.createElement('div');
        topmenu.setAttribute('id', 'ace_settingsmenu');
        elements.forEach(function(element) ***REMOVED***
            topmenu.appendChild(element);
    ***REMOVED***);
        return topmenu;
***REMOVED***
    function createNewEntry(obj, clss, item, val) ***REMOVED***
        var el;
        var div = document.createElement('div');
        div.setAttribute('contains', item);
        div.setAttribute('class', 'ace_optionsMenuEntry');
        div.setAttribute('style', 'clear: both;');

        div.appendChild(egen.createLabel(
            item.replace(/^set/, '').replace(/([A-Z])/g, ' $1').trim(),
            item
        ));

        if (Array.isArray(val)) ***REMOVED***
            el = egen.createSelection(item, val, clss);
            el.addEventListener('change', function(e) ***REMOVED***
                try***REMOVED***
                    editor.menuOptions[e.target.id].forEach(function(x) ***REMOVED***
                        if(x.textContent !== e.target.textContent) ***REMOVED***
                            delete x.selected;
                    ***REMOVED***
                ***REMOVED***);
                    obj[e.target.id](e.target.value);
            ***REMOVED*** catch (err) ***REMOVED***
                    throw new Error(err);
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED*** else if(typeof val === 'boolean') ***REMOVED***
            el = egen.createCheckbox(item, val, clss);
            el.addEventListener('change', function(e) ***REMOVED***
                try***REMOVED***
                    obj[e.target.id](!!e.target.checked);
            ***REMOVED*** catch (err) ***REMOVED***
                    throw new Error(err);
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
            el = egen.createInput(item, val, clss);
            el.addEventListener('change', function(e) ***REMOVED***
                try***REMOVED***
                    if(e.target.value === 'true') ***REMOVED***
                        obj[e.target.id](true);
                ***REMOVED*** else if(e.target.value === 'false') ***REMOVED***
                        obj[e.target.id](false);
                ***REMOVED*** else ***REMOVED***
                        obj[e.target.id](e.target.value);
                ***REMOVED***
            ***REMOVED*** catch (err) ***REMOVED***
                    throw new Error(err);
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***
        el.style.cssText = 'float:right;';
        div.appendChild(el);
        return div;
***REMOVED***
    function makeDropdown(item, esr, clss, fn) ***REMOVED***
        var val = editor.menuOptions[item];
        var currentVal = esr[fn]();
        if (typeof currentVal == 'object')
            currentVal = currentVal.$id;
        val.forEach(function(valuex) ***REMOVED***
            if (valuex.value === currentVal)
                valuex.selected = 'selected';
    ***REMOVED***);
        return createNewEntry(esr, clss, item, val);
***REMOVED***
    function handleSet(setObj) ***REMOVED***
        var item = setObj.functionName;
        var esr = setObj.parentObj;
        var clss = setObj.parentName;
        var val;
        var fn = item.replace(/^set/, 'get');
        if(editor.menuOptions[item] !== undefined) ***REMOVED***
            elements.push(makeDropdown(item, esr, clss, fn));
    ***REMOVED*** else if(typeof esr[fn] === 'function') ***REMOVED***
            try ***REMOVED***
                val = esr[fn]();
                if(typeof val === 'object') ***REMOVED***
                    val = val.$id;
            ***REMOVED***
                elements.push(
                    createNewEntry(esr, clss, item, val)
                );
        ***REMOVED*** catch (e) ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    addEditorMenuOptions(editor);
    getSetFunctions(editor).forEach(function(setObj) ***REMOVED***
        handleSet(setObj);
***REMOVED***);
    cleanupElementsList();
    return wrapElements();
***REMOVED***;

***REMOVED***);

__ace_shadowed__.define('ace/ext/menu_tools/element_generator', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
module.exports.createOption = function createOption (obj) ***REMOVED***
    var attribute;
    var el = document.createElement('option');
    for(attribute in obj) ***REMOVED***
        if(obj.hasOwnProperty(attribute)) ***REMOVED***
            if(attribute === 'selected') ***REMOVED***
                el.setAttribute(attribute, obj[attribute]);
        ***REMOVED*** else ***REMOVED***
                el[attribute] = obj[attribute];
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    return el;
***REMOVED***;
module.exports.createCheckbox = function createCheckbox (id, checked, clss) ***REMOVED***
    var el = document.createElement('input');
    el.setAttribute('type', 'checkbox');
    el.setAttribute('id', id);
    el.setAttribute('name', id);
    el.setAttribute('value', checked);
    el.setAttribute('class', clss);
    if(checked) ***REMOVED***
        el.setAttribute('checked', 'checked');
***REMOVED***
    return el;
***REMOVED***;
module.exports.createInput = function createInput (id, value, clss) ***REMOVED***
    var el = document.createElement('input');
    el.setAttribute('type', 'text');
    el.setAttribute('id', id);
    el.setAttribute('name', id);
    el.setAttribute('value', value);
    el.setAttribute('class', clss);
    return el;
***REMOVED***;
module.exports.createLabel = function createLabel (text, labelFor) ***REMOVED***
    var el = document.createElement('label');
    el.setAttribute('for', labelFor);
    el.textContent = text;
    return el;
***REMOVED***;
module.exports.createSelection = function createSelection (id, values, clss) ***REMOVED***
    var el = document.createElement('select');
    el.setAttribute('id', id);
    el.setAttribute('name', id);
    el.setAttribute('class', clss);
    values.forEach(function(item) ***REMOVED***
        el.appendChild(module.exports.createOption(item));
***REMOVED***);
    return el;
***REMOVED***;

***REMOVED***);

__ace_shadowed__.define('ace/ext/menu_tools/add_editor_menu_options', ['require', 'exports', 'module' , 'ace/ext/modelist', 'ace/ext/themelist'], function(require, exports, module) ***REMOVED***
module.exports.addEditorMenuOptions = function addEditorMenuOptions (editor) ***REMOVED***
    var modelist = require('../modelist');
    var themelist = require('../themelist');
    editor.menuOptions = ***REMOVED***
        "setNewLineMode" : [***REMOVED***
            "textContent" : "unix",
            "value" : "unix"
    ***REMOVED*** ***REMOVED***
            "textContent" : "windows",
            "value" : "windows"
    ***REMOVED*** ***REMOVED***
            "textContent" : "auto",
            "value" : "auto"
    ***REMOVED***],
        "setTheme" : [],
        "setMode" : [],
        "setKeyboardHandler": [***REMOVED***
            "textContent" : "ace",
            "value" : ""
    ***REMOVED*** ***REMOVED***
            "textContent" : "vim",
            "value" : "ace/keyboard/vim"
    ***REMOVED*** ***REMOVED***
            "textContent" : "emacs",
            "value" : "ace/keyboard/emacs"
    ***REMOVED***]
***REMOVED***;

    editor.menuOptions.setTheme = themelist.themes.map(function(theme) ***REMOVED***
        return ***REMOVED***
            'textContent' : theme.caption,
            'value' : theme.theme
    ***REMOVED***;
***REMOVED***);

    editor.menuOptions.setMode = modelist.modes.map(function(mode) ***REMOVED***
        return ***REMOVED***
            'textContent' : mode.name,
            'value' : mode.mode
    ***REMOVED***;
***REMOVED***);
***REMOVED***;


***REMOVED***);
__ace_shadowed__.define('ace/ext/modelist', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


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

__ace_shadowed__.define('ace/ext/themelist', ['require', 'exports', 'module' , 'ace/lib/fixoldbrowsers'], function(require, exports, module) ***REMOVED***

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

__ace_shadowed__.define('ace/ext/menu_tools/get_set_functions', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
module.exports.getSetFunctions = function getSetFunctions (editor) ***REMOVED***
    var out = [];
    var my = ***REMOVED***
        'editor' : editor,
        'session' : editor.session,
        'renderer' : editor.renderer
***REMOVED***;
    var opts = [];
    var skip = [
        'setOption',
        'setUndoManager',
        'setDocument',
        'setValue',
        'setBreakpoints',
        'setScrollTop',
        'setScrollLeft',
        'setSelectionStyle',
        'setWrapLimitRange'
    ];
    ['renderer', 'session', 'editor'].forEach(function(esra) ***REMOVED***
        var esr = my[esra];
        var clss = esra;
        for(var fn in esr) ***REMOVED***
            if(skip.indexOf(fn) === -1) ***REMOVED***
                if(/^set/.test(fn) && opts.indexOf(fn) === -1) ***REMOVED***
                    opts.push(fn);
                    out.push(***REMOVED***
                        'functionName' : fn,
                        'parentObj' : esr,
                        'parentName' : clss
                ***REMOVED***);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***);
    return out;
***REMOVED***;

***REMOVED***);

__ace_shadowed__.define('ace/ext/menu_tools/overlay_page', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

var dom = require("../../lib/dom");
var cssText = "#ace_settingsmenu, #kbshortcutmenu ***REMOVED***\
background-color: #F7F7F7;\
color: black;\
box-shadow: -5px 4px 5px rgba(126, 126, 126, 0.55);\
padding: 1em 0.5em 2em 1em;\
overflow: auto;\
position: absolute;\
margin: 0;\
bottom: 0;\
right: 0;\
top: 0;\
z-index: 9991;\
cursor: default;\
***REMOVED***\
.ace_dark #ace_settingsmenu, .ace_dark #kbshortcutmenu ***REMOVED***\
box-shadow: -20px 10px 25px rgba(126, 126, 126, 0.25);\
background-color: rgba(255, 255, 255, 0.6);\
color: black;\
***REMOVED***\
.ace_optionsMenuEntry:hover ***REMOVED***\
background-color: rgba(100, 100, 100, 0.1);\
-webkit-transition: all 0.5s;\
transition: all 0.3s\
***REMOVED***\
.ace_closeButton ***REMOVED***\
background: rgba(245, 146, 146, 0.5);\
border: 1px solid #F48A8A;\
border-radius: 50%;\
padding: 7px;\
position: absolute;\
right: -8px;\
top: -8px;\
z-index: 1000;\
***REMOVED***\
.ace_closeButton***REMOVED***\
background: rgba(245, 146, 146, 0.9);\
***REMOVED***\
.ace_optionsMenuKey ***REMOVED***\
color: darkslateblue;\
font-weight: bold;\
***REMOVED***\
.ace_optionsMenuCommand ***REMOVED***\
color: darkcyan;\
font-weight: normal;\
***REMOVED***";
dom.importCssString(cssText);
module.exports.overlayPage = function overlayPage(editor, contentElement, top, right, bottom, left) ***REMOVED***
    top = top ? 'top: ' + top + ';' : '';
    bottom = bottom ? 'bottom: ' + bottom + ';' : '';
    right = right ? 'right: ' + right + ';' : '';
    left = left ? 'left: ' + left + ';' : '';

    var closer = document.createElement('div');
    var contentContainer = document.createElement('div');

    function documentEscListener(e) ***REMOVED***
        if (e.keyCode === 27) ***REMOVED***
            closer.click();
    ***REMOVED***
***REMOVED***

    closer.style.cssText = 'margin: 0; padding: 0; ' +
        'position: fixed; top:0; bottom:0; left:0; right:0;' +
        'z-index: 9990; ' +
        'background-color: rgba(0, 0, 0, 0.3);';
    closer.addEventListener('click', function() ***REMOVED***
        document.removeEventListener('keydown', documentEscListener);
        closer.parentNode.removeChild(closer);
        editor.focus();
        closer = null;
***REMOVED***);
    document.addEventListener('keydown', documentEscListener);

    contentContainer.style.cssText = top + right + bottom + left;
    contentContainer.addEventListener('click', function(e) ***REMOVED***
        e.stopPropagation();
***REMOVED***);

    var wrapper = dom.createElement("div");
    wrapper.style.position = "relative";
    
    var closeButton = dom.createElement("div");
    closeButton.className = "ace_closeButton";
    closeButton.addEventListener('click', function() ***REMOVED***
        closer.click();
***REMOVED***);
    
    wrapper.appendChild(closeButton);
    contentContainer.appendChild(wrapper);
    
    contentContainer.appendChild(contentElement);
    closer.appendChild(contentContainer);
    document.body.appendChild(closer);
    editor.blur();
***REMOVED***;

***REMOVED***);