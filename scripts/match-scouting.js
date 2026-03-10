import { DataContainer } from "./data/DataContainer.js";
import { DataHandler } from "./data/DataHandler.js";

const dataContainer = new DataContainer();
const dataHandler = new DataHandler(dataContainer);
window.dataHandler = dataHandler;

const frame = document.getElementById("iframe");


function setButtons(){
    document.getElementById("nav-auton").addEventListener("click", ()=>{
        frame.src = "auton.html"
    });
    
    document.getElementById("nav-teleop2").addEventListener("click", ()=>{
        frame.src = "teleop2.html"
    });
    
    document.getElementById("nav-teleop3").addEventListener("click", ()=>{
        frame.src = "teleop3.html"
    });

    document.getElementById("nav-teleop4").addEventListener("click", ()=>{
        frame.src = "defense.html"
    });
    
    document.getElementById("nav-endgame").addEventListener("click", ()=>{
        frame.src = "endgame.html"
    });
    
}





setButtons()