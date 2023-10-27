import inquirer from "inquirer";
import { GridItem } from "./GridItem.js";

class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.info = ["\n", "", "\n"];
    this.pos = { row: this.rows - 1, col: 0 };
    this.grid = this.generateNewGrid();
  }

  generateNewGrid() {
    const newGrid = [];
    for (let row = 0; row < this.rows; row++) {
      newGrid[row] = [];
      for (let col = 0; col < this.cols; col++) {
        newGrid[row][col] = new GridItem().sprite;
      }
    }
    newGrid[this.pos.row][this.pos.col] = new GridItem("🐒", "player").sprite;
    newGrid[0][this.cols - 1] = new GridItem("🏆", "finish").sprite;
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
          { name: "Up", value: { row: -1, col: 0 } },
          { name: "Down", value: { row: 1, col: 0 } },
          { name: "Left", value: { row: 0, col: -1 } },
          { name: "Right", value: { row: 0, col: 1 } },
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
    const newRow = this.pos.row + dir.direction.row;
    const newCol = this.pos.col + dir.direction.col;

    if (this.grid[newRow] && this.grid[newRow][newCol]) {
      this.grid[this.pos.row][this.pos.col] = new GridItem(
        "💢",
        "previous"
      ).sprite;
      this.pos.row = newRow;
      this.pos.col = newCol;
      this.grid[this.pos.row][this.pos.col] = new GridItem(
        "🐒",
        "player"
      ).sprite;
      this.info[1] = "";
    } else {
      this.info[1] = "Can't move outside the grid..";
    }
  }

  async newRound() {
    await this.updateGrid();
    console.clear();
    this.drawInfo();
    this.drawGrid();
  }
}
export { Grid };
