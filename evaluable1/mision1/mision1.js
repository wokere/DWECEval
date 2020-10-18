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

       //comprobamos la respuesta dada con respecto a la pregunta elegida. Si es correcto aumentamos el marcador. 
       // Devolvemos correcto o la respuesta en caso de fallo.
        comprobarRespuesta(respuesta,posicionPreguntaActual){
            let resultado;
            if(respuesta == this.preguntas[posicionPreguntaActual].respuesta){
                this.jugador.aumentaPuntuacion();
                resultado = "respuesta correcta!";
            }else{
                resultado =  "lo siento, la respuesta era "+this.preguntas[posicionPreguntaActual].respuesta;
            }
            //eliminamos las preguntas que ya hemos respondido
            delete this.preguntas[posicionPreguntaActual];
            return resultado;
        }
    
}
let player = new Jugador("lolina");
let preguntaMates = new Pregunta("Mates","Cuanto son 3+2",5);
let preguntaLetras = new Pregunta("letras","Como me llamo?","loli");
let preguntasJuego = [preguntaMates,preguntaLetras];
let juegoActual = new Juego (player,preguntasJuego);
//probar metodos
//console.log(juegoActual.comprobarRespuesta("loli",1));
//console.log("check preguntas");
//console.log(juegoActual.preguntas);

