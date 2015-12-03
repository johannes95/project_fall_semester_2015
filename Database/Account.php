<?php
	header('Access-Control-Allow-Origin: *');
	
	$ip = "0.0.0.0";
	$user = getenv('C9_USER'); 	//Define database username
	$db = "CelebDeath";			//Dataase username
	
	    
	$session = $_POST['session'];		//Retrieve the session that has been posted by the front end.

	// Create connection
	$connection = mysqli_connect($ip,$user,"",$db);		//Connect to the database using defined credentials.
	if(mysqli_connect_errno()){
			echo "connection to database failed.";			
			
	}
	else{
	    $query = "SELECT * FROM users WHERE oauth_uid = '".$session."'";	//Retrieve the appropriate columns from the users table.
	  	$results = mysqli_query($connection, $query);
	  	
	  	while($row = mysqli_fetch_assoc($results)) {
			
			//$answer = $row['battles_won']."L".$row['battles_lost'];		//A string is made with the data
			
			$ans = array('battles_won' => $row['battles_won'],
						 'battles_lost' => $row['battles_lost'],
						 'picture' => $row['picture']);
	  		
	  		echo json_encode($ans);		//Data is returned to the front end.
	  		
	  	}
	}
?>