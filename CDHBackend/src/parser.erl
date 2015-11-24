-module(parser).

-export([start/0]).

start() ->
    spawn_link(fun() -> parser_sup(0) end).

% Superviser checks if the module ends correctly, otherwise it restarts it.
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
    register(parser, P), % Register as parser
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
                    init(); % does not find the celebrity in the string.
                false -> 
                    broadcaster ! {parser, hd(Celebrity), Tweet}, %finds the celebrity in the string.
                    init()
            end
    end.
    
findname(Tweet) ->
    % here we add the celebrities and their names we want to check for.
    % Highly assosiated with the list in twitterminer_source as defined celebrities.
        CelebNames = [
        {"Cristiano Ronaldo", "@Cristiano"},
        {"Kim Kardashian", "@KimKardashian"},
        {"Justin Timberlake", "@jtimberlake"},
        {"Rihanna Fenty", "@rihanna"},
        {"Taylor Swift", "@taylorswift13"},
        {"Barack Obama", "@BarackObama"},
        {"Kate Perry", "@katypery"},
        {"Justin Bieber", "@justinbieber"},
        {"Bill Gates", "@BillGates"},
        {"Beyonce Knowles", "@Beyonce"},
        {"Jim Carrey", "@JimCarrey"},
        {"Britney Spears", "@britneyspears"}
    ],
    
    %Checks if any of Aliases of each celebrity is found.
    Celebrity = [Proper || {Proper, Alias1} <- CelebNames, lists:member(true, [string:str(Tweet, Alias) > 0 || Alias <- [Alias1]])],
    
    
    
    % CelebNames = [
    %     {"Cristiano Ronaldo", "cristiano", "ronaldo", "@cristiano"},
    %     {"Kim Kardashian", "kim", "kardashian", "@kimkardashian"},
    %     {"Justin Timberlake", "justin", "timberlake", "@jtimberlake"},
    %     {"Rihanna Fenty", "rihanna", "fenty", "@rihanna"},
    %     {"Taylor Swift", "taylor", "swift", "@taylorswift13"},
    %     {"Barack Obama", "barack", "obama", "@barackobama"},
    %     {"Kate Perry", "kate", "perry", "@katypery"},
    %     {"Justin Bieber", "justin", "bieber", "@justinbieber"},
    %     {"Bill Gates", "bill", "gates", "@billgates"},
    %     {"Beyonce Knowles", "beyonce", "knowles", "@beyonce"},
    %     {"Jim Carrey", "jim", "carrey", "@jimcarrey"},
    %     {"Britney Spears", "britney", "spears", "@britneyspears"}
    % ],
    
    % %Checks if any of Aliases of each celebrity is found.
    % Celebrity = [Proper || {Proper, Alias1, Alias2, Alias3} <- CelebNames, lists:member(true, [string:str(string:to_lower(Tweet), Alias) > 0 || Alias <- [Alias1, Alias2, Alias3]])],
    
    Celebrity.
    
 stringparser(String) ->
 	Newstring = re:replace(String, "<", "", [global, {return, list}]),
 	Finalstring = re:replace(Newstring, ">", "", [global, {return, list}]),
    Finalstring.