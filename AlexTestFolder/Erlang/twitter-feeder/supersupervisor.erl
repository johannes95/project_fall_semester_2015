-module(supersupervisor).

-export([supersup_start_sup_link/0]).

supersup_start_sup_link() ->
    spawn_link(fun super_sup/0).
    
super_sup() ->
    process_flag(trap_exit, true),
    spawn_link(fun parser:start/0),
    spawn_link(fun broadcaster:broadcaster_sup_start_link/0),
    spawn_link(fun twitterminer_source:start/0),
    
    receive
        {'EXIT', _From, normal} ->
            ok; %Never goes here/normal msg
        {'EXIT', _From, _Reason} ->
            io:format("SuperSupervisor restarting everything!~n", []),
            %---Start bridge first!...%%
            super_sup()
    end.