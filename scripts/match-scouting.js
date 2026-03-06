import { DataContainer } from "./data/DataContainer.js";
import { DataHandler } from "./data/DataHandler.js";

const dataContainer = new DataContainer();
const dataHandler = new DataHandler(dataContainer);


const iframe = document.getElementById("iframe");




window.dataHandler = dataHandler;

function setButtons(){
    document.getElementById("nav-auton").addEventListener("click", ()=>{
        iframe.src = "/match-scouting/auton.html"
    });
    
    document.getElementById("nav-teleop2").addEventListener("click", ()=>{
        iframe.src = "/match-scouting/teleop2.html"
    });
    
    document.getElementById("nav-teleop3").addEventListener("click", ()=>{
        iframe.src = "/match-scouting/teleop3.html"
    });

    document.getElementById("nav-teleop4").addEventListener("click", ()=>{
        iframe.src = "/match-scouting/defense.html"
    });
    
    document.getElementById("nav-endgame").addEventListener("click", ()=>{
        iframe.src = "/match-scouting/endgame.html"
    });
    
}



setButtons()