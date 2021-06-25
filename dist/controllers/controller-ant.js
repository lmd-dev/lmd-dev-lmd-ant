import { Ant } from "../models/ant";
import { Notifier } from "../pattern/notifier";
export class ControllerAnt extends Notifier {
    /**
     * Constructor
     */
    constructor(ants, land) {
        super();
        this._ants = ants;
        this._land = land;
    }
    get ants() { return this._ants; }
    createAnt() {
        const antHillCell = this._land.findAntHill();
        if (antHillCell) {
            this.ants.push(new Ant(antHillCell));
            this.notify("cells");
        }
    }
}
