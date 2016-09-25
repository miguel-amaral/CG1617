class Ship {
	constructor(scene,x,y,z){
		this.ship = new THREE.Object3D();
		this.velocity = 0;

		this.setPosition(x,y,z);

		this.material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe:false});
		this.geometry = new THREE.CubeGeometry(2,2,2);
		this.mesh	  = new THREE.Mesh(this.geometry,this.material);

		this.ship.add(this.mesh);
		scene.add(this.ship);
	}

	setPosition(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z;
		this.updatePosition();
	}

	updatePosition(){
		this.ship.position.x = this.x;
		this.ship.position.y = this.y;
		this.ship.position.z = this.z;
	}
}
