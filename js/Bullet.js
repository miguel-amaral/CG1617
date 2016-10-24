'use strict'
class Bullet extends Movable{
	constructor(scene,x,y,z){
		super(scene,x,y,z);

//		this.updatePosition(0);
		this.material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe:false});
		this.geometry = new THREE.CubeGeometry(2, 2, 5);
		this.positionElement(this.geometry, this.material, 0, 0, 0);
	}

	getPowRadius() {
		return 7.25;
	}
}
