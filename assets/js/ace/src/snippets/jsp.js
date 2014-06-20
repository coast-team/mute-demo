define('ace/snippets/jsp', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "snippet @page\n\
	<%@page contentType=\"text/html\" pageEncoding=\"UTF-8\"%>\n\
snippet jstl\n\
	<%@ taglib uri=\"http://java.sun.com/jsp/jstl/core\" prefix=\"c\" %>\n\
	<%@ taglib uri=\"http://java.sun.com/jsp/jstl/functions\" prefix=\"fn\" %>\n\
snippet jstl:c\n\
	<%@ taglib uri=\"http://java.sun.com/jsp/jstl/core\" prefix=\"c\" %>\n\
snippet jstl:fn\n\
	<%@ taglib uri=\"http://java.sun.com/jsp/jstl/functions\" prefix=\"fn\" %>\n\
snippet cpath\n\
	$***REMOVED***pageContext.request.contextPath***REMOVED***\n\
snippet cout\n\
	<c:out value=\"$***REMOVED***1***REMOVED***\" default=\"$***REMOVED***2***REMOVED***\" />\n\
snippet cset\n\
	<c:set var=\"$***REMOVED***1***REMOVED***\" value=\"$***REMOVED***2***REMOVED***\" />\n\
snippet cremove\n\
	<c:remove var=\"$***REMOVED***1***REMOVED***\" scope=\"$***REMOVED***2:page***REMOVED***\" />\n\
snippet ccatch\n\
	<c:catch var=\"$***REMOVED***1***REMOVED***\" />\n\
snippet cif\n\
	<c:if test=\"$***REMOVED***$***REMOVED***1***REMOVED******REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</c:if>\n\
snippet cchoose\n\
	<c:choose>\n\
		$***REMOVED***1***REMOVED***\n\
	</c:choose>\n\
snippet cwhen\n\
	<c:when test=\"$***REMOVED***$***REMOVED***1***REMOVED******REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</c:when>\n\
snippet cother\n\
	<c:otherwise>\n\
		$***REMOVED***1***REMOVED***\n\
	</c:otherwise>\n\
snippet cfore\n\
	<c:forEach items=\"$***REMOVED***$***REMOVED***1***REMOVED******REMOVED***\" var=\"$***REMOVED***2***REMOVED***\" varStatus=\"$***REMOVED***3***REMOVED***\">\n\
		$***REMOVED***4:<c:out value=\"$2\" />***REMOVED***\n\
	</c:forEach>\n\
snippet cfort\n\
	<c:set var=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2:item1,item2,item3***REMOVED***</c:set>\n\
	<c:forTokens var=\"$***REMOVED***3***REMOVED***\" items=\"$***REMOVED***$1***REMOVED***\" delims=\"$***REMOVED***4:,***REMOVED***\">\n\
		$***REMOVED***5:<c:out value=\"$3\" />***REMOVED***\n\
	</c:forTokens>\n\
snippet cparam\n\
	<c:param name=\"$***REMOVED***1***REMOVED***\" value=\"$***REMOVED***2***REMOVED***\" />\n\
snippet cparam+\n\
	<c:param name=\"$***REMOVED***1***REMOVED***\" value=\"$***REMOVED***2***REMOVED***\" />\n\
	cparam+$***REMOVED***3***REMOVED***\n\
snippet cimport\n\
	<c:import url=\"$***REMOVED***1***REMOVED***\" />\n\
snippet cimport+\n\
	<c:import url=\"$***REMOVED***1***REMOVED***\">\n\
		<c:param name=\"$***REMOVED***2***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />\n\
		cparam+$***REMOVED***4***REMOVED***\n\
	</c:import>\n\
snippet curl\n\
	<c:url value=\"$***REMOVED***1***REMOVED***\" var=\"$***REMOVED***2***REMOVED***\" />\n\
	<a href=\"$***REMOVED***$2***REMOVED***\">$***REMOVED***3***REMOVED***</a>\n\
snippet curl+\n\
	<c:url value=\"$***REMOVED***1***REMOVED***\" var=\"$***REMOVED***2***REMOVED***\">\n\
		<c:param name=\"$***REMOVED***4***REMOVED***\" value=\"$***REMOVED***5***REMOVED***\" />\n\
		cparam+$***REMOVED***6***REMOVED***\n\
	</c:url>\n\
	<a href=\"$***REMOVED***$2***REMOVED***\">$***REMOVED***3***REMOVED***</a>\n\
snippet credirect\n\
	<c:redirect url=\"$***REMOVED***1***REMOVED***\" />\n\
snippet contains\n\
	$***REMOVED***fn:contains($***REMOVED***1:string***REMOVED***, $***REMOVED***2:substr***REMOVED***)***REMOVED***\n\
snippet contains:i\n\
	$***REMOVED***fn:containsIgnoreCase($***REMOVED***1:string***REMOVED***, $***REMOVED***2:substr***REMOVED***)***REMOVED***\n\
snippet endswith\n\
	$***REMOVED***fn:endsWith($***REMOVED***1:string***REMOVED***, $***REMOVED***2:suffix***REMOVED***)***REMOVED***\n\
snippet escape\n\
	$***REMOVED***fn:escapeXml($***REMOVED***1:string***REMOVED***)***REMOVED***\n\
snippet indexof\n\
	$***REMOVED***fn:indexOf($***REMOVED***1:string***REMOVED***, $***REMOVED***2:substr***REMOVED***)***REMOVED***\n\
snippet join\n\
	$***REMOVED***fn:join($***REMOVED***1:collection***REMOVED***, $***REMOVED***2:delims***REMOVED***)***REMOVED***\n\
snippet length\n\
	$***REMOVED***fn:length($***REMOVED***1:collection_or_string***REMOVED***)***REMOVED***\n\
snippet replace\n\
	$***REMOVED***fn:replace($***REMOVED***1:string***REMOVED***, $***REMOVED***2:substr***REMOVED***, $***REMOVED***3:replace***REMOVED***)***REMOVED***\n\
snippet split\n\
	$***REMOVED***fn:split($***REMOVED***1:string***REMOVED***, $***REMOVED***2:delims***REMOVED***)***REMOVED***\n\
snippet startswith\n\
	$***REMOVED***fn:startsWith($***REMOVED***1:string***REMOVED***, $***REMOVED***2:prefix***REMOVED***)***REMOVED***\n\
snippet substr\n\
	$***REMOVED***fn:substring($***REMOVED***1:string***REMOVED***, $***REMOVED***2:begin***REMOVED***, $***REMOVED***3:end***REMOVED***)***REMOVED***\n\
snippet substr:a\n\
	$***REMOVED***fn:substringAfter($***REMOVED***1:string***REMOVED***, $***REMOVED***2:substr***REMOVED***)***REMOVED***\n\
snippet substr:b\n\
	$***REMOVED***fn:substringBefore($***REMOVED***1:string***REMOVED***, $***REMOVED***2:substr***REMOVED***)***REMOVED***\n\
snippet lc\n\
	$***REMOVED***fn:toLowerCase($***REMOVED***1:string***REMOVED***)***REMOVED***\n\
snippet uc\n\
	$***REMOVED***fn:toUpperCase($***REMOVED***1:string***REMOVED***)***REMOVED***\n\
snippet trim\n\
	$***REMOVED***fn:trim($***REMOVED***1:string***REMOVED***)***REMOVED***\n\
";
exports.scope = "jsp";

***REMOVED***);
