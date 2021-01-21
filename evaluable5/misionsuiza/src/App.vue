<template>
  <div id="app">
    <!--eventos dinámicos-->
    <button @[clickComer]="comerFila()">COMER FILA</button>
    <button @[clickComer]="comerColumna()">COMER COLUMNA</button>
    <button @click="stopEating()">NO QUIERO COMER MÄS</button>
    <div class="tableta">
      <p v-show="tableroComido">¡Te lo has comido todo!</p>
      <table>
        <tr v-for="(x, i) in tableta" :key="i">
          <!--eventos dinamicos-->
          <td
            v-for="(onza, y) in tableta[i]"
            @[tableta[i][y].evClick]="morderTableta(onza)"
            @[tableta[i][y].evHover]="atenuarTableta(i, y)"
            @[tableta[i][y].evLeave]="tableta[i][y].clase = originalclass"
            :key="y"
            :class="tableta[i][y].clase"
          >
          <!--se enseña el texto si se ha comido la tarjeta-->
            <span v-show="tableta[i][y].texto">{{ tableta[i][y].texto }}</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
//constantes
const ORIGINALCLASS = "marron";
const CLASECLARA = "clarito";
const HOVER = "mouseover";
const LEAVE = "mouseleave";
const CLICK = "click";

export default {
  name: "App",
  data: function () {
    return {
      tableta: this.creaTableta(),
      originalclass: ORIGINALCLASS,
      onzasComidas:0,
      stopComer: false
    };
  },
  computed:{
    //si las filas onzas comidas son en numero al tamaño de la tableta entonces es que el tablero se ha comido.
    tableroComido:function() {
     return this.onzasComidas === this.tableta.length*this.tableta[0].length;
    },
    // computed propierty para el evento dinámico de los botones que hacen comer una fila o columna
    // si el tablero ya se ha comido entero o se ha hecho click en stop comer entonces será null para que no se pueda seguir comiendo
    clickComer: function(){
      if(this.tableroComido || this.stopComer){
        return null;
      } else{
        return CLICK;
      }
    }
  },
  methods: {
    creaTableta() {
      let t = [];
      for (let i = 0; i < 5; i++) {
        t[i] = [];
        for (let j = 0; j < 7; j++) {
          t[i][j] = {
            //a cada objeto onza se le asigna una clase y los textos de los distintos eventos que tiene q lanzar
            clase: ORIGINALCLASS,
            evClick: CLICK,
            evHover: HOVER,
            evLeave: LEAVE,
          };
        }
      }
      return t;
    },
    morderTableta(ob) {
      //se deshabilita el evento hover y leave poniendo las propiedades del objeto a null
      //ya que estas son las que se utilizan para los dynamic events
      //lo hace solo si previamente no estaba ya comida
      if(ob.clase !== "eaten"){
        ob.evHover = null;
        ob.evLeave = null;
        ob.clase = "eaten";
        ob.texto = "mmmm...";
        this.onzasComidas++;
      }
    },
    atenuarTableta(x, y) {
      this.$set(this.tableta[x][y], "clase", CLASECLARA);
    },
    calculaRandom(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    comerFila() {
      //Busca una fila que pueda ser comida 
      let fila = this.filaComible(this.tableta.length);
      //le aplico la funcion mordertableta a la filaseleccionada;
      this.tableta[fila].map((onza) => this.morderTableta(onza));
    },
    comerColumna() {
      //lo mismo pero con la columna
      let columna = this.columnaComible(this.tableta[0].length);
      this.tableta.forEach((element) => {
        element
          //extraer columna
          .filter((valor, indice) => indice === columna)
          //y le aplico la "mordida"
          .map((onza) => this.morderTableta(onza));
      });
    },
    //busca dentro de la fila hasta que encuentra una onza no comida y devuelve su posición
    filaComible(max) {
      let fila = this.calculaRandom(0, max);
      while (!this.tableta[fila].some((e) => e.clase !== "eaten")) {
        fila = this.calculaRandom(0, max);
      }
      return fila;
    },
    //devuelve una columna comible buscando entre las onzas una que no tenga la clase eaten
    columnaComible(max) {
      let columna = this.calculaRandom(0, max);
      let libre = false;
      while (!libre) {
        columna = this.calculaRandom(0, max);
        this.tableta.forEach((element) => {
          libre = element
            .filter((v, indice) => indice === columna)
            .some((onza) => onza.clase !== "eaten");
        });
      }
      return columna;
    },
    stopEating(){
      //parar todos los eventos, sin cambiar las clases (morder)...
      this.tableta.forEach(fila=>{
        fila.forEach(onza => {
          onza.evLeave = null;
          onza.evHover = null;
          onza.evClick = null;
        })
      });
      this.stopComer = true;
    }

  },
};
</script>

<style>
td {
  width: 5vw;
  height: 2vw;
}
.marron {
  background-color: brown;
}
.clarito {
  background-color: brown;
  opacity: 0.8;
}
.eaten {
  background-color: beige;
}
.blue {
  background-color: blue;
}
</style>
