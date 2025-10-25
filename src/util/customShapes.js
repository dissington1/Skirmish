// Shapes
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

// ID to string
function getTerrainStr(id) {
  switch (id) {
    case 0:
        return "Grass";
    case 1:
        return "Forest"
    case 2:
        return "Sand"
    case 3:
        return "Mountains"
    case 4:
        return "Water"
    default:
      return null
  }
}