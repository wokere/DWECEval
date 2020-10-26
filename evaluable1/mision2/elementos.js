"use strict"

function crearFormulario(campos) {
    document.getElementById("datos").innerHTML = "";
   // let formulario = document.createElement("FORM");
   let contenedor = document.getElementById("datos");
    //let salto = document.createElement("br");
    for (let i = 0; i < campos.length; i++) {
        //label
        let label = document.createElement("LABEL");
        label.setAttribute("for", campos[i]);
        label.innerHTML = campos[i];
        contenedor.appendChild(label);
        //input
        let input = document.createElement("INPUT");
        input.id = campos[i];
        input.type = "text";
        contenedor.appendChild(input);
    }
    //creamos el boton
    let boton = document.createElement("BUTTON");
    boton.innerHTML = "Confirmar";
    boton.id = "confirmacion";
    contenedor.appendChild(boton);
    //document.getElementById("datos").appendChild(formulario);

}

function crearTabla(datos) {
    //limpiamos lo que hubiere antes
    document.getElementById("datos").innerHTML = "";
    //creamos la tabla
    let tabla = document.createElement("TABLE");
    tabla.setAttribute("border", "1");
    //creo la cabecera de la tabla
    let cap = document.createElement("TR");
    for (let cabeceras of Object.keys(datos[0])) {
        let celda = document.createElement("TH");
        celda.innerHTML = cabeceras;
        cap.appendChild(celda);
    }
    tabla.appendChild(cap);
    //cuerpo de la tabla
    for (let i = 0; i < datos.length; i++) {
        //creamos las filas
        let fila = document.createElement("TR");
        //recorremos cada objeto y mostramos su información
        for (let info of Object.values(datos[i])) {
            let celda = document.createElement("TD");
            celda.innerHTML = info;
            fila.appendChild(celda);
        }

        //añadimos la fila a la tabla
        tabla.appendChild(fila);
    }
    document.getElementById("datos").appendChild(tabla);
}
function crearTexto(texto){
    document.getElementById("datos").innerHTML = texto;
}

function adjuntarTexto(texto){
    let bloqueTexto = document.createElement("p");
    bloqueTexto.innerHTML = texto;
    document.getElementById("datos").appendChild(bloqueTexto);
}
