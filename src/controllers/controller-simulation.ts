import { Simulation } from "../models/simulation";
import { Notifier } from "../pattern/notifier";

/**
 * Constroller responsible for the simulation
 */
export class ControllerSimulation extends Notifier
{
    //Simulation to controll
    private _simulation : Simulation;
    public get simulation() : Simulation {return this._simulation; }

    //Indicates if the simulation is started
    public get simulationStarted(): boolean { return this._simulation.started; }
    
    //Timer of the simulation
    private _simulationTimer: number;

    /**
     * Cosntructor
     * @param simulation Simulation to controll 
     */
    constructor(simulation: Simulation)
    {
        super();
        this._simulation = simulation;
        this._simulationTimer = null;
    }

    /**
     * Toggle simulation status (on/off)
     */
    public toggle()
    {
        if(this._simulation.started)
            this.stop();
        else
            this.start();
    }

    /**
     * Start the simulation
     */
    private start()
    {
        this.stop();

        this._simulationTimer = setInterval(() => {
            this.simulation.nextStep();
            this.notify();
        }, 500);

        this.simulation.started = true;
        this.notify();
    }

    /**
     * Stop the simulation
     */
    private stop()
    {
        clearInterval(this._simulationTimer);
        this._simulationTimer = null;
        this.notify();
    }
}