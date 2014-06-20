__ace_shadowed__.define('ace/snippets/sh', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "# Shebang. Executing bash via /usr/bin/env makes scripts more portable.\n\
snippet #!\n\
	#!/usr/bin/env bash\n\
	\n\
snippet if\n\
	if [[ $***REMOVED***1:condition***REMOVED*** ]]; then\n\
		$***REMOVED***2:#statements***REMOVED***\n\
	fi\n\
snippet elif\n\
	elif [[ $***REMOVED***1:condition***REMOVED*** ]]; then\n\
		$***REMOVED***2:#statements***REMOVED***\n\
snippet for\n\
	for (( $***REMOVED***2:i***REMOVED*** = 0; $2 < $***REMOVED***1:count***REMOVED***; $2++ )); do\n\
		$***REMOVED***3:#statements***REMOVED***\n\
	done\n\
snippet fori\n\
	for $***REMOVED***1:needle***REMOVED*** in $***REMOVED***2:haystack***REMOVED*** ; do\n\
		$***REMOVED***3:#statements***REMOVED***\n\
	done\n\
snippet wh\n\
	while [[ $***REMOVED***1:condition***REMOVED*** ]]; do\n\
		$***REMOVED***2:#statements***REMOVED***\n\
	done\n\
snippet until\n\
	until [[ $***REMOVED***1:condition***REMOVED*** ]]; do\n\
		$***REMOVED***2:#statements***REMOVED***\n\
	done\n\
snippet case\n\
	case $***REMOVED***1:word***REMOVED*** in\n\
		$***REMOVED***2:pattern***REMOVED***)\n\
			$***REMOVED***3***REMOVED***;;\n\
	esac\n\
snippet go \n\
	while getopts '$***REMOVED***1:o***REMOVED***' $***REMOVED***2:opts***REMOVED*** \n\
	do \n\
		case $$2 in\n\
		$***REMOVED***3:o0***REMOVED***)\n\
			$***REMOVED***4:#staments***REMOVED***;;\n\
		esac\n\
	done\n\
# Set SCRIPT_DIR variable to directory script is located.\n\
snippet sdir\n\
	SCRIPT_DIR=\"$( cd \"$( dirname \"$***REMOVED***BASH_SOURCE[0]***REMOVED***\" )\" && pwd )\"\n\
# getopt\n\
snippet getopt\n\
	__ScriptVersion=\"$***REMOVED***1:version***REMOVED***\"\n\
\n\
	#===  FUNCTION  ================================================================\n\
	#         NAME:  usage\n\
	#  DESCRIPTION:  Display usage information.\n\
	#===============================================================================\n\
	function usage ()\n\
	***REMOVED***\n\
			cat <<- EOT\n\
\n\
	  Usage :  $$***REMOVED***0:0***REMOVED*** [options] [--] \n\
\n\
	  Options: \n\
	  -h|help       Display this message\n\
	  -v|version    Display script version\n\
\n\
			EOT\n\
	***REMOVED***    # ----------  end of function usage  ----------\n\
\n\
	#-----------------------------------------------------------------------\n\
	#  Handle command line arguments\n\
	#-----------------------------------------------------------------------\n\
\n\
	while getopts \":hv\" opt\n\
	do\n\
	  case $opt in\n\
\n\
		h|help     )  usage; exit 0   ;;\n\
\n\
		v|version  )  echo \"$$***REMOVED***0:0***REMOVED*** -- Version $__ScriptVersion\"; exit 0   ;;\n\
\n\
		\\? )  echo -e \"\\n  Option does not exist : $OPTARG\\n\"\n\
			  usage; exit 1   ;;\n\
\n\
	  esac    # --- end of case ---\n\
	done\n\
	shift $(($OPTIND-1))\n\
\n\
";
exports.scope = "sh";

***REMOVED***);
