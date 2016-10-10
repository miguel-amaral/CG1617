class Movable {
  constructor(x,y,z){
    this.setPosition(x,y,z);
    this.speed = 0;
  }

  inverseWireframe(){
    this.material.wireframe = !this.material.wireframe;
  }

  setPosition(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getSpeed(){
    return this.velocity;
  }
  
  setSpeed(newSpeed){
    this.speed = newSpeed;
  }

  positionElementsObj(obj, geometry, material, x, y, z) {
      this.mesh	  = new THREE.Mesh(geometry,material);
	    this.mesh.position.set(x,y,z);
      obj.add(this.mesh);
	}

  timePassed(dt){

      var acelaration = this.calculateAcelaration();

      this.speed = this.speed + acelaration*dt;
      this.speed = (Math.abs(this.speed) < this.getMinSpeed()) ? 0 : this.speed;

      if(DEBUG){	console.log("speed: " + this.speed); }
      var new_x = this.x+this.speed*dt;
      this.setPosition(new_x, this.y, this.z);
  }

  //Needs to be overrided if another movement type desired
  calculateAcelaration(){
    return 0;
  }

  //Needs to be overrided if another movement type desired
  getMinSpeed(){
    return 0;
  }
}
