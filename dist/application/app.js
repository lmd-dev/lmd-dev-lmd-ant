import { ControllerAnts } from "../controllers/controller-ants.js";
import { ControllerLand } from "../controllers/controller-land.js";
import { ControllerSettings } from "../controllers/controller-settings.js";
import { ControllerSimulation } from "../controllers/controller-simulation.js";
import { Simulation } from "../models/simulation.js";
import { ViewAnts } from "../views/view-ants.js";
import { ViewLand } from "../views/view-land.js";
import { ViewSettings } from "../views/view-settings.js";
import { ViewSimulation } from "../views/view-simulation.js";
/**
 * Application
 */
class AntApp {
    /**
     * Constructor
     */
    constructor() {
        this._simulation = new Simulation();
        //Initializes controllers
        this._controllerSimulation = new ControllerSimulation(this._simulation);
        this._controllerLand = new ControllerLand(this._simulation.land);
        this._controllerSettings = new ControllerSettings(this._simulation.settings);
        this._controllerAnts = new ControllerAnts(this._simulation.ants, this._simulation.land);
        //Initializes views
        this._viewLand = new ViewLand(this._controllerLand, this._controllerAnts, this._controllerSimulation);
        this._viewSimulation = new ViewSimulation(this._controllerSimulation);
        this._viewSettings = new ViewSettings(this._controllerSettings, this._controllerLand);
        this._viewAnts = new ViewAnts(this._controllerAnts);
        //Loads data
        this._controllerLand.load();
        this._controllerSettings.load();
    }
}
//Entry point of the application
window.addEventListener("load", () => { const app = new AntApp(); });
