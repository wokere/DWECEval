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
  

    addHuman(humano){
        if(humano instanceof Paciente){
            this.pacientes.push(humano);
        }else{
            this.personal.push(humano);
        }
    }

    buscarHumano(nombreBuscar,tipo){
        console.log("El nombre es"+nombreBuscar);
        console.log("el tipo"+tipo);
        console.log(tipo===PERSONAL);
        console.log(document.getElementsByTagName("td")[0].classList.value);
        if(tipo === PERSONAL){
           return  this.buscarPersonal(nombreBuscar);
            
        }else{
            return this.buscarPaciente(nombreBuscar);
        }
    }

    buscarPersonal(nombreBuscar){

        for (let i=0;i<this.personal.length;i++){
            if(this.personal[i].nombre==nombreBuscar){
                return i;
            }
        }
        return -1;

    }

    buscarPaciente(nombreBuscar){
        for (let i=0;i<this.pacientes.length;i++){
            if(this.pacientes[i].nombre==nombreBuscar){
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

    editarPorNombre(nombreAntiguo,nombreNuevo,tipo){
       console.log(PERSONAL == tipo);
       console.log(PERSONAL);
       console.log(tipo);
       //hasta aqui bien todo
        let listado = (tipo === PERSONAL) ? this.personal: this.pacientes;
        console.log(listado);
        //NO BUSCA BIEN!!!
        let posicionModificar = this.buscarHumano(nombreAntiguo,tipo);
        alert("NOMBRE ANTIGUO ES"+nombreAntiguo);
        alert(posicionModificar);
        alert(this.personal.nombre);
        alert("esro"+listado.nombre);
        listado[posicionModificar].nombre = nombreNuevo;
    }

}
