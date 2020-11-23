import Dado from "./Dado.js";
import Auth from "./Auth.js";
import Partida from "./Partida.js";

class Juego {
    
    
    constructor(records, partida) {

        this.records = records;
        this.partida = partida;

        //ELEMENTOS DEL DOM A MODIFICAR!

        this.divAuth = $("#form");
        this.divJuego = $("#juego");
        this.divTablero = $("#tablero");

        this.inputUserNameID = "#username" ;
        this.nombreHeroe = $("#nombreHeroe");

        this.imgDado = $("#dado");

        //BOTONES
        this.loginButton = $("#loginButton");
        this.jugarButton = $("#jugarButton");
        this.dadoButton = $("#tirarDado");
    }

    lanzarEventos() {

        this.loginButton.click(()=> this.autorizacionJuego());
        this.jugarButton.click(()=> this.empezarPartida());
        //este deberia ser de la partida y no del juego
        this.dadoButton.click(()=> this.movimientosPosibles());
    }

    autorizacionJuego() {
        let data = $(this.inputUserNameID).val();
        if (this.minimoLetras(data)) {
            let url = "https://apuntesfpinformatica.es/DWEC/entregable1-2.php";
            let prop = "nombre";
            let method = "POST";
            let datosAuth = new Auth(url, data, prop, method);
            datosAuth.autorizar((msg)=> this.continuaSiPermiteJuego(msg));
        } else {
            this.deshabilitarBoton("#jugarButton");
            alert("El nombre ha de tener 4 letras o mas");
        }
    }
    //callback de la llamada ajax
    continuaSiPermiteJuego(msg) {
        if (msg === "OK") {
            let name = $(this.inputUserNameID).val();
            this.nombreHeroe.html(": " + name);
            this.jugarButton.removeAttr("disabled");
        } else {
            this.deshabilitarBoton(this.jugarButton);
            alert("El numero de letras ha de ser impar");
        }
    }
    empezarPartida() {
        this.divJuego.removeClass("oculto");
        this.ocultarElemento(this.divAuth);
        this.divTablero.html(this.partida.generarTablero(10));
    }
    ocultarElemento(elemento) {
        elemento.addClass("oculto");
    }
    //renombrar a empezarRonda
    movimientosPosibles() {
        //mover a partida , metodo movimientos posibles
        let tirada = this.cambiaImagenDado();
        //poraquinosvamos
        this.partida.muestraPosiblesMovimientos(tirada);
    }
    //mover a partida/dado??
    //img dado tambien??
    cambiaImagenDado() {
        let tirada = this.partida.dado.lanzaDado();
        let rutaDado = "dado/" + tirada + ".png";
        this.imgDado.attr("src", rutaDado);
        return tirada;
    }
    deshabilitarBoton(id) {
        $(id).attr("disabled", "true");
    }
    minimoLetras(palabra) {
        return palabra.length >= 4;
    }
}

export default Juego;