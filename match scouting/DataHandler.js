export class DataHandler{
    #autoFuelAttempted
    #autoFuelScored
    #teleFuelAttempted
    #teleFuelScored
    #autoClimb
    #teleClimbLevel
    #stackAuto
    #stackTele
    #autoFuelTime
    #teleFuelTime
    #autoFuelAccuracy
    #teleFuelAccuracy
    
    constructor(){
        this.#autoFuelAttempted = 0;
        this.#autoFuelScored = 0;
        this.#teleFuelAttempted = 0;
        this.#teleFuelScored = 0;

        this.#stackAuto = [];
        this.#stackTele = [];

        this.#autoClimb = 0;
        this.#teleClimbLevel = 0;
        
    }

    #changeFuel(actionType, val){
        switch(actionType){
            case ActionType.AutoFuelAttempted:
                this.#autoFuelAttempted += val;
                break;
            case ActionType.AutoFuelScored:
                this.#autoFuelScored += val;
                break;
            case ActionType.TeleFuelAttempted:
                this.#teleFuelAttempted += val;
                break;
            case ActionType.TeleFuelScored:
                this.#teleFuelScored += val;
                break;
            default:
                break;
        }
    }

    incrementAuto(actionType, val){
        this.#addActionAuto([actionType, val])
        this.#changeFuel(actionType, val)
    }

    undoAuto(){
        if(this.#stackAuto.length > 0){
            var action = this.#stackAuto.pop()
            this.#changeFuel(action[0], -action[1])
        }
    }

    incrementTele(actionType, val){
        this.#addActionTele([actionType, val])
        this.#changeFuel(actionType, val)
    }

    undoTele(){
        if(this.#stackTele.length > 0){
            var action = this.#stackTele.pop()
            this.#changeFuel(action[0], -action[1])
        }
    }

    setAutoClimb(val){
        this.#autoClimb = val;
    }

    setTeleopClimb(val){
        this.#teleClimbLevel = val;
    }

    #addActionAuto(action){
        this.#stackAuto.push(action);
        if(this.#stackAuto.length > 200){
            this.#stackAuto.shift();
        }
    }

    #addActionTele(action){
        this.#stackTele.push(action);
        if(this.#stackTele.length > 200){
            this.#stackTele.shift();
        }
    }

}