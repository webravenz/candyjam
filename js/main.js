(function() {
    // create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x000000);
	CANDY.Config = {
        width : 1100,
        height : 800
    };

    CANDY.BossUI.init();
    
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
        
        //create the bullet Manager
        bulletsManager = new CANDY.BulletsManager(player);
        stage.addChild(bulletsManager);
        
        collisionManager = new CANDY.CollisionManager(player, enemiesManager, bulletsManager);
        
        // init controls
        CANDY.Controls.start();
        
        requestAnimFrame( animate );

        enemiesManager.initLevel1();
        
    }
    
	function animate() {
	    // render the stage   
	    renderer.render(stage);
        collisionManager.checkCollision();

        requestAnimFrame( animate );
	}
    
    



})();