import { DataContainer } from "../data/DataContainer.js";
import { DataHandler } from "../data/DataHandler.js";
import { saveScoutedMatch } from "../data/scoutedMatches.js";


var dataContainer = new DataContainer();
var dataHandler = new DataHandler(dataContainer);

try{
    dataHandler = window.parent.dataHandler;
    dataContainer = dataHandler.getDataContainer();
}
catch{}

const blueZone = document.querySelector(".blueZone");
const redZone = document.querySelector(".redZone");
let isRedTeam = false;




var dataQR;
var commentQR;


function updateTeamStatus(teamStatus){
    if(teamStatus == true)
    {
        dataHandler.setTeamColor("Red");
    }
    else{
        dataHandler.setTeamColor("Blue");
    }
}



function setButtons() {
    document.getElementById("submit").addEventListener("click", () => {
        dataHandler.setScouterInitials(document.getElementById("initials").value.toLowerCase());
        dataHandler.setTeamNumber(document.getElementById("teamNumber").value);
        dataHandler.setMatchNumber(document.getElementById("matchNumber").value);
        dataHandler.setComment(document.getElementById("comments").value);
        dataHandler.setTrenchCheck(document.getElementById("trench").checked);
        dataHandler.setBumpCheck(document.getElementById("bump").checked);
        dataHandler.setDefenceCheck(document.getElementById("defence").checked);
        saveScoutedMatch(dataContainer);

        generateQRCodes();
    });

    document.getElementById("exit").addEventListener("click", () => {
        window.localStorage.clear
        window.top.location.href = "/index.html"
    });

    document.getElementById('comments').addEventListener('input', ()=>{
        dataHandler.setComment(document.getElementById("comments").value);
    });

    
    document.getElementById("climb").addEventListener("input", ()=>{
        dataHandler.setEndClimb(document.getElementById("climb").value);
    })

    

    document.getElementById("breakdown").addEventListener("click", breakdownToggle);
    document.getElementById("comments").value = dataContainer.comments;
    document.getElementById("breakdown").textContent = (dataContainer.downTime);
    document.getElementById("climb").value = dataContainer.endClimb;

}


document.getElementById("initials").value = dataContainer.scouterInitials;
if (dataContainer.teamNumber != 0) {
    document.getElementById("teamNumber").value = dataContainer.teamNumber;
}
if (dataContainer.matchNumber != 0) {
    document.getElementById("matchNumber").value = dataContainer.matchNumber;
}

function generateQRCodes() {
    document.getElementById("dataQR").innerHTML = ""
    document.getElementById("commentQR").innerHTML = ""

    var size = document.getElementById("dataQR").clientWidth;
    var data = dataContainer.exportData()
    dataQR = new window.QRCode(document.getElementById("dataQR"), {
        text: data[1],
        height: size,
        width: size
    });

    if (dataContainer.comments != "" || dataContainer.defComments != "") {
        commentQR = new window.QRCode(document.getElementById("commentQR"), {
            text: data[2],
            height: size,
            width: size
        });
    }
}

let breakdownTotal = dataContainer.downTime * 1000;
let isBroken = false;
let starting = 0;

function breakdownToggle() {
  if (isBroken == false) {
    starting = Date.now(); // Use global variable
    isBroken = true;
    document.getElementById("breakdown").style.backgroundColor = "yellow";

    
    breakdownInterval = setInterval(() => {
      document.getElementById("breakdown").textContent = (((Date.now() - starting)+ breakdownTotal) / 1000 ).toFixed(1);
    }, 100);
}
else{
    document.getElementById("breakdown").style.backgroundColor = "LightGray";
    isBroken = false;
    //alert(Date.now() - starting);
    clearInterval(breakdownInterval);
    let elapsed = ((Date.now() - starting));
    breakdownTotal += elapsed;
    document.getElementById("breakdown").textContent = (breakdownTotal/1000).toFixed(1);
    dataHandler.setDownTime((breakdownTotal/1000).toFixed(1));
  }}

setButtons();
