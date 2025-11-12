function preload() {
  mainMenuMusic = loadSound('src/audio/music/MainMenu.wav');
  settleMusic = loadSound('src/audio/music/Settle.wav');
  winterMusic = loadSound('src/audio/music/Winter.wav');

  townAmbienceSFX = loadSound('src/audio/sfx/Ambience.wav');
  hammerSFX = loadSound('src/audio/sfx/Hammer.wav');
  buttonSFX = loadSound('src/audio/sfx/PressButton.wav');
  skirmishAmbienceSFX = loadSound('src/audio/sfx/SkirmishAmbience.wav');
  skirmishBeginSFX = loadSound('src/audio/sfx/SkirmishBegin.wav');;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // UI
  initUI();

  // Board
  generateBoard();

  playMainMenuMusic();
}

function draw() {
  background(200);

  // Controls
  handleControls();

  // Render
  drawCamera();
  drawBoard();
  drawUI();

  townAmbienceManager();
  skirmishAmbienceManager();

  if (skirmishing) skirmishHud();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}