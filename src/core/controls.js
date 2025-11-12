function handleControls() {
  adminControls();

  if (scene != 0 && !skirmishing) {
    moveCamera();
    zoomCamera();
  }
}

function adminControls() {
  if (keyIsDown(78) && scene == 2) { // N
    player = null;
    selectedTile = null;
    scene = 0;
    initMainMenu();
  }
}

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
  
  if (scene != 0 && !skirmishing) {
    let factor = pow(2, -event.delta * cam.zoomSpeed);
    cam.zoom *= factor;
  }
  // Constrain zoom to min/max
  cam.zoom = constrain(cam.zoom, cam.minZoom, cam.maxZoom);

  return false; // Prevent page scroll
}

function mouseClicked() {
  if (event.target !== canvas) return;
  if (document.activeElement.tagName !== 'BODY') return;

  let worldX = (mouseX - width / 2) / cam.zoom + cam.x;
  let worldY = (mouseY - height / 2) / cam.zoom + cam.y;

  if (scene != 0 && !skirmishing) {
    selectedTile = findTileByWorldPos(worldX, worldY);
    if (selectedTile) selectedWall = selectedTile.walls[0];
  }
  if (selectedTile) {
    console.log("Selected tile", selectedTile.id + 1);
    // if (selectedTile.neighbours && selectedTile.neighbours.length > 0) {
    //   console.log("Neighbours:");
    //   selectedTile.neighbours.forEach((n, i) => {
    //     console.log(`  ${i}: Tile ID ${n.id + 1}`);
    //   });
    // } else {
    //   console.log("This tile has no neighbours.");
    // }
  }
  if (selectedWall) {
    console.log("Selected wall", selectedWall.tile.id + 1, selectedWall.direction);
  }
}