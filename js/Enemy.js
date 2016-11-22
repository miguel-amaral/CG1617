'use strict'
const ALIEN_SPEED = 10;
class Enemy extends Movable{
	constructor(scene,x,y,z,complex,index){

		super(scene,x,y,z);

		var corRed = 0xff0000;
		var cor = 0xffffff;
		var velocity = new THREE.Vector3 ((Math.random()*2)-1, 0, (Math.random()*2)-1).normalize(); // Random direction
		velocity.multiplyScalar(ALIEN_SPEED); // Initial speed
		this.setSpeed(velocity.x, velocity.y, velocity.z);

		// ------------------------------ ALIEN MATERIALS --------------------------------------- //
		this.material = new THREE.MeshBasicMaterial( { color: corRed } );
		//this.material.side = THREE.DoubleSide;

		var phong   = new THREE.MeshPhongMaterial  ( {  color: cor ,             // Diffuse color of the material
														specular: cor,			// how shiny the material is and the color of its shine
														shininess: 256,			// How shiny the specular highlight is
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
		this.geometry = new THREE.SphereGeometry(4.5, 0, 0, Math.PI/2, Math.PI*2, 0, Math.PI);
		//this.geometry = new THREE.CubeGeometry(10, 10, 2);
		 this.positionElement(this.geometry, this.material, 5, 5, 1);
		// this.geometry = new THREE.CubeGeometry(2, 10, 4);
		// this.positionElement(this.geometry, this.material, 1, 0, 2);
		// this.geometry = new THREE.CubeGeometry(2, 10, 4);
		// this.positionElement(this.geometry, this.material, 5, 0, 2);
		// this.geometry = new THREE.CubeGeometry(2, 10, 4);
		// this.positionElement(this.geometry, this.material, 9, 0, 2);
		//this.geometry = new THREE.CubeGeometry(10, 10, 2);
		//this.positionElement(this.geometry, this.material, 5, 0, 5);
		//Legs
		var vec_cylinder = [];
		for (var i = 0; i < 4; i++) {
			var cylinder = new THREE.CylinderGeometry( 1, 1, 3, 5, 2, false);
			cylinder.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 ) ) );
			vec_cylinder.push(cylinder);
		}
		this.geometry = vec_cylinder[0];
		this.positionElement(this.geometry, this.material, 3, 6, 4.5);
		this.geometry = vec_cylinder[1];
		this.positionElement(this.geometry, this.material, 3, 3, 4.5);
		this.geometry = vec_cylinder[2];
		this.positionElement(this.geometry, this.material, 7, 6, 4.5);
		this.geometry = vec_cylinder[3];
		this.positionElement(this.geometry, this.material, 7, 3, 4.5);
		//Hat
		var hat =  new THREE.CylinderGeometry( 2, 0.5, 2, 3, 1, false);
		hat.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 ) ) );
		this.geometry = hat;
 		this.positionElement(this.geometry, this.material, 5, 5, -5)
		//eyes
 		this.geometry = new THREE.SphereGeometry(1, 0, 0, Math.PI/2, Math.PI*2, 0, Math.PI);
		this.positionElement(this.geometry, this.material, 3.5, 9, 0);
 		this.geometry = new THREE.SphereGeometry(1, 0, 0, Math.PI/2, Math.PI*2, 0, Math.PI);
		this.positionElement(this.geometry, this.material, 6, 9, 0);
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

	collidedShip() {
		scene.remove(this);
	}

	gotShot(bullet) {
		scene.remove(this);
		bullet.hitEnemy();
	}

	getObjectCenter() {
		return new THREE.Vector3(5,0,0);
	}

	getPowRadius() {
		return 37;
	}
}
