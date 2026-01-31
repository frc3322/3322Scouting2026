import { DataHandler } from "./match-scouting/DataHandler.js";
import { ActionType } from "./match-scouting/Constants.js"; 

document.getElementById("scoutBtn").addEventListener("click", () => {
    console.log("Success!");
});

const dataHandler = new DataHandler();

console.log(dataHandler.toString());
localStorage.setItem("dataHandler", dataHandler.toString())

dataHandler.loadData(localStorage.getItem("dataHandler"));
console.log(localStorage.getItem("dataHandler"));
