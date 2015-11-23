// Variable declaration
var board;
var character, character2;
var width = 300, height = 150;
var chosenCelebrity, cpuCelebrity;
var hp1 = 38, hp2 = 36;

//var queue = Array();


window.onload = function() { 					  // Loads when the page(battle.html) loads
	
	board = document.getElementById("board"); 	  // Get the context to draw on, the html canvas reference(battle.html)
	//playerCelebrity = new KimKardashian();        // From CelebDatabase.js
	//cpuCelebrity = new CristianoRonaldo();		  // From CelebDatabase.js
	cpuCelebrity = new TaylorSwift();
	playerCelebrity = new BarackObama();
	//playerCelebrity = new JustinBieber();
	//cpuCelebrity = new JustinTimberlake();
	character = new Character(0,0,cpuCelebrity, false); 			  // Initializes a character(Character.js)
	character2 = new Character(200,0,playerCelebrity, true);
	
	//celebrity = new Celebrity(15,15);
	
	//setInterval(check database and load queue) every 5 seconds
	
	// Game loop
	setInterval(		 // Calls a function with a set frequency
		function() {
		    update();	 // Update the game properties
		    draw(board); // Draw with the updated properties
		    //if ! action happening	
		    	//check if anything in queue
		    	//true -> do action
		}, 45			 // Each function is called 30 times per second
	);
	// End Game loop

    document.getElementById("hit1").onmousedown = function() {
        hit1();
        addTweet("TaylorSwift","Hit @BarackObama heeyoooo");
    }
    
    document.getElementById("hit2").onmousedown = function() {
        hit2();
        addTweet("BarackObama","Hit TaylorSwift");
    }
    
};

function draw(board) {
	
	var context = board.getContext("2d"); // Get the context to draw on
	context.clearRect(0,0,width,height);  // Clear the screen
	
	if(hp1 > 0 && hp2 > 0) {
		character.draw(context);			  // Draw the character on the screen
		character2.draw(context);
		
		drawHpBars(context);
		// draw tweets
	
	} else if(hp1 <= 0) {
		gameOverText(context, 0);
	} else if(hp2 <= 0) {
		gameOverText(context, 1);
	}
	
}

function update() {
	
	character.update();					  // Update the character(movements etc)
	character2.update();

}

function hit1() {
	character.hit();
	hp2--;
}

function hit2() {
	character2.hit();
	hp1--;
}

function drawHpBars(context) {
	
	context.fillStyle = "red";
	context.fillText("HP: 38/" + hp1, 10, 10);
	context.fillText("HP: 36/" + hp2, 220, 10);
	
}

var gameOverColor = 0,
	colorArray = ["#000000", "#111111", "#222222", "#333333", "#444444", "#555555", "#666666", "#777777", "#888888", "#999999"],
	goBack = 0;

function gameOverText(context,celebrity) {

	var gradient = context.createLinearGradient(0,0,width,0);
		
	for(var i=0; i<10; i++){
			
		if(gameOverColor == i) {
			if(i == 7 || goBack == 1) {
				gradient.addColorStop("0", colorArray[i+2]);
				gradient.addColorStop("0.5", colorArray[i+1]);
				gradient.addColorStop("1.0", colorArray[i]);
				gameOverColor -=1;
				goBack = 1;
				if(i == 3){goBack = 0}
				break;
			}else {
				gradient.addColorStop("0", colorArray[i]);
				gradient.addColorStop("0.5", colorArray[i+1]);
				gradient.addColorStop("1.0", colorArray[i+2]);
				
				gameOverColor++;
				break;
			}
		}
	}
		
	context.fillStyle = gradient;
	// context.font = "50px Arial";
	
	if(celebrity == 0) {
		context.fillText("Cristiano Ronaldo died", 10, 10);
	}else {
		context.fillText("Kim Kardashian died", 10, 10);	
	}

}