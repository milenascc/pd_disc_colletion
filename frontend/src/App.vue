<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Collection title="Coleções"/>
      <div v-for="item in collections" v-bind:key="item.id">
        {{item.name}}
      </div>
  </div>
</template>

<script>
import Collection from './components/Collection.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    Collection
  },
  data: function() {
    return{
      collections: []
    }
  },
  mounted(){
    this.getCollections();
  },
  methods:{
    getCollections: function(){
      axios.get('http://localhost:3000/api/collection').then((result) =>{
        this.collections = JSON.parse(JSON.stringify(result.data.results));
      }).catch((error)=>{
        console.log(error);
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
