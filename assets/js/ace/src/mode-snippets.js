define('ace/mode/snippets', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/text_highlight_rules', 'ace/mode/folding/coffee'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var SnippetHighlightRules = function() ***REMOVED***

    var builtins = "SELECTION|CURRENT_WORD|SELECTED_TEXT|CURRENT_LINE|LINE_INDEX|" +
        "LINE_NUMBER|SOFT_TABS|TAB_SIZE|FILENAME|FILEPATH|FULLNAME";

    this.$rules = ***REMOVED***
        "start" : [
            ***REMOVED***token:"constant.language.escape", regex: /\\[\$***REMOVED***`\\]/***REMOVED***,
            ***REMOVED***token:"keyword", regex: "\\$(?:TM_)?(?:" + builtins + ")\\b"***REMOVED***,
            ***REMOVED***token:"variable", regex: "\\$\\w+"***REMOVED***,
            ***REMOVED***onMatch: function(value, state, stack) ***REMOVED***
                if (stack[1])
                    stack[1]++;
                else
                    stack.unshift(state, 1);
                return this.tokenName;
        ***REMOVED*** tokenName: "markup.list", regex: "\\$***REMOVED***", next: "varDecl"***REMOVED***,
            ***REMOVED***onMatch: function(value, state, stack) ***REMOVED***
                if (!stack[1])
                    return "text";
                stack[1]--;
                if (!stack[1])
                    stack.splice(0,2);
                return this.tokenName;
        ***REMOVED*** tokenName: "markup.list", regex: "***REMOVED***"***REMOVED***,
            ***REMOVED***token: "doc.comment", regex:/^\$***REMOVED***2***REMOVED***-***REMOVED***5,***REMOVED***$/***REMOVED***
        ],
        "varDecl" : [
            ***REMOVED***regex: /\d+\b/, token: "constant.numeric"***REMOVED***,
            ***REMOVED***token:"keyword", regex: "(?:TM_)?(?:" + builtins + ")\\b"***REMOVED***,
            ***REMOVED***token:"variable", regex: "\\w+"***REMOVED***,
            ***REMOVED***regex: /:/, token: "punctuation.operator", next: "start"***REMOVED***,
            ***REMOVED***regex: /\//, token: "string.regex", next: "regexp"***REMOVED***,
            ***REMOVED***regex: "", next: "start"***REMOVED***
        ],
        "regexp" : [
            ***REMOVED***regex: /\\./, token: "escape"***REMOVED***,
            ***REMOVED***regex: /\[/, token: "regex.start", next: "charClass"***REMOVED***,
            ***REMOVED***regex: "/", token: "string.regex", next: "format"***REMOVED***,
            ***REMOVED***"token": "string.regex", regex:"."***REMOVED***
        ],
        charClass : [
            ***REMOVED***regex: "\\.", token: "escape"***REMOVED***,
            ***REMOVED***regex: "\\]", token: "regex.end", next: "regexp"***REMOVED***,
            ***REMOVED***"token": "string.regex", regex:"."***REMOVED***
        ],
        "format" : [
            ***REMOVED***regex: /\\[ulULE]/, token: "keyword"***REMOVED***,
            ***REMOVED***regex: /\$\d+/, token: "variable"***REMOVED***,
            ***REMOVED***regex: "/[gim]*:?", token: "string.regex", next: "start"***REMOVED***,
            ***REMOVED***"token": "string", regex:"."***REMOVED***
        ]
***REMOVED***;
***REMOVED***;
oop.inherits(SnippetHighlightRules, TextHighlightRules);

exports.SnippetHighlightRules = SnippetHighlightRules;

var SnippetGroupHighlightRules = function() ***REMOVED***
    this.$rules = ***REMOVED***
        "start" : [
			***REMOVED***token: "text", regex: "^\\t", next: "sn-start"***REMOVED***,
			***REMOVED***token:"invalid", regex: /^ \s*/***REMOVED***,
            ***REMOVED***token:"comment", regex: /^#.*/***REMOVED***,
            ***REMOVED***token:"constant.language.escape", regex: "^regex ", next: "regex"***REMOVED***,
            ***REMOVED***token:"constant.language.escape", regex: "^(trigger|endTrigger|name|snippet|guard|endGuard|tabTrigger|key)\\b"***REMOVED***
        ],
		"regex" : [
			***REMOVED***token:"text", regex: "\\."***REMOVED***,
			***REMOVED***token:"keyword", regex: "/"***REMOVED***,
			***REMOVED***token:"empty", regex: "$", next: "start"***REMOVED***
		]
***REMOVED***;
	this.embedRules(SnippetHighlightRules, "sn-", [
		***REMOVED***token: "text", regex: "^\\t", next: "sn-start"***REMOVED***,
		***REMOVED***onMatch: function(value, state, stack) ***REMOVED***
			stack.splice(stack.length);
			return this.tokenName;
		***REMOVED***, tokenName: "text", regex: "^(?!\t)", next: "start"***REMOVED***
	])
	
***REMOVED***;

oop.inherits(SnippetGroupHighlightRules, TextHighlightRules);

exports.SnippetGroupHighlightRules = SnippetGroupHighlightRules;

var FoldMode = require("./folding/coffee").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = SnippetGroupHighlightRules;
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.$indentWithTabs = true;
    this.$id = "ace/mode/snippets";
***REMOVED***).call(Mode.prototype);
exports.Mode = Mode;


***REMOVED***);

define('ace/mode/folding/coffee', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/fold_mode', 'ace/range'], function(require, exports, module) ***REMOVED***


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
