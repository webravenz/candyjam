
CANDY.Candy = function() {
    
    CANDY.Enemy.call(this, [PIXI.Texture.fromImage('img/candy.png')]);
    
    this.animationSpeed = 0.2;
    this.poolName = 'candy';
    this.hitOffset = {x: 0, y: 140};
};

CANDY.Candy.constructor = CANDY.Candy;
CANDY.Candy.prototype = Object.create( CANDY.Enemy.prototype );

CANDY.Candy.prototype.alloc = function(shadow) {
    this.position.x = shadow.position.x;
    this.position.y = shadow.position.y - 900;
    this.life = 1;
    this.speedX = 0;
    this.speedY = 0;

    CANDY.Enemy.prototype.alloc.call(this);
    
    this.waitTime = 40;
    this.hitArea = false;
    
};

CANDY.Candy.prototype.updateTransform = function() {
  

  if(this.active) {
    this.waitTime--;
    if(this.waitTime <= -89) {
      this.speedY = 0;
      this.alpha -= 0.05;
      
      if(this.alpha < 0.2) {
        this.hitArea = new CANDY.Rectangle(this.position.x, this.position.y, 210, 70);
      } else {
        this.hitArea = false;
      }
      
      if(this.alpha <= 0) {
        this.alpha = 0;
        this.canRealloc();
      }
    } else if(this.waitTime <= 0) {
      this.speedY += 0.2;
    }
  }

  CANDY.Enemy.prototype.updateTransform.call( this );
};