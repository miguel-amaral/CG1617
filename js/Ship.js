'use strict'
const TOP_SPEED_c  = 150;
const DEBUG       = 0;
const MIN_SPEED_c   = 0.8;
const ACELARATION = 200;
class Ship extends Movable {
	constructor(scene,x,y,z){
		super(x,y,z);
		//this.ship = new THREE.Object3D();

		this.left = false;
		this.right = false;
		this.MIN_SPEED = MIN_SPEED_c;
		this.TOP_SPEED = TOP_SPEED_c;
        
        this.material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe:false});
        this.geometry = new THREE.CubeGeometry(14, 10, 5);
        this.positionElement(this.geometry, this.material, 0, 0, 0);

        this.geometry = new THREE.CubeGeometry(8, 8, 5);
        this.positionElement(this.geometry, this.material, 0, 0, -2);

        this.geometry = new THREE.CubeGeometry(4, 4, 4);
        this.positionElement(this.geometry, this.material, 0, 0, -4);

        this.geometry = new THREE.CubeGeometry(2, 2, 2);
        this.positionElement(this.geometry, this.material, 0, 0, -6);

		scene.add(this);
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

	calculateAcelaration(){
		if(Math.abs(this.speed.length()) < this.getTopSpeed()){
			if(this.left) {
				return new THREE.Vector3 (-1 * ACELARATION, 0 , 0);
			} else if (this.right) {
				return new THREE.Vector3 (ACELARATION, 0 , 0);
			}
		}

		if (this.speed.x < 0){
			return new THREE.Vector3 (ACELARATION, 0 , 0);
		}
		if (this.speed.x > 0){
			return new THREE.Vector3 (-1 * ACELARATION, 0 , 0);
		}
		return new THREE.Vector3(0, 0, 0);
	}

	getMinSpeed(){
		return this.MIN_SPEED;
	}

	getTopSpeed(){
		return this.TOP_SPEED;
	}
}
