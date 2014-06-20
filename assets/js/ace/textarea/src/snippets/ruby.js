__ace_shadowed__.define('ace/snippets/ruby', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "########################################\n\
# Ruby snippets - for Rails, see below #\n\
########################################\n\
\n\
# encoding for Ruby 1.9\n\
snippet enc\n\
	# encoding: utf-8\n\
\n\
# #!/usr/bin/env ruby\n\
snippet #!\n\
	#!/usr/bin/env ruby\n\
	# encoding: utf-8\n\
\n\
# New Block\n\
snippet =b\n\
	=begin rdoc\n\
		$***REMOVED***1***REMOVED***\n\
	=end\n\
snippet y\n\
	:yields: $***REMOVED***1:arguments***REMOVED***\n\
snippet rb\n\
	#!/usr/bin/env ruby -wKU\n\
snippet beg\n\
	begin\n\
		$***REMOVED***3***REMOVED***\n\
	rescue $***REMOVED***1:Exception***REMOVED*** => $***REMOVED***2:e***REMOVED***\n\
	end\n\
\n\
snippet req require\n\
	require \"$***REMOVED***1***REMOVED***\"$***REMOVED***2***REMOVED***\n\
snippet #\n\
	# =>\n\
snippet end\n\
	__END__\n\
snippet case\n\
	case $***REMOVED***1:object***REMOVED***\n\
	when $***REMOVED***2:condition***REMOVED***\n\
		$***REMOVED***3***REMOVED***\n\
	end\n\
snippet when\n\
	when $***REMOVED***1:condition***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
snippet def\n\
	def $***REMOVED***1:method_name***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet deft\n\
	def test_$***REMOVED***1:case_name***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet if\n\
	if $***REMOVED***1:condition***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet ife\n\
	if $***REMOVED***1:condition***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	else\n\
		$***REMOVED***3***REMOVED***\n\
	end\n\
snippet elsif\n\
	elsif $***REMOVED***1:condition***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
snippet unless\n\
	unless $***REMOVED***1:condition***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet while\n\
	while $***REMOVED***1:condition***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet for\n\
	for $***REMOVED***1:e***REMOVED*** in $***REMOVED***2:c***REMOVED***\n\
		$***REMOVED***3***REMOVED***\n\
	end\n\
snippet until\n\
	until $***REMOVED***1:condition***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet cla class .. end\n\
	class $***REMOVED***1:`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')`***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet cla class .. initialize .. end\n\
	class $***REMOVED***1:`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')`***REMOVED***\n\
		def initialize($***REMOVED***2:args***REMOVED***)\n\
			$***REMOVED***3***REMOVED***\n\
		end\n\
	end\n\
snippet cla class .. < ParentClass .. initialize .. end\n\
	class $***REMOVED***1:`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')`***REMOVED*** < $***REMOVED***2:ParentClass***REMOVED***\n\
		def initialize($***REMOVED***3:args***REMOVED***)\n\
			$***REMOVED***4***REMOVED***\n\
		end\n\
	end\n\
snippet cla ClassName = Struct .. do .. end\n\
	$***REMOVED***1:`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')`***REMOVED*** = Struct.new(:$***REMOVED***2:attr_names***REMOVED***) do\n\
		def $***REMOVED***3:method_name***REMOVED***\n\
			$***REMOVED***4***REMOVED***\n\
		end\n\
	end\n\
snippet cla class BlankSlate .. initialize .. end\n\
	class $***REMOVED***1:BlankSlate***REMOVED***\n\
		instance_methods.each ***REMOVED*** |meth| undef_method(meth) unless meth =~ /\\A__/ ***REMOVED***\n\
	end\n\
snippet cla class << self .. end\n\
	class << $***REMOVED***1:self***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
# class .. < DelegateClass .. initialize .. end\n\
snippet cla-\n\
	class $***REMOVED***1:`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')`***REMOVED*** < DelegateClass($***REMOVED***2:ParentClass***REMOVED***)\n\
		def initialize($***REMOVED***3:args***REMOVED***)\n\
			super($***REMOVED***4:del_obj***REMOVED***)\n\
\n\
			$***REMOVED***5***REMOVED***\n\
		end\n\
	end\n\
snippet mod module .. end\n\
	module $***REMOVED***1:`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')`***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet mod module .. module_function .. end\n\
	module $***REMOVED***1:`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')`***REMOVED***\n\
		module_function\n\
\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet mod module .. ClassMethods .. end\n\
	module $***REMOVED***1:`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')`***REMOVED***\n\
		module ClassMethods\n\
			$***REMOVED***2***REMOVED***\n\
		end\n\
\n\
		module InstanceMethods\n\
\n\
		end\n\
\n\
		def self.included(receiver)\n\
			receiver.extend         ClassMethods\n\
			receiver.send :include, InstanceMethods\n\
		end\n\
	end\n\
# attr_reader\n\
snippet r\n\
	attr_reader :$***REMOVED***1:attr_names***REMOVED***\n\
# attr_writer\n\
snippet w\n\
	attr_writer :$***REMOVED***1:attr_names***REMOVED***\n\
# attr_accessor\n\
snippet rw\n\
	attr_accessor :$***REMOVED***1:attr_names***REMOVED***\n\
snippet atp\n\
	attr_protected :$***REMOVED***1:attr_names***REMOVED***\n\
snippet ata\n\
	attr_accessible :$***REMOVED***1:attr_names***REMOVED***\n\
# include Enumerable\n\
snippet Enum\n\
	include Enumerable\n\
\n\
	def each(&block)\n\
		$***REMOVED***1***REMOVED***\n\
	end\n\
# include Comparable\n\
snippet Comp\n\
	include Comparable\n\
\n\
	def <=>(other)\n\
		$***REMOVED***1***REMOVED***\n\
	end\n\
# extend Forwardable\n\
snippet Forw-\n\
	extend Forwardable\n\
# def self\n\
snippet defs\n\
	def self.$***REMOVED***1:class_method_name***REMOVED***\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
# def method_missing\n\
snippet defmm\n\
	def method_missing(meth, *args, &blk)\n\
		$***REMOVED***1***REMOVED***\n\
	end\n\
snippet defd\n\
	def_delegator :$***REMOVED***1:@del_obj***REMOVED***, :$***REMOVED***2:del_meth***REMOVED***, :$***REMOVED***3:new_name***REMOVED***\n\
snippet defds\n\
	def_delegators :$***REMOVED***1:@del_obj***REMOVED***, :$***REMOVED***2:del_methods***REMOVED***\n\
snippet am\n\
	alias_method :$***REMOVED***1:new_name***REMOVED***, :$***REMOVED***2:old_name***REMOVED***\n\
snippet app\n\
	if __FILE__ == $PROGRAM_NAME\n\
		$***REMOVED***1***REMOVED***\n\
	end\n\
# usage_if()\n\
snippet usai\n\
	if ARGV.$***REMOVED***1***REMOVED***\n\
		abort \"Usage: #***REMOVED***$PROGRAM_NAME***REMOVED*** $***REMOVED***2:ARGS_GO_HERE***REMOVED***\"$***REMOVED***3***REMOVED***\n\
	end\n\
# usage_unless()\n\
snippet usau\n\
	unless ARGV.$***REMOVED***1***REMOVED***\n\
		abort \"Usage: #***REMOVED***$PROGRAM_NAME***REMOVED*** $***REMOVED***2:ARGS_GO_HERE***REMOVED***\"$***REMOVED***3***REMOVED***\n\
	end\n\
snippet array\n\
	Array.new($***REMOVED***1:10***REMOVED***) ***REMOVED*** |$***REMOVED***2:i***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet hash\n\
	Hash.new ***REMOVED*** |$***REMOVED***1:hash***REMOVED***, $***REMOVED***2:key***REMOVED***| $1[$2] = $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet file File.foreach() ***REMOVED*** |line| .. ***REMOVED***\n\
	File.foreach($***REMOVED***1:\"path/to/file\"***REMOVED***) ***REMOVED*** |$***REMOVED***2:line***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet file File.read()\n\
	File.read($***REMOVED***1:\"path/to/file\"***REMOVED***)$***REMOVED***2***REMOVED***\n\
snippet Dir Dir.global() ***REMOVED*** |file| .. ***REMOVED***\n\
	Dir.glob($***REMOVED***1:\"dir/glob/*\"***REMOVED***) ***REMOVED*** |$***REMOVED***2:file***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet Dir Dir[\"..\"]\n\
	Dir[$***REMOVED***1:\"glob/**/*.rb\"***REMOVED***]$***REMOVED***2***REMOVED***\n\
snippet dir\n\
	Filename.dirname(__FILE__)\n\
snippet deli\n\
	delete_if ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet fil\n\
	fill($***REMOVED***1:range***REMOVED***) ***REMOVED*** |$***REMOVED***2:i***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
# flatten_once()\n\
snippet flao\n\
	inject(Array.new) ***REMOVED*** |$***REMOVED***1:arr***REMOVED***, $***REMOVED***2:a***REMOVED***| $1.push(*$2)***REMOVED***$***REMOVED***3***REMOVED***\n\
snippet zip\n\
	zip($***REMOVED***1:enums***REMOVED***) ***REMOVED*** |$***REMOVED***2:row***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
# downto(0) ***REMOVED*** |n| .. ***REMOVED***\n\
snippet dow\n\
	downto($***REMOVED***1:0***REMOVED***) ***REMOVED*** |$***REMOVED***2:n***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet ste\n\
	step($***REMOVED***1:2***REMOVED***) ***REMOVED*** |$***REMOVED***2:n***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet tim\n\
	times ***REMOVED*** |$***REMOVED***1:n***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet upt\n\
	upto($***REMOVED***1:1.0/0.0***REMOVED***) ***REMOVED*** |$***REMOVED***2:n***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet loo\n\
	loop ***REMOVED*** $***REMOVED***1***REMOVED*** ***REMOVED***\n\
snippet ea\n\
	each ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet ead\n\
	each do |$***REMOVED***1:e***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet eab\n\
	each_byte ***REMOVED*** |$***REMOVED***1:byte***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet eac- each_char ***REMOVED*** |chr| .. ***REMOVED***\n\
	each_char ***REMOVED*** |$***REMOVED***1:chr***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet eac- each_cons(..) ***REMOVED*** |group| .. ***REMOVED***\n\
	each_cons($***REMOVED***1:2***REMOVED***) ***REMOVED*** |$***REMOVED***2:group***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet eai\n\
	each_index ***REMOVED*** |$***REMOVED***1:i***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet eaid\n\
	each_index do |$***REMOVED***1:i***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet eak\n\
	each_key ***REMOVED*** |$***REMOVED***1:key***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet eakd\n\
	each_key do |$***REMOVED***1:key***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet eal\n\
	each_line ***REMOVED*** |$***REMOVED***1:line***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet eald\n\
	each_line do |$***REMOVED***1:line***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet eap\n\
	each_pair ***REMOVED*** |$***REMOVED***1:name***REMOVED***, $***REMOVED***2:val***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet eapd\n\
	each_pair do |$***REMOVED***1:name***REMOVED***, $***REMOVED***2:val***REMOVED***|\n\
		$***REMOVED***3***REMOVED***\n\
	end\n\
snippet eas-\n\
	each_slice($***REMOVED***1:2***REMOVED***) ***REMOVED*** |$***REMOVED***2:group***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet easd-\n\
	each_slice($***REMOVED***1:2***REMOVED***) do |$***REMOVED***2:group***REMOVED***|\n\
		$***REMOVED***3***REMOVED***\n\
	end\n\
snippet eav\n\
	each_value ***REMOVED*** |$***REMOVED***1:val***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet eavd\n\
	each_value do |$***REMOVED***1:val***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet eawi\n\
	each_with_index ***REMOVED*** |$***REMOVED***1:e***REMOVED***, $***REMOVED***2:i***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet eawid\n\
	each_with_index do |$***REMOVED***1:e***REMOVED***,$***REMOVED***2:i***REMOVED***|\n\
		$***REMOVED***3***REMOVED***\n\
	end\n\
snippet reve\n\
	reverse_each ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet reved\n\
	reverse_each do |$***REMOVED***1:e***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet inj\n\
	inject($***REMOVED***1:init***REMOVED***) ***REMOVED*** |$***REMOVED***2:mem***REMOVED***, $***REMOVED***3:var***REMOVED***| $***REMOVED***4***REMOVED*** ***REMOVED***\n\
snippet injd\n\
	inject($***REMOVED***1:init***REMOVED***) do |$***REMOVED***2:mem***REMOVED***, $***REMOVED***3:var***REMOVED***|\n\
		$***REMOVED***4***REMOVED***\n\
	end\n\
snippet map\n\
	map ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet mapd\n\
	map do |$***REMOVED***1:e***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet mapwi-\n\
	enum_with_index.map ***REMOVED*** |$***REMOVED***1:e***REMOVED***, $***REMOVED***2:i***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet sor\n\
	sort ***REMOVED*** |a, b| $***REMOVED***1***REMOVED*** ***REMOVED***\n\
snippet sorb\n\
	sort_by ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet ran\n\
	sort_by ***REMOVED*** rand ***REMOVED***\n\
snippet all\n\
	all? ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet any\n\
	any? ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet cl\n\
	classify ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet col\n\
	collect ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet cold\n\
	collect do |$***REMOVED***1:e***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet det\n\
	detect ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet detd\n\
	detect do |$***REMOVED***1:e***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet fet\n\
	fetch($***REMOVED***1:name***REMOVED***) ***REMOVED*** |$***REMOVED***2:key***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet fin\n\
	find ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet find\n\
	find do |$***REMOVED***1:e***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet fina\n\
	find_all ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet finad\n\
	find_all do |$***REMOVED***1:e***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet gre\n\
	grep($***REMOVED***1:/pattern/***REMOVED***) ***REMOVED*** |$***REMOVED***2:match***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet sub\n\
	$***REMOVED***1:g***REMOVED***sub($***REMOVED***2:/pattern/***REMOVED***) ***REMOVED*** |$***REMOVED***3:match***REMOVED***| $***REMOVED***4***REMOVED*** ***REMOVED***\n\
snippet sca\n\
	scan($***REMOVED***1:/pattern/***REMOVED***) ***REMOVED*** |$***REMOVED***2:match***REMOVED***| $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet scad\n\
	scan($***REMOVED***1:/pattern/***REMOVED***) do |$***REMOVED***2:match***REMOVED***|\n\
		$***REMOVED***3***REMOVED***\n\
	end\n\
snippet max\n\
	max ***REMOVED*** |a, b| $***REMOVED***1***REMOVED*** ***REMOVED***\n\
snippet min\n\
	min ***REMOVED*** |a, b| $***REMOVED***1***REMOVED*** ***REMOVED***\n\
snippet par\n\
	partition ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet pard\n\
	partition do |$***REMOVED***1:e***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet rej\n\
	reject ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet rejd\n\
	reject do |$***REMOVED***1:e***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet sel\n\
	select ***REMOVED*** |$***REMOVED***1:e***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet seld\n\
	select do |$***REMOVED***1:e***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet lam\n\
	lambda ***REMOVED*** |$***REMOVED***1:args***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet doo\n\
	do\n\
		$***REMOVED***1***REMOVED***\n\
	end\n\
snippet dov\n\
	do |$***REMOVED***1:variable***REMOVED***|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet :\n\
	:$***REMOVED***1:key***REMOVED*** => $***REMOVED***2:\"value\"***REMOVED***$***REMOVED***3***REMOVED***\n\
snippet ope\n\
	open($***REMOVED***1:\"path/or/url/or/pipe\"***REMOVED***, \"$***REMOVED***2:w***REMOVED***\") ***REMOVED*** |$***REMOVED***3:io***REMOVED***| $***REMOVED***4***REMOVED*** ***REMOVED***\n\
# path_from_here()\n\
snippet fpath\n\
	File.join(File.dirname(__FILE__), *%2[$***REMOVED***1:rel path here***REMOVED***])$***REMOVED***2***REMOVED***\n\
# unix_filter ***REMOVED******REMOVED***\n\
snippet unif\n\
	ARGF.each_line$***REMOVED***1***REMOVED*** do |$***REMOVED***2:line***REMOVED***|\n\
		$***REMOVED***3***REMOVED***\n\
	end\n\
# option_parse ***REMOVED******REMOVED***\n\
snippet optp\n\
	require \"optparse\"\n\
\n\
	options = ***REMOVED***$***REMOVED***1:default => \"args\"***REMOVED******REMOVED***\n\
\n\
	ARGV.options do |opts|\n\
		opts.banner = \"Usage: #***REMOVED***File.basename($PROGRAM_NAME)***REMOVED***\n\
snippet opt\n\
	opts.on( \"-$***REMOVED***1:o***REMOVED***\", \"--$***REMOVED***2:long-option-name***REMOVED***\", $***REMOVED***3:String***REMOVED***,\n\
	         \"$***REMOVED***4:Option description.***REMOVED***\") do |$***REMOVED***5:opt***REMOVED***|\n\
		$***REMOVED***6***REMOVED***\n\
	end\n\
snippet tc\n\
	require \"test/unit\"\n\
\n\
	require \"$***REMOVED***1:library_file_name***REMOVED***\"\n\
\n\
	class Test$***REMOVED***2:$1***REMOVED*** < Test::Unit::TestCase\n\
		def test_$***REMOVED***3:case_name***REMOVED***\n\
			$***REMOVED***4***REMOVED***\n\
		end\n\
	end\n\
snippet ts\n\
	require \"test/unit\"\n\
\n\
	require \"tc_$***REMOVED***1:test_case_file***REMOVED***\"\n\
	require \"tc_$***REMOVED***2:test_case_file***REMOVED***\"$***REMOVED***3***REMOVED***\n\
snippet as\n\
	assert $***REMOVED***1:test***REMOVED***, \"$***REMOVED***2:Failure message.***REMOVED***\"$***REMOVED***3***REMOVED***\n\
snippet ase\n\
	assert_equal $***REMOVED***1:expected***REMOVED***, $***REMOVED***2:actual***REMOVED***$***REMOVED***3***REMOVED***\n\
snippet asne\n\
	assert_not_equal $***REMOVED***1:unexpected***REMOVED***, $***REMOVED***2:actual***REMOVED***$***REMOVED***3***REMOVED***\n\
snippet asid\n\
	assert_in_delta $***REMOVED***1:expected_float***REMOVED***, $***REMOVED***2:actual_float***REMOVED***, $***REMOVED***3:2 ** -20***REMOVED***$***REMOVED***4***REMOVED***\n\
snippet asio\n\
	assert_instance_of $***REMOVED***1:ExpectedClass***REMOVED***, $***REMOVED***2:actual_instance***REMOVED***$***REMOVED***3***REMOVED***\n\
snippet asko\n\
	assert_kind_of $***REMOVED***1:ExpectedKind***REMOVED***, $***REMOVED***2:actual_instance***REMOVED***$***REMOVED***3***REMOVED***\n\
snippet asn\n\
	assert_nil $***REMOVED***1:instance***REMOVED***$***REMOVED***2***REMOVED***\n\
snippet asnn\n\
	assert_not_nil $***REMOVED***1:instance***REMOVED***$***REMOVED***2***REMOVED***\n\
snippet asm\n\
	assert_match /$***REMOVED***1:expected_pattern***REMOVED***/, $***REMOVED***2:actual_string***REMOVED***$***REMOVED***3***REMOVED***\n\
snippet asnm\n\
	assert_no_match /$***REMOVED***1:unexpected_pattern***REMOVED***/, $***REMOVED***2:actual_string***REMOVED***$***REMOVED***3***REMOVED***\n\
snippet aso\n\
	assert_operator $***REMOVED***1:left***REMOVED***, :$***REMOVED***2:operator***REMOVED***, $***REMOVED***3:right***REMOVED***$***REMOVED***4***REMOVED***\n\
snippet asr\n\
	assert_raise $***REMOVED***1:Exception***REMOVED*** ***REMOVED*** $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet asrd\n\
	assert_raise $***REMOVED***1:Exception***REMOVED*** do\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet asnr\n\
	assert_nothing_raised $***REMOVED***1:Exception***REMOVED*** ***REMOVED*** $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet asnrd\n\
	assert_nothing_raised $***REMOVED***1:Exception***REMOVED*** do\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet asrt\n\
	assert_respond_to $***REMOVED***1:object***REMOVED***, :$***REMOVED***2:method***REMOVED***$***REMOVED***3***REMOVED***\n\
snippet ass assert_same(..)\n\
	assert_same $***REMOVED***1:expected***REMOVED***, $***REMOVED***2:actual***REMOVED***$***REMOVED***3***REMOVED***\n\
snippet ass assert_send(..)\n\
	assert_send [$***REMOVED***1:object***REMOVED***, :$***REMOVED***2:message***REMOVED***, $***REMOVED***3:args***REMOVED***]$***REMOVED***4***REMOVED***\n\
snippet asns\n\
	assert_not_same $***REMOVED***1:unexpected***REMOVED***, $***REMOVED***2:actual***REMOVED***$***REMOVED***3***REMOVED***\n\
snippet ast\n\
	assert_throws :$***REMOVED***1:expected***REMOVED*** ***REMOVED*** $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet astd\n\
	assert_throws :$***REMOVED***1:expected***REMOVED*** do\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet asnt\n\
	assert_nothing_thrown ***REMOVED*** $***REMOVED***1***REMOVED*** ***REMOVED***\n\
snippet asntd\n\
	assert_nothing_thrown do\n\
		$***REMOVED***1***REMOVED***\n\
	end\n\
snippet fl\n\
	flunk \"$***REMOVED***1:Failure message.***REMOVED***\"$***REMOVED***2***REMOVED***\n\
# Benchmark.bmbm do .. end\n\
snippet bm-\n\
	TESTS = $***REMOVED***1:10_000***REMOVED***\n\
	Benchmark.bmbm do |results|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet rep\n\
	results.report(\"$***REMOVED***1:name***REMOVED***:\") ***REMOVED*** TESTS.times ***REMOVED*** $***REMOVED***2***REMOVED*** ***REMOVED******REMOVED***\n\
# Marshal.dump(.., file)\n\
snippet Md\n\
	File.open($***REMOVED***1:\"path/to/file.dump\"***REMOVED***, \"wb\") ***REMOVED*** |$***REMOVED***2:file***REMOVED***| Marshal.dump($***REMOVED***3:obj***REMOVED***, $2) ***REMOVED***$***REMOVED***4***REMOVED***\n\
# Mashal.load(obj)\n\
snippet Ml\n\
	File.open($***REMOVED***1:\"path/to/file.dump\"***REMOVED***, \"rb\") ***REMOVED*** |$***REMOVED***2:file***REMOVED***| Marshal.load($2) ***REMOVED***$***REMOVED***3***REMOVED***\n\
# deep_copy(..)\n\
snippet deec\n\
	Marshal.load(Marshal.dump($***REMOVED***1:obj_to_copy***REMOVED***))$***REMOVED***2***REMOVED***\n\
snippet Pn-\n\
	PStore.new($***REMOVED***1:\"file_name.pstore\"***REMOVED***)$***REMOVED***2***REMOVED***\n\
snippet tra\n\
	transaction($***REMOVED***1:true***REMOVED***) ***REMOVED*** $***REMOVED***2***REMOVED*** ***REMOVED***\n\
# xmlread(..)\n\
snippet xml-\n\
	REXML::Document.new(File.read($***REMOVED***1:\"path/to/file\"***REMOVED***))$***REMOVED***2***REMOVED***\n\
# xpath(..) ***REMOVED*** .. ***REMOVED***\n\
snippet xpa\n\
	elements.each($***REMOVED***1:\"//Xpath\"***REMOVED***) do |$***REMOVED***2:node***REMOVED***|\n\
		$***REMOVED***3***REMOVED***\n\
	end\n\
# class_from_name()\n\
snippet clafn\n\
	split(\"::\").inject(Object) ***REMOVED*** |par, const| par.const_get(const) ***REMOVED***\n\
# singleton_class()\n\
snippet sinc\n\
	class << self; self end\n\
snippet nam\n\
	namespace :$***REMOVED***1:`Filename()`***REMOVED*** do\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet tas\n\
	desc \"$***REMOVED***1:Task description***REMOVED***\"\n\
	task :$***REMOVED***2:task_name => [:dependent, :tasks]***REMOVED*** do\n\
		$***REMOVED***3***REMOVED***\n\
	end\n\
# block\n\
snippet b\n\
	***REMOVED*** |$***REMOVED***1:var***REMOVED***| $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet begin\n\
	begin\n\
		raise 'A test exception.'\n\
	rescue Exception => e\n\
		puts e.message\n\
		puts e.backtrace.inspect\n\
	else\n\
		# other exception\n\
	ensure\n\
		# always executed\n\
	end\n\
\n\
#debugging\n\
snippet debug\n\
	require 'ruby-debug'; debugger; true;\n\
snippet pry\n\
	require 'pry'; binding.pry\n\
\n\
#############################################\n\
# Rails snippets - for pure Ruby, see above #\n\
#############################################\n\
snippet art\n\
	assert_redirected_to $***REMOVED***1::action => \"$***REMOVED***2:index***REMOVED***\"***REMOVED***\n\
snippet artnp\n\
	assert_redirected_to $***REMOVED***1:parent***REMOVED***_$***REMOVED***2:child***REMOVED***_path($***REMOVED***3:@$1***REMOVED***, $***REMOVED***4:@$2***REMOVED***)\n\
snippet artnpp\n\
	assert_redirected_to $***REMOVED***1:parent***REMOVED***_$***REMOVED***2:child***REMOVED***_path($***REMOVED***3:@$1***REMOVED***)\n\
snippet artp\n\
	assert_redirected_to $***REMOVED***1:model***REMOVED***_path($***REMOVED***2:@$1***REMOVED***)\n\
snippet artpp\n\
	assert_redirected_to $***REMOVED***1:model***REMOVED***s_path\n\
snippet asd\n\
	assert_difference \"$***REMOVED***1:Model***REMOVED***.$***REMOVED***2:count***REMOVED***\", $1 do\n\
		$***REMOVED***3***REMOVED***\n\
	end\n\
snippet asnd\n\
	assert_no_difference \"$***REMOVED***1:Model***REMOVED***.$***REMOVED***2:count***REMOVED***\" do\n\
		$***REMOVED***3***REMOVED***\n\
	end\n\
snippet asre\n\
	assert_response :$***REMOVED***1:success***REMOVED***, @response.body$***REMOVED***2***REMOVED***\n\
snippet asrj\n\
	assert_rjs :$***REMOVED***1:replace***REMOVED***, \"$***REMOVED***2:dom id***REMOVED***\"\n\
snippet ass assert_select(..)\n\
	assert_select '$***REMOVED***1:path***REMOVED***', :$***REMOVED***2:text***REMOVED*** => '$***REMOVED***3:inner_html' $***REMOVED***4:do***REMOVED***\n\
snippet bf\n\
	before_filter :$***REMOVED***1:method***REMOVED***\n\
snippet bt\n\
	belongs_to :$***REMOVED***1:association***REMOVED***\n\
snippet crw\n\
	cattr_accessor :$***REMOVED***1:attr_names***REMOVED***\n\
snippet defcreate\n\
	def create\n\
		@$***REMOVED***1:model_class_name***REMOVED*** = $***REMOVED***2:ModelClassName***REMOVED***.new(params[:$1])\n\
\n\
		respond_to do |wants|\n\
			if @$1.save\n\
				flash[:notice] = '$2 was successfully created.'\n\
				wants.html ***REMOVED*** redirect_to(@$1) ***REMOVED***\n\
				wants.xml  ***REMOVED*** render :xml => @$1, :status => :created, :location => @$1 ***REMOVED***\n\
			else\n\
				wants.html ***REMOVED*** render :action => \"new\" ***REMOVED***\n\
				wants.xml  ***REMOVED*** render :xml => @$1.errors, :status => :unprocessable_entity ***REMOVED***\n\
			end\n\
		end\n\
	end$***REMOVED***3***REMOVED***\n\
snippet defdestroy\n\
	def destroy\n\
		@$***REMOVED***1:model_class_name***REMOVED*** = $***REMOVED***2:ModelClassName***REMOVED***.find(params[:id])\n\
		@$1.destroy\n\
\n\
		respond_to do |wants|\n\
			wants.html ***REMOVED*** redirect_to($1s_url) ***REMOVED***\n\
			wants.xml  ***REMOVED*** head :ok ***REMOVED***\n\
		end\n\
	end$***REMOVED***3***REMOVED***\n\
snippet defedit\n\
	def edit\n\
		@$***REMOVED***1:model_class_name***REMOVED*** = $***REMOVED***2:ModelClassName***REMOVED***.find(params[:id])\n\
	end\n\
snippet defindex\n\
	def index\n\
		@$***REMOVED***1:model_class_name***REMOVED*** = $***REMOVED***2:ModelClassName***REMOVED***.all\n\
\n\
		respond_to do |wants|\n\
			wants.html # index.html.erb\n\
			wants.xml  ***REMOVED*** render :xml => @$1s ***REMOVED***\n\
		end\n\
	end$***REMOVED***3***REMOVED***\n\
snippet defnew\n\
	def new\n\
		@$***REMOVED***1:model_class_name***REMOVED*** = $***REMOVED***2:ModelClassName***REMOVED***.new\n\
\n\
		respond_to do |wants|\n\
			wants.html # new.html.erb\n\
			wants.xml  ***REMOVED*** render :xml => @$1 ***REMOVED***\n\
		end\n\
	end$***REMOVED***3***REMOVED***\n\
snippet defshow\n\
	def show\n\
		@$***REMOVED***1:model_class_name***REMOVED*** = $***REMOVED***2:ModelClassName***REMOVED***.find(params[:id])\n\
\n\
		respond_to do |wants|\n\
			wants.html # show.html.erb\n\
			wants.xml  ***REMOVED*** render :xml => @$1 ***REMOVED***\n\
		end\n\
	end$***REMOVED***3***REMOVED***\n\
snippet defupdate\n\
	def update\n\
		@$***REMOVED***1:model_class_name***REMOVED*** = $***REMOVED***2:ModelClassName***REMOVED***.find(params[:id])\n\
\n\
		respond_to do |wants|\n\
			if @$1.update_attributes(params[:$1])\n\
				flash[:notice] = '$2 was successfully updated.'\n\
				wants.html ***REMOVED*** redirect_to(@$1) ***REMOVED***\n\
				wants.xml  ***REMOVED*** head :ok ***REMOVED***\n\
			else\n\
				wants.html ***REMOVED*** render :action => \"edit\" ***REMOVED***\n\
				wants.xml  ***REMOVED*** render :xml => @$1.errors, :status => :unprocessable_entity ***REMOVED***\n\
			end\n\
		end\n\
	end$***REMOVED***3***REMOVED***\n\
snippet flash\n\
	flash[:$***REMOVED***1:notice***REMOVED***] = \"$***REMOVED***2***REMOVED***\"\n\
snippet habtm\n\
	has_and_belongs_to_many :$***REMOVED***1:object***REMOVED***, :join_table => \"$***REMOVED***2:table_name***REMOVED***\", :foreign_key => \"$***REMOVED***3***REMOVED***_id\"$***REMOVED***4***REMOVED***\n\
snippet hm\n\
	has_many :$***REMOVED***1:object***REMOVED***\n\
snippet hmd\n\
	has_many :$***REMOVED***1:other***REMOVED***s, :class_name => \"$***REMOVED***2:$1***REMOVED***\", :foreign_key => \"$***REMOVED***3:$1***REMOVED***_id\", :dependent => :destroy$***REMOVED***4***REMOVED***\n\
snippet hmt\n\
	has_many :$***REMOVED***1:object***REMOVED***, :through => :$***REMOVED***2:object***REMOVED***\n\
snippet ho\n\
	has_one :$***REMOVED***1:object***REMOVED***\n\
snippet i18\n\
	I18n.t('$***REMOVED***1:type.key***REMOVED***')$***REMOVED***2***REMOVED***\n\
snippet ist\n\
	<%= image_submit_tag(\"$***REMOVED***1:agree.png***REMOVED***\", :id => \"$***REMOVED***2:id***REMOVED***\"$***REMOVED***3***REMOVED*** %>\n\
snippet log\n\
	Rails.logger.$***REMOVED***1:debug***REMOVED*** $***REMOVED***2***REMOVED***\n\
snippet log2\n\
	RAILS_DEFAULT_LOGGER.$***REMOVED***1:debug***REMOVED*** $***REMOVED***2***REMOVED***\n\
snippet logd\n\
	logger.debug ***REMOVED*** \"$***REMOVED***1:message***REMOVED***\" ***REMOVED***$***REMOVED***2***REMOVED***\n\
snippet loge\n\
	logger.error ***REMOVED*** \"$***REMOVED***1:message***REMOVED***\" ***REMOVED***$***REMOVED***2***REMOVED***\n\
snippet logf\n\
	logger.fatal ***REMOVED*** \"$***REMOVED***1:message***REMOVED***\" ***REMOVED***$***REMOVED***2***REMOVED***\n\
snippet logi\n\
	logger.info ***REMOVED*** \"$***REMOVED***1:message***REMOVED***\" ***REMOVED***$***REMOVED***2***REMOVED***\n\
snippet logw\n\
	logger.warn ***REMOVED*** \"$***REMOVED***1:message***REMOVED***\" ***REMOVED***$***REMOVED***2***REMOVED***\n\
snippet mapc\n\
	$***REMOVED***1:map***REMOVED***.$***REMOVED***2:connect***REMOVED*** '$***REMOVED***3:controller/:action/:id***REMOVED***'\n\
snippet mapca\n\
	$***REMOVED***1:map***REMOVED***.catch_all \"*$***REMOVED***2:anything***REMOVED***\", :controller => \"$***REMOVED***3:default***REMOVED***\", :action => \"$***REMOVED***4:error***REMOVED***\"$***REMOVED***5***REMOVED***\n\
snippet mapr\n\
	$***REMOVED***1:map***REMOVED***.resource :$***REMOVED***2:resource***REMOVED***\n\
snippet maprs\n\
	$***REMOVED***1:map***REMOVED***.resources :$***REMOVED***2:resource***REMOVED***\n\
snippet mapwo\n\
	$***REMOVED***1:map***REMOVED***.with_options :$***REMOVED***2:controller***REMOVED*** => '$***REMOVED***3:thing***REMOVED***' do |$3|\n\
		$***REMOVED***4***REMOVED***\n\
	end\n\
snippet mbs\n\
	before_save :$***REMOVED***1:method***REMOVED***\n\
snippet mcht\n\
	change_table :$***REMOVED***1:table_name***REMOVED*** do |t|\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet mp\n\
	map(&:$***REMOVED***1:id***REMOVED***)\n\
snippet mrw\n\
	mattr_accessor :$***REMOVED***1:attr_names***REMOVED***\n\
snippet oa\n\
	order(\"$***REMOVED***1:field***REMOVED***\")\n\
snippet od\n\
	order(\"$***REMOVED***1:field***REMOVED*** DESC\")\n\
snippet pa\n\
	params[:$***REMOVED***1:id***REMOVED***]$***REMOVED***2***REMOVED***\n\
snippet ra\n\
	render :action => \"$***REMOVED***1:action***REMOVED***\"\n\
snippet ral\n\
	render :action => \"$***REMOVED***1:action***REMOVED***\", :layout => \"$***REMOVED***2:layoutname***REMOVED***\"\n\
snippet rest\n\
	respond_to do |wants|\n\
		wants.$***REMOVED***1:html***REMOVED*** ***REMOVED*** $***REMOVED***2***REMOVED*** ***REMOVED***\n\
	end\n\
snippet rf\n\
	render :file => \"$***REMOVED***1:filepath***REMOVED***\"\n\
snippet rfu\n\
	render :file => \"$***REMOVED***1:filepath***REMOVED***\", :use_full_path => $***REMOVED***2:false***REMOVED***\n\
snippet ri\n\
	render :inline => \"$***REMOVED***1:<%= 'hello' %>***REMOVED***\"\n\
snippet ril\n\
	render :inline => \"$***REMOVED***1:<%= 'hello' %>***REMOVED***\", :locals => ***REMOVED*** $***REMOVED***2::name***REMOVED*** => \"$***REMOVED***3:value***REMOVED***\"$***REMOVED***4***REMOVED*** ***REMOVED***\n\
snippet rit\n\
	render :inline => \"$***REMOVED***1:<%= 'hello' %>***REMOVED***\", :type => $***REMOVED***2::rxml***REMOVED***\n\
snippet rjson\n\
	render :json => $***REMOVED***1:text to render***REMOVED***\n\
snippet rl\n\
	render :layout => \"$***REMOVED***1:layoutname***REMOVED***\"\n\
snippet rn\n\
	render :nothing => $***REMOVED***1:true***REMOVED***\n\
snippet rns\n\
	render :nothing => $***REMOVED***1:true***REMOVED***, :status => $***REMOVED***2:401***REMOVED***\n\
snippet rp\n\
	render :partial => \"$***REMOVED***1:item***REMOVED***\"\n\
snippet rpc\n\
	render :partial => \"$***REMOVED***1:item***REMOVED***\", :collection => $***REMOVED***2:@$1s***REMOVED***\n\
snippet rpl\n\
	render :partial => \"$***REMOVED***1:item***REMOVED***\", :locals => ***REMOVED*** :$***REMOVED***2:$1***REMOVED*** => $***REMOVED***3:@$1***REMOVED***\n\
snippet rpo\n\
	render :partial => \"$***REMOVED***1:item***REMOVED***\", :object => $***REMOVED***2:@$1***REMOVED***\n\
snippet rps\n\
	render :partial => \"$***REMOVED***1:item***REMOVED***\", :status => $***REMOVED***2:500***REMOVED***\n\
snippet rt\n\
	render :text => \"$***REMOVED***1:text to render***REMOVED***\"\n\
snippet rtl\n\
	render :text => \"$***REMOVED***1:text to render***REMOVED***\", :layout => \"$***REMOVED***2:layoutname***REMOVED***\"\n\
snippet rtlt\n\
	render :text => \"$***REMOVED***1:text to render***REMOVED***\", :layout => $***REMOVED***2:true***REMOVED***\n\
snippet rts\n\
	render :text => \"$***REMOVED***1:text to render***REMOVED***\", :status => $***REMOVED***2:401***REMOVED***\n\
snippet ru\n\
	render :update do |$***REMOVED***1:page***REMOVED***|\n\
		$1.$***REMOVED***2***REMOVED***\n\
	end\n\
snippet rxml\n\
	render :xml => $***REMOVED***1:text to render***REMOVED***\n\
snippet sc\n\
	scope :$***REMOVED***1:name***REMOVED***, :where(:@$***REMOVED***2:field***REMOVED*** => $***REMOVED***3:value***REMOVED***)\n\
snippet sl\n\
	scope :$***REMOVED***1:name***REMOVED***, lambda do |$***REMOVED***2:value***REMOVED***|\n\
		where(\"$***REMOVED***3:field = ?***REMOVED***\", $***REMOVED***4:bind var***REMOVED***)\n\
	end\n\
snippet sha1\n\
	Digest::SHA1.hexdigest($***REMOVED***1:string***REMOVED***)\n\
snippet sweeper\n\
	class $***REMOVED***1:ModelClassName***REMOVED***Sweeper < ActionController::Caching::Sweeper\n\
		observe $1\n\
\n\
		def after_save($***REMOVED***2:model_class_name***REMOVED***)\n\
			expire_cache($2)\n\
		end\n\
\n\
		def after_destroy($2)\n\
			expire_cache($2)\n\
		end\n\
\n\
		def expire_cache($2)\n\
			expire_page\n\
		end\n\
	end\n\
snippet tcb\n\
	t.boolean :$***REMOVED***1:title***REMOVED***\n\
	$***REMOVED***2***REMOVED***\n\
snippet tcbi\n\
	t.binary :$***REMOVED***1:title***REMOVED***, :limit => $***REMOVED***2:2***REMOVED***.megabytes\n\
	$***REMOVED***3***REMOVED***\n\
snippet tcd\n\
	t.decimal :$***REMOVED***1:title***REMOVED***, :precision => $***REMOVED***2:10***REMOVED***, :scale => $***REMOVED***3:2***REMOVED***\n\
	$***REMOVED***4***REMOVED***\n\
snippet tcda\n\
	t.date :$***REMOVED***1:title***REMOVED***\n\
	$***REMOVED***2***REMOVED***\n\
snippet tcdt\n\
	t.datetime :$***REMOVED***1:title***REMOVED***\n\
	$***REMOVED***2***REMOVED***\n\
snippet tcf\n\
	t.float :$***REMOVED***1:title***REMOVED***\n\
	$***REMOVED***2***REMOVED***\n\
snippet tch\n\
	t.change :$***REMOVED***1:name***REMOVED***, :$***REMOVED***2:string***REMOVED***, :$***REMOVED***3:limit***REMOVED*** => $***REMOVED***4:80***REMOVED***\n\
	$***REMOVED***5***REMOVED***\n\
snippet tci\n\
	t.integer :$***REMOVED***1:title***REMOVED***\n\
	$***REMOVED***2***REMOVED***\n\
snippet tcl\n\
	t.integer :lock_version, :null => false, :default => 0\n\
	$***REMOVED***1***REMOVED***\n\
snippet tcr\n\
	t.references :$***REMOVED***1:taggable***REMOVED***, :polymorphic => ***REMOVED*** :default => '$***REMOVED***2:Photo***REMOVED***' ***REMOVED***\n\
	$***REMOVED***3***REMOVED***\n\
snippet tcs\n\
	t.string :$***REMOVED***1:title***REMOVED***\n\
	$***REMOVED***2***REMOVED***\n\
snippet tct\n\
	t.text :$***REMOVED***1:title***REMOVED***\n\
	$***REMOVED***2***REMOVED***\n\
snippet tcti\n\
	t.time :$***REMOVED***1:title***REMOVED***\n\
	$***REMOVED***2***REMOVED***\n\
snippet tcts\n\
	t.timestamp :$***REMOVED***1:title***REMOVED***\n\
	$***REMOVED***2***REMOVED***\n\
snippet tctss\n\
	t.timestamps\n\
	$***REMOVED***1***REMOVED***\n\
snippet va\n\
	validates_associated :$***REMOVED***1:attribute***REMOVED***\n\
snippet vao\n\
	validates_acceptance_of :$***REMOVED***1:terms***REMOVED***\n\
snippet vc\n\
	validates_confirmation_of :$***REMOVED***1:attribute***REMOVED***\n\
snippet ve\n\
	validates_exclusion_of :$***REMOVED***1:attribute***REMOVED***, :in => $***REMOVED***2:%w( mov avi )***REMOVED***\n\
snippet vf\n\
	validates_format_of :$***REMOVED***1:attribute***REMOVED***, :with => /$***REMOVED***2:regex***REMOVED***/\n\
snippet vi\n\
	validates_inclusion_of :$***REMOVED***1:attribute***REMOVED***, :in => %w($***REMOVED***2: mov avi ***REMOVED***)\n\
snippet vl\n\
	validates_length_of :$***REMOVED***1:attribute***REMOVED***, :within => $***REMOVED***2:3***REMOVED***..$***REMOVED***3:20***REMOVED***\n\
snippet vn\n\
	validates_numericality_of :$***REMOVED***1:attribute***REMOVED***\n\
snippet vpo\n\
	validates_presence_of :$***REMOVED***1:attribute***REMOVED***\n\
snippet vu\n\
	validates_uniqueness_of :$***REMOVED***1:attribute***REMOVED***\n\
snippet wants\n\
	wants.$***REMOVED***1:js|xml|html***REMOVED*** ***REMOVED*** $***REMOVED***2***REMOVED*** ***REMOVED***\n\
snippet wc\n\
	where($***REMOVED***1:\"conditions\"***REMOVED***$***REMOVED***2:, bind_var***REMOVED***)\n\
snippet wh\n\
	where($***REMOVED***1:field***REMOVED*** => $***REMOVED***2:value***REMOVED***)\n\
snippet xdelete\n\
	xhr :delete, :$***REMOVED***1:destroy***REMOVED***, :id => $***REMOVED***2:1***REMOVED***$***REMOVED***3***REMOVED***\n\
snippet xget\n\
	xhr :get, :$***REMOVED***1:show***REMOVED***, :id => $***REMOVED***2:1***REMOVED***$***REMOVED***3***REMOVED***\n\
snippet xpost\n\
	xhr :post, :$***REMOVED***1:create***REMOVED***, :$***REMOVED***2:object***REMOVED*** => ***REMOVED*** $***REMOVED***3***REMOVED*** ***REMOVED***\n\
snippet xput\n\
	xhr :put, :$***REMOVED***1:update***REMOVED***, :id => $***REMOVED***2:1***REMOVED***, :$***REMOVED***3:object***REMOVED*** => ***REMOVED*** $***REMOVED***4***REMOVED*** ***REMOVED***$***REMOVED***5***REMOVED***\n\
snippet test\n\
	test \"should $***REMOVED***1:do something***REMOVED***\" do\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
#migrations\n\
snippet mac\n\
	add_column :$***REMOVED***1:table_name***REMOVED***, :$***REMOVED***2:column_name***REMOVED***, :$***REMOVED***3:data_type***REMOVED***\n\
snippet mrc\n\
	remove_column :$***REMOVED***1:table_name***REMOVED***, :$***REMOVED***2:column_name***REMOVED***\n\
snippet mrnc\n\
	rename_column :$***REMOVED***1:table_name***REMOVED***, :$***REMOVED***2:old_column_name***REMOVED***, :$***REMOVED***3:new_column_name***REMOVED***\n\
snippet mcc\n\
	change_column :$***REMOVED***1:table***REMOVED***, :$***REMOVED***2:column***REMOVED***, :$***REMOVED***3:type***REMOVED***\n\
snippet mccc\n\
	t.column :$***REMOVED***1:title***REMOVED***, :$***REMOVED***2:string***REMOVED***\n\
snippet mct\n\
	create_table :$***REMOVED***1:table_name***REMOVED*** do |t|\n\
		t.column :$***REMOVED***2:name***REMOVED***, :$***REMOVED***3:type***REMOVED***\n\
	end\n\
snippet migration\n\
	class $***REMOVED***1:class_name***REMOVED*** < ActiveRecord::Migration\n\
		def self.up\n\
			$***REMOVED***2***REMOVED***\n\
		end\n\
\n\
		def self.down\n\
		end\n\
	end\n\
\n\
snippet trc\n\
	t.remove :$***REMOVED***1:column***REMOVED***\n\
snippet tre\n\
	t.rename :$***REMOVED***1:old_column_name***REMOVED***, :$***REMOVED***2:new_column_name***REMOVED***\n\
	$***REMOVED***3***REMOVED***\n\
snippet tref\n\
	t.references :$***REMOVED***1:model***REMOVED***\n\
\n\
#rspec\n\
snippet it\n\
	it \"$***REMOVED***1:spec_name***REMOVED***\" do\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet itp\n\
	it \"$***REMOVED***1:spec_name***REMOVED***\"\n\
	$***REMOVED***2***REMOVED***\n\
snippet desc\n\
	describe $***REMOVED***1:class_name***REMOVED*** do\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet cont\n\
	context \"$***REMOVED***1:message***REMOVED***\" do\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet bef\n\
	before :$***REMOVED***1:each***REMOVED*** do\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
snippet aft\n\
	after :$***REMOVED***1:each***REMOVED*** do\n\
		$***REMOVED***2***REMOVED***\n\
	end\n\
";
exports.scope = "ruby";

***REMOVED***);
