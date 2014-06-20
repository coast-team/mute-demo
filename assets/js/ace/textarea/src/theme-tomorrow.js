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

__ace_shadowed__.define('ace/theme/tomorrow', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = false;
exports.cssClass = "ace-tomorrow";
exports.cssText = ".ace-tomorrow .ace_gutter ***REMOVED***\
background: #f6f6f6;\
color: #4D4D4C\
***REMOVED***\
.ace-tomorrow .ace_print-margin ***REMOVED***\
width: 1px;\
background: #f6f6f6\
***REMOVED***\
.ace-tomorrow ***REMOVED***\
background-color: #FFFFFF;\
color: #4D4D4C\
***REMOVED***\
.ace-tomorrow .ace_cursor ***REMOVED***\
color: #AEAFAD\
***REMOVED***\
.ace-tomorrow .ace_marker-layer .ace_selection ***REMOVED***\
background: #D6D6D6\
***REMOVED***\
.ace-tomorrow.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #FFFFFF;\
border-radius: 2px\
***REMOVED***\
.ace-tomorrow .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(255, 255, 0)\
***REMOVED***\
.ace-tomorrow .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid #D1D1D1\
***REMOVED***\
.ace-tomorrow .ace_marker-layer .ace_active-line ***REMOVED***\
background: #EFEFEF\
***REMOVED***\
.ace-tomorrow .ace_gutter-active-line ***REMOVED***\
background-color : #dcdcdc\
***REMOVED***\
.ace-tomorrow .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid #D6D6D6\
***REMOVED***\
.ace-tomorrow .ace_invisible ***REMOVED***\
color: #D1D1D1\
***REMOVED***\
.ace-tomorrow .ace_keyword,\
.ace-tomorrow .ace_meta,\
.ace-tomorrow .ace_storage,\
.ace-tomorrow .ace_storage.ace_type,\
.ace-tomorrow .ace_support.ace_type ***REMOVED***\
color: #8959A8\
***REMOVED***\
.ace-tomorrow .ace_keyword.ace_operator ***REMOVED***\
color: #3E999F\
***REMOVED***\
.ace-tomorrow .ace_constant.ace_character,\
.ace-tomorrow .ace_constant.ace_language,\
.ace-tomorrow .ace_constant.ace_numeric,\
.ace-tomorrow .ace_keyword.ace_other.ace_unit,\
.ace-tomorrow .ace_support.ace_constant,\
.ace-tomorrow .ace_variable.ace_parameter ***REMOVED***\
color: #F5871F\
***REMOVED***\
.ace-tomorrow .ace_constant.ace_other ***REMOVED***\
color: #666969\
***REMOVED***\
.ace-tomorrow .ace_invalid ***REMOVED***\
color: #FFFFFF;\
background-color: #C82829\
***REMOVED***\
.ace-tomorrow .ace_invalid.ace_deprecated ***REMOVED***\
color: #FFFFFF;\
background-color: #8959A8\
***REMOVED***\
.ace-tomorrow .ace_fold ***REMOVED***\
background-color: #4271AE;\
border-color: #4D4D4C\
***REMOVED***\
.ace-tomorrow .ace_entity.ace_name.ace_function,\
.ace-tomorrow .ace_support.ace_function,\
.ace-tomorrow .ace_variable ***REMOVED***\
color: #4271AE\
***REMOVED***\
.ace-tomorrow .ace_support.ace_class,\
.ace-tomorrow .ace_support.ace_type ***REMOVED***\
color: #C99E00\
***REMOVED***\
.ace-tomorrow .ace_heading,\
.ace-tomorrow .ace_markup.ace_heading,\
.ace-tomorrow .ace_string ***REMOVED***\
color: #718C00\
***REMOVED***\
.ace-tomorrow .ace_entity.ace_name.ace_tag,\
.ace-tomorrow .ace_entity.ace_other.ace_attribute-name,\
.ace-tomorrow .ace_meta.ace_tag,\
.ace-tomorrow .ace_string.ace_regexp,\
.ace-tomorrow .ace_variable ***REMOVED***\
color: #C82829\
***REMOVED***\
.ace-tomorrow .ace_comment ***REMOVED***\
color: #8E908C\
***REMOVED***\
.ace-tomorrow .ace_indent-guide ***REMOVED***\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bdu3f/BwAlfgctduB85QAAAABJRU5ErkJggg==) right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
