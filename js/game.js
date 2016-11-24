'use strict'
var scene, scoresScene, scenePause, camera_pause, camera, renderer;

var lights;
var back_material;
var nave;
var naves = [];
var inimigos = [];
var bullets = [];
var cameras = [];
var camera_pause;

var camera_index = 0;
var clk;
var stats;
var cheat_infinite_ammo = false;
var bullet_counter=0;
var pause = false;

var startingEnemies = 18;

var game_speed = 1;
const DEBUG       = 1;
const ALIENS_PER_ROW = 9;
const MAXLIVES = 3;

//Game Boundaries
const X_MAX = 100;
const X_MIN = -100;
const Z_MAX = 100;
const Z_MIN = -100;
var gameView = {x_min:X_MIN, x_max:X_MAX, z_max:Z_MAX, z_min:Z_MIN }

//scores Viewport
var scoresCamera;
var squareSide = (15*(MAXLIVES))/2; //Hack nojento para ultrapassar a limitacao de calculateCameraBondaries() (so funciona para lados simetricos)
var scoresView = { x_min:-squareSide, x_max:squareSide, z_max:squareSide, z_min:-squareSide }

//Bullet
const BULLET_SPEED = 50;

//Ship
const SHIP_TOP_SPEED_c = 150;
const SHIP_MIN_SPEED_c = 0.8;
const SHIP_ACELARATION = 200;

//Enemy
const ENEMY_SPEED = 10;
var noEnemiesTime = 0;

//start
const STAR_DIST = 70;
const RESTART_TIME = 5; //SECONDS

function updateSpotlightHelper(){
	lights.getSpotlightHelper().update();
}

function init(){
	clk = new THREE.Clock();
	
	renderer = new THREE.WebGLRenderer();
  	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement ) ;
	
	createPauseScene();	
	createScene();
	createScoresScene();

	createCameras();

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
	window.addEventListener("resize", onResize);

	stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );

	animate();
}

function createCameras(){
	// ---------- GameView Ortographic Camera ------------- //
	camera = new THREE.OrthographicCamera( 0, 0, 0, 0, 1, 1000 );
	calculateCameraBondaries(camera, gameView);

	camera.position.set(0,150,0);
	camera.lookAt(new THREE.Vector3(0,0,0));
	cameras.push(camera);

	// ---------- GameScores Ortographic Camera ------------- //

	scoresCamera = new THREE.OrthographicCamera( 0, 0, 0, 0, 1, 1000 );
	calculateCameraBondaries(scoresCamera, scoresView);

	scoresCamera.position.set(0,150,0);
	scoresCamera.lookAt(new THREE.Vector3(0,0,0));
	
	// ----------Fixed Perspective Camera ------------- //

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(0,100,150);
	camera.lookAt(new THREE.Vector3(0,0,0));
	cameras.push(camera);

	// ----------Ship's Perspective Camera ------------- //

	camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.up.set(0, 1, 0);
	camera.lookAt(new THREE.Vector3(0,0,0));
	nave.addChild(camera, 0, 20, 35); //Add to ship
	cameras.push(camera);

	// ----------Fixed Perspective Camera Behind ------------- //

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(0,20,-150);
	camera.lookAt(new THREE.Vector3(0,0,0));
	cameras.push(camera);

	// ----------Fixed Perspective Camera Left ------------- //

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(-150,20,0);
	camera.lookAt(new THREE.Vector3(0,0,0));
	cameras.push(camera);
	// ----------Fixed Perspective Camera Right ------------- //

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(150,20,0);
	camera.lookAt(new THREE.Vector3(0,0,0));
	cameras.push(camera);


	camera = cameras[camera_index];
}

function createScene(){
	'use strict';
	scene  = new THREE.Scene();

	var geometry = new THREE.SphereGeometry( 200, 10, 60 );
	geometry.scale(  -1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( {
		map: new THREE.TextureLoader().load( 'nebula.jpg' )
		} );
	var mesh = new THREE.Mesh( geometry, material );
	mesh.rotateZ(.5*Math.PI);
	scene.add( mesh );

	 	var loader = new THREE.TextureLoader();
	 	var texture = loader.load("nebula.jpg");
	 	texture.minFilter = THREE.LinearFilter;
	 	var textureMaterial = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, depthWrite: false});
	 	var textureGeometry = new THREE.PlaneGeometry(400, 400, 8, 8);
	 	var textureMesh = new THREE.Mesh(textureGeometry, textureMaterial);
	// 	var textureMesh2 = new THREE.Mesh(textureGeometry, textureMaterial);
	// 	var textureMesh3 = new THREE.Mesh(textureGeometry, textureMaterial);
	// 	var textureMesh4 = new THREE.Mesh(textureGeometry, textureMaterial);

	 textureMesh.translateY(-10.5);
     textureMesh.rotateX(0.5*Math.PI);
	// textureMesh2.translateZ(-Z_MAX);
	// textureMesh3.translateX(X_MAX);
	// textureMesh3.rotateY(0.5*Math.PI);
	// textureMesh4.translateX(X_MIN);
	// textureMesh4.rotateY(-0.5*Math.PI);

	 	scene.add(textureMesh);
	// 	//scene.add(textureMesh2);
	// 	//scene.add(textureMesh3);
	// 	scene.add(textureMesh4);

	if(DEBUG){
		scene.add(new THREE.AxisHelper(10));
	}
	
	createLights();
	populate();
}

function createScoresScene () {
	scoresScene = new THREE.Scene();

	/*var background = new THREE.Object3D();
	var background_material = new THREE.MeshBasicMaterial({color: 0x00f0ff, wireframe:false});
	var back_geometry = new THREE.CubeGeometry((X_MAX-X_MIN),1,(Z_MAX-Z_MIN));
	var back_mesh	  = new THREE.Mesh(back_geometry,background_material);
	background.add(back_mesh);
	background.position.copy(new THREE.Vector3(0,-5,0));
	scoresScene.add(background);*/

	replenishLives();

}

function createPauseScene(){
	scenePause = new THREE.Scene();
	camera_pause = new THREE.OrthographicCamera( 0, 0, 0, 0, 1, 1000 );
	calculateCameraBondaries(camera_pause, gameView);
	camera_pause.position.set(0,150,0);
	camera_pause.lookAt(new THREE.Vector3(0,0,0));
	scenePause.add(camera_pause);

	var loader = new THREE.TextureLoader();
	var texture = loader.load("pause.jpg");
	var textureMaterial = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
	var textureGeometry = new THREE.PlaneGeometry(400, 400, 8, 8);
	var textureMesh = new THREE.Mesh(textureGeometry, textureMaterial);
	textureMesh.translateY(-10);
    textureMesh.rotateX(-0.5*Math.PI);

    //--adicionar camera e textura--
	scenePause.add(textureMesh);
	if(DEBUG){
		scenePause.add(new THREE.AxisHelper(10));
	}
}

function createLights(){
	lights = new LightManager(scene);
}

function inverseFloor(){
	back_material.visible = !back_material.visible;
}

function calculateColisions(dt){
// ------------- Ship Collides with the worlds borders -------------------------
	if (nave.hasLeftRightWallColision(X_MIN,X_MAX)) {
		nave.stop();
		nave.updatePosition(dt);
	}
// ------------- Bullet Collides with the worlds borders -------------------------
	for (var b = 0; b < bullets.length;) {
		if(bullets[b].hasTopBotWallColision(Z_MIN,Z_MAX)) {
			scene.remove(bullets[b]);
			bullets.splice(b,1);
		} else {
			b++;
		}
	}

	for (var i = 0; i < inimigos.length; i++) {

	// ------------- Enemy Collides with the worlds borders -------------------------
		if(inimigos[i].hasLeftRightWallColision(X_MIN,X_MAX)) {
			inimigos[i].collidedLeftRightWall();
			inimigos[i].updatePosition(dt);
		}else if(inimigos[i].hasTopBotWallColision(Z_MIN,Z_MAX)) {
			inimigos[i].collidedTopBotWall();
			inimigos[i].updatePosition(dt);
		}
	// ------------- Enemy Collides with enemy -------------------------------------
		for (var j = i+1; j < inimigos.length; j++) {
			if(inimigos[i].hasColision(inimigos[j])){
				inimigos[i].collidedAnotherEnemy();
				inimigos[j].collidedAnotherEnemy();
				inimigos[i].updatePosition(dt);
				inimigos[j].updatePosition(dt);
			}
		}
	// ------------- Enemy Collides with ship ---------------------------------------
		if(nave.hasColision(inimigos[i])){
			nave.alienCollision(inimigos[i]);			
			//scene.remove(inimigos[i]);
			inimigos.splice(i,1);
			if(nave.getShield() == -1) { 				
				scoresScene.remove(naves.pop());	
				if (naves.length == 0) { endOfGame(); }
				else { nave.replenishShield(); }
			}
			break;
		}
	// ------------- Enemy Collides with bullet --------------------------------------
		for (var b = 0; b < bullets.length; b++) {
			if(inimigos[i].hasColision(bullets[b])){
				inimigos[i].gotShot(bullets[b]);
				inimigos.splice(i,1);
				i--;
				bullets.splice(b,1);
				break;
			}
		}
	}
}

function populate () {
	nave = new Ship(scene,20,0,95,true,0);
	naves.push(nave);
	var spotlight = lights.getSpotlight()
	nave.add(spotlight);
	nave.add(spotlight.target);
	createMoreEnemies();
}

function restart(){
	//Remove Everything
	if(nave != null){
		scene.remove(nave);
		naves.pop();
	}
	for (var b = 0; b < bullets.length;) {
		scene.remove(bullets[b]);
		bullets.splice(b,1);
	}

	for (var i = 0; i < inimigos.length;) {
		scene.remove(inimigos[i]);
		inimigos.splice(i,1);
	}

	for (var j = 0; j < naves.length; ) {
		scoresScene.remove(naves[j]);
		naves.splice(j, 1);
	}

	populate();
	replenishLives();
	pause = false;
}

function replenishLives () {
	var spareShip;
	for (var i=0; i < MAXLIVES; i++) {
		//spareShip = new Ship(scoresScene,scoresView.x_max-20*(1+i),0,squareSide,false,0);
		spareShip = new Ship(scoresScene,scoresView.x_min,0,scoresView.z_max-15*(i),false,0);	
		naves.push(spareShip);
	}
}

function createMoreEnemies(){
	var rows = startingEnemies/ALIENS_PER_ROW;
	var j = 0;
	while(j < rows){
		var pos_x = X_MIN+5;
		var i = 0;
		while(i < ALIENS_PER_ROW){

			var enemy1 = new Enemy(scene,pos_x,0,j*20-50,nave.complex,nave.complexIndex);
			inimigos.push(enemy1);
			i++;
			pos_x += 20;
		}
		j++;
	}
}

function endOfGame(){
	console.log("you lost") ;
	console.log("killed: " + (startingEnemies - inimigos.length) + " aliens");
	pause = true;
}

function animate(){
	stats.begin();
	var real_dt = clk.getDelta();
	renderer.autoClear = false; // Se isto ficar, passar para a instanciacao do renderer
	renderer.clear();
	var dt = real_dt / game_speed;


	if(!pause){
		//cheat_infinite_ammo ACTIVATED
		if(cheat_infinite_ammo) {
			createNewBullet();
		}

		//CalculateNextPositions
		//Update ship
		nave.update(dt);

		//update all enemies
		for (var i = 0; i < inimigos.length; i++) {
			inimigos[i].update(dt);
		}

		//update all bullets
		for (var i = 0; i < bullets.length; i++) {
			bullets[i].update(dt);
		}


		calculateColisions(dt);

		//Push Updates
		//Update ship
		nave.realUpdatePosition();

		//update all enemies
		for (var i = 0; i < inimigos.length; i++) {
			inimigos[i].realUpdatePosition();
		}

		//update all bullets
		for (var i = 0; i < bullets.length; i++) {
			bullets[i].realUpdatePosition();
		}
		updateSpotlightHelper();
		renderer.setViewport(0,0, window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
		// --------------------- Gamescores Viewport rendering ---------------------- //
		
		renderer.setViewport(0, 0, window.innerWidth/10, window.innerHeight/6)
		renderer.render(scoresScene, scoresCamera);
		// ...GOES HERE...TODO.

		//------------------------------------------------------------------------------
	}
	if(pause == true) {
	//---pause---
	renderer.setViewport(0,0, window.innerWidth, window.innerHeight);
	renderer.render(scenePause, camera_pause);
	}


	stats.end();
	requestAnimationFrame(animate);
}

function texturePause() {
	//-- textura pause --
	var loader = new THREE.TextureLoader();
	var texture = loader.load("pause.jpg");
	var textureMaterial = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
	var textureGeometry = new THREE.PlaneGeometry(400, 400, 8, 8);
	var textureMesh = new THREE.Mesh(textureGeometry, textureMaterial);
	textureMesh.translateY(1);
    textureMesh.rotateX(-0.5*Math.PI);

    //--adicionar camera e textura--
	scenePause.add(textureMesh);
	if(DEBUG){
		scenePause.add(new THREE.AxisHelper(10));
	}
	renderer.setViewport(0,0, window.innerWidth, window.innerHeight);
	renderer.render(scenePause, camera_pause);
}

function togglePause(){
	pause = !pause;
	if (pause == true) {
		//texturePause();
	}
}

function createNewBullet(){
	var bulletPosition = ( new THREE.Vector3 (nave.getPositionX(), nave.getPositionY(), nave.getPositionZ()) ).add(nave.getObjectCenter());
	var bullet = new Bullet(scene, bulletPosition, nave.complex, nave.complexIndex);
	bullet.setSpeed(0,0,-BULLET_SPEED);
	bullets.push(bullet);
	bullet_counter = bullet_counter+1;
}

function onKeyDown (event) {

	switch (event.keyCode) {

		case 37://alert ("left key");
			nave.startLeft();
			break;
		case 38://alert("up key");
			break;
		case 39://alert ("right key");
			nave.startRight();
			break;
		case 40://alert ("down key");
			break;
		case 97: //a
		case 65: //A
			nave.inverseWireframe();
			for (var i = 0; i < inimigos.length; i++) {
				inimigos[i].inverseWireframe();
			}
			for (var i = 0; i < bullets.length; i++) {
				bullets[i].inverseWireframe();
			}
			break;
		case 110: //n
		case 78 : //N
			lights.toggleSun();
			break;
		case 108: //l
		case 76 : //L
			nave.swapBasic();
			for (var i = 0; i < inimigos.length; i++) {
				inimigos[i].swapBasic();
			}
			for (var i = 0; i < bullets.length; i++) {
				bullets[i].swapBasic();
			}
			lights.toggle();
			break;
		case 103: //g
		case 71 : //G
			nave.swapComplex();
			for (var i = 0; i < inimigos.length; i++) {
				inimigos[i].swapComplex();
			}
			for (var i = 0; i < bullets.length; i++) {
				bullets[i].swapComplex();
			}
			break;
		case 122: //z
		case 90: //Z
			inverseFloor();
			break;
		case 72: //H
		case 104: //h
			lights.toggleSpotLight();
			break;
		case 80://P
		case 114://p
			togglePause();
			break;
		case 81://Q
		case 113://q
			lights.toggleHelpers();
			break;
		case 115: //s
		case 83: //S
			//back_material.visible = !back_material.visible;
			nave.inverseBoundingBox();
			for (var i = 0; i < inimigos.length; i++) {
				inimigos[i].inverseBoundingBox();
			}
			for (var i = 0; i < bullets.length; i++) {
				bullets[i].inverseBoundingBox();
			}
			break;
		case 79: // O
		case 111: // o
			cheat_infinite_ammo = ! cheat_infinite_ammo;
			break
		case 99: // c
		case 67: // C
			lights.toggleStars();
			break;
		case 82: //R
		case 114: //r
			restart()
			break;
		case 86: // V
		case 118: // v
			var num_cameras = cameras.length;
			camera_index = (camera_index+1)%num_cameras;
			camera = cameras[camera_index];
			calculateCameraBondaries(camera, gameView)
			break;
    	case 49: // 1
        	camera=cameras[0];
			camera_index = 0;
			calculateCameraBondaries(camera, gameView);
        	break;
    	case 50: // 2
        	camera=cameras[1];
			camera_index = 1;
			calculateCameraBondaries(camera, gameView);
        	break;
    	case 51: // 3
        	camera=cameras[2];
			camera_index = 2;
			calculateCameraBondaries(camera, gameView);
        	break;
    	case 52: // 4
        	camera=cameras[3];
			camera_index = 3;
			calculateCameraBondaries(camera, gameView);
        	break;
    	case 53: // 5
        	camera=cameras[4];
			camera_index = 4;
			calculateCameraBondaries(camera, gameView);
        	break;
    	case 54: // 6
        	camera=cameras[5];
			camera_index = 5;
			calculateCameraBondaries(camera, gameView);
        	break;
    	case 56: // 8
			game_speed *= 0.9;
			if(game_speed <= 0) {
				game_speed=0.0001;
			}
        	break;
    	case 57: // 9
			game_speed *= 1.1;
			if(game_speed >= 2.5) {
				game_speed=2.4;
			}
        	break;
    }
}

function onKeyUp (event) {
	switch (event.keyCode) {
		case 37://alert ("left key");
			nave.stopLeft();
			break;
		case 38://alert("up key");
			break;
		case 39://alert ("right key");
			nave.stopRight();
			break;
		case 40://alert ("down key");
			break;
		case 40: //space bar
		case 98: //b
		case 66: //B
			createNewBullet();
			break;
		}
}

function onResize(){
	'use strict';
	renderer.setSize(window.innerWidth, window.innerHeight);
	// ----- gameViewport on resize:
	calculateCameraBondaries(camera, gameView);
	// ----- scoresViewport on resize:
	calculateCameraBondaries(scoresCamera, scoresView);
			
}

function calculateCameraBondaries(camera, view) {
	if (!(camera instanceof THREE.OrthographicCamera)) { 
		renderer.setSize(window.innerWidth, window.innerHeight);
		if (window.innerHeight > 0 && window.innerWidth > 0) {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		}
	} else {
		var windowHeight = window.innerHeight;
		var windowWidth = window.innerWidth;
		var aspect = windowWidth / windowHeight;
		var innerGameAspect = (view.x_max-view.x_min)/(view.z_max-view.z_min);
		var lowX = view.x_min;
		var highX  = view.x_max;
		var lowZ = view.z_min;
		var highZ  = view.z_max;
		if (aspect > innerGameAspect) {
			var newWidth = aspect*(view.x_max-view.x_min);
			lowX = -newWidth/2;
			highX  =  newWidth/2;
		} else {
			var newHeight = (view.z_max-view.z_min)/aspect;
			lowZ = -newHeight/2;
			highZ  = newHeight/2;
		}
		camera.left   = lowX;
		camera.right  = highX;
		camera.bottom = lowZ;
		camera.top    = highZ;
		camera.updateProjectionMatrix();
	}
}
