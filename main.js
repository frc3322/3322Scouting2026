function setButtons() {
    
    document.getElementById("scoutBtn").addEventListener("click", () => {
        prompt("What are your initals? (Ex. DG)");
        prompt("What team are WE scouting? (Ex. 10656)");
        prompt("What match number is this? (Ex. 14)");
        window.location.href = "/match-scouting/auton.html";


    });

}

setButtons();