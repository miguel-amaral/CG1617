'use strict'
var scene, camera, renderer;

var nave;
var inimigos = [];
var cameras = [];
var camera_index = 0;
var clk;
var stats;

//Game Boundaries
const X_MAX = 100;
const X_MIN = -100;
const Z_MAX = 100;
const Z_MIN = -100;


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

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.up.set(0, 1, 0);
	camera.lookAt(new THREE.Vector3(0,0,0));
	nave.addChild(camera, 0, 35, 80);
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
		var pos_x = X_MIN;
		while(i < 8){

			var enemy1 = new Enemy(scene,pos_x,0,j*20);
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

function animate(){
	stats.begin();
  var dt = clk.getDelta();
	//Update ship
	nave.updatePosition(dt);

	//update all enemies
	for (var i = 0; i < inimigos.length; i++) {
    	inimigos[i].updatePosition(dt);
	}

	stats.end();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
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
			break;
	case 99: // c
	case 67: // C
		var num_cameras = cameras.length;
		camera_index = (camera_index+1)%num_cameras
		camera = cameras[camera_index];
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
    }
    else {
      var newHeight = (Z_MAX-Z_MIN)/aspect;
      lowZ = -newHeight/2;
      upZ  = newHeight/2;
    }
    camera.left   = lowX;
    camera.right  = upX;
    camera.bottom = lowZ;
    camera.top    = upZ;
    camera.updateProjectionMatrix();
    console.log("resizing");
}
