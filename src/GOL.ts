import { copyWithoutReference } from './helpers';
import { AliveMap, Cell, Grid, InitialData, Selection } from './types';

export class GameOfLife {
  private rows: number;
  private columns: number;
  private grid: Grid;
  private frame: number = 0;
  private alivePopulation: AliveMap = {};

  constructor(data: InitialData) {
    this.rows = data.rows;
    this.columns = data.columns;
    this.grid = this._createGrid(this.rows, this.columns);
  }

  get state(): Grid {
    return this.grid;
  }

  get frameCount(): number {
    return this.frame;
  }

  public toggleCellAlive(selection: Selection): void {
    const newGrid = copyWithoutReference(this.grid);
    const index = this._selectionToIndex(selection);
    const cell = copyWithoutReference(this.grid.cells[index]);

    const alive = cell.alive;

    cell.alive = !alive;

    if (alive) {
      delete this.alivePopulation[index];
    } else {
      this.alivePopulation[index] = cell;
    }

    newGrid.cells[index] = cell;
    this.grid = newGrid;
  }

  public reset(): void {
    this.grid = this._createGrid(this.rows, this.columns);
    this.alivePopulation = {};
  }

  public randomise(): void {
    const newGrid = this._createGrid(this.rows, this.columns);
    const length = newGrid.cells.length;
    const aliveCells: AliveMap = {};
    this.reset();
    for (let i = 0; i < length; i++) {
      const cell = newGrid.cells[i];
      const alive = Math.random() > 0.75 ? true : false;
      if (alive) {
        const newCell = copyWithoutReference(cell);
        newCell.alive = alive;
        newGrid.cells[i] = newCell;
        aliveCells[i] = newCell;
      }
    }
    this.grid = newGrid;
    this.alivePopulation = aliveCells;
  }

  public seed(seed: Selection[]): void {
    const grid = this._createGrid(this.rows, this.columns);
    const aliveCells: AliveMap = {};

    for (const selectedCell of seed) {
      const index = this._selectionToIndex(selectedCell);
      const cell = copyWithoutReference(grid.cells[index]);
      cell.alive = true;
      aliveCells[index] = cell;
      grid.cells[index] = cell;
    }

    this.grid = grid;
    this.alivePopulation = aliveCells;
  }

  public resize(data: { rows: number; columns: number }): void {
    this.rows = data.rows;
    this.columns = data.columns;
    this.reset();
  }

  public sequence(): void {
    const newGrid = this._createGrid(this.rows, this.columns);

    const aliveKeys: number[] = Object.keys(this.alivePopulation).map(Number);
    const aliveCells: AliveMap = {};

    for (let i = aliveKeys.length - 1; i >= 0; i--) {
      const key = aliveKeys[i];
      const cell = this.alivePopulation[key];
      const neighbours = this._getNeighbours(cell, newGrid);

      for (let j = neighbours.length - 1; j >= 0; j--) {
        const neighbour = neighbours[j];
        neighbour.aliveNeighbours++;
        switch (neighbour.aliveNeighbours) {
          case 3:
            neighbour.alive = true;
            aliveCells[neighbour.index] = neighbour;
            break;
          case 2:
            const alive = neighbour.index in this.alivePopulation;
            if (alive) {
              neighbour.alive = alive;
              aliveCells[neighbour.index] = neighbour;
            }
            break;
          default:
            neighbour.alive = false;
            delete aliveCells[neighbour.index];
            break;
        }
        newGrid.cells[neighbour.index] = neighbour;
      }
    }
    this.frame++;
    this.grid = newGrid;
    this.alivePopulation = aliveCells;
  }

  private _createGrid(rows: number, columns: number): Grid {
    const cells: Cell[] = new Array(rows * columns);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const index = j + i * columns;
        cells[index] = {
          index: index,
          column: j,
          row: i,
          alive: false,
          aliveNeighbours: 0,
        };
      }
    }

    return {
      rows,
      columns,
      cells,
    };
  }

  private _getNeighbours(cell: Cell, grid: Grid): Cell[] {
    const leftTopNeighbour =
      grid.cells[cell.index - grid.columns - 1]?.row === cell.row - 1
        ? grid.cells[cell.index - grid.columns - 1]
        : undefined;
    const topNeighbour =
      grid.cells[cell.index - grid.columns]?.row === cell.row - 1
        ? grid.cells[cell.index - grid.columns]
        : undefined;
    const rightTopNeighbour =
      grid.cells[cell.index - grid.columns + 1]?.row === cell.row - 1
        ? grid.cells[cell.index - grid.columns + 1]
        : undefined;

    const leftNeighbour =
      grid.cells[cell.index - 1]?.row === cell.row
        ? grid.cells[cell.index - 1]
        : undefined;
    const rightNeighbour =
      grid.cells[cell.index + 1]?.row === cell.row
        ? grid.cells[cell.index + 1]
        : undefined;

    const leftBottomNeighbour =
      grid.cells[cell.index + grid.columns - 1]?.row === cell.row + 1
        ? grid.cells[cell.index + grid.columns - 1]
        : undefined;
    const bottomNeighbour =
      grid.cells[cell.index + grid.columns]?.row === cell.row + 1
        ? grid.cells[cell.index + grid.columns]
        : undefined;
    const rightBottomNeighbour =
      grid.cells[cell.index + grid.columns + 1]?.row === cell.row + 1
        ? grid.cells[cell.index + grid.columns + 1]
        : undefined;

    return [
      leftTopNeighbour,
      topNeighbour,
      rightTopNeighbour,
      leftNeighbour,
      rightNeighbour,
      leftBottomNeighbour,
      bottomNeighbour,
      rightBottomNeighbour,
    ].filter((cell) => cell) as Cell[];
  }

  private _selectionToIndex(selection: Selection): number {
    return selection.column + selection.row * this.columns;
  }
}
