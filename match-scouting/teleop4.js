var slider = document.querySelector(".slider");
var output = document.getElementById("value");





slider.oninput = function() 
{
  output.innerHTML = this.value + "±" + (inputField.value/2);
}

const upArrow = document.getElementById("upArrow");
const downArrow = document.getElementById("downArrow");
const inputField = document.querySelector("#error");
const submit = document.getElementById("submit");
var highValue = document.getElementById("highValue");
var lowValue = document.getElementById("lowValue");
let lowestPossible = 0;
var maxBallCount = document.getElementById("max-ball");
var maxBallCountTwo = document.getElementById("max-ball-two");
var maxValue = 20;

const lineOne = document.querySelector(".marginLine");
const lineTwo = document.querySelector(".marginLineTwo");
const embedSlider = document.querySelector(".embed-container");
const sliderButton = document.querySelector(".slider::-webkit-slider-thumb");

var marginLength = 0;
let lengthAdjuster = 0;

output.innerHTML = slider.value +"±" + (inputField.value/2); 

function updateMargins(currentValue, sliderValue) {
    lineOne.style.width = (100*(currentValue))/(parseInt(slider.max)) + "%";
    lineTwo.style.width = (100*(currentValue))/(parseInt(slider.max)) + "%";
    lineOne.style.right = 100*(1-(sliderValue)/(parseInt(slider.max))) + "%";
    lineTwo.style.left = 100*((sliderValue)/(parseInt(slider.max))) + "%";
}


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

    updateMargins(parseInt(inputField.value), parseInt(slider.value));
    
})

maxBallCountTwo.addEventListener("click", () =>{
    if(slider.max>0)
    {
        maxValue-=5;
        slider.max = maxValue;
        output.innerHTML = maxValue + "±" + (inputField.value/2);
    }

    updateMargins(parseInt(inputField.value), parseInt(slider.value));
})



upArrow.addEventListener("click", () => {
    let currentValue = parseInt(inputField.value);
    let sliderValue = parseInt(slider.value);

    // if(currentValue)
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

    output.innerHTML = slider.value +"±" + (inputField.value/2); 

    updateMargins(parseInt(inputField.value), parseInt(slider.value));  

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

    output.innerHTML = slider.value + "±" + (inputField.value/2);

    updateMargins(parseInt(inputField.value), parseInt(slider.value));


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

    updateMargins(parseInt(inputField.value), parseInt(slider.value));  

    // lineTwo.style.marginLeft = "10px";
});

inputField.addEventListener("input", () => {
    updateMargins(parseInt(inputField.value), parseInt(slider.value)); 
});

submit.addEventListener("click", () => {
    
});


