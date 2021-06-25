import { CellType } from "./cell-type.js";
/**
 * represents a cell of the land grid
 */
export class Cell {
    /**
     * Constructor
     * @param x X coordinate of the cell in the land grid
     * @param y Y coordinate of the cell in the land grid
     * @param type initial type of the cell
     */
    constructor(x, y, type = CellType.WALL) {
        this._type = type;
        this._pheromone = 0;
        this._neighbors = [];
        this._ants = [];
    }
    get neighbors() { return this._neighbors; }
    ;
    get type() { return this._type; }
    set type(value) { this._type = value; }
    get ants() { return this._ants; }
    get pheromone() { return this._pheromone; }
    /**
     * Increase the quantity of pheromones on the cell
     * @param quantity Quantity of pheromones to add (can be negative)
     */
    addPheromone(quantity) {
        this._pheromone += quantity;
        if (this._pheromone > 1)
            this._pheromone = 1;
        else if (this._pheromone < 0)
            this._pheromone = 0;
    }
    /**
     * Adds an ant on the cell
     * @param ant Ant to add
     */
    addAnt(ant) {
        this._ants.push(ant);
    }
    /**
     * Removes an ant fro mthe cell
     * @param ant Anto to remove
     */
    removeAnt(ant) {
        const index = this.ants.findIndex((findAnt) => { return findAnt === ant; });
        if (index !== -1)
            this.ants.splice(index);
    }
}
