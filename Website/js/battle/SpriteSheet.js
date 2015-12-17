// path = image source
// framWidth = widht for each frame
// frameHeight = height for each frame
// width = desired width for drawed frame(usually same as frameWidth)
// height = desired height for drawed frame(usually same as frameHeight)
// frameSpeed = the desired speed for changing frame
// endFrame = the last frame of the spritesheet(number of frames)

function SpriteSheet(path, frameWidth, frameHeight, width, height, frameSpeed, endFrame) {
 
   	var image = new Image();
   	var framesPerRow;
 
   	// calculate the number of frames in a row after the image loads
   	var self = this;
   	image.onload = function() {
      framesPerRow = Math.floor(image.width / frameWidth);
   	};
 
   	image.src = path;

	var currentFrame = 0;  // the current frame to draw
	var counter = 0;       // keep track of frame rate
 
  	// Update the animation
  	this.update = function() {
 
    // update to the next frame if it is time
    if (counter == (frameSpeed - 1))				// When the counter reaches one less than the frameSpeed.
      currentFrame = (currentFrame + 1) % endFrame; // 1 is added each time to current frame, until it reaches the endFrame, then it becomes 0.
 
    // update the counter
    counter = (counter + 1) % frameSpeed; 			// Same as for currentFrame, but when counter reaches the frameSpeed, it resets to 0.
    
    };

    // Draw the current frame
   	this.draw = function(context, x, y) {
    	
    	// get the row and col of the frame
      	var row = Math.floor(currentFrame / framesPerRow);
      	var col = Math.floor(currentFrame % framesPerRow);
 
      	context.drawImage(
         	image,
         	col * frameWidth, row * frameHeight,
         	frameWidth, frameHeight,
         	x, y,
         	width, height);
          
  	};

}