const { GameOfLife } = window.GameOfLife;
const game = new GameOfLife({ rows: 100, columns: 100 });
game.randomise();

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const randomButton = document.querySelector('#random');
const emptyButton = document.querySelector('#empty');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const size = Math.min(window.innerWidth, window.innerHeight);
canvas.width = size;
canvas.height = size;

const cellSize = Math.floor(size / game.state.columns);

const fillCanvas = (cells) => {
  for (cell of cells) {
    const color = cell.alive ? '#FF7586' : '#181818';
    ctx.fillStyle = color;
    ctx.fillRect(
      cell.column * cellSize,
      cell.row * cellSize,
      cellSize,
      cellSize
    );
  }
};

fillCanvas(game.state.cells);

let cancel;
const loop = () => {
  game.sequence();
  fillCanvas(game.state.cells);
  cancel = requestAnimationFrame(loop);
};

startButton.addEventListener('click', () => loop());
stopButton.addEventListener('click', () => cancelAnimationFrame(cancel));
randomButton.addEventListener('click', () => {
  cancelAnimationFrame(cancel);
  game.randomise();
  fillCanvas(game.state.cells);
});
emptyButton.addEventListener('click', () => {
  cancelAnimationFrame(cancel);
  game.reset();
  fillCanvas(game.state.cells);
});
