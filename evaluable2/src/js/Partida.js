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
        for (let i=0;i<size;i++){
            let fila = document.createElement("TR");
            fila.id = i+1;
            for (let j=0;j<size;j++){
                let celda = document.createElement("TD");
                //celda.id = i+""+j+1;
                celda.className = this.generaElementosTablero(i,j,size);
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
    //cambiarposicionheroe
}
export default Partida;