  %% A process whose only job is to keep a counter.
  %% First version
  -module(counter).
  -export([start/0, codeswitch/1]).
 
  start() -> loop(0).
 
  loop(Sum) ->
    receive
       ***REMOVED***increment, Count***REMOVED*** ->
          loop(Sum+Count);
       ***REMOVED***counter, Pid***REMOVED*** ->
          Pid ! ***REMOVED***counter, Sum***REMOVED***,
          loop(Sum);
       code_switch ->
          ?MODULE:codeswitch(Sum)
          % Force the use of 'codeswitch/1' from the latest MODULE version
    end.
 
  codeswitch(Sum) -> loop(Sum).