import { Notifier } from "../pattern/notifier";
export class ControllerSettings extends Notifier {
    /**
     * Constructor
     * @param settings Simulation settings
     */
    constructor(settings) {
        super();
        this._settings = settings;
    }
    get settings() { return this._settings; }
    /**
     * Loads simulation settings data
     */
    load() {
        this.settings.fromArray(JSON.parse(localStorage.getItem("ant-settings")));
        this.notify();
    }
    /**
     * Saves smulation settings data
     */
    save() {
        localStorage.setItem("ant-settings", JSON.stringify(this.settings.toArray()));
    }
}
