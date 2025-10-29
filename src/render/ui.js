function initUI() {
  initMainMenu();
  initTileHud();
  tileHud.pane.hidden = true;
}

function drawUI() {
  drawBorders();

  if (selectedTile) {
    tileHud.pane.hidden = false;
    updateTileHud(selectedTile);
    highlightTile(selectedTile);
  }

  switch (scene) {
    case 0: // Profile selection
      mainMenu();
      break;
    case 1: // Home tile selection
      settleMenu();
      break;
    case 2:
      break;
  }
}

function drawBorders() {
  for (let p of players) {
    for (let tile of p.tiles) {
      push();

      // Style
      noFill();
      strokeWeight(Math.max(4, 4 / cam.zoom));
  
      // Render
      for (let wall of tile.walls) {
        const neighbour = tile.neighbours[wall.direction];
        if (!neighbour || neighbour.occupant != p) { // Checks if tile is an edge tile
          if (neighbour.occupant) {
            const c = color(p.colour);
            stroke(red(c), green(c), blue(c), 128);
          }
          else {
            stroke(p.colour);
          }
          line(
            wall.coords.a.x,
            wall.coords.a.y,
            wall.coords.b.x,
            wall.coords.b.y
          );
        }
      }
      pop();
    }
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
