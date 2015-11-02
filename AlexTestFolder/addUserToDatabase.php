<?php
ob_start();
include("include/functions.php");
    function getLargestIdInUsers(){
        $IP = "0.0.0.0";
        $C9_USER = "arnolf";
        
        
        $con=mysqli_connect($IP, $C9_USER, "", "DateAGamer");
    
        // Check connection
        if (mysqli_connect_errno()) {
          echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }
        
        $query = getMaxIdInUsers();
        
        // Perform Query
        $result = mysqli_query($con,$query);
        
        // Check result
        // This shows the actual query sent to MySQL, and the error. Useful for debugging.
        if (!$result) {
            $message  = 'Invalid query: ' . mysqli_error() . "<br>";
            $message .= 'Whole query: ' . $query;
            die($message);
        }
        
        // Use result
        // Attempting to print $result won't allow access to information in the resource
        // One of the mysql result functions must be used
        // See also mysql_result(), mysql_fetch_array(), mysql_fetch_row(), etc.
        while ($row = mysqli_fetch_assoc($result)) {
            return $row['MaxID'];
        }
        
        return -1; //Indicates no user
    }

    error_reporting(E_ALL);
    
    
    // Create connection
    $IP = "0.0.0.0";
    $C9_USER = "arnolf";
    
    //mysqli_connect(host,username,password,dbname); << guideline
    $con=mysqli_connect($IP, $C9_USER, "", "DateAGamer");

    // Check connection
    if (mysqli_connect_errno()) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    
    $userID = getLargestIdInUsers()+1;
    $username = htmlspecialchars($_POST["Username"]);
    $password = htmlspecialchars($_POST['Password']);
    $name = htmlspecialchars($_POST['Name']);
    $surname = htmlspecialchars($_POST['Surname']);
                                                    //$FBid= htmlspecialchars($_POST["FacebookID"]);
    $address = htmlspecialchars($_POST["Address"]);
    $postalcode = htmlspecialchars($_POST['Postalcode']);
    $city = htmlspecialchars($_POST["City"]);
    $phonenumber = htmlspecialchars($_POST["Phonenumber"]);
    
    
   
  
     
    $query = getAdduserSql($userID, $username, $name, $surname, $address, $postalcode, $city, $phonenumber/*, $FBid*/);
//    echo $query."<br>";
    $usrInfo = setUserInfoSQL($username, $password, $userID);
///    echo $usrInfo."<br>";
    
    session_start();
    $_SESSION["username"] = $username;
    $_SESSION["userID"] = $userID;
    
//    echo $_SESSION['username']." = ".$username." <br> ".$_SESSION['userID']." = ".$userID;
    
    if (userAuthcheckSQL($userID, $username) == TRUE) {
        //Perform Query
        mysqli_query($con, $query);
        mysqli_query($con, $usrInfo);
    }
    
    //Redirect user
    /*
    echo '<script type="text/javascript">'
       , 'window.location = "https://dateagamer-arnolf.c9.io/";'
       , '</script>'
    ;
    */
    mysqli_stmt_close($query);
    
?>