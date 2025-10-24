function newBoard() {
  const coastSmoothness = Math.random(); // low = more islands, high = less islands

  let potentialTiles = [];

  for (let q = -MAP_RADIUS; q <= MAP_RADIUS; q++) {
    for (let r = Math.max(-MAP_RADIUS, -q - MAP_RADIUS); r <= Math.min(MAP_RADIUS, -q + MAP_RADIUS); r++) {
      const s = -q - r;

      // World position
      let x = TILE_SIZE * 1.5 * q;
      let y = TILE_SIZE * Math.sqrt(3) * (r + q / 2);

      // radial distance from center (0..1)
      const distFromCenter = Math.sqrt(q * q + r * r + s * s) / MAP_RADIUS;

      // noise value for island shape
      const shapeNoise = noise(q * 0.2, r * 0.2);

      const landScore = shapeNoise - (distFromCenter * coastSmoothness);

      const terrainNoise = noise(q * 0.3 + 100, r * 0.3 + 100);

      potentialTiles.push({ x, y, landScore, terrainNoise });
    }
  }

  // Sort tiles by landScore, from highest to lowest
  potentialTiles.sort((a, b) => b.landScore - a.landScore);

  board = [];

  for (let i = 0; i < potentialTiles.length; i++) {
    const tileData = potentialTiles[i];
    let type;

    // The top 'MAP_SIZE' tiles become land
    if (i < MAP_SIZE) {
      const minNoise = 0.2;
      const maxNoise = 0.8;
      let terrainNoise = (tileData.terrainNoise - minNoise) / (maxNoise - minNoise);
      terrainNoise = Math.max(0, Math.min(1, terrainNoise));

      if (terrainNoise < 0.4) type = 0;       // Grass
      else if (terrainNoise < 0.54) type = 1; // Forest
      else if (terrainNoise < 0.67) type = 2; // Sand
      else if (terrainNoise <= 1) type = 3;   // Mountains
    }
    else {
      type = 4; // Water
    }

    board.push(new Tile(tileData.x, tileData.y, type));
  }

  landTiles = board.filter(t => t.type !== 4);
  let grassTiles = landTiles.filter(t => t.type == 0);
  let forestTiles = landTiles.filter(t => t.type == 1);
  let sandTiles = landTiles.filter(t => t.type == 2);
  let mountainTiles = landTiles.filter(t => t.type == 3);
  console.log("coastSmoothness: " + coastSmoothness);
  console.log("Total land tiles: " + landTiles.length);
  console.log("Total grass tiles: " + grassTiles.length);
  console.log("Total forest tiles: " + forestTiles.length);
  console.log("Total sand tiles: " + sandTiles.length);
  console.log("Total mountain tiles: " + mountainTiles.length);
}