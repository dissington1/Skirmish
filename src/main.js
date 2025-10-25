function setup() {
  createCanvas(windowWidth, windowHeight);
  initUI();
  newBoard();
}

function draw() {
  background(200);

  // Controls
  moveCamera();

  // Render
  drawCamera();

  // Draw all tiles
  strokeWeight(2);
  stroke(0, 50); // Dark, semi-transparent border
  for (let tile of board) {
    drawTile(tile);
  }

  drawUI();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}