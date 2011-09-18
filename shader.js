zephyr.shaders = {
	sprite: {
		vertex: [
			"attribute vec3 vertexPosition;",
			"attribute vec4 vertexColor;",
			
			"uniform mat4 projectionMatrix;",
			"uniform mat4 modelViewMatrix;",

			"varying vec4 color;",

			"void main(void) {",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);",
				"color = vertexColor;",
			"}"
		].join("\n"),
		fragment: [
			"#ifdef GL_ES",
			"precision highp float;",
			"#endif",

			"varying vec4 color;",

			"void main(void) {",
				"gl_FragColor = color;",
			"}"
		].join("\n")
	}
};
