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

define('ace/mode/d', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/d_highlight_rules', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var DHighlightRules = require("./d_highlight_rules").DHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = DHighlightRules;
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.lineCommentStart = "/\\+";
    this.blockComment = ***REMOVED***start: "/*", end: "*/"***REMOVED***;
    this.$id = "ace/mode/d";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/d_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/doc_comment_highlight_rules', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var DHighlightRules = function() ***REMOVED***

    var keywords = (
        "this|super|import|module|body|mixin|__traits|invariant|alias|asm|delete|"+
        "typeof|typeid|sizeof|cast|new|in|is|typedef|__vector|__parameters"
    );

    var keywordControls = (
        "break|case|continue|default|do|else|for|foreach|foreach_reverse|goto|if|" +
        "return|switch|while|catch|try|throw|finally|version|assert|unittest|with"
    );
    
    var types = (
        "auto|bool|char|dchar|wchar|byte|ubyte|float|double|real|" +
        "cfloat|creal|cdouble|cent|ifloat|ireal|idouble|" +
        "int|long|short|void|uint|ulong|ushort|ucent|" +
        "function|delegate|string|wstring|dstring|size_t|ptrdiff_t|hash_t|Object"
    );

    var modifiers = (
        "abstract|align|debug|deprecated|export|extern|const|final|in|inout|out|" +
        "ref|immutable|lazy|nothrow|override|package|pragma|private|protected|" +
        "public|pure|scope|shared|__gshared|synchronized|static|volatile"
    );
    
    var storages = (
        "class|struct|union|template|interface|enum|macro"
    );
    
    var stringEscapesSeq =  ***REMOVED***
        token: "constant.language.escape",
        regex: "\\\\(?:(?:x[0-9A-F]***REMOVED***2***REMOVED***)|(?:[0-7]***REMOVED***1,3***REMOVED***)|(?:['\"\\?0abfnrtv])|" +
            "(?:u[0-9a-fA-F]***REMOVED***4***REMOVED***)|(?:U[0-9a-fA-F]***REMOVED***8***REMOVED***))"
***REMOVED***;

    var builtinConstants = (
        "null|true|false|"+
        "__DATE__|__EOF__|__TIME__|__TIMESTAMP__|__VENDOR__|__VERSION__|"+
        "__FILE__|__MODULE__|__LINE__|__FUNCTION__|__PRETTY_FUNCTION__"
    );
    
    var operators = (
        "/|/\\=|&|&\\=|&&|\\|\\|\\=|\\|\\||\\-|\\-\\=|\\-\\-|\\+|" +
        "\\+\\=|\\+\\+|\\<|\\<\\=|\\<\\<|\\<\\<\\=|\\<\\>|\\<\\>\\=|\\>|\\>\\=|\\>\\>\\=|" +
        "\\>\\>\\>\\=|\\>\\>|\\>\\>\\>|\\!|\\!\\=|\\!\\<\\>|\\!\\<\\>\\=|\\!\\<|\\!\\<\\=|" +
        "\\!\\>|\\!\\>\\=|\\?|\\$|\\=|\\=\\=|\\*|\\*\\=|%|%\\=|" +
        "\\^|\\^\\=|\\^\\^|\\^\\^\\=|~|~\\=|\\=\\>|#"
    );

    var keywordMapper = this.$keywords = this.createKeywordMapper(***REMOVED***
        "keyword.modifier" : modifiers,
        "keyword.control" :  keywordControls,
        "keyword.type" :     types,
        "keyword":           keywords,
        "keyword.storage":   storages,
        "punctation": "\\.|\\,|;|\\.\\.|\\.\\.\\.",
        "keyword.operator" : operators,
        "constant.language": builtinConstants
***REMOVED*** "identifier");
    
    var identifierRe = "[a-zA-Z_\u00a1-\uffff][a-zA-Z\\d_\u00a1-\uffff]*\\b";

    this.$rules = ***REMOVED***
        "start" : [
            ***REMOVED***     //-------------------------------------------------------- COMMENTS
                token : "comment",
                regex : "\\/\\/.*$"
        ***REMOVED***
            DocCommentHighlightRules.getStartRule("doc-start"),
            ***REMOVED***
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "star-comment"
        ***REMOVED*** ***REMOVED***
                token: "comment.shebang",
                regex: "^\s*#!.*"
        ***REMOVED*** ***REMOVED***
                token : "comment",
                regex : "\\/\\+",
                next: "plus-comment"
        ***REMOVED*** ***REMOVED***  //-------------------------------------------------------- STRINGS
                onMatch: function(value, currentState, state) ***REMOVED***
                    state.unshift(this.next, value.substr(2));
                    return "string";
            ***REMOVED***
                regex: 'q"(?:[\\[\\(\\***REMOVED***\\<]+)',
                next: 'operator-heredoc-string'
        ***REMOVED*** ***REMOVED***
                onMatch: function(value, currentState, state) ***REMOVED***
                    state.unshift(this.next, value.substr(2));
                    return "string";
            ***REMOVED***
                regex: 'q"(?:[a-zA-Z_]+)$',
                next: 'identifier-heredoc-string'
        ***REMOVED*** ***REMOVED***
                token : "string", // multi line string start
                regex : '[xr]?"',
                next : "quote-string"
        ***REMOVED*** ***REMOVED***
                token : "string", // multi line string start
                regex : '[xr]?`',
                next : "backtick-string"
        ***REMOVED*** ***REMOVED***
                token : "string", // single line
                regex : "[xr]?['](?:(?:\\\\.)|(?:[^'\\\\]))*?['][cdw]?"
        ***REMOVED*** ***REMOVED***  //-------------------------------------------------------- RULES
                token: ["keyword", "text", "paren.lparen"],
                regex: /(asm)(\s*)(***REMOVED***)/,
                next: "d-asm"
        ***REMOVED*** ***REMOVED***
                token: ["keyword", "text", "paren.lparen", "constant.language"],
                regex: "(__traits)(\\s*)(\\()("+identifierRe+")"
        ***REMOVED*** ***REMOVED*** // import|module abc
                token: ["keyword", "text", "variable.module"],
                regex: "(import|module)(\\s+)((?:"+identifierRe+"\\.?)*)"
        ***REMOVED*** ***REMOVED*** // storage Name
                token: ["keyword.storage", "text", "entity.name.type"],
                regex: "("+storages+")(\\s*)("+identifierRe+")"
        ***REMOVED*** ***REMOVED*** // alias|typedef foo bar;
                token: ["keyword", "text", "variable.storage", "text"],
                regex: "(alias|typedef)(\\s*)("+identifierRe+")(\\s*)"
        ***REMOVED*** ***REMOVED***  //-------------------------------------------------------- OTHERS
                token : "constant.numeric", // hex
                regex : "0[xX][0-9a-fA-F_]+(l|ul|u|f|F|L|U|UL)?\\b"
        ***REMOVED*** ***REMOVED***
                token : "constant.numeric", // float
                regex : "[+-]?\\d[\\d_]*(?:(?:\\.[\\d_]*)?(?:[eE][+-]?[\\d_]+)?)?(l|ul|u|f|F|L|U|UL)?\\b"
        ***REMOVED*** ***REMOVED***
                token: "entity.other.attribute-name",
                regex: "@"+identifierRe
        ***REMOVED*** ***REMOVED***
                token : keywordMapper,
                regex : "[a-zA-Z_][a-zA-Z0-9_]*\\b"
        ***REMOVED*** ***REMOVED***
                token : "keyword.operator",
                regex : operators
        ***REMOVED*** ***REMOVED***
                token : "punctuation.operator",
                regex : "\\?|\\:|\\,|\\;|\\.|\\:"
        ***REMOVED*** ***REMOVED***
                token : "paren.lparen",
                regex : "[[(***REMOVED***]"
        ***REMOVED*** ***REMOVED***
                token : "paren.rparen",
                regex : "[\\])***REMOVED***]"
        ***REMOVED*** ***REMOVED***
                token : "text",
                regex : "\\s+"
        ***REMOVED***
        ],
        "star-comment" : [
            ***REMOVED***
                token : "comment", // closing comment
                regex : "\\*\\/",
                next : "start"
        ***REMOVED*** ***REMOVED***
                defaultToken: 'comment'
        ***REMOVED***
        ],
        "plus-comment" : [
            ***REMOVED***
                token : "comment", // closing comment
                regex : "\\+\\/",
                next : "start"
        ***REMOVED*** ***REMOVED***
                defaultToken: 'comment'
        ***REMOVED***
        ],
        
        "quote-string" : [
           stringEscapesSeq,
           ***REMOVED***
                token : "string",
                regex : '"[cdw]?',
                next : "start"
        ***REMOVED*** ***REMOVED***
                defaultToken: 'string'
        ***REMOVED***
        ],
        
        "backtick-string" : [
           stringEscapesSeq,
           ***REMOVED***
                token : "string",
                regex : '`[cdw]?',
                next : "start"
        ***REMOVED*** ***REMOVED***
                defaultToken: 'string'
        ***REMOVED***
        ],
        
        "operator-heredoc-string": [
            ***REMOVED***
                onMatch: function(value, currentState, state) ***REMOVED***
                    value = value.substring(value.length-2, value.length-1);
                    var map = ***REMOVED***'>':'<',']':'[',')':'(','***REMOVED***':'***REMOVED***'***REMOVED***;
                    if(Object.keys(map).indexOf(value) != -1)
                        value = map[value];
                    if(value != state[1]) return "string";
                    state.shift();
                    state.shift();
                    
                    return "string";
            ***REMOVED***
                regex: '(?:[\\]\\)***REMOVED***>]+)"',
                next: 'start'
        ***REMOVED*** ***REMOVED***
                token: 'string',
                regex: '[^\\]\\)***REMOVED***>]+'
        ***REMOVED***
        ],
        
        "identifier-heredoc-string": [
            ***REMOVED***
                onMatch: function(value, currentState, state) ***REMOVED***
                    value = value.substring(0, value.length-1);
                    if(value != state[1]) return "string";
                    state.shift();
                    state.shift();
                    
                    return "string";
            ***REMOVED***
                regex: '^(?:[A-Za-z_][a-zA-Z0-9]+)"',
                next: 'start'
        ***REMOVED*** ***REMOVED***
                token: 'string',
                regex: '[^\\]\\)***REMOVED***>]+'
        ***REMOVED***
        ],
        
        "d-asm": [
            ***REMOVED***
                token: "paren.rparen",
                regex: "\\***REMOVED***",
                next: "start"
        ***REMOVED*** ***REMOVED***
                token: 'keyword.instruction',
                regex: '[a-zA-Z]+',
                next: 'd-asm-instruction' 
        ***REMOVED*** ***REMOVED***
                token: "text",
                regex: "\\s+"
        ***REMOVED***
        ],
        'd-asm-instruction': [
            ***REMOVED***
                token: 'constant.language',
                regex: /AL|AH|AX|EAX|BL|BH|BX|EBX|CL|CH|CX|ECX|DL|DH|DX|EDX|BP|EBP|SP|ESP|DI|EDI|SI|ESI/i
        ***REMOVED*** ***REMOVED***
                token: 'identifier',
                regex: '[a-zA-Z]+'
        ***REMOVED*** ***REMOVED***
                token: 'string',
                regex: '".*"'
        ***REMOVED*** ***REMOVED***
                token: 'comment',
                regex: '//.*$'
        ***REMOVED*** ***REMOVED***
                token: 'constant.numeric',
                regex: '[0-9.xA-F]+'
        ***REMOVED*** ***REMOVED***
                token: 'punctuation.operator',
                regex: '\\,'
        ***REMOVED*** ***REMOVED***
                token: 'punctuation.operator',
                regex: ';',
                next: 'd-asm'
        ***REMOVED*** ***REMOVED***
                token: 'text',
                regex: '\\s+'
        ***REMOVED***
        ]
***REMOVED***;

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
***REMOVED***;

DHighlightRules.metaData = ***REMOVED***
      comment: 'D language',
      fileTypes: [ 'd', 'di' ],
      firstLineMatch: '^#!.*\\b[glr]?dmd\\b.',
      foldingStartMarker: '(?x)/\\*\\*(?!\\*)|^(?![^***REMOVED***]*?//|[^***REMOVED***]*?/\\*(?!.*?\\*/.*?\\***REMOVED***)).*?\\***REMOVED***\\s*($|//|/\\*(?!.*?\\*/.*\\S))',
      foldingStopMarker: '(?<!\\*)\\*\\*/|^\\s*\\***REMOVED***',
      keyEquivalent: '^~D',
      name: 'D',
      scopeName: 'source.d'
***REMOVED***;
oop.inherits(DHighlightRules, TextHighlightRules);

exports.DHighlightRules = DHighlightRules;
***REMOVED***);

define('ace/mode/doc_comment_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


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
