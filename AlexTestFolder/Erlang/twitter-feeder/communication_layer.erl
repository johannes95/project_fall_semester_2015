-module(communication_layer).

-export([]).

-define(Port,8000).

spawn_battle() ->
    battleserver ! {Session, C1, Hp1, C2, Hp2},
    
    receive
        {ok, Session, C1, Hp1, C2, Hp2} ->
            ok; %Call function for PHP-bridge
        {terminate, Session} ->
            ok  %Make terminate call to battle server
    end.

start_server()->
	Pid = spawn_link(fun()->
		{ok, LSocket} = gen_tcp:listen(?Port, [binary, {active, false}]),
		spawn(fun() -> acceptState(LSocket) end),
		timer:sleep(infinity)
		end),
	{ok, Pid}.

acceptState(LSocket) ->
	{ok, ASocket} = gen_tcp:accept(LSocket),
	spawn(fun()-> acceptState(LSocket) end),
	handler(ASocket).

handler(ASocket) ->
	inet:setopts(ASocket,[{active, once}]),
	receive
		{tcp, ASocket, <<"Quit">>} ->
			gen_tcp:send(ASocket, "Exiting"),
			gen_tcp:close(ASocket);
		{tcp, ASocket, <<"Hello">>} ->
			gen_tcp:send(ASocket, "Hello to you too"),
			handler(ASocket);
		{tcp, ASocket, _MSG} ->
			gen_tcp:send(ASocket, "How rude wont you say at least hello?"),
			handler(ASocket)
	end.
    



%client() ->
%    SomeHostInNet = "localhost", % to make it runnable on one machine
%    {ok, Sock} = gen_tcp:connect(SomeHostInNet, 5678, 
%                                 [binary, {packet, 0}]),
%    ok = gen_tcp:send(Sock, "Some Data"),
%    ok = gen_tcp:close(Sock).

%server() ->
%    {ok, LSock} = gen_tcp:listen(5678, [binary, {packet, 0}, 
%                                        {active, false}]),
%    {ok, Sock} = gen_tcp:accept(LSock),
%    {ok, Bin} = do_recv(Sock, []),
%    ok = gen_tcp:close(Sock),
%    Bin.

%do_recv(Sock, Bs) ->
%    case gen_tcp:recv(Sock, 0) of
%        {ok, B} ->
%            do_recv(Sock, [Bs, B]);
%        {error, closed} ->
%            {ok, list_to_binary(Bs)}
%    end.