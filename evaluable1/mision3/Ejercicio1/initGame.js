let carta1 = new Carta ("img/1.png", "1" ,"img/back.png" );
let carta2 = new Carta ("img/2.png", "2", "img/back.png");
let carta3 = new Carta ("img/3.png", "3", "img/back.png");
let carta4 = new Carta ("img/4.png", "4", "img/back.png");
let carta5 = new Carta ("img/1.png", "1", "img/back.png");
let carta6 = new Carta ("img/2.png", "2", "img/back.png");
let carta7 = new Carta ("img/3.png", "3","img/back.png");
let carta8 = new Carta ("img/4.png", "4","img/back.png");

let cartas = [carta1,carta2,carta3,carta4,carta5,carta6,carta7,carta8];
let desc= "¿Cuantos puntos puedes conseguir? Cada acierto suma, cada fallo resta. ¡Comprueba el estado de tus neuronas con este estimulante juego memorístico!"
let juego = new Juego(cartas,desc);
let vg = new visualGame(juego);

window.onload = ()=>{
    alert("iniciando");
    vg.asignarCartas();
}