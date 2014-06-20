/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
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
 *
 * Contributor(s):
 *
 *
 *
 * ***** END LICENSE BLOCK ***** */

define('ace/mode/batchfile', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/batchfile_highlight_rules', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var BatchFileHighlightRules = require("./batchfile_highlight_rules").BatchFileHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = BatchFileHighlightRules;
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.lineCommentStart = "::";
    this.blockComment = "";
    this.$id = "ace/mode/batchfile";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/batchfile_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var BatchFileHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED*** start: 
       [ ***REMOVED*** token: 'keyword.command.dosbatch',
           regex: '\\b(?:append|assoc|at|attrib|break|cacls|cd|chcp|chdir|chkdsk|chkntfs|cls|cmd|color|comp|compact|convert|copy|date|del|dir|diskcomp|diskcopy|doskey|echo|endlocal|erase|fc|find|findstr|format|ftype|graftabl|help|keyb|label|md|mkdir|mode|more|move|path|pause|popd|print|prompt|pushd|rd|recover|ren|rename|replace|restore|rmdir|set|setlocal|shift|sort|start|subst|time|title|tree|type|ver|verify|vol|xcopy)\\b',
           caseInsensitive: true ***REMOVED***,
         ***REMOVED*** token: 'keyword.control.statement.dosbatch',
           regex: '\\b(?:goto|call|exit)\\b',
           caseInsensitive: true ***REMOVED***,
         ***REMOVED*** token: 'keyword.control.conditional.if.dosbatch',
           regex: '\\bif\\s+not\\s+(?:exist|defined|errorlevel|cmdextversion)\\b',
           caseInsensitive: true ***REMOVED***,
         ***REMOVED*** token: 'keyword.control.conditional.dosbatch',
           regex: '\\b(?:if|else)\\b',
           caseInsensitive: true ***REMOVED***,
         ***REMOVED*** token: 'keyword.control.repeat.dosbatch',
           regex: '\\bfor\\b',
           caseInsensitive: true ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.dosbatch',
           regex: '\\b(?:EQU|NEQ|LSS|LEQ|GTR|GEQ)\\b' ***REMOVED***,
         ***REMOVED*** token: ['doc.comment', 'comment'],
           regex: '(?:^|\\b)(rem)($|\\s.*$)',
           caseInsensitive: true ***REMOVED***,
         ***REMOVED*** token: 'comment.line.colons.dosbatch',
           regex: '::.*$' ***REMOVED***,
         ***REMOVED*** include: 'variable' ***REMOVED***,
         ***REMOVED*** token: 'punctuation.definition.string.begin.shell',
           regex: '"',
           push: [ 
              ***REMOVED*** token: 'punctuation.definition.string.end.shell', regex: '"', next: 'pop' ***REMOVED***,
              ***REMOVED*** include: 'variable' ***REMOVED***,
              ***REMOVED*** defaultToken: 'string.quoted.double.dosbatch' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.pipe.dosbatch', regex: '[|]' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.redirect.shell',
           regex: '&>|\\d*>&\\d*|\\d*(?:>>|>|<)|\\d*<&|\\d*<>' ***REMOVED*** ],
        variable: [
         ***REMOVED*** token: 'constant.numeric', regex: '%%\\w+|%[*\\d]|%\\w+%'***REMOVED***,
         ***REMOVED*** token: 'constant.numeric', regex: '%~\\d+'***REMOVED***,
         ***REMOVED*** token: ['markup.list', 'constant.other', 'markup.list'],
            regex: '(%)(\\w+)(%?)' ***REMOVED***]***REMOVED***
    
    this.normalizeRules();
***REMOVED***;

BatchFileHighlightRules.metaData = ***REMOVED*** name: 'Batch File',
      scopeName: 'source.dosbatch',
      fileTypes: [ 'bat' ] ***REMOVED***


oop.inherits(BatchFileHighlightRules, TextHighlightRules);

exports.BatchFileHighlightRules = BatchFileHighlightRules;
***REMOVED***);

define('ace/mode/folding/cstyle', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/range', 'ace/mode/folding/fold_mode'], function(require, exports, module) ***REMOVED***


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
