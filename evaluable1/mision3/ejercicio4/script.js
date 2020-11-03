"use strict"

window.onload = isLogged;
//comprueba si ha introducido la pw anteriormente
function isLogged() {

    let valido = localStorage.getItem("valid");
    let formulario = document.getElementById("formulario");
    //si no lo ha hecho
    if (valido == null) {
        //asigna el evento de validacion al formulario

        formulario.onsubmit = validateUserPW;
       
        //en caso contrario muestra los datos al usuario
    } else if (valido =="true"){
        muestraDatosUsuarioLogueado();

        //si tiene los datos, pero no con la contraseña correcta, te lanza una alerta
    }else{
        formulario.onsubmit = validateUserPW;
        alert ("tramposillo(o la clave ha cambiado)");
    }
}
//valida la contraseña introducida por el usuario. Si es correcta
//añade el item necesario para validarse posteriormente al localstorage
//y muestra los datos al usuario logueado
//devuelve true or false en funcion del resultado.
function validateUserPW() {

    let userPw = document.getElementById("pw").value;

    if (userPw == "supercalifragilistico") {
        
        localStorage.setItem("valid", "true");
        muestraDatosUsuarioLogueado();
        return true;

    } else {
        alert("contraseña no valida");
        return false;

    }
}

function mensajeAtencion(){

    alert("Ponte a trabajar, no seas Jessie Pinkman");
}

//funcion que muestra los datos a los usuarios logueados
//crea el formulario y sus componentes y les añade los eventos requeridos.

function muestraDatosUsuarioLogueado() {
    //elimina el formulario anterior
    formulario.parentNode.removeChild(formulario);
    
    //los componentes del formulario
    let clase = "virus";
    let inputNombre = crearInputText("^.{2,32}$",clase,"Nombre del Investigador");
    let inputNumero =crearInputText("^\\d{8}[a-zA-Z]$",clase, "Número de investigador");
    let inputID= crearInputText("^\\d{1,10}$",clase,"ID de la firma del virus");
    let inputFirma = crearInputText("^(S4ND1EG0).{0,50}$",clase,"Firma");
    let button = crearSubmit(clase);

    let f = crearFormulario([inputNombre,inputNumero,inputID,inputFirma,button]);
    
    document.getElementById("miOtroForm").appendChild(f);
   
    //los eventos y el timeout
    f.onsubmit= validarEnvio;
    let cuentaAtras = setTimeout(mensajeAtencion,15000);
    timeOutKeyPressLoader(cuentaAtras);
    inputFirma.onfocus =()=>{insertTextSiNoCumple("S4ND1EG0",inputFirma,8); clearTimeout(cuentaAtras)};
 
}
//añade al evento onkeypress de todos los inputtext el clearTimeout con el id
//que se le pasa
function timeOutKeyPressLoader(timeout){
    let elementos = document.getElementsByTagName("input");
    //podria sacar al id del evento keypress porque antes de poder pulsar 
    //siempre ha ganado el foco y se ha escrito lo de sandiego...
    for(let i=0;i<elementos.length-1;i++){
        elementos[i].onkeypress = ()=> clearTimeout(timeout);
    }  

}
