<?php
    include("front_basic/header.php"); 
?>

    <link href='https://fonts.googleapis.com/css?family=Indie+Flower' rel='stylesheet' type='text/css'>
    <link type="text/css" rel="stylesheet" href="css/stylesheet.css" />
    
    <title>Battle | Celebrity Death#</title>
    
    <!--javascript files -->
    <script src="js/battle/keymaster.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/battle/Game.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/battle/Character.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/battle/Celebrity.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/battle/SpriteSheet.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/battle/CelebDatabase.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/battle/TweetVisualization.js" type="text/javascript" charset="utf-8"></script>
     
     <!-- NEW -->
    <div id="game">
        <canvas id="board"></canvas>
        <div id="tweetWrapper"></div>
    </div>
    
    <input id="hit1" type="button" value="Hit" />
    <input id="hit2" type="button" value="Hit" />

<?php 
    include("front_basic/footer.php"); 
?>