// this class represents the celebrity database. It stores spritesheets an other important information for each celebrity.

function NewCeleb(Celeb, Width, Height) {
    this.width = Width;
    this.height = Height;
    var firstName;
    var lastName;
    
    for (var i = 0; i < Celeb.length; i++) {
        if (Celeb[i] === ' ') {
            firstName = Celeb.substring(0,i);
            lastName = Celeb.substring(i+1,Celeb.length);
            i = Celeb.length;
        }
    }
    
    this.spritesheetNormal = new SpriteSheet('img/sprites/' + firstName + lastName + '/Spritesheet-' + firstName + '-' + lastName + '-Normal.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetWalking = new SpriteSheet('img/sprites/' + firstName + lastName + '/Spritesheet-' + firstName + '-' + lastName + '-Walking.png', this.width, this.height, this.width, this.height, 4, 4);
    this.spritesheetPunchingRight = new SpriteSheet('img/sprites/' + firstName + lastName + '/Spritesheet-' + firstName + '-' + lastName + '-Hit-Right.png', this.width, this.height, this.width, this.height, 1, 4);
    this.spritesheetPunchingLeft = new SpriteSheet('img/sprites/' + firstName + lastName + '/Spritesheet-' + firstName + '-' + lastName + '-Hit-Left.png', this.width, this.height, this.width, this.height, 1, 4);
    //change above to hit left
    this.name = firstName + " " + lastName;
}