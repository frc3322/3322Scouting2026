import { DataContainer } from "./data/DataContainer.js";
import { DataHandler } from "./data/DataHandler.js";
import { buildScoutedMatchesCsv } from "./data/scoutedMatches.js";
import { showDataTagPopup } from "./dataTagPopup.js";


const prompt = document.querySelector(".prompt");
const startScouting = document.querySelector(".startScouting");

const initials = document.querySelector(".promptOneInput");
const team = document.querySelector(".promptTwoInput");
const match = document.querySelector(".promptThreeInput")



function setButtons() {
    document.getElementById("logo").addEventListener("click", () => {
        prompt.style.visibility = "visible"
    });
    startScouting.addEventListener("click", () => {
        let matchData = {
            "scouterInitials": initials.value,
            "teamNumber": team.value,
            "matchNumber": match.value
        }
        window.localStorage.setItem("matchData",JSON.stringify(matchData));
        window.location.href = "./match-scouting/match-scouting.html";
    })
    document.getElementById("settings").addEventListener("click", () => {
        window.location.href = "./settings.html";
    })

}

if(window.localStorage.getItem("teamColor") == null){
    window.localStorage.setItem("teamColor", "red")
}
setButtons();
