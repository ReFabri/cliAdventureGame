class GridItem {
  #wall = ["🌲", "🌳", "🌵", "🌿"];
  constructor(sprite, type = "undiscovered") {
    if (!sprite) {
      const wallIndex = Math.floor(Math.random() * this.#wall.length);
      this.sprite = this.#wall[wallIndex];
    } else {
      this.sprite = sprite;
    }
    this.type = type;
  }
}

export { GridItem };
