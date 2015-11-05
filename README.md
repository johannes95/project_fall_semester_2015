
     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


            To connect to the mysql database, type: mysql-ctl cli
            
To disconnect, type: quit
    ---- Important Note
        The database now is in a specific workspace.
        You have a database in your own workspace if you wanna play around with stuff.
    ---- end of note.

After that its ordinary mysql rules.

Running PHP-MyAdmin:
On a terminal write mysql-ctl start 
    ---- Important Note
        This needs to be done from the workspace celebrity-database).
    ---- end of note.
    
then go to https://celebrity-database-arnolf.c9.io/phpmyadmin
Username: arnolf
password: blank (as in no password)


                                To run the back end:

1 - open a terminal and run:
    cd AlexTestFolder/Erlang/twitter-feeder/
2 - on that folder run the following to open erlang:
    erl -pa deps/*/ebin -pa ebin -config twitterminer
3 - once on erlang run
    application:ensure_all_started(twitterminer).
4 - afterwards run
    main:start().
5 - Open another terminal and open erlang normally by typing erl and pressing enter
6 - On terminal2 run 
    {ok, Socket} = gen_tcp:connect({0,0,0,0}, 10000, [binary, {active,true}]).
7 - On terminal2 run
    gen_tcp:send(Socket, "kikedaddyo Kim Kardashian 10 Cristiano Ronaldo 10").
8 - Back to terminal1 or the first terminal we opened run
    register (demo, self()).
9 - Last on terminal1 or the first terminal run
    twitterminer_source:start().
    ---- Important Note
        Sometimes you can get an error from twitter 503 service unavailable.
        If this happens all u need to do is run step 9 again.
        If you get 420 we have entered a cool down stage.
    ----- end of note
10. To see the messages on terminal one just type
    flush().
    ---- Important Note
        Assuming everything went well you should see the msgs the battle module sent.
        Some of the tweets might look weird. This are binaries in utf-8 format. We still
        need to fix this.
    ---- end of note.

IMPORTANT!!! STOP THE PROGRAM OR THE PORT WILL BE HOGGED!
11. To stop the socket hogging just go to terminal2 and type
    gen_tcp:close(Socket).
12. To stop the program go to terminal one and type
    main ! stop.

    ---- Important Note
        Please be responsible and stop both with process 11 and 12.
        Otherwise other users have a hard time testing the program.
    ---- end of note.