const directions = [
  [0, -1], // TT
  [-1,  0], // TL
  [+1, -1], // TR
  [-1, +1], // BL
  [+1,  0], // BR
  [0, +1] // BB
];

function newBoard() {
  const coastSmoothness = Math.random(); // low = more islands, high = less islands

  let tiles = [];

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

      tiles.push({ x, y, landScore, terrainNoise, q, r});
    }
  }

  // Sort tiles by landScore, from highest to lowest
  tiles.sort((a, b) => b.landScore - a.landScore);

  // Clear board
  board = [];

  for (let i = 0; i < tiles.length; i++) {
    const tileData = tiles[i];
    let type;

    // The top 1000 tiles become land (assuming MAP_SIZE is 1000)
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

  board.sort((a, b) => {
    if (a.y !== b.y) return a.y - b.y;  // sort by lowest y
    return a.x - b.x;                   // sort by lowest x if y is equal
  });

  // Assign IDs
  for (let i = 0; i < board.length; i++) {
    board[i].id = i;
  }

  computeTileNeighbors(board, tiles);

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

function computeTileNeighbors(board, tiles) {
  for (let tile of board) {
    // Find original tileData from tiles array
    const tileData = tiles.find(t => t.x === tile.x && t.y === tile.y);
    if (!tileData) continue;

    tile.neighbours = [null, null, null, null, null, null]; // reset

    directions.forEach(([dq, dr], i) => {
      const nq = tileData.q + dq;
      const nr = tileData.r + dr;

      const neighborData = tiles.find(t => t.q === nq && t.r === nr);
      if (neighborData) {
        const neighborTile = board.find(t => t.x === neighborData.x && t.y === neighborData.y);
        if (neighborTile) tile.neighbours[i] = neighborTile;
      }
    });
  }
}