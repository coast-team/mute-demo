__ace_shadowed__.define('ace/snippets/r', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "snippet #!\n\
	#!/usr/bin/env Rscript\n\
\n\
# includes\n\
snippet lib\n\
	library($***REMOVED***1:package***REMOVED***)\n\
snippet req\n\
	require($***REMOVED***1:package***REMOVED***)\n\
snippet source\n\
	source('$***REMOVED***1:file***REMOVED***')\n\
\n\
# conditionals\n\
snippet if\n\
	if ($***REMOVED***1:condition***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2:code***REMOVED***\n\
	***REMOVED***\n\
snippet el\n\
	else ***REMOVED***\n\
		$***REMOVED***1:code***REMOVED***\n\
	***REMOVED***\n\
snippet ei\n\
	else if ($***REMOVED***1:condition***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2:code***REMOVED***\n\
	***REMOVED***\n\
\n\
# functions\n\
snippet fun\n\
	$***REMOVED***1:name***REMOVED*** = function ($***REMOVED***2:variables***REMOVED***) ***REMOVED***\n\
		$***REMOVED***3:code***REMOVED***\n\
	***REMOVED***\n\
snippet ret\n\
	return($***REMOVED***1:code***REMOVED***)\n\
\n\
# dataframes, lists, etc\n\
snippet df\n\
	$***REMOVED***1:name***REMOVED***[$***REMOVED***2:rows***REMOVED***, $***REMOVED***3:cols***REMOVED***]\n\
snippet c\n\
	c($***REMOVED***1:items***REMOVED***)\n\
snippet li\n\
	list($***REMOVED***1:items***REMOVED***)\n\
snippet mat\n\
	matrix($***REMOVED***1:data***REMOVED***, nrow=$***REMOVED***2:rows***REMOVED***, ncol=$***REMOVED***3:cols***REMOVED***)\n\
\n\
# apply functions\n\
snippet apply\n\
	apply($***REMOVED***1:array***REMOVED***, $***REMOVED***2:margin***REMOVED***, $***REMOVED***3:function***REMOVED***)\n\
snippet lapply\n\
	lapply($***REMOVED***1:list***REMOVED***, $***REMOVED***2:function***REMOVED***)\n\
snippet sapply\n\
	lapply($***REMOVED***1:list***REMOVED***, $***REMOVED***2:function***REMOVED***)\n\
snippet vapply\n\
	vapply($***REMOVED***1:list***REMOVED***, $***REMOVED***2:function***REMOVED***, $***REMOVED***3:type***REMOVED***)\n\
snippet mapply\n\
	mapply($***REMOVED***1:function***REMOVED***, $***REMOVED***2:...***REMOVED***)\n\
snippet tapply\n\
	tapply($***REMOVED***1:vector***REMOVED***, $***REMOVED***2:index***REMOVED***, $***REMOVED***3:function***REMOVED***)\n\
snippet rapply\n\
	rapply($***REMOVED***1:list***REMOVED***, $***REMOVED***2:function***REMOVED***)\n\
\n\
# plyr functions\n\
snippet dd\n\
	ddply($***REMOVED***1:frame***REMOVED***, $***REMOVED***2:variables***REMOVED***, $***REMOVED***3:function***REMOVED***)\n\
snippet dl\n\
	dlply($***REMOVED***1:frame***REMOVED***, $***REMOVED***2:variables***REMOVED***, $***REMOVED***3:function***REMOVED***)\n\
snippet da\n\
	daply($***REMOVED***1:frame***REMOVED***, $***REMOVED***2:variables***REMOVED***, $***REMOVED***3:function***REMOVED***)\n\
snippet d_\n\
	d_ply($***REMOVED***1:frame***REMOVED***, $***REMOVED***2:variables***REMOVED***, $***REMOVED***3:function***REMOVED***)\n\
\n\
snippet ad\n\
	adply($***REMOVED***1:array***REMOVED***, $***REMOVED***2:margin***REMOVED***, $***REMOVED***3:function***REMOVED***)\n\
snippet al\n\
	alply($***REMOVED***1:array***REMOVED***, $***REMOVED***2:margin***REMOVED***, $***REMOVED***3:function***REMOVED***)\n\
snippet aa\n\
	aaply($***REMOVED***1:array***REMOVED***, $***REMOVED***2:margin***REMOVED***, $***REMOVED***3:function***REMOVED***)\n\
snippet a_\n\
	a_ply($***REMOVED***1:array***REMOVED***, $***REMOVED***2:margin***REMOVED***, $***REMOVED***3:function***REMOVED***)\n\
\n\
snippet ld\n\
	ldply($***REMOVED***1:list***REMOVED***, $***REMOVED***2:function***REMOVED***)\n\
snippet ll\n\
	llply($***REMOVED***1:list***REMOVED***, $***REMOVED***2:function***REMOVED***)\n\
snippet la\n\
	laply($***REMOVED***1:list***REMOVED***, $***REMOVED***2:function***REMOVED***)\n\
snippet l_\n\
	l_ply($***REMOVED***1:list***REMOVED***, $***REMOVED***2:function***REMOVED***)\n\
\n\
snippet md\n\
	mdply($***REMOVED***1:matrix***REMOVED***, $***REMOVED***2:function***REMOVED***)\n\
snippet ml\n\
	mlply($***REMOVED***1:matrix***REMOVED***, $***REMOVED***2:function***REMOVED***)\n\
snippet ma\n\
	maply($***REMOVED***1:matrix***REMOVED***, $***REMOVED***2:function***REMOVED***)\n\
snippet m_\n\
	m_ply($***REMOVED***1:matrix***REMOVED***, $***REMOVED***2:function***REMOVED***)\n\
\n\
# plot functions\n\
snippet pl\n\
	plot($***REMOVED***1:x***REMOVED***, $***REMOVED***2:y***REMOVED***)\n\
snippet ggp\n\
	ggplot($***REMOVED***1:data***REMOVED***, aes($***REMOVED***2:aesthetics***REMOVED***))\n\
snippet img\n\
	$***REMOVED***1:(jpeg,bmp,png,tiff)***REMOVED***(filename=\"$***REMOVED***2:filename***REMOVED***\", width=$***REMOVED***3***REMOVED***, height=$***REMOVED***4***REMOVED***, unit=\"$***REMOVED***5***REMOVED***\")\n\
	$***REMOVED***6:plot***REMOVED***\n\
	dev.off()\n\
\n\
# statistical test functions\n\
snippet fis\n\
	fisher.test($***REMOVED***1:x***REMOVED***, $***REMOVED***2:y***REMOVED***)\n\
snippet chi\n\
	chisq.test($***REMOVED***1:x***REMOVED***, $***REMOVED***2:y***REMOVED***)\n\
snippet tt\n\
	t.test($***REMOVED***1:x***REMOVED***, $***REMOVED***2:y***REMOVED***)\n\
snippet wil\n\
	wilcox.test($***REMOVED***1:x***REMOVED***, $***REMOVED***2:y***REMOVED***)\n\
snippet cor\n\
	cor.test($***REMOVED***1:x***REMOVED***, $***REMOVED***2:y***REMOVED***)\n\
snippet fte\n\
	var.test($***REMOVED***1:x***REMOVED***, $***REMOVED***2:y***REMOVED***)\n\
snippet kvt \n\
	kv.test($***REMOVED***1:x***REMOVED***, $***REMOVED***2:y***REMOVED***)\n\
";
exports.scope = "r";

***REMOVED***);
