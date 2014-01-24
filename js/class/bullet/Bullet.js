
CANDY.Bullet = function() {
    
    PIXI.Sprite.call( this, PIXI.Texture.fromImage('img/bullet.png') );
    
    //this.anchor.x = this.anchor.y = 0.5;
    
    this.visible = false;
    this.SPEED = 8;
    
    this.damage = 0.5;
}

CANDY.Bullet.constructor = CANDY.Bullet;
// Bullet object extend PIXI Sprite object
CANDY.Bullet.prototype = Object.create( PIXI.Sprite.prototype );

CANDY.Bullet.prototype.alloc = function() {
    this.visible = true;
};
CANDY.Bullet.prototype.canRealloc = function() {
    this.visible = false;
    this.parent.pool.add(this);
};
CANDY.Bullet.prototype.updateTransform = function() {
    if(this.visible)  {
        this.position.x += this.SPEED;
        
        if(this.position.x > CANDY.Config.width) {
            this.canRealloc();
        }
    }
    PIXI.Sprite.prototype.updateTransform.call( this );
};