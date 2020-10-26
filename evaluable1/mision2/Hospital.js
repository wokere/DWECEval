"use strict"
class Hospital {
    constructor(nombre,localidad, responsable){
        this.nombre = nombre;
        this.localidad = localidad;
        this.responsable = responsable;
        this.pacientes = [];
        this.personal = [];
    
    }
    get nPacientes(){
        return this.pacientes.length;
    }
    get numeroPersonal(){
        return this.personal.length;
    }
    
    
    ingresoPaciente(paciente){
        this.pacientes.push(paciente);
    }


    addPersonal(personal){
        this.personal.push(personal);
    }

    buscarPaciente(nombre){
        for (let i=0;i<this.pacientes.length;i++){
            if(this.pacientes[i].nombre==nombre){
                return i;
            }
        }
        return -1;
    }

}
