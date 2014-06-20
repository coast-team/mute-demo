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

define('ace/theme/textmate', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***


exports.isDark = false;
exports.cssClass = "ace-tm";
exports.cssText = ".ace-tm .ace_gutter ***REMOVED***\
background: #f0f0f0;\
color: #333;\
***REMOVED***\
.ace-tm .ace_print-margin ***REMOVED***\
width: 1px;\
background: #e8e8e8;\
***REMOVED***\
.ace-tm .ace_fold ***REMOVED***\
background-color: #6B72E6;\
***REMOVED***\
.ace-tm ***REMOVED***\
background-color: #FFFFFF;\
color: black;\
***REMOVED***\
.ace-tm .ace_cursor ***REMOVED***\
color: black;\
***REMOVED***\
.ace-tm .ace_invisible ***REMOVED***\
color: rgb(191, 191, 191);\
***REMOVED***\
.ace-tm .ace_storage,\
.ace-tm .ace_keyword ***REMOVED***\
color: blue;\
***REMOVED***\
.ace-tm .ace_constant ***REMOVED***\
color: rgb(197, 6, 11);\
***REMOVED***\
.ace-tm .ace_constant.ace_buildin ***REMOVED***\
color: rgb(88, 72, 246);\
***REMOVED***\
.ace-tm .ace_constant.ace_language ***REMOVED***\
color: rgb(88, 92, 246);\
***REMOVED***\
.ace-tm .ace_constant.ace_library ***REMOVED***\
color: rgb(6, 150, 14);\
***REMOVED***\
.ace-tm .ace_invalid ***REMOVED***\
background-color: rgba(255, 0, 0, 0.1);\
color: red;\
***REMOVED***\
.ace-tm .ace_support.ace_function ***REMOVED***\
color: rgb(60, 76, 114);\
***REMOVED***\
.ace-tm .ace_support.ace_constant ***REMOVED***\
color: rgb(6, 150, 14);\
***REMOVED***\
.ace-tm .ace_support.ace_type,\
.ace-tm .ace_support.ace_class ***REMOVED***\
color: rgb(109, 121, 222);\
***REMOVED***\
.ace-tm .ace_keyword.ace_operator ***REMOVED***\
color: rgb(104, 118, 135);\
***REMOVED***\
.ace-tm .ace_string ***REMOVED***\
color: rgb(3, 106, 7);\
***REMOVED***\
.ace-tm .ace_comment ***REMOVED***\
color: rgb(76, 136, 107);\
***REMOVED***\
.ace-tm .ace_comment.ace_doc ***REMOVED***\
color: rgb(0, 102, 255);\
***REMOVED***\
.ace-tm .ace_comment.ace_doc.ace_tag ***REMOVED***\
color: rgb(128, 159, 191);\
***REMOVED***\
.ace-tm .ace_constant.ace_numeric ***REMOVED***\
color: rgb(0, 0, 205);\
***REMOVED***\
.ace-tm .ace_variable ***REMOVED***\
color: rgb(49, 132, 149);\
***REMOVED***\
.ace-tm .ace_xml-pe ***REMOVED***\
color: rgb(104, 104, 91);\
***REMOVED***\
.ace-tm .ace_entity.ace_name.ace_function ***REMOVED***\
color: #0000A2;\
***REMOVED***\
.ace-tm .ace_heading ***REMOVED***\
color: rgb(12, 7, 255);\
***REMOVED***\
.ace-tm .ace_list ***REMOVED***\
color:rgb(185, 6, 144);\
***REMOVED***\
.ace-tm .ace_meta.ace_tag ***REMOVED***\
color:rgb(0, 22, 142);\
***REMOVED***\
.ace-tm .ace_string.ace_regex ***REMOVED***\
color: rgb(255, 0, 0)\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_selection ***REMOVED***\
background: rgb(181, 213, 255);\
***REMOVED***\
.ace-tm.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px white;\
border-radius: 2px;\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(252, 255, 0);\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_stack ***REMOVED***\
background: rgb(164, 229, 101);\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_active-line ***REMOVED***\
background: rgba(0, 0, 0, 0.07);\
***REMOVED***\
.ace-tm .ace_gutter-active-line ***REMOVED***\
background-color : #dcdcdc;\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_selected-word ***REMOVED***\
background: rgb(250, 250, 255);\
border: 1px solid rgb(200, 200, 250);\
***REMOVED***\
.ace-tm .ace_indent-guide ***REMOVED***\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
***REMOVED***\
";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
