import { GridItem } from "./GridItem.js";

class Grid {
  #currentItem;
  constructor(width, height, playerStartX = 0, playerStartY = height - 1) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.playerX = playerStartX;
    this.playerY = playerStartY;

    for (let row = 0; row < height; row++) {
      let thisRow = [];
      for (let col = 0; col < width; col++) {
        thisRow.push(new GridItem());
      }
      this.grid.push(thisRow);
    }
    this.grid[height - 1][0] = new GridItem("🐒", "player");
    this.grid[0][width - 1] = new GridItem("⭐", "win");

    this.displayGrid();
  }

  displayGrid() {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        process.stdout.write(this.grid[row][col].sprite);
        process.stdout.write("\t");
      }
      process.stdout.write("\n");
    }
  }

  movePlayerRight() {
    if (this.playerX === this.width - 1) {
      console.log("Cannot move right.");
      return;
    }
    this.grid[this.playerY][this.playerX] = new GridItem("🐾", "discovered");
    this.playerX++;

    if (this.grid[this.playerY][this.playerX].type === "discovered") {
      this.grid[this.playerY][this.playerX] = new GridItem("🐒");
      return;
    }
    this.#currentItem = new GridItem("🐒");
    this.grid[this.playerY][this.playerX] = new GridItem("🐒");
  }

  movePlayerLeft() {
    if (this.playerX === 0) {
      console.log("Cannot move left.");
      return;
    }
    this.grid[this.playerY][this.playerX] = new GridItem("🐾", "discovered");
    this.playerX--;

    if (this.grid[this.playerY][this.playerX].type === "discovered") {
      this.grid[this.playerY][this.playerX] = new GridItem("🐒");
      return;
    }
    this.#currentItem = new GridItem("🐒");
    this.grid[this.playerY][this.playerX] = new GridItem("🐒");
  }

  movePlayerUp() {
    if (this.playerY === 0) {
      console.log("Cannot move up.");
      return;
    }
    this.grid[this.playerY][this.playerX] = new GridItem("🐾", "discovered");
    this.playerY--;

    if (this.grid[this.playerY][this.playerX].type === "discovered") {
      this.grid[this.playerY][this.playerX] = new GridItem("🐒");
      return;
    }
    this.#currentItem = new GridItem("🐒");
    this.grid[this.playerY][this.playerX] = new GridItem("🐒");
  }

  movePlayerDown() {
    if (this.playerY === this.height - 1) {
      console.log("Cannot move down.");
      return;
    }
    this.grid[this.playerY][this.playerX] = new GridItem("🐾", "discovered");
    this.playerY++;

    if (this.grid[this.playerY][this.playerX].type === "discovered") {
      this.grid[this.playerY][this.playerX] = new GridItem("🐒");
      return;
    }
    this.#currentItem = new GridItem("🐒");
    this.grid[this.playerY][this.playerX] = new GridItem("🐒");
  }
}

new Grid(5, 5);
