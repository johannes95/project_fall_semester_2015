<?php
    include("front_basic/header.php");
    include_once("front_basic/urllist.php");
  	
  	
   
    $my_session = $_SESSION["request_vars"]["user_id"];
    $my_username = $_SESSION["request_vars"]["username"];
  //	echo print($my_username);
    
	$ch = curl_init();                    // initiate curl
	$url = $getUserHistoryUrl; // set the url to post to
	curl_setopt($ch, CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_POST, true);  // tell curl you want to post something
	curl_setopt($ch, CURLOPT_POSTFIELDS, "session=".$my_session); // define the url to be posted
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // return the output in string format
	$output = curl_exec($ch); //string, format: "xxLyy" where xx is the number of wins and yy is the number of losses, "L" is the breaker
	curl_close ($ch); // close curl handle 
	
	//echo print($output);
	$L_pos = strpos($output,"L"); //position of 'L' in $output string so that we know where the losses is located.
	$won = substr($output,0,$L_pos); // a new string is made from the 1st index up to the position of L(this is a string of the total number of wins)
	$lost = substr($output,$L_pos+1); // a string is also made for the number of losses, starting from after the "L" 
	$total = $won+$lost;	// total number of battles fought
	if ($total > 0)
		$winpercent = round(($won/$total*100), 2);	// win% of all battles (rounded up to 2 dp)
	else
		$winpercent = 0;

	
?>                
    
    <section>
 
        
        <div id="character-list"  <div style="margin:20 auto;">
        	<selection> Battles fought: <?php   echo $total ?>  </selection>
            <selection> Battles won:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php   echo $won ?> </selection>
            <selection> Win%:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   <?php  echo $winpercent ?>%</selection>
            
    </section>
    
    
<?php 
    include("front_basic/footer.php"); 
?>