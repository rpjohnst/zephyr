zephyr.Events = function (canvas) {
	var keys = this.keys = {};
	document.onkeydown = function (event) {
		event = event || window.event;
		var key = event.keyCode || event.which;
		
		keys[key] = true;
		return false;
	};
	document.onkeyup = function (event) {
		event = event || window.event;
		var key = event.keyCode || event.which;
		
		keys[key] = false;
		return false;
	};

	var mouse = this.mouse = { x: 0, y: 0 };
	document.onmousemove = function (event) {
		event = event || window.event;
		mouse.x = event.pageX - canvas.offsetLeft;
		mouse.y = event.pageY - canvas.offsetTop;
	};

	canvas.oncontextmenu = function (event) {
		return false;
	};
}

zephyr.Events.prototype.update = function (square) {
	if (this.keys['D'.charCodeAt(0)]) square.x += 4;
	if (this.keys['A'.charCodeAt(0)]) square.x -= 4;
	if (this.keys['S'.charCodeAt(0)]) square.y += 4;
	if (this.keys['W'.charCodeAt(0)]) square.y -= 4;
};
