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

define('ace/theme/monokai', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = true;
exports.cssClass = "ace-monokai";
exports.cssText = ".ace-monokai .ace_gutter ***REMOVED***\
background: #2F3129;\
color: #8F908A\
***REMOVED***\
.ace-monokai .ace_print-margin ***REMOVED***\
width: 1px;\
background: #555651\
***REMOVED***\
.ace-monokai ***REMOVED***\
background-color: #272822;\
color: #F8F8F2\
***REMOVED***\
.ace-monokai .ace_cursor ***REMOVED***\
color: #F8F8F0\
***REMOVED***\
.ace-monokai .ace_marker-layer .ace_selection ***REMOVED***\
background: #49483E\
***REMOVED***\
.ace-monokai.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #272822;\
border-radius: 2px\
***REMOVED***\
.ace-monokai .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(102, 82, 0)\
***REMOVED***\
.ace-monokai .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid #49483E\
***REMOVED***\
.ace-monokai .ace_marker-layer .ace_active-line ***REMOVED***\
background: #202020\
***REMOVED***\
.ace-monokai .ace_gutter-active-line ***REMOVED***\
background-color: #272727\
***REMOVED***\
.ace-monokai .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid #49483E\
***REMOVED***\
.ace-monokai .ace_invisible ***REMOVED***\
color: #52524d\
***REMOVED***\
.ace-monokai .ace_entity.ace_name.ace_tag,\
.ace-monokai .ace_keyword,\
.ace-monokai .ace_meta.ace_tag,\
.ace-monokai .ace_storage ***REMOVED***\
color: #F92672\
***REMOVED***\
.ace-monokai .ace_punctuation,\
.ace-monokai .ace_punctuation.ace_tag ***REMOVED***\
color: #fff\
***REMOVED***\
.ace-monokai .ace_constant.ace_character,\
.ace-monokai .ace_constant.ace_language,\
.ace-monokai .ace_constant.ace_numeric,\
.ace-monokai .ace_constant.ace_other ***REMOVED***\
color: #AE81FF\
***REMOVED***\
.ace-monokai .ace_invalid ***REMOVED***\
color: #F8F8F0;\
background-color: #F92672\
***REMOVED***\
.ace-monokai .ace_invalid.ace_deprecated ***REMOVED***\
color: #F8F8F0;\
background-color: #AE81FF\
***REMOVED***\
.ace-monokai .ace_support.ace_constant,\
.ace-monokai .ace_support.ace_function ***REMOVED***\
color: #66D9EF\
***REMOVED***\
.ace-monokai .ace_fold ***REMOVED***\
background-color: #A6E22E;\
border-color: #F8F8F2\
***REMOVED***\
.ace-monokai .ace_storage.ace_type,\
.ace-monokai .ace_support.ace_class,\
.ace-monokai .ace_support.ace_type ***REMOVED***\
font-style: italic;\
color: #66D9EF\
***REMOVED***\
.ace-monokai .ace_entity.ace_name.ace_function,\
.ace-monokai .ace_entity.ace_other,\
.ace-monokai .ace_entity.ace_other.ace_attribute-name,\
.ace-monokai .ace_variable ***REMOVED***\
color: #A6E22E\
***REMOVED***\
.ace-monokai .ace_variable.ace_parameter ***REMOVED***\
font-style: italic;\
color: #FD971F\
***REMOVED***\
.ace-monokai .ace_string ***REMOVED***\
color: #E6DB74\
***REMOVED***\
.ace-monokai .ace_comment ***REMOVED***\
color: #75715E\
***REMOVED***\
.ace-monokai .ace_indent-guide ***REMOVED***\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
