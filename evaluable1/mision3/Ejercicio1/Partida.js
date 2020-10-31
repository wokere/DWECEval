//Clase que tiene el desarrollo de una partida
class Partida {
    //las partidas necesitan un objeto juego y los elementos del documento con los que van a interaccionar
    constructor(juego, eImagenesCartas, ePuntuacion, botonEmpezar, pDescripcion) {

        this.juegoActual = juego;
        this.imagenesCartas = eImagenesCartas;
        this.elementoPuntuacion = ePuntuacion;
        this.botonEmpezar = botonEmpezar;
        this.parrafoDescripcion = pDescripcion;
        this.imagenesSeleccionadas = [];
        this.timeOut=null;

    }
    //metodo para asignar a cada  elemento imagen los datos del objeto carta
    asignarCartas() {

        this.juegoActual.barajarCartas();
        for (let i = 0; i < this.imagenesCartas.length; i++) {
            //se le asigna siempre el path reverso
            this.imagenesCartas[i].src = this.juegoActual.coleccionCartas[i].ocultarCarta();
            this.imagenesCartas[i].setAttribute("alt", this.juegoActual.coleccionCartas[i].nombre);
            this.imagenesCartas[i].id = "carta" + i;
        }
    }
    //metodo que dada una posicion añande la id del elemento imagen seleccionado al atributo ImagenesSeleccionadas
    //y cambia la imagen para que se vea qué carta es
    seleccionarCarta(posicion) {

        this.imagenesSeleccionadas.push(this.imagenesCartas[posicion].id);
        this.imagenesCartas[posicion].classList.add("seleccionada");
        //la muestro cuando la selecciono
        this.imagenesCartas[posicion].src = this.juegoActual.coleccionCartas[posicion].mostrarCarta();
    }
    //dad una posicion devuelve si la posición si la carta esta seleccionada o -1 si no
    //buscando su id en el attr de imagenes selccionadas
    estaSeleccionada(posicion) {
        return this.imagenesSeleccionadas.indexOf(this.imagenesCartas[posicion].id);
    }
    //dada una posicion busca en el objeto Carta del que el elemto imagen toma los datos si está emparejada
    estaEmparejada(posicion) {
        //el texto alternativo de la imagen equivale a la posicion de la carta en coleccion de cartas del juego
        return this.juegoActual.coleccionCartas[this.imagenesCartas[posicion].alt].emparejada;
    }

    //manejador del click de la imagen. LA posicion es la posición del array de imagenes.
    cuandoHacenClicAImagen(posicion) {
        //si no está emparejada y no está seleccionada entonces se selecciona.
        if (!this.estaEmparejada(posicion) && this.estaSeleccionada(posicion) == -1) {

            this.seleccionarCarta(posicion);
        }

        //si se han seleccionado dos se deshabilita el evento click para que no puedan
        //seguir hasta que se haya comprobado todo. Y actualiza el tablero y los datos de juego
        if (this.imagenesSeleccionadas.length == 2) {

            Partida.deshabilitarOnClick(this);

            let imgCartaSeleccionada1 = document.getElementById(this.imagenesSeleccionadas[0]);
            let imgCartaSeleccionada2 = document.getElementById(this.imagenesSeleccionadas[1]);

            this.actualizarTablero(imgCartaSeleccionada1, imgCartaSeleccionada2);

        }

    }

    //comprueba si el texto alternativo de dos imagenes es el mismo y devuelve true/false
    comprobarCartas(imgCarta1, imgCarta2) {
        return imgCarta1.alt === imgCarta2.alt;
    }
    //metodo que se encarga de coomprobar si las imagenes son iguales y actualizar el tablero en consecuencia
    // recibe dos cartas.
    actualizarTablero(imagenaCarta1, imagenCarta2) {

        //si son iguales
        if (this.comprobarCartas(imagenaCarta1, imagenCarta2)) {
            //aumenta la puntuacion
            this.juegoActual.acierto();
            //les añade la clase acertada que les dará un borde verde y algo de opacidad.
            this.addClase([imagenaCarta1,imagenCarta2],"acertada");
            //cambia el objeto del cual toma los datos la imagen para ponerlo como emparejado.
            this.juegoActual.emparejarCartas(this.imagenACarta(imagenaCarta1), this.imagenACarta(imagenCarta2));
            //valora si se ha acabado la partida.
            this.checkFinPartida();
            //reactivamos el clic
            Partida.habilitarSeleccionCarta(this);

        } else {
            //decrementa la puntuacion
            this.juegoActual.fallo();
            //le cambia la clase
            this.addClase([imagenaCarta1,imagenCarta2],"noacertada");
            //se oculataran en 3 segundos
            this.timeOut = setTimeout(() => this.ocultarSeleccionadas(imagenaCarta1, imagenCarta2), 3000);
            
        }

        //en 3 segundos ocultara la pareja que no ha sido emparejada correctamente
        // quita la clase seleccionada 
        this.quitarClase(this.imagenesSeleccionadas, "seleccionada");
        //vuelve a dejar a 0 las imagenesSeleccionadas
        this.vaciarSeleccionadas();
        //actualiza la puntuación
        this.actualizarPuntuacion();
    }
    //dada una posicion te devuelve el elemento imagen de ImagenesCartas
    posicionImagenAElemento(posicion) {

        return this.imagenesCartas[posicion];
    }
    //dado un elemento imagen te devuelve el objeto carta del cual toma los datos
    imagenACarta(imagen) {
        return this.juegoActual.coleccionCartas[imagen.alt];
    }

    //Dadas dos imagenes les pone como SRC la cara trasera del objeto Carta del q toma los datos
    //tras quitar la clase "noacertada" vuelve a habilitar el manejador de seleccion de carta
    //ya que se da por concluída la ronda
    ocultarSeleccionadas(imagenCarta1, imagenCarta2) {
            imagenCarta1.src = this.juegoActual.coleccionCartas[imagenCarta1.alt].ocultarCarta();
            imagenCarta2.src = this.juegoActual.coleccionCartas[imagenCarta2.alt].ocultarCarta();
        
        this.quitarClase([imagenCarta1,imagenCarta2],"noacertada");
        //CUANDO SE OCULTEN VUELVO A DEJAR  QUE HAGAN CLICK. 
        Partida.habilitarSeleccionCarta(this);

    }
    //elimina los dos elementos que debe tener el atributo ImagenesSeleccionadas
    vaciarSeleccionadas() {
        this.imagenesSeleccionadas.pop();
        this.imagenesSeleccionadas.pop();
    }
    //actualiza el documento con la puntacion del juego
    actualizarPuntuacion() {
        this.elementoPuntuacion.innerHTML = "PUNTUACION: " + this.juegoActual.puntuacion;
    }

    //quita la clase a un conjunto de ids. Dependiendo de si recibe una imagen o un string pasa un argumento u otro

    quitarClase(elementos, clase) {

        for (let i = 0; i < elementos.length; i++) {
            if(elementos[i].constructor.name === "HTMLImageElement"){
                //aqui paso el id de la imagen
                document.getElementById(elementos[i].id).classList.remove(clase);
            }else{
                //aqui el texto
                document.getElementById(elementos[i]).classList.remove(clase);
            }
            
        }
    }
    //añade la clase a un conjunto de ids, funciona como la anterior

    addClase(elementos, clase) {
        for (let i = 0; i < elementos.length; i++) {
            if(elementos[i].constructor.name === "HTMLImageElement"){
                //aqui paso el id de la imagen
                document.getElementById(elementos[i].id).classList.add(clase);
            }else{
                //aqui el texto
                document.getElementById(elementos[i]).classList.add(clase);
            }
        }
    }

    //comprueba si ha acabado la partida y si es asi lanza un alert con los puntos y resetea los datos de la partida
    checkFinPartida() {
        if (this.juegoActual.esFinJuego()) {
            this.actualizarPuntuacion();
            alert("FIN DEL JUEGO, puntuación:" + this.juegoActual.puntuacion);
            this.resetPartida();
        }
    }
    //deja la partida lista para volver a empezar.
    resetPartida() {
        this.vaciarSeleccionadas();
        this.juegoActual.resetJuego();
        this.asignarCartas();
        this.actualizarPuntuacion();
        //quito todas las clases de acierto/fallo
        this.quitarClase(this.imagenesCartas,"acertada");
        this.quitarClase(this.imagenesCartas,"noacertada");
        this.quitarClase(this.imagenesCartas,"seleccionada")
      //rehabilito el click si estaba deshabilitado
        if(Partida.checkClickImagenes(this)){
            Partida.habilitarSeleccionCarta(this);
        }
        //si no has fallado nada no se ha establecido el timeout.
       if(this.timeOut !== null){
         clearTimeout(this.timeOut);  
       } 
    
    }

    /**Metodos estaticos que inicializan la partida y los eventos */
    static habilitarSeleccionCarta(partida){
        for(let i=0;i<partida.imagenesCartas.length;i++){
            partida.imagenesCartas[i].onclick = ()=> partida.cuandoHacenClicAImagen(i);
        }
    }
    static  deshabilitarOnClick(partida){
        for(let i=0;i<partida.imagenesCartas.length;i++){
            partida.imagenesCartas[i].onclick = null;
        }
    }
    
    static checkClickImagenes(partida){
        return partida.imagenesCartas[0].onclick === null;
    }
    static  empezarPartida(partida){
        //barajamos las fichas
        partida.asignarCartas();
        //y sacamos el tablero de puntuacion
        partida.actualizarPuntuacion();
        partida.botonEmpezar.innerHTML = "Empezar de Nuevo";
        //si
        partida.botonEmpezar.onclick = ()=>partida.resetPartida();
        
    }


}