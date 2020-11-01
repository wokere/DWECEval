function crearParrafo(texto) {

    let parrafo = document.createElement("P");
    parrafo.innerHTML = texto;
    return parrafo;

}

//crea un label pasandole el campo for y el texto
//y lo devuelve
function crearLabel(forId, texto) {
    let label = document.createElement("LABEL");
    label.innerHTML = texto;
    label.setAttribute("for", forId);
    return label;
}

//crea el input tipo texto con su expresionRegular, id, placeHolder, si es obligatorio y un titulo y lo devuelve
function crearInputText(regExp, id) {

    let input = document.createElement("INPUT");
    input.type = "text";
    input.id = id;
    input.className = id;
    input.setAttribute("regexp", regExp);

    return input;
}

function crearSubmit(evento, clase) {
    let boton = document.createElement("button");
    boton.onclick = evento;
    boton.innerHTML = "Validar";
    boton.className = clase;
    return boton;
}

function crearImagen(ruta, alt, clase) {
    let img = document.createElement("img");
    img.src = ruta;
    img.alt = alt;
    img.className = clase;
    return img;
}

function crearConjunto(regExp, evento, clase, texto) {

    let parrafo = crearParrafo(texto);
    document.body.appendChild(parrafo);
    let input = crearInputText(regExp, clase);
    let label = crearLabel(clase, clase);
    let boton = crearSubmit(evento, clase);

    document.body.appendChild(label);
    document.body.appendChild(input);
    document.body.appendChild(boton);

}
function addImageBefore(donde, imagen) {
    cleanImg(donde);
    donde.parentNode.insertBefore(imagen, donde);
}

function hayImagen(coleccion) {
    for (let i = 0; i < coleccion.length; i++) {
        if (coleccion[i].tagName == "IMG") {
            return i;
        }
    }
    return -1;
}

function cleanImg(donde) {

    let claseCompartida = document.getElementsByClassName(donde.className);
    let posicion = hayImagen(claseCompartida);
    if (posicion !== -1) {
        donde.parentNode.removeChild(claseCompartida[1]);
    }

}
function validarEnvio() {

    let datos = document.getElementsByClassName(this.className);
    let regExpInput = new RegExp(datos[0].getAttribute("regexp"));
    let esValido = regExpInput.test(datos[0].value);
    let imgValidacion;
    if (esValido) {
        imgValidacion = crearImagen("tick.png", "valido", this.className);
    } else {
        imgValidacion = crearImagen("wrong.png", "no válido", this.className);
    }
    addImageBefore(this, imgValidacion);
}

function inicio() {
    let texto = "Fecha y hora de creación: en formato dd/mm/aaaa hh:mm";
    crearConjunto("[a-z]", validarEnvio, "fecha", texto);

    let textCocinero = "Nombre en clave formado por dos letras en mayuscula, un simbolo y 4 dígitos";
    crearConjunto("[a-z]", validarEnvio, "Cocinero", textCocinero);

    let textDestino = "Destino formado por dos/tres letras mayúsculas, un guión bajo, el nombre de la ciudad en Minúsculas," +
        " dos puntos y el codigo de distrito de 4 dígitos.";
    crearConjunto("[a-z]", validarEnvio, "Destino", textDestino);

    let textGramos = "Entre 1000 y 5000";
    crearConjunto("[a-z]", validarEnvio, "Gramos", textGramos);

    let textCompos = "Cantidad en gramos seguida de dos conjuntos de una o dos letras seguidas o no de numero";
    crearConjunto("[a-z]", validarEnvio, "Composicion", textCompos);
}

window.onload = inicio;