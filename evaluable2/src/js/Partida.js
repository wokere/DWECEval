import Tablero from "./Tablero.js";

class Partida {
    constructor(dado, tablero, finRonda,finPartida) {
        this.dado = dado;
        this.finRonda = finRonda;
        this.finalPartida = finPartida;
        this.tablero = tablero;
        this.tablero.evFinRonda = this.finRonda;
        this.tablero.evFinPartida = this.finalPartida;
        this.tiradasRealizadas = 0;
        //iny
        this.divTablero = $("#tablero");
        this.dadoButton = $("#tirarDado");
        this.imgDado = $("#dado");

    }
   
    //cambiar a ronda
    ronda() {
        this.tiradasRealizadas++;
        let tirada = this.cambiaImagenDado();
        this.tablero.movimientosPosibles(tirada);
    }
  

    cambiaImagenDado() {
        let tirada = this.dado.lanzaDado();
        let rutaDado = "dado/" + tirada + ".png";
        this.imgDado.attr("src", rutaDado);
        //hasta q no elijas no se activa de nuevo
        this.desactivaElementoDado();
        return tirada;
    }

    empezarPartida() {

        this.divTablero.html(this.tablero.generarTablero(10));
        $(this.tablero.posicionCofre).on(this.finalPartida,()=>this.finPartida());
        this.divTablero.on(this.finRonda,()=>this.activaElementoDado());
        this.activaElementoDado();
        this.tiradasRealizadas = 0;
    }
    
    finPartida(){
        const mensaje = "Héroe, has llegado al cofre en "+this.tiradasRealizadas+" tiradas";
        alert(mensaje);
        this.desactivaElementoDado();
    }

    activaElementoDado(){
        this.dadoButton.on("click",() => this.ronda());
        this.dadoButton.removeAttr("disabled");
    }
    desactivaElementoDado(){
        this.dadoButton.off("click");
        this.dadoButton.attr("disabled", "true");
    }

}
export default Partida;