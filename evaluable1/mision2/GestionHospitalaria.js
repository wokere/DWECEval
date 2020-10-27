"use strict"

//Datos que no cambiarán
const NOMBREHOSPITAL = "Kanzene Hospital";
const LOCALIDADHOSPITAL = "Kanzene";
const RESPONSABLEHOSPITAL = "Carmencita Diego";
let hospitalK = new Hospital(NOMBREHOSPITAL, LOCALIDADHOSPITAL, RESPONSABLEHOSPITAL);
 window.onload = ()=>cargaDatos(hospitalK);

//inicio el hospital con el que se va a trabajar. De momento sin pacientes ni personal
function cargaDatos(hospital) {
    //muestro en el documento los datos del hospital y asigno los eventos
    updateDatosById(hospital.nombre,"nombre");
    updateDatosById(hospital.responsable, "direccion");
    updateDatosById(hospital.nPacientes, "numPacientes");
    updateDatosById(hospital.numeroPersonal,"numPersonal");

    //eventos

    //FALTAN LOS DE MODIFICAR LOS DATOS DE LOS USUARIOS
    document.getElementById("verPacientes").onclick = ()=>mostrarDatos(hospital.pacientes);
    document.getElementById("nuevoPaciente").onclick =()=> mostrarFormularioIngresoPaciente(hospital);
    document.getElementById("altaPaciente").onclick =() =>mostrarFormularioAltaPaciente(hospital);
    document.getElementById("verPersonal").onclick = ()=>mostrarDatos(hospital.personal);
    document.getElementById("addPersonal").onclick= ()=>mostrarFormularioAltaPersonal(hospital);
    document.getElementById("asignarPaciente").onclick = ()=> mostrarFormularioAsignacionPaciente(hospital);
    document.getElementById("despedirPersonal").onclick = ()=>mostrarFormularioDespidoPersonal(hospital);

}

function altaPaciente(hospital){

   let posicionPaciente = buscarDesdeInput(Paciente.name,hospital);
    if( posicionPaciente!== -1){
        //si existe le pongo una fecha de alta
        hospital.pacientes[posicionPaciente].fechaAlta(new Date());
        alert("Usuario dado de alta con éxito");
        updateDatosById(hospital.nPacientes,"numPacientes");
        mostrarDatos(hospital.pacientes);
    }else{
        //si no existe digo que no existe
        alert("el usuario No existe");
    }
    
}
function buscarDesdeInput(tipo,hospital){
    let input = document.getElementsByTagName("INPUT")[0].value;
    // compruebo si existe
    return hospital.buscarHumano(input, tipo) ;
}
//aqui la reasignacion
function reAsignarPersonal(clase,posicion,hospital){
    //cojo el nombre del paciente y el nombre seleccionado
    let datosFormulario = obtenerDatosFormulario(clase);
    hospital.pacientes[posicion].personalAsignado = datosFormulario[1];
    alert("reasignacion realizada");
    mostrarDatos(hospital.pacientes);
    
}
//aqui el despido del personal
function despidoPersonal(hospital){
    let inputNombre = document.getElementsByTagName("INPUT")[0].value;
    //y lo borro
    if(hospital.buscarHumano(inputNombre,Personal.name) !== -1){
        hospital.borrarHumano(inputNombre,Personal.name)
        adjuntarTexto("Se ha enviado el despido al trabajador");
        updateDatosById(hospital.numeroPersonal,"numPersonal"); 
    }else{
        alert("no hay trabajadores con ese nombre");
        mostrarDatos(hospital.personal);
    }
}


function ingresarDatos(tipoHumano, clase,hospital){
    let datosHumano = obtenerDatosFormulario(clase);
    let humano = (tipoHumano === Paciente.name) ? new Paciente(datosHumano): new Personal(datosHumano);
    hospital.addHuman(humano);
    //actualizo los datos en el html
    updateDatosById(hospital.nPacientes,"numPacientes");
    updateDatosById(hospital.numeroPersonal,"numPersonal");  
    alert("Añadido");
    cleanDatos();
    
}
function obtenerDatosFormulario(clase){
    let inputDatos = document.getElementsByClassName(clase);
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

function mostrarDatos(datos){
    datos.length >0?crearTabla(datos,editarNombre):crearTexto("no hay datos");
    
}
function editarNombre(){
    let oldName=this.parentNode.innerText;
    let newName = prompt("Nuevo nombre",this.parentNode.innerText);
    this.parentNode.innerText = newName;   
    //modificar el objeto
    hospitalK.editarPorNombre(oldName,newName,this.className);
    
}

function mostrarFormularioIngresoPaciente(hospital) {
    let datosPersonal = hospital.nombresPersonal;
    let clase = "ingresoPaciente";
    let funcion = ()=>{ingresarDatos(Paciente.name,clase,hospital)};
    crearFormulario(["nombre", "apellidos", "edad", "enfermedad"],clase,funcion);
    let botonAltaForm = document.getElementById("confirmacion");
    addSelect(botonAltaForm,datosPersonal,clase);      
}

function mostrarFormularioAltaPersonal(hospital){
    let clase = "altaPersonal";
    let funcion = ()=>{ingresarDatos(Personal.name,clase,hospital)};
    crearFormulario(["Nombre", "Apellidos","Edad"],clase,funcion);
    let botonAltaForm = document.getElementById("confirmacion");
    
    addRadioGroup(botonAltaForm,Personal.tiposEspecialidad(),clase);
}
function mostrarFormularioAltaPaciente(hospital){
    crearFormulario(["Nombre"],"altaPaciente",()=>altaPaciente(hospital));
}

function mostrarFormularioDespidoPersonal(hospital){
    crearFormulario(["Nombre"],"despidoPersonal",()=>despidoPersonal(hospital));
   
}
function mostrarFormularioAsignacionPaciente(hospital){

    let funcion = ()=>activarSeleccion("asignarPersonal",botonAltaPaciente,hospital);
    crearFormulario(["Nombre"],"asignarPersonal",funcion);
    let botonAltaPaciente = document.getElementById("confirmacion");
}

function activarSeleccion(clase,elemento,hospital){
    let posicion = buscarDesdeInput(Paciente.name,hospital);
    if(posicion !== -1){
        addSelect(elemento,hospital.nombresPersonal,clase);
        elemento.onclick = ()=>reAsignarPersonal(clase,posicion,hospital);
    }else{
        alert("No se encuentra");
    }
}

    
