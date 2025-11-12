function mainMenu() {
  let inputWidth = 300;
  let inputHeight = 40;
  let buttonWidth = 150;
  
  let inputX = width / 2 - inputWidth / 2;
  let inputY = height / 2 + 50;
  let buttonX = width / 2 - buttonWidth / 2;
  let buttonY = height /2 + 200;

  playerNameInput.position(inputX, inputY);
  beginButton.position(buttonX, buttonY);

  playerNameInputValue = playerNameInput.value();
  
  push();
  
  resetMatrix();
  
  noStroke();
  fill(0, 0, 0, 150); // Black with 150 alpha for "fuzzy" look
  rect(0, 0, width, height);
  
  // Draw menu text/buttons centered on screen
  fill("#FFC300");
  textAlign(CENTER, CENTER);
  textSize(128);
  textFont('Cinzel');
  text("SKIRMISH", width / 2, height / 2 - 100);
  
  textSize(32);
  text("The collective memory strategy game", width / 2, height / 2 - 30);
  
  fill(255, 0, 0);
  textFont('Inconsolata');
  textSize(16);
  text(playerNameInputError, width / 2, height / 2 + 150);

  textSize(16);
  textAlign(RIGHT, BOTTOM);

  fill(255);
  text(`${playerNameInputValue.length} / 20`,
        inputX + inputWidth,
        inputY + inputHeight + 30);
  
  textAlign(CENTER, CENTER);

  pop();
}
  
function initMainMenu() {
  playerNameInputValue = "";
  playerNameInputError = ""
  playerNameInput = createInput('');

  playerNameInput.show();

  let inputWidth = 300;
  let inputHeight = 40;

  playerNameInput.size(inputWidth, inputHeight);

  playerNameInput.style('font-size', '24px');
  playerNameInput.style('text-align', 'center');
  playerNameInput.style('border', 'none');
  playerNameInput.style('outline', 'none');
  playerNameInput.style('font-family', 'Inconsolata');

  playerNameInput.attribute('placeholder', 'Name');
  playerNameInput.attribute('maxlength', 20);

  playerNameInput.input(() => {
    let val = playerNameInput.value();
    val = val.replace(/[^a-zA-Z0-9]/g, '');
    playerNameInput.value(val);
  });

  beginButton = createButton('BEGIN');
  beginButton.show();
  let buttonWidth = 150;
  let buttonHeight = 50;
  beginButton.size(buttonWidth, buttonHeight);

  beginButton.style('font-size', '20px');
  beginButton.style('font-family', 'Cinzel');
  beginButton.style('font-weight', 'bold');
  beginButton.style('color', '#777'); // black text
  beginButton.style('border', 'none');
  beginButton.style('border-radius', '12px'); // slightly bigger rounding
  beginButton.style('cursor', 'pointer');
  
  beginButton.style('padding', '15px 40px'); // vertical 15px, horizontal 40px
  beginButton.style('background-color', '#FFD633'); // default gold
  beginButton.style('box-shadow', '0 4px #FFC300'); // depth effect
  
  beginButton.mouseOver(() => {
    beginButton.style('background-color', '#FFC300'); // darker gold
    beginButton.style('box-shadow', '0 4px #CCA300'); // pressed effect
  });
  beginButton.mouseOut(() => {
    beginButton.style('background-color', '#FFD633'); // lighter gold
    beginButton.style('box-shadow', '0 4px #CCA300'); // back to raised
  });

  // Click event
  beginButton.mousePressed(() => {
    buttonSFX.play();
    if (playerNameInputValue.length == 0) {
      playerNameInputError = "Enter a username";
    }
    else if (playerNameInputValue.length < 3) {
      playerNameInputError = "Name must be at least 3 characters";
    }
    else {
      beginButton.hide();
      playerNameInput.hide();
      scene = 1;
      initPlayer();
    }
  });
}