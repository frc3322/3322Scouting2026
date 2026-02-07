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


function updateFields(){
    document.getElementById("fuelCounter").textContent = dataHandler.getTeleFuel()
    document.getElementById("passingCounter").textContent = dataHandler.getTelePass()
}

updateFields()


function increaseNumber(amount) {
    
    dataHandler.incrementTele(ActionType.TeleFuel, amount);
    console.log(dataHandler.toString());
    document.getElementById("fuelCounter").textContent = dataHandler.getTeleFuel();
    localStorage.setItem("dataHandler", dataHandler.toString());
}
function increasePassing(amount) {
    
    dataHandler.incrementTele(ActionType.TelePass, amount);
    console.log(dataHandler.getTelePass());
    document.getElementById("passingCounter").textContent = dataHandler.getTelePass();
    localStorage.setItem("dataHandler", dataHandler.toString());
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

    document.getElementById("hubPassingIncrease1").addEventListener("click", () => {
        increasePassing(1);
    });

    document.getElementById("hubPassingIncrease5").addEventListener("click", () => {
        increasePassing(5);
    });

    document.getElementById("hubPassingIncrease10").addEventListener("click", () => {
        increasePassing(10);
    });

    document.getElementById("undo").addEventListener("click", () => {
        dataHandler.undoTele();
        console.log("undo")
        updateFields();
    });

}


setButtons();
