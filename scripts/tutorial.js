
var current = 0;
const image = document.getElementById("image")
const dialogue = document.getElementById("dialogue")
const joowon = document.getElementById("joowon")
const textbox = document.getElementById("textbox")


document.getElementById("next").addEventListener('click', () =>{updateImage(1)})
document.getElementById("prev").addEventListener('click', () =>{updateImage(-1)})
document.getElementById("back").addEventListener('click', () =>{window.location.href = "./index.html";})

const positions = [
    {
        slide: 1,
        text: "Welcome to the 2026 Scouting App",
        position: { x: 47, y: 40 },
        joowon: "up"
    },
    {
        slide: 1,
        text: "Click on Douglas to Start",
        position: { x: 47, y: 40 },
        joowon: "up"
    },
    {
        slide: 2,
        text: "Enter your initials, team number, and match number",
        position: { x: 47, y: 40 },
        joowon: "up"
    },
    {
        slide: 3,
        text: "This is the auto slide. Choose the starting position of the bot",
        position: { x: 34, y: 20 },
        joowon: "up"
    },
    {
        slide: 4,
        text: "Choose the actions the bot takes during auto. O, D, L, and R indicate intaking from Outpost, Depot, Left side of the Neutral Zone, and Right side of the Neutral Zone, respectively.",
        position: { x: 56, y: 31 },
        joowon: "up"
    },
    {
        slide: 4,
        text: "C indicate climb, BR indicates Breakdown, and S indicates Shoot",
        position: { x: 56, y: 31 },
        joowon: "up"
    },
    {
        slide: 5,
        text: "On the shoot box, click and drag up and down to indicate how many balls the bot scored",
        position: { x: 29, y: 23 },
        joowon: "up"
    },
    {
        slide: 6,
        text: "This is the Teleop Tab. Up top, we have the shoot, pass, shuttle, and delete tabs",
        position: { x: 29, y: 23 },
        joowon: "up"
    },
    {
        slide: 6,
        text: "Shoot indicates shooting into the hub",
        position: { x: 16, y: 20 },
        joowon: "up"
    },
    {
        slide: 6,
        text: "Pass indicates shooting balls from the neutral zone into the alliance zone",
        position: { x: 30, y: 20 },
        joowon: "up"
    },
    {
        slide: 6,
        text: "Shuttle indicates intaking balls to outtake in the alliance zone",
        position: { x: 44, y: 20 },
        joowon: "up"
    },
    {
        slide: 6,
        text: "Delete allows mistakes to be rectified",
        position: { x: 59, y: 20 },
        joowon: "up"
    },
    {
        slide: 6,
        text: "Click on the canvas to shoot one ball,",
        position: { x: 34, y: 56 },
        joowon: "up"
    },
    {
        slide: 6,
        text: "or slide the bar to set a rate. Press and hold the button to shoot",
        position: { x: 34, y: 29 },
        joowon: "down"
    },
    {
        slide: 6,
        text: "We want to count the number of balls shot, and the accuracy bar indicates the accuracy of the bot.",
        position: { x: 62, y: 29 },
        joowon: "up"
    },
    {
        slide: 7,
        text: "This is the defense tab. Click on the field to indicate areas where the bot played defense",
        position: { x: 36, y: 51 },
        joowon: "up"
    },
    {
        slide: 8,
        text: "Click the buttons to indicate the number of cycles of fuel stolen by the bot",
        position: { x: 36, y: 51 },
        joowon: "up"
    },
    {
        slide: 8,
        text: "You can give a rating out of five and leave comments on defense",
        position: { x: 33, y: 28 },
        joowon: "down"
    },
    {
        slide: 9,
        text: "This is the endgame tab. Click on the climb and select the level climbed",
        position: { x: 33, y: 28 },
        joowon: "up"
    },
    {
        slide: 9,
        text: "This is the breakdown timer. Start it when the bot is broken to count the total amount of time broken down",
        position: { x: 33, y: 45 },
        joowon: "up"
    },
    {
        slide: 10,
        text: "Leave comments and submit! Thank you for scouting!",
        position: { x: 31, y: 45 },
        joowon: "up"
    }
]

function updateImage(num){
    if(current + num >= 0 && current + num < positions.length){
        image.src = "./images/tutorial/tut-" + positions[current+num]["slide"] + ".png";
        dialogue.style.left = positions[current+num]["position"]["x"] + "%"
        dialogue.style.top = positions[current+num]["position"]["y"] + "%"
        textbox.textContent = positions[current+num]["text"]
        joowon.src = "./images/tutorial/joowon-" + positions[current+num]["joowon"] + ".png";
        current += num;
    }
}

updateImage(0);