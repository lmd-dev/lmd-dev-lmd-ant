import { View } from "./view";
/**
 * View responsible for settings
 */
export class ViewSettings extends View {
    /**
     * Constructor
     * @param controllerSettings Controller responsible for settings
     */
    constructor(controllerSettings, controllerLand) {
        super();
        this._controllerSettings = controllerSettings;
        this._controllerSettings.addObserver(this);
        this._controllerLand = controllerLand;
        this.initMainEvents();
    }
    /**
     * Notify function of the view
     */
    notify() {
        this.displaySettings();
    }
    /**
     * Initialize main events of the web page
     */
    initMainEvents() {
        document.getElementById("txt-land-width")?.addEventListener("change", (event) => {
            this._controllerSettings.settings.defaultLandWidth = this._controllerLand.updateLandWidth(parseInt(event.target.value));
            this.notify();
        });
        document.getElementById("txt-land-height")?.addEventListener("change", (event) => {
            this._controllerSettings.settings.defaultLandHeight = this._controllerLand.updateLandHeight(parseInt(event.target.value));
            this.notify();
        });
        document.getElementById("txt-depot-p")?.addEventListener("change", (event) => {
            this._controllerSettings.settings.droppedPheromoneQuantity = parseFloat(event.target.value);
            this.notify();
        });
        document.getElementById("txt-evap-p")?.addEventListener("change", (event) => {
            this._controllerSettings.settings.pheromoneEvaporationSpeed = parseFloat(event.target.value);
            this.notify();
        });
    }
    /**
     * Display settings values
     */
    displaySettings() {
        const { droppedPheromoneQuantity, pheromoneEvaporationSpeed, defaultLandWidth, defaultLandHeight } = this._controllerSettings.settings;
        this.setNumberField("#txt-land-width", defaultLandWidth);
        this.setNumberField("#txt-land-height", defaultLandHeight);
        this.setNumberField("#txt-depot-p", droppedPheromoneQuantity, 2);
        this.setNumberField("#txt-evap-p", pheromoneEvaporationSpeed, 2);
    }
}
