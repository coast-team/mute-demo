define('ace/snippets/tcl', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "# #!/usr/bin/env tclsh\n\
snippet #!\n\
	#!/usr/bin/env tclsh\n\
	\n\
# Process\n\
snippet pro\n\
	proc $***REMOVED***1:function_name***REMOVED*** ***REMOVED***$***REMOVED***2:args***REMOVED******REMOVED*** ***REMOVED***\n\
		$***REMOVED***3:#body ...***REMOVED***\n\
	***REMOVED***\n\
#xif\n\
snippet xif\n\
	$***REMOVED***1:expr***REMOVED***? $***REMOVED***2:true***REMOVED*** : $***REMOVED***3:false***REMOVED***\n\
# Conditional\n\
snippet if\n\
	if ***REMOVED***$***REMOVED***1***REMOVED******REMOVED*** ***REMOVED***\n\
		$***REMOVED***2:# body...***REMOVED***\n\
	***REMOVED***\n\
# Conditional if..else\n\
snippet ife\n\
	if ***REMOVED***$***REMOVED***1***REMOVED******REMOVED*** ***REMOVED***\n\
		$***REMOVED***2:# body...***REMOVED***\n\
	***REMOVED*** else ***REMOVED***\n\
		$***REMOVED***3:# else...***REMOVED***\n\
	***REMOVED***\n\
# Conditional if..elsif..else\n\
snippet ifee\n\
	if ***REMOVED***$***REMOVED***1***REMOVED******REMOVED*** ***REMOVED***\n\
		$***REMOVED***2:# body...***REMOVED***\n\
	***REMOVED*** elseif ***REMOVED***$***REMOVED***3***REMOVED******REMOVED*** ***REMOVED***\n\
		$***REMOVED***4:# elsif...***REMOVED***\n\
	***REMOVED*** else ***REMOVED***\n\
		$***REMOVED***5:# else...***REMOVED***\n\
	***REMOVED***\n\
# If catch then\n\
snippet ifc\n\
	if ***REMOVED*** [catch ***REMOVED***$***REMOVED***1:#do something...***REMOVED******REMOVED*** $***REMOVED***2:err***REMOVED***] ***REMOVED*** ***REMOVED***\n\
		$***REMOVED***3:# handle failure...***REMOVED***\n\
	***REMOVED***\n\
# Catch\n\
snippet catch\n\
	catch ***REMOVED***$***REMOVED***1***REMOVED******REMOVED*** $***REMOVED***2:err***REMOVED*** $***REMOVED***3:options***REMOVED***\n\
# While Loop\n\
snippet wh\n\
	while ***REMOVED***$***REMOVED***1***REMOVED******REMOVED*** ***REMOVED***\n\
		$***REMOVED***2:# body...***REMOVED***\n\
	***REMOVED***\n\
# For Loop\n\
snippet for\n\
	for ***REMOVED***set $***REMOVED***2:var***REMOVED*** 0***REMOVED*** ***REMOVED***$$2 < $***REMOVED***1:count***REMOVED******REMOVED*** ***REMOVED***$***REMOVED***3:incr***REMOVED*** $2***REMOVED*** ***REMOVED***\n\
		$***REMOVED***4:# body...***REMOVED***\n\
	***REMOVED***\n\
# Foreach Loop\n\
snippet fore\n\
	foreach $***REMOVED***1:x***REMOVED*** ***REMOVED***$***REMOVED***2:#list***REMOVED******REMOVED*** ***REMOVED***\n\
		$***REMOVED***3:# body...***REMOVED***\n\
	***REMOVED***\n\
# after ms script...\n\
snippet af\n\
	after $***REMOVED***1:ms***REMOVED*** $***REMOVED***2:#do something***REMOVED***\n\
# after cancel id\n\
snippet afc\n\
	after cancel $***REMOVED***1:id or script***REMOVED***\n\
# after idle\n\
snippet afi\n\
	after idle $***REMOVED***1:script***REMOVED***\n\
# after info id\n\
snippet afin\n\
	after info $***REMOVED***1:id***REMOVED***\n\
# Expr\n\
snippet exp\n\
	expr ***REMOVED***$***REMOVED***1:#expression here***REMOVED******REMOVED***\n\
# Switch\n\
snippet sw\n\
	switch $***REMOVED***1:var***REMOVED*** ***REMOVED***\n\
		$***REMOVED***3:pattern 1***REMOVED*** ***REMOVED***\n\
			$***REMOVED***4:#do something***REMOVED***\n\
		***REMOVED***\n\
		default ***REMOVED***\n\
			$***REMOVED***2:#do something***REMOVED***\n\
		***REMOVED***\n\
	***REMOVED***\n\
# Case\n\
snippet ca\n\
	$***REMOVED***1:pattern***REMOVED*** ***REMOVED***\n\
		$***REMOVED***2:#do something***REMOVED***\n\
	***REMOVED***$***REMOVED***3***REMOVED***\n\
# Namespace eval\n\
snippet ns\n\
	namespace eval $***REMOVED***1:path***REMOVED*** ***REMOVED***$***REMOVED***2:#script...***REMOVED******REMOVED***\n\
# Namespace current\n\
snippet nsc\n\
	namespace current\n\
";
exports.scope = "tcl";

***REMOVED***);
