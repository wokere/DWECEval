"use strict"

//crea el input tipo texto con su expresionRegular, className, placeHolder, y lo devuelve
function crearInputText(regExp, clase,placeHolder) {

    let input = document.createElement("INPUT");
    input.type = "text";
    input.className = clase;
    input.placeholder=placeHolder;
    input.setAttribute("regexp", regExp);

    return input;
}
//crea un submit con una clase y lo deuelve
function crearSubmit(clase) {
    let boton = document.createElement("input");
    boton.type="submit";
    boton.value = "Validar";
    boton.className = clase;
    return boton;
}

//a partir de un array de elementos , crea el formulario y sus componentes.
function crearFormulario(elementos) {

    let f =document.createElement("form");
    f.className="virus";
    f.action="exito.html";
    f.target="_parent";
    for(let i=0;i<elementos.length;i++){
        f.appendChild(elementos[i]);
    }
    return f;

}
//si no cumple un minimo inserta al elemento input un texto 
function insertTextSiNoCumple(text,elementoInput,minimo){
    console.log(elementoInput.length);
    if(elementoInput.value.length<minimo){
        
        elementoInput.value = text;
    }
}

//manejador de los botones. Coge los datos del formulario
//y tras comprobar si cumple el input con la expresión regular pone el borde verde  o rojo. Si todo
//esta bien manda una alerta 
function validarEnvio() {
   
    let datos = document.getElementsByClassName(this.className);
    let valido =true;
    for(let i=0;i<datos.length;i++){

        if(datos[i].type == "text"){
            
            let regExpInput = new RegExp(datos[i].getAttribute("regexp"));
            let esValido = regExpInput.test(datos[i].value);
            if (esValido) {
           
                datos[i].style.borderColor="green";
                
            } else {

                datos[i].style.borderColor="red";
                valido =false;

            }
        }

    }

    return valido;
   
}