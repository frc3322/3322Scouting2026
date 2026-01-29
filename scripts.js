import { DataHandler } from "./match-scouting/DataHandler.js";
import { ActionType } from "./match-scouting/Constants.js"; 

document.getElementById("scoutBtn").addEventListener("click", () => {
    const dataHandler = new DataHandler();
    localStorage.setItem("dataHandler", JSON.stringify(dataHandler));
    dataHandler.incrementAuto(ActionType.AutoFuelAttempted, 4)
    let data = new DataHandler();
    Object.assign(data, dataHandler);
    data.incrementAuto(ActionType.AutoFuelAttempted, 4)
    console.log(JSON.stringify(data));
    console.log("Success!");
});
