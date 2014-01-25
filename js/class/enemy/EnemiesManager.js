CANDY.EnemiesManager = function() {
    PIXI.DisplayObjectContainer.call( this );
    
    this.enemies = [];

    this.createPool('Magic', 'magic', 30);
    this.createPool('Smurf', 'smurf', 20);

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
                // destroy smurfs
                for(var i = 0; i < this.smurf.length; i++) {
                    if(this.smurf[i].active) this.smurf[i].touched({damage: 100});
                }
            }

            // attack
            if(this.timerAttack <= 0) {
                this.papaSmurfAttack();
                this.timerAttack = CANDY.Utils.randomBetween(90, 180);
            }

            // smurfs
            if(this.timerAppear <= 0) {
                this.smurfAppear();
                this.timerAppear = CANDY.Utils.randomBetween(240, 300);
            }
            break;
    }

    this.timerAttack--;
    this.timerAppear--;
    
    PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}

CANDY.EnemiesManager.prototype.initLevel1 = function() {
    var scope = this;

    this.addChild(this.papaSmurf);
    this.papaSmurf.alloc();

    this.timerAttack = 420;
    this.timerAppear = 460;
    this.currentLevel = 1;

    // show boss UI
    setTimeout(function() {
        CANDY.BossUI.setName('Papa Smurf');
        CANDY.BossUI.show();
    }, 2000);

    
    // show bubble
    setTimeout(function() {
        CANDY.BossUI.showBubble('You shall not scroll !');
    }, 3000);

    // hide bubble
    setTimeout(function() {
        CANDY.BossUI.hideBubble();
        scope.papaSmurf.canMove = true;
    }, 6000);
}

CANDY.EnemiesManager.prototype.papaSmurfAttack = function() {
    var nbEnemies = CANDY.Utils.randomBetween(2, 5);
    while(nbEnemies--) {
        this.magicPool.act(function(e, pool) {
            e.alloc();
        });
    }
}

CANDY.EnemiesManager.prototype.smurfAppear = function() {
    var nbEnemies = CANDY.Utils.randomBetween(4, 8);
    while(nbEnemies--) {
        this.smurfPool.act(function(e, pool) {
            e.alloc();
        });
    }
}