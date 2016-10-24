'use strict'
var scene, camera, renderer;

var nave;
var inimigos = [];
var bullets = [];
var cameras = [];

var camera_index = 0;
var clk;
var stats;
var cheat_infinite_ammo = false;
var bullet_counter=0;
//const DEBUG       = 0;

//Game Boundaries
const X_MAX = 100;
const X_MIN = -100;
const Z_MAX = 100;
const Z_MIN = -100;

//movement variables

//Bullet
const BULLET_SPEED = 50;

//Ship
const SHIP_TOP_SPEED_c = 150;
const SHIP_MIN_SPEED_c = 0.8;
const SHIP_ACELARATION = 200;

//Enemy
const ENEMY_SPEED = 10;


function init(){
	clk = new THREE.Clock();

	createScene();

	// ---------- Ortographic Camera ------------- //
	camera = new THREE.OrthographicCamera( 0, 0, 0, 0, 1, 1000 );
  	calculateCameraBondaries(camera);

	camera.position.set(0,150,0);
	camera.lookAt(new THREE.Vector3(0,0,0));
	cameras.push(camera);

	// ----------Fixed Perspective Camera ------------- //

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(0,100,150);
	camera.lookAt(new THREE.Vector3(0,0,0));
	cameras.push(camera);

	// ----------Ship's Perspective Camera ------------- //

	camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.up.set(0, 1, 0);
	camera.lookAt(new THREE.Vector3(0,0,0));
	nave.addChild(camera, 0, 20, 35);
	cameras.push(camera);
	//---------------------------------------------------//

	camera = cameras[camera_index];

	renderer = new THREE.WebGLRenderer();
  	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement ) ;


	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
	window.addEventListener("resize", onResize);

	stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );

	animate();
}

function createScene(){
	'use strict';
	scene  = new THREE.Scene();

	nave = new Ship(scene,20,0,80);

	var j = 0;
	while(j < 2){
		var i = 0;
		var pos_x = X_MIN+5;
		while(i < 9){

			var enemy1 = new Enemy(scene,pos_x,0,j*20-50);
			inimigos.push(enemy1);
			i++;
			pos_x += 20;
		}
		j++;
	}
	if(DEBUG){

		var background = new THREE.Object3D();
		var back_material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:true});
		var back_geometry = new THREE.CubeGeometry((X_MAX-X_MIN),1,(Z_MAX-Z_MIN));
		var back_mesh	  = new THREE.Mesh(back_geometry,back_material);
		background.add(back_mesh);
		background.position.x = 0;
		background.position.y = -1;
		background.position.z = 0;
		scene.add(background);
		scene.add(new THREE.AxisHelper(10));
	}
}

function calculateColisions(dt){
	//detectColision
	if(nave.hasLeftRightWallColision(X_MIN,X_MAX)){
		nave.stop();
		nave.updatePosition(dt);
	}

	for (var b = 0; b < bullets.length;) {
		if(bullets[b].hasTopBotWallColision(Z_MIN,Z_MAX)) {
			scene.remove(bullets[b]);
			bullets.splice(b,1);
		} else {
			b++;
		}
	}

	for (var i = 0; i < inimigos.length;) {
		if(inimigos[i].hasLeftRightWallColision(X_MIN,X_MAX)) {
			inimigos[i].collidedLeftRightWall();
			inimigos[i].updatePosition(dt);
		}else if(inimigos[i].hasTopBotWallColision(Z_MIN,Z_MAX)) {
			inimigos[i].collidedTopBotWall();
			inimigos[i].updatePosition(dt);
		}
		for (var j = i+1; j < inimigos.length; j++) {
			if(inimigos[i].hasColision(inimigos[j])){
				inimigos[i].collidedAnotherEnemy();
				inimigos[j].collidedAnotherEnemy();
				inimigos[i].updatePosition(dt);
				inimigos[j].updatePosition(dt);
			}
		}
		var bullet_colision = false;
		for (var b = 0; b < bullets.length; b++) {
			if(inimigos[i].hasColision(bullets[b])){
				scene.remove(inimigos[i]);
				scene.remove(bullets[b]);
				inimigos.splice(i,1);
				bullets.splice(b,1);
				bullet_colision = true;
				break;
			}
		}
		if(!bullet_colision) { i++; }
	}
}

function animate(){
	stats.begin();
	var dt = clk.getDelta();

	//cheat_infinite_ammo ACTIVATED
	if(cheat_infinite_ammo) {
		createNewBullet()
	}

	//CalculateNextPositions
	//Update ship
	nave.updatePosition(dt);

	//update all enemies
	for (var i = 0; i < inimigos.length; i++) {
		inimigos[i].updatePosition(dt);
	}

	//update all bullets
	for (var i = 0; i < bullets.length; i++) {
		bullets[i].updatePosition(dt);
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

	stats.end();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}
function createNewBullet(){
	var bullet = new Bullet(scene,nave.getPositionX(),nave.getPositionY(),nave.getPositionZ());
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
		case 115: //s
		case 83: //S
			nave.inverseBoundingBox();
			for (var i = 0; i < inimigos.length; i++) {
				inimigos[i].inverseBoundingBox();
			}
			for (var i = 0; i < bullets.length; i++) {
				bullets[i].inverseBoundingBox();
			}
			break;
		case 98: //b
		case 66: //B
			createNewBullet();
			break;
		case 79: // O
		case 111: // o
			cheat_infinite_ammo = ! cheat_infinite_ammo;
			break
		case 99: // c
		case 67: // C
			var num_cameras = cameras.length;
			camera_index = (camera_index+1)%num_cameras;
			camera = cameras[camera_index];
			calculateCameraBondaries(camera)
			break;
    	case 49: // 1
        	camera=cameras[0];
			camera_index = 0;
			calculateCameraBondaries(camera);
        	break;
    	case 50: // 2
        	camera=cameras[1];
			camera_index = 1;
			calculateCameraBondaries(camera);
        	break;
    	case 51: // 3
        	camera=cameras[2];
			camera_index = 2;
			calculateCameraBondaries(camera);
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

		}
}

function onResize(){
	'use strict';
        renderer.setSize(window.innerWidth, window.innerHeight);
        calculateCameraBondaries(camera);
}

function calculateCameraBondaries(camera) {
	if(camera_index != 0 ) {
		renderer.setSize(window.innerWidth, window.innerHeight);
		if (window.innerHeight > 0 && window.innerWidth > 0) {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		}
	} else {
		var windowHeight = window.innerHeight;
		var windowWidth = window.innerWidth;
		var aspect = windowWidth / windowHeight;
		var innerGameAspect = (X_MAX-X_MIN)/(Z_MAX-Z_MIN);
		var lowX = X_MIN;
		var upX  = X_MAX;
		var lowZ = Z_MIN;
		var upZ  = Z_MAX;
		if (aspect > innerGameAspect) {
			var newWidth = aspect*(X_MAX-X_MIN);
			lowX = -newWidth/2;
			upX  =  newWidth/2;
		} else {
			var newHeight = (Z_MAX-Z_MIN)/aspect;
			lowZ = -newHeight/2;
			upZ  = newHeight/2;
		}
		camera.left   = lowX;
		camera.right  = upX;
		camera.bottom = lowZ;
		camera.top    = upZ;
		camera.updateProjectionMatrix();
	}
}
