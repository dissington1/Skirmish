function drawBoard() {
  strokeWeight(2);
  stroke(0, 50);
  for (let tile of board) {
    drawTile(tile);
  }
}
/**
 * Draws a single tile, including its terrain, features, and city level.
 */
function drawTile(tile) {
  push(); // Save global drawing state

  // 1. Draw Base Tile
  fill(TILE_COLOURS[tile.terrain]);
  stroke(4);
  drawShape(tile.vertices); // Assumes this function exists

  // --- City Improvements (NEW LOGIC) ---
  // We draw the city *before* the flag, so the flag can be on top.
  push(); // Save state for city drawing (tint, translate)
  translate(tile.x, tile.y); // Move origin to tile center

  // 4. Handle Flag/Town Overlap
  if (tile.isHome) {
    // Apply transparency to all subsequent draw calls *within this push/pop*
    // This makes the town appear "behind" the flag.
    tint(255, 150);
  }

  // 2. Draw Paths (Level 1+)
  // We draw paths FIRST, so buildings are on top.
  if (tile.level >= 1) {
    drawPaths(tile); // Pass tile for a consistent randomSeed
  }

  // 1. & 2. Draw Buildings (Level 2+)
  // Use a fallthrough switch *starting from 2*
  // This draws buildings on top of paths, with no overlaps.
  switch (tile.level) {
    case 5:
      drawCastle(); // Draw walls and a central keep
      // (falls through)
    case 4:
      drawCity(); // Draw a market and 2 more houses
      // (falls through)
    case 3:
      drawTown(); // Draw a church and 2 more houses
      // (falls through)
    case 2:
      drawSmallTown(); // Draw the first 2 small houses
      break; // Level 2 stops here
    case 1:
    case 0:
    default:
      // Level 1 (paths) already handled.
      // Level 0 does nothing.
      break;
  }

  pop(); // Restore state (undo translate and tint)

  // 3. Draw Flag (optional)
  // This is drawn *after* the city, so it's on top and not transparent.
  if (tile.isHome) drawFlag(tile);

  // 4. Draw Overlays
  if (skirmishing) {
    if (tile === defendingTile) {
      drawHashedOverlay(tile.vertices, color(255, 0, 0, 100)); // Assumes this exists
    }
  }

  pop(); // Restore global drawing state
}


function drawFlag(tile) {
  push(); // Use push/pop to isolate flag drawing
  translate(tile.x, tile.y); // Tile center

  // Pole
  noStroke();
  fill(0);
  rect(-12, -TILE_SIZE * 0.5, 6, TILE_SIZE);

  // Flag
  fill(tile.occupant.colour);
  noStroke();
  triangle(
    -6, -TILE_SIZE * 0.5,
    25, -10,
    -6, TILE_SIZE * 0.5 - 20
  );
  pop();
}

// ===========================================
// NEW: City Drawing Helper Functions (Fixed Positions)
// ===========================================

/**
 * Helper function to draw a single medieval-style house.
 * Draws relative to (0,0) center.
 */
function drawMedievalHouse(x, y, w, h) {
  // House base (wood/plaster)
  fill(222, 184, 135); // BurlyWood
  stroke(139, 69, 19); // SaddleBrown
  strokeWeight(1.5);
  rect(x, y, w, h);

  // Roof (thatch/slate)
  fill(160, 82, 45); // Sienna
  noStroke();
  triangle(
    x - 2, y,           // Eave left
    x + w + 2, y,       // Eave right
    x + w / 2, y - h * 0.7 // Peak
  );
}

/**
 * LEVEL 1: Draws simple curved paths.
 */
function drawPaths(tile) {
  // Use a consistent seed so paths don't flicker
  randomSeed(tile.x * 10 + tile.y);

  // Define 6 edge points around the hexagon
  // These are approximations, assuming TILE_SIZE is the radius
  let r = TILE_SIZE * 0.9; // Pulls in from the edge
  let edgePoints = [
    createVector(r, 0),                           // Right
    createVector(r * 0.5, r * 0.866),             // Bottom-right
    createVector(-r * 0.5, r * 0.866),            // Bottom-left
    createVector(-r, 0),                          // Left
    createVector(-r * 0.5, -r * 0.866),           // Top-left
    createVector(r * 0.5, -r * 0.866)             // Top-right
  ];
  
  // Pick two different, non-opposite edges
  let i1 = floor(random(6));
  let i2 = (i1 + floor(random(2, 5))) % 6; // +2, 3, or 4
  
  let p1 = edgePoints[i1];
  let p2 = edgePoints[i2];

  // Draw two curved paths
  noFill();

  switch (tile.terrain) {
    case 0: // Grass
      stroke(139, 69, 19, 150); // brown (for paths on grass)
      break;
    case 1: // Forest
      stroke(255, 215, 0, 150); // gold/yellow, contrasts dark green
      break;
    case 2: // Sand
      stroke(70, 130, 180, 150); // steel blue, contrasts sandy yellow
      break;
    case 3: // Mountain
      stroke(230, 230, 230, 150);
      break;
    default:
      stroke(0, 0, 0, 150); // fallback
      break;
  }

  
  strokeWeight(3);
  
  // Path 1
  bezier(p1.x, p1.y, 0, 0, 0, 0, p2.x, p2.y);
  
  // Path 2 (a different set of edges)
  i1 = (i1 + 1) % 6;
  i2 = (i1 + floor(random(2, 5))) % 6;
  p1 = edgePoints[i1];
  p2 = edgePoints[i2];
  
  strokeWeight(2);
  bezier(p1.x, p1.y, 0, 0, 0, 0, p2.x, p2.y);
}


/**
 * LEVEL 2: Draws two small houses at fixed positions.
 */
function drawSmallTown() {
  drawMedievalHouse(10, -30, 10, 12);
  drawMedievalHouse(-10, 25, 12, 10);
}

/**
 * LEVEL 3: Adds more houses and a church.
 */
function drawTown() {
  drawMedievalHouse(-28, 15, 11, 11);
  drawMedievalHouse(-25, -30, 10, 13);

  // Draw simple church steeple
  fill(200); // Light grey stone
  stroke(100);
  strokeWeight(1);
  let churchX = 25;
  let churchY = -7;
  rect(churchX - 4, churchY, 8, 15); // Tower
  rect(churchX + 4, churchY + 7, 12, 8); // Body
  triangle(churchX - 5, churchY, churchX + 5, churchY, churchX, churchY - 10); // Spire
}

/**
 * LEVEL 4: Adds more houses and a market stall.
 */
function drawCity() {
  drawMedievalHouse(15, 20, 13, 10);

  // Draw market stall
  let marketX = -28;
  let marketY = -5;
  fill(210, 180, 140); // Tan
  stroke(139, 69, 19);
  strokeWeight(1);
  rect(marketX, marketY, 15, 5); // Table
  strokeWeight(2);
  line(marketX, marketY, marketX, marketY + 7); // Leg
  line(marketX + 15, marketY, marketX + 15, marketY + 7);  // Leg
  fill(255, 0, 0, 150); // Red awning
  noStroke();
  quad(marketX - 2, marketY, marketX + 17, marketY, marketX + 13, marketY - 8, marketX - 5, marketY - 8);
}

function drawCastle() {
  let keepWidth = 15;
  let keepHeight = 20; 
  let topY = -keepHeight / 2;
  let leftX = -keepWidth / 2;

  // Main Wall
  fill(180);
  stroke(100);
  strokeWeight(2);
  rect(leftX, topY, keepWidth, keepHeight);
  
  // Battlements
  fill(100);
  noStroke();

  let battlementHeight = 3;
  let battlementWidth = 4;
  let battlementSpacing = 6; 

  let startX = leftX - 0.5;

  for (let i = 0; i < 3; i++) {
    let x = startX + i * battlementSpacing;
    rect(x, topY - battlementHeight, battlementWidth, battlementHeight); 
  }
  
  // Window
  let windowWidth = 3;
  let windowHeight = 8;
  let windowY = 0;
  
  fill(0);
  noStroke();
  
  rect(-windowWidth/2, windowY - windowHeight/2, windowWidth, windowHeight/2);
  arc(0, windowY - windowHeight/2, windowWidth, windowWidth, PI, 0); 
}