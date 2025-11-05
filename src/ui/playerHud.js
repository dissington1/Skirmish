let playerHud = {
    pane: null,
    tab: null,
    folders: {
        myPlayer: null,
        allPlayers: {} // map player.id -> folder
    },
    blades: {
        myClaimed: null,
        myActions: null,
        allClaimed: {} 
    },
    buttons: {
        myHome: null,
        allHome: {}
    }
};

function initPlayerHud() {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '6px';
    container.style.left = '6px';
    container.style.right = 'auto';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    playerHud.pane = new Tweakpane.Pane({ container });

    // Tabs
    playerHud.tab = playerHud.pane.addTab({
        pages: [
            { title: 'Me' },
            { title: 'Leaderboard' }
        ]
    });
    // My player folder
    playerHud.folders.myPlayer = playerHud.tab.pages[0].addFolder({
        title: '',
        expanded: true
    })

    playerHud.blades.myClaimed = playerHud.folders.myPlayer.addBlade({
        view: 'text',
        label: 'Claimed Tiles',
        parse: (v) => String(v),
        value: null,
    });

    playerHud.blades.myActions = playerHud.folders.myPlayer.addBlade({
        view: 'text',
        label: 'Actions Left',
        parse: (v) => String(v),
        value: null,
    });

    playerHud.buttons.myHome = playerHud.folders.myPlayer.addButton({
        title: 'Home Tile'
    });
    playerHud.buttons.myHome.on('click', () => {
        cam.x = player.tiles[0].x;
        cam.y = player.tiles[0].y;
        cam.zoom = 2;
        selectedTile = player.tiles[0];
        selectedWall = player.tiles[0].walls[0];
    });

    playerHud.pane.hidden = true;
}

function updatePlayerHud() {
    // Update my claimed tiles
    playerHud.blades.myClaimed.value = player.tiles.length;
    playerHud.blades.myActions.value = player.actions;
    playerHud.folders.myPlayer.title = player.name;

    playerHud.pane.title = "Players";

    for (let p of players) {
        if (!playerHud.folders.allPlayers[p.id]) {
            const folder = playerHud.tab.pages[1].addFolder({
                title: p.name,
                expanded: true
            });
            playerHud.folders.allPlayers[p.id] = folder;

            // Claimed tiles blade
            const blade = folder.addBlade({
                view: 'text',
                label: 'Claimed Tiles',
                parse: (v) => String(v),
                value: p.tiles.length
            });
            playerHud.blades.allClaimed[p.id] = blade;

            // Home button
            playerHud.buttons.allHome[p.id] = playerHud.folders.allPlayers[p.id].addButton({ title: 'Home Tile' });
            playerHud.buttons.allHome[p.id].on('click', () => {
                cam.x = p.tiles[0].x;
                cam.y = p.tiles[0].y;
                cam.zoom = 2;
                selectedTile = p.tiles[0];
                selectedWall = p.tiles[0].walls[0];
            });
        }
    }
}
