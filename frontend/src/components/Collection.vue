<template>
  <div class="collection-view">
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
      <h5><span class="required-item">*</span>Nome da coleção:</h5>
      <input id="collectionName" type="text" maxlength="100" v-on:change="modifiedName"/>
      <h5><span class="required-item">*</span>Nome do(s) artista(s)/banda(s):</h5>
      <input id="artistName" type="text" maxlength="100"/>
      <br/>
      <select multiple id="collectionDiscs">
        <option v-for="disc in allDiscs" v-bind:key="disc.id" v-bind:id="disc.id" v-bind:value="disc.id">{{disc.name}}</option>
      </select>
      <button v-on:click="update">Salvar alterações</button>
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
      discs: [],
      allDiscs: [],
      name: ''
    } 
  },
  mounted() {
    this.getDiscs();
  },
  methods:{
    modifiedName: function(event){
      console.log(event);
      this.name = document.getElementById('collectionName').value;
    },
    getDiscs: function(){
      //carregar discos desta coleção
      axios.get('http://localhost:3000/api/disc/findDiscsByCollectionId/'+this.id).then(result=>{
        this.discs = JSON.parse(JSON.stringify(result.data.results));
      }).catch(error=>{
        alert()
        console.log(error);
      });
    },
    getInformation: function(){
      //listar todos os discos para adicionar discos à coleção através do formulário
      axios.get('http://localhost:3000/api/disc/').then(result=>{
        this.allDiscs = JSON.parse(JSON.stringify(result.data.results));
      }).catch(error=>{
        console.log(error);
      });
      axios.get('http://localhost:3000/api/collection/'+this.id).then(result=>{
      //obter informações da coleção para poder editá-la, preenchendo os campos do formulário
        let message = {};
        if(result.data.message){
          message = JSON.parse(JSON.stringify(result.data.message));
        } 
        console.log(message,result);
        document.getElementsByClassName('form-collection')[0].style.display = 'block';
        const collection = JSON.parse(JSON.stringify(result.data.results[0]));
        document.getElementById('collectionName').value = collection.name;
        document.getElementById('artistName').value = collection.artistName;

      }).catch(error=>{
        console.log(error);
      });
    },
    update: function(){
      const artistName = document.getElementById('artistName').value;
      var obj = {};
      if(this.name.length>0) obj.name = this.name;
      if(artistName) obj.artistName = artistName;
      axios.put('http://localhost:3000/api/collection/'+this.id,obj).then(result=>{
        alert(result.data.message);
      }).catch(error=>{
        alert("Não foi possível editar! "+error);
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
  color: #1b5c3f;
}

.form-collection{
  display: none;
}
.required-item{
  color: red;
  font-weight: bolder;
}
</style>
