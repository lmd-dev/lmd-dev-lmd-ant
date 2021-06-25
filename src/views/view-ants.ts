import { ControllerAnts } from "../controllers/controller-ants";
import { View } from "./view";

/**
 * View responsible for ants
 */
export class ViewAnts extends View
{
    //Controller responsible for ants
    private readonly _controllerAnts: ControllerAnts;

    /**
     * Constructor
     * @param controllerAnts Controller responsible for ants
     */
    constructor(controllerAnts: ControllerAnts)
    {
        super();

        this._controllerAnts = controllerAnts;
        this._controllerAnts.addObserver(this);

        this.initMainEvents();
    }

    /**
     * Notify fonction of the view
     */
    notify()
    {
        this.displayAntsQuantity();
    }    

    /**
     * Init main events on the web page
     */
    initMainEvents()
    {
        document.querySelector("#btn-add-ant").addEventListener("click", () => { this._controllerAnts.createAnt(); });
        document.querySelector("#btn-remove-ant").addEventListener("click", () => { this._controllerAnts.removeAnt(); });
    }

    /**
     * Display ants quantity
     */
    private displayAntsQuantity()
    {
        this.setNumberField("#txt-ant-number", this._controllerAnts.ants.length);
    }
}