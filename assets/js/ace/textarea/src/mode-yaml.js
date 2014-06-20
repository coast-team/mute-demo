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

__ace_shadowed__.define('ace/mode/yaml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/yaml_highlight_rules', 'ace/mode/matching_brace_outdent', 'ace/mode/folding/coffee'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var YamlHighlightRules = require("./yaml_highlight_rules").YamlHighlightRules;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var FoldMode = require("./folding/coffee").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = YamlHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***

    this.lineCommentStart = "#";
    
    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        var indent = this.$getIndent(line);

        if (state == "start") ***REMOVED***
            var match = line.match(/^.*[\***REMOVED***\(\[]\s*$/);
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


    this.$id = "ace/mode/yaml";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;

***REMOVED***);

__ace_shadowed__.define('ace/mode/yaml_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var YamlHighlightRules = function() ***REMOVED***
    this.$rules = ***REMOVED***
        "start" : [
            ***REMOVED***
                token : "comment",
                regex : "#.*$"
        ***REMOVED*** ***REMOVED***
                token : "list.markup",
                regex : /^(?:-***REMOVED***3***REMOVED***|\.***REMOVED***3***REMOVED***)\s*(?=#|$)/     
        ***REMOVED***  ***REMOVED***
                token : "list.markup",
                regex : /^\s*[\-?](?:$|\s)/     
        ***REMOVED*** ***REMOVED***
                token: "constant",
                regex: "!![\\w//]+"
        ***REMOVED*** ***REMOVED***
                token: "constant.language",
                regex: "[&\\*][a-zA-Z0-9-_]+"
        ***REMOVED*** ***REMOVED***
                token: ["meta.tag", "keyword"],
                regex: /^(\s*\w.*?)(\:(?:\s+|$))/
        ***REMOVED******REMOVED***
                token: ["meta.tag", "keyword"],
                regex: /(\w+?)(\s*\:(?:\s+|$))/
        ***REMOVED*** ***REMOVED***
                token : "keyword.operator",
                regex : "<<\\w*:\\w*"
        ***REMOVED*** ***REMOVED***
                token : "keyword.operator",
                regex : "-\\s*(?=[***REMOVED***])"
        ***REMOVED*** ***REMOVED***
                token : "string", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
        ***REMOVED*** ***REMOVED***
                token : "string", // multi line string start
                regex : '[|>][-+\\d\\s]*$',
                next : "qqstring"
        ***REMOVED*** ***REMOVED***
                token : "string", // single quoted string
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
        ***REMOVED*** ***REMOVED***
                token : "constant.numeric", // float
                regex : /[+\-]?[\d_]+(?:(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?\b/
        ***REMOVED*** ***REMOVED***
                token : "constant.numeric", // other number
                regex : /[+\-]?\.inf\b|NaN\b|0x[\dA-Fa-f_]+|0b[10_]+/
        ***REMOVED*** ***REMOVED***
                token : "constant.language.boolean",
                regex : "(?:true|false|TRUE|FALSE|True|False|yes|no)\\b"
        ***REMOVED*** ***REMOVED***
                token : "paren.lparen",
                regex : "[[(***REMOVED***]"
        ***REMOVED*** ***REMOVED***
                token : "paren.rparen",
                regex : "[\\])***REMOVED***]"
        ***REMOVED***
        ],
        "qqstring" : [
            ***REMOVED***
                token : "string",
                regex : '(?=(?:(?:\\\\.)|(?:[^:]))*?:)',
                next : "start"
        ***REMOVED*** ***REMOVED***
                token : "string",
                regex : '.+'
        ***REMOVED***
        ]***REMOVED***;

***REMOVED***;

oop.inherits(YamlHighlightRules, TextHighlightRules);

exports.YamlHighlightRules = YamlHighlightRules;
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
