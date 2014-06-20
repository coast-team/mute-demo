define('ace/snippets/jsoniq', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "snippet for\n\
	for $$***REMOVED***1:item***REMOVED*** in $***REMOVED***2:expr***REMOVED***\n\
snippet return\n\
	return $***REMOVED***1:expr***REMOVED***\n\
snippet import\n\
	import module namespace $***REMOVED***1:ns***REMOVED*** = \"$***REMOVED***2:http://www.example.com/***REMOVED***\";\n\
snippet some\n\
	some $$***REMOVED***1:varname***REMOVED*** in $***REMOVED***2:expr***REMOVED*** satisfies $***REMOVED***3:expr***REMOVED***\n\
snippet every\n\
	every $$***REMOVED***1:varname***REMOVED*** in $***REMOVED***2:expr***REMOVED*** satisfies $***REMOVED***3:expr***REMOVED***\n\
snippet if\n\
	if($***REMOVED***1:true***REMOVED***) then $***REMOVED***2:expr***REMOVED*** else $***REMOVED***3:true***REMOVED***\n\
snippet switch\n\
	switch($***REMOVED***1:\"foo\"***REMOVED***)\n\
	case $***REMOVED***2:\"foo\"***REMOVED***\n\
	return $***REMOVED***3:true***REMOVED***\n\
	default return $***REMOVED***4:false***REMOVED***\n\
snippet try\n\
	try ***REMOVED*** $***REMOVED***1:expr***REMOVED*** ***REMOVED*** catch $***REMOVED***2:****REMOVED*** ***REMOVED*** $***REMOVED***3:expr***REMOVED*** ***REMOVED***\n\
snippet tumbling\n\
	for tumbling window $$***REMOVED***1:varname***REMOVED*** in $***REMOVED***2:expr***REMOVED***\n\
	start at $$***REMOVED***3:start***REMOVED*** when $***REMOVED***4:expr***REMOVED***\n\
	end at $$***REMOVED***5:end***REMOVED*** when $***REMOVED***6:expr***REMOVED***\n\
	return $***REMOVED***7:expr***REMOVED***\n\
snippet sliding\n\
	for sliding window $$***REMOVED***1:varname***REMOVED*** in $***REMOVED***2:expr***REMOVED***\n\
	start at $$***REMOVED***3:start***REMOVED*** when $***REMOVED***4:expr***REMOVED***\n\
	end at $$***REMOVED***5:end***REMOVED*** when $***REMOVED***6:expr***REMOVED***\n\
	return $***REMOVED***7:expr***REMOVED***\n\
snippet let\n\
	let $$***REMOVED***1:varname***REMOVED*** := $***REMOVED***2:expr***REMOVED***\n\
snippet group\n\
	group by $$***REMOVED***1:varname***REMOVED*** := $***REMOVED***2:expr***REMOVED***\n\
snippet order\n\
	order by $***REMOVED***1:expr***REMOVED*** $***REMOVED***2:descending***REMOVED***\n\
snippet stable\n\
	stable order by $***REMOVED***1:expr***REMOVED***\n\
snippet count\n\
	count $$***REMOVED***1:varname***REMOVED***\n\
snippet ordered\n\
	ordered ***REMOVED*** $***REMOVED***1:expr***REMOVED*** ***REMOVED***\n\
snippet unordered\n\
	unordered ***REMOVED*** $***REMOVED***1:expr***REMOVED*** ***REMOVED***\n\
snippet treat \n\
	treat as $***REMOVED***1:expr***REMOVED***\n\
snippet castable\n\
	castable as $***REMOVED***1:atomicType***REMOVED***\n\
snippet cast\n\
	cast as $***REMOVED***1:atomicType***REMOVED***\n\
snippet typeswitch\n\
	typeswitch($***REMOVED***1:expr***REMOVED***)\n\
	case $***REMOVED***2:type***REMOVED***  return $***REMOVED***3:expr***REMOVED***\n\
	default return $***REMOVED***4:expr***REMOVED***\n\
snippet var\n\
	declare variable $$***REMOVED***1:varname***REMOVED*** := $***REMOVED***2:expr***REMOVED***;\n\
snippet fn\n\
	declare function $***REMOVED***1:ns***REMOVED***:$***REMOVED***2:name***REMOVED***()***REMOVED***\n\
	$***REMOVED***3:expr***REMOVED***\n\
	***REMOVED***;\n\
snippet module\n\
	module namespace $***REMOVED***1:ns***REMOVED*** = \"$***REMOVED***2:http://www.example.com***REMOVED***\";\n\
";
exports.scope = "jsoniq";

***REMOVED***);
