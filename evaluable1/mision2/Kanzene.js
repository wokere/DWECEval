//Establezco los datos del hospital que en principio no cambiaran,
const NOMBREHOSPITAL = "Kanzene Hospital";
const LOCALIDADHOSPITAL = "Kanzene";
const RESPONSABLEHOSPITAL = "Carmencita Diego";
//cargo la gestion del hospital
window.onload = inicio;

function inicio(){
    //inicio hospital
    let hospitalK = new Hospital(NOMBREHOSPITAL, LOCALIDADHOSPITAL, RESPONSABLEHOSPITAL);
    //y la gestion del hospital que he iniciado
    let GestionKanzene = new GestionHospital(hospitalK);
    //lanza la gestión en el navegador con los datos del hospital y establece los eventos princpales
    GestionKanzene.lanzarGestion();
}