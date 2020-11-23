import Tablero from "./Tablero.js";

class Partida {
    constructor(dado, tablero) {
        this.dado = dado;
        this.tablero = tablero;
        this.tiradasRealizadas = 0;
        //iny
        this.divTablero = $("#tablero");
        this.dadoButton = $("#tirarDado");
        this.imgDado = $("#dado");

    }
    //cambiar a ronda
    ronda() {

        this.tiradasRealizadas++;
        //mover a partida , metodo movimientos posibles
        let tirada = this.cambiaImagenDado();
        //poraquinosvamos
        this.tablero.habilitaPosiblesMovimientos(tirada);
        //habilito evento
    }

    cambiaImagenDado() {
        let tirada = this.dado.lanzaDado();
        let rutaDado = "dado/" + tirada + ".png";
        this.imgDado.attr("src", rutaDado);
        return tirada;
    }

    empezarPartida() {

        this.divTablero.html(this.tablero.generarTablero(10));
        //deberia meterle el elemento donde está el cofre y va a aparecer el heroe
        $("td").on("finPartida",()=>this.finPartida());
        this.dadoButton.click(() => this.ronda());
        this.tiradasRealizadas = 0;
    }
    
    finPartida(){
        
        const mensaje = "Héroe, has llegado al cofre en "+this.tiradasRealizadas+" tiraddas";
        //endpartida
        alert(mensaje);
        //localstorage
        //deshabilitar dado!
    }

}
export default Partida;