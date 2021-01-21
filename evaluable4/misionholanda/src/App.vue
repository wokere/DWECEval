<template>
  <div id="app">
    <div id="colores">
      <!--añadir los eventos para que se cambie el color con el q se va a pintar-->
      <div id="red" @click="cambioSeleccionado('red')" class="color"></div>
      <div id="green" @click="cambioSeleccionado('green')" class="color"></div>
      <div id="blue" @click="cambioSeleccionado('blue')" class="color"></div>
      <div
        id="yellow"
        @click="cambioSeleccionado('yellow')"
        class="color"
      ></div>
      <div
        id="purple"
        @click="cambioSeleccionado('purple')"
        class="color"
      ></div>
      <div id="white" @click="cambioSeleccionado('white')" class="color"></div>
    </div>
    <button  @click="borrarPanel()">Borrar el panel</button>
    <!--añadimos el q lo lleva todo a negro-->
    <button @click="pintarNegro()">Todo negro</button>
    <!-- aqui ponemos la variable que tiene el color que hemos seleccionado-->
    <p>
      Color de pincel seleccionado:
      <span>{{ colorseleccionado | color }}</span>
    </p>
    <!--se crea el tablero de 60x60-->
    <div>
      <div v-for="(n,i) in tablaColores" :key="i" class="fila">
        <!--añadir evento cuando hacen clic que cambie el color al seleccionado-->
        <div
          v-for="(x,l) in tablaColores[i]"
          :key="l"
          @click="cambioColorCelda(i, l)"
          class="celda"
          :style="{'background-color': tablaColores[i][l]}"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      colorseleccionado: "",
      tablaColores: [],
    };
  },
  filters: {
    color: function (value) {
      return value === "" ? "Sin seleccionar" : value;
    },
  },
  methods: {
    //cambia el color de la celda usando Vue.set para que se actualice
    cambioColorCelda(fila, columna) {
      this.$set(
        this.tablaColores[fila],
        columna,
        this.colorseleccionado
      );
    },
    cambioSeleccionado(color) {
      this.colorseleccionado = color;
    },
    borrarPanel() {
      this.tablaColores = this.reiniciaLienzo();
    },
    //deja el lienzo en blanco de nuevo
    reiniciaLienzo() {
      let lienzo = [];
      lienzo.length = 60;
      for (let i = 0; i < 60; i++) {
        lienzo[i] = [];
        lienzo[i].length = 60;
      }
      return lienzo;
    },
    //recorre el lienzo y lo pinta de negro con Vue.set para que se actualice en el template
    pintarNegro(){
      for(let i=0;i<this.tablaColores.length;i++){
        for(let j=0; j<this.tablaColores[i].length;j++){
            this.$set(this.tablaColores[i],j,"black");
        }
      }
    }
  },
  // si cambia alguna de las variables reactivas se actualiza el localstorage
  watch:{
    tablaColores: function(nv){
      let aGuardar = JSON.stringify(nv);
      localStorage.lienzo = aGuardar;
    },
    colorseleccionado: function(nv){
      localStorage.color =  nv;
    }
  },

  // Cuando se crea el componente se rellena el lienzo en función de si había algo o no en  el localstorage
  created: function () {
    if(localStorage.lienzo){
      // se reestablece el lienzo y el pincel seleccionado
      this.tablaColores = JSON.parse(localStorage.lienzo);
    }else{
      this.tablaColores = this.reiniciaLienzo();
    }
    if(localStorage.color){
      this.colorseleccionado = localStorage.color;
    }
  },
};
</script>

<style>
#app {
  background-color: darkgrey;
}
h1,
p {
  text-align: center;
}

.fila {
  margin-top: 2px;
  padding: 0px;
  height: 10px;
}

.celda {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: white;
  margin: 0px 1px;
  padding: 0px;
}

.color {
  width: 75px;
  height: 40px;
  display: inline-block;
  margin: 0px 20px;
}

#red {
  background-color: red;
}

#green {
  background-color: green;
}

#blue {
  background-color: blue;
}

#yellow {
  background-color: yellow;
}

#purple {
  background-color: purple;
}

#white {
  background-color: white;
}
</style>
