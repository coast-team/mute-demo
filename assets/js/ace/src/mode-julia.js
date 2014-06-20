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

define('ace/mode/julia', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/julia_highlight_rules', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var JuliaHighlightRules = require("./julia_highlight_rules").JuliaHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = JuliaHighlightRules;
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.lineCommentStart = "#";
    this.blockComment = "";
    this.$id = "ace/mode/julia";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/julia_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var JuliaHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED*** start: 
       [ ***REMOVED*** include: '#function_decl' ***REMOVED***,
         ***REMOVED*** include: '#function_call' ***REMOVED***,
         ***REMOVED*** include: '#type_decl' ***REMOVED***,
         ***REMOVED*** include: '#keyword' ***REMOVED***,
         ***REMOVED*** include: '#operator' ***REMOVED***,
         ***REMOVED*** include: '#number' ***REMOVED***,
         ***REMOVED*** include: '#string' ***REMOVED***,
         ***REMOVED*** include: '#comment' ***REMOVED*** ],
      '#bracket': 
       [ ***REMOVED*** token: 'keyword.bracket.julia',
           regex: '\\(|\\)|\\[|\\]|\\***REMOVED***|\\***REMOVED***|,' ***REMOVED*** ],
      '#comment': 
       [ ***REMOVED*** token: 
            [ 'punctuation.definition.comment.julia',
              'comment.line.number-sign.julia' ],
           regex: '(#)(?!\\***REMOVED***)(.*$)'***REMOVED*** ],
      '#function_call': 
       [ ***REMOVED*** token: [ 'support.function.julia', 'text' ],
           regex: '([a-zA-Z0-9_]+!?)(\\w*\\()'***REMOVED*** ],
      '#function_decl': 
       [ ***REMOVED*** token: [ 'keyword.other.julia', 'meta.function.julia',
               'entity.name.function.julia', 'meta.function.julia','text' ],
           regex: '(function|macro)(\\s*)([a-zA-Z0-9_\\***REMOVED***]+!?)(\\w*)([(\\\\***REMOVED***])'***REMOVED*** ],
      '#keyword':
       [ ***REMOVED*** token: 'keyword.other.julia',
           regex: '\\b(?:function|type|immutable|macro|quote|abstract|bitstype|typealias|module|baremodule|new)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.control.julia',
           regex: '\\b(?:if|else|elseif|while|for|in|begin|let|end|do|try|catch|finally|return|break|continue)\\b' ***REMOVED***,
         ***REMOVED*** token: 'storage.modifier.variable.julia',
           regex: '\\b(?:global|local|const|export|import|importall|using)\\b' ***REMOVED***,
         ***REMOVED*** token: 'variable.macro.julia', regex: '@\\w+\\b' ***REMOVED*** ],
      '#number': 
       [ ***REMOVED*** token: 'constant.numeric.julia',
           regex: '\\b0(?:x|X)[0-9a-fA-F]*|(?:\\b[0-9]+\\.?[0-9]*|\\.[0-9]+)(?:(?:e|E)(?:\\+|-)?[0-9]*)?(?:im)?|\\bInf(?:32)?\\b|\\bNaN(?:32)?\\b|\\btrue\\b|\\bfalse\\b' ***REMOVED*** ],
      '#operator': 
       [ ***REMOVED*** token: 'keyword.operator.update.julia',
           regex: '=|:=|\\+=|-=|\\*=|/=|//=|\\.//=|\\.\\*=|\\\\=|\\.\\\\=|^=|\\.^=|%=|\\|=|&=|\\$=|<<=|>>=' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.ternary.julia', regex: '\\?|:' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.boolean.julia',
           regex: '\\|\\||&&|!' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.arrow.julia', regex: '->|<-|-->' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.relation.julia',
           regex: '>|<|>=|<=|==|!=|\\.>|\\.<|\\.>=|\\.>=|\\.==|\\.!=|\\.=|\\.!|<:|:>' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.range.julia', regex: ':' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.shift.julia', regex: '<<|>>' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.bitwise.julia', regex: '\\||\\&|~' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.arithmetic.julia',
           regex: '\\+|-|\\*|\\.\\*|/|\\./|//|\\.//|%|\\.%|\\\\|\\.\\\\|\\^|\\.\\^' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.isa.julia', regex: '::' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.dots.julia',
           regex: '\\.(?=[a-zA-Z])|\\.\\.+' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.interpolation.julia',
           regex: '\\$#?(?=.)' ***REMOVED***,
         ***REMOVED*** token: [ 'variable', 'keyword.operator.transposed-variable.julia' ],
           regex: '(\\w+)((?:\'|\\.\')*\\.?\')' ***REMOVED***,
         ***REMOVED*** token: 'text',
           regex: '\\[|\\('***REMOVED***,
         ***REMOVED*** token: [ 'text', 'keyword.operator.transposed-matrix.julia' ],
            regex: "([\\]\\)])((?:'|\\.')*\\.?')"***REMOVED*** ],
      '#string': 
       [ ***REMOVED*** token: 'punctuation.definition.string.begin.julia',
           regex: '\'',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.string.end.julia',
                regex: '\'',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#string_escaped_char' ***REMOVED***,
              ***REMOVED*** defaultToken: 'string.quoted.single.julia' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'punctuation.definition.string.begin.julia',
           regex: '"',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.string.end.julia',
                regex: '"',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#string_escaped_char' ***REMOVED***,
              ***REMOVED*** defaultToken: 'string.quoted.double.julia' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'punctuation.definition.string.begin.julia',
           regex: '\\b\\w+"',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.string.end.julia',
                regex: '"\\w*',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#string_custom_escaped_char' ***REMOVED***,
              ***REMOVED*** defaultToken: 'string.quoted.custom-double.julia' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'punctuation.definition.string.begin.julia',
           regex: '`',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.string.end.julia',
                regex: '`',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#string_escaped_char' ***REMOVED***,
              ***REMOVED*** defaultToken: 'string.quoted.backtick.julia' ***REMOVED*** ] ***REMOVED*** ],
      '#string_custom_escaped_char': [ ***REMOVED*** token: 'constant.character.escape.julia', regex: '\\\\"' ***REMOVED*** ],
      '#string_escaped_char': 
       [ ***REMOVED*** token: 'constant.character.escape.julia',
           regex: '\\\\(?:\\\\|[0-3]\\d***REMOVED***,2***REMOVED***|[4-7]\\d?|x[a-fA-F0-9]***REMOVED***,2***REMOVED***|u[a-fA-F0-9]***REMOVED***,4***REMOVED***|U[a-fA-F0-9]***REMOVED***,8***REMOVED***|.)' ***REMOVED*** ],
      '#type_decl': 
       [ ***REMOVED*** token: 
            [ 'keyword.control.type.julia',
              'meta.type.julia',
              'entity.name.type.julia',
              'entity.other.inherited-class.julia',
              'punctuation.separator.inheritance.julia',
              'entity.other.inherited-class.julia' ],
           regex: '(type|immutable)(\\s+)([a-zA-Z0-9_]+)(?:(\\s*)(<:)(\\s*[.a-zA-Z0-9_:]+))?' ***REMOVED***,
         ***REMOVED*** token: [ 'other.typed-variable.julia', 'support.type.julia' ],
           regex: '([a-zA-Z0-9_]+)(::[a-zA-Z0-9_***REMOVED******REMOVED***]+)' ***REMOVED*** ] ***REMOVED***
    
    this.normalizeRules();
***REMOVED***;

JuliaHighlightRules.metaData = ***REMOVED*** fileTypes: [ 'jl' ],
      firstLineMatch: '^#!.*\\bjulia\\s*$',
      foldingStartMarker: '^\\s*(?:if|while|for|begin|function|macro|module|baremodule|type|immutable|let)\\b(?!.*\\bend\\b).*$',
      foldingStopMarker: '^\\s*(?:end)\\b.*$',
      name: 'Julia',
      scopeName: 'source.julia' ***REMOVED***


oop.inherits(JuliaHighlightRules, TextHighlightRules);

exports.JuliaHighlightRules = JuliaHighlightRules;
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
