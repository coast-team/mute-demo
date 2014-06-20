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

define('ace/theme/pastel_on_dark', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = true;
exports.cssClass = "ace-pastel-on-dark";
exports.cssText = ".ace-pastel-on-dark .ace_gutter ***REMOVED***\
background: #353030;\
color: #8F938F\
***REMOVED***\
.ace-pastel-on-dark .ace_print-margin ***REMOVED***\
width: 1px;\
background: #353030\
***REMOVED***\
.ace-pastel-on-dark ***REMOVED***\
background-color: #2C2828;\
color: #8F938F\
***REMOVED***\
.ace-pastel-on-dark .ace_cursor ***REMOVED***\
color: #A7A7A7\
***REMOVED***\
.ace-pastel-on-dark .ace_marker-layer .ace_selection ***REMOVED***\
background: rgba(221, 240, 255, 0.20)\
***REMOVED***\
.ace-pastel-on-dark.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #2C2828;\
border-radius: 2px\
***REMOVED***\
.ace-pastel-on-dark .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(102, 82, 0)\
***REMOVED***\
.ace-pastel-on-dark .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid rgba(255, 255, 255, 0.25)\
***REMOVED***\
.ace-pastel-on-dark .ace_marker-layer .ace_active-line ***REMOVED***\
background: rgba(255, 255, 255, 0.031)\
***REMOVED***\
.ace-pastel-on-dark .ace_gutter-active-line ***REMOVED***\
background-color: rgba(255, 255, 255, 0.031)\
***REMOVED***\
.ace-pastel-on-dark .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid rgba(221, 240, 255, 0.20)\
***REMOVED***\
.ace-pastel-on-dark .ace_invisible ***REMOVED***\
color: rgba(255, 255, 255, 0.25)\
***REMOVED***\
.ace-pastel-on-dark .ace_keyword,\
.ace-pastel-on-dark .ace_meta ***REMOVED***\
color: #757aD8\
***REMOVED***\
.ace-pastel-on-dark .ace_constant,\
.ace-pastel-on-dark .ace_constant.ace_character,\
.ace-pastel-on-dark .ace_constant.ace_character.ace_escape,\
.ace-pastel-on-dark .ace_constant.ace_other ***REMOVED***\
color: #4FB7C5\
***REMOVED***\
.ace-pastel-on-dark .ace_keyword.ace_operator ***REMOVED***\
color: #797878\
***REMOVED***\
.ace-pastel-on-dark .ace_constant.ace_character ***REMOVED***\
color: #AFA472\
***REMOVED***\
.ace-pastel-on-dark .ace_constant.ace_language ***REMOVED***\
color: #DE8E30\
***REMOVED***\
.ace-pastel-on-dark .ace_constant.ace_numeric ***REMOVED***\
color: #CCCCCC\
***REMOVED***\
.ace-pastel-on-dark .ace_invalid,\
.ace-pastel-on-dark .ace_invalid.ace_illegal ***REMOVED***\
color: #F8F8F8;\
background-color: rgba(86, 45, 86, 0.75)\
***REMOVED***\
.ace-pastel-on-dark .ace_invalid.ace_deprecated ***REMOVED***\
text-decoration: underline;\
font-style: italic;\
color: #D2A8A1\
***REMOVED***\
.ace-pastel-on-dark .ace_fold ***REMOVED***\
background-color: #757aD8;\
border-color: #8F938F\
***REMOVED***\
.ace-pastel-on-dark .ace_support.ace_function ***REMOVED***\
color: #AEB2F8\
***REMOVED***\
.ace-pastel-on-dark .ace_string ***REMOVED***\
color: #66A968\
***REMOVED***\
.ace-pastel-on-dark .ace_string.ace_regexp ***REMOVED***\
color: #E9C062\
***REMOVED***\
.ace-pastel-on-dark .ace_comment ***REMOVED***\
color: #A6C6FF\
***REMOVED***\
.ace-pastel-on-dark .ace_variable ***REMOVED***\
color: #BEBF55\
***REMOVED***\
.ace-pastel-on-dark .ace_variable.ace_language ***REMOVED***\
color: #C1C144\
***REMOVED***\
.ace-pastel-on-dark .ace_xml-pe ***REMOVED***\
color: #494949\
***REMOVED***\
.ace-pastel-on-dark .ace_indent-guide ***REMOVED***\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYIiPj/8PAARgAh2NTMh8AAAAAElFTkSuQmCC) right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
