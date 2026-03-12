import { ActionType } from "../../Constants.js";
import { DataHandler } from "../../DataHandler.js";



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
bobot.src = '../images/bobot.png'
bobot.onload = () => {  
        ctx.drawImage(bobot, 0, canvasHeight - 300*s, 300, 300);  
      };


var hub = new Image;
hub.src = '../images/hub.svg'
hub.onload = () => {  
        ctx.drawImage(hub, canvasWidth-300, canvasHeight - 300, 300, 300);  
      };



const s = canvasWidth/1080;

var ballList = []



ctx.font = "" + (40 * s) + "px sans-serif";
function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
  
    
    for(let i = ballList.length-1; i >= 0; i--){
        let vx = ballList[i][2]*s;
        let vy = ballList[i][3]*s;
        ctx.drawImage(ball, ballList[i][0], ballList[i][1], 60*s, 60*s);
        ballList[i][0] += vx;
        let t = (ballList[i][0]-140*s)/13
        ballList[i][1] += t - vy;
        if(ballList[i][1] > canvas.height-200*s && 
            ballList[i][0] > canvas.width-400*s){
            ballList.shift();
        }
    }

    ctx.drawImage(bobot, 0, canvasHeight - 300*s, 300*s, 300*s);
    ctx.drawImage(hub, canvasWidth-425*s, canvasHeight - 400*s, 400*s, 400*s); 
    
    
    setText(Math.round(teleFuel));

    
    window.requestAnimationFrame(draw);
}

const buttonDenoms = [5,10,15,20,30]

function setButtons() {
    document.getElementById("canvas").addEventListener("mousedown", newBall);

    for(const buttonid of buttonDenoms){
        const button = document.getElementById("bps" + buttonid);
        button.addEventListener("mousedown",()=>{updateRate(buttonid);});
        button.addEventListener("mouseup", ()=>{updateRate(0);});
        button.addEventListener("mouseleave", ()=>{updateRate(0);});

        button.addEventListener("touchstart",()=>{updateRate(buttonid);});
        button.addEventListener("touchend", ()=>{updateRate(0);});
        button.addEventListener("touchmove", ()=>{updateRate(0);});
    }
    


}

function newBall(){
    ballList.push([140*s,canvasHeight-120*s, 15+(Math.random())*2, 30+Math.random()*2]);
    setTimeout(()=>{teleFuel += 1;},900);
}

var shootInterval = setInterval(newBall, 1000);
clearInterval(shootInterval);


function updateRate(rate){
    if(rate != 0){
        newBall();
        clearInterval(shootInterval);
        shootInterval = setInterval(newBall, 1000/rate); 
    }
    else{
        clearInterval(shootInterval);
        console.log("lalala");
    }
}


function setText(text){
    var textWidth = ctx.measureText("" + text).width;
    ctx.fillText(text, canvasWidth-(215)*s - textWidth/2, canvasHeight - 100*s);
}

function init(){
    window.requestAnimationFrame(draw);
}

init();


setButtons();
