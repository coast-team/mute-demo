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
 * ***** END LICENSE BLOCK ***** */

__ace_shadowed__.define('ace/mode/erlang', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/erlang_highlight_rules', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var ErlangHighlightRules = require("./erlang_highlight_rules").ErlangHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = ErlangHighlightRules;
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.lineCommentStart = "%";
    this.blockComment = ***REMOVED***start: "/*", end: "*/"***REMOVED***;
    this.$id = "ace/mode/erlang";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

__ace_shadowed__.define('ace/mode/erlang_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var ErlangHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED*** start: 
       [ ***REMOVED*** include: '#module-directive' ***REMOVED***,
         ***REMOVED*** include: '#import-export-directive' ***REMOVED***,
         ***REMOVED*** include: '#behaviour-directive' ***REMOVED***,
         ***REMOVED*** include: '#record-directive' ***REMOVED***,
         ***REMOVED*** include: '#define-directive' ***REMOVED***,
         ***REMOVED*** include: '#macro-directive' ***REMOVED***,
         ***REMOVED*** include: '#directive' ***REMOVED***,
         ***REMOVED*** include: '#function' ***REMOVED***,
         ***REMOVED*** include: '#everything-else' ***REMOVED*** ],
      '#atom': 
       [ ***REMOVED*** token: 'punctuation.definition.symbol.begin.erlang',
           regex: '\'',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.symbol.end.erlang',
                regex: '\'',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'punctuation.definition.escape.erlang',
                   'constant.other.symbol.escape.erlang',
                   'punctuation.definition.escape.erlang',
                   'constant.other.symbol.escape.erlang',
                   'constant.other.symbol.escape.erlang' ],
                regex: '(\\\\)(?:([bdefnrstv\\\\\'"])|(\\^)([@-_])|([0-7]***REMOVED***1,3***REMOVED***))' ***REMOVED***,
              ***REMOVED*** token: 'invalid.illegal.atom.erlang', regex: '\\\\\\^?.?' ***REMOVED***,
              ***REMOVED*** defaultToken: 'constant.other.symbol.quoted.single.erlang' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'constant.other.symbol.unquoted.erlang',
           regex: '[a-z][a-zA-Z\\d@_]*' ***REMOVED*** ],
      '#behaviour-directive': 
       [ ***REMOVED*** token: 
            [ 'meta.directive.behaviour.erlang',
              'punctuation.section.directive.begin.erlang',
              'meta.directive.behaviour.erlang',
              'keyword.control.directive.behaviour.erlang',
              'meta.directive.behaviour.erlang',
              'punctuation.definition.parameters.begin.erlang',
              'meta.directive.behaviour.erlang',
              'entity.name.type.class.behaviour.definition.erlang',
              'meta.directive.behaviour.erlang',
              'punctuation.definition.parameters.end.erlang',
              'meta.directive.behaviour.erlang',
              'punctuation.section.directive.end.erlang' ],
           regex: '^(\\s*)(-)(\\s*)(behaviour)(\\s*)(\\()(\\s*)([a-z][a-zA-Z\\d@_]*)(\\s*)(\\))(\\s*)(\\.)' ***REMOVED*** ],
      '#binary': 
       [ ***REMOVED*** token: 'punctuation.definition.binary.begin.erlang',
           regex: '<<',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.binary.end.erlang',
                regex: '>>',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'punctuation.separator.binary.erlang',
                   'punctuation.separator.value-size.erlang' ],
                regex: '(,)|(:)' ***REMOVED***,
              ***REMOVED*** include: '#internal-type-specifiers' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.structure.binary.erlang' ***REMOVED*** ] ***REMOVED*** ],
      '#character': 
       [ ***REMOVED*** token: 
            [ 'punctuation.definition.character.erlang',
              'punctuation.definition.escape.erlang',
              'constant.character.escape.erlang',
              'punctuation.definition.escape.erlang',
              'constant.character.escape.erlang',
              'constant.character.escape.erlang' ],
           regex: '(\\$)(\\\\)(?:([bdefnrstv\\\\\'"])|(\\^)([@-_])|([0-7]***REMOVED***1,3***REMOVED***))' ***REMOVED***,
         ***REMOVED*** token: 'invalid.illegal.character.erlang',
           regex: '\\$\\\\\\^?.?' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'punctuation.definition.character.erlang',
              'constant.character.erlang' ],
           regex: '(\\$)(\\S)' ***REMOVED***,
         ***REMOVED*** token: 'invalid.illegal.character.erlang', regex: '\\$.?' ***REMOVED*** ],
      '#comment': 
       [ ***REMOVED*** token: 'punctuation.definition.comment.erlang',
           regex: '%.*$',
           push_: 
            [ ***REMOVED*** token: 'comment.line.percentage.erlang',
                regex: '$',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'comment.line.percentage.erlang' ***REMOVED*** ] ***REMOVED*** ],
      '#define-directive': 
       [ ***REMOVED*** token: 
            [ 'meta.directive.define.erlang',
              'punctuation.section.directive.begin.erlang',
              'meta.directive.define.erlang',
              'keyword.control.directive.define.erlang',
              'meta.directive.define.erlang',
              'punctuation.definition.parameters.begin.erlang',
              'meta.directive.define.erlang',
              'entity.name.function.macro.definition.erlang',
              'meta.directive.define.erlang',
              'punctuation.separator.parameters.erlang' ],
           regex: '^(\\s*)(-)(\\s*)(define)(\\s*)(\\()(\\s*)([a-zA-Z\\d@_]+)(\\s*)(,)',
           push: 
            [ ***REMOVED*** token: 
                 [ 'punctuation.definition.parameters.end.erlang',
                   'meta.directive.define.erlang',
                   'punctuation.section.directive.end.erlang' ],
                regex: '(\\))(\\s*)(\\.)',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.directive.define.erlang' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'meta.directive.define.erlang',
           regex: '(?=^\\s*-\\s*define\\s*\\(\\s*[a-zA-Z\\d@_]+\\s*\\()',
           push: 
            [ ***REMOVED*** token: 
                 [ 'punctuation.definition.parameters.end.erlang',
                   'meta.directive.define.erlang',
                   'punctuation.section.directive.end.erlang' ],
                regex: '(\\))(\\s*)(\\.)',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'text',
                   'punctuation.section.directive.begin.erlang',
                   'text',
                   'keyword.control.directive.define.erlang',
                   'text',
                   'punctuation.definition.parameters.begin.erlang',
                   'text',
                   'entity.name.function.macro.definition.erlang',
                   'text',
                   'punctuation.definition.parameters.begin.erlang' ],
                regex: '^(\\s*)(-)(\\s*)(define)(\\s*)(\\()(\\s*)([a-zA-Z\\d@_]+)(\\s*)(\\()',
                push: 
                 [ ***REMOVED*** token: 
                      [ 'punctuation.definition.parameters.end.erlang',
                        'text',
                        'punctuation.separator.parameters.erlang' ],
                     regex: '(\\))(\\s*)(,)',
                     next: 'pop' ***REMOVED***,
                   ***REMOVED*** token: 'punctuation.separator.parameters.erlang', regex: ',' ***REMOVED***,
                   ***REMOVED*** include: '#everything-else' ***REMOVED*** ] ***REMOVED***,
              ***REMOVED*** token: 'punctuation.separator.define.erlang',
                regex: '\\|\\||\\||:|;|,|\\.|->' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.directive.define.erlang' ***REMOVED*** ] ***REMOVED*** ],
      '#directive': 
       [ ***REMOVED*** token: 
            [ 'meta.directive.erlang',
              'punctuation.section.directive.begin.erlang',
              'meta.directive.erlang',
              'keyword.control.directive.erlang',
              'meta.directive.erlang',
              'punctuation.definition.parameters.begin.erlang' ],
           regex: '^(\\s*)(-)(\\s*)([a-z][a-zA-Z\\d@_]*)(\\s*)(\\(?)',
           push: 
            [ ***REMOVED*** token: 
                 [ 'punctuation.definition.parameters.end.erlang',
                   'meta.directive.erlang',
                   'punctuation.section.directive.end.erlang' ],
                regex: '(\\)?)(\\s*)(\\.)',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.directive.erlang' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 
            [ 'meta.directive.erlang',
              'punctuation.section.directive.begin.erlang',
              'meta.directive.erlang',
              'keyword.control.directive.erlang',
              'meta.directive.erlang',
              'punctuation.section.directive.end.erlang' ],
           regex: '^(\\s*)(-)(\\s*)([a-z][a-zA-Z\\d@_]*)(\\s*)(\\.)' ***REMOVED*** ],
      '#everything-else': 
       [ ***REMOVED*** include: '#comment' ***REMOVED***,
         ***REMOVED*** include: '#record-usage' ***REMOVED***,
         ***REMOVED*** include: '#macro-usage' ***REMOVED***,
         ***REMOVED*** include: '#expression' ***REMOVED***,
         ***REMOVED*** include: '#keyword' ***REMOVED***,
         ***REMOVED*** include: '#textual-operator' ***REMOVED***,
         ***REMOVED*** include: '#function-call' ***REMOVED***,
         ***REMOVED*** include: '#tuple' ***REMOVED***,
         ***REMOVED*** include: '#list' ***REMOVED***,
         ***REMOVED*** include: '#binary' ***REMOVED***,
         ***REMOVED*** include: '#parenthesized-expression' ***REMOVED***,
         ***REMOVED*** include: '#character' ***REMOVED***,
         ***REMOVED*** include: '#number' ***REMOVED***,
         ***REMOVED*** include: '#atom' ***REMOVED***,
         ***REMOVED*** include: '#string' ***REMOVED***,
         ***REMOVED*** include: '#symbolic-operator' ***REMOVED***,
         ***REMOVED*** include: '#variable' ***REMOVED*** ],
      '#expression': 
       [ ***REMOVED*** token: 'keyword.control.if.erlang',
           regex: '\\bif\\b',
           push: 
            [ ***REMOVED*** token: 'keyword.control.end.erlang',
                regex: '\\bend\\b',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#internal-expression-punctuation' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.expression.if.erlang' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'keyword.control.case.erlang',
           regex: '\\bcase\\b',
           push: 
            [ ***REMOVED*** token: 'keyword.control.end.erlang',
                regex: '\\bend\\b',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#internal-expression-punctuation' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.expression.case.erlang' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'keyword.control.receive.erlang',
           regex: '\\breceive\\b',
           push: 
            [ ***REMOVED*** token: 'keyword.control.end.erlang',
                regex: '\\bend\\b',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#internal-expression-punctuation' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.expression.receive.erlang' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 
            [ 'keyword.control.fun.erlang',
              'text',
              'entity.name.type.class.module.erlang',
              'text',
              'punctuation.separator.module-function.erlang',
              'text',
              'entity.name.function.erlang',
              'text',
              'punctuation.separator.function-arity.erlang' ],
           regex: '\\b(fun)(\\s*)(?:([a-z][a-zA-Z\\d@_]*)(\\s*)(:)(\\s*))?([a-z][a-zA-Z\\d@_]*)(\\s*)(/)' ***REMOVED***,
         ***REMOVED*** token: 'keyword.control.fun.erlang',
           regex: '\\bfun\\b',
           push: 
            [ ***REMOVED*** token: 'keyword.control.end.erlang',
                regex: '\\bend\\b',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 'text',
                regex: '(?=\\()',
                push: 
                 [ ***REMOVED*** token: 'punctuation.separator.clauses.erlang',
                     regex: ';|(?=\\bend\\b)',
                     next: 'pop' ***REMOVED***,
                   ***REMOVED*** include: '#internal-function-parts' ***REMOVED*** ] ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.expression.fun.erlang' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'keyword.control.try.erlang',
           regex: '\\btry\\b',
           push: 
            [ ***REMOVED*** token: 'keyword.control.end.erlang',
                regex: '\\bend\\b',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#internal-expression-punctuation' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.expression.try.erlang' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'keyword.control.begin.erlang',
           regex: '\\bbegin\\b',
           push: 
            [ ***REMOVED*** token: 'keyword.control.end.erlang',
                regex: '\\bend\\b',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#internal-expression-punctuation' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.expression.begin.erlang' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'keyword.control.query.erlang',
           regex: '\\bquery\\b',
           push: 
            [ ***REMOVED*** token: 'keyword.control.end.erlang',
                regex: '\\bend\\b',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.expression.query.erlang' ***REMOVED*** ] ***REMOVED*** ],
      '#function': 
       [ ***REMOVED*** token: 
            [ 'meta.function.erlang',
              'entity.name.function.definition.erlang',
              'meta.function.erlang' ],
           regex: '^(\\s*)([a-z][a-zA-Z\\d@_]*|\'[^\']*\')(\\s*)(?=\\()',
           push: 
            [ ***REMOVED*** token: 'punctuation.terminator.function.erlang',
                regex: '\\.',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: [ 'text', 'entity.name.function.erlang', 'text' ],
                regex: '^(\\s*)([a-z][a-zA-Z\\d@_]*|\'[^\']*\')(\\s*)(?=\\()' ***REMOVED***,
              ***REMOVED*** token: 'text',
                regex: '(?=\\()',
                push: 
                 [ ***REMOVED*** token: 'punctuation.separator.clauses.erlang',
                     regex: ';|(?=\\.)',
                     next: 'pop' ***REMOVED***,
                   ***REMOVED*** include: '#parenthesized-expression' ***REMOVED***,
                   ***REMOVED*** include: '#internal-function-parts' ***REMOVED*** ] ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.function.erlang' ***REMOVED*** ] ***REMOVED*** ],
      '#function-call': 
       [ ***REMOVED*** token: 'meta.function-call.erlang',
           regex: '(?=(?:[a-z][a-zA-Z\\d@_]*|\'[^\']*\')\\s*(?:\\(|:\\s*(?:[a-z][a-zA-Z\\d@_]*|\'[^\']*\')\\s*\\())',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.parameters.end.erlang',
                regex: '\\)',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'entity.name.type.class.module.erlang',
                   'text',
                   'punctuation.separator.module-function.erlang',
                   'text',
                   'entity.name.function.guard.erlang',
                   'text',
                   'punctuation.definition.parameters.begin.erlang' ],
                regex: '(?:(erlang)(\\s*)(:)(\\s*))?(is_atom|is_binary|is_constant|is_float|is_function|is_integer|is_list|is_number|is_pid|is_port|is_reference|is_tuple|is_record|abs|element|hd|length|node|round|self|size|tl|trunc)(\\s*)(\\()',
                push: 
                 [ ***REMOVED*** token: 'text', regex: '(?=\\))', next: 'pop' ***REMOVED***,
                   ***REMOVED*** token: 'punctuation.separator.parameters.erlang', regex: ',' ***REMOVED***,
                   ***REMOVED*** include: '#everything-else' ***REMOVED*** ] ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'entity.name.type.class.module.erlang',
                   'text',
                   'punctuation.separator.module-function.erlang',
                   'text',
                   'entity.name.function.erlang',
                   'text',
                   'punctuation.definition.parameters.begin.erlang' ],
                regex: '(?:([a-z][a-zA-Z\\d@_]*|\'[^\']*\')(\\s*)(:)(\\s*))?([a-z][a-zA-Z\\d@_]*|\'[^\']*\')(\\s*)(\\()',
                push: 
                 [ ***REMOVED*** token: 'text', regex: '(?=\\))', next: 'pop' ***REMOVED***,
                   ***REMOVED*** token: 'punctuation.separator.parameters.erlang', regex: ',' ***REMOVED***,
                   ***REMOVED*** include: '#everything-else' ***REMOVED*** ] ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.function-call.erlang' ***REMOVED*** ] ***REMOVED*** ],
      '#import-export-directive': 
       [ ***REMOVED*** token: 
            [ 'meta.directive.import.erlang',
              'punctuation.section.directive.begin.erlang',
              'meta.directive.import.erlang',
              'keyword.control.directive.import.erlang',
              'meta.directive.import.erlang',
              'punctuation.definition.parameters.begin.erlang',
              'meta.directive.import.erlang',
              'entity.name.type.class.module.erlang',
              'meta.directive.import.erlang',
              'punctuation.separator.parameters.erlang' ],
           regex: '^(\\s*)(-)(\\s*)(import)(\\s*)(\\()(\\s*)([a-z][a-zA-Z\\d@_]*|\'[^\']*\')(\\s*)(,)',
           push: 
            [ ***REMOVED*** token: 
                 [ 'punctuation.definition.parameters.end.erlang',
                   'meta.directive.import.erlang',
                   'punctuation.section.directive.end.erlang' ],
                regex: '(\\))(\\s*)(\\.)',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#internal-function-list' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.directive.import.erlang' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 
            [ 'meta.directive.export.erlang',
              'punctuation.section.directive.begin.erlang',
              'meta.directive.export.erlang',
              'keyword.control.directive.export.erlang',
              'meta.directive.export.erlang',
              'punctuation.definition.parameters.begin.erlang' ],
           regex: '^(\\s*)(-)(\\s*)(export)(\\s*)(\\()',
           push: 
            [ ***REMOVED*** token: 
                 [ 'punctuation.definition.parameters.end.erlang',
                   'meta.directive.export.erlang',
                   'punctuation.section.directive.end.erlang' ],
                regex: '(\\))(\\s*)(\\.)',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#internal-function-list' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.directive.export.erlang' ***REMOVED*** ] ***REMOVED*** ],
      '#internal-expression-punctuation': 
       [ ***REMOVED*** token: 
            [ 'punctuation.separator.clause-head-body.erlang',
              'punctuation.separator.clauses.erlang',
              'punctuation.separator.expressions.erlang' ],
           regex: '(->)|(;)|(,)' ***REMOVED*** ],
      '#internal-function-list': 
       [ ***REMOVED*** token: 'punctuation.definition.list.begin.erlang',
           regex: '\\[',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.list.end.erlang',
                regex: '\\]',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'entity.name.function.erlang',
                   'text',
                   'punctuation.separator.function-arity.erlang' ],
                regex: '([a-z][a-zA-Z\\d@_]*|\'[^\']*\')(\\s*)(/)',
                push: 
                 [ ***REMOVED*** token: 'punctuation.separator.list.erlang',
                     regex: ',|(?=\\])',
                     next: 'pop' ***REMOVED***,
                   ***REMOVED*** include: '#everything-else' ***REMOVED*** ] ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.structure.list.function.erlang' ***REMOVED*** ] ***REMOVED*** ],
      '#internal-function-parts': 
       [ ***REMOVED*** token: 'text',
           regex: '(?=\\()',
           push: 
            [ ***REMOVED*** token: 'punctuation.separator.clause-head-body.erlang',
                regex: '->',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 'punctuation.definition.parameters.begin.erlang',
                regex: '\\(',
                push: 
                 [ ***REMOVED*** token: 'punctuation.definition.parameters.end.erlang',
                     regex: '\\)',
                     next: 'pop' ***REMOVED***,
                   ***REMOVED*** token: 'punctuation.separator.parameters.erlang', regex: ',' ***REMOVED***,
                   ***REMOVED*** include: '#everything-else' ***REMOVED*** ] ***REMOVED***,
              ***REMOVED*** token: 'punctuation.separator.guards.erlang', regex: ',|;' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'punctuation.separator.expressions.erlang',
           regex: ',' ***REMOVED***,
         ***REMOVED*** include: '#everything-else' ***REMOVED*** ],
      '#internal-record-body': 
       [ ***REMOVED*** token: 'punctuation.definition.class.record.begin.erlang',
           regex: '\\***REMOVED***',
           push: 
            [ ***REMOVED*** token: 'meta.structure.record.erlang',
                regex: '(?=\\***REMOVED***)',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'variable.other.field.erlang',
                   'variable.language.omitted.field.erlang',
                   'text',
                   'keyword.operator.assignment.erlang' ],
                regex: '(?:([a-z][a-zA-Z\\d@_]*|\'[^\']*\')|(_))(\\s*)(=|::)',
                push: 
                 [ ***REMOVED*** token: 'punctuation.separator.class.record.erlang',
                     regex: ',|(?=\\***REMOVED***)',
                     next: 'pop' ***REMOVED***,
                   ***REMOVED*** include: '#everything-else' ***REMOVED*** ] ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'variable.other.field.erlang',
                   'text',
                   'punctuation.separator.class.record.erlang' ],
                regex: '([a-z][a-zA-Z\\d@_]*|\'[^\']*\')(\\s*)((?:,)?)' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.structure.record.erlang' ***REMOVED*** ] ***REMOVED*** ],
      '#internal-type-specifiers': 
       [ ***REMOVED*** token: 'punctuation.separator.value-type.erlang',
           regex: '/',
           push: 
            [ ***REMOVED*** token: 'text', regex: '(?=,|:|>>)', next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'storage.type.erlang',
                   'storage.modifier.signedness.erlang',
                   'storage.modifier.endianness.erlang',
                   'storage.modifier.unit.erlang',
                   'punctuation.separator.type-specifiers.erlang' ],
                regex: '(integer|float|binary|bytes|bitstring|bits)|(signed|unsigned)|(big|little|native)|(unit)|(-)' ***REMOVED*** ] ***REMOVED*** ],
      '#keyword': 
       [ ***REMOVED*** token: 'keyword.control.erlang',
           regex: '\\b(?:after|begin|case|catch|cond|end|fun|if|let|of|query|try|receive|when)\\b' ***REMOVED*** ],
      '#list': 
       [ ***REMOVED*** token: 'punctuation.definition.list.begin.erlang',
           regex: '\\[',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.list.end.erlang',
                regex: '\\]',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 'punctuation.separator.list.erlang',
                regex: '\\||\\|\\||,' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.structure.list.erlang' ***REMOVED*** ] ***REMOVED*** ],
      '#macro-directive': 
       [ ***REMOVED*** token: 
            [ 'meta.directive.ifdef.erlang',
              'punctuation.section.directive.begin.erlang',
              'meta.directive.ifdef.erlang',
              'keyword.control.directive.ifdef.erlang',
              'meta.directive.ifdef.erlang',
              'punctuation.definition.parameters.begin.erlang',
              'meta.directive.ifdef.erlang',
              'entity.name.function.macro.erlang',
              'meta.directive.ifdef.erlang',
              'punctuation.definition.parameters.end.erlang',
              'meta.directive.ifdef.erlang',
              'punctuation.section.directive.end.erlang' ],
           regex: '^(\\s*)(-)(\\s*)(ifdef)(\\s*)(\\()(\\s*)([a-zA-z\\d@_]+)(\\s*)(\\))(\\s*)(\\.)' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'meta.directive.ifndef.erlang',
              'punctuation.section.directive.begin.erlang',
              'meta.directive.ifndef.erlang',
              'keyword.control.directive.ifndef.erlang',
              'meta.directive.ifndef.erlang',
              'punctuation.definition.parameters.begin.erlang',
              'meta.directive.ifndef.erlang',
              'entity.name.function.macro.erlang',
              'meta.directive.ifndef.erlang',
              'punctuation.definition.parameters.end.erlang',
              'meta.directive.ifndef.erlang',
              'punctuation.section.directive.end.erlang' ],
           regex: '^(\\s*)(-)(\\s*)(ifndef)(\\s*)(\\()(\\s*)([a-zA-z\\d@_]+)(\\s*)(\\))(\\s*)(\\.)' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'meta.directive.undef.erlang',
              'punctuation.section.directive.begin.erlang',
              'meta.directive.undef.erlang',
              'keyword.control.directive.undef.erlang',
              'meta.directive.undef.erlang',
              'punctuation.definition.parameters.begin.erlang',
              'meta.directive.undef.erlang',
              'entity.name.function.macro.erlang',
              'meta.directive.undef.erlang',
              'punctuation.definition.parameters.end.erlang',
              'meta.directive.undef.erlang',
              'punctuation.section.directive.end.erlang' ],
           regex: '^(\\s*)(-)(\\s*)(undef)(\\s*)(\\()(\\s*)([a-zA-z\\d@_]+)(\\s*)(\\))(\\s*)(\\.)' ***REMOVED*** ],
      '#macro-usage': 
       [ ***REMOVED*** token: 
            [ 'keyword.operator.macro.erlang',
              'meta.macro-usage.erlang',
              'entity.name.function.macro.erlang' ],
           regex: '(\\?\\??)(\\s*)([a-zA-Z\\d@_]+)' ***REMOVED*** ],
      '#module-directive': 
       [ ***REMOVED*** token: 
            [ 'meta.directive.module.erlang',
              'punctuation.section.directive.begin.erlang',
              'meta.directive.module.erlang',
              'keyword.control.directive.module.erlang',
              'meta.directive.module.erlang',
              'punctuation.definition.parameters.begin.erlang',
              'meta.directive.module.erlang',
              'entity.name.type.class.module.definition.erlang',
              'meta.directive.module.erlang',
              'punctuation.definition.parameters.end.erlang',
              'meta.directive.module.erlang',
              'punctuation.section.directive.end.erlang' ],
           regex: '^(\\s*)(-)(\\s*)(module)(\\s*)(\\()(\\s*)([a-z][a-zA-Z\\d@_]*)(\\s*)(\\))(\\s*)(\\.)' ***REMOVED*** ],
      '#number': 
       [ ***REMOVED*** token: 'text',
           regex: '(?=\\d)',
           push: 
            [ ***REMOVED*** token: 'text', regex: '(?!\\d)', next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.float.erlang',
                   'punctuation.separator.integer-float.erlang',
                   'constant.numeric.float.erlang',
                   'punctuation.separator.float-exponent.erlang' ],
                regex: '(\\d+)(\\.)(\\d+)((?:[eE][\\+\\-]?\\d+)?)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.binary.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.binary.erlang' ],
                regex: '(2)(#)([0-1]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-3.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-3.erlang' ],
                regex: '(3)(#)([0-2]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-4.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-4.erlang' ],
                regex: '(4)(#)([0-3]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-5.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-5.erlang' ],
                regex: '(5)(#)([0-4]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-6.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-6.erlang' ],
                regex: '(6)(#)([0-5]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-7.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-7.erlang' ],
                regex: '(7)(#)([0-6]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.octal.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.octal.erlang' ],
                regex: '(8)(#)([0-7]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-9.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-9.erlang' ],
                regex: '(9)(#)([0-8]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.decimal.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.decimal.erlang' ],
                regex: '(10)(#)(\\d+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-11.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-11.erlang' ],
                regex: '(11)(#)([\\daA]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-12.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-12.erlang' ],
                regex: '(12)(#)([\\da-bA-B]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-13.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-13.erlang' ],
                regex: '(13)(#)([\\da-cA-C]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-14.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-14.erlang' ],
                regex: '(14)(#)([\\da-dA-D]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-15.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-15.erlang' ],
                regex: '(15)(#)([\\da-eA-E]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.hexadecimal.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.hexadecimal.erlang' ],
                regex: '(16)(#)([\\da-fA-F]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-17.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-17.erlang' ],
                regex: '(17)(#)([\\da-gA-G]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-18.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-18.erlang' ],
                regex: '(18)(#)([\\da-hA-H]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-19.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-19.erlang' ],
                regex: '(19)(#)([\\da-iA-I]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-20.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-20.erlang' ],
                regex: '(20)(#)([\\da-jA-J]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-21.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-21.erlang' ],
                regex: '(21)(#)([\\da-kA-K]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-22.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-22.erlang' ],
                regex: '(22)(#)([\\da-lA-L]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-23.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-23.erlang' ],
                regex: '(23)(#)([\\da-mA-M]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-24.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-24.erlang' ],
                regex: '(24)(#)([\\da-nA-N]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-25.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-25.erlang' ],
                regex: '(25)(#)([\\da-oA-O]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-26.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-26.erlang' ],
                regex: '(26)(#)([\\da-pA-P]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-27.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-27.erlang' ],
                regex: '(27)(#)([\\da-qA-Q]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-28.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-28.erlang' ],
                regex: '(28)(#)([\\da-rA-R]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-29.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-29.erlang' ],
                regex: '(29)(#)([\\da-sA-S]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-30.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-30.erlang' ],
                regex: '(30)(#)([\\da-tA-T]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-31.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-31.erlang' ],
                regex: '(31)(#)([\\da-uA-U]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-32.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-32.erlang' ],
                regex: '(32)(#)([\\da-vA-V]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-33.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-33.erlang' ],
                regex: '(33)(#)([\\da-wA-W]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-34.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-34.erlang' ],
                regex: '(34)(#)([\\da-xA-X]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-35.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-35.erlang' ],
                regex: '(35)(#)([\\da-yA-Y]+)' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'constant.numeric.integer.base-36.erlang',
                   'punctuation.separator.base-integer.erlang',
                   'constant.numeric.integer.base-36.erlang' ],
                regex: '(36)(#)([\\da-zA-Z]+)' ***REMOVED***,
              ***REMOVED*** token: 'invalid.illegal.integer.erlang',
                regex: '\\d+#[\\da-zA-Z]+' ***REMOVED***,
              ***REMOVED*** token: 'constant.numeric.integer.decimal.erlang',
                regex: '\\d+' ***REMOVED*** ] ***REMOVED*** ],
      '#parenthesized-expression': 
       [ ***REMOVED*** token: 'punctuation.section.expression.begin.erlang',
           regex: '\\(',
           push: 
            [ ***REMOVED*** token: 'punctuation.section.expression.end.erlang',
                regex: '\\)',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.expression.parenthesized' ***REMOVED*** ] ***REMOVED*** ],
      '#record-directive': 
       [ ***REMOVED*** token: 
            [ 'meta.directive.record.erlang',
              'punctuation.section.directive.begin.erlang',
              'meta.directive.record.erlang',
              'keyword.control.directive.import.erlang',
              'meta.directive.record.erlang',
              'punctuation.definition.parameters.begin.erlang',
              'meta.directive.record.erlang',
              'entity.name.type.class.record.definition.erlang',
              'meta.directive.record.erlang',
              'punctuation.separator.parameters.erlang' ],
           regex: '^(\\s*)(-)(\\s*)(record)(\\s*)(\\()(\\s*)([a-z][a-zA-Z\\d@_]*|\'[^\']*\')(\\s*)(,)',
           push: 
            [ ***REMOVED*** token: 
                 [ 'punctuation.definition.class.record.end.erlang',
                   'meta.directive.record.erlang',
                   'punctuation.definition.parameters.end.erlang',
                   'meta.directive.record.erlang',
                   'punctuation.section.directive.end.erlang' ],
                regex: '(\\***REMOVED***)(\\s*)(\\))(\\s*)(\\.)',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#internal-record-body' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.directive.record.erlang' ***REMOVED*** ] ***REMOVED*** ],
      '#record-usage': 
       [ ***REMOVED*** token: 
            [ 'keyword.operator.record.erlang',
              'meta.record-usage.erlang',
              'entity.name.type.class.record.erlang',
              'meta.record-usage.erlang',
              'punctuation.separator.record-field.erlang',
              'meta.record-usage.erlang',
              'variable.other.field.erlang' ],
           regex: '(#)(\\s*)([a-z][a-zA-Z\\d@_]*|\'[^\']*\')(\\s*)(\\.)(\\s*)([a-z][a-zA-Z\\d@_]*|\'[^\']*\')' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'keyword.operator.record.erlang',
              'meta.record-usage.erlang',
              'entity.name.type.class.record.erlang' ],
           regex: '(#)(\\s*)([a-z][a-zA-Z\\d@_]*|\'[^\']*\')',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.class.record.end.erlang',
                regex: '\\***REMOVED***',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#internal-record-body' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.record-usage.erlang' ***REMOVED*** ] ***REMOVED*** ],
      '#string': 
       [ ***REMOVED*** token: 'punctuation.definition.string.begin.erlang',
           regex: '"',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.string.end.erlang',
                regex: '"',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'punctuation.definition.escape.erlang',
                   'constant.character.escape.erlang',
                   'punctuation.definition.escape.erlang',
                   'constant.character.escape.erlang',
                   'constant.character.escape.erlang' ],
                regex: '(\\\\)(?:([bdefnrstv\\\\\'"])|(\\^)([@-_])|([0-7]***REMOVED***1,3***REMOVED***))' ***REMOVED***,
              ***REMOVED*** token: 'invalid.illegal.string.erlang', regex: '\\\\\\^?.?' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'punctuation.definition.placeholder.erlang',
                   'punctuation.separator.placeholder-parts.erlang',
                   'constant.other.placeholder.erlang',
                   'punctuation.separator.placeholder-parts.erlang',
                   'punctuation.separator.placeholder-parts.erlang',
                   'constant.other.placeholder.erlang',
                   'punctuation.separator.placeholder-parts.erlang',
                   'punctuation.separator.placeholder-parts.erlang',
                   'punctuation.separator.placeholder-parts.erlang',
                   'constant.other.placeholder.erlang',
                   'constant.other.placeholder.erlang' ],
                regex: '(~)(?:((?:\\-)?)(\\d+)|(\\*))?(?:(\\.)(?:(\\d+)|(\\*)))?(?:(\\.)(?:(\\*)|(.)))?([~cfegswpWPBX#bx\\+ni])' ***REMOVED***,
              ***REMOVED*** token: 
                 [ 'punctuation.definition.placeholder.erlang',
                   'punctuation.separator.placeholder-parts.erlang',
                   'constant.other.placeholder.erlang',
                   'constant.other.placeholder.erlang' ],
                regex: '(~)((?:\\*)?)((?:\\d+)?)([~du\\-#fsacl])' ***REMOVED***,
              ***REMOVED*** token: 'invalid.illegal.string.erlang', regex: '~.?' ***REMOVED***,
              ***REMOVED*** defaultToken: 'string.quoted.double.erlang' ***REMOVED*** ] ***REMOVED*** ],
      '#symbolic-operator': 
       [ ***REMOVED*** token: 'keyword.operator.symbolic.erlang',
           regex: '\\+\\+|\\+|--|-|\\*|/=|/|=/=|=:=|==|=<|=|<-|<|>=|>|!|::' ***REMOVED*** ],
      '#textual-operator': 
       [ ***REMOVED*** token: 'keyword.operator.textual.erlang',
           regex: '\\b(?:andalso|band|and|bxor|xor|bor|orelse|or|bnot|not|bsl|bsr|div|rem)\\b' ***REMOVED*** ],
      '#tuple': 
       [ ***REMOVED*** token: 'punctuation.definition.tuple.begin.erlang',
           regex: '\\***REMOVED***',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.tuple.end.erlang',
                regex: '\\***REMOVED***',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 'punctuation.separator.tuple.erlang', regex: ',' ***REMOVED***,
              ***REMOVED*** include: '#everything-else' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.structure.tuple.erlang' ***REMOVED*** ] ***REMOVED*** ],
      '#variable': 
       [ ***REMOVED*** token: [ 'variable.other.erlang', 'variable.language.omitted.erlang' ],
           regex: '(_[a-zA-Z\\d@_]+|[A-Z][a-zA-Z\\d@_]*)|(_)' ***REMOVED*** ] ***REMOVED***
    
    this.normalizeRules();
***REMOVED***;

ErlangHighlightRules.metaData = ***REMOVED*** comment: 'The recognition of function definitions and compiler directives (such as module, record and macro definitions) requires that each of the aforementioned constructs must be the first string inside a line (except for whitespace).  Also, the function/module/record/macro names must be given unquoted.  -- desp',
      fileTypes: [ 'erl', 'hrl' ],
      keyEquivalent: '^~E',
      name: 'Erlang',
      scopeName: 'source.erlang' ***REMOVED***


oop.inherits(ErlangHighlightRules, TextHighlightRules);

exports.ErlangHighlightRules = ErlangHighlightRules;
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
