
export class DataContainer {
    matchNumber;
    teamNumber;
    scouterInitials;

    autoScored;
    autoPassed;
    autoAccuracy;
    autoClimb;
    mobility;

    teleScored;
    telePassed;
    teleAccuracy;

    defAZone;
    defABump;
    defATrench;
    defNZone;
    defOZone;
    defOBump;
    defOTrench;
    defRating;
    defComments;
    fuelStolen;

    endClimb;
    downTime;
    rating;
    comments;

    constructor() {
        this.matchNumber = 0;
        this.teamNumber = 0;
        this.scouterInitials = "";

        this.autoScored = 0;
        this.autoPassed = 0;
        this.autoAccuracy = 100;
        this.autoClimb = 0;
        this.mobility = 0;

        this.teleScored = 0;
        this.telePassed = 0;
        this.teleAccuracy = 100;

        this.defAZone = 0;
        this.defABump = 0;
        this.defATrench = 0;
        this.defNZone = 0;
        this.defOZone = 0;
        this.defOBump = 0;
        this.defOTrench = 0;
        this.defRating = 0;
        this.defComments = "";
        this.fuelStolen = 0;

        this.endClimb = 0;
        this.downTime = 0;
        this.rating = 0;
        this.comments = "";
    }

    exportData(){
        var keyString = ""
        var dataString = ""
        var commentString = ""

        for (const [key, value] of Object.entries(this)) {
            keyString += key + ",";
            if(key == "matchNumber" || key == "teamNumber" ){
                dataString += "" + value + ";";
                commentString += "" + value + ";";

            }
            else{
            if(key == "comments" || key == "defComments"){
                dataString += ";";
                commentString += "" + value + ";";
            }
            else{
                dataString += "" + value + ";";
                commentString += ";";
            }
        }
            
        }
        
        return [keyString, dataString, commentString];
        
    }

    



    


}