var scene, camera, renderer;

function init(){
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(20,100,100);
	renderer = new THREE.WebGLRenderer();
  	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement ) ;

	createScene();
	camera.lookAt(new THREE.Vector3(20,0,0));

	//window.addEventListener('keydown', onKeyDown(event));

	render();
}

function createScene(){
	'use strict';
	scene  = new THREE.Scene();

	var nave3 = new Ship(scene,20,0,80);

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

function render(){
	'use strict';
	renderer.render(scene, camera);
}

function animate(){
	'use strict';
	render();
	requestAnimationFrame(animate);

}
