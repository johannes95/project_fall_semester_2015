<?php
    
    // Create connection
    $IP = "0.0.0.0";
    $C9_USER = "arnolf";
    
    //mysqli_connect(host,username,password,dbname); << guideline
    $con=mysqli_connect($IP, $C9_USER, "", "DateAGamer");

    // Check connection
    if (mysqli_connect_errno()) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    
    $query = "select * from UserInfo where Nickname='".$_POST['login']."' and Password='".$_POST['passwd']."' and UserID=".$_SESSION['userID'];
    
    $result = mysqli_query($con, $query);
    
    if (isset($result)) {
      echo '<html><body><br><a><b>Result is set</b></a><br>';
    }
    
    $row = mysqli_fetch_assoc($result);
    
    echo "<a>".$row['Nickname']."<br>";
    echo $row['Password']."<br>";
    echo $row['UserID']."<br></a>";
    
    echo '</body></html>';
    
?>
