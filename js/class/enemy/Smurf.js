
CANDY.Smurf = function() {
    
    CANDY.Enemy.call(this, [PIXI.Texture.fromImage('img/smurf.png')]);
    
    this.hitArea = new CANDY.Rectangle(this.position.x, this.position.y, this.width, this.height);
    this.animationSpeed = 0.2;
    this.poolName = 'smurf';
};

CANDY.Smurf.constructor = CANDY.Smurf;
CANDY.Smurf.prototype = Object.create( CANDY.Enemy.prototype );

CANDY.Smurf.prototype.alloc = function() {
    this.life = 3;
    this.position.x = CANDY.Config.width + 100;
    this.position.y = CANDY.Utils.randomBetween(this.height / 2, CANDY.Config.height - this.height / 2);
    this.speedX = CANDY.Utils.randomBetween(-3, -5);
    this.speedY = 0;

    CANDY.Enemy.prototype.alloc.call(this);
};

CANDY.Smurf.prototype.updateTransform = function() {

    if(this.active) {
        if(this.position.x < -50) {
            this.canRealloc();
        }
    }

    CANDY.Enemy.prototype.updateTransform.call( this );
};
