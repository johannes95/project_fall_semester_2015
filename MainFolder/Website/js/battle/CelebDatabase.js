// this class represents the celebrity database. It stores spritesheets an other important information for each celebrity.

function KimKardashian() {
    
    this.width = 75;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/Spritesheet-Kim-Kardashian-Normal.png', this.width, this.height, this.width, this.height, 4, 4, true);
    this.spritesheetWalking = new SpriteSheet('img/sprites/Spritesheet-Kim-Kardashian-Walking.png', this.width, this.height, this.width, this.height, 4, 4, false);
    this.spritesheetPunching= new SpriteSheet('img/sprites/Spritesheet-Kim-Kardashian-Punching.png', this.width, this.height, this.width, this.height, 2, 4, false);
    
}

function CristianoRonaldo() {
        
    this.width = 100;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/Spritesheet-Cristiano-Ronaldo-Normal.png', this.width, this.height, this.width, this.height, 4, 4, false);
    this.spritesheetWalking = new SpriteSheet('img/sprites/Spritesheet-Cristiano-Ronaldo-Walking.png', this.width, this.height, this.width, this.height, 4, 4, false);
    this.spritesheetPunching = new SpriteSheet('img/sprites/Spritesheet-Cristiano-Ronaldo-Punch-Right.png', this.width, this.height, this.width, this.height, 4, 4, false);
    
}