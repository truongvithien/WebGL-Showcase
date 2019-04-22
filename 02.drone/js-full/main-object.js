function createBox(scene){
	var Box = function(){
		this.mesh = new THREE.Object3D(); 

		var Colors = {
			skin: 0xFED7B3,
			jean: 0xA26234,
			shirt:0xFAFAFA,
			hair: 0x222222,
		}
		

		//------- Body

		this.body = new THREE.Object3D();
		var body = new THREE.Mesh(
				new THREE.BoxGeometry(20, 30, 40),
				new THREE.MeshLambertMaterial({
					color: Colors.shirt,
					flatShading: true,
				})
			);
		body.position.y += 25;


		this.shoulder = new THREE.Object3D();
		var shoulder = new THREE.Mesh(
				new THREE.BoxGeometry(15, 10, 60),
				new THREE.MeshLambertMaterial({
					color: Colors.shirt,
					flatShading: true,
				})
			);
		shoulder.position.y += 33;

		this.body.add(body);
		this.body.add(shoulder);

		//------- Head

		this.head = new THREE.Object3D();
		var head = new THREE.Mesh(
				new THREE.BoxGeometry(22, 22, 22),
				new THREE.MeshLambertMaterial({
					color: Colors.skin,
					flatShading: true,
				})
			);
		head.position.y += 50;


		this.hair = new THREE.Object3D();
		var hair = new THREE.Mesh(
				new THREE.BoxGeometry(26, 10, 26),
				new THREE.MeshLambertMaterial({
					color: Colors.hair,
					flatShading: true,
				})
			);
		hair.position.y += 58;
		hair.rotation.z += 10 * Math.PI/180;

		this.hairBot = new THREE.Object3D();
		var hairBot = new THREE.Mesh(
				new THREE.BoxGeometry(16, 6, 26),
				new THREE.MeshLambertMaterial({
					color: Colors.hair,
					flatShading: true,
				})
			);
		hairBot.position.y += 52;
		hairBot.position.x -= 10;
		hairBot.rotation.z += 90 * Math.PI/180;

		this.head.add(head);
		this.head.add(hair);
		this.head.add(hairBot);


		//------- Legs

		this.legs = new THREE.Object3D();
		var legLeft = new THREE.Mesh(
				new THREE.BoxGeometry(15, 10, 15),
				new THREE.MeshLambertMaterial({
					color: Colors.skin,
					floatShading: true,
				})
			);
		legLeft.position.z += 10;
		legLeft.position.y += 5;

		var legRight = new THREE.Mesh(
				new THREE.BoxGeometry(15, 10, 15),
				new THREE.MeshLambertMaterial({
					color: Colors.skin,
					floatShading: true,
				})
			);
		legRight.position.z -= 10;
		legRight.position.y += 5;

		this.legs.add(legLeft);
		this.legs.add(legRight);


		var legClothLeft = new THREE.Mesh(
				new THREE.BoxGeometry(17, 8, 17),
				new THREE.MeshLambertMaterial({
					color: Colors.jean,
					floatShading: true,
				})
			);
		legClothLeft.position.z += 10;
		legClothLeft.position.y += 6;

		var legClothRight = new THREE.Mesh(
				new THREE.BoxGeometry(17, 8, 17),
				new THREE.MeshLambertMaterial({
					color: Colors.jean,
					floatShading: true,
				})
			);
		legClothRight.position.z -= 10;
		legClothRight.position.y += 6;

		var legClothTop = new THREE.Mesh(
				new THREE.BoxGeometry(21, 5, 41),
				new THREE.MeshLambertMaterial({
					color: Colors.jean,
					floatShading: true,
				})
			);
		// legClothTop.position.z -= 10;
		legClothTop.position.y += 12;

		this.legs.add(legClothLeft);
		this.legs.add(legClothRight);
		this.legs.add(legClothTop);


		//------- Hands

		this.hands = new THREE.Object3D();
		var handLeft = new THREE.Mesh(
				new THREE.BoxGeometry(8, 20, 8),
				new THREE.MeshLambertMaterial({
					color: Colors.skin,
					floatShading: true,
				})
			);
		handLeft.position.z += 24;
		handLeft.position.y += 25;

		var handRight = new THREE.Mesh(
				new THREE.BoxGeometry(8, 20, 8),
				new THREE.MeshLambertMaterial({
					color: Colors.skin,
					floatShading: true,
				})
			);
		handRight.position.z -= 24;
		handRight.position.y += 25;


		var handWrest = new THREE.Mesh(
				new THREE.BoxGeometry(9, 3, 9),
				new THREE.MeshLambertMaterial({
					color: Colors.shirt,
					floatShading: true,
				})
			);
		handWrest.position.z -= 24;
		handWrest.position.y += 18;

		this.hands.add(handLeft);
		this.hands.add(handRight);
		this.hands.add(handWrest);




		this.mesh.add(this.body);
		this.mesh.add(this.head);
		this.mesh.add(this.legs);
		this.mesh.add(this.hands);
	}

	box = new Box();
	// box.mesh.position.set(0, 0);
	scene.add(box.mesh);

	return box;

}

function createSphere(scene) {
	var Sphere = function(){
		this.mesh = new THREE.Object3D();

		var sphereGeo = new THREE.SphereGeometry(50, 40, 40);
		var sphereMat = new THREE.MeshLambertMaterial({
							color: '#1091FF',
							transparent: false,
							opacity: 0.5
						});

		sphereMat.onBeforeCompile = (shader) => {
		    shader.uniforms.time = { value: 0}
		    shader.vertexShader = `
		         uniform float time;
		         ` + shader.vertexShader
		    const token = `#include <begin_vertex>`
		    const customTransform = `
		        vec3 transformed = vec3(position);
		        transformed.x = position.x 
		             + sin(position.y*1.0 + time*5.0)*1.0;
		    `
		   shader.vertexShader =
		           shader.vertexShader.replace(token,customTransform)
		   materialShader = shader;
		 }

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})

		jitter(sphereGeo,1)




		var sphere = new THREE.Mesh( sphereGeo , sphereMat );

		this.mesh.add(sphere);

	}

	sphere = new Sphere();
	scene.add(sphere.mesh);

	// return sphere;
}

