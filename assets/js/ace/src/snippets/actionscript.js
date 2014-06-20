define('ace/snippets/actionscript', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "snippet main\n\
	package ***REMOVED***\n\
		import flash.display.*;\n\
		import flash.Events.*;\n\
	\n\
		public class Main extends Sprite ***REMOVED***\n\
			public function Main (	) ***REMOVED***\n\
				trace(\"start\");\n\
				stage.scaleMode = StageScaleMode.NO_SCALE;\n\
				stage.addEventListener(Event.RESIZE, resizeListener);\n\
			***REMOVED***\n\
	\n\
			private function resizeListener (e:Event):void ***REMOVED***\n\
				trace(\"The application window changed size!\");\n\
				trace(\"New width:  \" + stage.stageWidth);\n\
				trace(\"New height: \" + stage.stageHeight);\n\
			***REMOVED***\n\
	\n\
		***REMOVED***\n\
	\n\
	***REMOVED***\n\
snippet class\n\
	$***REMOVED***1:public|internal***REMOVED*** class $***REMOVED***2:name***REMOVED*** $***REMOVED***3:extends ***REMOVED*** ***REMOVED***\n\
		public function $2 (	) ***REMOVED***\n\
			(\"start\");\n\
		***REMOVED***\n\
	***REMOVED***\n\
snippet all\n\
	package name ***REMOVED***\n\
\n\
		$***REMOVED***1:public|internal|final***REMOVED*** class $***REMOVED***2:name***REMOVED*** $***REMOVED***3:extends ***REMOVED*** ***REMOVED***\n\
			private|public| static const FOO = \"abc\";\n\
			private|public| static var BAR = \"abc\";\n\
\n\
			// class initializer - no JIT !! one time setup\n\
			if Cababilities.os == \"Linux|MacOS\" ***REMOVED***\n\
				FOO = \"other\";\n\
			***REMOVED***\n\
\n\
			// constructor:\n\
			public function $2 (	)***REMOVED***\n\
				super2();\n\
				trace(\"start\");\n\
			***REMOVED***\n\
			public function name (a, b...)***REMOVED***\n\
				super.name(..);\n\
				lable:break\n\
			***REMOVED***\n\
		***REMOVED***\n\
	***REMOVED***\n\
\n\
	function A()***REMOVED***\n\
		// A can only be accessed within this file\n\
	***REMOVED***\n\
snippet switch\n\
	switch($***REMOVED***1***REMOVED***)***REMOVED***\n\
		case $***REMOVED***2***REMOVED***:\n\
			$***REMOVED***3***REMOVED***\n\
		break;\n\
		default:\n\
	***REMOVED***\n\
snippet case\n\
		case $***REMOVED***1***REMOVED***:\n\
			$***REMOVED***2***REMOVED***\n\
		break;\n\
snippet package\n\
	package $***REMOVED***1:package***REMOVED******REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	***REMOVED***\n\
snippet wh\n\
	while $***REMOVED***1:cond***REMOVED******REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	***REMOVED***\n\
snippet do\n\
	do ***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	***REMOVED*** while ($***REMOVED***1:cond***REMOVED***)\n\
snippet while\n\
	while $***REMOVED***1:cond***REMOVED******REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	***REMOVED***\n\
snippet for enumerate names\n\
	for ($***REMOVED***1:var***REMOVED*** in $***REMOVED***2:object***REMOVED***)***REMOVED***\n\
		$***REMOVED***3***REMOVED***\n\
	***REMOVED***\n\
snippet for enumerate values\n\
	for each ($***REMOVED***1:var***REMOVED*** in $***REMOVED***2:object***REMOVED***)***REMOVED***\n\
		$***REMOVED***3***REMOVED***\n\
	***REMOVED***\n\
snippet get_set\n\
	function get $***REMOVED***1:name***REMOVED*** ***REMOVED***\n\
		return $***REMOVED***2***REMOVED***\n\
	***REMOVED***\n\
	function set $1 (newValue) ***REMOVED***\n\
		$***REMOVED***3***REMOVED***\n\
	***REMOVED***\n\
snippet interface\n\
	interface name ***REMOVED***\n\
		function method($***REMOVED***1***REMOVED***):$***REMOVED***2:returntype***REMOVED***;\n\
	***REMOVED***\n\
snippet try\n\
	try ***REMOVED***\n\
		$***REMOVED***1***REMOVED***\n\
	***REMOVED*** catch (error:ErrorType) ***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	***REMOVED*** finally ***REMOVED***\n\
		$***REMOVED***3***REMOVED***\n\
	***REMOVED***\n\
# For Loop (same as c.snippet)\n\
snippet for for (..) ***REMOVED***..***REMOVED***\n\
	for ($***REMOVED***2:i***REMOVED*** = 0; $2 < $***REMOVED***1:count***REMOVED***; $2$***REMOVED***3:++***REMOVED***) ***REMOVED***\n\
		$***REMOVED***4:/* code */***REMOVED***\n\
	***REMOVED***\n\
# Custom For Loop\n\
snippet forr\n\
	for ($***REMOVED***1:i***REMOVED*** = $***REMOVED***2:0***REMOVED***; $***REMOVED***3:$1 < 10***REMOVED***; $1$***REMOVED***4:++***REMOVED***) ***REMOVED***\n\
		$***REMOVED***5:/* code */***REMOVED***\n\
	***REMOVED***\n\
# If Condition\n\
snippet if\n\
	if ($***REMOVED***1:/* condition */***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2:/* code */***REMOVED***\n\
	***REMOVED***\n\
snippet el\n\
	else ***REMOVED***\n\
		$***REMOVED***1***REMOVED***\n\
	***REMOVED***\n\
# Ternary conditional\n\
snippet t\n\
	$***REMOVED***1:/* condition */***REMOVED*** ? $***REMOVED***2:a***REMOVED*** : $***REMOVED***3:b***REMOVED***\n\
snippet fun\n\
	function $***REMOVED***1:function_name***REMOVED***($***REMOVED***2***REMOVED***)$***REMOVED***3***REMOVED***\n\
	***REMOVED***\n\
		$***REMOVED***4:/* code */***REMOVED***\n\
	***REMOVED***\n\
# FlxSprite (usefull when using the flixel library)\n\
snippet FlxSprite\n\
	package\n\
	***REMOVED***\n\
		import org.flixel.*\n\
\n\
		public class $***REMOVED***1:ClassName***REMOVED*** extends $***REMOVED***2:FlxSprite***REMOVED***\n\
		***REMOVED***\n\
			public function $1($***REMOVED***3: X:Number, Y:Number***REMOVED***):void\n\
			***REMOVED***\n\
				super(X,Y);\n\
				$***REMOVED***4: //code...***REMOVED***\n\
			***REMOVED***\n\
\n\
			override public function update():void\n\
			***REMOVED***\n\
				super.update();\n\
				$***REMOVED***5: //code...***REMOVED***\n\
			***REMOVED***\n\
		***REMOVED***\n\
	***REMOVED***\n\
\n\
";
exports.scope = "actionscript";

***REMOVED***);
