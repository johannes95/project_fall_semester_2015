-module(parser).

-export([start/0]).

start() ->
    spawn_link(fun() -> parser_sup(0) end).

parser_sup(Count) ->
    process_flag(trap_exit, true),
    {ok, _Pid} = parser_start_link(),
    receive
        {'EXIT', _From, normal} ->
            %Do nothing
            ok;
        {'EXIT', _From, _Reason} ->
            case (Count > 3) of
                true -> supersup ! {error, parser};
                false -> parser_sup(Count+1)   %Restart
            end %Case
    end.    %Receive
    
parser_start_link() ->
    P = spawn_link(fun init/0),
    register(parser, P),
    {ok, P}.
    
init() ->
    receive
        terminate ->
            exit(normal);
        {Tweet} ->
            Celebrity = findname(stringparser(Tweet)),
            %Celebrity = findname(Tweet),
            case Celebrity==[] of
                true -> 
                    init();
                false -> 
                    broadcaster ! {parser, hd(Celebrity), Tweet},
                    init()
            end
    end.
    
findname(Tweet) ->
    
    CelebNames = [{"Cristiano Ronaldo", "cristiano", "ronaldo", "@cristiano", "@ronaldo"},
            {"Kim Kardashian", "kim", "kardashian", "@kim", "@kardashian"}],
    
    Celebrity = [Proper || {Proper, Alias1, Alias2, Alias3, Alias4} <- CelebNames, lists:member(true, [string:str(string:to_lower(Tweet), Alias) > 0 || Alias <- [Alias1, Alias2, Alias3, Alias4]])],
    
    Celebrity.
    
 stringparser(String) ->
 	Newstring = re:replace(String, "<", "", [global, {return, list}]),
 	Finalstring = re:replace(Newstring, ">", "", [global, {return, list}]),
 	Finalstring.