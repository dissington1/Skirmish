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

function generateRandomPlayerColour() {
  if (PLAYER_COLOURS.length === 0) return null;

  const index = Math.floor(Math.random() * PLAYER_COLOURS.length);
  
  return PLAYER_COLOURS.splice(index, 1)[0];
}

function hexToWorldCoordinates(q, r) {
  return {
    x: TILE_SIZE * 1.5 * q,
    y: TILE_SIZE * Math.sqrt(3) * (r + q / 2)
  }
}

function worldToHexCoordinates(x, y) {
  const q = (2/3 * x) / TILE_SIZE;
  const r = ((-1/3 * x) + (Math.sqrt(3)/3 * y)) / TILE_SIZE;
  return cubeRound(q, r);
}

function cubeRound(q, r) {
  let x = q;
  let z = r;
  let y = -x - z;

  let rx = Math.round(x);
  let ry = Math.round(y);
  let rz = Math.round(z);

  const x_diff = Math.abs(rx - x);
  const y_diff = Math.abs(ry - y);
  const z_diff = Math.abs(rz - z);

  if (x_diff > y_diff && x_diff > z_diff) {
    rx = -ry - rz;
  } else if (y_diff > z_diff) {
    ry = -rx - rz;
  } else {
    rz = -rx - ry;
  }

  return { q: rx, r: rz };
}

function findTileByWorldPos(worldX, worldY) {
  const { q, r } = worldToHexCoordinates(worldX, worldY);
  return tileMap.get(`${q},${r}`) || null;
}

function clampNoise(noise, low, high) {
  noise = (noise - low) / (high - low);
  return Math.max(0, Math.min(1, noise));
}

function drawShape(vertices) {
  beginShape();
  vertices.forEach(v => vertex(v.x, v.y));
  endShape(CLOSE);
}