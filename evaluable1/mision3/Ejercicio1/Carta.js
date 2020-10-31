"use strict"
//clase de donde las imagenes sacan toda la información para mostrarse
class Carta{
    constructor(img,nombre,imageBack){
        this.imagenPath = img;
        this.nombre = nombre;
        this.emparejada = false;
        this.imageBack = imageBack;
        this.imagePrincipal = imageBack
    }

    mostrarCarta(){
        this.imagePrincipal = this.imagenPath;
        return this.imagePrincipal;
    }

    ocultarCarta(){
        this.imagePrincipal = this.imageBack;
        return this.imagePrincipal;
    }

    
}