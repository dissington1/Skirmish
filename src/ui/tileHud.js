let tileHud = {
    pane: null,
    folders: {
        general: null,
        stats: null,
        buttons: null,
    },
    blades: {
        occupant: null,
        terrain: null,
        att: null,
        def: null,
    },
    buttons: {
        settle: null,
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

    // Stats
    tileHud.folders.stats = tileHud.pane.addFolder({
        title: 'Stats',
        expanded: true,
    });

    tileHud.blades.att = tileHud.folders.stats.addBlade({
        view: 'text',
        label: 'Att',
        parse: (v) => String(v),
        value: null,
    });

    tileHud.blades.def = tileHud.folders.stats.addBlade({
        view: 'text',
        label: 'Def',
        parse: (v) => String(v),
        value: null,
    });

    // Settle button
    tileHud.buttons.settle = tileHud.pane.addButton({
        title: 'Settle Tile',
    });
}

function updateTileHud(tile) {
    let occupant;
    let terrain;

    occupant = tile.occupant? tile.occupant.name : "Unclaimed";
    terrain = getTerrainStr(tile.terrain);

    tileHud.folders.general.title = `Tile ${tile.id + 1}`;
    tileHud.blades.occupant.value = occupant
    tileHud.blades.terrain.value = terrain;

    tileHud.blades.att.value = tile.att;
    tileHud.blades.def.value = tile.def;

    if (tile.terrain == 4) tileHud.buttons.settle.disabled = true
    else tileHud.buttons.settle.disabled = false

    if (scene != 1) tileHud.buttons.settle.hidden = true
    else tileHud.buttons.settle.hidden = false

    tileHud.buttons.settle.on('click', () => {
        if (tile == selectedTile) settleTile(tile);
    });
}