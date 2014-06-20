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

define('ace/mode/asciidoc', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/asciidoc_highlight_rules', 'ace/mode/folding/asciidoc'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var AsciidocHighlightRules = require("./asciidoc_highlight_rules").AsciidocHighlightRules;
var AsciidocFoldMode = require("./folding/asciidoc").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = AsciidocHighlightRules;
    
    this.foldingRules = new AsciidocFoldMode();    
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.type = "text";
    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        if (state == "listblock") ***REMOVED***
            var match = /^((?:.+)?)([-+*][ ]+)/.exec(line);
            if (match) ***REMOVED***
                return new Array(match[1].length + 1).join(" ") + match[2];
        ***REMOVED*** else ***REMOVED***
                return "";
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            return this.$getIndent(line);
    ***REMOVED***
***REMOVED***;
    this.$id = "ace/mode/asciidoc";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/asciidoc_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var AsciidocHighlightRules = function() ***REMOVED***
    var identifierRe = "[a-zA-Z\u00a1-\uffff]+\\b";

    this.$rules = ***REMOVED***
        "start": [
            ***REMOVED***token: "empty",   regex: /$/***REMOVED***,
            ***REMOVED***token: "literal", regex: /^\.***REMOVED***4,***REMOVED***\s*$/,  next: "listingBlock"***REMOVED***,
            ***REMOVED***token: "literal", regex: /^-***REMOVED***4,***REMOVED***\s*$/,   next: "literalBlock"***REMOVED***,
            ***REMOVED***token: "string",  regex: /^\+***REMOVED***4,***REMOVED***\s*$/,  next: "passthroughBlock"***REMOVED***,
            ***REMOVED***token: "keyword", regex: /^=***REMOVED***4,***REMOVED***\s*$/***REMOVED***,
            ***REMOVED***token: "text",    regex: /^\s*$/***REMOVED***,
            ***REMOVED***token: "empty", regex: "", next: "dissallowDelimitedBlock"***REMOVED***
        ],

        "dissallowDelimitedBlock": [
            ***REMOVED***include: "paragraphEnd"***REMOVED***,
            ***REMOVED***token: "comment", regex: '^//.+$'***REMOVED***,
            ***REMOVED***token: "keyword", regex: "^(?:NOTE|TIP|IMPORTANT|WARNING|CAUTION):"***REMOVED***,

            ***REMOVED***include: "listStart"***REMOVED***,
            ***REMOVED***token: "literal", regex: /^\s+.+$/, next: "indentedBlock"***REMOVED***,
            ***REMOVED***token: "empty",   regex: "", next: "text"***REMOVED***
        ],

        "paragraphEnd": [
            ***REMOVED***token: "doc.comment", regex: /^\/***REMOVED***4,***REMOVED***\s*$/,    next: "commentBlock"***REMOVED***,
            ***REMOVED***token: "tableBlock",  regex: /^\s*[|!]=+\s*$/, next: "tableBlock"***REMOVED***,
            ***REMOVED***token: "keyword",     regex: /^(?:--|''')\s*$/, next: "start"***REMOVED***,
            ***REMOVED***token: "option",      regex: /^\[.*\]\s*$/,     next: "start"***REMOVED***,
            ***REMOVED***token: "pageBreak",   regex: /^>***REMOVED***3,***REMOVED***$/,         next: "start"***REMOVED***,
            ***REMOVED***token: "literal",     regex: /^\.***REMOVED***4,***REMOVED***\s*$/,     next: "listingBlock"***REMOVED***,
            ***REMOVED***token: "titleUnderline",    regex: /^(?:=***REMOVED***2,***REMOVED***|-***REMOVED***2,***REMOVED***|~***REMOVED***2,***REMOVED***|\^***REMOVED***2,***REMOVED***|\+***REMOVED***2,***REMOVED***)\s*$/, next: "start"***REMOVED***,
            ***REMOVED***token: "singleLineTitle",   regex: /^=***REMOVED***1,5***REMOVED***\s+\S.*$/, next: "start"***REMOVED***,

            ***REMOVED***token: "otherBlock",    regex: /^(?:\****REMOVED***2,***REMOVED***|_***REMOVED***2,***REMOVED***)\s*$/, next: "start"***REMOVED***,
            ***REMOVED***token: "optionalTitle", regex: /^\.[^.\s].+$/,  next: "start"***REMOVED***
        ],

        "listStart": [
            ***REMOVED***token: "keyword",  regex: /^\s*(?:\d+\.|[a-zA-Z]\.|[ixvmIXVM]+\)|\****REMOVED***1,5***REMOVED***|-|\.***REMOVED***1,5***REMOVED***)\s/, next: "listText"***REMOVED***,
            ***REMOVED***token: "meta.tag", regex: /^.+(?::***REMOVED***2,4***REMOVED***|;;)(?: |$)/, next: "listText"***REMOVED***,
            ***REMOVED***token: "support.function.list.callout", regex: /^(?:<\d+>|\d+>|>) /, next: "text"***REMOVED***,
            ***REMOVED***token: "keyword",  regex: /^\+\s*$/, next: "start"***REMOVED***
        ],

        "text": [
            ***REMOVED***token: ["link", "variable.language"], regex: /((?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+)(\[.*?\])/***REMOVED***,
            ***REMOVED***token: "link", regex: /(?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+/***REMOVED***,
            ***REMOVED***token: "link", regex: /\b[\w\.\/\-]+@[\w\.\/\-]+\b/***REMOVED***,
            ***REMOVED***include: "macros"***REMOVED***,
            ***REMOVED***include: "paragraphEnd"***REMOVED***,
            ***REMOVED***token: "literal", regex:/\+***REMOVED***3,***REMOVED***/, next:"smallPassthrough"***REMOVED***,
            ***REMOVED***token: "escape", regex: /\((?:C|TM|R)\)|\.***REMOVED***3***REMOVED***|->|<-|=>|<=|&#(?:\d+|x[a-fA-F\d]+);|(?: |^)--(?=\s+\S)/***REMOVED***,
            ***REMOVED***token: "escape", regex: /\\[_*'`+#]|\\***REMOVED***2***REMOVED***[_*'`+#]***REMOVED***2***REMOVED***/***REMOVED***,
            ***REMOVED***token: "keyword", regex: /\s\+$/***REMOVED***,
            ***REMOVED***token: "text", regex: identifierRe***REMOVED***,
            ***REMOVED***token: ["keyword", "string", "keyword"],
                regex: /(<<[\w\d\-$]+,)(.*?)(>>|$)/***REMOVED***,
            ***REMOVED***token: "keyword", regex: /<<[\w\d\-$]+,?|>>/***REMOVED***,
            ***REMOVED***token: "constant.character", regex: /\(***REMOVED***2,3***REMOVED***.*?\)***REMOVED***2,3***REMOVED***/***REMOVED***,
            ***REMOVED***token: "keyword", regex: /\[\[.+?\]\]/***REMOVED***,
            ***REMOVED***token: "support", regex: /^\[***REMOVED***3***REMOVED***[\w\d =\-]+\]***REMOVED***3***REMOVED***/***REMOVED***,

            ***REMOVED***include: "quotes"***REMOVED***,
            ***REMOVED***token: "empty", regex: /^\s*$/, next: "start"***REMOVED***
        ],

        "listText": [
            ***REMOVED***include: "listStart"***REMOVED***,
            ***REMOVED***include: "text"***REMOVED***
        ],

        "indentedBlock": [
            ***REMOVED***token: "literal", regex: /^[\s\w].+$/, next: "indentedBlock"***REMOVED***,
            ***REMOVED***token: "literal", regex: "", next: "start"***REMOVED***
        ],

        "listingBlock": [
            ***REMOVED***token: "literal", regex: /^\.***REMOVED***4,***REMOVED***\s*$/, next: "dissallowDelimitedBlock"***REMOVED***,
            ***REMOVED***token: "constant.numeric", regex: '<\\d+>'***REMOVED***,
            ***REMOVED***token: "literal", regex: '[^<]+'***REMOVED***,
            ***REMOVED***token: "literal", regex: '<'***REMOVED***
        ],
        "literalBlock": [
            ***REMOVED***token: "literal", regex: /^-***REMOVED***4,***REMOVED***\s*$/, next: "dissallowDelimitedBlock"***REMOVED***,
            ***REMOVED***token: "constant.numeric", regex: '<\\d+>'***REMOVED***,
            ***REMOVED***token: "literal", regex: '[^<]+'***REMOVED***,
            ***REMOVED***token: "literal", regex: '<'***REMOVED***
        ],
        "passthroughBlock": [
            ***REMOVED***token: "literal", regex: /^\+***REMOVED***4,***REMOVED***\s*$/, next: "dissallowDelimitedBlock"***REMOVED***,
            ***REMOVED***token: "literal", regex: identifierRe + "|\\d+"***REMOVED***,
            ***REMOVED***include: "macros"***REMOVED***,
            ***REMOVED***token: "literal", regex: "."***REMOVED***
        ],

        "smallPassthrough": [
            ***REMOVED***token: "literal", regex: /[+]***REMOVED***3,***REMOVED***/, next: "dissallowDelimitedBlock"***REMOVED***,
            ***REMOVED***token: "literal", regex: /^\s*$/, next: "dissallowDelimitedBlock"***REMOVED***,
            ***REMOVED***token: "literal", regex: identifierRe + "|\\d+"***REMOVED***,
            ***REMOVED***include: "macros"***REMOVED***
        ],

        "commentBlock": [
            ***REMOVED***token: "doc.comment", regex: /^\/***REMOVED***4,***REMOVED***\s*$/, next: "dissallowDelimitedBlock"***REMOVED***,
            ***REMOVED***token: "doc.comment", regex: '^.*$'***REMOVED***
        ],
        "tableBlock": [
            ***REMOVED***token: "tableBlock", regex: /^\s*\|=***REMOVED***3,***REMOVED***\s*$/, next: "dissallowDelimitedBlock"***REMOVED***,
            ***REMOVED***token: "tableBlock", regex: /^\s*!=***REMOVED***3,***REMOVED***\s*$/, next: "innerTableBlock"***REMOVED***,
            ***REMOVED***token: "tableBlock", regex: /\|/***REMOVED***,
            ***REMOVED***include: "text", noEscape: true***REMOVED***
        ],
        "innerTableBlock": [
            ***REMOVED***token: "tableBlock", regex: /^\s*!=***REMOVED***3,***REMOVED***\s*$/, next: "tableBlock"***REMOVED***,
            ***REMOVED***token: "tableBlock", regex: /^\s*|=***REMOVED***3,***REMOVED***\s*$/, next: "dissallowDelimitedBlock"***REMOVED***,
            ***REMOVED***token: "tableBlock", regex: /\!/***REMOVED***
        ],
        "macros": [
            ***REMOVED***token: "macro", regex: /***REMOVED***[\w\-$]+***REMOVED***/***REMOVED***,
            ***REMOVED***token: ["text", "string", "text", "constant.character", "text"], regex: /(***REMOVED***)([\w\-$]+)(:)?(.+)?(***REMOVED***)/***REMOVED***,
            ***REMOVED***token: ["text", "markup.list.macro", "keyword", "string"], regex: /(\w+)(footnote(?:ref)?::?)([^\s\[]+)?(\[.*?\])?/***REMOVED***,
            ***REMOVED***token: ["markup.list.macro", "keyword", "string"], regex: /([a-zA-Z\-][\w\.\/\-]*::?)([^\s\[]+)(\[.*?\])?/***REMOVED***,
            ***REMOVED***token: ["markup.list.macro", "keyword"], regex: /([a-zA-Z\-][\w\.\/\-]+::?)(\[.*?\])/***REMOVED***,
            ***REMOVED***token: "keyword",     regex: /^:.+?:(?= |$)/***REMOVED***
        ],

        "quotes": [
            ***REMOVED***token: "string.italic", regex: /__[^_\s].*?__/***REMOVED***,
            ***REMOVED***token: "string.italic", regex: quoteRule("_")***REMOVED***,
            
            ***REMOVED***token: "keyword.bold", regex: /\*\*[^*\s].*?\*\*/***REMOVED***,
            ***REMOVED***token: "keyword.bold", regex: quoteRule("\\*")***REMOVED***,
            
            ***REMOVED***token: "literal", regex: quoteRule("\\+")***REMOVED***,
            ***REMOVED***token: "literal", regex: /\+\+[^+\s].*?\+\+/***REMOVED***,
            ***REMOVED***token: "literal", regex: /\$\$.+?\$\$/***REMOVED***,
            ***REMOVED***token: "literal", regex: quoteRule("`")***REMOVED***,

            ***REMOVED***token: "keyword", regex: quoteRule("^")***REMOVED***,
            ***REMOVED***token: "keyword", regex: quoteRule("~")***REMOVED***,
            ***REMOVED***token: "keyword", regex: /##?/***REMOVED***,
            ***REMOVED***token: "keyword", regex: /(?:\B|^)``|\b''/***REMOVED***
        ]

***REMOVED***;

    function quoteRule(ch) ***REMOVED***
        var prefix = /\w/.test(ch) ? "\\b" : "(?:\\B|^)";
        return prefix + ch + "[^" + ch + "].*?" + ch + "(?![\\w*])";
***REMOVED***

    var tokenMap = ***REMOVED***
        macro: "constant.character",
        tableBlock: "doc.comment",
        titleUnderline: "markup.heading",
        singleLineTitle: "markup.heading",
        pageBreak: "string",
        option: "string.regexp",
        otherBlock: "markup.list",
        literal: "support.function",
        optionalTitle: "constant.numeric",
        escape: "constant.language.escape",
        link: "markup.underline.list"
***REMOVED***;

    for (var state in this.$rules) ***REMOVED***
        var stateRules = this.$rules[state];
        for (var i = stateRules.length; i--; ) ***REMOVED***
            var rule = stateRules[i];
            if (rule.include || typeof rule == "string") ***REMOVED***
                var args = [i, 1].concat(this.$rules[rule.include || rule]);
                if (rule.noEscape) ***REMOVED***
                    args = args.filter(function(x) ***REMOVED***
                        return !x.next;
                ***REMOVED***);
            ***REMOVED***
                stateRules.splice.apply(stateRules, args);
        ***REMOVED*** else if (rule.token in tokenMap) ***REMOVED***
                rule.token = tokenMap[rule.token];
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***;
oop.inherits(AsciidocHighlightRules, TextHighlightRules);

exports.AsciidocHighlightRules = AsciidocHighlightRules;
***REMOVED***);

define('ace/mode/folding/asciidoc', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/fold_mode', 'ace/range'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;
var Range = require("../../range").Range;

var FoldMode = exports.FoldMode = function() ***REMOVED******REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***
    this.foldingStartMarker = /^(?:\|=***REMOVED***10,***REMOVED***|[\.\/=\-~^+]***REMOVED***4,***REMOVED***\s*$|=***REMOVED***1,5***REMOVED*** )/;
    this.singleLineHeadingRe = /^=***REMOVED***1,5***REMOVED***(?=\s+\S)/;

    this.getFoldWidget = function(session, foldStyle, row) ***REMOVED***
        var line = session.getLine(row);
        if (!this.foldingStartMarker.test(line))
            return ""

        if (line[0] == "=") ***REMOVED***
            if (this.singleLineHeadingRe.test(line))
                return "start";
            if (session.getLine(row - 1).length != session.getLine(row).length)
                return "";
            return "start";
    ***REMOVED***
        if (session.bgTokenizer.getState(row) == "dissallowDelimitedBlock")
            return "end";
        return "start";
***REMOVED***;

    this.getFoldWidgetRange = function(session, foldStyle, row) ***REMOVED***
        var line = session.getLine(row);
        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;
        if (!line.match(this.foldingStartMarker))
            return;

        var token;
        function getTokenType(row) ***REMOVED***
            token = session.getTokens(row)[0];
            return token && token.type;
    ***REMOVED***

        var levels = ["=","-","~","^","+"];
        var heading = "markup.heading";
        var singleLineHeadingRe = this.singleLineHeadingRe;
        function getLevel() ***REMOVED***
            var match = token.value.match(singleLineHeadingRe);
            if (match)
                return match[0].length;
            var level = levels.indexOf(token.value[0]) + 1;
            if (level == 1) ***REMOVED***
                if (session.getLine(row - 1).length != session.getLine(row).length)
                    return Infinity;
        ***REMOVED***
            return level;
    ***REMOVED***

        if (getTokenType(row) == heading) ***REMOVED***
            var startHeadingLevel = getLevel();
            while (++row < maxRow) ***REMOVED***
                if (getTokenType(row) != heading)
                    continue;
                var level = getLevel();
                if (level <= startHeadingLevel)
                    break;
        ***REMOVED***

            var isSingleLineHeading = token && token.value.match(this.singleLineHeadingRe);
            endRow = isSingleLineHeading ? row - 1 : row - 2;

            if (endRow > startRow) ***REMOVED***
                while (endRow > startRow && (!getTokenType(endRow) || token.value[0] == "["))
                    endRow--;
        ***REMOVED***

            if (endRow > startRow) ***REMOVED***
                var endColumn = session.getLine(endRow).length;
                return new Range(startRow, startColumn, endRow, endColumn);
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            var state = session.bgTokenizer.getState(row);
            if (state == "dissallowDelimitedBlock") ***REMOVED***
                while (row -- > 0) ***REMOVED***
                    if (session.bgTokenizer.getState(row).lastIndexOf("Block") == -1)
                        break;
            ***REMOVED***
                endRow = row + 1;
                if (endRow < startRow) ***REMOVED***
                    var endColumn = session.getLine(row).length;
                    return new Range(endRow, 5, startRow, startColumn - 5);
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
                while (++row < maxRow) ***REMOVED***
                    if (session.bgTokenizer.getState(row) == "dissallowDelimitedBlock")
                        break;
            ***REMOVED***
                endRow = row;
                if (endRow > startRow) ***REMOVED***
                    var endColumn = session.getLine(row).length;
                    return new Range(startRow, 5, endRow, endColumn - 5);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
