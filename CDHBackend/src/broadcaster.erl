-module (broadcaster).
-export([start/0]).

start() ->
  spawn_link(fun() -> broadcaster_sup(0) end).

% Superviser for the broadcaster. It starts the loop (server) and if it receives 
% an Exit other than normal it restarts the process.
broadcaster_sup(Count) ->
  process_flag(trap_exit, true),
  {ok, _Pid} = broadcaster_start_link(),
  receive
    {'EXIT', _From, normal} ->
      ok; % Normal termination
          % Our server will never terminate normally,
          % so this is really redundant for now.
    {'EXIT', _From, _Reason} ->
      case (Count > 3) of
        true -> 1/0;
        false -> broadcaster_sup(Count+1)   %Restart
      end %Case
  end.

% Start the server and register it when it is not registered.
% Crash otherwise.
broadcaster_start_link() ->
  S = spawn_link(fun() -> broadcaster_loop([]) end),
    case whereis(broadcaster) of
        undefined -> register(broadcaster, S);
        _ ->    unregister(broadcaster),
                register(broadcaster, S)
    end,
  {ok, S}.

% Classic server. Has as a state a list of listeners. A listener can register itself to the broadcaster,
% it can unregsiter, or the broadcaster can get a msg to pass to all listeners.
broadcaster_loop(Listeners) ->
  receive
    {parser, Celebrity, Tweet} -> 
      [Pid ! {tweet, Celebrity, Tweet} || {Pid, C1, C2} <- Listeners, lists:member(Celebrity ,[C1, C2])],
      broadcaster_loop(Listeners);
    {register, Pid, C1, C2} ->
      Pid ! {ok, registered},
      broadcaster_loop([{Pid, C1, C2}|Listeners]);
    {unregister, Pid, C1, C2} ->
      Pid ! {ok, unregistered},
      broadcaster_loop(lists:delete({Pid, C1, C2}, Listeners));
    terminate ->
      exit(normal)
  end.