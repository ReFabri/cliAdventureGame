import inquirer from "inquirer";

async function directionToMove() {
  const movePrompt = [
    {
      type: "list",
      name: "direction",
      message: "Where do you want to go?",
      choices: ["Top", "Right", "Bottom", "Left"],
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

// const dir = await directionToMove();
// console.log(dir);

function generateGrid(grid) {
  for (let i = 0; i < 10; i++) {
    grid[i] = [];
    for (let j = 0; j < 10; j++) {
      grid[i][j] = "🌲 ";
    }
  }
  for (const row of grid) {
    const rowStr = row.join("");
    console.log(rowStr);
  }
}
generateGrid();
