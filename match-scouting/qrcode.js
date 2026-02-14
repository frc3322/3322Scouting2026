import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler;
dataHandler.loadData(localStorage.getItem("dataHandler"));



    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }


    let condensedList = [];

    for(const element of dataHandler.getBooleanValues()) {
        if(element == true) {
            condensedList.push("t");
        } 
        else if (element == false) {
            condensedList.push("f");
        }
        else {
            condensedList.push(element);
        }
    }

    const data = "" + dataHandler.getAutoFuelFailed() + "," +  dataHandler.getAutoFuel() + "," +  dataHandler.getTeleFuel() + "," +  dataHandler.getAutoPass() + "," +  dataHandler.getTelePass() + "," +  dataHandler.getAutoFuelAccuracy() + "," +  dataHandler.getTeleFuelAccuracy() + "," +  dataHandler.getTeleFuelTime() + "," +  dataHandler.getTelePassTime() + "," +  dataHandler.getTeleCycleCounter() + "," +  dataHandler.getScouterName() + "," +   dataHandler.getTeamNumber() + "," +   dataHandler.getMatchNumber() + "," + condensedList;

    document.getElementById("data").textContent = data;




    function generateQRCode() {

    if(data) {
      new QRCode(document.getElementById("qrcode"), {
        text: data,
        width: 200,
        height: 200
      });
    } else {
      document.getElementById("qrcode").textContent = "No data provided in URL.";
    }


  
  }

      generateQRCode();
