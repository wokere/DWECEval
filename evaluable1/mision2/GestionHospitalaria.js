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
    document.getElementById("asignarPaciente").onclick = mostrarAsignacionPaciente;
     document.getElementById("despedirPersonal").onclick = mostrarDespidoPersonal;

}

function altaPaciente(){
    //cojo el campo de búsqueda
    let inputPaciente = document.getElementsByTagName("INPUT")[0].value;
    // compruebo si existe el paciente
    let posicion = hospitalK.buscarHumano(inputPaciente, Paciente.name);
    if( posicion!== -1){
        //si existe le pongo una fecha de alta
        hospitalK.pacientes[posicion].fechaAlta(new Date());
        alert("Usuario dado de alta con éxito");
        document.getElementById("numPacientes").innerHTML = hospitalK.nPacientes;
   
    }else{
        //si no existe digo que no existe
        adjuntarTexto("el usuario No existe");
    }
    
}
function buscarDesdeInput(tipo){
    let input = document.getElementsByTagName("INPUT")[0].value;
    // compruebo si existe
    return (hospitalK.buscarHumano(input, tipo) )!== -1 ? true:false;
}
//aqui la reasignacion
function reAsignarPersonal(){
    let inputPaciente = document.getElementsByTagName("INPUT")[0].value;
    // compruebo si existe el paciente
    let posicion = hospitalK.buscarHumano(inputPaciente, Paciente.name);
    if (posicion !== -1){
        //saco el select para reasignar
        addSelect()
    }else{
        adjuntarTexto("el Paciente no existe");
    }
}
//aqui el despido del personal
function despidoPersonal(){
    let inputNombre = document.getElementsByTagName("INPUT")[0].value;
    //y lo borro
    if(hospitalK.buscarHumano(inputNombre,Personal.name) !== -1){
        hospitalK.borrarHumano(inputNombre,Personal.name)
        adjuntarTexto("Se ha enviado el despido al trabajador");
        document.getElementById("numPersonal").innerHTML = hospitalK.numeroPersonal; 
    }else{
        adjuntarTexto("no hay trabajadores con ese nombre");
    }
}

function ingresarDatos(tipoHumano, clase){
    let datosHumano = obtenerDatosFormulario(clase);
    let humano = (tipoHumano === Paciente.name) ? new Paciente(datosHumano): new Personal(datosHumano);
    hospitalK.addHuman(humano);
    //actualizo los datos en el html
    document.getElementById("numPacientes").innerHTML = hospitalK.nPacientes;
    document.getElementById("numPersonal").innerHTML = hospitalK.numeroPersonal;   
}
function obtenerDatosFormulario(clase){
    let inputDatos = document.getElementsByClassName(clase);
    console.log(inputDatos.innerHTML);
    let datosHumano = [];
    for (let i = 0; i < inputDatos.length; i++) {
        //si es de radio selecciono solo el escogido
        if(inputDatos[i].type == "radio" && !inputDatos[i].checked){
            continue;
        }
        //lo mismo con las option no cogidas
        if(inputDatos[i].type == "option" && !inputDatos[i].selected){
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
    let clase = "ingresoPaciente";
    crearFormulario(["nombre", "apellidos", "edad", "enfermedad"],clase);
    let botonAltaForm = document.getElementById("confirmacion");
    addSelect(botonAltaForm,hospitalK.nombresPersonal,clase);
    
    botonAltaForm.onclick = ()=>{ingresarDatos(Paciente.name,clase)};
       
}

function mostrarAltaPersonal(){
    let clase = "altaPersonal";
    crearFormulario(["Nombre", "Apellidos","Edad"],clase);
    let botonAltaForm = document.getElementById("confirmacion");
    
    addRadioGroup(botonAltaForm,Personal.tiposEspecialidad(),clase);

    botonAltaForm.onclick = ()=>{ingresarDatos(Personal.name,clase)};
}
function mostrarAltaPaciente(){
    crearFormulario(["Nombre"],"altaPaciente");
    let botonAltaPaciente = document.getElementById("confirmacion");
    botonAltaPaciente.onclick = altaPaciente;

}
function mostrarDespidoPersonal(){
    crearFormulario(["Nombre"],"despidoPersonal");
    let botonDespido = document.getElementById("confirmacion");
    botonDespido.onclick = despidoPersonal;
}
function mostrarAsignacionPaciente(){
    //busco por nombre al paciente (crear función!!)
    crearFormulario(["Nombre"],"asignarPersonal");
    let botonAltaPaciente = document.getElementById("confirmacion");
    botonAltaPaciente.onclick = ()=>{
        if(buscarDesdeInput(Paciente.name)){
            addSelect(botonAltaPaciente,hospitalK.nombresPersonal,"asignarPersonal");
            botonAltaPaciente.onclick = reAsignarPersonal;
        }else{
            adjuntarTexto("el Paciente no existe");
        }
    }
}


