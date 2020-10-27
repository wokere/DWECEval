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
    get nombresPersonal(){
        let nombres=[];
        for(let i=0;i<this.personal.length;i++){
            nombres.push(this.personal[i].nombre);
        }
        return nombres;
    }
    addHuman(humano){
        if(humano instanceof Paciente){
            this.pacientes.push(humano);
        }else{
            this.personal.push(humano);
        }
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
