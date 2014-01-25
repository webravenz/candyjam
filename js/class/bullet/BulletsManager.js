CANDY.BulletsManager = function(player) {
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
    
    
    this.SHOOT_DELAY = 15;
    this.shootTimer = 0;
    this.player = player;
}

CANDY.BulletsManager.constructor = CANDY.BulletsManager;
CANDY.BulletsManager.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );


CANDY.BulletsManager.prototype.updateTransform = function() {
    this.shootTimer--;
    
    if(this.player.canShoot && this.shootTimer <= 0 && (CANDY.Controls.pressed(CANDY.Controls.S))) {
        this.shoot();
    }
    
    PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}

CANDY.BulletsManager.prototype.shoot = function() {
    var scope = this;
    
    this.pool.act(function(b, pool) {
        b.alloc();
        b.position.x = scope.player.position.x + scope.player.width - b.speedX - 5;
        b.position.y = scope.player.position.y + scope.player.height / 2 + 35;
        scope.player.speedX -= 2;
        scope.player.speedY *= 0.3;
    });
    
    this.shootTimer = this.SHOOT_DELAY;
};