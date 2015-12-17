<?php
	header('Access-Control-Allow-Origin: *');
	
	$ip = "0.0.0.0";
	$user = getenv('C9_USER'); //Define database username
	$db = "CelebDeath";
	
	    
	$session = $_GET['session'];
	$result = $_GET['result'];
	//$celeb = $_GET['celeb'];
	// Create connection
	$connection = mysqli_connect($ip,$user,"",$db);
	if(mysqli_connect_errno()){
			
	}
	else{
	    if ($result == "win"){		// if the message received is "win" then the win counter in battles_won will be increased by 1.
	        $userquery = "UPDATE users SET battles_won = battles_won +1 WHERE oauth_uid = '".$session."'";
	    		    }
        else{						// otherwise a loss is added to the battles_lost column.
	        $userquery = "UPDATE users SET battles_lost = battles_lost +1 WHERE oauth_uid = '".$session."'";
	       	    	}
		mysqli_query($connection, $userquery);
    }
?>