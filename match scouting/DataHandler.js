class DataHandler{
    #autoFuel
    #teleFuel
    
    
    constructor(){
        this.#autoFuel = 0;
        this.#teleFuel = 0;
    }

    incrementAutoFuel(val){
        this.#autoFuel += val;
    }

    incrementTeleFuel(val){
        this.#teleFuel += val;
    }

    getAutoFuel(){
        return this.#autoFuel;
    }

    getTeleFuel(val){
        return this.#teleFuel;
    }

    
}