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

__ace_shadowed__.define('ace/mode/forth', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/forth_highlight_rules', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var ForthHighlightRules = require("./forth_highlight_rules").ForthHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = ForthHighlightRules;
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.lineCommentStart = "(?<=^|\\s)\\.?\\( [^)]*\\)";
    this.blockComment = ***REMOVED***start: "/*", end: "*/"***REMOVED***;
    this.$id = "ace/mode/forth";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

__ace_shadowed__.define('ace/mode/forth_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var ForthHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED*** start: [ ***REMOVED*** include: '#forth' ***REMOVED*** ],
      '#comment': 
       [ ***REMOVED*** token: 'comment.line.double-dash.forth',
           regex: '(?:^|\\s)--\\s.*$',
           comment: 'line comments for iForth' ***REMOVED***,
         ***REMOVED*** token: 'comment.line.backslash.forth',
           regex: '(?:^|\\s)\\\\[\\s\\S]*$',
           comment: 'ANSI line comment' ***REMOVED***,
         ***REMOVED*** token: 'comment.line.backslash-g.forth',
           regex: '(?:^|\\s)\\\\[Gg] .*$',
           comment: 'gForth line comment' ***REMOVED***,
         ***REMOVED*** token: 'comment.block.forth',
           regex: '(?:^|\\s)\\(\\*(?=\\s|$)',
           push: 
            [ ***REMOVED*** token: 'comment.block.forth',
                regex: '(?:^|\\s)\\*\\)(?=\\s|$)',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'comment.block.forth' ***REMOVED*** ],
           comment: 'multiline comments for iForth' ***REMOVED***,
         ***REMOVED*** token: 'comment.block.documentation.forth',
           regex: '\\bDOC\\b',
           caseInsensitive: true,
           push: 
            [ ***REMOVED*** token: 'comment.block.documentation.forth',
                regex: '\\bENDDOC\\b',
                caseInsensitive: true,
                next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'comment.block.documentation.forth' ***REMOVED*** ],
           comment: 'documentation comments for iForth' ***REMOVED***,
         ***REMOVED*** token: 'comment.line.parentheses.forth',
           regex: '(?:^|\\s)\\.?\\( [^)]*\\)',
           comment: 'ANSI line comment' ***REMOVED*** ],
      '#constant': 
       [ ***REMOVED*** token: 'constant.language.forth',
           regex: '(?:^|\\s)(?:TRUE|FALSE|BL|PI|CELL|C/L|R/O|W/O|R/W)(?=\\s|$)',
           caseInsensitive: true***REMOVED***,
         ***REMOVED*** token: 'constant.numeric.forth',
           regex: '(?:^|\\s)[$#%]?[-+]?[0-9]+(?:\\.[0-9]*e-?[0-9]+|\\.?[0-9a-fA-F]*)(?=\\s|$)'***REMOVED***,
         ***REMOVED*** token: 'constant.character.forth',
           regex: '(?:^|\\s)(?:[&^]\\S|(?:"|\')\\S(?:"|\'))(?=\\s|$)'***REMOVED***],
      '#forth': 
       [ ***REMOVED*** include: '#constant' ***REMOVED***,
         ***REMOVED*** include: '#comment' ***REMOVED***,
         ***REMOVED*** include: '#string' ***REMOVED***,
         ***REMOVED*** include: '#word' ***REMOVED***,
         ***REMOVED*** include: '#variable' ***REMOVED***,
         ***REMOVED*** include: '#storage' ***REMOVED***,
         ***REMOVED*** include: '#word-def' ***REMOVED*** ],
      '#storage': 
       [ ***REMOVED*** token: 'storage.type.forth',
           regex: '(?:^|\\s)(?:2CONSTANT|2VARIABLE|ALIAS|CONSTANT|CREATE-INTERPRET/COMPILE[:]?|CREATE|DEFER|FCONSTANT|FIELD|FVARIABLE|USER|VALUE|VARIABLE|VOCABULARY)(?=\\s|$)',
           caseInsensitive: true***REMOVED***],
      '#string': 
       [ ***REMOVED*** token: 'string.quoted.double.forth',
           regex: '(ABORT" |BREAK" |\\." |C" |0"|S\\\\?" )([^"]+")',
           caseInsensitive: true***REMOVED***,
         ***REMOVED*** token: 'string.unquoted.forth',
           regex: '(?:INCLUDE|NEEDS|REQUIRE|USE)[ ]\\S+(?=\\s|$)',
           caseInsensitive: true***REMOVED***],
      '#variable': 
       [ ***REMOVED*** token: 'variable.language.forth',
           regex: '\\b(?:I|J)\\b',
           caseInsensitive: true ***REMOVED*** ],
      '#word': 
       [ ***REMOVED*** token: 'keyword.control.immediate.forth',
           regex: '(?:^|\\s)\\[(?:\\?DO|\\+LOOP|AGAIN|BEGIN|DEFINED|DO|ELSE|ENDIF|FOR|IF|IFDEF|IFUNDEF|LOOP|NEXT|REPEAT|THEN|UNTIL|WHILE)\\](?=\\s|$)',
           caseInsensitive: true***REMOVED***,
         ***REMOVED*** token: 'keyword.other.immediate.forth',
           regex: '(?:^|\\s)(?:COMPILE-ONLY|IMMEDIATE|IS|RESTRICT|TO|WHAT\'S|])(?=\\s|$)',
           caseInsensitive: true***REMOVED***,
         ***REMOVED*** token: 'keyword.control.compile-only.forth',
           regex: '(?:^|\\s)(?:-DO|\\-LOOP|\\?DO|\\?LEAVE|\\+DO|\\+LOOP|ABORT\\"|AGAIN|AHEAD|BEGIN|CASE|DO|ELSE|ENDCASE|ENDIF|ENDOF|ENDTRY\\-IFERROR|ENDTRY|FOR|IF|IFERROR|LEAVE|LOOP|NEXT|RECOVER|REPEAT|RESTORE|THEN|TRY|U\\-DO|U\\+DO|UNTIL|WHILE)(?=\\s|$)',
           caseInsensitive: true***REMOVED***,
         ***REMOVED*** token: 'keyword.other.compile-only.forth',
           regex: '(?:^|\\s)(?:\\?DUP-0=-IF|\\?DUP-IF|\\)|\\[|\\[\'\\]|\\[CHAR\\]|\\[COMPILE\\]|\\[IS\\]|\\[TO\\]|<COMPILATION|<INTERPRETATION|ASSERT\\(|ASSERT0\\(|ASSERT1\\(|ASSERT2\\(|ASSERT3\\(|COMPILATION>|DEFERS|DOES>|INTERPRETATION>|OF|POSTPONE)(?=\\s|$)',
           caseInsensitive: true***REMOVED***,
         ***REMOVED*** token: 'keyword.other.non-immediate.forth',
           regex: '(?:^|\\s)(?:\'|<IS>|<TO>|CHAR|END-STRUCT|INCLUDE[D]?|LOAD|NEEDS|REQUIRE[D]?|REVISION|SEE|STRUCT|THRU|USE)(?=\\s|$)',
           caseInsensitive: true***REMOVED***,
         ***REMOVED*** token: 'keyword.other.warning.forth',
           regex: '(?:^|\\s)(?:~~|BREAK:|BREAK"|DBG)(?=\\s|$)',
           caseInsensitive: true***REMOVED***],
      '#word-def': 
       [ ***REMOVED*** token: 
            [ 'keyword.other.compile-only.forth',
              'keyword.other.compile-only.forth',
              'meta.block.forth',
              'entity.name.function.forth' ],
           regex: '(:NONAME)|(^:|\\s:)(\\s)(\\S+)(?=\\s|$)',
           caseInsensitive: true,
           push: 
            [ ***REMOVED*** token: 'keyword.other.compile-only.forth',
                regex: ';(?:CODE)?',
                caseInsensitive: true,
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#constant' ***REMOVED***,
              ***REMOVED*** include: '#comment' ***REMOVED***,
              ***REMOVED*** include: '#string' ***REMOVED***,
              ***REMOVED*** include: '#word' ***REMOVED***,
              ***REMOVED*** include: '#variable' ***REMOVED***,
              ***REMOVED*** include: '#storage' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.block.forth' ***REMOVED*** ] ***REMOVED*** ] ***REMOVED***
    
    this.normalizeRules();
***REMOVED***;

ForthHighlightRules.metaData = ***REMOVED*** fileTypes: [ 'frt', 'fs', 'ldr' ],
      foldingStartMarker: '/\\*\\*|\\***REMOVED***\\s*$',
      foldingStopMarker: '\\*\\*/|^\\s*\\***REMOVED***',
      keyEquivalent: '^~F',
      name: 'Forth',
      scopeName: 'source.forth' ***REMOVED***


oop.inherits(ForthHighlightRules, TextHighlightRules);

exports.ForthHighlightRules = ForthHighlightRules;
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
