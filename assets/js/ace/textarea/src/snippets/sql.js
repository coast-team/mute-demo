__ace_shadowed__.define('ace/snippets/sql', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "snippet tbl\n\
	create table $***REMOVED***1:table***REMOVED*** (\n\
		$***REMOVED***2:columns***REMOVED***\n\
	);\n\
snippet col\n\
	$***REMOVED***1:name***REMOVED***	$***REMOVED***2:type***REMOVED***	$***REMOVED***3:default ''***REMOVED***	$***REMOVED***4:not null***REMOVED***\n\
snippet ccol\n\
	$***REMOVED***1:name***REMOVED***	varchar2($***REMOVED***2:size***REMOVED***)	$***REMOVED***3:default ''***REMOVED***	$***REMOVED***4:not null***REMOVED***\n\
snippet ncol\n\
	$***REMOVED***1:name***REMOVED***	number	$***REMOVED***3:default 0***REMOVED***	$***REMOVED***4:not null***REMOVED***\n\
snippet dcol\n\
	$***REMOVED***1:name***REMOVED***	date	$***REMOVED***3:default sysdate***REMOVED***	$***REMOVED***4:not null***REMOVED***\n\
snippet ind\n\
	create index $***REMOVED***3:$1_$2***REMOVED*** on $***REMOVED***1:table***REMOVED***($***REMOVED***2:column***REMOVED***);\n\
snippet uind\n\
	create unique index $***REMOVED***1:name***REMOVED*** on $***REMOVED***2:table***REMOVED***($***REMOVED***3:column***REMOVED***);\n\
snippet tblcom\n\
	comment on table $***REMOVED***1:table***REMOVED*** is '$***REMOVED***2:comment***REMOVED***';\n\
snippet colcom\n\
	comment on column $***REMOVED***1:table***REMOVED***.$***REMOVED***2:column***REMOVED*** is '$***REMOVED***3:comment***REMOVED***';\n\
snippet addcol\n\
	alter table $***REMOVED***1:table***REMOVED*** add ($***REMOVED***2:column***REMOVED*** $***REMOVED***3:type***REMOVED***);\n\
snippet seq\n\
	create sequence $***REMOVED***1:name***REMOVED*** start with $***REMOVED***2:1***REMOVED*** increment by $***REMOVED***3:1***REMOVED*** minvalue $***REMOVED***4:1***REMOVED***;\n\
snippet s*\n\
	select * from $***REMOVED***1:table***REMOVED***\n\
";
exports.scope = "sql";

***REMOVED***);
