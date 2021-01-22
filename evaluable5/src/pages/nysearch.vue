<template>
  <q-page class="flex flex-center">
    <q-form @submit.prevent.stop="navega(mainCallurl)" class="busqueda">
        {{}}
      <q-input
        class="input-form"
        v-model.trim="text"
        filled
        label="texto de busqueda"
        hint="introduce texto"
        :rules="[(valor) => !!valor || 'Campo Obligatorio']"
      />
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
      <!-- ponemos emit-value para q v-model coja value,mirar porque no autorellena-->
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
     <q-pagination v-show="news.length>0"
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
    <q-list class="column" style="width:70vw">
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
          <q-item-label caption>{{
            article.pub_date | prettydate
          }}</q-item-label>
          <q-item-label>{{ article.section_name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-pagination v-show="news.length>0"
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
const API = "api-key=mkdTSzg999FowCJ2wnMVRKGIsOGDZHqT";
export default {
  name: "nysearch",
  data: function () {
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
    };
  },
  filters: {
    prettydate: function (val) {
      return new Date(val).toLocaleDateString();
    },
  },
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
    paginacion: function(){
        
        return this.$q.platform.is.mobile ? 4 : 10;
    }
  },
  methods: {
    dataFormat(value) {
      const rgx = new RegExp("\\d{8}");
      return rgx.test(value) ? null : "FORMATO AAAMMDD";
    },
    navega(url) {
      //como la validacion se ha hecho en los propios componentes del formulario
      //con las rules
      //podemos enviarlo sin más
      this.$axios
        .get(url)
        .then((response) => {
          console.log(response);
          this.paginas = Math.ceil(response.data.response.meta.hits / 10);
          this.news = response.data.response.docs;
        })
        .catch((error) => {
          console.log(error);
        });
      // https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20120101&end_date=20120101&q=some&sort=newest&api-key=mkdTSzg999FowCJ2wnMVRKGIsOGDZHqT
    },
    checkDateInterval() {
      console.log(this.maxdate - this.mindate > 0);
      return this.maxdate - this.mindate > 0
        ? null
        : "La fecha ha de ser anterior a la maxima";
    },
  },
};
</script>
<style scoped lang="scss">
.flex {
  flex-direction: column;

}
.busqueda {
  display: flex;
  flex-direction: row;
  margin: 3rem;
    @media (max-width:500px){
      flex-direction: column;
      & *{
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