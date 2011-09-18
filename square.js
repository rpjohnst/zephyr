zephyr.Square = function (width, height, x, y) {
	this.vertices = new Float32Array([
		width, height, 0,
		0, height, 0,
		width, 0, 0,
		0, 0, 0
	]);

	this.colors = new Float32Array([
		0, 0, 1, 1,
		1, 0, 0, 1,
		0, 1, 0, 1,
		1, 1, 1, 1
	]);

	this.x = x;
	this.y = y;
}
