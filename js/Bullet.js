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
		this.material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe:false});
		this.geometry = new THREE.CubeGeometry(2, 2, 5);
		this.positionElementsObj(obj, this.geometry, this.material, 0, 0, 0);
	}

	showBoundingCircle(obj){
		var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:true});
		var height = 10; var nr_triangles = 8;

		var radius = Math.sqrt(this.getPowRadius());
		var geometry = new THREE.CylinderGeometry(radius, radius, height, nr_triangles);
		var x = this.getObjectCenter().getComponent(0);
		var y = this.getObjectCenter().getComponent(1);
		var z = this.getObjectCenter().getComponent(2);
		this.positionElementsObj(obj, geometry, material, x,y,z);
	}
	
	getPowRadius() {
		return 7.25;
	}
}
