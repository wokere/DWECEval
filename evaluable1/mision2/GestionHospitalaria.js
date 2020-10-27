"use strict"
window.onload = ()=>cargaDatos(hospitalK);

//Datos que no cambiarán
const NOMBREHOSPITAL = "Kanzene Hospital";
const LOCALIDADHOSPITAL = "Kanzene";
const RESPONSABLEHOSPITAL = "Carmencita Diego";
let hospitalK = new Hospital(NOMBREHOSPITAL, LOCALIDADHOSPITAL, RESPONSABLEHOSPITAL);

//inicio el hospital con el que se va a trabajar. De momento sin pacientes ni personal
function cargaDatos(hospital) {
    //muestro en el documento los datos del hospital y asigno los eventos
    document.getElementById("nombre").innerHTML = hospital.nombre;
    document.getElementById("direccion").innerHTML = hospital.responsable;
    document.getElementById("numPacientes").innerHTML = hospital.nPacientes;
    document.getElementById("numPersonal").innerHTML = hospital.numeroPersonal;
    //eventos

    //FALTAN LOS DE MODIFICAR LOS DATOS DE LOS USUARIOS
    document.getElementById("verPacientes").onclick = ()=>mostrarDatos(hospital.pacientes);
    document.getElementById("nuevoPaciente").onclick =()=> mostrarFormularioIngresoPaciente(hospital);
    document.getElementById("altaPaciente").onclick =() =>mostrarAltaPaciente(hospital);
    document.getElementById("verPersonal").onclick = ()=>mostrarDatos(hospital.personal);
    document.getElementById("addPersonal").onclick= ()=>mostrarAltaPersonal(hospital);
    document.getElementById("asignarPaciente").onclick = ()=> mostrarAsignacionPaciente(hospital);
    document.getElementById("despedirPersonal").onclick = ()=>mostrarDespidoPersonal(hospital);

}

function altaPaciente(hospital){
    //cojo el campo de búsqueda
    let inputPaciente = document.getElementsByTagName("INPUT")[0].value;
    // compruebo si existe el paciente
    let posicion = hospital.buscarHumano(inputPaciente, Paciente.name);
    if( posicion!== -1){
        //si existe le pongo una fecha de alta
        hospital.pacientes[posicion].fechaAlta(new Date());
        alert("Usuario dado de alta con éxito");
        document.getElementById("numPacientes").innerHTML = hospital.nPacientes;
   
    }else{
        //si no existe digo que no existe
        adjuntarTexto("el usuario No existe");
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
    console.log(hospital.pacientes[posicion].personalAsignado);
    console.log("opcion seleccionada"+ datosFormulario[1]);
    hospital.pacientes[posicion].personalAsignado = datosFormulario[1];
}
//aqui el despido del personal
function despidoPersonal(hospital){
    let inputNombre = document.getElementsByTagName("INPUT")[0].value;
    //y lo borro
    if(hospital.buscarHumano(inputNombre,Personal.name) !== -1){
        hospital.borrarHumano(inputNombre,Personal.name)
        adjuntarTexto("Se ha enviado el despido al trabajador");
        document.getElementById("numPersonal").innerHTML = hospital.numeroPersonal; 
    }else{
        adjuntarTexto("no hay trabajadores con ese nombre");
    }
}

function ingresarDatos(tipoHumano, clase,hospital){
    let datosHumano = obtenerDatosFormulario(clase);
    let humano = (tipoHumano === Paciente.name) ? new Paciente(datosHumano): new Personal(datosHumano);
    hospital.addHuman(humano);
    //actualizo los datos en el html
    document.getElementById("numPacientes").innerHTML = hospital.nPacientes;
    document.getElementById("numPersonal").innerHTML = hospital.numeroPersonal;   
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
        //guardo los valores
        datosHumano.push(inputDatos[i].value);
    }
    return datosHumano;
}

/**FUNCIONES QUE SE DISPARAN CON EVENTOS */

function mostrarDatos(datos){
    datos.length >0?crearTabla(datos):crearTexto("no hay datos");
}
function mostrarFormularioIngresoPaciente(hospital) {
    let datosPersonal = hospitalK.nombresPersonal;
    let clase = "ingresoPaciente";
    let funcion = ()=>{ingresarDatos(Paciente.name,clase,hospital)};
    crearFormulario(["nombre", "apellidos", "edad", "enfermedad"],clase,funcion);
    let botonAltaForm = document.getElementById("confirmacion");
    addSelect(botonAltaForm,datosPersonal,clase);      
}

function mostrarAltaPersonal(hospital){
    let clase = "altaPersonal";
    let funcion = ()=>{ingresarDatos(Personal.name,clase,hospital)};
    crearFormulario(["Nombre", "Apellidos","Edad"],clase,funcion);
    let botonAltaForm = document.getElementById("confirmacion");
    
    addRadioGroup(botonAltaForm,Personal.tiposEspecialidad(),clase);
}
function mostrarAltaPaciente(hospital){
    crearFormulario(["Nombre"],"altaPaciente",()=>altaPaciente(hospital));
}

function mostrarDespidoPersonal(hospital){
    crearFormulario(["Nombre"],"despidoPersonal",()=>despidoPersonal(hospital));
   
}
function mostrarAsignacionPaciente(hospital){

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
        adjuntarTexto("No se encuentra");
    }
}

    
