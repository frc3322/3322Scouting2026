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

upArrow.addEventListener("click", () => {
    let currentValue = parseInt(inputField.value);  
    if (currentValue < parseInt(inputField.max)) {
        inputField.value = currentValue + 1;
    }
});

downArrow.addEventListener("click", () => {
    let currentValue = parseInt(inputField.value);  
    if (currentValue > parseInt(inputField.min)) {
        inputField.value = currentValue - 1;
    }
});