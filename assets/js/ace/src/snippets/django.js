define('ace/snippets/django', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "# Model Fields\n\
\n\
# Note: Optional arguments are using defaults that match what Django will use\n\
# as a default, e.g. with max_length fields.  Doing this as a form of self\n\
# documentation and to make it easy to know whether you should override the\n\
# default or not.\n\
\n\
# Note: Optional arguments that are booleans will use the opposite since you\n\
# can either not specify them, or override them, e.g. auto_now_add=False.\n\
\n\
snippet auto\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.AutoField($***REMOVED***2***REMOVED***)\n\
snippet bool\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.BooleanField($***REMOVED***2:default=True***REMOVED***)\n\
snippet char\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.CharField(max_length=$***REMOVED***2***REMOVED***$***REMOVED***3:, blank=True***REMOVED***)\n\
snippet comma\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.CommaSeparatedIntegerField(max_length=$***REMOVED***2***REMOVED***$***REMOVED***3:, blank=True***REMOVED***)\n\
snippet date\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.DateField($***REMOVED***2:auto_now_add=True, auto_now=True***REMOVED***$***REMOVED***3:, blank=True, null=True***REMOVED***)\n\
snippet datetime\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.DateTimeField($***REMOVED***2:auto_now_add=True, auto_now=True***REMOVED***$***REMOVED***3:, blank=True, null=True***REMOVED***)\n\
snippet decimal\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.DecimalField(max_digits=$***REMOVED***2***REMOVED***, decimal_places=$***REMOVED***3***REMOVED***)\n\
snippet email\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.EmailField(max_length=$***REMOVED***2:75***REMOVED***$***REMOVED***3:, blank=True***REMOVED***)\n\
snippet file\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.FileField(upload_to=$***REMOVED***2:path/for/upload***REMOVED***$***REMOVED***3:, max_length=100***REMOVED***)\n\
snippet filepath\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.FilePathField(path=$***REMOVED***2:\"/abs/path/to/dir\"***REMOVED***$***REMOVED***3:, max_length=100***REMOVED***$***REMOVED***4:, match=\"*.ext\"***REMOVED***$***REMOVED***5:, recursive=True***REMOVED***$***REMOVED***6:, blank=True, ***REMOVED***)\n\
snippet float\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.FloatField($***REMOVED***2***REMOVED***)\n\
snippet image\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.ImageField(upload_to=$***REMOVED***2:path/for/upload***REMOVED***$***REMOVED***3:, height_field=height, width_field=width***REMOVED***$***REMOVED***4:, max_length=100***REMOVED***)\n\
snippet int\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.IntegerField($***REMOVED***2***REMOVED***)\n\
snippet ip\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.IPAddressField($***REMOVED***2***REMOVED***)\n\
snippet nullbool\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.NullBooleanField($***REMOVED***2***REMOVED***)\n\
snippet posint\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.PositiveIntegerField($***REMOVED***2***REMOVED***)\n\
snippet possmallint\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.PositiveSmallIntegerField($***REMOVED***2***REMOVED***)\n\
snippet slug\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.SlugField(max_length=$***REMOVED***2:50***REMOVED***$***REMOVED***3:, blank=True***REMOVED***)\n\
snippet smallint\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.SmallIntegerField($***REMOVED***2***REMOVED***)\n\
snippet text\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.TextField($***REMOVED***2:blank=True***REMOVED***)\n\
snippet time\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.TimeField($***REMOVED***2:auto_now_add=True, auto_now=True***REMOVED***$***REMOVED***3:, blank=True, null=True***REMOVED***)\n\
snippet url\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.URLField($***REMOVED***2:verify_exists=False***REMOVED***$***REMOVED***3:, max_length=200***REMOVED***$***REMOVED***4:, blank=True***REMOVED***)\n\
snippet xml\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.XMLField(schema_path=$***REMOVED***2:None***REMOVED***$***REMOVED***3:, blank=True***REMOVED***)\n\
# Relational Fields\n\
snippet fk\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.ForeignKey($***REMOVED***2:OtherModel***REMOVED***$***REMOVED***3:, related_name=''***REMOVED***$***REMOVED***4:, limit_choices_to=***REMOVED***$***REMOVED***5:, to_field=''***REMOVED***)\n\
snippet m2m\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.ManyToManyField($***REMOVED***2:OtherModel***REMOVED***$***REMOVED***3:, related_name=''***REMOVED***$***REMOVED***4:, limit_choices_to=***REMOVED***$***REMOVED***5:, symmetrical=False***REMOVED***$***REMOVED***6:, through=''***REMOVED***$***REMOVED***7:, db_table=''***REMOVED***)\n\
snippet o2o\n\
	$***REMOVED***1:FIELDNAME***REMOVED*** = models.OneToOneField($***REMOVED***2:OtherModel***REMOVED***$***REMOVED***3:, parent_link=True***REMOVED***$***REMOVED***4:, related_name=''***REMOVED***$***REMOVED***5:, limit_choices_to=***REMOVED***$***REMOVED***6:, to_field=''***REMOVED***)\n\
\n\
# Code Skeletons\n\
\n\
snippet form\n\
	class $***REMOVED***1:FormName***REMOVED***(forms.Form):\n\
		\"\"\"$***REMOVED***2:docstring***REMOVED***\"\"\"\n\
		$***REMOVED***3***REMOVED***\n\
\n\
snippet model\n\
	class $***REMOVED***1:ModelName***REMOVED***(models.Model):\n\
		\"\"\"$***REMOVED***2:docstring***REMOVED***\"\"\"\n\
		$***REMOVED***3***REMOVED***\n\
		\n\
		class Meta:\n\
			$***REMOVED***4***REMOVED***\n\
		\n\
		def __unicode__(self):\n\
			$***REMOVED***5***REMOVED***\n\
		\n\
		def save(self, force_insert=False, force_update=False):\n\
			$***REMOVED***6***REMOVED***\n\
		\n\
		@models.permalink\n\
		def get_absolute_url(self):\n\
			return ('$***REMOVED***7:view_or_url_name***REMOVED***' $***REMOVED***8***REMOVED***)\n\
\n\
snippet model***REMOVED***\n\
	class $***REMOVED***1:ModelName***REMOVED***Admin(***REMOVED***.ModelAdmin):\n\
		$***REMOVED***2***REMOVED***\n\
	\n\
	***REMOVED***.site.register($1, $1Admin)\n\
	\n\
snippet tabularinline\n\
	class $***REMOVED***1:ModelName***REMOVED***Inline(***REMOVED***.TabularInline):\n\
		model = $1\n\
\n\
snippet stackedinline\n\
	class $***REMOVED***1:ModelName***REMOVED***Inline(***REMOVED***.StackedInline):\n\
		model = $1\n\
\n\
snippet r2r\n\
	return render_to_response('$***REMOVED***1:template.html***REMOVED***', ***REMOVED***\n\
			$***REMOVED***2***REMOVED***\n\
		***REMOVED***$***REMOVED***3:, context_instance=RequestContext(request)***REMOVED***\n\
	)\n\
";
exports.scope = "django";

***REMOVED***);
