    <!--
        This file makes the menu for every page. It checks what the current page is and 
        creates the menu according to that.
        It also checks if a user is logged in or not to make the appropriate menu items
        depending on that.
        
    -->
    
    <script type="text/javascript">
        
        $(document).ready(function(){
            var current_url = window.location.href;
            current_url = current_url.split("/");
            current_url = current_url[current_url.length - 1];
            
            switch(current_url){
                case "battle.php":
                    $("#nav-item-battle").addClass("current-link");
                    break;
                case "index.php":
                    $("#nav-item-index").addClass("current-link");
                    break;
                case "characters.php":
                    $("#nav-item-characters").addClass("current-link");
                    break;
                default:
                    alert("unknown menu item, check menu.php");
                    break;
            }
        });
    </script>

    <nav>
        <!-- Menu Item Home -->
        <div id="nav-item-index" class="nav-item" style="margin-left:0 !important;"><a href='index.php'>Home</a></div>
       
        <?php
        //Checks if the user is logged in
    	if(isset($_SESSION['status']) && $_SESSION['status'] == 'verified') 
    	{
    	?>
        	 <!-- Menu Item Battle -->
            <div id="nav-item-battle" class="nav-item"><a href="battle.php" >Battle</a></div>
    	    <!-- Menu Item Character -->
    	    <div id="nav-item-characters" class="nav-item"><a href="characters.php" >My character</a></div>
            <!-- Menu Item Logout -->
            <div class="nav-item"><a href="front_basic/logout.php?logout">Logout</a></div>
    	<?php
    	}else{
    	    //User not logged in
    		//Display login button
    		echo '<a style="float:right;" href="front_basic/login.php"><img src="img/sign_in/sign-in-with-twitter.png" width="151" height="24" border="0" /></a>';
    	}
        ?> 
    </nav>
</header>

