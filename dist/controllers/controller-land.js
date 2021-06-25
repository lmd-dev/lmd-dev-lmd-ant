import { CellType } from "../models/cell-type.js";
import { Notifier } from "../pattern/notifier.js";
/**
 * Controller responsible for land
 */
export class ControllerLand extends Notifier {
    /**
     * Constructor
     */
    constructor(land) {
        super();
        this._land = land;
        this._cellMode = CellType.CLEAR;
    }
    get land() { return this._land; }
    ;
    get cellMode() { return this._cellMode; }
    set cellMode(value) { this._cellMode = value; this.notify(); }
    /**
     * Updates the type of the given cell width the selected cell mode
     * @param cell Cell to update
     */
    changeCellType(cell) {
        cell.type = this.cellMode;
        this.notify();
    }
    /**
     * Loads land data
     */
    load() {
        try {
            const data = JSON.parse(localStorage.getItem("ant-land"));
            if (!data)
                this.land.initGrid(10, 10);
            else
                this.land.initGrid(data[0].length, data.length, data);
            this.notify();
        }
        catch (e) {
            console.log("Y'a un problème au chargement !!");
        }
    }
    /**
     * Saves land data
     */
    save() {
        const data = this.land.toArray();
        localStorage.setItem("ant-land", JSON.stringify(data));
    }
    /**
     * Updates lands width
     * @param value New width of the land
     * @returns The real new width of the land (>= 5)
     */
    updateLandWidth(value) {
        const newWidth = this.land.updateLandWidth(value);
        this.notify();
        return newWidth;
    }
    /**
     * Updates lands height
     * @param value New height of the land
     * @returns The real new height of the land (>= 5)
     */
    updateLandHeight(value) {
        const newHeight = this.land.updateLandHeight(value);
        this.notify();
        return newHeight;
    }
}
