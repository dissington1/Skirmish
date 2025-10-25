function moveCamera() {
  let speed = cam.moveSpeed / cam.zoom;

  if (keyIsDown(87)) cam.y -= speed; // W
  if (keyIsDown(83)) cam.y += speed; // S
  if (keyIsDown(65)) cam.x -= speed; // A
  if (keyIsDown(68)) cam.x += speed; // D
}

function zoomCamera() {
  let zoomFactor = 1.05; // 5% per key press

  if (keyIsDown(187)) cam.zoom *= zoomFactor; // '+'
  if (keyIsDown(189)) cam.zoom /= zoomFactor; // '-'

  cam.zoom = constrain(cam.zoom, cam.minZoom, cam.maxZoom);
}

function mouseWheel(event) {
  // Multiplicative zoom factor
  let factor = pow(2, -event.delta * cam.zoomSpeed);

  cam.zoom *= factor;

  // Constrain zoom to min/max
  cam.zoom = constrain(cam.zoom, cam.minZoom, cam.maxZoom);

  return false; // Prevent page scroll
}

function mouseClicked() {
  let worldX = (mouseX - width / 2) / cam.zoom + cam.x;
  let worldY = (mouseY - height / 2) / cam.zoom + cam.y;

  for (let tile of board) {
    let d = dist(worldX, worldY, tile.x, tile.y);
    if (d < TILE_SIZE) {
      selectedTile = tile;

      // Debug logs
      console.log("Tile:", selectedTile.id);
      console.log("Neighbours:");
      for (let i = 0; i < 6; i++) {
        switch (i) {
          case 0:
            console.log("  TT:", selectedTile.neighbours[i].id + 1)
            break;
          case 1:
            console.log("  TL:", selectedTile.neighbours[i].id + 1)
            break;
          case 2:
            console.log("  TR:", selectedTile.neighbours[i].id + 1)
            break;
          case 3:
            console.log("  BL:", selectedTile.neighbours[i].id + 1)
            break;
          case 4:
            console.log("  BR:", selectedTile.neighbours[i].id + 1)
            break;
          case 5:
            console.log("  BB:", selectedTile.neighbours[i].id + 1)
            break;
          default:
            break;
        }
      }
      break;
    }
  }
}