import inquirer from "inquirer";

async function directionToMove() {
  const movePrompt = [
    {
      type: "list",
      name: "direction",
      message: "Where do you want to go?",
      choices: [
        {
          name: "Up",
          value: { col: 0, row: -1 },
        },
        {
          name: "Down",
          value: { col: 0, row: 1 },
        },
        {
          name: "Left",
          value: { col: -1, row: 0 },
        },
        {
          name: "Right",
          value: { col: 1, row: 0 },
        },
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

// const dir = await directionToMove();
// console.log(dir);

function generateGrid() {
  const grid = [];
  for (let row = 0; row < 10; row++) {
    grid[row] = [];
    for (let col = 0; col < 10; col++) {
      grid[row][col] = "🌲 ";
    }
  }
  return grid;
}

function drawGrid(grid) {
  for (let row of grid) {
    let rowStr = "";
    for (let col of row) {
      rowStr += col;
    }
    console.log(rowStr);
  }
}

async function game() {
  const grid = generateGrid();
  let currPosition = { row: 0, col: grid.length - 1 };
  grid[currPosition.row][currPosition.col] = "🐒 ";

  while (true) {
    console.clear();
    drawGrid(grid);
    const dir = await directionToMove();
    grid[currPosition.row][currPosition.col] = "💢 ";

    currPosition.row += dir.direction.row;
    currPosition.col += dir.direction.col;
    grid[currPosition.row][currPosition.col] = "🐒 ";
  }
}

game();
