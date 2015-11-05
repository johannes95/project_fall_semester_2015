// Variable declaration
var board;
var character, character2;
var width = 300, height = 150;
var chosenCelebrity, cpuCelebrity;

window.onload = function() { 					  // Loads when the page(battle.html) loads
	
	board = document.getElementById("board"); 	  // Get the context to draw on, the html canvas reference(battle.html)
	playerCelebrity = new KimKardashian();
	cpuCelebrity = new Tmp();
	character = new Character(10,0,playerCelebrity, true); 			  // Initializes a character(Character.js)
	character2 = new Character(200,0,cpuCelebrity, false);
	
	//celebrity = new Celebrity(15,15);
	
	// Game loop
	setInterval(		 // Calls a function with a set frequency
		function() {
		    update();	 // Update the game properties
		    draw(board); // Draw with the updated properties
		}, 30			 // Each function is called 30 times per second
	);
	// End Game loop

};

function draw(board) {
	
	var context = board.getContext("2d"); // Get the context to draw on
	context.clearRect(0,0,width,height);  // Clear the screen
	
	character.draw(context);			  // Draw the character on the screen
	character2.draw(context);
	
}

function update() {

	character.update();					  // Update the character(movements etc)
	character2.update();

}