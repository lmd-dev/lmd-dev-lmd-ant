import { Ant } from "./ant";
import { Land } from "./land";
import { Settings } from "./settings";

/**
 * Represent the simulation
 */
export class Simulation
{
    // Simulation status
    private _started : boolean;
    public get started() : boolean {return this._started; }
    public set started(value : boolean) { this._started = value; }

    //Simulation settings
    private _settings : Settings;
    public get settings() : Settings {return this._settings; }
    
    // Land of the simulation
    private readonly _land: Land;
    public get land(): Land { return this._land; };

    // Ants in the simulation
    private readonly _ants: Ant[];
    public get ants(): Ant[] { return this._ants; };

    /**
     * Simulation
     */
    constructor()
    {
        this._started = false;
        this._settings = new Settings();
        this._land = new Land();
        this._ants = [];
    }

    /**
     * Compute the next step of the simulation
     */
    nextStep()
    {
        this.land.evaporatePheromones(this.settings.pheromoneEvaporationSpeed);
        this.moveAnts();
    }   

    /**
     * Moves each ant on its next cell
     */
    moveAnts()
    {
        this.ants.forEach((ant) => { ant.move(this._settings.droppedPheromoneQuantity); });
    }
}