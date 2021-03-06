import { ControllerAnts } from "../controllers/controller-ants.js";
import { ControllerLand } from "../controllers/controller-land.js";
import { ControllerSimulation } from "../controllers/controller-simulation.js";
import { CellType } from "../models/cell-type.js";
import { Cell } from "../models/cell.js";
import { Observer } from "../pattern/observer.js";

/**
 * View responsible for the land
 */
export class ViewLand implements Observer
{
    //Controller responsible for the land
    private _controllerLand: ControllerLand;

    //Controller responsible for the ants
    private _controllerAnts: ControllerAnts;

    //Controller responsible for the simulation
    private _controllerSimulation: ControllerSimulation;

    /**
     * Constructor
     * @param controllerLand Controller responsible for the land
     * @param controllerAnts Controller responsible for the ants
     * @param controllerSimulation Controller responsible for the simulation
     */
    constructor(controllerLand: ControllerLand, controllerAnts: ControllerAnts, controllerSimulation: ControllerSimulation)
    {
        this._controllerLand = controllerLand;
        this._controllerLand.addObserver(this);

        this._controllerAnts = controllerAnts;
        this._controllerAnts.addObserver(this);

        this._controllerSimulation = controllerSimulation;
        this._controllerSimulation.addObserver(this);

        this.initMainEvents();
    }

    /**
     * Initi main events on the web page
     */
    initMainEvents()
    {
        document.querySelector("cellmode.clear").addEventListener("click", () => { this._controllerLand.cellMode = CellType.CLEAR; });
        document.querySelector("cellmode.wall").addEventListener("click", () => { this._controllerLand.cellMode = CellType.WALL; });
        document.querySelector("cellmode.food").addEventListener("click", () => { this._controllerLand.cellMode = CellType.FOOD; });
        document.querySelector("cellmode.anthill").addEventListener("click", () => { this._controllerLand.cellMode = CellType.ANTHILL; });

        document.querySelector("#btn-save").addEventListener("click", () => { this._controllerLand.save(); });
        document.querySelector("#btn-load").addEventListener("click", () => { this._controllerLand.load(); });
    }
    
    /**
     * Notify function of the view
     */
    notify()
    {
        this.displayModes();
        this.displayCells(); 
    }

    /**
     * Refreshes update modes
     */
    displayModes()
    {
        document.querySelectorAll("cellmode").forEach((cellmode) => {cellmode.classList.remove("active"); });

        switch(this._controllerLand.cellMode)
        {
            case CellType.CLEAR: document.querySelector("cellmode.clear").classList.add("active"); break;
            case CellType.WALL: document.querySelector("cellmode.wall").classList.add("active"); break;
            case CellType.FOOD: document.querySelector("cellmode.food").classList.add("active"); break;
            case CellType.ANTHILL: document.querySelector("cellmode.anthill").classList.add("active"); break;
        }
    }

    /**
     * Displays cells of the land
     */
    displayCells()
    {
        const cells = document.querySelector("cells");
        cells.innerHTML = "";

        this._controllerLand.land.cells.forEach((row) => {

            const rowHTML = document.createElement("row");

            row.forEach((cell) => {
                const cellHTML = document.createElement("cell");
                cellHTML.classList.add(this.getCellCSSClass(cell));

                //repr??sentation du taux de ph??romones
                cellHTML.innerHTML += `<pheromone style="opacity:${cell.pheromone}"></pheromone>`;

                //Repr??sentation des fourmis situ??es sur la cellule
                const antQuantity = cell.ants.length;
                for(let iAnt = 0; iAnt < antQuantity; ++iAnt)
                    cellHTML.innerHTML += "<ant></ant>";

                cellHTML.addEventListener("click", () => { this._controllerLand.changeCellType(cell); });

                rowHTML.appendChild(cellHTML);
            });

            cells.appendChild(rowHTML);
        });
    }

    /**
     * Return the CSS class to use from the type of the given cell
     * @param cell Cell from which to find CSS class name 
     * @returns The name of the CSS class to use
     */
    private getCellCSSClass(cell: Cell): string
    {
        let cssClass = "";

        switch(cell.type)
        {
            case CellType.CLEAR: cssClass = "clear"; break;
            case CellType.WALL: cssClass = "wall"; break;
            case CellType.FOOD: cssClass = "food"; break;
            case CellType.ANTHILL: cssClass = "anthill"; break;
        }

        return cssClass;
    }
}