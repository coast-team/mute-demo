# This is a simple comment
function Hello($name) ***REMOVED***
  Write-host "Hello $name"
***REMOVED***

function add($left, $right=4) ***REMOVED***
    if ($right -ne 4) ***REMOVED***
        return $left
***REMOVED*** elseif ($left -eq $null -and $right -eq 2) ***REMOVED***
        return 3
***REMOVED*** else ***REMOVED***
        return 2
***REMOVED***
***REMOVED***

$number = 1 + 2;
$number += 3

Write-Host Hello -name "World"

$an_array = @(1, 2, 3)
$a_hash = @***REMOVED***"something" = "something else"***REMOVED***

& notepad .\readme.md
