import { DataContainer } from "../data/DataContainer.js";
import { DataHandler } from "../data/DataHandler.js";


var dataContainer = new DataContainer();
var dataHandler = new DataHandler(dataContainer);

try {
    dataHandler = window.parent.dataHandler;
    dataContainer = dataHandler.getDataContainer();
}
catch { }

const mainButtons = document.getElementById("main-buttons")
const startButtons = document.getElementById("start-buttons")
const actionGrid = document.getElementById("action-grid")

mainButtons.style.display = "none";

function setButtons() {
    document.getElementById("start-left").addEventListener('mousemove', () => {
        setStart("l");
    });
    document.getElementById("start-center").addEventListener("click", () => {
        setStart("c");
    });
    document.getElementById("start-right").addEventListener("click", () => {
        setStart("r");
    });

    document.getElementById("middle-left").addEventListener("click", () => {
        setAction("l");
    });
    document.getElementById("middle-right").addEventListener("click", () => {
        setAction("r");
    });
    document.getElementById("depot").addEventListener("click", () => {
        setAction("d");
    });
    document.getElementById("outpost").addEventListener("click", () => {
        setAction("o");
    });
    document.getElementById("shoot").addEventListener("click", () => {
        setAction("s");
    });
    document.getElementById("climb").addEventListener("click", () => {
        setAction("c");
    });
    document.getElementById("breakdown").addEventListener("click", () => {
        setAction("br");
    });
    document.getElementById("undo").addEventListener("click", () => {
        undoAction();
    });
}



function setStart(start) {
    actionGrid.children[dataHandler.autoAction].innerHTML = document.getElementById("act-" + start).innerHTML;
    dataHandler.setAutoAction(start);
    mainButtons.style.display = "inline";
    startButtons.style.display = "none"
}

function setAction(action) {
    if (dataHandler.autoAction < 8) {
        actionGrid.children[dataHandler.autoAction].innerHTML = document.getElementById("act-" + action).innerHTML;
        if (action == "s") {
            setShootListeners()
        }
        dataHandler.setAutoAction(action);
    }
}

function setShootListeners(){
    var shootAction = actionGrid.children[dataHandler.autoAction].children[0];
            shootAction.addEventListener('touchstart', (e) => {
                mouseDown = true;
                touchId = e.touches.length - 1;
                shootModule = shootAction;
                shootMouseStart = e.touches[touchId].clientY;
                shootMouseDiff = 0;
                shootDiff = 0;
                shootStartNumber = JSON.parse(shootModule.children[1].textContent)
            })
            document.addEventListener('touchmove', (e) => {
                if (mouseDown) {
                    if(shootStartNumber + shootMouseDiff >= 0){
                        shootModule.children[1].textContent = shootStartNumber + shootMouseDiff;
                        shootDiff = shootMouseDiff;
                        shootMouseDiff = Math.floor((shootMouseStart - e.touches[touchId].clientY) / 25)
                    }
                    else{
                        shootMouseDiff = -shootStartNumber;
                        shootDiff = -shootStartNumber;
                    }
                }
            })
            document.addEventListener('touchend', (e) => {
                if(mouseDown){
                    mouseDown = false;
                    dataHandler.incAutoScored(shootDiff)
                }
            })
}

function undoAction() {
    mouseDown = false;
    dataHandler.undoAutoAction();

    if(actionGrid.children[dataHandler.autoAction].children[0].id == "action-shoot"){
        dataHandler.incAutoScored(-JSON.parse(actionGrid.children[dataHandler.autoAction].children[0].children[1].textContent))
    }
    actionGrid.children[dataHandler.autoAction].innerHTML = "";
    if (dataHandler.autoAction < 1) {
        startButtons.style.display = "block";
        mainButtons.style.display = "none"
    }
}

var mouseDown = false;
var touchId = false;
var shootModule;
var shootMouseStart;
var shootMouseDiff = 0;
var shootDiff = 0;
var shootStartNumber = 0;



if(window.localStorage.getItem("teamColor") == "red"){
    document.getElementById('field-image').src="../images/red-field.svg"
    document.getElementById('outpost').style.left = "80%"
    document.getElementById('depot').style.left = "29.5%"
    document.getElementById('climb').style.left = "55%"
}



setButtons()