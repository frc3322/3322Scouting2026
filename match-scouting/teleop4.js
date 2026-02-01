var slider = document.querySelector(".slider");
var output = document.getElementById("value");
output.innerHTML = slider.value; 





slider.oninput = function() 
{
  output.innerHTML = this.value;
}

const upArrow = document.getElementById("upArrow");
const downArrow = document.getElementById("downArrow");
const inputField = document.querySelector("#error");
var highValue = document.getElementById("highValue");
var lowValue = document.getElementById("lowValue");
let lowestPossible = 0;
var maxBallCount = document.getElementById("max-ball");
var maxBallCountTwo = document.getElementById("max-ball-two");
var maxValue = 20;

const line = document.querySelector(".marginLine");
var marginLength = 0;
let lengthAdjuster = 0;


maxBallCount.addEventListener("click", () => {
    maxValue+=5;
    slider.max = maxValue;

    // if(100 > parseInt(maxBallCount.value) ){
    //     slider.max = 100;
    // }
    // else if(parseInt(maxBallCount.value) > 400){
    //     slider.max = 400;
    // }
    // else {
    //     slider.max = parseInt(maxBallCount.value);
    // }
    
})

maxBallCountTwo.addEventListener("click", () =>{
    if(slider.max>0)
    {
        maxValue-=5;
        slider.max = maxValue;
        output.innerHTML = maxValue;
    }

})



upArrow.addEventListener("click", () => {
    let currentValue = parseInt(inputField.value);
    let sliderValue = parseInt(slider.value);

    inputField.value = currentValue + 1;
    currentValue=inputField.value;


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

    line.style.width = ( parseInt(highValue.innerHTML) - parseInt(lowValue.innerHTML) )+ "px";
});

downArrow.addEventListener("click", () => {
    let currentValue = parseInt(inputField.value);
    let sliderValue = parseInt(slider.value);
    
    if(0<inputField.value){
        inputField.value = currentValue - 1;
    }
    currentValue=inputField.value;
    

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

    let scaleFactor = (100)/(highValue)

    line.style.width = parseInt(inputField.value)*scaleFactor + "%";

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



