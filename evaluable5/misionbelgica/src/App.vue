<template>
  <div id="app">
    <div class="personajes">
      <img
        @mouseover="muestraInfoPersonaje(index)"
        v-for="(personaje, index) in info"
        :key="index"
        class="wanted"
        :src="getImgUrl(personaje.src)"
        :title="personaje.src"
        :alt="personaje.src"
      />
    </div>
    <div class="panelinformativo">
      <h3>Panel informativo</h3>
      {{ infopersonaje }}
    </div>
    <div class="botones">
      <button>Mostrar/Ocultar Muwivaras</button>
      <button>Mostrar/Ocultar Usuarios</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      info: [
        { src: "bonclaywanted.jpg", text: "" },
        { src: "kinemonwanted.jpg", text: " " },
        { src: "robinwanted.jpg", text: "" },
        { src: "usoppwanted.jpg", text: "" },
        { src: "wantedluffy.jpg", text: "" },
        { src: "zorowanted.png", text: "" },
      ],
      infopersonaje :""
    };
  },
  methods: {
    //https://stackoverflow.com/questions/40491506/vue-js-dynamic-images-not-working
    //The expression inside v-bind is executed at runtime, webpack aliases at compile time y por eso
    // no funciona el v-bind con imagenes per se sin hacer esto.
    //Otra solicion es hacer el import de la imagen y asociarla al array nombreimgs.
    //O poner las imagenes a pelo, pero entonces pierde la gracia...
    getImgUrl(pic) {
      return require("./assets/" + pic);
    },
  muestraInfoPersonaje(indice){
    this.infopersonaje = indice;
  }
  }
};
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 60% 40%;
}
.wanted {
  width: 150px;
  height: 200px;
  margin: 2rem;
}
.personajes {
  border: 1px solid red;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
}
.panelinformativo {
  border: 2px solid black;
}
.botones {
  border: 1px solid blue;
}
</style>
