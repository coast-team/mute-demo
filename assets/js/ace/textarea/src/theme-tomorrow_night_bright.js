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

__ace_shadowed__.define('ace/theme/tomorrow_night_bright', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = true;
exports.cssClass = "ace-tomorrow-night-bright";
exports.cssText = ".ace-tomorrow-night-bright .ace_gutter ***REMOVED***\
background: #1a1a1a;\
color: #DEDEDE\
***REMOVED***\
.ace-tomorrow-night-bright .ace_print-margin ***REMOVED***\
width: 1px;\
background: #1a1a1a\
***REMOVED***\
.ace-tomorrow-night-bright ***REMOVED***\
background-color: #000000;\
color: #DEDEDE\
***REMOVED***\
.ace-tomorrow-night-bright .ace_cursor ***REMOVED***\
color: #9F9F9F\
***REMOVED***\
.ace-tomorrow-night-bright .ace_marker-layer .ace_selection ***REMOVED***\
background: #424242\
***REMOVED***\
.ace-tomorrow-night-bright.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #000000;\
border-radius: 2px\
***REMOVED***\
.ace-tomorrow-night-bright .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(102, 82, 0)\
***REMOVED***\
.ace-tomorrow-night-bright .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid #888888\
***REMOVED***\
.ace-tomorrow-night-bright .ace_marker-layer .ace_highlight ***REMOVED***\
border: 1px solid rgb(110, 119, 0);\
border-bottom: 0;\
box-shadow: inset 0 -1px rgb(110, 119, 0);\
margin: -1px 0 0 -1px;\
background: rgba(255, 235, 0, 0.1);\
***REMOVED***\
.ace-tomorrow-night-bright .ace_marker-layer .ace_active-line ***REMOVED***\
background: #2A2A2A\
***REMOVED***\
.ace-tomorrow-night-bright .ace_gutter-active-line ***REMOVED***\
background-color: #2A2A2A\
***REMOVED***\
.ace-tomorrow-night-bright .ace_stack ***REMOVED***\
background-color: rgb(66, 90, 44)\
***REMOVED***\
.ace-tomorrow-night-bright .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid #888888\
***REMOVED***\
.ace-tomorrow-night-bright .ace_invisible ***REMOVED***\
color: #343434\
***REMOVED***\
.ace-tomorrow-night-bright .ace_keyword,\
.ace-tomorrow-night-bright .ace_meta,\
.ace-tomorrow-night-bright .ace_storage,\
.ace-tomorrow-night-bright .ace_storage.ace_type,\
.ace-tomorrow-night-bright .ace_support.ace_type ***REMOVED***\
color: #C397D8\
***REMOVED***\
.ace-tomorrow-night-bright .ace_keyword.ace_operator ***REMOVED***\
color: #70C0B1\
***REMOVED***\
.ace-tomorrow-night-bright .ace_constant.ace_character,\
.ace-tomorrow-night-bright .ace_constant.ace_language,\
.ace-tomorrow-night-bright .ace_constant.ace_numeric,\
.ace-tomorrow-night-bright .ace_keyword.ace_other.ace_unit,\
.ace-tomorrow-night-bright .ace_support.ace_constant,\
.ace-tomorrow-night-bright .ace_variable.ace_parameter ***REMOVED***\
color: #E78C45\
***REMOVED***\
.ace-tomorrow-night-bright .ace_constant.ace_other ***REMOVED***\
color: #EEEEEE\
***REMOVED***\
.ace-tomorrow-night-bright .ace_invalid ***REMOVED***\
color: #CED2CF;\
background-color: #DF5F5F\
***REMOVED***\
.ace-tomorrow-night-bright .ace_invalid.ace_deprecated ***REMOVED***\
color: #CED2CF;\
background-color: #B798BF\
***REMOVED***\
.ace-tomorrow-night-bright .ace_fold ***REMOVED***\
background-color: #7AA6DA;\
border-color: #DEDEDE\
***REMOVED***\
.ace-tomorrow-night-bright .ace_entity.ace_name.ace_function,\
.ace-tomorrow-night-bright .ace_support.ace_function,\
.ace-tomorrow-night-bright .ace_variable ***REMOVED***\
color: #7AA6DA\
***REMOVED***\
.ace-tomorrow-night-bright .ace_support.ace_class,\
.ace-tomorrow-night-bright .ace_support.ace_type ***REMOVED***\
color: #E7C547\
***REMOVED***\
.ace-tomorrow-night-bright .ace_heading,\
.ace-tomorrow-night-bright .ace_markup.ace_heading,\
.ace-tomorrow-night-bright .ace_string ***REMOVED***\
color: #B9CA4A\
***REMOVED***\
.ace-tomorrow-night-bright .ace_entity.ace_name.ace_tag,\
.ace-tomorrow-night-bright .ace_entity.ace_other.ace_attribute-name,\
.ace-tomorrow-night-bright .ace_meta.ace_tag,\
.ace-tomorrow-night-bright .ace_string.ace_regexp,\
.ace-tomorrow-night-bright .ace_variable ***REMOVED***\
color: #D54E53\
***REMOVED***\
.ace-tomorrow-night-bright .ace_comment ***REMOVED***\
color: #969896\
***REMOVED***\
.ace-tomorrow-night-bright .ace_c9searchresults.ace_keyword ***REMOVED***\
color: #C2C280;\
***REMOVED***\
.ace-tomorrow-night-bright .ace_indent-guide ***REMOVED***\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYFBXV/8PAAJoAXX4kT2EAAAAAElFTkSuQmCC) right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
