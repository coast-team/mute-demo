#!/usr/bin/perl
=begin
 perl example code for Ace
=cut

use strict;
use warnings;
my $num_primes = 0;
my @primes;

# Put 2 as the first prime so we won't have an empty array
$primes[$num_primes] = 2;
$num_primes++;

MAIN_LOOP:
for my $number_to_check (3 .. 200)
***REMOVED***
    for my $p (0 .. ($num_primes-1))
    ***REMOVED***
        if ($number_to_check % $primes[$p] == 0)
        ***REMOVED***
            next MAIN_LOOP;
    ***REMOVED***
***REMOVED***

    # If we reached this point it means $number_to_check is not
    # divisable by any prime number that came before it.
    $primes[$num_primes] = $number_to_check;
    $num_primes++;
***REMOVED***

for my $p (0 .. ($num_primes-1))
***REMOVED***
    print $primes[$p], ", ";
***REMOVED***
print "\n";

