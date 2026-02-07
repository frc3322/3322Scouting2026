import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler;
dataHandler.loadData(localStorage.getItem("dataHandler"));



console.log(dataHandler.toString());


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
    
    document.getElementById("hub1").addEventListener("click", () => {
        increaseNumber(1);
    });

    document.getElementById("hub5").addEventListener("click", () => {
        increaseNumber(5);
    });

    document.getElementById("hub10").addEventListener("click", () => {
        increaseNumber(10);
    });

    document.getElementById("pass1").addEventListener("click", () => {
        increasePassing(1);
    });

    document.getElementById("pass5").addEventListener("click", () => {
        increasePassing(5);
    });

    document.getElementById("pass10").addEventListener("click", () => {
        increasePassing(10);
    });

    document.getElementById("undo").addEventListener("click", () => {
        dataHandler.undoTele();
        console.log("undo")
        updateFields();
    });

}


setButtons();
