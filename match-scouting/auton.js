import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler;
dataHandler.loadData(localStorage.getItem("dataHandler"));



console.log(dataHandler.toString());


function updateFields(){
    document.getElementById("fuelCounter").textContent = dataHandler.getAutoFuel()
    
}

updateFields()


function increaseNumber(amount) {
    dataHandler.incrementAuto(ActionType.AutoFuel, amount);
    console.log(dataHandler.toString());
    document.getElementById("fuelCounter").textContent = dataHandler.getAutoFuel();
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

    document.getElementById("undo").addEventListener("click", () => {
        dataHandler.undoAuto();
        console.log("undo")
        updateFields();
        localStorage.setItem("dataHandler", dataHandler.toString());
    });

}

setInterval(() => {
    dataHandler.setBooleanValue(0, document.getElementById("neutralZone").checked);
    dataHandler.setBooleanValue(1, document.getElementById("depot").checked);
    dataHandler.setBooleanValue(2, document.getElementById("outpost").checked);  
    dataHandler.setBooleanValue(3, document.getElementById("Climb").value);

    console.log(dataHandler.getBooleanValues());
    localStorage.setItem("dataHandler", dataHandler.toString());

    console.log("stored");

}, 1000);


setButtons();