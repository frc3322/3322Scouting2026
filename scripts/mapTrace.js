const mapTrace = document.querySelector(".trace");
var field = document.querySelector(".fieldImg");
var initial = [0,0];
// storagePath is the one storing the path use this in data handler
var storagePath = [];
var cssField = getComputedStyle(field);
var boolean = false;

mapTrace.width = parseInt(cssField.getPropertyValue("width"));
mapTrace.height = parseInt(cssField.getPropertyValue("height"));

mapTrace.addEventListener("mousedown", (e) => {
    // console.log("sus");
    // // var c = document.getElementById("myCanvas");
    // var ctx = mapTrace.getContext("2d");
    // // ctx.beginPath();
    initial[0] = getMousePos(mapTrace, e).x;
    initial[1] = getMousePos(mapTrace, e).y;
    storagePath.push(initial[0], initial[1]);
    boolean = true;


})

mapTrace.addEventListener("mousemove", (e) =>{
    if(boolean == true){
        repeatedPaths(e);
    }
});

mapTrace.addEventListener("mouseup", (e) => {
    // var ctx = mapTrace.getContext("2d");
    // ctx.beginPath();
    // ctx.moveTo(initial[0], initial[1]);
    // ctx.lineTo(getMousePos(mapTrace, e).x, getMousePos(mapTrace, e).y );
    // ctx.stroke();
    initial[0] = getMousePos(mapTrace, e).x;
    initial[1] = getMousePos(mapTrace, e).y;
    storagePath.push(initial[0], initial[1]);
    boolean = false;
});

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function repeatedPaths(e){
    var ctx = mapTrace.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(initial[0], initial[1]);
    ctx.lineTo(getMousePos(mapTrace, e).x, getMousePos(mapTrace, e).y );
    initial[0] = getMousePos(mapTrace, e).x;
    initial[1] = getMousePos(mapTrace, e).y;
    storagePath.push(initial[0], initial[1]);
    ctx.stroke();
    console.log(storagePath);

}



// setInterval(repeatedPaths, 1000);