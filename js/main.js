(function() {
    // create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x000000);
	CANDY.Config = {
        width : Math.min(900, window.innerWidth),
        height : Math.min(600, window.innerHeight)
    };
    
	// create a renderer instance and append the view 
	var renderer = PIXI.autoDetectRenderer(CANDY.Config.width, CANDY.Config.height);
    document.body.appendChild(renderer.view);
    
	var player, bulletsManager, collisionManager = null;
    
    // load all needed assets
    var loader = new PIXI.AssetLoader([]);
    loader.onComplete = onAssetsLoaded;
	loader.load();
    
    function onAssetsLoaded() {
        
        // create player object
        player = new CANDY.Player;
        stage.addChild(player);
        
        //create the bullet Manager
        bulletsManager = new CANDY.BulletsManager(player);
        stage.addChild(bulletsManager);
        
        //collisionManager = new CANDY.CollisionManager(player, enemiesManager, bulletsManager);
        
        // init controls
        CANDY.Controls.start();
        
        requestAnimFrame( animate );
        
    }
    
	function animate() {
	    // render the stage   
	    renderer.render(stage);
        //collisionManager.checkCollision();

        requestAnimFrame( animate );
	}
    
    



})();