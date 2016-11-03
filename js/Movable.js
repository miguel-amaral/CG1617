class Movable extends THREE.Object3D{
	constructor(scene,x,y,z){
		super();

		this.simpleMaterial = null;
		this.complexMaterials = [];
		this.complexIndex = 0;
		this.complex = false;
		this.meshes = [];
		this.single = false;

		this.setPosition(x,y,z);
		this.nextPosition = new THREE.Vector3(0,0,0);
		this.nextPosition.copy(this.position);
		this.acceleration = new THREE.Vector3(0,0,0);
		this.speed = new THREE.Vector3(0,0,0);

		this.radius = Math.sqrt(this.getPowRadius());
		this.updatePosition(0);
		scene.add(this);

		this.addBoundingCircle(this);

	}
	inverseWireframe(){
		this.material.wireframe = !this.material.wireframe;
	}
	setPosition(x,y,z){
		this.position.set(x,y,z);
	}
	setAcceleration(ax,ay,az) {
		this.acceleration.set(ax,ay,az);
	}

	getPositionX(){
		return this.position.getComponent(0);
	}
	getPositionY(){
		return this.position.getComponent(1);
	}
	getPositionZ(){
		return this.position.getComponent(2);
	}

	getSpeedX(){
		return this.speed.getComponent(0);
	}
	getSpeedY(){
		return this.speed.getComponent(1);
	}
	getSpeedZ(){
		return this.speed.getComponent(2);
	}
	//Deprecated
	getSpeed(){
		return this.speed;
	}

	setSpeed(newSpeedX, newSpeedY, newSpeedZ){
		this.speed.set(newSpeedX,newSpeedY,newSpeedZ);
	}

	stop(){
		this.setSpeed(0,0,0);
		this.setAcceleration(0,0,0);
	}
	positionElement(geometry, material, x, y, z) {
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x,y,z);
		this.add(mesh);
		this.meshes.push(mesh);

	}
	addChild(child, x, y, z) {
		child.position.set(x,y,z);
		this.add(child);
	}

	update(dt) {
		this.calculateAcceleration();
		this.updatePosition(dt);
	}

	updatePosition(dt) {
		this.nextPosition.copy(this.position);
		this.speed.addScaledVector(this.acceleration, dt);
		if (this.speed.length() < this.getMinSpeed()) {
			this.setSpeed(0,0,0);
		} else {
			this.nextPosition.addScaledVector(this.getSpeed(), dt);
		}
	}

	realUpdatePosition(){
		this.position.copy(this.nextPosition);
	}
	//Needs to be overrided if another movement type desired
	calculateAcceleration(){
		return new THREE.Vector3(0,0,0);
	}
	//Needs to be overrided if another movement type desired
	getMinSpeed(){
		return 0;
	}
	//showBoundingCircle(obj){}
	getObjectCenter() {
		return new THREE.Vector3(0,0,0);
	}
	hasColision(movable){
		var myOrigin    = new THREE.Vector3(0,0,0);
		myOrigin.copy(this.getObjectCenter());
		myOrigin.add(this.nextPosition);

		var otherOrigin = new THREE.Vector3(0,0,0);
		otherOrigin.copy(movable.getObjectCenter());
		otherOrigin.add(movable.nextPosition);

		myOrigin.sub(otherOrigin);

		var x = myOrigin.getComponent(0);
		//var y = myOrigin.getComponent(1);
		var z = myOrigin.getComponent(2);

		//		var distance = Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2));
		var distance = Math.sqrt(Math.pow(x,2) + Math.pow(z,2));

		var distance = myOrigin.length();
		var sumRadius = this.getRadius() + movable.getRadius();

		return distance < sumRadius;
	}

	// ---------------- Border Collision check ------------------- //
/*
	borderCollision () {
		if ( (this.nextPosition.x + this.radius > X_MAX) || (this.nextPosition.x - this.radius < X_MIN) ) {
			return 1;
		}
		if ( (this.nextPosition.z + this.radius > Z_MAX) || (this.nextPosition.z - this.radius < Z_MIN) ) {
			return 1;
		}
		return 0;
	}
*/
	// -------------------------------------------------------------

	hasLeftRightWallColision(x_left,x_right){

		var myOrigin    = this.getObjectCenter();
		myOrigin.add(this.nextPosition);
		var radius = this.getRadius();
		var pos_x = myOrigin.getComponent(0);

		return x_left >= (pos_x - radius) || x_right <= (pos_x + radius);
	}

	hasTopBotWallColision(x_bottom, x_top){
		var myOrigin    = this.getObjectCenter();
		myOrigin.add(this.nextPosition);
		var radius = this.getRadius();
		var pos_z = myOrigin.getComponent(2);

		return x_bottom >= (pos_z - radius) || x_top <= (pos_z + radius);
	}
	getRadius() {
		return this.radius;
	}
	addBoundingCircle(){
		this.bounding_box_material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:true, visible:false});
		var height = 10; var nr_triangles = 20;

		var geometry = new THREE.CylinderGeometry(this.radius, this.radius, height, nr_triangles);
		var x = this.getObjectCenter().getComponent(0);
		var y = this.getObjectCenter().getComponent(1);
		var z = this.getObjectCenter().getComponent(2);
		var mesh = new THREE.Mesh(geometry, this.bounding_box_material);
		mesh.position.set(x,y,z);
		this.add(mesh);
	}

	inverseBoundingBox() {
		this.bounding_box_material.visible = !this.bounding_box_material.visible;
	}

	// ---------------- Lighting Stuff --------------------------- //
	swapComplex(){
		this.complexIndex = (this.complexIndex+1)%2;
		if( this.complex == true ){
			if( this.single ) { console.log("Now is " + (this.complexIndex > 0 ? "lambert" : "phong")) ; }
			this.material = this.complexMaterials[this.complexIndex];
			this.updateMaterial();
		}
	}

	swapBasic(){
		if( this.complex == true ) {
			this.material = this.simpleMaterial;
		} else {
			this.material = this.complexMaterials[this.complexIndex];
		}
		this.complex = !this.complex;
		if( this.single ) { console.log("Now is " + this.complex ? (this.complexIndex > 0 ? "lambert" : "phong") : "simple" ) ; }
		this.updateMaterial();
	}

	updateMaterial(){
		for (var i = 0; i < this.meshes.length; i++) {
			this.meshes[i].material = this.material;
		}
	}
}

//funtion updateObjMaterial(obj, material)
