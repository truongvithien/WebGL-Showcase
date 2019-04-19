$(function(){
	createScene('#world', scene, Window);


	loadObject('../models/k07_drone/scene.gltf').then(function(obj) {
		console.log(obj);
		var objScene = obj.scene;
		objScene.scale.set(3,3,3);
		// objScene.scale.set(0.2,0.2,0.2);
		objScene.position.set(0,0,0);

		mixer = new THREE.AnimationMixer(obj.scene);
		var ani = obj.animations.find( (clip) => {
			return clip.name === obj.animations[0].name;
		})

		action = mixer.clipAction(ani);
		action.play();

		obj.castShadow = true;

		scene.add(objScene);

		ready = true;
	});


	// createAxes(scene);

	// $('#my_elem').mousewheel(function(event) {
	//     console.log(event.deltaX, event.deltaY, event.deltaFactor);
	// });

	// createLights(scene);

	var blubs = [
		createBulbLight(scene, [1000, 100, 1000], 0xFFF1E0),
		createBulbLight(scene, [-1000, 100, 1000], 0xC9E1FF),
		createBulbLight(scene, [1000, 100, -1000], 0xffffff),
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