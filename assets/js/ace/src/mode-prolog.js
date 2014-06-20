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

define('ace/mode/prolog', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/prolog_highlight_rules', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var PrologHighlightRules = require("./prolog_highlight_rules").PrologHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = PrologHighlightRules;
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.lineCommentStart = "%";
    this.blockComment = ***REMOVED***start: "/*", end: "*/"***REMOVED***;
    this.$id = "ace/mode/prolog";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/prolog_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var PrologHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED*** start: 
       [ ***REMOVED*** include: '#comment' ***REMOVED***,
         ***REMOVED*** include: '#basic_fact' ***REMOVED***,
         ***REMOVED*** include: '#rule' ***REMOVED***,
         ***REMOVED*** include: '#directive' ***REMOVED***,
         ***REMOVED*** include: '#fact' ***REMOVED*** ],
      '#atom': 
       [ ***REMOVED*** token: 'constant.other.atom.prolog',
           regex: '\\b[a-z][a-zA-Z0-9_]*\\b' ***REMOVED***,
         ***REMOVED*** token: 'constant.numeric.prolog',
           regex: '-?\\d+(?:\\.\\d+)?' ***REMOVED***,
         ***REMOVED*** include: '#string' ***REMOVED*** ],
      '#basic_elem': 
       [ ***REMOVED*** include: '#comment' ***REMOVED***,
         ***REMOVED*** include: '#statement' ***REMOVED***,
         ***REMOVED*** include: '#constants' ***REMOVED***,
         ***REMOVED*** include: '#operators' ***REMOVED***,
         ***REMOVED*** include: '#builtins' ***REMOVED***,
         ***REMOVED*** include: '#list' ***REMOVED***,
         ***REMOVED*** include: '#atom' ***REMOVED***,
         ***REMOVED*** include: '#variable' ***REMOVED*** ],
      '#basic_fact': 
       [ ***REMOVED*** token: 
            [ 'entity.name.function.fact.basic.prolog',
              'punctuation.end.fact.basic.prolog' ],
           regex: '([a-z]\\w*)(\\.)' ***REMOVED*** ],
      '#builtins': 
       [ ***REMOVED*** token: 'support.function.builtin.prolog',
           regex: '\\b(?:abolish|abort|ancestors|arg|ascii|assert[az]|atom(?:ic)?|body|char|close|conc|concat|consult|define|definition|dynamic|dump|fail|file|free|free_proc|functor|getc|goal|halt|head|head|integer|length|listing|match_args|member|next_clause|nl|nonvar|nth|number|cvars|nvars|offset|op|print?|prompt|putc|quoted|ratom|read|redefine|rename|retract(?:all)?|see|seeing|seen|skip|spy|statistics|system|tab|tell|telling|term|time|told|univ|unlink_clause|unspy_predicate|var|write)\\b' ***REMOVED*** ],
      '#comment': 
       [ ***REMOVED*** token: 
            [ 'punctuation.definition.comment.prolog',
              'comment.line.percentage.prolog' ],
           regex: '(%)(.*$)' ***REMOVED***,
         ***REMOVED*** token: 'punctuation.definition.comment.prolog',
           regex: '/\\*',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.comment.prolog',
                regex: '\\*/',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'comment.block.prolog' ***REMOVED*** ] ***REMOVED*** ],
      '#constants': 
       [ ***REMOVED*** token: 'constant.language.prolog',
           regex: '\\b(?:true|false|yes|no)\\b' ***REMOVED*** ],
      '#directive': 
       [ ***REMOVED*** token: 'keyword.operator.directive.prolog',
           regex: ':-',
           push: 
            [ ***REMOVED*** token: 'meta.directive.prolog', regex: '\\.', next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#comment' ***REMOVED***,
              ***REMOVED*** include: '#statement' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.directive.prolog' ***REMOVED*** ] ***REMOVED*** ],
      '#expr': 
       [ ***REMOVED*** include: '#comments' ***REMOVED***,
         ***REMOVED*** token: 'meta.expression.prolog',
           regex: '\\(',
           push: 
            [ ***REMOVED*** token: 'meta.expression.prolog', regex: '\\)', next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#expr' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.expression.prolog' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'keyword.control.cutoff.prolog', regex: '!' ***REMOVED***,
         ***REMOVED*** token: 'punctuation.control.and.prolog', regex: ',' ***REMOVED***,
         ***REMOVED*** token: 'punctuation.control.or.prolog', regex: ';' ***REMOVED***,
         ***REMOVED*** include: '#basic_elem' ***REMOVED*** ],
      '#fact': 
       [ ***REMOVED*** token: 
            [ 'entity.name.function.fact.prolog',
              'punctuation.begin.fact.parameters.prolog' ],
           regex: '([a-z]\\w*)(\\()(?!.*:-)',
           push: 
            [ ***REMOVED*** token: 
                 [ 'punctuation.end.fact.parameters.prolog',
                   'punctuation.end.fact.prolog' ],
                regex: '(\\))(\\.?)',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#parameter' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.fact.prolog' ***REMOVED*** ] ***REMOVED*** ],
      '#list': 
       [ ***REMOVED*** token: 'punctuation.begin.list.prolog',
           regex: '\\[(?=.*\\])',
           push: 
            [ ***REMOVED*** token: 'punctuation.end.list.prolog',
                regex: '\\]',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#comment' ***REMOVED***,
              ***REMOVED*** token: 'punctuation.separator.list.prolog', regex: ',' ***REMOVED***,
              ***REMOVED*** token: 'punctuation.concat.list.prolog',
                regex: '\\|',
                push: 
                 [ ***REMOVED*** token: 'meta.list.concat.prolog',
                     regex: '(?=\\s*\\])',
                     next: 'pop' ***REMOVED***,
                   ***REMOVED*** include: '#basic_elem' ***REMOVED***,
                   ***REMOVED*** defaultToken: 'meta.list.concat.prolog' ***REMOVED*** ] ***REMOVED***,
              ***REMOVED*** include: '#basic_elem' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.list.prolog' ***REMOVED*** ] ***REMOVED*** ],
      '#operators': 
       [ ***REMOVED*** token: 'keyword.operator.prolog',
           regex: '\\\\\\+|\\bnot\\b|\\bis\\b|->|[><]|[><\\\\:=]?=|(?:=\\\\|\\\\=)=' ***REMOVED*** ],
      '#parameter': 
       [ ***REMOVED*** token: 'variable.language.anonymous.prolog',
           regex: '\\b_\\b' ***REMOVED***,
         ***REMOVED*** token: 'variable.parameter.prolog',
           regex: '\\b[A-Z_]\\w*\\b' ***REMOVED***,
         ***REMOVED*** token: 'punctuation.separator.parameters.prolog', regex: ',' ***REMOVED***,
         ***REMOVED*** include: '#basic_elem' ***REMOVED***,
         ***REMOVED*** token: 'text', regex: '[^\\s]' ***REMOVED*** ],
      '#rule': 
       [ ***REMOVED*** token: 'meta.rule.prolog',
           regex: '(?=[a-z]\\w*.*:-)',
           push: 
            [ ***REMOVED*** token: 'punctuation.rule.end.prolog',
                regex: '\\.',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 'meta.rule.signature.prolog',
                regex: '(?=[a-z]\\w*.*:-)',
                push: 
                 [ ***REMOVED*** token: 'meta.rule.signature.prolog',
                     regex: '(?=:-)',
                     next: 'pop' ***REMOVED***,
                   ***REMOVED*** token: 'entity.name.function.rule.prolog',
                     regex: '[a-z]\\w*(?=\\(|\\s*:-)' ***REMOVED***,
                   ***REMOVED*** token: 'punctuation.rule.parameters.begin.prolog',
                     regex: '\\(',
                     push: 
                      [ ***REMOVED*** token: 'punctuation.rule.parameters.end.prolog',
                          regex: '\\)',
                          next: 'pop' ***REMOVED***,
                        ***REMOVED*** include: '#parameter' ***REMOVED***,
                        ***REMOVED*** defaultToken: 'meta.rule.parameters.prolog' ***REMOVED*** ] ***REMOVED***,
                   ***REMOVED*** defaultToken: 'meta.rule.signature.prolog' ***REMOVED*** ] ***REMOVED***,
              ***REMOVED*** token: 'keyword.operator.definition.prolog',
                regex: ':-',
                push: 
                 [ ***REMOVED*** token: 'meta.rule.definition.prolog',
                     regex: '(?=\\.)',
                     next: 'pop' ***REMOVED***,
                   ***REMOVED*** include: '#comment' ***REMOVED***,
                   ***REMOVED*** include: '#expr' ***REMOVED***,
                   ***REMOVED*** defaultToken: 'meta.rule.definition.prolog' ***REMOVED*** ] ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.rule.prolog' ***REMOVED*** ] ***REMOVED*** ],
      '#statement': 
       [ ***REMOVED*** token: 'meta.statement.prolog',
           regex: '(?=[a-z]\\w*\\()',
           push: 
            [ ***REMOVED*** token: 'punctuation.end.statement.parameters.prolog',
                regex: '\\)',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#builtins' ***REMOVED***,
              ***REMOVED*** include: '#atom' ***REMOVED***,
              ***REMOVED*** token: 'punctuation.begin.statement.parameters.prolog',
                regex: '\\(',
                push: 
                 [ ***REMOVED*** token: 'meta.statement.parameters.prolog',
                     regex: '(?=\\))',
                     next: 'pop' ***REMOVED***,
                   ***REMOVED*** token: 'punctuation.separator.statement.prolog', regex: ',' ***REMOVED***,
                   ***REMOVED*** include: '#basic_elem' ***REMOVED***,
                   ***REMOVED*** defaultToken: 'meta.statement.parameters.prolog' ***REMOVED*** ] ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.statement.prolog' ***REMOVED*** ] ***REMOVED*** ],
      '#string': 
       [ ***REMOVED*** token: 'punctuation.definition.string.begin.prolog',
           regex: '\'',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.string.end.prolog',
                regex: '\'',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 'constant.character.escape.prolog', regex: '\\\\.' ***REMOVED***,
              ***REMOVED*** token: 'constant.character.escape.quote.prolog',
                regex: '\'\'' ***REMOVED***,
              ***REMOVED*** defaultToken: 'string.quoted.single.prolog' ***REMOVED*** ] ***REMOVED*** ],
      '#variable': 
       [ ***REMOVED*** token: 'variable.language.anonymous.prolog',
           regex: '\\b_\\b' ***REMOVED***,
         ***REMOVED*** token: 'variable.other.prolog',
           regex: '\\b[A-Z_][a-zA-Z0-9_]*\\b' ***REMOVED*** ] ***REMOVED***
    
    this.normalizeRules();
***REMOVED***;

PrologHighlightRules.metaData = ***REMOVED*** fileTypes: [ 'plg', 'prolog' ],
      foldingStartMarker: '(%\\s*region \\w*)|([a-z]\\w*.*:- ?)',
      foldingStopMarker: '(%\\s*end(\\s*region)?)|(?=\\.)',
      keyEquivalent: '^~P',
      name: 'Prolog',
      scopeName: 'source.prolog' ***REMOVED***


oop.inherits(PrologHighlightRules, TextHighlightRules);

exports.PrologHighlightRules = PrologHighlightRules;
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
