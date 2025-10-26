let tileHud = {
    pane: null,
    folders: {
        general: null,
        stats: null,
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
}

function updateTileHud(tile) {
    let occupant
    let terrain;

    occupant = tile.occupant ? tile.occupant : null;
    terrain = getTerrainStr(tile.terrain);

    tileHud.folders.general.title = `Tile ${tile.id + 1}`;
    tileHud.blades.occupant.value = occupant
    tileHud.blades.terrain.value = terrain;

    tileHud.blades.att.value = tile.att;
    tileHud.blades.def.value = tile.def;
}