"use strict";

window.PIXI   = require('phaser-ce/build/custom/pixi');
window.p2     = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

let game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    //cargamos el bonus
    game.load.image('bonus','assets/bonus.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    //cargamos las imagenes del baddie como spitesheet y le decimos lo que mide cada elemento
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);

}

let player;
//el malo con u, que es bonito.
let buddie;
let direccionBuddie = "izquierda";
let platforms;
let cursors;


let stars;
let starPoints = 100;

let score = 0;
let scoreText;



// el powerup
let bonus;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    let ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    let ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //el buddie y su configuracion
    //quiero que empiece al otro lado de la pantalla
    buddie = game.add.sprite(game.world.width-30, game.world.height - 500, 'baddie');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    //Tambien en el buddie
    game.physics.arcade.enable(buddie);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //No le pongo rebote vertical porque solo va en horizontal. 
    //Pero si hago que caiga como efecto inicial dandole gravedad

    buddie.body.gravity.y = 300;
    buddie.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //nuestro buddie tambien va de derecha a izquierda
    //como tiene pocos frames le bajamos la velocidad de cambio entre ellos

    buddie.animations.add('derecha',[2,3],5,true);
    buddie.animations.add('izquierda',[0,1],5,true);

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (let i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group. LET
        let star = stars.create(i * 70, 0, 'star');
        //  Let gravity do its thing
       // star.body.gravity.y = 300;
        //  This just gives each star a slightly random bounce value
        //star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    //Estrellas malas, q por todo lo demas son estrellas igual
    for (let i=0 ;i<6;i++){
        let evilStar = stars.create(i*145,0,'star');
        //le cambiamos el color
        evilStar.tint = 0xFF0000;
       // evilStar.body.gravity.y =300;
        //son muy malas y tardan en parar de saltar
       // evilStar.body.bounce.y = 1;
    }
    //les aplicamos el mismo gravity y la misma regla de rebote a todas las stars
    
    for (let astro of stars.children){
        astro.body.gravity.y=300;
        astro.body.bounce.y = 0.7 + Math.random() * 0.2;
    }



    //ajustamos los puntos de las estrellas
    let intervaloActualizacionPuntos = setInterval(()=> {
        starPoints = starPoints-2;
        if(starPoints == 2 ){
            clearInterval(intervaloActualizacionPuntos);
        }
    },1000); 

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    // El bonus, en algun lugar random de la pantalla, hay que validar que no esté en las posiciones de las plataformas!
    bonus = game.add.sprite(rdCoords(game.world.width),rdCoords(game.world.height),'bonus');
    
    //le damos "fisica"
    game.physics.arcade.enable(bonus);
    //si una estrella o el malo caen sobre el pues no lo atraviesan??????
    //bonus.body.gravity.y = 300;
    //bonus.body.collideWorldBounds = true;
    bonus.body.immovable = true;


}

function update() {
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    
    //el mundo choca con el buddie,
    // pero no dice nada de que deba chocar con las estrellas
    game.physics.arcade.collide(buddie,platforms);

   // las plataformas y las estrellas tb chocan con el bonus. Con el buddie no para que no le impida atravesarlo.
   //game.physics.arcade.collide(bonus,platforms);
   game.physics.arcade.collide(bonus,stars);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, buddie, finJuego, null, this);
    game.physics.arcade.overlap(player, bonus, activarDobleSalto, null, this);


    //AQUI METEREMOS QUE PASARA CUANDO EL BUDDIE Y LAS BADSTARS CHOQUEN CON EL PLAYER

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    //Nuestro buddie empieza siempre yendo hacia la izquierda
    //y en cada frame continua en la direccion que seguia yendo
    moverHacia(buddie,direccionBuddie);
   //hasta que llegue a un punto u otro de la pantalla, que entonces cambia
       
   //!!!console.log(buddie.body.checkWorldBounds() );

    if(buddie.body.x == 0){
       moverHacia(buddie,"derecha");
       direccionBuddie="derecha";
    }
    if( buddie.body.x == game.world.width-40){
        moverHacia(buddie,"izquierda");
        direccionBuddie="izquierda";
    }
      
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');

    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}

function collectStar (player,star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += starPoints;
    scoreText.text = 'Score: ' + score;
}
//dado un body y una direccion mueve al elemento hacia esa misma.

function moverHacia(quien,direccion){
    let speed = direccion == "derecha" ? 75 : -75;
    quien.body.velocity.x = speed;
    quien.animations.play(direccion);
  
}
//funcion que mata al prota y finaliza el juego
function finJuego(player){
    player.kill();
    game.add.text(200, 200, '¡GAME OVER!', { fontSize: '64px', fill: '#FFF' });

}

function rdCoords(max){
    return Math.floor(Math.random()*(max-40))
}
function activarDobleSalto(player,bonus){
    //cambiar por salto doble
    player.body.bounce.y=1.2;
    bonus.kill();
}
