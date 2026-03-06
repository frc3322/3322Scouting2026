
import { DataContainer } from "../data/DataContainer.js";
import { DataHandler } from "../data/DataHandler.js";



var dataContainer = new DataContainer();
var dataHandler = new DataHandler();
dataHandler = window.parent.dataHandler;
dataContainer = dataHandler.getDataContainer();




function updateFields(){
    document.getElementById("fuelCounter").textContent = dataContainer.teleScored
    document.getElementById("passingCounter").textContent = dataContainer.telePassed
}

updateFields()


function increaseNumber(amount) {
    
    
    console.log(dataHandler.toString());
    document.getElementById("fuelCounter").textContent = dataContainer.teleScored;
    localStorage.setItem("dataHandler", dataHandler.toString());
}

function increasePassing(amount) {
    
    
    console.log(dataContainer.telePassed);
    document.getElementById("passingCounter").textContent = dataContainer.telePassed;
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
