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

define('ace/theme/crimson_editor', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***
exports.isDark = false;
exports.cssText = ".ace-crimson-editor .ace_gutter ***REMOVED***\
background: #ebebeb;\
color: #333;\
overflow : hidden;\
***REMOVED***\
.ace-crimson-editor .ace_gutter-layer ***REMOVED***\
width: 100%;\
text-align: right;\
***REMOVED***\
.ace-crimson-editor .ace_print-margin ***REMOVED***\
width: 1px;\
background: #e8e8e8;\
***REMOVED***\
.ace-crimson-editor ***REMOVED***\
background-color: #FFFFFF;\
color: rgb(64, 64, 64);\
***REMOVED***\
.ace-crimson-editor .ace_cursor ***REMOVED***\
color: black;\
***REMOVED***\
.ace-crimson-editor .ace_invisible ***REMOVED***\
color: rgb(191, 191, 191);\
***REMOVED***\
.ace-crimson-editor .ace_identifier ***REMOVED***\
color: black;\
***REMOVED***\
.ace-crimson-editor .ace_keyword ***REMOVED***\
color: blue;\
***REMOVED***\
.ace-crimson-editor .ace_constant.ace_buildin ***REMOVED***\
color: rgb(88, 72, 246);\
***REMOVED***\
.ace-crimson-editor .ace_constant.ace_language ***REMOVED***\
color: rgb(255, 156, 0);\
***REMOVED***\
.ace-crimson-editor .ace_constant.ace_library ***REMOVED***\
color: rgb(6, 150, 14);\
***REMOVED***\
.ace-crimson-editor .ace_invalid ***REMOVED***\
text-decoration: line-through;\
color: rgb(224, 0, 0);\
***REMOVED***\
.ace-crimson-editor .ace_fold ***REMOVED***\
***REMOVED***\
.ace-crimson-editor .ace_support.ace_function ***REMOVED***\
color: rgb(192, 0, 0);\
***REMOVED***\
.ace-crimson-editor .ace_support.ace_constant ***REMOVED***\
color: rgb(6, 150, 14);\
***REMOVED***\
.ace-crimson-editor .ace_support.ace_type,\
.ace-crimson-editor .ace_support.ace_class ***REMOVED***\
color: rgb(109, 121, 222);\
***REMOVED***\
.ace-crimson-editor .ace_keyword.ace_operator ***REMOVED***\
color: rgb(49, 132, 149);\
***REMOVED***\
.ace-crimson-editor .ace_string ***REMOVED***\
color: rgb(128, 0, 128);\
***REMOVED***\
.ace-crimson-editor .ace_comment ***REMOVED***\
color: rgb(76, 136, 107);\
***REMOVED***\
.ace-crimson-editor .ace_comment.ace_doc ***REMOVED***\
color: rgb(0, 102, 255);\
***REMOVED***\
.ace-crimson-editor .ace_comment.ace_doc.ace_tag ***REMOVED***\
color: rgb(128, 159, 191);\
***REMOVED***\
.ace-crimson-editor .ace_constant.ace_numeric ***REMOVED***\
color: rgb(0, 0, 64);\
***REMOVED***\
.ace-crimson-editor .ace_variable ***REMOVED***\
color: rgb(0, 64, 128);\
***REMOVED***\
.ace-crimson-editor .ace_xml-pe ***REMOVED***\
color: rgb(104, 104, 91);\
***REMOVED***\
.ace-crimson-editor .ace_marker-layer .ace_selection ***REMOVED***\
background: rgb(181, 213, 255);\
***REMOVED***\
.ace-crimson-editor .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(252, 255, 0);\
***REMOVED***\
.ace-crimson-editor .ace_marker-layer .ace_stack ***REMOVED***\
background: rgb(164, 229, 101);\
***REMOVED***\
.ace-crimson-editor .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
***REMOVED***\
.ace-crimson-editor .ace_marker-layer .ace_active-line ***REMOVED***\
background: rgb(232, 242, 254);\
***REMOVED***\
.ace-crimson-editor .ace_gutter-active-line ***REMOVED***\
background-color : #dcdcdc;\
***REMOVED***\
.ace-crimson-editor .ace_meta.ace_tag ***REMOVED***\
color:rgb(28, 2, 255);\
***REMOVED***\
.ace-crimson-editor .ace_marker-layer .ace_selected-word ***REMOVED***\
background: rgb(250, 250, 255);\
border: 1px solid rgb(200, 200, 250);\
***REMOVED***\
.ace-crimson-editor .ace_string.ace_regex ***REMOVED***\
color: rgb(192, 0, 192);\
***REMOVED***\
.ace-crimson-editor .ace_indent-guide ***REMOVED***\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
***REMOVED***";

exports.cssClass = "ace-crimson-editor";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
