<template>
  <div id="app">
    <div class="personajes">
      <div class="wanted" v-for="(personaje, index) in info" :key="index">
        <!--cargamos las imagenes-->
        <img
          @mouseover="setPersonajeActivo(index)"
          @mouseleave= "personajeActivo ={}"
          :class="mostrarClase(personaje.clase)"
          :src="getImgUrl(personaje.src)"
          :title="personaje.src"
          :alt="personaje.src"
        />
      </div>
    </div>
    <div class="panelinformativo">
      <h3>Panel informativo</h3>
      <!--enseñamos el texto de si se es miembro o usuario solo si se ha marcado esa opción-->
      <p v-show="miembro">{{infoMiembro}}</p>
      <p v-show="usuario">{{infoAkuma}}</p>

     <p> {{ infopersonaje }}</p>
    </div>
    <div class="botones">
      <button style="background-color:blue" @click.stop="destaca('miembro')">{{textoMostrarMiembro}} Mugiwaras</button>
      <button style="background-color:red" @click.stop="destaca('usuario')"> {{textoMostrarUsuario}} Usuarios</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      //la información de los personajes que aparecen
      info: [
        {
          clase: "usuario",
          src: "bonclaywanted.jpg",
          text:
            "Bentham del Desierto (荒野のベンサム Kōya no Bensamu?), conocido durante su estancia en Baroque Works como Mr. 2 Bon Kurei (Mr. 2・ボン・クレー Misutā Tsū Bon Kurē?, lit. «Don 2 Bon Clay») es un okama (término japonés para definir a los «Travestis»). Mientras era enemigo de Luffy y su banda formando parte de Baroque Works[8], ambos se hicieron muy buenos amigos rápidamente, llevándole a sacrificarse por Luffy tanto en Arabasta como en Impel Down. Actualmente es la nueva reina de Newkama Land.",
        },
        {
          clase: "usuario",
          src: "kinemonwanted.jpg",
          text:
            "Kin'emon el Zorro de Fuego (狐火の錦えもん Kitsune-bi no Kin'emon?) es un samurái del País de Wano, vasallo de la familia Kozuki y el líder de los Nueve Vainas Rojas.Él nació hace 56 años, pero viajó veinte años en el tiempo gracias al poder de la fruta Toki Toki.",
        },
        {
          clase: "usuario miembro",
          src: "robinwanted.jpg",
          text:
            "Nico Robin es un personaje de la serie manga y anime, One Piece. Es la séptima integrante de la tripulación de los Piratas del Sombrero de Paja, y fue anteriormente la Vice-Presidenta de la organización criminal Baroque Works. Comió la Fruta del Diablo Hana Hana no Mi. Es originaria del West Blue.",
        },
        {
          clase: "miembro",
          src: "usoppwanted.jpg",
          text:
            "Usopp, también antiguamente conocido por su alter-ego 'Sogeking', es un personaje del manga One Piece. Nació en el mar llamado East Blue. Fue el tercer miembro en unirse a la tripulación de Luffy y el segundo de forma oficial tras la confrontación que tuvieron con el capitán Kuro.",
        },
        {
          clase: "usuario miembro",
          src: "wantedluffy.jpg",
          text:
            "¡El futuro rey de los piratas! Monkey D. Luffy es un personaje de ficción y el protagonista principal del anime y manga One Piece creado por Eiichirō Oda. Su cuerpo está hecho de goma después de comerse una fruta del diablo, específicamente la 'fruta Gomu Gomu'. ",
        },
        {
          clase: "miembro",
          src: "zorowanted.png",
          text:
            "Roronoa Zoro también conocido como 'El Cazador de Piratas Roronoa Zoro', es uno de los personajes principales del anime y manga One Piece. Fue el primer miembro en unirse a los Piratas del Sombrero de Paja, convirtiéndose en el combatiente​ de la tripulación, y uno de sus dos espadachines, siendo el otro Brook.",
        },
      ],
      miembro: false,
      usuario: false,
      personajeActivo: {}
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
    // dado un indice establece el personaje activo
    setPersonajeActivo(indice) {
      this.personajeActivo = this.info[indice];
    },
    // dada una clase , si coincide con miembro, o usuario, cambia el valor (true o false) de la variable con ese nombre
    destaca(clase) {
      if (clase === 'miembro') {
        this.miembro = !this.miembro;
      } else if(clase === 'usuario') {
        this.usuario = !this.usuario;
      }
    },
    //dada una clase , dependiendo si se debe mostrar o no ( las variables usuario y miembro) devuelve una clase u otra.
    // es decir, en funcion de lo que se destaque, se muestra activa o no la clase 
    mostrarClase(clase) {
      // si clase incluye miembro y usuario y las dos se deben mostrar, se devuelve lo mismo que se ha recibido
    if (clase.includes("miembro") && clase.includes("usuario") && this.usuario && this.miembro){
      return clase;
    }else if(clase.includes("miembro") && this.miembro){
      return "miembro";
    }else if(clase.includes("usuario") && this.usuario){
      return "usuario";
    }else{
      return "";
    }
    },
  },
  // computed propierties, cambian en función de los valores de otras propiedades o variables reactivas
   computed:{
     //En funcion de si se destaca o no el usuario / miembro  se muestra un texto u otro
     textoMostrarUsuario: function(){
       return this.usuario ? "ocultar" : "mostrar";
     },
     textoMostrarMiembro: function(){
       return this.miembro ? "ocultar" : "mostrar";
     },
     // esta variable cambia en función de la clase a la que pertenece el personaje activo
     infoMiembro: function(){
      if(this.personajeActivo.clase != undefined && this.personajeActivo.clase.includes("miembro") ){
         return "Es Miembro de los mugiwara";
      }else if (this.personajeActivo.clase != undefined) {
        return "No es miembro de los mugiwara";
      }else {
        return "";
      }
     },
     //igual que la anterior
     infoAkuma: function(){
       if(this.personajeActivo.clase !=undefined && this.personajeActivo.clase.includes("usuario")){
         return  "Es usuario de una Akuma no mi";
      }else if (this.personajeActivo.clase != undefined) {
        return "No es usuario de una akuma no mi";
      }else{
        return "";
      }
     },
     //En funcion de si el personaje activo tiene texto o no, esta propierty devuelve un texto u otro
     infopersonaje: function(){
       if (this.personajeActivo.text){
         return this.personajeActivo.text;
       }else{
         return "Pasa el raton sobre un poersonaje para obtener más información";
       }
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
  grid-template-columns: 40% 40%;
  justify-content: center;
}
.wanted > img {
  width: 150px;
  height: 200px;
  margin: 0.7rem;
}
.personajes {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
}
.usuario {
  border: 3px solid red;
  width: 200px !important;
  height: 250px !important;
}
.miembro {
  border: 3px solid blue;
  width: 200px !important;
  height: 250px !important;
}
.usuario.miembro {
  width: 200px !important;
  height: 250px !important;
  border-color: red blue;
}
button{
  color:white;
  padding: 2rem;
  font-size: 1.5rem;
}
</style>
