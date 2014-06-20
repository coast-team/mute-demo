use core::rand::RngUtil;

fn main() ***REMOVED***
    for ["Alice", "Bob", "Carol"].each |&name| ***REMOVED***
        do spawn ***REMOVED***
            let v = rand::Rng().shuffle([1, 2, 3]);
            for v.each |&num| ***REMOVED***
                print(fmt!("%s says: '%d'\n", name, num + 1))
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***

fn map<T, U>(vector: &[T], function: &fn(v: &T) -> U) -> ~[U] ***REMOVED***
    let mut accumulator = ~[];
    for vec::each(vector) |element| ***REMOVED***
        accumulator.push(function(element));
***REMOVED***
    return accumulator;
***REMOVED***
