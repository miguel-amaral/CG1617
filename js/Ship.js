'use strict'
const TOP_SPEED   = 150;
const DEBUG       = 1;
const MIN_SPEED   = 0.8;
const ACELARATION = 200;
class Ship extends Movable {
	constructor(scene,x,y,z){
		super(x,y,z);
		this.ship = new THREE.Object3D();

		this.left = 0;
		this.right = 0;

		this.updatePosition(0);

    this.addGeometryShip(this.ship);

		scene.add(this.ship);
  }

	addGeometryShip(obj) {
    this.material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe:false});
	  this.geometry = new THREE.CubeGeometry(14, 10, 5);
	  this.positionElementsObj(obj, this.geometry, this.material, 0, 0, 0);

	  this.geometry = new THREE.CubeGeometry(8, 1, 5);
	  this.positionElementsObj(obj, this.geometry, this.material, 0, 0, -2);

	  this.geometry = new THREE.CubeGeometry(4, 1, 4);
    this.positionElementsObj(obj, this.geometry, this.material, 0, 0, -4);

    this.geometry = new THREE.CubeGeometry(2, 1, 2);
	  this.positionElementsObj(obj, this.geometry, this.material, 0, 0, -6);
	}



	stopLeft(){
		this.left = 0;
	}
	stopRight(){
		this.right = 0;
	}
	startRight(){
		this.right = true;
	}

	startLeft(){
		this.left = true;
	}

	calculateAcelaration(){
		var acelaration;
		if(this.left > 0) {
			if(Math.abs(this.speed) < TOP_SPEED){
				return ACELARATION * -1;
			}
		}else if (this.right > 0) {
			if(Math.abs(this.speed) < TOP_SPEED){
				return ACELARATION;
			}
		}
		if (this.speed < 0){
			return ACELARATION;
		}
		if (this.speed > 0){
			return -1 * ACELARATION;
		}
		return 0;
	}

	timePassed(dt){

			var acelaration = this.calculateAcelaration();

			this.speed = this.speed + acelaration*dt;
			this.speed = (Math.abs(this.speed) < MIN_SPEED) ? 0 : this.speed;

			if(DEBUG){	console.log("speed: " + this.speed); }
			var new_x = this.x+this.speed*dt;
			this.setPosition(new_x, this.y, this.z);
		}

	updatePosition(dt){
		this.timePassed(dt);

		this.ship.position.x = this.x;
		this.ship.position.y = this.y;
		this.ship.position.z = this.z;
	}
}