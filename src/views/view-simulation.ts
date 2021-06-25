import { ControllerSimulation } from "../controllers/controller-simulation";
import { Observer } from "../pattern/observer";

/**
 * View responsible for simulation
 */
export class ViewSimulation implements Observer
{
    //Controller responsible for the simulation
    private _controllerSimulation: ControllerSimulation;

    /**
     * Constructor
     * @param controllerSimulation Controller responsible for the simulation
     */
    constructor(controllerSimulation: ControllerSimulation)
    {
        this._controllerSimulation = controllerSimulation;
        this._controllerSimulation.addObserver(this);

        this.initMainEvents();
    }

    /**
     * Notify function of the view
     */
    notify()
    {
        this.updateSimulationButtons();
    }

    initMainEvents()
    {
        document.querySelector("#btn-start").addEventListener("click", () => { this._controllerSimulation.toggle(); });
    }

    /**
     * Updates simulation buttons state on the web page
     */
    updateSimulationButtons()
    {
        const startButton = document.querySelector("#btn-start");

        if(this._controllerSimulation.simulationStarted)
            startButton.innerHTML = "Stop";
        else
            startButton.innerHTML = "Start";
    }
}