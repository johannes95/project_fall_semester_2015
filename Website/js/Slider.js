// Initialize variables
var active = false;
var firstSlide = true;
var lastImage = false;
var interval;
var images = ["","url('img/slider/slider2.png')","",""];
var strings = ["<span style='display:table-cell; vertical-align:middle;'>Welcome<br/>to<br/>CelebrityDeath#!</span>", "A game of tweets.", "<span style='display:table-cell; vertical-align:middle;'>Choose your favorite celebrity.</span>", "<span style='display:table-cell; vertical-align:middle;'>Sign in to play.</span>"];
var lastIndex = -1;
var div1, div2;

// When the everyting is loaded
window.onload = function() { 
    
    // Get the slide divs
    div1 = document.getElementById("image2");
    div2 = document.getElementById("image1");
   
    // Initialize the first div with the first image
    div1.style.backgroundImage = images[lastIndex+1];
    div1.innerHTML = strings[lastIndex+1];
    lastIndex++; // Keeps track of the last image that was loaded
   
    // Set an interval for calling the slide effect once every five seconds
    setInterval(function(){
       nextImage();                   // Switch the divs and load the next image
       if(!lastImage) {
         if(lastIndex % 2 == 0) {
            slideIn(div1, div2, "left");
         } else {
            slideIn(div1, div2, "top");
         }
       } else {
          fadeTo(div1, div2);
          lastImage = false;
       }
    }, 5000);
    
}

/**
 * Loads the next image for the slide effect.
 */
function nextImage() {
    
    if(!firstSlide) {
        var tmp = div1;
        div1 = div2;
        div2 = tmp;
    } else {
        firstSlide = false;
    }
    
    if(lastIndex + 1 == images.length) {
        lastIndex = -1;
        lastImage = true;
    }
    
    console.log("lastIndex: " + lastIndex);
    console.log("Array length: " + images.length);
    
    div2.style.backgroundImage = images[lastIndex+1];
    div2.innerHTML = strings[lastIndex+1];
    lastIndex++;
    
}

function slideIn(element1, element2, direction) {
   
   if(!active) { // If no other effect is active
      
      active = true; // Set effects to active(flag)
      reset(element1, element2); // Reset the css properties
      
      element1.style.zIndex = "0"; // Set the "old" element to be underneath
      element2.style.zIndex = "1"; // Set the "new" element to be on top
      
      var property; // The css property to be changed
      var initialValue; // The initial value of the property(outside of slider)
      
      switch(direction) { // Switch case for choosing css property and initial value
         case "top":
            property = "bottom";
            initialValue = "offsetHeight";
            break;
         case "right":
            property = "left";
            initialValue = "offsetWidth";
            break;
         case "bottom":
            property = "top";
            initialValue = "offsetHeight";
            break;
         case "left":
            property = "right";
            initialValue = "offsetWidth";
            break;
         default:
            break;
      }
      
      element1.style[direction] = "auto";
      
      element2.style[direction] = "auto"; // Set the opposite property to auto(so that it doesn't get stuck)
      element2.style[property] = element2[initialValue]; // Set the css property to the initial value
      
      interval = setInterval( // Interval for doing the animation
         function() {
            if(parseInt(element2.style[property]) > 0) { // Until it reaches its position
               element2.style[property] = parseInt(element2.style[property]) - 2;
               element1.style[property] = parseInt(element1.style[property]) - 2; // Make the animation
            } else
               active = false;
         }, 1); // 1000 times per second(every millisecond)
      
   }
}

function fadeTo(element1, element2) {
   
   if(!active) { // If no other effect is active
      
      active = true; // Set effect to active(flag)
      reset(element1, element2); // Reset the css properties
      
      element1.style.opacity = "1"; // Set the "old" element to be on top 
      element2.style.opacity = "0"; // Set the "new" element to be underneath
      
      interval = setInterval( // Interval for doing animation
         function() {
            if(parseFloat(element1.style.opacity) > 0 && parseFloat(element2.style.opacity) < 1) { // Until the opacities are "correct"
               element1.style.opacity = parseFloat(element1.style.opacity) - 0.01; // Make the animation(fade out)
               element2.style.opacity = parseFloat(element2.style.opacity) + 0.01; // Make the animation(fade in)
            } else {
               active = false;
            }
         }, 30); // Once every 30 milliseconds(33.333... times per second)
   }
   
}

function reset(element1, element2) {
   
   // Clear the interval
   clearInterval(interval);
   
   // Reset fadeTo
   element1.style.opacity = "1";
   element2.style.opacity = "1";
   
   // Reset slide
   element1.style.top = 0;
   element1.style.right = 0;
   element1.style.bottom = 0;
   element1.style.left = 0;
   
   // Reset slide
   element2.style.top = 0;
   element2.style.right = 0;
   element2.style.bottom = 0;
   element2.style.left = 0;
   
}