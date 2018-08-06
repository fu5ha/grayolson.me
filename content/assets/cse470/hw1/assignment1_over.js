// Gray Olson
// CSE 470

var canvas;
var gl;

var points = [];
var colors = [];

var uProjLoc, uTimeLoc;
var initialTime;

var NumTimesToSubdivide = 6;

var DEBUG_LOG = false;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
        
    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three points.
    
    // HW470
    var sides = [
        [
            vec3( -1, 0, -1 ),
            vec3(  0, 1,  0 ),
            vec3(  1, 0, -1 ),
        ],
        [
            vec3( -1, 0,  1 ),
            vec3(  0, 1,  0 ),
            vec3( -1, 0, -1 ),
        ],
        [
            vec3( -1, 0, 1 ),
            vec3(  0, 1, 0 ),
            vec3(  1, 0, 1 ),
        ],
        [
            vec3( 1, 0,  1 ),
            vec3( 0, 1,  0 ),
            vec3( 1, 0, -1 ),
        ],
    ];

    divideTriangle( sides[0][0], sides[0][1], sides[0][2],
                    NumTimesToSubdivide, vec3(1.0, 0.3, 0.0));
    divideTriangle( sides[1][0], sides[1][1], sides[1][2],
                    NumTimesToSubdivide, vec3(0.0, 1.0, 0.3));
    divideTriangle( sides[2][0], sides[2][1], sides[2][2],
                    NumTimesToSubdivide, vec3(0.0, 0.3, 1.0));
    divideTriangle( sides[3][0], sides[3][1], sides[3][2],
                    NumTimesToSubdivide, vec3(0.3, 0.0, 1.0));

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.21, 0.2, 0.25, 1.0 );
    gl.enable(gl.DEPTH_TEST);

    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    // HW470
    // Create vertex buffer containing position and color data and send initial values
    var vBuff = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuff );
    gl.bufferData( gl.ARRAY_BUFFER, packData(flatten(points), flatten(colors)), gl.STATIC_DRAW );

    // Associate vPosition attribute in shader to the buffer
    var vPosLoc = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosLoc, 3, gl.FLOAT, false, 6 * 4, 0 );
    gl.enableVertexAttribArray( vPosLoc );

    // Associate vColor attribute in shader to the buffer
    var vColLoc = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColLoc, 3, gl.FLOAT, false, 6 * 4, 3 * 4 );
    gl.enableVertexAttribArray( vColLoc );

    // setup uniforms
    var uResLoc = gl.getUniformLocation( program, "uResolution" );
    uProjLoc = gl.getUniformLocation( program, "uProjection" );
    uTimeLoc = gl.getUniformLocation( program, "uTime" );

    var aspect = canvas.width/canvas.height;
    var proj = ortho(-1.5 * aspect, 1.5 * aspect, -1.5, 1.5, -5, 5);
    initialTime = (new Date()).getTime() / 1000;
    gl.uniformMatrix4fv(uProjLoc, false, flatten(proj));
    gl.uniform1f(uTimeLoc, 0.0);
    gl.uniform2f(uResLoc, canvas.width, canvas.height);

    render();
};

// HW470
function packData(verts, cols) {
    var length = verts.length + cols.length;
    var b = new Float32Array(length);
    for (var i = 0; i<verts.length/3; i++) {
        b[i*6] = verts[i*3];
        b[i*6 + 1] = verts[i*3 + 1];
        b[i*6 + 2] = verts[i*3 + 2];
        b[i*6 + 3] = cols[i*3];
        b[i*6 + 4] = cols[i*3 + 1];
        b[i*6 + 5] = cols[i*3 + 2];
    }
    return b;
}

// HW470
function printColor(c) {
    console.log(`Color r: ${c[0]} g: ${c[1]} b: ${c[2]}`);
}

// HW470
function clipToColor(v, col) {
    var conv = add(scale(0.5, v), vec3(0.5, 0.5, 0.5));
    return vec3(conv[0]*col[0], conv[1]*col[1], conv[2]*col[2]);
}

function triangle( a, b, c )
{
    points.push( a, b, c );
}

function divideTriangle( a, b, c, count, col )
{

    // check for end of recursion
    
    if ( count === 0 ) {
        triangle( a, b, c );
        // HW470
        var colA = clipToColor(a, col);
        var colB = clipToColor(b, col);
        var colC = clipToColor(c, col);
        colors.push( colA, colB, colC );
        if (DEBUG_LOG) {
            console.log("New triangle, vertex colors:");
            printColor(colA);
            printColor(colB);
            printColor(colC);
        }
    }
    else {
    
        //bisect the sides
        
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var bc = mix( b, c, 0.5 );

        --count;

        // three new triangles
        
        divideTriangle( a, ab, ac, count, col );
        divideTriangle( c, ac, bc, count, col );
        divideTriangle( b, bc, ab, count, col );
    }
}

function render()
{
    // HW470
    var curTime = (new Date()).getTime() / 1000;
    var elapsed = curTime - initialTime;
    gl.uniform1f(uTimeLoc, elapsed);
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
    window.requestAnimationFrame(render);
}

