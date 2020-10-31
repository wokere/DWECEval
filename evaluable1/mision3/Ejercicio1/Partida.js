/**AQUI LA INTEREACCION DEL DOCUMENTO CON EL JUEGO */
class Partida {
    constructor(juego, eImagenesCartas, ePuntuacion, botonEmpezar, pDescripcion) {

        this.juegoActual = juego;
        this.imagenesCartas = eImagenesCartas;
        this.elementoPuntuacion = ePuntuacion;
        this.botonEmpezar = botonEmpezar;
        this.parrafoDescripcion = pDescripcion;
        this.imagenesSeleccionadas = [];

    }

    asignarCartas() {

        this.juegoActual.barajarCartas();
        for (let i = 0; i < this.imagenesCartas.length; i++) {
            //se le asigna siempre el path reverso
            this.imagenesCartas[i].src = this.juegoActual.coleccionCartas[i].ocultarCarta();
            this.imagenesCartas[i].setAttribute("alt", this.juegoActual.coleccionCartas[i].nombre);
            this.imagenesCartas[i].id = "carta"+i;
        }
    }

    seleccionarCarta(posicion) {
       
        this.imagenesSeleccionadas.push(this.imagenesCartas[posicion].id);
        this.imagenesCartas[posicion].classList.add("seleccionada");
        //la muestro cuando la selecciono
        this.imagenesCartas[posicion].src = this.juegoActual.coleccionCartas[posicion].mostrarCarta();
    }

    estaSeleccionada(posicion) {
        
        return this.imagenesSeleccionadas.indexOf(this.imagenesCartas[posicion].id);
    }

    estaEmparejada(posicion) {
        return this.juegoActual.coleccionCartas[this.imagenesCartas[posicion].alt].emparejada;
    }

    cuandoHacenClicAImagen(posicion) {
        
        if (!this.estaEmparejada(posicion) && this.estaSeleccionada(posicion) == -1) {
           
            this.seleccionarCarta(posicion);
        }

        //si ya se han seleccionado dos se comprueba
        if (this.imagenesSeleccionadas.length == 2) {
            //DESHABILITAR EVENTOS!!!
            deshabilitarOnClick(this);
           
            let cartaSeleccionada1 = document.getElementById(this.imagenesSeleccionadas[0]);
            let cartaSeleccionada2 = document.getElementById(this.imagenesSeleccionadas[1]);

            this.actualizarTablero(cartaSeleccionada1,cartaSeleccionada2);
            
        }


    }

    //comprueba si el texto alternativo de dos imagenes es el mismo
    comprobarCartas(imgCarta1, imgCarta2) {
        console.log( imgCarta1.alt === imgCarta2.alt);
        return imgCarta1.alt === imgCarta2.alt;
    }

    actualizarTablero(carta1, carta2) {
       
        if (this.comprobarCartas(carta1, carta2)) {
            //aumento la puntuacion
            this.juegoActual.acierto();
            carta1.classList.add("acertada");
            carta2.classList.add("acertada");
            //esta emparejando el objeto y no el nombre
            this.juegoActual.emparejarCartas(this.imagenACarta(carta1), this.imagenACarta(carta2)); 
            eventoSeleccionCarta(this);
            //deberian poder mostrarse siempre...tengo q evitar q se seleccione si el taaño es 2
            
        } else {
            this.juegoActual.fallo();
            carta1.classList.add("noacertada");
            carta2.classList.add("noacertada");
            //sacar a funcion con un delay or something
            //al retrasar la ocultacion ... 
        }
        setTimeout(()=>this.ocultarSeleccionadasNoEmparejadas(carta1,carta2),3000); 
        this.quitarClase(this.imagenesSeleccionadas,"seleccionada");
        this.vaciarSeleccionadas();
        this.actualizarPuntuacion();
    }

    posicionImagenAElemento(posicion) {

        return this.imagenesCartas[posicion];
    }

    imagenACarta(imagen){
        return this.juegoActual.coleccionCartas[imagen.alt];
    }

    ocultarSeleccionadasNoEmparejadas(carta1,carta2){
        if(!this.imagenACarta(carta1).emparejada) {
            carta1.src = this.juegoActual.coleccionCartas[carta1.alt].ocultarCarta();
        }
        if(!this.imagenACarta(carta1).emparejada){
            carta2.src = this.juegoActual.coleccionCartas[carta2.alt].ocultarCarta();
        }
       
        carta1.classList.remove("noacertada");
        carta2.classList.remove("noacertada");
        //CUANDO SE OCULTEN VUELVO A DEJAR  QUE HAGAN CLICk
        eventoSeleccionCarta(this);

    }

    vaciarSeleccionadas(){
        this.imagenesSeleccionadas.pop();
        this.imagenesSeleccionadas.pop();
    }

    actualizarPuntuacion() {
        this.elementoPuntuacion.innerHTML = "PUNTUACION: " + this.juegoActual.puntuacion;
    }
    quitarClase(elementos,clase){
        for(let i=0;i<elementos.length;i++){
         document.getElementById(elementos[i]).classList.remove(clase);
        }
    }
    addClase(elementos,clase){
        for(let i=0;i<elementos.length;i++){
            document.getElementById(elementos[i]).classList.add(clase);
           }
    }

     

}