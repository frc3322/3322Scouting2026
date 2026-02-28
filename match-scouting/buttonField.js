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

const leftButtonCount = document.querySelector("#leftButtonCount");
const rightButtonCount = document.querySelector("#rightButtonCount");
const midLeftButtonOneCount = document.querySelector("#midLeft1Count");
const midLeftButtonTwoCount = document.querySelector("#midLeft2Count");
const midLeftButtonThreeCount = document.querySelector("#midLeft3Count");   
const midLeftButtonFourCount = document.querySelector("#midLeft4Count");
const midRightButtonOneCount = document.querySelector("#midRight1Count");
const midRightButtonTwoCount = document.querySelector("#midRight2Count");
const midRightButtonThreeCount = document.querySelector("#midRight3Count");
const midRightButtonFourCount = document.querySelector("#midRight4Count");
let buttonHover = false;
let indexHolder = -1;



const Matrix = [
    [leftButton, leftButtonCount],
    [rightButton, rightButtonCount],
    [midLeftButtonOne, midLeftButtonOneCount],
    [midLeftButtonTwo, midLeftButtonTwoCount],
    [midLeftButtonThree, midLeftButtonThreeCount],
    [midLeftButtonFour, midLeftButtonFourCount],
    [midRightButtonOne, midRightButtonOneCount],
    [midRightButtonTwo, midRightButtonTwoCount],
    [midRightButtonThree, midRightButtonThreeCount],
    [midRightButtonFour, midRightButtonFourCount]
];

// function updateCounts(){
for (let i = 0; i < Matrix.length; i++) {
    const button = Matrix[i][0];
    const count = Matrix[i][1];
    button.addEventListener("mouseenter", () => {
        buttonHover = true;
        count.style.opacity = "1";
        indexHolder = i;
    });
    button.addEventListener("mouseleave", () => {
        buttonHover = false;
        count.style.opacity = "0.1";
    });
}
// }



const intervalId = setInterval(() => {
    if (buttonHover){
        const count = Matrix[indexHolder][1];
        count.textContent = (parseFloat(count.textContent) + 0.1).toFixed(1);
    }
}, 100);


leftButton.addEventListener("mouseenter", () => {
    leftButtonCount.style.opacity = "1";
})

leftButton.addEventListener("mouseleave", () => {
    leftButtonCount.style.opacity = "0.1";
})




// allButtons.forEach(button => {
//     button.addEventListener("click", () => {
//         window.open("", "_blank");         
//     });
// });
