import Grid from "./grid.js";

async function game() {
  const grid = new Grid(10, 10);
  console.clear();
  grid.drawInfo();
  grid.drawGrid();
  while (true) {
    await grid.updateGrid();
    console.clear();
    grid.drawInfo();
    grid.drawGrid();
  }
}

game();
