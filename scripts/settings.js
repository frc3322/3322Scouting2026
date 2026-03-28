
const redZone = document.querySelector(".redZone");
const blueZone = document.querySelector(".blueZone");

let isRedTeam = false;


var dataQR;
var commentQR;
var currentMatch = Number(window.localStorage.getItem("latest-match"))

var matchText = document.getElementById("match-text");
redZone.addEventListener("click", () => {
    // console.log("e")
    zoneStyle(true);
    isRedTeam = true;
    updateTeamStatus(isRedTeam);
})

blueZone.addEventListener("click", () => {
    // console.log("e")
    zoneStyle(false);
    isRedTeam = false;
    updateTeamStatus(isRedTeam);
})

function zoneStyle(bool){
    if(bool){
        redZone.classList.remove("de-activated");
        redZone.classList.add("activated");
        blueZone.classList.remove("activated");
        blueZone.classList.add("de-activated");
    }
    else{
        blueZone.classList.remove("de-activated");
        blueZone.classList.add("activated");
        redZone.classList.remove("activated");
        redZone.classList.add("de-activated");
    }
}

document.getElementById("back").addEventListener("click", () => {
    window.location.href = "./index.html";
})
document.getElementById("all-1").addEventListener("click", () => {
    window.localStorage.setItem("alliance number", 1)
})
document.getElementById("all-2").addEventListener("click", () => {
    window.localStorage.setItem("alliance number", 2)
})
document.getElementById("all-3").addEventListener("click", () => {
    window.localStorage.setItem("alliance number", 3)
})

document.getElementById("left").addEventListener("click", () => {
    try{
    currentMatch -= 1;
    generateQRCodes(currentMatch)
    matchText.innerText = "Match: " + currentMatch;
    }
    catch{}
})

document.getElementById("right").addEventListener("click", () => {
    try{
    currentMatch += 1;
    generateQRCodes(currentMatch)
    matchText.innerText = "Match: " + currentMatch;
    }
    catch{}
})

function updateTeamStatus(teamStatus){
    if(teamStatus == true)
    {
        window.localStorage.setItem("teamColor", "red")
    }
    else{
        window.localStorage.setItem("teamColor", "blue")
    }
}
if(window.localStorage.getItem("teamColor") == "red"){
    zoneStyle(true)
}
else{
    zoneStyle(false)
}

document.getElementById('submit').addEventListener('click', generateQRCodes);


function generateQRCodes(match) {
    document.getElementById("dataQR").innerHTML = ""
    document.getElementById("commentQR").innerHTML = ""

    var size = document.getElementById("dataQR").clientWidth;
    var data = window.localStorage.getItem("bd-" + match);
    var comment = window.localStorage.getItem("c-bd-" + match);
    dataQR = new window.QRCode(document.getElementById("dataQR"), {
        text: data,
        height: size,
        width: size,
        correctionLevel: QRCode.CorrectLevel.H
    });
    
    commentQR = new window.QRCode(document.getElementById("commentQR"), {
        text: comment,
        height: size,
        width: size,
        correctionLevel: QRCode.CorrectLevel.H
    });
}


try{
 document.getElementById("all-" + window.localStorage.getItem("alliance number")).checked = true;
generateQRCodes(currentMatch);
matchText.innerText = "Match: " + currentMatch;
}
catch{

}