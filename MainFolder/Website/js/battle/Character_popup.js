
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
     
		 var url = "https://celebrity-database-arnolf.c9.io/Database/kikeMikeTest.php";
		 var session =  document.getElementById("userid").innerHTML;
		 var client = new XMLHttpRequest();
		 var chosen;
		 client.open('GET', url+"?session="+session, true);
		 client.onreadystatechange = function() {
		 	if (client.readyState == 4 && client.status == 200) {
		    	var subresponse = client.responseText;
			 	var response = jQuery.parseJSON(subresponse);
			 	console.log(response);
			 	//check what data was returned
				if(response.success != false){
					
					for(var i = 0; i < Object.keys(response.celebs).length; i++){ //loop through the return json
					    //add a picture as radio button
                        var label= document.createElement("label");
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
					    //img.setAttribute("style","border:medium solid black;");
					    img.addEventListener("click", function(){
					        chosen = {
                                name: this.name,
                                hp: this.id
					        };
					    });
					    label.appendChild(radio);
					    label.appendChild(img);
					    
              document.getElementById("Pictures").appendChild(label);
					}
					var btn = document.createElement("BUTTON");
					btn.setAttribute("id","Button")
					btn.addEventListener("click", function(){
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
              
		        //       <div id="game">
		        //     <canvas id="board"></canvas>
		        //     <div id="tweetWrapper"></div>
		        // </div>
              //var canvas = document.createElement("CANVAS");
              //
              //document.body.appendChild(canvas);
		              //start();
		              
		              //Calling canvas function
		                start(session, chosen.name, chosen.hp, "Kim Kardashian", "10");
		              
              //Just a test
              // var para = document.createElement("P");
              // var t = document.createTextNode("This is a paragraph.");
              // para.appendChild(t);
              // document.body.appendChild(para);
					});
          var t = document.createTextNode("Select");
          btn.appendChild(t);
          document.getElementById("Pictures").appendChild(btn);
					console.log("Done loading actions.");
				}else{
					console.log("Something went wrong, or the array returned was empty");
				}
		    }
		 }
		 client.send();
}