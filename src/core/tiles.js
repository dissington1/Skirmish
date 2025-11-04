function settleTile(tile) {
  let errorMessage = "";

  if (tile.occupant) {
    errorMessage = "Cannot settle on an opponent's land";
    console.log(errorMessage);
    return;
  }
  for (let neighbour of tile.neighbours) {
    if (neighbour && neighbour.occupant) {
      errorMessage = "Cannot settle next to an opponent's land";
      console.log(errorMessage);
      return;
    }
  }

  player.tiles.push(tile);

  for (let neighbour of tile.neighbours) {
    if (neighbour) {
      neighbour.occupant = player;
      player.tiles.push(neighbour);
    }
  }

  tile.occupant = player;
  tile.isHome = true;
  tile.level = 2;
  tile.updateStats();
  scene = 2;
}

function upgradeTile(tile) {
  tile.level++;
  tile.updateStats();
}