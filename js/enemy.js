class Enemy {
	constructor(scene,x,y,z){
		this.enemy = new THREE.Object3D();
		this.velocity = 0;

		this.setPosition(x,y,z);
		this.updatePosition();

		this.material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe:false});
		this.geometry = new THREE.CubeGeometry(2,2,2);
		this.mesh	  = new THREE.Mesh(this.geometry,this.material);

		this.enemy.add(this.mesh);
		scene.add(this.enemy);
	}

	setPosition(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z;
	}

	updatePosition(){
		this.enemy.position.x = this.x;
		this.enemy.position.y = this.y;
		this.enemy.position.z = this.z;
	}
}
