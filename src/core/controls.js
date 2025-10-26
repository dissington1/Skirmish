function handleControls() {
  moveCamera();
  zoomCamera();
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
  let factor = pow(2, -event.delta * cam.zoomSpeed);

  cam.zoom *= factor;

  // Constrain zoom to min/max
  cam.zoom = constrain(cam.zoom, cam.minZoom, cam.maxZoom);

  return false; // Prevent page scroll
}

function mouseClicked() {
  let worldX = (mouseX - width / 2) / cam.zoom + cam.x;
  let worldY = (mouseY - height / 2) / cam.zoom + cam.y;

  selectedTile = findTileByWorldPos(worldX, worldY);

  if (selectedTile) console.log("Selected tile   ", selectedTile.id + 1);

  // selectedTile.neighbours.forEach((n, i) => {
  //   const labels = ["TT", "TL", "TR", "BL", "BR", "BB"];
  //   console.log(`${labels[i]} neighbour  `, n ? n.id + 1 : "None");
  // });
}