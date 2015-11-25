% Author: Rafael/Mike/Kike

-module(battle_module).

-export([start/5]).

% Starts the battle server
start(Session, Celeb1, HP1, Celeb2, HP2) -> 
    broadcast_register(Celeb1, Celeb2),
    battle_loop(Session, Celeb1, HP1, Celeb2, HP2).

% Register battle server on broadcaster
broadcast_register(Celeb1, Celeb2) ->
    broadcaster ! {register, self(), Celeb1, Celeb2},
    receive 
        {ok, registered} -> ok end.

% Unregister battle server with the broadcaster
broadcast_unregister(Celeb1, Celeb2) ->
    broadcaster ! {unregister, self(), Celeb1, Celeb2},
    receive 
        {ok, unregistered} -> ok end.

% Battle server: C1 == 0
battle_loop(_Session, C1, 0, C2, _HP2) ->                
    broadcast_unregister(C1, C2);

% Battle server: C2 == 0 
battle_loop(_Session, C1, _HP1, C2, 0) ->                
    broadcast_unregister(C1, C2);

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
        end
    end.
    
    % spawn (fun () -> battle_module:start("kikedaddyo", "Kim Kardashian", 10, "Cristiano Ronaldo", 10) end).