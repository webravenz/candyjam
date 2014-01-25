
CANDY.Apple = function() {
    
    //var textures = CANDY.SpriteSheetTextures.getArray('e_f', '.png', 6);
    
    //PIXI.MovieClip.call( this, textures );

    CANDY.Enemy.call(this, [PIXI.Texture.fromImage('img/apple.png')]);
    
    this.hitArea = new CANDY.Rectangle(this.position.x, this.position.y, this.width, this.height);
    this.animationSpeed = 0.2;
};

CANDY.Apple.constructor = CANDY.Apple;
// Apple object extend PIXI Movieclip object
CANDY.Apple.prototype = Object.create( CANDY.Enemy.prototype );

CANDY.Apple.prototype.alloc = function() {

    CANDY.Enemy.prototype.alloc.call(this);

    this.life = 150;
    this.position.x = CANDY.Config.width + this.width / 2;
    this.position.y = CANDY.Config.height / 2;
    this.speedX = -10;
    this.speedY = 0;
    this.accel = false;
    this.decel = false;
    this.jumpComplete = false;

    CANDY.BossUI.majBar(100);
};

CANDY.Apple.prototype.updateTransform = function() {

    if(this.speedX < -0.1) {
        this.speedX *= 0.96;
    } else {
        this.speedX = 0;
    }

    if(this.accel) {
        this.speedY += 0.4 * this.direction;
        if(Math.abs(this.speedY) >= 10) {
            this.accel = false;
            this.decel = true;
        }
    } else if(this.decel) {
        this.speedY -= 0.5 * this.direction;
        if(Math.abs(this.speedY) < 0.5) {
            this.speedY = 0;
            this.decel = false;
            if(this.active) this.jumpComplete = true;
        }
    }

    this.scale.x = this.scale.y = 1 + (Math.abs(this.speedY) / 40);

    CANDY.Enemy.prototype.updateTransform.call( this );
};


CANDY.Apple.prototype.touched = function(bullet) {
    CANDY.Enemy.prototype.touched.call(this, bullet);
    CANDY.BossUI.majBar(this.life / 150 * 100);
};

CANDY.Apple.prototype.jump = function() {
    this.direction = Math.random() < 0.5 ? -1 : 1;
    if(this.position.y < 200) this.direction = 1;
    else if (this.position.y > 600) this.direction = -1;
    this.accel = true;
}