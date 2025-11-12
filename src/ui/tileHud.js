let tileHud = {
    pane: null,
    folders: {
        general: null,
        level: null,
        walls: null
    },
    blades: {
        occupant: null,
        terrain: null,
        tileLevel: null,
        att: null,
        def: null,
        attBonus: null,
        defBonus: null,
        selectedWall: null,
        modifier: null,
    },
    buttons: {
        settle: null,
        claim: null,
        skirmish: null,
        upgrade: null,
        bridge: null,
        attModifier: null,
        defModifier: null,
        nextWall: null,
        upgradeWall: null
    }
}

function initTileHud() {
    tileHud.pane = new Tweakpane.Pane();

    // General
    tileHud.folders.general = tileHud.pane.addFolder({
        title: '',
        expanded: true,
    });

    tileHud.blades.occupant = tileHud.folders.general.addBlade({
        view: 'text',
        label: 'Occupant',
        parse: (v) => String(v),
        value: null,
    });

    tileHud.blades.terrain = tileHud.folders.general.addBlade({
        view: 'text',
        label: 'Terrain',
        parse: (v) => String(v),
        value: null,
    });

    // Level
    tileHud.folders.level = tileHud.pane.addFolder({
        title: '',
        expanded: true,
    });

    tileHud.blades.tileLevel = tileHud.folders.level.addBlade({
        view: 'text',
        label: 'Level',
        parse: (v) => String(v),
        value: null,
    });

    tileHud.blades.att = tileHud.folders.level.addBlade({
        view: 'text',
        label: 'Att',
        parse: (v) => String(v),
        value: null,
    });

    tileHud.blades.def = tileHud.folders.level.addBlade({
        view: 'text',
        label: 'Def',
        parse: (v) => String(v),
        value: null,
    });

    tileHud.buttons.upgrade = tileHud.folders.level.addButton({
        title: 'Upgrade Tile (2)',
    });

    tileHud.buttons.upgrade.on('click', () => {
        upgradeTile(selectedTile);
        hammerSFX.play();
        player.actions -= 2;
    });

    // Walls
    tileHud.folders.walls = tileHud.pane.addFolder({
        title: 'Walls',
        expanded: true,
    });

    tileHud.blades.selectedWall = tileHud.folders.walls.addBlade({
        view: 'text',
        label: 'Direction',
        parse: (v) => String(v),
        value: null,
    });

    tileHud.blades.modifier = tileHud.folders.walls.addBlade({
        view: 'text',
        label: 'Level',
        parse: (v) => String(v),
        value: null,
    });

    tileHud.blades.attBonus = tileHud.folders.walls.addBlade({
        view: 'text',
        label: 'Att Bonus',
        parse: (v) => String(v),
        value: null,
    });

    tileHud.blades.defBonus = tileHud.folders.walls.addBlade({
        view: 'text',
        label: 'Def Bonus',
        parse: (v) => String(v),
        value: null,
    });

    tileHud.buttons.attModifier = tileHud.folders.walls.addButton({
        title: 'Add Attack Modifier (1)',
    });

    tileHud.buttons.defModifier = tileHud.folders.walls.addButton({
        title: 'Add Defence Modifier (1)',
    });

    tileHud.buttons.upgradeWall = tileHud.folders.walls.addButton({
        title: 'Upgrade Wall (1)',
    });

    tileHud.buttons.upgradeWall.on('click', () => {
        player.actions -= 1;
        upgradeWall(selectedWall);
        hammerSFX.play();
    });

    tileHud.folders.walls.addSeparator();

    tileHud.buttons.nextWall = tileHud.folders.walls.addButton({
        title: 'Next Wall',
    });

    tileHud.buttons.nextWall.on('click', () => {
        let dir = selectedWall.direction;
        selectedWall = dir == 5 ? selectedTile.walls[0] : selectedTile.walls[dir + 1];
        cam.x = selectedTile.x
        cam.y = selectedTile.y
        cam.zoom = 2;
        buttonSFX.play();
    });

    // Settle/claim/skirmish
    tileHud.buttons.settle = tileHud.pane.addButton({
        title: 'Settle Tile',
    });

    tileHud.buttons.settle.on('click', () => {
        settleTile(selectedTile);
        buttonSFX.play();
    });

    tileHud.buttons.claim = tileHud.pane.addButton({
        title: 'Claim Tile (2)',
    });

    tileHud.buttons.claim.on('click', () => {
        claimTile(selectedTile);
        player.actions -= 2;
        buttonSFX.play();
    });

    tileHud.buttons.skirmish = tileHud.pane.addButton({
        title: 'Skirmish (5)',
    });

    tileHud.buttons.skirmish.on('click', () => {
        defendingTile = selectedTile;

        skirmishFinalArrowPos = 0;
        skirmishResult = "";

        skirmishing = true;
        player.actions -= 5;

        skirmishBeginSFX.play();
    });

    tileHud.buttons.bridge = tileHud.pane.addButton({
        title: 'Build Bridge (1)',
    });

    tileHud.buttons.bridge.on('click', () => { player.actions -= 1; hammerSFX.play(); });
    tileHud.buttons.attModifier.on('click', () => { player.actions -= 1; hammerSFX.play(); });
    tileHud.buttons.defModifier.on('click', () => { player.actions -= 1; hammerSFX.play(); });
}

function updateTileHud(tile) {
    const { buttons, blades, folders, pane } = tileHud;

    const occupant = tile.occupant ? tile.occupant.name : "Unclaimed";
    const terrain = getTerrainStr(tile.terrain);

    pane.title = `Tile ${tile.id + 1}`;
    folders.general.title = "Details";
    folders.level.title = "Development";

    blades.tileLevel.value = tile.title;
    blades.occupant.value = occupant;
    blades.terrain.value = terrain;
    blades.selectedWall.value = selectedWall.title;
    blades.attBonus.value = selectedWall.attBonus;
    blades.defBonus.value = selectedWall.defBonus;
    blades.modifier.value = selectedWall.modifierTitle;
    blades.att.value = tile.att;
    blades.def.value = tile.def;

    buttons.bridge.on('click', () => {
        selectedTile.terrain = 5;
        selectedTile.updateStats();
    });

    buttons.attModifier.on('click', () => {
        selectedWall.modifier = 4;
        selectedWall.updateStats();
        
    });

    buttons.defModifier.on('click', () => {
        selectedWall.modifier = 1;
        selectedWall.updateStats();
    });

    // Info
    const playerOwnsTile = scene == 2 && selectedTile.occupant == player;
    const isWaterTile = tile.terrain == 4;
    const isBridgeTile = tile.terrain == 5;
    const isUnclaimed = tile.occupant == null;
    const isBordering = isTileBordering(tile);

    

    // Button Disabled Criteria
    setDisabled(buttons.settle, isWaterTile);
    setDisabled(buttons.claim, !isBordering || player.actions < 2);
    setDisabled(buttons.upgrade, selectedTile.level >= 5 || player.actions < 2);
    setDisabled(buttons.upgradeWall, selectedWall.modifier == 3 || selectedWall.modifier == 6 || player.actions < 1);
    setDisabled(buttons.skirmish, !isBordering || selectedTile.isHome || player.actions < 5);
    setDisabled(buttons.bridge, player.actions < 1);
    setDisabled(buttons.attModifier, player.actions < 1);
    setDisabled(buttons.defModifier, player.actions < 1);
    
    // Button Hidden Criteria
    setHidden(buttons.claim, scene != 2 || !isUnclaimed);
    setHidden(buttons.upgrade, !playerOwnsTile || isWaterTile || isBridgeTile);
    setHidden(buttons.skirmish, playerOwnsTile || tile.occupant == null);
    setHidden(buttons.bridge, !playerOwnsTile || !isWaterTile || isBridgeTile);
    setHidden(buttons.settle, scene !== 1);
    setHidden(buttons.attModifier, !playerOwnsTile || isWaterTile || selectedWall.modifier > 0);
    setHidden(buttons.defModifier, !playerOwnsTile || isWaterTile || selectedWall.modifier > 0);
    setHidden(buttons.upgradeWall, !playerOwnsTile || isWaterTile || selectedWall.modifier == 0);
    
    // Blade Hidden Criteria
    setHidden(blades.attBonus, selectedWall.attBonus == 0);
    setHidden(blades.defBonus, selectedWall.defBonus == 0 && selectedWall.tile.occupant == player || selectedWall.attBonus != 0);

    // Folder Hidden Criteria
    toggleFolder(folders.walls, scene !== 2 || isWaterTile || isUnclaimed);
}