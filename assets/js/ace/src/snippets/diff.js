define('ace/snippets/diff', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "# DEP-3 (http://dep.debian.net/deps/dep3/) style patch header\n\
snippet header DEP-3 style header\n\
	Description: $***REMOVED***1***REMOVED***\n\
	Origin: $***REMOVED***2:vendor|upstream|other***REMOVED***, $***REMOVED***3:url of the original patch***REMOVED***\n\
	Bug: $***REMOVED***4:url in upstream bugtracker***REMOVED***\n\
	Forwarded: $***REMOVED***5:no|not-needed|url***REMOVED***\n\
	Author: $***REMOVED***6:`g:snips_author`***REMOVED***\n\
	Reviewed-by: $***REMOVED***7:name and email***REMOVED***\n\
	Last-Update: $***REMOVED***8:`strftime(\"%Y-%m-%d\")`***REMOVED***\n\
	Applied-Upstream: $***REMOVED***9:upstream version|url|commit***REMOVED***\n\
\n\
";
exports.scope = "diff";

***REMOVED***);
