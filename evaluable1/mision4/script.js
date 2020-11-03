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

function muestraDatosUsuarioLogueado() {

    formulario.parentNode.removeChild(formulario)
    let inputNombre = crearInputText("[a-z]","virus","Nombre del Investigador");
    let inputNumero =crearInputText("[a-z]","virus", "Número de investigador");
    let inputID= crearInputText("[a-z]","virus","ID de la firma del virus");
    let inputFirma = crearInputText("[a-z]","virus","Firma");
    let button = crearSubmit("virus");
    let f = crearFormulario([inputNombre,inputNumero,inputID,inputFirma,button]);

    document.getElementById("miOtroForm").appendChild(f);

    
    f.onsubmit= validarEnvio;
}

