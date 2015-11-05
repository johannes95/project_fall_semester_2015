var leftKey = 37, upKey = 38, rightKey = 39, downKey = 40, spaceBar = 32; // Storing the key codes(keymaster.js)

/* Defines the character to be used by the user */
// x = starting x possition
// y = starting y position
// celebrity = selected celebrity
// isPlayer = true if the character is controlled by the player of the game
function Character(x,y,celebrity,isPlayer) {
    
    // Variable declaration for the character
    this.x = x;
    this.y = y;
    this.width = celebrity.width;
    this.height = celebrity.height;
    this.background = "black";
    this.shouldJump = true;
    this.jumping = false;
    this.fallSpeed = 1;
    this.jumpSpeed = 17;
    this.shouldPunch = false;
    this.isWalking = false;
    this.spritesheetNormal = celebrity.spritesheetNormal;
    this.spritesheetWalking = celebrity.spritesheetWalking;
    this.spritesheetPunching = celebrity.spritesheetPunching;
    
    // Gets the context(board/canvas) and draws the character, with its attributes, on the context.
    this.draw = function(context) {
		if(this.isWalking)
			this.walk(context);
		else if (this.shouldPunch) {
			this.punch(context);
		}
		else
			this.normal(context);
    }
    
    this.normal = function(context) {
    	this.spritesheetNormal.update();
    	this.spritesheetNormal.draw(context, this.x, this.y);
    }
    
    this.walk = function(context) {
    	this.spritesheetWalking.update();
    	this.spritesheetWalking.draw(context, this.x, this.y);
    }
    
    this.punch = function(context) {
    	this.spritesheetPunching.update();
    	this.spritesheetPunching.draw(context, this.x, this.y);
    }
    
    // Updates the characters attributes. Keeps track of key activities(move left, right, jump, hit etc).
    this.update = function() {
    
    	// Gravity
	    this.y = this.y + this.fallSpeed;
	    this.fallSpeed++;
		// End gravity
		
    	// Direction
    	
    	this.isWalking = false;
    	this.shouldPunch = false;
    	
    	if(isPlayer)
			this.checkKeys();
		
		if(this.jumping) { 						 // While jumping
			
			this.y = this.y - this.jumpSpeed;    // Move upwards with the set jumping speed
    		this.jumpSpeed = this.jumpSpeed - 1; // Decrease the jumping speed
    		
    		if(this.jumpSpeed < 0) {			 // The jump has reached maximum height
    			
    			this.jumpSpeed = 17; 			 // Reset the jumping speed
				this.shouldJump = false;		 
				this.jumping = false;
    		
    		}
			
		}
	
		// End direction
		
		
		// Screen limit
		if((this.x + this.width) > width) {   // If the character reaches the right most limit of the board
		    
		    this.x = width - this.width;	  // Sets the character position to the right edge
	
		}
		
		if(this.x < 0) {					  // If the character reaches the left most limit of the board
		    this.x = 0;						  // Sets the character position to the left edge
		}
		
	
		if((this.y + this.height) > height) { // if the character reaches the bottom most limit of the board
		    
		    this.y = height - this.height;	  // Sets the character position to the bottom edge
		   	this.fallSpeed = 1;
			this.shouldJump = true;
	
		}
		
		if(this.y < 0) {					  // If the character reaches the top most limit of the board
	
		    this.y = 0;						  // Sets the character position to the top edge
	
		}
		// End limit
		
		
    }
    
    this.checkKeys = function() {
    	
        if(key.isPressed(leftKey)) { 
			this.x = this.x - 3;   				 // Move left (keymaster.js)
			this.isWalking = true;
	   	}
		
		if(key.isPressed(rightKey)) {
			this.x = this.x + 3;  				 // Move right
			this.isWalking = true;
		}

		if(key.isPressed(upKey) && this.shouldJump)
			this.jumping = true; 				 // Set the character to jump
			
		if(key.isPressed(spaceBar)) {
			//Test to see if spacebar is working
			//this.x = this.x + 3;
			//this.isWalking = true;
			this.shouldPunch = true;
		}
    	
    }
    
    
}