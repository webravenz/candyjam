
CANDY.Bullet = function() {
    
    PIXI.Sprite.call( this, PIXI.Texture.fromImage('img/bullet.png') );
    
    //this.anchor.x = this.anchor.y = 0.5;
    
    this.visible = false;
    
    this.damage = 1;
}

CANDY.Bullet.constructor = CANDY.Bullet;
// Bullet object extend PIXI Sprite object
CANDY.Bullet.prototype = Object.create( PIXI.Sprite.prototype );

CANDY.Bullet.prototype.alloc = function() {
    this.speedX = CANDY.Utils.randomBetween(10, 12);
    this.speedY = CANDY.Utils.randomBetween(-0.5, 0.5);
    this.visible = true;
};
CANDY.Bullet.prototype.canRealloc = function() {
    this.visible = false;
    this.parent.pool.add(this);
};
CANDY.Bullet.prototype.updateTransform = function() {
    if(this.visible)  {
        this.position.x += this.speedX;
        this.position.y += this.speedY;
        
        if(this.position.x > CANDY.Config.width) {
            this.canRealloc();
        }
    }
    PIXI.Sprite.prototype.updateTransform.call( this );
};