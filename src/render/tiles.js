function drawBoard() {
  strokeWeight(2);
  stroke(0, 50);
  for (let tile of board) {
    drawTile(tile);
  }
}

function drawTile(tile) {
  push();
  // Styles
  fill(TILE_COLOURS[tile.terrain]);
  stroke(4);

  // Render
  drawShape(tile.vertices);
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