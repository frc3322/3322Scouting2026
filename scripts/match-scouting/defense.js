import { DefenseType } from "../Constants.js";
import { DataContainer } from "../data/DataContainer.js";
import { DataHandler } from "../data/DataHandler.js";

    let downwardsCounter = 0;

    function changeCount(amount) {
      const counter = document.getElementById('CyclesCounter');
      let count = parseInt(counter.textContent);
      count += amount;
      if(count < 0)
      {
        count = 0;
        downwardsCounter++;
      }
      counter.textContent = count;
      if(downwardsCounter == 10)
      {
        alert("What are we doing gang? The counter only goes down to 0.");
        downwardsCounter += 1;
      }
      if(downwardsCounter == 20)
      {
        alert("I'm genuinly gonna report you to Stone Cold Joe. Get better at scouting little bro.");
        downwardsCounter += 1;
      }
      }
    


var dataContainer = new DataContainer();
var dataHandler = new DataHandler(dataContainer);

try {
    dataHandler = window.parent.dataHandler;
    dataContainer = dataHandler.getDataContainer();
}
catch{}


function setButtons(){
    
}



setButtons();