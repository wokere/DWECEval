class Tablero {
    constructor(claseHeroe,clasePosiblesMovimientos,claseCofre,claseSuelo,claseGanador){
        this.claseHeroe = claseHeroe;
        this.clasePosiblesMovimientos = clasePosiblesMovimientos;
        this.claseCofre = claseCofre;
        this.claseSuelo = claseSuelo;
        this.claseGanador = claseGanador;
        this.posicionActualHeroe;
        this.finRonda="";
        this.finPartida="";
    }
    get posicionCofre(){
        return document.getElementsByClassName(this.claseCofre)[0];
    }
    set evFinRonda(txt){
        this.finRonda = txt;
    }
    set evFinPartida(txt){
        this.finPartida = txt;
    }
    actualizarPosicionActualHeroe() {
        this.posicionActualHeroe = document.getElementsByClassName(this.claseHeroe)[0].id;
    }

    moverHeroe(ev) {
        if (ev.target.classList.contains(this.clasePosiblesMovimientos)) {
            this.cambiaPosicionHeroe(ev.target.id, this.posicionActualHeroe);
            
        }
    }
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
    generaElementosTablero(i, j, size) {
        if (i == 0 && j == 0) {
            return this.claseHeroe;
        } else if (i == size - 1 && j == size - 1) {
            return this.claseCofre;
        } else {
            return this.claseSuelo;
        }
    }

    calcularMovimientos(numero) {

        this.actualizarPosicionActualHeroe();
        let limites = this.posicionEnLimites(this.posicionActualHeroe);

        let dcha = parseInt(this.posicionActualHeroe) + numero;
        let izq = parseInt(this.posicionActualHeroe) - numero;
        let up = parseInt(this.posicionActualHeroe) - (numero * 10);
        let down = parseInt(this.posicionActualHeroe) + (numero * 10);

        let coordenadas = { izquierda: izq, derecha: dcha, arriba: up, abajo: down }

        return this.coordenadasEnLimites(coordenadas, limites);

    }

    coordenadasEnLimites(puntos, limites) {
        let coords = [];
        for (let [posicion, valorPosicion] of Object.entries(puntos)) {
            //no es mejor usar hasownpropiertys? 
            if (posicion == "izquierda" && (valorPosicion > limites.izquierda)) {
                coords.push(valorPosicion);
            } else if (posicion == "derecha" && valorPosicion < limites.derecha) {
                coords.push(valorPosicion);
            } else if (posicion == "arriba" && valorPosicion > limites.arriba) {
                coords.push(valorPosicion);
            } else if (posicion == "abajo" && valorPosicion < limites.abajo) {
                coords.push(valorPosicion);
            }
        }
        return coords;
    }
    movimientosPosibles(numero) {

        let posiciones = this.calcularMovimientos(numero);

        if(posiciones.length>0){
        for (let i = 0; i < posiciones.length; i++) {
            document.getElementById(posiciones[i]).classList.add(this.clasePosiblesMovimientos);
        }
        let elementosPermitidos = '.' + this.clasePosiblesMovimientos;
        $(elementosPermitidos).on("click", (ev) => this.moverHeroe(ev));
        }else{
            //si no movimientos posibles se acaba la ronda
            $("#"+this.posicionActualHeroe).parent().trigger(this.finRonda);
        }
    }

    limpiarPosiblesMovimientos() {
        let elementosPermitidos = '.' + this.clasePosiblesMovimientos;
        $(elementosPermitidos).off("click");
        $(elementosPermitidos).removeClass(this.clasePosiblesMovimientos);
    }

    cambiaPosicionHeroe(idAMover) {

        this.limpiarPosiblesMovimientos();

        let destino = document.getElementById(idAMover);
        document.getElementById(this.posicionActualHeroe).classList.remove(this.claseHeroe);
        document.getElementById(this.posicionActualHeroe).classList.add(this.claseSuelo);

        if (!destino.classList.contains(this.claseCofre)) {

            destino.classList.remove(this.claseSuelo);
            destino.classList.add(this.claseHeroe);
            //aqui se debe reactivar el dado
            $(destino).parent().trigger(this.finRonda);
        } else {

            destino.classList.remove(this.claseCofre);
            destino.classList.add(this.claseGanador);
            destino.classList.add(this.claseHeroe);
            ///acabo la partida y lanzo ese evento!
            $(".win").trigger("finPartida");
        }

       

        this.actualizarPosicionActualHeroe();
        //habilitar evento de nuevo


    }
    /*sacar clase, esta en el cofre*/
    posicionEnLimites() {
        //los limites son respecto la fila
        let fila = document.getElementById(this.posicionActualHeroe).parentNode.id;
        let limiteIzdaX = fila * 10;//el 10 es el size
        let limiteDchaX = limiteIzdaX + 11;
        let limiteYUp = -((fila * 10) - parseInt(this.posicionActualHeroe));
        let limiteYDown = ((100 - (fila * 10)) + parseInt(this.posicionActualHeroe));
        return { izquierda: limiteIzdaX, derecha: limiteDchaX, arriba: limiteYUp, abajo: limiteYDown };
    }

}
export default Tablero;