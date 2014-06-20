define('ace/snippets/textile', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "# Jekyll post header\n\
snippet header\n\
	---\n\
	title: $***REMOVED***1:title***REMOVED***\n\
	layout: post\n\
	date: $***REMOVED***2:date***REMOVED*** $***REMOVED***3:hour:minute:second***REMOVED*** -05:00\n\
	---\n\
\n\
# Image\n\
snippet img\n\
	!$***REMOVED***1:url***REMOVED***($***REMOVED***2:title***REMOVED***):$***REMOVED***3:link***REMOVED***!\n\
\n\
# Table\n\
snippet |\n\
	|$***REMOVED***1***REMOVED***|$***REMOVED***2***REMOVED***\n\
\n\
# Link\n\
snippet link\n\
	\"$***REMOVED***1:link text***REMOVED***\":$***REMOVED***2:url***REMOVED***\n\
\n\
# Acronym\n\
snippet (\n\
	($***REMOVED***1:Expand acronym***REMOVED***)$***REMOVED***2***REMOVED***\n\
\n\
# Footnote\n\
snippet fn\n\
	[$***REMOVED***1:ref number***REMOVED***] $***REMOVED***3***REMOVED***\n\
\n\
	fn$1. $***REMOVED***2:footnote***REMOVED***\n\
	\n\
";
exports.scope = "textile";

***REMOVED***);
