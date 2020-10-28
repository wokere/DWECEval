"use strict"

//inicio el hospital con el que se va a trabajar. De momento sin pacientes ni personal
class GestionHospital {
    //meter aqui el manejo de elemetos?
    constructor(hospitalAGestionar) {

        this.hospital = hospitalAGestionar;
        
    }
    lanzarGestion(){
    updateDatosById(this.hospital.nombre, "nombre");
    updateDatosById(this.hospital.responsable, "direccion");
    updateDatosById(this.hospital.nPacientes, "numPacientes");
    updateDatosById(this.hospital.numeroPersonal, "numPersonal");

    document.getElementById("verPacientes").onclick = () => this.mostrarDatos(this.hospital.pacientes);
    document.getElementById("nuevoPaciente").onclick = () => this.mostrarFormularioIngresoPaciente();
    document.getElementById("altaPaciente").onclick = () => this.mostrarFormularioAltaPaciente();
    document.getElementById("verPersonal").onclick = () => this.mostrarDatos(this.hospital.personal);
    document.getElementById("addPersonal").onclick = () => this.mostrarFormularioAltaPersonal();
    document.getElementById("asignarPaciente").onclick = () => this.mostrarFormularioAsignacionPaciente();
    document.getElementById("despedirPersonal").onclick = () => this.mostrarFormularioDespidoPersonal();
    }
    buscarDesdeInput(tipo) {
        let input = document.getElementsByTagName("INPUT")[0].value;
        // compruebo si existe
        return this.hospital.buscarHumano(input, tipo);
    }
    //aqui la reasignacion
    reAsignarPersonal(clase, posicion) {
        //cojo el nombre del paciente y el nombre seleccionado
        let datosFormulario = this.obtenerDatosFormulario(clase);
        this.hospital.pacientes[posicion].personalAsignado = datosFormulario[1];
        alert("reasignacion realizada");
        this.mostrarDatos(this.hospital.pacientes);
    }

    ingresarDatos(tipoHumano, clase) {
        let datosHumano = this.obtenerDatosFormulario(clase);
        let humano = (tipoHumano === Paciente.name) ? new Paciente(datosHumano) : new Personal(datosHumano);
        this.hospital.addHuman(humano);
        //actualizo los datos en el html
        updateDatosById(this.hospital.nPacientes, "numPacientes");
        updateDatosById(this.hospital.numeroPersonal, "numPersonal");
        alert("Añadido");
        cleanDatos();

    }
    //esto gestiona elementos...
    obtenerDatosFormulario(clase) {
        let inputDatos = document.getElementsByClassName(clase);
        let datosHumano = [];
        for (let i = 0; i < inputDatos.length; i++) {
            //si es de radio selecciono solo el escogido
            if (inputDatos[i].type == "radio" && !inputDatos[i].checked) {
                continue;
            }
            //guardo los valores
            datosHumano.push(inputDatos[i].value);
        }
        return datosHumano;
    }

    /**FUNCIONES QUE SE DISPARAN CON EVENTOS */
    //esta gestiona elementos también
    mostrarDatos(datos) {
        datos.length > 0 ? crearTabla(datos) : crearTexto("no hay datos");
        //añado el evento
        let icons = document.getElementsByTagName("i");
        for (let i=0;i<icons.length;i++){
            icons[i].onclick = () => {
                let campos = this.obtenerCamposDesdeLapiz(icons[i]);
                this.hospital.editarPorNombre(campos[0],campos[1],campos[2])
            };
        }
    }
    //esto podria estar mejor creo
    obtenerCamposDesdeLapiz(campo) {
        let oldName = campo.parentNode.innerText;
        let newName = prompt("Nuevo nombre", campo.parentNode.innerText);
        campo.parentNode.innerText = newName;
        let nombreDeClase = document.getElementsByTagName("td")[0].classList.value;
        //let campos = camposEdicionNombre();
       return [oldName,newName,nombreDeClase];

    }

    mostrarFormularioIngresoPaciente() {
        let datosPersonal = this.hospital.nombresPersonal;
        let clase = "ingresoPaciente";
        let funcion = () => { this.ingresarDatos(Paciente.name, clase) };
        crearFormulario(["nombre", "apellidos", "edad", "enfermedad"], clase, funcion);
        let botonAltaForm = document.getElementById("confirmacion");
        addSelect(botonAltaForm, datosPersonal, clase);
    }

    mostrarFormularioAltaPersonal() {
        let clase = "altaPersonal";
        let funcion = () => { this.ingresarDatos(Personal.name, clase) };
        crearFormulario(["Nombre", "Apellidos", "Edad"], clase, funcion);
        let botonAltaForm = document.getElementById("confirmacion");

        addRadioGroup(botonAltaForm, Personal.tiposEspecialidad(), clase);
    }
    mostrarFormularioAltaPaciente() {
        crearFormulario(["Nombre"], "altaPaciente", ()=>{
            let posicion = this.buscarDesdeInput("Paciente");
            this.altaPaciente(posicion)});
    }
      
    altaPaciente(posicionPaciente) {

        if (posicionPaciente !== -1) {
            //si existe le pongo una fecha de alta
            this.hospital.pacientes[posicionPaciente].fechaAlta(new Date());
            alert("Usuario dado de alta con éxito");
            updateDatosById(this.hospital.nPacientes, "numPacientes");
            this.mostrarDatos(this.hospital.pacientes);
        } else {
            //si no existe digo que no existe
            alert("el usuario No existe");
        }

    }

    mostrarFormularioDespidoPersonal() {
        console.log("pero aqui es"+this.hospital);
        crearFormulario(["Nombre"], "despidoPersonal", ()=>this.despidoPersonal(this.hospital));

    }
     //aqui el despido del personal
     despidoPersonal(hospital) {
        console.log("aqui this hiospital es"+this.hospital);
        let inputNombre = document.getElementsByTagName("INPUT")[0].value;
        //y lo borro
        if (hospital.buscarHumano(inputNombre, Personal.name) !== -1) {
            hospital.borrarHumano(inputNombre, Personal.name)
            adjuntarTexto("Se ha enviado el despido al trabajador");
            updateDatosById(hospital.numeroPersonal, "numPersonal");
        } else {
            alert("no hay trabajadores con ese nombre");
            this.mostrarDatos(hospital.personal);
        }
    }
    mostrarFormularioAsignacionPaciente() {

        let funcion = () => this.activarSeleccion("asignarPersonal", botonAltaPaciente);
        crearFormulario(["Nombre"], "asignarPersonal", funcion);
        let botonAltaPaciente = document.getElementById("confirmacion");
    }

    activarSeleccion(clase, elemento) {
        let posicion = this.buscarDesdeInput(Paciente.name);
        if (posicion !== -1) {
            addSelect(elemento, this.hospital.nombresPersonal, clase);
            elemento.onclick = () => this.reAsignarPersonal(clase, posicion);
        } else {
            alert("No se encuentra");
        }
    }

}