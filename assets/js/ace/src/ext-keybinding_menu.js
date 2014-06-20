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

define('ace/ext/keybinding_menu', ['require', 'exports', 'module' , 'ace/editor', 'ace/ext/menu_tools/overlay_page', 'ace/ext/menu_tools/get_editor_keyboard_shortcuts'], function(require, exports, module) ***REMOVED***
    
    var Editor = require("ace/editor").Editor;
    function showKeyboardShortcuts (editor) ***REMOVED***
        if(!document.getElementById('kbshortcutmenu')) ***REMOVED***
            var overlayPage = require('./menu_tools/overlay_page').overlayPage;
            var getEditorKeybordShortcuts = require('./menu_tools/get_editor_keyboard_shortcuts').getEditorKeybordShortcuts;
            var kb = getEditorKeybordShortcuts(editor);
            var el = document.createElement('div');
            var commands = kb.reduce(function(previous, current) ***REMOVED***
                return previous + '<div class="ace_optionsMenuEntry"><span class="ace_optionsMenuCommand">' 
                    + current.command + '</span> : '
                    + '<span class="ace_optionsMenuKey">' + current.key + '</span></div>';
        ***REMOVED*** '');

            el.id = 'kbshortcutmenu';
            el.innerHTML = '<h1>Keyboard Shortcuts</h1>' + commands + '</div>';
            overlayPage(editor, el, '0', '0', '0', null);
    ***REMOVED***
***REMOVED***;
    module.exports.init = function(editor) ***REMOVED***
        Editor.prototype.showKeyboardShortcuts = function() ***REMOVED***
            showKeyboardShortcuts(this);
    ***REMOVED***;
        editor.commands.addCommands([***REMOVED***
            name: "showKeyboardShortcuts",
            bindKey: ***REMOVED***win: "Ctrl-Alt-h", mac: "Command-Alt-h"***REMOVED***,
            exec: function(editor, line) ***REMOVED***
                editor.showKeyboardShortcuts();
        ***REMOVED***
    ***REMOVED***]);
***REMOVED***;

***REMOVED***);

define('ace/ext/menu_tools/overlay_page', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

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

define('ace/ext/menu_tools/get_editor_keyboard_shortcuts', ['require', 'exports', 'module' , 'ace/lib/keys'], function(require, exports, module) ***REMOVED***

var keys = require("../../lib/keys");
module.exports.getEditorKeybordShortcuts = function(editor) ***REMOVED***
    var KEY_MODS = keys.KEY_MODS;
    var keybindings = [];
    var commandMap = ***REMOVED******REMOVED***;
    editor.keyBinding.$handlers.forEach(function(handler) ***REMOVED***
        var ckb = handler.commandKeyBinding;
        for (var i in ckb) ***REMOVED***
            var modifier = parseInt(i);
            if (modifier == -1) ***REMOVED***
                modifier = "";
        ***REMOVED*** else if(isNaN(modifier)) ***REMOVED***
                modifier = i;
        ***REMOVED*** else ***REMOVED***
                modifier = "" +
                    (modifier & KEY_MODS.command ? "Cmd-"   : "") +
                    (modifier & KEY_MODS.ctrl    ? "Ctrl-"  : "") +
                    (modifier & KEY_MODS.alt     ? "Alt-"   : "") +
                    (modifier & KEY_MODS.shift   ? "Shift-" : "");
        ***REMOVED***
            for (var key in ckb[i]) ***REMOVED***
                var command = ckb[i][key]
                if (typeof command != "string")
                    command  = command.name
                if (commandMap[command]) ***REMOVED***
                    commandMap[command].key += "|" + modifier + key;
            ***REMOVED*** else ***REMOVED***
                    commandMap[command] = ***REMOVED***key: modifier+key, command: command***REMOVED***;
                    keybindings.push(commandMap[command]);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***);
    return keybindings;
***REMOVED***;

***REMOVED***);