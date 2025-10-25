function drawTile(tile) {
  let hex = generateHexagon(tile.x, tile.y, TILE_SIZE);

  // Init walls
  if (tile.walls[0] == null) {
    console.log(tile.id);
    for (let i = 0; i < 6; i++) {
      let direction;
      let pos = {a: 0, b: 0};

      let a = i;
      let b = a == 5 ? 0 : a + 1; // Loop around if at end

      pos.a = hex[a];
      pos.b = hex[b];

      switch (a) {
        case 0:
          direction = 4; // BR
          break;
        case 1:
          direction = 5; // BB
          break;
        case 2:
          direction = 3; // BL
          break;
        case 3:
          direction = 1; // TL
          break;
        case 4:
          direction = 0; // TT
          break;
        case 5:
          direction = 2; // TR
          break;
        default:
          return;
      }

      tile.walls[direction] = new Wall(tile, direction, pos);
    }
  }

  push();
  // Styles
  fill(TILE_COLOURS[tile.type]);
  stroke(4);

  // Render
  drawShape(hex);
  if (tile.home && tile.occupant == user) drawFlag(tile.x, tile.y, true);

  pop();
}

function drawFlag(x, y, isHome) {
  translate(x, y); // Tile center

  // Pole
  // Styles
  noStroke();
  fill(0);

  // Render
  rect(-1, -TILE_SIZE * 0.25, 2, TILE_SIZE * 0.5);

  // Flag
  // Styles
  isHome ? fill(255, 0, 0) : fill(0, 255, 255);
  noStroke();

  // Render
  triangle(
    1, -TILE_SIZE * 0.25,
    TILE_SIZE * 0.25, -TILE_SIZE * 0.15,
    1, -TILE_SIZE * 0.05
  );
}