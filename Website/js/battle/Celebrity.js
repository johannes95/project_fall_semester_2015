/* Defines the character to be used by the user */
function Celebrity(SpriteSheetNormal, SpriteSheetWalking, SpriteSheetHitting) {
	
	this.spritesheetNormal = new SpriteSheet(SpriteSheetNormal, 75, 100, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet(SpriteSheetWalking, 75, 100, this.width, this.height, 4, 4);
    this.spritesheetHitting= new SpriteSheet(SpriteSheetHitting, 75, 100, this.width, this.height, 1, 4);
    
    this.drawNormal = function() {
    	
    }
    
    this.drawWalking = function() {
    	
    }
    
    this.drawHitting = function() {
    	
    }
    
}