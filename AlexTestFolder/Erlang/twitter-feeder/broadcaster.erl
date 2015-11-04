-module (broadcaster).
-export([broadcaster_sup_start_link/0]).

broadcaster_sup_start_link() ->
  spawn_link(fun broadcaster_sup/0).

broadcaster_sup() ->
  process_flag(trap_exit, true),
  {ok, _Pid} = broadcaster_start_link(),
  receive
    {'EXIT', _From, normal} ->
      ok; % Normal termination
          % Our server will never terminate normally,
          % so this is really redundant for now.
    {'EXIT', _From, _Reason} ->
      %io:format("Process ~p exited for reason ~p~n",[Pid,Reason]),
      broadcaster_sup() % Crash: restart
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
    {terminate} ->
      ok
  end.