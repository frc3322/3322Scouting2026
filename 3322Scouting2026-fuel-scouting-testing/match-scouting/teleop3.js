import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler();
dataHandler.loadData(localStorage.getItem("dataHandler"))


alert(dataHandler.getTeleCycleCounter());

var fuelCounter = document.getElementById("fuelCounter");
var fuelIncrements = document.getElementById("fuelIncrements");

fuelCounter.textContent = dataHandler.getTeleFuel();
document.getElementById("cyclesCounter").textContent = dataHandler.getTeleCycleCounter();


console.log(localStorage.getItem("dataHandler"));

function updateDataHandler(){
    localStorage.setItem("dataHandler", dataHandler.toString());
}


function submitData() {
    // Gather all data

    //datalist.push(document.getElementById("matchNumber").value + "");



    // Generate QR code linking to the CSV data URL

    window.location.href = "../qrcode.html" + "?data=" + document.getElementById("ballsCounter").textContent;
}

function setButtons() {
    document.getElementById("submitShotBalls").addEventListener("click", () => {
        document.getElementById("cyclesCounter").textContent = parseInt(document.getElementById("cyclesCounter").textContent) + parseInt(1);
        dataHandler.setTeleCycleCounter(parseInt(document.getElementById("cyclesCounter").textContent));
        dataHandler.incrementTele(ActionType.TeleFuel, parseInt(fuelIncrements.value));
        updateDataHandler()
        fuelCounter.textContent = dataHandler.getTeleFuel();
        console.log("Cycle counter: " + dataHandler.getTeleCycleCounter());
        document.getElementById("cyclesCounter").textContent = dataHandler.getTeleCycleCounter();
        updateDataHandler()


        console.log(localStorage.getItem("dataHandler"));
    });

}


setButtons();