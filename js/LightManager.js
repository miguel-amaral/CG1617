'use strict'

class LightManager {
	constructor (scene) {
		//Create the Sun
		this.Sun = new THREE.DirectionalLight( 0xffff00, 0.5 );
		//	sunSphere = new THREE.SphereGeometry( 2, 16, 8 );
		this.Sun.visible = false;
		this.Sun.position.set(0, 1, 1);
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


	toggleStars() {
		var nStars = this.stars.length;
		for (var i=0; i < nStars ; i++) { 
			this.stars[i].visible = !this.stars[i].visible; 
			this.starsHelpers[i].visible = !this.starsHelpers[i].visible; 
		}
	}
	
	toggleSun() {
		this.Sun.visible= !this.Sun.visible;
	}

	toggle() {
		this.toggleSun();
		this.toggleStars();
	}

	
}
