define('ace/mode/latex', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/latex_highlight_rules', 'ace/mode/folding/latex', 'ace/range'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var LatexHighlightRules = require("./latex_highlight_rules").LatexHighlightRules;
var LatexFoldMode = require("./folding/latex").FoldMode;
var Range = require("../range").Range;

var Mode = function() ***REMOVED***
    this.HighlightRules = LatexHighlightRules;
    this.foldingRules = new LatexFoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.lineCommentStart = "%";

    this.$id = "ace/mode/latex";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;

***REMOVED***);
define('ace/mode/latex_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var LatexHighlightRules = function() ***REMOVED***   
    this.$rules = ***REMOVED***
        "start" : [***REMOVED***
            token : "keyword",
            regex : "\\\\(?:[^a-zA-Z]|[a-zA-Z]+)"
    ***REMOVED*** ***REMOVED***
            token : "lparen",
            regex : "[[(***REMOVED***]"
    ***REMOVED*** ***REMOVED***
            token : "rparen",
            regex : "[\\])***REMOVED***]"
    ***REMOVED*** ***REMOVED***
            token : "string",
            regex : "\\$(?:(?:\\\\.)|(?:[^\\$\\\\]))*?\\$"
    ***REMOVED*** ***REMOVED***
            token : "comment",
            regex : "%.*$"
    ***REMOVED***]
***REMOVED***;
***REMOVED***;

oop.inherits(LatexHighlightRules, TextHighlightRules);

exports.LatexHighlightRules = LatexHighlightRules;

***REMOVED***);

define('ace/mode/folding/latex', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/fold_mode', 'ace/range', 'ace/token_iterator'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;
var Range = require("../../range").Range;
var TokenIterator = require("../../token_iterator").TokenIterator;

var FoldMode = exports.FoldMode = function() ***REMOVED******REMOVED***;

oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***

    this.foldingStartMarker = /^\s*\\(begin)|(section|subsection)\b|***REMOVED***\s*$/;
    this.foldingStopMarker = /^\s*\\(end)\b|^\s****REMOVED***/;

    this.getFoldWidgetRange = function(session, foldStyle, row) ***REMOVED***
        var line = session.doc.getLine(row);
        var match = this.foldingStartMarker.exec(line);
        if (match) ***REMOVED***
            if (match[1])
                return this.latexBlock(session, row, match[0].length - 1);
            if (match[2])
                return this.latexSection(session, row, match[0].length - 1);

            return this.openingBracketBlock(session, "***REMOVED***", row, match.index);
    ***REMOVED***

        var match = this.foldingStopMarker.exec(line);
        if (match) ***REMOVED***
            if (match[1])
                return this.latexBlock(session, row, match[0].length - 1);

            return this.closingBracketBlock(session, "***REMOVED***", row, match.index + match[0].length);
    ***REMOVED***
***REMOVED***;

    this.latexBlock = function(session, row, column) ***REMOVED***
        var keywords = ***REMOVED***
            "\\begin": 1,
            "\\end": -1
    ***REMOVED***;

        var stream = new TokenIterator(session, row, column);
        var token = stream.getCurrentToken();
        if (!token || token.type !== "keyword")
            return;

        var val = token.value;
        var dir = keywords[val];

        var getType = function() ***REMOVED***
            var token = stream.stepForward();
            var type = token.type == "lparen" ?stream.stepForward().value : "";
            if (dir === -1) ***REMOVED***
                stream.stepBackward();
                if (type)
                    stream.stepBackward();
        ***REMOVED***
            return type;
    ***REMOVED***;
        var stack = [getType()];
        var startColumn = dir === -1 ? stream.getCurrentTokenColumn() : session.getLine(row).length;
        var startRow = row;

        stream.step = dir === -1 ? stream.stepBackward : stream.stepForward;
        while(token = stream.step()) ***REMOVED***
            if (token.type !== "keyword")
                continue;
            var level = keywords[token.value];
            if (!level)
                continue;
            var type = getType();
            if (level === dir)
                stack.unshift(type);
            else if (stack.shift() !== type || !stack.length)
                break;
    ***REMOVED***

        if (stack.length)
            return;

        var row = stream.getCurrentTokenRow();
        if (dir === -1)
            return new Range(row, session.getLine(row).length, startRow, startColumn);
        stream.stepBackward();
        return new Range(startRow, startColumn, row, stream.getCurrentTokenColumn());
***REMOVED***;

    this.latexSection = function(session, row, column) ***REMOVED***
        var keywords = ["\\subsection", "\\section", "\\begin", "\\end"];

        var stream = new TokenIterator(session, row, column);
        var token = stream.getCurrentToken();
        if (!token || token.type != "keyword")
            return;

        var startLevel = keywords.indexOf(token.value);
        var stackDepth = 0
        var endRow = row;

        while(token = stream.stepForward()) ***REMOVED***
            if (token.type !== "keyword")
                continue;
            var level = keywords.indexOf(token.value);

            if (level >= 2) ***REMOVED***
                if (!stackDepth)
                    endRow = stream.getCurrentTokenRow() - 1;
                stackDepth += level == 2 ? 1 : - 1;
                if (stackDepth < 0)
                    break
        ***REMOVED*** else if (level >= startLevel)
                break;
    ***REMOVED***

        if (!stackDepth)
            endRow = stream.getCurrentTokenRow() - 1;

        while (endRow > row && !/\S/.test(session.getLine(endRow)))
            endRow--;

        return new Range(
            row, session.getLine(row).length,
            endRow, session.getLine(endRow).length
        );
***REMOVED***;

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
