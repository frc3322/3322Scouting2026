import { DataContainer } from "./data/DataContainer.js";
import { DataHandler } from "./data/DataHandler.js";

const dataContainer = new DataContainer();
const dataHandler = new DataHandler(dataContainer);
window.dataHandler = dataHandler;
window.rate = 0;


const autonFrame = document.getElementById("auton-iframe");
const teleopFrame = document.getElementById("teleop-iframe");
const defenseFrame = document.getElementById("defense-iframe");
const endgameFrame = document.getElementById("endgame-iframe");


const title = document.getElementById("title");
const teamNumber = document.getElementById("teamNumber");


const matchData = JSON.parse(localStorage.getItem('matchData'))

function setButtons() {
    document.getElementById("nav-auton").addEventListener("click", () => {
        
        
            autonFrame.style.display = "block";
            teleopFrame.style.display = "none";
            defenseFrame.style.display = "none";
            endgameFrame.style.display = "none";
            title.textContent = "Auton"

        
    });

    document.getElementById("nav-teleop").addEventListener("click", () => {
        
            autonFrame.style.display = "none";
            teleopFrame.style.display = "block";
            defenseFrame.style.display = "none";
            endgameFrame.style.display = "none";
            title.textContent = "Teleop"
        
    });

    document.getElementById("nav-defense").addEventListener("click", () => {
        
            autonFrame.style.display = "none";
            teleopFrame.style.display = "none";
            defenseFrame.style.display = "block";
            endgameFrame.style.display = "none";
            title.textContent = "Defense"
       
    });

    document.getElementById("nav-endgame").addEventListener("click", () => {
       
            autonFrame.style.display = "none";
            teleopFrame.style.display = "none";
            defenseFrame.style.display = "none";
            endgameFrame.style.display = "block";
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


autonFrame.style.display = "block";
setButtons()