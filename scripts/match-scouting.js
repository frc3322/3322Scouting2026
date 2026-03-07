import { DataContainer } from "./data/DataContainer.js";
import { DataHandler } from "./data/DataHandler.js";

const dataContainer = new DataContainer();
const dataHandler = new DataHandler(dataContainer);

const autonFrame = document.getElementById("iframe-auton");
const teleop2Frame = document.getElementById("iframe-teleop2");
const teleop3Frame = document.getElementById("iframe-teleop3");
const defenseFrame = document.getElementById("iframe-defense");
const endgameFrame = document.getElementById("iframe-endgame");


frames = [
    autonFrame,
    teleop2Frame,
    teleop3Frame,
    defenseFrame,
    endgameFrame
]

window.dataHandler = dataHandler;

function setButtons(){
    document.getElementById("nav-auton").addEventListener("click", ()=>{
        setFrame(0);
    });
    
    document.getElementById("nav-teleop2").addEventListener("click", ()=>{
        setFrame(1);
    });
    
    document.getElementById("nav-teleop3").addEventListener("click", ()=>{
        setFrame(2);
    });

    document.getElementById("nav-teleop4").addEventListener("click", ()=>{
        setFrame(3);
    });
    
    document.getElementById("nav-endgame").addEventListener("click", ()=>{
        setFrame(4);
    });
    
}

function setFrame(index){
    window.activeFrame = index;
    for(let i = 0; i < frames.length; i++){
        if(i == index){
            frames[i].style.display = "inline";
        }
        else{
            frames[i].style.display = "none";
        }
    }
}

var framesLoaded = 0;

window.addEventListener("message",(e) => {
    if(e.data == "loaded"){
        framesLoaded += 1
        if(framesLoaded >= 2){
            setFrame(0);
        }
    }
});

setButtons()