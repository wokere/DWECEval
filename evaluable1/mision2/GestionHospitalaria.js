"use strict"
window.onload = cargaDatos;

//Datos que no cambiarán
const NOMBREHOSPITAL = "Kanzene Hospital";
const LOCALIDADHOSPITAL = "Kanzene";
const RESPONSABLEHOSPITAL = "Carmencita Diego";
let hospitalK = new Hospital(NOMBREHOSPITAL, LOCALIDADHOSPITAL, RESPONSABLEHOSPITAL);
//inicio el hospital con el que se va a trabajar. De momento sin pacientes ni personal
function cargaDatos() {
    //muestro en el documento los datos del hospital y asigno los eventos
    document.getElementById("nombre").innerHTML = hospitalK.nombre;
    document.getElementById("direccion").innerHTML = hospitalK.responsable;
    document.getElementById("numPacientes").innerHTML = hospitalK.nPacientes;
    document.getElementById("numPersonal").innerHTML = hospitalK.numeroPersonal;
    //eventos
    document.getElementById("verPacientes").onclick = mostrarDatos;
    document.getElementById("nuevoPaciente").onclick = mostrarFormularioIngresoPaciente;
    document.getElementById("altaPaciente").onclick = mostrarAltaPaciente;
    document.getElementById("verPersonal").onclick = mostrarDatos;
    document.getElementById("addPersonal").onclick= mostrarAltaPersonal;
    /*document.getElementById("asignarPaciente").onclick = mostrarAsignacionPaciente;
     document.getElementById("despedirPersonal").onclick = mostrarDespedirPersonal;*/

}

function altaPaciente(){
    //cojo el campo de búsqueda
    let inputPaciente = document.getElementsByTagName("INPUT")[0].value;
    // compruebo si existe el paciente
    let posicion = hospitalK.buscarPaciente(inputPaciente);
    if( posicion!== -1){
        //si existe le pongo una fecha de alta
        hospitalK.pacientes[posicion].fechaAlta(new Date());
        alert("Usuario dado de alta con éxito");
    }else{
        //si no existe digo que no existe
        adjuntarTexto("el usuario No existe");
    }
    
}
//aqui el despido del personal
function despidoPersonal(){

}

function ingresarDatos(tipoHumano){
    let datosHumano = obtenerDatos();
    let humano = tipoHumano ==="Paciente" ? new Paciente(datosHumano): new Personal(datosHumano);
    hospitalK.addHuman(humano);
    //actualizo los datos en el html
    document.getElementById("numPacientes").innerHTML = hospitalK.nPacientes;
    document.getElementById("numPersonal").innerHTML = hospitalK.numeroPersonal;   
}
function obtenerDatos(){
    let inputDatos = document.getElementsByTagName("INPUT");
    let datosHumano = [];
    for (let i = 0; i < inputDatos.length; i++) {
        //si es de radio selecciono solo el escogido
        if(inputDatos[i].type == "radio" && !inputDatos[i].checked){
            continue;
        }
        //guardo los valores
        datosHumano.push(inputDatos[i].value);

    }
    return datosHumano;
}

/**FUNCIONES QUE SE DISPARAN CON EVENTOS */

function mostrarDatos(){
    let datos = this.id =="verPersonal" ?  hospitalK.personal : hospitalK.pacientes;
    datos.length >0?crearTabla(datos):crearTexto("no hay datos");
}
function mostrarFormularioIngresoPaciente() {
   
    crearFormulario(["nombre", "apellidos", "edad", "enfermedad"]);
    let botonAltaForm = document.getElementById("confirmacion");
    botonAltaForm.onclick = ()=>{ingresarDatos("Paciente")};
    
}
function mostrarAltaPaciente(){
    crearFormulario(["Nombre"]);
    let botonAltaPaciente = document.getElementById("confirmacion");
    botonAltaPaciente.onclick = altaPaciente;

}
function mostrarAltaPersonal(){

    crearFormulario(["Nombre", "Apellidos","Edad"]);
    let botonAltaForm = document.getElementById("confirmacion");
    addRadioGroup(botonAltaForm,["mdico","enfermero","celador"]);

    botonAltaForm.onclick = ()=>{ingresarDatos("Personal")};
}

