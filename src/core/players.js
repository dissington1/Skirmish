function initPlayer() {
  player = new Player(playerNameInputValue);
  players.push(player);

  console.log("New player: " + player.name);
  console.log("Colour: " + player.colour);
  console.log("");
}