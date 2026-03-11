import { ActionType } from "./match-scouting/Constants.js";
import { DataHandler } from "./match-scouting/DataHandler.js";

const prompt = document.querySelector(".prompt");
const wrapper = document.querySelector(".wrapper-duller");
const startScouting = document.querySelector(".startScouting");

const initials = document.querySelector(".promptOneInput");
const team = document.querySelector(".promptTwoInput");
const match = document.querySelector(".promptThreeInput")


var dataHandler = new DataHandler;
localStorage.setItem("dataHandler", dataHandler.toString());



// function promptUser() {
document.getElementById("logo").addEventListener("click", () => {
    console.log("hi")
    wrapper.style.opacity = "0.5";
    prompt.style.visibility = "visible"

    // alert("Welcome to the 3322 scouting system! Click OK to start scouting.");
    // dataHandler.setScouterName(prompt("What are your initals? (Ex. DG)"));
    // dataHandler.setTeamNumber(prompt("What team are WE scouting? (Ex. 10656)"));
    // dataHandler.setMatchNumber(prompt("What match number is this? (Ex. 14)"));

    // window.location.href = "./match-scouting/auton.html";
    // localStorage.setItem("dataHandler", dataHandler.toString());
});
// }

// function populateData(){
startScouting.addEventListener("click", () => {
    dataHandler.setScouterName(initials.value)  
    dataHandler.setTeamNumber(team.value);
    dataHandler.setTeamNumber(match.value);

    // console.log(team.value);

    window.location.href = "./match-scouting/auton.html";
})
// }



// populateData();