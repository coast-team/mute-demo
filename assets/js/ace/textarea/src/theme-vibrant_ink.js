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

__ace_shadowed__.define('ace/theme/vibrant_ink', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = true;
exports.cssClass = "ace-vibrant-ink";
exports.cssText = ".ace-vibrant-ink .ace_gutter ***REMOVED***\
background: #1a1a1a;\
color: #BEBEBE\
***REMOVED***\
.ace-vibrant-ink .ace_print-margin ***REMOVED***\
width: 1px;\
background: #1a1a1a\
***REMOVED***\
.ace-vibrant-ink ***REMOVED***\
background-color: #0F0F0F;\
color: #FFFFFF\
***REMOVED***\
.ace-vibrant-ink .ace_cursor ***REMOVED***\
color: #FFFFFF\
***REMOVED***\
.ace-vibrant-ink .ace_marker-layer .ace_selection ***REMOVED***\
background: #6699CC\
***REMOVED***\
.ace-vibrant-ink.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #0F0F0F;\
border-radius: 2px\
***REMOVED***\
.ace-vibrant-ink .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(102, 82, 0)\
***REMOVED***\
.ace-vibrant-ink .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid #404040\
***REMOVED***\
.ace-vibrant-ink .ace_marker-layer .ace_active-line ***REMOVED***\
background: #333333\
***REMOVED***\
.ace-vibrant-ink .ace_gutter-active-line ***REMOVED***\
background-color: #333333\
***REMOVED***\
.ace-vibrant-ink .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid #6699CC\
***REMOVED***\
.ace-vibrant-ink .ace_invisible ***REMOVED***\
color: #404040\
***REMOVED***\
.ace-vibrant-ink .ace_keyword,\
.ace-vibrant-ink .ace_meta ***REMOVED***\
color: #FF6600\
***REMOVED***\
.ace-vibrant-ink .ace_constant,\
.ace-vibrant-ink .ace_constant.ace_character,\
.ace-vibrant-ink .ace_constant.ace_character.ace_escape,\
.ace-vibrant-ink .ace_constant.ace_other ***REMOVED***\
color: #339999\
***REMOVED***\
.ace-vibrant-ink .ace_constant.ace_numeric ***REMOVED***\
color: #99CC99\
***REMOVED***\
.ace-vibrant-ink .ace_invalid,\
.ace-vibrant-ink .ace_invalid.ace_deprecated ***REMOVED***\
color: #CCFF33;\
background-color: #000000\
***REMOVED***\
.ace-vibrant-ink .ace_fold ***REMOVED***\
background-color: #FFCC00;\
border-color: #FFFFFF\
***REMOVED***\
.ace-vibrant-ink .ace_entity.ace_name.ace_function,\
.ace-vibrant-ink .ace_support.ace_function,\
.ace-vibrant-ink .ace_variable ***REMOVED***\
color: #FFCC00\
***REMOVED***\
.ace-vibrant-ink .ace_variable.ace_parameter ***REMOVED***\
font-style: italic\
***REMOVED***\
.ace-vibrant-ink .ace_string ***REMOVED***\
color: #66FF00\
***REMOVED***\
.ace-vibrant-ink .ace_string.ace_regexp ***REMOVED***\
color: #44B4CC\
***REMOVED***\
.ace-vibrant-ink .ace_comment ***REMOVED***\
color: #9933CC\
***REMOVED***\
.ace-vibrant-ink .ace_entity.ace_other.ace_attribute-name ***REMOVED***\
font-style: italic;\
color: #99CC99\
***REMOVED***\
.ace-vibrant-ink .ace_indent-guide ***REMOVED***\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYNDTc/oPAALPAZ7hxlbYAAAAAElFTkSuQmCC) right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
