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

define('ace/ext/whitespace', ['require', 'exports', 'module' , 'ace/lib/lang'], function(require, exports, module) ***REMOVED***


var lang = require("../lib/lang");
exports.$detectIndentation = function(lines, fallback) ***REMOVED***
    var stats = [];
    var changes = [];
    var tabIndents = 0;
    var prevSpaces = 0;
    var max = Math.min(lines.length, 1000);
    for (var i = 0; i < max; i++) ***REMOVED***
        var line = lines[i];
        if (!/^\s*[^*+\-\s]/.test(line))
            continue;

        var tabs = line.match(/^\t*/)[0].length;
        if (line[0] == "\t")
            tabIndents++;

        var spaces = line.match(/^ */)[0].length;
        if (spaces && line[spaces] != "\t") ***REMOVED***
            var diff = spaces - prevSpaces;
            if (diff > 0 && !(prevSpaces%diff) && !(spaces%diff))
                changes[diff] = (changes[diff] || 0) + 1;

            stats[spaces] = (stats[spaces] || 0) + 1;
    ***REMOVED***
        prevSpaces = spaces;
        while (i < max && line[line.length - 1] == "\\")
            line = lines[i++];
***REMOVED***
    
    if (!stats.length)
        return;

    function getScore(indent) ***REMOVED***
        var score = 0;
        for (var i = indent; i < stats.length; i += indent)
            score += stats[i] || 0;
        return score;
***REMOVED***

    var changesTotal = changes.reduce(function(a,b)***REMOVED***return a+b***REMOVED***, 0);

    var first = ***REMOVED***score: 0, length: 0***REMOVED***;
    var spaceIndents = 0;
    for (var i = 1; i < 12; i++) ***REMOVED***
        if (i == 1) ***REMOVED***
            spaceIndents = getScore(i);
            var score = 1;
    ***REMOVED*** else
            var score = getScore(i) / spaceIndents;

        if (changes[i]) ***REMOVED***
            score += changes[i] / changesTotal;
    ***REMOVED***

        if (score > first.score)
            first = ***REMOVED***score: score, length: i***REMOVED***;
***REMOVED***

    if (first.score && first.score > 1.4)
        var tabLength = first.length;

    if (tabIndents > spaceIndents + 1)
        return ***REMOVED***ch: "\t", length: tabLength***REMOVED***;

    if (spaceIndents + 1 > tabIndents)
        return ***REMOVED***ch: " ", length: tabLength***REMOVED***;
***REMOVED***;

exports.detectIndentation = function(session) ***REMOVED***
    var lines = session.getLines(0, 1000);
    var indent = exports.$detectIndentation(lines) || ***REMOVED******REMOVED***;

    if (indent.ch)
        session.setUseSoftTabs(indent.ch == " ");

    if (indent.length)
        session.setTabSize(indent.length);
    return indent;
***REMOVED***;

exports.trimTrailingSpace = function(session, trimEmpty) ***REMOVED***
    var doc = session.getDocument();
    var lines = doc.getAllLines();
    
    var min = trimEmpty ? -1 : 0;

    for (var i = 0, l=lines.length; i < l; i++) ***REMOVED***
        var line = lines[i];
        var index = line.search(/\s+$/);

        if (index > min)
            doc.removeInLine(i, index, line.length);
***REMOVED***
***REMOVED***;

exports.convertIndentation = function(session, ch, len) ***REMOVED***
    var oldCh = session.getTabString()[0];
    var oldLen = session.getTabSize();
    if (!len) len = oldLen;
    if (!ch) ch = oldCh;

    var tab = ch == "\t" ? ch: lang.stringRepeat(ch, len);

    var doc = session.doc;
    var lines = doc.getAllLines();

    var cache = ***REMOVED******REMOVED***;
    var spaceCache = ***REMOVED******REMOVED***;
    for (var i = 0, l=lines.length; i < l; i++) ***REMOVED***
        var line = lines[i];
        var match = line.match(/^\s*/)[0];
        if (match) ***REMOVED***
            var w = session.$getStringScreenWidth(match)[0];
            var tabCount = Math.floor(w/oldLen);
            var reminder = w%oldLen;
            var toInsert = cache[tabCount] || (cache[tabCount] = lang.stringRepeat(tab, tabCount));
            toInsert += spaceCache[reminder] || (spaceCache[reminder] = lang.stringRepeat(" ", reminder));

            if (toInsert != match) ***REMOVED***
                doc.removeInLine(i, 0, match.length);
                doc.insertInLine(***REMOVED***row: i, column: 0***REMOVED***, toInsert);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    session.setTabSize(len);
    session.setUseSoftTabs(ch == " ");
***REMOVED***;

exports.$parseStringArg = function(text) ***REMOVED***
    var indent = ***REMOVED******REMOVED***;
    if (/t/.test(text))
        indent.ch = "\t";
    else if (/s/.test(text))
        indent.ch = " ";
    var m = text.match(/\d+/);
    if (m)
        indent.length = parseInt(m[0], 10);
    return indent;
***REMOVED***;

exports.$parseArg = function(arg) ***REMOVED***
    if (!arg)
        return ***REMOVED******REMOVED***;
    if (typeof arg == "string")
        return exports.$parseStringArg(arg);
    if (typeof arg.text == "string")
        return exports.$parseStringArg(arg.text);
    return arg;
***REMOVED***;

exports.commands = [***REMOVED***
    name: "detectIndentation",
    exec: function(editor) ***REMOVED***
        exports.detectIndentation(editor.session);
***REMOVED***
***REMOVED***, ***REMOVED***
    name: "trimTrailingSpace",
    exec: function(editor) ***REMOVED***
        exports.trimTrailingSpace(editor.session);
***REMOVED***
***REMOVED***, ***REMOVED***
    name: "convertIndentation",
    exec: function(editor, arg) ***REMOVED***
        var indent = exports.$parseArg(arg);
        exports.convertIndentation(editor.session, indent.ch, indent.length);
***REMOVED***
***REMOVED***, ***REMOVED***
    name: "setIndentation",
    exec: function(editor, arg) ***REMOVED***
        var indent = exports.$parseArg(arg);
        indent.length && editor.session.setTabSize(indent.length);
        indent.ch && editor.session.setUseSoftTabs(indent.ch == " ");
***REMOVED***
***REMOVED***];

***REMOVED***);
