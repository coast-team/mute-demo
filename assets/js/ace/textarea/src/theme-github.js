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

__ace_shadowed__.define('ace/theme/github', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = false;
exports.cssClass = "ace-github";
exports.cssText = "/* CSS style content from github's default pygments highlighter template.\
Cursor and selection styles from textmate.css. */\
.ace-github .ace_gutter ***REMOVED***\
background: #e8e8e8;\
color: #AAA;\
***REMOVED***\
.ace-github  ***REMOVED***\
background: #fff;\
color: #000;\
***REMOVED***\
.ace-github .ace_keyword ***REMOVED***\
font-weight: bold;\
***REMOVED***\
.ace-github .ace_string ***REMOVED***\
color: #D14;\
***REMOVED***\
.ace-github .ace_variable.ace_class ***REMOVED***\
color: teal;\
***REMOVED***\
.ace-github .ace_constant.ace_numeric ***REMOVED***\
color: #099;\
***REMOVED***\
.ace-github .ace_constant.ace_buildin ***REMOVED***\
color: #0086B3;\
***REMOVED***\
.ace-github .ace_support.ace_function ***REMOVED***\
color: #0086B3;\
***REMOVED***\
.ace-github .ace_comment ***REMOVED***\
color: #998;\
font-style: italic;\
***REMOVED***\
.ace-github .ace_variable.ace_language  ***REMOVED***\
color: #0086B3;\
***REMOVED***\
.ace-github .ace_paren ***REMOVED***\
font-weight: bold;\
***REMOVED***\
.ace-github .ace_boolean ***REMOVED***\
font-weight: bold;\
***REMOVED***\
.ace-github .ace_string.ace_regexp ***REMOVED***\
color: #009926;\
font-weight: normal;\
***REMOVED***\
.ace-github .ace_variable.ace_instance ***REMOVED***\
color: teal;\
***REMOVED***\
.ace-github .ace_constant.ace_language ***REMOVED***\
font-weight: bold;\
***REMOVED***\
.ace-github .ace_cursor ***REMOVED***\
color: black;\
***REMOVED***\
.ace-github .ace_marker-layer .ace_active-line ***REMOVED***\
background: rgb(255, 255, 204);\
***REMOVED***\
.ace-github .ace_marker-layer .ace_selection ***REMOVED***\
background: rgb(181, 213, 255);\
***REMOVED***\
.ace-github.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px white;\
border-radius: 2px;\
***REMOVED***\
/* bold keywords cause cursor issues for some fonts */\
/* this disables bold style for editor and keeps for static highlighter */\
.ace-github.ace_nobold .ace_line > span ***REMOVED***\
font-weight: normal !important;\
***REMOVED***\
.ace-github .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(252, 255, 0);\
***REMOVED***\
.ace-github .ace_marker-layer .ace_stack ***REMOVED***\
background: rgb(164, 229, 101);\
***REMOVED***\
.ace-github .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
***REMOVED***\
.ace-github .ace_gutter-active-line ***REMOVED***\
background-color : rgba(0, 0, 0, 0.07);\
***REMOVED***\
.ace-github .ace_marker-layer .ace_selected-word ***REMOVED***\
background: rgb(250, 250, 255);\
border: 1px solid rgb(200, 200, 250);\
***REMOVED***\
.ace-github .ace_print-margin ***REMOVED***\
width: 1px;\
background: #e8e8e8;\
***REMOVED***\
.ace-github .ace_indent-guide ***REMOVED***\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
***REMOVED***";

    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
