class Movable {
  constructor(x,y,z){
		this.position = new THREE.Vector3(x,y,z);
		this.speed = new THREE.Vector3(0,0,0);
		this.body = new THREE.Object3D();
  }

  inverseWireframe(){
    this.material.wireframe = !this.material.wireframe;
  }

  setPosition(x,y,z){
	  this.position.set(x,y,z);
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

  positionElementsObj(obj, geometry, material, x, y, z) {
     this.mesh = new THREE.Mesh(geometry, material);
	   this.mesh.position.set(x,y,z);
     obj.add(this.mesh);
	}

	addChild(child, x, y, z) {
		child.position.set(x,y,z);
		this.body.add(child);
	}

  timePassed(dt){

      var acelaration = this.calculateAcelaration();

      this.speed.addScaledVector(acelaration, dt);

      this.speed = (this.speed.length() < this.getMinSpeed()) ? new THREE.Vector3(0,0,0) : this.speed;

      if(DEBUG){console.log("speed: (" + this.speed.x + "," + this.speed.y + "," + this.speed.z + ")"); }
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
    return new Vector3(0,0,0);
  }

  //Needs to be overrided if another movement type desired
  getMinSpeed(){
    return 0;
  }

  updatePosition(dt){
	  this.timePassed(dt);
	  this.body.position.copy(this.position);
  }
}
