import { DataContainer } from "../data/DataContainer.js";
import { DataHandler } from "../data/DataHandler.js";


var dataContainer = new DataContainer();
var dataHandler = new DataHandler();
dataHandler = window.parent.dataHandler;
dataContainer = dataHandler.getDataContainer();

function setButtons(){
    
}
