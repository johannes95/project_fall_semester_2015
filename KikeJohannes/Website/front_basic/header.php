<?php
    //start session
    session_start();
    
    //Check which page the customer is in and save it to a variable.
    $url = $_SERVER['REQUEST_URI']; //Gets the whole url
    $pieces = explode("/",$url); // makes an array with all the parts of the url
    $current = array_pop($pieces); // only interested in the last part of the url.
?>

<html>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Indie+Flower' rel='stylesheet' type='text/css'>
        <link type="text/css" rel="stylesheet" href="css/stylesheet.css" />
        
        <!-- Check what the current page is and make a title depending on that. -->
        <title> <?php
                    if ($current == "index.php")
                        echo "Home";
                    elseif ($current == "battle.php")
                        echo "Battle";
                    elseif ($current == "characters.php") 
                        echo "Characters";
                ?> | Celebrity Death# 
        </title>
        
         <!--javascript files -->
        <script type="text/javascript" src="js/jquery.js" charset="utf-8"></script> <!-- jquery library -->
    </head>
    <body>
        <div id="wrapper">
            <header>
                <?php
                    // Check if the user is logged in. If so then retrieve users data and 
                    // set the username as logged in.
                	if(isset($_SESSION['status']) && $_SESSION['status'] == 'verified') 
                	{
                	    $screen_name 		= $_SESSION['request_vars']['screen_name'];
                		$twitter_id			= $_SESSION['request_vars']['user_id'];
                		$oauth_token 		= $_SESSION['request_vars']['oauth_token'];
                		$oauth_token_secret = $_SESSION['request_vars']['oauth_token_secret'];
                ?>
                        <div id="username"> Logged in as <?php echo $screen_name ?> </div>
                <?php
                	}
                ?>
                <div id="logo">Celebrity Death#</div>
                <?php include ("menu.php") ?>
        