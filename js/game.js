var scene, camera, renderer;

function init(){
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(20,20,20);
	renderer = new THREE.WebGLRenderer();
  	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement ) ;

	createScene();
	camera.lookAt(scene.position);
	render();
}

function createScene(){
	'use strict';
	scene  = new THREE.Scene();

	var nave = new ship(scene,5,0,0);

	scene.add(new THREE.AxisHelper(10));

}

function render(){
	'use strict';
	renderer.render(scene, camera);
}

function animate(){
	'use strict';
	render();
	requestAnimationFrame(animate);

}
