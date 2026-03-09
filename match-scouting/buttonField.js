import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler();
dataHandler.loadData(localStorage.getItem("dataHandler"));

const redZone = document.querySelector("#leftMostButton");

const redTrenchTop = document.querySelector("#midLeft1");
const redBumpTop = document.querySelector("#midLeft2");
const redBumpBottom = document.querySelector("#midLeft3");
const redTrenchBottom = document.querySelector("#midLeft4");

const blueZone = document.querySelector("#rightMostButton");

const blueTrenchTop = document.querySelector("#midRight1");
const blueBumpTop = document.querySelector("#midRight2");
const blueBumpBottom = document.querySelector("#midRight3");
const blueTrenchBottom = document.querySelector("#midRight4");

const neutralZone = document.querySelector("#midZone");
// const leftHubButton = document.querySelector("#midLeftHub");
// const rightHubButton = document.querySelector("#midRightHub");



const allButtons = [

    redZone,

    redTrenchTop,
    redBumpTop,
    redBumpBottom,
    redTrenchBottom,



    neutralZone,
    
    blueTrenchTop,
    blueBumpTop,
    // rightHubButton,
    blueBumpBottom,
    blueTrenchBottom,

    blueZone,


];

allButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        let buttonValue = parseInt(button.children[1].textContent);
        button.children[1].textContent = buttonValue + 1;
        // console.log(buttonValue+1);
        dataHandler.setBooleanValue(index, true);
        dataHandler.setButtonValue(index, buttonValue + 1);

    });

    button.addEventListener("mouseenter", () => {
        button.children[1].style.opacity = "1";
    });
     
    button.addEventListener("mouseleave", () => {
        button.children[1].style.opacity = "0.3";
    });
});


// function setButtons() {


    
//     document.getElementById("leftMostButton").addEventListener("click", () => {
//         console.log("Left button clicked");
//         dataHandler.setBooleanValue(8, true); 
//     });
//     document.getElementById("rightMostButton").addEventListener("click", () => {
//         console.log("Right button clicked");
//         dataHandler.setBooleanValue(9, true);
//     });
//     document.getElementById("midLeft1").addEventListener("click", () => {
//         console.log("Mid left button 1 clicked");
//         dataHandler.setBooleanValue(10, true);
//     }); 
//     document.getElementById("midLeft2").addEventListener("click", () => {
//         console.log("Mid left button 2 clicked");
//         dataHandler.setBooleanValue(11, true);
//     });
//     document.getElementById("midLeft3").addEventListener("click", () => {
//         console.log("Mid left button 3 clicked");
//         dataHandler.setBooleanValue(12, true);
//     });
//     document.getElementById("midLeft4").addEventListener("click", () => {
//         console.log("Mid left button 4 clicked");
//         dataHandler.setBooleanValue(13, true);
//     });

//     document.getElementById("midRight1").addEventListener("click", () => {
//         console.log("Mid right button 1 clicked");
//         dataHandler.setBooleanValue(14, true);
//     });
//     document.getElementById("midRight2").addEventListener("click", () => {
//         console.log("Mid right button 2 clicked");
//         dataHandler.setBooleanValue(15, true);
//     });
//     document.getElementById("midRight3").addEventListener("click", () => {
//         console.log("Mid right button 3 clicked");
//         dataHandler.setBooleanValue(16, true);
//     });
//     document.getElementById("midRight4").addEventListener("click", () => {
//         console.log("Mid right button 4 clicked");
//         dataHandler.setBooleanValue(17, true);
//     });
// }

// setButtons();






