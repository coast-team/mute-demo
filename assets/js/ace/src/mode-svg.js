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

define('ace/mode/svg', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/xml', 'ace/mode/javascript', 'ace/mode/svg_highlight_rules', 'ace/mode/folding/mixed', 'ace/mode/folding/xml', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var XmlMode = require("./xml").Mode;
var JavaScriptMode = require("./javascript").Mode;
var SvgHighlightRules = require("./svg_highlight_rules").SvgHighlightRules;
var MixedFoldMode = require("./folding/mixed").FoldMode;
var XmlFoldMode = require("./folding/xml").FoldMode;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    XmlMode.call(this);
    
    this.HighlightRules = SvgHighlightRules;
    
    this.createModeDelegates(***REMOVED***
        "js-": JavaScriptMode
***REMOVED***);
    
    this.foldingRules = new MixedFoldMode(new XmlFoldMode(), ***REMOVED***
        "js-": new CStyleFoldMode()
***REMOVED***);
***REMOVED***;

oop.inherits(Mode, XmlMode);

(function() ***REMOVED***

    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        return this.$getIndent(line);
***REMOVED***;
    

    this.$id = "ace/mode/svg";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/xml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/mode/text', 'ace/mode/xml_highlight_rules', 'ace/mode/behaviour/xml', 'ace/mode/folding/xml'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var lang = require("../lib/lang");
var TextMode = require("./text").Mode;
var XmlHighlightRules = require("./xml_highlight_rules").XmlHighlightRules;
var XmlBehaviour = require("./behaviour/xml").XmlBehaviour;
var XmlFoldMode = require("./folding/xml").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = XmlHighlightRules;
    this.$behaviour = new XmlBehaviour();
    this.foldingRules = new XmlFoldMode();
***REMOVED***;

oop.inherits(Mode, TextMode);

(function() ***REMOVED***

    this.voidElements = lang.arrayToMap([]);

    this.blockComment = ***REMOVED***start: "<!--", end: "-->"***REMOVED***;

    this.$id = "ace/mode/xml";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/xml_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var XmlHighlightRules = function(normalize) ***REMOVED***
    this.$rules = ***REMOVED***
        start : [
            ***REMOVED***token : "string.cdata.xml", regex : "<\\!\\[CDATA\\[", next : "cdata"***REMOVED***,
            ***REMOVED***
                token : ["punctuation.xml-decl.xml", "keyword.xml-decl.xml"],
                regex : "(<\\?)(xml)(?=[\\s])", next : "xml_decl", caseInsensitive: true
        ***REMOVED***
            ***REMOVED***
                token : ["punctuation.instruction.xml", "keyword.instruction.xml"],
                regex : "(<\\?)([-_a-zA-Z0-9]+)", next : "processing_instruction",
        ***REMOVED***
            ***REMOVED***token : "comment.xml", regex : "<\\!--", next : "comment"***REMOVED***,
            ***REMOVED***
                token : ["xml-pe.doctype.xml", "xml-pe.doctype.xml"],
                regex : "(<\\!)(DOCTYPE)(?=[\\s])", next : "doctype", caseInsensitive: true
        ***REMOVED***
            ***REMOVED***include : "tag"***REMOVED***,
            ***REMOVED***token : "text.end-tag-open.xml", regex: "</"***REMOVED***,
            ***REMOVED***token : "text.tag-open.xml", regex: "<"***REMOVED***,
            ***REMOVED***include : "reference"***REMOVED***,
            ***REMOVED***defaultToken : "text.xml"***REMOVED***
        ],

        xml_decl : [***REMOVED***
            token : "entity.other.attribute-name.decl-attribute-name.xml",
            regex : "(?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+"
    ***REMOVED*** ***REMOVED***
            token : "keyword.operator.decl-attribute-equals.xml",
            regex : "="
    ***REMOVED*** ***REMOVED***
            include: "whitespace"
    ***REMOVED*** ***REMOVED***
            include: "string"
    ***REMOVED*** ***REMOVED***
            token : "punctuation.xml-decl.xml",
            regex : "\\?>",
            next : "start"
    ***REMOVED***],

        processing_instruction : [
            ***REMOVED***token : "punctuation.instruction.xml", regex : "\\?>", next : "start"***REMOVED***,
            ***REMOVED***defaultToken : "instruction.xml"***REMOVED***
        ],

        doctype : [
            ***REMOVED***include : "whitespace"***REMOVED***,
            ***REMOVED***include : "string"***REMOVED***,
            ***REMOVED***token : "xml-pe.doctype.xml", regex : ">", next : "start"***REMOVED***,
            ***REMOVED***token : "xml-pe.xml", regex : "[-_a-zA-Z0-9:]+"***REMOVED***,
            ***REMOVED***token : "punctuation.int-subset", regex : "\\[", push : "int_subset"***REMOVED***
        ],

        int_subset : [***REMOVED***
            token : "text.xml",
            regex : "\\s+"
    ***REMOVED*** ***REMOVED***
            token: "punctuation.int-subset.xml",
            regex: "]",
            next: "pop"
    ***REMOVED*** ***REMOVED***
            token : ["punctuation.markup-decl.xml", "keyword.markup-decl.xml"],
            regex : "(<\\!)([-_a-zA-Z0-9]+)",
            push : [***REMOVED***
                token : "text",
                regex : "\\s+"
        ***REMOVED***
            ***REMOVED***
                token : "punctuation.markup-decl.xml",
                regex : ">",
                next : "pop"
        ***REMOVED***
            ***REMOVED***include : "string"***REMOVED***]
    ***REMOVED***],

        cdata : [
            ***REMOVED***token : "string.cdata.xml", regex : "\\]\\]>", next : "start"***REMOVED***,
            ***REMOVED***token : "text.xml", regex : "\\s+"***REMOVED***,
            ***REMOVED***token : "text.xml", regex : "(?:[^\\]]|\\](?!\\]>))+"***REMOVED***
        ],

        comment : [
            ***REMOVED***token : "comment.xml", regex : "-->", next : "start"***REMOVED***,
            ***REMOVED***defaultToken : "comment.xml"***REMOVED***
        ],

        reference : [***REMOVED***
            token : "constant.language.escape.reference.xml",
            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
    ***REMOVED***],

        attr_reference : [***REMOVED***
            token : "constant.language.escape.reference.attribute-value.xml",
            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
    ***REMOVED***],

        tag : [***REMOVED***
            token : ["meta.tag.punctuation.tag-open.xml", "meta.tag.punctuation.end-tag-open.xml", "meta.tag.tag-name.xml"],
            regex : "(?:(<)|(</))((?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+)",
            next: [
                ***REMOVED***include : "attributes"***REMOVED***,
                ***REMOVED***token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : "start"***REMOVED***
            ]
    ***REMOVED***],

        tag_whitespace : [
            ***REMOVED***token : "text.tag-whitespace.xml", regex : "\\s+"***REMOVED***
        ],
        whitespace : [
            ***REMOVED***token : "text.whitespace.xml", regex : "\\s+"***REMOVED***
        ],
        string: [***REMOVED***
            token : "string.xml",
            regex : "'",
            push : [
                ***REMOVED***token : "string.xml", regex: "'", next: "pop"***REMOVED***,
                ***REMOVED***defaultToken : "string.xml"***REMOVED***
            ]
    ***REMOVED*** ***REMOVED***
            token : "string.xml",
            regex : '"',
            push : [
                ***REMOVED***token : "string.xml", regex: '"', next: "pop"***REMOVED***,
                ***REMOVED***defaultToken : "string.xml"***REMOVED***
            ]
    ***REMOVED***],

        attributes: [***REMOVED***
            token : "entity.other.attribute-name.xml",
            regex : "(?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+"
    ***REMOVED*** ***REMOVED***
            token : "keyword.operator.attribute-equals.xml",
            regex : "="
    ***REMOVED*** ***REMOVED***
            include: "tag_whitespace"
    ***REMOVED*** ***REMOVED***
            include: "attribute_value"
    ***REMOVED***],

        attribute_value: [***REMOVED***
            token : "string.attribute-value.xml",
            regex : "'",
            push : [
                ***REMOVED***token : "string.attribute-value.xml", regex: "'", next: "pop"***REMOVED***,
                ***REMOVED***include : "attr_reference"***REMOVED***,
                ***REMOVED***defaultToken : "string.attribute-value.xml"***REMOVED***
            ]
    ***REMOVED*** ***REMOVED***
            token : "string.attribute-value.xml",
            regex : '"',
            push : [
                ***REMOVED***token : "string.attribute-value.xml", regex: '"', next: "pop"***REMOVED***,
                ***REMOVED***include : "attr_reference"***REMOVED***,
                ***REMOVED***defaultToken : "string.attribute-value.xml"***REMOVED***
            ]
    ***REMOVED***]
***REMOVED***;

    if (this.constructor === XmlHighlightRules)
        this.normalizeRules();
***REMOVED***;


(function() ***REMOVED***

    this.embedTagRules = function(HighlightRules, prefix, tag)***REMOVED***
        this.$rules.tag.unshift(***REMOVED***
            token : ["meta.tag.punctuation.tag-open.xml", "meta.tag." + tag + ".tag-name.xml"],
            regex : "(<)(" + tag + "(?=\\s|>|$))",
            next: [
                ***REMOVED***include : "attributes"***REMOVED***,
                ***REMOVED***token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : prefix + "start"***REMOVED***
            ]
    ***REMOVED***);

        this.$rules[tag + "-end"] = [
            ***REMOVED***include : "attributes"***REMOVED***,
            ***REMOVED***token : "meta.tag.punctuation.tag-close.xml", regex : "/?>",  next: "start",
                onMatch : function(value, currentState, stack) ***REMOVED***
                    stack.splice(0);
                    return this.token;
        ***REMOVED******REMOVED***
        ]

        this.embedRules(HighlightRules, prefix, [***REMOVED***
            token: ["meta.tag.punctuation.end-tag-open.xml", "meta.tag." + tag + ".tag-name.xml"],
            regex : "(</)(" + tag + "(?=\\s|>|$))",
            next: tag + "-end"
    ***REMOVED*** ***REMOVED***
            token: "string.cdata.xml",
            regex : "<\\!\\[CDATA\\["
    ***REMOVED*** ***REMOVED***
            token: "string.cdata.xml",
            regex : "\\]\\]>"
    ***REMOVED***]);
***REMOVED***;

***REMOVED***).call(TextHighlightRules.prototype);

oop.inherits(XmlHighlightRules, TextHighlightRules);

exports.XmlHighlightRules = XmlHighlightRules;
***REMOVED***);

define('ace/mode/behaviour/xml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/behaviour', 'ace/token_iterator'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var Behaviour = require("../behaviour").Behaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;

function is(token, type) ***REMOVED***
    return token.type.lastIndexOf(type + ".xml") > -1;
***REMOVED***

var XmlBehaviour = function () ***REMOVED***

    this.add("string_dquotes", "insertion", function (state, action, editor, session, text) ***REMOVED***
        if (text == '"' || text == "'") ***REMOVED***
            var quote = text;
            var selected = session.doc.getTextRange(editor.getSelectionRange());
            if (selected !== "" && selected !== "'" && selected != '"' && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: quote + selected + quote,
                    selection: false
            ***REMOVED***;
        ***REMOVED***

            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();

            if (rightChar == quote && (is(token, "attribute-value") || is(token, "string"))) ***REMOVED***
                return ***REMOVED***
                    text: "",
                    selection: [1, 1]
            ***REMOVED***;
        ***REMOVED***

            if (!token)
                token = iterator.stepBackward();

            if (!token)
                return;

            while (is(token, "tag-whitespace") || is(token, "whitespace")) ***REMOVED***
                token = iterator.stepBackward();
        ***REMOVED***
            var rightSpace = !rightChar || rightChar.match(/\s/);
            if (is(token, "attribute-equals") && (rightSpace || rightChar == '>') || (is(token, "decl-attribute-equals") && (rightSpace || rightChar == '?'))) ***REMOVED***
                return ***REMOVED***
                    text: quote + quote,
                    selection: [1, 1]
            ***REMOVED***;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("string_dquotes", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && (selected == '"' || selected == "'")) ***REMOVED***
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == selected) ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("autoclosing", "insertion", function (state, action, editor, session, text) ***REMOVED***
        if (text == '>') ***REMOVED***
            var position = editor.getCursorPosition();
            var iterator = new TokenIterator(session, position.row, position.column);
            var token = iterator.getCurrentToken() || iterator.stepBackward();
            if (!token || !(is(token, "tag-name") || is(token, "tag-whitespace") || is(token, "attribute-name") || is(token, "attribute-equals") || is(token, "attribute-value")))
                return;
            if (is(token, "reference.attribute-value"))
                return;
            if (is(token, "attribute-value")) ***REMOVED***
                var firstChar = token.value.charAt(0);
                if (firstChar == '"' || firstChar == "'") ***REMOVED***
                    var lastChar = token.value.charAt(token.value.length - 1);
                    var tokenEnd = iterator.getCurrentTokenColumn() + token.value.length;
                    if (tokenEnd > position.column || tokenEnd == position.column && firstChar != lastChar)
                        return;
            ***REMOVED***
        ***REMOVED***
            while (!is(token, "tag-name")) ***REMOVED***
                token = iterator.stepBackward();
        ***REMOVED***

            var tokenRow = iterator.getCurrentTokenRow();
            var tokenColumn = iterator.getCurrentTokenColumn();
            if (is(iterator.stepBackward(), "end-tag-open"))
                return;

            var element = token.value;
            if (tokenRow == position.row)
                element = element.substring(0, position.column - tokenColumn);

            if (this.voidElements.hasOwnProperty(element.toLowerCase()))
                 return;

            return ***REMOVED***
               text: '>' + '</' + element + '>',
               selection: [1, 1]
        ***REMOVED***;
    ***REMOVED***
***REMOVED***);

    this.add('autoindent', 'insertion', function (state, action, editor, session, text) ***REMOVED***
        if (text == "\n") ***REMOVED***
            var cursor = editor.getCursorPosition();
            var line = session.getLine(cursor.row);
            var rightChars = line.substring(cursor.column, cursor.column + 2);
            if (rightChars == '</') ***REMOVED***
                var next_indent = this.$getIndent(line);
                var indent = next_indent + session.getTabString();

                return ***REMOVED***
                    text: '\n' + indent + '\n' + next_indent,
                    selection: [1, indent.length, 1, indent.length]
            ***REMOVED***;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);
    
***REMOVED***;

oop.inherits(XmlBehaviour, Behaviour);

exports.XmlBehaviour = XmlBehaviour;
***REMOVED***);

define('ace/mode/folding/xml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/range', 'ace/mode/folding/fold_mode', 'ace/token_iterator'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var lang = require("../../lib/lang");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;
var TokenIterator = require("../../token_iterator").TokenIterator;

var FoldMode = exports.FoldMode = function(voidElements, optionalEndTags) ***REMOVED***
    BaseFoldMode.call(this);
    this.voidElements = oop.mixin(voidElements || ***REMOVED******REMOVED***, optionalEndTags || ***REMOVED******REMOVED***);
***REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

var Tag = function() ***REMOVED***
    this.tagName = "";
    this.closing = false;
    this.selfClosing = false;
    this.start = ***REMOVED***row: 0, column: 0***REMOVED***;
    this.end = ***REMOVED***row: 0, column: 0***REMOVED***;
***REMOVED***;

function is(token, type) ***REMOVED***
    return token.type.lastIndexOf(type + ".xml") > -1;
***REMOVED***

(function() ***REMOVED***

    this.getFoldWidget = function(session, foldStyle, row) ***REMOVED***
        var tag = this._getFirstTagInLine(session, row);

        if (!tag)
            return "";

        if (tag.closing || (!tag.tagName && tag.selfClosing))
            return foldStyle == "markbeginend" ? "end" : "";

        if (!tag.tagName || tag.selfClosing || this.voidElements.hasOwnProperty(tag.tagName.toLowerCase()))
            return "";

        if (this._findEndTagInLine(session, row, tag.tagName, tag.end.column))
            return "";

        return "start";
***REMOVED***;
    this._getFirstTagInLine = function(session, row) ***REMOVED***
        var tokens = session.getTokens(row);
        var tag = new Tag();

        for (var i = 0; i < tokens.length; i++) ***REMOVED***
            var token = tokens[i];
            if (is(token, "tag-open")) ***REMOVED***
                tag.end.column = tag.start.column + token.value.length;
                tag.closing = is(token, "end-tag-open");
                token = tokens[++i];
                if (!token)
                    return null;
                tag.tagName = token.value;
                tag.end.column += token.value.length;
                for (i++; i < tokens.length; i++) ***REMOVED***
                    token = tokens[i];
                    tag.end.column += token.value.length;
                    if (is(token, "tag-close")) ***REMOVED***
                        tag.selfClosing = token.value == '/>';
                        break;
                ***REMOVED***
            ***REMOVED***
                return tag;
        ***REMOVED*** else if (is(token, "tag-close")) ***REMOVED***
                tag.selfClosing = token.value == '/>';
                return tag;
        ***REMOVED***
            tag.start.column += token.value.length;
    ***REMOVED***

        return null;
***REMOVED***;

    this._findEndTagInLine = function(session, row, tagName, startColumn) ***REMOVED***
        var tokens = session.getTokens(row);
        var column = 0;
        for (var i = 0; i < tokens.length; i++) ***REMOVED***
            var token = tokens[i];
            column += token.value.length;
            if (column < startColumn)
                continue;
            if (is(token, "end-tag-open")) ***REMOVED***
                token = tokens[i + 1];
                if (token && token.value == tagName)
                    return true;
        ***REMOVED***
    ***REMOVED***
        return false;
***REMOVED***;
    this._readTagForward = function(iterator) ***REMOVED***
        var token = iterator.getCurrentToken();
        if (!token)
            return null;

        var tag = new Tag();
        do ***REMOVED***
            if (is(token, "tag-open")) ***REMOVED***
                tag.closing = is(token, "end-tag-open");
                tag.start.row = iterator.getCurrentTokenRow();
                tag.start.column = iterator.getCurrentTokenColumn();
        ***REMOVED*** else if (is(token, "tag-name")) ***REMOVED***
                tag.tagName = token.value;
        ***REMOVED*** else if (is(token, "tag-close")) ***REMOVED***
                tag.selfClosing = token.value == "/>";
                tag.end.row = iterator.getCurrentTokenRow();
                tag.end.column = iterator.getCurrentTokenColumn() + token.value.length;
                iterator.stepForward();
                return tag;
        ***REMOVED***
    ***REMOVED*** while(token = iterator.stepForward());

        return null;
***REMOVED***;
    
    this._readTagBackward = function(iterator) ***REMOVED***
        var token = iterator.getCurrentToken();
        if (!token)
            return null;

        var tag = new Tag();
        do ***REMOVED***
            if (is(token, "tag-open")) ***REMOVED***
                tag.closing = is(token, "end-tag-open");
                tag.start.row = iterator.getCurrentTokenRow();
                tag.start.column = iterator.getCurrentTokenColumn();
                iterator.stepBackward();
                return tag;
        ***REMOVED*** else if (is(token, "tag-name")) ***REMOVED***
                tag.tagName = token.value;
        ***REMOVED*** else if (is(token, "tag-close")) ***REMOVED***
                tag.selfClosing = token.value == "/>";
                tag.end.row = iterator.getCurrentTokenRow();
                tag.end.column = iterator.getCurrentTokenColumn() + token.value.length;
        ***REMOVED***
    ***REMOVED*** while(token = iterator.stepBackward());

        return null;
***REMOVED***;
    
    this._pop = function(stack, tag) ***REMOVED***
        while (stack.length) ***REMOVED***
            
            var top = stack[stack.length-1];
            if (!tag || top.tagName == tag.tagName) ***REMOVED***
                return stack.pop();
        ***REMOVED***
            else if (this.voidElements.hasOwnProperty(tag.tagName)) ***REMOVED***
                return;
        ***REMOVED***
            else if (this.voidElements.hasOwnProperty(top.tagName)) ***REMOVED***
                stack.pop();
                continue;
        ***REMOVED*** else ***REMOVED***
                return null;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    
    this.getFoldWidgetRange = function(session, foldStyle, row) ***REMOVED***
        var firstTag = this._getFirstTagInLine(session, row);
        
        if (!firstTag)
            return null;
        
        var isBackward = firstTag.closing || firstTag.selfClosing;
        var stack = [];
        var tag;
        
        if (!isBackward) ***REMOVED***
            var iterator = new TokenIterator(session, row, firstTag.start.column);
            var start = ***REMOVED***
                row: row,
                column: firstTag.start.column + firstTag.tagName.length + 2
        ***REMOVED***;
            while (tag = this._readTagForward(iterator)) ***REMOVED***
                if (tag.selfClosing) ***REMOVED***
                    if (!stack.length) ***REMOVED***
                        tag.start.column += tag.tagName.length + 2;
                        tag.end.column -= 2;
                        return Range.fromPoints(tag.start, tag.end);
                ***REMOVED*** else
                        continue;
            ***REMOVED***
                
                if (tag.closing) ***REMOVED***
                    this._pop(stack, tag);
                    if (stack.length == 0)
                        return Range.fromPoints(start, tag.start);
            ***REMOVED***
                else ***REMOVED***
                    stack.push(tag);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        else ***REMOVED***
            var iterator = new TokenIterator(session, row, firstTag.end.column);
            var end = ***REMOVED***
                row: row,
                column: firstTag.start.column
        ***REMOVED***;
            
            while (tag = this._readTagBackward(iterator)) ***REMOVED***
                if (tag.selfClosing) ***REMOVED***
                    if (!stack.length) ***REMOVED***
                        tag.start.column += tag.tagName.length + 2;
                        tag.end.column -= 2;
                        return Range.fromPoints(tag.start, tag.end);
                ***REMOVED*** else
                        continue;
            ***REMOVED***
                
                if (!tag.closing) ***REMOVED***
                    this._pop(stack, tag);
                    if (stack.length == 0) ***REMOVED***
                        tag.start.column += tag.tagName.length + 2;
                        return Range.fromPoints(tag.start, end);
                ***REMOVED***
            ***REMOVED***
                else ***REMOVED***
                    stack.push(tag);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        
***REMOVED***;

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);

define('ace/mode/javascript', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/javascript_highlight_rules', 'ace/mode/matching_brace_outdent', 'ace/range', 'ace/worker/worker_client', 'ace/mode/behaviour/cstyle', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var JavaScriptHighlightRules = require("./javascript_highlight_rules").JavaScriptHighlightRules;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var Range = require("../range").Range;
var WorkerClient = require("../worker/worker_client").WorkerClient;
var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = JavaScriptHighlightRules;
    
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new CStyleFoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***

    this.lineCommentStart = "//";
    this.blockComment = ***REMOVED***start: "/*", end: "*/"***REMOVED***;

    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") ***REMOVED***
            return indent;
    ***REMOVED***

        if (state == "start" || state == "no_regex") ***REMOVED***
            var match = line.match(/^.*(?:\bcase\b.*\:|[\***REMOVED***\(\[])\s*$/);
            if (match) ***REMOVED***
                indent += tab;
        ***REMOVED***
    ***REMOVED*** else if (state == "doc-start") ***REMOVED***
            if (endState == "start" || endState == "no_regex") ***REMOVED***
                return "";
        ***REMOVED***
            var match = line.match(/^\s*(\/?)\*/);
            if (match) ***REMOVED***
                if (match[1]) ***REMOVED***
                    indent += " ";
            ***REMOVED***
                indent += "* ";
        ***REMOVED***
    ***REMOVED***

        return indent;
***REMOVED***;

    this.checkOutdent = function(state, line, input) ***REMOVED***
        return this.$outdent.checkOutdent(line, input);
***REMOVED***;

    this.autoOutdent = function(state, doc, row) ***REMOVED***
        this.$outdent.autoOutdent(doc, row);
***REMOVED***;

    this.createWorker = function(session) ***REMOVED***
        var worker = new WorkerClient(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
        worker.attachToDocument(session.getDocument());

        worker.on("jslint", function(results) ***REMOVED***
            session.setAnnotations(results.data);
    ***REMOVED***);

        worker.on("terminate", function() ***REMOVED***
            session.clearAnnotations();
    ***REMOVED***);

        return worker;
***REMOVED***;

    this.$id = "ace/mode/javascript";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/javascript_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/doc_comment_highlight_rules', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var JavaScriptHighlightRules = function() ***REMOVED***
    var keywordMapper = this.createKeywordMapper(***REMOVED***
        "variable.language":
            "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|"  + // Constructors
            "Namespace|QName|XML|XMLList|"                                             + // E4X
            "ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|"   +
            "Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|"                    +
            "Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|"   + // Errors
            "SyntaxError|TypeError|URIError|"                                          +
            "decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|" + // Non-constructor functions
            "isNaN|parseFloat|parseInt|"                                               +
            "JSON|Math|"                                                               + // Other
            "this|arguments|prototype|window|document"                                 , // Pseudo
        "keyword":
            "const|yield|import|get|set|" +
            "break|case|catch|continue|default|delete|do|else|finally|for|function|" +
            "if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|" +
            "__parent__|__count__|escape|unescape|with|__proto__|" +
            "class|enum|extends|super|export|implements|private|public|interface|package|protected|static",
        "storage.type":
            "const|let|var|function",
        "constant.language":
            "null|Infinity|NaN|undefined",
        "support.function":
            "alert",
        "constant.language.boolean": "true|false"
***REMOVED*** "identifier");
    var kwBeforeRe = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void";
    var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*\\b";

    var escapedRe = "\\\\(?:x[0-9a-fA-F]***REMOVED***2***REMOVED***|" + // hex
        "u[0-9a-fA-F]***REMOVED***4***REMOVED***|" + // unicode
        "[0-2][0-7]***REMOVED***0,2***REMOVED***|" + // oct
        "3[0-6][0-7]?|" + // oct
        "37[0-7]?|" + // oct
        "[4-7][0-7]?|" + //oct
        ".)";

    this.$rules = ***REMOVED***
        "no_regex" : [
            ***REMOVED***
                token : "comment",
                regex : "\\/\\/",
                next : "line_comment"
        ***REMOVED***
            DocCommentHighlightRules.getStartRule("doc-start"),
            ***REMOVED***
                token : "comment", // multi line comment
                regex : /\/\*/,
                next : "comment"
        ***REMOVED*** ***REMOVED***
                token : "string",
                regex : "'(?=.)",
                next  : "qstring"
        ***REMOVED*** ***REMOVED***
                token : "string",
                regex : '"(?=.)',
                next  : "qqstring"
        ***REMOVED*** ***REMOVED***
                token : "constant.numeric", // hex
                regex : /0[xX][0-9a-fA-F]+\b/
        ***REMOVED*** ***REMOVED***
                token : "constant.numeric", // float
                regex : /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
        ***REMOVED*** ***REMOVED***
                token : [
                    "storage.type", "punctuation.operator", "support.function",
                    "punctuation.operator", "entity.name.function", "text","keyword.operator"
                ],
                regex : "(" + identifierRe + ")(\\.)(prototype)(\\.)(" + identifierRe +")(\\s*)(=)",
                next: "function_arguments"
        ***REMOVED*** ***REMOVED***
                token : [
                    "storage.type", "punctuation.operator", "entity.name.function", "text",
                    "keyword.operator", "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
        ***REMOVED*** ***REMOVED***
                token : [
                    "entity.name.function", "text", "keyword.operator", "text", "storage.type",
                    "text", "paren.lparen"
                ],
                regex : "(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
        ***REMOVED*** ***REMOVED***
                token : [
                    "storage.type", "punctuation.operator", "entity.name.function", "text",
                    "keyword.operator", "text",
                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",
                next: "function_arguments"
        ***REMOVED*** ***REMOVED***
                token : [
                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex : "(function)(\\s+)(" + identifierRe + ")(\\s*)(\\()",
                next: "function_arguments"
        ***REMOVED*** ***REMOVED***
                token : [
                    "entity.name.function", "text", "punctuation.operator",
                    "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
        ***REMOVED*** ***REMOVED***
                token : [
                    "text", "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(:)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
        ***REMOVED*** ***REMOVED***
                token : "keyword",
                regex : "(?:" + kwBeforeRe + ")\\b",
                next : "start"
        ***REMOVED*** ***REMOVED***
                token : ["punctuation.operator", "support.function"],
                regex : /(\.)(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/
        ***REMOVED*** ***REMOVED***
                token : ["punctuation.operator", "support.function.dom"],
                regex : /(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/
        ***REMOVED*** ***REMOVED***
                token : ["punctuation.operator", "support.constant"],
                regex : /(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/
        ***REMOVED*** ***REMOVED***
                token : ["storage.type", "punctuation.operator", "support.function.firebug"],
                regex : /(console)(\.)(warn|info|log|error|time|timeEnd|assert)\b/
        ***REMOVED*** ***REMOVED***
                token : keywordMapper,
                regex : identifierRe
        ***REMOVED*** ***REMOVED***
                token : "keyword.operator",
                regex : /--|\+\+|[!$%&*+\-~]|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=/,
                next  : "start"
        ***REMOVED*** ***REMOVED***
                token : "punctuation.operator",
                regex : /\?|\:|\,|\;|\./,
                next  : "start"
        ***REMOVED*** ***REMOVED***
                token : "paren.lparen",
                regex : /[\[(***REMOVED***]/,
                next  : "start"
        ***REMOVED*** ***REMOVED***
                token : "paren.rparen",
                regex : /[\])***REMOVED***]/
        ***REMOVED*** ***REMOVED***
                token : "keyword.operator",
                regex : /\/=?/,
                next  : "start"
        ***REMOVED*** ***REMOVED***
                token: "comment",
                regex: /^#!.*$/
        ***REMOVED***
        ],
        "start": [
            DocCommentHighlightRules.getStartRule("doc-start"),
            ***REMOVED***
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment_regex_allowed"
        ***REMOVED*** ***REMOVED***
                token : "comment",
                regex : "\\/\\/",
                next : "line_comment_regex_allowed"
        ***REMOVED*** ***REMOVED***
                token: "string.regexp",
                regex: "\\/",
                next: "regex"
        ***REMOVED*** ***REMOVED***
                token : "text",
                regex : "\\s+|^$",
                next : "start"
        ***REMOVED*** ***REMOVED***
                token: "empty",
                regex: "",
                next: "no_regex"
        ***REMOVED***
        ],
        "regex": [
            ***REMOVED***
                token: "regexp.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]***REMOVED***4***REMOVED***|x[\\da-fA-F]***REMOVED***2***REMOVED***|.)"
        ***REMOVED*** ***REMOVED***
                token: "string.regexp",
                regex: "/[sxngimy]*",
                next: "no_regex"
        ***REMOVED*** ***REMOVED***
                token : "invalid",
                regex: /\***REMOVED***\d+\b,?\d*\***REMOVED***[+*]|[+*$^?][+*]|[$^][?]|\?***REMOVED***3,***REMOVED***/
        ***REMOVED*** ***REMOVED***
                token : "constant.language.escape",
                regex: /\(\?[:=!]|\)|\***REMOVED***\d+\b,?\d*\***REMOVED***|[+*]\?|[()$^+*?.]/
        ***REMOVED*** ***REMOVED***
                token : "constant.language.delimiter",
                regex: /\|/
        ***REMOVED*** ***REMOVED***
                token: "constant.language.escape",
                regex: /\[\^?/,
                next: "regex_character_class"
        ***REMOVED*** ***REMOVED***
                token: "empty",
                regex: "$",
                next: "no_regex"
        ***REMOVED*** ***REMOVED***
                defaultToken: "string.regexp"
        ***REMOVED***
        ],
        "regex_character_class": [
            ***REMOVED***
                token: "regexp.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]***REMOVED***4***REMOVED***|x[\\da-fA-F]***REMOVED***2***REMOVED***|.)"
        ***REMOVED*** ***REMOVED***
                token: "constant.language.escape",
                regex: "]",
                next: "regex"
        ***REMOVED*** ***REMOVED***
                token: "constant.language.escape",
                regex: "-"
        ***REMOVED*** ***REMOVED***
                token: "empty",
                regex: "$",
                next: "no_regex"
        ***REMOVED*** ***REMOVED***
                defaultToken: "string.regexp.charachterclass"
        ***REMOVED***
        ],
        "function_arguments": [
            ***REMOVED***
                token: "variable.parameter",
                regex: identifierRe
        ***REMOVED*** ***REMOVED***
                token: "punctuation.operator",
                regex: "[, ]+"
        ***REMOVED*** ***REMOVED***
                token: "punctuation.operator",
                regex: "$"
        ***REMOVED*** ***REMOVED***
                token: "empty",
                regex: "",
                next: "no_regex"
        ***REMOVED***
        ],
        "comment_regex_allowed" : [
            ***REMOVED***token : "comment", regex : "\\*\\/", next : "start"***REMOVED***,
            ***REMOVED***defaultToken : "comment"***REMOVED***
        ],
        "comment" : [
            ***REMOVED***token : "comment", regex : "\\*\\/", next : "no_regex"***REMOVED***,
            ***REMOVED***defaultToken : "comment"***REMOVED***
        ],
        "line_comment_regex_allowed" : [
            ***REMOVED***token : "comment", regex : "$|^", next : "start"***REMOVED***,
            ***REMOVED***defaultToken : "comment"***REMOVED***
        ],
        "line_comment" : [
            ***REMOVED***token : "comment", regex : "$|^", next : "no_regex"***REMOVED***,
            ***REMOVED***defaultToken : "comment"***REMOVED***
        ],
        "qqstring" : [
            ***REMOVED***
                token : "constant.language.escape",
                regex : escapedRe
        ***REMOVED*** ***REMOVED***
                token : "string",
                regex : "\\\\$",
                next  : "qqstring"
        ***REMOVED*** ***REMOVED***
                token : "string",
                regex : '"|$',
                next  : "no_regex"
        ***REMOVED*** ***REMOVED***
                defaultToken: "string"
        ***REMOVED***
        ],
        "qstring" : [
            ***REMOVED***
                token : "constant.language.escape",
                regex : escapedRe
        ***REMOVED*** ***REMOVED***
                token : "string",
                regex : "\\\\$",
                next  : "qstring"
        ***REMOVED*** ***REMOVED***
                token : "string",
                regex : "'|$",
                next  : "no_regex"
        ***REMOVED*** ***REMOVED***
                defaultToken: "string"
        ***REMOVED***
        ]
***REMOVED***;

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("no_regex") ]);
***REMOVED***;

oop.inherits(JavaScriptHighlightRules, TextHighlightRules);

exports.JavaScriptHighlightRules = JavaScriptHighlightRules;
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

define('ace/mode/behaviour/cstyle', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/behaviour', 'ace/token_iterator', 'ace/lib/lang'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var Behaviour = require("../behaviour").Behaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;
var lang = require("../../lib/lang");

var SAFE_INSERT_IN_TOKENS =
    ["text", "paren.rparen", "punctuation.operator"];
var SAFE_INSERT_BEFORE_TOKENS =
    ["text", "paren.rparen", "punctuation.operator", "comment"];

var context;
var contextCache = ***REMOVED******REMOVED***
var initContext = function(editor) ***REMOVED***
    var id = -1;
    if (editor.multiSelect) ***REMOVED***
        id = editor.selection.id;
        if (contextCache.rangeCount != editor.multiSelect.rangeCount)
            contextCache = ***REMOVED***rangeCount: editor.multiSelect.rangeCount***REMOVED***;
***REMOVED***
    if (contextCache[id])
        return context = contextCache[id];
    context = contextCache[id] = ***REMOVED***
        autoInsertedBrackets: 0,
        autoInsertedRow: -1,
        autoInsertedLineEnd: "",
        maybeInsertedBrackets: 0,
        maybeInsertedRow: -1,
        maybeInsertedLineStart: "",
        maybeInsertedLineEnd: ""
***REMOVED***;
***REMOVED***;

var CstyleBehaviour = function() ***REMOVED***
    this.add("braces", "insertion", function(state, action, editor, session, text) ***REMOVED***
        var cursor = editor.getCursorPosition();
        var line = session.doc.getLine(cursor.row);
        if (text == '***REMOVED***') ***REMOVED***
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "***REMOVED***" && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: '***REMOVED***' + selected + '***REMOVED***',
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else if (CstyleBehaviour.isSaneInsertion(editor, session)) ***REMOVED***
                if (/[\]\***REMOVED***\)]/.test(line[cursor.column]) || editor.inMultiSelectMode) ***REMOVED***
                    CstyleBehaviour.recordAutoInsert(editor, session, "***REMOVED***");
                    return ***REMOVED***
                        text: '***REMOVED******REMOVED***',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED*** else ***REMOVED***
                    CstyleBehaviour.recordMaybeInsert(editor, session, "***REMOVED***");
                    return ***REMOVED***
                        text: '***REMOVED***',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED*** else if (text == '***REMOVED***') ***REMOVED***
            initContext(editor);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == '***REMOVED***') ***REMOVED***
                var matching = session.$findOpeningBracket('***REMOVED***', ***REMOVED***column: cursor.column + 1, row: cursor.row***REMOVED***);
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) ***REMOVED***
                    CstyleBehaviour.popAutoInsertedClosing();
                    return ***REMOVED***
                        text: '',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED*** else if (text == "\n" || text == "\r\n") ***REMOVED***
            initContext(editor);
            var closing = "";
            if (CstyleBehaviour.isMaybeInsertedClosing(cursor, line)) ***REMOVED***
                closing = lang.stringRepeat("***REMOVED***", context.maybeInsertedBrackets);
                CstyleBehaviour.clearMaybeInsertedClosing();
        ***REMOVED***
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar === '***REMOVED***') ***REMOVED***
                var openBracePos = session.findMatchingBracket(***REMOVED***row: cursor.row, column: cursor.column+1***REMOVED***, '***REMOVED***');
                if (!openBracePos)
                     return null;
                var next_indent = this.$getIndent(session.getLine(openBracePos.row));
        ***REMOVED*** else if (closing) ***REMOVED***
                var next_indent = this.$getIndent(line);
        ***REMOVED*** else ***REMOVED***
                CstyleBehaviour.clearMaybeInsertedClosing();
                return;
        ***REMOVED***
            var indent = next_indent + session.getTabString();

            return ***REMOVED***
                text: '\n' + indent + '\n' + next_indent + closing,
                selection: [1, indent.length, 1, indent.length]
        ***REMOVED***;
    ***REMOVED*** else ***REMOVED***
            CstyleBehaviour.clearMaybeInsertedClosing();
    ***REMOVED***
***REMOVED***);

    this.add("braces", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '***REMOVED***') ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.end.column, range.end.column + 1);
            if (rightChar == '***REMOVED***') ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED*** else ***REMOVED***
                context.maybeInsertedBrackets--;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("parens", "insertion", function(state, action, editor, session, text) ***REMOVED***
        if (text == '(') ***REMOVED***
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: '(' + selected + ')',
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else if (CstyleBehaviour.isSaneInsertion(editor, session)) ***REMOVED***
                CstyleBehaviour.recordAutoInsert(editor, session, ")");
                return ***REMOVED***
                    text: '()',
                    selection: [1, 1]
            ***REMOVED***;
        ***REMOVED***
    ***REMOVED*** else if (text == ')') ***REMOVED***
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ')') ***REMOVED***
                var matching = session.$findOpeningBracket(')', ***REMOVED***column: cursor.column + 1, row: cursor.row***REMOVED***);
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) ***REMOVED***
                    CstyleBehaviour.popAutoInsertedClosing();
                    return ***REMOVED***
                        text: '',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("parens", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '(') ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ')') ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("brackets", "insertion", function(state, action, editor, session, text) ***REMOVED***
        if (text == '[') ***REMOVED***
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: '[' + selected + ']',
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else if (CstyleBehaviour.isSaneInsertion(editor, session)) ***REMOVED***
                CstyleBehaviour.recordAutoInsert(editor, session, "]");
                return ***REMOVED***
                    text: '[]',
                    selection: [1, 1]
            ***REMOVED***;
        ***REMOVED***
    ***REMOVED*** else if (text == ']') ***REMOVED***
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ']') ***REMOVED***
                var matching = session.$findOpeningBracket(']', ***REMOVED***column: cursor.column + 1, row: cursor.row***REMOVED***);
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) ***REMOVED***
                    CstyleBehaviour.popAutoInsertedClosing();
                    return ***REMOVED***
                        text: '',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("brackets", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '[') ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ']') ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("string_dquotes", "insertion", function(state, action, editor, session, text) ***REMOVED***
        if (text == '"' || text == "'") ***REMOVED***
            initContext(editor);
            var quote = text;
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "'" && selected != '"' && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: quote + selected + quote,
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else ***REMOVED***
                var cursor = editor.getCursorPosition();
                var line = session.doc.getLine(cursor.row);
                var leftChar = line.substring(cursor.column-1, cursor.column);
                if (leftChar == '\\') ***REMOVED***
                    return null;
            ***REMOVED***
                var tokens = session.getTokens(selection.start.row);
                var col = 0, token;
                var quotepos = -1; // Track whether we're inside an open quote.

                for (var x = 0; x < tokens.length; x++) ***REMOVED***
                    token = tokens[x];
                    if (token.type == "string") ***REMOVED***
                      quotepos = -1;
                ***REMOVED*** else if (quotepos < 0) ***REMOVED***
                      quotepos = token.value.indexOf(quote);
                ***REMOVED***
                    if ((token.value.length + col) > selection.start.column) ***REMOVED***
                        break;
                ***REMOVED***
                    col += tokens[x].value.length;
            ***REMOVED***
                if (!token || (quotepos < 0 && token.type !== "comment" && (token.type !== "string" || ((selection.start.column !== token.value.length+col-1) && token.value.lastIndexOf(quote) === token.value.length-1)))) ***REMOVED***
                    if (!CstyleBehaviour.isSaneInsertion(editor, session))
                        return;
                    return ***REMOVED***
                        text: quote + quote,
                        selection: [1,1]
                ***REMOVED***;
            ***REMOVED*** else if (token && token.type === "string") ***REMOVED***
                    var rightChar = line.substring(cursor.column, cursor.column + 1);
                    if (rightChar == quote) ***REMOVED***
                        return ***REMOVED***
                            text: '',
                            selection: [1, 1]
                    ***REMOVED***;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("string_dquotes", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && (selected == '"' || selected == "'")) ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == selected) ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

***REMOVED***;

    
CstyleBehaviour.isSaneInsertion = function(editor, session) ***REMOVED***
    var cursor = editor.getCursorPosition();
    var iterator = new TokenIterator(session, cursor.row, cursor.column);
    if (!this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS)) ***REMOVED***
        var iterator2 = new TokenIterator(session, cursor.row, cursor.column + 1);
        if (!this.$matchTokenType(iterator2.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS))
            return false;
***REMOVED***
    iterator.stepForward();
    return iterator.getCurrentTokenRow() !== cursor.row ||
        this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_BEFORE_TOKENS);
***REMOVED***;

CstyleBehaviour.$matchTokenType = function(token, types) ***REMOVED***
    return types.indexOf(token.type || token) > -1;
***REMOVED***;

CstyleBehaviour.recordAutoInsert = function(editor, session, bracket) ***REMOVED***
    var cursor = editor.getCursorPosition();
    var line = session.doc.getLine(cursor.row);
    if (!this.isAutoInsertedClosing(cursor, line, context.autoInsertedLineEnd[0]))
        context.autoInsertedBrackets = 0;
    context.autoInsertedRow = cursor.row;
    context.autoInsertedLineEnd = bracket + line.substr(cursor.column);
    context.autoInsertedBrackets++;
***REMOVED***;

CstyleBehaviour.recordMaybeInsert = function(editor, session, bracket) ***REMOVED***
    var cursor = editor.getCursorPosition();
    var line = session.doc.getLine(cursor.row);
    if (!this.isMaybeInsertedClosing(cursor, line))
        context.maybeInsertedBrackets = 0;
    context.maybeInsertedRow = cursor.row;
    context.maybeInsertedLineStart = line.substr(0, cursor.column) + bracket;
    context.maybeInsertedLineEnd = line.substr(cursor.column);
    context.maybeInsertedBrackets++;
***REMOVED***;

CstyleBehaviour.isAutoInsertedClosing = function(cursor, line, bracket) ***REMOVED***
    return context.autoInsertedBrackets > 0 &&
        cursor.row === context.autoInsertedRow &&
        bracket === context.autoInsertedLineEnd[0] &&
        line.substr(cursor.column) === context.autoInsertedLineEnd;
***REMOVED***;

CstyleBehaviour.isMaybeInsertedClosing = function(cursor, line) ***REMOVED***
    return context.maybeInsertedBrackets > 0 &&
        cursor.row === context.maybeInsertedRow &&
        line.substr(cursor.column) === context.maybeInsertedLineEnd &&
        line.substr(0, cursor.column) == context.maybeInsertedLineStart;
***REMOVED***;

CstyleBehaviour.popAutoInsertedClosing = function() ***REMOVED***
    context.autoInsertedLineEnd = context.autoInsertedLineEnd.substr(1);
    context.autoInsertedBrackets--;
***REMOVED***;

CstyleBehaviour.clearMaybeInsertedClosing = function() ***REMOVED***
    if (context) ***REMOVED***
        context.maybeInsertedBrackets = 0;
        context.maybeInsertedRow = -1;
***REMOVED***
***REMOVED***;



oop.inherits(CstyleBehaviour, Behaviour);

exports.CstyleBehaviour = CstyleBehaviour;
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

define('ace/mode/svg_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/javascript_highlight_rules', 'ace/mode/xml_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var JavaScriptHighlightRules = require("./javascript_highlight_rules").JavaScriptHighlightRules;
var XmlHighlightRules = require("./xml_highlight_rules").XmlHighlightRules;

var SvgHighlightRules = function() ***REMOVED***
    XmlHighlightRules.call(this);

    this.embedTagRules(JavaScriptHighlightRules, "js-", "script");

    this.normalizeRules();
***REMOVED***;

oop.inherits(SvgHighlightRules, XmlHighlightRules);

exports.SvgHighlightRules = SvgHighlightRules;
***REMOVED***);

define('ace/mode/folding/mixed', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/fold_mode'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(defaultMode, subModes) ***REMOVED***
    this.defaultMode = defaultMode;
    this.subModes = subModes;
***REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***


    this.$getMode = function(state) ***REMOVED***
        if (typeof state != "string") 
            state = state[0];
        for (var key in this.subModes) ***REMOVED***
            if (state.indexOf(key) === 0)
                return this.subModes[key];
    ***REMOVED***
        return null;
***REMOVED***;
    
    this.$tryMode = function(state, session, foldStyle, row) ***REMOVED***
        var mode = this.$getMode(state);
        return (mode ? mode.getFoldWidget(session, foldStyle, row) : "");
***REMOVED***;

    this.getFoldWidget = function(session, foldStyle, row) ***REMOVED***
        return (
            this.$tryMode(session.getState(row-1), session, foldStyle, row) ||
            this.$tryMode(session.getState(row), session, foldStyle, row) ||
            this.defaultMode.getFoldWidget(session, foldStyle, row)
        );
***REMOVED***;

    this.getFoldWidgetRange = function(session, foldStyle, row) ***REMOVED***
        var mode = this.$getMode(session.getState(row-1));
        
        if (!mode || !mode.getFoldWidget(session, foldStyle, row))
            mode = this.$getMode(session.getState(row));
        
        if (!mode || !mode.getFoldWidget(session, foldStyle, row))
            mode = this.defaultMode;
        
        return mode.getFoldWidgetRange(session, foldStyle, row);
***REMOVED***;

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
