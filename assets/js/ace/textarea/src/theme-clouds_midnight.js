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

__ace_shadowed__.define('ace/theme/clouds_midnight', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = true;
exports.cssClass = "ace-clouds-midnight";
exports.cssText = ".ace-clouds-midnight .ace_gutter ***REMOVED***\
background: #232323;\
color: #929292\
***REMOVED***\
.ace-clouds-midnight .ace_print-margin ***REMOVED***\
width: 1px;\
background: #232323\
***REMOVED***\
.ace-clouds-midnight ***REMOVED***\
background-color: #191919;\
color: #929292\
***REMOVED***\
.ace-clouds-midnight .ace_cursor ***REMOVED***\
color: #7DA5DC\
***REMOVED***\
.ace-clouds-midnight .ace_marker-layer .ace_selection ***REMOVED***\
background: #000000\
***REMOVED***\
.ace-clouds-midnight.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #191919;\
border-radius: 2px\
***REMOVED***\
.ace-clouds-midnight .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(102, 82, 0)\
***REMOVED***\
.ace-clouds-midnight .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid #BFBFBF\
***REMOVED***\
.ace-clouds-midnight .ace_marker-layer .ace_active-line ***REMOVED***\
background: rgba(215, 215, 215, 0.031)\
***REMOVED***\
.ace-clouds-midnight .ace_gutter-active-line ***REMOVED***\
background-color: rgba(215, 215, 215, 0.031)\
***REMOVED***\
.ace-clouds-midnight .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid #000000\
***REMOVED***\
.ace-clouds-midnight .ace_invisible ***REMOVED***\
color: #BFBFBF\
***REMOVED***\
.ace-clouds-midnight .ace_keyword,\
.ace-clouds-midnight .ace_meta,\
.ace-clouds-midnight .ace_support.ace_constant.ace_property-value ***REMOVED***\
color: #927C5D\
***REMOVED***\
.ace-clouds-midnight .ace_keyword.ace_operator ***REMOVED***\
color: #4B4B4B\
***REMOVED***\
.ace-clouds-midnight .ace_keyword.ace_other.ace_unit ***REMOVED***\
color: #366F1A\
***REMOVED***\
.ace-clouds-midnight .ace_constant.ace_language ***REMOVED***\
color: #39946A\
***REMOVED***\
.ace-clouds-midnight .ace_constant.ace_numeric ***REMOVED***\
color: #46A609\
***REMOVED***\
.ace-clouds-midnight .ace_constant.ace_character.ace_entity ***REMOVED***\
color: #A165AC\
***REMOVED***\
.ace-clouds-midnight .ace_invalid ***REMOVED***\
color: #FFFFFF;\
background-color: #E92E2E\
***REMOVED***\
.ace-clouds-midnight .ace_fold ***REMOVED***\
background-color: #927C5D;\
border-color: #929292\
***REMOVED***\
.ace-clouds-midnight .ace_storage,\
.ace-clouds-midnight .ace_support.ace_class,\
.ace-clouds-midnight .ace_support.ace_function,\
.ace-clouds-midnight .ace_support.ace_other,\
.ace-clouds-midnight .ace_support.ace_type ***REMOVED***\
color: #E92E2E\
***REMOVED***\
.ace-clouds-midnight .ace_string ***REMOVED***\
color: #5D90CD\
***REMOVED***\
.ace-clouds-midnight .ace_comment ***REMOVED***\
color: #3C403B\
***REMOVED***\
.ace-clouds-midnight .ace_entity.ace_name.ace_tag,\
.ace-clouds-midnight .ace_entity.ace_other.ace_attribute-name ***REMOVED***\
color: #606060\
***REMOVED***\
.ace-clouds-midnight .ace_indent-guide ***REMOVED***\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYHB3d/8PAAOIAdULw8qMAAAAAElFTkSuQmCC) right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
