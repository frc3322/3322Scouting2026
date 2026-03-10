import { DataContainer } from "../data/DataContainer.js";
import { DataHandler } from "../data/DataHandler.js";

var dataContainer = new DataContainer();
var dataHandler = new DataHandler(dataContainer);

try{
    dataHandler = window.parent.dataHandler;
    dataContainer = dataHandler.getDataContainer();
}
catch{}


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var scored = dataContainer.teleScored;
var passed = dataContainer.telePassed;
var teleTest = 3322;

var slider = document.getElementById("slider")

const rect = canvas.getBoundingClientRect();

var canvasHeight = rect.height;
var canvasWidth = rect.width;

ctx.canvas.height = canvasHeight;
ctx.canvas.width = canvasWidth;


var ball = new Image;
ball.src = '/images/ball.svg'

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
bobot.src = '/images/bobot.png'
bobot.onload = () => {
    ctx.drawImage(bobot, 0, canvasHeight - 300 * s, 300, 300);
};


var hub = new Image;
hub.src = '/images/hub.svg'
hub.onload = () => {
    ctx.drawImage(hub, canvasWidth - 300, canvasHeight - 300, 300, 300);
};



const s = canvasWidth / 1080;

var ballList = []

ctx.font = "" + (40 * s) + "px sans-serif";

let previousFrame;

function draw(timeStamp) {
    if (previousFrame == null) {
        previousFrame = timeStamp;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = ballList.length - 1; i >= 0; i--) {
        let vx = ballList[i][2] * s;
        let vy = ballList[i][3] * s;
        let speed = (timeStamp - previousFrame) * 0.07;
        ctx.drawImage(ball, ballList[i][0], ballList[i][1], 60 * s, 60 * s);
        ballList[i][0] += vx * speed;
        let t = (ballList[i][0] - 140 * s) * s / vx
        ballList[i][1] += (t - vy) * speed;
        if (ballList[i][1] > canvas.height - 200 * s &&
            ballList[i][0] > canvas.width - 400 * s) {
            ballList.shift();
        }
    }

    ctx.drawImage(bobot, 0, canvasHeight - 300 * s, 300 * s, 300 * s);
    ctx.drawImage(hub, canvasWidth - 425 * s, canvasHeight - 400 * s, 400 * s, 400 * s);

    if(window.parent.activeFrame == 2){
        setText()
    }
    previousFrame = timeStamp;
    
    window.requestAnimationFrame(draw);

    console.log(window.framesLoaded);
}



var multitap = false;
var multitapTimer = null;

function setButtons() {
    //document.getElementById("canvas").addEventListener("mousedown", increment);

    document.getElementById("canvas").addEventListener('touchstart', function (e) {
        clearTimeout(multitapTimer);
        multitapTimer = setTimeout(()=>{
            multitap = true;
            console.log(multitap);
        }, 200);
        if(multitap){
            for(let i = 0; i < e.touches.length; i++){
                increment();
            }
        }
    });

    document.getElementById("canvas").addEventListener('touchend', function (e) {
        
        if(multitap){
            if(e.touches.length == 0){
                multitap = false;
            }
            console.log(multitap);
        }
        else{
            clearTimeout(multitapTimer);
            increment();
        }
    });

    for (let i = 0; i < toggles.length; i++) {
        toggles[i].addEventListener("mousedown", () => { setMode(i); })
    }

    var buttons = [
        document.getElementById("fuel-button"),
        document.getElementById("pass-button"),
        document.getElementById("test-button"),
    ];

    for (const button of buttons) {

        button.addEventListener("mousedown", () => { updateRate(rate); });
        button.addEventListener("mouseup", () => { updateRate(0); });
        button.addEventListener("mouseleave", () => { updateRate(0); });

        button.addEventListener("touchstart", () => { updateRate(rate); });
        button.addEventListener("touchend", () => { updateRate(0); });
        button.addEventListener("touchmove", () => { updateRate(0); });
    }


    rateButton.addEventListener("mousedown", () => {
        if (!measuringRate) {
            startRate()
            teleTest = 0;
        }
        else {
            endRate()
            teleTest = 3322;
        }
    });

    slider.addEventListener("input", () => {
        updateButtonText()
    })

}

function updateButtonText() {
    rate = slider.value / 5
    button.textContent = rate.toFixed(2) + " bps";
}

function newBall() {
    ballList.push([140 * s, canvasHeight - 120 * s, (12 + (Math.random())), (30 + Math.random() * 2)]);
}

function increment() {
    if (mode == 0) {
        setTimeout(() => {
            scored += 1;
            dataHandler.incTeleScored(1);
        }, 900);
    }
    if (mode == 1) {
        setTimeout(() => {
            passed += 1;
            dataHandler.incTeleScored(1);
        }, 900);
    }
    if (mode == 2) {
        if (teleTest == 0) {
            measureRate();
        }
        teleTest += 1;
    }
    newBall();
}

var measuringRate = false;

function startRate() {
    measuringRate = true;
    rateButton.style.backgroundColor = "rgb(161, 27, 27)";
    rateButton.textContent = "Quit";
    rateButton.style.color = "#E1E1E1";
    buttons[2].textContent = "5.0";
}

function endRate() {
    measuringRate = false;
    updateButtonText()
    rateButton.style.backgroundColor = "rgb(187, 187, 187)";
    rateButton.style.color = "#000000";
    rateButton.textContent = "Measure Rate";
    buttons[2].style.backgroundColor = "rgb(187, 187, 187)";

}

var shootInterval = setInterval(increment, 1000);
clearInterval(shootInterval);


function updateRate(rate) {
    if (rate != 0) {
        clearInterval(shootInterval);
        shootInterval = setInterval(increment, 1000 / rate);
    }
    else {
        clearInterval(shootInterval);
    }
}

function measureRate() {
    teleTest = 0;

    var time = 5;
    var rateStartTime = Date.now();
    var rateInterval = setInterval(() => {
        buttons[2].textContent = time.toFixed(2);
        time = 5 + (rateStartTime - Date.now()) / 1000;
        if (time <= 0) {
            clearInterval(rateInterval);
            rate = (teleTest / 5);
            slider.value = rate;
            button.textContent = rate.toFixed(2) + " bps";
            endRate();
        }
    }, 10);

    setTimeout(() => {

    }, 5000);
}

function setMode(m) {
    mode = m;
    for (let i = 0; i < buttonContainers.length; i++) {
        if (i != m) {
            buttonContainers[i].style.display = "none"
        }
        else {
            buttonContainers[i].style.display = "flex"
            button = buttonContainers[i].children[0];
            button.textContent = rate.toFixed(2) + " bps";
            canvas.style = "border:5px solid " + button.style.backgroundColor + ";"
        }
    }
}


function setText() {
    var text = ""
    if (mode == 0) {
        text = scored;
    }
    else if (mode == 1) {
        text = passed;
    }
    else {
        text = 0;
    }

    var textWidth = ctx.measureText("" + text).width;
    ctx.fillText(text, canvasWidth - (215) * s - textWidth / 2, canvasHeight - 100 * s);
}

function init() {
    window.requestAnimationFrame(draw);
    window.parent.framesLoaded = 1;
}

init();

setButtons();
setMode(0);

window.parent.postMessage("loaded")