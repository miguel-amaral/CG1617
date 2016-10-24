'use strict'
const ALIEN_SPEED = 10;
class Enemy extends Movable{
	constructor(scene,x,y,z){
		super(x,y,z);
		//this.enemy = new THREE.Object3D();

		var velocity = new THREE.Vector3 ((Math.random()*2)-1, 0, (Math.random()*2)-1).normalize(); // Random direction
		velocity.multiplyScalar(ALIEN_SPEED); // Initial speed
		this.setSpeed(velocity.x, velocity.y, velocity.z);

		this.addGeometryEnemy(this.body);
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

		//Legs
		this.geometry = new THREE.CubeGeometry(2, 10, 2);
		this.positionElementsObj(obj, this.geometry, this.material, 10, 0, 6);
		this.geometry = new THREE.CubeGeometry(2, 10, 2);
		this.positionElementsObj(obj, this.geometry, this.material, 0, 0, 6);

		//Hat
		this.material.side = THREE.DoubleSide;
		this.geometry = new THREE.SphereGeometry(1.5, 0, 0, Math.PI/2, Math.PI*2, 0, Math.PI);
		this.positionElementsObj(obj, this.geometry, this.material, 5, 1, -3)
	}

	collidedHorizontal() {
		this.setSpeed(-this.getSpeedX(),this.getSpeedY(),this.getSpeedZ());
	}

	collidedVertical() {
		this.setSpeed(this.getSpeedX(),-this.getSpeedY(),this.getSpeedZ());
	}

    setSpeed(newSpeedX, newSpeedY, newSpeedZ){
  	   this.speed.set(newSpeedX,newSpeedY,newSpeedZ);
    }

	showBoundingCircle(obj){
		var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:true});
		var height = 10; var nr_triangles = 50;

		var radius = Math.sqrt(this.getPowRadius());
		var geometry = new THREE.CylinderGeometry(radius, radius, height, nr_triangles);
		var x = this.getObjectCenter().getComponent(0);
		var y = this.getObjectCenter().getComponent(1);
		var z = this.getObjectCenter().getComponent(2);
		this.positionElementsObj(obj, geometry, material, x,y,z);
	}

	getObjectCenter() {
		return new THREE.Vector3(5,0,3);
	}

	getPowRadius() {
		return 55;
	}
}
