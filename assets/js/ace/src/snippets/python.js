define('ace/snippets/python', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "snippet #!\n\
	#!/usr/bin/env python\n\
snippet imp\n\
	import $***REMOVED***1:module***REMOVED***\n\
snippet from\n\
	from $***REMOVED***1:package***REMOVED*** import $***REMOVED***2:module***REMOVED***\n\
# Module Docstring\n\
snippet docs\n\
	'''\n\
	File: $***REMOVED***1:FILENAME:file_name***REMOVED***\n\
	Author: $***REMOVED***2:author***REMOVED***\n\
	Description: $***REMOVED***3***REMOVED***\n\
	'''\n\
snippet wh\n\
	while $***REMOVED***1:condition***REMOVED***:\n\
		$***REMOVED***2:# TODO: write code...***REMOVED***\n\
# dowh - does the same as do...while in other languages\n\
snippet dowh\n\
	while True:\n\
		$***REMOVED***1:# TODO: write code...***REMOVED***\n\
		if $***REMOVED***2:condition***REMOVED***:\n\
			break\n\
snippet with\n\
	with $***REMOVED***1:expr***REMOVED*** as $***REMOVED***2:var***REMOVED***:\n\
		$***REMOVED***3:# TODO: write code...***REMOVED***\n\
# New Class\n\
snippet cl\n\
	class $***REMOVED***1:ClassName***REMOVED***($***REMOVED***2:object***REMOVED***):\n\
		\"\"\"$***REMOVED***3:docstring for $1***REMOVED***\"\"\"\n\
		def __init__(self, $***REMOVED***4:arg***REMOVED***):\n\
			$***REMOVED***5:super($1, self).__init__()***REMOVED***\n\
			self.$4 = $4\n\
			$***REMOVED***6***REMOVED***\n\
# New Function\n\
snippet def\n\
	def $***REMOVED***1:fname***REMOVED***($***REMOVED***2:`indent('.') ? 'self' : ''`***REMOVED***):\n\
		\"\"\"$***REMOVED***3:docstring for $1***REMOVED***\"\"\"\n\
		$***REMOVED***4:# TODO: write code...***REMOVED***\n\
snippet deff\n\
	def $***REMOVED***1:fname***REMOVED***($***REMOVED***2:`indent('.') ? 'self' : ''`***REMOVED***):\n\
		$***REMOVED***3:# TODO: write code...***REMOVED***\n\
# New Method\n\
snippet defs\n\
	def $***REMOVED***1:mname***REMOVED***(self, $***REMOVED***2:arg***REMOVED***):\n\
		$***REMOVED***3:# TODO: write code...***REMOVED***\n\
# New Property\n\
snippet property\n\
	def $***REMOVED***1:foo***REMOVED***():\n\
		doc = \"$***REMOVED***2:The $1 property.***REMOVED***\"\n\
		def fget(self):\n\
			$***REMOVED***3:return self._$1***REMOVED***\n\
		def fset(self, value):\n\
			$***REMOVED***4:self._$1 = value***REMOVED***\n\
# Ifs\n\
snippet if\n\
	if $***REMOVED***1:condition***REMOVED***:\n\
		$***REMOVED***2:# TODO: write code...***REMOVED***\n\
snippet el\n\
	else:\n\
		$***REMOVED***1:# TODO: write code...***REMOVED***\n\
snippet ei\n\
	elif $***REMOVED***1:condition***REMOVED***:\n\
		$***REMOVED***2:# TODO: write code...***REMOVED***\n\
# For\n\
snippet for\n\
	for $***REMOVED***1:item***REMOVED*** in $***REMOVED***2:items***REMOVED***:\n\
		$***REMOVED***3:# TODO: write code...***REMOVED***\n\
# Encodes\n\
snippet cutf8\n\
	# -*- coding: utf-8 -*-\n\
snippet clatin1\n\
	# -*- coding: latin-1 -*-\n\
snippet cascii\n\
	# -*- coding: ascii -*-\n\
# Lambda\n\
snippet ld\n\
	$***REMOVED***1:var***REMOVED*** = lambda $***REMOVED***2:vars***REMOVED*** : $***REMOVED***3:action***REMOVED***\n\
snippet .\n\
	self.\n\
snippet try Try/Except\n\
	try:\n\
		$***REMOVED***1:# TODO: write code...***REMOVED***\n\
	except $***REMOVED***2:Exception***REMOVED***, $***REMOVED***3:e***REMOVED***:\n\
		$***REMOVED***4:raise $3***REMOVED***\n\
snippet try Try/Except/Else\n\
	try:\n\
		$***REMOVED***1:# TODO: write code...***REMOVED***\n\
	except $***REMOVED***2:Exception***REMOVED***, $***REMOVED***3:e***REMOVED***:\n\
		$***REMOVED***4:raise $3***REMOVED***\n\
	else:\n\
		$***REMOVED***5:# TODO: write code...***REMOVED***\n\
snippet try Try/Except/Finally\n\
	try:\n\
		$***REMOVED***1:# TODO: write code...***REMOVED***\n\
	except $***REMOVED***2:Exception***REMOVED***, $***REMOVED***3:e***REMOVED***:\n\
		$***REMOVED***4:raise $3***REMOVED***\n\
	finally:\n\
		$***REMOVED***5:# TODO: write code...***REMOVED***\n\
snippet try Try/Except/Else/Finally\n\
	try:\n\
		$***REMOVED***1:# TODO: write code...***REMOVED***\n\
	except $***REMOVED***2:Exception***REMOVED***, $***REMOVED***3:e***REMOVED***:\n\
		$***REMOVED***4:raise $3***REMOVED***\n\
	else:\n\
		$***REMOVED***5:# TODO: write code...***REMOVED***\n\
	finally:\n\
		$***REMOVED***6:# TODO: write code...***REMOVED***\n\
# if __name__ == '__main__':\n\
snippet ifmain\n\
	if __name__ == '__main__':\n\
		$***REMOVED***1:main()***REMOVED***\n\
# __magic__\n\
snippet _\n\
	__$***REMOVED***1:init***REMOVED***__$***REMOVED***2***REMOVED***\n\
# python debugger (pdb)\n\
snippet pdb\n\
	import pdb; pdb.set_trace()\n\
# ipython debugger (ipdb)\n\
snippet ipdb\n\
	import ipdb; ipdb.set_trace()\n\
# ipython debugger (pdbbb)\n\
snippet pdbbb\n\
	import pdbpp; pdbpp.set_trace()\n\
snippet pprint\n\
	import pprint; pprint.pprint($***REMOVED***1***REMOVED***)$***REMOVED***2***REMOVED***\n\
snippet \"\n\
	\"\"\"\n\
	$***REMOVED***1:doc***REMOVED***\n\
	\"\"\"\n\
# test function/method\n\
snippet test\n\
	def test_$***REMOVED***1:description***REMOVED***($***REMOVED***2:self***REMOVED***):\n\
		$***REMOVED***3:# TODO: write code...***REMOVED***\n\
# test case\n\
snippet testcase\n\
	class $***REMOVED***1:ExampleCase***REMOVED***(unittest.TestCase):\n\
		\n\
		def test_$***REMOVED***2:description***REMOVED***(self):\n\
			$***REMOVED***3:# TODO: write code...***REMOVED***\n\
snippet fut\n\
	from __future__ import $***REMOVED***1***REMOVED***\n\
#getopt\n\
snippet getopt\n\
	try:\n\
		# Short option syntax: \"hv:\"\n\
		# Long option syntax: \"help\" or \"verbose=\"\n\
		opts, args = getopt.getopt(sys.argv[1:], \"$***REMOVED***1:short_options***REMOVED***\", [$***REMOVED***2:long_options***REMOVED***])\n\
	\n\
	except getopt.GetoptError, err:\n\
		# Print debug info\n\
		print str(err)\n\
		$***REMOVED***3:error_action***REMOVED***\n\
\n\
	for option, argument in opts:\n\
		if option in (\"-h\", \"--help\"):\n\
			$***REMOVED***4***REMOVED***\n\
		elif option in (\"-v\", \"--verbose\"):\n\
			verbose = argument\n\
";
exports.scope = "python";

***REMOVED***);
