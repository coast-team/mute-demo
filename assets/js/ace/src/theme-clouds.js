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

define('ace/theme/clouds', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = false;
exports.cssClass = "ace-clouds";
exports.cssText = ".ace-clouds .ace_gutter ***REMOVED***\
background: #ebebeb;\
color: #333\
***REMOVED***\
.ace-clouds .ace_print-margin ***REMOVED***\
width: 1px;\
background: #e8e8e8\
***REMOVED***\
.ace-clouds ***REMOVED***\
background-color: #FFFFFF;\
color: #000000\
***REMOVED***\
.ace-clouds .ace_cursor ***REMOVED***\
color: #000000\
***REMOVED***\
.ace-clouds .ace_marker-layer .ace_selection ***REMOVED***\
background: #BDD5FC\
***REMOVED***\
.ace-clouds.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #FFFFFF;\
border-radius: 2px\
***REMOVED***\
.ace-clouds .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(255, 255, 0)\
***REMOVED***\
.ace-clouds .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid #BFBFBF\
***REMOVED***\
.ace-clouds .ace_marker-layer .ace_active-line ***REMOVED***\
background: #FFFBD1\
***REMOVED***\
.ace-clouds .ace_gutter-active-line ***REMOVED***\
background-color : #dcdcdc\
***REMOVED***\
.ace-clouds .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid #BDD5FC\
***REMOVED***\
.ace-clouds .ace_invisible ***REMOVED***\
color: #BFBFBF\
***REMOVED***\
.ace-clouds .ace_keyword,\
.ace-clouds .ace_meta,\
.ace-clouds .ace_support.ace_constant.ace_property-value ***REMOVED***\
color: #AF956F\
***REMOVED***\
.ace-clouds .ace_keyword.ace_operator ***REMOVED***\
color: #484848\
***REMOVED***\
.ace-clouds .ace_keyword.ace_other.ace_unit ***REMOVED***\
color: #96DC5F\
***REMOVED***\
.ace-clouds .ace_constant.ace_language ***REMOVED***\
color: #39946A\
***REMOVED***\
.ace-clouds .ace_constant.ace_numeric ***REMOVED***\
color: #46A609\
***REMOVED***\
.ace-clouds .ace_constant.ace_character.ace_entity ***REMOVED***\
color: #BF78CC\
***REMOVED***\
.ace-clouds .ace_invalid ***REMOVED***\
background-color: #FF002A\
***REMOVED***\
.ace-clouds .ace_fold ***REMOVED***\
background-color: #AF956F;\
border-color: #000000\
***REMOVED***\
.ace-clouds .ace_storage,\
.ace-clouds .ace_support.ace_class,\
.ace-clouds .ace_support.ace_function,\
.ace-clouds .ace_support.ace_other,\
.ace-clouds .ace_support.ace_type ***REMOVED***\
color: #C52727\
***REMOVED***\
.ace-clouds .ace_string ***REMOVED***\
color: #5D90CD\
***REMOVED***\
.ace-clouds .ace_comment ***REMOVED***\
color: #BCC8BA\
***REMOVED***\
.ace-clouds .ace_entity.ace_name.ace_tag,\
.ace-clouds .ace_entity.ace_other.ace_attribute-name ***REMOVED***\
color: #606060\
***REMOVED***\
.ace-clouds .ace_indent-guide ***REMOVED***\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
