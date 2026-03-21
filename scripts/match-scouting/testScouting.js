import { DataContainer } from "../data/DataContainer.js";
import { DataHandler } from "../data/DataHandler.js";


var dataContainer = new DataContainer();
var dataHandler = new DataHandler(dataContainer);
try{
    dataHandler = window.parent.dataHandler;
    dataContainer = dataHandler.getDataContainer();
}
catch{}

const values = [
    dataContainer.teleScored,
    dataContainer.telePassed,
    0
];

var rate = 0;

const modes = {
    shoot : 0,
    pass : 1,
    shuttle : 2,
    delete : 3
};
var mode = modes.shoot;

const accuracySlider = document.getElementById("accuracy-slider");



const counter = document.getElementById('fuelCounter');

const buttons = [
    document.getElementById("fuel-button"),
    document.getElementById("pass-button")
];

function setMode(val){
    mode = val;
    ballList = [];
}

var shootInterval = null;

function updateRate(i){

    clearInterval(shootInterval);
    if(i != 0){
        shootInterval = setInterval(increment , 1000/i)
    }
}

function increment(){
    newBall()
    let currentMode = mode;
    values[currentMode]++;
    updateDataHandler();
}

function updateDataHandler(){
    dataHandler.setTeleScored(values[0]);
    dataHandler.setTelePassed(values[1]);
}









var ball = new Image;
ball.src = '../images/ball.svg'

var bobot = new Image;
bobot.src = '../images/bobot.png'
bobot.onload = () => {
};

var hub = new Image;
hub.src = '../images/hub.svg'
hub.onload = () => {
};


var ballList = []


let previousFrame;

function draw(timeStamp) {
    if (previousFrame == null) {
        previousFrame = timeStamp;
    }


    for (let i = ballList.length - 1; i >= 0; i--) {
        let vx = ballList[i][2] * s;
        let vy = ballList[i][3] * s;
        let speed = (timeStamp - previousFrame) * 0.07;
        ctx.drawImage(ball, ballList[i][0], ballList[i][1], 60 * s, 60 * s);
        ballList[i][0] += vx * speed;
        let t = (ballList[i][0] - 140 * s) * s / vx
        ballList[i][1] += (t - vy) * speed;
        if (ballList[i][1] > canvas.height - 100 * s &&
            ballList[i][0] > canvas.width - 375 * s) {
            ballList.shift();
        }
    }

    var textWidth;
    if(mode == modes.pass){
        ctx.drawImage(hub, canvasWidth - 725 * s, canvasHeight - 400 * s, 400 * s, 400 * s);
        textWidth = ctx.measureText("" + values[mode]).width;
        ctx.fillText(values[mode], canvasWidth - (515) * s - textWidth / 2, canvasHeight - 100 * s);
    }

    if(mode == modes.delete){
        ctx.fillStyle = "#FFFFFF";

        textWidth = ctx.measureText("Shot: " + values[0]).width;
        ctx.fillText("Shot: " + values[0], canvasWidth - (215) * s - textWidth / 2, canvasHeight - 100 * s);

        textWidth = ctx.measureText("Passed: " + values[1]).width;
        ctx.fillText("Passed: " + values[1], canvasWidth - (515) * s - textWidth / 2, canvasHeight - 100 * s);
        
        ctx.fillStyle = "#000000";
    }

    
    

    previousFrame = timeStamp;
    
    window.requestAnimationFrame(draw);
}

var multitapTimer;
var multitap = false;

function setButtons() {
    document.getElementById("+1").addEventListener("click", function () {
        changeCount(1);
    });
    document.getElementById("+5").addEventListener("click", function () {
        changeCount(5);
    });
    document.getElementById("+10").addEventListener("click", function () {
        changeCount(10);
    });
    document.getElementById("+25").addEventListener("click", function () {
        changeCount(25);
    });
    document.getElementById("-1").addEventListener("click", function () {
        changeCount(-1);
    });

    


    for(let i = 0; i < toggles.length; i++){
        toggles[i].addEventListener('mousedown', () => {
            setMode(i);
        })
    }
    
    
    
    
    // Passed buttons
    
    

    

}

function changeCount(amount) {
    dataHandler.incTeleScored(amount);
    document.getElementById("fuelCounter").textContent = dataContainer.teleScored;
    
    
}

function newBall() {
    ballList.push([140 * s, canvasHeight - 120 * s, (12 + (Math.random())), (30 + Math.random())]);
}



setMode(modes.shoot);
setButtons();


window.parent.postMessage("loaded")