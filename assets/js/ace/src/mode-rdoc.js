/*
 * rdoc.js
 *
 * Copyright (C) 2009-11 by RStudio, Inc.
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
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
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *
 */
define('ace/mode/rdoc', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/text_highlight_rules', 'ace/mode/rdoc_highlight_rules', 'ace/mode/matching_brace_outdent'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var RDocHighlightRules = require("./rdoc_highlight_rules").RDocHighlightRules;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;

var Mode = function(suppressHighlighting) ***REMOVED***
	this.HighlightRules = RDocHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        return this.$getIndent(line);
***REMOVED***;
    this.$id = "ace/mode/rdoc";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);
define('ace/mode/rdoc_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/mode/text_highlight_rules', 'ace/mode/latex_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var lang = require("../lib/lang");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var LaTeXHighlightRules = require("./latex_highlight_rules");

var RDocHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED***
        "start" : [
	        ***REMOVED***
	            token : "comment",
	            regex : "%.*$"
	    ***REMOVED*** ***REMOVED***
	            token : "text", // non-command
	            regex : "\\\\[$&%#\\***REMOVED***\\***REMOVED***]"
	    ***REMOVED*** ***REMOVED***
	            token : "keyword", // command
	            regex : "\\\\(?:name|alias|method|S3method|S4method|item|code|preformatted|kbd|pkg|var|env|option|command|author|email|url|source|cite|acronym|href|code|preformatted|link|eqn|deqn|keyword|usage|examples|dontrun|dontshow|figure|if|ifelse|Sexpr|RdOpts|inputencoding|usepackage)\\b",
               next : "nospell"
	    ***REMOVED*** ***REMOVED***
	            token : "keyword", // command
	            regex : "\\\\(?:[a-zA-z0-9]+|[^a-zA-z0-9])"
	    ***REMOVED*** ***REMOVED***
               token : "paren.keyword.operator",
	            regex : "[[(***REMOVED***]"
	    ***REMOVED*** ***REMOVED***
               token : "paren.keyword.operator",
	            regex : "[\\])***REMOVED***]"
	    ***REMOVED*** ***REMOVED***
	            token : "text",
	            regex : "\\s+"
	    ***REMOVED***
        ],
        "nospell" : [
           ***REMOVED***
               token : "comment",
               regex : "%.*$",
               next : "start"
       ***REMOVED*** ***REMOVED***
               token : "nospell.text", // non-command
               regex : "\\\\[$&%#\\***REMOVED***\\***REMOVED***]"
       ***REMOVED*** ***REMOVED***
               token : "keyword", // command
               regex : "\\\\(?:name|alias|method|S3method|S4method|item|code|preformatted|kbd|pkg|var|env|option|command|author|email|url|source|cite|acronym|href|code|preformatted|link|eqn|deqn|keyword|usage|examples|dontrun|dontshow|figure|if|ifelse|Sexpr|RdOpts|inputencoding|usepackage)\\b"
       ***REMOVED*** ***REMOVED***
               token : "keyword", // command
               regex : "\\\\(?:[a-zA-z0-9]+|[^a-zA-z0-9])",
               next : "start"
       ***REMOVED*** ***REMOVED***
               token : "paren.keyword.operator",
               regex : "[[(***REMOVED***]"
       ***REMOVED*** ***REMOVED***
               token : "paren.keyword.operator",
               regex : "[\\])]"
       ***REMOVED*** ***REMOVED***
               token : "paren.keyword.operator",
               regex : "***REMOVED***",
               next : "start"
       ***REMOVED*** ***REMOVED***
               token : "nospell.text",
               regex : "\\s+"
       ***REMOVED*** ***REMOVED***
               token : "nospell.text",
               regex : "\\w+"
       ***REMOVED***
        ]
***REMOVED***;
***REMOVED***;

oop.inherits(RDocHighlightRules, TextHighlightRules);

exports.RDocHighlightRules = RDocHighlightRules;
***REMOVED***);
define('ace/mode/latex_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var LatexHighlightRules = function() ***REMOVED***   
    this.$rules = ***REMOVED***
        "start" : [***REMOVED***
            token : "keyword",
            regex : "\\\\(?:[^a-zA-Z]|[a-zA-Z]+)"
    ***REMOVED*** ***REMOVED***
            token : "lparen",
            regex : "[[(***REMOVED***]"
    ***REMOVED*** ***REMOVED***
            token : "rparen",
            regex : "[\\])***REMOVED***]"
    ***REMOVED*** ***REMOVED***
            token : "string",
            regex : "\\$(?:(?:\\\\.)|(?:[^\\$\\\\]))*?\\$"
    ***REMOVED*** ***REMOVED***
            token : "comment",
            regex : "%.*$"
    ***REMOVED***]
***REMOVED***;
***REMOVED***;

oop.inherits(LatexHighlightRules, TextHighlightRules);

exports.LatexHighlightRules = LatexHighlightRules;

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
