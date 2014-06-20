define('ace/snippets/tex', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "#PREAMBLE\n\
#newcommand\n\
snippet nc\n\
	\\newcommand***REMOVED***\\$***REMOVED***1:cmd***REMOVED******REMOVED***[$***REMOVED***2:opt***REMOVED***]***REMOVED***$***REMOVED***3:realcmd***REMOVED******REMOVED***$***REMOVED***4***REMOVED***\n\
#usepackage\n\
snippet up\n\
	\\usepackage[$***REMOVED***1:[options***REMOVED***]***REMOVED***$***REMOVED***2:package***REMOVED******REMOVED***\n\
#newunicodechar\n\
snippet nuc\n\
	\\newunicodechar***REMOVED***$***REMOVED***1***REMOVED******REMOVED******REMOVED***$***REMOVED***2:\\ensuremath***REMOVED***$***REMOVED***3:tex-substitute***REMOVED******REMOVED******REMOVED***\n\
#DeclareMathOperator\n\
snippet dmo\n\
	\\DeclareMathOperator***REMOVED***$***REMOVED***1***REMOVED******REMOVED******REMOVED***$***REMOVED***2***REMOVED******REMOVED***\n\
\n\
#DOCUMENT\n\
# \\begin***REMOVED******REMOVED***...\\end***REMOVED******REMOVED***\n\
snippet begin\n\
	\\begin***REMOVED***$***REMOVED***1:env***REMOVED******REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	\\end***REMOVED***$1***REMOVED***\n\
# Tabular\n\
snippet tab\n\
	\\begin***REMOVED***$***REMOVED***1:tabular***REMOVED******REMOVED******REMOVED***$***REMOVED***2:c***REMOVED******REMOVED***\n\
	$***REMOVED***3***REMOVED***\n\
	\\end***REMOVED***$1***REMOVED***\n\
snippet thm\n\
	\\begin[$***REMOVED***1:author***REMOVED***]***REMOVED***$***REMOVED***2:thm***REMOVED******REMOVED***\n\
	$***REMOVED***3***REMOVED***\n\
	\\end***REMOVED***$1***REMOVED***\n\
snippet center\n\
	\\begin***REMOVED***center***REMOVED***\n\
		$***REMOVED***1***REMOVED***\n\
	\\end***REMOVED***center***REMOVED***\n\
# Align(ed)\n\
snippet ali\n\
	\\begin***REMOVED***align$***REMOVED***1:ed***REMOVED******REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	\\end***REMOVED***align$1***REMOVED***\n\
# Gather(ed)\n\
snippet gat\n\
	\\begin***REMOVED***gather$***REMOVED***1:ed***REMOVED******REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	\\end***REMOVED***gather$1***REMOVED***\n\
# Equation\n\
snippet eq\n\
	\\begin***REMOVED***equation***REMOVED***\n\
		$***REMOVED***1***REMOVED***\n\
	\\end***REMOVED***equation***REMOVED***\n\
# Equation\n\
snippet eq*\n\
	\\begin***REMOVED***equation****REMOVED***\n\
		$***REMOVED***1***REMOVED***\n\
	\\end***REMOVED***equation****REMOVED***\n\
# Unnumbered Equation\n\
snippet \\\n\
	\\[\n\
		$***REMOVED***1***REMOVED***\n\
	\\]\n\
# Enumerate\n\
snippet enum\n\
	\\begin***REMOVED***enumerate***REMOVED***\n\
		\\item $***REMOVED***1***REMOVED***\n\
	\\end***REMOVED***enumerate***REMOVED***\n\
# Itemize\n\
snippet itemize\n\
	\\begin***REMOVED***itemize***REMOVED***\n\
		\\item $***REMOVED***1***REMOVED***\n\
	\\end***REMOVED***itemize***REMOVED***\n\
# Description\n\
snippet desc\n\
	\\begin***REMOVED***description***REMOVED***\n\
		\\item[$***REMOVED***1***REMOVED***] $***REMOVED***2***REMOVED***\n\
	\\end***REMOVED***description***REMOVED***\n\
# Matrix\n\
snippet mat\n\
	\\begin***REMOVED***$***REMOVED***1:p/b/v/V/B/small***REMOVED***matrix***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	\\end***REMOVED***$1matrix***REMOVED***\n\
# Cases\n\
snippet cas\n\
	\\begin***REMOVED***cases***REMOVED***\n\
		$***REMOVED***1:equation***REMOVED***, &\\text***REMOVED*** if ***REMOVED***$***REMOVED***2:case***REMOVED***\\\\\n\
		$***REMOVED***3***REMOVED***\n\
	\\end***REMOVED***cases***REMOVED***\n\
# Split\n\
snippet spl\n\
	\\begin***REMOVED***split***REMOVED***\n\
		$***REMOVED***1***REMOVED***\n\
	\\end***REMOVED***split***REMOVED***\n\
# Part\n\
snippet part\n\
	\\part***REMOVED***$***REMOVED***1:part name***REMOVED******REMOVED*** % (fold)\n\
	\\label***REMOVED***prt:$***REMOVED***2:$1***REMOVED******REMOVED***\n\
	$***REMOVED***3***REMOVED***\n\
	% part $2 (end)\n\
# Chapter\n\
snippet cha\n\
	\\chapter***REMOVED***$***REMOVED***1:chapter name***REMOVED******REMOVED***\n\
	\\label***REMOVED***cha:$***REMOVED***2:$1***REMOVED******REMOVED***\n\
	$***REMOVED***3***REMOVED***\n\
# Section\n\
snippet sec\n\
	\\section***REMOVED***$***REMOVED***1:section name***REMOVED******REMOVED***\n\
	\\label***REMOVED***sec:$***REMOVED***2:$1***REMOVED******REMOVED***\n\
	$***REMOVED***3***REMOVED***\n\
# Sub Section\n\
snippet sub\n\
	\\subsection***REMOVED***$***REMOVED***1:subsection name***REMOVED******REMOVED***\n\
	\\label***REMOVED***sub:$***REMOVED***2:$1***REMOVED******REMOVED***\n\
	$***REMOVED***3***REMOVED***\n\
# Sub Sub Section\n\
snippet subs\n\
	\\subsubsection***REMOVED***$***REMOVED***1:subsubsection name***REMOVED******REMOVED***\n\
	\\label***REMOVED***ssub:$***REMOVED***2:$1***REMOVED******REMOVED***\n\
	$***REMOVED***3***REMOVED***\n\
# Paragraph\n\
snippet par\n\
	\\paragraph***REMOVED***$***REMOVED***1:paragraph name***REMOVED******REMOVED***\n\
	\\label***REMOVED***par:$***REMOVED***2:$1***REMOVED******REMOVED***\n\
	$***REMOVED***3***REMOVED***\n\
# Sub Paragraph\n\
snippet subp\n\
	\\subparagraph***REMOVED***$***REMOVED***1:subparagraph name***REMOVED******REMOVED***\n\
	\\label***REMOVED***subp:$***REMOVED***2:$1***REMOVED******REMOVED***\n\
	$***REMOVED***3***REMOVED***\n\
#References\n\
snippet itd\n\
	\\item[$***REMOVED***1:description***REMOVED***] $***REMOVED***2:item***REMOVED***\n\
snippet figure\n\
	$***REMOVED***1:Figure***REMOVED***~\\ref***REMOVED***$***REMOVED***2:fig:***REMOVED******REMOVED***$***REMOVED***3***REMOVED***\n\
snippet table\n\
	$***REMOVED***1:Table***REMOVED***~\\ref***REMOVED***$***REMOVED***2:tab:***REMOVED******REMOVED***$***REMOVED***3***REMOVED***\n\
snippet listing\n\
	$***REMOVED***1:Listing***REMOVED***~\\ref***REMOVED***$***REMOVED***2:list***REMOVED******REMOVED***$***REMOVED***3***REMOVED***\n\
snippet section\n\
	$***REMOVED***1:Section***REMOVED***~\\ref***REMOVED***$***REMOVED***2:sec:***REMOVED******REMOVED***$***REMOVED***3***REMOVED***\n\
snippet page\n\
	$***REMOVED***1:page***REMOVED***~\\pageref***REMOVED***$***REMOVED***2***REMOVED******REMOVED***$***REMOVED***3***REMOVED***\n\
snippet index\n\
	\\index***REMOVED***$***REMOVED***1:index***REMOVED******REMOVED***$***REMOVED***2***REMOVED***\n\
#Citations\n\
snippet cite\n\
	\\cite[$***REMOVED***1***REMOVED***]***REMOVED***$***REMOVED***2***REMOVED******REMOVED***$***REMOVED***3***REMOVED***\n\
snippet fcite\n\
	\\footcite[$***REMOVED***1***REMOVED***]***REMOVED***$***REMOVED***2***REMOVED******REMOVED***$***REMOVED***3***REMOVED***\n\
#Formating text: italic, bold, underline, small capital, emphase ..\n\
snippet it\n\
	\\textit***REMOVED***$***REMOVED***1:text***REMOVED******REMOVED***\n\
snippet bf\n\
	\\textbf***REMOVED***$***REMOVED***1:text***REMOVED******REMOVED***\n\
snippet under\n\
	\\underline***REMOVED***$***REMOVED***1:text***REMOVED******REMOVED***\n\
snippet emp\n\
	\\emph***REMOVED***$***REMOVED***1:text***REMOVED******REMOVED***\n\
snippet sc\n\
	\\textsc***REMOVED***$***REMOVED***1:text***REMOVED******REMOVED***\n\
#Choosing font\n\
snippet sf\n\
	\\textsf***REMOVED***$***REMOVED***1:text***REMOVED******REMOVED***\n\
snippet rm\n\
	\\textrm***REMOVED***$***REMOVED***1:text***REMOVED******REMOVED***\n\
snippet tt\n\
	\\texttt***REMOVED***$***REMOVED***1:text***REMOVED******REMOVED***\n\
#misc\n\
snippet ft\n\
	\\footnote***REMOVED***$***REMOVED***1:text***REMOVED******REMOVED***\n\
snippet fig\n\
	\\begin***REMOVED***figure***REMOVED***\n\
	\\begin***REMOVED***center***REMOVED***\n\
	    \\includegraphics[scale=$***REMOVED***1***REMOVED***]***REMOVED***Figures/$***REMOVED***2***REMOVED******REMOVED***\n\
	\\end***REMOVED***center***REMOVED***\n\
	\\caption***REMOVED***$***REMOVED***3***REMOVED******REMOVED***\n\
	\\label***REMOVED***fig:$***REMOVED***4***REMOVED******REMOVED***\n\
	\\end***REMOVED***figure***REMOVED***\n\
snippet tikz\n\
	\\begin***REMOVED***figure***REMOVED***\n\
	\\begin***REMOVED***center***REMOVED***\n\
	\\begin***REMOVED***tikzpicture***REMOVED***[scale=$***REMOVED***1:1***REMOVED***]\n\
		$***REMOVED***2***REMOVED***\n\
	\\end***REMOVED***tikzpicture***REMOVED***\n\
	\\end***REMOVED***center***REMOVED***\n\
	\\caption***REMOVED***$***REMOVED***3***REMOVED******REMOVED***\n\
	\\label***REMOVED***fig:$***REMOVED***4***REMOVED******REMOVED***\n\
	\\end***REMOVED***figure***REMOVED***\n\
#math\n\
snippet stackrel\n\
	\\stackrel***REMOVED***$***REMOVED***1:above***REMOVED******REMOVED******REMOVED***$***REMOVED***2:below***REMOVED******REMOVED*** $***REMOVED***3***REMOVED***\n\
snippet frac\n\
	\\frac***REMOVED***$***REMOVED***1:num***REMOVED******REMOVED******REMOVED***$***REMOVED***2:denom***REMOVED******REMOVED***\n\
snippet sum\n\
	\\sum^***REMOVED***$***REMOVED***1:n***REMOVED******REMOVED***_***REMOVED***$***REMOVED***2:i=1***REMOVED******REMOVED******REMOVED***$***REMOVED***3***REMOVED******REMOVED***";
exports.scope = "tex";

***REMOVED***);
