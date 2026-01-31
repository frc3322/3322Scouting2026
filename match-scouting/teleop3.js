import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler();
Object.assign(dataHandler, localStorage.getItem("dataHandler"))


function updateDataHandler(){
    localStorage.setItem("dataHandler", JSON.stringify(dataHandler));
}


function submit(amount) {
    dataHandler.incrementTele(ActionType.TeleFuel, amount);
    document.getElementById("ballsCounter").innerText = dataHandler.getTeleFuel();
    document.getElementById("cyclesCounter").innerText = parseInt(document.getElementById("cyclesCounter").innerText) + 1;
   
}

function submitData() {
    // Gather all data

    //datalist.push(document.getElementById("matchNumber").value + "");



    // Generate QR code linking to the CSV data URL

    window.location.href = "../qrcode.html" + "?data=" + document.getElementById("ballsCounter").textContent;
}

function setButtons() {
    document.getElementById("submitShotBalls").addEventListener("click", () => {
        submit(parseInt(document.getElementById("cars").value));
    });

}


setButtons();