<template>
  <div class="hello">
    <h3>Coleções</h3>
    <div class="navigation-btns">
      <button v-on:click="visualizeCollectionForm(true)">Criar nova coleção</button>
      <button v-on:click="visualizeCollectionForm(false)">Adicionar disco</button>
    </div>
    <ul>
      <li v-for="item in collections" v-bind:key="item.id">
        <router-link v-bind:to="{ name: 'collection', params: { id: item.id }}">{{item.name}}</router-link>
      </li> 
    </ul>
    <div class="form">
      <h5 v-if="isCollection"><span class="required-item">*</span>Nome da coleção:</h5>
      <h5 v-if="!isCollection"><span class="required-item">*</span>Nome do disco:</h5>
      <input id="name" type="text" maxlength="100"/>
      <div v-if="isCollection"> 
        <h5><span class="required-item">*</span>Nome do(s) artista(s)/banda(s):</h5>
        <input id="artistName" type="text" maxlength="100"/>
        <button v-on:click="addCollection">Salvar</button>
      </div>
      <div v-if="!isCollection">
        <h5><span class="required-item">*</span>Faixas do disco:</h5>
        <input id="tracks" type="text" maxlength="100"/>
        <h5>Detalhes:</h5>
        <input id="info" type="text" maxlength="100"/>
        <h5>Link de imagem da capa:</h5>
        <input id="imgUrl" type="text" maxlength="300"/>
        <select id="collectionId">
          <option disabled selected></option>
          <option v-for="col in collections" v-bind:key="col.id" v-bind:value="col.id">{{col.name}}</option>
        </select>
        <button v-on:click="addDisc">Salvar</button>
      </div>
    </div>
    <div id="searchDiscs">
      <p>Procure por algum termo para acharmos um disco</p>
      <input v-model="search" />
      <ul>
        <li v-for="d in discs" v-bind:key="d.id" v-on:click="goToDiscDetail(d.id)">
          {{d.name}}
        </li>
      </ul>
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
      collections: [],
      discs: [],
      boolVisible: false,
      isCollection: false,
      search: ''
    }
  },
  mounted(){
    this.getCollections();
  },
  watch:{
    search: function(oldSearch,newSearch){
      if(newSearch.length>4){
        axios.get('http://localhost:3000/api/disc/search/'+this.search).then(result=>{
          this.discs = JSON.parse(JSON.stringify(result.data.results));
        }).catch((error)=>{
          console.log(error);
          alert("A pesquisa não pode ser realizada!");
        })
      }
    }
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
        name: document.getElementById('name').value,
        artistName: document.getElementById('artistName').value
      }).then(result=>{
        var r = JSON.parse(JSON.stringify(result.data));
        if(r.message) alert(r.message);
        this.getCollections();
      }).catch(error=>{
        console.log(error);
      });
    },
    addDisc: function(){
      var obj = {
        name: document.getElementById('name').value,
        tracks: document.getElementById('tracks').value
      };
      const info = document.getElementById('info').value;
      const imgUrl = document.getElementById('imgUrl').value;
      const collectionId = document.getElementById('collectionId').options[document.getElementById('collectionId').selectedIndex].value;
      if(info) obj.info = info;
      if(imgUrl) obj.imgUrl = imgUrl;
      if(collectionId) obj.fk_collection_Id = collectionId;
      axios.post('http://localhost:3000/api/disc',obj).then(result=>{
        var r = JSON.parse(JSON.stringify(result.data));
        if(r.message) alert(r.message);
        this.getCollections();
      }).catch(error=>{
        console.log(error);
      });
    },
    visualizeCollectionForm: function(isCollection){
      this.isCollection = isCollection;
      if(this.bool){
        document.getElementsByClassName('form')[0].style.display = 'none';         
      }else{
        document.getElementsByClassName('form')[0].style.display = 'block'; 
      }
    },
    goToDiscDetail(id){
      this.$router.push('/disc/'+id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 20px 0 0;
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

.required-item{
  color: red;
  font-weight: bolder;
}

.form{
  display: none;
  text-align: left;
}

.hello{
  display: flex;
  flex-direction: column;
}
.navigation-btns{
  margin-bottom: 1rem;
}

.navigation-btns button{
  margin-right: 1rem;
  background-color: #0a3623;
  color: white;
  border-radius: 5px;
  border-style: outset;
  border-color: #36604b;
  padding: 0.25rem;
}
</style>
