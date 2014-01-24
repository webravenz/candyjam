
CANDY.Player = function() {
    
    var textures = CANDY.SpriteSheetTextures.getArray('player', '.png', 4);
    
    PIXI.MovieClip.call( this, textures );
    
    this.position.x = 100;
    this.position.y = 200;
    //this.anchor.x = this.anchor.y = 0.5;
    
    // moving vars
    this.speedX = this.speedY = 0;
    this.ACCELERATION = 0.4;
    this.MAX_SPEED = 6;
    this.MIN_X = 0;
    this.MIN_Y = 0;
    this.MAX_X = (CANDY.Config.width - this.width) * 0.6;
    this.MAX_Y = CANDY.Config.height - this.height;
    
    // life
    this.life = 4;
    
    this.animationSpeed = 0.1;
    this.hitArea = new CANDY.Rectangle(0, 0, 85, 85);
    this.hitOffset = {x: 50, y: 70};
}

CANDY.Player.constructor = CANDY.Player;
CANDY.Player.prototype = Object.create( PIXI.MovieClip.prototype );

/**
 * hit an ennemy, decrease life
 */
CANDY.Player.prototype.hitEnnemy = function() {
    this.life--;
    this.alpha = this.life / 4;
    if(this.life === 0) this.die();
}

/**
 * life is over
 */
CANDY.Player.prototype.die = function() {
    this.visible = false;
    CANDY.Controls.stop();
}

/**
 * override updateTransform method, called each frame
 */
CANDY.Player.prototype.updateTransform = function() {
    
    // keyboard controls
    if(CANDY.Controls.pressed(CANDY.Controls.UP)) {
        this.speedY -= this.ACCELERATION;
    } else if(CANDY.Controls.pressed(CANDY.Controls.DOWN)) {
        this.speedY += this.ACCELERATION;
    } else {
        this.speedY /= 1.3;
    }

    if(CANDY.Controls.pressed(CANDY.Controls.LEFT)) {
        this.speedX -= this.ACCELERATION;
    } else if(CANDY.Controls.pressed(CANDY.Controls.RIGHT)) {
        this.speedX += this.ACCELERATION;
    } else {
        this.speedX /= 1.3;
    }
    
    // update speed and position
    this.speedY = CANDY.Utils.boundary(this.speedY, -this.MAX_SPEED, this.MAX_SPEED);
    if(Math.abs(this.speedY) < 0.3) this.speedY = 0;
    this.position.y += this.speedY;
    this.speedX = CANDY.Utils.boundary(this.speedX, -this.MAX_SPEED, this.MAX_SPEED);
    if(Math.abs(this.speedX) < 0.3) this.speedX = 0;
    this.position.x += this.speedX;

    // update anim
    if(this.speedY != 0 || this.speedX != 0) {
        this.play();
    } else {
        this.gotoAndStop(0);
    }
    
    // prevent ship to leave game screen
    this.position.y = CANDY.Utils.boundary(this.position.y, this.MIN_Y, this.MAX_Y);
    this.position.x = CANDY.Utils.boundary(this.position.x, this.MIN_X, this.MAX_X);
    
    //we update the hitArea
    this.hitArea.x = this.position.x + this.hitOffset.x;
    this.hitArea.y = this.position.y + this.hitOffset.y;
    
    PIXI.MovieClip.prototype.updateTransform.call( this ); 
}