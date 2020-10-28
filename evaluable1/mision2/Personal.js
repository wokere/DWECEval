"use strict"
//clase que hereda los atributos de humano y que tiene especialidad
class Personal extends Humano {

    constructor(datos){
        super(datos[0],datos[1],datos[2]);
        this.especialidad = datos[3];
    }
    //devuelve los tipos de especialidad del personal
    static tiposEspecialidad(){
        return ["medico","enfermero","celador"];
    } 
}
