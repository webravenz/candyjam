CANDY.EnemiesManager = function() {
    PIXI.DisplayObjectContainer.call( this );
    
    var totalEnemies = 20;
    this.enemies = [];
    var tmpEnemies = [];
    while(totalEnemies--) {
        var e = new CANDY.Enemy();
        e.position.x = CANDY.Config.width + 200;
        this.addChild(e);
        //we use two different variable
        //this.enemies will keep all the enemis
        //tmpEnemies is only used to create the pool
        //if we use the same variable, the pool only get a reference to this.enemies and so modifie our array
        this.enemies.push(e);
        tmpEnemies.push(e);
    }
    this.pool = new CANDY.Pool(tmpEnemies);
    
    
    this.MIN_BETWEEN_WAVE = 440;
    this.MAX_BETWEEN_WAVE = 540;
    this.COEFF_DISPERSSION_X = 0.5;
    
    this.nbFrameBeforeNextWave = CANDY.Utils.randomBetween(30, 60);
}

CANDY.EnemiesManager.constructor = CANDY.EnemiesManager;
CANDY.EnemiesManager.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );


CANDY.EnemiesManager.prototype.updateTransform = function() {
    this.nbFrameBeforeNextWave--;
    
    if(this.nbFrameBeforeNextWave === 0) {
        this.newWave();
    }
    
    PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}

CANDY.EnemiesManager.prototype.newWave = function() {
    var scope = this;
    
    var nbEnemies = CANDY.Utils.randomBetween(5, 15);
    console.log('WAVE');
    while(nbEnemies--) {
        this.pool.act(function(e, pool) {
            e.alloc();
            e.position.x = CANDY.Utils.randomBetween(CANDY.Config.width, CANDY.Config.width*scope.COEFF_DISPERSSION_X + CANDY.Config.width);
            e.position.y = CANDY.Utils.randomBetween(10, CANDY.Config.height - 30);
        });
    }
    
    this.nbFrameBeforeNextWave = CANDY.Utils.randomBetween(this.MIN_BETWEEN_WAVE, this.MAX_BETWEEN_WAVE);
};