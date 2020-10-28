"use strict"
const PERSONAL = Personal.name;//"Personal";
const PACIENTE = Paciente.name;//"Paciente";
//clase que tiene las propiedades del hospital
class Hospital {
    //el hospital se construye con un nombre, localidad y responsable.
    //empieza con una lista vacia de pacientes y personal.
    constructor(nombre,localidad, responsable){

        this.nombre = nombre;
        this.localidad = localidad;
        this.responsable = responsable;
        this.pacientes = [];
        this.personal = [];
    
    }
    //devuelve el numero de pacientes
    get nPacientes(){
        return this.pacientes.length;
    }
    //devuelve el numero de personal
    get numeroPersonal(){
        return this.personal.length;
    }
    //devuelve los nombres del personal
    get nombresPersonal(){
        let nombres=[];
        for(let i=0;i<this.personal.length;i++){
            nombres.push(this.personal[i].nombre);
        }
        return nombres;
    }
  
    //Dado un humano lo añade a personal o paciente segun el tipo que sea.
    addHuman(humano){
        if(humano instanceof Paciente){
            this.pacientes.push(humano);
        }else{
            this.personal.push(humano);
        }
    }
    //Dado un nombre y un tipo de humano devuelve la posicion en la que está
    //-1 si no  lo encuentra
    buscarHumano(nombreBuscar,tipo){
  
        if(tipo === PERSONAL){
           return  this.buscarPersonal(nombreBuscar);
            
        }else{
            return this.buscarPaciente(nombreBuscar);
        }
    }
    //Dado un nombre devuelve la posicion en la que se encuentra el personal
    buscarPersonal(nombreBuscar){

        for (let i=0;i<this.personal.length;i++){
            if(this.personal[i].nombre==nombreBuscar){
                return i;
            }
        }
        return -1;

    }
    //dado un nombre devuelve la posicion en la que se encuentra el paciente
    buscarPaciente(nombreBuscar){
        for (let i=0;i<this.pacientes.length;i++){
            if(this.pacientes[i].nombre==nombreBuscar){
                return i;
            }
        }
        return -1;

    }
   //dado un nombre y un tipo de humano busca su posicion y la borra del listado.
    borrarHumano(nombre,tipo){
        let posicionBorrar = this.buscarHumano(nombre,tipo);
        
        let listado = (tipo === PERSONAL) ? this.personal: this.pacientes;
        listado.splice(posicionBorrar,1);
    }
    //dados dos nombres y un tipo de humano le cambia el nombre
    editarPorNombre(nombreAntiguo,nombreNuevo,tipo){
   
        let listado = (tipo === PERSONAL) ? this.personal: this.pacientes;
        let posicionModificar = this.buscarHumano(nombreAntiguo,tipo);
        listado[posicionModificar].nombre = nombreNuevo;
    }

}
