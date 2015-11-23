<?php

if (!empty($_POST)) {

if(!($sock = socket_create(AF_INET, SOCK_STREAM, 0)))
      {
          $errorcode = socket_last_error();
          $errormsg = socket_strerror($errorcode);
           
          die("Couldn't create socket: [$errorcode] $errormsg \n");
      }
       
      //Connect socket to remote server
      if(!socket_connect($sock , '0.0.0.0' , 10000))
      {
          $errorcode = socket_last_error();
          $errormsg = socket_strerror($errorcode);
           
          die("Could not connect: [$errorcode] $errormsg \n");
      }
      
      $session = $_POST['session'];
      $Celeb1 = $_POST['Celeb1'];
      $Hp1 = $_POST['Hp1'];
      $Celeb2 = $_POST['Celeb2'];
      $Hp2 = $_POST['Hp2'];
      
      $message = (string)$session ." ". $Celeb1 ." ". $Hp1 ." ". $Celeb2 ." ". $Hp2;
      
      echo "<html><body><p>".$message."</p></body></html>";
      
      //Send the message to the server
      if(!socket_send ( $sock , $message , strlen($message) , 0))
      {
          $errorcode = socket_last_error();
          $errormsg = socket_strerror($errorcode);
           
          die("Could not send data: [$errorcode] $errormsg \n");
      }
       
      //Now receive reply from server
      //This should not be here for async messages!!!!!
      if(socket_recv ( $sock , $buf , 100 , MSG_PEEK ) === FALSE)
      {
          $errorcode = socket_last_error();
          $errormsg = socket_strerror($errorcode);
           
          die("Could not receive data: [$errorcode] $errormsg \n");
      }
      
      /*
      Send a bunch of stuff back to kike here (in $buf)
      */
      //print the received message
      echo $buf."</br>";


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