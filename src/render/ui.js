function initUI() {
  initMainMenu();
  initTileHud();
  initPlayerHud();
  tileHud.pane.hidden = true;
}

function drawUI() {
  drawBorders();

  if (selectedTile) {
    if (tileHud.pane.hidden) tileHud.pane.hidden = false;
    updateTileHud(selectedTile);
    highlightTile(selectedTile);
    if (scene == 2) highlightWall(selectedWall);
    
  }
  else {
    if (!tileHud.pane.hidden) tileHud.pane.hidden = true;
  }

  switch (scene) {
    case 0: // Profile selection
      selectedTile = null;
      if (!playerHud.pane.hidden) playerHud.pane.hidden = true;
      mainMenu();
      break;
    case 1: // Home tile selection
      if (!playerHud.pane.hidden) playerHud.pane.hidden = true;
      settleMenu();
      break;
    case 2:
      if (playerHud.pane.hidden) playerHud.pane.hidden = false;
      updatePlayerHud(player);
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

function highlightWall(wall) {
  push();

  // Calculate alpha:
  // It's 0 when zoom is 1 or less.
  // It fades from 0 to 150 as zoom goes from 1.0 to 1.5.
  // It stays 150 when zoom is 1.5 or more.
  const alpha = Math.max(0, Math.min(255, (cam.zoom - 0.25) * 300));

  // Style
  noFill();
  stroke(255, 0, 0, alpha); // Use the new alpha (and corrected to red)
  strokeWeight(Math.max(4, 4 / cam.zoom));

  const { a, b } = wall.coords;

  // Draw the line directly on the wall's coordinates
  line(a.x, a.y, b.x, b.y);

  pop();
}