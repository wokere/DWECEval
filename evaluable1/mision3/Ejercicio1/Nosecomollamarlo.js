class visualGame{
    constructor(juego){
        this.juegoActual = juego;
        this.imagenesCartas = document.getElementsByClassName("cartas");
        this.elementoPuntuacion = document.getElementById("puntos");
        this.botonEmpezar = document.getElementById("start");
        this.parrafoDescripcion = document.getElementById("descripcionJuego");

    }

    asignarCartas(){
        alert("done");
        this.juegoActual.barajarCartas();
        for(let i=0;i<this.imagenesCartas.length;i++){
            this.imagenesCartas[i].src = this.juegoActual.coleccionCartas[i].imagenPath;
            this.imagenesCartas[i].setAttribute("alt",this.juegoActual.coleccionCartas[i].nombre);
        }
    }

}