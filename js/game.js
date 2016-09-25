'use strict'
var scene, camera, renderer;

var nave3;

var shipSpeed=0;
var shipAcceleration=0;

function init(){
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(20,100,100);
	renderer = new THREE.WebGLRenderer();
  	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement ) ;

	createScene();
	camera.lookAt(new THREE.Vector3(20,0,0));

	window.addEventListener("keydown", checkKey);
	window.addEventListener("keyup", onKeyUp);
	
	animate();
}

function createScene(){
	'use strict';
	scene  = new THREE.Scene();

	nave3 = new Ship(scene,20,0,80);

	var j = 0;
	while(j < 2){
		var i = 0;
		while(i < 8){
			var enemy1 = new Enemy(scene,i*5,0,j*5);
			i++;
		}
		j++;
	}
	scene.add(new THREE.AxisHelper(1));

}

function animate(){

	shipSpeed+=shipAcceleration;
	

	nave3.setPosition(nave3.x+shipSpeed, nave3.y, nave3.z);

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
	

}

function checkKey (event) {
	
	switch (event.keyCode) {

		case 37: 
			//alert ("left key");
			shipAcceleration=-0.01;
			break;
		case 38:
			//alert("up key");
			break;
		case 39: 
			//alert ("right key");
			shipAcceleration=0.01;
			break;
		case 40: 
			//alert ("down key");
			break;
	}	

}

function onKeyUp (event) {
	shipAcceleration=0;
	shipSpeed=0;
}
