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

  public setCellActive(data: Selection): void {
    const { row, column } = data;
    const index = column - 1 + (row - 1) * this.columns;
    const cell = copyWithoutReference(this.grid.cells[index]);
    cell.alive = true;
    this.grid.cells[index] = cell;
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
        aliveCells[newCell.index] = newCell;
      }
    }
    this.grid = newGrid;
    this.alivePopulation = aliveCells;
  }

  public resize(rows: number, columns: number): void {
    this.rows = rows;
    this.columns = columns;
    this.reset();
  }

  public sequence(): void {
    const newGrid = this._createGrid(this.rows, this.columns);

    const aliveKeys: number[] = Object.keys(this.alivePopulation).map(Number);
    const aliveNodes: AliveMap = {};

    for (let i = aliveKeys.length - 1; i > 0; i--) {
      const key = aliveKeys[i];
      const cell = this.alivePopulation[key];
      const neighbours = this._getNeighbours(cell, newGrid);

      for (let j = neighbours.length - 1; j >= 0; j--) {
        const neighbour = neighbours[j];
        neighbour.aliveNeighbours++;
        switch (neighbour.aliveNeighbours) {
          case 3:
            neighbour.alive = true;
            aliveNodes[neighbour.index] = neighbour;
            break;
          case 2:
            const alive = neighbour.index in this.alivePopulation;
            if (alive) {
              neighbour.alive = alive;
              aliveNodes[neighbour.index] = neighbour;
            }
            break;
          default:
            neighbour.alive = false;
            delete aliveNodes[neighbour.index];
            break;
        }
        newGrid.cells[neighbour.index] = neighbour;
      }
    }
    this.frame++;
    this.grid = newGrid;
    this.alivePopulation = aliveNodes;
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
    const leftNeighbour = grid.cells[cell.index - 1];
    const leftTopNeighbour = grid.cells[cell.index - grid.columns - 1];
    const leftBottomNeighbour = grid.cells[cell.index + grid.columns - 1];
    const topNeighbour = grid.cells[cell.index - grid.columns];
    const bottomNeighbour = grid.cells[cell.index + grid.columns];
    const rightNeighbour = grid.cells[cell.index + 1];
    const rightTopNeighbour = grid.cells[cell.index - grid.columns + 1];
    const rightBottomNeighbour = grid.cells[cell.index + grid.columns + 1];
    return [
      leftNeighbour,
      leftTopNeighbour,
      leftBottomNeighbour,
      topNeighbour,
      bottomNeighbour,
      rightNeighbour,
      rightTopNeighbour,
      rightBottomNeighbour,
    ].filter((cell) => cell);
  }
}
