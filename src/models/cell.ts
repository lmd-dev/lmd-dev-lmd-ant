import { Ant } from "./ant.js";
import { CellType } from "./cell-type.js";

/**
 * represents a cell of the land grid
 */
export class Cell
{
    //Neighbors cells
    private readonly _neighbors: Cell[];
    public get neighbors(): Cell[] { return this._neighbors; };
    
    //Type of the cell
    private _type : CellType;
    public get type() : CellType {return this._type; }
    public set type(value : CellType) { this._type = value; }

    //Ants present on the cell
    private readonly _ants : Ant[];
    public get ants() : Ant[] {return this._ants; }    
    
    //Quantity of pheromone dropped on the cell
    private _pheromone : number;
    public get pheromone() : number {return this._pheromone; }

    /**
     * Constructor
     * @param x X coordinate of the cell in the land grid
     * @param y Y coordinate of the cell in the land grid
     * @param type initial type of the cell
     */
    constructor(x: number, y: number, type: CellType = CellType.WALL)
    {
        this._type = type;
        this._pheromone = 0;
        this._neighbors = [];
        this._ants = [];
    }

    /**
     * Increase the quantity of pheromones on the cell
     * @param quantity Quantity of pheromones to add (can be negative)
     */
    addPheromone(quantity: number)
    {
        this._pheromone += quantity;

        if(this._pheromone > 1)
            this._pheromone = 1;
        else if(this._pheromone < 0)
            this._pheromone = 0;
    }

    /**
     * Adds an ant on the cell
     * @param ant Ant to add
     */
    addAnt(ant: Ant)
    {
        this._ants.push(ant);
    }

    /**
     * Removes an ant fro mthe cell
     * @param ant Anto to remove
     */
    removeAnt(ant: Ant)
    {   
        const index = this.ants.findIndex((findAnt) => { return findAnt === ant; });

        if(index !== -1)
            this.ants.splice(index);
    }

}