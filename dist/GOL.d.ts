import { Grid, InitialData, Selection } from './types';
export declare class GameOfLife {
    private rows;
    private columns;
    private grid;
    private frame;
    private alivePopulation;
    constructor(data: InitialData);
    get state(): Grid;
    get frameCount(): number;
    toggleCellAlive(selection: Selection): void;
    reset(): void;
    randomise(): void;
    seed(seed: Selection[]): void;
    resize(data: {
        rows: number;
        columns: number;
    }): void;
    sequence(): void;
    private _createGrid;
    private _getNeighbours;
    private _selectionToIndex;
}
