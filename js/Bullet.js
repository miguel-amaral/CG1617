'use strict'
class Bullet extends Movable{
	constructor(scene,x,y,z){
		super(x,y,z);
		this.bullet = new THREE.Object3D();

		this.updatePosition();
		this.addGeometryBullet(this.bullet);

		this.bullet.add(this.mesh);
		scene.add(this.bullet);
	}

	addGeometryBullet(){
		this.material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe:false});
		this.geometry = new THREE.CubeGeometry(10, 10, 2);
		this.positionElementsObj(obj, this.geometry, this.material, 5, 0, 1);
	}
}
