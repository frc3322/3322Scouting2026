
export class DataContainer {
    matchNumber;
    teamNumber;
    scouterInitials;

    autoScored;
    autoAction0 = 0
    autoAction1 = 0
    autoAction2 = 0
    autoAction3 = 0
    autoAction4 = 0
    autoAction5 = 0
    autoAction6 = 0
    autoAction7

    teleScored;
    telePassed;
    teleShuttled;
    teleAccuracy;
    teleShuttled;

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
    comments;

    constructor() {
        this.matchNumber = 0;
        this.teamNumber = 0;
        this.scouterInitials = "";

        this.autoScored = 0;
        this.autoAction0 = "";
        this.autoAction1 = "";
        this.autoAction2 = "";
        this.autoAction3 = "";
        this.autoAction4 = "";
        this.autoAction5 = "";
        this.autoAction6 = "";
        this.autoAction7 = "";


        this.teleScored = 0;
        this.telePassed = 0;
        this.teleShuttled = 0;
        this.teleAccuracy = 100;
        this.teleShuttled = 0;

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
        this.comments = "";
    }

    exportData() {
        var keyString = ""
        var dataString = ""
        var commentString = ""

        for (const [key, value] of Object.entries(this)) {
            keyString += key + ";";
            if (key == "matchNumber" || key == "teamNumber") {
                dataString += "" + value + ";";
                commentString += "" + value + ";";

            }
            else {
                if (key == "comments" || key == "defComments") {
                    dataString += ";";
                    commentString += "" + value + ";";
                }
                else {
                    dataString += "" + value + ";";
                    commentString += ";";
                }
            }

        }

        return [keyString, dataString, commentString];

    }

    exportDataForPrescouting() {
        var keyString = ""
        var dataString = ""

        for (const [key, value] of Object.entries(this)) {
            keyString += key + ";";
            dataString += "" + value + ";";
        }

        return [keyString, dataString];

    }






}