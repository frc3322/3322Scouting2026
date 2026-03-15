
const redZone = document.querySelector(".redZone");
const blueZone = document.querySelector(".blueZone");

let isRedTeam = false;

redZone.addEventListener("click", () => {
    // console.log("e")
    zoneStyle(true);
    isRedTeam = true;
    updateTeamStatus(isRedTeam);
})

blueZone.addEventListener("click", () => {
    // console.log("e")
    zoneStyle(false);
    isRedTeam = false;
    updateTeamStatus(isRedTeam);
})

function zoneStyle(bool){
    if(bool){
        redZone.classList.remove("de-activated");
        redZone.classList.add("activated");
        blueZone.classList.remove("activated");
        blueZone.classList.add("de-activated");
    }
    else{
        blueZone.classList.remove("de-activated");
        blueZone.classList.add("activated");
        redZone.classList.remove("activated");
        redZone.classList.add("de-activated");
    }
}

document.getElementById("back").addEventListener("click", () => {
    window.location.href = "./index.html";
})

function updateTeamStatus(teamStatus){
    if(teamStatus == true)
    {
        window.localStorage.setItem("teamColor", "red")
    }
    else{
        window.localStorage.setItem("teamColor", "blue")
    }
}
if(window.localStorage.getItem("teamColor") == "red"){
    zoneStyle(true)
}
else{
    zoneStyle(false)
}

