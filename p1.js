function main()
{
	// Retrieve <canvas> element
	var canvas = document.getElementById('webgl');

	// Get the rendering context for WebGL
	var gl = WebGLUtils.setupWebGL(canvas);
	if (!gl)
	{
		console.log('Failed to get the rendering context for WebGL');
		return;
	}

	// Initialize shaders
	program = initShaders(gl, "vshader", "fshader");
	gl.useProgram(program);

	//Set up the viewport
	gl.viewport( 0, 0, canvas.width, canvas.height );

	var points = [];
	points.push(vec4(-0.5, -0.5, 0.0, 1.0));
	points.push(vec4(0.5, -0.5, 0.0, 1.0));
	points.push(vec4(0.0, 0.5, 0.0, 1.0));

	var vBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

	var vPosition = gl.getAttribLocation(program, "vPosition")
	gl.enableVertexAttribArray(vPosition);
	gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

	var colors = [];
	colors.push(vec4(1.0, 0.0, 0.0, 1.0));
	colors.push(vec4(0.0, 1.0, 0.0, 1.0));
	colors.push(vec4(0.0, 0.0, 1.0, 1.0));

	var cBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

	var vColor = gl.getAttribLocation(program, "vColor")
	gl.enableVertexAttribArray(vColor);
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

	var vPointSize = gl.getUniformLocation(program, "vPointSize");
	gl.uniform1f(vPointSize, 20.0);

	//Set clear color
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.TRIANGLES, 0, points.length);


	window.onkeypress = function(event) {
		var key = event.key;
		switch(key) {
			case 'a':
				gl.clear(gl.COLOR_BUFFER_BIT);
				gl.drawArrays(gl.POINTS, 0, points.length);
				break;

			case 's':
				gl.clear(gl.COLOR_BUFFER_BIT);
				gl.drawArrays(gl.TRIANGLES, 0, points.length);
				break;
		}
	}

	window.onclick = function(event) {
		gl.clear(gl.COLOR_BUFFER_BIT);
	}
}
