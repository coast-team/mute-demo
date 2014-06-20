__ace_shadowed__.define('ace/snippets/lua', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "snippet #!\n\
	#!/usr/bin/env lua\n\
	$1\n\
snippet local\n\
	local $***REMOVED***1:x***REMOVED*** = $***REMOVED***2:1***REMOVED***\n\
snippet fun\n\
	function $***REMOVED***1:fname***REMOVED***($***REMOVED***2:...***REMOVED***)\n\
		$***REMOVED***3:-- body***REMOVED***\n\
	end\n\
snippet for\n\
	for $***REMOVED***1:i***REMOVED***=$***REMOVED***2:1***REMOVED***,$***REMOVED***3:10***REMOVED*** do\n\
		$***REMOVED***4:print(i)***REMOVED***\n\
	end\n\
snippet forp\n\
	for $***REMOVED***1:i***REMOVED***,$***REMOVED***2:v***REMOVED*** in pairs($***REMOVED***3:table_name***REMOVED***) do\n\
	   $***REMOVED***4:-- body***REMOVED***\n\
	end\n\
snippet fori\n\
	for $***REMOVED***1:i***REMOVED***,$***REMOVED***2:v***REMOVED*** in ipairs($***REMOVED***3:table_name***REMOVED***) do\n\
	   $***REMOVED***4:-- body***REMOVED***\n\
	end\n\
";
exports.scope = "lua";

***REMOVED***);
