
const NOMBREHOSPITAL = "Kanzene Hospital";
const LOCALIDADHOSPITAL = "Kanzene";
const RESPONSABLEHOSPITAL = "Carmencita Diego";

window.onload = inicio;

function inicio(){
    let hospitalK = new Hospital(NOMBREHOSPITAL, LOCALIDADHOSPITAL, RESPONSABLEHOSPITAL);
    let GestionKanzene = new GestionHospital(hospitalK);
    //muestro en el documento los datos del hospital y asigno los eventos
    GestionKanzene.lanzarGestion();
}