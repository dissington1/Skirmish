function initUI() {
  initTileHud();
  tileHud.pane.hidden = true;
}

function drawUI() {
  if (selectedTile) {
    tileHud.pane.hidden = false;
    updateTileHud(selectedTile);
    highlightTile(selectedTile);
  }
}

function highlightTile(tile) {
  push();

  // Style
  noFill();
  stroke(255, 200, 0);
  strokeWeight(Math.max(4, 4 / cam.zoom));

  // Draw each wall if it exists
  for (let wall of tile.walls) {
    line(
      wall.coords.a.x,
      wall.coords.a.y,
      wall.coords.b.x,
      wall.coords.b.y
    );
  }

  pop();
}
