"use strict"
class Personal extends Humano {

    constructor(datos){
        super(datos[0],datos[1],datos[2]);
        this.especialidad = datos[3];
    }
    
}
