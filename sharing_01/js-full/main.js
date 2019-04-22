var 
	atmosphere, 
	sphere, 
	land, 
	sea, 
	grass, 
	tree, 
	cloud, 
	sun, 
	moon;

$(function(){
	createScene('#world', scene, Window);

	atmosphere = createAtmosphere(scene);
	sphere = createSphere(scene);
	land = createLand(scene);
	sea = createSea(scene);
	grass = createGrass(scene);
	tree = createThree(scene);
	cloud = createCloud(scene);

	// camera.lookAt(sphere);
	camera.position.y += 50;
	camera.position.x -= 50;
	camera.rotation.y -= 10*Math.PI/180;

	ready = true; 

    function onMouseMove(event) {
	    mouseX = event.clientX - window.innerWidth / 2;
	    mouseY = event.clientY - window.innerHeight / 2;
	    camera.position.x += (mouseX - camera.position.x) * 0.005;
	    camera.position.y += (mouseY - camera.position.y) * 0.005;
	    //set up camera position
	    camera.lookAt(scene.position);
	};

	$('#content').mousewheel(function(event) {
		wheel_direction = event.deltaY;

		wheel_score += wheel_direction;

		if (wheel_score > 0) {
			wheel_score = 0;
		}

		if (wheel_score < -10) {
			wheel_score = 10;
		}
	});

	createLights(scene);

	// sun = createSun(
	// 	scene, 
	// 	{
	// 		x: 0,
	// 		y: 400,
	// 		z: 0,
	// 	},
	// 	'#333'
	// );
	// moon = createMoon(
	// 	scene, 
	// 	{
	// 		x: 0,
	// 		y: -200,
	// 		z: 0,
	// 	},
	// 	'#78723B'
	// );

	clock = new THREE.Clock();
	animate();

	new WOW().init();
});



function animate() {
	requestAnimationFrame( animate );
	if ( ready ) {
		update();
		render();
		updateScript(wheel_direction, wheel_score);
	} else {
		console.log('loading...');
	}
}

function update(){
	var delta = clock.getDelta();
	time = Date.now() * 0.0005;
	// mixer.update( delta / 2.0 );

	updateCamera();
	updateRotation()
}

function render(time){
	// console.log(time);
	if(seaShader) 
   		seaShader.uniforms.time.value = time/1000;
	if(leafShader) 
   		leafShader.uniforms.time.value = time/1000;

	renderer.render(scene, camera);
	renderer.setAnimationLoop(render)
}

function updateRotation(){

	var randomWindX = (Math.floor(Math.random() * 10) + 5)/100;
	var randomWindZ = (Math.floor(Math.random() * 10) + 5)/100;

	// console.log(cloud.rotation);
	cloud.rotation.x += randomWindX*Math.PI/180;
	// cloud.rotation.z += randomWindZ*Math.PI/180;

	if (sun) {
		sun.rotation.x += .5*Math.PI/180;	
	}

	// moon.rotation.x += .5*Math.PI/180;

	// var rotScr = .3;
	// land.mesh.rotation.y += rotScr*Math.PI/180;
	// grass.mesh.rotation.y += rotScr*Math.PI/180;
	// three.mesh.rotation.y += rotScr*Math.PI/180;


	// camera.focus(three);
}

function updateCamera() {

}



function updateScript(wheel_direction, wheel_score) {

	var step = {
		scale: .005,
		rotation: .005,
	}

	console.log(wheel_score);

	switch (wheel_score) {
		case 0: 
			// tree.mesh.scale.set(1, 1, 1);
			tree.mesh.rotation.y = 0;
			break;
		case -1:
			tree.mesh.rotation.y = 0;
			// if (wheel_direction > 0 &&
			// 	tree.mesh.scale.x + step.scale <= .2 && 
			// 	tree.mesh.scale.y + step.scale <= .2 && 
			// 	tree.mesh.scale.z + step.scale <= .2) {
			// 	tree.mesh.scale.x += step.scale;
			// 	tree.mesh.scale.y += step.scale;
			// 	tree.mesh.scale.z += step.scale;
			// }
			break;
		case -2:
			tree.mesh.rotation.y = 0;
			// if (wheel_direction < 0 &&
			// 	tree.mesh.scale.x + step.scale >= .1 && 
			// 	tree.mesh.scale.y + step.scale >= .1 && 
			// 	tree.mesh.scale.z + step.scale >= .1) {
			// 	tree.mesh.scale.x -= step.scale;
			// 	tree.mesh.scale.y -= step.scale;
			// 	tree.mesh.scale.z -= step.scale;
			// }
			break;
		case -3:
		case -4:
			break;
		case -5:
			console.log(tree.mesh.rotation.y)
			if (wheel_direction > 0 &&
				tree.mesh.rotation.y >= - 360*Math.PI/180) {
				tree.mesh.rotation.y -= step.rotation;
			}
			break;
		case -6: 
			if (wheel_direction < 0 &&
				tree.mesh.rotation.y <= 360*Math.PI/180) {
				tree.mesh.rotation.y += step.rotation;
			}
			break;
		default:
			break;

	}

}