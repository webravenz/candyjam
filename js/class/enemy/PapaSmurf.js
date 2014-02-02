
CANDY.PapaSmurf = function() {
    
    var textures = CANDY.SpriteSheetTextures.getArray('papasmurf', '.png', 4);
    CANDY.Enemy.call( this, textures );
    
    this.hitArea = new CANDY.Rectangle(this.position.x, this.position.y, 150, 250);
    this.animationSpeed = 0.1;

    this.hitOffset = {x: 90, y: 90};
};

CANDY.PapaSmurf.constructor = CANDY.PapaSmurf;
// PapaSmurf object extend PIXI Movieclip object
CANDY.PapaSmurf.prototype = Object.create( CANDY.Enemy.prototype );

CANDY.PapaSmurf.prototype.alloc = function() {

    this.stop();

    CANDY.Enemy.prototype.alloc.call(this);

    this.life = 100;
    this.position.x = CANDY.Config.width + this.width / 2;
    this.position.y = CANDY.Config.height / 2;
    this.speedX = -10.5;
    this.speedY = 0;
    this.newGoal();
    this.canMove = false;

    CANDY.BossUI.majBar(100);
};

CANDY.PapaSmurf.prototype.updateTransform = function() {

    if(this.speedX < -0.1) {
        this.speedX *= 0.96;
    } else {
        this.speedX = 0;
    }

    if(Math.abs(this.goal - this.position.y) < 10) {
        this.newGoal();
    }

    if(!this.canMove) {
        this.speedY = 0;
    } else {
        this.play();
        this.speedY += this.goal < this.position.y ? -0.1 : 0.1;
        this.speedY = CANDY.Utils.boundary(this.speedY, -2, 2);
    }

    CANDY.Enemy.prototype.updateTransform.call( this );
};


CANDY.PapaSmurf.prototype.touched = function(bullet) {
    CANDY.Enemy.prototype.touched.call(this, bullet);
    CANDY.BossUI.majBar(this.life);
};

CANDY.PapaSmurf.prototype.newGoal = function() {
    this.goal = CANDY.Utils.randomBetween(this.height / 2, CANDY.Config.height - this.height / 2);
}