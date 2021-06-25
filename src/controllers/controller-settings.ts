import { Settings } from "../models/settings";
import { Notifier } from "../pattern/notifier";

export class ControllerSettings extends Notifier
{
    //Simulation settings
    private _settings : Settings;
    public get settings(): Settings { return this._settings; }
    
    /**
     * Constructor
     * @param settings Simulation settings 
     */
    constructor(settings: Settings)
    {
        super();

        this._settings = settings;
    }

    /**
     * Loads simulation settings data
     */
    load()
    {
        this.settings.fromArray(JSON.parse(localStorage.getItem("ant-settings")));
        this.notify();
    }

    /**
     * Saves smulation settings data
     */
    save()
    {        
        localStorage.setItem("ant-settings", JSON.stringify(this.settings.toArray()));
    }
}