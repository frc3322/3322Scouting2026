import { ActionType } from "./Constants.js"

export class DataHandler {
    
    autoFuel
    teleFuel

    autoClimb
    teleClimbLevel

    teleFuelTime
    telePassTime

    autoFuelAccuracy
    teleFuelAccuracy

    autoFuelPassed
    teleFuelPassed

    autoFuelShuttled
    teleFuelShuttled

    teleCycleCounter

    fuelStolen

    stackAuto
    stackTele

    constructor() {
        this.autoFuel = 0;
        this.teleFuel = 0;

        this.autoClimb = 0;
        this.teleClimbLevel = 0;

        this.teleFuelTime = 0;
        this.telePassTime = 0;

        this.autoFuelAccuracy = 1;
        this.teleFuelAccuracy = 1;

        this.autoFuelPassed = 0;
        this.teleFuelPassed = 0;

        this.autoFuelShuttled = 0;
        this.teleFuelShuttled = 0;

        this.fuelStolen = 0;
        this.teleCycleCounter = 0;

        this.stackAuto = [];
        this.stackTele = [];

    }

    loadData(string) {
        try{
            let data = string.split(";");
            let i = 0;
            for (const [key, value] of Object.entries(this)) {
                this[key] = JSON.parse(data[i]);
                i++;
            }
        }
        catch{

        }
    }

    toString() {
        let string = "";
        for (const [key, value] of Object.entries(this)) {
            string += "" + JSON.stringify(value) + ";"
        }
        return string;
    }

    exportData() {
        let string = "";
        for (const [key, value] of Object.entries(this)) {
            if(typeof value == "number"){
                string += "" + JSON.stringify(value) + ";"
            }
            
        }
        return string;
    }

    changeFuel(actionType, val) {
        
        switch (actionType) {
            case ActionType.AutoFuel:
                this.autoFuel += val;
                break;
            case ActionType.TeleFuel:
                this.teleFuel += val;
                break;
            case ActionType.TelePass:
                this.teleFuelPassed += val;
                break;
            case ActionType.Steal:
                this.fuelStolen += val;
                break;
            case ActionType.Cycle:
                this.teleCycleCounter += val;
                alert(this.teleCycleCounter);
                break;
            default:
                break;
        }
    }


    incrementAuto(actionType, val) {
        this.addActionAuto([actionType, val])
        this.changeFuel(actionType, val)
    }

    undoAuto() {
        if (this.stackAuto.length > 0) {
            var action = this.stackAuto.pop()
            this.changeFuel(action[0], -action[1])
        }
    }

    incrementTele(actionType, val) {
        this.addActionTele([actionType, val])
        this.changeFuel(actionType, val)
    }

    undoTele() {
        if (this.stackTele.length > 0) {
            var action = this.stackTele.pop()
            this.changeFuel(action[0], -action[1])
        }
    }


    setTeleFuelTime(val) {
        this.teleFuelTime = val;
    }

    setTelePassTime(val) {
        this.telePassTime = val;
    }

    setAutoClimb(val) {
        this.autoClimb = val;
    }

    setTeleopClimb(val) {
        this.teleClimbLevel = val;
    }

    setTeleCycleCounter(val) {
        this.teleCycleCounter = val;
    }

    addActionAuto(action) {
        this.stackAuto.push(action);
        if (this.stackAuto.length > 200) {
            this.stackAuto.shift();
        }
    }

    addActionTele(action) {
        this.stackTele.push(action);
        if (this.stackTele.length > 200) {
            this.stackTele.shift();
        }
    }


    /*
        Getters
    */

    getAutoFuel() {
        return this.autoFuel;
    }

    getTeleFuel() {
        return this.teleFuel;
    }

    getAutoPass() {
        return this.autoFuelPassed;
    }

    getTelePass() {
        return this.teleFuelPassed;
    }

    getAutoFuelAccuracy() {
        return this.teleFuel;
    }

    getTeleFuelAccuracy() {
        return this.teleFuel;
    }

    getTeleFuelTime() {
        return this.teleFuelTime;
    }

    getTelePassTime() {
        return this.telePassTime;
    }

    getTeleCycleCounter() {
        return this.teleCycleCounter;
    }



}
