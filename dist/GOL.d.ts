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
    setCellActive(data: Selection): void;
    reset(): void;
    randomise(): void;
    resize(rows: number, columns: number): void;
    sequence(): void;
    private _createGrid;
    private _getNeighbours;
}
