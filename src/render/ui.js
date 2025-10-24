function drawUI() {
  if (selectedTile) {
    highlightTile(selectedTile);
  }
}

function highlightTile(tile) {
  let hex = generateHexagon(tile.x, tile.y, TILE_SIZE);

  push();

  // Style
  noFill();
  stroke(255, 200, 0);
  let w = 4 / cam.zoom;
  if (w < 4) w = 4;
  strokeWeight(w); // Scale highlight thickness with zoom


  // Render
  drawShape(hex);

  pop();
}