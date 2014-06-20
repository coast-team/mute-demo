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

define('ace/mode/c9search', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/c9search_highlight_rules', 'ace/mode/matching_brace_outdent', 'ace/mode/folding/c9search'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var C9SearchHighlightRules = require("./c9search_highlight_rules").C9SearchHighlightRules;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var C9StyleFoldMode = require("./folding/c9search").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = C9SearchHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.foldingRules = new C9StyleFoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    
    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        var indent = this.$getIndent(line);
        return indent;
***REMOVED***;

    this.checkOutdent = function(state, line, input) ***REMOVED***
        return this.$outdent.checkOutdent(line, input);
***REMOVED***;

    this.autoOutdent = function(state, doc, row) ***REMOVED***
        this.$outdent.autoOutdent(doc, row);
***REMOVED***;

    this.$id = "ace/mode/c9search";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;

***REMOVED***);

define('ace/mode/c9search_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var lang = require("../lib/lang");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

function safeCreateRegexp(source, flag) ***REMOVED***
    try ***REMOVED***
        return new RegExp(source, flag);
***REMOVED*** catch(e) ***REMOVED******REMOVED***
***REMOVED***

var C9SearchHighlightRules = function() ***REMOVED***
    this.$rules = ***REMOVED***
        "start" : [
            ***REMOVED***
                tokenNames : ["c9searchresults.constant.numeric", "c9searchresults.text", "c9searchresults.text", "c9searchresults.keyword"],
                regex : "(^\\s+[0-9]+)(:\\s)(.+)",
                onMatch : function(val, state, stack) ***REMOVED***
                    var values = this.splitRegex.exec(val);
                    var types = this.tokenNames;
                    var tokens = [***REMOVED***
                        type: types[0],
                        value: values[1]
                ***REMOVED******REMOVED***
                        type: types[1],
                        value: values[2]
                ***REMOVED***];
                    
                    var regex = stack[1];
                    var str = values[3];
                    
                    var m;
                    var last = 0;
                    if (regex && regex.exec) ***REMOVED***
                        regex.lastIndex = 0;
                        while (m = regex.exec(str)) ***REMOVED***
                            var skipped = str.substring(last, m.index);
                            last = regex.lastIndex;
                            if (skipped)
                                tokens.push(***REMOVED***type: types[2], value: skipped***REMOVED***);
                            if (m[0])
                                tokens.push(***REMOVED***type: types[3], value: m[0]***REMOVED***);
                            else if (!skipped)
                                break;
                    ***REMOVED***
                ***REMOVED***
                    if (last < str.length)
                        tokens.push(***REMOVED***type: types[2], value: str.substr(last)***REMOVED***);
                    return tokens;
            ***REMOVED***
        ***REMOVED***
            ***REMOVED***
                token : ["string", "text"], // single line
                regex : "(\\S.*)(:$)"
        ***REMOVED***
            ***REMOVED***
                regex : "Searching for .*$",
                onMatch: function(val, state, stack) ***REMOVED***
                    var parts = val.split("\x01");
                    if (parts.length < 3)
                        return "text";

                    var options, search, replace;
                    
                    var i = 0;
                    var tokens = [***REMOVED***
                        value: parts[i++] + "'",
                        type: "text"
                ***REMOVED*** ***REMOVED***
                        value: search = parts[i++],
                        type: "text" // "c9searchresults.keyword"
                ***REMOVED*** ***REMOVED***
                        value: "'" + parts[i++],
                        type: "text"
                ***REMOVED***];
                    if (parts[2] !== " in") ***REMOVED***
                        replace = parts[i];
                        tokens.push(***REMOVED***
                            value: "'" + parts[i++] + "'",
                            type: "text"
                    ***REMOVED*** ***REMOVED***
                            value: parts[i++],
                            type: "text"
                    ***REMOVED***);
                ***REMOVED***
                    tokens.push(***REMOVED***
                        value: " " + parts[i++] + " ",
                        type: "text"
                ***REMOVED***);
                    if (parts[i+1]) ***REMOVED***
                        options = parts[i+1];
                        tokens.push(***REMOVED***
                            value: "(" + parts[i+1] + ")",
                            type: "text"
                    ***REMOVED***);
                        i += 1;
                ***REMOVED*** else ***REMOVED***
                        i -= 1;
                ***REMOVED***
                    while (i++ < parts.length) ***REMOVED***
                        parts[i] && tokens.push(***REMOVED***
                            value: parts[i],
                            type: "text"
                    ***REMOVED***);
                ***REMOVED***
                    
                    if (replace) ***REMOVED***
                        search = replace;
                        options = "";
                ***REMOVED***
                    
                    if (search) ***REMOVED***
                        if (!/regex/.test(options))
                            search = lang.escapeRegExp(search);
                        if (/whole/.test(options))
                            search = "\\b" + search + "\\b";
                ***REMOVED***
                    
                    var regex = search && safeCreateRegexp(
                        "(" + search + ")",
                        / sensitive/.test(options) ? "g" : "ig"
                    );
                    if (regex) ***REMOVED***
                        stack[0] = state;
                        stack[1] = regex;
                ***REMOVED***
                    
                    return tokens;
            ***REMOVED***
        ***REMOVED***
            ***REMOVED***
                regex : "\\d+",
                token: "constant.numeric"
        ***REMOVED***
        ]
***REMOVED***;
***REMOVED***;

oop.inherits(C9SearchHighlightRules, TextHighlightRules);

exports.C9SearchHighlightRules = C9SearchHighlightRules;

***REMOVED***);

define('ace/mode/matching_brace_outdent', ['require', 'exports', 'module' , 'ace/range'], function(require, exports, module) ***REMOVED***


var Range = require("../range").Range;

var MatchingBraceOutdent = function() ***REMOVED******REMOVED***;

(function() ***REMOVED***

    this.checkOutdent = function(line, input) ***REMOVED***
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\***REMOVED***/.test(input);
***REMOVED***;

    this.autoOutdent = function(doc, row) ***REMOVED***
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\***REMOVED***)/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket(***REMOVED***row: row, column: column***REMOVED***);

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
***REMOVED***;

    this.$getIndent = function(line) ***REMOVED***
        return line.match(/^\s*/)[0];
***REMOVED***;

***REMOVED***).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;
***REMOVED***);


define('ace/mode/folding/c9search', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/range', 'ace/mode/folding/fold_mode'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function() ***REMOVED******REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***

    this.foldingStartMarker = /^(\S.*\:|Searching for.*)$/;
    this.foldingStopMarker = /^(\s+|Found.*)$/;
    
    this.getFoldWidgetRange = function(session, foldStyle, row) ***REMOVED***
        var lines = session.doc.getAllLines(row);
        var line = lines[row];
        var level1 = /^(Found.*|Searching for.*)$/;
        var level2 = /^(\S.*\:|\s*)$/;
        var re = level1.test(line) ? level1 : level2;
        
        var startRow = row;
        var endRow = row;

        if (this.foldingStartMarker.test(line)) ***REMOVED***            
            for (var i = row + 1, l = session.getLength(); i < l; i++) ***REMOVED***
                if (re.test(lines[i]))
                    break;
        ***REMOVED***
            endRow = i;
    ***REMOVED***
        else if (this.foldingStopMarker.test(line)) ***REMOVED***
            for (var i = row - 1; i >= 0; i--) ***REMOVED***
                line = lines[i];
                if (re.test(line))
                    break;
        ***REMOVED***
            startRow = i;
    ***REMOVED***
        if (startRow != endRow) ***REMOVED***
            var col = line.length;
            if (re === level1)
                col = line.search(/\(Found[^)]+\)$|$/);
            return new Range(startRow, col, endRow, 0);
    ***REMOVED***
***REMOVED***;
    
***REMOVED***).call(FoldMode.prototype);

***REMOVED***);

