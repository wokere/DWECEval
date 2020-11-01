window.onload = () => {
    //creamos el formulario y sus elementos inciales
    let f = crearFormulario("forGes");
    
    f.appendChild(crearSubmit());

    let regExID = "[a-zA-Z]{1}\\d{8}[a-zA-Z]{1}";
    let identificador = crearInputText(regExID, "identificador", "Identificador", true, "1 letra, 8 cifras y 1 letra. Obligatorio");
    f.appendChild(identificador);

    let regExName = "[a-zA-Z|' ']{1,50}";
    let inp = crearInputText(regExName, "nombre", "nombre y apellidos", true, "Máximo 50 Caracteres");
    f.appendChild(inp);

    let fecha = crearInputDate();
    f.appendChild(fecha);

    /*let labelFecha = crearLabel("Fecha",fecha.id);
    f.appendChild(labelFecha);*/

    let regExMail = "[^@]{1,20}@{1}[a-zA-Z]{1,20}\.{1}[a-zA-Z]{2,3}";
    let inputEmail = crearInputText(regExMail, "email", "Correo electrónico", false, "Email válido");
    f.appendChild(inputEmail);

    let regExTel = "\\+\\d{2,3}-\\d{9}";
    let inputTel = crearInputText(regExTel, "tel", "Teléfono", false, "+pais-telefono");
    f.appendChild(inputTel);

    let selectEdad = crearSelect(["niño", "adulto", "jubilado"], "Edad");
    f.appendChild(selectEdad);

    let check = crearCheckBox("Club de Ski");
    f.appendChild(check);

    let labelCheck = crearLabel(check.id, check.id);
    f.appendChild(labelCheck);

    //añadimos eventos
    check.onchange = datosClubSki;
    f.onsubmit = validarFormulario;

}
//valida el formulario. Limpia los textos de error antes de revisarlos de nuevo
function validarFormulario() {
    //limpiar los avisos anteriores!!
   emptySpans();
    let camposAValidar = document.getElementsByTagName("input");
    let valido = true;
    //comprobar que cumpla todo lo que dice cada campo input text y date
    for (let i = 0; i < camposAValidar.length; i++) {
        if (camposAValidar[i].type =="text" || camposAValidar[i].type =="date") {
           //si no se validan se cambia el color a rojo y se añade el mensaje de ayuda
            if (!validarInputText(camposAValidar[i].id, camposAValidar[i].getAttribute("regexp"), camposAValidar[i].getAttribute("obligatorio"))) {
                let span = document.createElement("span");
                camposAValidar[i].style.borderColor = "red";
                span.innerHTML = camposAValidar[i].title;
                span.style.color = "red";
                camposAValidar[i].parentNode.insertBefore(span, camposAValidar[i]);
                valido = false;
            }else{
                //si esta bien quitamos el atributo style
                camposAValidar[i].removeAttribute("style");
            }
        }
    }
    //devuelve si es valido o no
    return valido;

}
//saca los datos del club de ski
function datosClubSki() {
    //para prevenir que se le de una y otra vez.
    this.disabled = true;
    let regExSocio = "[1-9][0-9]{4}";
    let nSocio = crearInputText(regExSocio, "socio", "Número de socio", false, "Tu numero de socio de 5 cifras");
    //cambiar donde se adjuntan
    this.parentNode.appendChild(nSocio);
    createRadioGroup(["infantil", "juvenil", "senior"], "categoria", this.parentNode);
}
//crea el formulario con la id indicada  y lo devuelve
function crearFormulario(id) {
    let formulario = document.createElement("form");
    formulario.id = id;
    formulario.action = "validado.php"
    document.body.appendChild(formulario);
    return formulario;
}
//crea el input tipo texto con su expresionRegular, id, placeHolder, si es obligatorio y un titulo y lo devuelve
function crearInputText(regExp, id, ph, requerido, titulo) {

    let input = document.createElement("INPUT");
    input.title = titulo;
    input.type = "text";
    input.id = id;
    input.placeholder = ph;
    input.setAttribute("regexp", regExp);
    input.setAttribute("obligatorio", requerido);

    return input;
}
//crea el input tipo date y lo devuelve
function crearInputDate() {
    let input = document.createElement("INPUT");
    input.type = "date";
    input.id = "fecha";
    input.title = "dd/mm/aaaa"
    input.setAttribute("regexp", "\\d{4}\-\\d{1,2}\-\\d{1,2}");
    input.setAttribute("obligatorio", true);
    return input;
}
//crea un label pasandole el campo for y el texto
//y lo devuelve
function crearLabel(forId, texto) {
    let label = document.createElement("LABEL");
    label.innerHTML = texto;
    label.setAttribute("for", forId);
    return label;
}
//crea el select con las opciones. A modo de placeholder se añade como opcion seleccionada y deshabilitada
//y si, lo devuelve
function crearSelect(options, placeholder) {
    let select = document.createElement("SELECT");
    let optionPH = document.createElement("option");
    optionPH.text = placeholder;
    optionPH.disabled = true;
    select.add(optionPH);
    for (let i = 0; i < options.length; i++) {
        let option = document.createElement("option");
        option.text = options[i];
        option.value = options[i];
        select.add(option);
    }
    select.selectedIndex = 0;
    return select;
}
//crea el checkbox con la opcion pasada y lo devuelve
function crearCheckBox(option) {
    let check = document.createElement("INPUT");
    check.type = "checkbox";
    check.id = option;
    return check;
}
//crea el grupo de radios asociados a un nombre  y lo inserta en el
//elemento que se le dice.
//no devuelve nada xD
function createRadioGroup(options, name, parent) {
    for (let i = 0; i < options.length; i++) {

        let radioTemp = document.createElement("input");
        radioTemp.type = "radio";
        radioTemp.value = options[i];
        radioTemp.id = options[i];
        radioTemp.name = name;

        let label = crearLabel(options[i], radioTemp.id);

        parent.appendChild(radioTemp);
        parent.appendChild(label);

    }
}
//crea el submit
function crearSubmit() {
    let boton = document.createElement("input");
    boton.type = "submit";
    return boton;
}
//valida los input tipo texto en funcion de si son obligatorios o no 
//pasandoles su expresion regular . Devuelve true o false
function validarInputText(id, regExp, obligatorio) {

    let regExpInput = new RegExp(regExp);

    if (obligatorio) {

        return regExpInput.test(document.getElementById(id).value);

    } else {
        //si no es obligatorio y no hay nada escrito es valido
        return document.getElementById(id).value.length > 0 ? regExpInput.test(document.getElementById(id).value) : true;
    }
}
//vacia los spans, porque cuando lo hacia con el parentNode.. removeChild no lo hacia.
function emptySpans() {
    let spans = document.getElementsByTagName("SPAN");
    if (spans.length > 0) {
        for (let i = 0; i < spans.length; i++) {
            spans[i].innerHTML="";
            
        }
    }
}




