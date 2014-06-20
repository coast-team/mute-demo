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

