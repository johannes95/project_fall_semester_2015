-module(bridge).
-export([start/0]).

start() ->
  spawn_link(fun() -> bridge_sup(0) end).

bridge_sup(Count) ->
  process_flag(trap_exit, true),
  {ok, _Pid} = bridge_start_link(),
  receive
    {'EXIT', _From, normal} ->
      exit(normal);
    {'EXIT', _From, _Reason} ->
      case (Count > 3) of
        true -> exit(error);
        false -> bridge_sup(Count+1)   %Restart
      end %Case
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
      exit(normal);
    {terminate, Session, Pid} ->
      io:format("***** ***** received: {terminate, ~p, ~p ~n", [Session, Pid]), 
      ok = sendMsg(Session, "terminate", 0, 0, "terminate"),
      io:format("***** ***** ~p ! {ok, terminated}~n", [Pid]), 
      Pid ! {ok, terminated},
      bridge_loop();
    {battle, Session, Celeb, HP1, HP2, Tweet} -> 
        ok = sendMsg(Session, Celeb, HP1, HP2, Tweet),
        bridge_loop()
  end.


sendMsg(Session, Celeb, HP1, HP2, Tweet) ->
        HP11 = integer_to_list(HP1),
        HP21 = integer_to_list(HP2),
        FormData = "session="++Session++"&attacker="++Celeb++"&hp1="++HP11++"&hp2="++HP21++"&tweet="++Tweet,
        Url = "https://celebrity-database-kikedaddy.c9users.io/Database/Battle.php",
        {ok, _ResponseNum, _Headers, Response}=ibrowse:send_req(Url, [{"Content-Type", "application/x-www-form-urlencoded"}], post, FormData),
        {[{_Success,Boolean}]} = jiffy:decode(Response),
        %1/0,
        %io:format("Answer:~p~nAttacker:~p HP1:~p HP2:~p~n", [Response,Celeb,HP11,HP21]),
        %io:format("FormData:~p~n", [FormData]),
        case Boolean of
          false -> sendMsg(Session, Celeb, HP1, HP2, "Problem with tweet");
          true -> 
            ok
        end.