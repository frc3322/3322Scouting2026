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



const gacha = document.getElementById("gacha");
const gachaChar = document.getElementById("card-char");
const gachaAcc = document.getElementById("card-acc");
var gachaCode = "";

gacha.style.display = "none";


function setButtons() {
    console.log(dataContainer.exportDataForPrescouting()[0])

    document.getElementById("open-gacha").addEventListener('click', rollGacha)

    document.getElementById("prescouting-submit").addEventListener("click", () => {
        
        dataHandler.setScouterInitials(document.getElementById("initials").value.toLowerCase());
        dataHandler.setTeamNumber(document.getElementById("teamNumber").value);
        dataHandler.setMatchNumber(document.getElementById("matchNumber").value);
        dataHandler.setComment(document.getElementById("comments").value);

        navigator.clipboard.writeText(dataContainer.exportDataForPrescouting()[1] +";" + btoa(gachaCode));
        window.open("https://forms.gle/J8mob1XknuaDmDy89");
    });

 

    document.getElementById("exit").addEventListener("click", () => {
        window.top.location.href = "../index.html"
    });

    document.getElementById("exit-gacha").addEventListener("click", () => {
        window.top.location.href = "../index.html"
    });

    
    document.getElementById("breakdown").addEventListener("click", breakdownToggle);

    document.getElementById('comments').addEventListener('input', ()=>{
        dataHandler.setComment(document.getElementById("comments").value);
    });

    
    document.getElementById("climb").addEventListener("input", ()=>{
        dataHandler.setEndClimb(document.getElementById("climb").value);
    })

    
    document.getElementById("breakdown").addEventListener("click", breakdownToggle);

    document.getElementById("clear-breakdown").addEventListener("click", () => {
        breakdownTotal = 0;
        dataHandler.setDownTime(0);
        document.getElementById("breakdown").textContent = "0.0";
    });
    
    document.getElementById("card").addEventListener('click', ()=>{
        document.getElementById("card").classList.add("open");
        document.getElementById("gacha-text2").textContent = gachaCode;
    })


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


let breakdownTotal = dataContainer.downTime * 1000;
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


const gachaChars = [
    "",
    "Dillon",
    "Joowon",
    "Goodson",
    "Meng",
    "Marek"
]; 
const gachaAccs = [
    "",
    "Common ",
    "Propeller Hat ",
    "Cowboy Hat ",
    "Douglass + "
]; 
function rollGacha(){
    gacha.style.display = "inline";
    let acc = 0;
    let char = 0;

    let charRoll = Math.random() * 100
    let accRoll = Math.random() * 100
    let blueRoll = Math.random() * 100
    if(charRoll < 90){
        char = Math.floor(Math.random() * 4) + 1;
    }
    else{
        char = 5;
    }

    if(accRoll > 90){
        acc = 4;
    }
    else if(accRoll > 40){
        acc = Math.floor(Math.random() * 2) + 2;
    }
    else{
        acc = 1;
    }

    gachaChar.src = "../images/card-assets/char-" + char + ".png"
    gachaAcc.src = "../images/card-assets/acc-" + acc + ".png"
    
    let blue = ""
    if(blueRoll > 95){
        gachaChar.style.filter = "hue-rotate(200deg) saturate(1.5)"
        blue = "Blue "
    }
    
    gachaCode = blue + gachaAccs[acc] + gachaChars[char];
}

setButtons();
