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
    document.getElementById("verPacientes").onclick = mostrarPacientes;
    document.getElementById("nuevoPaciente").onclick = mostrarIngresoPaciente;
    document.getElementById("altaPaciente").onclick = mostrarAltaPaciente;
    document.getElementById("verPersonal").onclick = mostrarPersonal;
    document.getElementById("addPersonal").onclick= mostrarAltaPersonal;
    /*document.getElementById("asignarPaciente").onclick = mostrarAsignacionPaciente;
     document.getElementById("despedirPersonal").onclick = mostrarDespedirPersonal;*/

}

function ingresarPaciente() {
    let inputPaciente = document.getElementsByTagName("INPUT");
    let datosPaciente = [];
    for (let i = 0; i < inputPaciente.length; i++) {
        datosPaciente.push(inputPaciente[i].value);
    }
    let paciente = new Paciente(datosPaciente);
    hospitalK.ingresoPaciente(paciente);
  
    document.getElementById("numPacientes").innerHTML = hospitalK.nPacientes;
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
function altaPersonal(){

}

function ingresarDatos(tipoHumano){
    let inputDatos = document.getElementsByTagName("INPUT");
    let datosHumano = [];
    for (let i = 0; i < inputDatos.length; i++) {
        datosHumano.push(inputDatos[i].value);
    }
    if(tipoHumano==="Paciente"){
        let paciente = new Paciente(datosHumano);
        hospitalK.ingresoPaciente(paciente);
        document.getElementById("numPacientes").innerHTML = hospitalK.nPacientes;
    }else{
        let personal = new Personal(datosHumano);
        hospitalK.addPersonal(personal);
        document.getElementById("numPersonal").innerHTML = hospitalK.numeroPersonal;
        alert(hospitalK.personal[0].nombre +" "+hospitalK.personal[0].especialidad);
    }
  
    
}
/**FUNCIONES QUE SE DISPARAN CON EVENTOS */

function mostrarPacientes() {
   let pacientes = hospitalK.pacientes; 
   pacientes.length >0?crearTabla(pacientes):crearTexto("no hay pacientes");
}
function mostrarIngresoPaciente() {
   
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
    crearFormulario(["Nombre", "Apellidos",]);
    let botonAltaForm = document.getElementById("confirmacion");
    addRadioGroup(botonAltaForm,["mdico","enfermero","celador"]);

    botonAltaForm.onclick = ()=>{ingresarDatos("personal")};
}

function mostrarPersonal(){
    let personal = hospitalK.personal; 
   personal.length >0?crearTabla(personal):crearTexto("no hay personal");
}