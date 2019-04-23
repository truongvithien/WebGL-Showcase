$(function(){
	createScene('#world', scene, Window);

	// TODO ----

	// var box = createObj(scene);
	var box2 = createObj2(scene);



	//--------

	ready = true; 

	createAxes(scene);

	// createLights(scene);
	sun = createSun(
		scene, 
		{
			x: 150,
			y: 150,
			z: 150,
		},
		'#ff0000'
	);

	clock = new THREE.Clock();
	animate();
});



function animate() {
	requestAnimationFrame( animate );
	if ( ready ) {
		render();
		if (sun) {
			sun.rotation.x += 2*Math.PI/180;
			sun.rotation.z += 2*Math.PI/180;	
		}
	}
}

function render(){
	renderer.render(scene, camera);
	renderer.setAnimationLoop(render)
}
