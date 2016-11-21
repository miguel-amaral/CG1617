'use strict'

class LightManager {
	constructor (scene) {
		this.lightsOn = true;

		this.spotLight = this.createSpotlight();
		scene.add( this.spotLight );
	  scene.add( this.spotLight.target);
		this.spotLightHelper = new THREE.SpotLightHelper( this.spotLight);
		scene.add( this.spotLightHelper );

		//Create the Sun
		this.Sun = new THREE.DirectionalLight( 0xffff00, 0.5 );
		//	sunSphere = new THREE.SphereGeometry( 2, 16, 8 );
		this.Sun.visible = false;
		this.Sun.position.set(0, 1, 1);

		var target = new THREE.Object3D();
		target.position.set( new THREE.Vector3( 0, 0, 0));
		this.Sun.target = target;

		this.sunOn  = false;
		this.starOn = true;
		scene.add( this.Sun );

		//Create the stars
		this.stars = [];
		this.starsHelpers = [];
		var intensity = 1;
		var distance = 75;
		var decay = 1;
		var c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;
		var colours = [c1,c2,c3,c4,c5,c6];

		var starsPosition = [ 	//new THREE.Vector3 (X_MIN          , 20, Z_MIN),			 					  // Canto Inferior Esquerdo
						//new THREE.Vector3 (X_MIN          , 20, Z_MAX),			 					  // Canto Superior Esquerdo
						//new THREE.Vector3 (X_MAX          , 20, Z_MIN),			 					  // Canto Inferior Direito
						//new THREE.Vector3 (X_MAX          , 20, Z_MAX),			 					  // Canto Superior Direito
						//new THREE.Vector3 (X_MIN          , 20, (Z_MAX+Z_MIN)/2),					  // Parede Esquerda Meio
						//new THREE.Vector3 (X_MAX          , 20, (Z_MAX+Z_MIN)/2),					  // Parede Direita  Meio
						//new THREE.Vector3 ((X_MAX+X_MIN)/2, 20, Z_MIN),								  // Parede De Cima Meio
						new THREE.Vector3 ((X_MAX+X_MIN)/2, 20, Z_MAX),								  // Parede De Baixo Meio

						new THREE.Vector3 (X_MAX-(X_MAX-X_MIN)*(1/4), 20, Z_MAX-(Z_MAX-Z_MIN)*(1/4)), // Meio Do Campo Superior Direito
						new THREE.Vector3 (X_MAX-(X_MAX-X_MIN)*(1/4), 20, Z_MAX-(Z_MAX-Z_MIN)*(3/4)), // Meio Do Campo Inferior Direito
						new THREE.Vector3 (X_MAX-(X_MAX-X_MIN)*(3/4), 20, Z_MAX-(Z_MAX-Z_MIN)*(1/4)), // Meio Do Campo Superior Esquerdo
						new THREE.Vector3 (X_MAX-(X_MAX-X_MIN)*(3/4), 20, Z_MAX-(Z_MAX-Z_MIN)*(3/4)), // Meio Do Campo Inferior Esquerdo

						new THREE.Vector3 ((X_MAX+X_MIN)/2, 20, (Z_MAX+Z_MIN)/2)					  // Centro de Jogo
					];


		var starsNumber = 0;
		for (var i = 0; i < Math.max(starsNumber,starsPosition.length); i++) {
			var positionVector;
			if(i >= starsPosition.length){
				positionVector = new THREE.Vector3 ((Math.random()*2)-1, 20/STAR_DIST, (Math.random()*2)-1);
				positionVector.multiplyScalar(STAR_DIST);
			} else {
				positionVector = starsPosition[i];
			}

			this.createPointLight(positionVector,colours[i%colours.length],intensity, distance, decay, scene);
		}
	}

	createSpotlight(){
		//						  SpotLight( color, intensity, distance, angle, penumbra, decay )
		var spotLight = new THREE.SpotLight( 0xff00ff, 1, 100, Math.PI / 6, .2 ,0);

		//Centering on the ship
		this.x = 7.5;
		this.y = 5;
		this.z = -10;
		spotLight.position.set( this.x, this.y,this.z);
//		spotLight.position.set( 0, 0, 0);
		spotLight.target.position.set( this.x, this.y,this.z -100 );

//		spotLight.castShadow = true;
//
//		spotLight.shadow.mapSize.width  = 2000;
//		spotLight.shadow.mapSize.height = 2000;
//
//		spotLight.shadow.camera.near = 500;
//		spotLight.shadow.camera.far = 4000;
//		spotLight.shadow.camera.fov = 15;

		return spotLight;

	}

	createPointLight(vector,colour,intensity, distance, decay, scene){
		var light1 = new THREE.PointLight( colour, intensity, distance, decay );

		light1.visible = true;
		light1.position.copy( vector );

		this.stars.push( light1 );
		scene.add( light1 );

		var helper = new THREE.PointLightHelper( light1 , 2 );
		this.starsHelpers.push(helper);
		scene.add(helper);

	}

	//updateSpotlightTarget(x){
	//	// /this.spotLight.target.position.set(this.x+x, 0, 0 );
	//	// /this.spotLightHelper.update();
	//}


	toggleStars() {
		if(this.lightsOn ){
			var nStars = this.stars.length;
			for (var i=0; i < nStars ; i++) {
				this.stars[i].visible = !this.stars[i].visible;
				this.starsHelpers[i].visible = !this.starsHelpers[i].visible;
			}
			this.starOn = this.stars[0].visible;
		}
	}

	toggleSun() {
		if(this.lightsOn) {
			this.Sun.visible= !this.Sun.visible;
			this.sunOn = this.Sun.visible;
		}
	}

	toggle() {

		this.lightsOn = !this.lightsOn;
		if(this.lightsOn == true){
			this.turnOnLights();
		} else {
			this.turnOffLights();
		}
	}

	turnOnLights(){
		this.Sun.visible= this.sunOn;
		var nStars = this.stars.length;
		for (var i=0; i < nStars ; i++) {
			this.stars[i].visible = this.starOn;
			this.starsHelpers[i].visible = this.starOn;
		}
	}

	turnOffLights(){
		this.Sun.visible= false;
		var nStars = this.stars.length;
		for (var i=0; i < nStars ; i++) {
			this.stars[i].visible = false;
			this.starsHelpers[i].visible = false;
		}
	}

	getSpotlight(){
		return this.spotLight;
	}
	getSpotlightHelper(){
		return this.spotLightHelper;
	}

	toggleSpotLight(){
		this.spotLight.visible  = !this.spotLight.visible;
		this.spotLightHelper.visible  = this.spotLight.visible;
	}

	toggleHelpers(){
		var nStars = this.stars.length;
		for (var i=0; i < nStars ; i++) {
			this.starsHelpers[i].visible = !this.starsHelpers[i].visible;
		}
		this.spotLightHelper.visible  = !this.spotLightHelper.visible;
	}
}
