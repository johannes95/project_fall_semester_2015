% Author: Rafael/Mike/Kike

-module(battle_module).

-export([start/5]).

battle_sup(Session, Celeb1, HP1, Celeb2, HP2) ->
    process_flag(trap_exit, true),
    {ok, _Pid} = battle_start_link(Session, Celeb1, HP1, Celeb2, HP2),
    receive
        {'EXIT', _From, normal} ->
            exit(normal);
        {'EXIT', _From, _Reason} ->
            %Send msg to bridge with tweet ("Error").
            bridge ! {terminate, Session, self()},
            exit(normal)
    end.    %Receive
    
battle_start_link(Session, Celeb1, HP1, Celeb2, HP2) ->
    
    P = spawn_link(fun() -> battle_loop(Session, Celeb1, HP1, Celeb2, HP2) end),
    broadcast_register(P, Session, Celeb1, Celeb2),
    {ok, P}.


% Starts the battle supervisor
start(Session, Celeb1, HP1, Celeb2, HP2) ->
    spawn(fun() -> battle_sup(Session, Celeb1, HP1, Celeb2, HP2) end).

% Register battle server on broadcaster
broadcast_register(Pid, Session, Celeb1, Celeb2) ->
    broadcaster ! {register, Pid, Session, Celeb1, Celeb2},
    receive 
        {ok, registered} -> ok end.

% Unregister battle server with the broadcaster
broadcast_unregister(Session, Celeb1, Celeb2) ->
    broadcaster ! {unregister, self(), Session, Celeb1, Celeb2},
    receive 
        {ok, unregistered} -> ok end.

% Battle server: C1 == 0
battle_loop(Session, C1, 0, C2, _HP2) ->                
    broadcast_unregister(Session, C1, C2);

% Battle server: C2 == 0 
battle_loop(Session, C1, _HP1, C2, 0) ->                
    broadcast_unregister(Session, C1, C2);

% Battle server: Ongoing battle
battle_loop(Session, Celeb1, HP1, Celeb2, HP2) ->
    receive
      {tweet, Celebrity, Tweet} -> 
        case Celebrity of
          Celeb1 -> 
            bridge ! {battle, Session, Celeb1, HP1, HP2-1, Tweet},
            battle_loop(Session, Celeb1, HP1, Celeb2, HP2-1);
          Celeb2 -> 
            bridge ! {battle, Session, Celeb2, HP1-1, HP2, Tweet},
            battle_loop(Session, Celeb1, HP1-1, Celeb2, HP2);
          _ ->
            battle_loop(Session, Celeb1, HP1, Celeb2, HP2)
        end;
      terminate ->
        bridge ! {terminate, Session, self()},
        receive
          {ok, terminated} -> ok
        end;
      terminate_all ->
        io:format("***** bridge ! {terminate, ~p, ~p} ~n", [Session, self()]), 
        bridge ! {terminate, Session, self()},
        receive
          {ok, terminated} -> 
            io:format("***** received: {ok, terminated}"),
            io:format("broadcaster ! {ok, ~p}", [self()]), 
            broadcaster ! {ok, self()}
        end
    end.
    
    % spawn (fun () -> battle_module:start("kikedaddyo", "Kim Kardashian", 10, "Cristiano Ronaldo", 10) end).