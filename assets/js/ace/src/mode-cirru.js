/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2014, Ajax.org B.V.
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
 
define('ace/mode/cirru', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/cirru_highlight_rules', 'ace/mode/folding/coffee'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var CirruHighlightRules = require("./cirru_highlight_rules").CirruHighlightRules;
var CoffeeFoldMode = require("./folding/coffee").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = CirruHighlightRules;
    this.foldingRules = new CoffeeFoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.lineCommentStart = "--";
    this.$id = "ace/mode/cirru";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);
 
define('ace/mode/cirru_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var CirruHighlightRules = function() ***REMOVED***
    this.$rules = ***REMOVED***
        start: [***REMOVED***
            token: 'constant.numeric',
            regex: /[\d\.]+/
    ***REMOVED*** ***REMOVED***
            token: 'comment.line.double-dash',
            regex: /--/,
            next: 'comment',
    ***REMOVED*** ***REMOVED***
            token: 'storage.modifier',
            regex: /\(/,
    ***REMOVED*** ***REMOVED***
            token: 'storage.modifier',
            regex: /\,/,
            next: 'line',
    ***REMOVED*** ***REMOVED***
            token: 'support.function',
            regex: /[^\(\)\"\s]+/,
            next: 'line'
    ***REMOVED*** ***REMOVED***
            token: 'string.quoted.double',
            regex: /"/,
            next: 'string',
    ***REMOVED*** ***REMOVED***
            token: 'storage.modifier',
            regex: /\)/,
    ***REMOVED***],
        comment: [***REMOVED***
            token: 'comment.line.double-dash',
            regex: /\ +[^\n]+/,
            next: 'start',
    ***REMOVED***],
        string: [***REMOVED***
            token: 'string.quoted.double',
            regex: /"/,
            next: 'line',
    ***REMOVED*** ***REMOVED***
            token: 'constant.character.escape',
            regex: /\\/,
            next: 'escape',
    ***REMOVED*** ***REMOVED***
            token: 'string.quoted.double',
            regex: /[^\\\"]+/,
    ***REMOVED***],
        escape: [***REMOVED***
            token: 'constant.character.escape',
            regex: /./,
            next: 'string',
    ***REMOVED***],
        line: [***REMOVED***
            token: 'constant.numeric',
            regex: /[\d\.]+/
    ***REMOVED*** ***REMOVED***
            token: 'markup.raw',
            regex: /^\s*/,
            next: 'start',
    ***REMOVED*** ***REMOVED***
            token: 'storage.modifier',
            regex: /\$/,
            next: 'start',
    ***REMOVED*** ***REMOVED***
            token: 'variable.parameter',
            regex: /[^\(\)\"\s]+/
    ***REMOVED*** ***REMOVED***
            token: 'storage.modifier',
            regex: /\(/,
            next: 'start'
    ***REMOVED*** ***REMOVED***
            token: 'storage.modifier',
            regex: /\)/,
    ***REMOVED*** ***REMOVED***
            token: 'markup.raw',
            regex: /^\ */,
            next: 'start',
    ***REMOVED*** ***REMOVED***
            token: 'string.quoted.double',
            regex: /"/,
            next: 'string',
    ***REMOVED***]
***REMOVED***

***REMOVED***;

oop.inherits(CirruHighlightRules, TextHighlightRules);

exports.CirruHighlightRules = CirruHighlightRules;
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
