@protocol Printing: someParent
-(void) print;
@end

@interface Fraction: NSObject <Printing, NSCopying> ***REMOVED***
    int numerator;
    int denominator;
***REMOVED***
@end

@"blah\8" @"a\222sd\d" @"\faw\"\? \' \4 n\\" @"\56"
@"\xSF42"

-(NSDecimalNumber*)addCount:(id)addObject***REMOVED***

return [count decimalNumberByAdding:addObject.count];

***REMOVED***

  NS_DURING  NS_HANDLER NS_ENDHANDLER

@try ***REMOVED***
   if (argc > 1)    ***REMOVED***
    @throw [NSException exceptionWithName:@"Throwing a test exception" reason:@"Testing the @throw directive." userInfo:nil];
   ***REMOVED***
***REMOVED*** 
@catch (id theException) ***REMOVED***
    NSLog(@"%@", theException);
    result = 1  ;
***REMOVED*** 
@finally ***REMOVED***
    NSLog(@"This always happens.");
    result += 2 ;
***REMOVED***

    @synchronized(lock) ***REMOVED***
        NSLog(@"Hello World");
***REMOVED***

struct ***REMOVED*** @defs( NSObject) ***REMOVED***

char *enc1 = @encode(int);

         IBOutlet|IBAction|BOOL|SEL|id|unichar|IMP|Class 


 @class @protocol

@public
  // instance variables
@package
  // instance variables
@protected
  // instance variables
@private
  // instance variables

  YES NO Nil nil
NSApp()
NSRectToCGRect (Protocol ProtocolFromString:"NSTableViewDelegate"))

[SPPoint pointFromCGPoint:self.position]

NSRoundDownToMultipleOfPageSize

#import <stdio.h>

int main( int argc, const char *argv[] ) ***REMOVED***
    printf( "hello world\n" );
    return 0;
***REMOVED***

NSChangeSpelling

@"0 != SUBQUERY(image, $x, 0 != SUBQUERY($x.bookmarkItems, $y, $y.@count == 0).@count).@count"

@selector(lowercaseString) @selector(uppercaseString:)

NSFetchRequest *localRequest = [[NSFetchRequest alloc] init];  
localRequest.entity = [NSEntityDescription entityForName:@"VNSource" inManagedObjectContext:context];  
localRequest.sortDescriptors = [NSArray arrayWithObject:[NSSortDescriptor sortDescriptorWithKey:@"resolution" ascending:YES]];  
NSPredicate *predicate = [NSPredicate predicateWithFormat:@"0 != SUBQUERY(image, $x, 0 != SUBQUERY($x.bookmarkItems, $y, $y.@count == 0).@count).@count"];
[NSPredicate predicateWithFormat:]
NSString *predicateString = [NSString stringWithFormat:@"SELF beginsWith[cd] %@", searchString];
NSPredicate *pred = [NSPredicate predicateWithFormat:predicateString];
NSArray *filteredKeys = [[myMutableDictionary allKeys] filteredArrayUsingPredicate:pred]; 

localRequest.predicate = [NSPredicate predicateWithFormat:@"whichChart = %@" argumentArray: listChartToDownload];
localRequest.fetchBatchSize = 100;
arrayRequest    = [context  executeFetchRequest:localRequest error:&error1];

[localRequest   release];

#ifndef Nil
#define Nil __DARWIN_NULL   /* id of Nil class */
#endif

@implementation MyObject
- (unsigned int)areaOfWidth:(unsigned int)width
                height:(unsigned int)height
***REMOVED***
  return width*height;
***REMOVED***
@end
