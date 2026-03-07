import { DataContainer } from "../data/DataContainer.js";
import { DataHandler } from "../data/DataHandler.js";


var dataContainer = new DataContainer();
var dataHandler = new DataHandler();
dataHandler = window.parent.dataHandler;
dataContainer = dataHandler.getDataContainer();

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

var dataQR;
var commentQR;

function updateStars(stars) {
    dataHandler.setRating(stars)
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

    document.getElementById("submit").addEventListener("click", () => {
        dataHandler.setScouterInitials(document.getElementById("initials").value.toLowerCase());
        dataHandler.setTeamNumber(document.getElementById("teamNumber").value);
        dataHandler.setMatchNumber(document.getElementById("matchNumber").value);
        dataHandler.setComment(document.getElementById("comments").value);

        generateQRCodes();
    });

    document.getElementById("exit").addEventListener("click", () => {
        window.top.location.href = "/index.html"
    });


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

    if (dataContainer.comment != "") {
        commentQR = new window.QRCode(document.getElementById("commentQR"), {
            text: data[2],
            height: size,
            width: size
        });
    }
}


updateStars(5);
setButtons();

