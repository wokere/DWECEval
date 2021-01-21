<template>
  <div id="app">
   <div>
     <button  :disabled= fin @click="pedirClave()">Pedir Clave</button>
     <button :disabled= ataque  @click="atacar()">ATACAR</button>
   </div>
   <div>

     <input  :disabled= fin v-model="ip" type="text">
     <input :disabled= fin v-model="tipo" type="text">
     <input disabled :value="clave" type="text">
     
   </div>

  </div>
</template>

<script>
//importamos axios para usarlo 
import axios from 'axios';

export default {
  name: 'App',
  data:function(){
    return{
      clave: null,
      tipo: null,
      ip: null,
      fin: false
    }
  },
  //hasta que la clave no sea algo no se puede atacar, ya que devuelve false si es null
  //tambien si fin es true/false
  computed:{
    ataque: function(){
      return this.clave === null || this.fin;
    },
  // se genera el json con los datos que se piden
    contentAtaque: function(){
      return JSON.stringify({
          tipoAtaque: this.tipo,
          IPDestino: this.ip,
          Clave: this.clave
      })
    }
  },
  methods:{
    pedirClave(){
      //hacemos la peticion con los datos requeridos
      axios.post("https://apuntesfpinformatica.es/DWEC/S4ND1EG0/ordenes.php","accion=pedirClave")
      .then(response=>{
        //si ha ido bien asignamos a clave el valor descifrado de la respuesta
        this.clave = this.descifradoCesar(response.data);
      })
    },
    atacar(){
      
    //hacemos la peticion con los datos requeridos
      axios.post("https://apuntesfpinformatica.es/DWEC/S4ND1EG0/ordenes.php","accion=AtaqueCPU&objeto="+this.contentAtaque)
      .then(response=>{
        if(response.data === "ERROR"){
          alert('ERROR');
        }else if(response.data === "TODOOK"){
          alert('VICTORIA');
          //estás variable controla la habilitacion o deshabilitacion de los input y botones
          this.fin = true;
        }
      });
    },
    // lo unico que nunca consigo sacar en los scape rooms xD
    descifradoCesar(codigo){
      const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      //esto fue mi examen! xD
      let codarr = codigo
      .split("")
      .map((letra)=>{
        if(letra === "Z"){
          return "A";
        }else{
          //buscamos la posicion de la letra en el array del abecedario
          let lindice = abc.indexOf(letra);
          //y devolvemos, del mismo array, la posicion siguiente ( salvo q sea Z, que entonces devuelve A)
          return  abc[lindice+1];
        }
      })
      .join('');
      return codarr;

    }
   
  }
  
}
</script>

<style>

</style>
