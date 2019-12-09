<template>
  <div class="hello">
    <h3>Discos</h3>
    <ul>
      <li v-for="item in discs" v-bind:key="item.id">
        <router-link v-bind:to="{ name: 'disc', params: { id: item.id }}">{{item.name}}</router-link>
      </li>
    </ul>
    <div class="navigation-btns">
      <button id="editButton" v-on:click="getInformation">Editar</button>
      <button>Excluir</button>
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
  name: 'Collection',
  props: {
    id: String
  },
  data: function(){
    return{
      discs: []
    } 
  },
  mounted() {
    this.getDiscs();
  },
  methods:{
    getDiscs: function(){
      axios.get('http://localhost:3000/api/disc/findDiscsByCollectionId/'+this.id).then(result=>{
        this.discs = JSON.parse(JSON.stringify(result.data.results));
      }).catch(error=>{
        console.log(error);
      })
    },
    getInformation: function(){
      axios.get('http://localhost:3000/api/collection/'+this.id).then(result=>{
        //obter informações da coleção para poder editá-la, preenchendo os campos do formulário
        let message = {};
        if(result.data.message){
          message = JSON.parse(JSON.stringify(result.data.message));
        } 
        console.log(message,result);
        const collection = JSON.parse(JSON.stringify(result.data.results));
        document.getElementById('collectionName').value = collection.name;
        document.getElementById('artistNameName').value = collection.artistName;

      }).catch(error=>{
        console.log(error);
      })
    },
    update: function(){

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
</style>
