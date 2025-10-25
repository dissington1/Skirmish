function generateRandomPlayerColour() {
    if (PLAYER_COLOURS.length === 0) return null;

    const index = Math.floor(Math.random() * PLAYER_COLOURS.length);
    return PLAYER_COLOURS.splice(index, 1)[0];
}
