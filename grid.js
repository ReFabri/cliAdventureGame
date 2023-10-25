import inquirer from "inquirer";

class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.info = ["\n", "", "\n"];
    this.pos = { row: 0, col: this.rows - 1 };
    this.grid = this.generateGrid();
  }

  generateGrid() {
    const newGrid = [];
    for (let row = 0; row < this.rows; row++) {
      newGrid[row] = [];
      for (let col = 0; col < this.cols; col++) {
        newGrid[row][col] = "🌲 ";
      }
    }
    newGrid[this.pos.row][this.pos.col] = "🐒 ";
    return newGrid;
  }

  drawInfo() {
    if (this.info[0]) {
      this.info.forEach((info) => console.log(info));
    }
  }

  drawGrid() {
    for (let row of this.grid) {
      let rowStr = "";
      for (let col of row) {
        rowStr += col;
      }
      console.log(rowStr);
    }
    console.log("\n");
  }

  async directionToMove() {
    const movePrompt = [
      {
        type: "list",
        name: "direction",
        message: "Where do you want to go?",
        choices: [
          { name: "Up", value: { col: 0, row: -1 } },
          { name: "Down", value: { col: 0, row: 1 } },
          { name: "Left", value: { col: -1, row: 0 } },
          { name: "Right", value: { col: 1, row: 0 } },
        ],
      },
    ];
    try {
      const direction = await inquirer.prompt(movePrompt);
      return await direction;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  async updateGrid() {
    const dir = await this.directionToMove();
    console.log(dir);
    const newRow = this.pos.row + dir.direction.row;
    const newCol = this.pos.col + dir.direction.col;

    if (this.grid[newRow] && this.grid[newCol]) {
      this.grid[this.pos.row][this.pos.col] = "💢 ";
      this.pos.row = newRow;
      this.pos.col = newCol;
      this.grid[this.pos.row][this.pos.col] = "🐒 ";
      this.info[1] = "";
    } else {
      this.info[1] = "Can't move outside the grid..";
    }
  }
}
export default Grid;
