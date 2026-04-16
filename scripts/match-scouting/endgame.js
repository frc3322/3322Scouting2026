import { DataContainer } from "../data/DataContainer.js";
import { DataHandler } from "../data/DataHandler.js";
import { saveScoutedMatch } from "../data/scoutedMatches.js";


var dataContainer = new DataContainer();
var dataHandler = new DataHandler(dataContainer);

try {
    dataHandler = window.parent.dataHandler;
    dataContainer = dataHandler.getDataContainer();
}
catch { }




var dataQR;
var commentQR;


const gacha = document.getElementById("gacha");
const gachaChar = document.getElementById("card-char");
const gachaAcc = document.getElementById("card-acc");
var gachaCode = "";

gacha.style.display = "none";

function setButtons() {

    document.getElementById("open-gacha").addEventListener('click', () => {
        if (gachaCode != "") {
            showGacha();
        }
        else {
            window.top.location.href = "../index.html"
        }
    })

    document.getElementById("submit").addEventListener("click", () => {
        dataHandler.setScouterInitials(document.getElementById("initials").value.toLowerCase());
        dataHandler.setTeamNumber(document.getElementById("teamNumber").value);
        dataHandler.setMatchNumber(document.getElementById("matchNumber").value);
        dataHandler.setComment(document.getElementById("comments").value);

        if (gachaCode == "") {
            rollGacha();
        }

        generateQRCodes();
    });

    document.getElementById("exit").addEventListener("click", () => {
        window.top.location.href = "../index.html"
    });


    document.getElementById("breakdown").addEventListener("click", breakdownToggle);

    document.getElementById('comments').addEventListener('input', () => {
        dataHandler.setComment(document.getElementById("comments").value);
    });


    document.getElementById("climb").addEventListener("input", () => {
        dataHandler.setEndClimb(document.getElementById("climb").value);
    })
    document.getElementById("exit").addEventListener("click", () => {
        window.top.location.href = "/index.html"
    });


    document.getElementById("breakdown").addEventListener("click", breakdownToggle);

    document.getElementById("clear-breakdown").addEventListener("click", () => {
        breakdownTotal = 0;
        dataHandler.setDownTime(0);
        document.getElementById("breakdown").textContent = "0.0";
    });

    document.getElementById("card").addEventListener('click', () => {
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

function generateQRCodes() {
    document.getElementById("dataQR").innerHTML = ""
    document.getElementById("commentQR").innerHTML = ""
    var size = document.getElementById("dataQR").clientWidth;
    var data = dataContainer.exportData()

    dataQR = new window.QRCode(document.getElementById("dataQR"), {
        text: data[1] + gachaCode,
        height: size,
        width: size,
        correctionLevel: QRCode.CorrectLevel.H
    });

    window.localStorage.setItem("bd-" + dataContainer.matchNumber, data[1])
    window.localStorage.setItem("c-bd-" + dataContainer.matchNumber, data[2])
    window.localStorage.setItem("latest-match", dataContainer.matchNumber)

    if (dataContainer.comments != "" || dataContainer.defComments != "") {
        commentQR = new window.QRCode(document.getElementById("commentQR"), {
            text: data[2],
            height: size,
            width: size,
            correctionLevel: QRCode.CorrectLevel.H
        });
    }

}

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
            document.getElementById("breakdown").textContent = (((Date.now() - starting) + breakdownTotal) / 1000).toFixed(1);
        }, 100);
    }
    else {
        document.getElementById("breakdown").style.backgroundColor = "LightGray";
        isBroken = false;
        //alert(Date.now() - starting);
        clearInterval(breakdownInterval);
        let elapsed = ((Date.now() - starting));
        breakdownTotal += elapsed;
        document.getElementById("breakdown").textContent = (breakdownTotal / 1000).toFixed(1);
        dataHandler.setDownTime((breakdownTotal / 1000).toFixed(1));
    }
}


const gachaChars = {
    1 : [
        { text: "Dillon", src: "dillon.png" },
        { text: "Joowon", src: "joowon.png" },
        { text: "Goodson", src: "goodson.png" },
        { text: "Meng", src: "meng.png" },
        { text: "Elliot", src: "elliot.png" }
    ],
    2 : [
        { text: "Marek", src: "marek.png" }
    ],
    3 : [
        { text: "Ten Goodsons", src: "ten_goodsons.png" }
    ]
};

const gachaAccs = {
    1 : [
        { text: "", src: "common.png" }
    ],
    2 : [
        { text: "Propeller Hat ", src: "propeller.png" },
        { text: "Cowboy Hat ", src: "cowboy.png" }
    ],
    3 : [
        { text: "Douglas + ", src: "douglas.png" }
    ]
};
function rollGacha() {
    let accRarity = 0;
    let charRarity = 0;

    let charRoll = Math.random() * 100
    let accRoll = Math.random() * 100
    let blueRoll = Math.random() * 100

    if (charRoll < 90) {
        charRarity = "1"
    }
    else {
        charRarity = "2"
    }


    if (accRoll > 90) {
        accRarity = "3"
    }
    else if (accRoll > 40) {
        accRarity = "2"
    }
    else {
        accRarity = "1"
    }

    if (accRarity == "1" && charRoll > 98) {
        charRarity = "3"
    }

    let acc = Math.floor(Math.random() * gachaAccs[accRarity].length)
    let char = Math.floor(Math.random() * gachaChars[charRarity].length)

    gachaChar.src = "/images/card-assets/" + gachaChars[charRarity][char]["src"]
    gachaAcc.src = "/images/card-assets/" + gachaAccs[accRarity][acc]["src"]

    let blue = ""
    if (blueRoll > 95) {
        gachaChar.style.filter = "hue-rotate(200deg) saturate(1.5)"
        blue = "Blue "
    }

    gachaCode =  gachaAccs[accRarity][acc]["text"] + blue + gachaChars[charRarity][char]["text"]
}

function showGacha() {
    gacha.style.display = "inline";
}

setButtons();
