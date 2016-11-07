'use strict'
const TOP_SPEED_c  = 150;
const MIN_SPEED_c   = 0.8;
const ACCELERATION = 200;
class Ship extends Movable {
	constructor(scene,x,y,z){
		super(scene,x,y,z);

		this.left = false;
		this.right = false;
		this.MIN_SPEED = MIN_SPEED_c;
		this.TOP_SPEED = TOP_SPEED_c;
		this.single = true;



		var blue =0x0000ff;
		var cor = 0x0000ff;
		cor = 0xff0000;
		this.material = new THREE.MeshBasicMaterial({color: cor, wireframe:false});
		this.calculategeometry(this.material);
		var phong   = new THREE.MeshPhongMaterial  ( { color: cor ,             // Diffuse color of the material
			  										   specular: cor,			// how shiny the material is and the color of its shine
													   shininess: 200,			// How shiny the specular highlight is
													   //emissive: 0x0000ff, 		//(light) color of the material, essentially a solid color unaffected by other lighting
													   //emissiveIntensity: 0.1, 	//range [0,1]
													   //shading: THREE.FlatShading
												     } );
		var lambert = new THREE.MeshLambertMaterial( { color: cor				// Diffuse color of the material
													   //,emissive: 0x0000ff 		//(light) color of the material, essentially a solid color unaffected by other lighting
													   //,emissiveIntensity: 0.1 	//range [0,1]
													 } );
		this.simpleMaterial = this.material;
		this.complexMaterials = [phong, lambert];

	}
	stopLeft(){
		this.left = false;
	}
	stopRight(){
		this.right = false;
	}
	startRight(){
		this.right = true;
	}
	startLeft(){
		this.left = true;
	}

	calculateAcceleration() {
		if(Math.abs(this.speed.length()) < this.getTopSpeed()){
			if(this.left) {
				this.setAcceleration (-1 * ACCELERATION, 0 , 0);
				return;
			} else if (this.right) {
				this.setAcceleration (ACCELERATION, 0 , 0);
				return;
			}
		}
		if (this.speed.x < 0 ) { this.setAcceleration (ACCELERATION, 0 , 0); }
		else if (this.speed.x > 0){ this.setAcceleration (-1 * ACCELERATION, 0 , 0); }
		else { this.setAcceleration (0, 0, 0); }
	}

	getMinSpeed(){
		return this.MIN_SPEED;
	}

	getTopSpeed(){
		return this.TOP_SPEED;
	}

	getObjectCenter() {
		return new THREE.Vector3(7,5,-2.9167);
	}

	getPowRadius() {
		return 57.56557289;
	}
	calculategeometry(material) {
		var cor = 0x0000ff;
		cor = 0xffffff;
		this.geometry = new THREE.Geometry();

		this.geometry.vertices.push(
				new THREE.Vector3( 0,  0, 0 ),  //0 Q1 bottom
				new THREE.Vector3( 14, 0, 0 ),  //1 Q1 bottom
				new THREE.Vector3( 14, 10, 0 ), //2 Q1 bottom
				new THREE.Vector3( 0, 10, 0 ),  //3 Q1 bottom
				new THREE.Vector3( 14, 0, -4 ),  //4 Q1 top
				new THREE.Vector3( 0, 0, -4 ),   //5 Q1 top
				new THREE.Vector3( 14, 10, -4 ), //6 Q1 top
				new THREE.Vector3( 0, 10, -4 ),   //7 Q1 top
				new THREE.Vector3( 11, 1, -4 ), //8 Q1-Q2 buraco
				new THREE.Vector3( 3, 1, -4 ), //9 Q1-Q2 buraco
				new THREE.Vector3( 3, 9, -4 ), //10 Q1-Q2 buraco
				new THREE.Vector3( 11, 9, -4 ), //11 Q1-Q2 buraco
				new THREE.Vector3( 0, 1, -4 ), //12 Q1 top auxiliares
				new THREE.Vector3( 0, 9, -4 ), //13 Q1 top auxiliares
				new THREE.Vector3( 14, 1, -4 ), //14 Q1 top auxiliares
				new THREE.Vector3( 14, 9, -4 ), //15 Q1 top auxiliares
				new THREE.Vector3( 11, 1, -7), //16 Q2 top
				new THREE.Vector3( 3, 1 , -7), // 17 Q2 top
				new THREE.Vector3( 3, 9, -7), // 18 Q2 top
				new THREE.Vector3( 11, 9, -7), // 19 Q2 top

				new THREE.Vector3( 9, 3, -7), //20 Q2-Q3 buraco
				new THREE.Vector3( 5, 3, -7), //21 Q2-Q3 buraco
				new THREE.Vector3(5, 7, -7), //22 Q2-Q3 buraco
				new THREE.Vector3(9, 7, -7), //23 Q2-Q3 buraco

				new THREE.Vector3( 3, 3, -7), //24 Q2 auxiliares
				new THREE.Vector3( 3, 7, -7), //25 Q2 auxiliares
				new THREE.Vector3( 11, 3, -7), //26 Q2 auxiliares
				new THREE.Vector3( 11, 7, -7), //27 Q2 auxiliares

				new THREE.Vector3( 9, 3, -9), //28 Q3 top
				new THREE.Vector3( 5, 3, -9), //29 Q3 top
				new THREE.Vector3( 5, 7, -9), //30 Q3 top
				new THREE.Vector3( 9, 7, -9), //31 Q3 top

				new THREE.Vector3( 8, 4, -9), //32 Q3-Q4 buraco
				new THREE.Vector3( 6, 4, -9), //33 Q3-Q4 buraco
				new THREE.Vector3( 6, 6, -9), //34 Q3-Q4 buraco
				new THREE.Vector3( 8, 6, -9), //35 Q3-Q4 buraco
				new THREE.Vector3( 5, 4, -9), //36 Q3 auxiliar
				new THREE.Vector3( 5, 6, -9), //37 Q3 auxiliar
				new THREE.Vector3( 9, 6, -9), //38 Q3 auxiliar
				new THREE.Vector3( 9, 4, -9), //39 Q3 auxiliar
				new THREE.Vector3( 8, 4, -10.5), //40 Q4 top
				new THREE.Vector3( 6, 4, -10.5), //41 Q4 top
				new THREE.Vector3( 6, 6, -10.5), //42 Q4 top
				new THREE.Vector3( 8, 6, -10.5) //43 Q4 top
				);

			this.geometry.faces.push(
								//--lados--
								 new THREE.Face3( 1, 0, 5), //x-z
								 new THREE.Face3( 4, 1, 5), //x-z
								 new THREE.Face3( 7, 5, 3), //z-y
								 new THREE.Face3( 3, 5, 0), //z-y
								 new THREE.Face3( 3, 2, 7), //x-z
								 new THREE.Face3( 2, 6, 7), //x-z
								 new THREE.Face3( 2, 1, 6), //z-y
								 new THREE.Face3( 1, 4, 6), //z-y
								 new THREE.Face3( 0, 2, 3), //x-y tampa
								 new THREE.Face3( 0, 1, 2), //x-y tampa
								 //--parte de cima--
								 new THREE.Face3( 4, 5, 14),
								 new THREE.Face3( 5, 12, 14),
								 new THREE.Face3( 11, 15, 14),
								 new THREE.Face3( 14, 8, 11),
								 new THREE.Face3( 12, 13, 9),
								 new THREE.Face3( 10, 9, 13),
								 new THREE.Face3( 7, 6, 15),
								 new THREE.Face3( 13, 7, 15),
								 //--lados-- Q2
								 new THREE.Face3( 8, 9, 17), //x-z
								 new THREE.Face3( 16, 8, 17), //x-z
								 new THREE.Face3( 10, 11, 18), //x-z
								 new THREE.Face3(11, 19, 18), //x-z
								 new THREE.Face3( 11, 8, 19), //z-y
								 new THREE.Face3( 8, 16, 19), //z-y
								 new THREE.Face3( 18, 17, 10), //z-y
								 new THREE.Face3( 10, 17, 9), //z-y
								 //--parte de cima--Q2
								 new THREE.Face3( 16, 17, 26),
								 new THREE.Face3( 17, 24, 26),
								 new THREE.Face3( 23, 27, 26),
								 new THREE.Face3( 26, 20, 23),
								 new THREE.Face3( 24, 25, 21),
								 new THREE.Face3( 22, 21, 25),
								 new THREE.Face3( 18, 19, 27),
								 new THREE.Face3( 25, 18, 27),
								 //--lados Q3--
 								 new THREE.Face3( 20, 21, 29), //x-z
								 new THREE.Face3( 28, 20, 29), //x-z
								 new THREE.Face3( 22, 23, 30), //x-z
								 new THREE.Face3( 23, 31, 30), //x-z
								 new THREE.Face3( 23, 20, 31), //z-y
								 new THREE.Face3( 20, 28, 31), //z-y
								 new THREE.Face3( 30, 29, 22), //z-y
								 new THREE.Face3( 22, 29, 21), //z-y
								 //--parte de cima Q3--
								 new THREE.Face3( 28, 29, 39),
								 new THREE.Face3( 29, 36, 39),
								 new THREE.Face3( 35, 38, 39),
								 new THREE.Face3( 39, 32, 35),
								 new THREE.Face3( 36, 37, 33),
								 new THREE.Face3( 34, 33, 37),
								 new THREE.Face3( 30, 31, 38),
								 new THREE.Face3( 37, 30, 38),
								 //--lados Q4
 								 new THREE.Face3( 32, 33, 41), //x-z
								 new THREE.Face3( 40, 32, 41), //x-z
								 new THREE.Face3( 34, 35, 42), //x-z
								 new THREE.Face3( 35, 43, 42), //x-z
								 new THREE.Face3( 35, 32, 43), //z-y
								 new THREE.Face3( 32, 40, 43), //z-y
								 new THREE.Face3( 42, 41, 34), //z-y
								 new THREE.Face3( 34, 41, 33), //z-y
								 new THREE.Face3( 40, 42, 43), //tampa cima
								 new THREE.Face3( 40, 41, 42) //tampa cima





								);

			this.geometry.computeBoundingSphere();
			this.geometry.computeFaceNormals();
			this.geometry.computeVertexNormals();
			this.pushMesh(this.geometry, this.material);

		}


		// this.material = new THREE.MeshBasicMaterial({color: cor, wireframe:false});
		// this.geometry = new THREE.CubeGeometry(14, 10, 5);
		// this.positionElement(this.geometry, this.material, 0, 0, 0);
		// this.geometry = new THREE.CubeGeometry(8, 8, 5);
		// this.positionElement(this.geometry, this.material, 0, 0, -2);
		// this.geometry = new THREE.CubeGeometry(4, 4, 4);
		// this.positionElement(this.geometry, this.material, 0, 0, -4);
		// this.geometry = new THREE.CubeGeometry(2, 2, 2);
		// this.positionElement(this.geometry, this.material, 0, 0, -6);

}
