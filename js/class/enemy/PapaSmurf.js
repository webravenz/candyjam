
CANDY.PapaSmurf = function() {
    
    //var textures = CANDY.SpriteSheetTextures.getArray('e_f', '.png', 6);
    
    //PIXI.MovieClip.call( this, textures );

    CANDY.Enemy.call(this, [PIXI.Texture.fromImage('img/papasmurf.png')]);
    
    this.hitArea = new CANDY.Rectangle(this.position.x, this.position.y, this.width, this.height);
    this.animationSpeed = 0.2;
};

CANDY.PapaSmurf.constructor = CANDY.PapaSmurf;
// PapaSmurf object extend PIXI Movieclip object
CANDY.PapaSmurf.prototype = Object.create( CANDY.Enemy.prototype );

CANDY.PapaSmurf.prototype.alloc = function() {
    this.life = 100;
    this.position.x = CANDY.Config.width + this.width / 2;
    this.position.y = CANDY.Config.height / 2;
    this.speedX = -8;
    this.speedY = 0;

    this.inPlace = false;
    CANDY.BossUI.majBar(100);

    CANDY.Enemy.prototype.alloc.call(this);
};

CANDY.PapaSmurf.prototype.updateTransform = function() {

    if(this.speedX < -0.1) {
        this.speedX *= 0.96;
    } else if(!this.inPlace) {
        this.speedX = 0;
        CANDY.BossUI.show();
        this.inPlace = true;
    }

    CANDY.Enemy.prototype.updateTransform.call( this );
};


CANDY.PapaSmurf.prototype.touched = function(bullet) {
    CANDY.Enemy.prototype.touched.call(this, bullet);
    CANDY.BossUI.majBar(this.life);
};