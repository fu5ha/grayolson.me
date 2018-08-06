// Gray Olson
// CSE 470
var canvas;
var gl;

var points = [];
var colors = [];

var NumTimesToSubdivide = 5;

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
    var vertices = [
        vec2( 1, 0 ),
        vec2(  0,  1 ),
        vec2(  -0.5, -0.5 )
    ];
    // vertices.forEach(function(v) {
    //     printVert(v);
    // });

    divideTriangle( vertices[0], vertices[1], vertices[2],
                    NumTimesToSubdivide);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    // HW470 rest
    // Create vertex position buffer and send initial data
    var vPosBuff = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vPosBuff );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate vPosition attribute in shader to the buffer
    var vPosLoc = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosLoc, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosLoc );

    // Create vertex color buffer and send initial data
    var vColorBuff = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vColorBuff );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    // Associate vColor attribute in shader to the buffer
    var vColLoc = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColLoc, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColLoc );

    render();
};

// HW470
function printVert(v) {
    console.log(`Vertex x: ${v[0]} y: ${v[1]}`);
}

// HW470
function printColor(c) {
    console.log(`Color r: ${c[0]} g: ${c[1]} b: ${c[2]}`);
}

// HW470
function clipToColor(v) {
    var conv = add(scale(0.5, v), vec2(0.5, 0.5));
    return vec3(conv[0], conv[1], 0.0);
}

function triangle( a, b, c )
{
    points.push( a, b, c );
}

function divideTriangle( a, b, c, count )
{

    // check for end of recursion
    
    if ( count === 0 ) {
        triangle( a, b, c );
        // HW470
        var colA = clipToColor(a);
        var colB = clipToColor(b);
        var colC = clipToColor(c);
        colors.push( colA, colB, colC );
        // console.log("New triangle, vertex colors:");
        // printColor(colA);
        // printColor(colB);
        // printColor(colC);
    }
    else {
    
        //bisect the sides
        
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var bc = mix( b, c, 0.5 );

        --count;

        // three new triangles
        
        divideTriangle( a, ab, ac, count );
        divideTriangle( c, ac, bc, count );
        divideTriangle( b, bc, ab, count );
    }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}

