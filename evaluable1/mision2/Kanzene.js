
const NOMBREHOSPITAL = "Kanzene Hospital";
const LOCALIDADHOSPITAL = "Kanzene";
const RESPONSABLEHOSPITAL = "Carmencita Diego";

window.onload = inicio;

function inicio(){
    let hospitalK = new Hospital(NOMBREHOSPITAL, LOCALIDADHOSPITAL, RESPONSABLEHOSPITAL);
    let GestionKanzene = new GestionHospital(hospitalK);
    //muestro en el documento los datos del hospital y asigno los eventos
    updateDatosById(GestionKanzene.hospital.nombre, "nombre");
    updateDatosById(GestionKanzene.hospital.responsable, "direccion");
    updateDatosById(GestionKanzene.hospital.nPacientes, "numPacientes");
    updateDatosById(GestionKanzene.hospital.numeroPersonal, "numPersonal");

    //FALTAN LOS DE MODIFICAR LOS DATOS DE LOS USUARIOS
    document.getElementById("verPacientes").onclick = () => GestionKanzene.mostrarDatos(GestionKanzene.hospital.pacientes);
    document.getElementById("nuevoPaciente").onclick = () => GestionKanzene.mostrarFormularioIngresoPaciente();
    document.getElementById("altaPaciente").onclick = () => GestionKanzene.mostrarFormularioAltaPaciente();
    document.getElementById("verPersonal").onclick = () => GestionKanzene.mostrarDatos(GestionKanzene.hospital.personal);
    document.getElementById("addPersonal").onclick = () => GestionKanzene.mostrarFormularioAltaPersonal();
    document.getElementById("asignarPaciente").onclick = () => GestionKanzene.mostrarFormularioAsignacionPaciente();
    document.getElementById("despedirPersonal").onclick = () => GestionKanzene.mostrarFormularioDespidoPersonal();

};