$(function(){
	createScene('#world', scene, Window);

	var sphere = createSphere(scene);

	ready = true; 

    function onMouseMove(event) {
	    mouseX = event.clientX - window.innerWidth / 2;
	    mouseY = event.clientY - window.innerHeight / 2;
	    camera.position.x += (mouseX - camera.position.x) * 0.005;
	    camera.position.y += (mouseY - camera.position.y) * 0.005;
	    //set up camera position
	    camera.lookAt(scene.position);
	};

	createLights(scene);

	clock = new THREE.Clock();
	animate();
});



function animate() {
	requestAnimationFrame( animate );
	if ( ready ) {
		update();
		render();
	} else {
		console.log('loading...');
	}
}

function update(){
	var delta = clock.getDelta();
	time = Date.now() * 0.0005;
	// mixer.update( delta / 2.0 );
}

function render(time){
	// console.log(time);
	if(materialShader) 
   		materialShader.uniforms.time.value = time/1000;

	renderer.render(scene, camera);
	renderer.setAnimationLoop(render)
}
