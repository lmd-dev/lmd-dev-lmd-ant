/**
 * Settings of the simulation
 */
export class Settings {
    /**
     * Constructor
     */
    constructor() {
        this._pheromoneEvaporationSpeed = 0.01;
        this._droppedPheromoneQuantity = 0.05;
        this._defaultLandWidth = 10;
        this._defaultLandHeight = 10;
    }
    get pheromoneEvaporationSpeed() { return this._pheromoneEvaporationSpeed; }
    ;
    set pheromoneEvaporationSpeed(value) { this._pheromoneEvaporationSpeed = value; }
    get droppedPheromoneQuantity() { return this._droppedPheromoneQuantity; }
    ;
    set droppedPheromoneQuantity(value) { this._droppedPheromoneQuantity = value; }
    get defaultLandWidth() { return this._defaultLandWidth; }
    set defaultLandWidth(value) { this._defaultLandWidth = value; }
    get defaultLandHeight() { return this._defaultLandHeight; }
    set defaultLandHeight(value) { this._defaultLandHeight = value; }
    /**
     * Exports data to JS Obejct
     * @returns JS object
     */
    toArray() {
        return {
            pheromoneEvaporationSpeed: this.pheromoneEvaporationSpeed,
            droppedPheromoneQuantity: this.droppedPheromoneQuantity,
            defaultLandWidth: this.defaultLandWidth,
            defaultLandHeight: this.defaultLandHeight
        };
    }
    /**
     * Imports data from JS object
     * @param data JS Object
     */
    fromArray(data) {
        this.pheromoneEvaporationSpeed = data?.pheromoneEvaporationSpeed ?? this.pheromoneEvaporationSpeed;
        this.droppedPheromoneQuantity = data?.droppedPheromoneQuantity ?? this.droppedPheromoneQuantity;
        this.defaultLandWidth = data?.defaultLandWidth ?? this.defaultLandWidth;
        this.defaultLandHeight = data?.defaultLandHeight ?? this.defaultLandHeight;
    }
}
