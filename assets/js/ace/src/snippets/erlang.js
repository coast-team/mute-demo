define('ace/snippets/erlang', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "# module and export all\n\
snippet mod\n\
	-module($***REMOVED***1:`Filename('', 'my')`***REMOVED***).\n\
	\n\
	-compile([export_all]).\n\
	\n\
	start() ->\n\
	    $***REMOVED***2***REMOVED***\n\
	\n\
	stop() ->\n\
	    ok.\n\
# define directive\n\
snippet def\n\
	-define($***REMOVED***1:macro***REMOVED***, $***REMOVED***2:body***REMOVED***).$***REMOVED***3***REMOVED***\n\
# export directive\n\
snippet exp\n\
	-export([$***REMOVED***1:function***REMOVED***/$***REMOVED***2:arity***REMOVED***]).\n\
# include directive\n\
snippet inc\n\
	-include(\"$***REMOVED***1:file***REMOVED***\").$***REMOVED***2***REMOVED***\n\
# behavior directive\n\
snippet beh\n\
	-behaviour($***REMOVED***1:behaviour***REMOVED***).$***REMOVED***2***REMOVED***\n\
# if expression\n\
snippet if\n\
	if\n\
	    $***REMOVED***1:guard***REMOVED*** ->\n\
	        $***REMOVED***2:body***REMOVED***\n\
	end\n\
# case expression\n\
snippet case\n\
	case $***REMOVED***1:expression***REMOVED*** of\n\
	    $***REMOVED***2:pattern***REMOVED*** ->\n\
	        $***REMOVED***3:body***REMOVED***;\n\
	end\n\
# anonymous function\n\
snippet fun\n\
	fun ($***REMOVED***1:Parameters***REMOVED***) -> $***REMOVED***2:body***REMOVED*** end$***REMOVED***3***REMOVED***\n\
# try...catch\n\
snippet try\n\
	try\n\
	    $***REMOVED***1***REMOVED***\n\
	catch\n\
	    $***REMOVED***2:_:_***REMOVED*** -> $***REMOVED***3:got_some_exception***REMOVED***\n\
	end\n\
# record directive\n\
snippet rec\n\
	-record($***REMOVED***1:record***REMOVED***, ***REMOVED***\n\
	    $***REMOVED***2:field***REMOVED***=$***REMOVED***3:value***REMOVED******REMOVED***).$***REMOVED***4***REMOVED***\n\
# todo comment\n\
snippet todo\n\
	%% TODO: $***REMOVED***1***REMOVED***\n\
## Snippets below (starting with '%') are in EDoc format.\n\
## See http://www.erlang.org/doc/apps/edoc/chapter.html#id56887 for more details\n\
# doc comment\n\
snippet %d\n\
	%% @doc $***REMOVED***1***REMOVED***\n\
# end of doc comment\n\
snippet %e\n\
	%% @end\n\
# specification comment\n\
snippet %s\n\
	%% @spec $***REMOVED***1***REMOVED***\n\
# private function marker\n\
snippet %p\n\
	%% @private\n\
# OTP application\n\
snippet application\n\
	-module($***REMOVED***1:`Filename('', 'my')`***REMOVED***).\n\
\n\
	-behaviour(application).\n\
\n\
	-export([start/2, stop/1]).\n\
\n\
	start(_Type, _StartArgs) ->\n\
	    case $***REMOVED***2:root_supervisor***REMOVED***:start_link() of\n\
	        ***REMOVED***ok, Pid***REMOVED*** ->\n\
	            ***REMOVED***ok, Pid***REMOVED***;\n\
	        Other ->\n\
		          ***REMOVED***error, Other***REMOVED***\n\
	    end.\n\
\n\
	stop(_State) ->\n\
	    ok.	\n\
# OTP supervisor\n\
snippet supervisor\n\
	-module($***REMOVED***1:`Filename('', 'my')`***REMOVED***).\n\
\n\
	-behaviour(supervisor).\n\
\n\
	%% API\n\
	-export([start_link/0]).\n\
\n\
	%% Supervisor callbacks\n\
	-export([init/1]).\n\
\n\
	-define(SERVER, ?MODULE).\n\
\n\
	start_link() ->\n\
	    supervisor:start_link(***REMOVED***local, ?SERVER***REMOVED***, ?MODULE, []).\n\
\n\
	init([]) ->\n\
	    Server = ***REMOVED***$***REMOVED***2:my_server***REMOVED***, ***REMOVED***$2, start_link, []***REMOVED***,\n\
	      permanent, 2000, worker, [$2]***REMOVED***,\n\
	    Children = [Server],\n\
	    RestartStrategy = ***REMOVED***one_for_one, 0, 1***REMOVED***,\n\
	    ***REMOVED***ok, ***REMOVED***RestartStrategy, Children***REMOVED******REMOVED***.\n\
# OTP gen_server\n\
snippet gen_server\n\
	-module($***REMOVED***1:`Filename('', 'my')`***REMOVED***).\n\
\n\
	-behaviour(gen_server).\n\
\n\
	%% API\n\
	-export([\n\
	         start_link/0\n\
	        ]).\n\
\n\
	%% gen_server callbacks\n\
	-export([init/1, handle_call/3, handle_cast/2, handle_info/2,\n\
	         terminate/2, code_change/3]).\n\
\n\
	-define(SERVER, ?MODULE).\n\
\n\
	-record(state, ***REMOVED******REMOVED***).\n\
\n\
	%%%===================================================================\n\
	%%% API\n\
	%%%===================================================================\n\
\n\
	start_link() ->\n\
	    gen_server:start_link(***REMOVED***local, ?SERVER***REMOVED***, ?MODULE, [], []).\n\
\n\
	%%%===================================================================\n\
	%%% gen_server callbacks\n\
	%%%===================================================================\n\
\n\
	init([]) ->\n\
	    ***REMOVED***ok, #state***REMOVED******REMOVED******REMOVED***.\n\
\n\
	handle_call(_Request, _From, State) ->\n\
	    Reply = ok,\n\
	    ***REMOVED***reply, Reply, State***REMOVED***.\n\
\n\
	handle_cast(_Msg, State) ->\n\
	    ***REMOVED***noreply, State***REMOVED***.\n\
\n\
	handle_info(_Info, State) ->\n\
	    ***REMOVED***noreply, State***REMOVED***.\n\
\n\
	terminate(_Reason, _State) ->\n\
	    ok.\n\
\n\
	code_change(_OldVsn, State, _Extra) ->\n\
	    ***REMOVED***ok, State***REMOVED***.\n\
\n\
	%%%===================================================================\n\
	%%% Internal functions\n\
	%%%===================================================================\n\
\n\
";
exports.scope = "erlang";

***REMOVED***);
