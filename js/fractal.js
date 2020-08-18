var status_first = true;
let last_x, last_y, x = 0, y = 0;
let fractal_angle, fractal_distance;

function clearCanvasFractal(bool_counter) {
    let ctx = document.getElementById("myCanvasFractal").getContext("2d");
    let main_canvas = document.getElementById("myCanvasFractal");
    ctx.clearRect(0, 0, main_canvas.width, main_canvas.height);
    if ( bool_counter ) {
        status_first = true;
        point_counter = 1; 
        p_arr = [];
    }
}

function newPointFractal(){
    status_first = true;
}

function drawFractal(event) {
    let polygons_number = document.getElementById('polygons').value;
    let depth_value = document.getElementById('depth').value;
    let ctx = document.getElementById("myCanvasFractal").getContext("2d");
    let canvas = document.getElementById("myCanvasFractal");
    let rect = canvas.getBoundingClientRect();

    x = event.clientX - rect.left;
    y = event.clientY - rect.top;

    ctx.lineWidth=1;
    
    if(status_first) {
        last_x = x;
        last_y = y;
        status_first = false;
        ctx.beginPath();
        ctx.arc(x,y,1.5,0,2*Math.PI, false);
        ctx.fillStyle = "#ffc107";
        ctx.stroke();
        ctx.closePath();
    } else {
        main_canvas = document.getElementById("myCanvasFractal");
        context = main_canvas.getContext('2d');

        fractal_angle = calculateFractalAngle([last_x, last_y], [x,y]);
        fractal_distance = calculateFractalDistance([last_x, last_y], [x,y]);

        context.beginPath();
        context.stroke();
        context.closePath();

        drawFractalPolygon(polygons_number, depth_value, fractal_distance);
       
    } 
    
    // move forward the given amount, with the pen down
    function goForward(step) {
        let oldx = last_x;
        let oldy = last_y;
        x = last_x + step * Math.cos(fractal_angle * (Math.PI/180));
        y = last_y + step * Math.sin(fractal_angle * (Math.PI/180));

        DrawingLine(oldx, oldy, x, y);
        last_x = x;
        last_y = y;
    }

    // rotate orientation delta degrees counterclockwise
    function turnLeftAngle(delta) {
        fractal_angle = fractal_angle - delta;
    }

    // rotate orientation delta degrees clockwise
    function turnRightAngle(delta) {
        fractal_angle = fractal_angle + delta;
    }


    function DrawingLine(oldx, oldy, x, y){
        context.beginPath();
        context.strokeStyle = "black";

        context.moveTo(oldx, oldy);
        context.lineTo(x,y);
        context.stroke();
        context.closePath();
    }

    function calculateFractalAngle(startPoint, endPoint) {
        return 180.0 / Math.PI * Math.atan2(endPoint[1] - startPoint[1], endPoint[0] - startPoint[0] );
    }

    function calculateFractalDistance(startPoint, endPoint) {
        return Math.sqrt(Math.pow(startPoint[1] - endPoint[1], 2) + Math.pow(startPoint[0] -  endPoint[0], 2));
    }


    function drawFractalPolygon(polygons_number, depth_value, fractal_distance){
        if (polygons_number == 3) drawFractalPolygon3(depth_value, fractal_distance)
        else if (polygons_number == 4) drawFractalPolygon4(depth_value, fractal_distance)
        else if (polygons_number == 5) drawFractalPolygon5(depth_value, fractal_distance)
        else if (polygons_number == 6) drawFractalPolygon6(depth_value, fractal_distance)
        else if (polygons_number == 'Fractal Type 2') drawFractalType2(depth_value, fractal_distance)
    }

    function drawFractalPolygon3(depth_value, fractal_distance){
        if ( depth_value == 0) goForward(fractal_distance);
        if ( depth_value > 0 ) {
            drawFractalPolygon3(depth_value - 1, fractal_distance / 3);
            turnLeftAngle(60);
            drawFractalPolygon3(depth_value - 1, fractal_distance / 3);
            turnRightAngle(120);
            drawFractalPolygon3(depth_value - 1, fractal_distance / 3);
            turnLeftAngle(60);
            drawFractalPolygon3(depth_value - 1, fractal_distance / 3);        
        }
    }

    function drawFractalPolygon4(depth_value, fractal_distance) {
        if ( depth_value == 0) goForward(fractal_distance);
        if ( depth_value > 0 ) {
            drawFractalPolygon4(depth_value - 1, fractal_distance / 3);
            turnLeftAngle(90);
            drawFractalPolygon4(depth_value - 1, fractal_distance / 3);
            turnRightAngle(90);
            drawFractalPolygon4(depth_value - 1, fractal_distance / 3);
            turnRightAngle(90);
            drawFractalPolygon4(depth_value - 1, fractal_distance / 3);
            turnLeftAngle(90);
            drawFractalPolygon4(depth_value - 1, fractal_distance / 3);        
        }
    }

    function drawFractalPolygon5(depth_value, fractal_distance) {
        if ( depth_value == 0) goForward(fractal_distance);
        if ( depth_value > 0 ) {
            drawFractalPolygon5(depth_value - 1, fractal_distance / 3);
            turnLeftAngle(108);
            drawFractalPolygon5(depth_value - 1, fractal_distance / 3);
            turnRightAngle(72);
            drawFractalPolygon5(depth_value - 1, fractal_distance / 3);
            turnRightAngle(72);
            drawFractalPolygon5(depth_value - 1, fractal_distance / 3);
            turnRightAngle(72);
            drawFractalPolygon5(depth_value - 1, fractal_distance / 3);
            turnLeftAngle(108);
            drawFractalPolygon5(depth_value - 1, fractal_distance / 3);        
        }
    }

    function drawFractalPolygon6(depth_value, fractal_distance) {
        if ( depth_value == 0) goForward(fractal_distance);
        if ( depth_value > 0 ) {
            drawFractalPolygon6(depth_value - 1, fractal_distance / 3);
            turnLeftAngle(120);
            drawFractalPolygon6(depth_value - 1, fractal_distance / 3);
            turnRightAngle(60);
            drawFractalPolygon6(depth_value - 1, fractal_distance / 3);
            turnRightAngle(60);
            drawFractalPolygon6(depth_value - 1, fractal_distance / 3);
            turnRightAngle(60);
            drawFractalPolygon6(depth_value - 1, fractal_distance / 3);
            turnRightAngle(60);
            drawFractalPolygon6(depth_value - 1, fractal_distance / 3);
            turnLeftAngle(120);
            drawFractalPolygon6(depth_value - 1, fractal_distance / 3);        
        }
    }

    function drawFractalType2(depth_value, fractal_distance) {
        if ( depth_value == 0) goForward(fractal_distance);
        if ( depth_value > 0 ) {
            drawFractalType2(depth_value - 1, fractal_distance / 4);
            turnLeftAngle(90);
            drawFractalType2(depth_value - 1, fractal_distance / 4);
            turnRightAngle(90);
            drawFractalType2(depth_value - 1, fractal_distance / 4);
            turnRightAngle(90);
            drawFractalType2(depth_value - 1, fractal_distance / 4);
            drawFractalType2(depth_value - 1, fractal_distance / 4);
            turnLeftAngle(90);
            drawFractalType2(depth_value - 1, fractal_distance / 4);
            turnLeftAngle(90);
            drawFractalType2(depth_value - 1, fractal_distance / 4);
            turnRightAngle(90);
            drawFractalType2(depth_value - 1, fractal_distance / 4);        
        }
    }
} 