import { ActionType } from "./match-scouting/Constants.js";
import { DataHandler } from "./match-scouting/DataHandler.js";



var dataHandler = new DataHandler;
localStorage.setItem("dataHandler", dataHandler.toString());



function setButtons() {
    

        document.getElementById("logo").addEventListener("click", () => {
        alert("Welcome to the 3322 scouting system! Click OK to start scouting.");
        dataHandler.setScouterName(prompt("What are your initals? (Ex. DG)"));
        dataHandler.setTeamNumber(prompt("What team are WE scouting? (Ex. 10656)"));
        dataHandler.setMatchNumber(prompt("What match number is this? (Ex. 14)"));

        window.location.href = "./match-scouting/auton.html";
        localStorage.setItem("dataHandler", dataHandler.toString());


    });

}

setButtons();
