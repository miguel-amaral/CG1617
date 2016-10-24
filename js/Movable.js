const DEBUG       = 1;


class Movable extends THREE.Object3D{
	constructor(x,y,z){
		super();
		this.setPosition(x,y,z);
		this.acceleration = new THREE.Vector3(0,0,0);
		this.speed = new THREE.Vector3(0,0,0);
		this.body = new THREE.Object3D();
		this.updatePosition(0);
		if(DEBUG){
			this.showBoundingCircle(this.body);
		}
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
	positionElement(geometry, material, x, y, z) {
		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.position.set(x,y,z);
		this.add(this.mesh);
	}
	addChild(child, x, y, z) {
		child.position.set(x,y,z);
		this.add(child);
	}
	updatePosition(dt){
		this.calculateAcelaration();
		this.speed.addScaledVector(this.acceleration, dt);
		if (this.speed.length() < this.getMinSpeed()) { this.setSpeed(0,0,0); }
		if(this.position.x > X_MAX) {
			this.position.x = X_MAX;
			this.setSpeed(0,0,0);
		}
		else if(this.position.x < X_MIN) {
			this.position.x = X_MIN;
			this.setSpeed(0,0,0);
		}
		else
		this.position.addScaledVector(this.getSpeed(), dt);
	}
	//Needs to be overrided if another movement type desired
	calculateAcelaration(){
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
		var myOrigin    = this.getObjectCenter();
		var otherOrigin = movable.getObjectCenter();

		myOrigin.sub(otherOrigin);

		var x = myOrigin.getComponent(0);
		var y = myOrigin.getComponent(1);
		var z = myOrigin.getComponent(2);
		var distance = Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2);
//		console.log(distance);
		var sumRadius = this.getPowRadius() + movable.getPowRadius();
		return distance < sumRadius;
	}
}
