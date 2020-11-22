import Dado from "./Dado.js";
import Auth from "./Auth.js";
let dado = new Dado(1,6);
$(document).ready( function(){
    cambiaImagenDado();
    $("#loginButton").click(autorizacionJuego);
})

//maneja el evento clic del boton tirar dado
function cambiaImagenDado(){
    let tirada = dado.lanzaDado();
    let rutaDado = "dado/"+tirada+".png";
    $('#dado').attr("src",rutaDado);
}

function autorizacionJuego(){
    let url = "https://apuntesfpinformatica.es/DWEC/entregable1-2.php";
    let data = $("#username").val();
    let prop = "nombre";
    let method = "POST";
    let datosAuth = new Auth(url,data,prop,method);
    datosAuth.autorizar(esbien);
}
//callback de la autorizacion
function esbien(msg){
    alert("esbien" +msg);
}
