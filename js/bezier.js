let p_arr = new Array();
var point_counter = 1;
let iterations = 5;
let bezierPoints = []
let secondPoint = new Array();

let bezierDiv = document.getElementById("myCanvasBezier");
bezierDiv.addEventListener("click", getClickPosition, false);
let rect = bezierDiv.getBoundingClientRect();
let ctx = document.getElementById("myCanvasBezier").getContext("2d");;

let x_bezier, y_bezier, keyDown = false, mouseDrag = false;

window.onbeforeunload = function(e){
    //scroll to the top page when refresh button is clicked
    window.scroll(0, 0);
}

bezierDiv.onmousedown = function(event) {
    keyDown = true;
    mouseDrag = false;
    x_bezier = event.clientX - rect.left;
    y_bezier = event.clientY - rect.top;
    if(keyDown && mouseDrag==false){
        makeBezier(event);
    }
}

bezierDiv.onmouseup = function() {
    keyDown = false;
}

bezierDiv.onmousemove = function(event){
    mouseDrag = true;
    if(keyDown && mouseDrag){
        if( x_bezier !== event.clientX - rect.left || y_bezier!== event.clientY - rect.top) {
            getClickPosition(event);
        }
    }
}

function clearCanvasBezier(bool_counter) {
    let ctx = document.getElementById("myCanvasBezier").getContext("2d");
    let main_canvas = document.getElementById("myCanvasBezier");
    ctx.clearRect(0, 0, main_canvas.width, main_canvas.height);
    if ( bool_counter ) {
        point_counter = 1; 
        p_arr = [];
    }
}

function drawInfo(){
    
    for (let j = 0; j < bezierPoints.length; j++) {
        if (j == 0) {
            ctx.moveTo(bezierPoints[j]['x'],bezierPoints[j]['y']);
        } else {
            ctx.lineTo(bezierPoints[j]['x'],bezierPoints[j]['y']);
        }
    }
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    for (var i = 0; i < p_arr.length; i++) {
        if (i == 0) {
            ctx.moveTo(p_arr[i]['x'],p_arr[i]['y']);
        } else {
            ctx.lineTo(p_arr[i]['x'],p_arr[i]['y']);
        }
    }
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    ctx.closePath();

    for (var i = 0; i < p_arr.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.fillStyle = "black";
        ctx.font = "bold 10pt Arial";
        ctx.fillText("Point"+(i+1),(p_arr[i]['x']+8),(p_arr[i]['y']+8));
        ctx.stroke();
        ctx.closePath();
    }

    for (var i = 0; i < p_arr.length; i++) {
        ctx.beginPath();
        ctx.rect(p_arr[i]['x'],p_arr[i]['y'],10,10);
        ctx.fillStyle = "#ffc107";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }   
}

function getClickPosition(e) {
    if(point_counter >= 5) {
        let x_move = event.clientX - rect.left;
        let y_move = event.clientY - rect.top + scrollY;

        if (Math.abs(x_move-p_arr[0]['x']) < 50 && Math.abs(y_move-p_arr[0]['y']) < 50) {
            // change the first point coordinate
            clearCanvasBezier(false);
            p_arr[0]['x'] = x_move;
            p_arr[0]['y'] = y_move;

            //clear the bezier points
            bezierPoints = [];
            bezierCreationFourPoints(p_arr[0], p_arr[1], p_arr[2], p_arr[3]);
            drawInfo();
        } else if (Math.abs(x_move-p_arr[1]['x']) < 50 && Math.abs(y_move-p_arr[1]['y']) < 50) {
            // change the second point coordinate
            clearCanvasBezier(false);
            p_arr[1]['x'] = x_move;
            p_arr[1]['y'] = y_move;

            //clear the bezier points
            bezierPoints = [];
            bezierCreationFourPoints(p_arr[0], p_arr[1], p_arr[2], p_arr[3]);
            drawInfo();
        } else if (Math.abs(x_move-p_arr[2]['x']) < 50 && Math.abs(y_move-p_arr[2]['y']) < 50) {
            // change the third point coordinate
            clearCanvasBezier(false);
            p_arr[2]['x'] = x_move;
            p_arr[2]['y'] = y_move;

            //clear the bezier points
            bezierPoints = [];
            bezierCreationFourPoints(p_arr[0], p_arr[1], p_arr[2], p_arr[3]);
            drawInfo();
        } else if (Math.abs(x_move-p_arr[3]['x']) < 50 && Math.abs(y_move-p_arr[3]['y']) < 50) {
            // change the fourth point coordinate
            clearCanvasBezier(false);
            p_arr[3]['x'] = x_move;
            p_arr[3]['y'] = y_move;

            //clear the bezier points
            bezierPoints = [];
            bezierCreationFourPoints(p_arr[0], p_arr[1], p_arr[2], p_arr[3]);
            drawInfo();
        }
    }
}

function GetMidPoint( controlPoint1, controlPoint2 )
{
    //get the mid point of two points
    x = ((controlPoint1['x'] + controlPoint2['x']) / 2);
    y = ((controlPoint1['y'] + controlPoint2['y']) / 2);
    
    return { x , y }
}

function PopulateBezierPoints(ctrl1, ctrl2, ctrl3, currIteration){
    if (currIteration < iterations) { 
        //calculate next mid points
        midPoint1 = GetMidPoint(ctrl1, ctrl2);
        midPoint2 = GetMidPoint(ctrl2, ctrl3);
        midPoint3 = GetMidPoint(midPoint1, midPoint2);

        //the next control point
        currIteration+= 0.5;  
        
        PopulateBezierPoints(ctrl1, midPoint1, midPoint3, currIteration);//left branch

        bezierPoints.push(midPoint3); //add the next control poin

        midPoint1 = GetMidPoint(ctrl1, ctrl2);
        midPoint2 = GetMidPoint(ctrl2, ctrl3);
        midPoint3 = GetMidPoint(midPoint1, midPoint2);
        
        PopulateBezierPoints(midPoint3, midPoint2, ctrl3, currIteration); //right branch

    }
}

function PopulateBezierPoints4P(ctrl1, ctrl2, ctrl3, ctrl4, currIteration){
    //to draw 
    if (currIteration < iterations) { 
        //calculate next mid points
        midPoint12 = GetMidPoint(ctrl1, ctrl2);
        midPoint23 = GetMidPoint(ctrl2, ctrl3);
        midPoint34 = GetMidPoint(ctrl3, ctrl4);
        midPoint123 = GetMidPoint(midPoint12, midPoint23);
        midPoint234 = GetMidPoint(midPoint23, midPoint34);
        pointMiddle = GetMidPoint(midPoint123, midPoint234);

        //the next control point
        currIteration+= 0.5;  
        
        PopulateBezierPoints4P(ctrl1, midPoint12, midPoint123, pointMiddle, currIteration);//left branch

        bezierPoints.push(pointMiddle); //add the next control poin

        midPoint12 = GetMidPoint(ctrl1, ctrl2);
        midPoint23 = GetMidPoint(ctrl2, ctrl3);
        midPoint34 = GetMidPoint(ctrl3, ctrl4);
        midPoint123 = GetMidPoint(midPoint12, midPoint23);
        midPoint234 = GetMidPoint(midPoint23, midPoint34);
        pointMiddle = GetMidPoint(midPoint123, midPoint234);

        PopulateBezierPoints4P(pointMiddle, midPoint234, midPoint34, ctrl4, currIteration); //right branch

    }
}


function bezierCreation( ctrl1, ctrl2, ctrl3 ){
    
    bezierPoints = new Array();
    bezierPoints.push(ctrl1);
    PopulateBezierPoints(ctrl1, ctrl2, ctrl3, 0.0);
    bezierPoints.push(ctrl3);

}

function bezierCreationFourPoints( ctrl1, ctrl2, ctrl3, ctrl4 ){
    bezierPoints = new Array();
    bezierPoints.push(ctrl1);
    PopulateBezierPoints4P(ctrl1, ctrl2, ctrl3, ctrl4, 0.0);
    bezierPoints.push(ctrl4);
}

function makeBezier(event) {

    let ctx = document.getElementById("myCanvasBezier").getContext("2d");
    let canvas = document.getElementById("myCanvasBezier");
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    ctx.lineWidth=1;
    ctx.lineCap="round";
    ctx.strokeStyle="#0000FF";
    
    if(point_counter == 1) {
        clearCanvasBezier(false);
        p_arr.push({x,y});
        ctx.beginPath(); 
        ctx.arc(x,y,1.5,0,2*Math.PI, false);
        ctx.fillStyle = "#ffc107";
        ctx.stroke();
        ctx.closePath();
        point_counter++;
    } else if (point_counter == 2) {
        p_arr.push({x,y});
        clearCanvasBezier(false);
        ctx.beginPath(); 
        ctx.moveTo(p_arr[0]['x'],p_arr[0]['y']); 
        ctx.lineTo(p_arr[1]['x'],p_arr[1]['y']);
        ctx.stroke();
        ctx.closePath();
        point_counter++;

    } else if (point_counter == 3) {
        p_arr.push({x,y});
        clearCanvasBezier(false);
        bezierCreation(p_arr[0], p_arr[1], p_arr[2]);
        drawInfo();
     
        point_counter++;
        
    } else if (point_counter == 4) {
        p_arr.push({x,y});
        clearCanvasBezier(false);
        bezierCreationFourPoints(p_arr[0], p_arr[1], p_arr[2], p_arr[3]);
        drawInfo();

        point_counter++;
    }
}