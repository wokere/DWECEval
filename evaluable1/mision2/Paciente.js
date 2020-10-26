"use strict"
class Paciente extends Humano {
    constructor(nombre,apellidos,edad,enfermedad,fecha_alta,personal_asignado){
        super(nombre,apellidos,edad);
        this.enfermedad = enfermedad;
        this.fechaIngreso= new Date();
        this.personalAsignado=personal_asignado;
    }

    //setters y getters

    fechaAlta(fecha) {
        this.fechaAlta=new Date(fecha);
    }
}