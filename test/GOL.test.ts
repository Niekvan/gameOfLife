import { GameOfLife } from '../src/GOL';
import { Cell, Grid, Selection } from '../src/types';

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

  it('Should add an active cell', () => {
    const selected: Selection = { row: 1, column: 1 };
    const expected: Cell = {
      row: 1,
      column: 1,
      index: 6,
      alive: true,
      aliveNeighbours: 0,
    };
    const game = new GameOfLife({ rows: 5, columns: 5 });

    game.setCellActive(selected);

    expect(game['alivePopulation'][expected.index]).toEqual(expected);
    expect(game.state.cells[expected.index]).toEqual(expected);
  });

  /**
   * TODO:
   * reset
   * randomise
   * resize
   * sequence
   * createGrid
   * getNeighbours
   */
});
