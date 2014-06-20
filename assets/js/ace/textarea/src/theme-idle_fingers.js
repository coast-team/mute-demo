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

__ace_shadowed__.define('ace/theme/idle_fingers', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = true;
exports.cssClass = "ace-idle-fingers";
exports.cssText = ".ace-idle-fingers .ace_gutter ***REMOVED***\
background: #3b3b3b;\
color: #fff\
***REMOVED***\
.ace-idle-fingers .ace_print-margin ***REMOVED***\
width: 1px;\
background: #3b3b3b\
***REMOVED***\
.ace-idle-fingers ***REMOVED***\
background-color: #323232;\
color: #FFFFFF\
***REMOVED***\
.ace-idle-fingers .ace_cursor ***REMOVED***\
color: #91FF00\
***REMOVED***\
.ace-idle-fingers .ace_marker-layer .ace_selection ***REMOVED***\
background: rgba(90, 100, 126, 0.88)\
***REMOVED***\
.ace-idle-fingers.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px #323232;\
border-radius: 2px\
***REMOVED***\
.ace-idle-fingers .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(102, 82, 0)\
***REMOVED***\
.ace-idle-fingers .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid #404040\
***REMOVED***\
.ace-idle-fingers .ace_marker-layer .ace_active-line ***REMOVED***\
background: #353637\
***REMOVED***\
.ace-idle-fingers .ace_gutter-active-line ***REMOVED***\
background-color: #353637\
***REMOVED***\
.ace-idle-fingers .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid rgba(90, 100, 126, 0.88)\
***REMOVED***\
.ace-idle-fingers .ace_invisible ***REMOVED***\
color: #404040\
***REMOVED***\
.ace-idle-fingers .ace_keyword,\
.ace-idle-fingers .ace_meta ***REMOVED***\
color: #CC7833\
***REMOVED***\
.ace-idle-fingers .ace_constant,\
.ace-idle-fingers .ace_constant.ace_character,\
.ace-idle-fingers .ace_constant.ace_character.ace_escape,\
.ace-idle-fingers .ace_constant.ace_other,\
.ace-idle-fingers .ace_support.ace_constant ***REMOVED***\
color: #6C99BB\
***REMOVED***\
.ace-idle-fingers .ace_invalid ***REMOVED***\
color: #FFFFFF;\
background-color: #FF0000\
***REMOVED***\
.ace-idle-fingers .ace_fold ***REMOVED***\
background-color: #CC7833;\
border-color: #FFFFFF\
***REMOVED***\
.ace-idle-fingers .ace_support.ace_function ***REMOVED***\
color: #B83426\
***REMOVED***\
.ace-idle-fingers .ace_variable.ace_parameter ***REMOVED***\
font-style: italic\
***REMOVED***\
.ace-idle-fingers .ace_string ***REMOVED***\
color: #A5C261\
***REMOVED***\
.ace-idle-fingers .ace_string.ace_regexp ***REMOVED***\
color: #CCCC33\
***REMOVED***\
.ace-idle-fingers .ace_comment ***REMOVED***\
font-style: italic;\
color: #BC9458\
***REMOVED***\
.ace-idle-fingers .ace_meta.ace_tag ***REMOVED***\
color: #FFE5BB\
***REMOVED***\
.ace-idle-fingers .ace_entity.ace_name ***REMOVED***\
color: #FFC66D\
***REMOVED***\
.ace-idle-fingers .ace_collab.ace_user1 ***REMOVED***\
color: #323232;\
background-color: #FFF980\
***REMOVED***\
.ace-idle-fingers .ace_indent-guide ***REMOVED***\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWMwMjLyZYiPj/8PAAreAwAI1+g0AAAAAElFTkSuQmCC) right repeat-y\
***REMOVED***";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
