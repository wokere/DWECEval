"use strict"
const PERSONAL = Personal.name;//"Personal";
const PACIENTE = Paciente.name;//"Paciente";
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
    //como paso un objeto puedo filtrar por el tipo

    addHuman(humano){
        if(humano instanceof Paciente){
            this.pacientes.push(humano);
        }else{
            this.personal.push(humano);
        }
    }

    buscarHumano(nombre,tipo){
        alert(PERSONAL);
        let listado = (tipo === PERSONAL) ? this.personal : this.pacientes;
        for (let i=0;i<listado.length;i++){
            if(listado[i].nombre==nombre){
                return i;
            }
        }
        return -1;
    }
   
    borrarHumano(nombre,tipo){
        let posicionBorrar = this.buscarHumano(nombre,tipo);
        
        let listado = (tipo === PERSONAL) ? this.personal: this.pacientes;
        listado.splice(posicionBorrar,1);
    }

}
