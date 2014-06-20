define('ace/snippets/java', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "## Access Modifiers\n\
snippet po\n\
	protected\n\
snippet pu\n\
	public\n\
snippet pr\n\
	private\n\
##\n\
## Annotations\n\
snippet before\n\
	@Before\n\
	static void $***REMOVED***1:intercept***REMOVED***($***REMOVED***2:args***REMOVED***) ***REMOVED*** $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet mm\n\
	@ManyToMany\n\
	$***REMOVED***1***REMOVED***\n\
snippet mo\n\
	@ManyToOne\n\
	$***REMOVED***1***REMOVED***\n\
snippet om\n\
	@OneToMany$***REMOVED***1:(cascade=CascadeType.ALL)***REMOVED***\n\
	$***REMOVED***2***REMOVED***\n\
snippet oo\n\
	@OneToOne\n\
	$***REMOVED***1***REMOVED***\n\
##\n\
## Basic Java packages and import\n\
snippet im\n\
	import\n\
snippet j.b\n\
	java.beans.\n\
snippet j.i\n\
	java.io.\n\
snippet j.m\n\
	java.math.\n\
snippet j.n\n\
	java.net.\n\
snippet j.u\n\
	java.util.\n\
##\n\
## Class\n\
snippet cl\n\
	class $***REMOVED***1:`Filename(\"\", \"untitled\")`***REMOVED*** $***REMOVED***2***REMOVED***\n\
snippet in\n\
	interface $***REMOVED***1:`Filename(\"\", \"untitled\")`***REMOVED*** $***REMOVED***2:extends Parent***REMOVED***$***REMOVED***3***REMOVED***\n\
snippet tc\n\
	public class $***REMOVED***1:`Filename()`***REMOVED*** extends $***REMOVED***2:TestCase***REMOVED***\n\
##\n\
## Class Enhancements\n\
snippet ext\n\
	extends \n\
snippet imp\n\
	implements\n\
##\n\
## Comments\n\
snippet /*\n\
	/*\n\
	 * $***REMOVED***1***REMOVED***\n\
	 */\n\
##\n\
## Constants\n\
snippet co\n\
	static public final $***REMOVED***1:String***REMOVED*** $***REMOVED***2:var***REMOVED*** = $***REMOVED***3***REMOVED***;$***REMOVED***4***REMOVED***\n\
snippet cos\n\
	static public final String $***REMOVED***1:var***REMOVED*** = \"$***REMOVED***2***REMOVED***\";$***REMOVED***3***REMOVED***\n\
##\n\
## Control Statements\n\
snippet case\n\
	case $***REMOVED***1***REMOVED***:\n\
		$***REMOVED***2***REMOVED***\n\
snippet def\n\
	default:\n\
		$***REMOVED***2***REMOVED***\n\
snippet el\n\
	else\n\
snippet elif\n\
	else if ($***REMOVED***1***REMOVED***) $***REMOVED***2***REMOVED***\n\
snippet if\n\
	if ($***REMOVED***1***REMOVED***) $***REMOVED***2***REMOVED***\n\
snippet sw\n\
	switch ($***REMOVED***1***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	***REMOVED***\n\
##\n\
## Create a Method\n\
snippet m\n\
	$***REMOVED***1:void***REMOVED*** $***REMOVED***2:method***REMOVED***($***REMOVED***3***REMOVED***) $***REMOVED***4:throws ***REMOVED***$***REMOVED***5***REMOVED***\n\
##\n\
## Create a Variable\n\
snippet v\n\
	$***REMOVED***1:String***REMOVED*** $***REMOVED***2:var***REMOVED***$***REMOVED***3: = null***REMOVED***$***REMOVED***4***REMOVED***;$***REMOVED***5***REMOVED***\n\
##\n\
## Enhancements to Methods, variables, classes, etc.\n\
snippet ab\n\
	abstract\n\
snippet fi\n\
	final\n\
snippet st\n\
	static\n\
snippet sy\n\
	synchronized\n\
##\n\
## Error Methods\n\
snippet err\n\
	System.err.print(\"$***REMOVED***1:Message***REMOVED***\");\n\
snippet errf\n\
	System.err.printf(\"$***REMOVED***1:Message***REMOVED***\", $***REMOVED***2:exception***REMOVED***);\n\
snippet errln\n\
	System.err.println(\"$***REMOVED***1:Message***REMOVED***\");\n\
##\n\
## Exception Handling\n\
snippet as\n\
	assert $***REMOVED***1:test***REMOVED*** : \"$***REMOVED***2:Failure message***REMOVED***\";$***REMOVED***3***REMOVED***\n\
snippet ca\n\
	catch($***REMOVED***1:Exception***REMOVED*** $***REMOVED***2:e***REMOVED***) $***REMOVED***3***REMOVED***\n\
snippet thr\n\
	throw\n\
snippet ths\n\
	throws\n\
snippet try\n\
	try ***REMOVED***\n\
		$***REMOVED***3***REMOVED***\n\
	***REMOVED*** catch($***REMOVED***1:Exception***REMOVED*** $***REMOVED***2:e***REMOVED***) ***REMOVED***\n\
	***REMOVED***\n\
snippet tryf\n\
	try ***REMOVED***\n\
		$***REMOVED***3***REMOVED***\n\
	***REMOVED*** catch($***REMOVED***1:Exception***REMOVED*** $***REMOVED***2:e***REMOVED***) ***REMOVED***\n\
	***REMOVED*** finally ***REMOVED***\n\
	***REMOVED***\n\
##\n\
## Find Methods\n\
snippet findall\n\
	List<$***REMOVED***1:listName***REMOVED***> $***REMOVED***2:items***REMOVED*** = $***REMOVED***1***REMOVED***.findAll();$***REMOVED***3***REMOVED***\n\
snippet findbyid\n\
	$***REMOVED***1:var***REMOVED*** $***REMOVED***2:item***REMOVED*** = $***REMOVED***1***REMOVED***.findById($***REMOVED***3***REMOVED***);$***REMOVED***4***REMOVED***\n\
##\n\
## Javadocs\n\
snippet /**\n\
	/**\n\
	 * $***REMOVED***1***REMOVED***\n\
	 */\n\
snippet @au\n\
	@author `system(\"grep \\`id -un\\` /etc/passwd | cut -d \\\":\\\" -f5 | cut -d \\\",\\\" -f1\")`\n\
snippet @br\n\
	@brief $***REMOVED***1:Description***REMOVED***\n\
snippet @fi\n\
	@file $***REMOVED***1:`Filename()`***REMOVED***.java\n\
snippet @pa\n\
	@param $***REMOVED***1:param***REMOVED***\n\
snippet @re\n\
	@return $***REMOVED***1:param***REMOVED***\n\
##\n\
## Logger Methods\n\
snippet debug\n\
	Logger.debug($***REMOVED***1:param***REMOVED***);$***REMOVED***2***REMOVED***\n\
snippet error\n\
	Logger.error($***REMOVED***1:param***REMOVED***);$***REMOVED***2***REMOVED***\n\
snippet info\n\
	Logger.info($***REMOVED***1:param***REMOVED***);$***REMOVED***2***REMOVED***\n\
snippet warn\n\
	Logger.warn($***REMOVED***1:param***REMOVED***);$***REMOVED***2***REMOVED***\n\
##\n\
## Loops\n\
snippet enfor\n\
	for ($***REMOVED***1***REMOVED*** : $***REMOVED***2***REMOVED***) $***REMOVED***3***REMOVED***\n\
snippet for\n\
	for ($***REMOVED***1***REMOVED***; $***REMOVED***2***REMOVED***; $***REMOVED***3***REMOVED***) $***REMOVED***4***REMOVED***\n\
snippet wh\n\
	while ($***REMOVED***1***REMOVED***) $***REMOVED***2***REMOVED***\n\
##\n\
## Main method\n\
snippet main\n\
	public static void main (String[] args) ***REMOVED***\n\
		$***REMOVED***1:/* code */***REMOVED***\n\
	***REMOVED***\n\
##\n\
## Print Methods\n\
snippet print\n\
	System.out.print(\"$***REMOVED***1:Message***REMOVED***\");\n\
snippet printf\n\
	System.out.printf(\"$***REMOVED***1:Message***REMOVED***\", $***REMOVED***2:args***REMOVED***);\n\
snippet println\n\
	System.out.println($***REMOVED***1***REMOVED***);\n\
##\n\
## Render Methods\n\
snippet ren\n\
	render($***REMOVED***1:param***REMOVED***);$***REMOVED***2***REMOVED***\n\
snippet rena\n\
	renderArgs.put(\"$***REMOVED***1***REMOVED***\", $***REMOVED***2***REMOVED***);$***REMOVED***3***REMOVED***\n\
snippet renb\n\
	renderBinary($***REMOVED***1:param***REMOVED***);$***REMOVED***2***REMOVED***\n\
snippet renj\n\
	renderJSON($***REMOVED***1:param***REMOVED***);$***REMOVED***2***REMOVED***\n\
snippet renx\n\
	renderXml($***REMOVED***1:param***REMOVED***);$***REMOVED***2***REMOVED***\n\
##\n\
## Setter and Getter Methods\n\
snippet set\n\
	$***REMOVED***1:public***REMOVED*** void set$***REMOVED***3:***REMOVED***($***REMOVED***2:String***REMOVED*** $***REMOVED***4:***REMOVED***)***REMOVED***\n\
		this.$4 = $4;\n\
	***REMOVED***\n\
snippet get\n\
	$***REMOVED***1:public***REMOVED*** $***REMOVED***2:String***REMOVED*** get$***REMOVED***3:***REMOVED***()***REMOVED***\n\
		return this.$***REMOVED***4:***REMOVED***;\n\
	***REMOVED***\n\
##\n\
## Terminate Methods or Loops\n\
snippet re\n\
	return\n\
snippet br\n\
	break;\n\
##\n\
## Test Methods\n\
snippet t\n\
	public void test$***REMOVED***1:Name***REMOVED***() throws Exception ***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	***REMOVED***\n\
snippet test\n\
	@Test\n\
	public void test$***REMOVED***1:Name***REMOVED***() throws Exception ***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	***REMOVED***\n\
##\n\
## Utils\n\
snippet Sc\n\
	Scanner\n\
##\n\
## Miscellaneous\n\
snippet action\n\
	public static void $***REMOVED***1:index***REMOVED***($***REMOVED***2:args***REMOVED***) ***REMOVED*** $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet rnf\n\
	notFound($***REMOVED***1:param***REMOVED***);$***REMOVED***2***REMOVED***\n\
snippet rnfin\n\
	notFoundIfNull($***REMOVED***1:param***REMOVED***);$***REMOVED***2***REMOVED***\n\
snippet rr\n\
	redirect($***REMOVED***1:param***REMOVED***);$***REMOVED***2***REMOVED***\n\
snippet ru\n\
	unauthorized($***REMOVED***1:param***REMOVED***);$***REMOVED***2***REMOVED***\n\
snippet unless\n\
	(unless=$***REMOVED***1:param***REMOVED***);$***REMOVED***2***REMOVED***\n\
";
exports.scope = "java";

***REMOVED***);
