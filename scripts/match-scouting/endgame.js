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




var dataQR;
var commentQR;



function setButtons() {

    document.getElementById("prescouting").addEventListener("click", (event) => {
        alert(dataContainer.exportData()[1]);
        console.log(dataContainer.exportData()[1]);
        navigator.clipboard.writeText(dataContainer.exportData()[1]);
        window.open("https://docs.google.com/forms/d/e/1FAIpQLScn1V_LnwZ9ghq8Ot5MUyGtVT4NGMuHtlI56b68iy3xyjgaXA/viewform?usp=header", "_blank");



    });

 
    document.getElementById("submit").addEventListener("click", () => {

        dataHandler.setScouterInitials(document.getElementById("initials").value.toLowerCase());
        dataHandler.setTeamNumber(document.getElementById("teamNumber").value);
        dataHandler.setMatchNumber(document.getElementById("matchNumber").value);
        dataHandler.setComment(document.getElementById("comments").value);
        saveScoutedMatch(dataContainer);

        generateQRCodes();
    });

    document.getElementById("exit").addEventListener("click", () => {
        window.top.location.href = "/index.html"
    });

    
    document.getElementById("breakdown").addEventListener("click", breakdownToggle);

    document.getElementById("exit").addEventListener("click", () => {
        window.top.location.href = "/index.html"
    });

    
    document.getElementById("breakdown").addEventListener("click", breakdownToggle);

    document.getElementById("clear-breakdown").addEventListener("click", () => {
        breakdownTotal = 0;
        dataHandler.setDownTime(0);
        document.getElementById("breakdown").textContent = "0.0";
    });


}
document.getElementById("initials").value = dataContainer.scouterInitials;
if (dataContainer.teamNumber != 0) {
    document.getElementById("teamNumber").value = dataContainer.teamNumber;
}
if (dataContainer.matchNumber != 0) {
    document.getElementById("matchNumber").value = dataContainer.matchNumber;
}
document.getElementById("comments").value = dataContainer.comments;
document.getElementById("breakdown").textContent = (dataContainer.downTime);
document.getElementById("climb").value = dataContainer.endClimb;

function generateQRCodes() {
    document.getElementById("dataQR").innerHTML = ""
    document.getElementById("commentQR").innerHTML = ""

    var size = document.getElementById("dataQR").clientWidth;
    var data = dataContainer.exportData()
    dataQR = new window.QRCode(document.getElementById("dataQR"), {
        text: data[1],
        height: size,
        width: size,
        correctionLevel: QRCode.CorrectLevel.H
    });

    window.localStorage.setItem("bd-"+dataContainer.matchNumber, data[1])
    window.localStorage.setItem("c-bd-"+dataContainer.matchNumber, data[2])

    if (dataContainer.comments != "" || dataContainer.defComments != "") {
        commentQR = new window.QRCode(document.getElementById("commentQR"), {
            text: data[2],
            height: size,
            width: size,
            correctionLevel: QRCode.CorrectLevel.H
        });
    }

}

let breakdownTotal = 0;
let breakdownInterval;
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
