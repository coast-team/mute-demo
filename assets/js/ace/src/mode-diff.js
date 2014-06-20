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

define('ace/mode/diff', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/diff_highlight_rules', 'ace/mode/folding/diff'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var HighlightRules = require("./diff_highlight_rules").DiffHighlightRules;
var FoldMode = require("./folding/diff").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = HighlightRules;
    this.foldingRules = new FoldMode(["diff", "index", "\\+***REMOVED***3***REMOVED***", "@@|\\****REMOVED***5***REMOVED***"], "i");
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***

    this.$id = "ace/mode/diff";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;

***REMOVED***);

define('ace/mode/diff_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var DiffHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED***
        "start" : [***REMOVED***
                regex: "^(?:\\****REMOVED***15***REMOVED***|=***REMOVED***67***REMOVED***|-***REMOVED***3***REMOVED***|\\+***REMOVED***3***REMOVED***)$",
                token: "punctuation.definition.separator.diff",
                "name": "keyword"
        ***REMOVED*** ***REMOVED*** //diff.range.unified
                regex: "^(@@)(\\s*.+?\\s*)(@@)(.*)$",
                token: [
                    "constant",
                    "constant.numeric",
                    "constant",
                    "comment.doc.tag"
                ]
        ***REMOVED*** ***REMOVED*** //diff.range.normal
                regex: "^(\\d+)([,\\d]+)(a|d|c)(\\d+)([,\\d]+)(.*)$",
                token: [
                    "constant.numeric",
                    "punctuation.definition.range.diff",
                    "constant.function",
                    "constant.numeric",
                    "punctuation.definition.range.diff",
                    "invalid"
                ],
                "name": "meta."
        ***REMOVED*** ***REMOVED***
                regex: "^(\\-***REMOVED***3***REMOVED***|\\+***REMOVED***3***REMOVED***|\\****REMOVED***3***REMOVED***)( .+)$",
                token: [
                    "constant.numeric",
                    "meta.tag"
                ]
        ***REMOVED*** ***REMOVED*** // added
                regex: "^([!+>])(.*?)(\\s*)$",
                token: [
                    "support.constant",
                    "text",
                    "invalid"
                ]
        ***REMOVED*** ***REMOVED*** // removed
                regex: "^([<\\-])(.*?)(\\s*)$",
                token: [
                    "support.function",
                    "string",
                    "invalid"
                ]
        ***REMOVED*** ***REMOVED***
                regex: "^(diff)(\\s+--\\w+)?(.+?)( .+)?$",
                token: ["variable", "variable", "keyword", "variable"]
        ***REMOVED*** ***REMOVED***
                regex: "^Index.+$",
                token: "variable"
        ***REMOVED*** ***REMOVED***
                regex: "^\\s+$",
                token: "text"
        ***REMOVED*** ***REMOVED***
                regex: "\\s*$",
                token: "invalid"
        ***REMOVED*** ***REMOVED***
                defaultToken: "invisible",
                caseInsensitive: true
        ***REMOVED***
        ]
***REMOVED***;
***REMOVED***;

oop.inherits(DiffHighlightRules, TextHighlightRules);

exports.DiffHighlightRules = DiffHighlightRules;
***REMOVED***);

define('ace/mode/folding/diff', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/fold_mode', 'ace/range'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;
var Range = require("../../range").Range;

var FoldMode = exports.FoldMode = function(levels, flag) ***REMOVED***
	this.regExpList = levels;
	this.flag = flag;
	this.foldingStartMarker = RegExp("^(" + levels.join("|") + ")", this.flag);
***REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***
    this.getFoldWidgetRange = function(session, foldStyle, row) ***REMOVED***
        var line = session.getLine(row);
        var start = ***REMOVED***row: row, column: line.length***REMOVED***;

        var regList = this.regExpList;
        for (var i = 1; i <= regList.length; i++) ***REMOVED***
            var re = RegExp("^(" + regList.slice(0, i).join("|") + ")", this.flag);
            if (re.test(line))
                break;
    ***REMOVED***

        for (var l = session.getLength(); ++row < l; ) ***REMOVED***
            line = session.getLine(row);
            if (re.test(line))
                break;
    ***REMOVED***
        if (row == start.row + 1)
            return;
        return  Range.fromPoints(start, ***REMOVED***row: row - 1, column: line.length***REMOVED***);
***REMOVED***;

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
