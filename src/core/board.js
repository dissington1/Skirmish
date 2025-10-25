const directions = [
  [0, -1], // TT
  [-1, 0], // TL
  [+1, -1], // TR
  [-1, +1], // BL
  [+1, 0], // BR
  [0, +1] // BB
];

// NEED TO RECONFIGURE TILE TO INCLUDE VERTICIES



function generateHexGrid() {
  let grid = [];

  // Determines how smooth or jagged the terrain shape is
  const shapeVariance = 0.1 + Math.random() * (0.3 - 0.1);
  // Determines the likelihood of land tiles generating closer to the center
  const centrality = Math.random();
  // Determines how often terrain generates in biomes
  const terrainVariance = 0.4;

  // Loop over each column (q) in the hex grid
  // Leftmost to rightmost within map radius
  for (let q = -MAP_RADIUS; q <= MAP_RADIUS; q++) {
    const rMin = Math.max(-MAP_RADIUS, -q - MAP_RADIUS);  // Compute minimum valid row
    const rMax = Math.min(MAP_RADIUS, -q + MAP_RADIUS);   // Compute maximum valid row

    // Loop over each row (r) in this column
    for (let r = rMin; r <= rMax; r++) {
      // Third cube coordinate
      const s = -q - r;

      // Calculates the world position of the current tile
      const { x, y } = hexToWorldCoordinates(q, r);

      // Calculates the distance of the current tile from (0, 0, 0)
      const distFromCenter = Math.sqrt(q * q + r * r + s * s) / MAP_RADIUS;

      // Rough shape of the island
      // Adjacent tiles have similar scores
      const shapeNoise = noise(q * shapeVariance, r * shapeVariance);

      // How likely the tile is to be a land tile
      const landScore = shapeNoise - (distFromCenter * centrality);

      // Generates biomes
      let terrainNoise = noise(q * terrainVariance + 100, r * terrainVariance + 100);
      terrainNoise = clampNoise(terrainNoise, 0.275, 0.66);

      grid.push({ x, y, landScore, terrainNoise, q, r });
    }
  }
  console.log("Map")
  console.log("  Centrality        ", centrality);
  console.log("  Shape Variance    ", shapeVariance);
  console.log("  Terrain Variance  ", terrainVariance);
  console.log("");

  return grid;
}


function newBoard() {
  // Clear board
  board = [];

  let tiles = generateHexGrid();

  // Sort tiles by landScore, highest to lowest
  tiles.sort((a, b) => b.landScore - a.landScore);

  // Assign terrain types
  for (let i = 0; i < tiles.length; i++) {
    let type;

    // The top 1000 tiles become land (assuming MAP_SIZE is 1000)
    if (i < MAP_SIZE) {
      let terrainNoise = tiles[i].terrainNoise;

      if (terrainNoise < 0.40) type = 0;       // Grass
      else if (terrainNoise < 0.60) type = 1;  // Forest
      else if (terrainNoise < 0.80) type = 2;  // Sand
      else if (terrainNoise <= 1) type = 3;    // Mountains
    }
    else {
      type = 4; // Water
    }

    board.push(new Tile(tiles[i].x, tiles[i].y, type));
  }

  board.sort((a, b) => {
    if (a.y !== b.y) return a.y - b.y;  // sort by lowest y
    return a.x - b.x;                   // sort by lowest x if y is equal
  });

  for (let i = 0; i < board.length; i++) {
    board[i].id = i;
  }

  computeTileNeighbors(board, tiles);

  landTiles = board.filter(t => t.type !== 4);
  let grassTiles = landTiles.filter(t => t.type == 0);
  let forestTiles = landTiles.filter(t => t.type == 1);
  let sandTiles = landTiles.filter(t => t.type == 2);
  let mountainTiles = landTiles.filter(t => t.type == 3);


  console.log("Tile count");
  console.log("  Land      ", landTiles.length);
  console.log("  Water     ", board.length - landTiles.length);
  console.log("  Grass     ", grassTiles.length);
  console.log("  Forest    ", forestTiles.length);
  console.log("  Sand      ", sandTiles.length);
  console.log("  Mountain  ", mountainTiles.length);
  console.log("");
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