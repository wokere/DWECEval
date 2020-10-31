class Juego{
    constructor(cartas,descripcion){
        this.coleccionCartas = cartas;
        this.puntuacion =0;
        this.descripcion = descripcion;
        this.emparejadas =0;
    }

    acierto(){
        this.puntuacion++;
    }

    fallo(){
        this.puntuacion--;
    }

    barajarCartas(){
        //sort puede tener como parametro una funcion que devuelva + o - 
        //y determinar el orden de los componentes del array.
        //si esa funcion es una que te de un numero aleatorio... las posiciones
        //del array serán aleatorias (eso dice en internet https://javascript.info/task/shuffle)
        //this.coleccionCartas.sort(() => Math.random() - 0.5);
        //pero como me parece que es copiar lo voy a hacer pensando... xD

        let arrayBarajado =[];
        let arrayCopia = [];
        //copio la coleccion al array copia, porque si uso clone la lio xD
        for(let i =0;i<this.coleccionCartas.length;i++){
            arrayCopia.push(this.coleccionCartas[i]);
        }
        //paso los valores aleatoriamente hasya que mi arrayCopia esté vacío
        for (let i = 0; arrayCopia.length > 0;i++){
            let posicionAleatoria = Math.floor(Math.random() * arrayCopia.length);
            arrayBarajado.push(arrayCopia[posicionAleatoria]);
            //le borro la q acabamos de usar
            arrayCopia.splice(posicionAleatoria,1);
        }
        //asigno el nuevo Array barajado a la coleccion de cartas
        this.coleccionCartas = arrayBarajado;
        
    }

    emparejarCartas(carta1,carta2){

        if(carta1.nombre===carta2.nombre){
            carta1.emparejada = true;
            carta2.emparejada = true;
            this.emparejadas++;
        }
    
    }

    esFinJuego(){
        return this.emparejadas === this.coleccionCartas.length/2;
    }

    resetJuego(){
        this.puntuacion =0;
        this.emparejadas =0;
    }

}


