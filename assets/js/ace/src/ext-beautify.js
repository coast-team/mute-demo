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
 * ***** END LICENSE BLOCK ***** */

define('ace/ext/beautify', ['require', 'exports', 'module' , 'ace/token_iterator', 'ace/ext/beautify/php_rules'], function(require, exports, module) ***REMOVED***

var TokenIterator = require("ace/token_iterator").TokenIterator;

var phpTransform = require("./beautify/php_rules").transform;

exports.beautify = function(session) ***REMOVED***
    var iterator = new TokenIterator(session, 0, 0);
    var token = iterator.getCurrentToken();

    var context = session.$modeId.split("/").pop();

    var code = phpTransform(iterator, context);
    session.doc.setValue(code);
***REMOVED***;

exports.commands = [***REMOVED***
    name: "beautify",
    exec: function(editor) ***REMOVED***
        exports.beautify(editor.session);
***REMOVED***
    bindKey: "Ctrl-Shift-B"
***REMOVED***]

***REMOVED***);

define('ace/ext/beautify/php_rules', ['require', 'exports', 'module' , 'ace/token_iterator'], function(require, exports, module) ***REMOVED***

var TokenIterator = require("ace/token_iterator").TokenIterator;
exports.newLines = [***REMOVED***
    type: 'support.php_tag',
    value: '<?php'
***REMOVED***, ***REMOVED***
    type: 'support.php_tag',
    value: '<?'
***REMOVED***, ***REMOVED***
    type: 'support.php_tag',
    value: '?>'
***REMOVED***, ***REMOVED***
    type: 'paren.lparen',
    value: '***REMOVED***',
    indent: true
***REMOVED***, ***REMOVED***
    type: 'paren.rparen',
    breakBefore: true,
    value: '***REMOVED***',
    indent: false
***REMOVED***, ***REMOVED***
    type: 'paren.rparen',
    breakBefore: true,
    value: '***REMOVED***)',
    indent: false,
    dontBreak: true
***REMOVED***, ***REMOVED***
    type: 'comment'
***REMOVED***, ***REMOVED***
    type: 'text',
    value: ';'
***REMOVED***, ***REMOVED***
    type: 'text',
    value: ':',
    context: 'php'
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'case',
    indent: true,
    dontBreak: true
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'default',
    indent: true,
    dontBreak: true
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'break',
    indent: false,
    dontBreak: true
***REMOVED***, ***REMOVED***
    type: 'punctuation.doctype.end',
    value: '>'
***REMOVED***, ***REMOVED***
    type: 'meta.tag.punctuation.end',
    value: '>'
***REMOVED***, ***REMOVED***
    type: 'meta.tag.punctuation.begin',
    value: '<',
    blockTag: true,
    indent: true,
    dontBreak: true
***REMOVED***, ***REMOVED***
    type: 'meta.tag.punctuation.begin',
    value: '</',
    indent: false,
    breakBefore: true,
    dontBreak: true
***REMOVED***, ***REMOVED***
    type: 'punctuation.operator',
    value: ';'
***REMOVED***];

exports.spaces = [***REMOVED***
    type: 'xml-pe',
    prepend: true
***REMOVED***,***REMOVED***
    type: 'entity.other.attribute-name',
    prepend: true
***REMOVED***, ***REMOVED***
    type: 'storage.type',
    value: 'var',
    append: true
***REMOVED***, ***REMOVED***
    type: 'storage.type',
    value: 'function',
    append: true
***REMOVED***, ***REMOVED***
    type: 'keyword.operator',
    value: '='
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'as',
    prepend: true,
    append: true
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'function',
    append: true
***REMOVED***, ***REMOVED***
    type: 'support.function',
    next: /[^\(]/,
    append: true
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'or',
    append: true,
    prepend: true
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'and',
    append: true,
    prepend: true
***REMOVED***, ***REMOVED***
    type: 'keyword',
    value: 'case',
    append: true
***REMOVED***, ***REMOVED***
    type: 'keyword.operator',
    value: '||',
    append: true,
    prepend: true
***REMOVED***, ***REMOVED***
    type: 'keyword.operator',
    value: '&&',
    append: true,
    prepend: true
***REMOVED***];
exports.singleTags = ['!doctype','area','base','br','hr','input','img','link','meta'];

exports.transform = function(iterator, maxPos, context) ***REMOVED***
    var token = iterator.getCurrentToken();
    
    var newLines = exports.newLines;
    var spaces = exports.spaces;
    var singleTags = exports.singleTags;

    var code = '';
    
    var indentation = 0;
    var dontBreak = false;
    var tag;
    var lastTag;
    var lastToken = ***REMOVED******REMOVED***;
    var nextTag;
    var nextToken = ***REMOVED******REMOVED***;
    var breakAdded = false;
    var value = '';

    while (token!==null) ***REMOVED***
        console.log(token);

        if( !token )***REMOVED***
            token = iterator.stepForward();
            continue;
    ***REMOVED***
        if( token.type == 'support.php_tag' && token.value != '?>' )***REMOVED***
            context = 'php';
    ***REMOVED***
        else if( token.type == 'support.php_tag' && token.value == '?>' )***REMOVED***
            context = 'html';
    ***REMOVED***
        else if( token.type == 'meta.tag.name.style' && context != 'css' )***REMOVED***
            context = 'css';
    ***REMOVED***
        else if( token.type == 'meta.tag.name.style' && context == 'css' )***REMOVED***
            context = 'html';
    ***REMOVED***
        else if( token.type == 'meta.tag.name.script' && context != 'js' )***REMOVED***
            context = 'js';
    ***REMOVED***
        else if( token.type == 'meta.tag.name.script' && context == 'js' )***REMOVED***
            context = 'html';
    ***REMOVED***

        nextToken = iterator.stepForward();
        if (nextToken && nextToken.type.indexOf('meta.tag.name') == 0) ***REMOVED***
            nextTag = nextToken.value;
    ***REMOVED***
        if ( lastToken.type == 'support.php_tag' && lastToken.value == '<?=') ***REMOVED***
            dontBreak = true;
    ***REMOVED***
        if (token.type == 'meta.tag.name') ***REMOVED***
            token.value = token.value.toLowerCase();
    ***REMOVED***
        if (token.type == 'text') ***REMOVED***
            token.value = token.value.trim();
    ***REMOVED***
        if (!token.value) ***REMOVED***
            token = nextToken;
            continue;
    ***REMOVED***
        value = token.value;
        for (var i in spaces) ***REMOVED***
            if (
                token.type == spaces[i].type &&
                (!spaces[i].value || token.value == spaces[i].value) &&
                (
                    nextToken &&
                    (!spaces[i].next || spaces[i].next.test(nextToken.value))
                )
            ) ***REMOVED***
                if (spaces[i].prepend) ***REMOVED***
                    value = ' ' + token.value;
            ***REMOVED***

                if (spaces[i].append) ***REMOVED***
                    value += ' ';
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        if (token.type.indexOf('meta.tag.name') == 0) ***REMOVED***
            tag = token.value;
    ***REMOVED***
        breakAdded = false;
        for (i in newLines) ***REMOVED***
            if (
                token.type == newLines[i].type &&
                (
                    !newLines[i].value ||
                    token.value == newLines[i].value
                ) &&
                (
                    !newLines[i].blockTag ||
                    singleTags.indexOf(nextTag) === -1
                ) &&
                (
                    !newLines[i].context ||
                    newLines[i].context === context
                )
            ) ***REMOVED***
                if (newLines[i].indent === false) ***REMOVED***
                    indentation--;
            ***REMOVED***

                if (
                    newLines[i].breakBefore &&
                    ( !newLines[i].prev || newLines[i].prev.test(lastToken.value) )
                ) ***REMOVED***
                    code += "\n";
                    breakAdded = true;
                    for (i = 0; i < indentation; i++) ***REMOVED***
                        code += "\t";
                ***REMOVED***
            ***REMOVED***

                break;
        ***REMOVED***
    ***REMOVED***

        if (dontBreak===false) ***REMOVED***
            for (i in newLines) ***REMOVED***
                if (
                    lastToken.type == newLines[i].type &&
                    (
                        !newLines[i].value || lastToken.value == newLines[i].value
                    ) &&
                    (
                        !newLines[i].blockTag ||
                        singleTags.indexOf(tag) === -1
                    ) &&
                    (
                        !newLines[i].context ||
                        newLines[i].context === context
                    )
                ) ***REMOVED***
                    if (newLines[i].indent === true) ***REMOVED***
                        indentation++;
                ***REMOVED***

                    if (!newLines[i].dontBreak  && !breakAdded) ***REMOVED***
                        code += "\n";
                        for (i = 0; i < indentation; i++) ***REMOVED***
                            code += "\t";
                    ***REMOVED***
                ***REMOVED***

                    break;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

        code += value;
        if ( lastToken.type == 'support.php_tag' && lastToken.value == '?>' ) ***REMOVED***
            dontBreak = false;
    ***REMOVED***
        lastTag = tag;

        lastToken = token;

        token = nextToken;

        if (token===null) ***REMOVED***
            break;
    ***REMOVED***
***REMOVED***
    
    return code;
***REMOVED***;



***REMOVED***);