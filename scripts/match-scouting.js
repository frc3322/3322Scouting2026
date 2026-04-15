import { DataContainer } from "./data/DataContainer.js";
import { DataHandler } from "./data/DataHandler.js";

const dataContainer = new DataContainer();
const dataHandler = new DataHandler(dataContainer);
window.dataHandler = dataHandler;
window.rate = 0;


const frame = document.getElementById("iframe");
const title = document.getElementById("title");
const teamNumber = document.getElementById("teamNumber");


const matchData = JSON.parse(localStorage.getItem('matchData'))
frame.src = "autondnd.html"

function setButtons() {
    document.getElementById("nav-auton").addEventListener("click", () => {
        console.log(frame.src)
        if(title.textContent != "Auton"){
            frame.src = "autondnd.html"
            title.textContent = "Auton"

        }
    });

    document.getElementById("nav-teleop").addEventListener("click", () => {
        if(title.textContent != "Teleop"){
            frame.src = "teleop.html"
            title.textContent = "Teleop"

        }
    });

    document.getElementById("nav-defense").addEventListener("click", () => {
        if(title.textContent != "Defense"){
            frame.src = "defense.html"
            title.textContent = "Defense"

        }
    });

    document.getElementById("nav-endgame").addEventListener("click", () => {
        if(title.textContent != "Endgame"){
            frame.src = "endgame.html"
            title.textContent = "Endgame"

        }
    });

}


function initialData(number) {
    if (matchData.scouterInitials != "") {
        dataHandler.setScouterInitials(matchData.scouterInitials);
    }
    if (number != 0) {
        dataHandler.setTeamNumber(number);
        teamNumber.textContent = number;
    }
    if (matchData.matchNumber != "") {
        dataHandler.setMatchNumber(matchData.matchNumber);
    }

}

if(matchData.teamNumber == undefined){
    initialData(0)
}
else{
    initialData(matchData.teamNumber)
}


setButtons()