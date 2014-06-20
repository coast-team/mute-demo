<?php

function nfact($n) ***REMOVED***
    if ($n == 0) ***REMOVED***
        return 1;
***REMOVED***
    else ***REMOVED***
        return $n * nfact($n - 1);
***REMOVED***
***REMOVED***

echo "\n\nPlease enter a whole number ... ";
$num = trim(fgets(STDIN));

// ===== PROCESS - Determing the factorial of the input number =====
$output = "\n\nFactorial " . $num . " = " . nfact($num) . "\n\n";
echo $output;

?>