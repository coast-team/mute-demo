__ace_shadowed__.define('ace/snippets/javascript', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "# Prototype\n\
snippet proto\n\
	$***REMOVED***1:class_name***REMOVED***.prototype.$***REMOVED***2:method_name***REMOVED*** = function($***REMOVED***3:first_argument***REMOVED***) ***REMOVED***\n\
		$***REMOVED***4:// body...***REMOVED***\n\
	***REMOVED***;\n\
# Function\n\
snippet fun\n\
	function $***REMOVED***1?:function_name***REMOVED***($***REMOVED***2:argument***REMOVED***) ***REMOVED***\n\
		$***REMOVED***3:// body...***REMOVED***\n\
	***REMOVED***\n\
# Anonymous Function\n\
regex /((=)\\s*|(:)\\s*|(\\()|\\b)/f/(\\))?/\n\
snippet f\n\
	function$***REMOVED***M1?: $***REMOVED***1:functionName***REMOVED******REMOVED***($2) ***REMOVED***\n\
		$***REMOVED***0:$TM_SELECTED_TEXT***REMOVED***\n\
	***REMOVED***$***REMOVED***M2?;***REMOVED***$***REMOVED***M3?,***REMOVED***$***REMOVED***M4?)***REMOVED***\n\
# Immediate function\n\
trigger \\(?f\\(\n\
endTrigger \\)?\n\
snippet f(\n\
	(function($***REMOVED***1***REMOVED***) ***REMOVED***\n\
		$***REMOVED***0:$***REMOVED***TM_SELECTED_TEXT:/* code */***REMOVED******REMOVED***\n\
	***REMOVED***($***REMOVED***1***REMOVED***));\n\
# if\n\
snippet if\n\
	if ($***REMOVED***1:true***REMOVED***) ***REMOVED***\n\
		$***REMOVED***0***REMOVED***\n\
	***REMOVED***\n\
# if ... else\n\
snippet ife\n\
	if ($***REMOVED***1:true***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	***REMOVED*** else ***REMOVED***\n\
		$***REMOVED***0***REMOVED***\n\
	***REMOVED***\n\
# tertiary conditional\n\
snippet ter\n\
	$***REMOVED***1:/* condition */***REMOVED*** ? $***REMOVED***2:a***REMOVED*** : $***REMOVED***3:b***REMOVED***\n\
# switch\n\
snippet switch\n\
	switch ($***REMOVED***1:expression***REMOVED***) ***REMOVED***\n\
		case '$***REMOVED***3:case***REMOVED***':\n\
			$***REMOVED***4:// code***REMOVED***\n\
			break;\n\
		$***REMOVED***5***REMOVED***\n\
		default:\n\
			$***REMOVED***2:// code***REMOVED***\n\
	***REMOVED***\n\
# case\n\
snippet case\n\
	case '$***REMOVED***1:case***REMOVED***':\n\
		$***REMOVED***2:// code***REMOVED***\n\
		break;\n\
	$***REMOVED***3***REMOVED***\n\
\n\
# while (...) ***REMOVED***...***REMOVED***\n\
snippet wh\n\
	while ($***REMOVED***1:/* condition */***REMOVED***) ***REMOVED***\n\
		$***REMOVED***0:/* code */***REMOVED***\n\
	***REMOVED***\n\
# try\n\
snippet try\n\
	try ***REMOVED***\n\
		$***REMOVED***0:/* code */***REMOVED***\n\
	***REMOVED*** catch (e) ***REMOVED******REMOVED***\n\
# do...while\n\
snippet do\n\
	do ***REMOVED***\n\
		$***REMOVED***2:/* code */***REMOVED***\n\
	***REMOVED*** while ($***REMOVED***1:/* condition */***REMOVED***);\n\
# Object Method\n\
snippet :f\n\
regex /([,***REMOVED***[])|^\\s*/:f/\n\
	$***REMOVED***1:method_name***REMOVED***: function($***REMOVED***2:attribute***REMOVED***) ***REMOVED***\n\
		$***REMOVED***0***REMOVED***\n\
	***REMOVED***$***REMOVED***3:,***REMOVED***\n\
# setTimeout function\n\
snippet setTimeout\n\
regex /\\b/st|timeout|setTimeo?u?t?/\n\
	setTimeout(function() ***REMOVED***$***REMOVED***3:$TM_SELECTED_TEXT***REMOVED******REMOVED***, $***REMOVED***1:10***REMOVED***);\n\
# Get Elements\n\
snippet gett\n\
	getElementsBy$***REMOVED***1:TagName***REMOVED***('$***REMOVED***2***REMOVED***')$***REMOVED***3***REMOVED***\n\
# Get Element\n\
snippet get\n\
	getElementBy$***REMOVED***1:Id***REMOVED***('$***REMOVED***2***REMOVED***')$***REMOVED***3***REMOVED***\n\
# console.log (Firebug)\n\
snippet cl\n\
	console.log($***REMOVED***1***REMOVED***);\n\
# return\n\
snippet ret\n\
	return $***REMOVED***1:result***REMOVED***\n\
# for (property in object ) ***REMOVED*** ... ***REMOVED***\n\
snippet fori\n\
	for (var $***REMOVED***1:prop***REMOVED*** in $***REMOVED***2:Things***REMOVED***) ***REMOVED***\n\
		$***REMOVED***0:$2[$1]***REMOVED***\n\
	***REMOVED***\n\
# hasOwnProperty\n\
snippet has\n\
	hasOwnProperty($***REMOVED***1***REMOVED***)\n\
# docstring\n\
snippet /**\n\
	/**\n\
	 * $***REMOVED***1:description***REMOVED***\n\
	 *\n\
	 */\n\
snippet @par\n\
regex /^\\s*\\*\\s*/@(para?m?)?/\n\
	@param ***REMOVED***$***REMOVED***1:type***REMOVED******REMOVED*** $***REMOVED***2:name***REMOVED*** $***REMOVED***3:description***REMOVED***\n\
snippet @ret\n\
	@return ***REMOVED***$***REMOVED***1:type***REMOVED******REMOVED*** $***REMOVED***2:description***REMOVED***\n\
# JSON.parse\n\
snippet jsonp\n\
	JSON.parse($***REMOVED***1:jstr***REMOVED***);\n\
# JSON.stringify\n\
snippet jsons\n\
	JSON.stringify($***REMOVED***1:object***REMOVED***);\n\
# self-defining function\n\
snippet sdf\n\
	var $***REMOVED***1:function_name***REMOVED*** = function($***REMOVED***2:argument***REMOVED***) ***REMOVED***\n\
		$***REMOVED***3:// initial code ...***REMOVED***\n\
\n\
		$1 = function($2) ***REMOVED***\n\
			$***REMOVED***4:// main code***REMOVED***\n\
		***REMOVED***;\n\
	***REMOVED***\n\
# singleton\n\
snippet sing\n\
	function $***REMOVED***1:Singleton***REMOVED*** ($***REMOVED***2:argument***REMOVED***) ***REMOVED***\n\
		// the cached instance\n\
		var instance;\n\
\n\
		// rewrite the constructor\n\
		$1 = function $1($2) ***REMOVED***\n\
			return instance;\n\
		***REMOVED***;\n\
		\n\
		// carry over the prototype properties\n\
		$1.prototype = this;\n\
\n\
		// the instance\n\
		instance = new $1();\n\
\n\
		// reset the constructor pointer\n\
		instance.constructor = $1;\n\
\n\
		$***REMOVED***3:// code ...***REMOVED***\n\
\n\
		return instance;\n\
	***REMOVED***\n\
# class\n\
snippet class\n\
regex /^\\s*/clas***REMOVED***0,2***REMOVED***/\n\
	var $***REMOVED***1:class***REMOVED*** = function($***REMOVED***20***REMOVED***) ***REMOVED***\n\
		$40$0\n\
	***REMOVED***;\n\
	\n\
	(function() ***REMOVED***\n\
		$***REMOVED***60:this.prop = \"\"***REMOVED***\n\
	***REMOVED***).call($***REMOVED***1:class***REMOVED***.prototype);\n\
	\n\
	exports.$***REMOVED***1:class***REMOVED*** = $***REMOVED***1:class***REMOVED***;\n\
# \n\
snippet for-\n\
	for (var $***REMOVED***1:i***REMOVED*** = $***REMOVED***2:Things***REMOVED***.length; $***REMOVED***1:i***REMOVED***--; ) ***REMOVED***\n\
		$***REMOVED***0:$***REMOVED***2:Things***REMOVED***[$***REMOVED***1:i***REMOVED***];***REMOVED***\n\
	***REMOVED***\n\
# for (...) ***REMOVED***...***REMOVED***\n\
snippet for\n\
	for (var $***REMOVED***1:i***REMOVED*** = 0; $1 < $***REMOVED***2:Things***REMOVED***.length; $1++) ***REMOVED***\n\
		$***REMOVED***3:$2[$1]***REMOVED***$0\n\
	***REMOVED***\n\
# for (...) ***REMOVED***...***REMOVED*** (Improved Native For-Loop)\n\
snippet forr\n\
	for (var $***REMOVED***1:i***REMOVED*** = $***REMOVED***2:Things***REMOVED***.length - 1; $1 >= 0; $1--) ***REMOVED***\n\
		$***REMOVED***3:$2[$1]***REMOVED***$0\n\
	***REMOVED***\n\
\n\
\n\
#modules\n\
snippet def\n\
	__ace_shadowed__.define(function(require, exports, module) ***REMOVED***\n\
	\"use strict\";\n\
	var $***REMOVED***1/.*\\///***REMOVED*** = require(\"$***REMOVED***1***REMOVED***\");\n\
	\n\
	$TM_SELECTED_TEXT\n\
	***REMOVED***);\n\
snippet req\n\
guard ^\\s*\n\
	var $***REMOVED***1/.*\\///***REMOVED*** = require(\"$***REMOVED***1***REMOVED***\");\n\
	$0\n\
snippet requ\n\
guard ^\\s*\n\
	var $***REMOVED***1/.*\\/(.)/\\u$1/***REMOVED*** = require(\"$***REMOVED***1***REMOVED***\").$***REMOVED***1/.*\\/(.)/\\u$1/***REMOVED***;\n\
	$0\n\
";
exports.scope = "javascript";

***REMOVED***);
