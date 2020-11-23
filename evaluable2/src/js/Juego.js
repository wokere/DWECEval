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

        this.inputUserNameID = "#username";
        this.nombreHeroe = $("#nombreHeroe");

        //BOTONES
        this.loginButton = $("#loginButton");
        this.jugarButton = $("#jugarButton");

    }

    lanzarEventos() {

        this.loginButton.click(() => this.autorizacionJuego());
        this.jugarButton.click(() => this.lanzarPartida());
    }

    lanzarPartida(){
        
        this.divJuego.removeClass("oculto");
        this.ocultarElemento(this.divAuth);
        this.partida.empezarPartida();
    }

    autorizacionJuego() {
        let data = $(this.inputUserNameID).val();
        if (this.minimoLetras(data)) {
            let url = "https://apuntesfpinformatica.es/DWEC/entregable1-2.php";
            let prop = "nombre";
            let method = "POST";
            let datosAuth = new Auth(url, data, prop, method);
            datosAuth.autorizar((msg) => this.continuaSiPermiteJuego(msg));
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
    ocultarElemento(elemento) {
        elemento.addClass("oculto");
    }

    deshabilitarBoton(id) {
        $(id).attr("disabled", "true");
    }
    minimoLetras(palabra) {
        return palabra.length >= 4;
    }
}

export default Juego;