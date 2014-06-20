
__ace_shadowed__.define('ace/mode/space', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/folding/coffee', 'ace/mode/space_highlight_rules'], function(require, exports, module) ***REMOVED***

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var FoldMode = require("./folding/coffee").FoldMode;
var SpaceHighlightRules = require("./space_highlight_rules").SpaceHighlightRules;
var Mode = function() ***REMOVED***
    this.HighlightRules = SpaceHighlightRules;
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);
(function() ***REMOVED***
    
    this.$id = "ace/mode/space";
***REMOVED***).call(Mode.prototype);
exports.Mode = Mode;
***REMOVED***);

__ace_shadowed__.define('ace/mode/folding/coffee', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/fold_mode', 'ace/range'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;
var Range = require("../../range").Range;

var FoldMode = exports.FoldMode = function() ***REMOVED******REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***

    this.getFoldWidgetRange = function(session, foldStyle, row) ***REMOVED***
        var range = this.indentationBlock(session, row);
        if (range)
            return range;

        var re = /\S/;
        var line = session.getLine(row);
        var startLevel = line.search(re);
        if (startLevel == -1 || line[startLevel] != "#")
            return;

        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) ***REMOVED***
            line = session.getLine(row);
            var level = line.search(re);

            if (level == -1)
                continue;

            if (line[level] != "#")
                break;

            endRow = row;
    ***REMOVED***

        if (endRow > startRow) ***REMOVED***
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
    ***REMOVED***
***REMOVED***;
    this.getFoldWidget = function(session, foldStyle, row) ***REMOVED***
        var line = session.getLine(row);
        var indent = line.search(/\S/);
        var next = session.getLine(row + 1);
        var prev = session.getLine(row - 1);
        var prevIndent = prev.search(/\S/);
        var nextIndent = next.search(/\S/);

        if (indent == -1) ***REMOVED***
            session.foldWidgets[row - 1] = prevIndent!= -1 && prevIndent < nextIndent ? "start" : "";
            return "";
    ***REMOVED***
        if (prevIndent == -1) ***REMOVED***
            if (indent == nextIndent && line[indent] == "#" && next[indent] == "#") ***REMOVED***
                session.foldWidgets[row - 1] = "";
                session.foldWidgets[row + 1] = "";
                return "start";
        ***REMOVED***
    ***REMOVED*** else if (prevIndent == indent && line[indent] == "#" && prev[indent] == "#") ***REMOVED***
            if (session.getLine(row - 2).search(/\S/) == -1) ***REMOVED***
                session.foldWidgets[row - 1] = "start";
                session.foldWidgets[row + 1] = "";
                return "";
        ***REMOVED***
    ***REMOVED***

        if (prevIndent!= -1 && prevIndent < indent)
            session.foldWidgets[row - 1] = "start";
        else
            session.foldWidgets[row - 1] = "";

        if (indent < nextIndent)
            return "start";
        else
            return "";
***REMOVED***;

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
__ace_shadowed__.define('ace/mode/space_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var SpaceHighlightRules = function() ***REMOVED***
    this.$rules = ***REMOVED***
        "start" : [
            ***REMOVED***
                token : "empty_line",
                regex : / */,
                next : "key"
        ***REMOVED***
            ***REMOVED***
                token : "empty_line",
                regex : /$/,
                next : "key"
        ***REMOVED***
        ],
        "key" : [
            ***REMOVED***
                token : "variable",
                regex : /\S+/
        ***REMOVED***
            ***REMOVED***
                token : "empty_line",
                regex : /$/,
                next : "start"
        ***REMOVED******REMOVED***
                token : "keyword.operator",
                regex : / /,
                next  : "value"
        ***REMOVED***
        ],
        "value" : [
            ***REMOVED***
                token : "keyword.operator",
                regex : /$/,
                next  : "start"
        ***REMOVED***
            ***REMOVED***
                token : "string",
                regex : /[^$]/
        ***REMOVED***
        ]
***REMOVED***;
    
***REMOVED***;

oop.inherits(SpaceHighlightRules, TextHighlightRules);

exports.SpaceHighlightRules = SpaceHighlightRules;
***REMOVED***);
