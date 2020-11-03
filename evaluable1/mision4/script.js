"use strict"

window.onload = isLogged;

function isLogged() {

    let valido = localStorage.getItem("valid");
    let formulario = document.getElementById("formulario");
    if (valido == null) {

        formulario.onsubmit = validateUserPW;
    } else if (valido =="true"){
        muestraDatosUsuarioLogueado();

    }else{
        formulario.onsubmit = validateUserPW;
        alert ("tramposillo");
    }
}

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

function seHaEscritoNada(){
    let inputs = document.getElementsByTagName("input");
    for(let i=0;i<inputs.length-1;i++){
        console.log(inputs[i].value);
        if(inputs[i].value!==""){
            return false;
        }
    }
    return true;
}

function muestraDatosUsuarioLogueado() {

    formulario.parentNode.removeChild(formulario);
    let clase = "virus";
    let inputNombre = crearInputText("^.{2,32}$",clase,"Nombre del Investigador");
    let inputNumero =crearInputText("^\\d{8}[a-zA-Z]$",clase, "Número de investigador");
    let inputID= crearInputText("^\\d{1,10}$",clase,"ID de la firma del virus");
    let inputFirma = crearInputText("^(S4ND1EG0).{0,50}$",clase,"Firma");
    let button = crearSubmit(clase);
    let f = crearFormulario([inputNombre,inputNumero,inputID,inputFirma,button]);
    document.getElementById("miOtroForm").appendChild(f);
   
    f.onsubmit= validarEnvio;
    let cuentaAtras = setTimeout(mensajeAtencion,4000);
    timeOutKeyPressLoader(cuentaAtras);
    inputFirma.onfocus =()=>{insertTextSiNoCumple("S4ND1EG0",inputFirma,8); clearTimeout(cuentaAtras)};
 
}

function timeOutKeyPressLoader(timeout){
    let elementos = document.getElementsByTagName("input");
    //podria sacar al id del evento keypress porque antes de poder pulsar 
    //siempre ha ganado el foco y se ha escrito lo de sandiego...
    for(let i=0;i<elementos.length-1;i++){
        elementos[i].onkeypress = ()=> clearTimeout(timeout);
    }
    

}
