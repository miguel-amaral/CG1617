'use strict'
class Bullet extends Movable{
	constructor(scene,x,y,z){
		super(x,y,z);
		//this.bullet = new THREE.Object3D();

//		this.updatePosition(0);
		this.material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:false});
		this.geometry = new THREE.CubeGeometry(2, 2, 5);
		this.positionElement(this.geometry, this.material, 0, 0, 0);

		scene.add(this);
	}

}
