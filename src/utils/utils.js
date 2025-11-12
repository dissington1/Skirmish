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

function isTileBordering(tile) {
  for (n of tile.neighbours) {
    if (n.occupant == player && n.terrain != 4) return true
  }
  return false;
}

function findAttackingTile(defTile) {
  const attackingTiles = defTile.neighbours.filter(n => n.occupant == player);
  if (attackingTiles.length == 0) return null;

  let strongest = attackingTiles[0];
  let highestTotal = getTotalAttack(attackingTiles[0], defTile);

  for (let tile of attackingTiles) {
    const totalAtt = getTotalAttack(tile, defTile);
    if (totalAtt > highestTotal) {
      strongest = tile;
      highestTotal = totalAtt;
    }
  }

  return strongest;
}

function getTotalAttack(attTile, defTile) {
  const dir = getDirectionFrom(attTile, defTile);
  if (dir == -1) return attTile.att;

  // Wall that faces the defender
  const wall = attTile.walls[dir];
  const attBonus = wall ? wall.attBonus || 0 : 0;

  return attTile.att + attBonus;
}

function getDirectionFrom(fromTile, toTile) {
  let i = 0;

  for (i; i < 6; i++) {
    if (fromTile.neighbours[i] == toTile) return i;
  }
  
  return -1;
}

function drawHashedOverlay(vertices, c) {
  beginClip();
  beginShape();
  for (let v of vertices) vertex(v.x, v.y);
  endShape(CLOSE);
  endClip();

  stroke(c);
  strokeWeight(4);
  noFill();
  const xs = vertices.map(v => v.x);
  const ys = vertices.map(v => v.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spacing = 12;
  for (let x = minX - (maxY - minY); x < maxX + (maxY - minY); x += spacing) {
    line(x, minY, x + (maxY - minY), maxY);
  }
}