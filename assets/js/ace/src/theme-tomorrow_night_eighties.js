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

define('ace/theme/tomorrow_night_eighties', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = true;
exports.cssClass = "ace-tomorrow-night-eighties";
exports.cssText = ".ace-tomorrow-night-eighties .ace_gutter ***REMOVED***\
background: #272727;\
color: #CCC\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_print-margin ***REMOVED***\
width: 1px;\
background: #272727\
***REMOVED***\
.ace-tomorrow-night-eighties ***REMOVED***\
background-color: #2D2D2D;\
color: #CCCCCC\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_constant.ace_other,\
.ace-tomorrow-night-eighties .ace_cursor ***REMOVED***\
color: #CCCCCC\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_marker-layer .ace_selection ***REMOVED***\
background: #515151\
***REMOVED***\
.ace-tomorrow-night-eighties.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #2D2D2D;\
border-radius: 2px\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(102, 82, 0)\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid #6A6A6A\
***REMOVED***\
.ace-tomorrow-night-bright .ace_stack ***REMOVED***\
background: rgb(66, 90, 44)\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_marker-layer .ace_active-line ***REMOVED***\
background: #393939\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_gutter-active-line ***REMOVED***\
background-color: #393939\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid #515151\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_invisible ***REMOVED***\
color: #6A6A6A\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_keyword,\
.ace-tomorrow-night-eighties .ace_meta,\
.ace-tomorrow-night-eighties .ace_storage,\
.ace-tomorrow-night-eighties .ace_storage.ace_type,\
.ace-tomorrow-night-eighties .ace_support.ace_type ***REMOVED***\
color: #CC99CC\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_keyword.ace_operator ***REMOVED***\
color: #66CCCC\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_constant.ace_character,\
.ace-tomorrow-night-eighties .ace_constant.ace_language,\
.ace-tomorrow-night-eighties .ace_constant.ace_numeric,\
.ace-tomorrow-night-eighties .ace_keyword.ace_other.ace_unit,\
.ace-tomorrow-night-eighties .ace_support.ace_constant,\
.ace-tomorrow-night-eighties .ace_variable.ace_parameter ***REMOVED***\
color: #F99157\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_invalid ***REMOVED***\
color: #CDCDCD;\
background-color: #F2777A\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_invalid.ace_deprecated ***REMOVED***\
color: #CDCDCD;\
background-color: #CC99CC\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_fold ***REMOVED***\
background-color: #6699CC;\
border-color: #CCCCCC\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_entity.ace_name.ace_function,\
.ace-tomorrow-night-eighties .ace_support.ace_function,\
.ace-tomorrow-night-eighties .ace_variable ***REMOVED***\
color: #6699CC\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_support.ace_class,\
.ace-tomorrow-night-eighties .ace_support.ace_type ***REMOVED***\
color: #FFCC66\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_heading,\
.ace-tomorrow-night-eighties .ace_markup.ace_heading,\
.ace-tomorrow-night-eighties .ace_string ***REMOVED***\
color: #99CC99\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_comment ***REMOVED***\
color: #999999\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_entity.ace_name.ace_tag,\
.ace-tomorrow-night-eighties .ace_entity.ace_other.ace_attribute-name,\
.ace-tomorrow-night-eighties .ace_meta.ace_tag,\
.ace-tomorrow-night-eighties .ace_variable ***REMOVED***\
color: #F2777A\
***REMOVED***\
.ace-tomorrow-night-eighties .ace_indent-guide ***REMOVED***\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ09NrYAgMjP4PAAtGAwchHMyAAAAAAElFTkSuQmCC) right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
