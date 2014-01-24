(function() {
    // create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x000000);
	CANDY.Config = {
        width : Math.min(1100, window.innerWidth),
        height : Math.min(800, window.innerHeight)
    };
    
	// create a renderer instance and append the view 
	var renderer = PIXI.autoDetectRenderer(CANDY.Config.width, CANDY.Config.height);
    document.body.appendChild(renderer.view);
    
	var background, player, bulletsManager, enemiesManager, collisionManager = null;
    
    // load all needed assets
    var loader = new PIXI.AssetLoader(['img/player.json', 'img/background.png', 'img/papasmurf.png']);
    loader.onComplete = onAssetsLoaded;
	loader.load();
    
    function onAssetsLoaded() {

        background = PIXI.Sprite.fromImage('img/background.png');
        stage.addChild(background);
        
        // create player object
        player = new CANDY.Player;
        stage.addChild(player);

        // ennemies
        enemiesManager = new CANDY.EnemiesManager();
        stage.addChild(enemiesManager);
        
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