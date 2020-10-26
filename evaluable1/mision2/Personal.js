"use strict"
class Personal extends Humano {
    
    constructor(nombre,apellidos,edad, especialidad){
        super(nombre,apellidos,edad);
        this.especialidad = especialidad;
    }
}