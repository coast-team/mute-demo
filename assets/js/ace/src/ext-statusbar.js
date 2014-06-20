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