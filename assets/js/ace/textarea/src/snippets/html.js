__ace_shadowed__.define('ace/snippets/html', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "# Some useful Unicode entities\n\
# Non-Breaking Space\n\
snippet nbs\n\
	&nbsp;\n\
# ←\n\
snippet left\n\
	&#x2190;\n\
# →\n\
snippet right\n\
	&#x2192;\n\
# ↑\n\
snippet up\n\
	&#x2191;\n\
# ↓\n\
snippet down\n\
	&#x2193;\n\
# ↩\n\
snippet return\n\
	&#x21A9;\n\
# ⇤\n\
snippet backtab\n\
	&#x21E4;\n\
# ⇥\n\
snippet tab\n\
	&#x21E5;\n\
# ⇧\n\
snippet shift\n\
	&#x21E7;\n\
# ⌃\n\
snippet ctrl\n\
	&#x2303;\n\
# ⌅\n\
snippet enter\n\
	&#x2305;\n\
# ⌘\n\
snippet cmd\n\
	&#x2318;\n\
# ⌥\n\
snippet option\n\
	&#x2325;\n\
# ⌦\n\
snippet delete\n\
	&#x2326;\n\
# ⌫\n\
snippet backspace\n\
	&#x232B;\n\
# ⎋\n\
snippet esc\n\
	&#x238B;\n\
# Generic Doctype\n\
snippet doctype HTML 4.01 Strict\n\
	<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\"\n\
	\"http://www.w3.org/TR/html4/strict.dtd\">\n\
snippet doctype HTML 4.01 Transitional\n\
	<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\"\n\
	\"http://www.w3.org/TR/html4/loose.dtd\">\n\
snippet doctype HTML 5\n\
	<!DOCTYPE HTML>\n\
snippet doctype XHTML 1.0 Frameset\n\
	<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"\n\
	\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n\
snippet doctype XHTML 1.0 Strict\n\
	<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"\n\
	\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n\
snippet doctype XHTML 1.0 Transitional\n\
	<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\n\
	\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n\
snippet doctype XHTML 1.1\n\
	<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\"\n\
	\"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">\n\
# HTML Doctype 4.01 Strict\n\
snippet docts\n\
	<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\"\n\
	\"http://www.w3.org/TR/html4/strict.dtd\">\n\
# HTML Doctype 4.01 Transitional\n\
snippet doct\n\
	<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\"\n\
	\"http://www.w3.org/TR/html4/loose.dtd\">\n\
# HTML Doctype 5\n\
snippet doct5\n\
	<!DOCTYPE HTML>\n\
# XHTML Doctype 1.0 Frameset\n\
snippet docxf\n\
	<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Frameset//EN\"\n\
	\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd\">\n\
# XHTML Doctype 1.0 Strict\n\
snippet docxs\n\
	<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"\n\
	\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n\
# XHTML Doctype 1.0 Transitional\n\
snippet docxt\n\
	<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\n\
	\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n\
# XHTML Doctype 1.1\n\
snippet docx\n\
	<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\"\n\
	\"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">\n\
# Attributes\n\
snippet attr\n\
	$***REMOVED***1:attribute***REMOVED***=\"$***REMOVED***2:property***REMOVED***\"\n\
snippet attr+\n\
	$***REMOVED***1:attribute***REMOVED***=\"$***REMOVED***2:property***REMOVED***\" attr+$***REMOVED***3***REMOVED***\n\
snippet .\n\
	class=\"$***REMOVED***1***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet #\n\
	id=\"$***REMOVED***1***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet alt\n\
	alt=\"$***REMOVED***1***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet charset\n\
	charset=\"$***REMOVED***1:utf-8***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet data\n\
	data-$***REMOVED***1***REMOVED***=\"$***REMOVED***2:$1***REMOVED***\"$***REMOVED***3***REMOVED***\n\
snippet for\n\
	for=\"$***REMOVED***1***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet height\n\
	height=\"$***REMOVED***1***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet href\n\
	href=\"$***REMOVED***1:#***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet lang\n\
	lang=\"$***REMOVED***1:en***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet media\n\
	media=\"$***REMOVED***1***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet name\n\
	name=\"$***REMOVED***1***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet rel\n\
	rel=\"$***REMOVED***1***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet scope\n\
	scope=\"$***REMOVED***1:row***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet src\n\
	src=\"$***REMOVED***1***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet title=\n\
	title=\"$***REMOVED***1***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet type\n\
	type=\"$***REMOVED***1***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet value\n\
	value=\"$***REMOVED***1***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet width\n\
	width=\"$***REMOVED***1***REMOVED***\"$***REMOVED***2***REMOVED***\n\
# Elements\n\
snippet a\n\
	<a href=\"$***REMOVED***1:#***REMOVED***\">$***REMOVED***2:$1***REMOVED***</a>\n\
snippet a.\n\
	<a class=\"$***REMOVED***1***REMOVED***\" href=\"$***REMOVED***2:#***REMOVED***\">$***REMOVED***3:$1***REMOVED***</a>\n\
snippet a#\n\
	<a id=\"$***REMOVED***1***REMOVED***\" href=\"$***REMOVED***2:#***REMOVED***\">$***REMOVED***3:$1***REMOVED***</a>\n\
snippet a:ext\n\
	<a href=\"http://$***REMOVED***1:example.com***REMOVED***\">$***REMOVED***2:$1***REMOVED***</a>\n\
snippet a:mail\n\
	<a href=\"mailto:$***REMOVED***1:joe@example.com***REMOVED***?subject=$***REMOVED***2:feedback***REMOVED***\">$***REMOVED***3:email me***REMOVED***</a>\n\
snippet abbr\n\
	<abbr title=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</abbr>\n\
snippet address\n\
	<address>\n\
		$***REMOVED***1***REMOVED***\n\
	</address>\n\
snippet area\n\
	<area shape=\"$***REMOVED***1:rect***REMOVED***\" coords=\"$***REMOVED***2***REMOVED***\" href=\"$***REMOVED***3***REMOVED***\" alt=\"$***REMOVED***4***REMOVED***\" />\n\
snippet area+\n\
	<area shape=\"$***REMOVED***1:rect***REMOVED***\" coords=\"$***REMOVED***2***REMOVED***\" href=\"$***REMOVED***3***REMOVED***\" alt=\"$***REMOVED***4***REMOVED***\" />\n\
	area+$***REMOVED***5***REMOVED***\n\
snippet area:c\n\
	<area shape=\"circle\" coords=\"$***REMOVED***1***REMOVED***\" href=\"$***REMOVED***2***REMOVED***\" alt=\"$***REMOVED***3***REMOVED***\" />\n\
snippet area:d\n\
	<area shape=\"default\" coords=\"$***REMOVED***1***REMOVED***\" href=\"$***REMOVED***2***REMOVED***\" alt=\"$***REMOVED***3***REMOVED***\" />\n\
snippet area:p\n\
	<area shape=\"poly\" coords=\"$***REMOVED***1***REMOVED***\" href=\"$***REMOVED***2***REMOVED***\" alt=\"$***REMOVED***3***REMOVED***\" />\n\
snippet area:r\n\
	<area shape=\"rect\" coords=\"$***REMOVED***1***REMOVED***\" href=\"$***REMOVED***2***REMOVED***\" alt=\"$***REMOVED***3***REMOVED***\" />\n\
snippet article\n\
	<article>\n\
		$***REMOVED***1***REMOVED***\n\
	</article>\n\
snippet article.\n\
	<article class=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</article>\n\
snippet article#\n\
	<article id=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</article>\n\
snippet aside\n\
	<aside>\n\
		$***REMOVED***1***REMOVED***\n\
	</aside>\n\
snippet aside.\n\
	<aside class=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</aside>\n\
snippet aside#\n\
	<aside id=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</aside>\n\
snippet audio\n\
	<audio src=\"$***REMOVED***1***REMOVED***>$***REMOVED***2***REMOVED***</audio>\n\
snippet b\n\
	<b>$***REMOVED***1***REMOVED***</b>\n\
snippet base\n\
	<base href=\"$***REMOVED***1***REMOVED***\" target=\"$***REMOVED***2***REMOVED***\" />\n\
snippet bdi\n\
	<bdi>$***REMOVED***1***REMOVED***</bdo>\n\
snippet bdo\n\
	<bdo dir=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</bdo>\n\
snippet bdo:l\n\
	<bdo dir=\"ltr\">$***REMOVED***1***REMOVED***</bdo>\n\
snippet bdo:r\n\
	<bdo dir=\"rtl\">$***REMOVED***1***REMOVED***</bdo>\n\
snippet blockquote\n\
	<blockquote>\n\
		$***REMOVED***1***REMOVED***\n\
	</blockquote>\n\
snippet body\n\
	<body>\n\
		$***REMOVED***1***REMOVED***\n\
	</body>\n\
snippet br\n\
	<br />$***REMOVED***1***REMOVED***\n\
snippet button\n\
	<button type=\"$***REMOVED***1:submit***REMOVED***\">$***REMOVED***2***REMOVED***</button>\n\
snippet button.\n\
	<button class=\"$***REMOVED***1:button***REMOVED***\" type=\"$***REMOVED***2:submit***REMOVED***\">$***REMOVED***3***REMOVED***</button>\n\
snippet button#\n\
	<button id=\"$***REMOVED***1***REMOVED***\" type=\"$***REMOVED***2:submit***REMOVED***\">$***REMOVED***3***REMOVED***</button>\n\
snippet button:s\n\
	<button type=\"submit\">$***REMOVED***1***REMOVED***</button>\n\
snippet button:r\n\
	<button type=\"reset\">$***REMOVED***1***REMOVED***</button>\n\
snippet canvas\n\
	<canvas>\n\
		$***REMOVED***1***REMOVED***\n\
	</canvas>\n\
snippet caption\n\
	<caption>$***REMOVED***1***REMOVED***</caption>\n\
snippet cite\n\
	<cite>$***REMOVED***1***REMOVED***</cite>\n\
snippet code\n\
	<code>$***REMOVED***1***REMOVED***</code>\n\
snippet col\n\
	<col />$***REMOVED***1***REMOVED***\n\
snippet col+\n\
	<col />\n\
	col+$***REMOVED***1***REMOVED***\n\
snippet colgroup\n\
	<colgroup>\n\
		$***REMOVED***1***REMOVED***\n\
	</colgroup>\n\
snippet colgroup+\n\
	<colgroup>\n\
		<col />\n\
		col+$***REMOVED***1***REMOVED***\n\
	</colgroup>\n\
snippet command\n\
	<command type=\"command\" label=\"$***REMOVED***1***REMOVED***\" icon=\"$***REMOVED***2***REMOVED***\" />\n\
snippet command:c\n\
	<command type=\"checkbox\" label=\"$***REMOVED***1***REMOVED***\" icon=\"$***REMOVED***2***REMOVED***\" />\n\
snippet command:r\n\
	<command type=\"radio\" radiogroup=\"$***REMOVED***1***REMOVED***\" label=\"$***REMOVED***2***REMOVED***\" icon=\"$***REMOVED***3***REMOVED***\" />\n\
snippet datagrid\n\
	<datagrid>\n\
		$***REMOVED***1***REMOVED***\n\
	</datagrid>\n\
snippet datalist\n\
	<datalist>\n\
		$***REMOVED***1***REMOVED***\n\
	</datalist>\n\
snippet datatemplate\n\
	<datatemplate>\n\
		$***REMOVED***1***REMOVED***\n\
	</datatemplate>\n\
snippet dd\n\
	<dd>$***REMOVED***1***REMOVED***</dd>\n\
snippet dd.\n\
	<dd class=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</dd>\n\
snippet dd#\n\
	<dd id=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</dd>\n\
snippet del\n\
	<del>$***REMOVED***1***REMOVED***</del>\n\
snippet details\n\
	<details>$***REMOVED***1***REMOVED***</details>\n\
snippet dfn\n\
	<dfn>$***REMOVED***1***REMOVED***</dfn>\n\
snippet dialog\n\
	<dialog>\n\
		$***REMOVED***1***REMOVED***\n\
	</dialog>\n\
snippet div\n\
	<div>\n\
		$***REMOVED***1***REMOVED***\n\
	</div>\n\
snippet div.\n\
	<div class=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</div>\n\
snippet div#\n\
	<div id=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</div>\n\
snippet dl\n\
	<dl>\n\
		$***REMOVED***1***REMOVED***\n\
	</dl>\n\
snippet dl.\n\
	<dl class=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</dl>\n\
snippet dl#\n\
	<dl id=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</dl>\n\
snippet dl+\n\
	<dl>\n\
		<dt>$***REMOVED***1***REMOVED***</dt>\n\
		<dd>$***REMOVED***2***REMOVED***</dd>\n\
		dt+$***REMOVED***3***REMOVED***\n\
	</dl>\n\
snippet dt\n\
	<dt>$***REMOVED***1***REMOVED***</dt>\n\
snippet dt.\n\
	<dt class=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</dt>\n\
snippet dt#\n\
	<dt id=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</dt>\n\
snippet dt+\n\
	<dt>$***REMOVED***1***REMOVED***</dt>\n\
	<dd>$***REMOVED***2***REMOVED***</dd>\n\
	dt+$***REMOVED***3***REMOVED***\n\
snippet em\n\
	<em>$***REMOVED***1***REMOVED***</em>\n\
snippet embed\n\
	<embed src=$***REMOVED***1***REMOVED*** type=\"$***REMOVED***2***REMOVED*** />\n\
snippet fieldset\n\
	<fieldset>\n\
		$***REMOVED***1***REMOVED***\n\
	</fieldset>\n\
snippet fieldset.\n\
	<fieldset class=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</fieldset>\n\
snippet fieldset#\n\
	<fieldset id=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</fieldset>\n\
snippet fieldset+\n\
	<fieldset>\n\
		<legend><span>$***REMOVED***1***REMOVED***</span></legend>\n\
		$***REMOVED***2***REMOVED***\n\
	</fieldset>\n\
	fieldset+$***REMOVED***3***REMOVED***\n\
snippet figcaption\n\
	<figcaption>$***REMOVED***1***REMOVED***</figcaption>\n\
snippet figure\n\
	<figure>$***REMOVED***1***REMOVED***</figure>\n\
snippet footer\n\
	<footer>\n\
		$***REMOVED***1***REMOVED***\n\
	</footer>\n\
snippet footer.\n\
	<footer class=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</footer>\n\
snippet footer#\n\
	<footer id=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</footer>\n\
snippet form\n\
	<form action=\"$***REMOVED***1***REMOVED***\" method=\"$***REMOVED***2:get***REMOVED***\" accept-charset=\"utf-8\">\n\
		$***REMOVED***3***REMOVED***\n\
	</form>\n\
snippet form.\n\
	<form class=\"$***REMOVED***1***REMOVED***\" action=\"$***REMOVED***2***REMOVED***\" method=\"$***REMOVED***3:get***REMOVED***\" accept-charset=\"utf-8\">\n\
		$***REMOVED***4***REMOVED***\n\
	</form>\n\
snippet form#\n\
	<form id=\"$***REMOVED***1***REMOVED***\" action=\"$***REMOVED***2***REMOVED***\" method=\"$***REMOVED***3:get***REMOVED***\" accept-charset=\"utf-8\">\n\
		$***REMOVED***4***REMOVED***\n\
	</form>\n\
snippet h1\n\
	<h1>$***REMOVED***1***REMOVED***</h1>\n\
snippet h1.\n\
	<h1 class=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</h1>\n\
snippet h1#\n\
	<h1 id=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</h1>\n\
snippet h2\n\
	<h2>$***REMOVED***1***REMOVED***</h2>\n\
snippet h2.\n\
	<h2 class=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</h2>\n\
snippet h2#\n\
	<h2 id=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</h2>\n\
snippet h3\n\
	<h3>$***REMOVED***1***REMOVED***</h3>\n\
snippet h3.\n\
	<h3 class=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</h3>\n\
snippet h3#\n\
	<h3 id=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</h3>\n\
snippet h4\n\
	<h4>$***REMOVED***1***REMOVED***</h4>\n\
snippet h4.\n\
	<h4 class=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</h4>\n\
snippet h4#\n\
	<h4 id=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</h4>\n\
snippet h5\n\
	<h5>$***REMOVED***1***REMOVED***</h5>\n\
snippet h5.\n\
	<h5 class=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</h5>\n\
snippet h5#\n\
	<h5 id=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</h5>\n\
snippet h6\n\
	<h6>$***REMOVED***1***REMOVED***</h6>\n\
snippet h6.\n\
	<h6 class=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</h6>\n\
snippet h6#\n\
	<h6 id=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</h6>\n\
snippet head\n\
	<head>\n\
		<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\" />\n\
\n\
		<title>$***REMOVED***1:`substitute(Filename('', 'Page Title'), '^.', '\\u&', '')`***REMOVED***</title>\n\
		$***REMOVED***2***REMOVED***\n\
	</head>\n\
snippet header\n\
	<header>\n\
		$***REMOVED***1***REMOVED***\n\
	</header>\n\
snippet header.\n\
	<header class=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</header>\n\
snippet header#\n\
	<header id=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</header>\n\
snippet hgroup\n\
	<hgroup>\n\
		$***REMOVED***1***REMOVED***\n\
	</hgroup>\n\
snippet hgroup.\n\
	<hgroup class=\"$***REMOVED***1***REMOVED***>\n\
		$***REMOVED***2***REMOVED***\n\
	</hgroup>\n\
snippet hr\n\
	<hr />$***REMOVED***1***REMOVED***\n\
snippet html\n\
	<html>\n\
	$***REMOVED***1***REMOVED***\n\
	</html>\n\
snippet xhtml\n\
	<html xmlns=\"http://www.w3.org/1999/xhtml\">\n\
	$***REMOVED***1***REMOVED***\n\
	</html>\n\
snippet html5\n\
	<!DOCTYPE html>\n\
	<html>\n\
		<head>\n\
			<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\" />\n\
			<title>$***REMOVED***1:`substitute(Filename('', 'Page Title'), '^.', '\\u&', '')`***REMOVED***</title>\n\
			$***REMOVED***2:meta***REMOVED***\n\
		</head>\n\
		<body>\n\
			$***REMOVED***3:body***REMOVED***\n\
		</body>\n\
	</html>\n\
snippet i\n\
	<i>$***REMOVED***1***REMOVED***</i>\n\
snippet iframe\n\
	<iframe src=\"$***REMOVED***1***REMOVED***\" frameborder=\"0\"></iframe>$***REMOVED***2***REMOVED***\n\
snippet iframe.\n\
	<iframe class=\"$***REMOVED***1***REMOVED***\" src=\"$***REMOVED***2***REMOVED***\" frameborder=\"0\"></iframe>$***REMOVED***3***REMOVED***\n\
snippet iframe#\n\
	<iframe id=\"$***REMOVED***1***REMOVED***\" src=\"$***REMOVED***2***REMOVED***\" frameborder=\"0\"></iframe>$***REMOVED***3***REMOVED***\n\
snippet img\n\
	<img src=\"$***REMOVED***1***REMOVED***\" alt=\"$***REMOVED***2***REMOVED***\" />$***REMOVED***3***REMOVED***\n\
snippet img.\n\
	<img class=\"$***REMOVED***1***REMOVED***\" src=\"$***REMOVED***2***REMOVED***\" alt=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet img#\n\
	<img id=\"$***REMOVED***1***REMOVED***\" src=\"$***REMOVED***2***REMOVED***\" alt=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input\n\
	<input type=\"$***REMOVED***1:text/submit/hidden/button/image***REMOVED***\" name=\"$***REMOVED***2***REMOVED***\" id=\"$***REMOVED***3:$2***REMOVED***\" value=\"$***REMOVED***4***REMOVED***\" />$***REMOVED***5***REMOVED***\n\
snippet input.\n\
	<input class=\"$***REMOVED***1***REMOVED***\" type=\"$***REMOVED***2:text/submit/hidden/button/image***REMOVED***\" name=\"$***REMOVED***3***REMOVED***\" id=\"$***REMOVED***4:$3***REMOVED***\" value=\"$***REMOVED***5***REMOVED***\" />$***REMOVED***6***REMOVED***\n\
snippet input:text\n\
	<input type=\"text\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:submit\n\
	<input type=\"submit\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:hidden\n\
	<input type=\"hidden\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:button\n\
	<input type=\"button\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:image\n\
	<input type=\"image\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" src=\"$***REMOVED***3***REMOVED***\" alt=\"$***REMOVED***4***REMOVED***\" />$***REMOVED***5***REMOVED***\n\
snippet input:checkbox\n\
	<input type=\"checkbox\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" />$***REMOVED***3***REMOVED***\n\
snippet input:radio\n\
	<input type=\"radio\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" />$***REMOVED***3***REMOVED***\n\
snippet input:color\n\
	<input type=\"color\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:date\n\
	<input type=\"date\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:datetime\n\
	<input type=\"datetime\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:datetime-local\n\
	<input type=\"datetime-local\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:email\n\
	<input type=\"email\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:file\n\
	<input type=\"file\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:month\n\
	<input type=\"month\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:number\n\
	<input type=\"number\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:password\n\
	<input type=\"password\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:range\n\
	<input type=\"range\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:reset\n\
	<input type=\"reset\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:search\n\
	<input type=\"search\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:time\n\
	<input type=\"time\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:url\n\
	<input type=\"url\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet input:week\n\
	<input type=\"week\" name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" value=\"$***REMOVED***3***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet ins\n\
	<ins>$***REMOVED***1***REMOVED***</ins>\n\
snippet kbd\n\
	<kbd>$***REMOVED***1***REMOVED***</kbd>\n\
snippet keygen\n\
	<keygen>$***REMOVED***1***REMOVED***</keygen>\n\
snippet label\n\
	<label for=\"$***REMOVED***2:$1***REMOVED***\">$***REMOVED***1***REMOVED***</label>\n\
snippet label:i\n\
	<label for=\"$***REMOVED***2:$1***REMOVED***\">$***REMOVED***1***REMOVED***</label>\n\
	<input type=\"$***REMOVED***3:text/submit/hidden/button***REMOVED***\" name=\"$***REMOVED***4:$2***REMOVED***\" id=\"$***REMOVED***5:$2***REMOVED***\" value=\"$***REMOVED***6***REMOVED***\" />$***REMOVED***7***REMOVED***\n\
snippet label:s\n\
	<label for=\"$***REMOVED***2:$1***REMOVED***\">$***REMOVED***1***REMOVED***</label>\n\
	<select name=\"$***REMOVED***3:$2***REMOVED***\" id=\"$***REMOVED***4:$2***REMOVED***\">\n\
		<option value=\"$***REMOVED***5***REMOVED***\">$***REMOVED***6:$5***REMOVED***</option>\n\
	</select>\n\
snippet legend\n\
	<legend>$***REMOVED***1***REMOVED***</legend>\n\
snippet legend+\n\
	<legend><span>$***REMOVED***1***REMOVED***</span></legend>\n\
snippet li\n\
	<li>$***REMOVED***1***REMOVED***</li>\n\
snippet li.\n\
	<li class=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</li>\n\
snippet li+\n\
	<li>$***REMOVED***1***REMOVED***</li>\n\
	li+$***REMOVED***2***REMOVED***\n\
snippet lia\n\
	<li><a href=\"$***REMOVED***2:#***REMOVED***\">$***REMOVED***1***REMOVED***</a></li>\n\
snippet lia+\n\
	<li><a href=\"$***REMOVED***2:#***REMOVED***\">$***REMOVED***1***REMOVED***</a></li>\n\
	lia+$***REMOVED***3***REMOVED***\n\
snippet link\n\
	<link rel=\"$***REMOVED***1***REMOVED***\" href=\"$***REMOVED***2***REMOVED***\" title=\"$***REMOVED***3***REMOVED***\" type=\"$***REMOVED***4***REMOVED***\" />$***REMOVED***5***REMOVED***\n\
snippet link:atom\n\
	<link rel=\"alternate\" href=\"$***REMOVED***1:atom.xml***REMOVED***\" title=\"Atom\" type=\"application/atom+xml\" />$***REMOVED***2***REMOVED***\n\
snippet link:css\n\
	<link rel=\"stylesheet\" href=\"$***REMOVED***2:style.css***REMOVED***\" type=\"text/css\" media=\"$***REMOVED***3:all***REMOVED***\" />$***REMOVED***4***REMOVED***\n\
snippet link:favicon\n\
	<link rel=\"shortcut icon\" href=\"$***REMOVED***1:favicon.ico***REMOVED***\" type=\"image/x-icon\" />$***REMOVED***2***REMOVED***\n\
snippet link:rss\n\
	<link rel=\"alternate\" href=\"$***REMOVED***1:rss.xml***REMOVED***\" title=\"RSS\" type=\"application/atom+xml\" />$***REMOVED***2***REMOVED***\n\
snippet link:touch\n\
	<link rel=\"apple-touch-icon\" href=\"$***REMOVED***1:favicon.png***REMOVED***\" />$***REMOVED***2***REMOVED***\n\
snippet map\n\
	<map name=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</map>\n\
snippet map.\n\
	<map class=\"$***REMOVED***1***REMOVED***\" name=\"$***REMOVED***2***REMOVED***\">\n\
		$***REMOVED***3***REMOVED***\n\
	</map>\n\
snippet map#\n\
	<map name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***>\n\
		$***REMOVED***3***REMOVED***\n\
	</map>\n\
snippet map+\n\
	<map name=\"$***REMOVED***1***REMOVED***\">\n\
		<area shape=\"$***REMOVED***2***REMOVED***\" coords=\"$***REMOVED***3***REMOVED***\" href=\"$***REMOVED***4***REMOVED***\" alt=\"$***REMOVED***5***REMOVED***\" />$***REMOVED***6***REMOVED***\n\
	</map>$***REMOVED***7***REMOVED***\n\
snippet mark\n\
	<mark>$***REMOVED***1***REMOVED***</mark>\n\
snippet menu\n\
	<menu>\n\
		$***REMOVED***1***REMOVED***\n\
	</menu>\n\
snippet menu:c\n\
	<menu type=\"context\">\n\
		$***REMOVED***1***REMOVED***\n\
	</menu>\n\
snippet menu:t\n\
	<menu type=\"toolbar\">\n\
		$***REMOVED***1***REMOVED***\n\
	</menu>\n\
snippet meta\n\
	<meta http-equiv=\"$***REMOVED***1***REMOVED***\" content=\"$***REMOVED***2***REMOVED***\" />$***REMOVED***3***REMOVED***\n\
snippet meta:compat\n\
	<meta http-equiv=\"X-UA-Compatible\" content=\"IE=$***REMOVED***1:7,8,edge***REMOVED***\" />$***REMOVED***3***REMOVED***\n\
snippet meta:refresh\n\
	<meta http-equiv=\"refresh\" content=\"text/html;charset=UTF-8\" />$***REMOVED***3***REMOVED***\n\
snippet meta:utf\n\
	<meta http-equiv=\"content-type\" content=\"text/html;charset=UTF-8\" />$***REMOVED***3***REMOVED***\n\
snippet meter\n\
	<meter>$***REMOVED***1***REMOVED***</meter>\n\
snippet nav\n\
	<nav>\n\
		$***REMOVED***1***REMOVED***\n\
	</nav>\n\
snippet nav.\n\
	<nav class=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</nav>\n\
snippet nav#\n\
	<nav id=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</nav>\n\
snippet noscript\n\
	<noscript>\n\
		$***REMOVED***1***REMOVED***\n\
	</noscript>\n\
snippet object\n\
	<object data=\"$***REMOVED***1***REMOVED***\" type=\"$***REMOVED***2***REMOVED***\">\n\
		$***REMOVED***3***REMOVED***\n\
	</object>$***REMOVED***4***REMOVED***\n\
# Embed QT Movie\n\
snippet movie\n\
	<object width=\"$2\" height=\"$3\" classid=\"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B\"\n\
	 codebase=\"http://www.apple.com/qtactivex/qtplugin.cab\">\n\
		<param name=\"src\" value=\"$1\" />\n\
		<param name=\"controller\" value=\"$4\" />\n\
		<param name=\"autoplay\" value=\"$5\" />\n\
		<embed src=\"$***REMOVED***1:movie.mov***REMOVED***\"\n\
			width=\"$***REMOVED***2:320***REMOVED***\" height=\"$***REMOVED***3:240***REMOVED***\"\n\
			controller=\"$***REMOVED***4:true***REMOVED***\" autoplay=\"$***REMOVED***5:true***REMOVED***\"\n\
			scale=\"tofit\" cache=\"true\"\n\
			pluginspage=\"http://www.apple.com/quicktime/download/\" />\n\
	</object>$***REMOVED***6***REMOVED***\n\
snippet ol\n\
	<ol>\n\
		$***REMOVED***1***REMOVED***\n\
	</ol>\n\
snippet ol.\n\
	<ol class=\"$***REMOVED***1***REMOVED***>\n\
		$***REMOVED***2***REMOVED***\n\
	</ol>\n\
snippet ol#\n\
	<ol id=\"$***REMOVED***1***REMOVED***>\n\
		$***REMOVED***2***REMOVED***\n\
	</ol>\n\
snippet ol+\n\
	<ol>\n\
		<li>$***REMOVED***1***REMOVED***</li>\n\
		li+$***REMOVED***2***REMOVED***\n\
	</ol>\n\
snippet opt\n\
	<option value=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2:$1***REMOVED***</option>\n\
snippet opt+\n\
	<option value=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2:$1***REMOVED***</option>\n\
	opt+$***REMOVED***3***REMOVED***\n\
snippet optt\n\
	<option>$***REMOVED***1***REMOVED***</option>\n\
snippet optgroup\n\
	<optgroup>\n\
		<option value=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2:$1***REMOVED***</option>\n\
		opt+$***REMOVED***3***REMOVED***\n\
	</optgroup>\n\
snippet output\n\
	<output>$***REMOVED***1***REMOVED***</output>\n\
snippet p\n\
	<p>$***REMOVED***1***REMOVED***</p>\n\
snippet param\n\
	<param name=\"$***REMOVED***1***REMOVED***\" value=\"$***REMOVED***2***REMOVED***\" />$***REMOVED***3***REMOVED***\n\
snippet pre\n\
	<pre>\n\
		$***REMOVED***1***REMOVED***\n\
	</pre>\n\
snippet progress\n\
	<progress>$***REMOVED***1***REMOVED***</progress>\n\
snippet q\n\
	<q>$***REMOVED***1***REMOVED***</q>\n\
snippet rp\n\
	<rp>$***REMOVED***1***REMOVED***</rp>\n\
snippet rt\n\
	<rt>$***REMOVED***1***REMOVED***</rt>\n\
snippet ruby\n\
	<ruby>\n\
		<rp><rt>$***REMOVED***1***REMOVED***</rt></rp>\n\
	</ruby>\n\
snippet s\n\
	<s>$***REMOVED***1***REMOVED***</s>\n\
snippet samp\n\
	<samp>\n\
		$***REMOVED***1***REMOVED***\n\
	</samp>\n\
snippet script\n\
	<script type=\"text/javascript\" charset=\"utf-8\">\n\
		$***REMOVED***1***REMOVED***\n\
	</script>\n\
snippet scriptsrc\n\
	<script src=\"$***REMOVED***1***REMOVED***.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n\
snippet section\n\
	<section>\n\
		$***REMOVED***1***REMOVED***\n\
	</section>\n\
snippet section.\n\
	<section class=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</section>\n\
snippet section#\n\
	<section id=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</section>\n\
snippet select\n\
	<select name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\">\n\
		$***REMOVED***3***REMOVED***\n\
	</select>\n\
snippet select.\n\
	<select name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\" class=\"$***REMOVED***3***REMOVED***>\n\
		$***REMOVED***4***REMOVED***\n\
	</select>\n\
snippet select+\n\
	<select name=\"$***REMOVED***1***REMOVED***\" id=\"$***REMOVED***2:$1***REMOVED***\">\n\
		<option value=\"$***REMOVED***3***REMOVED***\">$***REMOVED***4:$3***REMOVED***</option>\n\
		opt+$***REMOVED***5***REMOVED***\n\
	</select>\n\
snippet small\n\
	<small>$***REMOVED***1***REMOVED***</small>\n\
snippet source\n\
	<source src=\"$***REMOVED***1***REMOVED***\" type=\"$***REMOVED***2***REMOVED***\" media=\"$***REMOVED***3***REMOVED***\" />\n\
snippet span\n\
	<span>$***REMOVED***1***REMOVED***</span>\n\
snippet strong\n\
	<strong>$***REMOVED***1***REMOVED***</strong>\n\
snippet style\n\
	<style type=\"text/css\" media=\"$***REMOVED***1:all***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</style>\n\
snippet sub\n\
	<sub>$***REMOVED***1***REMOVED***</sub>\n\
snippet summary\n\
	<summary>\n\
		$***REMOVED***1***REMOVED***\n\
	</summary>\n\
snippet sup\n\
	<sup>$***REMOVED***1***REMOVED***</sup>\n\
snippet table\n\
	<table border=\"$***REMOVED***1:0***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</table>\n\
snippet table.\n\
	<table class=\"$***REMOVED***1***REMOVED***\" border=\"$***REMOVED***2:0***REMOVED***\">\n\
		$***REMOVED***3***REMOVED***\n\
	</table>\n\
snippet table#\n\
	<table id=\"$***REMOVED***1***REMOVED***\" border=\"$***REMOVED***2:0***REMOVED***\">\n\
		$***REMOVED***3***REMOVED***\n\
	</table>\n\
snippet tbody\n\
	<tbody>\n\
		$***REMOVED***1***REMOVED***\n\
	</tbody>\n\
snippet td\n\
	<td>$***REMOVED***1***REMOVED***</td>\n\
snippet td.\n\
	<td class=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</td>\n\
snippet td#\n\
	<td id=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</td>\n\
snippet td+\n\
	<td>$***REMOVED***1***REMOVED***</td>\n\
	td+$***REMOVED***2***REMOVED***\n\
snippet textarea\n\
	<textarea name=\"$***REMOVED***1***REMOVED***\" id=$***REMOVED***2:$1***REMOVED*** rows=\"$***REMOVED***3:8***REMOVED***\" cols=\"$***REMOVED***4:40***REMOVED***\">$***REMOVED***5***REMOVED***</textarea>$***REMOVED***6***REMOVED***\n\
snippet tfoot\n\
	<tfoot>\n\
		$***REMOVED***1***REMOVED***\n\
	</tfoot>\n\
snippet th\n\
	<th>$***REMOVED***1***REMOVED***</th>\n\
snippet th.\n\
	<th class=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</th>\n\
snippet th#\n\
	<th id=\"$***REMOVED***1***REMOVED***\">$***REMOVED***2***REMOVED***</th>\n\
snippet th+\n\
	<th>$***REMOVED***1***REMOVED***</th>\n\
	th+$***REMOVED***2***REMOVED***\n\
snippet thead\n\
	<thead>\n\
		$***REMOVED***1***REMOVED***\n\
	</thead>\n\
snippet time\n\
	<time datetime=\"$***REMOVED***1***REMOVED***\" pubdate=\"$***REMOVED***2:$1***REMOVED***>$***REMOVED***3:$1***REMOVED***</time>\n\
snippet title\n\
	<title>$***REMOVED***1:`substitute(Filename('', 'Page Title'), '^.', '\\u&', '')`***REMOVED***</title>\n\
snippet tr\n\
	<tr>\n\
		$***REMOVED***1***REMOVED***\n\
	</tr>\n\
snippet tr+\n\
	<tr>\n\
		<td>$***REMOVED***1***REMOVED***</td>\n\
		td+$***REMOVED***2***REMOVED***\n\
	</tr>\n\
snippet track\n\
	<track src=\"$***REMOVED***1***REMOVED***\" srclang=\"$***REMOVED***2***REMOVED***\" label=\"$***REMOVED***3***REMOVED***\" default=\"$***REMOVED***4:default***REMOVED***>$***REMOVED***5***REMOVED***</track>$***REMOVED***6***REMOVED***\n\
snippet ul\n\
	<ul>\n\
		$***REMOVED***1***REMOVED***\n\
	</ul>\n\
snippet ul.\n\
	<ul class=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</ul>\n\
snippet ul#\n\
	<ul id=\"$***REMOVED***1***REMOVED***\">\n\
		$***REMOVED***2***REMOVED***\n\
	</ul>\n\
snippet ul+\n\
	<ul>\n\
		<li>$***REMOVED***1***REMOVED***</li>\n\
		li+$***REMOVED***2***REMOVED***\n\
	</ul>\n\
snippet var\n\
	<var>$***REMOVED***1***REMOVED***</var>\n\
snippet video\n\
	<video src=\"$***REMOVED***1***REMOVED*** height=\"$***REMOVED***2***REMOVED***\" width=\"$***REMOVED***3***REMOVED***\" preload=\"$***REMOVED***5:none***REMOVED***\" autoplay=\"$***REMOVED***6:autoplay***REMOVED***>$***REMOVED***7***REMOVED***</video>$***REMOVED***8***REMOVED***\n\
snippet wbr\n\
	<wbr />$***REMOVED***1***REMOVED***\n\
";
exports.scope = "html";

***REMOVED***);
