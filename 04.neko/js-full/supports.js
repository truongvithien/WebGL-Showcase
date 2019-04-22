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

function normalize(v,vmin,vmax,tmin, tmax){

	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;

}

function handleMouseMove(event, Window) {
	var tx = -1 + (event.clientX / Window.width)*2;
	var ty = 1 - (event.clientY / Window.height)*2;
	MousePos = {x:tx, y:ty};
	console.log(MousePos);
}