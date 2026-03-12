import { DefenseType } from "../Constants.js";



export class DataHandler {
    dataContainer;
    defStack;

    constructor(DataContainer) {
        this.dataContainer = DataContainer;
        this.defStack = [];
    }

    getDataContainer(){
        return this.dataContainer;
    }

/*
    updateDef(val) {
        switch (val) {
            case (DefenseType.defABump):
                this.dataContainer.defABump += val;
                break;
            case (DefenseType.defATrench):
                this.dataContainer.defATrench += val;
                break;
            case (DefenseType.defAZone):
                this.dataContainer.defAZone += val;
                break;
            case (DefenseType.defNZone):
                this.dataContainer.defNZone += val;
                break;
            case (DefenseType.defOZone):
                this.dataContainer.defOZone += val;
                break;
            case (DefenseType.defOBump):
                this.dataContainer.defOBump += val;
                break;
            case (DefenseType.defOTrench):
                this.dataContainer.defOTrench += val;
                break;
            default:
                break;

        }
    }

    incDef(defenseType, val) {
        this.defStack.push([defenseType, val]);
        this.updateDef(defenseType, val)
    }

    undoDef() {
        if (this.defStack.length > 0) {
            var action = this.stackAuto.pop()
            this.updateDef(action[0], -action[1])
        }
    }

*/

    updateDef(type, val) {
        switch (type) {
            case (DefenseType.defABump):
                this.dataContainer.defABump += val
                return this.dataContainer.defABump;
            case (DefenseType.defATrench):
                 this.dataContainer.defATrench += val;
                return this.dataContainer.defATrench;
            case (DefenseType.defAZone):
                 this.dataContainer.defAZone += val;
                return this.dataContainer.defAZone;
            case (DefenseType.defNZone):
                 this.dataContainer.defNZone += val;
                return this.dataContainer.defNZone;
            case (DefenseType.defOZone):
                 this.dataContainer.defOZone += val;
                return this.dataContainer.defOZone;
            case (DefenseType.defOBump):
                 this.dataContainer.defOBump += val;
                return this.dataContainer.defOBump;
            case (DefenseType.defOTrench):
                this.dataContainer.defOTrench += val;
                return this.dataContainer.defOTrench;
            default:
                return -9999;

        }
    }

    incDef(defenseType, val) {
        this.defStack.push([defenseType, val]);
        return this.updateDef(defenseType, val);
    }

    undoDef() {
        if (this.defStack.length > 0) {
            var action = this.stackAuto.pop()
            this.updateDef(action[0], -action[1])
        }
    }
    /*◇─◇──◇─◇
    ✨Setters✨
    ◇─◇──◇─◇*/

    setMatchNumber(matchNumber) {
        this.dataContainer.matchNumber = matchNumber;
    }

    setTeamNumber(teamNumber) {
        this.dataContainer.teamNumber = teamNumber;
    }

    setScouterInitials(scouterInitials) {
        this.dataContainer.scouterInitials = scouterInitials;
    }

    setAutoScored(val) {
        this.dataContainer.autoScored = val;
    }
    setAutoPassed(val) {
        this.dataContainer.autoPassed = val;
    }

    setAutoAccuracy(autoAccuracy) {
        this.dataContainer.autoAccuracy = autoAccuracy;
    }

    setAutoClimb(autoClimb) {
        this.dataContainer.autoClimb = autoClimb;
    }

    setMobility(mobility) {
        this.dataContainer.mobility = mobility;
    }


    incTeleScored(val) {
        this.dataContainer.teleScored += val;
    }

    incTelePassed(val) {
        this.dataContainer.telePassed += val;
    }

    setTeleScored(val) {
        this.dataContainer.teleScored = val;
    }

    setTelePassed(val) {
        this.dataContainer.telePassed = val;
    }

    setTeleAccuracy(teleAccuracy) {
        this.dataContainer.teleAccuracy = teleAccuracy;
    }

    incFuelStolen(val) {
        this.dataContainer.fuelStolen += val;
    }

    setDefRating(defRating) {
        this.dataContainer.defRating = defRating;
    }

    setEndClimb(endClimb) {
        this.dataContainer.endClimb = endClimb;
    }

    setDownTime(downTime) {
        this.dataContainer.downTime = downTime;
    }

    setComment(comment) {
        this.dataContainer.comment = comment;
    }

}