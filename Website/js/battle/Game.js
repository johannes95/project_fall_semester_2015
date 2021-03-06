// Variable declaration
//var urlBattleQueue = "<?php echo $getBattleQueueURL ?>";
var board;
var character, character2;
var width = 300, height = 150;
var cpuCelebrity;
var hp1, hp2;
var originalhp1, originalhp2;
var positionP1 = 0;
var positionP2 = 225;
var playerCelebrity;
var cpuCelebrity;
// TESTING KIKE AND JOHANNES
var queue = Array();
var DBTimer = 0;
var session; //This is temporary until we get the session from the start button.
var gameover;
var temphp1;
var temphp2;


//Could do windows.onload = function(Session = getSession())
function start(sess, celeb1, h1, celeb2, h2){
	////KIKEDADDYO!!!
    window.onbeforeunload = function(event) {
    	if (!gameover)
        	event.returnValue = "If you leave it will count as a loss.";
    };
    window.onunload = function(event) {
		if (!gameover) {
        	updateStats("lost");
        	cancelBattleBack();
		}
    };
    
	gameover = false;
	session=sess;
	originalhp1 = h1;
	originalhp2 = h2;
	hp1= h1;
	hp2 = h2;
	console.log("Into the battle- c1:"+celeb1+" h1:"+h1+" celeb2:"+celeb2+" h2:"+h2)
	
	board = document.getElementById("board"); 	  // Get the context to draw on, the html canvas reference(battle.html)
	
	playerCelebrity = new NewCeleb(celeb1, 75, 100);
	cpuCelebrity = new NewCeleb(celeb2, 75, 100);

	character = new Character(positionP1,0,playerCelebrity, false); 			  // Initializes a character(Character.js)
	character2 = new Character(positionP2,0,cpuCelebrity, true);

	//setInterval(check database and load queue) every 5 seconds
	// Game loop
	setInterval(		 // Calls a function with a set frequency
		function() {
		    update();	 // Update the game properties
		    draw(board); // Draw with the updated properties
		    if(DBTimer++ == 100 && !gameover) {
		    	checkDB();
		    	DBTimer =0;
		    }
		    if (character.x == positionP1 && character2.x == positionP2) {
		    	if (queue.length > 0) {
		    		var action = getQueueItem();
		    		console.log("Action available:");
		    		console.log(action);
		    		
		    		if (action.Attacker!="terminate") {
		    			if (action.Attacker == playerCelebrity.name) {
		    				hit1(action.HP1,action.HP2);
		    				addTweet(playerCelebrity.name,"Hit " +  cpuCelebrity.name + ": </br>" + action.Tweet);
		    				//This is where we need to do the hp as well and the tweet
		    			}
		    			else if (action.Attacker == cpuCelebrity.name) {
		    				hit2(action.HP1,action.HP2);
		    				addTweet(cpuCelebrity.name,"Hit " +  playerCelebrity.name + ": </br>" + action.Tweet);
		    				//This is where we need to do the hp as well and the tweet
		    			}
		    			else
		    			{
		    				console.log("Error. Attacker: " + action.Attacker + " does not match player: " + 
		    				playerCelebrity.name + " nor cpu: " + cpuCelebrity.name);
		    			}
		    		} else {
		    			gameover = true;
						alert("Server crashed");
						location.reload();
					}
				}
			}
		    
		    										// Do whatever is in variable action (depends on how johannes queued)
		}, 45			 // Each function is called 30 times per second
	);
	// End Game loop
	
};

function draw(board) {
	
	var context = board.getContext("2d"); // Get the context to draw on
	context.clearRect(0,0,width,height);  // Clear the screen
	
	if((hp1 > 0 && hp2 > 0) || character.x != positionP1 || character2.x != positionP2) {
		character.draw(context);			  // Draw the character on the screen
		character2.draw(context);
		if (character.x+character.width == positionP2+25 || character2.x == positionP1+50) {
			hp1 = temphp1;
			hp2 = temphp2;
		}
		drawHpBars(context);
		// draw tweets
	
	} else if(hp1 <= 0) {
		gameOverText(context, 0);
		if (!gameover) {
			gameover = true;
			updateStats("lost");
			reset(gameover);
		}
	} else if(hp2 <= 0) {
		gameOverText(context, 1);
		if (gameover==false) {
			gameover = true;
			updateStats("win");
			reset(gameover);
		}
	}
	
}

function update() {
	
	character.update();					  // Update the character(movements etc)
	character2.update();

}

function hit1(newhp1,newhp2) {
	// makes sure that only one character can hit at a time and doesn't double hit
	if(character.x == positionP1 && character2.x == positionP2) {
		character.hit();
		temphp1 = newhp1;
		temphp2 = newhp2;
		console.log("hit1");
		console.log("temphp1 = "+temphp1);
		console.log("temphp2 = "+temphp2);
	}
}

function hit2(newhp1, newhp2) {
	// makes sure that only one character can hit at a time and doesn't double hit
	if(character.x == positionP1 && character2.x == positionP2) {
		character2.hit();
		temphp1 = newhp1;
		temphp2 = newhp2;
		console.log("hit2");
		console.log("temphp1 = "+temphp1);
		console.log("temphp2 = "+temphp2);
	}
}

/* dimensions for the player hpbar */
var hpbar1 = {
    x: 5,
    y: 5,
    width: 125,
    height: 10
};

/* dimensions for the cpu hpbar */
var hpbar2 = {
    x: 170,
    y: 5,
    width: 125,
    height: 10
};

/* method for drawing the hpbars and celebrity names */
function drawHpBars(context) {
	
	
	var percent1 = hp1 / originalhp1; //percentage of life left
	var percent2 = hp2 / originalhp2; 
	
	
	/* draws both hp bars*/
	context.fillStyle = "white"; 
	context.fillRect(hpbar1.x-2, hpbar1.y-1, hpbar1.width+4, hpbar1.height+2);
	context.fillRect(hpbar2.x-2, hpbar2.y-1, hpbar2.width+4, hpbar2.height+2);
	
	context.fillStyle = "red";
	context.fillRect(hpbar1.x, hpbar1.y, hpbar1.width, hpbar1.height);
	context.fillRect(hpbar2.x, hpbar2.y, hpbar2.width, hpbar2.height);
	
	context.fillStyle = "yellow";
	context.fillRect(hpbar1.x + hpbar1.width * (1-percent1), hpbar1.y, hpbar1.width * percent1, hpbar1.height);
	context.fillRect(hpbar2.x, hpbar2.y, hpbar2.width * percent2, hpbar2.height);
	
	/* draws player names*/
	context.shadowColor="blue";
	context.shadowBlur=5;
	context.font="normal small-caps bolder 12px sans-serif";
	context.textAlign="start";
	context.fillText(playerCelebrity.name, hpbar1.x, hpbar1.y+20, hpbar1.width);
	context.textAlign="end";
	context.fillText(cpuCelebrity.name, hpbar2.x + hpbar2.width, hpbar2.y+20, hpbar2.width);
	context.shadowBlur=0;
	
	/* draws KO textbox*/
	context.fillStyle = "blue";
	context.fillRect(130,3,40,14);
	
	context.fillStyle = "white";
	context.font="normal small-caps bolder 14px sans-serif";
	context.textAlign="center";
	context.fillText("KO", 150, 15, 40);
	
	/* re-aligns context*/
	context.textAlign="left";
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
		context.fillText(playerCelebrity.name + " died", 10, 10); //writes out the celebrity name on the deathscreen
	}else {
		context.fillText(cpuCelebrity.name +" died", 10, 10);
	}
}

function checkDB() {
	
	// HARD CODED!!!
	//Make http request
	 var url = urlBattleQueue;
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
}

function getQueueItem() {
	if(queue.length != 0){
		return queue.shift(); // return first obejct since js push adds new objects at the end of an array
	}else{
		return null; // if queue is empty
	}
}


function addToQueue(object) {
	if(object != null){
		queue.push(object);
	}else{
		console.log("Could not save action to queue");
	}
}

function updateStats(result){
	var url =  urlStatistics;
	var client1 = new XMLHttpRequest();
	client1.open('GET', url+"?session="+session+"&result="+result+"", false);
	client1.send();
}

function cancelBattleBack() {
	var url = urlPhpBridge;
	var params = "session="+session+"&Celeb1=terminate terminate&Hp1=99&Celeb2=terminate terminate&Hp2=99";
	var http = new XMLHttpRequest();
	http.open('POST', url, false);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send(params);
}

function reset(askUserFirst){
	var phrase = "Good job, wanna play again?";

	if(askUserFirst){

		if(confirm(phrase)){
			location.reload();
		}else{
			location.href = "index.php"
		}
	}else{
		location.reload();
	}
}