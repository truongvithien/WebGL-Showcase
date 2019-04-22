$(function(){
	createScene('#world', scene, Window);

	camera.position.set(35, 50, 85);
	camera.rotation.set(-.35,.40,.15);


	loadObject('../models/the_neko_stop/scene.gltf').then(function(obj) {
		console.log(obj);
		neko = obj.scene;
		// neko.scale.set(2,2,2);
		neko.scale.set(0.2,0.2,0.2);
		neko.position.set(0,0,0);

		mixer = new THREE.AnimationMixer(obj.scene);
		var ani = obj.animations.find( (clip) => {
			return clip.name === obj.animations[0].name;
		})

		action = mixer.clipAction(ani);
		action.play();

		obj.castShadow = true;

		scene.add(neko);

		ready = true;
	});


	// createAxes(scene);

	$('#content').mousewheel(function(event) {
		wheel_direction = event.deltaY;

		wheel_score += wheel_direction;

		if (wheel_score > 0) {
			wheel_score = 0;
		}

		if (wheel_score < -10) {
			wheel_score = 10;
		}
	    // console.log(event.deltaY);
	    // console.log(wheel_score);
	});

	createLights(scene);

	bulbs = [
		createBulbLight(scene, [1000, 100, 1000], 0xFFF1E0),
		createBulbLight(scene, [-1000, 100, 1000], 0xFFF4AD),
		createBulbLight(scene, [1000, 100, -1000], 0xFFD7B0),
		createBulbLight(scene, [-1000, 100, -1000], 0xFFF1E0),
	]

	clock = new THREE.Clock();
	animate();
});



function animate() {
	requestAnimationFrame( animate );
	if ( ready ) {
		$("#loading").hide();
		time = update();
		render();
		updateNeko(wheel_direction, wheel_score);
		// bulbLightMove(time);
	} else {
		console.log('loading...');
	}
}

function update(){
	var delta = clock.getDelta();
	time = Date.now() * 0.0005;
	mixer.update( delta / 2.0 );

	return time;
}

function render(time){
	// console.log(time);
	if(materialShader) 
   		materialShader.uniforms.time.value = time/1000;

	renderer.render(scene, camera);
	renderer.setAnimationLoop(render)
}

function bulbLightMove(time) {
	// bulbLight.position.z += .2;

	console.log( time );

	bulbLight.position.x = Math.cos( time * 5 ) * 100;
	// bulbLight.position.y = Math.cos( time * 7 ) * 30;
	// bulbLight.position.z = Math.cos( time * 4 ) * 200;

}

function objectAction(time) {

}

function updateNeko(wheel_direction, wheel_score) {

	var step = {
		scale: .005,
		rotation: .005,
	}

	console.log(wheel_score);

	switch (wheel_score) {
		case 0: 
			neko.scale.set(.2, .2, .2);
			neko.rotation.y = 0;
			break;
		case -1:
			neko.rotation.y = 0;
			if (wheel_direction > 0 &&
				neko.scale.x + step.scale <= .2 && 
				neko.scale.y + step.scale <= .2 && 
				neko.scale.z + step.scale <= .2) {
				neko.scale.x += step.scale;
				neko.scale.y += step.scale;
				neko.scale.z += step.scale;
			}
			break;
		case -2:
			neko.rotation.y = 0;
			if (wheel_direction < 0 &&
				neko.scale.x + step.scale >= .1 && 
				neko.scale.y + step.scale >= .1 && 
				neko.scale.z + step.scale >= .1) {
				neko.scale.x -= step.scale;
				neko.scale.y -= step.scale;
				neko.scale.z -= step.scale;
			}
			break;
		case -3:
			bulbs[4] = 0
		case -4:
			bulbs[4] = 0
			break;
		case -5:
			bulbs[4] = 0
			console.log(neko.rotation.y)
			if (wheel_direction > 0 &&
				neko.rotation.y >= -.1) {
				neko.rotation.y -= step.rotation;
			}
			break;
		case -6: 
			if (wheel_direction < 0 &&
				neko.rotation.y <= .1) {
				neko.rotation.y += step.rotation;
			}
			break;
		default:
			break;

	}

}