import { GridItem } from "./GridItem.js";
import { ItemObject } from "./ItemObject.js";
import { Enemy } from "./Enemy.js";
import { Player } from "./Player.js";
import { promptPlayerForDirection } from "./playerPrompts.js";

class Grid {
  #currentItem;

  constructor(width, height, playerStartX = 0, playerStartY = height - 1) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.playerX = playerStartX;
    this.playerY = playerStartY;
    this.player = new Player("Player", { attack: 10, defense: 5, hp: 20 });

    for (let row = 0; row < height; row++) {
      let thisRow = [];
      for (let col = 0; col < width; col++) {
        thisRow.push(new GridItem());
      }
      this.grid.push(thisRow);
    }

    this.grid[height - 1][0] = new GridItem("🐒", "player");
    this.grid[0][width - 1] = new GridItem("⭐️", "win");

    this.startGame();
  }

  async startGame() {
    while (this.player.getStats().hp > 0) {
      this.displayGrid();
      const response = await promptPlayerForDirection();
      this.movePlayer(response);

      console.log("-------------------------------------");
    }
  }

  displayGrid() {
    this.player.describe();
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        process.stdout.write(this.grid[row][col].sprite);
        process.stdout.write("\t");
      }
      process.stdout.write("\n");
    }
  }

  generateGridItem() {
    const random = Math.random();
    let object;

    if (random < 0.15) {
      object = new ItemObject("⚔️", {
        name: "Sword",
        attack: 3,
        defense: 1,
        hp: 0,
      });
    } else if (random < 0.35) {
      object = new Enemy("🕷", {
        name: "Spider",
        attack: 10,
        defense: 1,
        hp: 6,
      });
    } else {
      object = new GridItem("🐾", "discovered");
    }

    return object;
  }

  executeTurn() {
    // console.clear();
    // console.log("-------------------------------------");
    if (this.grid[this.playerY][this.playerX].type === "win") {
      console.log(`🎉 Congrats! You reached the end of the game! 🥳`);
      process.exit();
    }

    if (this.#currentItem.type === "discovered") {
      this.#currentItem.describe();
      return;
    }

    if (this.#currentItem.type === "item") {
      this.#currentItem.describe();
      const itemStats = this.#currentItem.getStats();
      this.player.addToStats(itemStats);
      return;
    }

    this.#currentItem.describe();

    const enemyStats = this.#currentItem.getStats();
    const enemyName = this.#currentItem.getName();
    const playerStats = this.player.getStats();

    if (enemyStats.defense > playerStats.attack) {
      console.log(`You Lose - ${enemyName} was too powerful!`);
      process.exit();
    }

    let totalPlayerDamage = 0;
    while (enemyStats.hp > 0) {
      const enemyDamageTurn = playerStats.attack - enemyStats.defense;
      const playerDamageTurn = enemyStats.attack - playerStats.defense;

      if (enemyDamageTurn > 0) {
        enemyStats.hp -= enemyDamageTurn;
      }
      if (playerDamageTurn > 0) {
        playerStats.hp -= playerDamageTurn;
        totalPlayerDamage += playerDamageTurn;
      }
    }

    if (playerStats.hp <= 0) {
      console.log(`You Lose - ${enemyName} was too powerful!`);
      process.exit();
    }

    this.player.addToStats({ hp: -totalPlayerDamage });
    console.log(`You defeated the ${enemyName}! Your updated stats:`);
    this.player.describe();
    // console.clear();
  }

  movePlayer(direction) {
    if (direction === "Right" && this.playerX === this.width - 1) {
      console.log("Cannot move right.");
      return;
    }
    if (direction === "Left" && this.playerX === 0) {
      console.log("Cannot move left.");
      return;
    }
    if (direction === "Up" && this.playerY === 0) {
      console.log("Cannot move up.");
      return;
    }
    if (direction === "Down" && this.playerY === this.height - 1) {
      console.log("Cannot move down.");
      return;
    }

    this.grid[this.playerY][this.playerX] = new GridItem("🐾", "discovered");

    if (direction === "Right") this.playerX++;
    if (direction === "Left") this.playerX--;
    if (direction === "Up") this.playerY--;
    if (direction === "Down") this.playerY++;

    if (this.grid[this.playerY][this.playerX].type === "discovered") {
      this.grid[this.playerY][this.playerX].describe();
      this.grid[this.playerY][this.playerX] = new GridItem("🐒");
      return;
    }
    this.#currentItem = this.generateGridItem();
    this.executeTurn();
    this.grid[this.playerY][this.playerX] = new GridItem("🐒");
  }
}

export { Grid };
