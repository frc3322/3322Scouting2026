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
        frame.src = "autondnd.html"
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
        dataHandler.setScouterInitials(matchData.scouterInitials);
    }
    if (teamNumberVal != 0) {
        dataHandler.setTeamNumber(teamNumberVal);
        teamNumber.textContent = teamNumberVal;
        if (shootingRate != 0) {
            teamNumber.textContent += " - " + shootingRate + " bps"
        }
    }
    if (matchData.matchNumber != "") {
        dataHandler.setMatchNumber(matchData.matchNumber);
    }

}
let teamNumberVal = 0;
fetch('../res/matches.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        let matchData = JSON.parse(window.localStorage.getItem("matchData"))
        teamNumberVal = data["match" + matchData.matchNumber][window.localStorage.getItem("teamColor") + window.localStorage.getItem("alliance number")];
        console.log(teamNumberVal)
        dataHandler.setTeamNumber(teamNumberVal);


        fetch('../res/shooting-rates.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data[teamNumberVal] == undefined) {
                    initialData(0)
                }
                else {
                    initialData(data[teamNumberVal])
                }
            })
            .catch(error => console.error('Failed to fetch data:', error));




    })
    .catch(error => console.error('Failed to fetch data:', error));


setButtons()