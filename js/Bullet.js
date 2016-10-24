'use strict'
class Bullet extends Movable{
	constructor(scene,x,y,z){
		super(x,y,z);
		//this.bullet = new THREE.Object3D();

//		this.updatePosition(0);
		this.addGeometryBullet(this.body);

		scene.add(this.body);
	}

	addGeometryBullet(obj){
		this.material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:false});
		this.geometry = new THREE.CubeGeometry(2, 2, 5);
		this.positionElementsObj(obj, this.geometry, this.material, 0, 0, 0);
	}
}
