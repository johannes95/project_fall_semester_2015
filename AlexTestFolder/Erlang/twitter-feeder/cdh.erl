% Author: Rafael

-module(cdh).

-export([start_link/0, init/0, player/2, fake_twitter/0, test/0
        ]).
-export([test_kike/2, receiver/2]).
  

% Mock-up battle server. Fun for spawning one battle server (loop/0), 
% Fun for spawning a character (player/1), a fake_twiter/0 fun that
% sends fake twitter messages to the battle_server and a test/0 fun that 
% starts the battle server, spawns two players and runs the fake_twitter.

% Starts the battle_server, if already spawned notifies the situation
start_link() ->
  BS = whereis(battle_server),
  if
    BS == undefined ->
      register(battle_server, spawn_link(fun() -> init() end)),
      {ok, whereis(battle_server)};
    true -> 
      {already_registered, battle_server}
  end.

% Starts the battle_server
init() -> loop().

% battle_server starts and waits for the first player to join.
% When the player joins, notify the player and starts loop/2
loop() ->
  io:format("Waiting for players...~n"),
  receive
    {P1, Name1, join} ->
      P1 ! {ok, waiting_opponent},
      loop(P1, Name1)
  end.

% battle_server waits for second player to join. When that happens, 
% notifies both players that the battle started and runs loop/4
loop(P1, Name1) ->
  io:format("Waiting for opponent...~n"),
  receive
    {P2, Name2, join} ->
      if
        P2 == P1 ->
          loop(P1, Name1);
        true ->
          P2 ! {battle_start, Name1},
          P1 ! {battle_start, Name2},
          loop(P1, Name1, P2, Name2)
        end
  end.

% battle_server waits for messages from twitter, sending appropriate responses
% to each player regarding them being hit or hitting the other.
% Also waits for is_dead messages to notify winner/loser
loop(P1, Name1, P2, Name2) ->
  receive
    {success, p1} ->
      P1 ! {success, Name2},
      P2 ! {damage, Name1},
      loop(P1, Name1, P2, Name2);
    {success, p2} ->
      P1 ! {damage, Name2},
      P2 ! {success, Name1},
      loop(P1, Name1, P2, Name2);
    {P1, is_dead} ->
      P1 ! {dead, Name2},
      P2 ! {win, Name1},
      receiver ! {terminate};
    {P2, is_dead} ->
      P2 ! {dead, Name1},
      P1 ! {win, Name2},
      receiver ! {terminate}
    end.

% debug fun that empties a mailbox of a process and prints its content. Not in use
% right now.
myflush() ->
  receive
    X ->
      io:format("We got ~p~n", [X]),
      myflush()
  after 0 -> ok end.

% New player fun, with celebrity name as input. Messages the battle server that 
% the player has joined battle. Receives different replies:
% waiting_opponent: another player needs to join in order for battle to start. Calls
%                   player/2 waiting
% battle_start: Notifies the player of who is his opponent, starts player/2 battle
player(Name, new) ->
  battle_server ! {self(), Name, join},
    receive
      {ok, waiting_opponent} ->
        io:format("~p joined battle, waiting for opponent... ~n", [Name]),
        player(Name, waiting);
      {battle_start, Opponent} ->
        io:format("~p joined battle, battle START!!! I am ~p~n", [Opponent, Name]),
        player(Name, {battle, 10})
    end;

% Player fun that waits for anothe player to join batle. Starts battle afterwards.
player(Name, waiting) ->
    receive
      {battle_start, Opponent} ->
        io:format("~p joined battle, battle START!!! I am ~p~n", [Opponent, Name]),
        player(Name, {battle, 10})
    end;

% Player dead fun: when HP reaches 0, informs the battle server that your character 
% is dead. Receive defeat message.
% after was use for debugging, should be unreachable right now.
player(Name, {battle, 0}) ->
  io:format("I, ~p, am dead now ~n", [Name]),
  battle_server ! {self(), is_dead},
  receive
    {dead, Opponent} ->
    io:format("You lose. ~p wins~n", [Opponent])
  after 5000 ->
    io:format("~p didn't get the 'dead' message~n", [Name]),
    myflush()
  end;

% Player in battle fun: waits for the battle_server to notify of successful hits and 
% damage. In case of damage, reload player fun with HP-1.
player(Name, {battle, HP}) ->
  receive
    {success, Opponent} ->
      io:format("You hit ~p~n", [Opponent]),
      player(Name, {battle, HP});
    {damage, Opponent} ->
      io:format("You were hit by ~p~n", [Opponent]),
      io:format("You have ~p HP left.~n", [HP -1]),
      ibrowse:send_req(twitterfeeder_source:urlmaker("https://celebritydeathhash-arnolf.c9.io/AlexTestFolder/test.php?Name='" ++ Name ++ "'?Hit='" ++ Opponent ++ "'"), [], get),
      player(Name, {battle, HP - 1});
    {win, Opponent} ->
      io:format("~p is dead! You Win!~n", [Opponent])
  end.

% Fún that simulates twitter messages. After a given amount of time, generates a 
% mention to player 1 or 2 randomly and notifies the battle server.
  fake_twitter() ->
    timer:sleep(1500),
    random:seed(erlang:now()),
    H = random:uniform(),
    io:format("Random number is: ~p~n", [H]),
    if
        H < 0.5 ->
          battle_server ! {success, p1},
          fake_twitter();
        true ->
          battle_server ! {success, p2},
          fake_twitter()
    end.

% Test method that starts the battle_server, spawns two players and the fake_twitter.
    test() ->
      start_link(),
      spawn_link(cdh, player, [justin_bieber, new]),
      timer:sleep(2000),
      spawn_link(cdh, player, [kim_kardashian, new]),
      spawn_link(cdh, fake_twitter, []).


% Receiving Method that takes in two names, spawns two processes with the two celebs and feeds the tweets
  test_kike(Celeb1, Celeb2) ->
    register(receiver, spawn_link(fun() -> receiver_init(Celeb1, Celeb2) end)),
    start_link(),
    spawn_link(cdh, player, [Celeb1, new]),
    spawn_link(cdh, player, [Celeb2, new]).

% Receiver
  receiver_init(Celeb1, Celeb2) ->
    broadcaster ! {battle_server, register, self(), Celeb1, Celeb2},
    receive
      {ok, registered} -> ok
    end,
    receiver(Celeb1, Celeb2).
    
  receiver (Celeb1, Celeb2) -> 
    receive
      {tweet, Celebrity, Tweet} -> 
        case Celebrity of
          Celeb1 -> 
            bridge ! {Celeb1 ++ " hit " ++ Celeb2, Tweet}, 
            battle_server ! {success, p1};
          Celeb2 -> 
            bridge ! {Celeb2 ++ " hit " ++ Celeb1, Tweet},
            battle_server ! {success, p2};
          _ -> ok
        end,
        receiver(Celeb1, Celeb2);
      {terminate} ->
        broadcaster ! {battle_server, unregister, self(), Celeb1, Celeb2},
        receive
          {ok, unregistered} -> ok
        end;
      _ -> ok
    end.

% erl -pa deps/*/ebin -pa ebin -config twitterminer
% application:ensure_all_started(twitterminer).
% twitterminer_source:start().

%Answers = [string:str(Tweet, Name) || Name <-Record (Celeb)]
%evaluate if any[answers] >0

%nameparser(Tweet, Celeb) ->
%  case io_lib:printable_list(Tweet) of
%    true->
      % case Celeb of
      %   "Cristiano Ronaldo" -> Tuple = ["cristiano", "ronaldo", "@cristiano", "@ronaldo"];
      %   "Kim Kardashian" -> Tuple = ["kim", "kardashian", "@kim", "@kardashian"]
      % end,
      % Answer = [string:str(string:to_lower(Tweet), Alias) > 0 || Alias <- Tuple],
      % lists:member(true, Answer).
 %   false -> false
%  end.
    



