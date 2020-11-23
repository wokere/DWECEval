import Dado from "./Dado.js";
import Partida from "./Partida.js";
import Juego from "./Juego.js";
import Tablero from "./Tablero.js";


$(document).ready( function(){
    let recordsItemName = "recordTiradas";
    let dado  = new Dado (1,6);
    let tablero = new Tablero("hero","tiles-permitidas","cofre","tiles","win");
    let partida = new Partida(dado,tablero,"finRonda","finPartida");
    let game = new Juego(recordsItemName, partida);
    game.init();
})

