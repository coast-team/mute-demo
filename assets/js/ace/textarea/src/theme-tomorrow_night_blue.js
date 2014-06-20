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

__ace_shadowed__.define('ace/theme/tomorrow_night_blue', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = true;
exports.cssClass = "ace-tomorrow-night-blue";
exports.cssText = ".ace-tomorrow-night-blue .ace_gutter ***REMOVED***\
background: #00204b;\
color: #7388b5\
***REMOVED***\
.ace-tomorrow-night-blue .ace_print-margin ***REMOVED***\
width: 1px;\
background: #00204b\
***REMOVED***\
.ace-tomorrow-night-blue ***REMOVED***\
background-color: #002451;\
color: #FFFFFF\
***REMOVED***\
.ace-tomorrow-night-blue .ace_constant.ace_other,\
.ace-tomorrow-night-blue .ace_cursor ***REMOVED***\
color: #FFFFFF\
***REMOVED***\
.ace-tomorrow-night-blue .ace_marker-layer .ace_selection ***REMOVED***\
background: #003F8E\
***REMOVED***\
.ace-tomorrow-night-blue.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #002451;\
border-radius: 2px\
***REMOVED***\
.ace-tomorrow-night-blue .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(127, 111, 19)\
***REMOVED***\
.ace-tomorrow-night-blue .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid #404F7D\
***REMOVED***\
.ace-tomorrow-night-blue .ace_marker-layer .ace_active-line ***REMOVED***\
background: #00346E\
***REMOVED***\
.ace-tomorrow-night-blue .ace_gutter-active-line ***REMOVED***\
background-color: #022040\
***REMOVED***\
.ace-tomorrow-night-blue .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid #003F8E\
***REMOVED***\
.ace-tomorrow-night-blue .ace_invisible ***REMOVED***\
color: #404F7D\
***REMOVED***\
.ace-tomorrow-night-blue .ace_keyword,\
.ace-tomorrow-night-blue .ace_meta,\
.ace-tomorrow-night-blue .ace_storage,\
.ace-tomorrow-night-blue .ace_storage.ace_type,\
.ace-tomorrow-night-blue .ace_support.ace_type ***REMOVED***\
color: #EBBBFF\
***REMOVED***\
.ace-tomorrow-night-blue .ace_keyword.ace_operator ***REMOVED***\
color: #99FFFF\
***REMOVED***\
.ace-tomorrow-night-blue .ace_constant.ace_character,\
.ace-tomorrow-night-blue .ace_constant.ace_language,\
.ace-tomorrow-night-blue .ace_constant.ace_numeric,\
.ace-tomorrow-night-blue .ace_keyword.ace_other.ace_unit,\
.ace-tomorrow-night-blue .ace_support.ace_constant,\
.ace-tomorrow-night-blue .ace_variable.ace_parameter ***REMOVED***\
color: #FFC58F\
***REMOVED***\
.ace-tomorrow-night-blue .ace_invalid ***REMOVED***\
color: #FFFFFF;\
background-color: #F99DA5\
***REMOVED***\
.ace-tomorrow-night-blue .ace_invalid.ace_deprecated ***REMOVED***\
color: #FFFFFF;\
background-color: #EBBBFF\
***REMOVED***\
.ace-tomorrow-night-blue .ace_fold ***REMOVED***\
background-color: #BBDAFF;\
border-color: #FFFFFF\
***REMOVED***\
.ace-tomorrow-night-blue .ace_entity.ace_name.ace_function,\
.ace-tomorrow-night-blue .ace_support.ace_function,\
.ace-tomorrow-night-blue .ace_variable ***REMOVED***\
color: #BBDAFF\
***REMOVED***\
.ace-tomorrow-night-blue .ace_support.ace_class,\
.ace-tomorrow-night-blue .ace_support.ace_type ***REMOVED***\
color: #FFEEAD\
***REMOVED***\
.ace-tomorrow-night-blue .ace_heading,\
.ace-tomorrow-night-blue .ace_markup.ace_heading,\
.ace-tomorrow-night-blue .ace_string ***REMOVED***\
color: #D1F1A9\
***REMOVED***\
.ace-tomorrow-night-blue .ace_entity.ace_name.ace_tag,\
.ace-tomorrow-night-blue .ace_entity.ace_other.ace_attribute-name,\
.ace-tomorrow-night-blue .ace_meta.ace_tag,\
.ace-tomorrow-night-blue .ace_string.ace_regexp,\
.ace-tomorrow-night-blue .ace_variable ***REMOVED***\
color: #FF9DA4\
***REMOVED***\
.ace-tomorrow-night-blue .ace_comment ***REMOVED***\
color: #7285B7\
***REMOVED***\
.ace-tomorrow-night-blue .ace_indent-guide ***REMOVED***\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYJDzqfwPAANXAeNsiA+ZAAAAAElFTkSuQmCC) right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
