import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler;
dataHandler.loadData(localStorage.getItem("dataHandler"));



let stars;


function updateStars(stars) {
    if(stars >= 1) {
        document.getElementById("rate1").innerHTML = "&#9733";
    } else {
        document.getElementById("rate1").innerHTML = "&#9734";
    }
    if(stars >= 2) {
        document.getElementById("rate2").innerHTML = "&#9733";
    } else {
        document.getElementById("rate2").innerHTML = "&#9734";
    }
    if(stars >= 3) {
        document.getElementById("rate3").innerHTML = "&#9733";
    } else {
        document.getElementById("rate3").innerHTML = "&#9734";
    }
    if(stars >= 4) {
        document.getElementById("rate4").innerHTML = "&#9733";
    } else {
        document.getElementById("rate4").innerHTML = "&#9734";
    }
    if(stars >= 5) {
        document.getElementById("rate5").innerHTML = "&#9733";
    } else {
        document.getElementById("rate5").innerHTML = "&#9734";
    }
    if(stars == 0) {
        document.getElementById("rate1").innerHTML = "&nbsp;";
        document.getElementById("rate2").innerHTML = "&nbsp;";
        document.getElementById("rate3").innerHTML = "&nbsp;";
        document.getElementById("rate4").innerHTML = "&nbsp;";
        document.getElementById("rate5").innerHTML = "&nbsp;";
    }
}

function setButtons() {
    
    document.getElementById("rate1").addEventListener("click", () => {
        updateStars(1);
    });
    document.getElementById("rate2").addEventListener("click", () => {
        updateStars(2);
    });
    document.getElementById("rate3").addEventListener("click", () => {
        updateStars(3);
    });
    document.getElementById("rate4").addEventListener("click", () => {
        updateStars(4);
    });
    document.getElementById("rate5").addEventListener("click", () => {
        updateStars(5);
    });
    document.getElementById("defence").addEventListener("click", () => {
        if(document.getElementById("defence").checked) {
            updateStars(5);
        } else {
        updateStars(0);
        }
    });

}



document.getElementById("initials").value = dataHandler.getScouterName();
document.getElementById("teamNumber").value = dataHandler.getTeamNumber();
document.getElementById("matchNumber").value = dataHandler.getMatchNumber();




setButtons();

