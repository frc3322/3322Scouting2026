import { DataHandler } from "./match scouting/DataHandler";

function initDatahandler(){
    var dataHandler = new DataHandler();
    localStorage.setItem("dataHandler",JSON.stringify(dataHandler))
    var retrievedObject = localStorage.getItem('testObject');
    var recovered = JSON.parse(retrievedObject)
    console.log("Success!")
}
