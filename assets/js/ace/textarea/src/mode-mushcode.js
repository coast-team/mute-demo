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

__ace_shadowed__.define('ace/mode/mushcode', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/mushcode_highlight_rules', 'ace/mode/folding/pythonic', 'ace/range'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var MushCodeRules = require("./mushcode_highlight_rules").MushCodeRules;
var PythonFoldMode = require("./folding/pythonic").FoldMode;
var Range = require("../range").Range;

var Mode = function() ***REMOVED***
    this.HighlightRules = MushCodeRules;
    this.foldingRules = new PythonFoldMode("\\:");
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***

    this.lineCommentStart = "#";

    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type == "comment") ***REMOVED***
            return indent;
    ***REMOVED***

        if (state == "start") ***REMOVED***
            var match = line.match(/^.*[\***REMOVED***\(\[\:]\s*$/);
            if (match) ***REMOVED***
                indent += tab;
        ***REMOVED***
    ***REMOVED***

        return indent;
***REMOVED***;

   var outdents = ***REMOVED***
        "pass": 1,
        "return": 1,
        "raise": 1,
        "break": 1,
        "continue": 1
***REMOVED***;

    this.checkOutdent = function(state, line, input) ***REMOVED***
        if (input !== "\r\n" && input !== "\r" && input !== "\n")
            return false;

        var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;

        if (!tokens)
            return false;
        do ***REMOVED***
            var last = tokens.pop();
    ***REMOVED*** while (last && (last.type == "comment" || (last.type == "text" && last.value.match(/^\s+$/))));

        if (!last)
            return false;

        return (last.type == "keyword" && outdents[last.value]);
***REMOVED***;

    this.autoOutdent = function(state, doc, row) ***REMOVED***

        row += 1;
        var indent = this.$getIndent(doc.getLine(row));
        var tab = doc.getTabString();
        if (indent.slice(-tab.length) == tab)
            doc.remove(new Range(row, indent.length-tab.length, row, indent.length));
***REMOVED***;

    this.$id = "ace/mode/mushcode";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

__ace_shadowed__.define('ace/mode/mushcode_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var MushCodeRules = function() ***REMOVED***


    var keywords = (
 "@if|"+
 "@ifelse|"+
 "@switch|"+
 "@halt|"+
 "@dolist|"+
 "@create|"+
 "@scent|"+
 "@sound|"+
 "@touch|"+
 "@ataste|"+
 "@osound|"+
 "@ahear|"+
 "@aahear|"+
 "@amhear|"+
 "@otouch|"+
 "@otaste|"+
 "@drop|"+
 "@odrop|"+
 "@adrop|"+
 "@dropfail|"+
 "@odropfail|"+
 "@smell|"+
 "@oemit|"+
 "@emit|"+
 "@pemit|"+
 "@parent|"+
 "@clone|"+
 "@taste|"+
 "whisper|"+
 "page|"+
 "say|"+
 "pose|"+
 "semipose|"+
 "teach|"+
 "touch|"+
 "taste|"+
 "smell|"+
 "listen|"+
 "look|"+
 "move|"+
 "go|"+
 "home|"+
 "follow|"+
 "unfollow|"+
 "desert|"+
 "dismiss|"+
 "@tel"
    );

    var builtinConstants = (
        "=#0"
    );

    var builtinFunctions = (
 "default|"+
 "edefault|"+
 "eval|"+
 "get_eval|"+
 "get|"+
 "grep|"+
 "grepi|"+
 "hasattr|"+
 "hasattrp|"+
 "hasattrval|"+
 "hasattrpval|"+
 "lattr|"+
 "nattr|"+
 "poss|"+
 "udefault|"+
 "ufun|"+
 "u|"+
 "v|"+
 "uldefault|"+
 "xget|"+
 "zfun|"+
 "band|"+
 "bnand|"+
 "bnot|"+
 "bor|"+
 "bxor|"+
 "shl|"+
 "shr|"+
 "and|"+
 "cand|"+
 "cor|"+
 "eq|"+
 "gt|"+
 "gte|"+
 "lt|"+
 "lte|"+
 "nand|"+
 "neq|"+
 "nor|"+
 "not|"+
 "or|"+
 "t|"+
 "xor|"+
 "con|"+
 "entrances|"+
 "exit|"+
 "followers|"+
 "home|"+
 "lcon|"+
 "lexits|"+
 "loc|"+
 "locate|"+
 "lparent|"+
 "lsearch|"+
 "next|"+
 "num|"+
 "owner|"+
 "parent|"+
 "pmatch|"+
 "rloc|"+
 "rnum|"+
 "room|"+
 "where|"+
 "zone|"+
 "worn|"+
 "held|"+
 "carried|"+
 "acos|"+
 "asin|"+
 "atan|"+
 "ceil|"+
 "cos|"+
 "e|"+
 "exp|"+
 "fdiv|"+
 "fmod|"+
 "floor|"+
 "log|"+
 "ln|"+
 "pi|"+
 "power|"+
 "round|"+
 "sin|"+
 "sqrt|"+
 "tan|"+
 "aposs|"+
 "andflags|"+
 "conn|"+
 "commandssent|"+
 "controls|"+
 "doing|"+
 "elock|"+
 "findable|"+
 "flags|"+
 "fullname|"+
 "hasflag|"+
 "haspower|"+
 "hastype|"+
 "hidden|"+
 "idle|"+
 "isbaker|"+
 "lock|"+
 "lstats|"+
 "money|"+
 "who|"+
 "name|"+
 "nearby|"+
 "obj|"+
 "objflags|"+
 "photo|"+
 "poll|"+
 "powers|"+
 "pendingtext|"+
 "receivedtext|"+
 "restarts|"+
 "restarttime|"+
 "subj|"+
 "shortestpath|"+
 "tmoney|"+
 "type|"+
 "visible|"+
 "cat|"+
 "element|"+
 "elements|"+
 "extract|"+
 "filter|"+
 "filterbool|"+
 "first|"+
 "foreach|"+
 "fold|"+
 "grab|"+
 "graball|"+
 "index|"+
 "insert|"+
 "itemize|"+
 "items|"+
 "iter|"+
 "last|"+
 "ldelete|"+
 "map|"+
 "match|"+
 "matchall|"+
 "member|"+
 "mix|"+
 "munge|"+
 "pick|"+
 "remove|"+
 "replace|"+
 "rest|"+
 "revwords|"+
 "setdiff|"+
 "setinter|"+
 "setunion|"+
 "shuffle|"+
 "sort|"+
 "sortby|"+
 "splice|"+
 "step|"+
 "wordpos|"+
 "words|"+
 "add|"+
 "lmath|"+
 "max|"+
 "mean|"+
 "median|"+
 "min|"+
 "mul|"+
 "percent|"+
 "sign|"+
 "stddev|"+
 "sub|"+
 "val|"+
 "bound|"+
 "abs|"+
 "inc|"+
 "dec|"+
 "dist2d|"+
 "dist3d|"+
 "div|"+
 "floordiv|"+
 "mod|"+
 "modulo|"+
 "remainder|"+
 "vadd|"+
 "vdim|"+
 "vdot|"+
 "vmag|"+
 "vmax|"+
 "vmin|"+
 "vmul|"+
 "vsub|"+
 "vunit|"+
 "regedit|"+
 "regeditall|"+
 "regeditalli|"+
 "regediti|"+
 "regmatch|"+
 "regmatchi|"+
 "regrab|"+
 "regraball|"+
 "regraballi|"+
 "regrabi|"+
 "regrep|"+
 "regrepi|"+
 "after|"+
 "alphamin|"+
 "alphamax|"+
 "art|"+
 "before|"+
 "brackets|"+
 "capstr|"+
 "case|"+
 "caseall|"+
 "center|"+
 "containsfansi|"+
 "comp|"+
 "decompose|"+
 "decrypt|"+
 "delete|"+
 "edit|"+
 "encrypt|"+
 "escape|"+
 "if|"+
 "ifelse|"+
 "lcstr|"+
 "left|"+
 "lit|"+
 "ljust|"+
 "merge|"+
 "mid|"+
 "ostrlen|"+
 "pos|"+
 "repeat|"+
 "reverse|"+
 "right|"+
 "rjust|"+
 "scramble|"+
 "secure|"+
 "space|"+
 "spellnum|"+
 "squish|"+
 "strcat|"+
 "strmatch|"+
 "strinsert|"+
 "stripansi|"+
 "stripfansi|"+
 "strlen|"+
 "switch|"+
 "switchall|"+
 "table|"+
 "tr|"+
 "trim|"+
 "ucstr|"+
 "unsafe|"+
 "wrap|"+
 "ctitle|"+
 "cwho|"+
 "channels|"+
 "clock|"+
 "cflags|"+
 "ilev|"+
 "itext|"+
 "inum|"+
 "convsecs|"+
 "convutcsecs|"+
 "convtime|"+
 "ctime|"+
 "etimefmt|"+
 "isdaylight|"+
 "mtime|"+
 "secs|"+
 "msecs|"+
 "starttime|"+
 "time|"+
 "timefmt|"+
 "timestring|"+
 "utctime|"+
 "atrlock|"+
 "clone|"+
 "create|"+
 "cook|"+
 "dig|"+
 "emit|"+
 "lemit|"+
 "link|"+
 "oemit|"+
 "open|"+
 "pemit|"+
 "remit|"+
 "set|"+
 "tel|"+
 "wipe|"+
 "zemit|"+
 "fbcreate|"+
 "fbdestroy|"+
 "fbwrite|"+
 "fbclear|"+
 "fbcopy|"+
 "fbcopyto|"+
 "fbclip|"+
 "fbdump|"+
 "fbflush|"+
 "fbhset|"+
 "fblist|"+
 "fbstats|"+
 "qentries|"+
 "qentry|"+
 "play|"+
 "ansi|"+
 "break|"+
 "c|"+
 "asc|"+
 "die|"+
 "isdbref|"+
 "isint|"+
 "isnum|"+
 "isletters|"+
 "linecoords|"+
 "localize|"+
 "lnum|"+
 "nameshort|"+
 "null|"+
 "objeval|"+
 "r|"+
 "rand|"+
 "s|"+
 "setq|"+
 "setr|"+
 "soundex|"+
 "soundslike|"+
 "valid|"+
 "vchart|"+
 "vchart2|"+
 "vlabel|"+
 "@@|"+
 "bakerdays|"+
 "bodybuild|"+
 "box|"+
 "capall|"+
 "catalog|"+
 "children|"+
 "ctrailer|"+
 "darttime|"+
 "debt|"+
 "detailbar|"+
 "exploredroom|"+
 "fansitoansi|"+
 "fansitoxansi|"+
 "fullbar|"+
 "halfbar|"+
 "isdarted|"+
 "isnewbie|"+
 "isword|"+
 "lambda|"+
 "lobjects|"+
 "lplayers|"+
 "lthings|"+
 "lvexits|"+
 "lvobjects|"+
 "lvplayers|"+
 "lvthings|"+
 "newswrap|"+
 "numsuffix|"+
 "playerson|"+
 "playersthisweek|"+
 "randomad|"+
 "randword|"+
 "realrandword|"+
 "replacechr|"+
 "second|"+
 "splitamount|"+
 "strlenall|"+
 "text|"+
 "third|"+
 "tofansi|"+
 "totalac|"+
 "unique|"+
 "getaddressroom|"+
 "listpropertycomm|"+
 "listpropertyres|"+
 "lotowner|"+
 "lotrating|"+
 "lotratingcount|"+
 "lotvalue|"+
 "boughtproduct|"+
 "companyabb|"+
 "companyicon|"+
 "companylist|"+
 "companyname|"+
 "companyowners|"+
 "companyvalue|"+
 "employees|"+
 "invested|"+
 "productlist|"+
 "productname|"+
 "productowners|"+
 "productrating|"+
 "productratingcount|"+
 "productsoldat|"+
 "producttype|"+
 "ratedproduct|"+
 "soldproduct|"+
 "topproducts|"+
 "totalspentonproduct|"+
 "totalstock|"+
 "transfermoney|"+
 "uniquebuyercount|"+
 "uniqueproductsbought|"+
 "validcompany|"+
 "deletepicture|"+
 "fbsave|"+
 "getpicturesecurity|"+
 "haspicture|"+
 "listpictures|"+
 "picturesize|"+
 "replacecolor|"+
 "rgbtocolor|"+
 "savepicture|"+
 "setpicturesecurity|"+
 "showpicture|"+
 "piechart|"+
 "piechartlabel|"+
 "createmaze|"+
 "drawmaze|"+
 "drawwireframe"
    );
    var keywordMapper = this.createKeywordMapper(***REMOVED***
        "invalid.deprecated": "debugger",
        "support.function": builtinFunctions,
        "constant.language": builtinConstants,
        "keyword": keywords
***REMOVED*** "identifier");

    var strPre = "(?:r|u|ur|R|U|UR|Ur|uR)?";

    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var octInteger = "(?:0[oO]?[0-7]+)";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var binInteger = "(?:0[bB][01]+)";
    var integer = "(?:" + decimalInteger + "|" + octInteger + "|" + hexInteger + "|" + binInteger + ")";

    var exponent = "(?:[eE][+-]?\\d+)";
    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" +  intPart + ")" + exponent + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";

    this.$rules = ***REMOVED***
        "start" : [
         ***REMOVED***
                token : "variable", // mush substitution register
                regex : "%[0-9]***REMOVED***1***REMOVED***"
     ***REMOVED***
         ***REMOVED***
                token : "variable", // mush substitution register
                regex : "%q[0-9A-Za-z]***REMOVED***1***REMOVED***"
     ***REMOVED***
         ***REMOVED***
                token : "variable", // mush special character register
                regex : "%[a-zA-Z]***REMOVED***1***REMOVED***"
     ***REMOVED***
         ***REMOVED***
                token: "variable.language",
                regex: "%[a-z0-9-_]+"
     ***REMOVED***
        ***REMOVED***
            token : "constant.numeric", // imaginary
            regex : "(?:" + floatNumber + "|\\d+)[jJ]\\b"
    ***REMOVED*** ***REMOVED***
            token : "constant.numeric", // float
            regex : floatNumber
    ***REMOVED*** ***REMOVED***
            token : "constant.numeric", // long integer
            regex : integer + "[lL]\\b"
    ***REMOVED*** ***REMOVED***
            token : "constant.numeric", // integer
            regex : integer + "\\b"
    ***REMOVED*** ***REMOVED***
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
    ***REMOVED*** ***REMOVED***
            token : "keyword.operator",
            regex : "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|#|%|<<|>>|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
    ***REMOVED*** ***REMOVED***
            token : "paren.lparen",
            regex : "[\\[\\(\\***REMOVED***]"
    ***REMOVED*** ***REMOVED***
            token : "paren.rparen",
            regex : "[\\]\\)\\***REMOVED***]"
    ***REMOVED*** ***REMOVED***
            token : "text",
            regex : "\\s+"
    ***REMOVED*** ]
***REMOVED***;
***REMOVED***;

oop.inherits(MushCodeRules, TextHighlightRules);

exports.MushCodeRules = MushCodeRules;
***REMOVED***);

__ace_shadowed__.define('ace/mode/folding/pythonic', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/fold_mode'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(markers) ***REMOVED***
    this.foldingStartMarker = new RegExp("([\\[***REMOVED***])(?:\\s*)$|(" + markers + ")(?:\\s*)(?:#.*)?$");
***REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***

    this.getFoldWidgetRange = function(session, foldStyle, row) ***REMOVED***
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) ***REMOVED***
            if (match[1])
                return this.openingBracketBlock(session, match[1], row, match.index);
            if (match[2])
                return this.indentationBlock(session, row, match.index + match[2].length);
            return this.indentationBlock(session, row);
    ***REMOVED***
***REMOVED***

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
