let tileGui = {
    pane: null,
    folders: {
        general: null,
        stats: null
    },
    blades: {
        occupant: null,
        terrain: null,
        att: null,
        def: null
    }
}

function initTileGui() {
    tileGui.pane = new Tweakpane.Pane();

    // General
    tileGui.folders.general = tileGui.pane.addFolder({
        title: 'General',
        expanded: true,
    });

    tileGui.blades.occupant = tileGui.folders.general.addBlade({
        view: 'text',
        label: 'Occupant',
        parse: (v) => String(v),
        value: null,
    });

    tileGui.blades.terrain = tileGui.folders.general.addBlade({
        view: 'text',
        label: 'Terrain',
        parse: (v) => String(v),
        value: null,
    });

    // Stats
    tileGui.folders.stats = tileGui.pane.addFolder({
        title: 'Stats',
        expanded: true,
    });

    tileGui.blades.att = tileGui.folders.stats.addBlade({
        view: 'text',
        label: 'Att',
        parse: (v) => String(v),
        value: null,
    });

    tileGui.blades.def = tileGui.folders.stats.addBlade({
        view: 'text',
        label: 'Def',
        parse: (v) => String(v),
        value: null,
    });
}

function updateTileGui(tile) {
    let occupant
    let terrain;

    occupant = tile.occupant ? tile.occupant : "UNCLAIMED";

    terrain = getTerrainStr(tile.type);

    tileGui.blades.occupant.value = occupant
    tileGui.blades.terrain.value = terrain;
    tileGui.blades.att.value = tile.att;
    tileGui.blades.def.value = tile.def; 
}