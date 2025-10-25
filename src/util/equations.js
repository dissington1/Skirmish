function generateRandomPlayerColour() {
  if (PLAYER_COLOURS.length === 0) return null;

  const index = Math.floor(Math.random() * PLAYER_COLOURS.length);
  return PLAYER_COLOURS.splice(index, 1)[0];
}

function hexToWorldCoordinates(q, r) {
  return {
    x: TILE_SIZE * 1.5 * q,
    y: TILE_SIZE * Math.sqrt(3) * (r + q / 2)
  }
}

function clampNoise(noise, low, high) {
  noise = (noise - low) / (high - low);
  return Math.max(0, Math.min(1, noise));
}

function findTileByWorldPos(worldX, worldY) {
  console.log("Finding nearest tile at", worldX, worldY);
  let low = 0;
  let high = board.length - 1;
  let bestIndex = -1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    const tile = board[mid];

    if (tile.y < worldY - TILE_SIZE) {
      low = mid + 1;           // too high up, go down
    } else if (tile.y > worldY + TILE_SIZE) {
      high = mid - 1;          // too low, go up
    } else {
      bestIndex = mid;
      break;                    // found candidate row
    }
  }

  if (bestIndex === -1) return null;

  // Look around the candidate for exact x match
  for (let i = bestIndex; i < board.length && Math.abs(board[i].y - worldY) <= TILE_SIZE; i++) {
    if (dist(worldX, worldY, board[i].x, board[i].y) < TILE_SIZE) {
      return board[i];
    }
  }

  for (let i = bestIndex - 1; i >= 0 && Math.abs(board[i].y - worldY) <= TILE_SIZE; i--) {
    if (dist(worldX, worldY, board[i].x, board[i].y) < TILE_SIZE) {
      return board[i];
    }
  }

  return null; // no tile found
}