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

function setButtons() {
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

setButtons()
