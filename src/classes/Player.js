class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.colour = generateRandomPlayerColour();
    this.tiles = [];
    this.actions = 10;
  }
}