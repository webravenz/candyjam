
CANDY.CandyShadow = function() {
    
    CANDY.Enemy.call(this, [PIXI.Texture.fromImage('img/candy-shadow.png')]);
    
    this.animationSpeed = 0.2;
    this.poolName = 'candyShadow';
};

CANDY.CandyShadow.constructor = CANDY.CandyShadow;
CANDY.CandyShadow.prototype = Object.create( CANDY.Enemy.prototype );

CANDY.CandyShadow.prototype.alloc = function(playerPos) {
  if(Math.random() > 0.7) {
    // place according to player position
    this.position.x = CANDY.Utils.randomBetween(playerPos.x - 150, playerPos.x + 150) + 90;
    this.position.y = CANDY.Utils.randomBetween(playerPos.y - 100, playerPos.y + 100) + 140;
    this.position.x = CANDY.Utils.boundary(this.position.x, this.width / 2, CANDY.Config.width * 0.6);
    this.position.y = CANDY.Utils.boundary(this.position.y, this.height / 2 + 50, CANDY.Config.height - this.height);
  } else {
    // place anywhere
    this.position.x = CANDY.Utils.randomBetween(this.width / 2, CANDY.Config.width * 0.6);
    this.position.y = CANDY.Utils.randomBetween(this.height / 2 + 50, CANDY.Config.height - this.height);
  }
  console.log(this.position.x, this.position.y);
  this.life = 1;
  this.speedX = 0;
  this.speedY = 0;

  CANDY.Enemy.prototype.alloc.call(this);
  
  this.alpha = 0.01;
  this.scale.x = this.scale.y = 0.01;
  this.coming = true;

};

CANDY.CandyShadow.prototype.updateTransform = function() {

    if(this.active) {
        if(this.coming) {
          this.alpha += 0.008;
          this.scale.x = this.scale.y = this.alpha;
          if(this.alpha >= 1) {
            this.alpha = 1;
            this.coming = false;
          }
        } else {
          this.alpha -= 0.05;
          if(this.alpha <= 0) {
            this.alpha = 0;
            this.canRealloc();
          }
        }
    }

    CANDY.Enemy.prototype.updateTransform.call( this );
};