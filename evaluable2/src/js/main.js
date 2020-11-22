import Dado from "./Dado.js";
import Auth from "./Auth.js";
import Partida from "./Partida.js";
import Juego from "./Juego.js";


$(document).ready( function(){
    let records = localStorage.getItem("recordTiradas");
    let dado  = new Dado (1,6);
    let partida = new Partida(dado,"hero","tiles-permitidas","cofre","tiles");
    let game = new Juego(records, partida);
    game.lanzarEventos();
})

