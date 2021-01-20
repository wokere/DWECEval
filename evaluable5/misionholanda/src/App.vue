<template>
  <div id="app">
    <div id="colores">
      <!--añadir los eventos para que se cambie el color con el q se va a pintar-->
      <div id="red" class="color"></div>
      <div id="green" class="color"></div>
      <div id="blue" class="color"></div>
      <div id="yellow" class="color"></div>
      <div id="purple" class="color"></div>
      <div id="white" class="color"></div>
    </div>
    <button id="borrar">Borrar el panel</button>
    <!--añadimos el q lo lleva todo a negro-->
    <button id="todoNegro">Todo negro</button>
    <!-- aqui ponemos la variable que tiene el color que hemos seleccionado-->
    <p>
      Color de pincel seleccionado: <span id="estado">SIN SELECCIONAR</span>
    </p>
    <!--se crea el tablero de 60x60-->
    <div id="tablero">
      <div v-for="n in 60" :key="n" class="fila" :id="'fila' + n">
        <div v-for="x in 60" :key="x" class="celda"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
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
