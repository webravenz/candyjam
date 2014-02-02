
CANDY.Smurf = function() {
    
    var textures = CANDY.SpriteSheetTextures.getArray('smurf', '.png', 4);
    CANDY.Enemy.call( this, textures );
    
    this.hitArea = new CANDY.Rectangle(this.position.x, this.position.y, 60, 100);
    this.hitOffset = {x: 25, y: 30};
    this.animationSpeed = 0.1;
    this.poolName = 'smurf';
};

CANDY.Smurf.constructor = CANDY.Smurf;
CANDY.Smurf.prototype = Object.create( CANDY.Enemy.prototype );

CANDY.Smurf.prototype.alloc = function() {
    this.life = 2;
    this.position.x = CANDY.Config.width + 100 + CANDY.Utils.randomBetween(0, 200);
    this.speedX = CANDY.Utils.randomBetween(-3, -5);
    this.speedY = 0;

    this.gotoAndPlay(CANDY.Utils.randomBetween(1,4));

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
