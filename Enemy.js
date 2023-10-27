class Enemy {
  constructor(hp, attack, defense) {
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
  }
}

class Spider extends Enemy {
  constructor(hp, attack, defense) {
    super(hp, attack, defense);
  }
}

export { Spider };
