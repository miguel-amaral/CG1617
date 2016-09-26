	timePassed(dt){
		var positive = this.speed>0 ? 1:-1
		var acelaration = 0;
		var atrito = positive*Math.pow(this.speed,2);
		//Key pressed	: full throtle
		if((this.left + this.right) != 0){
			acelaration = ((this.left>this.right) ? -1:1)*ACELARATION;

		}
		
		this.speed += (acelaration-atrito)*dt;

		//Ensure TOP_SPEED
		this.speed = (Math.abs(this.speed) > TOP_SPEED) ? TOP_SPEED * positive : this.speed;
		
		//Stop if too slow
		if (Math.abs(this.speed) < MIN_SPEED){
			this.speed = 0;
		}

		if(DEBUG){	console.log("speed: " + this.speed); }
		this.setPosition(this.x+this.speed*dt, this.y, this.z);
	}