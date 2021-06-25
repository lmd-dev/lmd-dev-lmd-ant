import { Ant } from "../models/ant.js";
import { CellType } from "../models/cell-type.js";
import { Cell } from "../models/cell.js";
import { Land } from "../models/land.js";
import { Notifier } from "../pattern/notifier.js";

/**
 * Controller responsible for land
 */
export class ControllerLand extends Notifier
{
    // Simulation land
    private readonly _land: Land;
    public get land(): Land { return this._land; };
    
    // Land Editing mode
    private _cellMode : CellType;
    public get cellMode() : CellType {return this._cellMode; }
    public set cellMode(value : CellType) { this._cellMode = value; this.notify();}   
    
    /**
     * Constructor
     */
    constructor(land: Land)
    {
        super();

        this._land = land;
        this._cellMode = CellType.CLEAR;
    }

    /**
     * Updates the type of the given cell width the selected cell mode
     * @param cell Cell to update
     */
    changeCellType(cell: Cell)
    {
        cell.type = this.cellMode;
        this.notify();
    }

    /**
     * Loads land data
     */
    load()
    {
        try {
            const data: CellType[][] = JSON.parse(localStorage.getItem("ant-land"));
            if(!data)
                this.land.initGrid(10, 10);
            else
                this.land.initGrid(data[0].length, data.length, data);

            this.notify();
        }
        catch(e)
        {
            console.log("Y'a un problème au chargement !!");
        }
    }

    /**
     * Saves land data
     */
    save()
    {
        const data = this.land.toArray();
        localStorage.setItem("ant-land", JSON.stringify(data));
    }

    /**
     * Updates lands width
     * @param value New width of the land
     * @returns The real new width of the land (>= 5)
     */
    updateLandWidth(value: number): number
    {
        const newWidth = this.land.updateLandWidth(value);
        this.notify();

        return newWidth;
    }

    /**
     * Updates lands height
     * @param value New height of the land
     * @returns The real new height of the land (>= 5)
     */
    updateLandHeight(value: number): number
    {
        const newHeight = this.land.updateLandHeight(value);
        this.notify();

        return newHeight;
    }
}