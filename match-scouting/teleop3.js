import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler();
dataHandler.loadData(localStorage.getItem("dataHandler"));

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var teleFuel = 0;

var slider = document.getElementById("slider");
var sliderNumber = document.getElementById("sliderNumber");

const canvasHeight = window.innerWidth * (620/1080) * 0.75;
const canvasWidth = window.innerWidth * 0.75;

ctx.canvas.height  = canvasHeight ;
ctx.canvas.width = canvasWidth;

var ball = new Image;
ball.src = '../images/ball.svg'

var bobot = new Image;
bobot.src = '../images/bobot.svg'
bobot.onload = () => {  
        ctx.drawImage(bobot, 0, canvasHeight - 300*s, 300, 300);  
      };


var hub = new Image;
hub.src = '../images/hub.svg'
hub.onload = () => {  
        ctx.drawImage(hub, canvasWidth-300, canvasHeight - 300, 300, 300);  
      };



const s = canvasWidth/1080;

console.log(canvasHeight, canvasWidth);

var ballList = [[140*s,canvasHeight-120*s]]

function updateDataHandler(){
    localStorage.setItem("dataHandler", dataHandler.toString());
}

ctx.font = "" + (40 * s) + "px sans-serif";
function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
  
    
    for(let i = ballList.length-1; i >= 0; i--){
        
        ctx.drawImage(ball, ballList[i][0], ballList[i][1], 50*s, 50*s);
        ballList[i][0] += 13*s;
        let t = (ballList[i][0]-140*s)/13
        ballList[i][1] += t - 30*s;
        if(ballList[i][1] > canvas.height-200*s && 
            ballList[i][0] > canvas.width-400*s){
            ballList.shift();
            teleFuel += 1;
        }
    }

    ctx.drawImage(bobot, 0, canvasHeight - 300*s, 300*s, 300*s);
    ctx.drawImage(hub, canvasWidth-425*s, canvasHeight - 400*s, 400*s, 400*s); 
    
    var textWidth = ctx.measureText("" + teleFuel ).width;

    ctx.fillText(teleFuel, canvasWidth-(215)*s - textWidth/2, canvasHeight - 100*s);
    console.log("fwie")

    
    window.requestAnimationFrame(draw);
}

function setButtons() {

}

function newBall(){
    ballList.push([140*s,canvasHeight-120*s]);
}

var shootInterval = setInterval(newBall, 1000);
clearInterval(shootInterval);

var currentSliderValue = 0;

function updateRate(){
    if(slider.value != 0){ 
        if(currentSliderValue != slider.value){
            clearInterval(shootInterval);
            shootInterval = setInterval(newBall, Math.sqrt(100/slider.value)*100);
            currentSliderValue = slider.value;
        }   
    }
    else{
        clearInterval(shootInterval);
    }
    sliderNumber.textContent =  Math.sqrt(slider.value).toFixed(2) + " b/s";
}

function init(){
    window.requestAnimationFrame(draw);
    setInterval(updateRate, 250);
}

init();

/*
function dragDot(x,y){
    if(mouseDown){
        dot.style.left = (x-dot.offsetWidth/2) + "px";
        dot.style.top = (y-dot.offsetHeight/2) + "px";
        
    }
    
}


dot.addEventListener("mousedown", () => {
    mouseDown = true;
});

dot.addEventListener("mouseup", () => {
    mouseDown = false;
});

document.addEventListener("mousemove", (e)=>{
    dragDot(e.clientX, e.clientY);
});

*/

setButtons();
