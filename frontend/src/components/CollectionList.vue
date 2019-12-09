<template>
  <div class="hello">
    <h3>Coleções</h3>
    <button>Criar nova coleção</button>
    <div v-for="item in collections" v-bind:key="item.id">
      <router-link v-bind:to="{ name: 'collection', params: { id: item.id }}">{{item.name}}</router-link>
    </div> 
    <div class="form-collection">
      <h5>Nome da coleção:</h5><span class="required-item">*</span>
      <input id="collectionName" type="text" maxlength="100"/>
      <h5>Nome do(s) artista(s)/banda(s):</h5><span class="required-item">*</span>
      <input id="artistName" type="text" maxlength="100"/>
    </div>
  </div>  
</template>

<script>
import axios from 'axios';

export default {
  name: 'CollectionList',
  props: {
    title: String
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
        if(error.statusCode) alert("Servidor desconectado!");
        console.log(error);
      });
    },
    addCollection: function(){
      axios.post('http://localhost:3000/api/collection',{
        name: document.getElementById('collectionName').value,
        artistName: document.getElementById('artistName').value
      }).then(result=>{
        var r = JSON.parse(JSON.stringify(result.data));
        if(r.message) alert(r.message);
      }).catch(error=>{
        console.log(error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.form-collection{
  display: none;
}
</style>
