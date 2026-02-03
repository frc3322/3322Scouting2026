import { DataHandler } from "./DataHandler.js";

var timerInterval = null;
var ScoringStartTime = 0;
var ScoringElapsed = 0;
var ScoringTotal = 0;
var PassingStartTime = 0;
var PassingElapsed = 0;
var PassingTotal = 0;
var mouseDown = false;



var dataHandler = new DataHandler();
dataHandler.loadData(localStorage.getItem("dataHandler"));

console.log(dataHandler.getTeleFuelTime());

function updateDataHandler(){
    localStorage.setItem("dataHandler", dataHandler.toString());
}

ScoringTotal = dataHandler.getTeleFuelTime();
PassingTotal = dataHandler.getTelePassTime();

console.log(dataHandler.getTeleFuelTime());

function setTimes(){
    dataHandler.setTeleFuelTime(Math.round(100*ScoringTotal)/100);
    dataHandler.setTelePassTime(Math.round(100*PassingTotal)/100);
}

setButtons();

function submitData() {
    // Gather all data

    //datalist.push(document.getElementById("matchNumber").value + "");

    // Generate QR code linking to the CSV data URL

    window.location.href = "../qrcode.html" + "?data=" + document.getElementById("scoring").textContent + "," + document.getElementById("passing").textContent;
}



const scoring = document.getElementById("scoring");
const passing = document.getElementById("passing");

scoring.textContent = "Scoring time: " + dataHandler.getTeleFuelTime().toFixed(2);
passing.textContent = "Passing time: " + dataHandler.getTelePassTime().toFixed(2);

function startScoringTimer() {
    mouseDown = true;
    if (timerInterval) return; // Prevent multiple intervals
    ScoringStartTime = Date.now();
    timerInterval = setInterval(() => {
        ScoringElapsed = Date.now() - ScoringStartTime;
        
        scoring.textContent = "Scoring time: " + (ScoringTotal + ScoringElapsed/ 1000).toFixed(2);
    }, 10);
}
function startpassingTimer() {
    if (timerInterval) return; // Prevent multiple intervals
    PassingStartTime = Date.now();
    timerInterval = setInterval(() => {
        PassingElapsed = Date.now() - PassingStartTime;
        passing.textContent = "Passing time: " + (PassingTotal + PassingElapsed / 1000).toFixed(2);
    }, 10);
}

// Stop counting when button is released
function stopScoringTimer() {
    if(mouseDown){
        clearInterval(timerInterval);
        timerInterval = null;
        ScoringTotal += ScoringElapsed/1000;
        dataHandler.setTeleFuelTime(Math.round(100*ScoringTotal)/100);
        updateDataHandler()
        console.log(dataHandler.getTeleFuelTime());

        mouseDown = false;
    }
}
function stopPassingTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        PassingTotal += PassingElapsed/1000;
        dataHandler.setTelePassTime(Math.round(100*PassingTotal)/100);
        updateDataHandler()
        console.log(dataHandler.getTelePassTime());

        mouseDown = false;
}

function setButtons() {

    document.getElementById("nav-auton").addEventListener("click", () => {
        setTimes()
        updateDataHandler()
    });

    document.getElementById("nav-teleop1").addEventListener("click", () => {
        setTimes()
        updateDataHandler()
    });

    document.getElementById("nav-teleop2").addEventListener("click", () => {
        setTimes()
        updateDataHandler()
    });

    document.getElementById("nav-teleop3").addEventListener("click", () => {
        setTimes()
        updateDataHandler()
    });

    document.getElementById("nav-teleop4").addEventListener("click", () => {
        setTimes()
        updateDataHandler()
    });

    document.getElementById("nav-endgame").addEventListener("click", () => {
        setTimes()
        updateDataHandler()
    });

}



// Mouse events
scoring.addEventListener("mousedown", startScoringTimer);
scoring.addEventListener("mouseup", stopScoringTimer);
scoring.addEventListener("mouseleave", stopScoringTimer);

passing.addEventListener("mousedown", startpassingTimer);
passing.addEventListener("mouseup", stopPassingTimer);
passing.addEventListener("mouseleave", stopPassingTimer);
