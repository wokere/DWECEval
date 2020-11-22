import Dado from "./Dado.js";
import Auth from "./Auth.js";
import Partida from "./Partida.js";

let dado = new Dado(1,6);
$(document).ready( function(){
    $("#loginButton").click(autorizacionJuego);
    $("#jugarButton").click(mostrarTableroJuego);
    $("#tirarDado").click(cambiaImagenDado);
})

function cambiaImagenDado(){
    let tirada = dado.lanzaDado();
    let rutaDado = "dado/"+tirada+".png";
    $('#dado').attr("src",rutaDado);
}

function autorizacionJuego(){
    let data = $("#username").val();
    if(minimoLetras(data)){
        let url = "https://apuntesfpinformatica.es/DWEC/entregable1-2.php";
        let prop = "nombre";
        let method = "POST";
        let datosAuth = new Auth(url,data,prop,method);
        datosAuth.autorizar(continuaSiPermiteJuego);
    }else{
        deshabilitarBoton("#jugarButton");
        alert("El nombre ha de tener 4 letras o mas");
    }
}
function deshabilitarBoton(id){
    $(id).attr("disabled","true");
}
function minimoLetras(palabra){
    return palabra.length >= 4;
}
//callback de la llamada ajax
function continuaSiPermiteJuego(msg){
   if (msg==="OK"){
        let name = $("#username").val();
        $("#nombreHeroe").html(": "+name);
        $("#jugarButton").removeAttr("disabled");
   }else{
        deshabilitarBoton("#jugarButton");
        alert("El numero de letras ha de ser impar");
   }
}
function mostrarTableroJuego(){
    $("#juego").removeClass("oculto");
    let partida = new Partida(dado,"hero","tiles-permitidas","cofre","tiles");
    $("#tablero").html(partida.generarTablero(10));

}
