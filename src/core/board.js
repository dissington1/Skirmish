const directions = [
  [0, -1], // TT
  [-1, 0], // TL
  [+1, -1], // TR
  [-1, +1], // BL
  [+1, 0], // BR
  [0, +1] // BB
];

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

      // Calculates the world coordsition of the current tile
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
  console.log("  Centrality");
  console.log(" ", centrality)
  console.log("  Shape variance");
  console.log(" ", shapeVariance)
  console.log("  Terrain variance");
  console.log(" ", terrainVariance)
  console.log("");

  return grid;
}

function generateBoard() {
  // Clear board
  board = [];

  let grid = generateHexGrid();

  // Sort tiles by landScore, highest to lowest
  grid.sort((a, b) => b.landScore - a.landScore);

  // Assign terrain types
  for (let i = 0; i < grid.length; i++) {
    let terrain;

    // The top MAP_SIZE tiles become land
    if (i < MAP_SIZE) {
      let terrainNoise = grid[i].terrainNoise;

      if (terrainNoise < 0.40) terrain = 0;       // Grass
      else if (terrainNoise < 0.60) terrain = 1;  // Forest
      else if (terrainNoise < 0.80) terrain = 2;  // Sand
      else if (terrainNoise <= 1) terrain = 3;    // Mountains
    }
    else {
      terrain = 4; // Water
    }

    let vertices = getTileVertices(grid[i]);

    let newTile = new Tile(grid[i].x, grid[i].y, grid[i].q, grid[i].r, vertices, terrain);
    
    initWalls(newTile);
    board.push(newTile);
  }

  board.sort((a, b) => {
    if (a.y !== b.y) return a.y - b.y;  // sort by lowest y
    return a.x - b.x;                   // sort by lowest x if y is equal
  });

  for (let i = 0; i < board.length; i++) {
    board[i].id = i;
  }

  tileMap = new Map(board.map(tile => [`${tile.q},${tile.r}`, tile]));

  computeTileNeighbors(board);

  for (const tile of board) {
    for (const wall of tile.walls) {
      wall.connectedTile = tile.neighbours[wall.direction] || null;
    }
  }

  landTiles = board.filter(t => t.terrain !== 4);
  let grassTiles = landTiles.filter(t => t.terrain == 0);
  let forestTiles = landTiles.filter(t => t.terrain == 1);
  let sandTiles = landTiles.filter(t => t.terrain == 2);
  let mountainTiles = landTiles.filter(t => t.terrain == 3);

  console.log("Tile count");
  console.log("  Land  ", landTiles.length);
  console.log("  Water  ", board.length - landTiles.length);
  console.log("  Grass  ", grassTiles.length);
  console.log("  Forest  ", forestTiles.length);
  console.log("  Sand  ", sandTiles.length);
  console.log("  Mountain  ", mountainTiles.length);
  console.log("");
}

function computeTileNeighbors(board) {
  for (let tile of board) {
    tile.neighbours = Array(6).fill(null); // reset

    directions.forEach(([dq, dr], i) => {
      const key = `${tile.q + dq},${tile.r + dr}`;
      tile.neighbours[i] = tileMap.get(key) || null;
    });
  }
}

function initWalls(tile) {
  let v = tile.vertices

  for (let i = 0; i < 6; i++) {
    let direction;
    let coords = { a: 0, b: 0 };

    let a = i;
    let b = a == 5 ? 0 : a + 1; // Loop around if at end

    coords.a = v[a];
    coords.b = v[b];

    switch (a) {
      case 0:
        direction = 4; // BR
        break;
      case 1:
        direction = 5; // BB
        break;
      case 2:
        direction = 3; // BL
        break;
      case 3:
        direction = 1; // TL
        break;
      case 4:
        direction = 0; // TT
        break;
      case 5:
        direction = 2; // TR
        break;
      default:
        return;
    }

    tile.walls[direction] = new Wall(tile, direction, coords);
  }
}

function getTileVertices(tile) {
  let vertices = [];
  let x = tile.x;
  let y = tile.y;

  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i;

    vertices.push({
      x: x + TILE_SIZE * cos(angle),
      y: y + TILE_SIZE * sin(angle)
    });
  }

  return vertices;
}