"use strict"

/*Creamos la clase pregunta donde estarán todos los atributos y metodos de las mismas*/

class Pregunta{

    constructor(categoria, enunciado, respuesta){
        this.categoria = categoria;
        this.enunciado = enunciado;
        this.respuesta = respuesta;
    }
}
/* Creamos la clase jugador done estarán todos los atributos y métodos que usará el mismo*/
class Jugador {

    constructor (nombre){
        this.nombre = nombre;
        this.puntuacion = 0;
    }

    //metodo para aumentar la puntación del jugador

    aumentaPuntuacion(){
        this.puntuacion+=1;
    }
    
}
/**Creamos la clase juego con los atributos y metodos que se usaran en el desarrollo del mismo */

class Juego{

        constructor(jugador,preguntas){
            this.jugador = jugador;
            this.preguntas = preguntas;
            this.ronda =0;
        }

        //Comprobamos si el juego finaliza comprobando los puntos con las rondas

        juegoDebeParar(){

            let fallos = ronda - this.jugador.puntuacion;
            //si el jugador tiene 4 puntos, si estamos en la ultima ronda o si ha tenido 3 fallos, el juego se acaba
             return this.jugador.puntuacion===4 || ronda === 6 || fallos === 3;      
        }

        //eliminamos las preguntas que ya hemos respondido
        eliminarPregunta(pregunta){
            let posicion = this.preguntas.indexOf(pregunta.enunciado);
            delete this.preguntas[posicion];            
        }
    
}
let player = new Jugador("lolina");
let preguntaMates = 
let juegoActual = new Juego ()