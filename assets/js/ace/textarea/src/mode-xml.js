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

__ace_shadowed__.define('ace/mode/xml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/mode/text', 'ace/mode/xml_highlight_rules', 'ace/mode/behaviour/xml', 'ace/mode/folding/xml'], function(require, exports, module) ***REMOVED***


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

__ace_shadowed__.define('ace/mode/xml_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


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

__ace_shadowed__.define('ace/mode/behaviour/xml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/behaviour', 'ace/token_iterator'], function(require, exports, module) ***REMOVED***


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

__ace_shadowed__.define('ace/mode/folding/xml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/range', 'ace/mode/folding/fold_mode', 'ace/token_iterator'], function(require, exports, module) ***REMOVED***


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
