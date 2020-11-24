import Auth from "./Auth.js";

//la clase en la que se gestionan todos los elementos del juego
class Juego {

    //necesita un key para buscar en el local storage y una partida
    constructor(records, partida) {

        this.records=records;
        this.recordsStorage = parseInt(localStorage.getItem(records));
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
    //metodo  que inicializa el juego
    init() {

        this.loginButton.click(() => this.autorizacionJuego());
        this.jugarButton.on("click",() => this.lanzarPartida(function hola(){return caracola}));
        
    }

    //metodo que lanza la partida y gestiona los elementos para q se muestre
    //asi como activar el evento que actualizará el record al finalizar
    lanzarPartida(){
        this.divJuego.removeClass("oculto");
        this.ocultarElemento(this.divAuth);
        this.partida.empezarPartida();
        $(this.partida.tablero.posicionCofre).on(this.partida.finalPartida,()=>this.actualizarRecord());
     
    }
    //metodo que autoriza al usuario a continuar el juego
    autorizacionJuego() {
        //cojo el username del input
        let data = $(this.inputUserNameID).val();
        //si tiene el minimo de letras hago la llamada ajax
        if (this.minimoLetras(data)) {
            let url = "https://apuntesfpinformatica.es/DWEC/entregable1-2.php";
            let prop = "nombre";
            let method = "POST";
            let datosAuth = new Auth(url, data, prop, method);
            //y procedo segun el mensaje que devuelva
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
    ///actualiza el record almacenado en el localstorage si este existe y es superado por el del usario
    //si no existe lo crea
    //tambien manda un mensaje
    actualizarRecord(){
       let msj;
        if(this.recordsStorage !=null && this.recordsStorage > this.partida.tiradasRealizadas){
            //comprobar
             msj = "Héroe, has establecido un NUEVO récord de tiradas con "+this.partida.tiradasRealizadas+" tiradas";
            localStorage.setItem(this.records,this.partida.tiradasRealizadas);
        }else if(this.recordsStorage <= this.partida.tiradasRealizadas){
             msj = "Record No superado, el actual record es "+this.recordsStorage;
        }else{
            msj = "Héroe, has establecido un récord de tiradas con "+this.partida.tiradasRealizadas+" tiradas";
            localStorage.setItem(this.records,this.partida.tiradasRealizadas);
        }
        alert(msj);
        
    }
}

export default Juego;