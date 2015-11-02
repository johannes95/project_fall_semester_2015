-module(startapp).

-export([start/0]).

start() ->
    application:ensure_all_started(twitterminer),
    application:start(twitterminer_source:twitter_example("Kim Kardashian", "Cristiano Ronaldo")).
    
    %timer:sleep(20000),
    %twitterminer_pipeline:terminate(whereis(miner)).
    
    
    %%  [application:start(A) || A <- [asn1, crypto, public_key, ssl, ibrowse, twitterminer]].  %%
    %%  For compiling...
    
%% TO START ERLANG MINER: erl -pa deps/*/ebin -pa ebin -config twitterminer -s startapp start %%

%%Before running again, fix twitterminer config to not run as long and fix pipeline.%%