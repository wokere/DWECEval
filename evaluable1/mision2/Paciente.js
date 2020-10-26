"use strict"
class Paciente extends Humano {
    constructor(datos){
        super(datos[0],datos[1],datos[2]);
        this.enfermedad = datos[3];
        this.fechaIngreso= new Date();
        //this.personalAsignado=personal_asignado;
    }

    //setters y getters

    fechaAlta(fecha) {
        this.fechaAlta=fecha;
    }
    
   
}
