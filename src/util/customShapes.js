function drawShape(vertices) {
  beginShape();
  vertices.forEach(v => vertex(v.x, v.y));
  endShape(CLOSE);
}
