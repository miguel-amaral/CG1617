'use strict'
const ALIEN_SPEED = 10;
class Enemy extends Movable{
	constructor(scene,x,y,z){
		super(x,y,z);
		//this.enemy = new THREE.Object3D();

		var velocity = new THREE.Vector3 (Math.random(), 0, Math.random()).normalize(); // Random direction
		velocity.multiplyScalar(ALIEN_SPEED); // Initial speed
		this.setSpeed(velocity.x, velocity.y, velocity.z);
		this.updatePosition(0);
		this.addGeometryEnemy(this.body);

		this.body.add(this.mesh);
		scene.add(this.body);
	}

  addGeometryEnemy(obj) {
		this.material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe:false});
		this.geometry = new THREE.CubeGeometry(10, 10, 2);
		this.positionElementsObj(obj, this.geometry, this.material, 5, 0, 1);
		this.geometry = new THREE.CubeGeometry(2, 10, 4);
		this.positionElementsObj(obj, this.geometry, this.material, 1, 0, 2);
		this.geometry = new THREE.CubeGeometry(2, 10, 4);
		this.positionElementsObj(obj, this.geometry, this.material, 5, 0, 2);
		this.geometry = new THREE.CubeGeometry(2, 10, 4);
		this.positionElementsObj(obj, this.geometry, this.material, 9, 0, 2);
		this.geometry = new THREE.CubeGeometry(10, 10, 2);
		this.positionElementsObj(obj, this.geometry, this.material, 5, 0, 5);

		this.geometry = new THREE.CubeGeometry(2, 10, 2);
		this.positionElementsObj(obj, this.geometry, this.material, 10, 0, 6);
		this.geometry = new THREE.CubeGeometry(2, 10, 2);
		this.positionElementsObj(obj, this.geometry, this.material, 0, 0, 6);


		this.material.side = THREE.DoubleSide;
		this.geometry = new THREE.SphereGeometry(1.5, 0, 0, Math.PI/2, Math.PI*2, 0, Math.PI);
		this.positionElementsObj(obj, this.geometry, this.material, 5, 1, -3)
	}

	calculateAcelaration(){
		return new THREE.Vector3(0,0,0);
	}

	updatePosition(dt){
		this.timePassed(dt);
		this.body.position.copy(this.position);
	}
}
