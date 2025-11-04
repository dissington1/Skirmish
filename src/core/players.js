function initPlayer() {
  player = new Player(playerCount, playerNameInputValue);
  players.push(player);
  playerCount++;

  console.log("New player: " + player.name);
  console.log("Colour: " + player.colour);
  console.log("");
}