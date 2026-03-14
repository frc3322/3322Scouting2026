import { DataContainer } from "../data/DataContainer.js";
import { DataHandler } from "../data/DataHandler.js";


var dataContainer = new DataContainer();
var dataHandler = new DataHandler(dataContainer);

try {
    dataHandler = window.parent.dataHandler;
    dataContainer = dataHandler.getDataContainer();
}
catch { }

const values = [
    dataContainer.autoScored,
    dataContainer.autoPassed,
    0
];


var rate = 0;

const modes = {
    shoot: 0,
    pass: 1,
    test: 2,
    delete: 3
};
var mode = modes.shoot;

const toggles = document.getElementById("toggles").children
const buttonContainers = document.getElementById("buttons").children

const buttons = [
    document.getElementById("fuel-button"),
    document.getElementById("pass-button"),
    document.getElementById("test-button"),
];


const accuracySlider = document.getElementById("accuracy-slider");

function setMode(val) {
    mode = val;
    ballList = [];
    for (let i = 0; i < buttonContainers.length; i++) {
        if (i == val) {
            buttonContainers[i].style.display = "flex";
        }
        else {
            buttonContainers[i].style.display = "none";
        }
    }
}

var shootInterval = null;

function updateRate(i) {
    clearInterval(shootInterval);
    if (i != 0) {
        shootInterval = setInterval(increment, 1000 / i)
    }
}

function increment() {
    newBall()
    let currentMode = mode;
    values[currentMode]++;
    updateDataHandler();
}

function updateDataHandler() {
    dataHandler.setAutoScored(values[0]);
    dataHandler.setAutoPassed(values[1]);
}










var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const rect = canvas.getBoundingClientRect();

var canvasHeight = rect.height;
var canvasWidth = rect.width;

ctx.canvas.height = canvasHeight;
ctx.canvas.width = canvasWidth;


var ball = new Image;
ball.src = '/images/ball.svg'

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
        if (ballList[i][1] > canvas.height - 100 * s &&
            ballList[i][0] > canvas.width - 375 * s) {
            ballList.shift();
        }
    }

    ctx.drawImage(bobot, 0, canvasHeight - 300 * s, 300 * s, 300 * s);
    var textWidth;
    if(mode == modes.shoot){
        ctx.drawImage(hub, canvasWidth - 425 * s, canvasHeight - 400 * s, 400 * s, 400 * s);
        textWidth = ctx.measureText("" + values[mode]).width;
        ctx.fillText(values[mode], canvasWidth - (215) * s - textWidth / 2, canvasHeight - 100 * s);
    }
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

    document.getElementById("canvas").addEventListener('touchstart', function (e) {
        clearTimeout(multitapTimer);
        multitapTimer = setTimeout(() => {
            multitap = true;
        }, 200);
        if (multitap) {
            for (let i = 0; i < e.touches.length; i++) {
                increment();
            }
        }
    });

    document.getElementById("canvas").addEventListener('touchend', function (e) {
        if (multitap) {
            if (e.touches.length == 0) {
                multitap = false;
            }
        }
        else {
            clearTimeout(multitapTimer);
            increment();
        }
    });


    slider.addEventListener("input", () => {
        rate = slider.value * (.3);
        for (let button of buttons) {
            button.textContent = rate.toFixed(1) + " bps"
        }
    })

    for (let button of buttons) {
        button.addEventListener("mousedown", () => { updateRate(rate); });
        button.addEventListener("mouseup", () => { updateRate(0); });
        button.addEventListener("mouseleave", () => { updateRate(0); });

        button.addEventListener("touchstart", () => { updateRate(rate); });
        button.addEventListener("touchend", () => { updateRate(0); });
        button.addEventListener("touchmove", () => { updateRate(0); });

    }

    for (let i = 0; i < toggles.length; i++) {
        toggles[i].addEventListener('mousedown', () => {
            setMode(i);
        })
    }
    document.getElementById("fuel-del-1").addEventListener("click", function () {
        values[0] = Math.max(values[0] - 1, 0);
        updateDataHandler();
    });

    document.getElementById("fuel-del-5").addEventListener("click", function () {
        values[0] = Math.max(values[0] - 5, 0);
        updateDataHandler();
    });

    document.getElementById("fuel-del-all").addEventListener("click", function () {
        values[0] = 0;
        updateDataHandler();
    });

    accuracySlider.addEventListener('input', () => {
        dataHandler.setTeleAccuracy(accuracySlider.value);
    });


    // Passed buttons
    document.getElementById("pass-del-1").addEventListener("click", function () {
        values[1] = Math.max(values[1] - 1, 0);
        updateDataHandler();
    });

    document.getElementById("pass-del-5").addEventListener("click", function () {
        values[1] = Math.max(values[1] - 5, 0);
        updateDataHandler();
    });

    document.getElementById("pass-del-all").addEventListener("click", function () {
        values[1] = 0;
        updateDataHandler();
    });

    document.getElementById("climb").addEventListener("click", () => {
        if (document.getElementById("climb").value == "on") {
            dataHandler.setAutoClimb(1);
        }
        else {
            dataHandler.setAutoClimb(0);
        }
    });
    document.getElementById("mobility").addEventListener("click", () => {
        if (document.getElementById("mobility").value == "on") {
            dataHandler.setMobility(1);
        }
        else {
            dataHandler.setMobility(0);
        }
    });

}

function newBall() {
    ballList.push([140 * s, canvasHeight - 120 * s, (12 + (Math.random())), (30 + Math.random())]);
}


function init() {
    window.requestAnimationFrame(draw);
    window.parent.framesLoaded = 1;
}

setMode(modes.shoot);
init();
setButtons();


window.parent.postMessage("loaded")