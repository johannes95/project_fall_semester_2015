// this class represents the celebrity database. It stores spritesheets an other important information for each celebrity.

function KimKardashian() {
    
    this.width = 75;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/Spritesheet-Kim-Kardashian-Normal.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet('img/sprites/Spritesheet-Kim-Kardashian-Walking.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetPunching= new SpriteSheet('img/sprites/Spritesheet-Kim-Kardashian-Punching.png', this.width, this.height, this.width, this.height, 2, 4);
    
}

function Tmp() {
        
    this.width = 125;
    this.height = 125;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/tmp.png', this.width, this.height, this.width, this.height, 4, 16);
    this.spritesheetWalking = new SpriteSheet('img/sprites/tmp.png', this.width, this.height, this.width, this.height, 4, 16);
    this.spritesheetPunching = new SpriteSheet('img/sprites/tmp.png', this.width, this.height, this.width, this.height, 4, 16);
    
}