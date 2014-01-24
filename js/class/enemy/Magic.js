
CANDY.Magic = function() {
    
    CANDY.Enemy.call(this, [PIXI.Texture.fromImage('img/bullet.png')]);
    
    this.hitArea = new CANDY.Rectangle(this.position.x, this.position.y, this.width, this.height);
    this.animationSpeed = 0.2;
    this.poolName = 'magic';
};

CANDY.Magic.constructor = CANDY.Magic;
CANDY.Magic.prototype = Object.create( CANDY.Enemy.prototype );

CANDY.Magic.prototype.alloc = function() {
    this.life = 100;
    this.position.x = this.parent.papaSmurf.position.x - 50;
    this.position.y = this.parent.papaSmurf.position.y - 50;
    this.speedX = CANDY.Utils.randomBetween(-4, -8);
    this.speedY = CANDY.Utils.randomBetween(-2.5, 2.5);

    CANDY.Enemy.prototype.alloc.call(this);
};

CANDY.Magic.prototype.updateTransform = function() {

    if(this.active) {
        if(this.position.x < -50) {
            this.canRealloc();
        }
    }

    CANDY.Enemy.prototype.updateTransform.call( this );
};
