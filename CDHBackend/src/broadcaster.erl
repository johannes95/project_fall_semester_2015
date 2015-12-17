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
      exit(normal);
    {'EXIT', _From, _Reason} ->
      case (Count > 3) of
        true -> exit(error);
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
    
    {start, Session, Celeb1, Hp1, Celeb2, Hp2} ->
      spawn(fun() -> battle_module:start(Session, Celeb1, Hp1, Celeb2, Hp2) end),
      broadcaster_loop(Listeners);
      
    {register, Pid, Session, C1, C2} ->
      Pid ! {ok, registered},
      broadcaster_loop([{Pid, Session, C1, C2} | Listeners]);
      
    {unregister, Pid, Session, C1, C2} ->
      Pid ! {ok, unregistered},
      broadcaster_loop(lists:delete({Pid, Session, C1, C2}, Listeners));
    
    {terminate, all} ->
      [begin
          io:format("~p ! terminate_all ~n", [Pid]), 
          Pid ! terminate_all,
          receive
            {ok, Pid} ->
              io:format("received: {ok,~p} ~n", [Pid]), 
              ok
          end 
        end
        || {Pid, _Session, _C1, _C2} <- Listeners],
        main ! {broadcaster, terminated},
        exit(normal);
    
    {terminate, Session} ->
      case lists:keyfind(Session, 2, Listeners) of
        {Pid, Session, C1, C2} -> 
          Pid ! terminate,
          broadcaster_loop(lists:delete({Pid, Session, C1, C2}, Listeners));
        false -> broadcaster_loop(Listeners)
      end;
    
    {parser, Celebrity, Tweet} -> 
      [Pid ! {tweet, Celebrity, Tweet} || {Pid, _Session, C1, C2} <- Listeners, lists:member(Celebrity ,[C1, C2])],
      broadcaster_loop(Listeners)
  end.