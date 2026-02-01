import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler;
dataHandler.loadData(localStorage.getItem("dataHandler"));


function updateDataHandler() {
    localStorage.setItem("dataHandler", dataHandler.toString());
}

console.log(dataHandler.toString());

function submitData() {
    // Gather all data

    //datalist.push(document.getElementById("matchNumber").value + "");

    // Generate QR code linking to the CSV data URL

    window.location.href = "../qrcode.html" + "?data=" + document.getElementById("counter").textContent;
}

document.getElementById("counter").textContent = dataHandler.getTeleFuel()

function increaseNumber(amount) {
    dataHandler.incrementTele(ActionType.TeleFuel, amount);
    console.log(dataHandler.getTeleFuel());
    document.getElementById("counter").textContent = dataHandler.getTeleFuel();
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
    });

    document.getElementById("nav-teleop1").addEventListener("click", () => {
        updateDataHandler()
    });

    document.getElementById("nav-teleop2").addEventListener("click", () => {
        updateDataHandler()
    });

    document.getElementById("nav-teleop3").addEventListener("click", () => {
        updateDataHandler()
    });

    document.getElementById("nav-teleop4").addEventListener("click", () => {
        updateDataHandler()
    });

    document.getElementById("nav-endgame").addEventListener("click", () => {
        updateDataHandler()
    });

}


setButtons();