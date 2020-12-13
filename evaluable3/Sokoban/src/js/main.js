const { Timer } = require("phaser-ce");

let game = new Phaser.Game(320, 360, Phaser.CANVAS, "", { preload: preload, create: create, update: update });
// elementos del juego
let EMPTY = 0;
let WALL = 1;
let SPOT = 2;
let CRATE = 3;
let PLAYER = 4;
let CACTUS =8;

let COUNTDOWNTEXT;
let TEMPORIZADOR;
let tiemporestante =60;
let PASOS =0;
let PASOSTEXT;
// Mapa
let level = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 8, 1, 1, 1, 1, 1], [1, 0, 0, 1, 1,  1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 4, 2, 1, 3, 0, 1], [1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1, 1, 1], [1, 0, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1]];

// array which will contain all crates
let crates = [];

// size of a tile, in pixels
let tileSize = 40;

// the player! Yeah!
let player;
function preload() {
    game.load.spritesheet("tiles", "assets/tiles.png", 40, 40);
    game.load.image("cactus","assets/cactus.png");
}
// function to scale up the game to full screen
function goFullScreen() {
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.updateLayout (true);
}
function create() {
    // going full screen with the function defined at line 32
    goFullScreen();

    // adding two groups to the game. The fist group is called fixedGroup, it will contain
    // all non-moveable elements (everything but crates and player).
    // Then we add movingGroup which will contain moveable elements (crates and player)
    let fixedGroup = game.add.group();
    let movingGroup = game.add.group();
    // letiable used for tile creation
    let tile
    // looping trough all level rows
    for (let i = 0; i < level[0].length; i++) {
        // creation of 2nd dimension of crates array
        crates[i] = [];
        // looping through all level columns
        for (let j = 0; j < level.length; j++) {
            // by default, there are no crates at current level position, so we set to null its
            // array entry
            crates[i][j] = null;
            // what do we have at row j, col i?
            switch (level[j][i]) {
                //4
                case PLAYER:
                case PLAYER + SPOT:
                    //4+2
                    // player creation
                    player = game.add.sprite(40 * i, 40 * j, "tiles");
                    // assigning the player the proper frame
                    player.frame = level[j][i];
                    // creation of two custom attributes to store player x and y position
                    player.posX = i;
                    player.posY = j;
                    // adding the player to movingGroup
                    movingGroup.add(player);
                    // since the player is on the floor, I am also creating the floor tile
                    tile = game.add.sprite(40 * i, 40 * j, "tiles");
                    tile.frame = level[j][i] - PLAYER;
                    // floor does not move so I am adding it to fixedGroup
                    fixedGroup.add(tile);
                    break;
                    //3
                case CRATE:
                case CRATE + SPOT:
                    //3+2
                    // crate creation, both as a sprite and as a crates array item
                    crates[j][i] = game.add.sprite(40 * i, 40 * j, "tiles");
                    // assigning the crate the proper frame
                    crates[j][i].frame = level[j][i];
                    // adding the crate to movingGroup
                    movingGroup.add(crates[j][i]);
                    // since the create is on the floow, I am also creating the floor tile
                    tile = game.add.sprite(40 * i, 40 * j, "tiles");
                    tile.frame = level[j][i] - CRATE;
                    // floor does not move so I am adding it to fixedGroup
                    fixedGroup.add(tile);
                    break;
                case CACTUS:
                    cact = game.add.sprite(40*i,40*j,"cactus");
                    cact.frame = level [j][i];
                    cact.tint = 0x00FFF00;
                    tile = game.add.sprite(40 * i, 40 * j, "tiles");
                    tile.frame = level[j][i];
                    fixedGroup.add(tile);
                    break;                    
                default:
                    // creation of a simple tile ->0
                    tile = game.add.sprite(40 * i, 40 * j, "tiles");
                    tile.frame = level[j][i];
                    fixedGroup.add(tile);
            }
        }

    }
    // once the level has been created, we wait for the player to touch or click, then we call
    // beginSwipe function
    game.input.onDown.add(beginSwipe, this);
    COUNTDOWNTEXT = game.add.text(10,10,"tiempo restante: "+tiemporestante, { fontSize: '16px', fill: '#FFF' });
    PASOSTEXT = game.add.text (game.world.width-100,10,"0 Pasos",{ fontSize: '16px', fill: '#FFF' });
    //temporizador que se autodestruye
    TEMPORIZADOR = game.time.create(false);
    TEMPORIZADOR.loop(1000,updateMarcador,this);
    //empieza aqui el temporizador o cuando se de por comenzado el juego!?
    TEMPORIZADOR.start();

}
function update(){
    //si el tiempo es 0 se acabo el juego
    if(tiemporestante<=0){
        COUNTDOWNTEXT.text= "¡GAME OVER!";
        TEMPORIZADOR.stop();
    }
    
}
//actualiza el marcador
function updateMarcador(){
    tiemporestante--;
    COUNTDOWNTEXT.text = "tiempo restante: "+tiemporestante;
}
function updatePasos(){
    PASOS++;
    PASOSTEXT.text= PASOS+" Pasos";
}
// when the player begins to swipe we only save mouse/finger coordinates, remove the touch/click
// input listener and add a new listener to be fired when the mouse/finger has been released,
// then we call endSwipe function
function beginSwipe() {
    startX = game.input.worldX;
    startY = game.input.worldY;
    game.input.onDown.remove(beginSwipe);
    game.input.onUp.add(endSwipe);
}

// function to be called when the player releases the mouse/finger
function endSwipe() {
    // saving mouse/finger coordinates
    endX = game.input.worldX;
    endY = game.input.worldY;
    // determining x and y distance travelled by mouse/finger from the start
    // of the swipe until the end
    let distX = startX - endX;
    let distY = startY - endY;
    // in order to have an horizontal swipe, we need that x distance is at least twice the y distance
    // and the amount of horizontal distance is at least 10 pixels
    if (Math.abs(distX) > Math.abs(distY) * 2 && Math.abs(distX) > 10) {
        // moving left, calling move function with horizontal and vertical tiles to move as arguments
        if (distX > 0) {
            move(-1, 0);
        }
        // moving right, calling move function with horizontal and vertical tiles to move as arguments
        else {
            move(1, 0);
        }
    }
    // in order to have a vertical swipe, we need that y distance is at least twice the x distance
    // and the amount of vertical distance is at least 10 pixels
    if (Math.abs(distY) > Math.abs(distX) * 2 && Math.abs(distY) > 10) {
        // moving up, calling move function with horizontal and vertical tiles to move as arguments
        if (distY > 0) {
            move(0, -1);
        }
        // moving down, calling move function with horizontal and vertical tiles to move as arguments
        else {
            move(0, 1);
        }
    }
    // stop listening for the player to release finger/mouse, let's start listening for the player to click/touch
    game.input.onDown.add(beginSwipe);
    game.input.onUp.remove(endSwipe);
}

// function to move the player
function move(deltaX, deltaY) {
    // if destination tile is walkable...
    if (isWalkable(player.posX + deltaX, player.posY + deltaY)) {
        // ...then move the player and exit the function
        movePlayer(deltaX, deltaY);
        return;
    }
    // if the destination tile is a crate... 
    if (isCrate(player.posX + deltaX, player.posY + deltaY)) {
        // ...if  after the create there's a walkable tils...
        if (isWalkable(player.posX + 2 * deltaX, player.posY + 2 * deltaY)) {
            // move the crate
            moveCrate(deltaX, deltaY);
            // move the player	
            movePlayer(deltaX, deltaY);
        }
    }
}

// a tile is walkable when it's an empty tile or a spot tile
function isWalkable(posX, posY) {
    //añado cactus a los walkables
    return level[posY][posX] == EMPTY || level[posY][posX] == SPOT || level[posY][posX] == CACTUS;
}

// a tile is a crate when it's a... guess what? crate, or it's a crate on its spot
function isCrate(posX, posY) {
    return level[posY][posX] == CRATE || level[posY][posX] == CRATE + SPOT;
}

// function to move the player
function movePlayer(deltaX, deltaY) {
    // moving with a 1/10s tween
    let playerTween = game.add.tween(player);
    playerTween.to({
        x: player.x + deltaX * tileSize,
        y: player.y + deltaY * tileSize
    }, 100, Phaser.Easing.Linear.None, true);
    // updating player old position in level array   
    level[player.posY][player.posX] -= PLAYER;
    // updating player custom posX and posY attributes
    player.posX += deltaX;
    player.posY += deltaY;
    // updating player new position in level array 
    level[player.posY][player.posX] += PLAYER;
    // changing player frame accordingly  
    player.frame = level[player.posY][player.posX];
    updatePasos();
}

// function to move the crate
function moveCrate(deltaX, deltaY) {
    // moving with a 1/10s tween
    let crateTween = game.add.tween(crates[player.posY + deltaY][player.posX + deltaX]);
    crateTween.to({
        x: crates[player.posY + deltaY][player.posX + deltaX].x + deltaX * tileSize,
        y: crates[player.posY + deltaY][player.posX + deltaX].y + deltaY * tileSize,
    }, 100, Phaser.Easing.Linear.None, true);
    // updating crates array   
    crates[player.posY + 2 * deltaY][player.posX + 2 * deltaX] = crates[player.posY + deltaY][player.posX + deltaX];
    crates[player.posY + deltaY][player.posX + deltaX] = null;
    // updating crate old position in level array  
    level[player.posY + deltaY][player.posX + deltaX] -= CRATE;
    // updating crate new position in level array  
    level[player.posY + 2 * deltaY][player.posX + 2 * deltaX] += CRATE;
    // changing crate frame accordingly  
    crates[player.posY + 2 * deltaY][player.posX + 2 * deltaX].frame = level[player.posY + 2 * deltaY][player.posX + 2 * deltaX];
}