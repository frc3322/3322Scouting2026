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
    
    constructor() {
        for(const [key, value] of Object.entries()){
            this[key] = 0;
        }
        
    }

    toString() {
        let string = "";
        for(const [key, value] of Object.entries()){
            string += "" + JSON.stringify(this[this[key]]) + ";"
        }
        return string;
    }

    loadData(string) {
        let data;
        try{
            data = string.split(";");
            for (let i = 0; i < this.variableKeys.length; i++) {
                this[this.variableKeys[i]] = JSON.parse(data[i]);
            }
        }
        catch{

        }
    }


}

