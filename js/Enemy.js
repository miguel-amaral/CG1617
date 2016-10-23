'use strict'
class Enemy extends Movable{
	constructor(scene,x,y,z){
		super(x,y,z);
		//this.enemy = new THREE.Object3D();

		this.updatePosition();
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

	updatePosition(){
		this.body.position.set(this.position.x,this.position.y,this.position.z);
	}
}
