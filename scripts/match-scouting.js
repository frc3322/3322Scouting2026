import { DataContainer } from "./data/DataContainer.js";
import { DataHandler } from "./data/DataHandler.js";

const dataContainer = new DataContainer();
const dataHandler = new DataHandler(dataContainer);
window.dataHandler = dataHandler;


const frame = document.getElementById("iframe");
const title = document.getElementById("title");
const teamNumber = document.getElementById("teamNumber");





function setButtons() {
    document.getElementById("nav-auton").addEventListener("click", () => {
        frame.src = "auton.html"
        title.textContent = "Auton"
    });

    document.getElementById("nav-teleop2").addEventListener("click", () => {
        frame.src = "teleop2.html"
        title.textContent = "Teleop"
    });

    document.getElementById("nav-teleop3").addEventListener("click", () => {
        frame.src = "teleop3.html"
    });

    document.getElementById("nav-teleop4").addEventListener("click", () => {
        frame.src = "defense.html"
    });

    document.getElementById("nav-endgame").addEventListener("click", () => {
        frame.src = "endgame.html"
    });

}


function initialData(shootingRate) {

    if (window.localStorage.getItem("scouterInitials") != "") {
        dataHandler.setScouterInitials(window.localStorage.getItem("scouterInitials"));
    }
    if (window.localStorage.getItem("teamNumber") != "") {
        dataHandler.setTeamNumber(window.localStorage.getItem("teamNumber"));
        teamNumber.textContent = window.localStorage.getItem("teamNumber");
        console.log(shootingRate)
        if (shootingRate != 0) {
            teamNumber.textContent += " - " + shootingRate + " bps"
        }
    }
    if (window.localStorage.getItem("matchNumber") != "") {
        dataHandler.setMatchNumber(window.localStorage.getItem("matchNumber"));
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
        let number = window.localStorage.getItem("teamNumber");
        console.log(data[number]);
        if(data[number] == undefined){
            initialData(0)
        }
        else{
            initialData(data[number])
        }
    })
    .catch(error => console.error('Failed to fetch data:', error));


setButtons()