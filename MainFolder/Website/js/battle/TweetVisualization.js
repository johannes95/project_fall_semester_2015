var tweetWrapperWidth = 200, tweetWrapperHeight = 500;
var tweetDivArray = [];

function addTweet(celebrity, tweet) {
    
    if(tweetDivArray.length == 4) { // If the number of tweets in the tweet visualization reaches its limit(4)
        tweetDivArray[0].parentNode.removeChild(tweetDivArray[0]); // Remove the first tweetBox(the one at the top)
        tweetDivArray.splice(0,1); // Remove the div from the array
    }
    
    // Set the parameters
    var w = tweetWrapperWidth/1.1, h = tweetWrapperHeight/5, x = (tweetWrapperWidth-w)/2, y = (tweetWrapperHeight - h*4)/5;
	
	// Create the div(tweet box) and add css styling
	var div = document.createElement("div");
	div.style.width = w + "px";
	div.style.height = h + "px";
	div.style.marginTop = y;
	div.style.marginLeft = x;
	div.className = 'tweetBox';
	
	// Create the span(for @CelebrityName), add css styling and add the span to the div
	var span = document.createElement("span");
	span.className = 'tweetBoxTitle';
	span.innerHTML = "@" + celebrity;
	div.insertBefore(span, div.firstChild);
	
	/*At symbol code*/
    var atPosition = tweet.indexOf("@"); // Look for the position(possible position) of the at symbol
    var beforeAtText = tweet.substr(0, atPosition);
	var atSymbolText = "";
	var afterAtText;
    
	if(atPosition != -1) { // If an at symbol is found
	    
	    for(var i = atPosition; i < tweet.length; i++) { // loop through the text from the at symbol
            if(tweet[i] != " ") { // for each character after the at symbol
                atSymbolText += tweet[i]; // Add the character to the string
            } else { // when a space is reached(the at symbol text is over)
                afterAtText = tweet.substr(i, tweet.length);
                break; // quit the loop
            }
	    }
	    
	    if(beforeAtText != undefined && beforeAtText.length > 0) { // If there is text before the at text
    	    // create span for text before at
    	    var beforeAt = document.createElement("span");
    	    beforeAt.className = 'tweetBoxContent';
    	    beforeAt.innerHTML = beforeAtText;
    	    div.appendChild(beforeAt);
	    }
	    
	    // create span for at text
	    var atSpan = document.createElement("span");
	    atSpan.className = 'tweetBoxAtText';
	    atSpan.innerHTML = atSymbolText;
	    div.appendChild(atSpan);
	    
	    if(afterAtText != undefined && afterAtText.length > 0) { // If t here is text after the at text
    	    // create span for text after at
    	    var afterAt = document.createElement("span");
    	    afterAt.className = 'tweetBoxContent';
    	    afterAt.innerHTML = afterAtText;
    	    div.appendChild(afterAt);
	    }
	    
	} else { // If an at symbol is not found
	    // Create the span(for tweet content), add css styling and add the span to the div
    	var tweetContent = document.createElement("span");
    	tweetContent.className = 'tweetBoxContent';
    	tweetContent.innerHTML = tweet;
    	div.appendChild(tweetContent);
	}
	/*END at symbol code*/
	
	tweetDivArray.push(div); // Add the div to the array
	
	var parent = document.getElementById("tweetWrapper");
	
	if(tweetDivArray.length > 1) { // If there is at least one tweet already
	    parent.insertBefore(div, parent.firstChild); // Add the div to the #tweetWrapper div
	} else { // If there is no tweets
	    parent.appendChild(div); // Add the div to the #tweetWrapper div
	}
    
}