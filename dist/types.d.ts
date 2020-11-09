export interface InitialData {
    columns: number;
    rows: number;
}
export interface Cell {
    alive: boolean;
    aliveNeighbours: number;
    column: number;
    row: number;
    index: number;
}
export interface Selection {
    row: number;
    column: number;
}
export interface Grid {
    columns: number;
    rows: number;
    cells: Cell[];
}
export interface AliveMap {
    [key: number]: Cell;
}
