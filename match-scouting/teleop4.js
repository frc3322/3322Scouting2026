var slider = document.querySelector(".slider");
var output = document.getElementById("value");
output.innerHTML = slider.value; 
slider.oninput = function() 
{
  output.innerHTML = this.value;
}

const upArrow = document.getElementById("upArrow");
const downArrow = document.getElementById("downArrow");
const inputField = document.querySelector(".error");
var highValue = document.getElementById("highValue");
var lowValue = document.getElementById("lowValue");
let lowestPossible = 0;


upArrow.addEventListener("click", () => {
    let currentValue = parseInt(inputField.value);
    let sliderValue = parseInt(slider.value);

    if (currentValue < parseInt(inputField.max)) {
        inputField.value = currentValue + 1;
        currentValue=inputField.value;
    }

    lowestPossible = sliderValue - currentValue;
        if (lowestPossible < 0) {
            lowestPossible = 0;
        }
    lowValue.innerHTML = lowestPossible;

    let highestPossible = sliderValue + parseInt(inputField.value);
        if (highestPossible > parseInt(slider.max)) {
            highestPossible = parseInt(slider.max);
        }
    highValue.innerHTML = highestPossible;
});

downArrow.addEventListener("click", () => {
    let currentValue = parseInt(inputField.value);
    let sliderValue = parseInt(slider.value);
  
    if (currentValue > parseInt(inputField.min)) {
        inputField.value = currentValue - 1;
        currentValue=inputField.value;
    }

    lowestPossible = sliderValue - currentValue;
        if (lowestPossible < 0) {
            lowestPossible = 0;
        }
    lowValue.innerHTML = lowestPossible;

    let highestPossible = sliderValue + parseInt(inputField.value);
        if (highestPossible > parseInt(slider.max)) {
            highestPossible = parseInt(slider.max);
        }
    highValue.innerHTML = highestPossible;
});


slider.addEventListener("input", () => {
    let marginOfError = parseInt(inputField.value);
    let sliderValue = parseInt(slider.value);

    let lowestPossible = sliderValue - marginOfError;
    if (lowestPossible < 0) {
        lowestPossible = 0;
    }
    lowValue.innerHTML = lowestPossible;

    let highestPossible = sliderValue + marginOfError;
        if (highestPossible > parseInt(slider.max)) {
            highestPossible = parseInt(slider.max);
        }
    highValue.innerHTML = highestPossible;


});

