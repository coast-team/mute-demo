__ace_shadowed__.define('ace/snippets/haml', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "snippet t\n\
	%table\n\
		%tr\n\
			%th\n\
				$***REMOVED***1:headers***REMOVED***\n\
		%tr\n\
			%td\n\
				$***REMOVED***2:headers***REMOVED***\n\
snippet ul\n\
	%ul\n\
		%li\n\
			$***REMOVED***1:item***REMOVED***\n\
		%li\n\
snippet =rp\n\
	= render :partial => '$***REMOVED***1:partial***REMOVED***'\n\
snippet =rpl\n\
	= render :partial => '$***REMOVED***1:partial***REMOVED***', :locals => ***REMOVED******REMOVED***\n\
snippet =rpc\n\
	= render :partial => '$***REMOVED***1:partial***REMOVED***', :collection => @$1\n\
\n\
";
exports.scope = "haml";

***REMOVED***);
