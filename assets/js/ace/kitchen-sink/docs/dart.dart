// Go ahead and modify this example.

import "dart:html";

// Computes the nth Fibonacci number.
int fibonacci(int n) ***REMOVED***
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
***REMOVED***

// Displays a Fibonacci number.
void main() ***REMOVED***
  int i = 20;
  String message = "fibonacci($i) = $***REMOVED***fibonacci(i)***REMOVED***";

  // This example uses HTML to display the result and it will appear
  // in a nested HTML frame (an iframe).
  document.body.append(new HeadingElement.h1()..appendText(message));
***REMOVED***
