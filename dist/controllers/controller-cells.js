import { Ant } from "../models/ant.js";
import { CellType } from "../models/cell-type.js";
import { Notifier } from "../pattern/notifier.js";
/**
 * Controller responsible for cells
 */
export class ControllerCells extends Notifier {
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
    init() {
        this.land.initGrid(10, 10);
        this.load();
    }
    changeCellType(cell) {
        cell.type = this.cellMode;
        this.notify("cells");
    }
    createAnt() {
        const antHillCoordinates = this.land.findAntHill();
        if (antHillCoordinates) {
            this.ants.push(new Ant(this.land.getCell(antHillCoordinates.x, antHillCoordinates.y)));
            this.notify("cells");
        }
    }
    removeAnt() {
        if (this.ants.length) {
            this.ants.splice(0, 1);
            this.notify("cells");
        }
    }
    toggleSimulation() {
        if (this.simulationStarted)
            this.stop();
        else
            this.start();
    }
    start() {
        this.stop();
        this._simulationTimer = setInterval(() => {
            this.moveAnts();
            this.land.evaporatePheromones(this.settings.pheromoneEvaporationSpeed);
        }, 500);
        this.notify("buttons");
    }
    stop() {
        clearInterval(this._simulationTimer);
        this._simulationTimer = null;
        this.notify("buttons");
    }
    moveAnts() {
        this.ants.forEach((ant) => { ant.move(this.settings.droppedPheromoneQuantity); });
        this.notify("cells");
    }
    getAntQuantity(cell) {
        let quantity = 0;
        this.ants.forEach((ant) => { if (ant.currentCell === cell)
            ++quantity; });
        return quantity;
    }
    load() {
        try {
            const data = JSON.parse(localStorage.getItem("ant-land"));
            if (!data)
                return;
            this.land.initGrid(data[0].length, data.length, data);
            this.notify("cells");
            for (let i = 0; i < this.settings.antNumber; ++i)
                this.createAnt();
            const settingsData = JSON.parse(localStorage.getItem("ant-settings"));
            this.settings.fromArray(settingsData);
            this.notify("settings");
        }
        catch (e) {
            console.log("Y'a un problème au chargement !!");
        }
    }
    save() {
        const data = this.land.toArray();
        localStorage.setItem("ant-land", JSON.stringify(data));
        localStorage.setItem("ant-settings", JSON.stringify(this.settings.toArray()));
    }
}
