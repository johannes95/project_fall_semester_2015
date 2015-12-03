var chosen;

// Loads main variables needed for this file.
function load_info() {
	var head  = document.getElementsByTagName('head')[0];
	var link  = document.createElement('link');
	chosen = "none";
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = 'css/select_char.css';
	head.appendChild(link);
}

// When the windows loads it executes this.
window.onload = function() {
	load_info();
	
	// Loads the celebrity data from the database.
	var url = urlCelebData; //Gets the url from the inicialization in battle.php
	var session =  document.getElementById("userid").innerHTML; //where we have the userid stored / hidden.
	var client = new XMLHttpRequest();
	client.open('GET', url+"?session="+session, true);
	client.onreadystatechange = function() {
		if (client.readyState == 4 && client.status == 200) // Once it gets a response.
		{
			var subresponse = client.responseText;
			var response = jQuery.parseJSON(subresponse);
			console.log(response);
		 	//check what data was returned
			if(response.success != false) { //Could find something in the database.
				createImages(session, response); //Dynamically creates the images for each celeb.
				createButton(session, response);
				console.log("Done loading celebs.");
			} else {//No data found in DB or error connecting to db.
				console.log("Something went wrong, or the celebs array returned was empty");
			}
		}
	}
	client.send();
}

// Receives the chosen player celebrity and the array of all celebrities.
// It randomly chooses an opponent and returns the information of that celebrity..
function randomizer(playerCeleb, allCelebs) {
	var num = getRandomArbitrary(0, Object.keys(allCelebs).length);
	console.log("Random num: " +num);
	if (allCelebs[num].Name == playerCeleb)
		randomizer(playerCeleb, allCelebs);
	else {
		console.log("returning from randomizer");
		var response = new Array();
		response.name= allCelebs[num].Name;
		response.hp= allCelebs[num].HP;
		console.log(response);
		return response;
	}
}

// Help method for the randomizer.
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}

// Dynamically create clickable images to select celebrity.
function createImages(session, response) {
	//loop through the return json
	for(var i = 0; i < Object.keys(response.celebs).length; i++) { 
		//add a picture as radio button
		var label= document.createElement("label");
		label.setAttribute("width","150");
		var radio = document.createElement("input");
		radio.type = "radio";
		radio.name = "radio";

		//Make the picture and add all the functionality
		var img = document.createElement("img");
		img.setAttribute("src", response.celebs[i].Picture);
		img.setAttribute("name", response.celebs[i].Name);
		img.setAttribute("id", response.celebs[i].HP);
		img.setAttribute("hspace","10");
		img.setAttribute("width","150");
		img.setAttribute("height","150");
		
		//Adds the event listener to each image.
		img.addEventListener("click", function() {
			chosen = {
				name: this.name,
				hp: this.id
			};
			console.log (chosen);
		});
		
		//add the image created and the radio button to the label created.
		//this gives the "choice" functionality to the images.
		label.appendChild(radio);
		label.appendChild(img);
		document.getElementById("Pictures").appendChild(label);
	}
}

//Creates the Select Button
function createButton(session, response) {
	//Create the button to go into the battle.
	var btn = document.createElement("BUTTON");
	btn.setAttribute("id","Button")
	//Add listener to the button.
	btn.addEventListener("click", function(){
		if (chosen!="none") {
			var answer = randomizer(chosen.name, response.celebs);
			console.log("after gotten the answer");
			console.log(answer);

			//Clean the DBQueue
			cleanDBQueue(session);

			//Start battle in the back end.
			startBattleBackend(session, answer);
		} else { //No character has been chosen.
			alert("You must choose a character");
		}
	});
  var t = document.createTextNode("Select");
  btn.appendChild(t);
  document.getElementById("Pictures").appendChild(btn);
}

//CLEAN THE DB QUEUE
function cleanDBQueue (session) {
	var url =  urlBattleQueue;
	var client = new XMLHttpRequest();
	client.open('GET', url+"?session="+session+"&action=empty", true);
	client.send();
}

//Start the battle in the backend.
function startBattleBackend(session, answer) {
	//Start Battle in back end.
	var url = urlPhpBridge;
	var params = "session="+session+"&Celeb1="+chosen.name+"&Hp1="+chosen.hp+"&Celeb2="+answer.name+"&Hp2="+answer.hp;
	var http = new XMLHttpRequest();
	http.open('POST', url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	//When the battle has been started in the back.
	http.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
		var subresponse = http.responseText;
		var response = jQuery.parseJSON(subresponse);

		//Battle was started in back end.
		if (response.success) {
			console.log(chosen.name);
			console.log(chosen.hp);
			console.log("This is the session:" + session);
			
			//Remove pictures and load canvas
			correctGraphics();
					
			//Start the battle in the front end
			start(session, chosen.name, chosen.hp, answer.name, answer.hp);
		} else //Backend was not successful.
    		alert("Backend not operational.");
		}
	}
	http.send(params);
}

//Removes the pictures and creates the Canvas and the twitter wrapper when the battle is about to start.
function correctGraphics() {
	var elem = document.getElementById('Pictures');
	//Removes the pictures from the site.
	elem.parentNode.removeChild(elem);
	var div = document.getElementById("game");
	//Initiate a canvas.
	var canvas = document.createElement("CANVAS");
	canvas.setAttribute("id", "board");
	//Create the tweeter wrapper
	var divtweeter = document.createElement("div");
	divtweeter.setAttribute("id", "tweetWrapper");
	div.appendChild(canvas);
	div.appendChild(divtweeter);
}