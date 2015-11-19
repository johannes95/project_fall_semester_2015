// this class represents the celebrity database. It stores spritesheets an other important information for each celebrity.

function KimKardashian() {
    
    this.width = 75;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/KimKardashian/Spritesheet-Kim-Kardashian-Normal.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet('img/sprites/KimKardashian/Spritesheet-Kim-Kardashian-Walking.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetPunchingRight = new SpriteSheet('img/sprites/KimKardashian/Spritesheet-Kim-Kardashian-Punching.png', this.width, this.height, this.width, this.height, 1, 4);
    this.spritesheetPunchingLeft = new SpriteSheet('img/sprites/KimKardashian/Spritesheet-Kim-Kardashian-Hit-Left.png', this.width, this.height, this.width, this.height, 1, 4);
    //change above to hit left
    this.name = "Kim Kardashian"; // used for end-screen death message
}

function CristianoRonaldo() {
        
    this.width = 100;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/CristianoRonaldo/Spritesheet-Cristiano-Ronaldo-Normal.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet('img/sprites/CristianoRonaldo/Spritesheet-Cristiano-Ronaldo-Walking.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetPunchingRight = new SpriteSheet('img/sprites/CristianoRonaldo/Spritesheet-Cristiano-Ronaldo-Punch-Right.png', this.width, this.height, this.width, this.height, 1, 4);
    this.spritesheetPunchingLeft = new SpriteSheet('img/sprites/CristianoRonaldo/Spritesheet-Cristiano-Ronaldo-Punch-Left.png', this.width, this.height, this.width, this.height, 1, 4);
    //Change above to hit left
    this.name = "Cristiano Ronaldo";
}

function JustinBieber() {
        
    this.width = 75;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/JustinBieber/Spritesheet-Justin-Bieber-Normal.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet('img/sprites/JustinBieber/Spritesheet-Justin-Bieber-Walking.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetPunchingRight = new SpriteSheet('img/sprites/JustinBieber/Spritesheet-Justin-Bieber-PunchingP1.png', this.width, this.height, this.width, this.height, 1, 4);
    this.spritesheetPunchingLeft = new SpriteSheet('img/sprites/JustinBieber/Spritesheet-Justin-Bieber-PunchingP2.png', this.width, this.height, this.width, this.height, 1, 4);
    //change above to hit left
    this.name = "Justin Bieber";
}

function JustinTimberlake() {
        
    this.width = 75;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/JustinTimberlake/Spritesheet-Justin-Timberlake-Normal.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet('img/sprites/JustinTimberlake/Spritesheet-Justin-Timberlake-Walking.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetPunchingRight = new SpriteSheet('img/sprites/JustinTimberlake/Spritesheet-Justin-Timberlake-PunchingP1.png', this.width, this.height, this.width, this.height, 1, 4);
    this.spritesheetPunchingLeft = new SpriteSheet('img/sprites/JustinTimberlake/Spritesheet-Justin-Timberlake-PunchingP2.png', this.width, this.height, this.width, this.height, 1, 4);
    //when existing change the Left to a sprite where the celeb hits left
    this.name = "Justin Timberlake";
}

function TaylorSwift() {
        
    this.width = 75;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/TaylorSwift/Spritesheet-Taylor-Swift-Normal.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet('img/sprites/TaylorSwift/Spritesheet-Taylor-Swift-Walking.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetPunchingLeft = new SpriteSheet('img/sprites/TaylorSwift/Spritesheet-Taylor-Swift-hit-left.png', this.width, this.height, this.width, this.height, 1, 4);
    this.spritesheetPunchingRight = new SpriteSheet('img/sprites/TaylorSwift/Spritesheet-Taylor-Swift-hit-right.png', this.width, this.height, this.width, this.height, 1, 4);
    this.name = "Taylor Swift";
}
function BarackObama() {
        
    this.width = 75;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/BarackObama/Spritesheet-Barack-Obama-Normal.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet('img/sprites/BarackObama/Spritesheet-Barack-Obama-Walking.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetPunchingRight = new SpriteSheet('img/sprites/BarackObama/Spritesheet-Barack-Obama-hit-right.png', this.width, this.height, this.width, this.height, 1, 4);
    this.spritesheetPunchingLeft = new SpriteSheet('img/sprites/BarackObama/Spritesheet-Barack-Obama-hit-left.png', this.width, this.height, this.width, this.height, 1, 4);
    this.name = "Barack Obama";
}

function JimCarrey() {
    this.width = 75;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/JimCarrey/Spritesheet-Jim-Carrey-Normal.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet('img/sprites/JimCarrey/Spritesheet-Jim-Carrey-Walking.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetPunchingRight = new SpriteSheet('img/sprites/JimCarrey/Spritesheet-Jim-Carrey-PunchingP1.png', this.width, this.height, this.width, this.height, 1, 4);
    this.spritesheetPunchingLeft = new SpriteSheet('img/sprites/JimCarrey/Spritesheet-Jim-Carrey-PunchingP2.png', this.width, this.height, this.width, this.height, 1, 4);
    this.name = "Jim Carrey";
}

function BritneySpears() {
    this.width = 75;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/BritneySpears/Spritesheet-Britney-Spears-Normal.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet('img/sprites/BritneySpears/Spritesheet-Britney-Spears-Walking.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetPunchingRight = new SpriteSheet('img/sprites/BritneySpears/Spritesheet-Britney-Spears-PunchingP1.png', this.width, this.height, this.width, this.height, 1, 4);
    this.spritesheetPunchingLeft = new SpriteSheet('img/sprites/BritneySpears/Spritesheet-Britney-Spears-PunchingP2.png', this.width, this.height, this.width, this.height, 1, 4);
    this.name = "Britney Spears";
}

function KatyPerry() {
    this.width = 75;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/KatyPerry/Spritesheet-Katy-Perry-Normal.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet('img/sprites/KatyPerry/Spritesheet-Katy-Perry-Walking.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetPunchingRight = new SpriteSheet('img/sprites/KatyPerry/Spritesheet-Katy-Perry-PunchingP1.png', this.width, this.height, this.width, this.height, 1, 4);
    this.spritesheetPunchingLeft = new SpriteSheet('img/sprites/KatyPerry/Spritesheet-Katy-Perry-PunchingP2.png', this.width, this.height, this.width, this.height, 1, 4);
    this.name = "Katy Perry";
}

function RihannaFenty() {
    this.width = 75;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/RihannaFenty/Spritesheet-Rihanna-Fenty-Normal.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet('img/sprites/RihannaFenty/Spritesheet-Rihanna-Fenty-Walking.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetPunchingRight = new SpriteSheet('img/sprites/RihannaFenty/Spritesheet-Rihanna-Fenty-PunchingP1.png', this.width, this.height, this.width, this.height, 1, 4);
    this.spritesheetPunchingLeft = new SpriteSheet('img/sprites/RihannaFenty/Spritesheet-Rihanna-Fenty-PunchingP2.png', this.width, this.height, this.width, this.height, 1, 4);
    this.name = "Rihanna Fenty";
}

function Beyonce() {
    this.width = 75;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/Beyonce/Spritesheet-Beyonce-Normal.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet('img/sprites/Beyonce/Spritesheet-Beyonce-Walking.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetPunchingRight = new SpriteSheet('img/sprites/Beyonce/Spritesheet-Beyonce-Hit-Right.png', this.width, this.height, this.width, this.height, 1, 4);
    this.spritesheetPunchingLeft = new SpriteSheet('img/sprites/Beyonce/Spritesheet-Beyonce-Hit-Left.png', this.width, this.height, this.width, this.height, 1, 4);
    this.name = "Beyonce Knowles";
}

function BillGates() {
    this.width = 75;
    this.height = 100;
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/BillGates/Spritesheet-Bill-Gates-Normal.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet('img/sprites/BillGates/Spritesheet-Bill-Gates-Walking.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetPunchingRight = new SpriteSheet('img/sprites/BillGates/Spritesheet-Bill-Gates-Hit-Right.png', this.width, this.height, this.width, this.height, 1, 4);
    this.spritesheetPunchingLeft = new SpriteSheet('img/sprites/BillGates/Spritesheet-Bill-Gates-Hit-Left.png', this.width, this.height, this.width, this.height, 1, 4);
    this.name = "Bill Gates";
    
}