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

define('ace/theme/eclipse', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***


exports.isDark = false;
exports.cssText = ".ace-eclipse .ace_gutter ***REMOVED***\
background: #ebebeb;\
border-right: 1px solid rgb(159, 159, 159);\
color: rgb(136, 136, 136);\
***REMOVED***\
.ace-eclipse .ace_print-margin ***REMOVED***\
width: 1px;\
background: #ebebeb;\
***REMOVED***\
.ace-eclipse ***REMOVED***\
background-color: #FFFFFF;\
color: black;\
***REMOVED***\
.ace-eclipse .ace_fold ***REMOVED***\
background-color: rgb(60, 76, 114);\
***REMOVED***\
.ace-eclipse .ace_cursor ***REMOVED***\
color: black;\
***REMOVED***\
.ace-eclipse .ace_storage,\
.ace-eclipse .ace_keyword,\
.ace-eclipse .ace_variable ***REMOVED***\
color: rgb(127, 0, 85);\
***REMOVED***\
.ace-eclipse .ace_constant.ace_buildin ***REMOVED***\
color: rgb(88, 72, 246);\
***REMOVED***\
.ace-eclipse .ace_constant.ace_library ***REMOVED***\
color: rgb(6, 150, 14);\
***REMOVED***\
.ace-eclipse .ace_function ***REMOVED***\
color: rgb(60, 76, 114);\
***REMOVED***\
.ace-eclipse .ace_string ***REMOVED***\
color: rgb(42, 0, 255);\
***REMOVED***\
.ace-eclipse .ace_comment ***REMOVED***\
color: rgb(113, 150, 130);\
***REMOVED***\
.ace-eclipse .ace_comment.ace_doc ***REMOVED***\
color: rgb(63, 95, 191);\
***REMOVED***\
.ace-eclipse .ace_comment.ace_doc.ace_tag ***REMOVED***\
color: rgb(127, 159, 191);\
***REMOVED***\
.ace-eclipse .ace_constant.ace_numeric ***REMOVED***\
color: darkblue;\
***REMOVED***\
.ace-eclipse .ace_tag ***REMOVED***\
color: rgb(25, 118, 116);\
***REMOVED***\
.ace-eclipse .ace_type ***REMOVED***\
color: rgb(127, 0, 127);\
***REMOVED***\
.ace-eclipse .ace_xml-pe ***REMOVED***\
color: rgb(104, 104, 91);\
***REMOVED***\
.ace-eclipse .ace_marker-layer .ace_selection ***REMOVED***\
background: rgb(181, 213, 255);\
***REMOVED***\
.ace-eclipse .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
***REMOVED***\
.ace-eclipse .ace_meta.ace_tag ***REMOVED***\
color:rgb(25, 118, 116);\
***REMOVED***\
.ace-eclipse .ace_invisible ***REMOVED***\
color: #ddd;\
***REMOVED***\
.ace-eclipse .ace_entity.ace_other.ace_attribute-name ***REMOVED***\
color:rgb(127, 0, 127);\
***REMOVED***\
.ace-eclipse .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(255, 255, 0);\
***REMOVED***\
.ace-eclipse .ace_marker-layer .ace_active-line ***REMOVED***\
background: rgb(232, 242, 254);\
***REMOVED***\
.ace-eclipse .ace_marker-layer .ace_selected-word ***REMOVED***\
border: 1px solid rgb(181, 213, 255);\
***REMOVED***\
.ace-eclipse .ace_indent-guide ***REMOVED***\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
***REMOVED***";

exports.cssClass = "ace-eclipse";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);
