import { DataHandler } from "./match-scouting/DataHandler.js";
import { ActionType } from "./match-scouting/Constants.js"; 

// document.getElementById("scoutBtn").addEventListener("click", () => {
//     console.log("Success!");
// });

const dataHandler = new DataHandler();

console.log(dataHandler.toString());
console.log(dataHandler.exportData());
localStorage.setItem("dataHandler", dataHandler.toString())


