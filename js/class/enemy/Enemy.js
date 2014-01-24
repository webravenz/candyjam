
CANDY.Enemy = function(textures) {
    
    PIXI.MovieClip.call( this, textures );

    this.anchor.x = this.anchor.y = 0.5;
    
    this.visible = false;
    this.active = false;
};

CANDY.Enemy.constructor = CANDY.Enemy;
// Enemy object extend PIXI Movieclip object
CANDY.Enemy.prototype = Object.create( PIXI.MovieClip.prototype );

CANDY.Enemy.prototype.alloc = function() {
    this.alpha = 1;
    this.visible = true;
    this.active = true;
    this.dying = false;
    this.scale.x = this.scale.y = 1;
    this.rotation = 0;
};

CANDY.Enemy.prototype.canRealloc = function() {
    this.visible = false;
    this.active = false;
    if(this.poolName) this.parent[this.poolName+'Pool'].add(this);
};

CANDY.Enemy.prototype.updateTransform = function() {
    //we update the hitArea
    this.hitArea.x = this.position.x - this.width / 2;
    this.hitArea.y = this.position.y - this.height / 2;

    if(this.dying) {
        this.alpha -= 0.1;
        this.speedX *= 0.5;
        this.speedY *= 0.5;
        this.scale.x -= 0.08;
        this.scale.y -= 0.08;
        this.rotation += 0.1;

        if(this.alpha <= 0) {
            this.die();
        }
    }

    this.position.x += this.speedX;
    this.position.y += this.speedY;

    PIXI.MovieClip.prototype.updateTransform.call( this );
};

CANDY.Enemy.prototype.touched = function(bullet) {
    this.life = this.life - bullet.damage;
    if(this.life <= 0) {
        this.active = false;
        this.dying = true;
    }
};

CANDY.Enemy.prototype.die = function() {
    this.dying = false;
    this.canRealloc();
};

