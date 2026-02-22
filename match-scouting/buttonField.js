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

allButtons.forEach(button => {
    button.addEventListener("click", () => {
        window.open("", "_blank");         
    });
});
