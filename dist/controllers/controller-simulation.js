import { Notifier } from "../pattern/notifier";
/**
 * Constroller responsible for the simulation
 */
export class ControllerSimulation extends Notifier {
    /**
     * Cosntructor
     * @param simulation Simulation to controll
     */
    constructor(simulation) {
        super();
        this._simulation = simulation;
        this._simulationTimer = null;
    }
    get simulation() { return this._simulation; }
    //Indicates if the simulation is started
    get simulationStarted() { return this._simulation.started; }
    /**
     * Toggle simulation status (on/off)
     */
    toggle() {
        if (this._simulation.started)
            this.stop();
        else
            this.start();
    }
    /**
     * Start the simulation
     */
    start() {
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
    stop() {
        clearInterval(this._simulationTimer);
        this._simulationTimer = null;
        this.notify();
    }
}
