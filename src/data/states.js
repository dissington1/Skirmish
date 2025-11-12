// Game State
scene = 0; // 0-Create profile 1-Choose home 2-Playing

// Users
let players = [];
let player = null; // Current player
let playerCount = 0;

// Board
let board = [];
let selectedTile = null;
let selectedWall = null;
let tileMap; // For axial coordinate lookups
let landTiles = [];

// Camera
let cam = {
  x: 0,
  y: 0,
  zoom: 0.5,
  moveSpeed: 10,
  zoomSpeed: 0.005,
  minZoom: 0.25,
  maxZoom: 2
};

// UI
let playerNameInput;
let playerNameInputValue;
let playerNameInputError = "";
let beginButton;

// Skirmish  Mode
let skirmishing = false;
let attackingTile = null;
let attackingWall = null;
let defendingTile = null;

// Audio

let townAmbiencePlaying = false;
let skirmishAmbiencePlaying = false;
