-module(twitterfeeder_source).

-export([twitterfeed/1, stringparser/1, start_link/0, urlmaker/1]).

start_link() ->
  TF = whereis(twitter_feeder),
  if
    TF == undefined ->
      register(twitter_feeder, spawn_link(fun() -> loop() end)),
      {ok, whereis(twitter_feeder)};
    true -> 
      {already_registered, twitter_feeder}
  end.
  
loop()->
	receive
		{tweet, Tweet} -> twitterfeed(Tweet), loop();
		{terminate} ->ok
	end.

twitterfeed(Tweet) ->
	
	%%%%%%%%%%%
	%For sending tweets to db..
	
	%URL = "https://celebritydeathhash-arnolf.c9.io/AlexTestFolder/test.php?TweetText=",

	%NewTweet = urlmaker(URL ++ Tweet),

	%ibrowse:send_req(NewTweet, [], get)
	
	%%%%%%%%%%%
	
	FormattedTweet = stringparser(Tweet),
	
	case whereis(receiver) of
		undefined ->
			cdh:test_kike("Kim Kardashian", "Cristiano Ronaldo"),
			twitterfeed(FormattedTweet);
		_Pid ->
			receiver ! {self(), FormattedTweet}, % Tweet = <<"sdölkfjsad">>
			
			receive
				{success} -> ok;
				{unsuccessful, Back} -> io:format("unsuccessful feed: ~s~n", [Back])
			end
	end.

stringparser(String) ->
	Newstring = re:replace(String, "<", "", [global, {return, list}]),
	Finalstring = re:replace(Newstring, ">", "", [global, {return, list}]),
	Finalstring.

urlmaker(String) ->
	NewString = re:replace(String, " ", "%20", [global, {return, list}]),
	FinalString = re:replace(NewString, "'", "%22", [global, {return, list}]),
	FinalString.















%ibrowse:send_req(
%	"https://celebritydeathhash-arnolf.c9.io/AlexTestFolder/test.php
%	?TweetText=%22Test%20insert%20from%20erlang%20with%20ibrowse!%22", [], get).
%	Must add %22 for " and %20 for space in URL request.
%https://celebritydeathhash-arnolf.c9.io/AlexTestFolder/test.php