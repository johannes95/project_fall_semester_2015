-module(communication_layer).

-export([start/0]).

-define(ListenPort,10000).

start() ->
	spawn_link(fun() -> com_sup(0) end).

%Superviser which counts how many times it has failed. Has a limitance of 3 times.
com_sup(Count) ->
	process_flag(trap_exit, true),
	{ok, _Pid} = start_server(),
	receive
		{'EXIT', _From, normal} ->
			exit(normal);	%Nothing happens
		{'EXIT', _From, _Reason} ->
			case (Count > 3) of
				true -> exit(error);	%Alert the proper guy..
				false -> com_sup(Count+1)
			end
	end.

start_server()->
	Pid = register (comLayer, spawn_link(
		fun()->
			{ok, LSocket} = gen_tcp:listen(?ListenPort, [binary, {active, false}]),
			spawn(fun() -> acceptState(LSocket) end),
			receive
				terminate -> 
					gen_tcp:close(LSocket),
					exit(normal)
			end
		end)),
	{ok, Pid}.

% acceptState receives the listening socket and blocks it until it accepts something.
% The moment it accepts something it spawns a new acceptState which will spawn a new listener.
% This allows for a new socket to be created all the time and therefore always have a listening
% socket. It has a limitance however of being semi-sequncial (for example if 20 requests come at the
% the same time, request 20 will have to wait for 19 new acceptState to be created.
acceptState(LSocket) ->
	case gen_tcp:accept(LSocket) of
		{ok, ASocket} -> 
			spawn(fun()-> acceptState(LSocket) end),
			handler(ASocket);
		{error,closed} -> ok
	end.
	

% The handler will receive a msg through the tcp. It will act accordingly to the msg.
% The msg could be to start a new battle or to quit.
handler(ASocket) ->
	inet:setopts(ASocket,[{active, once}]),
	receive
		{tcp, ASocket, <<"Quit">>} ->
			gen_tcp:send(ASocket, "Exiting"),
			gen_tcp:close(ASocket),
			exit(normal);
		{tcp, ASocket, Msg} ->
			{Session, Celeb1, Hp1, Celeb2, Hp2} = messageparser(stringparser(Msg)),
			{HP11, _L1} = string:to_integer(Hp1),
			{HP21, _L2} = string:to_integer(Hp2),
			gen_tcp:send(ASocket, "Received"), %Send a msg back to the erlang-bridge
			
			
			case Celeb1 of
				"terminate terminate" ->
					broadcaster ! {terminate, Session};
				_Else ->
					broadcaster ! {start, Session, Celeb1, HP11, Celeb2, HP21}
			end,
			
			handler(ASocket);
		{tcp_closed, ASocket} -> %The php socket sends this kind of message..
   			do_something
	end.

%
% receive
% 							{battle, Session, Celeb1, Hp1, Celeb2, Hp2, Status} -> 
% 								gen_tcp:send(ASocket, {Session, Celeb1, Hp1, Celeb2, Hp2, Status}),
% 								gen_tcp:close(ASocket);
% 							{battle, Session, Celeb1, Hp1, Celeb2, Hp2, Status, Tweet} ->
% 								gen_tcp:send(ASocket, {Session, Celeb1, Hp1, Celeb2, Hp2, Status, Tweet}),
% 								gen_tcp:close(ASocket)
% 						end
%  {ok, Socket} = gen_tcp:connect({0,0,0,0}, 10000, [binary, {active,true}]).
%  gen_tcp:send(Socket, "kikedaddyo Kim Kardashian 10 Cristiano Ronaldo 10").
%
%

%Converts the received msg to erlang variables usable in the program.
messageparser(String) ->
    Session = string:sub_word(String, 1),
    Celeb1 = string:sub_word(String, 2) ++ " " ++ string:sub_word(String, 3),
    Hp1 = string:sub_word(String, 4),
    Celeb2 = string:sub_word(String, 5) ++ " " ++ string:sub_word(String, 6),
    Hp2 = string:sub_word(String, 7),
    {Session, Celeb1, Hp1, Celeb2, Hp2}.

%Takes the binaries away. Can maybe use binary_to_list?
stringparser(String) ->
	Newstring = re:replace(String, "<", "", [global, {return, list}]),
	Finalstring = re:replace(Newstring, ">", "", [global, {return, list}]),
	Finalstring.


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