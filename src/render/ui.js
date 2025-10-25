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
  let w = 4 / cam.zoom;
  if (w < 4) w = 4;
  strokeWeight(w);

  // Draw each wall if it exists
  for (let wall of tile.walls) {
    if (wall && wall.pos && wall.pos.a && wall.pos.b) {
      line(
        wall.pos.a.x,
        wall.pos.a.y,
        wall.pos.b.x,
        wall.pos.b.y
      );
    }
  }

  pop();
}
