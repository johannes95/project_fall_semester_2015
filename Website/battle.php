<?php
    include("front_basic/header.php");
?>

    <div id="Pictures">
    </div>
    <div id="game">
    </div>

        <link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet" type="text/css">
        <link type="text/css" rel="stylesheet" href="css/stylesheet.css" />
        
        <title>Battle | Celebrity Death#</title>
        
        <!--javascript files -->
        <script src="js/battle/keymaster.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/battle/Game.js" type="text/javascript" charset="utf-8"></script>
        
        <script type="text/javascript">
            var urlBattleQueue = "<?= $getBattleQueueURL ?>";
        </script>
        
        <script src="js/battle/Character.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/battle/Celebrity.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/battle/SpriteSheet.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/battle/CelebDatabase.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/battle/Character_popup.js" type="text/javascript" charset="utf-8"></script>
        
        <script type="text/javascript"> 
            var urlCelebData = "<?= $getCelebDataURL ?>";
            var urlPhpBridge = "<?= $getPhpBridgeURL ?>";
            var urlStatistics = "<?= $getStatisticsURL ?>";
        </script>
        
        <script src="js/battle/TweetVisualization.js" type="text/javascript" charset="utf-8"></script>
        
        <input id="hit1" type="button" value="Hit" />
        <input id="hit2" type="button" value="Hit" />

<?php

    include("front_basic/footer.php"); 
?>

<!--Correct way to retrieve session: $_SESSION['request_vars']['screen_name'];  NOTE: SHOULD CHECK IF LOGGED IN FIRST!!!!-->