/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 * 
 * Copyright 2011 Irakli Gozalishvili. All rights reserved.
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 * ***** END LICENSE BLOCK ***** */

define('ace/theme/chaos', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

exports.isDark = true;
exports.cssClass = "ace-chaos";
exports.cssText = ".ace-chaos .ace_gutter ***REMOVED***\
background: #141414;\
color: #595959;\
border-right: 1px solid #282828;\
***REMOVED***\
.ace-chaos .ace_gutter-cell.ace_warning ***REMOVED***\
background-image: none;\
background: #FC0;\
border-left: none;\
padding-left: 0;\
color: #000;\
***REMOVED***\
.ace-chaos .ace_gutter-cell.ace_error ***REMOVED***\
background-position: -6px center;\
background-image: none;\
background: #F10;\
border-left: none;\
padding-left: 0;\
color: #000;\
***REMOVED***\
.ace-chaos .ace_print-margin ***REMOVED***\
border-left: 1px solid #555;\
right: 0;\
background: #1D1D1D;\
***REMOVED***\
.ace-chaos ***REMOVED***\
background-color: #161616;\
color: #E6E1DC;\
***REMOVED***\
.ace-chaos .ace_cursor ***REMOVED***\
border-left: 2px solid #FFFFFF;\
***REMOVED***\
.ace-chaos .ace_cursor.ace_overwrite ***REMOVED***\
border-left: 0px;\
border-bottom: 1px solid #FFFFFF;\
***REMOVED***\
.ace-chaos .ace_marker-layer .ace_selection ***REMOVED***\
background: #494836;\
***REMOVED***\
.ace-chaos .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(198, 219, 174);\
***REMOVED***\
.ace-chaos .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid #FCE94F;\
***REMOVED***\
.ace-chaos .ace_marker-layer .ace_active-line ***REMOVED***\
background: #333;\
***REMOVED***\
.ace-chaos .ace_gutter-active-line ***REMOVED***\
background-color: #222;\
***REMOVED***\
.ace-chaos .ace_invisible ***REMOVED***\
color: #404040;\
***REMOVED***\
.ace-chaos .ace_keyword ***REMOVED***\
color:#00698F;\
***REMOVED***\
.ace-chaos .ace_keyword.ace_operator ***REMOVED***\
color:#FF308F;\
***REMOVED***\
.ace-chaos .ace_constant ***REMOVED***\
color:#1EDAFB;\
***REMOVED***\
.ace-chaos .ace_constant.ace_language ***REMOVED***\
color:#FDC251;\
***REMOVED***\
.ace-chaos .ace_constant.ace_library ***REMOVED***\
color:#8DFF0A;\
***REMOVED***\
.ace-chaos .ace_constant.ace_numeric ***REMOVED***\
color:#58C554;\
***REMOVED***\
.ace-chaos .ace_invalid ***REMOVED***\
color:#FFFFFF;\
background-color:#990000;\
***REMOVED***\
.ace-chaos .ace_invalid.ace_deprecated ***REMOVED***\
color:#FFFFFF;\
background-color:#990000;\
***REMOVED***\
.ace-chaos .ace_support ***REMOVED***\
color: #999;\
***REMOVED***\
.ace-chaos .ace_support.ace_function ***REMOVED***\
color:#00AEEF;\
***REMOVED***\
.ace-chaos .ace_function ***REMOVED***\
color:#00AEEF;\
***REMOVED***\
.ace-chaos .ace_string ***REMOVED***\
color:#58C554;\
***REMOVED***\
.ace-chaos .ace_comment ***REMOVED***\
color:#555;\
font-style:italic;\
padding-bottom: 0px;\
***REMOVED***\
.ace-chaos .ace_variable ***REMOVED***\
color:#997744;\
***REMOVED***\
.ace-chaos .ace_meta.ace_tag ***REMOVED***\
color:#BE53E6;\
***REMOVED***\
.ace-chaos .ace_entity.ace_other.ace_attribute-name ***REMOVED***\
color:#FFFF89;\
***REMOVED***\
.ace-chaos .ace_markup.ace_underline ***REMOVED***\
text-decoration: underline;\
***REMOVED***\
.ace-chaos .ace_fold-widget ***REMOVED***\
text-align: center;\
***REMOVED***\
.ace-chaos .ace_fold-widget:hover ***REMOVED***\
color: #777;\
***REMOVED***\
.ace-chaos .ace_fold-widget.ace_start,\
.ace-chaos .ace_fold-widget.ace_end,\
.ace-chaos .ace_fold-widget.ace_closed***REMOVED***\
background: none;\
border: none;\
box-shadow: none;\
***REMOVED***\
.ace-chaos .ace_fold-widget.ace_start:after ***REMOVED***\
content: '▾'\
***REMOVED***\
.ace-chaos .ace_fold-widget.ace_end:after ***REMOVED***\
content: '▴'\
***REMOVED***\
.ace-chaos .ace_fold-widget.ace_closed:after ***REMOVED***\
content: '‣'\
***REMOVED***\
.ace-chaos .ace_indent-guide ***REMOVED***\
border-right:1px dotted #333;\
margin-right:-1px;\
***REMOVED***\
.ace-chaos .ace_fold ***REMOVED*** \
background: #222; \
border-radius: 3px; \
color: #7AF; \
border: none; \
***REMOVED***\
.ace-chaos .ace_fold:hover ***REMOVED***\
background: #CCC; \
color: #000;\
***REMOVED***\
";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);

***REMOVED***);