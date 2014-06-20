define('ace/snippets/c_cpp', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "## STL Collections\n\
# std::array\n\
snippet array\n\
	std::array<$***REMOVED***1:T***REMOVED***, $***REMOVED***2:N***REMOVED***> $***REMOVED***3***REMOVED***;$***REMOVED***4***REMOVED***\n\
# std::vector\n\
snippet vector\n\
	std::vector<$***REMOVED***1:T***REMOVED***> $***REMOVED***2***REMOVED***;$***REMOVED***3***REMOVED***\n\
# std::deque\n\
snippet deque\n\
	std::deque<$***REMOVED***1:T***REMOVED***> $***REMOVED***2***REMOVED***;$***REMOVED***3***REMOVED***\n\
# std::forward_list\n\
snippet flist\n\
	std::forward_list<$***REMOVED***1:T***REMOVED***> $***REMOVED***2***REMOVED***;$***REMOVED***3***REMOVED***\n\
# std::list\n\
snippet list\n\
	std::list<$***REMOVED***1:T***REMOVED***> $***REMOVED***2***REMOVED***;$***REMOVED***3***REMOVED***\n\
# std::set\n\
snippet set\n\
	std::set<$***REMOVED***1:T***REMOVED***> $***REMOVED***2***REMOVED***;$***REMOVED***3***REMOVED***\n\
# std::map\n\
snippet map\n\
	std::map<$***REMOVED***1:Key***REMOVED***, $***REMOVED***2:T***REMOVED***> $***REMOVED***3***REMOVED***;$***REMOVED***4***REMOVED***\n\
# std::multiset\n\
snippet mset\n\
	std::multiset<$***REMOVED***1:T***REMOVED***> $***REMOVED***2***REMOVED***;$***REMOVED***3***REMOVED***\n\
# std::multimap\n\
snippet mmap\n\
	std::multimap<$***REMOVED***1:Key***REMOVED***, $***REMOVED***2:T***REMOVED***> $***REMOVED***3***REMOVED***;$***REMOVED***4***REMOVED***\n\
# std::unordered_set\n\
snippet uset\n\
	std::unordered_set<$***REMOVED***1:T***REMOVED***> $***REMOVED***2***REMOVED***;$***REMOVED***3***REMOVED***\n\
# std::unordered_map\n\
snippet umap\n\
	std::unordered_map<$***REMOVED***1:Key***REMOVED***, $***REMOVED***2:T***REMOVED***> $***REMOVED***3***REMOVED***;$***REMOVED***4***REMOVED***\n\
# std::unordered_multiset\n\
snippet umset\n\
	std::unordered_multiset<$***REMOVED***1:T***REMOVED***> $***REMOVED***2***REMOVED***;$***REMOVED***3***REMOVED***\n\
# std::unordered_multimap\n\
snippet ummap\n\
	std::unordered_multimap<$***REMOVED***1:Key***REMOVED***, $***REMOVED***2:T***REMOVED***> $***REMOVED***3***REMOVED***;$***REMOVED***4***REMOVED***\n\
# std::stack\n\
snippet stack\n\
	std::stack<$***REMOVED***1:T***REMOVED***> $***REMOVED***2***REMOVED***;$***REMOVED***3***REMOVED***\n\
# std::queue\n\
snippet queue\n\
	std::queue<$***REMOVED***1:T***REMOVED***> $***REMOVED***2***REMOVED***;$***REMOVED***3***REMOVED***\n\
# std::priority_queue\n\
snippet pqueue\n\
	std::priority_queue<$***REMOVED***1:T***REMOVED***> $***REMOVED***2***REMOVED***;$***REMOVED***3***REMOVED***\n\
##\n\
## Access Modifiers\n\
# private\n\
snippet pri\n\
	private\n\
# protected\n\
snippet pro\n\
	protected\n\
# public\n\
snippet pub\n\
	public\n\
# friend\n\
snippet fr\n\
	friend\n\
# mutable\n\
snippet mu\n\
	mutable\n\
## \n\
## Class\n\
# class\n\
snippet cl\n\
	class $***REMOVED***1:`Filename('$1', 'name')`***REMOVED*** \n\
	***REMOVED***\n\
	public:\n\
		$1($***REMOVED***2***REMOVED***);\n\
		~$1();\n\
\n\
	private:\n\
		$***REMOVED***3:/* data */***REMOVED***\n\
	***REMOVED***;\n\
# member function implementation\n\
snippet mfun\n\
	$***REMOVED***4:void***REMOVED*** $***REMOVED***1:`Filename('$1', 'ClassName')`***REMOVED***::$***REMOVED***2:memberFunction***REMOVED***($***REMOVED***3***REMOVED***) ***REMOVED***\n\
		$***REMOVED***5:/* code */***REMOVED***\n\
	***REMOVED***\n\
# namespace\n\
snippet ns\n\
	namespace $***REMOVED***1:`Filename('', 'my')`***REMOVED*** ***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	***REMOVED*** /* namespace $1 */\n\
##\n\
## Input/Output\n\
# std::cout\n\
snippet cout\n\
	std::cout << $***REMOVED***1***REMOVED*** << std::endl;$***REMOVED***2***REMOVED***\n\
# std::cin\n\
snippet cin\n\
	std::cin >> $***REMOVED***1***REMOVED***;$***REMOVED***2***REMOVED***\n\
##\n\
## Iteration\n\
# for i \n\
snippet fori\n\
	for (int $***REMOVED***2:i***REMOVED*** = 0; $2 < $***REMOVED***1:count***REMOVED***; $2$***REMOVED***3:++***REMOVED***) ***REMOVED***\n\
		$***REMOVED***4:/* code */***REMOVED***\n\
	***REMOVED***$***REMOVED***5***REMOVED***\n\
\n\
# foreach\n\
snippet fore\n\
	for ($***REMOVED***1:auto***REMOVED*** $***REMOVED***2:i***REMOVED*** : $***REMOVED***3:container***REMOVED***) ***REMOVED***\n\
		$***REMOVED***4:/* code */***REMOVED***\n\
	***REMOVED***$***REMOVED***5***REMOVED***\n\
# iterator\n\
snippet iter\n\
	for ($***REMOVED***1:std::vector***REMOVED***<$***REMOVED***2:type***REMOVED***>::$***REMOVED***3:const_iterator***REMOVED*** $***REMOVED***4:i***REMOVED*** = $***REMOVED***5:container***REMOVED***.begin(); $4 != $5.end(); ++$4) ***REMOVED***\n\
		$***REMOVED***6***REMOVED***\n\
	***REMOVED***$***REMOVED***7***REMOVED***\n\
\n\
# auto iterator\n\
snippet itera\n\
	for (auto $***REMOVED***1:i***REMOVED*** = $1.begin(); $1 != $1.end(); ++$1) ***REMOVED***\n\
		$***REMOVED***2:std::cout << *$1 << std::endl;***REMOVED***\n\
	***REMOVED***$***REMOVED***3***REMOVED***\n\
##\n\
## Lambdas\n\
# lamda (one line)\n\
snippet ld\n\
	[$***REMOVED***1***REMOVED***]($***REMOVED***2***REMOVED***)***REMOVED***$***REMOVED***3:/* code */***REMOVED******REMOVED***$***REMOVED***4***REMOVED***\n\
# lambda (multi-line)\n\
snippet lld\n\
	[$***REMOVED***1***REMOVED***]($***REMOVED***2***REMOVED***)***REMOVED***\n\
		$***REMOVED***3:/* code */***REMOVED***\n\
	***REMOVED***$***REMOVED***4***REMOVED***\n\
";
exports.scope = "c_cpp";

***REMOVED***);
