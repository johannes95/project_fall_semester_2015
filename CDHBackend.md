                                        How to run the backend

1 - Change directory to:
    cd CDHBackend
2 - If rebar is installed u can try:
    rebar get-deps
    rebar compile
    
**** Important Note
If rebar is not recognized you can install it by opening a terminal and running
sudo apt-get install rebar
**** end of note
    
3 - to enter erlang do:
    erl -pa deps/*/ebin -pa ebin -config cdh
4 - first ensure every dependency is tarted with:
    application:ensure_all_started(cdh).
        -> this should return {ok,[crypto,asn1,public_key,ssl,ibrowse,jiffy,inets,oauth,cdh]}
**** NOTE
At this point we are having difficulties with communication so register the current terminal as demo so that 
the msg from the bridge goes to your terminal.
**** end of note

TEMPORARY
5 - register as demo
    register(demo, self()).
6 - now you can start the application with:
    main:start().
    **** Note
    this will also start the twitter miner. since we have not tested how long twitter will allow us to miner
    it is recommended we do the next steps rather quickly so it might be smart to prepare before we start.
    **** end of note
7 - Start a new terminal and enter a regular erlang shell with:
    erl
8 - On terminal2 run 
    {ok, Socket} = gen_tcp:connect({0,0,0,0}, 10000, [binary, {active,true}]).
9 - On terminal2 run: (this will start a battle under user kikedaddyo with two celebrities and their hp).
    gen_tcp:send(Socket, "kikedaddyo Kim Kardashian 10 Cristiano Ronaldo 10").
10- At this point msgs will come to your terminals inbox. To see this msgs just type on terminal 1:
    flush().
11 - Notice when the battle is over. (When one of the characters has HP 0). At this point you can type:
    main:stop.

THE END
    
    