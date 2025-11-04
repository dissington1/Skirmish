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
    highlightWall(selectedWall);
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

  // Style
  noFill();
  stroke(255, 0, 0);
  strokeWeight(Math.max(4, 4 / cam.zoom));

  line(
    wall.coords.a.x,
    wall.coords.a.y,
    wall.coords.b.x,
    wall.coords.b.y
  );

  pop();
}
