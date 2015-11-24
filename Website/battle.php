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
        </script>
        
        <script src="js/battle/TweetVisualization.js" type="text/javascript" charset="utf-8"></script>
<!-- 
        <div id="game">
            <canvas id="board"></canvas>
            <div id="tweetWrapper"></div>
        </div>
        
        <form action="https://project-fall-semester-2015-kikedaddy-1.c9.io/CDHBackend/erlang-php-bridge.php" method="post" accept-charset="UTF-8">
            <input id="session" type="hidden" value=<?php echo session_id(); ?> name="session"/>
            <input id="Celeb1" type="hidden" value="Cristiano Ronaldo" name="Celeb1"/>
            <input id="Hp1" type="hidden" value=10 name="Hp1"/>
            <input id="Celeb2" type="hidden" value="Kim Kardashian" name="Celeb2"/>
            <input id="Hp2" type="hidden" value=10 name="Hp2"/>
            <input id="start" type="submit" value="Start"/>
        </form>
            
-->
        <input id="hit1" type="button" value="Hit" />
        <input id="hit2" type="button" value="Hit" />

<?php

    include("front_basic/footer.php"); 
?>

<!--Correct way to retrieve session: $_SESSION['request_vars']['screen_name'];  NOTE: SHOULD CHECK IF LOGGED IN FIRST!!!!-->