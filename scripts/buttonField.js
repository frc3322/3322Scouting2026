import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler();
dataHandler.loadData(localStorage.getItem("dataHandler"));

const leftButton = document.querySelector("#leftMostButton");
const rightButton = document.querySelector("#rightMostButton");
const midLeftButtonOne = document.querySelector("#midLeft1");
const midLeftButtonTwo = document.querySelector("#midLeft2");
const midLeftButtonThree = document.querySelector("#midLeft3");
const midLeftButtonFour = document.querySelector("#midLeft4");
const midRightButtonOne = document.querySelector("#midRight1");
const midRightButtonTwo = document.querySelector("#midRight2");
const midRightButtonThree = document.querySelector("#midRight3");
const midRightButtonFour = document.querySelector("#midRight4");


const allButtons = [
leftButton,
rightButton,
midLeftButtonOne,
midLeftButtonTwo,
midLeftButtonThree,
midLeftButtonFour,
midRightButtonOne,
midRightButtonTwo,
midRightButtonThree,
midRightButtonFour
];



function setButtons() {
    
    document.getElementById("leftMostButton").addEventListener("click", () => {
        console.log("Left button clicked");
        dataHandler.setBooleanValue(8, true);
    });
    document.getElementById("rightMostButton").addEventListener("click", () => {
        console.log("Right button clicked");
        dataHandler.setBooleanValue(9, true);
    });

    document.getElementById("mdLeft1").addEventListener("click", () => {
        console.log("Mid left button 1 clicked");
        dataHandler.setBooleanValue(10, true);
    }); 
    document.getElementById("midLeft2").addEventListener("click", () => {
        console.log("Mid left button 2 clicked");
        dataHandler.setBooleanValue(11, true);
    });
    document.getElementById("midLeft3").addEventListener("click", () => {
        console.log("Mid left button 3 clicked");
        dataHandler.setBooleanValue(12, true);
    });
    document.getElementById("midLeft4").addEventListener("click", () => {
        console.log("Mid left button 4 clicked");
        dataHandler.setBooleanValue(13, true);
    });

    document.getElementById("midRight1").addEventListener("click", () => {
        console.log("Mid right button 1 clicked");
        dataHandler.setBooleanValue(14, true);
    });
    document.getElementById("midRight2").addEventListener("click", () => {
        console.log("Mid right button 2 clicked");
        dataHandler.setBooleanValue(15, true);
    });
    document.getElementById("midRight3").addEventListener("click", () => {
        console.log("Mid right button 3 clicked");
        dataHandler.setBooleanValue(16, true);
    });
    document.getElementById("midRight4").addEventListener("click", () => {
        console.log("Mid right button 4 clicked");
        dataHandler.setBooleanValue(17, true);
    });
}

setButtons();

allButtons.forEach(button => {
    button.addEventListener("click", () => {
        window.open("", "_blank");         
    });
});
