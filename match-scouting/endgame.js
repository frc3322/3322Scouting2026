import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler;
dataHandler.loadData(localStorage.getItem("dataHandler"));

const redZone = document.querySelector(".redZone");
const blueZone = document.querySelector(".blueZone");
let isRedTeam = false;

let stars = -1;

redZone.addEventListener("click", () => {
    // console.log("e")
    redZone.classList.remove("de-activated");
    redZone.classList.add("activated");
    blueZone.classList.remove("activated");
    blueZone.classList.add("de-activated");
    isRedTeam = true;
    updateTeamStatus(isRedTeam);
})

blueZone.addEventListener("click", () => {
    // console.log("e")
    blueZone.classList.remove("de-activated");
    blueZone.classList.add("activated");
    redZone.classList.remove("activated");
    redZone.classList.add("de-activated");
    isRedTeam = false;
    updateTeamStatus(isRedTeam);
})


function updateTeamStatus(teamStatus){
    if(teamStatus == true)
    {
        setTeamColor("Red");
    }
    else{
        setTeamColor("Blue");
    }
}


function updateStars(stars) {
    dataHandler.setBooleanValue(7, stars);

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

setInterval(() => {
    dataHandler.setBooleanValue(4, document.getElementById("bump").checked);
    dataHandler.setBooleanValue(5, document.getElementById("trench").checked);
    dataHandler.setBooleanValue(6, document.getElementById("defence").checked);

    dataHandler.setBooleanValue(0, document.getElementById("initials").value);
    dataHandler.setBooleanValue(1, document.getElementById("teamNumber").value);
    dataHandler.setBooleanValue(2, document.getElementById("matchNumber").value);


    dataHandler.setComment(document.getElementById("comments").value);
    //dataHandler.setBooleanValue(7, stars);

    console.log(dataHandler.getBooleanValues());
    localStorage.setItem("dataHandler", dataHandler.toString());

    console.log("stored");

}, 1000);


// document.getElementById("initials").value = dataHandler.getScouterName();
// document.getElementById("teamNumber").value = dataHandler.getTeamNumber();
// document.getElementById("matchNumber").value = dataHandler.getMatchNumber();




setButtons();

