-module(twitterfeeder_source).

-export([twitterfeed/1, urlmaker/1]).

twitterfeed(Tweet) ->
	
	URL = "https://celebritydeathhash-arnolf.c9.io/AlexTestFolder/test.php?TweetText=",

	NewTweet = urlmaker(URL ++ Tweet),

	ibrowse:send_req(NewTweet, [], get).

urlmaker(String) ->
	Newstring = re:replace(String, "'", "%22", [global, {return, list}]),
	Finalstring = re:replace(Newstring, " ", "%20", [global, {return, list}]),
	Finalstring.

















%ibrowse:send_req(
%	"https://celebritydeathhash-arnolf.c9.io/AlexTestFolder/test.php
%	?TweetText=%22Test%20insert%20from%20erlang%20with%20ibrowse!%22", [], get).
%	Must add %22 for " and %20 for space in URL request.
%https://celebritydeathhash-arnolf.c9.io/AlexTestFolder/test.php