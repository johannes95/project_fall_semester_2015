<?php
	header('Access-Control-Allow-Origin: *');

	$dbServer = getenv('C9_IP'); //Define database server host
	$dbUsername = getenv('C9_USER'); //Define database username
	$dbPassword = ''; //Define database password
	$dbName = 'CelebDeath'; //Define database name
	$dbport = 3306; //Define port to connect to (default on C9)
	
	//GET is used by the front end to retrieve values from the database queue
    if(!empty($_GET))
    {
    	$session = $_GET['session']; //Gets the username under which the search will be performed.
    	if ($_GET['action'] == "empty")
    	{
    		$con = mysqli_connect($dbServer,$dbUsername,$dbPassword,$dbName,$dbport);
    		if(mysqli_connect_errno()){
				$result["success"] = false;
			}else{
	    		mysqli_query($con, "DELETE FROM queue where Session='".$session."'");
	    		$result["success"] = true;
			}
			mysqli_close($con);
			echo json_encode($result);
    	}
    	else {
	        $session = $_GET['session']; //Gets the username under which the search will be performed.
			//Connect databse
			$con = mysqli_connect($dbServer,$dbUsername,$dbPassword,$dbName,$dbport);
			if(mysqli_connect_errno()){
				$result["success"] = false;
			}else{
				// Select all rows for that current session
			    $sql = "SELECT * FROM queue WHERE Session = '".$session."'";
				$prevQuery = mysqli_query($con,$sql);
				if(mysqli_num_rows($prevQuery) > 0) {
	    		    $result = mysqli_fetch_all($prevQuery, MYSQLI_ASSOC);
	    		    foreach ($result as $row) {
	    		    	//Delete all rows that were retrieved
	    		    	mysqli_query($con, "DELETE FROM queue where Session='".$session."' AND Attacker='".$row["Attacker"]."' AND HP1='".$row["HP1"]."' AND HP2='".$row["HP2"]."' AND Date= '".$row["Date"]."'");
	    		    }
	    		    $result["success"] = true;
				} else {
				    $result["success"] = false;
				}
				// Close connection
	        mysqli_close($con);
	        //return Json representation of the result
	    	echo json_encode($result);
			}
    	}
    }
    //POST is used by the back end to post values into the database queue
    else if(!empty($_POST))
    {
    	//Get all the post values
    	$session = $_POST['session'];
    	$attacker = $_POST['attacker'];
    	$hp1 = $_POST['hp1'];
    	$hp2 = $_POST['hp2'];
    	$tweet = $_POST['tweet'];
    	//Connect databse
		$con = mysqli_connect($dbServer,$dbUsername,$dbPassword,$dbName,$dbport);
		if(mysqli_connect_errno()){
			$result["success"] = false;
		}else{
			$insert = mysqli_query($con,"INSERT INTO queue SET Session = '".$session."', Attacker = '".$attacker."', HP1 = '".$hp1."', HP2 = '".$hp2."', Tweet = '".$tweet."', date = '".date("Y-m-d H:i:s")."'");
			$result["succes"] = $insert;
		}
		//Close connection
		mysqli_close($con);
		//Return Json representation of result(seccesful or not)
		echo json_encode($result);
    }
    else{

?>
		<h1>Test for post</h1> 
		<form action="Battle.php" method="post"> 
            session:<br /> 
            <input type="text" name="session" placeholder="session" value="" /> 
            <br />
            Attacker:<br /> 
            <input type="text" name="attacker" placeholder="C" value="" /> 
            <br />
            Tweet:<br /> 
            <input type="text" name="tweet" placeholder="Tweet" value="" /> 
            <br />
            HP1:<br /> 
            <input type="text" name="hp1" placeholder="HP1" value="" /> 
            <br />
            HP2:<br /> 
            <input type="text" name="hp2" placeholder="HP2" value="" /> 
            <br />
            <input type="submit" value="POST" /> 
        </form> 
		<a href="Battle.php"></a>
		
		
        <h1>Test for Get</h1> 
		<form action="Battle.php" method="get">     
			action:<br /> 
            <input type="text" name="action" placeholder="action" value="" /> 
            <br />
             session2:<br /> 
            <input type="text" name="session" placeholder="session2" value="" /> 
            <br />

            <input type="submit" value="GET" /> 
		</form> 
		<a href="Battle.php"></a>
<?php
	}
?>