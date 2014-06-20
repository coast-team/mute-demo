//http://groovy.codehaus.org/Martin+Fowler%27s+closure+examples+in+Groovy

class Employee ***REMOVED***
    def name, salary
    boolean manager
    String toString() ***REMOVED*** return name ***REMOVED***
***REMOVED***

def emps = [new Employee(name:'Guillaume', manager:true, salary:200),
    new Employee(name:'Graeme', manager:true, salary:200),
    new Employee(name:'Dierk', manager:false, salary:151),
    new Employee(name:'Bernd', manager:false, salary:50)]

def managers(emps) ***REMOVED***
    emps.findAll ***REMOVED*** e -> e.isManager() ***REMOVED***
***REMOVED***

assert emps[0..1] == managers(emps) // [Guillaume, Graeme]

def highPaid(emps) ***REMOVED***
    threshold = 150
    emps.findAll ***REMOVED*** e -> e.salary > threshold ***REMOVED***
***REMOVED***

assert emps[0..2] == highPaid(emps) // [Guillaume, Graeme, Dierk]

def paidMore(amount) ***REMOVED***
    ***REMOVED*** e -> e.salary > amount***REMOVED***
***REMOVED***
def highPaid = paidMore(150)

assert highPaid(emps[0]) // true
assert emps[0..2] == emps.findAll(highPaid)

def filename = 'test.txt'
new File(filename).withReader***REMOVED*** reader -> doSomethingWith(reader) ***REMOVED***

def readersText
def doSomethingWith(reader) ***REMOVED*** readersText = reader.text ***REMOVED***

assert new File(filename).text == readersText