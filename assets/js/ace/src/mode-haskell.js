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

define('ace/mode/haskell', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/haskell_highlight_rules', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var HaskellHighlightRules = require("./haskell_highlight_rules").HaskellHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = HaskellHighlightRules;
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.lineCommentStart = "--";
    this.blockComment = ***REMOVED***start: "/*", end: "*/"***REMOVED***;
    this.$id = "ace/mode/haskell";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/haskell_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var HaskellHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED*** start: 
       [ ***REMOVED*** token: 
            [ 'punctuation.definition.entity.haskell',
              'keyword.operator.function.infix.haskell',
              'punctuation.definition.entity.haskell' ],
           regex: '(`)([a-zA-Z_\']*?)(`)',
           comment: 'In case this regex seems unusual for an infix operator, note that Haskell allows any ordinary function application (elem 4 [1..10]) to be rewritten as an infix expression (4 `elem` [1..10]).' ***REMOVED***,
         ***REMOVED*** token: 'constant.language.unit.haskell', regex: '\\(\\)' ***REMOVED***,
         ***REMOVED*** token: 'constant.language.empty-list.haskell',
           regex: '\\[\\]' ***REMOVED***,
         ***REMOVED*** token: 'keyword.other.haskell',
           regex: 'module',
           push: 
            [ ***REMOVED*** token: 'keyword.other.haskell', regex: 'where', next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#module_name' ***REMOVED***,
              ***REMOVED*** include: '#module_exports' ***REMOVED***,
              ***REMOVED*** token: 'invalid', regex: '[a-z]+' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.declaration.module.haskell' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'keyword.other.haskell',
           regex: '\\bclass\\b',
           push: 
            [ ***REMOVED*** token: 'keyword.other.haskell',
                regex: '\\bwhere\\b',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 'support.class.prelude.haskell',
                regex: '\\b(?:Monad|Functor|Eq|Ord|Read|Show|Num|(?:Frac|Ra)tional|Enum|Bounded|Real(?:Frac|Float)?|Integral|Floating)\\b' ***REMOVED***,
              ***REMOVED*** token: 'entity.other.inherited-class.haskell',
                regex: '[A-Z][A-Za-z_\']*' ***REMOVED***,
              ***REMOVED*** token: 'variable.other.generic-type.haskell',
                regex: '\\b[a-z][a-zA-Z0-9_\']*\\b' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.declaration.class.haskell' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'keyword.other.haskell',
           regex: '\\binstance\\b',
           push: 
            [ ***REMOVED*** token: 'keyword.other.haskell',
                regex: '\\bwhere\\b|$',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#type_signature' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.declaration.instance.haskell' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'keyword.other.haskell',
           regex: 'import',
           push: 
            [ ***REMOVED*** token: 'meta.import.haskell', regex: '$|;', next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 'keyword.other.haskell', regex: 'qualified|as|hiding' ***REMOVED***,
              ***REMOVED*** include: '#module_name' ***REMOVED***,
              ***REMOVED*** include: '#module_exports' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.import.haskell' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: [ 'keyword.other.haskell', 'meta.deriving.haskell' ],
           regex: '(deriving)(\\s*\\()',
           push: 
            [ ***REMOVED*** token: 'meta.deriving.haskell', regex: '\\)', next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 'entity.other.inherited-class.haskell',
                regex: '\\b[A-Z][a-zA-Z_\']*' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.deriving.haskell' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'keyword.other.haskell',
           regex: '\\b(?:deriving|where|data|type|case|of|let|in|newtype|default)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.haskell', regex: '\\binfix[lr]?\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.control.haskell',
           regex: '\\b(?:do|if|then|else)\\b' ***REMOVED***,
         ***REMOVED*** token: 'constant.numeric.float.haskell',
           regex: '\\b(?:[0-9]+\\.[0-9]+(?:[eE][+-]?[0-9]+)?|[0-9]+[eE][+-]?[0-9]+)\\b',
           comment: 'Floats are always decimal' ***REMOVED***,
         ***REMOVED*** token: 'constant.numeric.haskell',
           regex: '\\b(?:[0-9]+|0(?:[xX][0-9a-fA-F]+|[oO][0-7]+))\\b' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'meta.preprocessor.c',
              'punctuation.definition.preprocessor.c',
              'meta.preprocessor.c' ],
           regex: '^(\\s*)(#)(\\s*\\w+)',
           comment: 'In addition to Haskell\'s "native" syntax, GHC permits the C preprocessor to be run on a source file.' ***REMOVED***,
         ***REMOVED*** include: '#pragma' ***REMOVED***,
         ***REMOVED*** token: 'punctuation.definition.string.begin.haskell',
           regex: '"',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.string.end.haskell',
                regex: '"',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 'constant.character.escape.haskell',
                regex: '\\\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|[abfnrtv\\\\\\"\'\\&])' ***REMOVED***,
              ***REMOVED*** token: 'constant.character.escape.octal.haskell',
                regex: '\\\\o[0-7]+|\\\\x[0-9A-Fa-f]+|\\\\[0-9]+' ***REMOVED***,
              ***REMOVED*** token: 'constant.character.escape.control.haskell',
                regex: '\\^[A-Z@\\[\\]\\\\\\^_]' ***REMOVED***,
              ***REMOVED*** defaultToken: 'string.quoted.double.haskell' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 
            [ 'punctuation.definition.string.begin.haskell',
              'string.quoted.single.haskell',
              'constant.character.escape.haskell',
              'constant.character.escape.octal.haskell',
              'constant.character.escape.hexadecimal.haskell',
              'constant.character.escape.control.haskell',
              'punctuation.definition.string.end.haskell' ],
           regex: '(\')(?:([\\ -\\[\\]-~])|(\\\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|[abfnrtv\\\\\\"\'\\&]))|(\\\\o[0-7]+)|(\\\\x[0-9A-Fa-f]+)|(\\^[A-Z@\\[\\]\\\\\\^_]))(\')' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'meta.function.type-declaration.haskell',
              'entity.name.function.haskell',
              'meta.function.type-declaration.haskell',
              'keyword.other.double-colon.haskell' ],
           regex: '^(\\s*)([a-z_][a-zA-Z0-9_\']*|\\([|!%$+\\-.,=</>]+\\))(\\s*)(::)',
           push: 
            [ ***REMOVED*** token: 'meta.function.type-declaration.haskell',
                regex: '$',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** include: '#type_signature' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.function.type-declaration.haskell' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** token: 'support.constant.haskell',
           regex: '\\b(?:Just|Nothing|Left|Right|True|False|LT|EQ|GT|\\(\\)|\\[\\])\\b' ***REMOVED***,
         ***REMOVED*** token: 'constant.other.haskell', regex: '\\b[A-Z]\\w*\\b' ***REMOVED***,
         ***REMOVED*** include: '#comments' ***REMOVED***,
         ***REMOVED*** token: 'support.function.prelude.haskell',
           regex: '\\b(?:abs|acos|acosh|all|and|any|appendFile|applyM|asTypeOf|asin|asinh|atan|atan2|atanh|break|catch|ceiling|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|div|divMod|drop|dropWhile|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromEnum|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|head|id|init|interact|ioError|isDenormalized|isIEEE|isInfinite|isNaN|isNegativeZero|iterate|last|lcm|length|lex|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|odd|or|otherwise|pi|pred|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|read|readFile|readIO|readList|readLn|readParen|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showList|showParen|showString|shows|showsPrec|significand|signum|sin|sinh|snd|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|toEnum|toInteger|toRational|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\\b' ***REMOVED***,
         ***REMOVED*** include: '#infix_op' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.haskell',
           regex: '[|!%$?~+:\\-.=</>\\\\]+',
           comment: 'In case this regex seems overly general, note that Haskell permits the definition of new operators which can be nearly any string of punctuation characters, such as $%^&*.' ***REMOVED***,
         ***REMOVED*** token: 'punctuation.separator.comma.haskell', regex: ',' ***REMOVED*** ],
      '#block_comment': 
       [ ***REMOVED*** token: 'punctuation.definition.comment.haskell',
           regex: '\\***REMOVED***-(?!#)',
           push: 
            [ ***REMOVED*** include: '#block_comment' ***REMOVED***,
              ***REMOVED*** token: 'punctuation.definition.comment.haskell',
                regex: '-\\***REMOVED***',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'comment.block.haskell' ***REMOVED*** ] ***REMOVED*** ],
      '#comments': 
       [ ***REMOVED*** token: 'punctuation.definition.comment.haskell',
           regex: '--.*',
           push_: 
            [ ***REMOVED*** token: 'comment.line.double-dash.haskell',
                regex: '$',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'comment.line.double-dash.haskell' ***REMOVED*** ] ***REMOVED***,
         ***REMOVED*** include: '#block_comment' ***REMOVED*** ],
      '#infix_op': 
       [ ***REMOVED*** token: 'entity.name.function.infix.haskell',
           regex: '\\([|!%$+:\\-.=</>]+\\)|\\(,+\\)' ***REMOVED*** ],
      '#module_exports': 
       [ ***REMOVED*** token: 'meta.declaration.exports.haskell',
           regex: '\\(',
           push: 
            [ ***REMOVED*** token: 'meta.declaration.exports.haskell',
                regex: '\\)',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 'entity.name.function.haskell',
                regex: '\\b[a-z][a-zA-Z_\']*' ***REMOVED***,
              ***REMOVED*** token: 'storage.type.haskell', regex: '\\b[A-Z][A-Za-z_\']*' ***REMOVED***,
              ***REMOVED*** token: 'punctuation.separator.comma.haskell', regex: ',' ***REMOVED***,
              ***REMOVED*** include: '#infix_op' ***REMOVED***,
              ***REMOVED*** token: 'meta.other.unknown.haskell',
                regex: '\\(.*?\\)',
                comment: 'So named because I don\'t know what to call this.' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.declaration.exports.haskell' ***REMOVED*** ] ***REMOVED*** ],
      '#module_name': 
       [ ***REMOVED*** token: 'support.other.module.haskell',
           regex: '[A-Z][A-Za-z._\']*' ***REMOVED*** ],
      '#pragma': 
       [ ***REMOVED*** token: 'meta.preprocessor.haskell',
           regex: '\\***REMOVED***-#',
           push: 
            [ ***REMOVED*** token: 'meta.preprocessor.haskell',
                regex: '#-\\***REMOVED***',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** token: 'keyword.other.preprocessor.haskell',
                regex: '\\b(?:LANGUAGE|UNPACK|INLINE)\\b' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.preprocessor.haskell' ***REMOVED*** ] ***REMOVED*** ],
      '#type_signature': 
       [ ***REMOVED*** token: 
            [ 'meta.class-constraint.haskell',
              'entity.other.inherited-class.haskell',
              'meta.class-constraint.haskell',
              'variable.other.generic-type.haskell',
              'meta.class-constraint.haskell',
              'keyword.other.big-arrow.haskell' ],
           regex: '(\\(\\s*)([A-Z][A-Za-z]*)(\\s+)([a-z][A-Za-z_\']*)(\\)\\s*)(=>)' ***REMOVED***,
         ***REMOVED*** include: '#pragma' ***REMOVED***,
         ***REMOVED*** token: 'keyword.other.arrow.haskell', regex: '->' ***REMOVED***,
         ***REMOVED*** token: 'keyword.other.big-arrow.haskell', regex: '=>' ***REMOVED***,
         ***REMOVED*** token: 'support.type.prelude.haskell',
           regex: '\\b(?:Int(?:eger)?|Maybe|Either|Bool|Float|Double|Char|String|Ordering|ShowS|ReadS|FilePath|IO(?:Error)?)\\b' ***REMOVED***,
         ***REMOVED*** token: 'variable.other.generic-type.haskell',
           regex: '\\b[a-z][a-zA-Z0-9_\']*\\b' ***REMOVED***,
         ***REMOVED*** token: 'storage.type.haskell',
           regex: '\\b[A-Z][a-zA-Z0-9_\']*\\b' ***REMOVED***,
         ***REMOVED*** token: 'support.constant.unit.haskell', regex: '\\(\\)' ***REMOVED***,
         ***REMOVED*** include: '#comments' ***REMOVED*** ] ***REMOVED***
    
    this.normalizeRules();
***REMOVED***;

HaskellHighlightRules.metaData = ***REMOVED*** fileTypes: [ 'hs' ],
      keyEquivalent: '^~H',
      name: 'Haskell',
      scopeName: 'source.haskell' ***REMOVED***


oop.inherits(HaskellHighlightRules, TextHighlightRules);

exports.HaskellHighlightRules = HaskellHighlightRules;
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
