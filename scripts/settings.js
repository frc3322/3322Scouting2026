import { DataContainer } from "../scripts/data/DataContainer.js";
import { DataHandler } from "../scripts/data/DataHandler.js";


var dataContainer = new DataContainer();
var dataHandler = new DataHandler(dataContainer);

try {
    dataHandler = window.parent.dataHandler;
    dataContainer = dataHandler.getDataContainer();
}
catch { }

const redZone = document.querySelector(".redZone");
const blueZone = document.querySelector(".blueZone");

const redAllianceOne = document.getElementById("redAllianceOne");
const redAllianceTwo = document.getElementById("redAllianceTwo");
const redAllianceThree = document.getElementById("redAllianceThree");
const blueAllianceOne = document.getElementById("blueAllianceOne");
const blueAllianceTwo = document.getElementById("blueAllianceTwo");
const blueAllianceThree = document.getElementById("blueAllianceThree");


let alianceTracker = [redAllianceOne, redAllianceTwo, redAllianceThree, blueAllianceOne, blueAllianceTwo, blueAllianceThree];


let isRedTeam = false;

alianceTracker.forEach((entries, index) =>{

    entries.addEventListener("click", () => {
        alianceTracker.forEach((entries) => entries.classList.remove("activated"));
        alianceTracker.forEach((entries) => entries.classList.add("de-activated"));
        entries.classList.add("activated")
        entries.classList.remove("de-activated")
        dataHandler.setSettingsAlianceNumber(index);
    })
});

// redZone.addEventListener("click", () => {
//     // console.log("e")
//     zoneStyle(true);
//     isRedTeam = true;
//     updateTeamStatus(isRedTeam);
// })

// blueZone.addEventListener("click", () => {
//     // console.log("e")
//     zoneStyle(false);
//     isRedTeam = false;
//     updateTeamStatus(isRedTeam);
// })

// function zoneStyle(bool){
//     if(bool){
//         redZone.classList.remove("de-activated");
//         redZone.classList.add("activated");
//         blueZone.classList.remove("activated");
//         blueZone.classList.add("de-activated");
//     }
//     else{
//         blueZone.classList.remove("de-activated");
//         blueZone.classList.add("activated");
//         redZone.classList.remove("activated");
//         redZone.classList.add("de-activated");
//     }
// }

// document.getElementById("back").addEventListener("click", () => {
//     window.location.href = "./index.html";
// })

// function updateTeamStatus(teamStatus){
//     if(teamStatus == true)
//     {
//         window.localStorage.setItem("teamColor", "red")
//     }
//     else{
//         window.localStorage.setItem("teamColor", "blue")
//     }
// }
// if(window.localStorage.getItem("teamColor") == "red"){
//     zoneStyle(true)
// }
// else{
//     zoneStyle(false)
// }

