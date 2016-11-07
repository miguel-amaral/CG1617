'use strict'

class LightManager {
	constructor (scene) {
		//Create the Sun
		this.Sun = new THREE.DirectionalLight( 0xffff00, 0.5 );
		//	sunSphere = new THREE.SphereGeometry( 2, 16, 8 );
		this.Sun.visible = false;
		this.Sun.position.set( 0, 1, 1);
		scene.add( this.Sun );

		//Create the stars
		this.stars = [] ;
		var intensity = 1;
		var distance = 50;
		var decay = 2.0;
		var c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;
		var colours = [c1,c2,c3,c4,c5,c6];
		var sphere = new THREE.SphereGeometry( 2, 16, 8 );

		var j = 0;
		while(j < 10){

			var light1 = new THREE.PointLight( colours[j%colours.length], intensity, distance, decay );
			light1.visible = false;
			//light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: colours[j%colours.length] } ) ) );

			light1.position.copy( new THREE.Vector3 ((Math.random()*2)-1, 0.2, (Math.random()*2)-1));
			light1.position.multiplyScalar(STAR_DIST);


			this.stars.push( light1 );
			scene.add( light1 );

			var helper = new THREE.PointLightHelper( light1 , 2 );
			scene.add(helper);
			j++;
		}
	}

	toggleStars() {
		var nStars = this.stars.length;
		for (var i=0; i < nStars ; i++) { this.stars[i].visible = !this.stars[i].visible; }
	}
	
	toggleSun() {
		this.Sun.visible= !this.Sun.visible;
	}

	toggle() {
		this.toggleSun();
		this.toggleStars();
	}

	
}
