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

__ace_shadowed__.define('ace/theme/cobalt', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = true;
exports.cssClass = "ace-cobalt";
exports.cssText = ".ace-cobalt .ace_gutter ***REMOVED***\
background: #011e3a;\
color: #fff\
***REMOVED***\
.ace-cobalt .ace_print-margin ***REMOVED***\
width: 1px;\
background: #011e3a\
***REMOVED***\
.ace-cobalt ***REMOVED***\
background-color: #002240;\
color: #FFFFFF\
***REMOVED***\
.ace-cobalt .ace_cursor ***REMOVED***\
color: #FFFFFF\
***REMOVED***\
.ace-cobalt .ace_marker-layer .ace_selection ***REMOVED***\
background: rgba(179, 101, 57, 0.75)\
***REMOVED***\
.ace-cobalt.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #002240;\
border-radius: 2px\
***REMOVED***\
.ace-cobalt .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(127, 111, 19)\
***REMOVED***\
.ace-cobalt .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid rgba(255, 255, 255, 0.15)\
***REMOVED***\
.ace-cobalt .ace_marker-layer .ace_active-line ***REMOVED***\
background: rgba(0, 0, 0, 0.35)\
***REMOVED***\
.ace-cobalt .ace_gutter-active-line ***REMOVED***\
background-color: rgba(0, 0, 0, 0.35)\
***REMOVED***\
.ace-cobalt .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid rgba(179, 101, 57, 0.75)\
***REMOVED***\
.ace-cobalt .ace_invisible ***REMOVED***\
color: rgba(255, 255, 255, 0.15)\
***REMOVED***\
.ace-cobalt .ace_keyword,\
.ace-cobalt .ace_meta ***REMOVED***\
color: #FF9D00\
***REMOVED***\
.ace-cobalt .ace_constant,\
.ace-cobalt .ace_constant.ace_character,\
.ace-cobalt .ace_constant.ace_character.ace_escape,\
.ace-cobalt .ace_constant.ace_other ***REMOVED***\
color: #FF628C\
***REMOVED***\
.ace-cobalt .ace_invalid ***REMOVED***\
color: #F8F8F8;\
background-color: #800F00\
***REMOVED***\
.ace-cobalt .ace_support ***REMOVED***\
color: #80FFBB\
***REMOVED***\
.ace-cobalt .ace_support.ace_constant ***REMOVED***\
color: #EB939A\
***REMOVED***\
.ace-cobalt .ace_fold ***REMOVED***\
background-color: #FF9D00;\
border-color: #FFFFFF\
***REMOVED***\
.ace-cobalt .ace_support.ace_function ***REMOVED***\
color: #FFB054\
***REMOVED***\
.ace-cobalt .ace_storage ***REMOVED***\
color: #FFEE80\
***REMOVED***\
.ace-cobalt .ace_entity ***REMOVED***\
color: #FFDD00\
***REMOVED***\
.ace-cobalt .ace_string ***REMOVED***\
color: #3AD900\
***REMOVED***\
.ace-cobalt .ace_string.ace_regexp ***REMOVED***\
color: #80FFC2\
***REMOVED***\
.ace-cobalt .ace_comment ***REMOVED***\
font-style: italic;\
color: #0088FF\
***REMOVED***\
.ace-cobalt .ace_heading,\
.ace-cobalt .ace_markup.ace_heading ***REMOVED***\
color: #C8E4FD;\
background-color: #001221\
***REMOVED***\
.ace-cobalt .ace_list,\
.ace-cobalt .ace_markup.ace_list ***REMOVED***\
background-color: #130D26\
***REMOVED***\
.ace-cobalt .ace_variable ***REMOVED***\
color: #CCCCCC\
***REMOVED***\
.ace-cobalt .ace_variable.ace_language ***REMOVED***\
color: #FF80E1\
***REMOVED***\
.ace-cobalt .ace_meta.ace_tag ***REMOVED***\
color: #9EFFFF\
***REMOVED***\
.ace-cobalt .ace_indent-guide ***REMOVED***\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYHCLSvkPAAP3AgSDTRd4AAAAAElFTkSuQmCC) right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
