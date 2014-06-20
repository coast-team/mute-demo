__ace_shadowed__.define('ace/mode/dot', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/matching_brace_outdent', 'ace/mode/dot_highlight_rules', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var DotHighlightRules = require("./dot_highlight_rules").DotHighlightRules;
var DotFoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = DotHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.foldingRules = new DotFoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***

    this.lineCommentStart = ["//", "#"];
    this.blockComment = ***REMOVED***start: "/*", end: "*/"***REMOVED***;

    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") ***REMOVED***
            return indent;
    ***REMOVED***

        if (state == "start") ***REMOVED***
            var match = line.match(/^.*(?:\bcase\b.*\:|[\***REMOVED***\(\[])\s*$/);
            if (match) ***REMOVED***
                indent += tab;
        ***REMOVED***
    ***REMOVED***

        return indent;
***REMOVED***;

    this.checkOutdent = function(state, line, input) ***REMOVED***
        return this.$outdent.checkOutdent(line, input);
***REMOVED***;

    this.autoOutdent = function(state, doc, row) ***REMOVED***
        this.$outdent.autoOutdent(doc, row);
***REMOVED***;

    this.$id = "ace/mode/dot";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

__ace_shadowed__.define('ace/mode/matching_brace_outdent', ['require', 'exports', 'module' , 'ace/range'], function(require, exports, module) ***REMOVED***


var Range = require("../range").Range;

var MatchingBraceOutdent = function() ***REMOVED******REMOVED***;

(function() ***REMOVED***

    this.checkOutdent = function(line, input) ***REMOVED***
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\***REMOVED***/.test(input);
***REMOVED***;

    this.autoOutdent = function(doc, row) ***REMOVED***
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\***REMOVED***)/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket(***REMOVED***row: row, column: column***REMOVED***);

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
***REMOVED***;

    this.$getIndent = function(line) ***REMOVED***
        return line.match(/^\s*/)[0];
***REMOVED***;

***REMOVED***).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;
***REMOVED***);
__ace_shadowed__.define('ace/mode/dot_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/mode/text_highlight_rules', 'ace/mode/doc_comment_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var lang = require("../lib/lang");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;

var DotHighlightRules = function() ***REMOVED***

   var keywords = lang.arrayToMap(
        ("strict|node|edge|graph|digraph|subgraph").split("|")
   );

   var attributes = lang.arrayToMap(
        ("damping|k|url|area|arrowhead|arrowsize|arrowtail|aspect|bb|bgcolor|center|charset|clusterrank|color|colorscheme|comment|compound|concentrate|constraint|decorate|defaultdist|dim|dimen|dir|diredgeconstraints|distortion|dpi|edgeurl|edgehref|edgetarget|edgetooltip|epsilon|esep|fillcolor|fixedsize|fontcolor|fontname|fontnames|fontpath|fontsize|forcelabels|gradientangle|group|headurl|head_lp|headclip|headhref|headlabel|headport|headtarget|headtooltip|height|href|id|image|imagepath|imagescale|label|labelurl|label_scheme|labelangle|labeldistance|labelfloat|labelfontcolor|labelfontname|labelfontsize|labelhref|labeljust|labelloc|labeltarget|labeltooltip|landscape|layer|layerlistsep|layers|layerselect|layersep|layout|len|levels|levelsgap|lhead|lheight|lp|ltail|lwidth|margin|maxiter|mclimit|mindist|minlen|mode|model|mosek|nodesep|nojustify|normalize|nslimit|nslimit1|ordering|orientation|outputorder|overlap|overlap_scaling|pack|packmode|pad|page|pagedir|pencolor|penwidth|peripheries|pin|pos|quadtree|quantum|rank|rankdir|ranksep|ratio|rects|regular|remincross|repulsiveforce|resolution|root|rotate|rotation|samehead|sametail|samplepoints|scale|searchsize|sep|shape|shapefile|showboxes|sides|size|skew|smoothing|sortv|splines|start|style|stylesheet|tailurl|tail_lp|tailclip|tailhref|taillabel|tailport|tailtarget|tailtooltip|target|tooltip|truecolor|vertices|viewport|voro_margin|weight|width|xlabel|xlp|z").split("|")
   );

   this.$rules = ***REMOVED***
        "start" : [
            ***REMOVED***
                token : "comment",
                regex : /\/\/.*$/
        ***REMOVED*** ***REMOVED***
                token : "comment",
                regex : /#.*$/
        ***REMOVED*** ***REMOVED***
                token : "comment", // multi line comment
                merge : true,
                regex : /\/\*/,
                next : "comment"
        ***REMOVED*** ***REMOVED***
                token : "string",
                regex : "'(?=.)",
                next  : "qstring"
        ***REMOVED*** ***REMOVED***
                token : "string",
                regex : '"(?=.)',
                next  : "qqstring"
        ***REMOVED*** ***REMOVED***
                token : "constant.numeric",
                regex : /[+\-]?\d+(?:(?:\.\d*)?(?:[eE][+\-]?\d+)?)?\b/
        ***REMOVED*** ***REMOVED***
                token : "keyword.operator",
                regex : /\+|=|\->/
        ***REMOVED*** ***REMOVED***
                token : "punctuation.operator",
                regex : /,|;/
        ***REMOVED*** ***REMOVED***
                token : "paren.lparen",
                regex : /[\[***REMOVED***]/
        ***REMOVED*** ***REMOVED***
                token : "paren.rparen",
                regex : /[\]***REMOVED***]/
        ***REMOVED*** ***REMOVED***
                token: "comment",
                regex: /^#!.*$/
        ***REMOVED*** ***REMOVED***
                token: function(value) ***REMOVED***
                    if (keywords.hasOwnProperty(value.toLowerCase())) ***REMOVED***
                        return "keyword";
                ***REMOVED***
                    else if (attributes.hasOwnProperty(value.toLowerCase())) ***REMOVED***
                        return "variable";
                ***REMOVED***
                    else ***REMOVED***
                        return "text";
                ***REMOVED***
            ***REMOVED***
                regex: "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"
       ***REMOVED***
        ],
        "comment" : [
            ***REMOVED***
                token : "comment", // closing comment
                regex : ".*?\\*\\/",
                merge : true,
                next : "start"
        ***REMOVED*** ***REMOVED***
                token : "comment", // comment spanning whole line
                merge : true,
                regex : ".+"
        ***REMOVED***
        ],
        "qqstring" : [
            ***REMOVED***
                token : "string",
                regex : '[^"\\\\]+',
                merge : true
        ***REMOVED*** ***REMOVED***
                token : "string",
                regex : "\\\\$",
                next  : "qqstring",
                merge : true
        ***REMOVED*** ***REMOVED***
                token : "string",
                regex : '"|$',
                next  : "start",
                merge : true
        ***REMOVED***
        ],
        "qstring" : [
            ***REMOVED***
                token : "string",
                regex : "[^'\\\\]+",
                merge : true
        ***REMOVED*** ***REMOVED***
                token : "string",
                regex : "\\\\$",
                next  : "qstring",
                merge : true
        ***REMOVED*** ***REMOVED***
                token : "string",
                regex : "'|$",
                next  : "start",
                merge : true
        ***REMOVED***
        ]
   ***REMOVED***;
***REMOVED***;

oop.inherits(DotHighlightRules, TextHighlightRules);

exports.DotHighlightRules = DotHighlightRules;

***REMOVED***);

__ace_shadowed__.define('ace/mode/doc_comment_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var DocCommentHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED***
        "start" : [ ***REMOVED***
            token : "comment.doc.tag",
            regex : "@[\\w\\d_]+" // TODO: fix email addresses
    ***REMOVED*** ***REMOVED***
            token : "comment.doc.tag",
            regex : "\\bTODO\\b"
    ***REMOVED*** ***REMOVED***
            defaultToken : "comment.doc"
    ***REMOVED***]
***REMOVED***;
***REMOVED***;

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getStartRule = function(start) ***REMOVED***
    return ***REMOVED***
        token : "comment.doc", // doc comment
        regex : "\\/\\*(?=\\*)",
        next  : start
***REMOVED***;
***REMOVED***;

DocCommentHighlightRules.getEndRule = function (start) ***REMOVED***
    return ***REMOVED***
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
***REMOVED***;
***REMOVED***;


exports.DocCommentHighlightRules = DocCommentHighlightRules;

***REMOVED***);

__ace_shadowed__.define('ace/mode/folding/cstyle', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/range', 'ace/mode/folding/fold_mode'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) ***REMOVED***
    if (commentRegex) ***REMOVED***
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
***REMOVED***
***REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***

    this.foldingStartMarker = /(\***REMOVED***|\[)[^\***REMOVED***\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\***REMOVED***]*(\***REMOVED***|\])|^[\s\*]*(\*\/)/;

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) ***REMOVED***
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) ***REMOVED***
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) ***REMOVED***
                if (forceMultiline) ***REMOVED***
                    range = this.getSectionRange(session, row);
            ***REMOVED*** else if (foldStyle != "all")
                    range = null;
        ***REMOVED***
            
            return range;
    ***REMOVED***

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) ***REMOVED***
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
    ***REMOVED***
***REMOVED***;
    
    this.getSectionRange = function(session, row) ***REMOVED***
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) ***REMOVED***
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) ***REMOVED***
                if (subRange.start.row <= startRow) ***REMOVED***
                    break;
            ***REMOVED*** else if (subRange.isMultiLine()) ***REMOVED***
                    row = subRange.end.row;
            ***REMOVED*** else if (startIndent == indent) ***REMOVED***
                    break;
            ***REMOVED***
        ***REMOVED***
            endRow = row;
    ***REMOVED***
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
***REMOVED***;

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
