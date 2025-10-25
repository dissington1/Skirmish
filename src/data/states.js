// Camera
let cam = {
  x: 0,
  y: 0,
  zoom: 0.3,
  moveSpeed: 10,
  zoomSpeed: 0.001,
  minZoom: 0.3,
  maxZoom: 3
};

// Users
let users = ["Player 1"];
let user = 0; // Current player


// Board
let board = []; // Array of tiles
let selectedTile = null;
let landTiles = [];