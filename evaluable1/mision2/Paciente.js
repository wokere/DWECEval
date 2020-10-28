"use strict"
//tipo de humano enfermo, con un personal asignado y fecha de ingreso
class Paciente extends Humano {
    constructor(datos){
        super(datos[0],datos[1],datos[2]);
        this.enfermedad = datos[3];
        this.personalAsignado = datos[4];
        this.fechaIngreso= new Date();
    }
    //metodo que establece el atributo fecha de alta
    fechaAlta(fecha) {
        this.fechaAlta=fecha;
    }
    
   
}
