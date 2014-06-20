define('ace/snippets/perl', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "# #!/usr/bin/perl\n\
snippet #!\n\
	#!/usr/bin/env perl\n\
\n\
# Hash Pointer\n\
snippet .\n\
	 =>\n\
# Function\n\
snippet sub\n\
	sub $***REMOVED***1:function_name***REMOVED*** ***REMOVED***\n\
		$***REMOVED***2:#body ...***REMOVED***\n\
	***REMOVED***\n\
# Conditional\n\
snippet if\n\
	if ($***REMOVED***1***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2:# body...***REMOVED***\n\
	***REMOVED***\n\
# Conditional if..else\n\
snippet ife\n\
	if ($***REMOVED***1***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2:# body...***REMOVED***\n\
	***REMOVED***\n\
	else ***REMOVED***\n\
		$***REMOVED***3:# else...***REMOVED***\n\
	***REMOVED***\n\
# Conditional if..elsif..else\n\
snippet ifee\n\
	if ($***REMOVED***1***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2:# body...***REMOVED***\n\
	***REMOVED***\n\
	elsif ($***REMOVED***3***REMOVED***) ***REMOVED***\n\
		$***REMOVED***4:# elsif...***REMOVED***\n\
	***REMOVED***\n\
	else ***REMOVED***\n\
		$***REMOVED***5:# else...***REMOVED***\n\
	***REMOVED***\n\
# Conditional One-line\n\
snippet xif\n\
	$***REMOVED***1:expression***REMOVED*** if $***REMOVED***2:condition***REMOVED***;$***REMOVED***3***REMOVED***\n\
# Unless conditional\n\
snippet unless\n\
	unless ($***REMOVED***1***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2:# body...***REMOVED***\n\
	***REMOVED***\n\
# Unless conditional One-line\n\
snippet xunless\n\
	$***REMOVED***1:expression***REMOVED*** unless $***REMOVED***2:condition***REMOVED***;$***REMOVED***3***REMOVED***\n\
# Try/Except\n\
snippet eval\n\
	local $@;\n\
	eval ***REMOVED***\n\
		$***REMOVED***1:# do something risky...***REMOVED***\n\
	***REMOVED***;\n\
	if (my $e = $@) ***REMOVED***\n\
		$***REMOVED***2:# handle failure...***REMOVED***\n\
	***REMOVED***\n\
# While Loop\n\
snippet wh\n\
	while ($***REMOVED***1***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2:# body...***REMOVED***\n\
	***REMOVED***\n\
# While Loop One-line\n\
snippet xwh\n\
	$***REMOVED***1:expression***REMOVED*** while $***REMOVED***2:condition***REMOVED***;$***REMOVED***3***REMOVED***\n\
# C-style For Loop\n\
snippet cfor\n\
	for (my $$***REMOVED***2:var***REMOVED*** = 0; $$2 < $***REMOVED***1:count***REMOVED***; $$2$***REMOVED***3:++***REMOVED***) ***REMOVED***\n\
		$***REMOVED***4:# body...***REMOVED***\n\
	***REMOVED***\n\
# For loop one-line\n\
snippet xfor\n\
	$***REMOVED***1:expression***REMOVED*** for @$***REMOVED***2:array***REMOVED***;$***REMOVED***3***REMOVED***\n\
# Foreach Loop\n\
snippet for\n\
	foreach my $$***REMOVED***1:x***REMOVED*** (@$***REMOVED***2:array***REMOVED***) ***REMOVED***\n\
		$***REMOVED***3:# body...***REMOVED***\n\
	***REMOVED***\n\
# Foreach Loop One-line\n\
snippet fore\n\
	$***REMOVED***1:expression***REMOVED*** foreach @$***REMOVED***2:array***REMOVED***;$***REMOVED***3***REMOVED***\n\
# Package\n\
snippet package\n\
	package $***REMOVED***1:`substitute(Filename('', 'Page Title'), '^.', '\\u&', '')`***REMOVED***;\n\
\n\
	$***REMOVED***2***REMOVED***\n\
\n\
	1;\n\
\n\
	__END__\n\
# Package syntax perl >= 5.14\n\
snippet packagev514\n\
	package $***REMOVED***1:`substitute(Filename('', 'Page Title'), '^.', '\\u&', '')`***REMOVED*** $***REMOVED***2:0.99***REMOVED***;\n\
\n\
	$***REMOVED***3***REMOVED***\n\
\n\
	1;\n\
\n\
	__END__\n\
#moose\n\
snippet moose\n\
	use Moose;\n\
	use namespace::autoclean;\n\
	$***REMOVED***1:#***REMOVED***BEGIN ***REMOVED***extends '$***REMOVED***2:ParentClass***REMOVED***'***REMOVED***;\n\
\n\
	$***REMOVED***3***REMOVED***\n\
# parent\n\
snippet parent\n\
	use parent qw($***REMOVED***1:Parent Class***REMOVED***);\n\
# Read File\n\
snippet slurp\n\
	my $$***REMOVED***1:var***REMOVED*** = do ***REMOVED*** local $/; open my $file, '<', \"$***REMOVED***2:file***REMOVED***\"; <$file> ***REMOVED***;\n\
	$***REMOVED***3***REMOVED***\n\
# strict warnings\n\
snippet strwar\n\
	use strict;\n\
	use warnings;\n\
# older versioning with perlcritic bypass\n\
snippet vers\n\
	## no critic\n\
	our $VERSION = '$***REMOVED***1:version***REMOVED***';\n\
	eval $VERSION;\n\
	## use critic\n\
# new 'switch' like feature\n\
snippet switch\n\
	use feature 'switch';\n\
\n\
# Anonymous subroutine\n\
snippet asub\n\
	sub ***REMOVED***\n\
	 	$***REMOVED***1:# body ***REMOVED***\n\
	***REMOVED***\n\
\n\
\n\
\n\
# Begin block\n\
snippet begin\n\
	BEGIN ***REMOVED***\n\
		$***REMOVED***1:# begin body***REMOVED***\n\
	***REMOVED***\n\
\n\
# call package function with some parameter\n\
snippet pkgmv\n\
	__PACKAGE__->$***REMOVED***1:package_method***REMOVED***($***REMOVED***2:var***REMOVED***)\n\
\n\
# call package function without a parameter\n\
snippet pkgm\n\
	__PACKAGE__->$***REMOVED***1:package_method***REMOVED***()\n\
\n\
# call package \"get_\" function without a parameter\n\
snippet pkget\n\
	__PACKAGE__->get_$***REMOVED***1:package_method***REMOVED***()\n\
\n\
# call package function with a parameter\n\
snippet pkgetv\n\
	__PACKAGE__->get_$***REMOVED***1:package_method***REMOVED***($***REMOVED***2:var***REMOVED***)\n\
\n\
# complex regex\n\
snippet qrx\n\
	qr/\n\
	     $***REMOVED***1:regex***REMOVED***\n\
	/xms\n\
\n\
#simpler regex\n\
snippet qr/\n\
	qr/$***REMOVED***1:regex***REMOVED***/x\n\
\n\
#given\n\
snippet given\n\
	given ($$***REMOVED***1:var***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2:# cases***REMOVED***\n\
		$***REMOVED***3:# default***REMOVED***\n\
	***REMOVED***\n\
\n\
# switch-like case\n\
snippet when\n\
	when ($***REMOVED***1:case***REMOVED***) ***REMOVED***\n\
		$***REMOVED***2:# body***REMOVED***\n\
	***REMOVED***\n\
\n\
# hash slice\n\
snippet hslice\n\
	@***REMOVED*** $***REMOVED***1:hash***REMOVED***  ***REMOVED******REMOVED*** $***REMOVED***2:array***REMOVED*** ***REMOVED***\n\
\n\
\n\
# map\n\
snippet map\n\
	map ***REMOVED***  $***REMOVED***2: body ***REMOVED******REMOVED***  $***REMOVED***1: @array ***REMOVED*** ;\n\
\n\
\n\
\n\
# Pod stub\n\
snippet ppod\n\
	=head1 NAME\n\
\n\
	$***REMOVED***1:ClassName***REMOVED*** - $***REMOVED***2:ShortDesc***REMOVED***\n\
\n\
	=head1 SYNOPSIS\n\
\n\
	  use $1;\n\
\n\
	  $***REMOVED***3:# synopsis...***REMOVED***\n\
\n\
	=head1 DESCRIPTION\n\
\n\
	$***REMOVED***4:# longer description...***REMOVED***\n\
\n\
\n\
	=head1 INTERFACE\n\
\n\
\n\
	=head1 DEPENDENCIES\n\
\n\
\n\
	=head1 SEE ALSO\n\
\n\
\n\
# Heading for a subroutine stub\n\
snippet psub\n\
	=head2 $***REMOVED***1:MethodName***REMOVED***\n\
\n\
	$***REMOVED***2:Summary....***REMOVED***\n\
\n\
# Heading for inline subroutine pod\n\
snippet psubi\n\
	=head2 $***REMOVED***1:MethodName***REMOVED***\n\
\n\
	$***REMOVED***2:Summary...***REMOVED***\n\
\n\
\n\
	=cut\n\
# inline documented subroutine\n\
snippet subpod\n\
	=head2 $1\n\
\n\
	Summary of $1\n\
\n\
	=cut\n\
\n\
	sub $***REMOVED***1:subroutine_name***REMOVED*** ***REMOVED***\n\
		$***REMOVED***2:# body...***REMOVED***\n\
	***REMOVED***\n\
# Subroutine signature\n\
snippet parg\n\
	=over 2\n\
\n\
	=item\n\
	Arguments\n\
\n\
\n\
	=over 3\n\
\n\
	=item\n\
	C<$***REMOVED***1:DataStructure***REMOVED***>\n\
\n\
	  $***REMOVED***2:Sample***REMOVED***\n\
\n\
\n\
	=back\n\
\n\
\n\
	=item\n\
	Return\n\
\n\
	=over 3\n\
\n\
\n\
	=item\n\
	C<$***REMOVED***3:...return data***REMOVED***>\n\
\n\
\n\
	=back\n\
\n\
\n\
	=back\n\
\n\
\n\
\n\
# Moose has\n\
snippet has\n\
	has $***REMOVED***1:attribute***REMOVED*** => (\n\
		is	    => '$***REMOVED***2:ro|rw***REMOVED***',\n\
		isa 	=> '$***REMOVED***3:Str|Int|HashRef|ArrayRef|etc***REMOVED***',\n\
		default => sub ***REMOVED***\n\
			$***REMOVED***4:defaultvalue***REMOVED***\n\
		***REMOVED***,\n\
		$***REMOVED***5:# other attributes***REMOVED***\n\
	);\n\
\n\
\n\
# override\n\
snippet override\n\
	override $***REMOVED***1:attribute***REMOVED*** => sub ***REMOVED***\n\
		$***REMOVED***2:# my $self = shift;***REMOVED***;\n\
		$***REMOVED***3:# my ($self, $args) = @_;***REMOVED***;\n\
	***REMOVED***;\n\
\n\
\n\
# use test classes\n\
snippet tuse\n\
	use Test::More;\n\
	use Test::Deep; # (); # uncomment to stop prototype errors\n\
	use Test::Exception;\n\
\n\
# local test lib\n\
snippet tlib\n\
	use lib qw***REMOVED*** ./t/lib ***REMOVED***;\n\
\n\
#test methods\n\
snippet tmeths\n\
	$ENV***REMOVED***TEST_METHOD***REMOVED*** = '$***REMOVED***1:regex***REMOVED***';\n\
\n\
# runtestclass\n\
snippet trunner\n\
	use $***REMOVED***1:test_class***REMOVED***;\n\
	$1->runtests();\n\
\n\
# Test::Class-style test\n\
snippet tsub\n\
	sub t$***REMOVED***1:number***REMOVED***_$***REMOVED***2:test_case***REMOVED*** :Test($***REMOVED***3:num_of_tests***REMOVED***) ***REMOVED***\n\
		my $self = shift;\n\
		$***REMOVED***4:#  body***REMOVED***\n\
\n\
	***REMOVED***\n\
\n\
# Test::Routine-style test\n\
snippet trsub\n\
	test $***REMOVED***1:test_name***REMOVED*** => ***REMOVED*** description => '$***REMOVED***2:Description of test.***REMOVED***'***REMOVED*** => sub ***REMOVED***\n\
		my ($self) = @_;\n\
		$***REMOVED***3:# test code***REMOVED***\n\
	***REMOVED***;\n\
\n\
#prep test method\n\
snippet tprep\n\
	sub prep$***REMOVED***1:number***REMOVED***_$***REMOVED***2:test_case***REMOVED*** :Test(startup) ***REMOVED***\n\
		my $self = shift;\n\
		$***REMOVED***4:#  body***REMOVED***\n\
	***REMOVED***\n\
\n\
# cause failures to print stack trace\n\
snippet debug_trace\n\
	use Carp; # 'verbose';\n\
	# cloak \"die\"\n\
	# warn \"warning\"\n\
	$SIG***REMOVED***'__DIE__'***REMOVED*** = sub ***REMOVED***\n\
		require Carp; Carp::confess\n\
	***REMOVED***;\n\
\n\
";
exports.scope = "perl";

***REMOVED***);
