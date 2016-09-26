'use strict'
var scene, camera, renderer;

var nave;
var inimigos = {};
var clk;

const X_MAX = 80;
const X_MIN = -80;
	

function init(){
	clk = new THREE.Clock();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(0,100,100);
	camera.lookAt(new THREE.Vector3(0,0,0));
	renderer = new THREE.WebGLRenderer();
  	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement ) ;

	createScene();

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);

	animate();
}

function createScene(){
	'use strict';
	scene  = new THREE.Scene();

	nave = new Ship(scene,20,0,80,X_MIN,X_MAX);

	var j = 0;
	while(j < 2){
		var i = 0;
		while(i < 4){
			var enemy1 = new Enemy(scene,i*5,0,j*5);
			//inimigos.push(enemy1);
			i++;
		}
		j++;
	}
	scene.add(new THREE.AxisHelper(10));

}

function animate(){
    var dt = clk.getDelta();
	nave.updatePosition(dt);

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

function onKeyDown (event) {

	switch (event.keyCode) {

		case 37://alert ("left key");
			nave.startLeft(clk.getElapsedTime());
			break;
		case 38://alert("up key");
			break;
		case 39://alert ("right key");
			nave.startRight(clk.getElapsedTime());
			break;
		case 40://alert ("down key");
			break;
		case 97: //a
		case 65: //A
			//TODO
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
