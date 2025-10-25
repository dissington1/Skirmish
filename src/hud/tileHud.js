let tileHud = {
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

function inittileHud() {
    tileHud.pane = new Tweakpane.Pane();

    // General
    tileHud.folders.general = tileHud.pane.addFolder({
        title: 'General',
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

function updatetileHud(tile) {
    let occupant
    let terrain;

    occupant = tile.occupant ? tile.occupant : "UNCLAIMED";

    terrain = getTerrainStr(tile.type);

    tileHud.blades.occupant.value = occupant
    tileHud.blades.terrain.value = terrain;
    tileHud.blades.att.value = tile.att;
    tileHud.blades.def.value = tile.def; 
}