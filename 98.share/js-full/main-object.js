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

function createLand(scene) {
	var Sphere = function(){
		this.mesh = new THREE.Object3D();

		var sphereGeo = new THREE.SphereGeometry(50, 40, 40);
		var sphereMat = new THREE.MeshLambertMaterial({
							color: '#F7F500',
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

