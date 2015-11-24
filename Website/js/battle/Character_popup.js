function load_info() {

  var head  = document.getElementsByTagName('head')[0];
  var link  = document.createElement('link');
  link.rel  = 'stylesheet';
  link.type = 'text/css';
  link.href = 'css/select_char.css';
  head.appendChild(link);
}

window.onload = function() {
	load_info();
	
	//HARD CODED HERE!!!
	var url = urlCelebData;
	var session =  document.getElementById("userid").innerHTML;
	var client = new XMLHttpRequest();
	client.open('GET', url+"?session="+session, true);
	client.onreadystatechange = function() {
		if (client.readyState == 4 && client.status == 200)
		{
			var subresponse = client.responseText;
			var response = jQuery.parseJSON(subresponse);
			console.log(response);
		 	//check what data was returned
			if(response.success != false) {
				createImages(session, response);
				console.log("Done loading celebs.");
			}
			else
			{
				console.log("Something went wrong, or the celebs array returned was empty");
			}
		}
	}
	client.send();
}

function randomizer(playerCeleb, allCelebs) {
	var num = getRandomArbitrary(0, Object.keys(allCelebs).length);
	console.log("Random num: " +num);
	if (allCelebs[num].Name == playerCeleb)
		randomizer(playerCeleb, allCelebs);
	else
		return {
        name: allCelebs[num].Name,
        hp: allCelebs[num].HP
		 };
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}

function createImages(session, response) {
	var chosen;
	for(var i = 0; i < Object.keys(response.celebs).length; i++)
	{ //loop through the return json
		//add a picture as radio button
		var label= document.createElement("label");
		label.setAttribute("width","150");
		var radio = document.createElement("input");
		radio.type = "radio";
		radio.name = "radio";
		//var nameLabel = document.createElement("div");
		//nameLabel.innerHTML= response.celebs[i].Name;
		//nameLabel.setAttribute('style', 'font-size: 20px; cursor: pointer; text-align: center; display:block;');
		//nameLabel.appendChild(text);
		
		//Make the picture and add all the functionality
		var img = document.createElement("img");
		img.setAttribute("src", response.celebs[i].Picture);
		img.setAttribute("name", response.celebs[i].Name);
		img.setAttribute("id", response.celebs[i].HP);
		img.setAttribute("hspace","10");
		img.setAttribute("width","150");
		img.setAttribute("height","150");
		//img.setAttribute("style","border:medium solid black;");
		img.addEventListener("click", function() {
		    chosen = {
	      	name: this.name,
	      	hp: this.id
		    };
		    console.log (chosen);
		});
		
		label.appendChild(radio);
		label.appendChild(img);
		//label.appendChild(nameLabel);
		document.getElementById("Pictures").appendChild(label);
	}
	var btn = document.createElement("BUTTON");
	btn.setAttribute("id","Button")
	btn.addEventListener("click", function(){
		if (chosen!=undefined)
		{
			//Call Randomizer function
			//********  SOMETIMES IT CONTINUES FASTER SO ANSWER.NAME is not found. *************
	    var answer = randomizer(chosen.name, response.celebs);
			//Start battle in the back end
	    //var backend = startBackEnd(session, chosen.name, chosen.hp, answer.name, answer.hp);

//HARD CODED HERE!!!
			var url = urlPhpBridge;
			var params = "session="+session+"&Celeb1="+chosen.name+"&Hp1="+chosen.hp+"&Celeb2="+answer.name+"&Hp2="+answer.hp;
			var http = new XMLHttpRequest();
			http.open('POST', url, true);
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	
			http.onreadystatechange = function() {//Call a function when the state changes.
		    if(http.readyState == 4 && http.status == 200) {
		      var subresponse = http.responseText;
				 	var response = jQuery.parseJSON(subresponse);
				 	//check what data was returned
				 	console.log(response.success);
		
					if (response.success)
					{
						console.log(chosen.name);
			      console.log(chosen.hp);
			      console.log("This is the session:" + session);
			      var elem = document.getElementById('Pictures');
			      elem.parentNode.removeChild(elem);
			      var div = document.getElementById("game")
			      var canvas = document.createElement("CANVAS");
			      canvas.setAttribute("id", "board");
			      var divtweeter = document.createElement("div");
			      divtweeter.setAttribute("id", "tweetWrapper");
			      div.appendChild(canvas);
			      div.appendChild(divtweeter);
			      //Start the battle in the front end
			    	start(session, chosen.name, chosen.hp, answer.name, answer.hp);
					}
		    	else
		    		alert("Backend not operational.");
				}
			}
			http.send(params);
		}
		else
			alert("You must choose a character")
	});
  var t = document.createTextNode("Select");
  btn.appendChild(t);
  document.getElementById("Pictures").appendChild(btn);
}

// function startBackEnd(session, celeb1, hp1, celeb2, hp2){
// 	var url = "https://project-fall-semester-2015-kikedaddy-1.c9.io/CDHBackend/erlang-php-bridge.php";
// 	var params = "session="+session+"&Celeb1="+celeb1+"&Hp1="+hp1+"&Celeb2="+celeb2+"&Hp2="+hp2;
// 	var http = new XMLHttpRequest();
// 	http.open('POST', url, true);
// 	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	
// 	http.onreadystatechange = function() {//Call a function when the state changes.
// 	    if(http.readyState == 4 && http.status == 200) {
//         var subresponse = http.responseText;
// 			 	var response = jQuery.parseJSON(subresponse);
// 			 	//check what data was returned
// 			 	console.log(response.success);
// 				return response.success;
// 			}
// 	}
// 	http.send(params);
// }