<?php
session_start();
include_once("config.php");
include_once("../lib/twitteroauth.php");
include("urllist.php");

// Include config file and twitter PHP Library by Abraham Williams (abraham@abrah.am)
//include_once("../db/functions.php");

//User exist and outh is valid
if(isset($_REQUEST['oauth_token']) && $_SESSION['token']  !== $_REQUEST['oauth_token']) {
	//If token is old, distroy session and redirect user to index.php
	session_destroy();
	header('Location: ../index.php');
//Outh old but user exist in DB
}elseif(isset($_REQUEST['oauth_token']) && $_SESSION['token'] == $_REQUEST['oauth_token']) {
	//Successful response returns oauth_token, oauth_token_secret, user_id, and screen_name
	$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['token'] , $_SESSION['token_secret']);
	$access_token = $connection->getAccessToken($_REQUEST['oauth_verifier']);
	if($connection->http_code == '200')
	{
		//Redirect user to twitter
		$_SESSION['status'] = 'verified';
		$_SESSION['request_vars'] = $access_token;
		
		//Insert user into the database
		$user_info = $connection->get('account/verify_credentials'); 
		$name = explode(" ",$user_info->name);
		$fname = isset($name[0])?$name[0]:'';
		$lname = isset($name[1])?$name[1]:'';

		//Handle the DB in the other server.
		//HARD CODED!!!
		$url = $getUserDataURL;
		$profilepic = str_replace("_normal.jpg",".jpg",$user_info->profile_image_url);

		$fields = array(
			'userid' => $user_info->id,
			'username' => $user_info->screen_name,
			'profile_image' => $profilepic,
			'access_token' => $access_token['oauth_token'],
			'access_secret' => $access_token['oauth_token_secret']
		);

		//url-ify the data for the POST
		foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
		rtrim($fields_string, '&');

		//open connection
		$ch = curl_init();

		//set the url, number of POST vars, POST data
		curl_setopt($ch,CURLOPT_URL, $url);
		curl_setopt($ch,CURLOPT_POST, count($fields));
		curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);

		//execute post
		$result = curl_exec($ch);

		//close connection
		curl_close($ch);

		//Unset no longer needed request tokens
		unset($_SESSION['token']);
		unset($_SESSION['token_secret']);
		header('Location: ../index.php');
	}else{
		die("error, try again later!");
	}
//New user
}else{
	if(isset($_GET["denied"]))
	{
		header('Location: ../index.php');
		die();
	}

	//Fresh authentication
	$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
	$request_token = $connection->getRequestToken(OAUTH_CALLBACK);
	
	//Received token info from twitter
	$_SESSION['token'] 			= $request_token['oauth_token'];
	$_SESSION['token_secret'] 	= $request_token['oauth_token_secret'];
	
	//Any value other than 200 is failure, so continue only if http code is 200
	if($connection->http_code == '200')
	{
		//redirect user to twitter
		$twitter_url = $connection->getAuthorizeURL($request_token['oauth_token']);
		header('Location: ' . $twitter_url); 
	}else{
		// ********************************************************** Should not die, must change to keep flow
		die("error connecting to twitter! try again later! Code: ".$connection->http_code); 
	}
}
?>

