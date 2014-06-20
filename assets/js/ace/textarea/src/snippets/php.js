__ace_shadowed__.define('ace/snippets/php', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "snippet <?\n\
	<?php\n\
\n\
	$***REMOVED***1***REMOVED***\n\
snippet ec\n\
	echo $***REMOVED***1***REMOVED***;\n\
snippet <?e\n\
	<?php echo $***REMOVED***1***REMOVED*** ?>\n\
# this one is for php5.4\n\
snippet <?=\n\
	<?=$***REMOVED***1***REMOVED***?>\n\
snippet ns\n\
	namespace $***REMOVED***1:Foo\\Bar\\Baz***REMOVED***;\n\
	$***REMOVED***2***REMOVED***\n\
snippet use\n\
	use $***REMOVED***1:Foo\\Bar\\Baz***REMOVED***;\n\
	$***REMOVED***2***REMOVED***\n\
snippet c\n\
	$***REMOVED***1:abstract ***REMOVED***class $***REMOVED***2:$FILENAME***REMOVED***\n\
	***REMOVED***\n\
		$***REMOVED***3***REMOVED***\n\
	***REMOVED***\n\
snippet i\n\
	interface $***REMOVED***1:$FILENAME***REMOVED***\n\
	***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	***REMOVED***\n\
snippet t.\n\
	$this->$***REMOVED***1***REMOVED***\n\
snippet f\n\
	function $***REMOVED***1:foo***REMOVED***($***REMOVED***2:array ***REMOVED***$***REMOVED***3:$bar***REMOVED***)\n\
	***REMOVED***\n\
		$***REMOVED***4***REMOVED***\n\
	***REMOVED***\n\
# method\n\
snippet m\n\
	$***REMOVED***1:abstract ***REMOVED***$***REMOVED***2:protected***REMOVED***$***REMOVED***3: static***REMOVED*** function $***REMOVED***4:foo***REMOVED***($***REMOVED***5:array ***REMOVED***$***REMOVED***6:$bar***REMOVED***)\n\
	***REMOVED***\n\
		$***REMOVED***7***REMOVED***\n\
	***REMOVED***\n\
# setter method\n\
snippet sm \n\
	/**\n\
	 * Sets the value of $***REMOVED***1:foo***REMOVED***\n\
	 *\n\
	 * @param $***REMOVED***2:$1***REMOVED*** $$1 $***REMOVED***3:description***REMOVED***\n\
	 *\n\
	 * @return $***REMOVED***4:$FILENAME***REMOVED***\n\
	 */\n\
	$***REMOVED***5:public***REMOVED*** function set$***REMOVED***6:$2***REMOVED***($***REMOVED***7:$2 ***REMOVED***$$1)\n\
	***REMOVED***\n\
		$this->$***REMOVED***8:$1***REMOVED*** = $$1;\n\
		return $this;\n\
	***REMOVED***$***REMOVED***9***REMOVED***\n\
# getter method\n\
snippet gm\n\
	/**\n\
	 * Gets the value of $***REMOVED***1:foo***REMOVED***\n\
	 *\n\
	 * @return $***REMOVED***2:$1***REMOVED***\n\
	 */\n\
	$***REMOVED***3:public***REMOVED*** function get$***REMOVED***4:$2***REMOVED***()\n\
	***REMOVED***\n\
		return $this->$***REMOVED***5:$1***REMOVED***;\n\
	***REMOVED***$***REMOVED***6***REMOVED***\n\
#setter\n\
snippet $s\n\
	$***REMOVED***1:$foo***REMOVED***->set$***REMOVED***2:Bar***REMOVED***($***REMOVED***3***REMOVED***);\n\
#getter\n\
snippet $g\n\
	$***REMOVED***1:$foo***REMOVED***->get$***REMOVED***2:Bar***REMOVED***();\n\
\n\
# Tertiary conditional\n\
snippet =?:\n\
	$$***REMOVED***1:foo***REMOVED*** = $***REMOVED***2:true***REMOVED*** ? $***REMOVED***3:a***REMOVED*** : $***REMOVED***4***REMOVED***;\n\
snippet ?:\n\
	$***REMOVED***1:true***REMOVED*** ? $***REMOVED***2:a***REMOVED*** : $***REMOVED***3***REMOVED***\n\
\n\
snippet C\n\
	$_COOKIE['$***REMOVED***1:variable***REMOVED***']$***REMOVED***2***REMOVED***\n\
snippet E\n\
	$_ENV['$***REMOVED***1:variable***REMOVED***']$***REMOVED***2***REMOVED***\n\
snippet F\n\
	$_FILES['$***REMOVED***1:variable***REMOVED***']$***REMOVED***2***REMOVED***\n\
snippet G\n\
	$_GET['$***REMOVED***1:variable***REMOVED***']$***REMOVED***2***REMOVED***\n\
snippet P\n\
	$_POST['$***REMOVED***1:variable***REMOVED***']$***REMOVED***2***REMOVED***\n\
snippet R\n\
	$_REQUEST['$***REMOVED***1:variable***REMOVED***']$***REMOVED***2***REMOVED***\n\
snippet S\n\
	$_SERVER['$***REMOVED***1:variable***REMOVED***']$***REMOVED***2***REMOVED***\n\
snippet SS\n\
	$_SESSION['$***REMOVED***1:variable***REMOVED***']$***REMOVED***2***REMOVED***\n\
	\n\
# the following are old ones\n\
snippet inc\n\
	include '$***REMOVED***1:file***REMOVED***';$***REMOVED***2***REMOVED***\n\
snippet inc1\n\
	include_once '$***REMOVED***1:file***REMOVED***';$***REMOVED***2***REMOVED***\n\
snippet req\n\
	require '$***REMOVED***1:file***REMOVED***';$***REMOVED***2***REMOVED***\n\
snippet req1\n\
	require_once '$***REMOVED***1:file***REMOVED***';$***REMOVED***2***REMOVED***\n\
# Start Docblock\n\
snippet /*\n\
	/**\n\
	 * $***REMOVED***1***REMOVED***\n\
	 */\n\
# Class - post doc\n\
snippet doc_cp\n\
	/**\n\
	 * $***REMOVED***1:undocumented class***REMOVED***\n\
	 *\n\
	 * @package $***REMOVED***2:default***REMOVED***\n\
	 * @subpackage $***REMOVED***3:default***REMOVED***\n\
	 * @author $***REMOVED***4:`g:snips_author`***REMOVED***\n\
	 */$***REMOVED***5***REMOVED***\n\
# Class Variable - post doc\n\
snippet doc_vp\n\
	/**\n\
	 * $***REMOVED***1:undocumented class variable***REMOVED***\n\
	 *\n\
	 * @var $***REMOVED***2:string***REMOVED***\n\
	 */$***REMOVED***3***REMOVED***\n\
# Class Variable\n\
snippet doc_v\n\
	/**\n\
	 * $***REMOVED***3:undocumented class variable***REMOVED***\n\
	 *\n\
	 * @var $***REMOVED***4:string***REMOVED***\n\
	 */\n\
	$***REMOVED***1:var***REMOVED*** $$***REMOVED***2***REMOVED***;$***REMOVED***5***REMOVED***\n\
# Class\n\
snippet doc_c\n\
	/**\n\
	 * $***REMOVED***3:undocumented class***REMOVED***\n\
	 *\n\
	 * @package $***REMOVED***4:default***REMOVED***\n\
	 * @subpackage $***REMOVED***5:default***REMOVED***\n\
	 * @author $***REMOVED***6:`g:snips_author`***REMOVED***\n\
	 */\n\
	$***REMOVED***1:***REMOVED***class $***REMOVED***2:***REMOVED***\n\
	***REMOVED***\n\
		$***REMOVED***7***REMOVED***\n\
	***REMOVED*** // END $1class $2\n\
# Constant Definition - post doc\n\
snippet doc_dp\n\
	/**\n\
	 * $***REMOVED***1:undocumented constant***REMOVED***\n\
	 */$***REMOVED***2***REMOVED***\n\
# Constant Definition\n\
snippet doc_d\n\
	/**\n\
	 * $***REMOVED***3:undocumented constant***REMOVED***\n\
	 */\n\
	__ace_shadowed__.define($***REMOVED***1***REMOVED***, $***REMOVED***2***REMOVED***);$***REMOVED***4***REMOVED***\n\
# Function - post doc\n\
snippet doc_fp\n\
	/**\n\
	 * $***REMOVED***1:undocumented function***REMOVED***\n\
	 *\n\
	 * @return $***REMOVED***2:void***REMOVED***\n\
	 * @author $***REMOVED***3:`g:snips_author`***REMOVED***\n\
	 */$***REMOVED***4***REMOVED***\n\
# Function signature\n\
snippet doc_s\n\
	/**\n\
	 * $***REMOVED***4:undocumented function***REMOVED***\n\
	 *\n\
	 * @return $***REMOVED***5:void***REMOVED***\n\
	 * @author $***REMOVED***6:`g:snips_author`***REMOVED***\n\
	 */\n\
	$***REMOVED***1***REMOVED***function $***REMOVED***2***REMOVED***($***REMOVED***3***REMOVED***);$***REMOVED***7***REMOVED***\n\
# Function\n\
snippet doc_f\n\
	/**\n\
	 * $***REMOVED***4:undocumented function***REMOVED***\n\
	 *\n\
	 * @return $***REMOVED***5:void***REMOVED***\n\
	 * @author $***REMOVED***6:`g:snips_author`***REMOVED***\n\
	 */\n\
	$***REMOVED***1***REMOVED***function $***REMOVED***2***REMOVED***($***REMOVED***3***REMOVED***)\n\
	***REMOVED***$***REMOVED***7***REMOVED***\n\
	***REMOVED***\n\
# Header\n\
snippet doc_h\n\
	/**\n\
	 * $***REMOVED***1***REMOVED***\n\
	 *\n\
	 * @author $***REMOVED***2:`g:snips_author`***REMOVED***\n\
	 * @version $***REMOVED***3:$Id$***REMOVED***\n\
	 * @copyright $***REMOVED***4:$2***REMOVED***, `strftime('%d %B, %Y')`\n\
	 * @package $***REMOVED***5:default***REMOVED***\n\
	 */\n\
	\n\
# Interface\n\
snippet interface\n\
	/**\n\
	 * $***REMOVED***2:undocumented class***REMOVED***\n\
	 *\n\
	 * @package $***REMOVED***3:default***REMOVED***\n\
	 * @author $***REMOVED***4:`g:snips_author`***REMOVED***\n\
	 */\n\
	interface $***REMOVED***1:$FILENAME***REMOVED***\n\
	***REMOVED***\n\
		$***REMOVED***5***REMOVED***\n\
	***REMOVED***\n\
# class ...\n\
snippet class\n\
	/**\n\
	 * $***REMOVED***1***REMOVED***\n\
	 */\n\
	class $***REMOVED***2:$FILENAME***REMOVED***\n\
	***REMOVED***\n\
		$***REMOVED***3***REMOVED***\n\
		/**\n\
		 * $***REMOVED***4***REMOVED***\n\
		 */\n\
		$***REMOVED***5:public***REMOVED*** function $***REMOVED***6:__construct***REMOVED***($***REMOVED***7:argument***REMOVED***)\n\
		***REMOVED***\n\
			$***REMOVED***8:// code...***REMOVED***\n\
		***REMOVED***\n\
	***REMOVED***\n\
# __ace_shadowed__.define(...)\n\
snippet def\n\
	__ace_shadowed__.define('$***REMOVED***1***REMOVED***'$***REMOVED***2***REMOVED***);$***REMOVED***3***REMOVED***\n\
# defined(...)\n\
snippet def?\n\
	$***REMOVED***1***REMOVED***defined('$***REMOVED***2***REMOVED***')$***REMOVED***3***REMOVED***\n\
snippet wh\n\
	while ($***REMOVED***1:/* condition */***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2:// code...***REMOVED***\n\
	***REMOVED***\n\
# do ... while\n\
snippet do\n\
	do ***REMOVED***\n\
		$***REMOVED***2:// code... ***REMOVED***\n\
	***REMOVED*** while ($***REMOVED***1:/* condition */***REMOVED***);\n\
snippet if\n\
	if ($***REMOVED***1:/* condition */***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2:// code...***REMOVED***\n\
	***REMOVED***\n\
snippet ifil\n\
	<?php if ($***REMOVED***1:/* condition */***REMOVED***): ?>\n\
		$***REMOVED***2:<!-- code... -->***REMOVED***\n\
	<?php endif; ?>\n\
snippet ife\n\
	if ($***REMOVED***1:/* condition */***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2:// code...***REMOVED***\n\
	***REMOVED*** else ***REMOVED***\n\
		$***REMOVED***3:// code...***REMOVED***\n\
	***REMOVED***\n\
	$***REMOVED***4***REMOVED***\n\
snippet ifeil\n\
	<?php if ($***REMOVED***1:/* condition */***REMOVED***): ?>\n\
		$***REMOVED***2:<!-- html... -->***REMOVED***\n\
	<?php else: ?>\n\
		$***REMOVED***3:<!-- html... -->***REMOVED***\n\
	<?php endif; ?>\n\
	$***REMOVED***4***REMOVED***\n\
snippet else\n\
	else ***REMOVED***\n\
		$***REMOVED***1:// code...***REMOVED***\n\
	***REMOVED***\n\
snippet elseif\n\
	elseif ($***REMOVED***1:/* condition */***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2:// code...***REMOVED***\n\
	***REMOVED***\n\
snippet switch\n\
	switch ($$***REMOVED***1:variable***REMOVED***) ***REMOVED***\n\
		case '$***REMOVED***2:value***REMOVED***':\n\
			$***REMOVED***3:// code...***REMOVED***\n\
			break;\n\
		$***REMOVED***5***REMOVED***\n\
		default:\n\
			$***REMOVED***4:// code...***REMOVED***\n\
			break;\n\
	***REMOVED***\n\
snippet case\n\
	case '$***REMOVED***1:value***REMOVED***':\n\
		$***REMOVED***2:// code...***REMOVED***\n\
		break;$***REMOVED***3***REMOVED***\n\
snippet for\n\
	for ($$***REMOVED***2:i***REMOVED*** = 0; $$2 < $***REMOVED***1:count***REMOVED***; $$2$***REMOVED***3:++***REMOVED***) ***REMOVED***\n\
		$***REMOVED***4: // code...***REMOVED***\n\
	***REMOVED***\n\
snippet foreach\n\
	foreach ($$***REMOVED***1:variable***REMOVED*** as $$***REMOVED***2:value***REMOVED***) ***REMOVED***\n\
		$***REMOVED***3:// code...***REMOVED***\n\
	***REMOVED***\n\
snippet foreachil\n\
	<?php foreach ($$***REMOVED***1:variable***REMOVED*** as $$***REMOVED***2:value***REMOVED***): ?>\n\
		$***REMOVED***3:<!-- html... -->***REMOVED***\n\
	<?php endforeach; ?>\n\
snippet foreachk\n\
	foreach ($$***REMOVED***1:variable***REMOVED*** as $$***REMOVED***2:key***REMOVED*** => $$***REMOVED***3:value***REMOVED***) ***REMOVED***\n\
		$***REMOVED***4:// code...***REMOVED***\n\
	***REMOVED***\n\
snippet foreachkil\n\
	<?php foreach ($$***REMOVED***1:variable***REMOVED*** as $$***REMOVED***2:key***REMOVED*** => $$***REMOVED***3:value***REMOVED***): ?>\n\
		$***REMOVED***4:<!-- html... -->***REMOVED***\n\
	<?php endforeach; ?>\n\
# $... = array (...)\n\
snippet array\n\
	$$***REMOVED***1:arrayName***REMOVED*** = array('$***REMOVED***2***REMOVED***' => $***REMOVED***3***REMOVED***);$***REMOVED***4***REMOVED***\n\
snippet try\n\
	try ***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	***REMOVED*** catch ($***REMOVED***1:Exception***REMOVED*** $e) ***REMOVED***\n\
	***REMOVED***\n\
# lambda with closure\n\
snippet lambda\n\
	$***REMOVED***1:static ***REMOVED***function ($***REMOVED***2:args***REMOVED***) use ($***REMOVED***3:&$x, $y /*put vars in scope (closure) */***REMOVED***) ***REMOVED***\n\
		$***REMOVED***4***REMOVED***\n\
	***REMOVED***;\n\
# pre_dump();\n\
snippet pd\n\
	echo '<pre>'; var_dump($***REMOVED***1***REMOVED***); echo '</pre>';\n\
# pre_dump(); die();\n\
snippet pdd\n\
	echo '<pre>'; var_dump($***REMOVED***1***REMOVED***); echo '</pre>'; die($***REMOVED***2:***REMOVED***);\n\
snippet vd\n\
	var_dump($***REMOVED***1***REMOVED***);\n\
snippet vdd\n\
	var_dump($***REMOVED***1***REMOVED***); die($***REMOVED***2:***REMOVED***);\n\
snippet http_redirect\n\
	header (\"HTTP/1.1 301 Moved Permanently\"); \n\
	header (\"Location: \".URL); \n\
	exit();\n\
# Getters & Setters\n\
snippet gs\n\
	/**\n\
	 * Gets the value of $***REMOVED***1:foo***REMOVED***\n\
	 *\n\
	 * @return $***REMOVED***2:$1***REMOVED***\n\
	 */\n\
	public function get$***REMOVED***3:$2***REMOVED***()\n\
	***REMOVED***\n\
		return $this->$***REMOVED***4:$1***REMOVED***;\n\
	***REMOVED***\n\
\n\
	/**\n\
	 * Sets the value of $1\n\
	 *\n\
	 * @param $2 $$1 $***REMOVED***5:description***REMOVED***\n\
	 *\n\
	 * @return $***REMOVED***6:$FILENAME***REMOVED***\n\
	 */\n\
	public function set$3($***REMOVED***7:$2 ***REMOVED***$$1)\n\
	***REMOVED***\n\
		$this->$4 = $$1;\n\
		return $this;\n\
	***REMOVED***$***REMOVED***8***REMOVED***\n\
# anotation, get, and set, useful for doctrine\n\
snippet ags\n\
	/**\n\
	 * $***REMOVED***1:description***REMOVED***\n\
	 * \n\
	 * @$***REMOVED***7***REMOVED***\n\
	 */\n\
	$***REMOVED***2:protected***REMOVED*** $$***REMOVED***3:foo***REMOVED***;\n\
\n\
	public function get$***REMOVED***4:$3***REMOVED***()\n\
	***REMOVED***\n\
		return $this->$3;\n\
	***REMOVED***\n\
\n\
	public function set$4($***REMOVED***5:$4 ***REMOVED***$$***REMOVED***6:$3***REMOVED***)\n\
	***REMOVED***\n\
		$this->$3 = $$6;\n\
		return $this;\n\
	***REMOVED***\n\
snippet rett\n\
	return true;\n\
snippet retf\n\
	return false;\n\
";
exports.scope = "php";

***REMOVED***);
