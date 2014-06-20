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

__ace_shadowed__.define('ace/theme/mono_industrial', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = true;
exports.cssClass = "ace-mono-industrial";
exports.cssText = ".ace-mono-industrial .ace_gutter ***REMOVED***\
background: #1d2521;\
color: #C5C9C9\
***REMOVED***\
.ace-mono-industrial .ace_print-margin ***REMOVED***\
width: 1px;\
background: #555651\
***REMOVED***\
.ace-mono-industrial ***REMOVED***\
background-color: #222C28;\
color: #FFFFFF\
***REMOVED***\
.ace-mono-industrial .ace_cursor ***REMOVED***\
color: #FFFFFF\
***REMOVED***\
.ace-mono-industrial .ace_marker-layer .ace_selection ***REMOVED***\
background: rgba(145, 153, 148, 0.40)\
***REMOVED***\
.ace-mono-industrial.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #222C28;\
border-radius: 2px\
***REMOVED***\
.ace-mono-industrial .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(102, 82, 0)\
***REMOVED***\
.ace-mono-industrial .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid rgba(102, 108, 104, 0.50)\
***REMOVED***\
.ace-mono-industrial .ace_marker-layer .ace_active-line ***REMOVED***\
background: rgba(12, 13, 12, 0.25)\
***REMOVED***\
.ace-mono-industrial .ace_gutter-active-line ***REMOVED***\
background-color: rgba(12, 13, 12, 0.25)\
***REMOVED***\
.ace-mono-industrial .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid rgba(145, 153, 148, 0.40)\
***REMOVED***\
.ace-mono-industrial .ace_invisible ***REMOVED***\
color: rgba(102, 108, 104, 0.50)\
***REMOVED***\
.ace-mono-industrial .ace_string ***REMOVED***\
background-color: #151C19;\
color: #FFFFFF\
***REMOVED***\
.ace-mono-industrial .ace_keyword,\
.ace-mono-industrial .ace_meta ***REMOVED***\
color: #A39E64\
***REMOVED***\
.ace-mono-industrial .ace_constant,\
.ace-mono-industrial .ace_constant.ace_character,\
.ace-mono-industrial .ace_constant.ace_character.ace_escape,\
.ace-mono-industrial .ace_constant.ace_numeric,\
.ace-mono-industrial .ace_constant.ace_other ***REMOVED***\
color: #E98800\
***REMOVED***\
.ace-mono-industrial .ace_entity.ace_name.ace_function,\
.ace-mono-industrial .ace_keyword.ace_operator,\
.ace-mono-industrial .ace_variable ***REMOVED***\
color: #A8B3AB\
***REMOVED***\
.ace-mono-industrial .ace_invalid ***REMOVED***\
color: #FFFFFF;\
background-color: rgba(153, 0, 0, 0.68)\
***REMOVED***\
.ace-mono-industrial .ace_support.ace_constant ***REMOVED***\
color: #C87500\
***REMOVED***\
.ace-mono-industrial .ace_fold ***REMOVED***\
background-color: #A8B3AB;\
border-color: #FFFFFF\
***REMOVED***\
.ace-mono-industrial .ace_support.ace_function ***REMOVED***\
color: #588E60\
***REMOVED***\
.ace-mono-industrial .ace_entity.ace_name,\
.ace-mono-industrial .ace_support.ace_class,\
.ace-mono-industrial .ace_support.ace_type ***REMOVED***\
color: #5778B6\
***REMOVED***\
.ace-mono-industrial .ace_storage ***REMOVED***\
color: #C23B00\
***REMOVED***\
.ace-mono-industrial .ace_variable.ace_language,\
.ace-mono-industrial .ace_variable.ace_parameter ***REMOVED***\
color: #648BD2\
***REMOVED***\
.ace-mono-industrial .ace_comment ***REMOVED***\
color: #666C68;\
background-color: #151C19\
***REMOVED***\
.ace-mono-industrial .ace_entity.ace_other.ace_attribute-name ***REMOVED***\
color: #909993\
***REMOVED***\
.ace-mono-industrial .ace_entity.ace_name.ace_tag ***REMOVED***\
color: #A65EFF\
***REMOVED***\
.ace-mono-industrial .ace_indent-guide ***REMOVED***\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNQ1NbwZfALD/4PAAlTArlEC4r/AAAAAElFTkSuQmCC) right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
