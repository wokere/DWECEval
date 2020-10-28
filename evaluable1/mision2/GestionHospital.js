"use strict"

//clase que comunica el navegador con el hospital
class GestionHospital {
    //El atributo del gestor es el hospital
    //(y los elementos????)
    constructor(hospitalAGestionar) {

        this.hospital = hospitalAGestionar;

    }
    //metodo que coge las ids indicadas e introduce los datos.
    lanzarGestion() {
        updateDatosById(this.hospital.nombre, "nombre");
        updateDatosById(this.hospital.responsable, "direccion");
        updateDatosById(this.hospital.nPacientes, "numPacientes");
        updateDatosById(this.hospital.numeroPersonal, "numPersonal");
    }
    //metodo que añade las funciones manejadoras de eventos principales
    lanzarEventosPrincipales() {
        document.getElementById("verPacientes").onclick = () => this.mostrarDatos(this.hospital.pacientes);
        document.getElementById("nuevoPaciente").onclick = () => this.mostrarFormularioIngresoPaciente();
        document.getElementById("altaPaciente").onclick = () => this.mostrarFormularioAltaPaciente();
        document.getElementById("verPersonal").onclick = () => this.mostrarDatos(this.hospital.personal);
        document.getElementById("addPersonal").onclick = () => this.mostrarFormularioAltaPersonal();
        document.getElementById("asignarPaciente").onclick = () => this.mostrarFormularioAsignacionPaciente();
        document.getElementById("despedirPersonal").onclick = () => this.mostrarFormularioDespidoPersonal();
    }
    //metodo que busca el humano (tipo paciente/personal) que obtiene del input del documento
    //devuelve la posicion del usuario en su coleccion de datos(-1 si no está)
    buscarDesdeInput(tipo) {
        let input = document.getElementsByTagName("INPUT")[0].value;
        // compruebo si existe
        return this.hospital.buscarHumano(input, tipo);
    }
    //Dado un tipo  y una clase obtiene los datos del formulario para generar un Paciente o un personal
    // y añadirlo al hospital, asi como actualizar el documento
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
    //Dada una clase busca todos los elementos con las misma y los devuelve como un array de datos
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

    //Dada una coleccion de datos crea una tabla para mostrarlas. 
    //Además, añade en los campos elegidos un icono de lapiz y un evento para editarlos
    mostrarDatos(datos) {
        datos.length > 0 ? crearTabla(datos) : crearTexto("no hay datos");
        //cojo los campos i y les añado el evento
        let icons = document.getElementsByTagName("i");
        for (let i = 0; i < icons.length; i++) {
            icons[i].onclick = () => {
                let campos = this.obtenerCamposCambioNombre(icons[i]);
                this.hospital.editarPorNombre(campos[0], campos[1], campos[2])
            };
        }
    }
    //Obtiene los datos necesarios para el cambio de nombre (antiguo, nuevo y el nombre de la clase)
    //y los devuelve en un array. 
    obtenerCamposCambioNombre(campo) {
        let oldName = campo.parentNode.innerText;
        //el nuevo nombre lo obtiene de un prompt
        let newName = prompt("Nuevo nombre", campo.parentNode.innerText);
        campo.parentNode.innerText = newName;
        let nombreDeClase = document.getElementsByTagName("td")[0].classList.value;
        
        return [oldName, newName, nombreDeClase];
    }
    // Crea y Muestra el formulario de ingreso del paciente
    mostrarFormularioIngresoPaciente() {
        let datosPersonal = this.hospital.nombresPersonal;
        let clase = "ingresoPaciente";
        let funcion = () => { this.ingresarDatos(Paciente.name, clase) };
        crearFormulario(["nombre", "apellidos", "edad", "enfermedad"], clase, funcion);
        let botonAltaForm = document.getElementById("confirmacion");
        addSelect(botonAltaForm, datosPersonal, clase);
    }
    //Crea y muestra el formulario de alta de personal
    mostrarFormularioAltaPersonal() {
        let clase = "altaPersonal";
        let funcion = () => { this.ingresarDatos(Personal.name, clase) };
        crearFormulario(["Nombre", "Apellidos", "Edad"], clase, funcion);
        let botonAltaForm = document.getElementById("confirmacion");

        addRadioGroup(botonAltaForm, Personal.tiposEspecialidad(), clase);
    }
    //Crea y muestra el formulario de alta del paciente
    mostrarFormularioAltaPaciente() {
        crearFormulario(["Nombre"], "altaPaciente", () => {
            let posicion = this.buscarDesdeInput("Paciente");
            this.altaPaciente(posicion)
        });
    }
    //dada una posicion establece la fecha actual como fecha de alta y actualiza el documento.
    //en caso de recibir -1 como posicion avisa de q ese usuario no existe
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

    //crea y muestra el formulario de despido
    mostrarFormularioDespidoPersonal() {
        
        crearFormulario(["Nombre"], "despidoPersonal", () => this.despidoPersonal(this.hospital));

    }

    //Dado un hospital , recaba el dato del imput y borra el personal de la coleccion 
    //y actualiza los daos.
    //en caso contrario avisa de que no hay trabajadores con ese nombre
    despidoPersonal(hospital) {
        console.log("aqui this hiospital es" + this.hospital);
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
    //muestra y crea el formulario de asignacion de un personal al paciente
    mostrarFormularioAsignacionPaciente() {

        let funcion = () => this.activarSeleccion("asignarPersonal", botonAltaPaciente);
        crearFormulario(["Nombre"], "asignarPersonal", funcion);
        let botonAltaPaciente = document.getElementById("confirmacion");
    }
    //metodo para la reasignacion de un personal al paciente. 
    //obtiene datos dada una clase y actualiza el campo personalAsignado del paciente
    //con la posicion que se le pasa.
    reAsignarPersonal(clase, posicion) {
        //cojo el nombre del paciente y el nombre seleccionado
        let datosFormulario = this.obtenerDatosFormulario(clase);
        this.hospital.pacientes[posicion].personalAsignado = datosFormulario[1];
        alert("reasignacion realizada");
        this.mostrarDatos(this.hospital.pacientes);
    }
    //Si la busqueda desde el input devuelve > -1 añade un campo select
    //al formulario y añade el manejador de evento para reasignar el personal.
    //Si la busqueda no es correcta lanza un aviso
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