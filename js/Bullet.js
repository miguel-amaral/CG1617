'use strict'
class Bullet extends Movable{
	constructor(scene,x,y,z,complex,index){
		super(scene,x,y,z);

		var cor = 0xffff00;
		cor = 0xffffff;
		this.material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe:false});
		this.geometry = new THREE.CubeGeometry(2, 2, 5);

		var phong   = new THREE.MeshPhongMaterial  ( { color: cor } );
		var lambert = new THREE.MeshLambertMaterial( { color: cor } );
		this.simpleMaterial = this.material;
		this.complexMaterials = [phong, lambert];

		if(complex == true) {
			this.material = this.complexMaterials[index];
		}
		this.positionElement(this.geometry, this.material, 0, 0, 0);

	}

	getPowRadius() {
		return 7.25;
	}
}
