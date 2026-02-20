## Read me 

<h1>3322's Scouting App 2026 Documentation</h1>
<p>Hello everyone of Github. This guide will try to show you how to use our scouting system, as well as how to update edit it to create your own scouting webiste for any competition.</p>


<h2>Contacts?</h2>
<p> Do you have any questions? Feel free to reach out: <br> Discord: Waluigi6 (Please ping in the main FRC server and make sure to follow YPP :) )</p>


<h2>How do you add a new page to the thingy? </h2>
<p>Okay so to make a new page you will need about three files. For this example we are going to be making an auton file.</p>
<h3>1. HTMl File - "auton.html"</h3>
<p>i. At the top of the file in the bottom tab, there is a thing that goes like this:</p>

```
    <div class="fixedElement" id="nav">
      <a id="nav-auton" href = "auton.html">
      <img src="../images/Auto-Button.png">
      </a>
      <a id="nav-teleop1" href = "teleop1.html">
      <img src="../images/Tele-button.png">
      </a>
      <a id="nav-teleop2" href = "teleop2.html">
      <img src="../images/Tele-button.png">
      </a>
      <a id="nav-teleop3" href = "teleop3.html">
      <img src="../images/Tele-button.png">
      </a>
      <a id="nav-teleop4" href = "teleop4.html">
      <img src="../images/Tele-button.png">
      </a>
      <a id="nav-endgame" href = "endgame.html">
      <img src="../images/Endgame-Button.png">
      </a>
    </div>
```
<p> So basically this part here creates the navigation bar on the side. Each of the parts of it are one of the buttons. <br></p>

<p> ii. In the body, there will be all of the inputs. These can be any type of input, such as like a checkbox or a dropdown box. Here is a button, which is going to update a text.</p>

```
      <button class="button" style="background-color: rgb(130, 229, 143);" id="hub1" class="incButton">+1</button>
```
<p>Make sure that you're input has an id. The label gives the label but it is not needed.</p>

<p> iii. At the bottom of the code, you'll ntoice </p>

```
    <script type="module" src="Constants.js"></script>
    <script type="module" src="DataHandler.js"></script>
    <script type="module" src="auton.js"></script></body>
```
<p>The first two lines connect it to the contstants and the data handler. The third one is the page specific javascript file, which we'll create later in step 2.</p>

<h3>2. Javascript File - "auton.js"</h3>

<p> i. Set up data handler </p>

```
import { ActionType } from "./Constants.js";
import { DataHandler } from "./DataHandler.js";

var dataHandler = new DataHandler;
dataHandler.loadData(localStorage.getItem("dataHandler"));
```
<p>That will be actually pretty cool because it creates the data handler for the file.</p>

<p> ii. </p>

```
function setButtons() {
    
  document.getElementById("hub1").addEventListener("click", () => {
      increaseNumber(1);
      
  });
}
```
<p>So this part is what puts the scans on the buttons / elements that are goign to update. It is going to call a function called increaseNumber(), which we are going to create soon.</p> 

<p>iii. increasenumber()</p>

```
function increaseNumber(amount) {
    dataHandler.incrementAuto(ActionType.AutoFuel, amount);
    document.getElementById("fuelCounter").textContent = dataHandler.getAutoFuel();
    localStorage.setItem("dataHandler", dataHandler.toString());
}
```
<p>This part has the function and then it takes in the amount of the balls that it increases by, and then basically runs the datahandler to control it. the next two lines then are what saves the data in the data handler, and then saves it to the computer.</p>