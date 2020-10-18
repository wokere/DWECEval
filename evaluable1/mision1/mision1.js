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

            let fallos = this.ronda - this.jugador.puntuacion;
            //si el jugador tiene 4 puntos, si estamos en la ultima ronda o si ha tenido 3 fallos, el juego se acaba
             return this.jugador.puntuacion===4 || fallos === 3 || this.ronda===6;      
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
            //eliminamos las preguntas que ya hemos respondido y cambiamos de ronda
            this.ronda++;
            delete this.preguntas[posicionPreguntaActual];
            //cambiamos el tamaño del array porque ahora sigue siendo el mismo pero sin estar vacio
            //ordenandolo nos aseguramos de no borrar una posicion que si tiene una pregunta 
            this.preguntas.sort();
            this.preguntas.length = this.preguntas.length-1;
            return resultado;
        }
    
}

/**FUNCIONES DE LA PARTIDA */

 function muestraPreguntas(arrayPreguntas){
 
     const contenedor = document.getElementById("preguntas");
     //creamos los radios de eleccion de preguntas
     for (let i=0; i<arrayPreguntas.length;i++)
     {
         //creamos el elemento radio
         let radio = document.createElement("INPUT");
         radio.setAttribute("type","radio");
         radio.setAttribute("value",arrayPreguntas[i].enunciado);
         radio.setAttribute("id",i);
         radio.setAttribute("name","questions");

         //creamos la etiqeta para el radio
         let text = document.createElement("LABEL");
         text.setAttribute("for",i);
         text.innerHTML = (arrayPreguntas[i].categoria).toUpperCase()+": "+arrayPreguntas[i].enunciado + "</br>";

         //lo añadimos al documento
         contenedor.appendChild(radio);
         contenedor.appendChild(text);
     }
 }
 function muestraMarcador(){
    let marcaPuntos = document.getElementById("puntos");
    marcaPuntos.innerHTML = juegoActual.jugador.nombre +" " +juegoActual.jugador.puntuacion + " puntos";
 }
 function muestraDialogoRespuesta(){

     //creamos el input de texto
    let inputText = document.createElement("INPUT");
    inputText.setAttribute("type","text");
    inputText.setAttribute("id","respuesta");
    inputText.setAttribute("placeholder","aqui tu respuesta");

    //creamos el boton de comprobacion
    let buttonResponder = document.createElement("INPUT");
    buttonResponder.setAttribute("type","submit");
    buttonResponder.setAttribute("value","comprobar");
    buttonResponder.setAttribute("onclick","responder()");

    //lo añadimos al documento
    document.getElementById("preguntas").appendChild(inputText);
    document.getElementById("preguntas").appendChild(buttonResponder);

}
//recogemos el valor de la opcion seleccionada
 function opcionSeleccionada(numPreguntas){
     for(let i=0;i<numPreguntas;i++){
         if(document.getElementById(i).checked){
             return document.getElementById(i).id;
         }
     } 
     //si llega aqui es que no habia nada seleccionado
     return -1;
 }

//se envia la respuesta para su comprobacion junto con la pregunta a la que hay que comprobar
 function responder(){
     let respuesta = document.getElementById("respuesta").value;
     let posicionPregunta = opcionSeleccionada(juegoActual.preguntas.length)
     //comprobamos la respuesta y nos saca en un alert el resultado
     alert(juegoActual.comprobarRespuesta(respuesta,posicionPregunta));
     actualizar();
         
 }

 function actualizar (){
    puestaACero();
     if (!juegoActual.juegoDebeParar()){
        muestraMarcador();
        muestraPreguntas(juegoActual.preguntas);
        muestraDialogoRespuesta();
     }else{
        muestraMarcador();
        alert("fin del juego");
     }

 }
 //ponemos como estaba el documento
 function puestaACero(){
    document.body.innerHTML =` <body>
    <p id="puntos"></p>
    <div id="preguntas">
    </div>
    </body>`
 }

/** EMPIEZA LA PARTIDA */

 let player = new Jugador("lolina");
 let preguntaMates = new Pregunta("Mates","Cuanto son 3+2",5);
 let preguntaLetras = new Pregunta("letras","Como me llamo?","loli");
 let preguntaFilosofia = new Pregunta("filosofia","Que sabe socrates?","Nada");
 let preguntaIngles = new Pregunta("ingles","Como se dice hola?","hello");
 let preguntaTele = new Pregunta("tele", "Cual es la mejor serie ever?","One Piece");
 let preguntaHistoria = new Pregunta("historia","como se llama mi profesor de historia?","federico")

 let preguntasJuego = [preguntaMates,preguntaLetras,preguntaFilosofia,preguntaIngles,preguntaTele,preguntaHistoria];
 let juegoActual = new Juego (player,preguntasJuego);

 //jugar partida aqui
   
    muestraMarcador();
    muestraPreguntas(juegoActual.preguntas);
    muestraDialogoRespuesta();
 
 