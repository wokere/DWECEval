//clase que engloba el desarrollo de la partida
class Partida {
    //una partida se construye con un dado, un tablero y dos variables que
    //haran de eventos de fin de partida y fin de ronda
    constructor(dado, tablero, finRonda,finPartida) {
        this.dado = dado;
        this.finRonda = finRonda;
        this.finalPartida = finPartida;
        this.tablero = tablero;
        this.tablero.evFinRonda = this.finRonda;
        this.tablero.evFinPartida = this.finalPartida;
        this.tiradasRealizadas = 0;
        this.enCurso = false;
        // elementos del dom involucrados en la partida
        this.divTablero = $("#tablero");
        this.dadoButton = $("#tirarDado");
        this.imgDado = $("#dado");

    }
   
    //metodo que desarrolla cada ronda. 
    ronda() {
        this.tiradasRealizadas++;
        let tirada = this.cambiaImagenDado();
        this.tablero.movimientosPosibles(tirada);
    }
  
    //metodo que cambia la imagen del dado cambiando el src 
    //por el que obtiene en lanzaDado
    //descativa el lanzamiento del dado 
    cambiaImagenDado() {
        let tirada = this.dado.lanzaDado();
        let rutaDado = "dado/" + tirada + ".png";
        this.imgDado.attr("src", rutaDado);
        //hasta q no elijas no se activa de nuevo
        this.desactivaElementoDado();
        return tirada;
    }
    //genera el tablero y añade los manejadores de eventos. 
    //Pone las tiradas a 0.
    empezarPartida() {
        this.enCurso=true;
        this.divTablero.html(this.tablero.generarTablero(10));
        this.eventosPartida();
        this.tiradasRealizadas = 0;
    }

    eventosPartida(){

        //la partida solo acaba una vez asi que le ponemos one
        $(this.tablero.posicionCofre).one(this.finalPartida,()=>this.finPartida());
        //esto previene que se dispare varias veces seguidas (porque le estoy añadiendo el manejador cada vez q empiezo la partida)
        this.divTablero.off(this.finRonda).on(this.finRonda,()=>this.activaElementoDado());
        this.activaElementoDado();
    }
 
    //manda un mensaje con el numero de tiradas y desactiva el dado
    finPartida(){
        const mensaje = "Héroe, has llegado al cofre en "+this.tiradasRealizadas+" tiradas";
        alert(mensaje);
        this.enCurso=false;
       
    }

    //metodo que añade el manejador al evento clic del boton tirar dado
    //y lo activa
    activaElementoDado(){

        //solo queremos que se dispare una vez
        this.dadoButton.off("click").one("click",() => this.ronda());
        this.dadoButton.removeAttr("disabled");
    }
    //metodo que desactiva el elemento dado y le quita el manejador
    desactivaElementoDado(){
        this.dadoButton.off("click");
        this.dadoButton.attr("disabled", "true");
    }

}
export default Partida;