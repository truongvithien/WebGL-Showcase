function createObj(scene) {
	var Obj = function(){
		this.mesh = new THREE.Object3D();


		// Geometry

		// var objGeo = new THREE.BoxGeometry(50, 50, 50, 40);
		var objGeo = new THREE.BoxGeometry(50, 50, 50, 40);


		// Material

		var objMat = new THREE.MeshPhongMaterial({
							color: '#1297FE',
							transparent: false,
							opacity: 0.5
						});

		// Combine

		var obj = new THREE.Mesh( objGeo , objMat );




		this.mesh.add(obj);

	}

	obj = new Obj();
	scene.add(obj.mesh);

	return obj;
}


function createObj2(scene) {
	var Obj2 = function(){
		this.mesh = new THREE.Object3D();


		// Geometry

		// var objGeo = new THREE.BoxGeometry(50, 50, 50, 40);
		var obj2Geo = new THREE.BoxGeometry(50, 50, 50, 40);


		// Material

		var obj2Mat = new THREE.MeshPhongMaterial({
							color: '#1297FE',
							transparent: false,
							opacity: 0.5
						});

		// Combine

		obj2Geo.vertices[0].y += 15;

		var obj2 = new THREE.Mesh( obj2Geo , obj2Mat );

		this.mesh.add(obj2);

	}

	obj2 = new Obj2();
	scene.add(obj2.mesh);

	return obj2;
}
