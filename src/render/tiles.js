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
  if (tile.isHome) drawFlag(tile);

  pop();
}

function drawFlag(tile) {
  translate(tile.x, tile.y); // Tile center

  // Pole
  // Styles
  noStroke();
  fill(0);

  // Render
  rect(-12, -TILE_SIZE * 0.5, 6, TILE_SIZE);

  // Flag
  // Styles
  fill(tile.occupant.colour);
  noStroke();

  // Render
  triangle(
    -6, -TILE_SIZE * 0.5,
    25, -10,
    -6, TILE_SIZE * 0.5 - 20
  );
}