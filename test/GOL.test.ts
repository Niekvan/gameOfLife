import { GameOfLife } from '../src/GOL';
import { copyWithoutReference } from '../src/helpers';
import { AliveMap, Cell, Grid, Selection } from '../src/types';

describe('Testing Game of Life', () => {
  it('Should create the initial state', () => {
    const rows = 2;
    const columns = 2;
    const game = new GameOfLife({ rows, columns });

    const cells: Cell[] = [
      { alive: false, aliveNeighbours: 0, index: 0, column: 0, row: 0 },
      { alive: false, aliveNeighbours: 0, index: 1, column: 1, row: 0 },
      { alive: false, aliveNeighbours: 0, index: 2, column: 0, row: 1 },
      { alive: false, aliveNeighbours: 0, index: 3, column: 1, row: 1 },
    ];

    const expected: Grid = {
      rows,
      columns,
      cells,
    };
    expect(game.state).toStrictEqual(expected);
  });

  it('Should have a frame count of zero', () => {
    const game = new GameOfLife({ rows: 5, columns: 5 });

    expect(game.frameCount).toBe(0);
  });

  it('Should have no alive members', () => {
    const game = new GameOfLife({ rows: 5, columns: 5 });
    expect(game['alivePopulation']).toStrictEqual({});
  });

  it('Should toggle an active cell', () => {
    const selected: Selection = { row: 1, column: 1 };
    const index: number = 6;
    const expectedAlive: Cell = {
      row: 1,
      column: 1,
      index,
      alive: true,
      aliveNeighbours: 0,
    };

    const expectedDead: Cell = {
      row: 1,
      column: 1,
      index,
      alive: false,
      aliveNeighbours: 0,
    };

    const game = new GameOfLife({ rows: 5, columns: 5 });

    game.toggleCellAlive(selected);

    expect(game['alivePopulation'][index]).toEqual(expectedAlive);
    expect(game.state.cells[index]).toEqual(expectedAlive);

    game.toggleCellAlive(selected);

    expect(game['alivePopulation'][index]).toEqual(undefined);
    expect(game.state.cells[index]).toEqual(expectedDead);
  });

  it('Should randomly set cells alive', () => {
    const game = new GameOfLife({ rows: 5, columns: 5 });

    const initialState = copyWithoutReference(game.state);
    const initialAlive = game['alivePopulation'];

    game.randomise();

    const randomState = copyWithoutReference(game.state);

    expect(initialState).not.toStrictEqual(randomState);
    expect(initialAlive).not.toStrictEqual(game['alivePopulation']);
  });

  it('Should reset the game', () => {
    const rows = 2;
    const columns = 2;
    const game = new GameOfLife({ rows, columns });

    const cells: Cell[] = [
      { alive: false, aliveNeighbours: 0, index: 0, column: 0, row: 0 },
      { alive: false, aliveNeighbours: 0, index: 1, column: 1, row: 0 },
      { alive: false, aliveNeighbours: 0, index: 2, column: 0, row: 1 },
      { alive: false, aliveNeighbours: 0, index: 3, column: 1, row: 1 },
    ];

    const expected: Grid = {
      rows,
      columns,
      cells,
    };

    game.randomise();
    game.reset();

    expect(game.state).toStrictEqual(expected);
  });

  it('Should resize the game', () => {
    const game = new GameOfLife({ rows: 5, columns: 5 });

    game.resize({ rows: 10, columns: 20 });

    expect(game.state.rows).toBe(10);
    expect(game.state.columns).toBe(20);
  });

  it('Should set the seed', () => {
    const game = new GameOfLife({ rows: 5, columns: 5 });

    const seed: Selection[] = [
      {
        row: 2,
        column: 1,
      },
      {
        row: 2,
        column: 2,
      },
      {
        row: 2,
        column: 3,
      },
    ];

    const expected: AliveMap = {
      11: {
        row: 2,
        column: 1,
        index: 11,
        alive: true,
        aliveNeighbours: 0,
      },
      12: {
        row: 2,
        column: 2,
        index: 12,
        alive: true,
        aliveNeighbours: 0,
      },
      13: {
        row: 2,
        column: 3,
        index: 13,
        alive: true,
        aliveNeighbours: 0,
      },
    };

    game.seed(seed);

    const aliveCells = game.state.cells.filter((cell) => cell.alive);

    expect(game['alivePopulation']).toStrictEqual(expected);
    expect(aliveCells).toStrictEqual(Object.values(expected));
  });

  it('Should execute a new generation of cells', () => {
    const game = new GameOfLife({ rows: 3, columns: 3 });
    const seed: Selection[] = [
      {
        row: 1,
        column: 0,
      },
      {
        row: 1,
        column: 1,
      },
      {
        row: 1,
        column: 2,
      },
    ];

    const expected = [
      {
        row: 0,
        column: 0,
        index: 0,
        alive: false,
        aliveNeighbours: 2,
      },
      {
        row: 0,
        column: 1,
        index: 1,
        alive: true,
        aliveNeighbours: 3,
      },
      {
        row: 0,
        column: 2,
        index: 2,
        alive: false,
        aliveNeighbours: 2,
      },
      {
        row: 1,
        column: 0,
        index: 3,
        alive: false,
        aliveNeighbours: 1,
      },
      {
        row: 1,
        column: 1,
        index: 4,
        alive: true,
        aliveNeighbours: 2,
      },
      {
        row: 1,
        column: 2,
        index: 5,
        alive: false,
        aliveNeighbours: 1,
      },
      {
        row: 2,
        column: 0,
        index: 6,
        alive: false,
        aliveNeighbours: 2,
      },
      {
        row: 2,
        column: 1,
        index: 7,
        alive: true,
        aliveNeighbours: 3,
      },
      {
        row: 2,
        column: 2,
        index: 8,
        alive: false,
        aliveNeighbours: 2,
      },
    ];

    game.seed(seed);
    game.sequence();

    expect(game.state.cells).toStrictEqual(expected);
  });
});
