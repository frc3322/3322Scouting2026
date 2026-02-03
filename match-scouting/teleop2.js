import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler;
dataHandler.loadData(localStorage.getItem("dataHandler"));



console.log(dataHandler.toString());

function submitData() {
    // Gather all data

    //datalist.push(document.getElementById("matchNumber").value + "");

    // Generate QR code linking to the CSV data URL

    window.location.href = "../qrcode.html" + "?data=" + document.getElementById("fuelCount").textContent;
}

document.getElementById("fuelCounter").textContent = dataHandler.getTeleFuel()
document.getElementById("passingCounter").textContent = dataHandler.getTeleFuel()


function increaseNumber(amount) {
    dataHandler.incrementTele(ActionType.TeleFuel, amount);
    console.log(dataHandler.getTeleFuel());
    document.getElementById("fuelCount").textContent = dataHandler.getTeleFuel();
    localStorage.setItem("dataHandler", dataHandler.toString());
}

function setButtons() {

    document.getElementById("fuelHubSuccessIncrease1").addEventListener("click", () => {
        increaseNumber(1);
    });

    document.getElementById("fuelHubSuccessIncrease5").addEventListener("click", () => {
        increaseNumber(5);
    });

    document.getElementById("fuelHubSuccessIncrease10").addEventListener("click", () => {
        increaseNumber(10);
    });


}


setButtons();