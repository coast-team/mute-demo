/*
    Testing syntax highlighting
    of Ace Editor
    for the Linden Scripting Language
*/

integer someIntNormal       = 3672;
integer someIntHex          = 0x00000000;
integer someIntMath         = PI_BY_TWO;

integer event               = 5673;                                             // invalid.illegal

key someKeyTexture          = TEXTURE_DEFAULT;
string someStringSpecial    = EOF;

some_user_defined_function_without_return_type(string inputAsString)
***REMOVED***
    llSay(PUBLIC_CHANNEL, inputAsString);
***REMOVED***

string user_defined_function_returning_a_string(key inputAsKey)
***REMOVED***
    return (string)inputAsKey;
***REMOVED***

default
***REMOVED***
    state_entry()
    ***REMOVED***
        key someKey = NULL_KEY;
        someKey = llGetOwner();

        string someString = user_defined_function_returning_a_string(someKey);

        some_user_defined_function_without_return_type(someString);
***REMOVED***

    touch_start(integer num_detected)
    ***REMOVED***
        list agentsInRegion = llGetAgentList(AGENT_LIST_REGION, []);
        integer numOfAgents = llGetListLength(agentsInRegion);

        integer index;                                                          // defaults to 0
        for (; index <= numOfAgents - 1; index++)                               // for each agent in region
        ***REMOVED***
            llRegionSayTo(llList2Key(agentsInRegion, index), PUBLIC_CHANNEL, "Hello, Avatar!");
    ***REMOVED***
***REMOVED***

    touch_end(integer num_detected)
    ***REMOVED***
        someIntNormal       = 3672;
        someIntHex          = 0x00000000;
        someIntMath         = PI_BY_TWO;

        event               = 5673;                                             // invalid.illegal

        someKeyTexture      = TEXTURE_DEFAULT;
        someStringSpecial   = EOF;

        llSetInventoryPermMask("some item", MASK_NEXT, PERM_ALL);               // reserved.godmode

        llWhisper(PUBLIC_CHANNEL, "Leaving \"default\" now...");
        state other;
***REMOVED***
***REMOVED***

state other
***REMOVED***
    state_entry()
    ***REMOVED***
        llWhisper(PUBLIC_CHANNEL, "Entered \"state other\", returning to \"default\" again...");
        state default;
***REMOVED***
***REMOVED***
