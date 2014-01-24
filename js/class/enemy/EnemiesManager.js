CANDY.EnemiesManager = function() {
    PIXI.DisplayObjectContainer.call( this );
    
    this.enemies = [];

    this.createPool('Magic', 'magic', 30);

    this.papaSmurf = new CANDY.PapaSmurf();
    this.enemies.push(this.papaSmurf);

    this.currentLevel = false;
}

CANDY.EnemiesManager.constructor = CANDY.EnemiesManager;
CANDY.EnemiesManager.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

CANDY.EnemiesManager.prototype.createPool = function(className, varName, number) {
    var tmpEnemies = [];
    this[varName] = [];
    while(number--) {
        var e = new CANDY[className]();
        this.addChild(e);
        this[varName].push(e);
        tmpEnemies.push(e);
        this.enemies.push(e);
    }
    this[varName+'Pool'] = new CANDY.Pool(tmpEnemies);
};

CANDY.EnemiesManager.prototype.updateTransform = function() {
    
    switch(this.currentLevel) {
        case 1 :

            // check death
            if(this.papaSmurf.dying) {
                this.currentLevel = false;
            }

            // attack
            if(this.timerAttack <= 0) {
                this.papaSmurfAttack();
                this.timerAttack = CANDY.Utils.randomBetween(60, 180);
            }
            break;
    }

    this.timerAttack--;
    
    PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}

CANDY.EnemiesManager.prototype.newWave = function() {
    var scope = this;
    
    var nbEnemies = CANDY.Utils.randomBetween(5, 15);
    while(nbEnemies--) {
        this.pool.act(function(e, pool) {
            e.alloc();
            e.position.x = CANDY.Utils.randomBetween(CANDY.Config.width, CANDY.Config.width*scope.COEFF_DISPERSSION_X + CANDY.Config.width);
            e.position.y = CANDY.Utils.randomBetween(10, CANDY.Config.height - 30);
        });
    }
    
    this.nbFrameBeforeNextWave = CANDY.Utils.randomBetween(this.MIN_BETWEEN_WAVE, this.MAX_BETWEEN_WAVE);
};


CANDY.EnemiesManager.prototype.initLevel1 = function() {
    this.addChild(this.papaSmurf);
    this.papaSmurf.alloc();

    this.timerAttack = 200;
    this.currentLevel = 1;
}

CANDY.EnemiesManager.prototype.papaSmurfAttack = function() {
    var nbEnemies = CANDY.Utils.randomBetween(3, 5);
    while(nbEnemies--) {
        this.magicPool.act(function(e, pool) {
            e.alloc();
        });
    }
}