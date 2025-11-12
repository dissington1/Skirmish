class Wall {
  constructor(tile, direction, coords) {
    this.tile = tile;
    this.direction = direction;
    this.coords = coords
    this.modifier = 0;
    this.title = null;
    this.modifierTitle = "None";
    this.attBonus = 0;
    this.defBonus = 0;
    this.connectedTile;

    switch (direction) {
      case 0:
        this.title = "North";
        break;
      case 1:
        this.title = "North-West";
        break;
      case 2:
        this.title = "North-East";
        break;
      case 3:
        this.title = "South-West";
        break;
      case 4:
        this.title = "South-East";
        break;
      case 5:
        this.title = "South";
        break;
    }
  }

  updateStats() {
    this.modifierTitle = this.generateModifierTitle(this.modifier);

    switch (this.modifier) {
      case 0: { // None
        this.attBonus = 0;
        this.defBonus = 0;
        break;
      }
      case 1: { // Wooden Palisade
        this.defBonus = 2;
        break;
      }
      case 2: { // Stone Wall
        this.defBonus = 3;
        break;
      }
      case 3: { // Stone Wall & Moat
        this.defBonus = 5;
        break;
      }
      case 4: { // Battering Ram
        this.attBonus = 2;
        break;
      }
      case 5: { // Trebuchet
        this.attBonus = 5;
        break;
      }
      case 6: { // Cannons & Artillery
        this.attBonus = 9;
        break;
      }
      case 7: { // Bridge
        this.attBonus = -2;
        this.defBonus = -2;
        break;
      }
    }
  }

  generateModifierTitle(modifier) {
    switch (modifier) {
      case 0: return "None";
      case 1: return "Wooden Palisade";
      case 2: return "Stone Wall";
      case 3: return "Stone Wall & Moat";
      case 4: return "Battering Ram"
      case 5: return "Trebuchet"
      case 6: return "Cannons & Artillery";
      case 7: return "Bridge";
    }
  }
}