var zephyr = this.zephyr || {};

zephyr.Context = function (canvas) {
	var gl = canvas.getContext("experimental-webgl");
	if (!gl)
		console.error("Couldn't initialize WebGL");

	var shader = {};

	shader.program = gl.createProgram();
	gl.attachShader(shader.program, getShader("vertex", zephyr.shaders.sprite.vertex));
	gl.attachShader(shader.program, getShader("fragment", zephyr.shaders.sprite.fragment));
	gl.linkProgram(shader.program);
	if (!gl.getProgramParameter(shader.program, gl.LINK_STATUS))
		console.error(gl.getProgramInfoLog(shader.program));

	function getShader(type, source) {
		var shader = gl.createShader(
			type == "vertex" ? gl.VERTEX_SHADER :
			type == "fragment" ? gl.FRAGMENT_SHADER :
			undefined
		);

		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
			console.error(gl.getShaderInfoLog(shader));

		return shader;
	}

	shader.attributes = {};
	shader.attributes.vertexPosition = gl.getAttribLocation(shader.program, "vertexPosition");
	shader.attributes.vertexColor = gl.getAttribLocation(shader.program, "vertexColor");

	shader.uniforms = {};
	shader.uniforms.projectionMatrix = gl.getUniformLocation(shader.program, "projectionMatrix");
	shader.uniforms.modelViewMatrix = gl.getUniformLocation(shader.program, "modelViewMatrix");

	gl.useProgram(shader.program);
	gl.enableVertexAttribArray(shader.attributes.vertexPosition);
	gl.enableVertexAttribArray(shader.attributes.vertexColor);

	gl.clearColor(0, 0, 0, 1);

	var projectionMatrix = mat4.create();
	var modelViewMatrix = mat4.create();

	var vertices = gl.createBuffer();
	var colors = gl.createBuffer();

	this.render = function (square) {
		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.clear(gl.COLOR_BUFFER_BIT);
		mat4.ortho(-0.5, canvas.width - 0.5, canvas.height - 0.5, -0.5, -1, 1, projectionMatrix);
		gl.uniformMatrix4fv(shader.uniforms.projectionMatrix, false, projectionMatrix);

		mat4.identity(modelViewMatrix);
		mat4.translate(modelViewMatrix, [square.x, square.y, 0]);
		gl.uniformMatrix4fv(shader.uniforms.modelViewMatrix, false, modelViewMatrix);

		gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
		gl.bufferData(gl.ARRAY_BUFFER, square.vertices, gl.STATIC_DRAW);
		gl.vertexAttribPointer(shader.attributes.vertexPosition, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, colors);
		gl.bufferData(gl.ARRAY_BUFFER, square.colors, gl.STATIC_DRAW);
		gl.vertexAttribPointer(shader.attributes.vertexColor, 4, gl.FLOAT, false, 0, 0);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	};
}

var requestAnimationFrame = (function () {
	return (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function (callback, element) {
			setTimeout(function () {
				callback(new Date().getTime());
			}, 1000 / 60);
		}
	);
})();

zephyr.start = function (context, events, square) {
	var nextFrame = new Date().getTime();
	(function update(time) {
		requestAnimationFrame(update);

		while (nextFrame < time) {
			events.update(square)
			nextFrame += 1000 / 60;
		}

		context.render(square);
	})();
}
