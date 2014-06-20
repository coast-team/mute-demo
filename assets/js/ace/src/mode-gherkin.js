/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2014, Ajax.org B.V.
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

define('ace/mode/gherkin', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/gherkin_highlight_rules'], function(require, exports, module) ***REMOVED***

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var GherkinHighlightRules = require("./gherkin_highlight_rules").GherkinHighlightRules;

var Mode = function() ***REMOVED***
    this.HighlightRules = GherkinHighlightRules;
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.lineCommentStart = "#";
    this.$id = "ace/mode/gherkin";

    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        var indent = this.$getIndent(line);
        var space2 = "  ";

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        
        console.log(state)
        
        if(line.match("[ ]*\\|")) ***REMOVED***
            indent += "| ";
    ***REMOVED***

        if (tokens.length && tokens[tokens.length-1].type == "comment") ***REMOVED***
            return indent;
    ***REMOVED***
        

        if (state == "start") ***REMOVED***
            if (line.match("Scenario:|Feature:|Scenario\ Outline:|Background:")) ***REMOVED***
                indent += space2;
        ***REMOVED*** else if(line.match("(Given|Then).+(:)$|Examples:")) ***REMOVED***
            	indent += space2;
        ***REMOVED*** else if(line.match("\\*.+")) ***REMOVED***
            	indent += "* ";
        ***REMOVED*** 
    ***REMOVED***
        

        return indent;
***REMOVED***;
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/gherkin_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var stringEscape =  "\\\\(x[0-9A-Fa-f]***REMOVED***2***REMOVED***|[0-7]***REMOVED***3***REMOVED***|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]***REMOVED***8***REMOVED***|u[0-9A-Fa-f]***REMOVED***4***REMOVED***)";

var GherkinHighlightRules = function() ***REMOVED***
    this.$rules = ***REMOVED***
    	start : [***REMOVED***
            token: 'constant.numeric',
            regex: "(?:(?:[1-9]\\d*)|(?:0))"
 		***REMOVED***, ***REMOVED***
    		token : "comment",
    		regex : "#.*$"
    	***REMOVED***, ***REMOVED***
    		token : "keyword",
    		regex : "Feature:|Background:|Scenario:|Scenario\ Outline:|Examples:|Given|When|Then|And|But|\\*",
    	***REMOVED***, ***REMOVED***
            token : "string",           // multi line """ string start
            regex : '"***REMOVED***3***REMOVED***',
            next : "qqstring3"
    ***REMOVED*** ***REMOVED***
            token : "string",           // " string
            regex : '"',
            next : "qqstring"
    ***REMOVED*** ***REMOVED***
        	token : "comment",
        	regex : "@[A-Za-z0-9]+",
        	next : "start"
    ***REMOVED*** ***REMOVED***
        	token : "comment",
        	regex : "<.+>"
    ***REMOVED*** ***REMOVED***
        	token : "comment",
        	regex : "\\| ",
        	next : "table-item"
    ***REMOVED*** ***REMOVED***
        	token : "comment",
        	regex : "\\|$",
        	next : "start"
    ***REMOVED***],
    	"qqstring3" : [ ***REMOVED***
            token : "constant.language.escape",
            regex : stringEscape
    ***REMOVED*** ***REMOVED***
            token : "string", // multi line """ string end
            regex : '"***REMOVED***3***REMOVED***',
            next : "start"
    ***REMOVED*** ***REMOVED***
            defaultToken : "string"
    ***REMOVED***],
    	"qqstring" : [***REMOVED***
            token : "constant.language.escape",
            regex : stringEscape
    ***REMOVED*** ***REMOVED***
            token : "string",
            regex : "\\\\$",
            next  : "qqstring"
    ***REMOVED*** ***REMOVED***
            token : "string",
            regex : '"|$',
            next  : "start"
    ***REMOVED*** ***REMOVED***
            defaultToken: "string"
    ***REMOVED***],
        "table-item" : [***REMOVED***
            token : "string",
            regex : "[A-Za-z0-9 ]*",
            next  : "start"
    ***REMOVED***],
***REMOVED***;
    
***REMOVED***

oop.inherits(GherkinHighlightRules, TextHighlightRules);

exports.GherkinHighlightRules = GherkinHighlightRules;
***REMOVED***);