// Camera
let cam = {
  x: 0,
  y: 0,
  zoom: 0.15,
  moveSpeed: 10,
  zoomSpeed: 0.005,
  minZoom: 0.15,
  maxZoom: 2
};

// Users
let users = ["Player 1"];
let user = 0; // Current player


// Board
let board = []; // Array of tiles
let selectedTile = null;
let landTiles = [];