__ace_shadowed__.define('ace/snippets/haskell', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "snippet lang\n\
	***REMOVED***-# LANGUAGE $***REMOVED***1:OverloadedStrings***REMOVED*** #-***REMOVED***\n\
snippet info\n\
	-- |\n\
	-- Module      :  $***REMOVED***1:Module.Namespace***REMOVED***\n\
	-- Copyright   :  $***REMOVED***2:Author***REMOVED*** $***REMOVED***3:2011-2012***REMOVED***\n\
	-- License     :  $***REMOVED***4:BSD3***REMOVED***\n\
	--\n\
	-- Maintainer  :  $***REMOVED***5:email@something.com***REMOVED***\n\
	-- Stability   :  $***REMOVED***6:experimental***REMOVED***\n\
	-- Portability :  $***REMOVED***7:unknown***REMOVED***\n\
	--\n\
	-- $***REMOVED***8:Description***REMOVED***\n\
	--\n\
snippet import\n\
	import           $***REMOVED***1:Data.Text***REMOVED***\n\
snippet import2\n\
	import           $***REMOVED***1:Data.Text***REMOVED*** ($***REMOVED***2:head***REMOVED***)\n\
snippet importq\n\
	import qualified $***REMOVED***1:Data.Text***REMOVED*** as $***REMOVED***2:T***REMOVED***\n\
snippet inst\n\
	instance $***REMOVED***1:Monoid***REMOVED*** $***REMOVED***2:Type***REMOVED*** where\n\
		$***REMOVED***3***REMOVED***\n\
snippet type\n\
	type $***REMOVED***1:Type***REMOVED*** = $***REMOVED***2:Type***REMOVED***\n\
snippet data\n\
	data $***REMOVED***1:Type***REMOVED*** = $***REMOVED***2:$1***REMOVED*** $***REMOVED***3:Int***REMOVED***\n\
snippet newtype\n\
	newtype $***REMOVED***1:Type***REMOVED*** = $***REMOVED***2:$1***REMOVED*** $***REMOVED***3:Int***REMOVED***\n\
snippet class\n\
	class $***REMOVED***1:Class***REMOVED*** a where\n\
		$***REMOVED***2***REMOVED***\n\
snippet module\n\
	module `substitute(substitute(expand('%:r'), '[/\\\\]','.','g'),'^\\%(\\l*\\.\\)\\?','','')` (\n\
	)	where\n\
	`expand('%') =~ 'Main' ? \"\\n\\nmain = do\\n  print \\\"hello world\\\"\" : \"\"`\n\
\n\
snippet const\n\
	$***REMOVED***1:name***REMOVED*** :: $***REMOVED***2:a***REMOVED***\n\
	$1 = $***REMOVED***3:undefined***REMOVED***\n\
snippet fn\n\
	$***REMOVED***1:fn***REMOVED*** :: $***REMOVED***2:a***REMOVED*** -> $***REMOVED***3:a***REMOVED***\n\
	$1 $***REMOVED***4***REMOVED*** = $***REMOVED***5:undefined***REMOVED***\n\
snippet fn2\n\
	$***REMOVED***1:fn***REMOVED*** :: $***REMOVED***2:a***REMOVED*** -> $***REMOVED***3:a***REMOVED*** -> $***REMOVED***4:a***REMOVED***\n\
	$1 $***REMOVED***5***REMOVED*** = $***REMOVED***6:undefined***REMOVED***\n\
snippet ap\n\
	$***REMOVED***1:map***REMOVED*** $***REMOVED***2:fn***REMOVED*** $***REMOVED***3:list***REMOVED***\n\
snippet do\n\
	do\n\
		\n\
snippet λ\n\
	\\$***REMOVED***1:x***REMOVED*** -> $***REMOVED***2***REMOVED***\n\
snippet \\\n\
	\\$***REMOVED***1:x***REMOVED*** -> $***REMOVED***2***REMOVED***\n\
snippet <-\n\
	$***REMOVED***1:a***REMOVED*** <- $***REMOVED***2:m a***REMOVED***\n\
snippet ←\n\
	$***REMOVED***1:a***REMOVED*** <- $***REMOVED***2:m a***REMOVED***\n\
snippet ->\n\
	$***REMOVED***1:m a***REMOVED*** -> $***REMOVED***2:a***REMOVED***\n\
snippet →\n\
	$***REMOVED***1:m a***REMOVED*** -> $***REMOVED***2:a***REMOVED***\n\
snippet tup\n\
	($***REMOVED***1:a***REMOVED***, $***REMOVED***2:b***REMOVED***)\n\
snippet tup2\n\
	($***REMOVED***1:a***REMOVED***, $***REMOVED***2:b***REMOVED***, $***REMOVED***3:c***REMOVED***)\n\
snippet tup3\n\
	($***REMOVED***1:a***REMOVED***, $***REMOVED***2:b***REMOVED***, $***REMOVED***3:c***REMOVED***, $***REMOVED***4:d***REMOVED***)\n\
snippet rec\n\
	$***REMOVED***1:Record***REMOVED*** ***REMOVED*** $***REMOVED***2:recFieldA***REMOVED*** = $***REMOVED***3:undefined***REMOVED***\n\
				, $***REMOVED***4:recFieldB***REMOVED*** = $***REMOVED***5:undefined***REMOVED***\n\
				***REMOVED***\n\
snippet case\n\
	case $***REMOVED***1:something***REMOVED*** of\n\
		$***REMOVED***2***REMOVED*** -> $***REMOVED***3***REMOVED***\n\
snippet let\n\
	let $***REMOVED***1***REMOVED*** = $***REMOVED***2***REMOVED***\n\
	in $***REMOVED***3***REMOVED***\n\
snippet where\n\
	where\n\
		$***REMOVED***1:fn***REMOVED*** = $***REMOVED***2:undefined***REMOVED***\n\
";
exports.scope = "haskell";

***REMOVED***);
