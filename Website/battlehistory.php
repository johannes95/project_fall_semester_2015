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
	$encodedOutput = curl_exec($ch); //string, format: "xxLyy" where xx is the number of wins and yy is the number of losses, "L" is the breaker
	curl_close ($ch); // close curl handle 
	
	$output = json_decode(trim($encodedOutput), TRUE);
	
	//Extract values for win/loss and picture URL
	$won = $output['battles_won'];
	$lost = $output['battles_lost'];
	$pic = $output['picture'];
	
	$total = $won+$lost;	// total number of battles fought
	
	
	
	if ($total > 0)
		$winpercent = round(($won/$total*100), 2);	// win% of all battles (rounded up to 2 dp)
	else
		$winpercent = 0;

	if (!isset($won) || !isset($lost)) {
		echo '
			<section>
				<div id="character-list" <div style="margin:20 auto;">
					<br>
					<a>Could not fetch battle info!</a>
					<br>
				</div>
			</section>';
	} else if (!isset($pic)) {
		echo '
			<section>
				<div id="character-list" <div style="margin:20 auto;">
					<br>
					<a>Could not fetch profile picture!</a>
					<br>
				</div>
			</section>';
	}
?>                
    
    <section>
 
        
        <div id="character-list"  <div style="margin:20 auto;">
        	
        	<a id="B_F_T"> Battles fought: </a>		<a id ="B_Fought"><?php   echo $total ?>  		</a><br>
            <a id="B_W_T"> Battles won:    </a>		<a id ="B_Won"><?php   echo $won ?> 	   		</a><br>
            
            <img id="Profile_Pic" src="<?php echo $pic; ?>" alt="Profile Picture" style="width:120px;height:88px;">
            
            <a id="B_P_T"> Win%: 		   </a>		<a id="B_Percent"><?php  echo $winpercent ?>% 	</a>
            
        </div>
            
    </section>
    
    
<?php 
    include("front_basic/footer.php"); 
?>