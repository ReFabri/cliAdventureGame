# Node CLI Adventure Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a simple CLI adventure game created with the intention of applying and improving my Object Oriented Programming skills.

In this small project I use the four pillars of OOP: Encapsulation, Abstraction, Inheritance and Polymorphism to achieve a simple but functional game.

The objective of the game is for the player to reach the objective tile without the player's HP reaching 0.

The game consists of a 2D grid with pieces representing a forest, the player starts in the bottom left corner and the objective is in the top right corner of the grid.

## Game Start

![cliAdv1.jpg](https://github.com/ReFabri/assets/blob/main/cliAdventureGame/cliAdv1.jpg?raw=true)

The Player can move up, down, left or right by selecting the option on the screen, but cannot leave the screen.

As the player moves, the previous piece becomes "known" and safe to return, the current piece is randomly chosen as a forest, item, or enemy piece.

## Progression

<div style="display: flex; justify-content: space-between;">
    <img src="https://github.com/ReFabri/assets/blob/main/cliAdventureGame/cliAdv2.jpg?raw=true" alt="Image 1" width="48%" />
    <img src="https://github.com/ReFabri/assets/blob/main/cliAdventureGame/cliAdv3.jpg?raw=true" alt="Image 2" width="48%" />
</div>

If the current piece is an item, the item's stats will be added to the Player's Attack and Defense.

If the current piece is an enemy, a fight begins, on the player's turn, the Attack and Defense stats are compared to the enemy's stats,

If the player's Attack is greater than the enemy's Defense, the difference is taken from the enemy's HP. and vice versa.

If the enemy wins the fight, the game ends. If the player wins the fight, the player continues his adventure with an adjusted HP.

When the Player reaches the Objective tile, the Player receives a Congratulations message and the game ends.

## Success

![cliAdv4.jpg](https://github.com/ReFabri/assets/blob/main/cliAdventureGame/cliAdv4.jpg?raw=true)

## Built With

- [Node.js](https://nodejs.org/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Inquirer](https://github.com/SBoudrias/Inquirer.js) - A collection of common interactive command line user interfaces.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

Feel free to reach out if you have any questions or feedback!
