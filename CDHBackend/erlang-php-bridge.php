<?php
header('Access-Control-Allow-Origin: *');	
if (!empty($_POST)) {

  $session = $_POST['session'];
  $Celeb1 = $_POST['Celeb1'];
  $Hp1 = $_POST['Hp1'];
  $Celeb2 = $_POST['Celeb2'];
  $Hp2 = $_POST['Hp2'];
  $message = (string)$session ." ". $Celeb1 ." ". $Hp1 ." ". $Celeb2 ." ". $Hp2;
  
  if(!($sock = @socket_create(AF_INET, SOCK_STREAM, 0)))
  {
      $errorcode = socket_last_error();
      $errormsg = socket_strerror($errorcode);
      $response['success'] = false;
  }
  //Connect socket to remote server
  elseif(!@socket_connect($sock , '0.0.0.0' , 10000))
  {
      $errorcode = socket_last_error();
      $errormsg = socket_strerror($errorcode);
       
      $response['success'] = false;
  }
  elseif(!@socket_send ( $sock , $message , strlen($message) , 0))
  {
      $errorcode = socket_last_error();
      $errormsg = socket_strerror($errorcode);
       
      $response['success'] = false;
  }
   
  //Now receive reply from server
  //This should not be here for async messages!!!!!
  elseif(@socket_recv ( $sock , $buf , 100 , MSG_PEEK ) === FALSE)
  {
      $errorcode = socket_last_error();
      $errormsg = socket_strerror($errorcode);
       
      $response['success'] = false;
  }
  else 
  {
    $response['success'] = true;
    $response['msg'] = $buf;
  }
  echo json_encode($response);
}
else if(!empty($_GET['error'])) {
  //HARD CODED HERE!!!!
  echo '<script src="https://frontend-arnolf.c9users.io/Website/js/battle/Game.js">'
    , 'addToQueue("crash");'
    , '</script>';
              
  echo '<script type="text/javascript" charset="utf-8">'
    , 'console.log("Error cought");'
    ,'</script>';
              
  echo '<html><body><h1>'.$_GET['error'].'</h1></body></html>';
  
}
else {
?>
 <h1>Test</h1> 
 <form action="erlang-php-bridge.php" method="post"> 
     Session:<br /> 
     <input type="text" name="session" placeholder="MSG" /> 
     <br />
     Celeb1:<br /> 
     <input type="text" name="Celeb1" placeholder="MSG" /> 
     <br />
     Hp1:<br /> 
     <input type="text" name="Hp1" placeholder="MSG" /> 
     <br />
     Celeb2:<br /> 
     <input type="text" name="Celeb2" placeholder="MSG" /> 
     <br />
     Hp2:<br /> 
     <input type="text" name="Hp2" placeholder="MSG" /> 
     <br />
     

        <input type="submit" value="SEND" /> 
 </form>
<?php
}

?>