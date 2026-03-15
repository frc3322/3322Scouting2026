import { DataContainer } from "./data/DataContainer.js";
import { DataHandler } from "./data/DataHandler.js";

const dataContainer = new DataContainer();
const dataHandler = new DataHandler(dataContainer);
window.dataHandler = dataHandler;


const frame = document.getElementById("iframe");
const title = document.getElementById("title");
const teamNumber = document.getElementById("teamNumber");



const matchData = JSON.parse(localStorage.getItem('matchData'))


function setButtons() {
    document.getElementById("nav-auton").addEventListener("click", () => {
        frame.src = "auton.html"
        title.textContent = "Auton"
    });

    document.getElementById("nav-teleop").addEventListener("click", () => {
        frame.src = "teleop.html"
        title.textContent = "Teleop"
    });

    document.getElementById("nav-defense").addEventListener("click", () => {
        frame.src = "defense.html"
        title.textContent = "Defense"
    });

    document.getElementById("nav-endgame").addEventListener("click", () => {
        frame.src = "endgame.html"
        title.textContent = "Endgame"
    });

}


function initialData(shootingRate) {
    if (matchData.scouterInitials != "") {
        dataHandler.setScouterInitials(matchData.scouterInitials );
    }
    if (matchData.teamNumber != "") {
        dataHandler.setTeamNumber(matchData.teamNumber);
        teamNumber.textContent = matchData.teamNumber ;
        if (shootingRate != 0) {
            teamNumber.textContent += " - " + shootingRate + " bps"
        }
    }
    if (matchData.matchNumber  != "") {
        dataHandler.setMatchNumber(matchData.matchNumber );
    }

}



fetch('../res/shooting-rates.json')
.then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        let number = matchData.teamNumber;
        if(data[number] == undefined){
            initialData(0)
        }
        else{
            initialData(data[number])
        }
    })
    .catch(error => console.error('Failed to fetch data:', error));


setButtons()