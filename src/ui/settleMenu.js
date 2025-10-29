function settleMenu() {
  push();
  resetMatrix();
  fill(0, 0, 0, 150); // Black with 150 alpha for "fuzzy" look
  rect(0, height - 125, width, 75);

  fill("#FFC300");
  textAlign(CENTER, CENTER);
  textSize(32);
  textFont('Cinzel');
  text("SELECT A TILE TO CALL YOUR HOME", width / 2, height - 85);
  pop();
}