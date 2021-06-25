import { Cell } from "./cell.js";
import { CellType } from "./cell-type.js";

/**
 * Represents the land of the simulation
 */
export class Land
{
    //Cells grid of the land
    private readonly _cells: Cell[][];
    public get cells(): Cell[][] { return this._cells; };

    /**
     * Constructor
     */
    constructor()
    {
        this._cells = [];
    }

    /**
     * Initializes the grid of the land
     * @param width Width of the grid
     * @param height Height of the grid
     * @param landDescription Grid of cell type to apply at the creation
     */
    initGrid(width: number, height: number, landDescription: CellType[][] = null)
    {
        this._cells.length = 0;

        for (let iRow = 0; iRow < height; ++iRow)
        {
            const row = [];

            for (let iColumn = 0; iColumn < width; ++iColumn)
            {
                row.push(new Cell(iColumn, iRow, landDescription?.[iRow]?.[iColumn] ?? CellType.WALL));
            }

            this._cells.push(row);
        }

        for (let iRow = 0; iRow < height; ++iRow)
        {
            for (let iColumn = 0; iColumn < width; ++iColumn)
            {
                const cell = this._cells[iRow][iColumn];

                if (iRow > 0) cell.neighbors.push(this._cells[iRow - 1][iColumn]);
                if (iRow < height - 1) cell.neighbors.push(this._cells[iRow + 1][iColumn]);
                if (iColumn > 0) cell.neighbors.push(this._cells[iRow][iColumn - 1]);
                if (iColumn < width - 1) cell.neighbors.push(this._cells[iRow][iColumn + 1]);
            }
        }
    }

    /**
     * Sets the type of a cell
     * @param x X coordinate of the cell to update
     * @param y Y coordinate of the cell to update
     * @param type New type to apply to the found cell
     */
    setCellType(x: number, y: number, type: CellType)
    {
        if (x >= 0 && x < this._cells.length && y >= 0 && y < this._cells[y].length)
            this._cells[y][x].type = type;
    }

    /**
     * Dicreases the quantity of pheromones present on each cell of the grid
     * @param speed 
     */
    evaporatePheromones(speed: number)
    {
        this._cells.forEach((row) =>
        {
            row.forEach((cell) => { cell.addPheromone(-speed); });
        });
    }

    /**
     * Stores cells type on a serializable grid
     * @returns Serialzable grid of cells type
     */
    toArray(): CellType[][]
    {
        return this._cells.map((row) => { return row.map((cell) => { return cell.type; }) });
    }

    /**
     * Finds the first anthill available on the land
     * @returns The found anthill or null
     */
    findAntHill(): Cell
    {
        let cell: Cell = null;

        this._cells.some((row) =>
        {

            cell = row.find((cell) =>
            {
                return cell.type === CellType.ANTHILL;
            }) ?? null;

            return cell !== null;
        });

        return cell;
    }

    /**
     * Updates the width of the land grid
     * @param newWidth New width to apply (>= 5)
     * @returns The real new width of the grid
     */
    updateLandWidth(newWidth: number): number
    {
        const oldWidth = this._cells[0].length;

        if (oldWidth !== newWidth && newWidth >= 5)
        {
            this._cells.forEach((row, iRow) =>
            {
                if (oldWidth < newWidth)
                {
                    for (let iColumn = oldWidth; iColumn < newWidth; ++iColumn)
                        row.push(new Cell(iColumn, iRow));
                }
                else
                    row.splice(newWidth, oldWidth - newWidth);
            });

            return newWidth;
        }
        else
            return oldWidth;
    }

    /**
     * Updates the height of the land grid
     * @param newHeight New height to apply (>= 5)
     * @returns The real new height of the grid
     */
    updateLandHeight(newHeight: number): number
    {
        const oldHeight = this._cells.length;

        if (oldHeight !== newHeight && newHeight >= 5)
        {
            if (oldHeight < newHeight)
            {
                for (let iRow = oldHeight; iRow < newHeight; ++iRow)
                {
                    const row = [];

                    for (let iColumn = 0; iColumn < this._cells[0].length; ++iColumn)
                        row.push(new Cell(iColumn, iRow));

                    this._cells.push(row);
                }
            }
            else
                this._cells.splice(newHeight, oldHeight - newHeight);

            return newHeight;
        }
        else
            return oldHeight;
    }
}
