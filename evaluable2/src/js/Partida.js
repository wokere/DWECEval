class Partida{
    constructor(dado,claseHeroe,clasePosiblesMovimientos,claseCofre,claseSuelo){
        this.dado =dado;
        this.tiradasRealizadas =0;
        this.claseHeroe = claseHeroe;
        this.clasePosiblesMovimientos = clasePosiblesMovimientos;
        this.claseCofre = claseCofre;
        this.claseSuelo = claseSuelo;
    }
    generarTablero(size){
        let tabla = document.createElement("TABLE");
        let counter =1;
        for (let i=0;i<size;i++){
            let fila = document.createElement("TR");
            fila.id = i+1;
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
       let derecha = parseInt(posicionActualHeroe)+numero;
       let izquierda = parseInt(posicionActualHeroe)-numero;
       let arriba = parseInt(posicionActualHeroe)-(numero*10);
       let abajo = parseInt(posicionActualHeroe)+(numero*10);
       document.getElementById(derecha).classList.add(this.clasePosiblesMovimientos);
      // document.getElementById(izquierda).classList.add(this.clasePosiblesMovimientos);
       //document.getElementById(arriba).classList.add(this.clasePosiblesMovimientos);
       document.getElementById(abajo).classList.add(this.clasePosiblesMovimientos);

    }

    //calcular vertical(Y)
    cambiaPosicionHeroe(idAMover,posicionActualHeroe){
        //si idAMover no tiene el cofre
        document.getElementById(idAMover).classList.remove(this.clasePosiblesMovimientos);
        document.getElementById(idAMover).classList.remove(this.claseSuelo);
        document.getElemtnById(idAMover).classList.add(this.claseHeroe);
        
        document.getElementById(posicionActualHeroe).remove(this.claseHeroe);
        document.getElementById(posicionActualHeroe).add(this.claseSuelo);

    }

    //calcular horizontal(X)
    //cambiarposicionheroe
}
export default Partida;