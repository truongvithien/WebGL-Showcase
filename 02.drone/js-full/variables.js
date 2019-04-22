var scene = new THREE.Scene;
var camera;
var mixer;
var clock;
var time;
var action;

/*
	Check everything is ok
*/
var ready = false;
var renderer;
var controls;
var materialShader;
var mouse = new THREE.Vector2(), INTERSECTED;


var Window = {
	width: window.innerWidth,
	height: window.innerHeight,
	ratio: window.innerWidth/ window.innerHeight,
}

var MousePos = {
	x: 0,
	y: 0
}


/*
	control_mode:
	- map
	- orbit
	- ...

*/
var control_mode = 'map'
