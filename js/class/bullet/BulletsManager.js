CANDY.BulletsManager = function(ship) {
    PIXI.DisplayObjectContainer.call( this );
    
    var totalBullets = 20;
    this.bullets = [];
    var tmpBullets = [];
    while(totalBullets--) {
        var b = new CANDY.Bullet();
        this.addChild(b);
        this.bullets.push(b);
        tmpBullets.push(b);
    }
    this.pool = new CANDY.Pool(tmpBullets);
    
    
    this.SHOOT_DELAY = 10;
    this.shootTimer = 0;
    this.ship = ship;
}

CANDY.BulletsManager.constructor = CANDY.BulletsManager;
CANDY.BulletsManager.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );


CANDY.BulletsManager.prototype.updateTransform = function() {
    this.shootTimer--;
    
    if(this.shootTimer <= 0 && (CANDY.Controls.pressed(CANDY.Controls.S))) {
        this.shoot();
    }
    
    PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}

CANDY.BulletsManager.prototype.shoot = function() {
    var scope = this;
    
    this.pool.act(function(b, pool) {
        b.alloc();
        b.position.x = scope.ship.position.x + scope.ship.width - b.speedX - 25;
        b.position.y = scope.ship.position.y + scope.ship.height / 2 + 28;
        scope.ship.speedX -= 2;
        scope.ship.speedY *= 0.3;
    });
    
    this.shootTimer = this.SHOOT_DELAY;
};