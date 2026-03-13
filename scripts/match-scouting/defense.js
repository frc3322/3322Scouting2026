import { DefenseType } from "../Constants.js";
import { DataContainer } from "../data/DataContainer.js";
import { DataHandler } from "../data/DataHandler.js";


var dataContainer = new DataContainer();
var dataHandler = new DataHandler(dataContainer);

try {
    dataHandler = window.parent.dataHandler;
    dataContainer = dataHandler.getDataContainer();
}
catch { }

const redZone = document.querySelector("#leftMostButton");

const redTrenchTop = document.querySelector("#midLeft1");
const redBumpTop = document.querySelector("#midLeft2");
const redBumpBottom = document.querySelector("#midLeft3");
const redTrenchBottom = document.querySelector("#midLeft4");

const neutralZone = document.querySelector("#midZone");

const blueTrenchTop = document.querySelector("#midRight1");
const blueBumpTop = document.querySelector("#midRight2");
const blueBumpBottom = document.querySelector("#midRight3");
const blueTrenchBottom = document.querySelector("#midRight4");

const blueZone = document.querySelector("#rightMostButton");

const counter = document.getElementById('CyclesCounter');
var count = 0;

const star1 = document.getElementById("rate1");
const star2 = document.getElementById("rate2");
const star3 = document.getElementById("rate3");
const star4 = document.getElementById("rate4");
const star5 = document.getElementById("rate5");
const starArray = [
    star1,
    star2,
    star3,
    star4,
    star5
];

const comments = document.getElementById("comments");
comments.textContent = dataContainer.defComments;

const bindingsTemplate = [
    [redZone, document.getElementById('leftButtonCount'), DefenseType.defAZone],

    [redTrenchTop, document.getElementById('midLeft1Count'), DefenseType.defATrench],
    [redTrenchBottom, document.getElementById('midLeft1Count'), DefenseType.defATrench],
    [redBumpTop, document.getElementById('midLeft3Count'), DefenseType.defABump],
    [redBumpBottom, document.getElementById('midLeft3Count'), DefenseType.defABump],

    [neutralZone, document.getElementById('midZoneCount'), DefenseType.defNZone],

    [blueBumpBottom, document.getElementById('midRight3Count'), DefenseType.defOBump],
    [blueBumpTop, document.getElementById('midRight3Count'), DefenseType.defOBump],
    [blueTrenchBottom, document.getElementById('midRight1Count'), DefenseType.defOTrench],
    [blueTrenchTop, document.getElementById('midRight1Count'), DefenseType.defOTrench],

    [blueZone, document.getElementById('rightButtonCount'), DefenseType.defOZone]
];

var bindings = [
    [redZone, document.getElementById('leftButtonCount'), DefenseType.defAZone],

    [redTrenchTop, document.getElementById('midLeft1Count'), DefenseType.defATrench],
    [redTrenchBottom, document.getElementById('midLeft1Count'), DefenseType.defATrench],
    [redBumpTop, document.getElementById('midLeft3Count'), DefenseType.defABump],
    [redBumpBottom, document.getElementById('midLeft3Count'), DefenseType.defABump],

    [neutralZone, document.getElementById('midZoneCount'), DefenseType.defNZone],

    [blueBumpBottom, document.getElementById('midRight3Count'), DefenseType.defOBump],
    [blueBumpTop, document.getElementById('midRight3Count'), DefenseType.defOBump],
    [blueTrenchBottom, document.getElementById('midRight1Count'), DefenseType.defOTrench],
    [blueTrenchTop, document.getElementById('midRight1Count'), DefenseType.defOTrench],

    [blueZone, document.getElementById('rightButtonCount'), DefenseType.defOZone]
];


function updateStars(stars) {
    dataHandler.setDefRating(stars);
    for (let i = 0; i < 5; i++) {
        if (i < stars) {
            starArray[i].innerHTML = "&#9733;";
        }
        else {
            starArray[i].innerHTML = "&#9734";
        }
    }
}



function setButtons() {

    star1.addEventListener("click", () => {
        updateStars(1);
    });
    star2.addEventListener("click", () => {
        updateStars(2);
    });
    star3.addEventListener("click", () => {
        updateStars(3);
    });
    star4.addEventListener("click", () => {
        updateStars(4);
    });
    star5.addEventListener("click", () => {
        updateStars(5);
    });

    comments.addEventListener("input", ()=>{
        dataHandler.setDefComment(comments.value);
    })

    for (let binding of bindings) {
        binding[1].textContent = dataHandler.incDef(binding[2], 0);
        binding[0].addEventListener('click', () => {
            try {
                binding[1].textContent = dataHandler.incDef(binding[2], 1);
            }
            catch {
            }
        })
        
    }

    document.getElementById("up1").addEventListener('click', () => { changeCount(1) });
    document.getElementById("down1").addEventListener('click', () => { changeCount(-1) });
}

function flipField(flipped){
    if(flipped){

    document.getElementById("buttonField").style.transform = "rotate(0deg)"
    for(let binding of bindings){
        binding[1].style.transform = "rotate(0deg)"
    }
    }
    else{

    document.getElementById("buttonField").style.transform = "rotate(180deg)"
    for(let binding of bindings){
        binding[1].style.transform = "rotate(180deg)"
    }
    }
}

function changeCount(amount) {
    var downwardsCounter = 0;
    count += amount;
    if (count < 0) {
        count = 0;
        downwardsCounter++;
    }
    counter.textContent = count;
    if (downwardsCounter == 10) {
        alert("What are we doing gang? The counter only goes down to 0.");
        downwardsCounter += 1;
    }
    if (downwardsCounter == 20) {
        alert("I'm genuinly gonna report you to Stone Cold Joe. Get better at scouting little bro.");
        downwardsCounter += 1;
    }
    dataHandler.incFuelStolen(amount);
}

function setBindings(reverse){
    if(reverse){
        for(let [i, val] of bindingsTemplate.entries()){
            bindings[bindingsTemplate.length - i - 1][2] = val[2]
        }
    }

}
if(window.localStorage.getItem("teamColor") == "blue"){
    setBindings(true)
    flipField(true)
}
else{
    setBindings(false)
    flipField(false)
}


updateStars(dataContainer.defRating);
setButtons()
