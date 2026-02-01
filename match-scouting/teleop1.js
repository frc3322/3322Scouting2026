import { DataHandler } from "./DataHandler.js";

var timerInterval = null;
var ScoringStartTime = 0;
var ScoringElapsed = 0;
var PassingStartTime = 0;
var PassingElapsed = 0;


console.log(localStorage.getItem("dataHandler"));

var dataHandler = new DataHandler();
dataHandler.loadData(localStorage.getItem("dataHandler"));

console.log(dataHandler.toString());

function updateDataHandler(){
    localStorage.setItem("dataHandler", dataHandler.toString());
}

function increaseTimes(){
    dataHandler.incTeleShootingTime(ScoringElapsed);
}

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
    if (timerInterval) return; // Prevent multiple intervals
    ScoringStartTime = Date.now() - ScoringElapsed;
    timerInterval = setInterval(() => {
        ScoringElapsed = Date.now() - ScoringStartTime;
        scoring.textContent = "Scoring time: " + (ScoringElapsed / 1000).toFixed(2);
    }, 10);
}
function startpassingTimer() {
    if (timerInterval) return; // Prevent multiple intervals
    PassingStartTime = Date.now() - PassingElapsed;
    timerInterval = setInterval(() => {
        PassingElapsed = Date.now() - PassingStartTime;
        passing.textContent = "Passing time: " + (PassingElapsed / 1000).toFixed(2);
    }, 10);
}

// Stop counting when button is released
function stopScoringTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    dataHandler.setTeleFuelTime(ScoringElapsed / 1000);
}
function stopPassingTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    dataHandler.setTelePassTime(PassingElapsed / 1000);  
}

function setButtons() {

    document.getElementById("hubSuccessIncrease1").addEventListener("click", () => {
        increaseNumber(1);
    });

    document.getElementById("hubSuccessIncrease5").addEventListener("click", () => {
        increaseNumber(5);
    });

    document.getElementById("hubSuccessIncrease10").addEventListener("click", () => {
        increaseNumber(10);
    });

    document.getElementById("nav-auton").addEventListener("click", () => {
        updateDataHandler()
        increaseTimes()
    });

    document.getElementById("nav-teleop1").addEventListener("click", () => {
        updateDataHandler()
        increaseTimes()
    });

    document.getElementById("nav-teleop2").addEventListener("click", () => {
        updateDataHandler()
        increaseTimes()
    });

    document.getElementById("nav-teleop3").addEventListener("click", () => {
        updateDataHandler()
        increaseTimes()
    });

    document.getElementById("nav-teleop4").addEventListener("click", () => {
        updateDataHandler()
        increaseTimes()
    });

    document.getElementById("nav-endgame").addEventListener("click", () => {
        updateDataHandler()
        increaseTimes()
    });

    

}


// Mouse events
scoring.addEventListener("mousedown", startScoringTimer);
scoring.addEventListener("mouseup", stopScoringTimer);
scoring.addEventListener("mouseleave", stopScoringTimer);

passing.addEventListener("mousedown", startpassingTimer);
passing.addEventListener("mouseup", stopPassingTimer);
passing.addEventListener("mouseleave", stopPassingTimer);
