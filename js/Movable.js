class Movable extends THREE.Object3D{
  constructor(x,y,z){
        super();
		this.setPosition(x,y,z);
        this.acceleration = new THREE.Vector3(0,0,0);
		this.speed = new THREE.Vector3(0,0,0);
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
    return new THREE.Vector3(0,0,0);
  }

  //Needs to be overrided if another movement type desired
  getMinSpeed(){
    return 0;
  }
}
