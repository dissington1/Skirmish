// 

// Users
let users = [];
let user = 0; // Current player

// Board
let board = [];
let selectedTile = null;
let tileMap; // For axial coordinate lookups
let landTiles = [];

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