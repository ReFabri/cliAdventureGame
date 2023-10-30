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

  describe() {
    const phrases = [
      "Coast is clear!",
      "These surrounding look familiar..",
      "There's not much here.",
    ];
    const random = Math.floor(Math.random() * phrases.length);
    console.log(phrases[random]);
  }
}

export { GridItem };
