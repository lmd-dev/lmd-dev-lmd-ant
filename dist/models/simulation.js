import { Land } from "./land";
import { Settings } from "./settings";
/**
 * Represent the simulation
 */
export class Simulation {
    /**
     * Simulation
     */
    constructor() {
        this._started = false;
        this._settings = new Settings();
        this._land = new Land();
        this._ants = [];
    }
    get started() { return this._started; }
    set started(value) { this._started = value; }
    get settings() { return this._settings; }
    get land() { return this._land; }
    ;
    get ants() { return this._ants; }
    ;
    /**
     * Compute the next step of the simulation
     */
    nextStep() {
        this.land.evaporatePheromones(this.settings.pheromoneEvaporationSpeed);
        this.moveAnts();
    }
    /**
     * Moves each ant on its next cell
     */
    moveAnts() {
        this.ants.forEach((ant) => { ant.move(this._settings.droppedPheromoneQuantity); });
    }
}
