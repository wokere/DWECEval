<template>
  <div id="app">
{{info}}
  </div>
</template>

<script>
//importamos axios para usarlo 
import axios from 'axios';

export default {
  name: 'App',
  data:function(){
    return{
      info: null
    }
  },
    mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))
  }
}
</script>

<style>

</style>
