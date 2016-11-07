'use strict'
const ALIEN_SPEED = 10;
class Enemy extends Movable{
	constructor(scene,x,y,z,complex,index){

		super(scene,x,y,z);

		var cor = 0xff0000;
		cor = 0xffffff;
		var velocity = new THREE.Vector3 ((Math.random()*2)-1, 0, (Math.random()*2)-1).normalize(); // Random direction
		velocity.multiplyScalar(ALIEN_SPEED); // Initial speed
		this.setSpeed(velocity.x, velocity.y, velocity.z);

		// ------------------------------ ALIEN MATERIALS --------------------------------------- //			
		this.material = new THREE.MeshBasicMaterial( { color: cor } );
		this.material.side = THREE.DoubleSide;

		var phong   = new THREE.MeshPhongMaterial  ( { color: cor ,             // Diffuse color of the material
											specular: cor,			// how shiny the material is and the color of its shine
											shininess: 200,			// How shiny the specular highlight is
											//emissive: 0x0000ff, 		//(light) color of the material, essentially a solid color unaffected by other lighting
											//emissiveIntensity: 0.1, 	//range [0,1]
											//shading: THREE.FlatShading
										 } );
		var lambert = new THREE.MeshLambertMaterial( { color: cor				// Diffuse color of the material
											//,emissive: 0x0000ff 		//(light) color of the material, essentially a solid color unaffected by other lighting
											//,emissiveIntensity: 0.1 	//range [0,1]
										 } );

		this.simpleMaterial = this.material;
		this.complexMaterials = [phong, lambert];
		if(complex == true) {
			this.material = this.complexMaterials[index];
		} else {
			this.material = this.simpleMaterial;
 		}

		// ------------------------------ ALIEN GEOMETRY --------------------------------------- //
		this.geometry = new THREE.CubeGeometry(10, 10, 2);
		this.positionElement(this.geometry, this.material, 5, 0, 1);
		this.geometry = new THREE.CubeGeometry(2, 10, 4);
		this.positionElement(this.geometry, this.material, 1, 0, 2);
		this.geometry = new THREE.CubeGeometry(2, 10, 4);
		this.positionElement(this.geometry, this.material, 5, 0, 2);
		this.geometry = new THREE.CubeGeometry(2, 10, 4);
		this.positionElement(this.geometry, this.material, 9, 0, 2);
		this.geometry = new THREE.CubeGeometry(10, 10, 2);
		this.positionElement(this.geometry, this.material, 5, 0, 5);
			//Legs
		this.geometry = new THREE.CubeGeometry(2, 2, 2);
		this.positionElement(this.geometry, this.material, 0, 5, 6);
		this.geometry = new THREE.CubeGeometry(2, 2, 2);
		this.positionElement(this.geometry, this.material, 0, -5, 6);
		this.geometry = new THREE.CubeGeometry(2, 2, 2);
		this.positionElement(this.geometry, this.material, 10, 5, 6);
		this.geometry = new THREE.CubeGeometry(2, 2, 2);
		this.positionElement(this.geometry, this.material, 10, -5, 6);
			//Hat
		this.geometry = new THREE.SphereGeometry(1.5, 0, 0, Math.PI/2, Math.PI*2, 0, Math.PI);
 		this.positionElement(this.geometry, this.material, 5, 6, -3)
		// -------------------------------------------------------------------------------------- //
	}

	collidedAnotherEnemy(){
		this.setSpeed(-1*this.getSpeedX(),this.getSpeedY(),-1*this.getSpeedZ());
	}

	collidedLeftRightWall() {
		this.setSpeed(-1*this.getSpeedX(),this.getSpeedY(),this.getSpeedZ());
	}

	collidedTopBotWall() {
		this.setSpeed(this.getSpeedX(),this.getSpeedY(),-1*this.getSpeedZ());
	}

	getObjectCenter() {
		return new THREE.Vector3(5,0,3.2);
	}

	getPowRadius() {
		return 60.0625;
	}
}
