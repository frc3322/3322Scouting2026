import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler();
dataHandler.loadData(localStorage.getItem("dataHandler"));

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var teleFuel = 0;
var telePass = 0;
var teleTest = 3322;

var slider = document.getElementById("slider")

const canvasHeight = window.innerWidth * (620/1080) * 0.75;
const canvasWidth = window.innerWidth * 0.75;

ctx.canvas.height  = canvasHeight ;
ctx.canvas.width = canvasWidth;

var ball = new Image;
ball.src = '../images/ball.svg'

var rate = 0;
var mode = 0;

const buttonContainers = document.getElementById("buttons").children;
const buttons = [
        document.getElementById("fuel-button"),
        document.getElementById("pass-button"),
        document.getElementById("test-button"),
    ];
const rateButton = document.getElementById("rate-button");
const toggles = document.getElementById("toggles").children

var button;

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

function updateDataHandler(){
    localStorage.setItem("dataHandler", dataHandler.toString());
}

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



function setButtons() {
    //document.getElementById("canvas").addEventListener("mousedown", increment);

    document.getElementById("canvas").addEventListener('touchstart', function (e) {
        for(var touch of e.touches){
            increment();
            console.log("touched");
        }
    });
    
    for(let i = 0; i < toggles.length; i++){
        toggles[i].addEventListener("mousedown",()=>{setMode(i);})
    }

    var buttons = [
        document.getElementById("fuel-button"),
        document.getElementById("pass-button"),
        document.getElementById("test-button"),
    ];
    
    for(const button of buttons){
        button.addEventListener("mousedown",()=>{updateRate(rate);});
        button.addEventListener("mouseup", ()=>{updateRate(0);});
        button.addEventListener("mouseleave", ()=>{updateRate(0);});

        button.addEventListener("touchstart",()=>{updateRate(rate);});
        button.addEventListener("touchend", ()=>{updateRate(0);});
        button.addEventListener("touchmove", ()=>{updateRate(0);});
    }

    
    rateButton.addEventListener("mousedown", ()=>{
        startRate()
        teleTest = 0;
    });

    slider.addEventListener("input", ()=>{
        rate = slider.value/5
        button.textContent = rate.toFixed(2) + " bps";
    })

}

function newBall(){
    ballList.push([140*s,canvasHeight-120*s, 15+(Math.random())*2, 30+Math.random()*2]);
}

function increment(){
    if(mode == 0){
        setTimeout(()=>{teleFuel += 1;},900);
    }
    if(mode == 1){
        //setTimeout(()=>{ += 1;},900);
    }
    if(mode == 2){
        if(teleTest == 0){
            measureRate();
        }
        teleTest += 1;
    }
    newBall();
}

function startRate(){
    rateButton.style.backgroundColor =  "rgb(161, 27, 27)";
    rateButton.textContent =  "Quit";
    rateButton.style.color = "#E1E1E1";
    buttons[2].textContent = "5.0";
}

function endRate(){
    rateButton.style.backgroundColor =  "rgb(187, 187, 187)";
    rateButton.style.color = "#000000";
    rateButton.textContent =  "Measure Rate";
    buttons[2].style.backgroundColor = "rgb(187, 187, 187)";
    
}

var shootInterval = setInterval(increment, 1000);
clearInterval(shootInterval);


function updateRate(rate){
    if(rate != 0){
        shootInterval = setInterval(increment, 1000/rate); 
    }
    else{
        clearInterval(shootInterval);
    }
}

function measureRate(){
    teleTest = 0;

    var time = 5;
    var rateStartTime = Date.now();
    var rateInterval = setInterval(()=>{
        buttons[2].textContent = time.toFixed(2);
        time = 5 + (rateStartTime - Date.now())/1000;
        if(time<=0){
            clearInterval(rateInterval);
            rate = (teleTest / 5);
            slider.value = rate;
            button.textContent = rate.toFixed(2) + " bps";
            endRate();
        }
    },10);

    setTimeout(() =>{
        
    }, 5000);
}

function setMode(m){
    mode = m;
    for(let i = 0; i < buttonContainers.length; i++){
        if(i != m){
            buttonContainers[i].style.display = "none"
        }
        else{
            buttonContainers[i].style.display = "flex"
            button = buttonContainers[i].children[0];
            button.textContent = rate.toFixed(2) + " bps";
        }
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
setMode(2);