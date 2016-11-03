'use strict'
const TOP_SPEED_c  = 150;
const MIN_SPEED_c   = 0.8;
const ACCELERATION = 200;
class Ship extends Movable {
	constructor(scene,x,y,z){
		super(scene,x,y,z);

		this.left = false;
		this.right = false;
		this.MIN_SPEED = MIN_SPEED_c;
		this.TOP_SPEED = TOP_SPEED_c;
		this.single = true;

		//var cor = 0x0000ff;
		var cor = 0x0000ff;
		cor = 0xffffff;
		// ------------------------------ SHIP GEOMETRY --------------------------------------- //
		this.material = new THREE.MeshBasicMaterial({color: cor, wireframe:false});
		this.geometry = new THREE.CubeGeometry(14, 10, 5);
		this.positionElement(this.geometry, this.material, 0, 0, 0);
		this.geometry = new THREE.CubeGeometry(8, 8, 5);
		this.positionElement(this.geometry, this.material, 0, 0, -2);
		this.geometry = new THREE.CubeGeometry(4, 4, 4);
		this.positionElement(this.geometry, this.material, 0, 0, -4);
		this.geometry = new THREE.CubeGeometry(2, 2, 2);
		this.positionElement(this.geometry, this.material, 0, 0, -6);
		// -------------------------------------------------------------------------------------- //
		var phong   = new THREE.MeshPhongMaterial  ( { color: cor } );
		var lambert = new THREE.MeshLambertMaterial( { color: cor } );
		this.simpleMaterial = this.material;
		this.complexMaterials = [phong, lambert];
	}
	stopLeft(){
		this.left = false;
	}
	stopRight(){
		this.right = false;
	}
	startRight(){
		this.right = true;
	}
	startLeft(){
		this.left = true;
	}

	calculateAcceleration() {
		if(Math.abs(this.speed.length()) < this.getTopSpeed()){
			if(this.left) {
				this.setAcceleration (-1 * ACCELERATION, 0 , 0);
				return;
			} else if (this.right) {
				this.setAcceleration (ACCELERATION, 0 , 0);
				return;
			}
		}
		if (this.speed.x < 0 ) { this.setAcceleration (ACCELERATION, 0 , 0); }
		else if (this.speed.x > 0){ this.setAcceleration (-1 * ACCELERATION, 0 , 0); }
		else { this.setAcceleration (0, 0, 0); }
	}

	getMinSpeed(){
		return this.MIN_SPEED;
	}

	getTopSpeed(){
		return this.TOP_SPEED;
	}

	getObjectCenter() {
		return new THREE.Vector3(0,0,-2);
	}

	getPowRadius() {
		return 69.25;
	}
}
