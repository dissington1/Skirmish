class Tile {
  constructor(x, y, type) {
    this.id = 0;
    this.x = x;
    this.y = y;
    this.type = type; // Terrain type (0-grass, 1-forest, 2-sand, 3-mountain, 4-water)
    this.occupant = null;
    this.home = false;
    this.walls = [null, null, null, null, null]; // TT, TL, TR, BL, BR, BB
    this.neighbours = [null, null, null, null, null, null]; // TT, TL, TR, BL, BR, BB

    switch (this.type) {
      case 0: this.att = 2; this.def = 2; break; // Grass
      case 1: this.att = 3; this.def = 2; break; // Forest
      case 2: this.att = 1; this.def = 1; break; // Sand
      case 3: this.att = 2; this.def = 3; break; // Mountain
      default: this.att = 0; this.def = 0;
    }
  }
}