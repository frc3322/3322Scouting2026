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
    console.log("hi")
    prompt.style.visibility = "visible"
});
startScouting.addEventListener("click", () => {
    window.localStorage.setItem("scouterInitials", initials.value);
    window.localStorage.setItem("teamNumber", team.value);
    window.localStorage.setItem("matchNumber", match.value);
    window.location.href = "./match-scouting/match-scouting.html";
})
// }

}

setButtons();
