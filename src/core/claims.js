function settleTile(tile) {
  let errorMessage = "";

  if (tile.occupant) {
    errorMessage = "Cannot settle on an opponent's land";
    console.log(errorMessage);
    return;
  }
  for (let neighbour of tile.neighbours) {
    if (neighbour.occupant) {
      errorMessage = "Cannot settle next to an opponent's land";
      console.log(errorMessage);
      return;
    }
  }

  for (let neighbour of tile.neighbours) {
    neighbour.occupant = player;
    console.log(neighbour.occupant.name);
    // console.log(neighbour.occupant.name);
  }

  tile.occupant = player;
  tile.isHome = true;
  scene = 2;
}