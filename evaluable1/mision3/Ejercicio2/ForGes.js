window.onload = () => {

    let f = crearFormulario("forGes");

    let inp = crearInputText("[a-z]", "nombre", "nombre y apellidos");
    f.appendChild(inp);

    let fecha = crearInputDate();
    f.appendChild(fecha);

    /*let labelFecha = crearLabel("Fecha",fecha.id);
    f.appendChild(labelFecha);*/

    let inputEmail = crearInputText("[a-z]", "email", "Correo electrónico");
    f.appendChild(inputEmail);

    let inputTel = crearInputText("[]", "tel", "Teléfono");
    f.appendChild(inputTel);

    let selectEdad = crearSelect(["niño", "adulto", "jubilado"], "Edad");
    f.appendChild(selectEdad);

    let check = crearCheckBox("Club de Ski");
    f.appendChild(check);

    let labelCheck = crearLabel(check.id, check.id);
    f.appendChild(labelCheck);

    //añadimos eventos
    check.onchange = datosClubSki;

}
function datosClubSki() {
    //para prevenir que se le de una y otra vez.
    this.disabled = true;

    let nSocio = crearInputText("[1-9]", "socio", "Número de socio");
    this.parentNode.appendChild(nSocio);
    createRadioGroup(["infantil", "juvenil", "senior"], "categoria", this.parentNode);
}
function crearFormulario(id) {
    let formulario = document.createElement("form");
    formulario.id = id;
    document.body.appendChild(formulario);
    return formulario;
}

function crearInputText(regExp, id, ph) {

    let input = document.createElement("INPUT");
    input.type = "text";
    input.id = id;
    input.placeholder = ph;
    input.pattern = regExp;
    return input;
}
function crearInputDate() {
    let input = document.createElement("INPUT");
    input.type = "date";
    input.id = "fecha";
    return input;
}

function crearLabel(forId, texto) {
    let label = document.createElement("LABEL");
    label.innerHTML = texto;
    label.setAttribute("for", forId);
    return label;
}
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
function crearCheckBox(option) {
    let check = document.createElement("INPUT");
    check.type = "checkbox";
    check.id = option;
    return check;
}

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

