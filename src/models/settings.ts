export interface SettingsData
{
    pheromoneEvaporationSpeed : number;
    droppedPheromoneQuantity: number;
    defaultLandWidth: number;
    defaultLandHeight: number;
}

/**
 * Settings of the simulation
 */
export class Settings
{
    //Evaporation speed of the pheromones
    private _pheromoneEvaporationSpeed: number;
    public get pheromoneEvaporationSpeed(): number { return this._pheromoneEvaporationSpeed; };
    public set pheromoneEvaporationSpeed(value: number) { this._pheromoneEvaporationSpeed = value; }
    
    //Quantity of pheromones drooped by ant when they leave cell
    private _droppedPheromoneQuantity: number;
    public get droppedPheromoneQuantity(): number { return this._droppedPheromoneQuantity; };
    public set droppedPheromoneQuantity(value: number) { this._droppedPheromoneQuantity = value; }
    
    //Default width of the land
    private _defaultLandWidth : number;
    public get defaultLandWidth() : number {return this._defaultLandWidth; }
    public set defaultLandWidth(value : number) { this._defaultLandWidth = value; }
    
    //Default height of the land
    private _defaultLandHeight : number;
    public get defaultLandHeight() : number {return this._defaultLandHeight; }
    public set defaultLandHeight(value : number) { this._defaultLandHeight = value; }

    /**
     * Constructor
     */
    constructor()
    {
        this._pheromoneEvaporationSpeed = 0.01;
        this._droppedPheromoneQuantity = 0.05;
        this._defaultLandWidth = 10;
        this._defaultLandHeight = 10;
    }

    /**
     * Exports data to JS Obejct
     * @returns JS object
     */
    toArray(): SettingsData
    {
        return {
            pheromoneEvaporationSpeed : this.pheromoneEvaporationSpeed,
            droppedPheromoneQuantity: this.droppedPheromoneQuantity,
            defaultLandWidth : this.defaultLandWidth,
            defaultLandHeight : this.defaultLandHeight
        };
    }

    /**
     * Imports data from JS object
     * @param data JS Object
     */
    fromArray(data: SettingsData)
    {
        this.pheromoneEvaporationSpeed = data?.pheromoneEvaporationSpeed ?? this.pheromoneEvaporationSpeed;
        this.droppedPheromoneQuantity = data?.droppedPheromoneQuantity ?? this.droppedPheromoneQuantity;
        this.defaultLandWidth = data?.defaultLandWidth ?? this.defaultLandWidth;
        this.defaultLandHeight = data?.defaultLandHeight ?? this.defaultLandHeight;
    }
}