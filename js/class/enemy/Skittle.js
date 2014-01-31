
CANDY.Skittle = function() {
    
    CANDY.Enemy.call(this, [PIXI.Texture.fromImage('img/skittle'+CANDY.Utils.randomBetween(1, 4)+'.png')]);
    
    this.hitArea = new CANDY.Rectangle(this.position.x, this.position.y, 53, 53);
    this.animationSpeed = 0.2;
    this.poolName = 'skittle';
    this.hitOffset = {x: 9, y: 0};
};

CANDY.Skittle.constructor = CANDY.Skittle;
CANDY.Skittle.prototype = Object.create( CANDY.Enemy.prototype );

CANDY.Skittle.prototype.alloc = function() {
    this.position.x = this.parent.apple.position.x;
    this.position.y = this.parent.apple.position.y;
    this.life = 1;
    this.speedX = CANDY.Utils.randomBetween(2, 5);
    if(Math.random() < 0.5) this.speedX *= -1;
    this.speedY = CANDY.Utils.randomBetween(2, 5);
    if(Math.random() < 0.5) this.speedY *= -1;

    CANDY.Enemy.prototype.alloc.call(this);

    this.randomRotateSpeed();

    this.rotation = CANDY.Utils.randomBetween(0, 6);

};

CANDY.Skittle.prototype.updateTransform = function() {

    if(this.active) {
        if(this.position.x < this.width / 2 || this.position.x > CANDY.Config.width - this.width / 2) {
            this.speedX *= -1;
            this.randomRotateSpeed();
        }
        if(this.position.y < this.height / 2 || this.position.y > CANDY.Config.height - this.height / 2) {
            this.speedY *= -1;
            this.randomRotateSpeed();
        }
        this.rotation += this.rotateSpeed;
    }

    CANDY.Enemy.prototype.updateTransform.call( this );
};

CANDY.Skittle.prototype.randomRotateSpeed = function() {
    this.rotateSpeed = CANDY.Utils.randomBetween(0.01, 0.03, true);
    if(Math.random() < 0.5) this.rotateSpeed *= -1;
}