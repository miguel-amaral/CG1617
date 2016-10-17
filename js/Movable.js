class Movable {
  constructor(x,y,z){
	this.position = new Vector3(x,y,z);
    this.speed = new THREE.Vector3(0,0,0);
  }

  inverseWireframe(){
      this.material.wireframe = !this.material.wireframe;
  }

  setPosition(x,y,z){
	  this.position.set(x,y,z);
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
	this.speed.set(newSpeedX,newSpeedY,newSpeedZ)
  }

  positionElementsObj(obj, geometry, material, x, y, z) {
      this.mesh	  = new THREE.Mesh(geometry,material);
	  this.mesh.position.set(x,y,z);
      obj.add(this.mesh);
	}

  timePassed(dt){

      var acelarationx = this.calculateAcelaration();

      this.speed.addVectors(this.speed , acelaration.multiplyScalar(dt));

      this.speed = (this.speed.length < this.getMinSpeed()) ? this.setSpeed(0,0,0) : this.speed;

      if(DEBUG){	console.log("speed: " + this.speed); }

	  this.position.add(this.getSpeed().multiplyScalar(dt));
  }

  //Needs to be overrided if another movement type desired
  calculateAcelaration(){
    return new Vector3(0,0,0);
  }

  //Needs to be overrided if another movement type desired
  getMinSpeed(){
    return 0;
  }
}
