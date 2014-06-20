
proc dijkstra ***REMOVED***graph origin***REMOVED*** ***REMOVED***
    # Initialize
    dict for ***REMOVED***vertex distmap***REMOVED*** $graph ***REMOVED***
	dict set dist $vertex Inf
	dict set path $vertex ***REMOVED******REMOVED***
***REMOVED***
    dict set dist $origin 0
    dict set path $origin [list $origin]
 
    while ***REMOVED***[dict size $graph]***REMOVED*** ***REMOVED***
	# Find unhandled node with least weight
	set d Inf
	dict for ***REMOVED***uu -***REMOVED*** $graph ***REMOVED***
	    if ***REMOVED***$d > [set dd [dict get $dist $uu]]***REMOVED*** ***REMOVED***
		set u $uu
		set d $dd
	***REMOVED***
	***REMOVED***
 
	# No such node; graph must be disconnected
	if ***REMOVED***$d == Inf***REMOVED*** break
 
	# Update the weights for nodes\
	 lead to by the node we've picked
	dict for ***REMOVED***v dd***REMOVED*** [dict get $graph $u] ***REMOVED***
	    if ***REMOVED***[dict exists $graph $v]***REMOVED*** ***REMOVED***
		set alt [expr ***REMOVED***$d + $dd***REMOVED***]
		if ***REMOVED***$alt < [dict get $dist $v]***REMOVED*** ***REMOVED***
		    dict set dist $v $alt
		    dict set path $v [list ***REMOVED*******REMOVED***[dict get $path $u] $v]
		***REMOVED***
	***REMOVED***
	***REMOVED***
 
	# Remove chosen node from graph still to be handled
	dict unset graph $u
***REMOVED***
    return [list $dist $path]
***REMOVED***