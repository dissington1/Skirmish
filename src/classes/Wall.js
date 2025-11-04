class Wall {
  constructor(tile, direction, coords) {
    this.tile = tile;
    this.direction = direction;
    this.coords = coords
    this.modifier = null;
    this.title = null;

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
}