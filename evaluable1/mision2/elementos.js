"use strict"

function crearFormulario(campos,clase,funcion) {
    document.getElementById("datos").innerHTML = "";
   // let formulario = document.createElement("FORM");
   let contenedor = document.getElementById("datos");
   
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
        input.className=clase;
        contenedor.appendChild(input);
        let salto = document.createElement("BR");
        contenedor.appendChild(salto);
    }
    //creamos el boton
    let boton = document.createElement("BUTTON");
    boton.innerHTML = "Confirmar";
    boton.id = "confirmacion";
    boton.onclick = funcion;
   // boton.onclick=evento;
    contenedor.appendChild(boton);

}

function addRadioGroup(elementoAnterior, opciones,clase){
    //creamos el grupo de radios
    for(let i=0;i<opciones.length;i++){
        //input
        let radio = document.createElement("INPUT");
        radio.name ="group";
        radio.type="radio";
        radio.id = "option"+opciones[i];
        radio.value = opciones[i];
        radio.className = clase; 
        //label
        let label = document.createElement("LABEL");
        label.setAttribute("for",radio.id);
        label.innerHTML = opciones[i];
        //lo insertamos antes del elemento elegido
        elementoAnterior.parentNode.insertBefore(radio,elementoAnterior);
        elementoAnterior.parentNode.insertBefore(label,radio);
    }
    
}
function addSelect(elementoAnterior,opciones,clase){
    //creamos el select
    let select = document.createElement("SELECT");
    select.className = clase;
    //creamos las opciones
    for(let i=0;i<opciones.length;i++){
        let opcion = document.createElement("OPTION");
        opcion.value = opciones[i];
       // opcion.className = clase;
        opcion.innerHTML = opciones[i];
        select.appendChild(opcion);
    }
    elementoAnterior.parentNode.insertBefore(select,elementoAnterior);

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
           
            if (info instanceof Date){
                info = prettyDate(info);
            }
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

function prettyDate(fecha){
    let dia = fecha.getDate();
    let mes = fecha.getMonth()+1;
    let year = fecha.getFullYear();
    
    return dia+"/"+mes+"/"+year;
}