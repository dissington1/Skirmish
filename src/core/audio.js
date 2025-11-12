function playMainMenuMusic() {
    mainMenuMusic.setVolume(0.5);
    mainMenuMusic.play();
    
    userStartAudio();
    mainMenuMusic.onended(() => {
        playSettleMusic();
    });
}

function playSettleMusic() {
    settleMusic.setVolume(0.5);
    settleMusic.play();

    settleMusic.onended(() => {
        playWinterMusic();
    });
}

function playWinterMusic() {
    winterMusic.setVolume(0.5);
    winterMusic.play();
}

function playTownAmbience() {
    townAmbienceSFX.loop();
}

function stopTownAmbience() {
    townAmbienceSFX.stop();
}

function playSkirmishAmbience() {
    skirmishAmbienceSFX.loop();
}

function stopSkirmishAmbience() {
    skirmishAmbienceSFX.stop();
}

function stopTownAmbience() {
    townAmbienceSFX.stop();
}

function townAmbienceManager() {
    if (selectedTile && selectedTile.level > 1 && !skirmishing) {
        if (!townAmbiencePlaying) {          // only start once
          playTownAmbience();
          townAmbiencePlaying = true;
        }
      } else {
        if (townAmbiencePlaying) {           // only stop once
          stopTownAmbience();
          townAmbiencePlaying = false;
        }
      }
}

function skirmishAmbienceManager() {
    if (skirmishing) {
        if (!skirmishAmbiencePlaying) {          // only start once
            playSkirmishAmbience();
            skirmishAmbiencePlaying = true;
        }
    }
    else {
        skirmishAmbiencePlaying = false;
        stopSkirmishAmbience();
    }
}