-module(bridge).
-export([start/0]).

start() ->
  spawn_link(fun bridge_sup/0).

bridge_sup() ->
  process_flag(trap_exit, true),
  {ok, _Pid} = bridge_start_link(),
  receive
    {'EXIT', _From, normal} ->
      ok; % Normal termination
          % Our server will never terminate normally,
          % so this is really redundant for now.
    {'EXIT', _From, _Reason} ->
      %io:format("Process ~p exited for reason ~p~n",[Pid,Reason]),
      bridge_sup() % Crash: restart
  end.

% Start the server and register it when it is not registered.
% Crash otherwise.
bridge_start_link() ->
  S = spawn_link(fun() -> bridge_loop() end),
    case whereis(bridge) of
        undefined -> register(bridge, S);
        _ ->    unregister(bridge),
                register(bridge, S)
    end,
  {ok, S}.

bridge_loop() ->
  receive
    terminate ->
      ok;
    {battle, Session, Celeb, HP1, HP2, Tweet} -> 
        %HP11 = integer_to_list(HP1),
        %HP21 = integer_to_list(HP2),
        %Submsg = "https://ide.c9.io/kikedaddy/test-erlang/php test/test.php?action=write&session="++Session++
        %"&attacker="++Celeb++"&hp1="++HP11++"&hp2="++HP21++"&tweet="++Tweet,
        %Msg = urlmaker(Submsg),
        
        %Url = "https://test-erlang-kikedaddy.c9.io/testDb.php",
        %io:format("tweet: ~ts~n Celebrity: ~p, Hp: ~p, Session: ~p~n~n", [Tweet, Celeb, HP1, Session]),
        %ibrowse:send_req(Url, [],post,[{session,Session},{hitter,Celeb},{hp1,HP1},{hp2,HP2},{tweet,Tweet}]),
        
        demo ! {Session, Celeb, HP1, HP2, Tweet},
        
        bridge_loop()
  end.
  
% urlmaker(String) ->
% 	NewString = re:replace(String, " ", "%20", [global, {return, list}]),
% 	FinalString = re:replace(NewString, "'", "%22", [global, {return, list}]),
% 	FinalString.