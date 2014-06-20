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

define('ace/mode/rust', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/rust_highlight_rules', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var RustHighlightRules = require("./rust_highlight_rules").RustHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = RustHighlightRules;
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.lineCommentStart = "/\\*";
    this.blockComment = ***REMOVED***start: "/*", end: "*/"***REMOVED***;
    this.$id = "ace/mode/rust";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/rust_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var RustHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED*** start: 
       [ ***REMOVED*** token: 'variable.other.source.rust',
           regex: '\'[a-zA-Z_][a-zA-Z0-9_]*[^\\\']' ***REMOVED***,
         ***REMOVED*** token: 'string.quoted.single.source.rust',
           regex: '\'',
           push: 
            [ ***REMOVED*** token: 'string.quoted.single.source.rust',
                regex: '\'',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#rust_escaped_character' ***REMOVED***,
              ***REMOVED*** defaultToken: 'string.quoted.single.source.rust' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'string.quoted.double.source.rust',
           regex: '"',
           push: 
            [ ***REMOVED*** token: 'string.quoted.double.source.rust',
                regex: '"',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#rust_escaped_character' ***REMOVED***,
              ***REMOVED*** defaultToken: 'string.quoted.double.source.rust' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: [ 'keyword.source.rust', 'meta.function.source.rust',
              'entity.name.function.source.rust', 'meta.function.source.rust' ],
           regex: '\\b(fn)(\\s+)([a-zA-Z_][a-zA-Z0-9_][\\w\\:,+ \\\'<>]*)(\\s*\\()' ***REMOVED***,
         ***REMOVED*** token: 'support.constant', regex: '\\b[a-zA-Z_][\\w\\d]*::' ***REMOVED***,
         ***REMOVED*** token: 'keyword.source.rust',
           regex: '\\b(?:as|assert|break|claim|const|copy|Copy|do|drop|else|extern|fail|for|if|impl|in|let|log|loop|match|mod|module|move|mut|Owned|priv|pub|pure|ref|return|unchecked|unsafe|use|while|mod|Send|static|trait|class|struct|enum|type)\\b' ***REMOVED***,
         ***REMOVED*** token: 'storage.type.source.rust',
           regex: '\\b(?:Self|m32|m64|m128|f80|f16|f128|int|uint|float|char|bool|u8|u16|u32|u64|f32|f64|i8|i16|i32|i64|str|option|either|c_float|c_double|c_void|FILE|fpos_t|DIR|dirent|c_char|c_schar|c_uchar|c_short|c_ushort|c_int|c_uint|c_long|c_ulong|size_t|ptrdiff_t|clock_t|time_t|c_longlong|c_ulonglong|intptr_t|uintptr_t|off_t|dev_t|ino_t|pid_t|mode_t|ssize_t)\\b' ***REMOVED***,
         ***REMOVED*** token: 'variable.language.source.rust', regex: '\\bself\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator',
            regex: '!|\\$|\\*|\\-\\-|\\-|\\+\\+|\\+|-->|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|/=|%=|\\+=|\\-=|&=|\\^=|,|;' ***REMOVED***,
         ***REMOVED*** token: 'constant.language.source.rust',
           regex: '\\b(?:true|false|Some|None|Left|Right|Ok|Err)\\b' ***REMOVED***,
         ***REMOVED*** token: 'support.constant.source.rust',
           regex: '\\b(?:EXIT_FAILURE|EXIT_SUCCESS|RAND_MAX|EOF|SEEK_SET|SEEK_CUR|SEEK_END|_IOFBF|_IONBF|_IOLBF|BUFSIZ|FOPEN_MAX|FILENAME_MAX|L_tmpnam|TMP_MAX|O_RDONLY|O_WRONLY|O_RDWR|O_APPEND|O_CREAT|O_EXCL|O_TRUNC|S_IFIFO|S_IFCHR|S_IFBLK|S_IFDIR|S_IFREG|S_IFMT|S_IEXEC|S_IWRITE|S_IREAD|S_IRWXU|S_IXUSR|S_IWUSR|S_IRUSR|F_OK|R_OK|W_OK|X_OK|STDIN_FILENO|STDOUT_FILENO|STDERR_FILENO)\\b' ***REMOVED***,
         ***REMOVED*** token: 'meta.preprocessor.source.rust',
           regex: '\\b\\w\\(\\w\\)*!|#\\[[\\w=\\(\\)_]+\\]\\b' ***REMOVED***,
         ***REMOVED*** token: 'constant.numeric.integer.source.rust',
           regex: '\\b(?:[0-9][0-9_]*|[0-9][0-9_]*(?:u|u8|u16|u32|u64)|[0-9][0-9_]*(?:i|i8|i16|i32|i64))\\b' ***REMOVED***,
         ***REMOVED*** token: 'constant.numeric.hex.source.rust',
           regex: '\\b(?:0x[a-fA-F0-9_]+|0x[a-fA-F0-9_]+(?:u|u8|u16|u32|u64)|0x[a-fA-F0-9_]+(?:i|i8|i16|i32|i64))\\b' ***REMOVED***,
         ***REMOVED*** token: 'constant.numeric.binary.source.rust',
           regex: '\\b(?:0b[01_]+|0b[01_]+(?:u|u8|u16|u32|u64)|0b[01_]+(?:i|i8|i16|i32|i64))\\b' ***REMOVED***,
         ***REMOVED*** token: 'constant.numeric.float.source.rust',
           regex: '[0-9][0-9_]*(?:f32|f64|f)|[0-9][0-9_]*[eE][+-]=[0-9_]+|[0-9][0-9_]*[eE][+-]=[0-9_]+(?:f32|f64|f)|[0-9][0-9_]*\\.[0-9_]+|[0-9][0-9_]*\\.[0-9_]+(?:f32|f64|f)|[0-9][0-9_]*\\.[0-9_]+%[eE][+-]=[0-9_]+|[0-9][0-9_]*\\.[0-9_]+%[eE][+-]=[0-9_]+(?:f32|f64|f)' ***REMOVED***,
         ***REMOVED*** token: 'comment.line.documentation.source.rust',
           regex: '//!.*$',
           push_: 
            [ ***REMOVED*** token: 'comment.line.documentation.source.rust',
                regex: '$',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'comment.line.documentation.source.rust' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'comment.line.double-dash.source.rust',
           regex: '//.*$',
           push_: 
            [ ***REMOVED*** token: 'comment.line.double-dash.source.rust',
                regex: '$',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'comment.line.double-dash.source.rust' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'comment.block.source.rust',
           regex: '/\\*',
           push: 
            [ ***REMOVED*** token: 'comment.block.source.rust',
                regex: '\\*/',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'comment.block.source.rust' ***REMOVED*** ] ***REMOVED*** ],
      '#rust_escaped_character': 
       [ ***REMOVED*** token: 'constant.character.escape.source.rust',
           regex: '\\\\(?:x[\\da-fA-F]***REMOVED***2***REMOVED***|[0-2][0-7]***REMOVED***,2***REMOVED***|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)' ***REMOVED*** ] ***REMOVED***
    
    this.normalizeRules();
***REMOVED***;

RustHighlightRules.metaData = ***REMOVED*** fileTypes: [ 'rs', 'rc' ],
      foldingStartMarker: '^.*\\bfn\\s*(\\w+\\s*)?\\([^\\)]*\\)(\\s*\\***REMOVED***[^\\***REMOVED***]*)?\\s*$',
      foldingStopMarker: '^\\s*\\***REMOVED***',
      name: 'Rust',
      scopeName: 'source.rust' ***REMOVED***


oop.inherits(RustHighlightRules, TextHighlightRules);

exports.RustHighlightRules = RustHighlightRules;
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
