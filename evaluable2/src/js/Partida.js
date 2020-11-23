class Partida{
    constructor(dado,claseHeroe,clasePosiblesMovimientos,claseCofre,claseSuelo){
        this.dado =dado;
        this.tiradasRealizadas =0;
        this.claseHeroe = claseHeroe;
        this.clasePosiblesMovimientos = clasePosiblesMovimientos;
        this.claseCofre = claseCofre;
        this.claseSuelo = claseSuelo;
        //añadir el size del tablero!
    }
    generarTablero(size){
        let tabla = document.createElement("TABLE");
        let counter =1;
        for (let i=0;i<size;i++){
            let fila = document.createElement("TR");
            fila.id = i;
            for (let j=0;j<size;j++){
                let celda = document.createElement("TD");
                celda.className = this.generaElementosTablero(i,j,size);
                celda.id = counter;
                counter++;
                fila.appendChild(celda);
            }
            tabla.appendChild(fila);
        }
       return tabla;
    }
     generaElementosTablero(i,j,size){
        if (i==0 && j == 0){
            return this.claseHeroe;
        }else if(i == size-1 && j==size-1){
            return this.claseCofre;
        }else{
           return this.claseSuelo;
        }
    }

    calcularMovimientos(numero){

       let posicionActualHeroe = document.getElementsByClassName(this.claseHeroe)[0].id;
       let limites = this.posicionEnLimites(posicionActualHeroe);

       let dcha = parseInt(posicionActualHeroe)+numero;
       let izq = parseInt(posicionActualHeroe)-numero;
       let up = parseInt(posicionActualHeroe)-(numero*10);
       let down = parseInt(posicionActualHeroe)+(numero*10);

       let coordenadas = {izquierda :izq, derecha: dcha, arriba: up, abajo:down}

       return this.coordenadasEnLimites(coordenadas,limites);
      

    }

    coordenadasEnLimites(puntos,limites){
        let coords = [];
        console.log(puntos);
        for ( let [posicion,valorPosicion] of Object.entries(puntos)){
            //no es mejor usar hasownpropiertys? 
           if (posicion == "izquierda" && (valorPosicion>limites.izquierda)){
                coords.push(valorPosicion);
           }else if(posicion == "derecha" && valorPosicion<limites.derecha){
                coords.push(valorPosicion);
           }else if (posicion == "arriba" && valorPosicion>limites.arriba){
                   coords.push(valorPosicion);
           }else if (posicion == "abajo" && valorPosicion<limites.abajo){
                    coords.push(valorPosicion);
           }
        } 
        return coords;
       
    }

    muestraPosiblesMovimientos(numero){
        //bucle
       let posiciones = this.calcularMovimientos(numero);
       for(let i=0;i<posiciones.length;i++){
        document.getElementById(posiciones[i]).classList.add(this.clasePosiblesMovimientos);
       }
      /* document.getElementById(derecha).classList.add(this.clasePosiblesMovimientos);
       document.getElementById(izquierda).classList.add(this.clasePosiblesMovimientos);
       document.getElementById(arriba).classList.add(this.clasePosiblesMovimientos);
       document.getElementById(abajo).classList.add(this.clasePosiblesMovimientos);*/
    }
    

    cambiaPosicionHeroe(idAMover,posicionActualHeroe){
        //si idAMover no tiene el cofre
        document.getElementById(idAMover).classList.remove(this.clasePosiblesMovimientos);
        document.getElementById(idAMover).classList.remove(this.claseSuelo);
        document.getElemtnById(idAMover).classList.add(this.claseHeroe);
        
        document.getElementById(posicionActualHeroe).remove(this.claseHeroe);
        document.getElementById(posicionActualHeroe).add(this.claseSuelo);

    }

    posicionEnLimites(posicionActualHeroe){
        //los limites son respecto la fila
        let fila = document.getElementById(posicionActualHeroe).parentNode.id;
        let limiteIzdaX= fila*10;//el 10 es el size
        let limiteDchaX= limiteIzdaX+11;
        let limiteYUp= -((fila*10)-posicionActualHeroe);
        let limiteYDown = (100-(fila*10))+posicionActualHeroe;
        return {izquierda: limiteIzdaX,derecha: limiteDchaX,arriba:limiteYUp,abajo:limiteYDown};
    }


    //calcular horizontal(X)
    //cambiarposicionheroe
}
export default Partida;