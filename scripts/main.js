import { buildScoutedMatchesCsv } from "./data/scoutedMatches.js";
import { showDataTagPopup } from "./dataTagPopup.js";


//dataHandler.loadData(localStorage.getItem("dataHandler"));



function setButtons() {
    

        document.getElementById("logo").addEventListener("click", () => {
        //alert("Welcome to the 3322 scouting system! Click OK to start scouting.");
        //dataHandler.setScouterName(prompt("What are your initals? (Ex. DG)"));
        //dataHandler.setTeamNumber(prompt("What team are WE scouting? (Ex. 10656)"));
        //dataHandler.setMatchNumber(prompt("What match number is this? (Ex. 14)"));

        window.location.href = "./match-scouting/match-scouting.html";
        //localStorage.setItem("dataHandler", dataHandler.toString());
    });

    document.getElementById("show-data-tag").addEventListener("click", () => {
        showDataTagPopup(buildScoutedMatchesCsv());
    });

}

setButtons();
