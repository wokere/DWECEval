"use strict"
class Paciente extends Humano {
    constructor(datos){
        super(datos[0],datos[1],datos[2]);
        this.enfermedad = datos[3];
        this.personalAsignado = datos[4];
        this.fechaIngreso= new Date();
    }
  
    fechaAlta(fecha) {
        this.fechaAlta=fecha;
    }
    
   
}
