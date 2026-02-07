import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler();
dataHandler.loadData(localStorage.getItem("dataHandler"))


function setButtons() {
    
    document.getElementById("hubSuccessIncrease1").addEventListener("click", () => {
        dataHandler.changeFuel(ActionType.AutoFuel, 1);
        document.getElementById("fuelCounter").textContent = "Hub Success: \n< " + dataHandler.getAutoFuel() + " >";
        localStorage.setItem("dataHandler", dataHandler.toString());
    });

    document.getElementById("hubSuccessIncrease5").addEventListener("click", () => {
        dataHandler.changeFuel(ActionType.AutoFuel, 5);
        document.getElementById("fuelCounter").textContent = "Hub Success: \n< " + dataHandler.getAutoFuel() + " >";
        localStorage.setItem("dataHandler", dataHandler.toString());
    });

    document.getElementById("hubSuccessIncrease10").addEventListener("click", () => {
        dataHandler.changeFuel(ActionType.AutoFuel, 10);
        document.getElementById("fuelCounter").textContent = "Hub Success: \n< " + dataHandler.getAutoFuel() + " >";
        localStorage.setItem("dataHandler", dataHandler.toString());
    });

    document.getElementById("hubFailedIncrease1").addEventListener("click", () => {
        dataHandler.changeFuel(ActionType.AutoFuelFailed, 1);
        document.getElementById("passingCounter").textContent = "Hub Success: \n< " + dataHandler.getAutoFuelFailed() + " >";
        localStorage.setItem("dataHandler", dataHandler.toString());
    });


    document.getElementById("hubFailedIncrease5").addEventListener("click", () => {
        dataHandler.changeFuel(ActionType.AutoFuelFailed, 5);
        document.getElementById("passingCounter").textContent = "Hub Success: \n< " + dataHandler.getAutoFuelFailed() + " >";
        localStorage.setItem("dataHandler", dataHandler.toString());

        
    });

    document.getElementById("hubFailedIncrease10").addEventListener("click", () => {
        dataHandler.changeFuel(ActionType.AutoFuelFailed, 10);
        document.getElementById("passingCounter").textContent = "Hub Success: \n< " + dataHandler.getAutoFuelFailed() + " >";
        localStorage.setItem("dataHandler", dataHandler.toString());
    });




}

setButtons();