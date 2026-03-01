import { DataHandler } from "./match-scouting/DataHandler.js";
import { ActionType } from "./Constants.js"; 



const dataHandler = new DataHandler();

console.log(dataHandler.toString());
console.log(dataHandler.exportData());
localStorage.setItem("dataHandler", dataHandler.toString())


