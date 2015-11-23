// Variable declaration
var board;
var character, character2;
var width = 300, height = 150;
var playerCelebrity, cpuCelebrity;
var hp1 = 38, hp2 = 36;
var queue = Array();
var session = "kikedaddyo";
var DBTimer = 0;


$(document).ready(function(){

	/*********************DELETE^^^^^^^^^***************/
	// Loads when the page(battle.html) loads
	
	board = document.getElementById("board"); 	  // Get the context to draw on, the html canvas reference(battle.html)
	playerCelebrity = new KimKardashian();        // From CelebDatabase.js
	cpuCelebrity = new CristianoRonaldo();		  // From CelebDatabase.js
	character = new Character(0,0,playerCelebrity, false); 			  // Initializes a character(Character.js)
	character2 = new Character(200,0,cpuCelebrity, true);
	
	//celebrity = new Celebrity(15,15);
	
	//setInterval(check database and load queue) every 5 seconds
	//var time_interval = 5000;
	/*setInterval(*/function checkDB(){
		
		//Make http request
		 var url = "https://celebrity-database-arnolf.c9.io/Database/Battle.php";
		 var client = new XMLHttpRequest();
		 client.open('GET', url+"?session="+session, true);
		 client.onreadystatechange = function() {
		 	if (client.readyState == 4 && client.status == 200) {
		    	var subresponse = client.responseText;
			 	var response = jQuery.parseJSON(subresponse);
			 	//check what data was returned
				if(response.success != false){
					
					for(var i = 0; i < Object.keys(response).length-1; i++){ //loop through the return json
						addToQueue(response[i]); // add current tuple to queue
						//console.log("queue:");
						//console.log(queue);
					}
					console.log("Done loading actions.");
				}else{
					console.log("Something went wrong, or the array returned was empty");
				}
		    }
		 }
		 client.send();
	}/*, time_interval);*/


	//return first object in queue if queue isn't empty
	function getQueueItem() {
		if(queue.length != 0){
			return queue.shift(); // return first obejct since js push adds new objects at the end of an array
		}else{
			return null; // if queue is empty
		}
	}
	
	
	function addToQueue(object){
		if(object != null){
			queue.push(object);
		}else{
			console.log("Could not save action to queue");
		}
		
	}



	
	
	// Game loop
	setInterval(		 // Calls a function with a set frequency
		function() {
		    update();	 // Update the game properties
		    draw(board); // Draw with the updated properties
		    if(DBTimer++ == 100) {
		    	checkDB();
		    	DBTimer =0;
		    }
		    if (character.shouldPunch == false && character.isPunching==false && character.isWalking==false &&
		    	character2.shouldPunch == false && character2.isPunching==false && character2.isWalking==false)
		    	if (queue.length > 0) {
		    		var action = getQueueItem();
		    		console.log("Action available:");
		    		console.log(action);
		    	}
		    										// Do whatever is in variable action (depends on how johannes queued)
		}, 45			 // Each function is called 30 times per second
	);
	// End Game loop

    document.getElementById("hit1").onmousedown = function() {
        hit1();
    }

    document.getElementById("hit2").onmousedown = function() {
        hit2();
    }

});

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
	if(character.x == 0) {
		character.hit();
		hp2--;
	}
}

function hit2() {
	if(character2.x == 200) {
		character2.hit();
		hp1--;
	}	
}

function drawHpBars(context) {
	
	context.fillStyle = "red";
	context.fillText("HP: 38/" + hp1, 10, 10);
	context.fillText("HP: 36/" + hp2, 220, 10);
	
}
/* Might not be needed since Alex and Mike will figure out how to initialize the session.
function makeid(l)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( var i=0; i < l; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
*/
//alert(makeid(10));

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