class Player {
  constructor(name) {
    this.name = name
    this.colour = generateRandomPlayerColour();
    this.tiles = [];
  }
}