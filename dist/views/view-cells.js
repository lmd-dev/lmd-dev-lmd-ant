import { CellType } from "../models/cell-type.js";
/**
 *
 */
export class ViewCells {
    constructor(controllerCells) {
        this._controllerCells = controllerCells;
        this._controllerCells.addObserver(this);
        this.initMainEvents();
    }
    initMainEvents() {
        document.querySelector("cellmode.clear").addEventListener("click", () => { this._controllerCells.cellMode = CellType.CLEAR; });
        document.querySelector("cellmode.wall").addEventListener("click", () => { this._controllerCells.cellMode = CellType.WALL; });
        document.querySelector("cellmode.food").addEventListener("click", () => { this._controllerCells.cellMode = CellType.FOOD; });
        document.querySelector("cellmode.anthill").addEventListener("click", () => { this._controllerCells.cellMode = CellType.ANTHILL; });
        document.querySelector("#btn-start").addEventListener("click", () => { this._controllerCells.toggleSimulation(); });
        document.querySelector("#btn-save").addEventListener("click", () => { this._controllerCells.save(); });
        document.querySelector("#btn-load").addEventListener("click", () => { this._controllerCells.load(); });
        document.querySelector("#btn-add-ant").addEventListener("click", () => { this._controllerCells.createAnt(); });
        document.querySelector("#btn-remove-ant").addEventListener("click", () => { this._controllerCells.removeAnt(); });
        document.getElementById("txt-depot-p")?.addEventListener("change", (event) => {
            this._controllerCells.settings.droppedPheromoneQuantity = parseFloat(event.target.value);
        });
        document.getElementById("txt-evap-p")?.addEventListener("change", (event) => {
            this._controllerCells.settings.pheromoneEvaporationSpeed = parseFloat(event.target.value);
        });
        document.getElementById("txt-ant-number")?.addEventListener("change", (event) => {
            this._controllerCells.settings.antNumber = parseFloat(event.target.value);
        });
    }
    notify(info = "") {
        this.displayModes();
        switch (info) {
            case "cells":
                this.displayCells();
                break;
            case "buttons":
                this.refreshButtons();
                break;
            case "settings":
                this.refreshSettings();
                break;
        }
    }
    refreshButtons() {
        const startButton = document.querySelector("#btn-start");
        if (this._controllerCells.simulationStarted)
            startButton.innerHTML = "Stop";
        else
            startButton.innerHTML = "Start";
    }
    refreshSettings() {
        const { droppedPheromoneQuantity, pheromoneEvaporationSpeed, antNumber } = this._controllerCells.settings;
        const txtDepotP = document.getElementById("txt-depot-p");
        if (txtDepotP)
            txtDepotP.value = droppedPheromoneQuantity.toFixed(2);
        const txtEvapP = document.getElementById("txt-evap-p");
        if (txtEvapP)
            txtEvapP.value = pheromoneEvaporationSpeed.toFixed(2);
        const txtAntNumber = document.getElementById("txt-ant-number");
        if (txtAntNumber)
            txtAntNumber.value = antNumber.toFixed(0);
    }
    displayModes() {
        document.querySelectorAll("cellmode").forEach((cellmode) => { cellmode.classList.remove("active"); });
        switch (this._controllerCells.cellMode) {
            case CellType.CLEAR:
                document.querySelector("cellmode.clear").classList.add("active");
                break;
            case CellType.WALL:
                document.querySelector("cellmode.wall").classList.add("active");
                break;
            case CellType.FOOD:
                document.querySelector("cellmode.food").classList.add("active");
                break;
            case CellType.ANTHILL:
                document.querySelector("cellmode.anthill").classList.add("active");
                break;
        }
    }
    displayCells() {
        const cells = document.querySelector("cells");
        cells.innerHTML = "";
        this._controllerCells.land.cells.forEach((row) => {
            const rowHTML = document.createElement("row");
            row.forEach((cell) => {
                const cellHTML = document.createElement("cell");
                cellHTML.classList.add(this.getCellCSSClass(cell));
                //représentation du taux de phéromones
                cellHTML.innerHTML += `<pheromone style="opacity:${cell.pheromone}"></pheromone>`;
                //Représentation des fourmis situées sur la cellule
                const antQuantity = this._controllerCells.getAntQuantity(cell);
                for (let iAnt = 0; iAnt < antQuantity; ++iAnt)
                    cellHTML.innerHTML += "<ant></ant>";
                cellHTML.addEventListener("click", () => { this._controllerCells.changeCellType(cell); });
                rowHTML.appendChild(cellHTML);
            });
            cells.appendChild(rowHTML);
        });
    }
    getCellCSSClass(cell) {
        let cssClass = "";
        switch (cell.type) {
            case CellType.CLEAR:
                cssClass = "clear";
                break;
            case CellType.WALL:
                cssClass = "wall";
                break;
            case CellType.FOOD:
                cssClass = "food";
                break;
            case CellType.ANTHILL:
                cssClass = "anthill";
                break;
        }
        return cssClass;
    }
}
