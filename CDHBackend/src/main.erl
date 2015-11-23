-module(main).

%-behaviour(application).

-export([start/0, loop/0, super_sup/0, stop/0, restart/0]).

start() ->
    register (main, spawn(fun loop/0)),
    main ! start,
    ok.

restart() -> %Not the most elegant but will do for now.
  miner!terminate,
  spawn(fun twitterminer_source:start/0).

% Main server loop. start spawns the main sup, stop sends a terminate msg to all the started modules.
loop() ->
  receive
    start ->
      spawn_link(fun() -> super_sup() end),
      loop();
    {stop, Pid} ->
      comLayer ! terminate,
      broadcaster ! terminate,
      parser ! terminate,
      bridge ! terminate,
      miner ! terminate,
      Pid ! stopped,
      exit(normal)
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
            %---Start bridge first!...%%
            case whereis(broadcaster) of
                undefined -> ok;
                _PidB -> 
                    broadcaster ! terminate
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