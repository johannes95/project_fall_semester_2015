-module(bridge).
-export([start/0]).

start() ->
  spawn_link(fun() -> bridge_sup(0) end).

bridge_sup(Count) ->
  process_flag(trap_exit, true),
  {ok, _Pid} = bridge_start_link(),
  receive
    {'EXIT', _From, normal} ->
      ok; % Normal termination
          % Our server will never terminate normally,
          % so this is really redundant for now.
    {'EXIT', _From, _Reason} ->
      case (Count > 3) of
        true -> 1/0;
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
    {battle, Session, Celeb, HP1, HP2, Tweet} -> 
        HP11 = integer_to_list(HP1),
        HP21 = integer_to_list(HP2),
        %Submsg = "https://ide.c9.io/kikedaddy/test-erlang/php test/test.php?action=write&session="++Session++
        %"&attacker="++Celeb++"&hp1="++HP11++"&hp2="++HP21++"&tweet="++Tweet,
        %Msg = urlmaker(Submsg),

        %"https://celebrity-database-arnolf.c9.io/Database/Battle.php?session=kike&attacker=kim&hp1=1&hp2=21&tweet=test"
        %Url = "https://celebrity-database-arnolf.c9.io/Database/Battle.php",
        %io:format("tweet: ~ts~n Celebrity: ~p, Hp: ~p, Session: ~p~n~n", [Tweet, Celeb, HP1, Session]),
        % NEED TO JIFFY ENCODE HERE -----   ({[{x,y}]})
        %Body = make_body(Session, Celeb, HP1, HP2, Tweet),
        %PostProps = [{session, Session}, {attacker, Celeb}, {hp1,HP1},{hp2,HP2},{tweet,Tweet}],
        %Body = string:join([lists:concat([K, "=", V]) || {K,V} <- PostProps], "&"),
        %httpc:request(post, {Url, [], "application/x-www-form-urlencoded", Body},[{ssl, [{verify, 0}]}], []),
        
        %io:format("Body: ~ts~n",[Body]),
        %**** WORKING
        %Url = "https://celebrity-database-arnolf.c9.io/Database/Battle.php",
        %FormData = "session=bar&attacker=buzz".
        %ibrowse:send_req(Url, [{"Content-Type", "application/x-www-form-urlencoded"}], post, FormData).
        ok = sendMsg(Session, Celeb, HP11, HP21, Tweet),
        bridge_loop()
  end.
  
% urlmaker(String) ->
% 	NewString = re:replace(String, " ", "%20", [global, {return, list}]),
% 	FinalString = re:replace(NewString, "'", "%22", [global, {return, list}]),
% 	FinalString.

% make_body(Session, Celeb, HP1, HP2, Tweet) ->
%     Json = {[{<<"session">>,Session},
%             {<<"attacker">>,Celeb},
%             {<<"hp1">>, HP1},
%             {<<"hp2">>, HP2},
%             {<<"tweet">>, Tweet}
%             ]},
%     jiffy:encode(Json).

sendMsg(Session, Celeb, HP11, HP21, Tweet) ->
        FormData = "session="++Session++"&attacker="++Celeb++"&hp1="++HP11++"&hp2="++HP21++"&tweet="++Tweet,
        Url = "https://celebrity-database-arnolf.c9users.io/Database/Battle.php",
        {ok, _ResponseNum, _Headers, Response}=ibrowse:send_req(Url, [{"Content-Type", "application/x-www-form-urlencoded"}], post, FormData),
        {[{_Success,Boolean}]} = jiffy:decode(Response),
        %1/0,
        %io:format("Answer:~p~nAttacker:~p HP1:~p HP2:~p~n", [Response,Celeb,HP11,HP21]),
        %io:format("FormData:~p~n", [FormData]),
        case Boolean of
          false -> sendMsg(Session, Celeb, HP11, HP21, "Problem with tweet");
          true -> 
            %demo ! {Session, Celeb, HP11, HP21, Tweet}, 
            ok
        end.