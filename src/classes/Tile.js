class Tile {
  constructor(x, y, q, r, vertices, terrain) {
    this.id = 0;

    // World coordiantes
    this.x = x;
    this.y = y;

    // Axial coordinates
    this.q = q;
    this.r = r;

    // Tile vertices
    this.vertices = vertices;

    // Terrain type
    this.terrain = terrain; // Terrain type (0-grass, 1-forest, 2-sand, 3-mountain, 4-water, 5-bridge)

    // Occupying player
    this.occupant = null;

    this.isHome = false;

    this.level = 0;

    this.ravaged = false;

    this.walls = [null, null, null, null, null, null]; // TT, TL, TR, BL, BR, BB
    this.neighbours = [null, null, null, null, null, null]; // TT, TL, TR, BL, BR, BB

    this.title = "Uninhabited";

    this.updateStats();
  }

  updateStats() {
    this.title = this.generateTitle(this.terrain, this.level);

    switch (this.terrain) {
      case 0: { // Grass
        this.att = (2 * this.level + 2); // 2, 4, 6, 8, 10, 12
        this.def = (2 * this.level + 2); // 2, 4, 6, 8, 10, 12
        break;
      }
      case 1: { // Forest
        this.att = this.level < 3 ? 3 * (this.level + 1) : 5 + (this.level * 2); // 3, 6, 9, 11, 13, 15
        this.def = this.level < 3 ? (2 * this.level + 1) : (2 * this.level); // 1, 3, 5, 6, 8, 10
        break;
      }
      case 2: { // Sand
        this.att = this.level < 3 ? (2 * this.level + 1) : (2 * this.level); // 1, 3, 5, 6, 8, 10
        this.def = this.level < 3 ? (2 * this.level + 1) : (2 * this.level); // 1, 3, 5, 6, 8, 10
        this.ravaged = false;
        break;
      }
      case 3: { // Mountain
        this.att = this.level < 3 ? (2 * this.level + 1) : (2 * this.level); // 1, 3, 5, 6, 8, 10
        this.def = this.level < 3 ? 3 * (this.level + 1) : 5 + (this.level * 2); // 3, 6, 9, 11, 13, 15
        break;
      }
      case 5: { // Bridge
        this.att = 1;
        this.def = 1;
        break;
      }
      default: this.att = 0; this.def = 0; // Water
    }
  }

  generateTitle(terrain, level) {
    if (terrain == 5) return "Bridge";

    switch (level) {
      case 1: return "Paths & Roads";
      case 2: return "Budding Hamlet";
      case 3: return "Burgeoning Village";
      case 4: return "Bustling Town";
      case 5:
        switch (terrain) {
          case 0: return "Thriving City";
          case 1: return "Verdant City";
          case 2: return "Nomadic City";
          case 3: return "Fortified City";
          default: return "Uninhabited";
        }
      default: return "Uninhabited";
    }
  }
}