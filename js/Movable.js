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
}
