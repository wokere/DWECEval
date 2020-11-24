//clase que se encarga de manejar todos los movimientos del tablero
class Tablero {
    //se construye con las clases necesarias para mostrarlo y con los eventos de fin de ronda
    //y fin de partida. (que quiza seria mas apropiado llamar aqui finMovimiento y encontradoHeroe)
    constructor(claseHeroe, clasePosiblesMovimientos, claseCofre, claseSuelo, claseGanador) {
        this.claseHeroe = claseHeroe;
        this.clasePosiblesMovimientos = clasePosiblesMovimientos;
        this.claseCofre = claseCofre;
        this.claseSuelo = claseSuelo;
        this.claseGanador = claseGanador;
        this.posicionActualHeroe;
        this.finRonda = "";
        this.finPartida = "";
    }
    //devuelve la posicion actual del tesoro (por si se quiere poner en otra posicion...)
    get posicionCofre() {
        return document.getElementsByClassName(this.claseCofre)[0];
    }
    // establece el nombre del evento q se disparara cuando finalice la ronda
    set evFinRonda(txt) {
        this.finRonda = txt;
    }
    //lo mismo pero para la partida
    set evFinPartida(txt) {
        this.finPartida = txt;
    }
    // actualiza la propiedad que  te dice donde esta el heroe
    actualizarPosicionActualHeroe() {
        this.posicionActualHeroe = document.getElementsByClassName(this.claseHeroe)[0].id;
    }
    //Si el elemento que dispara el evento contiene la clase de posibles movimientos
    //entonces cambia la posicion del heroe
    moverHeroe(ev) {
        if (ev.target.classList.contains(this.clasePosiblesMovimientos)) {
            this.cambiaPosicionHeroe(ev.target.id, this.posicionActualHeroe);

        }
    }
    //dado un tamaño genera un tablero (y lo devuelve)
    generarTablero(size) {
        let tabla = document.createElement("TABLE");
        let counter = 1;
        for (let i = 0; i < size; i++) {
            let fila = document.createElement("TR");
            fila.id = i;
            for (let j = 0; j < size; j++) {
                let celda = document.createElement("TD");
                celda.className = this.generaElementosTablero(i, j, size);
                celda.id = counter;
                counter++;
                fila.appendChild(celda);
            }
            tabla.appendChild(fila);
        }
        return tabla;
    }
    //dada una posicion genera devuelve la clase que le corresponde (suelo, cofre o heroe)
    generaElementosTablero(i, j, size) {
        if (i == 0 && j == 0) {
            return this.claseHeroe;
        } else if (i == size - 1 && j == size - 1) {
            return this.claseCofre;
        } else {
            return this.claseSuelo;
        }
    }
    //dado un numero calcula los movimientos en los que se puede mover el heroe y devuelve 
    //los que estan dentro de los limites del tablero
    calcularMovimientos(numero) {

        this.actualizarPosicionActualHeroe();
        let limites = this.posicionEnLimites(this.posicionActualHeroe);

        let dcha = parseInt(this.posicionActualHeroe) + numero;
        let izq = parseInt(this.posicionActualHeroe) - numero;
        let up = parseInt(this.posicionActualHeroe) -(numero*10);
        let down = parseInt(this.posicionActualHeroe) + (numero * 10);

        let coordenadas = { izquierda: izq, derecha: dcha, arriba: up, abajo: down }

        return this.coordenadasEnLimites(coordenadas, limites);

    }
    // dadas unas posiciones y unos limites devuelve aquellas posiciones que se encuentran
    //dentro de cada punto
    coordenadasEnLimites(puntos, limites) {
        let coords = [];
        //mejor for in? 
        for (let [posicion, valorPosicion] of Object.entries(puntos)) {
            //no es mejor usar hasownpropiertys? 
            if (posicion == "izquierda" && (valorPosicion > limites.izquierda)) {
                coords.push(valorPosicion);
            } else if (posicion == "derecha" && valorPosicion < limites.derecha) {
                coords.push(valorPosicion);
            } else if (posicion == "arriba" && valorPosicion > limites.arriba && valorPosicion>0) {
                coords.push(valorPosicion);
            } else if (posicion == "abajo" && valorPosicion < limites.abajo) {
                coords.push(valorPosicion);
            }
        }
        return coords;
    }
    //dado un numero muestra en el tablero los elementos que son susceptibles de moverse
    //y les añade el manejador que les permita mover al heroe cuando hagan click
    movimientosPosibles(numero) {

        let posiciones = this.calcularMovimientos(numero);

        if (posiciones.length > 0) {
            for (let i = 0; i < posiciones.length; i++) {

                document.getElementById(posiciones[i]).classList.add(this.clasePosiblesMovimientos);
            }
            let elementosPermitidos = '.' + this.clasePosiblesMovimientos;
            $(elementosPermitidos).on("click", (ev) => this.moverHeroe(ev));
        } else {
            //si no movimientos posibles se acaba la ronda
            $("#" + this.posicionActualHeroe).parent().trigger(this.finRonda);
        }
    }
    //quita los posibles movimientos quitando el manejador y la clase css
    limpiarPosiblesMovimientos() {
        let elementosPermitidos = '.' + this.clasePosiblesMovimientos;
        $(elementosPermitidos).off("click");
        $(elementosPermitidos).removeClass(this.clasePosiblesMovimientos);
    }
    //dado un id de destino cambia al heroe de posicion en el tablero
    //cambiando a las clases que correspondan en funcion de si ha 
    //encontrado o no el tesoro

    cambiaPosicionHeroe(idAMover) {

        this.limpiarPosiblesMovimientos();

        let destino = document.getElementById(idAMover);
        document.getElementById(this.posicionActualHeroe).classList.remove(this.claseHeroe);
        document.getElementById(this.posicionActualHeroe).classList.add(this.claseSuelo);
        //si el heroe no ha llegado al tesoro
        if (!destino.classList.contains(this.claseCofre)) {

            destino.classList.remove(this.claseSuelo);
            destino.classList.add(this.claseHeroe);
            //lanzamos el evento fin de ronda//
            $(destino).parent().trigger(this.finRonda);
        } else {
            //si ha llegado al tesoro
            destino.classList.remove(this.claseCofre);
            destino.classList.add(this.claseGanador);
            destino.classList.add(this.claseHeroe);
            ///acabo la partida y lanzo ese evento!
            $(".win").trigger("finPartida");
        }

        this.actualizarPosicionActualHeroe();
    }


    //calcula los limites de movimiento respecto del tablero y los devuelve como un objeto
    posicionEnLimites() {
        //los limites son respecto la fila
        let fila = document.getElementById(this.posicionActualHeroe).parentNode.id;
        let limiteIzdaX = fila * 10;//el 10 es el size, quiza deberia sacarlo a un attr del tablero...
        let limiteDchaX = limiteIzdaX + 11;
        let limiteYUp = -Math.abs(((fila * 10) - parseInt(this.posicionActualHeroe)));
        let limiteYDown = ((100 - (fila * 10)) + parseInt(this.posicionActualHeroe));
        return { izquierda: limiteIzdaX, derecha: limiteDchaX, arriba: limiteYUp, abajo: limiteYDown };
    }

}
export default Tablero;