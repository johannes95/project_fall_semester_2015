<?php
header('Access-Control-Allow-Origin: *');
include_once ("functions.php");

    if (!empty($_POST)) {
        $userid = $_POST['userid'];
        $username = $_POST['username'];
        $access_token = $_POST['access_token'];
        $access_secret = $_POST['access_secret'];
        $profile_image = $_POST['profile_image'];
        //$oauth_uid,$username,$oauth_token,$oauth_secret
        $db_user = new Users();
        print_r( $db_user->checkUser($userid,$username,$access_token, $access_secret, $profile_image));
    }
    else {
?>
		<h1>Test</h1> 
		<form action="Users.php" method="post"> 
		    Userid:<br /> 
		    <input type="text" name="userid" placeholder="userid" /> 
		    <br />

		    username:<br /> 
		    <input type="text" name="username" placeholder="username" value="" /> 
            <br /> 
		    access token:<br /> 
		    <input type="text" name="access_token" placeholder="access_token" value="" /> 
		    <br />
		    access secret:<br /> 
		    <input type="text" name="access_secret" placeholder="access_secret" value="" /> 
		    

            <input type="submit" value="Submit Action" /> 
		</form> 
		<a href="Users.php"></a>
	<?php
}
?>	
		