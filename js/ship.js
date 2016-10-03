'use strict'
const TOP_SPEED   = 150;
const DEBUG       = 1;
const MIN_SPEED   = 1.3;
const ACELARATION = 22500;
class Ship {
	constructor(scene,x,y,z,x_min,x_max){
		this.ship = new THREE.Object3D();

		this.speed = 0;
		this.left = 0;
		this.right = 0;

		this.setPosition(x,y,z);
		this.updatePosition(0);

    this.addGeometryShip(this.ship);

		scene.add(this.ship);

		this.x_max = x_max;
		this.x_min = x_min;
	}

	addGeometryShip(obj) {
		this.material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe:false});
	  this.geometry = new THREE.CubeGeometry(14, 10, 5);
	  this.positionElementsShip(obj, this.geometry, this.material, 0, 0, 0);

	  this.geometry = new THREE.CubeGeometry(8, 1, 5);
	  this.positionElementsShip(obj, this.geometry, this.material, 0, 0, -2);

	  this.geometry = new THREE.CubeGeometry(4, 1, 4);
    this.positionElementsShip(obj, this.geometry, this.material, 0, 0, -4);

		this.geometry = new THREE.CubeGeometry(2, 1, 2);
	  this.positionElementsShip(obj, this.geometry, this.material, 0, 0, -6);
	}

	positionElementsShip(obj, geometry, material, x, y, z) {
			this.mesh	  = new THREE.Mesh(this.geometry,this.material);
			this.mesh.position.set(x,y,z);
			obj.add(this.mesh);
	}

	inverseWireframe(){
		this.material.wireframe = !this.material.wireframe;
	}

	stopLeft(){
		this.left = 0;
	}
	stopRight(){
		this.right = 0;
	}
	startRight(){
		this.right = 1;
	}

	startLeft(){
		this.left = 1;
	}

	setPosition(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z;
		if (this.x > this.x_max){
			//this.x = this.x_max;
			//this.speed = 0;

		} else if (this.x < this.x_min) {
			//this.x = this.x_min;
			//this.speed = 0;
		}
	}

	timePassed(dt){
		var positive = this.speed>0 ? 1:-1
		var atrito = -1 * positive*Math.pow(this.speed,2)*0.3;

		var acelaration = -1 * this.left * ACELARATION + this.right * ACELARATION + atrito;
		this.speed += acelaration*dt;

		console.log("ACELARATION: " + ACELARATION);
		console.log("positive: " + positive);
		console.log("speed: " + this.speed);
		console.log("left: " + this.left);
		console.log("right: " + this.right);
		console.log("atrito: " + atrito);
		console.log("acelar: " + acelaration);
		//Stop if too slow
		if(Math.abs(this.speed) < MIN_SPEED)
			this.speed = 0;

		//Stop accelarating if max speed achieved
		this.speed = (Math.abs(this.speed) > TOP_SPEED) ? TOP_SPEED * positive : this.speed;

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
