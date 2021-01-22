<template>
  <q-page class="flex flex-center">
    <!--mostramos el error si ocurriera-->
    <div v-if="error !== undefined"><p>{{error}}</p></div>
    <!-- usamos el componente formulario, no se ejecutará el evento hasta que no se cumplan
    todas las rules de cada elemento-->
    <q-form @submit.prevent.stop="navega(mainCallurl)" class="busqueda">
      <!--cada elemento tiene unas reglas de validación-->
      <q-input
        class="input-form"
        v-model.trim="text"
        filled
        label="texto de busqueda"
        hint="introduce texto"
        :rules="[(valor) => !!valor || 'Campo Obligatorio']"
      />
      <!--también una máscara para que solo pueda tener determinado formato,
      en este caso 8 números. Se añade reactive-rules porque las reglas no tienen reactividad
      a no ser que asi se indique. Sin esta propiedad no se actualizaria al instante el cálculo de las fechas-->
      <q-input
        class="input-form"
        v-model.trim="mindate"
        filled
        label="Fecha minima"
        mask="########"
        hint="Formato YYYYMMAA"
        reactive-rules
        :rules="[dataFormat, checkDateInterval]"
      />
      <q-input
        class="input-form"
        v-model.trim="maxdate"
        filled
        label="fecha maxima"
        mask="########"
        hint="Formato YYYYMMAA"
        reactive-rules
        :rules="[dataFormat, checkDateInterval]"
      />

      <q-select
        v-model="order"
        filled
        label="Ordenar"
        :options="opciones"
        hint="elige"
        :rules="[(valor) => !!valor || 'Campo Obligatorio']"
      />
      <q-btn
        color="primary"
        type="submit"
        class="boton"
        size="lg"
        round
        icon="search"
      />
    </q-form>
    <!--la paginación de las noticias solo se muestra si hay noticias. Cada vez 
    que se clica un elemento de la paginación se hace la llamada para que muestre las noticias
    de esa pagina-->
    <q-pagination
      v-show="news.length > 0"
      v-model="current"
      :max="paginas"
      :max-pages="paginacion"
      :direction-links="true"
      :boundary-links="true"
      icon-first="skip_previous"
      icon-last="skip_next"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
      @click="navega(paginatedCallurl)"
    />
    <!-- lista que muestra las propiedades que queremos de cada elemento que nos
    llega desde la petición-->
    <q-list class="column" style="width: 70vw">
      <q-item v-for="(article, key) in news" :key="key">
        <q-item-section>
          <q-item-label overline
            ><a :href="article.web_url" target="_blank">{{
              article.headline.main
            }}</a></q-item-label
          >
          <q-item-label lines="2">{{ article.abstract }}</q-item-label>
          <q-item-label caption>{{ article.lead_paragraph }}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <!--aplicación de filtros en atributos como fecha para que tengan un formato más ... amigable?-->
          <q-item-label caption>{{
            article.pub_date | prettydate
          }}</q-item-label>
          <q-item-label>{{ article.section_name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <!-- de nuevo un elemento paginación.Quiza lo suyo hubiera sido sacarlo a componente-->
    <q-pagination
      v-show="news.length > 0"
      v-model="current"
      :max="paginas"
      :direction-links="true"
      :boundary-links="true"
      :max-pages="paginacion"
      icon-first="skip_previous"
      icon-last="skip_next"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
      @click="navega(paginatedCallurl)"
    />
      
  </q-page>
  
</template>
<script>
//importanmos el spinner para poder utilizarlo
import { QSpinnerHourglass } from 'quasar'
//la key de la api para poder hacer peticiones
const API = "api-key=mkdTSzg999FowCJ2wnMVRKGIsOGDZHqT";
export default {
  name: "nysearch",
  data: function () {
    //declaracion de variables reactivas
    return {
      text: null,
      order: null,
      //objetos label-value-icon
      opciones: [
        { label: "Más recientes", value: "newest" },
        { label: "Más antiguas", value: "oldest" },
      ],
      mindate: null,
      maxdate: null,
      news: [],
      paginas: 0,
      current: 0,
      url: "",
      error: undefined,
    };
  },
  //filtros
  filters: {
    //dado un valor ( un string con una fecha) la devuelve en formato local. 
    prettydate: function (val) {
      return new Date(val).toLocaleDateString();
    },
  },
  //propiedades computadas, siempre que lo haga las variables que usan para calcularse.
  //en este caso las utilizamos para la generación del querystring
  computed: {
    page: function () {
      return "page=" + (this.current - 1);
    },
    query: function () {
      return "q=" + this.text;
    },
    begindate: function () {
      return "begin_date=" + this.mindate;
    },
    enddate: function () {
      return "end_date=" + this.maxdate;
    },
    orderby: function () {
      return "sort=" + this.order.value;
    },
    //url de la lamada principal cuando se hace una búsqueda
    mainCallurl: function () {
      return (
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?" +
        this.begindate +
        "&" +
        this.enddate +
        "&" +
        this.orderby +
        "&" +
        this.query +
        "&" +
        API
      );
    },
    //url para ir a una página concreta de los resultados
    paginatedCallurl: function () {
      return (
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?" +
        this.begindate +
        "&" +
        this.enddate +
        "&" +
        this.orderby +
        "&" +
        this.query +
        "&" +
        this.page +
        "&" +
        API
      );
    },
    //esta propiedad devuelve un número u otro dependiendo de si está en movil o no
    //la utiliza el componente de paginación para que no muestre 10 items en el movil
    //y quede mega feo
    paginacion: function () {
      return this.$q.platform.is.mobile ? 4 : 10;
    },
  },
  methods: {
    //funcion que utiliza el campo de fecha para validar el su formato.
    //si no es correcta devuelve un string que indica el formato correcto. Si es correcta
    //devuelve null porque no hay nada q indicar
    dataFormat(value) {
      const rgx = new RegExp("\\d{8}");
      return rgx.test(value) ? null : "FORMATO AAAMMDD";
    },
    //metodo que hace la llamada al servidor de nyt en función de la url que se le pasa.
    //también carga el loader mientras recibimos respuesta
    navega(url) {
      //iniciamos el loader con una configuración determinada
       this.$q.loading.show({
        message: 'Cargando Noticias, please wait',
        spinner: QSpinnerHourglass,
        spinnersize: 200,
        messageColor: "white"
      })
      //como la validacion se ha hecho en los propios componentes del formulario
      //con las rules
      //podemos enviarlo sin más
      this.$axios
        .get(url)
        .then((response) => {
          //el número de páginas que hay disponibles es igual a los hits /10 ya que se muestran 10 articulos
          //por pagina, redondeando hacia arriba.
          this.paginas = Math.ceil(response.data.response.meta.hits / 10);
          this.news = response.data.response.docs;
          this.error = undefined;
        })
        .catch((error) => {
          this.error = error;
        })
        //pase lo que pase, se para el loader
        .then(()=>this.$q.loading.hide());
      // https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20120101&end_date=20120101&q=some&sort=newest&api-key=mkdTSzg999FowCJ2wnMVRKGIsOGDZHqT
    },
    //metodo que comprueba que la fecha final es posterior a la inicial. Igual que antes, en caso
    //de que no sea asi devuelve el texto de ayuda que se mostrara en el input
    checkDateInterval() {
      console.log(this.maxdate - this.mindate > 0);
      return this.maxdate - this.mindate > 0
        ? null
        : "La fecha ha de ser anterior a la maxima";
    },
  },
};
//css varios
</script>
<style scoped lang="scss">
.flex {
  flex-direction: column;
}
.busqueda {
  display: flex;
  flex-direction: row;
  margin: 3rem;
  @media (max-width: 500px) {
    flex-direction: column;
    & * {
      margin-top: 2rem;
    }
  }
}
.boton {
  margin: 0 0 1rem 1rem;
}
.input-form {
  margin-right: 0.5rem;
}
</style>