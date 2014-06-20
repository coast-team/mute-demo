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

__ace_shadowed__.define('ace/theme/twilight', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = true;
exports.cssClass = "ace-twilight";
exports.cssText = ".ace-twilight .ace_gutter ***REMOVED***\
background: #232323;\
color: #E2E2E2\
***REMOVED***\
.ace-twilight .ace_print-margin ***REMOVED***\
width: 1px;\
background: #232323\
***REMOVED***\
.ace-twilight ***REMOVED***\
background-color: #141414;\
color: #F8F8F8\
***REMOVED***\
.ace-twilight .ace_cursor ***REMOVED***\
color: #A7A7A7\
***REMOVED***\
.ace-twilight .ace_marker-layer .ace_selection ***REMOVED***\
background: rgba(221, 240, 255, 0.20)\
***REMOVED***\
.ace-twilight.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #141414;\
border-radius: 2px\
***REMOVED***\
.ace-twilight .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(102, 82, 0)\
***REMOVED***\
.ace-twilight .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid rgba(255, 255, 255, 0.25)\
***REMOVED***\
.ace-twilight .ace_marker-layer .ace_active-line ***REMOVED***\
background: rgba(255, 255, 255, 0.031)\
***REMOVED***\
.ace-twilight .ace_gutter-active-line ***REMOVED***\
background-color: rgba(255, 255, 255, 0.031)\
***REMOVED***\
.ace-twilight .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid rgba(221, 240, 255, 0.20)\
***REMOVED***\
.ace-twilight .ace_invisible ***REMOVED***\
color: rgba(255, 255, 255, 0.25)\
***REMOVED***\
.ace-twilight .ace_keyword,\
.ace-twilight .ace_meta ***REMOVED***\
color: #CDA869\
***REMOVED***\
.ace-twilight .ace_constant,\
.ace-twilight .ace_constant.ace_character,\
.ace-twilight .ace_constant.ace_character.ace_escape,\
.ace-twilight .ace_constant.ace_other,\
.ace-twilight .ace_heading,\
.ace-twilight .ace_markup.ace_heading,\
.ace-twilight .ace_support.ace_constant ***REMOVED***\
color: #CF6A4C\
***REMOVED***\
.ace-twilight .ace_invalid.ace_illegal ***REMOVED***\
color: #F8F8F8;\
background-color: rgba(86, 45, 86, 0.75)\
***REMOVED***\
.ace-twilight .ace_invalid.ace_deprecated ***REMOVED***\
text-decoration: underline;\
font-style: italic;\
color: #D2A8A1\
***REMOVED***\
.ace-twilight .ace_support ***REMOVED***\
color: #9B859D\
***REMOVED***\
.ace-twilight .ace_fold ***REMOVED***\
background-color: #AC885B;\
border-color: #F8F8F8\
***REMOVED***\
.ace-twilight .ace_support.ace_function ***REMOVED***\
color: #DAD085\
***REMOVED***\
.ace-twilight .ace_list,\
.ace-twilight .ace_markup.ace_list,\
.ace-twilight .ace_storage ***REMOVED***\
color: #F9EE98\
***REMOVED***\
.ace-twilight .ace_entity.ace_name.ace_function,\
.ace-twilight .ace_meta.ace_tag,\
.ace-twilight .ace_variable ***REMOVED***\
color: #AC885B\
***REMOVED***\
.ace-twilight .ace_string ***REMOVED***\
color: #8F9D6A\
***REMOVED***\
.ace-twilight .ace_string.ace_regexp ***REMOVED***\
color: #E9C062\
***REMOVED***\
.ace-twilight .ace_comment ***REMOVED***\
font-style: italic;\
color: #5F5A60\
***REMOVED***\
.ace-twilight .ace_variable ***REMOVED***\
color: #7587A6\
***REMOVED***\
.ace-twilight .ace_xml-pe ***REMOVED***\
color: #494949\
***REMOVED***\
.ace-twilight .ace_indent-guide ***REMOVED***\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWMQERFpYLC1tf0PAAgOAnPnhxyiAAAAAElFTkSuQmCC) right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
