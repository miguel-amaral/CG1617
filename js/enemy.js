class Enemy {
	constructor(scene,x,y,z){
		this.enemy = new THREE.Object3D();
		this.velocity = 0;

		this.setPosition(x,y,z);
		this.updatePosition();

		this.addGeometryEnemy(this.enemy);

		this.enemy.add(this.mesh);
		scene.add(this.enemy);
	}

  addGeometryEnemy(obj) {
		this.material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe:false});
		this.geometry = new THREE.CubeGeometry(10, 10, 2);
		this.positionElementsEnemy(obj, this.geometry, this.material, 5, 0, 1);
		this.geometry = new THREE.CubeGeometry(2, 10, 4);
		this.positionElementsEnemy(obj, this.geometry, this.material, 1, 0, 2);
		this.geometry = new THREE.CubeGeometry(2, 10, 4);
		this.positionElementsEnemy(obj, this.geometry, this.material, 5, 0, 2);
		this.geometry = new THREE.CubeGeometry(2, 10, 4);
		this.positionElementsEnemy(obj, this.geometry, this.material, 9, 0, 2);
		this.geometry = new THREE.CubeGeometry(10, 10, 2);
		this.positionElementsEnemy(obj, this.geometry, this.material, 5, 0, 5);

		this.geometry = new THREE.CubeGeometry(2, 10, 2);
		this.positionElementsEnemy(obj, this.geometry, this.material, 10, 0, 6);
		this.geometry = new THREE.CubeGeometry(2, 10, 2);
		this.positionElementsEnemy(obj, this.geometry, this.material, 0, 0, 6);


		this.material.side = THREE.DoubleSide;
		this.geometry = new THREE.SphereGeometry(1.5, 0, 0, Math.PI/2, Math.PI*2, 0, Math.PI);
		this.positionElementsEnemy(obj, this.geometry, this.material, 5, 1, -3)
	}

	inverseWireframe(){
		this.material.wireframe = !this.material.wireframe;
	}

	positionElementsEnemy(obj, geometry, material, x, y, z) {
		this.mesh	  = new THREE.Mesh(this.geometry,this.material);
		this.mesh.position.set(x,y,z);
		obj.add(this.mesh);
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
