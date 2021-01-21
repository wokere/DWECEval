<template>
  <q-page class="flex flex-center">
    <q-form @submit.prevent.stop="onSubmit" class="busqueda">
    <q-input
      class="input-form"
      v-model.trim="text"
      filled
      label="texto de busqueda"
      hint="introduce texto"
      :rules="[valor => !!valor || 'Campo Obligatorio']"
    />
    <q-input
      class="input-form"
      v-model.trim="mindate"
      filled
      label="Fecha minima"
      mask="########"
      hint="Formato YYYYMMAA"
      reactive-rules
     :rules="[dataFormat,checkDateInterval]"

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
     :rules="[valor => !!valor || 'Campo Obligatorio']"

    />
    {{order}}
    <q-btn color="primary" type="submit" class="boton" size="lg" round icon="search" />
    </q-form>
    {{news}}
    <q-list>
        <q-item v-for="n in 6" :key="n">
             <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>

      </q-item>
    </q-list>
  </q-page>
</template>
<script>
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
      news:[]
    };
  },
  methods:{
      dataFormat(value){
          const rgx = new RegExp("\\d{8}");
          return rgx.test(value) ? null : "FORMATO AAAMMDD";

      },
      onSubmit(){
          //como la validacion se ha hecho en los propios componentes del formulario
          //con las rules
          //podemos enviarlo sin más
           let query = "q="+this.text;
           let begindate = "begin_date="+this.mindate;
           let enddate = "end_date="+this.maxdate;
           let order = "sort="+this.order.value;
           const API = "api-key=mkdTSzg999FowCJ2wnMVRKGIsOGDZHqT";
           let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"+begindate+"&"+enddate+"&"+order+"&"+query+"&"+API;

          this.$axios.get(url)
          .then(response=>{
              console.log(response);
              this.news = response.data.response.docs;
          })
          .catch(error =>{
              console.log(error);
          })
         // https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20120101&end_date=20120101&q=some&sort=newest&api-key=mkdTSzg999FowCJ2wnMVRKGIsOGDZHqT
      },
      checkDateInterval(){
          console.log(this.maxdate - this.mindate > 0);
          return this.maxdate - this.mindate > 0 ? null : "La fecha ha de ser anterior a la maxima";
      }
  }
};
</script>
<style scoped>
.flex{
    flex-direction: column;
}
.busqueda{
    display: flex;
    flex-direction: row;
    margin: 3rem;
}
.boton {
  margin: 0 0 1rem 1rem;
}
.input-form {
  margin-right: 0.5rem;
}
</style>