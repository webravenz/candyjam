
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
  var story = document.getElementById('story');
  var playBtnStory = document.querySelectorAll('#story .play')[0];
  var gameOver = document.getElementById('game-over');
  var retryBtn = document.querySelectorAll('#game-over .retry')[0];
  var completeScreen = document.getElementById('complete');
  var completeTime = document.querySelectorAll('#complete .time span')[0];
  var replayBtn = document.querySelectorAll('#complete .replay')[0];

  var timeStart;

  CANDY.BossUI.init();
  CANDY.PlayerUI.init();
    
	// create a renderer instance and append the view 
	var renderer = PIXI.autoDetectRenderer(CANDY.Config.width, CANDY.Config.height);
  document.getElementById('game').appendChild(renderer.view);
    
	var background, player, bulletsManager, enemiesManager, collisionManager = null;
    
  // load all needed assets
  var loader = new PIXI.AssetLoader(['img/player.json', 'img/background.png', 'img/papasmurf.png', 'img/smurf.png', 'img/apple.png', 'img/skittle1.png', 'img/skittle2.png', 'img/skittle3.png', 'img/skittle4.png', 'img/candy-shadow.png', 'img/candy.png']);
  loader.onComplete = onAssetsLoaded;
	loader.load();
    
  function onAssetsLoaded() {

    background = PIXI.Sprite.fromImage('img/background.png');
    stage.addChild(background);

    // create player object
    player = new CANDY.Player;

    // ennemies
    enemiesManager = new CANDY.EnemiesManager(player, gameComplete);
    CANDY.enemiesManager = enemiesManager;
    stage.addChild(enemiesManager);

    stage.addChild(player);
    player.init();
    
    enemiesManager.init();

    //create the bullet Manager
    bulletsManager = new CANDY.BulletsManager(player);
    stage.addChild(bulletsManager);

    collisionManager = new CANDY.CollisionManager(player, enemiesManager, bulletsManager);

    requestAnimFrame( animate );
    
    CANDY.Controls.start();
    player.canShoot = true;
    
    home.classList.add('show');
    
    playBtn.addEventListener('click', clickPlayHome);
    
  }

  function clickPlayHome() {
    playBtn.removeEventListener('click', clickPlayHome);
    home.classList.remove('show');
    CANDY.Controls.stop();
    player.canShoot = false;
    initStory();
    return false;
  }
  
  function initStory() {
    
    story.classList.add('show');
    
    playBtnStory.addEventListener('click', clickPlayStory);
    
  }

  function clickPlayStory() {
    playBtnStory.removeEventListener('click', clickPlayStory);
    story.classList.remove('show');
    setTimeout(function() {
      initGame();
    }, 1000);
    return false;
  }
  
  function initGame() {
    
    player.init();
    
    // init controls
    CANDY.Controls.start();
    CANDY.PlayerUI.show();
    
    setTimeout(function() {
      enemiesManager.initLevel3();
    }, 3000);

    var date = new Date();
    timeStart = date.getTime();
    
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
      retryBtn.addEventListener('click', clickRetry);
    }, 2000);
    
    
  };

  function clickRetry() {
    retryBtn.removeEventListener('click', clickRetry);
    initGame();
    gameOver.classList.remove('show');
    return false;
  }

  function gameComplete() {
    var date = new Date();
    var timeSpend = date.getTime() - timeStart;
    var secondes = Math.round(timeSpend / 1000);
    var minutes = Math.floor(secondes / 60);
    secondes = secondes % 60;

    var texte = '';
    if(minutes > 0) {
      texte += minutes+' minute';
      if(minutes > 1) texte += 's';
    }
    if(minutes > 0 && secondes > 0) texte += ' and ';
    if(secondes > 0) {
      texte += ' '+secondes+' second';
      if(secondes > 1) texte += 's';
    }

    completeTime.innerHTML = texte;

    completeScreen.classList.add('show');

    replayBtn.addEventListener('click', clickReplay);
  }

  function clickReplay() {
    replayBtn.removeEventListener('click', clickReplay);
    initGame();
    completeScreen.classList.remove('show');
    return false;
  }
  
})();