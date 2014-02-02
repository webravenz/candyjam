
CANDY.King = function() {
    
    //var textures = CANDY.SpriteSheetTextures.getArray('e_f', '.png', 6);
    
    //PIXI.MovieClip.call( this, textures );

    CANDY.Enemy.call(this, [PIXI.Texture.fromImage('img/king.png')]);
    
    this.hitArea = new CANDY.Rectangle(this.position.x, this.position.y, 250, 520);
    this.hitOffset = {x: 160, y: 0};
    this.animationSpeed = 0.2;
};

CANDY.King.constructor = CANDY.King;
// King object extend PIXI Movieclip object
CANDY.King.prototype = Object.create( CANDY.Enemy.prototype );

CANDY.King.prototype.alloc = function() {

    CANDY.Enemy.prototype.alloc.call(this);

    this.life = 150;
    this.position.x = CANDY.Config.width + this.width / 2;
    this.position.y = CANDY.Config.height / 2;
    this.speedX = -18;
    this.speedY = 0;

    CANDY.BossUI.majBar(100);
};

CANDY.King.prototype.updateTransform = function() {

    if(this.speedX < -0.1) {
        this.speedX *= 0.96;
    } else {
        this.speedX = 0;
    }

    CANDY.Enemy.prototype.updateTransform.call( this );
};


CANDY.King.prototype.touched = function(bullet) {
    CANDY.Enemy.prototype.touched.call(this, bullet);
    CANDY.BossUI.majBar(this.life / 150 * 100);
};