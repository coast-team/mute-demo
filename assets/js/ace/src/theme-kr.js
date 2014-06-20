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

define('ace/theme/kr_theme', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = true;
exports.cssClass = "ace-kr-theme";
exports.cssText = ".ace-kr-theme .ace_gutter ***REMOVED***\
background: #1c1917;\
color: #FCFFE0\
***REMOVED***\
.ace-kr-theme .ace_print-margin ***REMOVED***\
width: 1px;\
background: #1c1917\
***REMOVED***\
.ace-kr-theme ***REMOVED***\
background-color: #0B0A09;\
color: #FCFFE0\
***REMOVED***\
.ace-kr-theme .ace_cursor ***REMOVED***\
color: #FF9900\
***REMOVED***\
.ace-kr-theme .ace_marker-layer .ace_selection ***REMOVED***\
background: rgba(170, 0, 255, 0.45)\
***REMOVED***\
.ace-kr-theme.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #0B0A09;\
border-radius: 2px\
***REMOVED***\
.ace-kr-theme .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(102, 82, 0)\
***REMOVED***\
.ace-kr-theme .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid rgba(255, 177, 111, 0.32)\
***REMOVED***\
.ace-kr-theme .ace_marker-layer .ace_active-line ***REMOVED***\
background: #38403D\
***REMOVED***\
.ace-kr-theme .ace_gutter-active-line ***REMOVED***\
background-color : #38403D\
***REMOVED***\
.ace-kr-theme .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid rgba(170, 0, 255, 0.45)\
***REMOVED***\
.ace-kr-theme .ace_invisible ***REMOVED***\
color: rgba(255, 177, 111, 0.32)\
***REMOVED***\
.ace-kr-theme .ace_keyword,\
.ace-kr-theme .ace_meta ***REMOVED***\
color: #949C8B\
***REMOVED***\
.ace-kr-theme .ace_constant,\
.ace-kr-theme .ace_constant.ace_character,\
.ace-kr-theme .ace_constant.ace_character.ace_escape,\
.ace-kr-theme .ace_constant.ace_other ***REMOVED***\
color: rgba(210, 117, 24, 0.76)\
***REMOVED***\
.ace-kr-theme .ace_invalid ***REMOVED***\
color: #F8F8F8;\
background-color: #A41300\
***REMOVED***\
.ace-kr-theme .ace_support ***REMOVED***\
color: #9FC28A\
***REMOVED***\
.ace-kr-theme .ace_support.ace_constant ***REMOVED***\
color: #C27E66\
***REMOVED***\
.ace-kr-theme .ace_fold ***REMOVED***\
background-color: #949C8B;\
border-color: #FCFFE0\
***REMOVED***\
.ace-kr-theme .ace_support.ace_function ***REMOVED***\
color: #85873A\
***REMOVED***\
.ace-kr-theme .ace_storage ***REMOVED***\
color: #FFEE80\
***REMOVED***\
.ace-kr-theme .ace_string ***REMOVED***\
color: rgba(164, 161, 181, 0.8)\
***REMOVED***\
.ace-kr-theme .ace_string.ace_regexp ***REMOVED***\
color: rgba(125, 255, 192, 0.65)\
***REMOVED***\
.ace-kr-theme .ace_comment ***REMOVED***\
font-style: italic;\
color: #706D5B\
***REMOVED***\
.ace-kr-theme .ace_variable ***REMOVED***\
color: #D1A796\
***REMOVED***\
.ace-kr-theme .ace_list,\
.ace-kr-theme .ace_markup.ace_list ***REMOVED***\
background-color: #0F0040\
***REMOVED***\
.ace-kr-theme .ace_variable.ace_language ***REMOVED***\
color: #FF80E1\
***REMOVED***\
.ace-kr-theme .ace_meta.ace_tag ***REMOVED***\
color: #BABD9C\
***REMOVED***\
.ace-kr-theme .ace_indent-guide ***REMOVED***\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYFBXV/8PAAJoAXX4kT2EAAAAAElFTkSuQmCC) right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
