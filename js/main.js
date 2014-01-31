
(function() {
    // create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x000000);
	CANDY.Config = {
    width : 1100,
    height : 800
  };
  
  var paused = false;
  var home = document.getElementById('home');
  var playBtn = document.querySelectorAll('#home .play')[0];
  var gameOver = document.getElementById('game-over');
  var retryBtn = document.querySelectorAll('#game-over .retry')[0];

  CANDY.BossUI.init();
  CANDY.PlayerUI.init();
    
	// create a renderer instance and append the view 
	var renderer = PIXI.autoDetectRenderer(CANDY.Config.width, CANDY.Config.height);
  document.getElementById('game').appendChild(renderer.view);
    
	var background, player, bulletsManager, enemiesManager, collisionManager = null;
    
  // load all needed assets
  var loader = new PIXI.AssetLoader(['img/player.json', 'img/background.png', 'img/papasmurf.png', 'img/smurf.png', 'img/apple.png', 'img/skittle.png']);
  loader.onComplete = onAssetsLoaded;
	loader.load();
    
  function onAssetsLoaded() {

    background = PIXI.Sprite.fromImage('img/background.png');
    stage.addChild(background);

    // create player object
    player = new CANDY.Player;

    // ennemies
    enemiesManager = new CANDY.EnemiesManager(player);
    stage.addChild(enemiesManager);

    stage.addChild(player);
    player.init();

    //create the bullet Manager
    bulletsManager = new CANDY.BulletsManager(player);
    stage.addChild(bulletsManager);

    collisionManager = new CANDY.CollisionManager(player, enemiesManager, bulletsManager);

    requestAnimFrame( animate );
    
    CANDY.Controls.start();
    player.canShoot = true;
    
    playBtn.addEventListener('click', function() {
      playBtn.removeEventListener('click');
      home.classList.remove('show');
      CANDY.Controls.stop();
      player.canShoot = false;
      initGame();
    });
    
  }
  
  function initGame() {
    
    player.init();
    
    // init controls
    CANDY.Controls.start();
    CANDY.PlayerUI.show();
    
    setTimeout(function() {
      enemiesManager.initLevel1();
    }, 3000);
    
  }
    
	function animate() {
    requestAnimFrame( animate );
    if(paused) return;
    // render the stage   
    renderer.render(stage);
    collisionManager.checkCollision();

	}
  
  // game over
  CANDY.showGameOver = function() {
    paused = true;
    CANDY.BossUI.hide();
    CANDY.PlayerUI.hide();
    CANDY.Controls.stop();
    gameOver.classList.add('show');
    
    setTimeout(function() {
      enemiesManager.removeAll();
      paused = false;
      retryBtn.addEventListener('click', function() {
        retryBtn.removeEventListener('click');
        initGame();
        gameOver.classList.remove('show');
        return false;
      });
    }, 2000);
    
    
  };
  
})();