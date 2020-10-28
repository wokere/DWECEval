"use strict"
//dado un campo, una clase y un evento crea un formulario y le asigna esos datos antes de mostrarlo.
function crearFormulario(campos, clase, funcion) {
    //limpiamos lo que hubiere en los elementos con id datos
    cleanDatos();
    let contenedor = document.getElementById("datos");
    crearVariosInputs(campos, clase, contenedor);
    //creamos el boton
    let boton = document.createElement("BUTTON");
    boton.innerHTML = "Confirmar";
    boton.id = "confirmacion";
    boton.onclick = funcion;
    contenedor.appendChild(boton);
}
//crea tantos inputs como tamaño tenga campos y los añade a un contenedor
//les asigna la clase
function crearVariosInputs(campos, clase, contenedor) {
    for (let i = 0; i < campos.length; i++) {
        //label
        contenedor.appendChild(crearLabel(campos[i]));
        //input
        contenedor.appendChild(crearInput(clase, campos[i]));
        //salto de pagina
        let salto = document.createElement("BR");
        contenedor.appendChild(salto);
    }
}
//dado una clase y un campo crea un input y lo devuelve.
function crearInput(clase, id) {
    let input = document.createElement("INPUT");
    input.id = id;
    input.type = "text";
    input.className = clase;
    return input;

}
//dado un id crea una etiqueta
function crearLabel(id) {
    let label = document.createElement("LABEL");
    label.setAttribute("for", id);
    label.innerHTML = id;
    return label;

}
function crearRadio(opcion, clase) {
    let radio = document.createElement("INPUT");
    radio.name = "group";
    radio.type = "radio";
    radio.id = opcion;
    radio.value = opcion;
    radio.className = clase;
    return radio;
}
//añade un radioGroup justo antes de un elemento con una clase determinada
function addRadioGroup(elementoAnterior, opciones, clase) {
    //creamos el grupo de radios
    for (let i = 0; i < opciones.length; i++) {
        //input radio
        let radio = crearRadio(opciones[i], clase)
        //label
        let label = crearLabel(opciones[i]);
        //lo insertamos antes del elemento elegido
        elementoAnterior.parentNode.insertBefore(radio, elementoAnterior);
        elementoAnterior.parentNode.insertBefore(label, radio);
    }
}
//añade un select con options antes de un elemento de una clase determinada
function addSelect(elementoAnterior, opciones, clase) {
    //creamos el select
    let select = document.createElement("SELECT");
    select.className = clase;
    //creamos las opciones
    for (let i = 0; i < opciones.length; i++) {
        let opcion = document.createElement("OPTION");
        opcion.value = opciones[i];
        // opcion.className = clase;
        opcion.innerHTML = opciones[i];
        select.appendChild(opcion);
    }
    //lo insertamos antes del elemento elegido
    elementoAnterior.parentNode.insertBefore(select, elementoAnterior);

}
//dado una coleccion de datos crea una tabla en el documento
function crearTabla(datos) {
    //limpiamos lo que hubiere antes
    cleanDatos();
    //creamos la tabla
    let tabla = document.createElement("TABLE");
    tabla.setAttribute("border", "1");
    //creo la cabecera de la tabla
    tabla.appendChild(crearCabeceraTabla(datos));
    //cuerpo de la tabla
    for (let i = 0; i < datos.length; i++) {
        //creamos las filas
        let fila = document.createElement("TR");
        //recorremos cada objeto y mostramos su información
        rellenaFila(datos, i, fila);
        //añadimos la fila a la tabla
        tabla.appendChild(fila);
    }
    //añadimos la tabla al documento
    document.getElementById("datos").appendChild(tabla);
}
//dado una coleccion de datos, una fila y la posicion, se rellena la fila
function rellenaFila(datos, posicionDatoActual, fila) {
    for (let info of Object.entries(datos[posicionDatoActual])) {

        fila.appendChild(crearCelda(info, datos[posicionDatoActual]));
    }
}
//con una lista de propiedades rellena las celda y la devuelve
//si son nombre les añade un lapiz.
//si son fecha les da formato
//usa las entradas para obtener el nombre de la Clase del objeto y usarlo como nombre de clase de celda
function crearCelda(propiedades, entradas) {

    let celda = document.createElement("TD");
    if (propiedades[0] == "nombre") {
        celda.id = "nombreCelda" + propiedades[1];
        // saca el tipo de clase
        celda.className = entradas.constructor.name;
        addLapizEdicion(celda);
    }
    if (propiedades[1] instanceof Date) {
        propiedades[1] = prettyDate(propiedades[1]);
    }
    //creamos texto
    let texto = document.createTextNode(propiedades[1]);
    //lo inserta aunque no exista i
    celda.insertBefore(texto, document.getElementById("i"));
    return celda;
}
//crea una cabecera de tabla con una lista de datos y la devuelve.
function crearCabeceraTabla(datos) {

    let cap = document.createElement("TR");
    //coge las keys del objeto
    for (let cabeceras of Object.keys(datos[0])) {
        let celda = document.createElement("TH");
        celda.innerHTML = cabeceras;
        cap.appendChild(celda);
    }
    return cap;
}
// introduce un texto en el contenedor con el id datos
function crearTexto(texto) {
    document.getElementById("datos").innerHTML = texto;
}
//adjunta un texto al contenedor con el id datos
function adjuntarTexto(texto) {
    let bloqueTexto = document.createElement("p");
    bloqueTexto.innerHTML = texto;
    document.getElementById("datos").appendChild(bloqueTexto);
}
//dada una fecha la muestra en formato dd/mm/aaaa
function prettyDate(fecha) {
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let year = fecha.getFullYear();

    return dia + "/" + mes + "/" + year;
}
//vacia el contenedor con el id datos de contenido
function cleanDatos() {
    document.getElementById("datos").innerHTML = "";
}
//dado un id le inserta los datos que se quieran
function updateDatosById(datos, id) {

    document.getElementById(id).innerHTML = datos;
}
//añade un icono de lapiz al campo deseado
function addLapizEdicion(campo) {

    let i = document.createElement("i");
    i.className = "fa fa-pencil";
    campo.appendChild(i);
}
