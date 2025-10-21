// --- Tile Class (Unchanged) ---
class Tile {
  constructor(x, y, type) {
    this.x = x; // x world coordinate
    this.y = y; // y world coordinate
    this.type = type; // Terrain type (0-grass, 1-forest, 2-sand, 3-mountain, 4-water)
    this.occupant = null;
    this.home = false;
    this.walls = [0, 0, 0, 0, 0, 0];

    switch (this.type) {
      case 0: this.att = 2; this.def = 2; break;
      case 1: this.att = 3; this.def = 2; break;
      case 2: this.att = 1; this.def = 1; break;
      case 3: this.att = 2; this.def = 3; break;
      default: this.att = 0; this.def = 0;
    }
  }
}

// --- 2D Camera Object ---
let cam = {
  x: 0,
  y: 0,
  zoom: 1,
  move_speed: 10,
  zoom_speed: 0.001,
  min_zoom: 0.2, // Min zoom (20%)s
  max_zoom: 3  // Max zoom (300%)
};

let users = ["Player 1", "Player 2"];
let current_user = 0;

let tile_size = 50; // Reduced size for a better 2D view

const tile_colours = [
  "#7bb47bff", // 0: Grass
  "#006400",   // 1: Forest
  "#D2B48C",   // 2: Sand
  "#8B8989",   // 3: Mountain
  "#1E90FF"    // 4: Water
];

let tiles = []; // Array to hold all tiles
let selected_tile = null;

function setup() {
  // Use default 2D renderer
  createCanvas(windowWidth, windowHeight);
  
  // --- Create a small grid of tiles for testing ---
  // Hexagons are offset in rows/columns
  // "Pointy top" hex layout
  for (let q = -3; q <= 3; q++) { // Column
    for (let r = -3; r <= 3; r++) { // Row
      if (abs(q + r) > 3) continue; // Create a hex-shaped map
      
      // Calculate world position from grid coords
      let x = tile_size * 1.5 * q;
      let y = tile_size * sqrt(3) * (r + q / 2);
      
      let type = floor(random(5)); // Random tile type
      tiles.push(new Tile(x, y, type));
    }
  }

  // Set one tile as home
  tiles[floor(tiles.length / 2)].home = true;
  tiles[floor(tiles.length / 2)].occupant = current_user;
  tiles[floor(tiles.length / 2)].type = 0; // Home is always grass
}

function draw() {
  background(200);

  // Apply camera controls
  controls();
  applyCamera();
  
  // Draw all tiles
  strokeWeight(2);
  stroke(0, 50); // Dark, semi-transparent border
  for (let tile of tiles) {
    drawTile(tile);
  }
  
  // Highlight the selected tile
  if (selected_tile) {
    highlightTile(selected_tile);
  }
}

/**
 * Applies the 2D camera translation and scale.
 * Must be called *before* drawing the world.
 */
function applyCamera() {
  // Move origin to center of screen
  translate(width / 2, height / 2);
  // Apply zoom
  scale(cam.zoom);
  // Pan the world
  translate(-cam.x, -cam.y);
}

/**
 * Draws a single 2D tile
 */
function drawTile(tile) {
  fill(tile_colours[tile.type]);
  drawTileShape(tile.x, tile.y);

  // Draw 2D home flag
  if (tile.home && tile.occupant == current_user) {
    push();
    translate(tile.x, tile.y); // Move to tile center
    
    // Pole
    fill(150);
    stroke(100);
    strokeWeight(2);
    rect(-2, -tile_size * 0.7, 4, tile_size * 0.7); // x, y, w, h
    
    // Flag
    fill(255, 0, 0);
    noStroke();
    beginShape();
    vertex(0, -tile_size * 0.7);
    vertex(tile_size * 0.4, -tile_size * 0.6);
    vertex(0, -tile_size * 0.5);
    endShape(CLOSE);
    
    pop();
  }
}

function drawTileShape(x, y) {
  push();
  translate(x, y);

  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i;
    vertex(tile_size * cos(angle), tile_size * sin(angle));
  }
  endShape(CLOSE);

  pop();
}


function highlightTile(tile) {
  push();
  translate(tile.x, tile.y);
  
  noFill();
  stroke(255, 200, 0);
  strokeWeight(4 / cam.zoom); // Keep highlight consistent thickness
  
  // Redraw the hex shape
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i;
    vertex(tile_size * cos(angle), tile_size * sin(angle));
  }
  endShape(CLOSE);
  
  pop();
}

function controls() {
  let speed = cam.move_speed / cam.zoom;

  if (keyIsDown(87)) cam.y -= speed; // W
  if (keyIsDown(83)) cam.y += speed; // S
  if (keyIsDown(65)) cam.x -= speed; // A
  if (keyIsDown(68)) cam.x += speed; // D
}

function mouseClicked() {
  let worldX = (mouseX - width / 2) / cam.zoom + cam.x;
  let worldY = (mouseY - height / 2) / cam.zoom + cam.y;

  let clicked_tile = null;

  for (let tile of tiles) {
    let d = dist(worldX, worldY, tile.x, tile.y);
    if (d < tile_size) {
      clicked_tile = tile;
      break;
    }
  }

  selected_tile = clicked_tile;
  
  if (selected_tile) {
    console.log("Clicked tile:", clicked_tile);
  } else {
    console.log("Clicked background");
  }
}

function mouseWheel(event) {
  // Calculate multiplicative zoom factor
  let factor = pow(2, -event.delta * cam.zoom_speed);
  
  cam.zoom *= factor;
  
  // Constrain zoom to min/max
  cam.zoom = constrain(cam.zoom, cam.min_zoom, cam.max_zoom);
  
  return false; // Prevent page scroll
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}