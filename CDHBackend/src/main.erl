-module(main).
% erl -pa deps/*/ebin -pa ebin -config cdh
%-behaviour(application).

-export([start/0, loop/0, super_sup/0, stop/0, restart/0]).

start() ->
    register (main, spawn(fun loop/0)),
    main ! start,
    ok.%

restart() -> %Not the most elegant but will do for now.
  miner!terminate,
  spawn_link(fun twitterminer_source:start/0).

% Main server loop. start spawns the main sup, stop sends a terminate msg to all the started modules.
loop() ->
  receive
    start ->
      spawn_link(fun() -> super_sup() end),
      loop();
    {stop, Pid} ->
      comLayer ! terminate,
      parser ! terminate,
      miner ! terminate,
      broadcaster ! {terminate, all},
      receive
        {broadcaster, terminated} -> ok
      end,
      bridge ! terminate,
      Pid ! stopped,
      exit(normal)
      
      %{ok, LSocket} = gen_tcp:listen(10000, [binary, {active, false}]),
      %{ok, ASocket} = gen_tcp:accept(LSocket),
      %gen_tcp:send(ASocket, "Server_crash"),
      %gen_tcp:close(ASocket),
      
  end.

%Superviser, starts all appropriate modules and looks over them.
super_sup() ->
    process_flag(trap_exit, true),
    spawn_link(fun communication_layer:start/0),
    spawn_link(fun parser:start/0),
    spawn_link(fun broadcaster:start/0),
    spawn_link(fun bridge:start/0),
    spawn_link(fun twitterminer_source:start/0),
    
    receive
        {'EXIT', _From, normal} ->
            exit(normal); %Never goes here/normal msg
        {'EXIT', _From, _Reason} ->
            io:format("SuperSupervisor restarting everything!~n", []),
            
            %%Send a message though a socket@10000 to say that the server crashed
            %ibrowse:send_req("https://backend-killacann.c9users.io/CDHBackend/erlang-php-bridge.php?error=%22crash%22", [], get),
            %---Start bridge first!...%%
            case whereis(broadcaster) of
                undefined -> ok;
                _PidB -> 
                    broadcaster ! {terminate, all}
            end,
            case whereis(parser) of
                undefined -> ok;
                _PidP -> 
                    parser ! terminate
            end,
            case whereis(bridge) of
                undefined -> ok;
                _PidBr -> 
                    bridge ! terminate
            end,
            case whereis(comLayer) of
                undefined -> ok;
                _PidCl -> 
                    comLayer ! terminate
            end,
            case whereis(miner) of
                undefined -> ok;
                _PidM -> 
                    miner ! terminate
            end,
            super_sup()
    end.

%Stops the main program.    
stop() ->
    main ! {stop, self()},
    receive
      stopped -> {ok, finished}
    end.