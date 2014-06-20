// Concurrent computation of pi.
// See http://goo.gl/ZuTZM.
//
// This demonstrates Go's ability to handle
// large numbers of concurrent processes.
// It is an unreasonable way to calculate pi.
package main

import (
    "fmt"
    "math"
)

func main() ***REMOVED***
    fmt.Println(pi(5000))
***REMOVED***

// pi launches n goroutines to compute an
// approximation of pi.
func pi(n int) float64 ***REMOVED***
    ch := make(chan float64)
    for k := 0; k <= n; k++ ***REMOVED***
        go term(ch, float64(k))
***REMOVED***
    f := 0.0
    for k := 0; k <= n; k++ ***REMOVED***
        f += <-ch
***REMOVED***
    return f
***REMOVED***

func term(ch chan float64, k float64) ***REMOVED***
    ch <- 4 * math.Pow(-1, k) / (2*k + 1)
***REMOVED***
