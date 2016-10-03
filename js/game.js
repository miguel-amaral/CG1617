'use strict'
var scene, camera, renderer;

var nave;
var inimigos = [];
var cameras = [];
var camera_index = 0;
var clk;
var stats;

const X_MAX = 80;
const X_MIN = -80;


function init(){
	clk = new THREE.Clock();
	//camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	//var relAspect = window.innerWidth / window.innerHeight;
	//camera = new THREE.OrthographicCamera( -window.innerWidth/6, window.innerWidth/6, window.innerHeight/6, -window.innerHeight/6, 1, 1000 );
	camera = new THREE.OrthographicCamera( -100, 100, 50, -150, 1, 1000 );
	//camera.aspect = window.innerWidth / window.innerHeight;
	camera.position.set(0,150,0);
	camera.lookAt(new THREE.Vector3(0,0,0));
	cameras.push(camera);

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(0,100,150);
	camera.lookAt(new THREE.Vector3(0,0,0));
	cameras.push(camera);

	camera = cameras[camera_index];

	renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement ) ;

	createScene();

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

	nave = new Ship(scene,20,0,100,X_MIN,X_MAX);

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
		var back_geometry = new THREE.CubeGeometry(160,1,80);
		var back_mesh	  = new THREE.Mesh(back_geometry,back_material);
		background.add(back_mesh);
		background.position.x = 0;
		background.position.y = -1;
		background.position.z = 40;
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
		var num_cameras = 2;
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

	renderer.setSize( window.innerWidth, window.innerHeight );
	if (window.innerWidth > 0 & window.innerHeight > 0 ){
		camera.aspect = renderer.getSize().width / renderer.getSize().height;
		camera.updateProjectionMatrix();
	}
}
