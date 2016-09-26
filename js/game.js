'use strict'
var scene, camera, renderer;

var nave3;

var shipSpeed=0;
var shipAcceleration=0;
var clk;

function init(){
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(20,100,100);
	createScene();
	renderer = new THREE.WebGLRenderer();
  	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement ) ;

	clk = new THREE.Clock();
	camera.lookAt(new THREE.Vector3(20,0,0));

	window.addEventListener("keydown", onKeyDown);
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
		while(i < 4){
			var enemy1 = new Enemy(scene,i*5,0,j*5);
			i++;
		}
		j++;
	}
	scene.add(new THREE.AxisHelper(10));

}

function animate(){
    var dt = clk.getDelta();
	nave3.updatePosition(dt);

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

function onKeyDown (event) {

	switch (event.keyCode) {

		case 37://alert ("left key");
			nave3.startLeft(clk.getElapsedTime());
			break;
		case 38://alert("up key");
			break;
		case 39://alert ("right key");
			nave3.startRight(clk.getElapsedTime());
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
			nave3.stopLeft();
			break;
		case 38://alert("up key");
			break;
		case 39://alert ("right key");
			nave3.stopRight();
			break;
		case 40://alert ("down key");
			break;

		}
}
