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

5 - now you can start the application with:
    main:start().
    
    **** Note
    this will also start the twitter miner. since we have not tested how long twitter will allow us to miner, 
    although it has been tested up to around 10 minutes.
    **** end of note
    
6 - Notice when you are done. At this point you can type:
    main:stop.

THE END
    
