/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2013, Ajax.org B.V.
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
 * Garen J. Torikian
 *
 * ***** END LICENSE BLOCK ***** */

__ace_shadowed__.define('ace/mode/toml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/toml_highlight_rules', 'ace/mode/folding/ini'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var TomlHighlightRules = require("./toml_highlight_rules").TomlHighlightRules;
var FoldMode = require("./folding/ini").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = TomlHighlightRules;
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.lineCommentStart = "#";
    this.$id = "ace/mode/toml";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

__ace_shadowed__.define('ace/mode/toml_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var TomlHighlightRules = function() ***REMOVED***
    var keywordMapper = this.createKeywordMapper(***REMOVED***
        "constant.language.boolean": "true|false"
***REMOVED*** "identifier");

    var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*\\b";

    this.$rules = ***REMOVED***
    "start": [
        ***REMOVED***
            token: "comment.toml",
            regex: /#.*$/
    ***REMOVED***
        ***REMOVED***
            token : "string",
            regex : '"(?=.)',
            next  : "qqstring"
    ***REMOVED***
        ***REMOVED***
            token: ["variable.keygroup.toml"],
            regex: "(?:^\\s*)(\\[([^\\]]+)\\])"
    ***REMOVED***
        ***REMOVED***
            token : keywordMapper,
            regex : identifierRe
    ***REMOVED***
        ***REMOVED***
           token : "support.date.toml",
           regex: "\\d***REMOVED***4***REMOVED***-\\d***REMOVED***2***REMOVED***-\\d***REMOVED***2***REMOVED***(T)\\d***REMOVED***2***REMOVED***:\\d***REMOVED***2***REMOVED***:\\d***REMOVED***2***REMOVED***(Z)"
    ***REMOVED***
        ***REMOVED***
           token: "constant.numeric.toml",
           regex: "-?\\d+(\\.?\\d+)?"
    ***REMOVED***
    ],
    "qqstring" : [
        ***REMOVED***
            token : "string",
            regex : "\\\\$",
            next  : "qqstring"
    ***REMOVED***
        ***REMOVED***
            token : "constant.language.escape",
            regex : '\\\\[0tnr"\\\\]'
    ***REMOVED***
        ***REMOVED***
            token : "string",
            regex : '"|$',
            next  : "start"
    ***REMOVED***
        ***REMOVED***
            defaultToken: "string"
    ***REMOVED***
    ]
***REMOVED***

***REMOVED***;

oop.inherits(TomlHighlightRules, TextHighlightRules);

exports.TomlHighlightRules = TomlHighlightRules;
***REMOVED***);

__ace_shadowed__.define('ace/mode/folding/ini', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/range', 'ace/mode/folding/fold_mode'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function() ***REMOVED***
***REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***

    this.foldingStartMarker = /^\s*\[([^\])]*)]\s*(?:$|[;#])/;

    this.getFoldWidgetRange = function(session, foldStyle, row) ***REMOVED***
        var re = this.foldingStartMarker;
        var line = session.getLine(row);
        
        var m = line.match(re);
        
        if (!m) return;
        
        var startName = m[1] + ".";
        
        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) ***REMOVED***
            line = session.getLine(row);
            if (/^\s*$/.test(line))
                continue;
            m = line.match(re);
            if (m && m[1].lastIndexOf(startName, 0) !== 0)
                break;

            endRow = row;
    ***REMOVED***

        if (endRow > startRow) ***REMOVED***
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
    ***REMOVED***
***REMOVED***;

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
