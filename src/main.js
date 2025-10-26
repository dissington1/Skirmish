function setup() {
  createCanvas(windowWidth, windowHeight);

  // UI
  initUI();

  // Board
  generateBoard();
}

function draw() {
  background(200);

  // Controls
  handleControls();

  // Render
  drawCamera();
  drawBoard();
  drawUI();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}