import { DataContainer } from "./data/DataContainer.js";
import { DataHandler } from "./data/DataHandler.js";

const dataContainer = new DataContainer();
const dataHandler = new DataHandler(dataContainer);


const iframe = document.getElementById("iframe");

window.dataHandler = dataHandler;


console.log();
