function generateHexagon(x, y, size) {
  let verticies = [];

  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i;

    verticies.push({
      x: x + size * cos(angle),
      y: y + size * sin(angle)
    });
  }

  return verticies;
}

function drawShape(verticies) {
  beginShape();
  verticies.forEach(v => vertex(v.x, v.y));
  endShape(CLOSE);
}