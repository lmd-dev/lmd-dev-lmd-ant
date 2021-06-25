import { Ant } from "../models/ant";
import { Notifier } from "../pattern/notifier";
export class ControllerAnts extends Notifier {
    /**
     * Constructor
     */
    constructor(ants, land) {
        super();
        this._ants = ants;
        this._land = land;
    }
    get ants() { return this._ants; }
    /**
     * Create an ant at the first found anthill
     */
    createAnt() {
        const antHillCell = this._land.findAntHill();
        if (antHillCell) {
            this.ants.push(new Ant(antHillCell));
            this.notify("cells");
        }
    }
    /**
     * Remove the older ant of the simulation
     */
    removeAnt() {
        if (this.ants.length) {
            this.ants[0].removeFromCell();
            this.ants.splice(0, 1);
            this.notify("cells");
        }
    }
}
