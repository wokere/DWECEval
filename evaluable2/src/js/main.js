import Dado from "./Dado.js";
import Auth from "./Auth.js";
import Partida from "./Partida.js";
import Juego from "./Juego.js";
import Tablero from "./Tablero.js";



$(document).ready( function(){
    let records = localStorage.getItem("recordTiradas");
    let dado  = new Dado (1,6);
    let tablero = new Tablero("hero","tiles-permitidas","cofre","tiles","win");
    let partida = new Partida(dado,tablero);
    let game = new Juego(records, partida);
    game.lanzarEventos();
})

