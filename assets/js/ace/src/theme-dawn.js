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

define('ace/theme/dawn', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = false;
exports.cssClass = "ace-dawn";
exports.cssText = ".ace-dawn .ace_gutter ***REMOVED***\
background: #ebebeb;\
color: #333\
***REMOVED***\
.ace-dawn .ace_print-margin ***REMOVED***\
width: 1px;\
background: #e8e8e8\
***REMOVED***\
.ace-dawn ***REMOVED***\
background-color: #F9F9F9;\
color: #080808\
***REMOVED***\
.ace-dawn .ace_cursor ***REMOVED***\
color: #000000\
***REMOVED***\
.ace-dawn .ace_marker-layer .ace_selection ***REMOVED***\
background: rgba(39, 95, 255, 0.30)\
***REMOVED***\
.ace-dawn.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #F9F9F9;\
border-radius: 2px\
***REMOVED***\
.ace-dawn .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(255, 255, 0)\
***REMOVED***\
.ace-dawn .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid rgba(75, 75, 126, 0.50)\
***REMOVED***\
.ace-dawn .ace_marker-layer .ace_active-line ***REMOVED***\
background: rgba(36, 99, 180, 0.12)\
***REMOVED***\
.ace-dawn .ace_gutter-active-line ***REMOVED***\
background-color : #dcdcdc\
***REMOVED***\
.ace-dawn .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid rgba(39, 95, 255, 0.30)\
***REMOVED***\
.ace-dawn .ace_invisible ***REMOVED***\
color: rgba(75, 75, 126, 0.50)\
***REMOVED***\
.ace-dawn .ace_keyword,\
.ace-dawn .ace_meta ***REMOVED***\
color: #794938\
***REMOVED***\
.ace-dawn .ace_constant,\
.ace-dawn .ace_constant.ace_character,\
.ace-dawn .ace_constant.ace_character.ace_escape,\
.ace-dawn .ace_constant.ace_other ***REMOVED***\
color: #811F24\
***REMOVED***\
.ace-dawn .ace_invalid.ace_illegal ***REMOVED***\
text-decoration: underline;\
font-style: italic;\
color: #F8F8F8;\
background-color: #B52A1D\
***REMOVED***\
.ace-dawn .ace_invalid.ace_deprecated ***REMOVED***\
text-decoration: underline;\
font-style: italic;\
color: #B52A1D\
***REMOVED***\
.ace-dawn .ace_support ***REMOVED***\
color: #691C97\
***REMOVED***\
.ace-dawn .ace_support.ace_constant ***REMOVED***\
color: #B4371F\
***REMOVED***\
.ace-dawn .ace_fold ***REMOVED***\
background-color: #794938;\
border-color: #080808\
***REMOVED***\
.ace-dawn .ace_list,\
.ace-dawn .ace_markup.ace_list,\
.ace-dawn .ace_support.ace_function ***REMOVED***\
color: #693A17\
***REMOVED***\
.ace-dawn .ace_storage ***REMOVED***\
font-style: italic;\
color: #A71D5D\
***REMOVED***\
.ace-dawn .ace_string ***REMOVED***\
color: #0B6125\
***REMOVED***\
.ace-dawn .ace_string.ace_regexp ***REMOVED***\
color: #CF5628\
***REMOVED***\
.ace-dawn .ace_comment ***REMOVED***\
font-style: italic;\
color: #5A525F\
***REMOVED***\
.ace-dawn .ace_heading,\
.ace-dawn .ace_markup.ace_heading ***REMOVED***\
color: #19356D\
***REMOVED***\
.ace-dawn .ace_variable ***REMOVED***\
color: #234A97\
***REMOVED***\
.ace-dawn .ace_indent-guide ***REMOVED***\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYLh/5+x/AAizA4hxNNsZAAAAAElFTkSuQmCC) right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
