__ace_shadowed__.define('ace/snippets/coffee', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "# Closure loop\n\
snippet forindo\n\
	for $***REMOVED***1:name***REMOVED*** in $***REMOVED***2:array***REMOVED***\n\
		do ($1) ->\n\
			$***REMOVED***3:// body***REMOVED***\n\
# Array comprehension\n\
snippet fora\n\
	for $***REMOVED***1:name***REMOVED*** in $***REMOVED***2:array***REMOVED***\n\
		$***REMOVED***3:// body...***REMOVED***\n\
# Object comprehension\n\
snippet foro\n\
	for $***REMOVED***1:key***REMOVED***, $***REMOVED***2:value***REMOVED*** of $***REMOVED***3:object***REMOVED***\n\
		$***REMOVED***4:// body...***REMOVED***\n\
# Range comprehension (inclusive)\n\
snippet forr\n\
	for $***REMOVED***1:name***REMOVED*** in [$***REMOVED***2:start***REMOVED***..$***REMOVED***3:finish***REMOVED***]\n\
		$***REMOVED***4:// body...***REMOVED***\n\
snippet forrb\n\
	for $***REMOVED***1:name***REMOVED*** in [$***REMOVED***2:start***REMOVED***..$***REMOVED***3:finish***REMOVED***] by $***REMOVED***4:step***REMOVED***\n\
		$***REMOVED***5:// body...***REMOVED***\n\
# Range comprehension (exclusive)\n\
snippet forrex\n\
	for $***REMOVED***1:name***REMOVED*** in [$***REMOVED***2:start***REMOVED***...$***REMOVED***3:finish***REMOVED***]\n\
		$***REMOVED***4:// body...***REMOVED***\n\
snippet forrexb\n\
	for $***REMOVED***1:name***REMOVED*** in [$***REMOVED***2:start***REMOVED***...$***REMOVED***3:finish***REMOVED***] by $***REMOVED***4:step***REMOVED***\n\
		$***REMOVED***5:// body...***REMOVED***\n\
# Function\n\
snippet fun\n\
	($***REMOVED***1:args***REMOVED***) ->\n\
		$***REMOVED***2:// body...***REMOVED***\n\
# Function (bound)\n\
snippet bfun\n\
	($***REMOVED***1:args***REMOVED***) =>\n\
		$***REMOVED***2:// body...***REMOVED***\n\
# Class\n\
snippet cla class ..\n\
	class $***REMOVED***1:`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')`***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
snippet cla class .. constructor: ..\n\
	class $***REMOVED***1:`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')`***REMOVED***\n\
		constructor: ($***REMOVED***2:args***REMOVED***) ->\n\
			$***REMOVED***3***REMOVED***\n\
\n\
		$***REMOVED***4***REMOVED***\n\
snippet cla class .. extends ..\n\
	class $***REMOVED***1:`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')`***REMOVED*** extends $***REMOVED***2:ParentClass***REMOVED***\n\
		$***REMOVED***3***REMOVED***\n\
snippet cla class .. extends .. constructor: ..\n\
	class $***REMOVED***1:`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')`***REMOVED*** extends $***REMOVED***2:ParentClass***REMOVED***\n\
		constructor: ($***REMOVED***3:args***REMOVED***) ->\n\
			$***REMOVED***4***REMOVED***\n\
\n\
		$***REMOVED***5***REMOVED***\n\
# If\n\
snippet if\n\
	if $***REMOVED***1:condition***REMOVED***\n\
		$***REMOVED***2:// body...***REMOVED***\n\
# If __ Else\n\
snippet ife\n\
	if $***REMOVED***1:condition***REMOVED***\n\
		$***REMOVED***2:// body...***REMOVED***\n\
	else\n\
		$***REMOVED***3:// body...***REMOVED***\n\
# Else if\n\
snippet elif\n\
	else if $***REMOVED***1:condition***REMOVED***\n\
		$***REMOVED***2:// body...***REMOVED***\n\
# Ternary If\n\
snippet ifte\n\
	if $***REMOVED***1:condition***REMOVED*** then $***REMOVED***2:value***REMOVED*** else $***REMOVED***3:other***REMOVED***\n\
# Unless\n\
snippet unl\n\
	$***REMOVED***1:action***REMOVED*** unless $***REMOVED***2:condition***REMOVED***\n\
# Switch\n\
snippet swi\n\
	switch $***REMOVED***1:object***REMOVED***\n\
		when $***REMOVED***2:value***REMOVED***\n\
			$***REMOVED***3:// body...***REMOVED***\n\
\n\
# Log\n\
snippet log\n\
	console.log $***REMOVED***1***REMOVED***\n\
# Try __ Catch\n\
snippet try\n\
	try\n\
		$***REMOVED***1***REMOVED***\n\
	catch $***REMOVED***2:error***REMOVED***\n\
		$***REMOVED***3***REMOVED***\n\
# Require\n\
snippet req\n\
	$***REMOVED***2:$1***REMOVED*** = require '$***REMOVED***1:sys***REMOVED***'$***REMOVED***3***REMOVED***\n\
# Export\n\
snippet exp\n\
	$***REMOVED***1:root***REMOVED*** = exports ? this\n\
";
exports.scope = "coffee";

***REMOVED***);
