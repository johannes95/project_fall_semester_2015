<?php
class Users {
	public $tableName = 'users';
	
	function __construct(){
		//Database configuration
		$dbServer = getenv('C9_IP'); //Define database server host
		$dbUsername = getenv('C9_USER'); //Define database username
		$dbPassword = ''; //Define database password
		$dbName = 'CelebDeath'; //Define database name
		$dbport = 3306;
		
		//Connect databse
		$con = mysqli_connect($dbServer,$dbUsername,$dbPassword,$dbName,$dbport);
		if(mysqli_connect_errno()){
			// ********************************************************** Should not die, must change to keep flow
			die("Failed to connect with MySQL: ".mysqli_connect_error());
		}else{
			$this->connect = $con;
		}
	}
	
	function checkUser($oauth_uid,$username,$oauth_token,$oauth_secret){
		$prevQuery = mysqli_query($this->connect,"SELECT * FROM $this->tableName WHERE oauth_uid = '".$oauth_uid."'") or die(mysqli_error($this->connect));
		if(mysqli_num_rows($prevQuery) > 0){
			$update = mysqli_query($this->connect,"UPDATE $this->tableName SET oauth_token = '".$oauth_token."', oauth_secret = '".$oauth_secret."', modified = '".date("Y-m-d H:i:s")."' WHERE oauth_uid = '".$oauth_uid."'") or die(mysqli_error($this->connect));
		}else{
			$insert = mysqli_query($this->connect,"INSERT INTO $this->tableName SET oauth_uid = '".$oauth_uid."', username = '".$username."', oauth_token = '".$oauth_token."', oauth_secret = '".$oauth_secret."', picture = '".$profile_image_url."', created = '".date("Y-m-d H:i:s")."', modified = '".date("Y-m-d H:i:s")."'") or die(mysqli_error($this->connect));
		}
		
		$query = mysqli_query($this->connect,"SELECT * FROM $this->tableName WHERE oauth_uid = '".$oauth_uid."'") or die(mysqli_error($this->connect));
		$result = mysqli_fetch_array($query);
		return $result;
	}
}
?>