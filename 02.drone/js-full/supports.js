function getCamCurrent(){
    var camCurrent = {
		position: {
			x: camera.position.x,
			y: camera.position.y,
			z: camera.position.z
		},
		rotation: {
			x: camera.rotation.x,
			y: camera.rotation.y,
			z: camera.rotation.z
		}
	}
	return camCurrent;
}

function triggerAnimate(obj){
	console.log('a');
	var animateClass = $(obj).data('animate');
	$(obj).addClass(animateClass)
		.one('animationend', () => {
			$(obj).removeClass(animateClass);
		})
}