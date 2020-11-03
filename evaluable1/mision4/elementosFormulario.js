"use strict"

//crea el input tipo texto con su expresionRegular, className, placeHolder, si es obligatorio y un titulo y lo devuelve
function crearInputText(regExp, clase,placeHolder) {

    let input = document.createElement("INPUT");
    input.type = "text";
    input.className = clase;
    input.placeholder=placeHolder;
    input.setAttribute("regexp", regExp);

    return input;
}
//crea un submit con un evento y una clase y lo deuelve
function crearSubmit(clase) {
    let boton = document.createElement("input");
    boton.type="submit";
    boton.value = "Validar";
    boton.className = clase;
    return boton;
}


function crearFormulario(elementos) {

    let f =document.createElement("form");
    f.className="virus";
    for(let i=0;i<elementos.length;i++){
        f.appendChild(elementos[i]);
    }
    return f;

}
function insertTextSiNoCumple(text,elementoInput,minimo){
    console.log(elementoInput.length);
    if(elementoInput.value.length<minimo){
        
        elementoInput.value = text;
    }
}

//manejador de los botones. Coge los datos por la clase del elemento en el que se ha hecho clic 
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
    if(valido){
        
        alert("Todo correcto!");
    }
    return valido;
   
}