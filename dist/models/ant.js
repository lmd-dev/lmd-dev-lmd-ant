import { CellType } from "./cell-type.js";
/**
 * Represent an ant in the simulation
 */
export class Ant {
    /**
     * Constructor
     * @param origin First cell on which place the ant
     */
    constructor(origin) {
        this._currentCell = origin;
        this._lastCell = null;
        this.path = [];
        this._goal = CellType.FOOD;
        this._currentCell.addAnt(this);
    }
    get currentCell() { return this._currentCell; }
    get lastCell() { return this._lastCell; }
    get goal() { return this._goal; }
    set goal(value) { this._goal = value; }
    /**
     * Removes an ant from its current cell
     */
    removeFromCell() {
        if (this.currentCell)
            this.currentCell.removeAnt(this);
    }
    /**
     * Moves the ant to another cell
     * @param droppedPheromoneQuantity Quantity of pheromones to drop before moving
     */
    move(droppedPheromoneQuantity) {
        if (this.goal === CellType.FOOD || this.path.length === 0) {
            this._currentCell.addPheromone(droppedPheromoneQuantity);
            const possibleDirections = this.getPossibleDirections();
            this.selectNextCell(possibleDirections);
        }
        else {
            this._currentCell.addPheromone(droppedPheromoneQuantity);
            this._currentCell.removeAnt(this);
            this._currentCell = this.path[this.path.length - 1];
            this._currentCell.addAnt(this);
            this._lastCell = null;
            this.path.splice(this.path.length - 1, 1);
        }
        this.updateGoal();
    }
    /**
     * Returns all possible direction from the current cell
     * @returns Possible cells to go
     */
    getPossibleDirections() {
        const possibleDirections = this.currentCell.neighbors.filter((cell) => {
            if (cell.type !== CellType.CLEAR && cell.type !== this.goal)
                return false;
            if (this.lastCell && this.lastCell === cell)
                return false;
            return true;
        });
        if (possibleDirections.length === 0 && this.lastCell)
            possibleDirections.push(this.lastCell);
        return possibleDirections;
    }
    /**
     * Selects the next cell to go from the possible directions
     * @param possibleDirections Possible cells to go from the current cell
     */
    selectNextCell(possibleDirections) {
        if (possibleDirections.length == 0) {
            this._lastCell = null;
        }
        else {
            let selectedDirection = null;
            const directionProbabilities = [];
            let probaMax = 0;
            possibleDirections.forEach((cell) => {
                if (cell.type === this._goal && selectedDirection === null) {
                    selectedDirection = cell;
                }
                const probaCell = 1 + (cell.pheromone * 5);
                directionProbabilities.push(probaCell);
                probaMax += probaCell;
            });
            if (selectedDirection === null) {
                const random = Math.random() * probaMax;
                let probaSum = 0;
                directionProbabilities.every((proba, index) => {
                    probaSum += proba;
                    if (probaSum > random && selectedDirection === null) {
                        selectedDirection = possibleDirections[index];
                        return false;
                    }
                    return true;
                });
            }
            this._lastCell = this.currentCell;
            this._currentCell = selectedDirection;
            this.lastCell.removeAnt(this);
            this.currentCell.addAnt(this);
            if (this.goal === CellType.FOOD)
                this.path.push(this.lastCell);
        }
    }
    /**
     * Updates the goal of the ant :
     *  - when it find food => anthill
     *  - when it find anthill => food
     */
    updateGoal() {
        if (this.currentCell.type === this.goal) {
            if (this.goal == CellType.ANTHILL)
                this.goal = CellType.FOOD;
            else if (this.goal == CellType.FOOD)
                this.goal = CellType.ANTHILL;
        }
    }
}
