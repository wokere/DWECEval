//dado un texto devuelve un elemeto parrafo
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

//crea el input tipo texto con su expresionRegular, className, placeHolder, si es obligatorio y un titulo y lo devuelve
function crearInputText(regExp, clase) {

    let input = document.createElement("INPUT");
    input.type = "text";
    input.className = clase;
    input.setAttribute("regexp", regExp);

    return input;
}
//crea un submit con un evento y una clase y lo deuelve
function crearSubmit(evento, clase) {
    let boton = document.createElement("button");
    boton.onclick = evento;
    boton.innerHTML = "Validar";
    boton.className = clase;
    return boton;
}
//crea y devuelve una imagen a partir de una ruta, un texto alternativa y una clase
function crearImagen(ruta, alt, clase) {
    let img = document.createElement("img");
    img.src = ruta;
    img.alt = alt;
    img.className = clase;
    return img;
}
//Dada una expresion, un evento una clase y un texto crea un conjunto de
//elementos identificados por la clase
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
//añade una imagen ANTES del lugar que se le indica
//limpia cualquier otra que hubiera en ese segmento
function addImageBefore(donde, imagen) {
    cleanImg(donde);
    donde.parentNode.insertBefore(imagen, donde);
}
//recorre una coleccion de elementos y busca si hay alguna imagen.
//devuelve su posicion o -1 si no la encuentra. Devuelve solo la primera ocurrencia.
function hayImagen(coleccion) {
    for (let i = 0; i < coleccion.length; i++) {
        if (coleccion[i].tagName == "IMG") {
            return i;
        }
    }
    return -1;
}
// A partir de un elemento coge todos los de la misma clase , busca si hay alguna imagen y borra 
//la posicion de la misma.
function cleanImg(donde) {

    let claseCompartida = document.getElementsByClassName(donde.className);
    let posicion = hayImagen(claseCompartida);
    if (posicion !== -1) {
        donde.parentNode.removeChild(claseCompartida[1]);
    }
}

//manejador de los botones. Coge los datos por la clase del elemento en el que se ha hecho clic 
//y tras comprobar si cumple el input con la expresión regular crea una imagen u otra
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

    //si, deberia haber cuadrado mas con que el mes no fuera mas de 12, la hora no mas de 23,... 
    let regExpDate = "^(\\d{2}\\/\\d{2}\\/\\d{4}[' ']\\d{2}[:]\\d{2})$"
    let texto = "Fecha y hora de creación: en formato dd/mm/aaaa hh:mm";
    crearConjunto(regExpDate, validarEnvio, "fecha", texto);

    let regExpCook = "^([A-Z]{2}\\W\\d{4})$";
    let textCocinero = "Nombre en clave formado por dos letras en mayuscula, un simbolo y 4 dígitos";
    crearConjunto(regExpCook, validarEnvio, "Cocinero", textCocinero);

    let regExpDest = "^([A-Z]{2,3}\\_[a-z]+\\:\\d{4})$";
    let textDestino = "Destino formado por dos/tres letras mayúsculas, un guión bajo, el nombre de la ciudad en Minúsculas," +
        " dos puntos y el codigo de distrito de 4 dígitos.";
    crearConjunto(regExpDest, validarEnvio, "Destino", textDestino);

    let regExpGram = "^([1-4]\\d{3})|([5][0]{3})$";
    let textGramos = "Entre 1000 y 5000";
    crearConjunto(regExpGram, validarEnvio, "Gramos", textGramos);

    let regExCompos ="^(\\d+\\g([a-zA-Z]{1,2}\\d?){1,2})$";
    let textCompos = "Cantidad en gramos seguida de dos conjuntos de una o dos letras seguidas o no de numero";
    crearConjunto(regExCompos, validarEnvio, "Composicion", textCompos);
}

window.onload = inicio;