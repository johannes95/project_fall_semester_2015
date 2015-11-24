<?php
	header('Access-Control-Allow-Origin: *');	
	$ip = "0.0.0.0";
	$user = "arnolf";
	$db = "CelebDeath";
	
	if (!empty($_GET)) {
		$session = $_GET['session'];
		// Create connection
		$connection = mysqli_connect($ip,$user,"",$db);
		if(mysqli_connect_errno()){
				$result["success"] = false;
		}
		else
		{
			$query = "SELECT * FROM celebs";
			$results = mysqli_query($connection, $query);
			$result["success"] = true;
			// $numRows = mysql_num_rows($results);
			$celebarray = array();
			while($row = mysqli_fetch_assoc($results)) {
				$temp = array('Name'=> $row['Name'], 'Handle'=>  $row['Handle'], 'Picture' => $row['Picture'], 'HP'=> $row['HP']);
				array_push($celebarray, $temp);
				//$celebarray[$row['Name']] = array('Handle'=>  $row['Handle'], 'Picture' => $row['Picture']);
			}
			$result['celebs'] = $celebarray;
		}
		//Returns an array with celebs in the format $celebarray['Handle1-n']
		echo json_encode($result);
	}
	else {

	

//$test = getCelebs();

//echo "<html><body><br><a>".$test['Handle5']."</body></html>";

?>
        <h1>Test for Get</h1> 
		<form action="Celebrity.php" method="get">     
             Mike is awesome:<br /> 
            <input type="text" name="session" placeholder="" value="" /> 
            <br />

            <input type="submit" value="GET" /> 
		</form> 
<?php
	}



// $CelebNames = array("Kim Kardashian", "Cristiano Ronaldo");
// foreach($celeb as $CelebNames)
// 	$result['Array'][$Celeb]['Handle']

			// $url = "https://celebrity-database-arnolf.c9.io/Database/Celebrity.php";
			// $qry_str = "?sesssion=".$session;
			// //open connection
			// $ch = curl_init();
			
			// Set query data here with the URL
			// curl_setopt($ch, CURLOPT_URL, $url . $qry_str); 
			
			// //do curl get
			// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			// curl_setopt($ch, CURLOPT_TIMEOUT, '3');
			// $answer = trim(curl_exec($ch));
			
			// //close connection
			// curl_close($ch);