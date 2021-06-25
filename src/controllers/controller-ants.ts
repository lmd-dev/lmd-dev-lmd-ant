import { Ant } from "../models/ant";
import { Land } from "../models/land";
import { Settings } from "../models/settings";
import { Notifier } from "../pattern/notifier";

export class ControllerAnts extends Notifier
{
    //Ants to manage
    private readonly _ants : Ant[];
    public get ants() : Ant[] {return this._ants; }    
    
    //Land of the simulation
    private readonly _land: Land;

    /**
     * Constructor
     */
    constructor(ants: Ant[], land: Land)
    {
        super();

        this._ants = ants;
        this._land = land;
    }

    /**
     * Create an ant at the first found anthill
     */
    createAnt()
    {
        const antHillCell = this._land.findAntHill();

        if(antHillCell)
        {
            this.ants.push(new Ant(antHillCell));
            this.notify("cells");
        }
    }

    /**
     * Remove the older ant of the simulation
     */
    removeAnt()
    {
        if(this.ants.length)
        {
            this.ants[0].removeFromCell();
            this.ants.splice(0, 1);
            this.notify("cells");
        }
    }
}