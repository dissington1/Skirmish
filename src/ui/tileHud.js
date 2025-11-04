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
        att: null,
        def: null,
        selectedWall: null,
    },
    buttons: {
        settle: null,
        upgrade: null,
        claim: null,
        nextWall: null,
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
        title: 'Upgrade Tile',
    });

    tileHud.buttons.upgrade.on('click', () => {
        upgradeTile(selectedTile);
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

    tileHud.buttons.nextWall = tileHud.folders.walls.addButton({
        title: 'Next Wall',
    });

    tileHud.buttons.nextWall.on('click', () => {
        let dir = selectedWall.direction;
        selectedWall = dir == 5 ? selectedTile.walls[0] : selectedTile.walls[dir + 1];
        cam.x = selectedTile.x
        cam.y = selectedTile.y
        cam.zoom = 2;
    });

    // Settle button
    tileHud.buttons.settle = tileHud.pane.addButton({
        title: 'Settle Tile',
    });

    tileHud.buttons.settle.on('click', () => {
        settleTile(selectedTile);
    });
}

function updateTileHud(tile) {
    let occupant;
    let terrain;

    occupant = tile.occupant ? tile.occupant.name : "Unclaimed";
    terrain = getTerrainStr(tile.terrain);
    
    tileHud.folders.general.title = `Tile ${tile.id + 1}`;
    tileHud.folders.level.title = tile.title;
    tileHud.blades.occupant.value = occupant
    tileHud.blades.terrain.value = terrain;
    tileHud.blades.selectedWall.value = selectedWall.title;

    tileHud.blades.att.value = tile.att;
    tileHud.blades.def.value = tile.def;

    if (tile.terrain == 4) tileHud.buttons.settle.disabled = true;
    else tileHud.buttons.settle.disabled = false;

    if (scene != 2 || selectedTile.occupant != player) tileHud.buttons.upgrade.hidden = true;
    else tileHud.buttons.upgrade.hidden = false;

    if (selectedTile.level >= 5) tileHud.buttons.upgrade.disabled = true;
    else tileHud.buttons.upgrade.disabled = false;
    
    if (scene != 1) tileHud.buttons.settle.hidden = true;
    else tileHud.buttons.settle.hidden = false;

    if (scene != 2) tileHud.folders.walls.hidden = true;
    else tileHud.folders.walls.hidden = false;
}