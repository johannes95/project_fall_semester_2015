-module(main).

-export([start/0, super_sup/0]).

start() ->
    register (main, spawn(fun loop/0)),
    main ! start.

loop() ->
  receive
    start ->
      spawn_link(fun() -> super_sup() end),
      loop();
    stop ->
      broadcaster ! terminate,
      parser ! terminate,
      bridge ! terminate,
      ok
  end.
    
super_sup() ->
    process_flag(trap_exit, true),
    spawn_link(fun communication_layer:start/0),
    spawn_link(fun parser:start/0),
    spawn_link(fun broadcaster:start/0),
    spawn_link(fun bridge:start/0),
    %spawn_link(fun twitterminer_source:start/0),
    
    receive
        {'EXIT', _From, normal} ->
            ok; %Never goes here/normal msg
        {'EXIT', _From, _Reason} ->
            io:format("SuperSupervisor restarting everything!~n", []),
            %---Start bridge first!...%%
            case whereis(broadcaster) of
                undefined -> ok;
                _PidB -> 
                    unregister(broadcaster)
            end,
            case whereis(parser) of
                undefined -> ok;
                _PidP -> 
                    unregister(parser)
            end,
            case whereis(bridge) of
                undefined -> ok;
                _PidBr -> 
                    unregister(bridge)
            end,
            super_sup()
    end.