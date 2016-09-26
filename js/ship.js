const TOP_SPEED   = 50;
const DEBUG       = 0;
const MIN_SPEED   = 1.3;
const ACELARATION = Math.pow(TOP_SPEED,2);
class Ship {
	constructor(scene,x,y,z){
		this.ship = new THREE.Object3D();

		this.speed = 0;

		this.setPosition(x,y,z);
		this.updatePosition(0);

		this.material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe:false});
		this.geometry = new THREE.CubeGeometry(2,2,2);
		this.mesh	  = new THREE.Mesh(this.geometry,this.material);

		this.ship.add(this.mesh);
		scene.add(this.ship);

		this.left =0;
		this.right=0;

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
		this.setPosition(this.x+this.speed*dt, this.y, this.z);
	}

	updatePosition(dt){
		this.timePassed(dt);

		this.ship.position.x = this.x;
		this.ship.position.y = this.y;
		this.ship.position.z = this.z;
	}
}
