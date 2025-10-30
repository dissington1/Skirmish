class Player {
  constructor(name) {
    this.name = name
    this.colour = generateRandomPlayerColour();
    this.tiles = [];
    this.actions = 10;
  }
}