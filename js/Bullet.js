'use strict'
class Bullet extends Movable{
	constructor(scene , position, complex,index){
		super(scene, position.x, position.y, position.z);

		var cor = 0xffffff;
		this.material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe:false});

		var phong   = new THREE.MeshPhongMaterial  ( { color: cor } );
		var lambert = new THREE.MeshLambertMaterial( { color: cor } );
		this.simpleMaterial = this.material;
		this.complexMaterials = [phong, lambert];

		if(complex == true) {
			this.material = this.complexMaterials[index];
		} else {
 			this.material = this.simpleMaterial;
  		}
		this.geometry = new THREE.SphereGeometry(2, 0, 0, Math.PI/2, Math.PI*2, 0, Math.PI);
		this.positionElement(this.geometry, this.material, 0, 0, 0);
	}

	getPowRadius() {
		return 4;
	}
}
