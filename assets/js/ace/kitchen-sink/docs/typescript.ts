class Greeter ***REMOVED***
	greeting: string;
	constructor (message: string) ***REMOVED***
		this.greeting = message;
	***REMOVED***
	greet() ***REMOVED***
		return "Hello, " + this.greeting;
	***REMOVED***
***REMOVED***   

var greeter = new Greeter("world");

var button = document.createElement('button')
button.innerText = "Say Hello"
button.onclick = function() ***REMOVED***
	alert(greeter.greet())
***REMOVED***

document.body.appendChild(button)

class Snake extends Animal ***REMOVED***
   move() ***REMOVED***
       alert("Slithering...");
       super(5);
   ***REMOVED***
***REMOVED***

class Horse extends Animal ***REMOVED***
   move() ***REMOVED***
       alert("Galloping...");
       super.move(45);
   ***REMOVED***
***REMOVED***

module Sayings ***REMOVED***
    export class Greeter ***REMOVED***
        greeting: string;
        constructor (message: string) ***REMOVED***
            this.greeting = message;
    ***REMOVED***
        greet() ***REMOVED***
            return "Hello, " + this.greeting;
    ***REMOVED***
***REMOVED***
***REMOVED***
module Mankala ***REMOVED***
   export class Features ***REMOVED***
       public turnContinues = false;
       public seedStoredCount = 0;
       public capturedCount = 0;
       public spaceCaptured = NoSpace;

       public clear() ***REMOVED***
           this.turnContinues = false;
           this.seedStoredCount = 0;
           this.capturedCount = 0;
           this.spaceCaptured = NoSpace;
   ***REMOVED***

       public toString() ***REMOVED***
           var stringBuilder = "";
           if (this.turnContinues) ***REMOVED***
               stringBuilder += " turn continues,";
       ***REMOVED***
           stringBuilder += " stores " + this.seedStoredCount;
           if (this.capturedCount > 0) ***REMOVED***
               stringBuilder += " captures " + this.capturedCount + " from space " + this.spaceCaptured;
       ***REMOVED***
           return stringBuilder;
   ***REMOVED***
   ***REMOVED***
***REMOVED***