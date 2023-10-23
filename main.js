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

const dir = await directionToMove();
console.log(dir);
