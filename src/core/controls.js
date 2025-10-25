function moveCamera() {
  let speed = cam.moveSpeed / cam.zoom;

  if (keyIsDown(87)) cam.y -= speed; // W
  if (keyIsDown(83)) cam.y += speed; // S
  if (keyIsDown(65)) cam.x -= speed; // A
  if (keyIsDown(68)) cam.x += speed; // D
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
      break;
    }
  }
}