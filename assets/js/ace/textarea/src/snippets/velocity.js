__ace_shadowed__.define('ace/snippets/velocity', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "# macro\n\
snippet #macro\n\
	#macro ( $***REMOVED***1:macroName***REMOVED*** $***REMOVED***2:\\$var1, [\\$var2, ...]***REMOVED*** )\n\
		$***REMOVED***3:## macro code***REMOVED***\n\
	#end\n\
# foreach\n\
snippet #foreach\n\
	#foreach ( $***REMOVED***1:\\$item***REMOVED*** in $***REMOVED***2:\\$collection***REMOVED*** )\n\
		$***REMOVED***3:## foreach code***REMOVED***\n\
	#end\n\
# if\n\
snippet #if\n\
	#if ( $***REMOVED***1:true***REMOVED*** )\n\
		$***REMOVED***0***REMOVED***\n\
	#end\n\
# if ... else\n\
snippet #ife\n\
	#if ( $***REMOVED***1:true***REMOVED*** )\n\
		$***REMOVED***2***REMOVED***\n\
	#else\n\
		$***REMOVED***0***REMOVED***\n\
	#end\n\
#import\n\
snippet #import\n\
	#import ( \"$***REMOVED***1:path/to/velocity/format***REMOVED***\" )\n\
# set\n\
snippet #set\n\
	#set ( $$***REMOVED***1:var***REMOVED*** = $***REMOVED***0***REMOVED*** )\n\
";
exports.scope = "velocity";
exports.includeScopes = ["html", "javascript", "css"];

***REMOVED***);
