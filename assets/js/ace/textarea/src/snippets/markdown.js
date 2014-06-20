__ace_shadowed__.define('ace/snippets/markdown', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "# Markdown\n\
\n\
# Includes octopress (http://octopress.org/) snippets\n\
\n\
snippet [\n\
	[$***REMOVED***1:text***REMOVED***](http://$***REMOVED***2:address***REMOVED*** \"$***REMOVED***3:title***REMOVED***\")\n\
snippet [*\n\
	[$***REMOVED***1:link***REMOVED***]($***REMOVED***2:`@*`***REMOVED*** \"$***REMOVED***3:title***REMOVED***\")$***REMOVED***4***REMOVED***\n\
\n\
snippet [:\n\
	[$***REMOVED***1:id***REMOVED***]: http://$***REMOVED***2:url***REMOVED*** \"$***REMOVED***3:title***REMOVED***\"\n\
snippet [:*\n\
	[$***REMOVED***1:id***REMOVED***]: $***REMOVED***2:`@*`***REMOVED*** \"$***REMOVED***3:title***REMOVED***\"\n\
\n\
snippet ![\n\
	![$***REMOVED***1:alttext***REMOVED***]($***REMOVED***2:/images/image.jpg***REMOVED*** \"$***REMOVED***3:title***REMOVED***\")\n\
snippet ![*\n\
	![$***REMOVED***1:alt***REMOVED***]($***REMOVED***2:`@*`***REMOVED*** \"$***REMOVED***3:title***REMOVED***\")$***REMOVED***4***REMOVED***\n\
\n\
snippet ![:\n\
	![$***REMOVED***1:id***REMOVED***]: $***REMOVED***2:url***REMOVED*** \"$***REMOVED***3:title***REMOVED***\"\n\
snippet ![:*\n\
	![$***REMOVED***1:id***REMOVED***]: $***REMOVED***2:`@*`***REMOVED*** \"$***REMOVED***3:title***REMOVED***\"\n\
\n\
snippet ===\n\
regex /^/=+/=*//\n\
	$***REMOVED***PREV_LINE/./=/g***REMOVED***\n\
	\n\
	$***REMOVED***0***REMOVED***\n\
snippet ---\n\
regex /^/-+/-*//\n\
	$***REMOVED***PREV_LINE/./-/g***REMOVED***\n\
	\n\
	$***REMOVED***0***REMOVED***\n\
snippet blockquote\n\
	***REMOVED***% blockquote %***REMOVED***\n\
	$***REMOVED***1:quote***REMOVED***\n\
	***REMOVED***% endblockquote %***REMOVED***\n\
\n\
snippet blockquote-author\n\
	***REMOVED***% blockquote $***REMOVED***1:author***REMOVED***, $***REMOVED***2:title***REMOVED*** %***REMOVED***\n\
	$***REMOVED***3:quote***REMOVED***\n\
	***REMOVED***% endblockquote %***REMOVED***\n\
\n\
snippet blockquote-link\n\
	***REMOVED***% blockquote $***REMOVED***1:author***REMOVED*** $***REMOVED***2:URL***REMOVED*** $***REMOVED***3:link_text***REMOVED*** %***REMOVED***\n\
	$***REMOVED***4:quote***REMOVED***\n\
	***REMOVED***% endblockquote %***REMOVED***\n\
\n\
snippet bt-codeblock-short\n\
	```\n\
	$***REMOVED***1:code_snippet***REMOVED***\n\
	```\n\
\n\
snippet bt-codeblock-full\n\
	``` $***REMOVED***1:language***REMOVED*** $***REMOVED***2:title***REMOVED*** $***REMOVED***3:URL***REMOVED*** $***REMOVED***4:link_text***REMOVED***\n\
	$***REMOVED***5:code_snippet***REMOVED***\n\
	```\n\
\n\
snippet codeblock-short\n\
	***REMOVED***% codeblock %***REMOVED***\n\
	$***REMOVED***1:code_snippet***REMOVED***\n\
	***REMOVED***% endcodeblock %***REMOVED***\n\
\n\
snippet codeblock-full\n\
	***REMOVED***% codeblock $***REMOVED***1:title***REMOVED*** lang:$***REMOVED***2:language***REMOVED*** $***REMOVED***3:URL***REMOVED*** $***REMOVED***4:link_text***REMOVED*** %***REMOVED***\n\
	$***REMOVED***5:code_snippet***REMOVED***\n\
	***REMOVED***% endcodeblock %***REMOVED***\n\
\n\
snippet gist-full\n\
	***REMOVED***% gist $***REMOVED***1:gist_id***REMOVED*** $***REMOVED***2:filename***REMOVED*** %***REMOVED***\n\
\n\
snippet gist-short\n\
	***REMOVED***% gist $***REMOVED***1:gist_id***REMOVED*** %***REMOVED***\n\
\n\
snippet img\n\
	***REMOVED***% img $***REMOVED***1:class***REMOVED*** $***REMOVED***2:URL***REMOVED*** $***REMOVED***3:width***REMOVED*** $***REMOVED***4:height***REMOVED*** $***REMOVED***5:title_text***REMOVED*** $***REMOVED***6:alt_text***REMOVED*** %***REMOVED***\n\
\n\
snippet youtube\n\
	***REMOVED***% youtube $***REMOVED***1:video_id***REMOVED*** %***REMOVED***\n\
\n\
# The quote should appear only once in the text. It is inherently part of it.\n\
# See http://octopress.org/docs/plugins/pullquote/ for more info.\n\
\n\
snippet pullquote\n\
	***REMOVED***% pullquote %***REMOVED***\n\
	$***REMOVED***1:text***REMOVED*** ***REMOVED***\" $***REMOVED***2:quote***REMOVED*** \"***REMOVED*** $***REMOVED***3:text***REMOVED***\n\
	***REMOVED***% endpullquote %***REMOVED***\n\
";
exports.scope = "markdown";

***REMOVED***);
