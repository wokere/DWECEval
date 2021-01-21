<template>
  <q-page class="flex flex-center">
    <form @submit.prevent.stop="onSubmit" class="busqueda">
    <q-input
      class="input-form"
      v-model="text"
      filled
      label="texto de busqueda"
      hint="introduce texto"
      :rules="[valor => !!valor || 'Campo Obligatorio']"
    />
    <q-input
      class="input-form"
      v-model="date"
      filled
      label="Fecha minima"
      mask="########"
      hint="Formato YYYYMMAA"
     :rules="[valor => !!valor || 'Campo Obligatorio']"

    />
    <q-input
      class="input-form"
      v-model="date"
      filled
      label="fecha maxima"
      mask="########"
      hint="Formato YYYYMMAA"
    :rules="[valor => !!valor || 'Campo Obligatorio']"

    />
    <!-- ponemos emit-value para q v-model coja value,mirar porque no autorellena-->
    <q-select
      v-model="order"
      filled
      label="Ordenar"
      emit-value
      :options="opciones"
      hint="elige"
     :rules="[valor => !!valor || 'Campo Obligatorio']"

    />
    <q-btn color="primary" type="submit" class="boton" size="lg" round icon="search" />
    </form>{{ date }}
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
        { label: "Más recientes", value: "old" },
        { label: "Más antiguas", value: "new" },
      ],
      date: null,
    };
  },
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