import { ActionType } from "./match-scouting/Constants.js";
import { DataHandler } from "./match-scouting/DataHandler.js";
const prompt1 = document.querySelector(".firstPrompt");
const wrapper = document.querySelector(".wrapper-duller");
const prompt2 = document.querySelector(".secondPrompt");
const prompt3 = document.querySelector(".thirdPrompt")
const input1 = document.querySelector(".promptOneInput")
const input2 = document.querySelector(".promptTwoInput")
const input3 = document.querySelector(".promptThreeInput")

var scoutStart = false;
var value = null;

var dataHandler = new DataHandler;
localStorage.setItem("dataHandler", dataHandler.toString());



function setButtons() {
    document.getElementById("logo").addEventListener("click", () => {

        wrapper.style.opacity = "0.5";
        prompt1.style.opacity = "1";
        // dataHandler.setScouterName(prompt("What are your initals? (Ex. PD)"));
        // dataHandler.setTeamNumber(prompt("What team are WE scouting? (Ex. 10656)"));
        // dataHandler.setMatchNumber(prompt("What match number is this? (Ex. 67)"));

        // window.location.href = "./match-scouting/auton.html";
        // localStorage.setItem("dataHandler", dataHandler.toString());


    });

    prompt1.addEventListener("keypress", (e) =>{
        if (e.key === "Enter"){
            scoutStart = true;
            prompt2.style.opacity = "1";
            prompt1.style.display = "none";
            value = input1.value
            dataHandler.setScouterName(value);
        }
        
    });

    prompt2.addEventListener("keypress", e => {
        if(e.key === "Enter"){
            prompt2.style.display = "none";
            prompt3.style.opacity = "1";
            value = input2.value
            dataHandler.setTeamNumber(value);
        }
    });

    prompt3.addEventListener("keypress", e =>{
        if(e.key === "Enter"){

            value = input3.value;
            console.log("I wish I was competent")
            prompt3.style.display = "none";
            window.location.href = "match-scouting/auton.html";

            
            dataHandler.setMatchNumber(value);


            // alert("Welcome to the 3322 scouting system! Click OK to start scouting.");
            
        }
    })

    

}
if(scoutStart==false){
    setButtons();
}