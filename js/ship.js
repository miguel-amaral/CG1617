const TOP_SPEED   = 150;
const DEBUG       = 1;
const MIN_SPEED   = 1.3;
const ACELARATION = 400;
class Ship {
	constructor(scene,x,y,z,x_min,x_max){
		this.ship = new THREE.Object3D();

		this.speed = 0;

		this.setPosition(x,y,z);
		this.updatePosition(0);

    this.addGeometryShip(this.ship);

		scene.add(this.ship);

		this.left = 0;
		this.right = 0;
		this.x_max = x_max;
		this.x_min = x_min;
	}

	addGeometryShip(obj) {
		this.material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe:false});
	  this.geometry = new THREE.CubeGeometry(14, 1, 5);
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

	stopLeft(){
		this.left = 0;
	}
	stopRight(){
		this.right = 0;
	}
	startRight(clockValue){
		this.right = clockValue;
	}

	startLeft(clockValue){
		this.left = clockValue;
	}

	setPosition(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z;
		if (this.x > this.x_max){
			this.x = this.x_max;
		} else if (this.x < this.x_min) {
			this.x = this.x_min;
		}
	}

	timePassed(dt){
		var positive = this.speed>0 ? 1:-1

		//No key pressed: slow down
		if((this.left + this.right) == 0){

											//Stop if too slow o:r slow speed
			this.speed = (Math.abs(this.speed) < MIN_SPEED) ? 0 : this.speed*0.95;

		//Key pressed	: full throtle
		} else {
			var acelaration = ((this.left>this.right) ? -1:1)*ACELARATION
			this.speed += acelaration*dt;

			//Stop accelarating if max speed achieved
			this.speed = (Math.abs(this.speed) > TOP_SPEED) ? TOP_SPEED * positive : this.speed;
		}

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
